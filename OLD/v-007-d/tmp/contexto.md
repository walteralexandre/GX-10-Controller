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
*   **`octave` (typeId 33)** — 3 parâmetros, ordem igual nas TRÊS fontes (alvos 555-557 do midi.pdf, descrição e TARGET list, pág. 30): oct2Down(-2 OCT, 0–100), oct1Down(-1 OCT, 0–100), directLevel(0–100). Sem pendências.
*   **Projeto mudou de pasta em 17/09**: `tmp/walter/v-002` → `tmp/walter/teste` (antes era `tmp/walter/gx10`). Textos extraídos dos PDFs ficam no scratchpad da sessão (midi.txt, param.txt, target.txt, ref.txt) — reextrair com pypdf se a sessão trocar.
*   Próximo módulo na ordem do TYPE: **OCTAVE POLY (34)** — alvos 558-560: RANGE, OCTAVE LEVEL, DIRECT LEVEL; descrição "POLY OCTAVE" na pág. 30.
*   **`octavePoly` (typeId 34)** — 3 parâmetros, ordem igual nas TRÊS fontes (alvos 558-560 do midi.pdf, descrição e TARGET list, pág. 30): range(0–100), octaveLevel(0–100), directLevel(0–100). Nome "POLY OCTAVE" no parameter.pdf, "OCTAVE POLY" na lista de TYPE. Funciona com acordes (polifônico), ao contrário do `octave`.
*   Próximo módulo na ordem do TYPE: **OCTAVE BASS (35)** — alvos 561-563: -2 OCT, -1 OCT, DIRECT LEVEL; descrição "BASS OCTAVE" na pág. 62.
*   **`octaveBass` (typeId 35)** — 3 parâmetros, estrutura idêntica ao `octave`: oct2Down, oct1Down, directLevel (todos 0–100). Ordem igual nas TRÊS fontes (alvos 561-563 do midi.pdf, descrição pág. 62 "BASS OCTAVE" e TARGET list).
*   Próximo módulo na ordem do TYPE: **BOOSTER (36)** — alvos 73-80: TYPE, BOOST, TONE, EFFECT LEVEL, BOTTOM, DIRECT MIX, SOLO SW, SOLO LEVEL; descrição na pág. 5.
*   **`booster` (typeId 36)** — 8 parâmetros, ordem do midi.pdf (alvos 73-80) = descrição (pág. 5): type(MID BOOST, CLEAN BOOST, TREBLE BOOST), boost(0–120), tone(-50…+50), effectLevel(0–100), bottom(-50…+50), directMix(0–100), soloSw(OFF/ON), soloLevel(0–100). O 4º param é "EFFECT LEVEL" no midi.pdf e "LEVEL" na descrição — mesmo parâmetro.
*   Próximo módulo na ordem do TYPE: **OVERDRIVE (37)** — alvos 81-88: TYPE, DRIVE, TONE, EFFECT LEVEL, BOTTOM, DIRECT MIX, SOLO SW, SOLO LEVEL; descrição na pág. 5.
*   **`overdrive` (typeId 37)** — 8 parâmetros, mesma estrutura do `booster` com DRIVE no lugar de BOOST. Ordem do midi.pdf (alvos 81-88) = descrição (pág. 5-6): type(9 opções: NATURAL OD, WARM OD, BLUES OD, OD-1, SD-1, CRUNCH, T-SCREAM, TURBO OD, CENTA OD), drive(0–120), tone(-50…+50), effectLevel(0–100), bottom(-50…+50), directMix(0–100), soloSw, soloLevel.
*   Próximo módulo na ordem do TYPE: **BASS OVERDRIVE (38)** — alvos 89-94: DRIVE, TONE, EFFECT LEVEL, BOTTOM, DIRECT MIX, SOLO SW (atenção: parece NÃO ter TYPE nem SOLO LEVEL — conferir); descrição na pág. 51.
*   **`bassOverdrive` (typeId 38)** — 7 parâmetros: drive(0–120), tone(-50…+50), effectLevel(0–100), bottom(-50…+50), directMix(0–100), soloSw, soloLevel(0–100). **SEM TYPE** (timbre único, com MDP) — essa é a única diferença para o `overdrive`. Ordem igual nas TRÊS fontes (alvos 89-95, descrição pág. 51, TARGET list).
*   CORREÇÃO da nota anterior: eu havia anotado "parece não ter SOLO LEVEL" — ERRADO, o alvo 95 é SOLO LEVEL. Só o TYPE falta mesmo.
*   Próximo módulo na ordem do TYPE: **DISTORTION (39)**; depois BASS DISTORTION (40). Obs.: a ordem da lista de TYPE do midi.pdf é OVERDRIVE, BASS OVERDRIVE, DISTORTION, BASS DISTORTION, FUZZ, BASS FUZZ, X-OD, X-BASS OD, X-DS, METAL, BASS METAL, OVERTONE, PAN, FOOT VOLUME…
*   **`distortion` (typeId 39)** — 8 parâmetros, mesma estrutura do `overdrive`. Ordem dos alvos 132-139 do midi.pdf = descrição (pág. 7): type(8 opções: DIST, DS-1, A-DIST, FAT DS, LEAD DS, RAT, GUV DS, DIST+), dist(0–120), tone(-50…+50), effectLevel(0–100), bottom(-50…+50), directMix(0–100), soloSw, soloLevel. Nomes divergentes: 2º param é "DIST" no MIDI e "DRIVE" na descrição (chave `dist`); 4º é "EFFECT LEVEL"/"LEVEL".
*   Próximo módulo na ordem do TYPE: **BASS DISTORTION (40)** — descrição na pág. 52 (tem TYPE: BASS DS, BASS DI, …).
*   **`bassDistortion` (typeId 40)** — 8 parâmetros, mesma estrutura do `distortion`, mas o 2º param é "DRIVE" também no midi.pdf (chave `drive`), diferente do `distortion` de guitarra que usa "DIST". Ordem dos alvos 140-147 = descrição (pág. 52): type(BASS DS, BASS DI, HI BAND DRIVE), drive(0–120), tone(-50…+50), effectLevel(0–100), bottom(-50…+50), directMix(0–100), soloSw, soloLevel.
*   Próximo módulo na ordem do TYPE: **FUZZ (41)** — descrição na pág. 8; depois BASS FUZZ (42).
*   **`fuzz` (typeId 41)** — 8 parâmetros, mesma estrutura do `distortion`; o 2º param chama-se "FUZZ" nas duas fontes (chave `fuzz`). Ordem dos alvos 148-155 = descrição (pág. 8): type(OCT FUZZ, '60S FUZZ, MUFF FUZZ), fuzz(0–120), tone(-50…+50), effectLevel(0–100), bottom(-50…+50), directMix(0–100), soloSw, soloLevel.
*   Próximo módulo na ordem do TYPE: **BASS FUZZ (42)** — descrição na pág. 53.
*   **`bassFuzz` (typeId 42)** — 7 parâmetros, SEM TYPE: fuzz(0–120), tone(-50…+50), **effectLevel, bottom** (nesta ordem), directMix(0–100), soloSw, soloLevel. **DIVERGÊNCIA resolvida**: a descrição (pág. 53) põe BOTTOM antes do LEVEL; os alvos 156-162 do midi.pdf e o TARGET list põem EFFECT LEVEL antes — seguidas as duas fontes do lado MIDI.
*   Próximo módulo na ordem do TYPE: **X-OD (43)** — descrição "X OVERDRIVE" na pág. 6; depois X-BASS OD (44), X-DS (45).
*   **`xOd` (typeId 43)** — 7 parâmetros, SEM TYPE (overdrive com MDP): drive(0–120), tone(-50…+50), **effectLevel, bottom**, directMix, soloSw, soloLevel. Mesma divergência do `bassFuzz` resolvida a favor do MIDI (alvos 96-102) + TARGET list; a descrição (pág. 6) inverte LEVEL e BOTTOM. Nome "X OVERDRIVE" no parameter.pdf, "X-OD" na lista de TYPE.
*   PADRÃO OBSERVADO: nos efeitos de drive SEM TYPE (bassOverdrive, bassFuzz, xOd), a descrição costuma inverter LEVEL/BOTTOM em relação ao MIDI. Sempre conferir alvos + TARGET list.
*   Próximo módulo na ordem do TYPE: **X-BASS OD (44)** — descrição "X BASS OVERDRIVE" na pág. 52; depois X-DS (45, "X DISTORTION" pág. 7).
*   **`xBassOd` (typeId 44)** — 7 parâmetros, estrutura idêntica ao `xOd`: drive(0–120), tone(-50…+50), effectLevel, bottom, directMix, soloSw, soloLevel. Ordem do MIDI (alvos 103-109) + TARGET list; descrição (pág. 52) inverte LEVEL/BOTTOM — 3ª vez que o padrão se repete. Nome "X BASS OVERDRIVE" no parameter.pdf.
*   Próximo módulo na ordem do TYPE: **X-DS (45)** — descrição "X DISTORTION" na pág. 7; depois METAL (46) e BASS METAL (47).
*   **`xDs` (typeId 45)** — 7 parâmetros, estrutura idêntica ao `xOd`/`xBassOd`: drive(0–120), tone(-50…+50), effectLevel, bottom, directMix, soloSw, soloLevel. Ordem do MIDI (alvos 110-116) + TARGET list; descrição (pág. 7) inverte LEVEL/BOTTOM — 4ª repetição do padrão. Nome "X DISTORTION" no parameter.pdf.
*   Próximo módulo na ordem do TYPE: **METAL (46)** — descrição "METAL DISTORTION" na pág. 8; depois BASS METAL (47), OVERTONE (48).
*   **`metal` (typeId 46)** — 8 parâmetros, mesma estrutura do `distortion`: type(METAL DS, METAL ZONE, HM-2, METAL CORE), dist(0–120), tone(-50…+50), effectLevel(0–100), bottom(-50…+50), directMix(0–100), soloSw, soloLevel. Alvos 117-124. **Aqui a descrição NÃO inverte LEVEL/BOTTOM** — o padrão de inversão vale só para os drives SEM TYPE. Nomes: "METAL DISTORTION" no parameter.pdf, "METAL DIST" na lista de alvos, "METAL" na lista de TYPE.
*   Próximo módulo na ordem do TYPE: **BASS METAL (47)** — descrição "BASS METAL DISTORTION" na pág. 53; depois OVERTONE (48).
*   **`bassMetal` (typeId 47)** — 7 parâmetros, SEM TYPE: dist(0–120), tone(-50…+50), effectLevel, bottom, directMix, soloSw, soloLevel. Ordem do MIDI (alvos 125-131) + TARGET list; descrição (pág. 53) inverte LEVEL/BOTTOM — 5ª repetição, padrão confirmado: drives SEM TYPE invertem na descrição, drives COM TYPE não.
*   **Família drive concluída** (typeIds 36-47): booster, overdrive, bassOverdrive, distortion, bassDistortion, fuzz, bassFuzz, xOd, xBassOd, xDs, metal, bassMetal.
*   Próximo módulo na ordem do TYPE: **OVERTONE (48)** — descrição na pág. 29.
*   **`overtone` (typeId 48)** — 8 parâmetros: lowerLevel, upperLevel, unisonLevel, directLevel, detune (todos 0–100), **outputMode(MONO/STEREO)**, low(-50…+50), high(-50…+50). **DIVERGÊNCIA resolvida**: os alvos 283-290 do midi.pdf e o TARGET list põem OUTPUT MODE antes de LOW/HIGH; a descrição (pág. 29) deixa OUTPUT MODE por último. Seguido o MIDI (2 fontes contra 1). Efeito com MDP.
*   Próximo módulo na ordem do TYPE: **PAN (49)** — descrição na pág. 23.
*   **`pan` (typeId 49)** — 5 parâmetros, todos 0–100 e ordem igual nas TRÊS fontes (alvos 470-474, descrição pág. 23, TARGET list): rate, depth, waveform, effectLevel, directMix. **ATENÇÃO: `waveform` aqui é RANGE 0–100** (formato da curva), não select TRI/SINE como em chorus/flanger/primeChorus. RATE aceita notas BPM (não mapeado).
*   Próximo módulo na ordem do TYPE: **FOOT VOLUME (50)** — descrição na pág. 47.
*   **`footVolume` (typeId 50)** — 4 parâmetros, ordem igual nas TRÊS fontes (alvos 485-488, descrição pág. 47, TARGET list): pedalPosition(0–100), volumeMin(0–100), volumeMax(0–100), curve(SLOW1, SLOW2, NORMAL, FAST). Nome do 4º: "CURVE" no MIDI/TARGET, "VOLUME CURVE" na descrição. Efeito normalmente controlado por pedal de expressão no CTL 2,3/EXP 2.
*   Próximo módulo na ordem do TYPE: **PEDAL BEND (51)** — descrição na pág. 46; depois BASS PEDAL BEND (52), WAH (53), BASS_WAH (54).
*   **`pedalBend` (typeId 51)** — 5 parâmetros, ordem igual nas TRÊS fontes (alvos 475-479, descrição pág. 46, TARGET list): pitchMin(-24…+24 semitons), pitchMax(-24…+24), pedalPosition(0–100), effectLevel(0–100), directMix(0–100). Controlado pelo pedal de expressão da pedaleira ou por pedal no CTL 3,4/EXP 2.
*   Próximo módulo na ordem do TYPE: **BASS PEDAL BEND (52)** — descrição na pág. 64.
*   **`bassPedalBend` (typeId 52)** — 5 parâmetros, estrutura idêntica ao `pedalBend`: pitchMin(-24…+24), pitchMax(-24…+24), pedalPosition(0–100), effectLevel(0–100), directMix(0–100). Ordem igual nas TRÊS fontes (alvos 480-484, descrição pág. 64, TARGET list). Analisa a afinação ⇒ não funciona com acordes.
*   Próximo módulo na ordem do TYPE: **WAH (53)** — descrição na pág. 46; depois BASS_WAH (54).
*   **`wah` (typeId 53)** — 6 parâmetros, ordem igual nas TRÊS fontes (alvos 28-33, descrição pág. 46, TARGET list): wahType(CRY WAH, VO WAH, FAT WAH, LIGHT WAH, 7STRING WAH, RESO WAH), pedalPosition, pedalMin, pedalMax, effectLevel, directMix (todos 0–100). O 1º param chama-se "WAH TYPE" (chave `wahType`), não só "TYPE".
*   Próximo módulo na ordem do TYPE: **BASS_WAH (54)** — descrição "BASS WAH" na pág. 64 (alvos ~34-39, conferir).
*   **`bassWah` (typeId 54)** — 5 parâmetros, todos 0–100, SEM WAH TYPE: pedalPosition, pedalMin, pedalMax, effectLevel, directMix. Ordem do MIDI (alvos 34-38) + TARGET list; a descrição (pág. 64) lista EFFECT LEVEL/DIRECT MIX antes dos de pedal. Nome "BASS_WAH" (com underscore) só na lista de TYPE; nas outras fontes é "BASS WAH".
*   Próximo módulo na ordem do TYPE: **PHASER (55)** — descrição na pág. 17; depois BASS PHASER (56), PRIME PHASER (57), PRIME BASS PHASER (58), SCRIPT PHASER (59).
*   **`phaser` (typeId 55)** — 8 parâmetros, ordem igual nas TRÊS fontes (alvos 568-575, descrição pág. 17-18, TARGET list): stage(4 STAGE, 8 STAGE, 12 STAGE), rate, depth, resonance, manual, stepRate, effectLevel, directMix (todos 0–100).
*   **⚠️ DÚVIDA NOVA sobre STEP RATE** (marcada `unverified` no `phaser`): o PDF lista "OFF, 0–100". No PHASER manda deixar em "OFF" quando não usado; no FLANGER dizia "0". Não dá para saber se OFF = 0 ou se é um valor separado (0 = OFF, 1–101 = 0–100). **A mesma dúvida vale para `stepRate` de `flanger`, `bassFlanger`, `flangerPrime`, `bassFlangerPrime`** — estes NÃO estão marcados como `unverified` (foram feitos antes de eu notar). Confirmar na pedaleira e padronizar.
*   Próximo módulo na ordem do TYPE: **BASS PHASER (56)** — alvos 576-583; descrição na pág. 57.
*   **`bassPhaser` (typeId 56)** — 8 parâmetros, estrutura idêntica ao `phaser` (faixas conferidas na descrição pág. 57, incl. EFFECT LEVEL/DIRECT MIX 0–100): stage, rate, depth, resonance, manual, stepRate (`unverified`, mesma dúvida OFF), effectLevel, directMix. Ordem igual nas TRÊS fontes (alvos 576-583).
*   Próximo módulo na ordem do TYPE: **PRIME PHASER (57)** — alvos 584-598 (tem BI-PHASE, SEPARATION, LOW/HIGH DAMP, LOW/HIGH CUT); descrição na pág. 19.
*   **`primePhaser` (typeId 57)** — 15 parâmetros, ordem do MIDI (alvos 584-598) + TARGET list: stage(**5 opções: 2/4/8/16/24 STAGE**, ≠ phaser), rate, depth, resonance, manual, waveform(TRI/SINE), stepRate(`unverified`), biPhase(OFF/ON), **separation**(0…180 de 15 em 15), lowDamp(-100…0), highDamp(-100…0), lowCut, highCut, effectLevel, directMix. **DIVERGÊNCIA resolvida**: descrição (pág. 19) põe SEPARATION antes do STEP RATE; MIDI + TARGET põem depois do BI-PHASE.
*   Próximo módulo na ordem do TYPE: **PRIME BASS PHASER (58)** — alvos 599-613 como "BASS PRIME PH" (tem BI-PHASE e SEPARATION; conferir se tem WAVEFORM — nos alvos 599-613 aparece WAVEFORM em 604).
*   **`primeBassPhaser` (typeId 58)** — 15 parâmetros, estrutura idêntica ao `primePhaser` (faixas conferidas na descrição pág. 58, STAGE com 5 opções). Ordem do MIDI (alvos 599-613, nome "BASS PRIME PH") + TARGET list ("BASS PRIME PHASER"); descrição repete a divergência do SEPARATION. stepRate `unverified`.
*   Próximo módulo na ordem do TYPE: **SCRIPT PHASER (59)** — alvos 614-617: RATE, DEPTH, EFFECT LEVEL, DIRECT MIX; descrição na pág. 18.
*   **`scriptPhaser` (typeId 59)** — 4 parâmetros, todos 0–100, ordem igual nas TRÊS fontes (alvos 614-617 "SCRIPT PH", descrição pág. 18, TARGET list): rate, depth, effectLevel, directMix. Imita o MXR Phase 90. Sem STEP RATE (logo sem a dúvida do OFF).
*   **Família phaser concluída** (typeIds 55-59): phaser, bassPhaser, primePhaser, primeBassPhaser, scriptPhaser.
*   Próximo módulo na ordem do TYPE: **PITCH SHIFTER (60)** — alvos 618-630; descrição na pág. 27. Depois BASS PITCH SHIFTER (61).
*   **`pitchShifter` (typeId 60)** — 13 parâmetros, ordem dos alvos 618-630 = TARGET list: voice(1 VOICE, 2 MONO, 2 STEREO), directLevel, pitch1(-24…+24), mode1(FAST, MEDIUM, SLOW, MONO), fine1(-50…+50), preDelay1(0–300 ms), level1, **feedback1 (só voz 1)**, pitch2, mode2, fine2, preDelay2, level2. Descrição (pág. 27) embaralha a ordem (FINE antes de MODE, DIRECT LEVEL por último) — ignorada.
*   Próximo módulo na ordem do TYPE: **BASS PITCH SHIFTER (61)** — alvos 631-643 como "BASS PITCH SHIFT"; descrição na pág. 59.
*   **`bassPitchShifter` (typeId 61)** — 13 parâmetros, estrutura idêntica ao `pitchShifter` (faixas conferidas na descrição pág. 59, MODE com as mesmas 4 opções). Ordem dos alvos 631-643 ("BASS PITCH SHIFT") = TARGET list.
*   Próximo módulo na ordem do TYPE: **REVERB (62)** — descrição na pág. 38; depois REVERB PLUS (63), SHIMMER REVERB (64), TERA ECHO (65).
*   **`reverb` (typeId 62)** — 9 parâmetros, ordem dos alvos 372-380 = TARGET list (descrição pág. 38 põe PRE-DELAY depois de DENSITY): type(HALL S, HALL M, PLATE, ROOM, STUDIO), time, preDelay(0–200 ms), effectLevel(0–100), density(1–10), lowCut, highCut, directLevel(0–100), carryover.
*   **3 parâmetros `unverified` no reverb:**
    *   `time`: PDF diz 0.1 s–10.0 s; assumido bruto 1–100 com **novo campo `scale: 0.1`** (primeiro uso de `scale` no projeto — o `preDelay` do chorus/primeChorus, 0–400 = 0.0–40.0 ms, deveria usar o mesmo recurso).
    *   `lowCut`: faixa menor (FLAT, 20 Hz–800 Hz) → helper `reverbLowCutOptions` (0 = FLAT, 1–17).
    *   `highCut`: faixa menor (630 Hz–12.5 kHz, FLAT) → helper `reverbHighCutOptions` (0–13 = 630 Hz…12.5 kHz, 14 = FLAT). Dúvida real: a pedaleira pode manter a numeração da lista completa (15–29).
*   Próximo módulo na ordem do TYPE: **REVERB PLUS (63)** — descrição na pág. 39; alvos a partir de ~381.
*   **`reverbPlus` (typeId 63)** — 17 parâmetros, ordem igual nas TRÊS fontes (alvos 381-397, descrição pág. 39-40, TARGET list): type(7: HALL S, HALL M, PLATE, ROOM S, ROOM L, AMBIENCE, SPRING), time(`unverified`, scale 0.1), tone(-50…+50), effectLevel, density(1–10), preDelay(0–200 ms), lowCut/highCut (**faixa COMPLETA**, lowCutOptions/highCutOptions), **lowDamp/highDamp -50…+50** (≠ -100…0 do flangerPrime/primePhaser), modRate, modDepth, duckSens, duckPre, duckPost, directLevel, carryover.
*   Próximo módulo na ordem do TYPE: **SHIMMER REVERB (64)** — descrição na pág. 40; alvos a partir de 398 ("SHIMMER REV").
*   **`shimmerReverb` (typeId 64)** — 20 parâmetros, SEM TYPE, ordem igual nas TRÊS fontes (alvos 398-417 "SHIMMER REV", descrição pág. 40, TARGET list): time(`unverified`, scale 0.1), tone, effectLevel, density(1–10), preDelay(0–200 ms), lowCut/highCut (faixa completa), lowDamp/highDamp(-50…+50), modRate, modDepth, duckSens, duckPre, duckPost, directLevel, pitch1/pitch2(-24…+24), level1/level2(0–100), carryover. Último offset 0x004F.
*   Próximo módulo na ordem do TYPE: **TERA ECHO (65)** — descrição na pág. 36.
*   **`teraEcho` (typeId 65)** — 8 parâmetros, ordem dos alvos 418-425 = TARGET list: mode(MONO, DIR/EFX, STEREO), spreadTime(0–100), feedback(0–100), effectLevel(0–100), tone(-50…+50), directLevel(0–100), trigger(OFF/ON — sempre gravado OFF na memória), carryover. Descrição (pág. 36) usa outra ordem (MODE no fim, TONE antes de EFFECT LEVEL) — ignorada. Efeito com MDP.
*   **Família reverb/eco concluída** (typeIds 62-65): reverb, reverbPlus, shimmerReverb, teraEcho.
*   Próximo módulo na ordem do TYPE: **RING MODULATOR (66)** — descrição na pág. 24.
*   **`ringModulator` (typeId 66)** — 6 parâmetros, ordem igual nas TRÊS fontes (alvos 644-649 "RING MOD", descrição pág. 24, TARGET list): intelligent(OFF/ON — oscilador segue a nota tocada), frequency, modRate, modDepth, effectLevel, directMix (todos 0–100). MOD RATE aceita notas BPM (não mapeado).
*   Próximo módulo na ordem do TYPE: **ROTARY (67)** — descrição na pág. 20.
*   **`rotary` (typeId 67)** — 10 parâmetros, ordem igual nas TRÊS fontes (alvos 650-659, descrição pág. 20, TARGET list): speedSelect(SLOW/FAST), slowRate, fastRate, effectLevel, riseTime, fallTime, micDistance, **rotorHorn (`unverified`, 100:0…0:100, mesma dúvida do mixer.abBalance)**, drive, directMix (todos 0–100). SLOW/FAST RATE aceitam notas BPM (não mapeado).
*   Próximo módulo na ordem do TYPE: **S-BEND (68)** — descrição na pág. 45; depois BASS S-BEND (69).
*   **`sBend` (typeId 68)** — 4 parâmetros, ordem igual nas TRÊS fontes (alvos 679-682, descrição pág. 45, TARGET list): trigger(OFF/ON, sempre gravado OFF), **pitch (`unverified`)**, riseTime(0–100), fallTime(0–100). Novo helper `sBendPitchOptions`: -3oct, -2oct, -1oct, +1oct, +2oct, +3oct, +4oct (7 opções, SEM zero). Dúvida: bruto = posição 0–6 (assumido) ou número da oitava pulando o 0.
*   Próximo módulo na ordem do TYPE: **BASS S-BEND (69)** — descrição na pág. 63.
*   **`bassSBend` (typeId 69)** — 4 parâmetros, estrutura idêntica ao `sBend` (lista de oitavas conferida na descrição pág. 63): trigger, pitch(`unverified`, sBendPitchOptions), riseTime, fallTime. Ordem igual nas TRÊS fontes (alvos 683-686).
*   Próximo módulo na ordem do TYPE: **SLOW GEAR (70)** — descrição na pág. 43; depois BASS SLOW GEAR (71).
*   **`slowGear` (typeId 70)** — 3 parâmetros, todos 0–100, ordem igual nas TRÊS fontes (alvos 10-12, descrição pág. 43, TARGET list): sens, riseTime, level. O 3º é "LEVEL" no MIDI/TARGET e "EFFECT LEVEL" na descrição (chave `level`).
*   Próximo módulo na ordem do TYPE: **BASS SLOW GEAR (71)** — descrição na pág. 62.
*   **`bassSlowGear` (typeId 71)** — 3 parâmetros, estrutura idêntica ao `slowGear` (sens, riseTime, level — todos 0–100, conferidos na descrição pág. 62). Ordem igual nas TRÊS fontes (alvos 13-15).
*   Próximo módulo na ordem do TYPE: **TOUCH WAH (72)** — descrição na pág. 44; depois BASS TOUCH WAH (73).
*   **`touchWah` (typeId 72)** — 8 parâmetros, ordem dos alvos 39-46 = TARGET list: filterMode(LPF, BPF, HPF), polarity(DOWN/UP), sens, frequency, resonance, decay, effectLevel, directMix (todos 0–100). Descrição (pág. 44) põe EFFECT LEVEL logo após SENS — ignorada. Nome do 1º: "FILTER MODE" no MIDI, "FILTER" na descrição.
*   **NOTA de extração**: o título "TOUCH WAH" não fica no início da linha no param.txt (grep `^TOUCH WAH` falha); está dentro da região da pág. 44 (linhas ~3405-3481, logo após DEFRETTER e antes de AUTO WAH).
*   Próximo módulo na ordem do TYPE: **BASS TOUCH WAH (73)** — alvos 47-54; descrição na pág. 63 (linha ~4967).
*   **`bassTouchWah` (typeId 73)** — 8 parâmetros, ordem dos alvos 47-54 = TARGET list: filterMode, polarity, sens, frequency, resonance, decay, effectLevel, directMix. **DIFERENÇA IMPORTANTE: `filterMode` tem só 2 opções (LPF, BPF)** — o `touchWah` de guitarra tem 3 (LPF, BPF, HPF). Por isso NÃO foi copiado. Descrição (pág. 63) põe EFFECT LEVEL após SENS — ignorada.
*   Próximo módulo na ordem do TYPE: **TREMOLO (74)** — descrição na pág. 23.
*   **`tremolo` (typeId 74)** — 7 parâmetros, ordem igual nas TRÊS fontes (alvos 660-666, descrição pág. 23, TARGET list): rate, depth, **waveform (RANGE 0–100, formato da curva — como no `pan`, NÃO select TRI/SINE)**, effectLevel, trigger(OFF/ON), riseTime, directMix. RATE aceita notas BPM (não mapeado).
*   Próximo módulo na ordem do TYPE: **VIBRATO (75)** — descrição na pág. 21; depois VIBRATO PRIME (76).
*   **`vibrato` (typeId 75)** — 5 parâmetros, ordem dos alvos 667-671 = TARGET list: rate, depth, trigger(OFF/ON), riseTime, effectLevel (todos 0–100 menos trigger). Descrição (pág. 21) lista RISE TIME antes de EFFECT LEVEL/TRIGGER — ignorada. Vibrato = variação de AFINAÇÃO (tremolo = volume). RATE aceita notas BPM (não mapeado).
*   Próximo módulo na ordem do TYPE: **VIBRATO PRIME (76)** — descrição "PRIME VIBRATO" na pág. 22 (tem COLOR).
*   **`vibratoPrime` (typeId 76)** — 7 parâmetros, ordem igual nas TRÊS fontes (alvos 672-678 "PRIME VIB", descrição pág. 22, TARGET list): rate, depth, **color**, effectLevel, trigger, riseTime, **directMix** (todos 0–100 menos trigger). COLOR e DIRECT MIX são o que ele tem a mais que o `vibrato`. Nomes: "PRIME VIBRATO" no parameter.pdf, "VIBRATO PRIME" na lista de TYPE, "PRIME VIB" nos alvos.
*   Próximo módulo na ordem do TYPE: **SEND/RETURN (77)** — descrição na pág. 49.
*   **`sendReturn` (typeId 77)** — 5 parâmetros, ordem igual nas TRÊS fontes (alvos 688-692, descrição pág. 49, TARGET list): mode(NORMAL, DIRECT MIX, BRANCH OUT), **sendLevel(0–200)**, **returnLevel(0–200)**, adjust(0–100), invert(OFF/ON). Níveis até 200 (0x8000…0x80C8) — caso raro no projeto. returnLevel/adjust/invert só valem com MODE = NORMAL ou DIRECT MIX. O 3º é "RET LEVEL" nos alvos e "RETURN LEVEL" nas outras fontes.
*   Próximo módulo na ordem do TYPE: **SLICER (78)** — descrição na pág. 25.
*   **`slicer` (typeId 78)** — 7 parâmetros, ordem igual nas TRÊS fontes (alvos 702-708, descrição pág. 25, TARGET list): **pattern (`unverified`, P1–P20 → assumido 0–19)**, rate, trigger(sempre gravado OFF), effectLevel, attack, **duty(1–99)**, directMix. RATE aceita notas BPM (não mapeado).
*   Próximo módulo na ordem do TYPE: **HUMANIZER (79)** — descrição na pág. 26.
*   **`humanizer` (typeId 79)** — 8 parâmetros, ordem igual nas TRÊS fontes (alvos 709-716, descrição pág. 26, TARGET list): mode(PICKING/AUTO), vowel1, vowel2, sens, rate, depth, manual, level. Novo helper `vowelOptions` (a, e, i, o, u → 0–4). SENS só vale com MODE=PICKING; MANUAL só com AUTO. RATE aceita notas BPM (não mapeado).
*   Próximo módulo na ordem do TYPE: **FEEDBACKER (80)** — descrição na pág. 42.
*   **`feedbacker` (typeId 80)** — 9 parâmetros, ordem igual nas TRÊS fontes (alvos 717-725, descrição pág. 42, TARGET list): mode(NORMAL/OSC), trigger(OFF/ON), depth, riseTime, octRiseTime, feedback, octFeedback, vibRate, vibDepth (todos 0–100). DEPTH só com MODE=NORMAL; os seis últimos só com MODE=OSC.
*   Próximo módulo na ordem do TYPE: **SITAR SIM (81)** — descrição "SITAR SIMULATOR" na pág. 42. Depois: AUTO WAH (82) — ÚLTIMO da lista de TYPE (0-82).
*   **`sitarSim` (typeId 81)** — 7 parâmetros, ordem igual nas TRÊS fontes (alvos 726-732, descrição pág. 42, TARGET list): sens, depth, tone(-50…+50), effectLevel, resonance, buzz, directMix (os demais 0–100).
*   **FALTA APENAS 1 MÓDULO**: **AUTO WAH (typeId 82)** — último da lista de TYPE (0-82); descrição na pág. 44.
*   **`autoWah` (typeId 82)** — 8 parâmetros, ordem igual nas TRÊS fontes (alvos 733-740, descrição pág. 44, TARGET list): filterMode(LPF, BPF, HPF), rate, depth, effectLevel, frequency, resonance, **waveform (SELECT TRI/SINE aqui — no `pan` e no `tremolo` é range 0–100)**, directMix. RATE aceita notas BPM (não mapeado).

---

## ✅ TABELAS DE PARÂMETROS CONCLUÍDAS (2026-09-21)
Todos os 83 tipos de efeito (typeId 0–82) da lista `[MemoryFxItem]` do midi.pdf estão mapeados em `js/gx10.modules.js`.

### O que fica para confirmar na pedaleira (ordem de prioridade)
1.  **Ordem dos parâmetros de `preamp`, `bassPreamp` e `xBassComp`** — ERRADA no arquivo (feitos antes de eu achar a lista numerada do midi.pdf). Correção já descrita acima na seção "FONTE NOVA E DECISIVA".
2.  **`harmonist`/`bassHarmonist`: `harmony1`/`harmony2`** — campo `pending`, sem faixa nem opções (lista de intervalos não existe em nenhum PDF).
3.  **Campos `unverified`** — ver saída do validador; incluem: escala do TIME dos reverbs (`scale: 0.1`), cortes do `reverb` (faixas menores), `mixer.abBalance` e `rotary.rotorHorn` (100:0…0:100), `sBend`/`bassSBend` pitch (7 oitavas sem zero), `slicer.pattern` (P1–P20), `phaser`/`bassPhaser`/`primePhaser`/`primeBassPhaser` stepRate (OFF = 0?).
4.  **stepRate dos 4 flangers** (`flanger`, `bassFlanger`, `flangerPrime`, `bassFlangerPrime`) — mesma dúvida do OFF, mas NÃO estão marcados como `unverified` (pendente padronizar).
5.  **Valores BPM (notas musicais)** — nenhum RATE/TIME/PRE-DELAY com sincronismo está mapeado; codificação não documentada.

### Próximos passos possíveis
*   Rotinas de leitura/escrita SysEx na classe `GX10` (RQ1/DT1 + checksum) e um `test-002-*.html` para ler um Fx Item real — resolve de uma vez os itens 1 a 4 acima.

---

## 6. Comunicação SysEx + página de blocos (2026-09-21)

### `js/gx10.class.js` — novos métodos
Formato confirmado no midi.pdf (coluna direita das págs. 1-2):
*   `RQ1: F0 41 <dev> 00 00 00 00 0B 11 <end 4> <tam 4> <sum> F7`
*   `DT1: F0 41 <dev> 00 00 00 00 0B 12 <end 4> <dados…> <sum> F7`
*   Checksum = `(128 - (soma dos bytes de endereço+dados/tamanho) % 128) % 128`.
Métodos: `setDeviceId/getDeviceId` (padrão 0x10), estáticos `checksum`, `addrAdd` (soma respeitando 7 bits por byte), `sizeBytes`, `MODEL_ID`; instância `buildRQ1`, `buildDT1`, `sendData`, `requestData(end, tam, timeout=1500)` → Promise, `onSysEx(cb)`. Campos privados novos: `#deviceId`, `#pendentes`, `#bufferSysEx`, `#onSysExCallback`. O `#handleMidiMessage` agora junta SysEx partido, valida cabeçalho e casa a resposta DT1 com o pedido pelo endereço.
Testado no Node: `RQ1` da cadeia = `F0 41 10 00 00 00 00 0B 11 10 00 0F 0C 00 00 00 32 23 F7`; Fx Item 20 = `10 00 37 00`.

### `test-002-add-remove-blocks.html`
Conecta, lê a cadeia, mostra os blocos em ordem, adiciona e remove. **Só memória temporária.**
*   Cadeia: `10 00 0F 0C`, 50 bytes = CHAIN TOP + CHAIN NEXT ITEM0..48. Byte na pedaleira = id + 1 (byte 0 = -1 = fim).
*   Fx Item N: `10 00 11 00` + (N-1)×0x100 (passo linear de 7 bits; confere com 10 00 13 00 e 10 00 37 00). Lê 3 bytes (TYPE, ON/OFF, DUP).
*   Adicionar: acha um Fx Item fora da cadeia, grava `[typeId, 1]` no início do item e encaixa o id na lista encadeada; grava os 50 bytes de uma vez e relê.
*   Remover: desliga o ponteiro (anterior → próximo), zera o `próximo` do bloco, grava e relê.
*   Lógica da lista validada por simulação no Node (add no começo, add no meio, remove do meio, remove do topo).

### ⚠️ Ainda não testado com a pedaleira real
*   **Mapa dos ids da cadeia**: assumido id 0–19 = Fx Item 1–20. Os ids 20–48 não estão documentados (a página mostra como "bloco fixo, fora dos Fx Item 1-20"). Os bytes crus vão para o log justamente para descobrir isso.
*   Se a GX-10 exigir pausa maior entre DT1s, aumentar os 60 ms de respiro.

### Teste real com a pedaleira (2026-09-21) — o que os bytes provaram
*   **✅ MAPA DOS IDs CONFIRMADO**: id N da cadeia = Fx Item N+1. Cadeia lida do patch do usuário: `topo=1 → 2 → 5 → 6 → 3 → 7 → 8 → 4 → 9 → 10 → 11 → 12 → fim`; tipos `0,36,29,30,31,2,32,2,32,50,4,13,62,0×7` ⇒ Booster, Divider, Preamp, NS, Splitter, Preamp, NS, Mixer, Foot Volume, Chorus, Delay, Reverb. Coerente ⇒ mapa certo.
*   **✅ Escrita em Fx Item FUNCIONA**: ao gravar `[tipo, 1]` em `10 00 11 00`, a pedaleira devolveu sozinha um DT1 em `10 00 11 03` (parâmetros do efeito novo) + DT1s em `00 20 xx xx`.
*   **❌ Escrita nos bytes NEXT ITEM foi recusada** (tanto no bloco de 50 bytes quanto em DT1 de 1 byte): a pedaleira mantém o valor antigo, sem erro.
*   **Convenção descoberta**: blocos FORA da cadeia apontam para SI MESMOS (`next[13]=13`, `next[14]=14`, …), não para -1. Eu gravava -1 ao remover ⇒ provável recusa do bloco inteiro por validação.
*   **Erro meu no 1º diagnóstico**: usei o valor 50, fora da faixa documentada (0–49). Os dois "IGNORADO" daquele diagnóstico NÃO valem.
*   Diagnóstico refeito com 6 testes só com valores válidos: regravar iguais, CHAIN TOP no bloco / sozinho, remoção com auto-ponteiro, troca de ordem (sem add/remove) e `[MemoryEfct]` inteiro (62 bytes em `10 00 0F 00`).

### ✅ Add/remove/reordenar FUNCIONANDO (2026-09-21)
*   A causa da falha era a convenção: bloco fora da cadeia aponta para **si mesmo**, não para -1. Corrigido ⇒ a pedaleira aceita as gravações.
*   **Conjunto Divider/Splitter/Mixer** (tipos 29/30/31): na lista de adição vira UM item "Divider/Mixer"; ao adicionar grava os 3 na ordem Divider > Splitter > Mixer; ao remover qualquer um dos 3, saem os 3 (os efeitos que estavam nos canais continuam na cadeia, em linha). A pedaleira só aceita UM conjunto por cadeia ⇒ a opção é desabilitada quando já existe um.
*   **Arrastar para reordenar**: faixas de soltura entre os blocos. Arrastar um bloco do conjunto move o TRECHO INTEIRO (do Divider ao Mixer, levando os efeitos dos canais); os demais blocos movem-se sozinhos e podem ser soltos dentro de um canal.
*   Gravação da nova ordem: `aplicarOrdem()` regrava topo + ponteiros (último = -1) e relê.
*   Simulado no Node com a cadeia real do usuário: unidade do grupo = `2,5,6,3,7,8,4`; mover para início/fim, mover efeito solto para dentro do canal e remover o conjunto — todos corretos.

---

## 7. `test-003-modulos.html` — parâmetros de cada bloco (2026-09-22)
*   Lê a cadeia (igual ao test-002), lista os blocos; ao clicar num bloco lê `base + 0x03` × (maior paramIndex × 4) bytes num único RQ1 e monta um `<input type="range">` por parâmetro.
*   Conversão: valor = `(n0<<12|n1<<8|n2<<4|n3) - 32768`; escrita = DT1 de 4 nibbles em `base + p.offset`. ON/OFF é DT1 de 1 byte em `base + 0x01`.
*   Envio ao arrastar com limite de ~120 ms entre mensagens + envio final no `change`.
*   `select` vira range pelo índice da opção, mostrando o rótulo à direita; `scale` multiplica na exibição; `unverified` aparece em amarelo; parâmetro sem faixa (`pending`, harmony do harmonist) fica travado mostrando o valor cru.
*   **Validação**: decodificados `midiMin`/`midiMax` dos 726 parâmetros com faixa e comparados com min/max ⇒ 0 erros. Offsets conferidos: todos seguem `0x03 + (paramIndex-1)*4`.

### 🔧 Defeito antigo CORRIGIDO
*   `preDelay` do `chorus` (×3) e do `primeChorus`: `midiMax` era `[08 00 19 00]` (19 não é nibble) ⇒ agora `[08 01 09 00]` (400 = 0x8190). Acrescentado `scale: 0.1` nos quatro, pois 0–400 são décimos de ms (0.0–40.0 ms).
*   Restam 15 parâmetros SEM `midiMin`/`midiMax` (chorus, bassChorus, primeChorus, classicVibe, compressor) — não quebram a página (ela usa min/max), mas seria bom preencher.

### ✅ PREAMP corrigido com base no HARDWARE (2026-09-25)
Teste real na pedaleira confirmou a pendência nº 1 do balanço: a ordem da **lista numerada do midi.pdf / TARGET list** é a certa; a ordem da descrição do parameter.pdf (que os módulos antigos seguiam) está ERRADA.
*   `preamp` e `bassPreamp` reordenados para: TYPE, GAIN, LEVEL, BASS, MIDDLE, TREBLE, PRESENCE, GAIN SW, SOLO SW, SOLO LEVEL, BRIGHT SW, SAG, RESONANCE, DIRECT MIX, SP TYPE, MIC TYPE, MIC DISTANCE, MIC POSITION, MIC LEVEL. `paramIndex` e `offset` renumerados.
*   `xBassComp` reordenado para ATTACK, LEVEL, TONE, RATIO, DIRECT MIX, THRESHOLD (mesma evidência documental; **ainda não testado no hardware**).
*   **Lista TYPE do AIRD PREAMP (hardware ≠ manual)**: os três "X" ficam no FIM, não no meio → …8 X-MODDED, 9 JC-120, 10 TWIN COMBO, 11 DELUXE COMBO, 12 TWEED COMBO, 13 DIAMOND AMP, 14 BRIT STACK, 15 RECTI STACK, 16 MATCH COMBO, 17 BG COMBO, 18 ORNG STACK, 19 BGNR UB METAL, 20 X-ULTRA, 21 X-OPTIMA, 22 X-TITAN.
*   **Lista MIC TYPE (hardware ≠ manual)**: FLAT é o 4, não o último → DYN57, DYN421, CND451, CND87, **FLAT**, RBN121, BLEND A, BLEND B, BLEND C. Corrigida em `preamp` e `bassPreamp`.
*   Validação: 83 módulos, 730 parâmetros, 0 erros (sequência, offset, bytes min/max, nº de opções).

### ⚠️ Lição: o manual erra em ORDEM DE LISTA, não só em ordem de parâmetro
Suspeitar de toda lista `options` longa. Pendentes de conferência no hardware: `spType` do preamp/bassPreamp (30 opções, com USER 1-16), TYPE do `bassPreamp` (9 opções) e as listas dos demais módulos com muitos valores (overdrive 9, distortion 8, reverb 5/7, wah 6…).

### ✅ VARREDURA GERAL DA ORDEM (2026-09-25)
Extraída a lista numerada COMPLETA do midi.pdf (740 alvos, numeração 1–740 sem buracos, cobrindo os 83 efeitos + MASTER/TUNER/N/A) e comparada, por script, com a ordem de TODOS os módulos do `gx10.modules.js`.
*   **Resultado: 82 de 82 módulos com a ordem CERTA.** (`splitter` não tem parâmetros, fica fora.) Ou seja, o problema de ordem existia SÓ em `preamp`, `bassPreamp` e `xBassComp`, já corrigidos.
*   As 4 "divergências" iniciais eram só diferença de escrita do nome, não de ordem: `Rate 1`↔`1:RATE` (chorus/delayPlus), `Level`↔`EFFECT LEVEL` (classicVibe), `Pedal Position`↔`PEDAL POS` (bassWah).
*   Arquivos de apoio no scratchpad: `alvos.txt` (740 alvos) e `mapa.json` (módulo → nome do efeito no midi.pdf). Reextrair com pypdf se a sessão trocar.
*   **17 parâmetros ganharam `midiMin`/`midiMax`** que faltavam (chorus, bassChorus, primeChorus, classicVibe, compressor). Agora: 730 parâmetros, 0 sem bytes, 0 erros; só os 4 `harmony` do harmonist/bassHarmonist seguem sem faixa (pendente de hardware).

### ⚠️ O que a lista numerada NÃO resolve
Ela dá a ordem dos parâmetros, mas **não** o conteúdo das listas de valores (`options`). Os erros de lista do PREAMP (TYPE e MIC TYPE) só apareceram no hardware. Listas longas ainda por conferir: `spType` (30), `bassPreamp.type` (9), `overdrive.type` (9), `distortion.type` (8), `reverbPlus.type` (7), `wah.wahType` (6), `slicer.pattern` (20), `sBend.pitch` (7).

### Rodada de testes no hardware (2026-09-25, test-003)
1.  **"DATA RECEIVING..." no display**: causado pelo envio contínuo enquanto o controle era arrastado (uma mensagem a cada ~120 ms). Agora a página envia **UMA mensagem, só ao soltar** o controle, e não repete se o valor não mudou. **DECISÃO DO USUÁRIO: essa mensagem NUNCA deve aparecer** — a opção de envio contínuo foi REMOVIDA da página (não recriar). Se alguma operação futura exigir rajada de mensagens, ele avisa antes.
2.  **Ordem de EXIBIÇÃO das listas ≠ ordem dos valores MIDI**: a pedaleira mostra TRANSPARENT…X-MODDED, **X-ULTRA, X-OPTIMA, X-TITAN**, JC-120…BGNR UB METAL, mas os valores MIDI desses três são 20, 21, 22. Solução: o array `options` passou a ficar na **ordem de exibição do hardware**, com o `value` correto de cada um; na página o controle anda pelas POSIÇÕES do array e envia `options[pos].value`. Mesma coisa no MIC TYPE (FLAT é o último na tela, mas vale 4) — corrigido em `preamp` e `bassPreamp`.
3.  **`footVolume` estava com a ordem errada** — e aqui a lista numerada do midi.pdf NÃO bate com o hardware (ela põe PEDAL POSITION em 1º; o hardware põe em 4º). Ordem correta confirmada: **VOLUME MIN, VOLUME MAX, CURVE, PEDAL POSITION**. ⚠️ Isso derruba a suposição de que a lista numerada é sempre a ordem da memória: conferir no hardware os outros efeitos com PEDAL POSITION (`wah`, `bassWah`, `pedalBend`, `bassPedalBend`).
4.  **PRE-DELAY do chorus/primeChorus**: passo é 0,5 ms, não 0,1 ⇒ faixa bruta **0–80** com `scale: 0.5` (0,0–40,0 ms). Corrigido nos 4 parâmetros.
5.  **Valores sincronizados ao BPM existem como valores ACIMA da faixa numérica**: no `delay.time`, depois de 2000 ms vêm 18 notas (1/32 … 2/1) ⇒ `max: 2018`, `notesStart: 2001`, `notes: [...]`. Mesma ideia deve valer para todo RATE/TIME/PRE-DELAY com BPM (conferir caso a caso).
6.  **BPM é da MEMÓRIA, não do efeito**: `[MemoryEfct]` em `10 00 0F 02`, 4 nibbles, 400–2500 (40,0–250,0). Aparece agora no topo do painel de qualquer módulo, marcado como `unverified` porque é enviado SEM o deslocamento de 32768 (diferente dos parâmetros de efeito).
7.  **`acGuitarSim` low/high**: o hardware recebe **0–100** e exibe **-50…+50**. Novo campo `displayOffset: -50`. **SUSPEITA DESCARTADA no hardware**: os demais parâmetros "-50–+50" (os vários `tone`) JÁ estavam certos como valor com sinal (bruto 32718…32818). O esquema "bruto 0–100 exibido -50…+50" é exclusivo do `acGuitarSim` (low/high) até segunda ordem. NÃO aplicar `displayOffset` em massa.

### "DATA RECEIVING..." — estado da investigação (2026-09-25)
*   **Fato novo do usuário**: com o **BOSS Tone Studio aberto**, a mensagem NÃO aparece; fechando o BTS, volta a aparecer em qualquer escrita — inclusive num ON/OFF de 1 byte. Logo **não é rajada nem tamanho de mensagem**: é ESTADO da pedaleira.
*   O midi.pdf **não documenta** nada de "editor/remote/connect" (grep sem resultado). É handshake não documentado do BTS.
*   Pistas já vistas no log: ao escrever, a pedaleira envia sozinha DT1s em `00 20 01 40` (241 bytes), `00 20 03 31` (8) e `00 20 00 40` (83) — endereços FORA do mapa documentado. Podem ser o canal de sincronismo que o BTS usa.
*   **Adicionado ao test-003 (experimentos, não solução)**: caixa "modo editor" (RQ1 de 1 byte a cada 500 ms, para testar a hipótese de que basta manter conversa) e caixa "registrar tudo que a pedaleira envia" (com o BTS aberto, aparecem também as respostas dela aos pedidos do BTS — é o caminho para descobrir o que o BTS faz no connect).
*   Próximo passo se o "modo editor" não resolver: abrir a página com o espião ligado, abrir o BTS e capturar o que a pedaleira emite no momento do connect.

### BPM: só nos módulos que o exibem (2026-09-25)
*   Varredura por seção no parameter.pdf: **32 módulos** têm a linha "BPM 40–250" ⇒ ganharam `usesBpm: true`. A página só mostra o controle de BPM nesses.
*   Cuidado tomado: o TWIST parecia ter BPM, mas a linha pertencia à seção seguinte (WARP). Por isso a varredura usa os limites de cada seção, não uma janela fixa de linhas.
*   Lista: analogDelay, autoWah, bassChorus, bassFlanger, bassFlangerPrime, bassHarmonist, bassPhaser, bassPitchShifter, chorus, classicVibe, delay, delayPlus, flanger, flangerPrime, harmonist, humanizer, pan, phaser, pitchShifter, primeBassPhaser, primeChorus, primePhaser, ringModulator, rotary, scriptPhaser, shimmerDelay, slicer, spaceEcho, tremolo, vibrato, vibratoPrime, warp.

### 🔍 Captura do BOSS Tone Studio abrindo (2026-09-25) — endereços NÃO documentados
A página espiã capturou as respostas da pedaleira aos pedidos do BTS. Descobertas:
*   **`7F 00 07 03` = 01** — emitido logo ANTES de o BTS começar a ler o patch. Melhor candidato a **sinalizador de "editor conectado"** (o que silencia o "DATA RECEIVING..."). Implementado na caixa "modo editor" do test-003: escreve 01 ao ligar, 00 ao desligar, e relê para confirmar. **AGUARDANDO TESTE.**
*   Outros candidatos, se esse falhar: `00 00 10 34` = 01 (SystemControl+0x34) e `00 20 00 06` = 01.
*   `7F 00 00 00`=04, `7F 00 00 01`=01, `7F 00 00 02`=00, `7F 00 00 03`=00 — área de sistema/identificação lida pelo BTS no começo.
*   **`50 00 00 00` em diante, blocos de 128 bytes ASCII** = lista de NOMES (38 blocos + 1 de 64 bytes): "Fender Twin", "Vox AC30", "SLICER DRIVE", "HI-GAIN LEAD", "FUSION SOLO"… provavelmente nomes de preset/patch de fábrica.
*   **`60 40 00 00` … `60 4F 00 00`, 12 bytes ASCII cada** = nomes de alto-falante/IR: "JensenP12R", "Gr 1.0 off", "V30 0.0 on", "USER 12"…"USER 16" ⇒ **é a lista do SP TYPE**, incluindo os USER. Útil para rotular `spType` de verdade.
*   `00 20 00 00` (9 bytes), `00 20 00 40` (111), `00 20 01 40` (128), `00 20 02 40` (121), `00 20 03 40` (18) — área não documentada que a pedaleira também emite sozinha quando gravamos algo.
*   `10 00 00 00` (nome do patch em ASCII), `10 00 01 40`, `10 00 02 00`… = blocos do patch temporário (assigns etc.).
*   Confirmado de passagem: `10 00 11 00` … `10 00 37 00` com 131 bytes = os 20 Fx Item, e `10 00 0F 00` com 62 bytes = MemoryEfct. Bate com o que já usamos.
*   **`7F 00 07 03` DESCARTADO** (teste 25/09): a pedaleira **não responde a leitura** nesse endereço (timeout) e escrever 01 ali não tirou o "DATA RECEIVING". Ou seja, na captura aquele byte foi a pedaleira ANUNCIANDO algo, não o eco de uma escrita do BTS.
*   **Próxima hipótese em teste: PORTA MIDI.** A GX-10 costuma expor mais de uma porta USB-MIDI; editores usam uma porta própria, e pode ser que só a porta "comum" mostre o aviso no display. `gx10.class.js` ganhou `listPorts()` e `connect({entradaId, saidaId})`; o test-003 ganhou os seletores de entrada/saída + botão "Listar portas MIDI".
*   **PORTA MIDI DESCARTADA** (teste 25/09): a GX-10 expõe 2 entradas e 2 saídas — `GX-10` e `GX-10 DAW CTRL`. Testadas TODAS as combinações: a mensagem aparece em todas. (A escolha de porta ficou na página, é útil de qualquer forma.)
*   **Hipótese em teste agora: Active Sensing (FE).** O midi.pdf diz que a pedaleira passa a monitorar o intervalo das mensagens depois de receber FE, e que ela própria transmite FE a cada ~250 ms. Um editor mantém esse sinal de vida; sem ele, a pedaleira trata cada SysEx como transferência avulsa e anuncia no display. `gx10.class.js`: `startActiveSensing(250)` / `stopActiveSensing()` (desliga sozinho no `disconnect`). Caixa "sinal de vida (Active Sensing)" no test-003.
*   **ACTIVE SENSING DESCARTADO** (teste 25/09): enviar FE a cada 250 ms não muda nada. Três hipóteses testadas e derrubadas: rajada/tamanho, sinalizador 7F 00 07 03, porta MIDI, Active Sensing.
*   **Estratégia mudou: comparar ESTADO em vez de adivinhar.** Botão "Retrato do estado" no test-003 lê 8 áreas de sistema (SystemCommon 45, SystemControl 102, SystemMidi 21, SystemInOut 13, SystemEfct 2, SystemPitch 7, `00 20 00 00` 9, `00 20 03 40` 18) e imprime em hex. Rodar com o BTS FECHADO e depois com ele ABERTO; o diff mostra o byte que o BTS liga.
*   Se o diff não mostrar nada, o plano B é capturar o tráfego USB do BTS (Wireshark + USBPcap no Windows) — é o único jeito de ver o que o BTS ENVIA, já que a Web MIDI só mostra o que a pedaleira responde.
*   **🎯 ACHADO: o sinalizador é `7F 00 00 01`.** A prova veio do FECHAMENTO do BTS: ao abrir, a pedaleira anunciou `7F 00 00 01 = 01`; ao fechar, anunciou `= 00`. (Eu tinha fixado no `7F 00 07 03`, que é outra coisa.) Os dois "retratos" (com e sem BTS) saíram IDÊNTICOS, confirmando que o estado não vive nas áreas comuns.
*   A área `7F` **não responde a leitura** (RQ1 dá timeout), então não dá para confirmar relendo — a prova é o display.
*   **✅ CONFIRMADO NO HARDWARE (25/09)**: com `7F 00 00 01 = 01` o display fica quieto; com `00` as mensagens voltam; ligando de novo, somem. Testado ligando/desligando várias vezes, com o BTS FECHADO.
*   **Implementado na classe** (vale para todas as páginas): `GX10.EDITOR_MODE_ADDR = [0x7F,0x00,0x00,0x01]`, `setEditorMode(bool)`, `isEditorMode()`. O `connect()` liga sozinho e o `disconnect()` desliga. As páginas 002 e 003 também desligam no `beforeunload` (fechar/recarregar a aba), como o BTS faz ao sair.
*   Mensagens prontas: ligar = `F0 41 10 00 00 00 00 0B 12 7F 00 00 01 01 7F F7`; desligar = `F0 41 10 00 00 00 00 0B 12 7F 00 00 01 00 00 F7`.
*   Hipóteses derrubadas no caminho (para não repetir): rajada/tamanho da mensagem, `7F 00 07 03`, porta MIDI (`GX-10` × `GX-10 DAW CTRL`), Active Sensing.
*   **Como o achado saiu**: comparando o que a pedaleira ANUNCIA ao abrir e ao FECHAR o BTS. O fechamento é o evento mais limpo, porque mexe em um byte só. Guardar essa técnica para outros mistérios.

### Rodada de testes 26/09 — correções aplicadas
1.  **RATIO do `xComp` e `xBassComp`**: o manual listava 14 valores; o hardware tem **18**: 1:1, 1.2:1, 1.4:1, 1.6:1, 1.8:1, 2:1, 2.3:1, 2.6:1, 3:1, 3.5:1, 4:1, 5:1, 6:1, 8:1, 10:1, 12:1, 20:1, INF:1. (Mais uma lista em que o manual erra.)
2.  **Valores de nota (BPM) acrescentados** em 11 parâmetros, sempre logo depois do máximo numérico: `delayPlus` time/time1/time2 (2001+), `analogDelay.time` (1201+), `spaceEcho.time`, `shimmerDelay.time`, `warp.time` (2001+) e `preDelay1`/`preDelay2` do `harmonist` e do `bassHarmonist` (301+). São sempre as MESMAS 18 notas: 1/32 … 2/1.
3.  **STEP RATE**: a lista é **OFF, 0, 1, … 100** ⇒ bruto **0–101**, com `offLabel: "OFF"` no 0 e `displayOffset: -1` no resto. Aplicado nos 4 flangers (confirmados) e nos 4 phasers (mesmo texto de manual, **ainda não testados** — marcados `unverified`).
4.  **HARMONY do `harmonist`/`bassHarmonist`**: a lista real tem **30 valores** (-2oct, -14th … UNISON … +2oct, USER). Saiu o campo `pending`: os 4 parâmetros que estavam travados agora funcionam.
5.  **Escalas do usuário (24 por módulo, 48 no total)**: MIDI vai de **0 a 48** e o display mostra **-24…+24** ⇒ `displayOffset: -24`. Antes eu mandava valor negativo, que é errado (mesmo caso do `acGuitarSim`).
6.  Página: `textoDoValor` entende `offLabel` (rótulo do valor 0).
*   Validação após tudo: 83 módulos, 730 parâmetros, **0 erros** e **0 parâmetros sem faixa** (as 4 harmonias eram as últimas pendências).

### Padrões que já dá para generalizar (confirmados no hardware)
*   Todo parâmetro com sincronismo de BPM tem as 18 notas **logo depois** do máximo numérico.
*   Parâmetro cuja lista começa com OFF ⇒ bruto 0 = OFF e o resto deslocado em 1.
*   Faixas simétricas (-24…+24, -50…+50) podem ser bruto 0..N com deslocamento na exibição — MAS não é regra: os vários `tone` são valor com sinal de verdade. Só confirmar caso a caso.
