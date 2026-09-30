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
        }
    };
})();
