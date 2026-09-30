/**
 * Classe de controle para o processador de efeitos BOSS GX-10.
 * Utiliza a Web MIDI API para estabelecer conexão e comunicação bidirecional.
 */
class GX10 {
    // Atributo privado que mantém a conexão ativa { input, output }
    #connection = null;
    // Referência ao objeto de acesso MIDI do navegador
    #midiAccess = null;
    // Callback para registrar mudanças de estado (conectar/desconectar cabo)
    #onStateChangeCallback = null;
    // Device ID usado nas mensagens SysEx (padrão de fábrica 0x10)
    #deviceId = 0x10;
    // Pedidos de leitura (RQ1) aguardando resposta
    #pendentes = [];
    // Acumula mensagens SysEx que chegam em pedaços
    #bufferSysEx = [];
    // Callback de depuração para toda mensagem SysEx recebida
    #onSysExCallback = null;

    constructor() {
        this.#connection = null;
    }

    /**
     * Registra uma função de retorno para quando o status físico da conexão mudar.
     * @param {Function} callback - Função que recebe um objeto { isConnected, reason, deviceName }
     */
    onStateChange(callback) {
        this.#onStateChangeCallback = callback;
    }

    /**
     * Verifica se o dispositivo está conectado e pronto para comunicação.
     * @returns {boolean} True se estiver conectado, false caso contrário.
     */
    isConnected() {
        if (!this.#connection) {
            return false;
        }
        const { input, output } = this.#connection;
        // Verifica se ambas as portas existem e estão no estado "connected"
        return input && output && input.state === "connected" && output.state === "connected";
    }

    /**
     * Retorna o nome do dispositivo atualmente conectado, se houver.
     * @returns {string|null} Nome do dispositivo ou null.
     */
    getDeviceName() {
        return this.isConnected() ? this.#connection.input.name : null;
    }

    /**
     * Tenta se conectar à pedaleira BOSS GX-10 usando a Web MIDI API.
     * @returns {Promise<Object>} Resultado da operação com status de sucesso e mensagem.
     */
    async connect() {
        try {
            // 1. Verifica suporte no navegador
            if (!navigator.requestMIDIAccess) {
                return {
                    success: false,
                    error: "A Web MIDI API não é suportada por este navegador. Use o Chrome, Edge ou Opera."
                };
            }

            // 2. Solicita acesso MIDI com suporte a mensagens exclusivas de sistema (SysEx)
            this.#midiAccess = await navigator.requestMIDIAccess({ sysex: true });

            // 3. Configura listener para mudanças de estado de hardware (plugar/desplugar cabo USB)
            this.#midiAccess.onstatechange = (event) => {
                this.#handleHardwareStateChange(event);
            };

            // 4. Mapeia e procura as portas de Entrada (Input) e Saída (Output) da GX-10
            const inputs = Array.from(this.#midiAccess.inputs.values());
            const outputs = Array.from(this.#midiAccess.outputs.values());

            // Procura portas cujo nome contenha "GX-10" ou "GX-100" (case-insensitive)
            const input = inputs.find(i => this.#isGX10Port(i));
            const output = outputs.find(o => this.#isGX10Port(o));

            if (!input || !output) {
                return {
                    success: false,
                    error: "Dispositivo BOSS GX-10 não encontrado. Verifique se ele está conectado via USB e ligado."
                };
            }

            // 5. Guarda a conexão no atributo privado
            this.#connection = { input, output };

            // 6. Configura escuta de mensagens recebidas da pedaleira
            this.#connection.input.onmidimessage = (message) => {
                this.#handleMidiMessage(message);
            };

            return {
                success: true,
                deviceName: input.name,
                message: `Conectado com sucesso ao dispositivo: ${input.name}`
            };

        } catch (error) {
            return {
                success: false,
                error: `Falha ao acessar o sistema MIDI: ${error.message}`
            };
        }
    }

    /**
     * Encerra a conexão ativa de forma limpa.
     * @returns {Object} Resultado contendo o status da desconexão.
     */
    disconnect() {
        if (this.#connection) {
            const deviceName = this.#connection.input.name;
            
            // Remove listeners para evitar vazamento de memória
            if (this.#connection.input) {
                this.#connection.input.onmidimessage = null;
            }

            this.#connection = null;

            if (this.#onStateChangeCallback) {
                this.#onStateChangeCallback({
                    isConnected: false,
                    reason: "Desconexão manual solicitada pelo usuário",
                    deviceName: deviceName
                });
            }

            return {
                success: true,
                message: "Desconectado com sucesso da BOSS GX-10."
            };
        }

        return {
            success: false,
            error: "Nenhuma conexão ativa encontrada para desconectar."
        };
    }

    /**
     * Envia uma mensagem de dados MIDI (normalmente SysEx) para a pedaleira.
     * @param {Uint8Array|Array<number>} data - Array de bytes a ser enviado.
     * @returns {boolean} True se enviado com sucesso, false caso contrário.
     */
    sendMidi(data) {
        if (!this.isConnected()) {
            console.warn("Impossível enviar dados: GX-10 não está conectada.");
            return false;
        }
        try {
            this.#connection.output.send(data);
            return true;
        } catch (error) {
            console.error("Erro ao enviar mensagem MIDI:", error);
            return false;
        }
    }

    /**
     * Método auxiliar privado para validar se a porta corresponde ao dispositivo desejado.
     * @param {MIDIPort} port - Porta MIDI a ser checada.
     * @returns {boolean} True se for GX-10 ou GX-100.
     */
    #isGX10Port(port) {
        if (!port || !port.name) return false;
        const name = port.name.toUpperCase();
        return name.includes("GX-10") || name.includes("GX-100");
    }

    /**
     * Processa mudanças físicas de conexão (cabos conectados ou removidos).
     * @param {MIDIConnectionEvent} event - Evento gerado pela Web MIDI API.
     */
    #handleHardwareStateChange(event) {
        const port = event.port;
        if (!this.#isGX10Port(port)) return;

        // Se o cabo do dispositivo ativo for removido fisicamente
        if (port.state === "disconnected") {
            if (this.#connection && (this.#connection.input === port || this.#connection.output === port)) {
                const prevDeviceName = port.name;
                this.#connection = null;
                
                if (this.#onStateChangeCallback) {
                    this.#onStateChangeCallback({
                        isConnected: false,
                        reason: "Dispositivo USB desconectado fisicamente",
                        deviceName: prevDeviceName
                    });
                }
            }
        } 
        // Se um dispositivo compatível foi conectado e não estávamos conectados
        else if (port.state === "connected" && !this.isConnected()) {
            if (this.#onStateChangeCallback) {
                this.#onStateChangeCallback({
                    isConnected: false,
                    reason: "Dispositivo BOSS GX-10 detectado. Pronto para conectar.",
                    deviceName: port.name
                });
            }
        }
    }

    // =========================================================================
    // COMUNICAÇÃO SysEx (RQ1 / DT1) — formato oficial do midi.pdf:
    //   RQ1: F0 41 <dev> 00 00 00 00 0B 11 <end 4> <tam 4> <checksum> F7
    //   DT1: F0 41 <dev> 00 00 00 00 0B 12 <end 4> <dados...> <checksum> F7
    //   Checksum: soma dos bytes de endereço + tamanho/dados; 128 - (soma % 128), com 0 se der 128.
    // =========================================================================

    /** Cabeçalho comum: ID da Roland + Model ID da GX-10 (00 00 00 00 0B). */
    static MODEL_ID = [0x00, 0x00, 0x00, 0x00, 0x0B];

    /**
     * Define o Device ID usado nas mensagens (padrão 0x10; 0x7F é broadcast).
     * @param {number} id
     */
    setDeviceId(id) {
        this.#deviceId = id & 0x7F;
    }

    getDeviceId() {
        return this.#deviceId;
    }

    /**
     * Calcula o checksum Roland de um conjunto de bytes (endereço + dados/tamanho).
     * @param {Array<number>} bytes
     * @returns {number} 0–127
     */
    static checksum(bytes) {
        const soma = bytes.reduce((t, b) => t + b, 0);
        return (128 - (soma % 128)) % 128;
    }

    /**
     * Soma um deslocamento a um endereço de 4 bytes, respeitando o limite de 7 bits por byte.
     * @param {Array<number>} endereco - 4 bytes
     * @param {number} deslocamento
     * @returns {Array<number>} novo endereço de 4 bytes
     */
    static addrAdd(endereco, deslocamento) {
        let total = ((endereco[0] << 21) | (endereco[1] << 14) | (endereco[2] << 7) | endereco[3]) + deslocamento;
        return [(total >> 21) & 0x7F, (total >> 14) & 0x7F, (total >> 7) & 0x7F, total & 0x7F];
    }

    /**
     * Converte um tamanho em bytes para o formato de 4 bytes de 7 bits.
     * @param {number} tamanho
     * @returns {Array<number>}
     */
    static sizeBytes(tamanho) {
        return [(tamanho >> 21) & 0x7F, (tamanho >> 14) & 0x7F, (tamanho >> 7) & 0x7F, tamanho & 0x7F];
    }

    /**
     * Monta a mensagem RQ1 (pedido de leitura).
     * @param {Array<number>} endereco - 4 bytes
     * @param {number} tamanho - quantidade de bytes a ler
     * @returns {Array<number>} mensagem completa, de F0 a F7
     */
    buildRQ1(endereco, tamanho) {
        const tam = GX10.sizeBytes(tamanho);
        const corpo = [...endereco, ...tam];
        return [0xF0, 0x41, this.#deviceId, ...GX10.MODEL_ID, 0x11, ...corpo, GX10.checksum(corpo), 0xF7];
    }

    /**
     * Monta a mensagem DT1 (envio de dados).
     * @param {Array<number>} endereco - 4 bytes
     * @param {Array<number>} dados - bytes de 0 a 127
     * @returns {Array<number>} mensagem completa, de F0 a F7
     */
    buildDT1(endereco, dados) {
        const corpo = [...endereco, ...dados];
        return [0xF0, 0x41, this.#deviceId, ...GX10.MODEL_ID, 0x12, ...corpo, GX10.checksum(corpo), 0xF7];
    }

    /**
     * Envia dados para a pedaleira (DT1).
     * @param {Array<number>} endereco - 4 bytes
     * @param {Array<number>} dados
     * @returns {boolean} true se a mensagem saiu
     */
    sendData(endereco, dados) {
        return this.sendMidi(this.buildDT1(endereco, dados));
    }

    /**
     * Pede dados à pedaleira (RQ1) e espera a resposta DT1 correspondente.
     * @param {Array<number>} endereco - 4 bytes
     * @param {number} tamanho - quantidade de bytes esperada
     * @param {number} tempoLimite - ms até desistir (padrão 1500)
     * @returns {Promise<Array<number>>} os bytes de dados da resposta
     */
    requestData(endereco, tamanho, tempoLimite = 1500) {
        return new Promise((resolve, reject) => {
            if (!this.isConnected()) {
                reject(new Error("GX-10 não está conectada."));
                return;
            }

            const pedido = {
                endereco,
                tamanho,
                resolve,
                reject,
                temporizador: setTimeout(() => {
                    this.#pendentes = this.#pendentes.filter(p => p !== pedido);
                    reject(new Error(`A pedaleira não respondeu em ${tempoLimite} ms (endereço ${endereco.map(b => b.toString(16).padStart(2, "0")).join(" ")}).`));
                }, tempoLimite)
            };

            this.#pendentes.push(pedido);

            if (!this.sendMidi(this.buildRQ1(endereco, tamanho))) {
                clearTimeout(pedido.temporizador);
                this.#pendentes = this.#pendentes.filter(p => p !== pedido);
                reject(new Error("Falha ao enviar o pedido de leitura."));
            }
        });
    }

    /**
     * Registra uma função chamada a cada mensagem SysEx recebida (útil para depuração).
     * @param {Function} callback - recebe { comando, endereco, dados, bytes }
     */
    onSysEx(callback) {
        this.#onSysExCallback = callback;
    }

    /**
     * Gerenciador interno de mensagens MIDI recebidas da pedaleira.
     * Junta os pedaços até o F7, valida o cabeçalho e resolve os pedidos pendentes.
     * @param {MIDIMessageEvent} message - Mensagem recebida.
     */
    #handleMidiMessage(message) {
        const bytes = Array.from(message.data);

        // A mensagem pode chegar em pedaços: acumula até encontrar o F7 final.
        if (bytes[0] === 0xF0) {
            this.#bufferSysEx = bytes;
        } else if (this.#bufferSysEx.length > 0) {
            this.#bufferSysEx.push(...bytes);
        } else {
            return; // mensagem curta que não é SysEx (ex.: Active Sensing)
        }

        if (this.#bufferSysEx[this.#bufferSysEx.length - 1] !== 0xF7) return;

        const msg = this.#bufferSysEx;
        this.#bufferSysEx = [];

        // Confere o cabeçalho: F0 41 <dev> 00 00 00 00 0B <comando>
        const modelo = msg.slice(3, 8);
        if (msg[1] !== 0x41 || modelo.join() !== GX10.MODEL_ID.join()) return;

        const comando = msg[8];
        const endereco = msg.slice(9, 13);
        const dados = msg.slice(13, msg.length - 2); // tira checksum e F7

        if (this.#onSysExCallback) {
            this.#onSysExCallback({ comando, endereco, dados, bytes: msg });
        }

        if (comando !== 0x12) return; // só DT1 responde a pedidos

        const pedido = this.#pendentes.find(p => p.endereco.join() === endereco.join());
        if (!pedido) return;

        clearTimeout(pedido.temporizador);
        this.#pendentes = this.#pendentes.filter(p => p !== pedido);
        pedido.resolve(dados);
    }
}

// Vincula a classe de forma global para funcionamento offline direto via file://
window.GX10 = GX10;
