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

    // Parâmetros de cabeçalho padrão para todos os módulos de efeito
    const commonHeader = {
        onOff: { name: "OnOff", label: "Efeito Ativo (ON/OFF)", offset: 0x0001, type: "select", encoding: "byte", min: 0, max: 1, midiMin: [0x00], midiMax: [0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
        duplicationNumber: { name: "DuplicationNumber", label: "Número de Duplicação", offset: 0x0002, type: "range", encoding: "byte", min: 0, max: 9, midiMin: [0x00], midiMax: [0x09] }
    };

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
                low: { name: "Low", label: "Grave", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: -50, max: 50, default: 0, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                high: { name: "High", label: "Agudo", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: -50, max: 50, default: 0, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
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
                    options: [{ value: 0, label: "TRANSPARENT" }, { value: 1, label: "NATURAL" }, { value: 2, label: "BOUTIQUE" }, { value: 3, label: "SUPREME" }, { value: 4, label: "MAXIMUM" }, { value: 5, label: "JUGGERNAUT" }, { value: 6, label: "X-CRUNCH" }, { value: 7, label: "X-HI GAIN" }, { value: 8, label: "X-MODDED" }, { value: 9, label: "X-ULTRA" }, { value: 10, label: "X-OPTIMA" }, { value: 11, label: "X-TITAN" }, { value: 12, label: "JC-120" }, { value: 13, label: "TWIN COMBO" }, { value: 14, label: "DELUXE COMBO" }, { value: 15, label: "TWEED COMBO" }, { value: 16, label: "DIAMOND AMP" }, { value: 17, label: "BRIT STACK" }, { value: 18, label: "RECTI STACK" }, { value: 19, label: "MATCH COMBO" }, { value: 20, label: "BG COMBO" }, { value: 21, label: "ORNG STACK" }, { value: 22, label: "BGNR UB METAL" }]
                },
                gain: { name: "Gain", label: "Ganho", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 120, default: 60, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                level: { name: "Level", label: "Volume do Preamp", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                gainSw: { name: "Gain SW", label: "Chave de Ganho", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "LOW" }, { value: 1, label: "MID" }, { value: 2, label: "HIGH" }] },
                bass: { name: "Bass", label: "Graves", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                middle: { name: "Middle", label: "Médios", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                treble: { name: "Treble", label: "Agudos", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                presence: { name: "Presence", label: "Presença", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                brightSw: { name: "Bright SW", label: "Brilho", paramIndex: 9, offset: 0x0023, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 10, offset: 0x0027, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                sag: { name: "Sag", label: "Sag", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: -10, max: 10, default: 0, midiMin: [0x07, 0x0F, 0x0F, 0x06], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: -10, max: 10, default: 0, midiMin: [0x07, 0x0F, 0x0F, 0x06], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                spType: {
                    name: "Speaker Type", label: "Tipo de Gabinete", paramIndex: 14, offset: 0x0037, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D],
                    options: [{ value: 0, label: "OFF" }, { value: 1, label: "ORIGINAL" }, { value: 2, label: "1x8\"" }, { value: 3, label: "1x10\"" }, { value: 4, label: "1x12\"" }, { value: 5, label: "2x12\"" }, { value: 6, label: "4x10\"" }, { value: 7, label: "4x12\"" }, { value: 8, label: "8x12\"" }, { value: 9, label: "B1x15\"" }, { value: 10, label: "B1x18\"" }, { value: 11, label: "B2x15\"" }, { value: 12, label: "B4x10\"" }, { value: 13, label: "B8x10\"" }, ...Array.from({ length: 16 }, (_, i) => ({ value: 14 + i, label: `USER ${i + 1}` }))]
                },
                directMix: { name: "Direct Mix", label: "Som Direto", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                micType: { name: "Mic Type", label: "Tipo de Mic", paramIndex: 16, offset: 0x003F, type: "select", encoding: "nibbles", min: 0, max: 8, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x08], options: [{ value: 0, label: "DYN57" }, { value: 1, label: "DYN421" }, { value: 2, label: "CND451" }, { value: 3, label: "CND87" }, { value: 4, label: "RBN121" }, { value: 5, label: "BLEND A" }, { value: 6, label: "BLEND B" }, { value: 7, label: "BLEND C" }, { value: 8, label: "FLAT" }] },
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
                gainSw: { name: "Gain SW", label: "Chave de Ganho", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02], options: [{ value: 0, label: "LOW" }, { value: 1, label: "MID" }, { value: 2, label: "HIGH" }] },
                bass: { name: "Bass", label: "Graves", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                middle: { name: "Middle", label: "Médios", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                treble: { name: "Treble", label: "Agudos", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                presence: { name: "Presence", label: "Presença", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                brightSw: { name: "Bright SW", label: "Brilho", paramIndex: 9, offset: 0x0023, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloSw: { name: "Solo SW", label: "Chave do Solo", paramIndex: 10, offset: 0x0027, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                soloLevel: { name: "Solo Level", label: "Volume do Solo", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                sag: { name: "Sag", label: "Sag", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: -10, max: 10, default: 0, midiMin: [0x07, 0x0F, 0x0F, 0x06], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: -10, max: 10, default: 0, midiMin: [0x07, 0x0F, 0x0F, 0x06], midiMax: [0x08, 0x00, 0x00, 0x0A] },
                spType: {
                    name: "Speaker Type", label: "Tipo de Gabinete", paramIndex: 14, offset: 0x0037, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D],
                    options: [{ value: 0, label: "OFF" }, { value: 1, label: "ORIGINAL" }, { value: 2, label: "1x8\"" }, { value: 3, label: "1x10\"" }, { value: 4, label: "1x12\"" }, { value: 5, label: "2x12\"" }, { value: 6, label: "4x10\"" }, { value: 7, label: "4x12\"" }, { value: 8, label: "8x12\"" }, { value: 9, label: "B1x15\"" }, { value: 10, label: "B1x18\"" }, { value: 11, label: "B2x15\"" }, { value: 12, label: "B4x10\"" }, { value: 13, label: "B8x10\"" }, ...Array.from({ length: 16 }, (_, i) => ({ value: 14 + i, label: `USER ${i + 1}` }))]
                },
                directMix: { name: "Direct Mix", label: "Som Direto", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                micType: { name: "Mic Type", label: "Tipo de Mic", paramIndex: 16, offset: 0x003F, type: "select", encoding: "nibbles", min: 0, max: 8, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x08], options: [{ value: 0, label: "DYN57" }, { value: 1, label: "DYN421" }, { value: 2, label: "CND451" }, { value: 3, label: "CND87" }, { value: 4, label: "RBN121" }, { value: 5, label: "BLEND A" }, { value: 6, label: "BLEND B" }, { value: 7, label: "BLEND C" }, { value: 8, label: "FLAT" }] },
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
            parameters: {
                ...commonHeader,
                type: { name: "Type", label: "Modo", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 3, options: [{ value: 0, label: "MONO" }, { value: 1, label: "DIR/EFX" }, { value: 2, label: "STEREO" }, { value: 3, label: "DUAL" }] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                rate: { name: "Rate", label: "Taxa", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 40, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                preDelay: { name: "Pre Delay", label: "Atraso", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 400, default: 0, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 19, 0x00] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 9, offset: 0x0023, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                rate1: { name: "Rate 1", label: "Taxa 1", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth1: { name: "Depth 1", label: "Profund. 1", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel1: { name: "Effect Level 1", label: "Nível 1", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay1: { name: "Pre Delay 1", label: "Atraso 1", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: 0, max: 400, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 19, 0x00] },
                waveform1: { name: "Waveform 1", label: "Onda 1", paramIndex: 14, offset: 0x0037, type: "select", encoding: "nibbles", min: 0, max: 1, options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                lowCut1: { name: "Low Cut 1", label: "Low Cut 1", paramIndex: 15, offset: 0x003B, type: "select", encoding: "nibbles", min: 0, max: 29, options: lowCutOptions },
                highCut1: { name: "High Cut 1", label: "High Cut 1", paramIndex: 16, offset: 0x003F, type: "select", encoding: "nibbles", min: 0, max: 29, options: highCutOptions },
                rate2: { name: "Rate 2", label: "Taxa 2", paramIndex: 17, offset: 0x0043, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth2: { name: "Depth 2", label: "Profund. 2", paramIndex: 18, offset: 0x0047, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel2: { name: "Effect Level 2", label: "Nível 2", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay2: { name: "Pre Delay 2", label: "Atraso 2", paramIndex: 20, offset: 0x004F, type: "range", encoding: "nibbles", min: 0, max: 400, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 19, 0x00] },
                waveform2: { name: "Waveform 2", label: "Onda 2", paramIndex: 21, offset: 0x0053, type: "select", encoding: "nibbles", min: 0, max: 1, options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                lowCut2: { name: "Low Cut 2", label: "Low Cut 2", paramIndex: 22, offset: 0x0057, type: "select", encoding: "nibbles", min: 0, max: 29, options: lowCutOptions },
                highCut2: { name: "High Cut 2", label: "High Cut 2", paramIndex: 23, offset: 0x005B, type: "select", encoding: "nibbles", min: 0, max: 29, options: highCutOptions },
                outputMode: { name: "Output Mode", label: "Saída", paramIndex: 24, offset: 0x005F, type: "select", encoding: "nibbles", min: 0, max: 1, options: [{ value: 0, label: "MONO" }, { value: 1, label: "STEREO" }] }
            }
        },

        // =========================================================================
        // 6. MÓDULO: BASS CHORUS (typeId: 5)
        // =========================================================================
        bassChorus: {
            id: "bassChorus",
            name: "Bass Chorus",
            typeId: 5,
            parameters: {
                ...commonHeader,
                type: { name: "Type", label: "Modo", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, options: [{ value: 0, label: "MONO" }, { value: 1, label: "STEREO" }] },
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
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, default: 40, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel: { name: "Effect Level", label: "Nível Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay: { name: "Pre Delay", label: "Atraso (Pre-Delay)", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 400, default: 0, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 19, 0x00] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 1, options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                lowCut: { name: "Low Cut", label: "Low Cut", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 29, options: lowCutOptions },
                highCut: { name: "High Cut", label: "High Cut", paramIndex: 7, offset: 0x001B, type: "select", encoding: "nibbles", min: 0, max: 29, options: highCutOptions },
                sweetness: { name: "Sweetness", label: "Doçura", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                bell: { name: "Bell", label: "Brilho (Bell)", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                outputMode: { name: "Output Mode", label: "Saída", paramIndex: 10, offset: 0x0027, type: "select", encoding: "nibbles", min: 0, max: 1, options: [{ value: 0, label: "MONO" }, { value: 1, label: "STEREO" }] }
            }
        },

        // =========================================================================
        // 8. MÓDULO: CLASSIC-VIBE (typeId: 7)
        // =========================================================================
        classicVibe: {
            id: "classicVibe",
            name: "Classic Vibe",
            typeId: 7,
            parameters: {
                ...commonHeader,
                mode: { name: "Mode", label: "Modo", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, options: [{ value: 0, label: "CHORUS" }, { value: 1, label: "VIBRATO" }] },
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
                type: { name: "Type", label: "Tipo de Compressor", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, options: [{ value: 0, label: "BOSS COMP" }, { value: 1, label: "D-COMP" }, { value: 2, label: "ORANGE" }] },
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
                    name: "Ratio", label: "Razão de Compressão", paramIndex: 4, offset: 0x000F, type: "select", encoding: "nibbles", min: 0, max: 13,
                    midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x0D],
                    options: [
                        { value: 0, label: "1:1" }, { value: 1, label: "1.2:1" }, { value: 2, label: "1.4:1" }, { value: 3, label: "1.6:1" },
                        { value: 4, label: "1.8:1" }, { value: 5, label: "2.0:1" }, { value: 6, label: "2.5:1" }, { value: 7, label: "3.0:1" },
                        { value: 8, label: "4.0:1" }, { value: 9, label: "6.0:1" }, { value: 10, label: "8.0:1" }, { value: 11, label: "10.0:1" },
                        { value: 12, label: "20.0:1" }, { value: 13, label: "INF:1" }
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
                threshold: { name: "Threshold", label: "Limiar (Threshold)", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                attack: { name: "Attack", label: "Ataque (Attack)", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                level: { name: "Level", label: "Volume do Efeito", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, default: 50, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                tone: { name: "Tone", label: "Tom", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: -50, max: 50, default: 0, midiMin: [0x07, 0x0F, 0x0C, 0x0E], midiMax: [0x08, 0x00, 0x03, 0x02] },
                ratio: { 
                    name: "Ratio", label: "Razão de Compressão", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 13,
                    midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x0D],
                    options: [
                        { value: 0, label: "1:1" }, { value: 1, label: "1.2:1" }, { value: 2, label: "1.4:1" }, { value: 3, label: "1.6:1" },
                        { value: 4, label: "1.8:1" }, { value: 5, label: "2.0:1" }, { value: 6, label: "2.5:1" }, { value: 7, label: "3.0:1" },
                        { value: 8, label: "4.0:1" }, { value: 9, label: "6.0:1" }, { value: 10, label: "8.0:1" }, { value: 11, label: "10.0:1" },
                        { value: 12, label: "20.0:1" }, { value: 13, label: "INF:1" }
                    ]
                },
                directMix: { name: "Direct Mix", label: "Mix Direto", paramIndex: 6, offset: 0x0017, type: "range", encoding: "nibbles", min: 0, max: 100, default: 0, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] }
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
            parameters: {
                ...commonHeader,
                // TIME também aceita valores sincronizados ao BPM (notas musicais), cuja codificação MIDI
                // não está documentada no midi.pdf. Por ora só a faixa em ms (1–2000) está mapeada.
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 1, max: 2000, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0D, 0x00] },
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
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 1, max: 2000, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0D, 0x00] },
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
                time1: { name: "Time 1", label: "Tempo 1", paramIndex: 17, offset: 0x0043, type: "range", encoding: "nibbles", min: 1, max: 2000, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0D, 0x00] },
                feedback1: { name: "Feedback 1", label: "Repetições 1", paramIndex: 18, offset: 0x0047, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                effectLevel1: { name: "Effect Level 1", label: "Nível 1", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: 0, max: 120, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x07, 0x08] },
                highCut1: { name: "High Cut 1", label: "High Cut 1", paramIndex: 20, offset: 0x004F, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                highCut2: { name: "High Cut 2", label: "High Cut 2", paramIndex: 21, offset: 0x0053, type: "select", encoding: "nibbles", min: 0, max: 29, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x01, 0x0D], options: highCutOptions },
                type2: {
                    name: "Type 2", label: "Tipo 2", paramIndex: 22, offset: 0x0057, type: "select", encoding: "nibbles", min: 0, max: 3, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x03],
                    options: [{ value: 0, label: "MONO" }, { value: 1, label: "PAN" }, { value: 2, label: "ANALOG" }, { value: 3, label: "TAPE" }]
                },
                time2: { name: "Time 2", label: "Tempo 2", paramIndex: 23, offset: 0x005B, type: "range", encoding: "nibbles", min: 1, max: 2000, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0D, 0x00] },
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
            parameters: {
                ...commonHeader,
                type: { name: "Type", label: "Tipo de Delay", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "MONO" }, { value: 1, label: "DIR/EFX" }] },
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 12, max: 1200, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x0C], midiMax: [0x08, 0x04, 0x0B, 0x00] },
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
            parameters: {
                ...commonHeader,
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 1, max: 2000, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0D, 0x00] },
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
            parameters: {
                ...commonHeader,
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 1, max: 2000, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0D, 0x00] },
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
            parameters: {
                ...commonHeader,
                time: { name: "Time", label: "Tempo do Delay", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 1, max: 2000, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x01], midiMax: [0x08, 0x07, 0x0D, 0x00] },
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
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                stepRate: { name: "Step Rate", label: "Taxa do Step (0 = OFF)", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
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
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                stepRate: { name: "Step Rate", label: "Taxa do Step (0 = OFF)", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
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
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                turbo: { name: "Turbo", label: "Turbo", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                stepRate: { name: "Step Rate", label: "Taxa do Step (0 = OFF)", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
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
            parameters: {
                ...commonHeader,
                rate: { name: "Rate", label: "Taxa", paramIndex: 1, offset: 0x0003, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                depth: { name: "Depth", label: "Profundidade", paramIndex: 2, offset: 0x0007, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                resonance: { name: "Resonance", label: "Ressonância", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                manual: { name: "Manual", label: "Frequência Central", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                turbo: { name: "Turbo", label: "Turbo", paramIndex: 5, offset: 0x0013, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "OFF" }, { value: 1, label: "ON" }] },
                waveform: { name: "Waveform", label: "Onda", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: 0, max: 1, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x01], options: [{ value: 0, label: "TRI" }, { value: 1, label: "SINE" }] },
                stepRate: { name: "Step Rate", label: "Taxa do Step (0 = OFF)", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
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
            parameters: {
                ...commonHeader,
                voice: {
                    name: "Voice", label: "Número de Vozes", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "1 VOICE" }, { value: 1, label: "2 MONO" }, { value: 2, label: "2 STEREO" }]
                },
                harmony1: { name: "1: Harmony", label: "Intervalo da Voz 1", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: null, max: null, options: null, pending: "Lista de intervalos (-2 oct … +2 oct, USER) não documentada nos PDFs; confirmar na pedaleira." },
                level1: { name: "1: Level", label: "Volume da Voz 1", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay1: { name: "1: Pre-Delay", label: "Atraso da Voz 1", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 300, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x02, 0x0C] },
                feedback1: { name: "1: Feedback", label: "Repetições da Voz 1", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                harmony2: { name: "2: Harmony", label: "Intervalo da Voz 2", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: null, max: null, options: null, pending: "Lista de intervalos (-2 oct … +2 oct, USER) não documentada nos PDFs; confirmar na pedaleira." },
                level2: { name: "2: Level", label: "Volume da Voz 2", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay2: { name: "2: Pre-Delay", label: "Atraso da Voz 2", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 300, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x02, 0x0C] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                // Escala do usuário: 12 notas por voz, usadas quando HARMONY = USER
                scale1C: { name: "HR1:C", label: "Escala do Usuário 1 – C", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1DFlat: { name: "HR1:Db", label: "Escala do Usuário 1 – Db", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1D: { name: "HR1:D", label: "Escala do Usuário 1 – D", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1EFlat: { name: "HR1:Eb", label: "Escala do Usuário 1 – Eb", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1E: { name: "HR1:E", label: "Escala do Usuário 1 – E", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1F: { name: "HR1:F", label: "Escala do Usuário 1 – F", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1FSharp: { name: "HR1:F#", label: "Escala do Usuário 1 – F#", paramIndex: 16, offset: 0x003F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1G: { name: "HR1:G", label: "Escala do Usuário 1 – G", paramIndex: 17, offset: 0x0043, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1AFlat: { name: "HR1:Ab", label: "Escala do Usuário 1 – Ab", paramIndex: 18, offset: 0x0047, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1A: { name: "HR1:A", label: "Escala do Usuário 1 – A", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1BFlat: { name: "HR1:Bb", label: "Escala do Usuário 1 – Bb", paramIndex: 20, offset: 0x004F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1B: { name: "HR1:B", label: "Escala do Usuário 1 – B", paramIndex: 21, offset: 0x0053, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2C: { name: "HR2:C", label: "Escala do Usuário 2 – C", paramIndex: 22, offset: 0x0057, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2DFlat: { name: "HR2:Db", label: "Escala do Usuário 2 – Db", paramIndex: 23, offset: 0x005B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2D: { name: "HR2:D", label: "Escala do Usuário 2 – D", paramIndex: 24, offset: 0x005F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2EFlat: { name: "HR2:Eb", label: "Escala do Usuário 2 – Eb", paramIndex: 25, offset: 0x0063, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2E: { name: "HR2:E", label: "Escala do Usuário 2 – E", paramIndex: 26, offset: 0x0067, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2F: { name: "HR2:F", label: "Escala do Usuário 2 – F", paramIndex: 27, offset: 0x006B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2FSharp: { name: "HR2:F#", label: "Escala do Usuário 2 – F#", paramIndex: 28, offset: 0x006F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2G: { name: "HR2:G", label: "Escala do Usuário 2 – G", paramIndex: 29, offset: 0x0073, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2AFlat: { name: "HR2:Ab", label: "Escala do Usuário 2 – Ab", paramIndex: 30, offset: 0x0077, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2A: { name: "HR2:A", label: "Escala do Usuário 2 – A", paramIndex: 31, offset: 0x007B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2BFlat: { name: "HR2:Bb", label: "Escala do Usuário 2 – Bb", paramIndex: 32, offset: 0x007F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2B: { name: "HR2:B", label: "Escala do Usuário 2 – B", paramIndex: 33, offset: 0x0083, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] }
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
            parameters: {
                ...commonHeader,
                voice: {
                    name: "Voice", label: "Número de Vozes", paramIndex: 1, offset: 0x0003, type: "select", encoding: "nibbles", min: 0, max: 2, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x00, 0x02],
                    options: [{ value: 0, label: "1 VOICE" }, { value: 1, label: "2 MONO" }, { value: 2, label: "2 STEREO" }]
                },
                harmony1: { name: "1: Harmony", label: "Intervalo da Voz 1", paramIndex: 2, offset: 0x0007, type: "select", encoding: "nibbles", min: null, max: null, options: null, pending: "Lista de intervalos (-2 oct … +2 oct, USER) não documentada nos PDFs; confirmar na pedaleira." },
                level1: { name: "1: Level", label: "Volume da Voz 1", paramIndex: 3, offset: 0x000B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay1: { name: "1: Pre-Delay", label: "Atraso da Voz 1", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 300, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x02, 0x0C] },
                feedback1: { name: "1: Feedback", label: "Repetições da Voz 1", paramIndex: 5, offset: 0x0013, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                harmony2: { name: "2: Harmony", label: "Intervalo da Voz 2", paramIndex: 6, offset: 0x0017, type: "select", encoding: "nibbles", min: null, max: null, options: null, pending: "Lista de intervalos (-2 oct … +2 oct, USER) não documentada nos PDFs; confirmar na pedaleira." },
                level2: { name: "2: Level", label: "Volume da Voz 2", paramIndex: 7, offset: 0x001B, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                preDelay2: { name: "2: Pre-Delay", label: "Atraso da Voz 2", paramIndex: 8, offset: 0x001F, type: "range", encoding: "nibbles", min: 0, max: 300, unit: "ms", midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x01, 0x02, 0x0C] },
                directLevel: { name: "Direct Level", label: "Nível Direto", paramIndex: 9, offset: 0x0023, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04] },
                // Escala do usuário: 12 notas por voz, usadas quando HARMONY = USER
                scale1C: { name: "HR1:C", label: "Escala do Usuário 1 – C", paramIndex: 10, offset: 0x0027, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1DFlat: { name: "HR1:Db", label: "Escala do Usuário 1 – Db", paramIndex: 11, offset: 0x002B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1D: { name: "HR1:D", label: "Escala do Usuário 1 – D", paramIndex: 12, offset: 0x002F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1EFlat: { name: "HR1:Eb", label: "Escala do Usuário 1 – Eb", paramIndex: 13, offset: 0x0033, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1E: { name: "HR1:E", label: "Escala do Usuário 1 – E", paramIndex: 14, offset: 0x0037, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1F: { name: "HR1:F", label: "Escala do Usuário 1 – F", paramIndex: 15, offset: 0x003B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1FSharp: { name: "HR1:F#", label: "Escala do Usuário 1 – F#", paramIndex: 16, offset: 0x003F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1G: { name: "HR1:G", label: "Escala do Usuário 1 – G", paramIndex: 17, offset: 0x0043, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1AFlat: { name: "HR1:Ab", label: "Escala do Usuário 1 – Ab", paramIndex: 18, offset: 0x0047, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1A: { name: "HR1:A", label: "Escala do Usuário 1 – A", paramIndex: 19, offset: 0x004B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1BFlat: { name: "HR1:Bb", label: "Escala do Usuário 1 – Bb", paramIndex: 20, offset: 0x004F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale1B: { name: "HR1:B", label: "Escala do Usuário 1 – B", paramIndex: 21, offset: 0x0053, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2C: { name: "HR2:C", label: "Escala do Usuário 2 – C", paramIndex: 22, offset: 0x0057, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2DFlat: { name: "HR2:Db", label: "Escala do Usuário 2 – Db", paramIndex: 23, offset: 0x005B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2D: { name: "HR2:D", label: "Escala do Usuário 2 – D", paramIndex: 24, offset: 0x005F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2EFlat: { name: "HR2:Eb", label: "Escala do Usuário 2 – Eb", paramIndex: 25, offset: 0x0063, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2E: { name: "HR2:E", label: "Escala do Usuário 2 – E", paramIndex: 26, offset: 0x0067, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2F: { name: "HR2:F", label: "Escala do Usuário 2 – F", paramIndex: 27, offset: 0x006B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2FSharp: { name: "HR2:F#", label: "Escala do Usuário 2 – F#", paramIndex: 28, offset: 0x006F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2G: { name: "HR2:G", label: "Escala do Usuário 2 – G", paramIndex: 29, offset: 0x0073, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2AFlat: { name: "HR2:Ab", label: "Escala do Usuário 2 – Ab", paramIndex: 30, offset: 0x0077, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2A: { name: "HR2:A", label: "Escala do Usuário 2 – A", paramIndex: 31, offset: 0x007B, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2BFlat: { name: "HR2:Bb", label: "Escala do Usuário 2 – Bb", paramIndex: 32, offset: 0x007F, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] },
                scale2B: { name: "HR2:B", label: "Escala do Usuário 2 – B", paramIndex: 33, offset: 0x0083, type: "range", encoding: "nibbles", min: -24, max: 24, unit: "semitons", midiMin: [0x07, 0x0F, 0x0E, 0x08], midiMax: [0x08, 0x00, 0x01, 0x08] }
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
                abBalance: { name: "A/B Balance", label: "Equilíbrio A/B (100:0 … 0:100)", paramIndex: 4, offset: 0x000F, type: "range", encoding: "nibbles", min: 0, max: 100, midiMin: [0x08, 0x00, 0x00, 0x00], midiMax: [0x08, 0x00, 0x06, 0x04], unverified: "O display mostra 100:0 … 0:100; os PDFs não informam a faixa bruta nem o passo. Assumido 0–100 (0 = 100:0). Confirmar na pedaleira." },
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
        }
    };
})();
