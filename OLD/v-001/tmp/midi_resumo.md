# Resumo da Implementação MIDI - BOSS GX-10

Este documento resume as especificações e comandos MIDI mais importantes para o desenvolvimento do app controlador da BOSS GX-10, baseado no documento oficial `midi.pdf`.

---

## 1. Identificação do Dispositivo (Device Inquiry)

Para descobrir e confirmar se um dispositivo conectado é a pedaleira BOSS GX-10, enviamos uma mensagem de **Identity Request**.

*   **Mensagem de Solicitação (Identity Request):**
    `F0 7E <dev> 06 01 F7`
    *   `<dev>`: ID do dispositivo. Usar `7F` (Broadcast, envia para todos) ou `10H` (padrão de fábrica).
*   **Mensagem de Resposta da GX-10 (Identity Reply):**
    `F0 7E <dev> 06 02 41 0B 04 00 00 nn 00 vv 00 F7`
    *   `41H`: ID do fabricante (Roland).
    *   `0B 04`: ID da família do dispositivo (GX-100 / GX-10).
    *   `00 00`: ID do número do membro da família.
    *   `nn`: Nível de revisão de software #1. Para **GX-10**, o valor é `01H` (para GX-100 é `00H`).
    *   `vv`: Nível de revisão de software #3.

---

## 2. Estrutura de Comunicação (SysEx Roland)

A GX-10 utiliza o padrão de mensagens exclusivas de sistema (SysEx) da Roland para leitura e escrita de parâmetros.

*   **ID do Modelo (Model ID):** `00 00 00 00 0B` (5 bytes)
*   **ID do Dispositivo padrão (Device ID):** `10H` (pode ser configurado de `10H` a `1FH`, ou `7FH` para broadcast)

### A. Solicitação de Dados - RQ1 (Request Data 1 - Command ID: `11H`)
Usado para ler valores da pedaleira.
`F0 41 <dev> 00 00 00 00 0B 11 <addr1> <addr2> <addr3> <addr4> <size1> <size2> <size3> <size4> <checksum> F7`

### B. Envio de Dados - DT1 (Data Set 1 - Command ID: `12H`)
Usado para alterar valores na pedaleira ou quando a pedaleira envia dados.
`F0 41 <dev> 00 00 00 00 0B 12 <addr1> <addr2> <addr3> <addr4> <dado1> ... <dadoN> <checksum> F7`

---

## 3. Cálculo do Checksum Roland

O Checksum garante a integridade dos dados enviados em pacotes SysEx (RQ1 e DT1). Ele é calculado a partir dos bytes de **Endereço** e **Tamanho** (para RQ1) ou **Dados** (para DT1).

### Algoritmo de Cálculo:
1.  Some todos os bytes de Endereço e Tamanho/Dados.
2.  Divida o resultado por 128 para obter o resto da divisão (`resto = soma % 128`).
3.  O Checksum será: `checksum = (128 - resto) % 128`.
    *(Se o resto for 0, o checksum é 0)*

---

## 4. Mapa de Endereços SysEx (SysEx Address Map)

A memória da GX-10 é dividida em blocos de endereços representados por 4 bytes (formato de 7 bits, de `00H` a `7FH`).

| Endereço Inicial | Descrição | Bloco |
| :--- | :--- | :--- |
| `00 00 00 00` | Configurações Comuns do Sistema | `[SystemCommon]` |
| `00 00 10 00` | Controles do Sistema | `[SystemControl]` |
| `00 00 30 00` | Configurações MIDI do Sistema | `[SystemMidi]` |
| `00 00 40 00` | Configurações de Entrada/Saída | `[SystemInOut]` |
| `00 00 50 00` | Configurações de Efeitos Globais | `[SystemEfct]` |
| `00 00 60 00` | Afinação (Pitch) global | `[SystemPitch]` |
| `00 00 6B 00` | Equalizador Global | `[SystemGlobalEq]` |
| `10 00 00 00` | Memória Temporária (Patch Ativo) | `[Memory]` (Buffer de edição atual) |
| `20 00 00 00` | Memória do Usuário Patch 1 (U01-1) | `[Memory 1]` |
| `20 06 00 00` | Memória do Usuário Patch 2 (U01-2) | `[Memory 2]` |
| `29 2A 00 00` | Memória do Usuário Patch 200 (U66-3) | `[Memory 200]` |

---

## 5. Endereçamento em Formato de 7 bits

Por especificação do protocolo MIDI, os bytes que compõem endereços, tamanhos e dados nas mensagens SysEx nunca podem ter o bit mais significativo ativo (ou seja, os valores vão apenas de `00H` a `7FH` ou `0` a `127` em decimal).

Por conta disso, ao incrementar valores de endereço, deve-se obedecer ao limite de 128 (`0x80` vira `0x01 00` em representações de múltiplos bytes de 7 bits).
