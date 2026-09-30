/**
 * Tabelas de parâmetros para os módulos de efeitos da BOSS GX-10.
 * Este arquivo define a estrutura, faixas de valores e codificação MIDI para cada módulo.
 * 
 * Vinculado ao objeto global `window.GX10_MODULES` para evitar restrições de CORS em uso local.
 */

(function() {
    // Helper para gerar as opções de frequência (Low Cut e High Cut)
    const FREQUENCIES = [
        "20.0 Hz", "25.0 Hz", "31.5 Hz", "40.0 Hz", "50.0 Hz", "63.0 Hz", "80.0 Hz",
        "100 Hz", "125 Hz", "160 Hz", "200 Hz", "250 Hz", "315 Hz", "400 Hz",
        "500 Hz", "630 Hz", "800 Hz", "1.00 kHz", "1.25 kHz", "1.60 kHz", "2.00 kHz",
        "2.50 kHz", "3.15 kHz", "4.00 kHz", "5.00 kHz", "6.30 kHz", "8.00 kHz",
        "10.0 kHz", "12.5 kHz"
    ];

    const lowCutOptions = [{ value: 0, label: "FLAT" }, ...FREQUENCIES.map((f, i) => ({ value: i + 1, label: f }))];
    const highCutOptions = [...FREQUENCIES.map((f, i) => ({ value: i, label: f })), { value: 29, label: "FLAT" }];

    // Lista de frequências sem FLAT (usada pelos pontos centrais do equalizador paramétrico)
    const freqOptions = FREQUENCIES.map((f, i) => ({ value: i, label: f }));

    // Larguras de banda (Q) do equalizador paramétrico
    const qOptions = [
        { value: 0, label: "0.5" }, { value: 1, label: "1" }, { value: 2, label: "2" },
        { value: 3, label: "4" }, { value: 4, label: "8" }, { value: 5, label: "16" }
    ];

    // Frequências de corte do DIVIDER: 100 Hz a 4.00 kHz (trecho da lista FREQUENCIES)
    const dividerCutoffOptions = FREQUENCIES.slice(7, 24).map((f, i) => ({ value: i, label: f }));

    // Cortes do REVERB: faixas menores que as dos demais efeitos.
    // Low Cut: FLAT, 20.0 Hz–800 Hz (FREQUENCIES[0..16]); High Cut: 630 Hz–12.5 kHz (FREQUENCIES[15..28]), FLAT.
    // Numeração bruta assumida recomeçando do 0 (não documentada — ver campo "unverified" nos parâmetros).
    const reverbLowCutOptions = [{ value: 0, label: "FLAT" }, ...FREQUENCIES.slice(0, 17).map((f, i) => ({ value: i + 1, label: f }))];
    const reverbHighCutOptions = [...FREQUENCIES.slice(15, 29).map((f, i) => ({ value: i, label: f })), { value: 14, label: "FLAT" }];

    // Transposição em oitavas do S-BEND (e BASS S-BEND): -3oct … +4oct, SEM o zero
    const sBendPitchOptions = ["-3oct", "-2oct", "-1oct", "+1oct", "+2oct", "+3oct", "+4oct"].map((l, i) => ({ value: i, label: l }));

    // Vogais do HUMANIZER
    const vowelOptions = ["a", "e", "i", "o", "u"].map((v, i) => ({ value: i, label: v }));

    // Parâmetros de cabeçalho padrão para todos os módulos de efeito
    const commonHeader = {
        onOff: { name: "OnOff", label: "Efeito Ativo (ON/OFF)", offset: 0x0001, type: "select", encoding: "byte", min: 0, max: 1, midiMin: [0x00], midiMax: [0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
        duplicationNumber: { name: "DuplicationNumber", label: "Número de Duplicação", offset: 0x0002, type: "range", encoding: "byte", min: 0, max: 9, midiMin: [0x00], midiMax: [0x09] }
    };

    window.GX10_MODULES_VERSAO = "27/09/2026 13:20";

    window.GX10_MODULES = {
        // =========================================================================
        // 1. MÓDULO: AC GUITAR SIMULATOR (typeId: 0)
        // =========================================================================
        acGuitarSim: {
            id: "acGuitarSim",
            name: "Acoustic Guitar Simulator",
            typeId: 0,
            parameters: {
                ...commonHeader,
                body: { name: "Body", label: "Corpo", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                low: { name: "Low", label: "Grave", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, displayOffset: -50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                high: { name: "High", label: "Agudo", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, displayOffset: -50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level: { name: "Level", label: "Nível", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 2. MÓDULO: AC RESONANCE (typeId: 1)
        // =========================================================================
        acResonance: {
            id: "acResonance",
            name: "Acoustic Resonance",
            typeId: 1,
            parameters: {
                ...commonHeader,
                type: { 
                    name: "Type", label: "Tipo de Ressonância", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "NATURAL" }, { value: 1, label: "WIDE" }, { value: 2, label: "BRIGHT" }]
                },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, default: 0, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                level: { name: "Level", label: "Nível", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 3. MÓDULO: AIRD PREAMP (typeId: 2)
        // =========================================================================
        preamp: {
            id: "preamp",
            name: "AIRD Preamp",
            typeId: 2,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Amplificador", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 22, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x06],
                    options: [{ value: 0, label: "TRANSPARENT" }, { value: 1, label: "NATURAL" }, { value: 2, label: "BOUTIQUE" }, { value: 3, label: "SUPREME" }, { value: 4, label: "MAXIMUM" }, { value: 5, label: "JUGGERNAUT" }, { value: 6, label: "X-CRUNCH" }, { value: 7, label: "X-HI GAIN" }, { value: 8, label: "X-MODDED" }, { value: 20, label: "X-ULTRA" }, { value: 21, label: "X-OPTIMA" }, { value: 22, label: "X-TITAN" }, { value: 9, label: "JC-120" }, { value: 10, label: "TWIN COMBO" }, { value: 11, label: "DELUXE COMBO" }, { value: 12, label: "TWEED COMBO" }, { value: 13, label: "DIAMOND AMP" }, { value: 14, label: "BRIT STACK" }, { value: 15, label: "RECTI STACK" }, { value: 16, label: "MATCH COMBO" }, { value: 17, label: "BG COMBO" }, { value: 18, label: "ORNG STACK" }, { value: 19, label: "BGNR UB METAL" }]
                },
                gain: { name: "Gain", label: "Ganho", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 120, default: 60, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                level: { name: "Level", label: "Volume do Preamp", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bass: { name: "Bass", label: "Graves", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                middle: { name: "Middle", label: "Médios", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                treble: { name: "Treble", label: "Agudos", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                presence: { name: "Presence", label: "Presença", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                gainSw: { name: "Gain SW", label: "Chave de Ganho", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "LOW" }, { value: 1, label: "MID" }, { value: 2, label: "HIGH" }] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 9, offset: 0x0023, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                brightSw: { name: "Bright SW", label: "Brilho", paramIndex: 11, offset: 0x002B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                sag: { name: "Sag", label: "Sag", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: -10, max: 10, default: 0, midiMin: [0x07, 0x0F, 0x0F, 0x06], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: -10, max: 10, default: 0, midiMin: [0x07, 0x0F, 0x0F, 0x06], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                directMix: { name: "Direct Mix", label: "Som Direto", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                spType: {
                    name: "Speaker Type", label: "Tipo de Gabinete", paramIndex: 15, offset: 0x003B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D],
                    options: [{ value: 0, label: "OFF" }, { value: 1, label: "ORIGINAL" }, { value: 2, label: "1x8\"" }, { value: 3, label: "1x10\"" }, { value: 4, label: "1x12\"" }, { value: 5, label: "2x12\"" }, { value: 6, label: "4x10\"" }, { value: 7, label: "4x12\"" }, { value: 8, label: "8x12\"" }, { value: 9, label: "B1x15\"" }, { value: 10, label: "B1x18\"" }, { value: 11, label: "B2x15\"" }, { value: 12, label: "B4x10\"" }, { value: 13, label: "B8x10\"" }, ...Array.from({ length: 16 }, (_, i) => ({ value: 14 + i, label: `USER ${i + 1}` }))]
                },
                micType: { name: "Mic Type", label: "Tipo de Mic", paramIndex: 16, offset: 0x003F, type: "select", encoding: "nibbles", min: 0, max: 8, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x08], options: [{ value: 0, label: "DYN57" }, { value: 1, label: "DYN421" }, { value: 2, label: "CND451" }, { value: 3, label: "CND87" }, { value: 5, label: "RBN121" }, { value: 6, label: "BLEND A" }, { value: 7, label: "BLEND B" }, { value: 8, label: "BLEND C" }, { value: 4, label: "FLAT" }] },
                micDistance: { name: "Mic Distance", label: "Distância Mic", paramIndex: 17, offset: 0x0043, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "SHORT" }, { value: 1, label: "MEDIUM" }, { value: 2, label: "LONG" }] },
                micPosition: { name: "Mic Position", label: "Posição Mic", paramIndex: 18, offset: 0x0047, type: "select", encoding: "nibbles", min: 0, max: 10, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x0A], options: [{ value: 0, label: "CENTER" }, ...Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `${i + 1} cm` }))] },
                micLevel: { name: "Mic Level", label: "Volume Mic", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 4. MÓDULO: AIRD BASS PREAMP (typeId: 3)
        // =========================================================================
        bassPreamp: {
            id: "bassPreamp",
            name: "AIRD Bass Preamp",
            typeId: 3,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Amplificador", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 8, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x08],
                    options: [{ value: 0, label: "NATURAL BASS" }, { value: 1, label: "X-DRIVE BASS" }, { value: 2, label: "CONCERT" }, { value: 3, label: "STUDIO BASS" }, { value: 4, label: "SILVER TUBE" }, { value: 5, label: "CLASSIC BLUE" }, { value: 6, label: "SOLID STACK" }, { value: 7, label: "FAT TUBE" }, { value: 8, label: "DARK DRV" }]
                },
                gain: { name: "Gain", label: "Ganho", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 120, default: 60, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                level: { name: "Level", label: "Volume do Preamp", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bass: { name: "Bass", label: "Graves", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                middle: { name: "Middle", label: "Médios", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                treble: { name: "Treble", label: "Agudos", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                presence: { name: "Presence", label: "Presença", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                gainSw: { name: "Gain SW", label: "Chave de Ganho", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "LOW" }, { value: 1, label: "MID" }, { value: 2, label: "HIGH" }] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 9, offset: 0x0023, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                brightSw: { name: "Bright SW", label: "Brilho", paramIndex: 11, offset: 0x002B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                sag: { name: "Sag", label: "Sag", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: -10, max: 10, default: 0, midiMin: [0x07, 0x0F, 0x0F, 0x06], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: -10, max: 10, default: 0, midiMin: [0x07, 0x0F, 0x0F, 0x06], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                directMix: { name: "Direct Mix", label: "Som Direto", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                spType: {
                    name: "Speaker Type", label: "Tipo de Gabinete", paramIndex: 15, offset: 0x003B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D],
                    options: [{ value: 0, label: "OFF" }, { value: 1, label: "ORIGINAL" }, { value: 2, label: "1x8\"" }, { value: 3, label: "1x10\"" }, { value: 4, label: "1x12\"" }, { value: 5, label: "2x12\"" }, { value: 6, label: "4x10\"" }, { value: 7, label: "4x12\"" }, { value: 8, label: "8x12\"" }, { value: 9, label: "B1x15\"" }, { value: 10, label: "B1x18\"" }, { value: 11, label: "B2x15\"" }, { value: 12, label: "B4x10\"" }, { value: 13, label: "B8x10\"" }, ...Array.from({ length: 16 }, (_, i) => ({ value: 14 + i, label: `USER ${i + 1}` }))]
                },
                micType: { name: "Mic Type", label: "Tipo de Mic", paramIndex: 16, offset: 0x003F, type: "select", encoding: "nibbles", min: 0, max: 8, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x08], options: [{ value: 0, label: "DYN57" }, { value: 1, label: "DYN421" }, { value: 2, label: "CND451" }, { value: 3, label: "CND87" }, { value: 5, label: "RBN121" }, { value: 6, label: "BLEND A" }, { value: 7, label: "BLEND B" }, { value: 8, label: "BLEND C" }, { value: 4, label: "FLAT" }] },
                micDistance: { name: "Mic Distance", label: "Distância Mic", paramIndex: 17, offset: 0x0043, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "SHORT" }, { value: 1, label: "MEDIUM" }, { value: 2, label: "LONG" }] },
                micPosition: { name: "Mic Position", label: "Posição Mic", paramIndex: 18, offset: 0x0047, type: "select", encoding: "nibbles", min: 0, max: 10, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x0A], options: [{ value: 0, label: "CENTER" }, ...Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `${i + 1} cm` }))] },
                micLevel: { name: "Mic Level", label: "Volume Mic", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 5. MÓDULO: CHORUS (typeId: 4)
        // =========================================================================
        chorus: {
            id: "chorus",
            name: "Chorus",
            typeId: 4,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                type: { name: "Type", label: "Modo", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03], options: [{ value: 0, label: "MONO" }, { value: 1, label: "DIR/EFX" }, { value: 2, label: "STEREO" }, { value: 3, label: "DUAL" }] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                rate: { name: "Rate", label: "Taxa", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 40, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                preDelay: { name: "Pre Delay", label: "Atraso", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 80, default: 0, unit: "ms", scale: 0.5, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x05, 0x00] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 9, offset: 0x0023, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                rate1: { name: "Rate 1", label: "Taxa 1", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth1: { name: "Depth 1", label: "Profund. 1", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel1: { name: "Effect Level 1", label: "Nível 1", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay1: { name: "Pre Delay 1", label: "Atraso 1", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 80, unit: "ms", scale: 0.5, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x05, 0x00] },
                waveform1: { name: "Waveform 1", label: "Onda 1", paramIndex: 14, offset: 0x0037, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                lowCut1: { name: "Low Cut 1", label: "Low Cut 1", paramIndex: 15, offset: 0x003B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut1: { name: "High Cut 1", label: "High Cut 1", paramIndex: 16, offset: 0x003F, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                rate2: { name: "Rate 2", label: "Taxa 2", paramIndex: 17, offset: 0x0043, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth2: { name: "Depth 2", label: "Profund. 2", paramIndex: 18, offset: 0x0047, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel2: { name: "Effect Level 2", label: "Nível 2", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay2: { name: "Pre Delay 2", label: "Atraso 2", paramIndex: 20, offset: 0x004F, type: "range", encoding: "nibbles", min: 0, max: 80, unit: "ms", scale: 0.5, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x05, 0x00] },
                waveform2: { name: "Waveform 2", label: "Onda 2", paramIndex: 21, offset: 0x0053, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                lowCut2: { name: "Low Cut 2", label: "Low Cut 2", paramIndex: 22, offset: 0x0057, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut2: { name: "High Cut 2", label: "High Cut 2", paramIndex: 23, offset: 0x005B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                outputMode: { name: "Output Mode", label: "Saída", paramIndex: 24, offset: 0x005F, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "MONO" }, { value: 1, label: "STEREO" }] }
            }
        },

        // =========================================================================
        // 6. MÓDULO: BASS CHORUS (typeId: 5)
        // =========================================================================
        bassChorus: {
            id: "bassChorus",
            name: "Bass Chorus",
            typeId: 5,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                type: { name: "Type", label: "Modo", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "MONO" }, { value: 1, label: "STEREO" }] },
                rate: { name: "Rate", label: "Taxa", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 40, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 7. MÓDULO: PRIME CHORUS (typeId: 6)
        // =========================================================================
        primeChorus: {
            id: "primeChorus",
            name: "Prime Chorus",
            typeId: 6,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, default: 40, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay: { name: "Pre Delay", label: "Atraso (Pre-Delay)", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 80, default: 0, unit: "ms", scale: 0.5, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x05, 0x00] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                sweetness: { name: "Sweetness", label: "Doçura", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bell: { name: "Bell", label: "Brilho (Bell)", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                outputMode: { name: "Output Mode", label: "Saída", paramIndex: 10, offset: 0x0027, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "MONO" }, { value: 1, label: "STEREO" }] }
            }
        },

        // =========================================================================
        // 8. MÓDULO: CLASSIC-VIBE (typeId: 7)
        // =========================================================================
        classicVibe: {
            id: "classicVibe",
            name: "Classic Vibe",
            typeId: 7,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                mode: { name: "Mode", label: "Modo", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "CHORUS" }, { value: 1, label: "VIBRATO" }] },
                rate: { name: "Rate", label: "Taxa", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 40, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 9. MÓDULO: COMPRESSOR (typeId: 8)
        // =========================================================================
        compressor: {
            id: "compressor",
            name: "Compressor",
            typeId: 8,
            parameters: {
                ...commonHeader,
                type: { name: "Type", label: "Tipo de Compressor", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "BOSS COMP" }, { value: 1, label: "D-COMP" }, { value: 2, label: "ORANGE" }] },
                sustain: { name: "Sustain", label: "Sustentação (Sustain)", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                attack: { name: "Attack", label: "Ataque (Attack)", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                tone: { name: "Tone", label: "Tom", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, default: 0, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Mix Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 10. MÓDULO: X-COMPRESSOR (typeId: 9)
        // =========================================================================
        xComp: {
            id: "xComp",
            name: "X-Compressor (MDP)",
            typeId: 9,
            parameters: {
                ...commonHeader,
                attack: { name: "Attack", label: "Ataque (Attack)", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, default: 0, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                ratio: {
                    name: "Ratio", label: "Razão de Compressão", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 17,
                    midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x01],
                    options: [
                        { value: 0, label: "1:1" }, { value: 1, label: "1.2:1" }, { value: 2, label: "1.4:1" }, { value: 3, label: "1.6:1" }, { value: 4, label: "1.8:1" }, { value: 5, label: "2:1" },
                        { value: 6, label: "2.3:1" }, { value: 7, label: "2.6:1" }, { value: 8, label: "3:1" }, { value: 9, label: "3.5:1" }, { value: 10, label: "4:1" }, { value: 11, label: "5:1" },
                        { value: 12, label: "6:1" }, { value: 13, label: "8:1" }, { value: 14, label: "10:1" }, { value: 15, label: "12:1" }, { value: 16, label: "20:1" }, { value: 17, label: "INF:1" }
                    ]
                },
                directMix: { name: "Direct Mix", label: "Mix Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                sustain: { name: "Sustain", label: "Sustentação (Sustain)", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 11. MÓDULO: X-BASS COMPRESSOR (typeId: 10)
        // =========================================================================
        xBassComp: {
            id: "xBassComp",
            name: "X-Bass Compressor (MDP)",
            typeId: 10,
            parameters: {
                ...commonHeader,
                attack: { name: "Attack", label: "Ataque (Attack)", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, default: 0, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                ratio: {
                    name: "Ratio", label: "Razão de Compressão", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 17,
                    midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x01],
                    options: [
                        { value: 0, label: "1:1" }, { value: 1, label: "1.2:1" }, { value: 2, label: "1.4:1" }, { value: 3, label: "1.6:1" }, { value: 4, label: "1.8:1" }, { value: 5, label: "2:1" },
                        { value: 6, label: "2.3:1" }, { value: 7, label: "2.6:1" }, { value: 8, label: "3:1" }, { value: 9, label: "3.5:1" }, { value: 10, label: "4:1" }, { value: 11, label: "5:1" },
                        { value: 12, label: "6:1" }, { value: 13, label: "8:1" }, { value: 14, label: "10:1" }, { value: 15, label: "12:1" }, { value: 16, label: "20:1" }, { value: 17, label: "INF:1" }
                    ]
                },
                directMix: { name: "Direct Mix", label: "Mix Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                threshold: { name: "Threshold", label: "Limiar (Threshold)", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 12. MÓDULO: DEFRETTER (typeId: 11)
        // =========================================================================
        defretter: {
            id: "defretter",
            name: "Defretter (Simulador Fretless)",
            typeId: 11,
            parameters: {
                ...commonHeader,
                sens: { name: "Sens", label: "Sensibilidade de Entrada", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade Harmônica", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                tone: { name: "Tone", label: "Tom (Suavização)", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, default: 0, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                attack: { name: "Attack", label: "Ataque da Palheta", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância do Corpo", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 13. MÓDULO: BASS DEFRETTER (typeId: 12)
        // =========================================================================
        bassDefretter: {
            id: "bassDefretter",
            name: "Bass Defretter (Simulador Fretless)",
            typeId: 12,
            parameters: {
                ...commonHeader,
                sens: { name: "Sens", label: "Sensibilidade de Entrada", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                attack: { name: "Attack", label: "Ataque do Dedo/Palheta", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                tone: { name: "Tone", label: "Tom (Suavização)", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, default: 0, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 14. MÓDULO: DELAY (typeId: 13)
        // =========================================================================
        delay: {
            id: "delay",
            name: "Delay",
            typeId: 13,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                // TIME também aceita valores sincronizados ao BPM (notas musicais), cuja codificação MIDI
                // não está documentada no midi.pdf. Por ora só a faixa em ms (1–2000) está mapeada.
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 1, max: 2018, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0E, 0x02], notesStart: 2001, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                feedback: { name: "Feedback", label: "Repetições (Feedback)", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 15. MÓDULO: DELAY PLUS (typeId: 14)
        // =========================================================================
        // Ordem conforme o TARGET list do parameter.pdf (difere da ordem da descrição do efeito).
        // TIME, 1: TIME e 2: TIME também aceitam valores sincronizados ao BPM (notas musicais),
        // cuja codificação MIDI não está documentada no midi.pdf. Por ora só a faixa em ms (1–2000).
        delayPlus: {
            id: "delayPlus",
            name: "Delay Plus",
            typeId: 14,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Delay", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 5, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x05],
                    options: [{ value: 0, label: "MONO" }, { value: 1, label: "DIR/EFX" }, { value: 2, label: "STEREO" }, { value: 3, label: "PAN" }, { value: 4, label: "REVERSE" }, { value: 5, label: "DUAL" }]
                },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                modRate: { name: "Mod Rate", label: "Taxa de Modulação", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                modDepth: { name: "Mod Depth", label: "Profundidade da Modulação", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckSens: { name: "Duck Sens", label: "Sensibilidade do Ducking", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPre: { name: "Duck Pre", label: "Ducking na Entrada", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPost: { name: "Duck Post", label: "Ducking na Saída", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 1, max: 2018, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0E, 0x02], notesStart: 2001, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                feedback: { name: "Feedback", label: "Repetições (Feedback)", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 12, offset: 0x002F, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                // Visível somente com TYPE = PAN
                tapTime: { name: "Tap Time", label: "Tempo do Canal R (Tap)", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 100, unit: "%", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                // Visível somente com TYPE = REVERSE
                autoTrigger: { name: "Auto Trigger", label: "Disparo Automático", paramIndex: 14, offset: 0x0037, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                // Parâmetros abaixo visíveis somente com TYPE = DUAL
                mode: {
                    name: "Mode", label: "Modo Dual", paramIndex: 15, offset: 0x003B, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "SERIES" }, { value: 1, label: "PARALLEL" }, { value: 2, label: "L/R" }]
                },
                type1: {
                    name: "Type 1", label: "Tipo 1", paramIndex: 16, offset: 0x003F, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03],
                    options: [{ value: 0, label: "MONO" }, { value: 1, label: "PAN" }, { value: 2, label: "ANALOG" }, { value: 3, label: "TAPE" }]
                },
                time1: { name: "Time 1", label: "Tempo 1", paramIndex: 17, offset: 0x0043, type: "range", encoding: "nibbles", min: 1, max: 2018, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0E, 0x02], notesStart: 2001, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                feedback1: { name: "Feedback 1", label: "Repetições 1", paramIndex: 18, offset: 0x0047, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel1: { name: "Effect Level 1", label: "Nível 1", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                highCut1: { name: "High Cut 1", label: "High Cut 1", paramIndex: 20, offset: 0x004F, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                highCut2: { name: "High Cut 2", label: "High Cut 2", paramIndex: 21, offset: 0x0053, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                type2: {
                    name: "Type 2", label: "Tipo 2", paramIndex: 22, offset: 0x0057, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03],
                    options: [{ value: 0, label: "MONO" }, { value: 1, label: "PAN" }, { value: 2, label: "ANALOG" }, { value: 3, label: "TAPE" }]
                },
                time2: { name: "Time 2", label: "Tempo 2", paramIndex: 23, offset: 0x005B, type: "range", encoding: "nibbles", min: 1, max: 2018, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0E, 0x02], notesStart: 2001, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                feedback2: { name: "Feedback 2", label: "Repetições 2", paramIndex: 24, offset: 0x005F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel2: { name: "Effect Level 2", label: "Nível 2", paramIndex: 25, offset: 0x0063, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] }
            }
        },

        // =========================================================================
        // 16. MÓDULO: ANALOG DELAY (typeId: 15)
        // =========================================================================
        // TIME também aceita valores sincronizados ao BPM (notas musicais), cuja codificação MIDI
        // não está documentada no midi.pdf. Por ora só a faixa em ms (12–1200) está mapeada.
        analogDelay: {
            id: "analogDelay",
            name: "Analog Delay",
            typeId: 15,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                type: { name: "Type", label: "Tipo de Delay", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "MONO" }, { value: 1, label: "DIR/EFX" }] },
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 12, max: 1218, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x0C], midiMax: [0x08, 0x04, 0x0C, 0x02], notesStart: 1201, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                feedback: { name: "Feedback", label: "Repetições (Feedback)", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                modRate: { name: "Mod Rate", label: "Taxa de Modulação", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                modDepth: { name: "Mod Depth", label: "Profundidade da Modulação", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckSens: { name: "Duck Sens", label: "Sensibilidade do Ducking", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPre: { name: "Duck Pre", label: "Ducking na Entrada", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPost: { name: "Duck Post", label: "Ducking na Saída", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 12, offset: 0x002F, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 17. MÓDULO: SPACE ECHO (typeId: 16)
        // =========================================================================
        // TIME também aceita valores sincronizados ao BPM (notas musicais), cuja codificação MIDI
        // não está documentada no midi.pdf. Por ora só a faixa em ms (1–2000) está mapeada.
        spaceEcho: {
            id: "spaceEcho",
            name: "Space Echo",
            typeId: 16,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 1, max: 2018, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0E, 0x02], notesStart: 2001, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                feedback: { name: "Feedback", label: "Repetições (Feedback)", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                modRate: { name: "Mod Rate", label: "Taxa de Modulação", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                modDepth: { name: "Mod Depth", label: "Profundidade da Modulação", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckSens: { name: "Duck Sens", label: "Sensibilidade do Ducking", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPre: { name: "Duck Pre", label: "Ducking na Entrada", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPost: { name: "Duck Post", label: "Ducking na Saída", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                head: {
                    name: "Head", label: "Cabeças de Reprodução", paramIndex: 11, offset: 0x002B, type: "select", encoding: "nibbles", min: 0, max: 4, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x04],
                    options: [{ value: 0, label: "1" }, { value: 1, label: "1+2" }, { value: 2, label: "1+3" }, { value: 3, label: "2+3" }, { value: 4, label: "1+2+3" }]
                },
                wowFlutter: { name: "Wow & Flutter", label: "Oscilação da Fita (Wow & Flutter)", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 13, offset: 0x0033, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 18. MÓDULO: SHIMMER DELAY (typeId: 17)
        // =========================================================================
        // TIME também aceita valores sincronizados ao BPM (notas musicais), cuja codificação MIDI
        // não está documentada no midi.pdf. Por ora só a faixa em ms (1–2000) está mapeada.
        shimmerDelay: {
            id: "shimmerDelay",
            name: "Shimmer Delay",
            typeId: 17,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 1, max: 2018, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0E, 0x02], notesStart: 2001, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                feedback: { name: "Feedback", label: "Repetições (Feedback)", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                modRate: { name: "Mod Rate", label: "Taxa de Modulação", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                modDepth: { name: "Mod Depth", label: "Profundidade da Modulação", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckSens: { name: "Duck Sens", label: "Sensibilidade do Ducking", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPre: { name: "Duck Pre", label: "Ducking na Entrada", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPost: { name: "Duck Post", label: "Ducking na Saída", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pitch: { name: "Pitch", label: "Transposição (Pitch)", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                pitchBalance: { name: "Pitch Balance", label: "Balanço do Pitch", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pitchFeedback: { name: "Pitch Feedback", label: "Repetições do Pitch", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 14, offset: 0x0037, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 19. MÓDULO: TWIST (typeId: 18)
        // =========================================================================
        twist: {
            id: "twist",
            name: "Twist",
            typeId: 18,
            parameters: {
                ...commonHeader,
                mode: {
                    name: "Mode", label: "Modo", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01],
                    options: [{ value: 0, label: "RISE→FALL" }, { value: 1, label: "RISE→FADE" }]
                },
                trigger: { name: "Trigger", label: "Disparo (Trigger)", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                riseTime: { name: "Rise Time", label: "Tempo de Subida", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                // Visível somente com MODE = RISE→FALL
                fallTime: { name: "Fall Time", label: "Tempo de Parada", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                // Visível somente com MODE = RISE→FADE
                fadeTime: { name: "Fade Time", label: "Tempo de Fade Out", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 20. MÓDULO: WARP (typeId: 19)
        // =========================================================================
        // TIME também aceita valores sincronizados ao BPM (notas musicais), cuja codificação MIDI
        // não está documentada no midi.pdf. Por ora só a faixa em ms (1–2000) está mapeada.
        warp: {
            id: "warp",
            name: "Warp",
            typeId: 19,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 1, max: 2018, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0E, 0x02], notesStart: 2001, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                trigger: { name: "Trigger", label: "Disparo (Trigger)", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 21. MÓDULO: PARAMETRIC EQUALIZER (typeId: 20)
        // =========================================================================
        // Faixas de Q (0.5, 1, 2, 4, 8, 16) e a lista de 29 frequências foram confirmadas
        // na tabela [SystemGlobalEq] do midi.pdf.
        parametricEq: {
            id: "parametricEq",
            name: "Parametric Equalizer",
            typeId: 20,
            parameters: {
                ...commonHeader,
                lowGain: { name: "Low Gain", label: "Ganho dos Graves", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                highGain: { name: "High Gain", label: "Ganho dos Agudos", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                level: { name: "Level", label: "Volume do Equalizador", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                lowMidFreq: { name: "Low-Mid Freq", label: "Frequência dos Médios-Graves", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 28, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0C], options: freqOptions },
                lowMidQ: { name: "Low-Mid Q", label: "Largura de Banda dos Médios-Graves", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 5, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x05], options: qOptions },
                lowMidGain: { name: "Low-Mid Gain", label: "Ganho dos Médios-Graves", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                highMidFreq: { name: "High-Mid Freq", label: "Frequência dos Médios-Agudos", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 28, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0C], options: freqOptions },
                highMidQ: { name: "High-Mid Q", label: "Largura de Banda dos Médios-Agudos", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 5, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x05], options: qOptions },
                highMidGain: { name: "High-Mid Gain", label: "Ganho dos Médios-Agudos", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 10, offset: 0x0027, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 11, offset: 0x002B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions }
            }
        },

        // =========================================================================
        // 22. MÓDULO: GRAPHIC EQUALIZER (typeId: 21)
        // =========================================================================
        // 10 bandas fixas + LEVEL, todos -20…+20 dB. Ordem confirmada na lista numerada
        // do midi.pdf (alvos 231-241) e na descrição do parameter.pdf.
        graphicEq: {
            id: "graphicEq",
            name: "Graphic Equalizer",
            typeId: 21,
            parameters: {
                ...commonHeader,
                gain31_5: { name: "31.5 Hz", label: "Banda 31.5 Hz", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                gain63: { name: "63 Hz", label: "Banda 63 Hz", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                gain125: { name: "125 Hz", label: "Banda 125 Hz", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                gain250: { name: "250 Hz", label: "Banda 250 Hz", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                gain500: { name: "500 Hz", label: "Banda 500 Hz", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                gain1k: { name: "1 kHz", label: "Banda 1 kHz", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                gain2k: { name: "2 kHz", label: "Banda 2 kHz", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                gain4k: { name: "4 kHz", label: "Banda 4 kHz", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                gain8k: { name: "8 kHz", label: "Banda 8 kHz", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                gain16k: { name: "16 kHz", label: "Banda 16 kHz", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] },
                level: { name: "Level", label: "Volume do Equalizador", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -20, max: 20, unit: "dB", midiMin: [0x07, 0x0F, 0x0E, 0x0C], midiMax: [0x08, 0x00, 0x01, 0x04] }
            }
        },

        // =========================================================================
        // 23. MÓDULO: FLANGER (typeId: 22)
        // =========================================================================
        // Ordem conforme a lista numerada do midi.pdf (alvos 426-433), que põe STEP RATE ANTES
        // do LOW CUT — a descrição do parameter.pdf inverte os dois. O TARGET list concorda com o MIDI.
        // RATE e STEP RATE também aceitam valores sincronizados ao BPM (notas musicais), não
        // documentados no midi.pdf. STEP RATE mostra "OFF" no display quando está em 0.
        flanger: {
            id: "flanger",
            name: "Flanger",
            typeId: 22,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                stepRate: { name: "Step Rate", label: "Taxa do Step (0 = OFF)", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 101, displayOffset: -1, offLabel: "OFF", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x05] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 24. MÓDULO: BASS FLANGER (typeId: 23)
        // =========================================================================
        // Mesmos parâmetros do FLANGER. Ordem conforme a lista numerada do midi.pdf
        // (alvos 434-441): STEP RATE vem ANTES do LOW CUT (a descrição do parameter.pdf inverte).
        // RATE e STEP RATE também aceitam notas BPM (não documentadas no midi.pdf).
        // STEP RATE mostra "OFF" no display quando está em 0.
        bassFlanger: {
            id: "bassFlanger",
            name: "Bass Flanger",
            typeId: 23,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                stepRate: { name: "Step Rate", label: "Taxa do Step (0 = OFF)", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 101, displayOffset: -1, offLabel: "OFF", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x05] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 25. MÓDULO: FLANGER PRIME (typeId: 24)
        // =========================================================================
        // No parameter.pdf o efeito chama-se "PRIME FLANGER"; na lista de TYPE do midi.pdf,
        // "FLANGER PRIME". Ordem conforme a lista numerada do midi.pdf (alvos 442-455),
        // que difere bastante da ordem da descrição.
        // RATE e STEP RATE também aceitam notas BPM (não documentadas no midi.pdf).
        // STEP RATE mostra "OFF" no display quando está em 0.
        flangerPrime: {
            id: "flangerPrime",
            name: "Flanger Prime",
            typeId: 24,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                turbo: { name: "Turbo", label: "Turbo", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                stepRate: { name: "Step Rate", label: "Taxa do Step (0 = OFF)", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 101, displayOffset: -1, offLabel: "OFF", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x05] },
                separation: {
                    name: "Separation", label: "Difusão (Separation)", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 12, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x0C],
                    options: [{ value: 0, label: "0" }, { value: 1, label: "15" }, { value: 2, label: "30" }, { value: 3, label: "45" }, { value: 4, label: "60" }, { value: 5, label: "75" }, { value: 6, label: "90" }, { value: 7, label: "105" }, { value: 8, label: "120" }, { value: 9, label: "135" }, { value: 10, label: "150" }, { value: 11, label: "165" }, { value: 12, label: "180" }]
                },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                lowDamp: { name: "Low Damp", label: "Amortecimento dos Graves", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: -100, max: 0, midiMin: [0x07, 0x0F, 0x09, 0x0C], midiMax: [0x08, 0x00, 0x00, 0x00] },
                highDamp: { name: "High Damp", label: "Amortecimento dos Agudos", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -100, max: 0, midiMin: [0x07, 0x0F, 0x09, 0x0C], midiMax: [0x08, 0x00, 0x00, 0x00] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 13, offset: 0x0033, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 14, offset: 0x0037, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions }
            }
        },

        // =========================================================================
        // 26. MÓDULO: BASS FLANGER PRIME (typeId: 25)
        // =========================================================================
        // Versão para baixo do FLANGER PRIME: mesmos 14 parâmetros, mesmas faixas (conferidas
        // na descrição) e mesma ordem, conforme a lista numerada do midi.pdf (alvos 456-469).
        // No parameter.pdf chama-se "PRIME BASS FLANGER".
        bassFlangerPrime: {
            id: "bassFlangerPrime",
            name: "Bass Flanger Prime",
            typeId: 25,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                turbo: { name: "Turbo", label: "Turbo", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                stepRate: { name: "Step Rate", label: "Taxa do Step (0 = OFF)", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 101, displayOffset: -1, offLabel: "OFF", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x05] },
                separation: {
                    name: "Separation", label: "Difusão (Separation)", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 12, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x0C],
                    options: [{ value: 0, label: "0" }, { value: 1, label: "15" }, { value: 2, label: "30" }, { value: 3, label: "45" }, { value: 4, label: "60" }, { value: 5, label: "75" }, { value: 6, label: "90" }, { value: 7, label: "105" }, { value: 8, label: "120" }, { value: 9, label: "135" }, { value: 10, label: "150" }, { value: 11, label: "165" }, { value: 12, label: "180" }]
                },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                lowDamp: { name: "Low Damp", label: "Amortecimento dos Graves", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: -100, max: 0, midiMin: [0x07, 0x0F, 0x09, 0x0C], midiMax: [0x08, 0x00, 0x00, 0x00] },
                highDamp: { name: "High Damp", label: "Amortecimento dos Agudos", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -100, max: 0, midiMin: [0x07, 0x0F, 0x09, 0x0C], midiMax: [0x08, 0x00, 0x00, 0x00] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 13, offset: 0x0033, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 14, offset: 0x0037, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions }
            }
        },

        // =========================================================================
        // 27. MÓDULO: HARMONIST (typeId: 26)
        // =========================================================================
        // Ordem confirmada por TRÊS fontes: lista numerada do midi.pdf (alvos 489-521),
        // TARGET list do parameter.pdf e do reference.pdf. A voz 1 tem FEEDBACK, a voz 2 não.
        // KEY e BPM ficam fora: são parâmetros da memória ([MemoryEfct]), não do efeito.
        // PENDENTE: a lista de intervalos de HARMONY (-2 oct … +2 oct, USER) não consta de
        // nenhum dos três PDFs; confirmar lendo o valor direto da pedaleira.
        harmonist: {
            id: "harmonist",
            name: "Harmonist",
            typeId: 26,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                voice: {
                    name: "Voice", label: "Número de Vozes", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "1 VOICE" }, { value: 1, label: "2 MONO" }, { value: 2, label: "2 STEREO" }]
                },
                harmony1: { name: "1: Harmony", label: "Intervalo da Voz 1", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: [{ value: 0, label: "-2oct" }, { value: 1, label: "-14th" }, { value: 2, label: "-13th" }, { value: 3, label: "-12th" }, { value: 4, label: "-11th" }, { value: 5, label: "-10th" }, { value: 6, label: "-9th" }, { value: 7, label: "-1oct" }, { value: 8, label: "-7th" }, { value: 9, label: "-6th" }, { value: 10, label: "-5th" }, { value: 11, label: "-4th" }, { value: 12, label: "-3rd" }, { value: 13, label: "-2nd" }, { value: 14, label: "UNISON" }, { value: 15, label: "+2nd" }, { value: 16, label: "+3rd" }, { value: 17, label: "+4th" }, { value: 18, label: "+5th" }, { value: 19, label: "+6th" }, { value: 20, label: "+7th" }, { value: 21, label: "+1oct" }, { value: 22, label: "+9th" }, { value: 23, label: "+10th" }, { value: 24, label: "+11th" }, { value: 25, label: "+12th" }, { value: 26, label: "+13th" }, { value: 27, label: "+14th" }, { value: 28, label: "+2oct" }, { value: 29, label: "USER" }] },
                level1: { name: "1: Level", label: "Volume da Voz 1", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay1: { name: "1: Pre-Delay", label: "Atraso da Voz 1", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 318, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x03, 0x0E], notesStart: 301, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                feedback1: { name: "1: Feedback", label: "Repetições da Voz 1", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                harmony2: { name: "2: Harmony", label: "Intervalo da Voz 2", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: [{ value: 0, label: "-2oct" }, { value: 1, label: "-14th" }, { value: 2, label: "-13th" }, { value: 3, label: "-12th" }, { value: 4, label: "-11th" }, { value: 5, label: "-10th" }, { value: 6, label: "-9th" }, { value: 7, label: "-1oct" }, { value: 8, label: "-7th" }, { value: 9, label: "-6th" }, { value: 10, label: "-5th" }, { value: 11, label: "-4th" }, { value: 12, label: "-3rd" }, { value: 13, label: "-2nd" }, { value: 14, label: "UNISON" }, { value: 15, label: "+2nd" }, { value: 16, label: "+3rd" }, { value: 17, label: "+4th" }, { value: 18, label: "+5th" }, { value: 19, label: "+6th" }, { value: 20, label: "+7th" }, { value: 21, label: "+1oct" }, { value: 22, label: "+9th" }, { value: 23, label: "+10th" }, { value: 24, label: "+11th" }, { value: 25, label: "+12th" }, { value: 26, label: "+13th" }, { value: 27, label: "+14th" }, { value: 28, label: "+2oct" }, { value: 29, label: "USER" }] },
                level2: { name: "2: Level", label: "Volume da Voz 2", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay2: { name: "2: Pre-Delay", label: "Atraso da Voz 2", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 318, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x03, 0x0E], notesStart: 301, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                // Escala do usuário: 12 notas por voz, usadas quando HARMONY = USER
                scale1C: { name: "HR1:C", label: "Escala do Usuário 1 – C", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1DFlat: { name: "HR1:Db", label: "Escala do Usuário 1 – Db", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1D: { name: "HR1:D", label: "Escala do Usuário 1 – D", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1EFlat: { name: "HR1:Eb", label: "Escala do Usuário 1 – Eb", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1E: { name: "HR1:E", label: "Escala do Usuário 1 – E", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1F: { name: "HR1:F", label: "Escala do Usuário 1 – F", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1FSharp: { name: "HR1:F#", label: "Escala do Usuário 1 – F#", paramIndex: 16, offset: 0x003F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1G: { name: "HR1:G", label: "Escala do Usuário 1 – G", paramIndex: 17, offset: 0x0043, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1AFlat: { name: "HR1:Ab", label: "Escala do Usuário 1 – Ab", paramIndex: 18, offset: 0x0047, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1A: { name: "HR1:A", label: "Escala do Usuário 1 – A", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1BFlat: { name: "HR1:Bb", label: "Escala do Usuário 1 – Bb", paramIndex: 20, offset: 0x004F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1B: { name: "HR1:B", label: "Escala do Usuário 1 – B", paramIndex: 21, offset: 0x0053, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2C: { name: "HR2:C", label: "Escala do Usuário 2 – C", paramIndex: 22, offset: 0x0057, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2DFlat: { name: "HR2:Db", label: "Escala do Usuário 2 – Db", paramIndex: 23, offset: 0x005B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2D: { name: "HR2:D", label: "Escala do Usuário 2 – D", paramIndex: 24, offset: 0x005F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2EFlat: { name: "HR2:Eb", label: "Escala do Usuário 2 – Eb", paramIndex: 25, offset: 0x0063, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2E: { name: "HR2:E", label: "Escala do Usuário 2 – E", paramIndex: 26, offset: 0x0067, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2F: { name: "HR2:F", label: "Escala do Usuário 2 – F", paramIndex: 27, offset: 0x006B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2FSharp: { name: "HR2:F#", label: "Escala do Usuário 2 – F#", paramIndex: 28, offset: 0x006F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2G: { name: "HR2:G", label: "Escala do Usuário 2 – G", paramIndex: 29, offset: 0x0073, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2AFlat: { name: "HR2:Ab", label: "Escala do Usuário 2 – Ab", paramIndex: 30, offset: 0x0077, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2A: { name: "HR2:A", label: "Escala do Usuário 2 – A", paramIndex: 31, offset: 0x007B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2BFlat: { name: "HR2:Bb", label: "Escala do Usuário 2 – Bb", paramIndex: 32, offset: 0x007F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2B: { name: "HR2:B", label: "Escala do Usuário 2 – B", paramIndex: 33, offset: 0x0083, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] }
            }
        },

        // =========================================================================
        // 28. MÓDULO: BASS HARMONIST (typeId: 27)
        // =========================================================================
        // Versão para baixo do HARMONIST: mesmos 33 parâmetros, mesma ordem (lista numerada
        // do midi.pdf, alvos 522-554) e mesmas faixas, conferidas na descrição do parameter.pdf.
        // Mantém as mesmas pendências: lista de intervalos de HARMONY não documentada.
        bassHarmonist: {
            id: "bassHarmonist",
            name: "Bass Harmonist",
            typeId: 27,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                voice: {
                    name: "Voice", label: "Número de Vozes", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "1 VOICE" }, { value: 1, label: "2 MONO" }, { value: 2, label: "2 STEREO" }]
                },
                harmony1: { name: "1: Harmony", label: "Intervalo da Voz 1", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: [{ value: 0, label: "-2oct" }, { value: 1, label: "-14th" }, { value: 2, label: "-13th" }, { value: 3, label: "-12th" }, { value: 4, label: "-11th" }, { value: 5, label: "-10th" }, { value: 6, label: "-9th" }, { value: 7, label: "-1oct" }, { value: 8, label: "-7th" }, { value: 9, label: "-6th" }, { value: 10, label: "-5th" }, { value: 11, label: "-4th" }, { value: 12, label: "-3rd" }, { value: 13, label: "-2nd" }, { value: 14, label: "UNISON" }, { value: 15, label: "+2nd" }, { value: 16, label: "+3rd" }, { value: 17, label: "+4th" }, { value: 18, label: "+5th" }, { value: 19, label: "+6th" }, { value: 20, label: "+7th" }, { value: 21, label: "+1oct" }, { value: 22, label: "+9th" }, { value: 23, label: "+10th" }, { value: 24, label: "+11th" }, { value: 25, label: "+12th" }, { value: 26, label: "+13th" }, { value: 27, label: "+14th" }, { value: 28, label: "+2oct" }, { value: 29, label: "USER" }] },
                level1: { name: "1: Level", label: "Volume da Voz 1", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay1: { name: "1: Pre-Delay", label: "Atraso da Voz 1", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 318, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x03, 0x0E], notesStart: 301, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                feedback1: { name: "1: Feedback", label: "Repetições da Voz 1", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                harmony2: { name: "2: Harmony", label: "Intervalo da Voz 2", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: [{ value: 0, label: "-2oct" }, { value: 1, label: "-14th" }, { value: 2, label: "-13th" }, { value: 3, label: "-12th" }, { value: 4, label: "-11th" }, { value: 5, label: "-10th" }, { value: 6, label: "-9th" }, { value: 7, label: "-1oct" }, { value: 8, label: "-7th" }, { value: 9, label: "-6th" }, { value: 10, label: "-5th" }, { value: 11, label: "-4th" }, { value: 12, label: "-3rd" }, { value: 13, label: "-2nd" }, { value: 14, label: "UNISON" }, { value: 15, label: "+2nd" }, { value: 16, label: "+3rd" }, { value: 17, label: "+4th" }, { value: 18, label: "+5th" }, { value: 19, label: "+6th" }, { value: 20, label: "+7th" }, { value: 21, label: "+1oct" }, { value: 22, label: "+9th" }, { value: 23, label: "+10th" }, { value: 24, label: "+11th" }, { value: 25, label: "+12th" }, { value: 26, label: "+13th" }, { value: 27, label: "+14th" }, { value: 28, label: "+2oct" }, { value: 29, label: "USER" }] },
                level2: { name: "2: Level", label: "Volume da Voz 2", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay2: { name: "2: Pre-Delay", label: "Atraso da Voz 2", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 318, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x03, 0x0E], notesStart: 301, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                // Escala do usuário: 12 notas por voz, usadas quando HARMONY = USER
                scale1C: { name: "HR1:C", label: "Escala do Usuário 1 – C", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1DFlat: { name: "HR1:Db", label: "Escala do Usuário 1 – Db", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1D: { name: "HR1:D", label: "Escala do Usuário 1 – D", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1EFlat: { name: "HR1:Eb", label: "Escala do Usuário 1 – Eb", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1E: { name: "HR1:E", label: "Escala do Usuário 1 – E", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1F: { name: "HR1:F", label: "Escala do Usuário 1 – F", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1FSharp: { name: "HR1:F#", label: "Escala do Usuário 1 – F#", paramIndex: 16, offset: 0x003F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1G: { name: "HR1:G", label: "Escala do Usuário 1 – G", paramIndex: 17, offset: 0x0043, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1AFlat: { name: "HR1:Ab", label: "Escala do Usuário 1 – Ab", paramIndex: 18, offset: 0x0047, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1A: { name: "HR1:A", label: "Escala do Usuário 1 – A", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1BFlat: { name: "HR1:Bb", label: "Escala do Usuário 1 – Bb", paramIndex: 20, offset: 0x004F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale1B: { name: "HR1:B", label: "Escala do Usuário 1 – B", paramIndex: 21, offset: 0x0053, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2C: { name: "HR2:C", label: "Escala do Usuário 2 – C", paramIndex: 22, offset: 0x0057, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2DFlat: { name: "HR2:Db", label: "Escala do Usuário 2 – Db", paramIndex: 23, offset: 0x005B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2D: { name: "HR2:D", label: "Escala do Usuário 2 – D", paramIndex: 24, offset: 0x005F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2EFlat: { name: "HR2:Eb", label: "Escala do Usuário 2 – Eb", paramIndex: 25, offset: 0x0063, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2E: { name: "HR2:E", label: "Escala do Usuário 2 – E", paramIndex: 26, offset: 0x0067, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2F: { name: "HR2:F", label: "Escala do Usuário 2 – F", paramIndex: 27, offset: 0x006B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2FSharp: { name: "HR2:F#", label: "Escala do Usuário 2 – F#", paramIndex: 28, offset: 0x006F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2G: { name: "HR2:G", label: "Escala do Usuário 2 – G", paramIndex: 29, offset: 0x0073, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2AFlat: { name: "HR2:Ab", label: "Escala do Usuário 2 – Ab", paramIndex: 30, offset: 0x0077, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2A: { name: "HR2:A", label: "Escala do Usuário 2 – A", paramIndex: 31, offset: 0x007B, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2BFlat: { name: "HR2:Bb", label: "Escala do Usuário 2 – Bb", paramIndex: 32, offset: 0x007F, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] },
                scale2B: { name: "HR2:B", label: "Escala do Usuário 2 – B", paramIndex: 33, offset: 0x0083, type: "range", encoding: "nibbles", min: 0, max: 48, unit: "semitons", displayOffset: -24, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x03, 0x00] }
            }
        },

        // =========================================================================
        // 29. MÓDULO: PHRASE LOOP (typeId: 28)
        // =========================================================================
        // Efeito mais simples da pedaleira: um único parâmetro (alvo 687 do midi.pdf e mesma
        // entrada no TARGET list). O ON/OFF não aparece nas listas de alvos deste efeito (não é
        // atribuível a footswitch), mas o byte existe na memória, por isso o commonHeader é mantido.
        // Grava até 38 s em mono / 19 s em estéreo e só pode ser inserido uma vez na cadeia.
        phraseLoop: {
            id: "phraseLoop",
            name: "Phrase Loop",
            typeId: 28,
            parameters: {
                ...commonHeader,
                loopLevel: { name: "Loop Level", label: "Volume do Loop", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 30. MÓDULO: DIVIDER (typeId: 29)
        // =========================================================================
        // Ponto da cadeia onde o sinal se divide nos canais A e B (o MIXER, que junta de volta,
        // é um efeito separado). Ordem conforme a lista numerada do midi.pdf (alvos 204-214).
        // CH SELECT e MIX MODE só valem com MODE = SINGLE; os parâmetros A:/B: só com MODE = DUAL.
        divider: {
            id: "divider",
            name: "Divider",
            typeId: 29,
            parameters: {
                ...commonHeader,
                mode: { name: "Mode", label: "Modo", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "SINGLE" }, { value: 1, label: "DUAL" }] },
                chSelect: { name: "Ch Select", label: "Canal Ativo", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "A" }, { value: 1, label: "B" }] },
                mixMode: { name: "Mix Mode", label: "Forma da Troca de Canal", paramIndex: 3, offset: 0x000B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "SWITCH" }, { value: 1, label: "MIX" }] },
                dynamicA: { name: "A: Dynamic", label: "Dinâmica do Canal A", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "OFF" }, { value: 1, label: "POLARITY+" }, { value: 2, label: "POLARITY-" }] },
                dynamicSensA: { name: "A: Dynamic Sens", label: "Sensibilidade do Canal A", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                filterA: { name: "A: Filter", label: "Filtro do Canal A", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "OFF" }, { value: 1, label: "LPF" }, { value: 2, label: "HPF" }] },
                cutoffFreqA: { name: "A: Cutoff Freq", label: "Frequência de Corte do Canal A", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 16, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x00], options: dividerCutoffOptions },
                dynamicB: { name: "B: Dynamic", label: "Dinâmica do Canal B", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "OFF" }, { value: 1, label: "POLARITY+" }, { value: 2, label: "POLARITY-" }] },
                dynamicSensB: { name: "B: Dynamic Sens", label: "Sensibilidade do Canal B", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                filterB: { name: "B: Filter", label: "Filtro do Canal B", paramIndex: 10, offset: 0x0027, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "OFF" }, { value: 1, label: "LPF" }, { value: 2, label: "HPF" }] },
                cutoffFreqB: { name: "B: Cutoff Freq", label: "Frequência de Corte do Canal B", paramIndex: 11, offset: 0x002B, type: "select", encoding: "nibbles", min: 0, max: 16, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x00], options: dividerCutoffOptions }
            }
        },

        // =========================================================================
        // 31. MÓDULO: SPLITTER (typeId: 30)
        // =========================================================================
        // Existe na lista de TYPE do midi.pdf, mas NÃO tem parâmetro algum documentado:
        // não aparece na lista numerada de alvos (entre DIVIDER 204-214 e MIXER 215-219 não há
        // nada) nem tem seção no parameter.pdf ou no reference.pdf. Só o cabeçalho comum.
        // Confirmar na pedaleira se realmente não há parâmetros.
        splitter: {
            id: "splitter",
            name: "Splitter",
            typeId: 30,
            parameters: {
                ...commonHeader
            }
        },

        // =========================================================================
        // 32. MÓDULO: MIXER (typeId: 31)
        // =========================================================================
        // Junta de volta os canais A e B abertos pelo DIVIDER. Ordem conforme a lista numerada
        // do midi.pdf (alvos 215-219) e a descrição do parameter.pdf (pág. 48).
        // A/B BALANCE e SPREAD só aparecem quando o DIVIDER está em MODE = DUAL.
        mixer: {
            id: "mixer",
            name: "Mixer",
            typeId: 31,
            parameters: {
                ...commonHeader,
                mode: { name: "Mode", label: "Modo de Saída", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "STEREO" }, { value: 1, label: "PAN L/R" }] },
                levelA: { name: "A Level", label: "Volume do Canal A", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                levelB: { name: "B Level", label: "Volume do Canal B", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                abBalance: { name: "A/B Balance", label: "Equilíbrio A/B (100:0 … 0:100)", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04], format: "balance" },
                spread: { name: "Spread", label: "Espalhamento (atraso do canal B)", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 33. MÓDULO: NOISE SUPPRESSOR (typeId: 32)
        // =========================================================================
        // Ordem confirmada por três fontes: lista numerada do midi.pdf (alvos 201-203),
        // descrição e TARGET list do parameter.pdf (pág. 47).
        noiseSuppressor: {
            id: "noiseSuppressor",
            name: "Noise Suppressor",
            typeId: 32,
            parameters: {
                ...commonHeader,
                threshold: { name: "Threshold", label: "Limiar de Corte do Ruído", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                release: { name: "Release", label: "Tempo de Corte (Release)", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                detect: {
                    name: "Detect", label: "Ponto de Medição do Volume", paramIndex: 3, offset: 0x000B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01],
                    options: [{ value: 0, label: "INPUT" }, { value: 1, label: "NS INPUT" }]
                }
            }
        },

        // =========================================================================
        // 34. MÓDULO: OCTAVE (typeId: 33)
        // =========================================================================
        // Ordem confirmada por três fontes: lista numerada do midi.pdf (alvos 555-557),
        // descrição e TARGET list do parameter.pdf (pág. 30).
        octave: {
            id: "octave",
            name: "Octave",
            typeId: 33,
            parameters: {
                ...commonHeader,
                oct2Down: { name: "-2 OCT", label: "Volume 2 Oitavas Abaixo", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                oct1Down: { name: "-1 OCT", label: "Volume 1 Oitava Abaixo", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 35. MÓDULO: OCTAVE POLY (typeId: 34)
        // =========================================================================
        // No parameter.pdf chama-se "POLY OCTAVE"; na lista de TYPE do midi.pdf, "OCTAVE POLY".
        // Diferente do OCTAVE comum, funciona com acordes (entrada polifônica).
        // Ordem confirmada por três fontes: alvos 558-560 do midi.pdf, descrição e TARGET list.
        octavePoly: {
            id: "octavePoly",
            name: "Octave Poly",
            typeId: 34,
            parameters: {
                ...commonHeader,
                range: { name: "Range", label: "Região Afetada", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                octaveLevel: { name: "Octave Level", label: "Volume 1 Oitava Abaixo", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 36. MÓDULO: OCTAVE BASS (typeId: 35)
        // =========================================================================
        // Versão para baixo do OCTAVE: mesmos 3 parâmetros e mesmas faixas, conferidas na
        // descrição (pág. 62, "BASS OCTAVE"). Ordem confirmada por três fontes
        // (alvos 561-563 do midi.pdf, descrição e TARGET list).
        octaveBass: {
            id: "octaveBass",
            name: "Octave Bass",
            typeId: 35,
            parameters: {
                ...commonHeader,
                oct2Down: { name: "-2 OCT", label: "Volume 2 Oitavas Abaixo", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                oct1Down: { name: "-1 OCT", label: "Volume 1 Oitava Abaixo", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 37. MÓDULO: BOOSTER (typeId: 36)
        // =========================================================================
        // Ordem confirmada pela lista numerada do midi.pdf (alvos 73-80) e pela descrição
        // (pág. 5). O 4º parâmetro aparece como "EFFECT LEVEL" no midi.pdf e como "LEVEL"
        // na descrição — é o mesmo parâmetro.
        booster: {
            id: "booster",
            name: "Booster",
            typeId: 36,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Booster", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "MID BOOST" }, { value: 1, label: "CLEAN BOOST" }, { value: 2, label: "TREBLE BOOST" }]
                },
                boost: { name: "Boost", label: "Intensidade do Reforço", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 38. MÓDULO: OVERDRIVE (typeId: 37)
        // =========================================================================
        // Mesma estrutura do BOOSTER, com DRIVE no lugar de BOOST. Ordem confirmada pela lista
        // numerada do midi.pdf (alvos 81-88) e pela descrição (pág. 5-6). O 4º parâmetro é
        // "EFFECT LEVEL" no midi.pdf e "LEVEL" na descrição — mesmo parâmetro.
        overdrive: {
            id: "overdrive",
            name: "Overdrive",
            typeId: 37,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Overdrive", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 8, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x08],
                    options: [{ value: 0, label: "NATURAL OD" }, { value: 1, label: "WARM OD" }, { value: 2, label: "BLUES OD" }, { value: 3, label: "OD-1" }, { value: 4, label: "SD-1" }, { value: 5, label: "CRUNCH" }, { value: 6, label: "T-SCREAM" }, { value: 7, label: "TURBO OD" }, { value: 8, label: "CENTA OD" }]
                },
                drive: { name: "Drive", label: "Intensidade da Distorção", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 39. MÓDULO: BASS OVERDRIVE (typeId: 38)
        // =========================================================================
        // Como o OVERDRIVE, mas SEM o parâmetro TYPE (é um timbre único, com MDP).
        // Ordem confirmada nas TRÊS fontes: alvos 89-95 do midi.pdf, descrição (pág. 51)
        // e TARGET list. O 3º parâmetro é "EFFECT LEVEL" no midi.pdf e "LEVEL" na descrição.
        bassOverdrive: {
            id: "bassOverdrive",
            name: "Bass Overdrive",
            typeId: 38,
            parameters: {
                ...commonHeader,
                drive: { name: "Drive", label: "Intensidade da Distorção", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 40. MÓDULO: DISTORTION (typeId: 39)
        // =========================================================================
        // Mesma estrutura do OVERDRIVE. Ordem confirmada pelos alvos 132-139 do midi.pdf e pela
        // descrição (pág. 7). O 2º parâmetro é "DIST" no midi.pdf e "DRIVE" na descrição;
        // o 4º é "EFFECT LEVEL" no midi.pdf e "LEVEL" na descrição.
        distortion: {
            id: "distortion",
            name: "Distortion",
            typeId: 39,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Distorção", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 7, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x07],
                    options: [{ value: 0, label: "DIST" }, { value: 1, label: "DS-1" }, { value: 2, label: "A-DIST" }, { value: 3, label: "FAT DS" }, { value: 4, label: "LEAD DS" }, { value: 5, label: "RAT" }, { value: 6, label: "GUV DS" }, { value: 7, label: "DIST+" }]
                },
                dist: { name: "Dist", label: "Intensidade da Distorção", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 41. MÓDULO: BASS DISTORTION (typeId: 40)
        // =========================================================================
        // Mesma estrutura do DISTORTION, mas aqui o midi.pdf chama o 2º parâmetro de "DRIVE"
        // (e não "DIST" como no DISTORTION de guitarra). Ordem confirmada pelos alvos 140-147
        // do midi.pdf e pela descrição (pág. 52). O 4º é "EFFECT LEVEL"/"LEVEL".
        bassDistortion: {
            id: "bassDistortion",
            name: "Bass Distortion",
            typeId: 40,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Distorção", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "BASS DS" }, { value: 1, label: "BASS DI" }, { value: 2, label: "HI BAND DRIVE" }]
                },
                drive: { name: "Drive", label: "Intensidade da Distorção", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 42. MÓDULO: FUZZ (typeId: 41)
        // =========================================================================
        // Mesma estrutura do DISTORTION; aqui o 2º parâmetro chama-se "FUZZ" nas duas fontes.
        // Ordem confirmada pelos alvos 148-155 do midi.pdf e pela descrição (pág. 8).
        // O 4º parâmetro é "EFFECT LEVEL" no midi.pdf e "LEVEL" na descrição.
        fuzz: {
            id: "fuzz",
            name: "Fuzz",
            typeId: 41,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Fuzz", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "OCT FUZZ" }, { value: 1, label: "'60S FUZZ" }, { value: 2, label: "MUFF FUZZ" }]
                },
                fuzz: { name: "Fuzz", label: "Intensidade do Fuzz", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 43. MÓDULO: BASS FUZZ (typeId: 42)
        // =========================================================================
        // Como o FUZZ, mas SEM o parâmetro TYPE. Ordem conforme os alvos 156-162 do midi.pdf
        // e o TARGET list, que põem EFFECT LEVEL ANTES do BOTTOM — a descrição (pág. 53)
        // inverte os dois. Duas fontes contra uma; seguida a do MIDI.
        bassFuzz: {
            id: "bassFuzz",
            name: "Bass Fuzz",
            typeId: 42,
            parameters: {
                ...commonHeader,
                fuzz: { name: "Fuzz", label: "Intensidade do Fuzz", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 44. MÓDULO: X-OD (typeId: 43)
        // =========================================================================
        // No parameter.pdf chama-se "X OVERDRIVE" (pág. 6); na lista de TYPE do midi.pdf, "X-OD".
        // Overdrive com MDP, sem parâmetro TYPE. Ordem conforme os alvos 96-102 do midi.pdf e o
        // TARGET list, que põem EFFECT LEVEL ANTES do BOTTOM (a descrição inverte os dois).
        xOd: {
            id: "xOd",
            name: "X-OD",
            typeId: 43,
            parameters: {
                ...commonHeader,
                drive: { name: "Drive", label: "Intensidade da Distorção", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 45. MÓDULO: X-BASS OD (typeId: 44)
        // =========================================================================
        // No parameter.pdf chama-se "X BASS OVERDRIVE" (pág. 52); na lista de TYPE, "X-BASS OD".
        // Versão para baixo do X-OD: mesmos 7 parâmetros, sem TYPE. Ordem conforme os alvos
        // 103-109 do midi.pdf e o TARGET list (EFFECT LEVEL antes do BOTTOM; a descrição inverte).
        xBassOd: {
            id: "xBassOd",
            name: "X-Bass OD",
            typeId: 44,
            parameters: {
                ...commonHeader,
                drive: { name: "Drive", label: "Intensidade da Distorção", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 46. MÓDULO: X-DS (typeId: 45)
        // =========================================================================
        // No parameter.pdf chama-se "X DISTORTION" (pág. 7); na lista de TYPE do midi.pdf, "X-DS".
        // Distorção com MDP, sem parâmetro TYPE. Ordem conforme os alvos 110-116 do midi.pdf e o
        // TARGET list (EFFECT LEVEL antes do BOTTOM; a descrição inverte os dois).
        xDs: {
            id: "xDs",
            name: "X-DS",
            typeId: 45,
            parameters: {
                ...commonHeader,
                drive: { name: "Drive", label: "Intensidade da Distorção", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 47. MÓDULO: METAL (typeId: 46)
        // =========================================================================
        // No parameter.pdf chama-se "METAL DISTORTION" (pág. 8); no midi.pdf, "METAL DIST"
        // na lista de alvos e "METAL" na lista de TYPE. Aqui a descrição NÃO inverte
        // LEVEL/BOTTOM: as duas fontes concordam (alvos 117-124).
        // O 2º parâmetro é "DIST" nas duas fontes.
        metal: {
            id: "metal",
            name: "Metal",
            typeId: 46,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Distorção", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03],
                    options: [{ value: 0, label: "METAL DS" }, { value: 1, label: "METAL ZONE" }, { value: 2, label: "HM-2" }, { value: 3, label: "METAL CORE" }]
                },
                dist: { name: "Dist", label: "Intensidade da Distorção", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 48. MÓDULO: BASS METAL (typeId: 47)
        // =========================================================================
        // Como o METAL, mas SEM o parâmetro TYPE. Nomes: "BASS METAL DISTORTION" no
        // parameter.pdf (pág. 53), "BASS METAL DIST" na lista de alvos, "BASS METAL" na lista
        // de TYPE. Ordem conforme os alvos 125-131 e o TARGET list (EFFECT LEVEL antes do
        // BOTTOM; a descrição inverte os dois, como nos demais drives sem TYPE).
        bassMetal: {
            id: "bassMetal",
            name: "Bass Metal",
            typeId: 47,
            parameters: {
                ...commonHeader,
                dist: { name: "Dist", label: "Intensidade da Distorção", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                tone: { name: "Tone", label: "Tom", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bottom: { name: "Bottom", label: "Corpo dos Graves", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 49. MÓDULO: OVERTONE (typeId: 48)
        // =========================================================================
        // Acrescenta harmônicos usando MDP. Ordem conforme os alvos 283-290 do midi.pdf e o
        // TARGET list, que põem OUTPUT MODE ANTES de LOW/HIGH — a descrição (pág. 29) deixa
        // OUTPUT MODE por último.
        overtone: {
            id: "overtone",
            name: "Overtone",
            typeId: 48,
            parameters: {
                ...commonHeader,
                lowerLevel: { name: "Lower Level", label: "Volume do Harmônico 1 Oitava Abaixo", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                upperLevel: { name: "Upper Level", label: "Volume do Harmônico 1 Oitava Acima", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                unisonLevel: { name: "Unison Level", label: "Volume do Uníssono Desafinado", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                detune: { name: "Detune", label: "Desafinação (Detune)", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                outputMode: { name: "Output Mode", label: "Saída", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "MONO" }, { value: 1, label: "STEREO" }] },
                low: { name: "Low", label: "Graves", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                high: { name: "High", label: "Agudos", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] }
            }
        },

        // =========================================================================
        // 50. MÓDULO: PAN (typeId: 49)
        // =========================================================================
        // Ordem confirmada pelos alvos 470-474 do midi.pdf e pelo TARGET list; a descrição
        // (pág. 23) traz a mesma sequência.
        // ATENÇÃO: aqui WAVEFORM é um valor de 0 a 100 (formato da curva de variação de volume),
        // e NÃO uma escolha TRI/SINE como no chorus, flanger e afins.
        // RATE também aceita notas BPM (não documentadas no midi.pdf).
        pan: {
            id: "pan",
            name: "Pan",
            typeId: 49,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Velocidade do Movimento", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                waveform: { name: "Waveform", label: "Formato da Curva", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 51. MÓDULO: FOOT VOLUME (typeId: 50)
        // =========================================================================
        // Controle de volume, normalmente operado por pedal de expressão ligado ao CTL 2,3/EXP 2.
        // Ordem igual nas três fontes (alvos 485-488 do midi.pdf, descrição pág. 47, TARGET list).
        // O 4º parâmetro é "CURVE" no midi.pdf/TARGET list e "VOLUME CURVE" na descrição.
        footVolume: {
            id: "footVolume",
            name: "Foot Volume",
            typeId: 50,
            parameters: {
                ...commonHeader,
                volumeMin: { name: "Volume Min", label: "Volume com o Pedal no Calcanhar", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                volumeMax: { name: "Volume Max", label: "Volume com o Pedal na Ponta", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                curve: {
                    name: "Curve", label: "Curva do Pedal", paramIndex: 3, offset: 0x000B, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03],
                    options: [{ value: 0, label: "SLOW1" }, { value: 1, label: "SLOW2" }, { value: 2, label: "NORMAL" }, { value: 3, label: "FAST" }]
                },
                pedalPosition: { name: "Pedal Position", label: "Posição do Pedal", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 52. MÓDULO: PEDAL BEND (typeId: 51)
        // =========================================================================
        // Pitch bend controlado pelo pedal de expressão da própria pedaleira ou por um pedal
        // ligado ao CTL 3,4/EXP 2. Ordem igual nas três fontes (alvos 475-479 do midi.pdf,
        // descrição pág. 46, TARGET list).
        pedalBend: {
            id: "pedalBend",
            name: "Pedal Bend",
            typeId: 51,
            parameters: {
                ...commonHeader,
                pitchMin: { name: "Pitch Min", label: "Afinação com o Pedal no Calcanhar", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                pitchMax: { name: "Pitch Max", label: "Afinação com o Pedal na Ponta", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                pedalPosition: { name: "Pedal Position", label: "Posição do Pedal", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 53. MÓDULO: BASS PEDAL BEND (typeId: 52)
        // =========================================================================
        // Versão para baixo do PEDAL BEND: mesmos 5 parâmetros e mesmas faixas, conferidas na
        // descrição (pág. 64). Ordem igual nas três fontes (alvos 480-484, descrição, TARGET list).
        // Como analisa a afinação, não funciona com acordes — só uma nota por vez.
        bassPedalBend: {
            id: "bassPedalBend",
            name: "Bass Pedal Bend",
            typeId: 52,
            parameters: {
                ...commonHeader,
                pitchMin: { name: "Pitch Min", label: "Afinação com o Pedal no Calcanhar", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                pitchMax: { name: "Pitch Max", label: "Afinação com o Pedal na Ponta", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                pedalPosition: { name: "Pedal Position", label: "Posição do Pedal", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 54. MÓDULO: WAH (typeId: 53)
        // =========================================================================
        // Wah controlado por pedal. Ordem igual nas três fontes (alvos 28-33 do midi.pdf,
        // descrição pág. 46, TARGET list). O 1º parâmetro chama-se "WAH TYPE" (e não só "TYPE").
        wah: {
            id: "wah",
            name: "Wah",
            typeId: 53,
            parameters: {
                ...commonHeader,
                wahType: {
                    name: "Wah Type", label: "Tipo de Wah", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 5, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x05],
                    options: [{ value: 0, label: "CRY WAH" }, { value: 1, label: "VO WAH" }, { value: 2, label: "FAT WAH" }, { value: 3, label: "LIGHT WAH" }, { value: 4, label: "7STRING WAH" }, { value: 5, label: "RESO WAH" }]
                },
                pedalPosition: { name: "Pedal Position", label: "Posição do Pedal", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pedalMin: { name: "Pedal Min", label: "Timbre com o Pedal no Calcanhar", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pedalMax: { name: "Pedal Max", label: "Timbre com o Pedal na Ponta", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 55. MÓDULO: BASS_WAH (typeId: 54)
        // =========================================================================
        // Na lista de TYPE do midi.pdf aparece como "BASS_WAH" (com traço baixo); na lista de
        // alvos e no parameter.pdf, "BASS WAH". Wah para baixo, SEM o parâmetro WAH TYPE.
        // Ordem conforme os alvos 34-38 do midi.pdf e o TARGET list; a descrição (pág. 64)
        // lista EFFECT LEVEL e DIRECT MIX antes dos parâmetros de pedal.
        bassWah: {
            id: "bassWah",
            name: "Bass Wah",
            typeId: 54,
            parameters: {
                ...commonHeader,
                pedalPosition: { name: "Pedal Position", label: "Posição do Pedal", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pedalMin: { name: "Pedal Min", label: "Timbre com o Pedal no Calcanhar", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pedalMax: { name: "Pedal Max", label: "Timbre com o Pedal na Ponta", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 56. MÓDULO: PHASER (typeId: 55)
        // =========================================================================
        // Ordem igual nas três fontes (alvos 568-575 do midi.pdf, descrição pág. 17-18,
        // TARGET list). RATE e STEP RATE também aceitam notas BPM (não documentadas no midi.pdf).
        phaser: {
            id: "phaser",
            name: "Phaser",
            typeId: 55,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                stage: {
                    name: "Stage", label: "Número de Estágios", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "4 STAGE" }, { value: 1, label: "8 STAGE" }, { value: 2, label: "12 STAGE" }]
                },
                rate: { name: "Rate", label: "Taxa", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 118, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x06], notesStart: 101, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                stepRate: { name: "Step Rate", label: "Taxa do Step", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 119, displayOffset: -1, offLabel: "OFF", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x07], notesStart: 102, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 57. MÓDULO: BASS PHASER (typeId: 56)
        // =========================================================================
        // Versão para baixo do PHASER: mesmos 8 parâmetros e mesmas faixas, conferidas na
        // descrição (pág. 57). Ordem igual nas três fontes (alvos 576-583, descrição, TARGET list).
        // Herda a mesma dúvida sobre STEP RATE (OFF = 0 ou valor separado?).
        bassPhaser: {
            id: "bassPhaser",
            name: "Bass Phaser",
            typeId: 56,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                stage: {
                    name: "Stage", label: "Número de Estágios", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "4 STAGE" }, { value: 1, label: "8 STAGE" }, { value: 2, label: "12 STAGE" }]
                },
                rate: { name: "Rate", label: "Taxa", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 118, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x06], notesStart: 101, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                stepRate: { name: "Step Rate", label: "Taxa do Step", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 119, displayOffset: -1, offLabel: "OFF", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x07], notesStart: 102, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 58. MÓDULO: PRIME PHASER (typeId: 57)
        // =========================================================================
        // Phaser mais detalhado. Ordem conforme os alvos 584-598 do midi.pdf e o TARGET list,
        // que põem SEPARATION DEPOIS de BI-PHASE — a descrição (pág. 19) põe SEPARATION antes
        // do STEP RATE. Atenção: STAGE aqui tem 5 opções (2/4/8/16/24), diferente do PHASER.
        // RATE e STEP RATE também aceitam notas BPM (não documentadas no midi.pdf).
        primePhaser: {
            id: "primePhaser",
            name: "Prime Phaser",
            typeId: 57,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                stage: {
                    name: "Stage", label: "Número de Estágios", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 4, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x04],
                    options: [{ value: 0, label: "2 STAGE" }, { value: 1, label: "4 STAGE" }, { value: 2, label: "8 STAGE" }, { value: 3, label: "16 STAGE" }, { value: 4, label: "24 STAGE" }]
                },
                rate: { name: "Rate", label: "Taxa", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 118, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x06], notesStart: 101, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                stepRate: { name: "Step Rate", label: "Taxa do Step", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 119, displayOffset: -1, offLabel: "OFF", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x07], notesStart: 102, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                biPhase: { name: "Bi-Phase", label: "Dois Circuitos em Série", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                separation: {
                    name: "Separation", label: "Difusão (Separation)", paramIndex: 9, offset: 0x0023, type: "select", encoding: "nibbles", min: 0, max: 12, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x0C],
                    options: [{ value: 0, label: "0" }, { value: 1, label: "15" }, { value: 2, label: "30" }, { value: 3, label: "45" }, { value: 4, label: "60" }, { value: 5, label: "75" }, { value: 6, label: "90" }, { value: 7, label: "105" }, { value: 8, label: "120" }, { value: 9, label: "135" }, { value: 10, label: "150" }, { value: 11, label: "165" }, { value: 12, label: "180" }]
                },
                lowDamp: { name: "Low Damp", label: "Amortecimento dos Graves", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: -100, max: 0, midiMin: [0x07, 0x0F, 0x09, 0x0C], midiMax: [0x08, 0x00, 0x00, 0x00] },
                highDamp: { name: "High Damp", label: "Amortecimento dos Agudos", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -100, max: 0, midiMin: [0x07, 0x0F, 0x09, 0x0C], midiMax: [0x08, 0x00, 0x00, 0x00] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 12, offset: 0x002F, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 13, offset: 0x0033, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 59. MÓDULO: PRIME BASS PHASER (typeId: 58)
        // =========================================================================
        // Versão para baixo do PRIME PHASER: mesmos 15 parâmetros e mesmas faixas (STAGE com
        // 5 opções), conferidas na descrição (pág. 58). Nomes: "PRIME BASS PHASER" no
        // parameter.pdf, "BASS PRIME PH" na lista de alvos (599-613), "BASS PRIME PHASER" no
        // TARGET list. Ordem do MIDI + TARGET list (SEPARATION depois de BI-PHASE).
        primeBassPhaser: {
            id: "primeBassPhaser",
            name: "Prime Bass Phaser",
            typeId: 58,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                stage: {
                    name: "Stage", label: "Número de Estágios", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 4, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x04],
                    options: [{ value: 0, label: "2 STAGE" }, { value: 1, label: "4 STAGE" }, { value: 2, label: "8 STAGE" }, { value: 3, label: "16 STAGE" }, { value: 4, label: "24 STAGE" }]
                },
                rate: { name: "Rate", label: "Taxa", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 118, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x06], notesStart: 101, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                stepRate: { name: "Step Rate", label: "Taxa do Step", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 119, displayOffset: -1, offLabel: "OFF", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x07], notesStart: 102, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                biPhase: { name: "Bi-Phase", label: "Dois Circuitos em Série", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                separation: {
                    name: "Separation", label: "Difusão (Separation)", paramIndex: 9, offset: 0x0023, type: "select", encoding: "nibbles", min: 0, max: 12, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x0C],
                    options: [{ value: 0, label: "0" }, { value: 1, label: "15" }, { value: 2, label: "30" }, { value: 3, label: "45" }, { value: 4, label: "60" }, { value: 5, label: "75" }, { value: 6, label: "90" }, { value: 7, label: "105" }, { value: 8, label: "120" }, { value: 9, label: "135" }, { value: 10, label: "150" }, { value: 11, label: "165" }, { value: 12, label: "180" }]
                },
                lowDamp: { name: "Low Damp", label: "Amortecimento dos Graves", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: -100, max: 0, midiMin: [0x07, 0x0F, 0x09, 0x0C], midiMax: [0x08, 0x00, 0x00, 0x00] },
                highDamp: { name: "High Damp", label: "Amortecimento dos Agudos", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -100, max: 0, midiMin: [0x07, 0x0F, 0x09, 0x0C], midiMax: [0x08, 0x00, 0x00, 0x00] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 12, offset: 0x002F, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 13, offset: 0x0033, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 60. MÓDULO: SCRIPT PHASER (typeId: 59)
        // =========================================================================
        // Imita o MXR Phase 90 dos anos 70. Ordem igual nas três fontes (alvos 614-617 do
        // midi.pdf como "SCRIPT PH", descrição pág. 18, TARGET list).
        // RATE também aceita notas BPM (não documentadas no midi.pdf).
        scriptPhaser: {
            id: "scriptPhaser",
            name: "Script Phaser",
            typeId: 59,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 118, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x06], notesStart: 101, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 61. MÓDULO: PITCH SHIFTER (typeId: 60)
        // =========================================================================
        // Ordem conforme os alvos 618-630 do midi.pdf e o TARGET list (iguais entre si). A
        // descrição (pág. 27) embaralha: FINE antes de MODE, FEEDBACK antes de LEVEL e
        // DIRECT LEVEL por último. Como no HARMONIST, só a voz 1 tem FEEDBACK.
        // PRE-DELAY também aceita notas BPM (não documentadas no midi.pdf).
        pitchShifter: {
            id: "pitchShifter",
            name: "Pitch Shifter",
            typeId: 60,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                voice: {
                    name: "Voice", label: "Número de Vozes", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "1 VOICE" }, { value: 1, label: "2 MONO" }, { value: 2, label: "2 STEREO" }]
                },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pitch1: { name: "1: Pitch", label: "Transposição da Voz 1", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                mode1: { name: "1: Mode", label: "Resposta da Voz 1", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03], options: [{ value: 0, label: "FAST" }, { value: 1, label: "MEDIUM" }, { value: 2, label: "SLOW" }, { value: 3, label: "MONO" }] },
                fine1: { name: "1: Fine", label: "Ajuste Fino da Voz 1", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                preDelay1: { name: "1: Pre-Delay", label: "Atraso da Voz 1", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 318, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x03, 0x0E], notesStart: 301, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                level1: { name: "1: Level", label: "Volume da Voz 1", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                feedback1: { name: "1: Feedback", label: "Repetições da Voz 1", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pitch2: { name: "2: Pitch", label: "Transposição da Voz 2", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                mode2: { name: "2: Mode", label: "Resposta da Voz 2", paramIndex: 10, offset: 0x0027, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03], options: [{ value: 0, label: "FAST" }, { value: 1, label: "MEDIUM" }, { value: 2, label: "SLOW" }, { value: 3, label: "MONO" }] },
                fine2: { name: "2: Fine", label: "Ajuste Fino da Voz 2", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                preDelay2: { name: "2: Pre-Delay", label: "Atraso da Voz 2", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 318, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x03, 0x0E], notesStart: 301, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                level2: { name: "2: Level", label: "Volume da Voz 2", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 62. MÓDULO: BASS PITCH SHIFTER (typeId: 61)
        // =========================================================================
        // Versão para baixo do PITCH SHIFTER: mesmos 13 parâmetros e mesmas faixas (MODE com
        // as mesmas 4 opções), conferidas na descrição (pág. 59). Ordem dos alvos 631-643
        // ("BASS PITCH SHIFT") = TARGET list. Só a voz 1 tem FEEDBACK.
        bassPitchShifter: {
            id: "bassPitchShifter",
            name: "Bass Pitch Shifter",
            typeId: 61,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                voice: {
                    name: "Voice", label: "Número de Vozes", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "1 VOICE" }, { value: 1, label: "2 MONO" }, { value: 2, label: "2 STEREO" }]
                },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pitch1: { name: "1: Pitch", label: "Transposição da Voz 1", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                mode1: { name: "1: Mode", label: "Resposta da Voz 1", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03], options: [{ value: 0, label: "FAST" }, { value: 1, label: "MEDIUM" }, { value: 2, label: "SLOW" }, { value: 3, label: "MONO" }] },
                fine1: { name: "1: Fine", label: "Ajuste Fino da Voz 1", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                preDelay1: { name: "1: Pre-Delay", label: "Atraso da Voz 1", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 318, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x03, 0x0E], notesStart: 301, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                level1: { name: "1: Level", label: "Volume da Voz 1", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                feedback1: { name: "1: Feedback", label: "Repetições da Voz 1", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pitch2: { name: "2: Pitch", label: "Transposição da Voz 2", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                mode2: { name: "2: Mode", label: "Resposta da Voz 2", paramIndex: 10, offset: 0x0027, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03], options: [{ value: 0, label: "FAST" }, { value: 1, label: "MEDIUM" }, { value: 2, label: "SLOW" }, { value: 3, label: "MONO" }] },
                fine2: { name: "2: Fine", label: "Ajuste Fino da Voz 2", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                preDelay2: { name: "2: Pre-Delay", label: "Atraso da Voz 2", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 318, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x03, 0x0E], notesStart: 301, notes: ["1/32", "1/16T", "1/32D", "1/16", "1/8T", "1/16D", "1/8", "1/4T", "1/8D", "1/4", "1/2T", "1/4D", "1/2", "1/1T", "1/2D", "1/1", "1/1D", "2/1"] },
                level2: { name: "2: Level", label: "Volume da Voz 2", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 63. MÓDULO: REVERB (typeId: 62)
        // =========================================================================
        // Ordem conforme os alvos 372-380 do midi.pdf e o TARGET list (PRE-DELAY em 3º); a
        // descrição (pág. 38) põe PRE-DELAY depois de DENSITY.
        // Pontos não confirmados (ver "unverified"): escala do TIME e numeração dos cortes.
        reverb: {
            id: "reverb",
            name: "Reverb",
            typeId: 62,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Reverb", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 4, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x04],
                    options: [{ value: 0, label: "HALL S" }, { value: 1, label: "HALL M" }, { value: 2, label: "PLATE" }, { value: 3, label: "ROOM" }, { value: 4, label: "STUDIO" }]
                },
                time: { name: "Time", label: "Duração do Reverb", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 1, max: 100, unit: "s", scale: 0.1, midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x00, 0x06, 0x04], unverified: "O PDF mostra 0.1 s–10.0 s. Assumido valor bruto 1–100 com escala 0.1 (1 = 0.1 s, 100 = 10.0 s). Confirmar na pedaleira." },
                preDelay: { name: "Pre-Delay", label: "Atraso Inicial", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 200, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x0C, 0x08] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                density: { name: "Density", label: "Densidade", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 1, max: 10, midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 17, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x01], options: reverbLowCutOptions, unverified: "Faixa menor (FLAT, 20 Hz–800 Hz). Assumido 0 = FLAT e 1–17 = 20 Hz–800 Hz, como no Low Cut completo. Confirmar na pedaleira." },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 14, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x0E], options: reverbHighCutOptions, unverified: "Faixa menor (630 Hz–12.5 kHz, FLAT). Assumido 0 = 630 Hz … 13 = 12.5 kHz e 14 = FLAT; pode ser que a pedaleira mantenha a numeração da lista completa (15–29). Confirmar na pedaleira." },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 9, offset: 0x0023, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 64. MÓDULO: REVERB PLUS (typeId: 63)
        // =========================================================================
        // Reverb mais detalhado. Ordem igual nas três fontes (alvos 381-397 do midi.pdf,
        // descrição pág. 39-40, TARGET list). Diferenças para o REVERB comum: 7 tipos, LOW/HIGH CUT
        // com a faixa COMPLETA (20 Hz–12.5 kHz) e LOW/HIGH DAMP de -50 a +50 (no FLANGER PRIME
        // e no PRIME PHASER o DAMP vai de -100 a 0).
        reverbPlus: {
            id: "reverbPlus",
            name: "Reverb Plus",
            typeId: 63,
            parameters: {
                ...commonHeader,
                type: {
                    name: "Type", label: "Tipo de Reverb", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 6, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x06],
                    options: [{ value: 0, label: "HALL S" }, { value: 1, label: "HALL M" }, { value: 2, label: "PLATE" }, { value: 3, label: "ROOM S" }, { value: 4, label: "ROOM L" }, { value: 5, label: "AMBIENCE" }, { value: 6, label: "SPRING" }]
                },
                time: { name: "Time", label: "Duração do Reverb", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 1, max: 100, unit: "s", scale: 0.1, midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x00, 0x06, 0x04], unverified: "O PDF mostra 0.1 s–10.0 s. Assumido valor bruto 1–100 com escala 0.1 (1 = 0.1 s, 100 = 10.0 s). Confirmar na pedaleira." },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                density: { name: "Density", label: "Densidade", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 1, max: 10, midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                preDelay: { name: "Pre-Delay", label: "Atraso Inicial", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 200, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x0C, 0x08] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                lowDamp: { name: "Low Damp", label: "Atenuação dos Graves", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                highDamp: { name: "High Damp", label: "Atenuação dos Agudos", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                modRate: { name: "Mod Rate", label: "Taxa de Modulação", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                modDepth: { name: "Mod Depth", label: "Profundidade da Modulação", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckSens: { name: "Duck Sens", label: "Sensibilidade do Ducking", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPre: { name: "Duck Pre", label: "Ducking na Entrada", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPost: { name: "Duck Post", label: "Ducking na Saída", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 16, offset: 0x003F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 17, offset: 0x0043, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 65. MÓDULO: SHIMMER REVERB (typeId: 64)
        // =========================================================================
        // Reverb com agudos cintilantes (mistura vozes transpostas). SEM parâmetro TYPE.
        // Ordem igual nas três fontes (alvos 398-417 do midi.pdf como "SHIMMER REV", descrição
        // pág. 40, TARGET list). Faixas iguais às do REVERB PLUS + 2 vozes de pitch (-24…+24).
        shimmerReverb: {
            id: "shimmerReverb",
            name: "Shimmer Reverb",
            typeId: 64,
            parameters: {
                ...commonHeader,
                time: { name: "Time", label: "Duração do Reverb", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 1, max: 100, unit: "s", scale: 0.1, midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x00, 0x06, 0x04], unverified: "O PDF mostra 0.1–10.0 s. Assumido valor bruto 1–100 com escala 0.1 (1 = 0.1 s, 100 = 10.0 s). Confirmar na pedaleira." },
                tone: { name: "Tone", label: "Tom", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                density: { name: "Density", label: "Densidade", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 1, max: 10, midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                preDelay: { name: "Pre-Delay", label: "Atraso Inicial", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 200, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x0C, 0x08] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                lowDamp: { name: "Low Damp", label: "Atenuação dos Graves", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                highDamp: { name: "High Damp", label: "Atenuação dos Agudos", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                modRate: { name: "Mod Rate", label: "Taxa de Modulação", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                modDepth: { name: "Mod Depth", label: "Profundidade da Modulação", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckSens: { name: "Duck Sens", label: "Sensibilidade do Ducking", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPre: { name: "Duck Pre", label: "Ducking na Entrada", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duckPost: { name: "Duck Post", label: "Ducking na Saída", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                pitch1: { name: "1: Pitch", label: "Transposição da Voz 1", paramIndex: 16, offset: 0x003F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                pitch2: { name: "2: Pitch", label: "Transposição da Voz 2", paramIndex: 17, offset: 0x0043, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                level1: { name: "1: Level", label: "Volume da Voz 1", paramIndex: 18, offset: 0x0047, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level2: { name: "2: Level", label: "Volume da Voz 2", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 20, offset: 0x004F, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 66. MÓDULO: TERA ECHO (typeId: 65)
        // =========================================================================
        // Ambiência com MDP que muda conforme a dinâmica da palhetada. Ordem conforme os alvos
        // 418-425 do midi.pdf e o TARGET list (iguais); a descrição (pág. 36) põe MODE no fim
        // e TONE antes de EFFECT LEVEL. TRIGGER é sempre gravado como OFF na memória.
        teraEcho: {
            id: "teraEcho",
            name: "Tera Echo",
            typeId: 65,
            parameters: {
                ...commonHeader,
                mode: {
                    name: "Mode", label: "Modo de Saída", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "MONO" }, { value: 1, label: "DIR/EFX" }, { value: 2, label: "STEREO" }]
                },
                spreadTime: { name: "Spread Time", label: "Duração do Efeito", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                feedback: { name: "Feedback", label: "Decaimento (Feedback)", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                tone: { name: "Tone", label: "Tom", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                trigger: { name: "Trigger", label: "Congelar o Efeito (Trigger)", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                carryover: { name: "Carryover", label: "Manter Cauda (Carryover)", paramIndex: 8, offset: 0x001F, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 67. MÓDULO: RING MODULATOR (typeId: 66)
        // =========================================================================
        // Som de sino gerado pela modulação com um oscilador interno. Ordem igual nas três
        // fontes (alvos 644-649 do midi.pdf como "RING MOD", descrição pág. 24, TARGET list).
        // MOD RATE também aceita notas BPM (não documentadas no midi.pdf).
        ringModulator: {
            id: "ringModulator",
            name: "Ring Modulator",
            typeId: 66,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                intelligent: { name: "Intelligent", label: "Seguir a Nota Tocada", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                frequency: { name: "Frequency", label: "Frequência do Oscilador", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                modRate: { name: "Mod Rate", label: "Taxa de Modulação", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                modDepth: { name: "Mod Depth", label: "Profundidade da Modulação", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 68. MÓDULO: ROTARY (typeId: 67)
        // =========================================================================
        // Simula uma caixa de som giratória (tipo Leslie). Ordem igual nas três fontes
        // (alvos 650-659 do midi.pdf, descrição pág. 20, TARGET list).
        // SLOW RATE e FAST RATE também aceitam notas BPM (não documentadas no midi.pdf).
        rotary: {
            id: "rotary",
            name: "Rotary",
            typeId: 67,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                speedSelect: { name: "Speed Select", label: "Velocidade de Rotação", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "SLOW" }, { value: 1, label: "FAST" }] },
                slowRate: { name: "Slow Rate", label: "Velocidade Lenta", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                fastRate: { name: "Fast Rate", label: "Velocidade Rápida", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                riseTime: { name: "Rise Time", label: "Tempo para Acelerar", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                fallTime: { name: "Fall Time", label: "Tempo para Desacelerar", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                micDistance: { name: "Mic Distance", label: "Distância do Microfone", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                rotorHorn: { name: "Rotor/Horn", label: "Equilíbrio Rotor/Corneta (100:0 … 0:100)", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04], format: "balance" },
                drive: { name: "Drive", label: "Distorção do Pré-amplificador", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 69. MÓDULO: S-BEND (typeId: 68)
        // =========================================================================
        // Sobe/desce a afinação em oitavas ao acionar o TRIGGER. Ordem igual nas três fontes
        // (alvos 679-682 do midi.pdf, descrição pág. 45, TARGET list).
        // TRIGGER é sempre gravado como OFF na memória.
        sBend: {
            id: "sBend",
            name: "S-Bend",
            typeId: 68,
            parameters: {
                ...commonHeader,
                trigger: { name: "Trigger", label: "Disparo (Trigger)", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                pitch: { name: "Pitch", label: "Transposição (Oitavas)", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 6, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x06], options: sBendPitchOptions, unverified: "Lista de 7 oitavas SEM o zero (-3, -2, -1, +1, +2, +3, +4). Assumido valor bruto = posição na lista (0–6). Alternativa possível: a pedaleira guardar o número da oitava (-3…+4, pulando o 0). Confirmar na pedaleira." },
                riseTime: { name: "Rise Time", label: "Tempo de Subida", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                fallTime: { name: "Fall Time", label: "Tempo de Volta", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 70. MÓDULO: BASS S-BEND (typeId: 69)
        // =========================================================================
        // Versão para baixo do S-BEND: mesmos 4 parâmetros e a mesma lista de oitavas
        // (-3oct … +4oct, sem zero), conferidas na descrição (pág. 63). Ordem igual nas três
        // fontes (alvos 683-686, descrição, TARGET list). Mesma dúvida sobre o valor bruto do PITCH.
        bassSBend: {
            id: "bassSBend",
            name: "Bass S-Bend",
            typeId: 69,
            parameters: {
                ...commonHeader,
                trigger: { name: "Trigger", label: "Disparo (Trigger)", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                pitch: { name: "Pitch", label: "Transposição (Oitavas)", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 6, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x06], options: sBendPitchOptions, unverified: "Lista de 7 oitavas SEM o zero (-3, -2, -1, +1, +2, +3, +4). Assumido valor bruto = posição na lista (0–6). Alternativa possível: a pedaleira guardar o número da oitava (-3…+4, pulando o 0). Confirmar na pedaleira." },
                riseTime: { name: "Rise Time", label: "Tempo de Subida", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                fallTime: { name: "Fall Time", label: "Tempo de Volta", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 71. MÓDULO: SLOW GEAR (typeId: 70)
        // =========================================================================
        // Efeito de "violino": o volume sobe devagar após a palhetada. Ordem igual nas três
        // fontes (alvos 10-12 do midi.pdf, descrição pág. 43, TARGET list). O 3º parâmetro é
        // "LEVEL" no midi.pdf/TARGET list e "EFFECT LEVEL" na descrição.
        slowGear: {
            id: "slowGear",
            name: "Slow Gear",
            typeId: 70,
            parameters: {
                ...commonHeader,
                sens: { name: "Sens", label: "Sensibilidade", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                riseTime: { name: "Rise Time", label: "Tempo de Subida do Volume", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 72. MÓDULO: BASS SLOW GEAR (typeId: 71)
        // =========================================================================
        // Versão para baixo do SLOW GEAR: mesmos 3 parâmetros (todos 0–100), conferidos na
        // descrição (pág. 62). Ordem igual nas três fontes (alvos 13-15, descrição, TARGET list).
        bassSlowGear: {
            id: "bassSlowGear",
            name: "Bass Slow Gear",
            typeId: 71,
            parameters: {
                ...commonHeader,
                sens: { name: "Sens", label: "Sensibilidade", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                riseTime: { name: "Rise Time", label: "Tempo de Subida do Volume", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 73. MÓDULO: TOUCH WAH (typeId: 72)
        // =========================================================================
        // Wah que responde ao volume da guitarra (sem pedal). Ordem conforme os alvos 39-46 do
        // midi.pdf e o TARGET list; a descrição (pág. 44) põe EFFECT LEVEL logo após SENS.
        // O 1º parâmetro é "FILTER MODE" no midi.pdf e só "FILTER" na descrição.
        touchWah: {
            id: "touchWah",
            name: "Touch Wah",
            typeId: 72,
            parameters: {
                ...commonHeader,
                filterMode: {
                    name: "Filter Mode", label: "Tipo de Filtro", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "LPF" }, { value: 1, label: "BPF" }, { value: 2, label: "HPF" }]
                },
                polarity: { name: "Polarity", label: "Direção do Filtro", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "DOWN" }, { value: 1, label: "UP" }] },
                sens: { name: "Sens", label: "Sensibilidade à Palhetada", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                frequency: { name: "Frequency", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                decay: { name: "Decay", label: "Velocidade do Filtro", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 74. MÓDULO: BASS TOUCH WAH (typeId: 73)
        // =========================================================================
        // Versão para baixo do TOUCH WAH. ATENÇÃO: o FILTER MODE tem só DUAS opções aqui
        // (LPF e BPF) — o TOUCH WAH de guitarra tem três (LPF, BPF, HPF). Ordem conforme os
        // alvos 47-54 do midi.pdf e o TARGET list; a descrição (pág. 63) põe EFFECT LEVEL
        // logo após SENS. O 1º parâmetro é "FILTER MODE" no midi.pdf e só "FILTER" na descrição.
        bassTouchWah: {
            id: "bassTouchWah",
            name: "Bass Touch Wah",
            typeId: 73,
            parameters: {
                ...commonHeader,
                filterMode: {
                    name: "Filter Mode", label: "Tipo de Filtro", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01],
                    options: [{ value: 0, label: "LPF" }, { value: 1, label: "BPF" }]
                },
                polarity: { name: "Polarity", label: "Direção do Filtro", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "DOWN" }, { value: 1, label: "UP" }] },
                sens: { name: "Sens", label: "Sensibilidade à Palhetada", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                frequency: { name: "Frequency", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                decay: { name: "Decay", label: "Velocidade do Filtro", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 75. MÓDULO: TREMOLO (typeId: 74)
        // =========================================================================
        // Variação cíclica de volume. Ordem igual nas três fontes (alvos 660-666 do midi.pdf,
        // descrição pág. 23, TARGET list).
        // ATENÇÃO: WAVEFORM aqui é um valor 0–100 (formato da curva), como no PAN, e NÃO uma
        // escolha TRI/SINE. RATE também aceita notas BPM (não documentadas no midi.pdf).
        tremolo: {
            id: "tremolo",
            name: "Tremolo",
            typeId: 74,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Velocidade", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                waveform: { name: "Waveform", label: "Formato da Curva", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                trigger: { name: "Trigger", label: "Disparo (Trigger)", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                riseTime: { name: "Rise Time", label: "Tempo até o Efeito Pleno", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 76. MÓDULO: VIBRATO (typeId: 75)
        // =========================================================================
        // Vibrato: variação cíclica da AFINAÇÃO (o TREMOLO varia o volume). Ordem conforme os
        // alvos 667-671 do midi.pdf e o TARGET list; a descrição (pág. 21) lista RISE TIME antes
        // de EFFECT LEVEL e TRIGGER. RATE também aceita notas BPM (não documentadas no midi.pdf).
        vibrato: {
            id: "vibrato",
            name: "Vibrato",
            typeId: 75,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Velocidade", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                trigger: { name: "Trigger", label: "Disparo (Trigger)", paramIndex: 3, offset: 0x000B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                riseTime: { name: "Rise Time", label: "Tempo até o Efeito Pleno", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 77. MÓDULO: VIBRATO PRIME (typeId: 76)
        // =========================================================================
        // No parameter.pdf chama-se "PRIME VIBRATO" (pág. 22); no midi.pdf, "VIBRATO PRIME" na
        // lista de TYPE e "PRIME VIB" na lista de alvos (672-678). Ordem igual nas três fontes.
        // Tem COLOR e DIRECT MIX a mais que o VIBRATO comum.
        // RATE também aceita notas BPM (não documentadas no midi.pdf).
        vibratoPrime: {
            id: "vibratoPrime",
            name: "Vibrato Prime",
            typeId: 76,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Velocidade", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                color: { name: "Color", label: "Complexidade da Modulação", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                trigger: { name: "Trigger", label: "Disparo (Trigger)", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                riseTime: { name: "Rise Time", label: "Tempo até o Efeito Pleno", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 78. MÓDULO: SEND/RETURN (typeId: 77)
        // =========================================================================
        // Insere um pedal/processador externo na cadeia, pelas saídas SEND e RETURN.
        // Ordem igual nas três fontes (alvos 688-692 do midi.pdf, descrição pág. 49, TARGET list).
        // ATENÇÃO: SEND LEVEL e RETURN LEVEL vão até 200 (não 100).
        // O 3º parâmetro é "RET LEVEL" na lista de alvos e "RETURN LEVEL" nas outras fontes.
        // RETURN LEVEL, ADJUST e INVERT só valem com MODE = NORMAL ou DIRECT MIX.
        sendReturn: {
            id: "sendReturn",
            name: "Send/Return",
            typeId: 77,
            parameters: {
                ...commonHeader,
                mode: {
                    name: "Mode", label: "Modo de Ligação", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "NORMAL" }, { value: 1, label: "DIRECT MIX" }, { value: 2, label: "BRANCH OUT" }]
                },
                sendLevel: { name: "Send Level", label: "Volume Enviado ao Pedal Externo", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 200, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x0C, 0x08] },
                returnLevel: { name: "Return Level", label: "Volume Recebido do Pedal Externo", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 200, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x0C, 0x08] },
                adjust: { name: "Adjust", label: "Ajuste de Fase", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                invert: { name: "Invert", label: "Inverter a Fase do Retorno", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] }
            }
        },

        // =========================================================================
        // 79. MÓDULO: SLICER (typeId: 78)
        // =========================================================================
        // Corta o som em padrões rítmicos. Ordem igual nas três fontes (alvos 702-708 do
        // midi.pdf, descrição pág. 25, TARGET list). TRIGGER é sempre gravado como OFF na
        // memória. RATE também aceita notas BPM (não documentadas no midi.pdf).
        slicer: {
            id: "slicer",
            name: "Slicer",
            typeId: 78,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                pattern: {
                    name: "Pattern", label: "Padrão Rítmico", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 19, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x03],
                    options: [{ value: 0, label: "P1" }, { value: 1, label: "P2" }, { value: 2, label: "P3" }, { value: 3, label: "P4" }, { value: 4, label: "P5" }, { value: 5, label: "P6" }, { value: 6, label: "P7" }, { value: 7, label: "P8" }, { value: 8, label: "P9" }, { value: 9, label: "P10" }, { value: 10, label: "P11" }, { value: 11, label: "P12" }, { value: 12, label: "P13" }, { value: 13, label: "P14" }, { value: 14, label: "P15" }, { value: 15, label: "P16" }, { value: 16, label: "P17" }, { value: 17, label: "P18" }, { value: 18, label: "P19" }, { value: 19, label: "P20" }],
                    unverified: "O PDF mostra P1–P20. Assumido bruto 0–19 (0 = P1). Pode ser 1–20. Confirmar na pedaleira."
                },
                rate: { name: "Rate", label: "Velocidade do Corte", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                trigger: { name: "Trigger", label: "Reiniciar o Padrão (Trigger)", paramIndex: 3, offset: 0x000B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                attack: { name: "Attack", label: "Ataque do Padrão", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                duty: { name: "Duty", label: "Duração de Cada Corte", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 1, max: 99, midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x00, 0x06, 0x03] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 80. MÓDULO: HUMANIZER (typeId: 79)
        // =========================================================================
        // Faz a guitarra "falar" vogais. Ordem igual nas três fontes (alvos 709-716 do midi.pdf,
        // descrição pág. 26, TARGET list). SENS só vale no MODE = PICKING; MANUAL, no AUTO.
        // RATE também aceita notas BPM (não documentadas no midi.pdf).
        humanizer: {
            id: "humanizer",
            name: "Humanizer",
            typeId: 79,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                mode: { name: "Mode", label: "Modo de Troca das Vogais", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "PICKING" }, { value: 1, label: "AUTO" }] },
                vowel1: { name: "Vowel 1", label: "Primeira Vogal", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 4, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x04], options: vowelOptions },
                vowel2: { name: "Vowel 2", label: "Segunda Vogal", paramIndex: 3, offset: 0x000B, type: "select", encoding: "nibbles", min: 0, max: 4, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x04], options: vowelOptions },
                sens: { name: "Sens", label: "Sensibilidade à Palhetada", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                rate: { name: "Rate", label: "Velocidade da Troca", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Equilíbrio entre as Vogais", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 81. MÓDULO: FEEDBACKER (typeId: 80)
        // =========================================================================
        // Gera microfonia controlada. Ordem igual nas três fontes (alvos 717-725 do midi.pdf,
        // descrição pág. 42, TARGET list).
        // DEPTH só vale com MODE = NORMAL; RISE TIME, OCT RISE TIME, FEEDBACK, OCT FEEDBACK,
        // VIB RATE e VIB DEPTH só valem com MODE = OSC.
        feedbacker: {
            id: "feedbacker",
            name: "Feedbacker",
            typeId: 80,
            parameters: {
                ...commonHeader,
                mode: { name: "Mode", label: "Modo", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "NORMAL" }, { value: 1, label: "OSC" }] },
                trigger: { name: "Trigger", label: "Disparo (Trigger)", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                depth: { name: "Depth", label: "Facilidade da Microfonia", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                riseTime: { name: "Rise Time", label: "Tempo até o Volume Máximo", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                octRiseTime: { name: "Oct Rise Time", label: "Tempo até o Máximo (1 Oitava Acima)", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                feedback: { name: "Feedback", label: "Volume da Microfonia", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                octFeedback: { name: "Oct Feedback", label: "Volume da Microfonia (1 Oitava Acima)", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                vibRate: { name: "Vib Rate", label: "Velocidade do Vibrato", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                vibDepth: { name: "Vib Depth", label: "Profundidade do Vibrato", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 82. MÓDULO: SITAR SIM (typeId: 81)
        // =========================================================================
        // Simula uma cítara indiana. Ordem igual nas três fontes (alvos 726-732 do midi.pdf,
        // descrição "SITAR SIMULATOR" pág. 42, TARGET list).
        sitarSim: {
            id: "sitarSim",
            name: "Sitar Sim",
            typeId: 81,
            parameters: {
                ...commonHeader,
                sens: { name: "Sens", label: "Sensibilidade à Palhetada", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Intensidade do Efeito", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                tone: { name: "Tone", label: "Tom", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ondulação da Ressonância", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                buzz: { name: "Buzz", label: "Zumbido do Cavalete", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        },

        // =========================================================================
        // 83. MÓDULO: AUTO WAH (typeId: 82) — ÚLTIMO TIPO DA LISTA (0-82)
        // =========================================================================
        // Wah automático, em ciclo (sem pedal e sem depender da palhetada). Ordem igual nas três
        // fontes (alvos 733-740 do midi.pdf, descrição pág. 44, TARGET list).
        // ATENÇÃO: aqui WAVEFORM É a escolha TRI/SINE — no PAN e no TREMOLO é valor 0–100.
        // O 1º parâmetro é "FILTER MODE" no midi.pdf e só "FILTER" na descrição.
        // RATE também aceita notas BPM (não documentadas no midi.pdf).
        autoWah: {
            id: "autoWah",
            name: "Auto Wah",
            typeId: 82,
            usesBpm: true,   // o display mostra BPM neste efeito
            parameters: {
                ...commonHeader,
                filterMode: {
                    name: "Filter Mode", label: "Tipo de Filtro", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "LPF" }, { value: 1, label: "BPF" }, { value: 2, label: "HPF" }]
                },
                rate: { name: "Rate", label: "Velocidade do Ciclo", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Volume do Efeito", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                frequency: { name: "Frequency", label: "Frequência Central", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                directMix: { name: "Direct Mix", label: "Volume Direto", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
            }
        }
    };
})();

/* =============================================================================
 * MÓDULO MASTER (pseudo-bloco)
 * -----------------------------------------------------------------------------
 * Não é um Fx Item: são ajustes da própria memória, por isso ele está sempre
 * presente, é único e fica sempre no fim da cadeia (a pedaleira nem o coloca na
 * lista de encadeamento). Cinco parâmetros moram em [MemoryEfct] (10 00 0F xx) e
 * o INPUT SETTING mora em [MemoryCommon] (10 00 00 32).
 *
 * Aqui os endereços são ABSOLUTOS (memória temporária) e os valores vão CRUS,
 * sem o deslocamento de 32768 usado nos parâmetros de efeito:
 *   - bytes: 1   -> um byte só
 *   - nibbles: 2 -> dois nibbles (0-255)
 *   - nibbles: 4 -> quatro nibbles
 * ========================================================================== */
(function () {
    "use strict";

    const keyOptions = ["C (Am)", "Db (Bbm)", "D (Bm)", "Eb (Cm)", "E (C#m)", "F (Dm)",
                        "F# (D#m)", "G (Em)", "Ab (Fm)", "A (F#m)", "Bb (Gm)", "B (G#m)"]
                       .map((l, i) => ({ value: i, label: l }));

    // 0 = SYSTEM (segue o ajuste global), 1 a 10 = guitarra escolhida para esta memória
    const inputSettingOptions = [{ value: 0, label: "SYSTEM" }].concat(
        Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: String(i + 1) })));

    const offOn = [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }];

    window.GX10_MASTER = {
        id: "master",
        name: "Master",
        fixo: true,          // sempre presente, único e sempre no fim da cadeia
        parameters: {
            memoryLevel: {
                name: "Memory Level", label: "Volume da memória",
                address: [0x10, 0x00, 0x0F, 0x00], nibbles: 2,
                type: "range", min: 0, max: 200
            },
            bpm: {
                name: "BPM", label: "BPM da memória",
                address: [0x10, 0x00, 0x0F, 0x02], nibbles: 4,
                type: "range", min: 400, max: 2500, scale: 0.1, unit: "BPM"
            },
            key: {
                name: "Key", label: "Tom (usado pelo Harmonist)",
                address: [0x10, 0x00, 0x0F, 0x06], bytes: 1,
                type: "select", min: 0, max: 11, options: keyOptions
            },
            inputSetting: {
                name: "Input Setting", label: "Guitarra ligada na entrada",
                address: [0x10, 0x00, 0x00, 0x32], bytes: 1,
                type: "select", min: 0, max: 10, options: inputSettingOptions,
                unverified: "Este mora em [MemoryCommon], deslocamento 00 32, e não em [MemoryEfct] como os outros. Confirmar na pedaleira."
            },
            carryover: {
                name: "Carryover", label: "Segurar o efeito ao trocar de memória",
                address: [0x10, 0x00, 0x0F, 0x09], bytes: 1,
                type: "select", min: 0, max: 1, options: offOn
            },
            tempoHold: {
                name: "Tempo Hold", label: "Manter o BPM ao trocar de memória",
                address: [0x10, 0x00, 0x0F, 0x0A], bytes: 1,
                type: "select", min: 0, max: 1, options: offOn
            }
        }
    };
})();
