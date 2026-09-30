# Contexto do Projeto - Controlador BOSS GX-10

Este arquivo serve como repositório de memória persistente para o agente, guardando as definições arquiteturais, arquivos criados e decisões tomadas no projeto para evitar perda de foco em turnos futuros.

## 1. Visão Geral do Projeto
*   **Equipamento:** BOSS GX-10 (Guitar Effects Processor).
*   **Base Tecnológica:** Aplicação Web (HTML5, CSS3, JavaScript ES6) de backend/frontend unificados, futuramente integrada com Next.js.
*   **Fase Atual:** Fase 1 - Criação das classes fundamentais de conexão e monitoramento via Web MIDI API, tabela global de parâmetros dos efeitos e testes de integridade.

---

## 2. Arquivos Criados e Ajustes de Arquitetura

### A. `@tmp/midi_resumo.md`
Contém a síntese em português das especificações técnicas mais críticas extraídas do arquivo `@tmp/midi.pdf`. Inclui:
*   Identificação (Device Inquiry) da GX-10.
*   Estrutura e sintaxe das mensagens SysEx Roland (RQ1 e DT1).
*   Fórmula e algoritmo para cálculo de Checksum Roland.
*   Mapa base de endereços SysEx de controle e memórias da pedaleira.

### B. `@js/gx10.class.js` (Ajustado para contornar CORS no protocolo `file://`)
Classe principal `GX10` contendo:
*   **Atributo Privado `#connection`:** Armazena o par `{ input, output }` das portas de conexão MIDI ativas, protegendo o estado interno.
*   **Remoção de Imports/Exports ES6:** Ajustado para anexar a classe diretamente no escopo do objeto global `window` (`window.GX10 = GX10`). Isso elimina de vez o bloqueio de CORS imposto pelos navegadores modernos em arquivos locais carregados via duplo clique (`file:///`).
*   **Método `connect()`:** Solicita acesso MIDI com suporte a SysEx, escuta eventos globais do sistema e autodetecta a BOSS GX-10/GX-100 na lista de portas.
*   **Método `disconnect()`:** Desconecta e limpa listeners com segurança.
*   **Método `isConnected()`:** Retorna o status de conexão baseado na integridade física do cabo e comunicação ativa (`port.state === "connected"`).
*   **Monitoramento de Hardware `onStateChange()`:** Permite que interfaces registrem funções para atualizar a tela em tempo real caso o usuário conecte ou remova o cabo USB física e subitamente da máquina.

### C. `@js/gx10.modules.js` (Tabelas de Parâmetros de Efeitos)
Arquivo que contém os metadados de parametrização e codificação SysEx dos módulos de efeito da BOSS GX-10. Vinculado a `window.GX10_MODULES`.
Módulos mapeados com sucesso até o momento:
1.  **`acGuitarSim` (Acoustic Guitar Simulator - `typeId: 0`)**: 4 parâmetros.
2.  **`acResonance` (Acoustic Resonance - `typeId: 1`)**: 4 parâmetros.
3.  **`preamp` (AIRD Preamp - `typeId: 2`)**: 19 parâmetros.
4.  **`bassPreamp` (AIRD Bass Preamp - `typeId: 3`)**: 19 parâmetros.
5.  **`chorus` (Chorus - `typeId: 4`)**: 24 parâmetros, incluindo suporte aos subcanais do modo DUAL.
6.  **`bassChorus` (Bass Chorus - `typeId: 5`)**: 7 parâmetros.
7.  **`primeChorus` (Prime Chorus - `typeId: 6`)**: 10 parâmetros, incluindo controles de doçura e sino harmônico.
8.  **`classicVibe` (Classic Vibe - `typeId: 7`)**: 4 parâmetros específicos (modo CHORUS/VIBRATO, taxa, profundidade e nível de volume).

Todos os módulos herdam o `commonHeader` que define `onOff` (byte único) e `duplicationNumber` (byte único). Os parâmetros específicos utilizam codificação de 4 nibbles baseada no offset Roland de 16 bits (`+32768`).

### D. `test-001-connection.html` (Ajustado para carregamento sem CORS)
Página HTML interativa de estilo moderno, criada diretamente na pasta raiz para testar todas as funcionalidades de conexão:
*   Carrega a biblioteca `js/gx10.class.js` através de uma tag `<script>` convencional de forma estática antes de rodar os scripts de controle.
*   Elimina o atributo `type="module"` e comandos de `import` que geravam a restrição de CORS local.
*   Contém controles interativos de clique para Conectar, Desconectar e Verificar Status.
*   Inclui um painel indicador visual dinâmico (led verde/vermelho) que reflete o estado da pedaleira em tempo real.
*   Possui um console interno interativo para auditoria visual detalhada de todos os passos de conexão e desconexão de portas.

---

## 3. Estado Atual de Desenvolvimento
*   [x] Análise inicial da documentação e criação do resumo MIDI (`@tmp/midi_resumo.md`).
*   [x] Modelagem da classe JavaScript principal e encapsulamento privado da conexão (`@js/gx10.class.js`).
*   [x] Desenvolvimento do primeiro arquivo de validação visual e lógica (`test-001-connection.html`).
*   [x] Resolução definitiva do problema de CORS para execução local offline direta via protocolo `file://`.
*   [x] Criação do banco de dados modular de efeitos (`@js/gx10.modules.js`) com 8 efeitos mapeados de forma precisa em nibbles/offsets.
*   [ ] Próximos Passos: Construção de rotinas de transmissão de SysEx para ler e escrever os parâmetros e integração posterior com Next.js.

---

## 4. Revisão do estado (2026-09-15, troca de agente Gemini → Claude)

### Estado real de `js/gx10.modules.js`
13 módulos (não 8 como dizia a seção 2C): acGuitarSim(0), acResonance(1), preamp(2), bassPreamp(3), chorus(4), bassChorus(5), primeChorus(6), classicVibe(7), compressor(8), xComp(9), xBassComp(10), defretter(11), bassDefretter(12). Último prompt atendido: BASS DEFRETTER. Próximo na ordem do TYPE: DELAY (13).

### Fatos confirmados no midi.pdf (`[MemoryFxItem]`, pág. 18-19)
*   Byte 0x00 = TYPE (0-82, ordem da lista = `typeId`; os 13 typeIds atuais conferem). 0x01 = OFF/ON. 0x02 = DuplicationNumber (0-9).
*   0x03 em diante: "FX Parameter 1..44", genéricos, 4 bytes cada (nibbles aaaa bbbb cccc dddd), bruto 12768-52768 = valor -20000..+20000 (offset 32768). Tamanho total do item 0x133.
*   Fx Item 1..20 dentro de `[Memory]`: 00 11 00, 00 13 00 … 00 37 00 (passo 02 00). Temporário = 10 00 00 00 + isso.
*   **O midi.pdf NÃO diz qual parâmetro de cada efeito é o "FX Parameter N".**

### Fonte da ordem dos parâmetros
*   parameter.pdf tem 2 ordens: a da descrição do efeito e a do "TARGET list" (pág. 83+, lista de alvos do ASSIGN).
*   Arquivo atual seguiu TARGET list em: acGuitarSim, acResonance, chorus, bassChorus, primeChorus, classicVibe, compressor, xComp, defretter, bassDefretter.
*   Seguiu a ordem da descrição (≠ TARGET list) em: **preamp, bassPreamp** (TARGET: TYPE,GAIN,LEVEL,BASS,MIDDLE,TREBLE,PRESENCE,GAIN SW,SOLO SW,SOLO LEVEL,BRIGHT SW,SAG,RESONANCE,DIRECT MIX,SP TYPE,MIC TYPE,MIC DISTANCE,MIC POSITION,MIC LEVEL) e **xBassComp** (TARGET: ATTACK,LEVEL,TONE,RATIO,DIRECT MIX,THRESHOLD).
*   Nenhuma das duas ordens está provada como a ordem MIDI. Hipótese mais forte = TARGET list. Confirmar com a pedaleira (ler Fx Item via RQ1 e mexer em 1 knob).

### Defeitos encontrados
*   `midiMax: [0x08, 0x00, 19, 0x00]` (PRE DELAY em chorus/primeChorus) inválido: 19 não é nibble. 400 = 0x8190 → `[0x08, 0x01, 0x09, 0x00]`.
*   PRE-DELAY real é 0.0–40.0 ms (passo 0.1); bruto 0-400 com `unit: "ms"` exibiria errado (precisa escala /10).
*   RATE (chorus, primeChorus, classicVibe, bassChorus…) aceita também "BPM nota" além de 0-100; tabela só cobre 0-100.
*   `midiMin/midiMax` ausentes em vários parâmetros (chorus type, waveform, cortes do DUAL, primeChorus etc.) — inconsistente; melhor calcular por função a partir de min/max.
*   `default` foi inventado (PDF não traz padrão).
*   Label de `bell` "Brilho (Bell)" colide com "Brilho" do Bright SW (cosmético).

### Decisão do usuário (2026-09-15)
*   Continuar criando módulos seguindo a ordem das listagens da documentação; usuário confirmará a ordem real por testes na pedaleira depois. Não travar criação de módulos por isso.
*   Defeitos da seção acima ainda NÃO corrigidos (aguardando pedido).

## 5. Módulos adicionados (Claude)
*   **`delay` (typeId 13)** — 6 parâmetros: time(1–2000 ms, 0x8001…0x87D0), feedback(0–100), effectLevel(0–120), directLevel(0–100), highCut(0–29, highCutOptions), carryover(OFF/ON). Ordem idêntica na descrição e no TARGET list. BPM excluído (é da memória, `[MemoryEfct]` 0x02–0x05, 40.0–250.0). TIME em modo BPM (notas) sem codificação documentada → só comentário no código. Sem `default` (PDF não informa).
*   **`delayPlus` (typeId 14)** — 25 parâmetros, ordem do TARGET list (difere da descrição; mesma regra usada no CHORUS, que também tem DUAL): type(MONO,DIR/EFX,STEREO,PAN,REVERSE,DUAL), directLevel, modRate, modDepth, duckSens, duckPre, duckPost, carryover, time, feedback, effectLevel(0–120), highCut, tapTime(0–100%, só PAN), autoTrigger(só REVERSE), mode(SERIES,PARALLEL,L/R), type1, time1, feedback1, effectLevel1, highCut1, **highCut2, type2**, time2, feedback2, effectLevel2. A inversão "highCut2 antes de type2" está no PDF bruto (conferido, não é erro de extração) — candidata forte a checar no teste com a pedaleira. type1/type2: MONO,PAN,ANALOG,TAPE. BPM excluído; TIME em notas BPM não mapeado.
*   Regra adotada: quando descrição ≠ TARGET list, usar TARGET list (maioria dos módulos anteriores já segue).
*   **`analogDelay` (typeId 15)** — 12 parâmetros; descrição e TARGET list com a MESMA ordem: type(MONO, DIR/EFX — só 2), time(**12–1200 ms**, 0x800C…0x84B0), feedback(0–100), effectLevel(0–120), directLevel(**0–120**, diferente do DELAY/DELAY PLUS que é 0–100), highCut, modRate, modDepth, duckSens, duckPre, duckPost, carryover. BPM excluído; TIME em notas BPM não mapeado.
*   **`spaceEcho` (typeId 16)** — 13 parâmetros; descrição e TARGET list com a MESMA ordem; SEM TYPE: time(1–2000 ms), feedback, effectLevel(0–120), directLevel(0–100), highCut, modRate, modDepth, duckSens, duckPre, duckPost, head(1, 1+2, 1+3, 2+3, 1+2+3 → 0–4), wowFlutter(0–100), carryover. BPM excluído; TIME em notas BPM não mapeado.
*   **`shimmerDelay` (typeId 17)** — 14 parâmetros; descrição e TARGET list com a MESMA ordem; SEM TYPE: time(1–2000 ms), feedback, effectLevel(0–120), directLevel(0–100), highCut, modRate, modDepth, duckSens, duckPre, duckPost, pitch(**-24…+24** semitons, 0x7FE8…0x8018), pitchBalance(0–100), pitchFeedback(0–100), carryover. BPM excluído; TIME em notas BPM não mapeado.
*   **`twist` (typeId 18)** — 7 parâmetros; descrição e TARGET list com a MESMA ordem: mode(RISE→FALL, RISE→FADE; no texto extraído a seta aparece como "Ó"), trigger(OFF/ON), level(0–100), riseTime, fallTime(só RISE→FALL), fadeTime(só RISE→FADE), carryover.
*   **`warp` (typeId 19)** — 4 parâmetros; descrição e TARGET list com a MESMA ordem: time(1–2000 ms), trigger(OFF/ON), level(0–100), carryover. BPM excluído; TIME em notas BPM não mapeado.
*   Próximo módulo na ordem do TYPE: **PARAMETRIC EQUALIZER (20)**.
*   **`parametricEq` (typeId 20)** — 11 parâmetros; descrição, TARGET list E lista numerada do midi.pdf com a MESMA ordem: lowGain, highGain, level (os três -20…+20 dB), lowMidFreq(0–28), lowMidQ(0–5), lowMidGain, highMidFreq, highMidQ, highMidGain, lowCut(0–29), highCut(0–29). Novos helpers no arquivo: `freqOptions` (29 frequências, sem FLAT) e `qOptions` (0.5, 1, 2, 4, 8, 16).

### ⚠️ FONTE NOVA E DECISIVA sobre a ordem dos parâmetros (2026-09-16)
*   O **midi.pdf** (seção [Assign], lista numerada de alvos, ~linhas 340-560 do texto extraído) enumera **parâmetro por parâmetro de cada efeito, na ordem do lado MIDI**. É a melhor fonte disponível — melhor que o TARGET list do parameter.pdf.
*   Conferidos e batendo com o arquivo: X COMP (ATTACK, LEVEL, TONE, RATIO, DIRECT MIX, SUSTAIN), SPACE ECHO, PARAMET EQ, ANALOG DELAY.
*   **DIVERGÊNCIAS confirmadas (corrigir):**
    *   `preamp` e `bassPreamp`: MIDI diz TYPE, GAIN, LEVEL, BASS, MIDDLE, TREBLE, PRESENCE, GAIN SW, SOLO SW, SOLO LEVEL, BRIGHT SW, SAG, RESONANCE, DIRECT MIX, SP TYPE, MIC TYPE, MIC DISTANCE, MIC POSITION, MIC LEVEL (nºs 163-181 e 182-200). O arquivo está na ordem da descrição (GAIN SW em 4º, BRIGHT SW em 9º, SP TYPE antes de DIRECT MIX).
    *   `xBassComp`: MIDI diz ATTACK, LEVEL, TONE, RATIO, DIRECT MIX, THRESHOLD (nºs 67-72). O arquivo tem THRESHOLD em 1º.
*   Ainda pendente: conferir os demais módulos já criados contra essa lista numerada.
*   **`graphicEq` (typeId 21)** — 11 parâmetros, todos -20…+20 dB (0x7FEC…0x8014): gain31_5, gain63, gain125, gain250, gain500, gain1k, gain2k, gain4k, gain8k, gain16k, level. Ordem confirmada nas DUAS fontes (descrição + lista numerada do midi.pdf, alvos 231-241). Bandas são fixas (não há escolha de frequência).
*   Próximo módulo na ordem do TYPE: **FLANGER (22)**.
*   **`flanger` (typeId 22)** — 8 parâmetros: rate, depth, resonance, manual, **stepRate, lowCut** (nesta ordem), effectLevel, directMix; todos 0–100 menos lowCut (0–29, lowCutOptions). **DIVERGÊNCIA resolvida**: a descrição do parameter.pdf põe LOW CUT antes de STEP RATE; a lista numerada do midi.pdf (alvos 426-433) e o TARGET list põem STEP RATE antes — seguido o MIDI. STEP RATE mostra "OFF" no display quando vale 0; RATE e STEP RATE também aceitam notas BPM (não mapeado).
*   Próximo módulo na ordem do TYPE: **BASS FLANGER (23)**.
*   **`bassFlanger` (typeId 23)** — 8 parâmetros, estrutura idêntica ao `flanger`: rate, depth, resonance, manual, **stepRate, lowCut**, effectLevel, directMix. Mesma divergência do FLANGER resolvida a favor do midi.pdf (alvos 434-441) e do TARGET list.
*   Próximo módulo na ordem do TYPE: **FLANGER PRIME (24)** (no parameter.pdf aparece como "PRIME FLANGER", pág. 16).
*   **`flangerPrime` (typeId 24)** — 14 parâmetros, ordem do midi.pdf (alvos 442-455), MUITO diferente da ordem da descrição: rate, depth, resonance, manual, turbo(OFF/ON), waveform(TRI/SINE), stepRate, separation, effectLevel, lowDamp, highDamp, directMix, lowCut, highCut. `separation` = 13 opções fixas 0,15,…,180 (valores 0–12). `lowDamp`/`highDamp` = **-100…0** (0x7F9C…0x8000). Nome: "PRIME FLANGER" no parameter.pdf, "FLANGER PRIME" na lista de TYPE do midi.pdf.
*   Próximo módulo na ordem do TYPE: **BASS FLANGER PRIME (25)** (alvos 456+; parameter.pdf "PRIME BASS FLANGER", pág. 56).
*   **`bassFlangerPrime` (typeId 25)** — 14 parâmetros, cópia exata da estrutura de `flangerPrime` (faixas conferidas na descrição, alvos 456-469 do midi.pdf confirmam a mesma ordem): rate, depth, resonance, manual, turbo, waveform, stepRate, separation(0…180 de 15 em 15), effectLevel, lowDamp(-100…0), highDamp(-100…0), directMix, lowCut, highCut. No parameter.pdf chama-se "PRIME BASS FLANGER".
*   Próximo módulo na ordem do TYPE: **HARMONIST (26)**.
*   **`harmonist` (typeId 26)** — 33 parâmetros; ordem confirmada por TRÊS fontes (lista numerada midi.pdf alvos 489-521, TARGET list do parameter.pdf e do reference.pdf): voice(1 VOICE, 2 MONO, 2 STEREO), harmony1, level1, preDelay1(0–300 ms), **feedback1 (só a voz 1 tem)**, harmony2, level2, preDelay2, directLevel, depois 12 notas da escala da voz 1 (scale1C…scale1B) e 12 da voz 2 (scale2C…scale2B), cada uma -24…+24 semitons. Último offset 0x0083.
*   **PENDENTE no harmonist**: a lista de intervalos de HARMONY ("-2 oct … +2 oct, USER") NÃO consta de nenhum dos três PDFs. `harmony1`/`harmony2` ficaram com `min/max/options: null` e campo `pending`. Resolver lendo o valor da pedaleira. Primeiro caso do projeto com parâmetro incompleto — o validador do Node precisa pular params com `pending`.
*   KEY e BPM ficam de fora (são de `[MemoryEfct]`, não do efeito) — a lista numerada do midi.pdf confirma isso: KEY não aparece entre os alvos do HARMONIST.
*   Próximo módulo na ordem do TYPE: **BASS HARMONIST (27)**.
*   **`bassHarmonist` (typeId 27)** — 33 parâmetros, cópia exata da estrutura de `harmonist` (alvos 522-554 do midi.pdf confirmam a mesma ordem; faixas conferidas na descrição, pág. 60-61): voice, harmony1(PENDENTE), level1, preDelay1, feedback1, harmony2(PENDENTE), level2, preDelay2, directLevel + 24 notas de escala (-24…+24). Último offset 0x0083.
*   Próximo módulo na ordem do TYPE: **PHRASE LOOP (28)**.
*   **`phraseLoop` (typeId 28)** — 1 parâmetro só: loopLevel(0–100), alvo 687 do midi.pdf; TARGET list idem. Este efeito NÃO lista ON/OFF entre os alvos (não é atribuível a footswitch), mas o byte 0x01 existe na memória — `commonHeader` mantido por consistência da estrutura. Grava 38 s mono / 19 s estéreo; só pode entrar uma vez na cadeia.
*   Próximo módulo na ordem do TYPE: **DIVIDER (29)**.
*   **`divider` (typeId 29)** — 11 parâmetros, ordem do midi.pdf (alvos 204-214): mode(SINGLE/DUAL), chSelect(A/B), mixMode(SWITCH/MIX), dynamicA(OFF/POLARITY+/POLARITY-), dynamicSensA(0–100), filterA(OFF/LPF/HPF), cutoffFreqA(0–16), dynamicB, dynamicSensB, filterB, cutoffFreqB. chSelect/mixMode só com MODE=SINGLE; A:/B: só com MODE=DUAL. Novo helper `dividerCutoffOptions` = FREQUENCIES.slice(7,24) → 17 opções, 100 Hz…4.00 kHz.
*   O MIXER (que junta os canais de volta) é um efeito SEPARADO na lista de TYPE, não faz parte do divider; no parameter.pdf os dois aparecem na mesma seção "DIVIDER/MIXER" (pág. 48).
*   Próximo módulo na ordem do TYPE: **SPLITTER (30)**, depois MIXER (31).
*   **`splitter` (typeId 30)** — ZERO parâmetros próprios, só `commonHeader`. Aparece na lista de TYPE do midi.pdf, mas não tem nenhum alvo na lista numerada (204-214 DIVIDER → 215-219 MIXER, sem nada no meio) nem seção no parameter.pdf/reference.pdf. **Confirmar na pedaleira** se é mesmo sem parâmetros.
*   Próximo módulo na ordem do TYPE: **MIXER (31)** — alvos 215-219: MODE(STEREO/PAN L/R), A LEVEL(0–100), B LEVEL, A/B BALANCE(100:0…0:100), SPREAD(0–100); descrição na pág. 48 do parameter.pdf.
*   **`mixer` (typeId 31)** — 5 parâmetros, ordem do midi.pdf (alvos 215-219) = descrição: mode(STEREO / PAN L/R), levelA(0–100), levelB(0–100), abBalance, spread(0–100). abBalance e spread só aparecem com o DIVIDER em MODE=DUAL.
*   **`abBalance` marcado com `unverified`**: o display mostra "100:0 … 0:100" e nenhum PDF diz a faixa bruta/passo; assumido 0–100 (0 = 100:0). Novo campo de metadado `unverified` (diferente de `pending`, que zera min/max/options — ver harmonist).
*   Próximo módulo na ordem do TYPE: **NOISE SUPPRESSOR (32)** — alvos 201-203: THRESHOLD, RELEASE, DETECT.
*   **`noiseSuppressor` (typeId 32)** — 3 parâmetros, ordem igual nas TRÊS fontes (alvos 201-203 do midi.pdf, descrição e TARGET list): threshold(0–100), release(0–100), detect(INPUT / NS INPUT). Sem pendências.
*   Próximo módulo na ordem do TYPE: **OCTAVE (33)** — alvos 555-557: -2 OCT, -1 OCT, DIRECT LEVEL; descrição na pág. 30.
