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

    /**
     * Gerenciador interno de mensagens MIDI recebidas da pedaleira.
     * @param {MIDIMessageEvent} message - Mensagem recebida.
     */
    #handleMidiMessage(message) {
        // Por enquanto, apenas exibimos no console.
        // Futuramente, esta função irá decodificar e despachar os dados.
        console.log("Dado MIDI recebido da GX-10:", message.data);
    }
}

// Vincula a classe de forma global para funcionamento offline direto via file://
window.GX10 = GX10;
