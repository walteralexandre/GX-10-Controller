/**
 * CTL/EXP da BOSS GX-10: o que cada pé/botão faz e as 20 atribuições (assigns).
 *
 * Deslocamentos:
 *   · por memória  -> [MemoryCommon], dentro da memória (temporária ou de usuário)
 *   · do sistema   -> [SystemControl], endereço 00 00 10 00
 * Os nomes das linhas seguem o que aparece na tela da pedaleira (GX-10); o manual
 * chama de BankDown/BankUp, Manual Num1/2, CNum, Ctl1-3, Exp1Sw, Exp1 e Exp2.
 */
window.GX10_CTLEXP_VERSAO = "0.11.3";
window.GX10_CTLEXP = {
 "listas": {
  "funcDownUp": [
   [
    0,
    "OFF"
   ],
   [
    2,
    "DOWN"
   ],
   [
    3,
    "UP"
   ],
   [
    4,
    "BPM TAP"
   ],
   [
    5,
    "TUNER"
   ],
   [
    6,
    "MEMORY/MAN"
   ],
   [
    7,
    "TUNER/MAN"
   ],
   [
    8,
    "MAN/TUNER"
   ],
   [
    11,
    "WAH"
   ],
   [
    12,
    "DIV CH.SEL"
   ],
   [
    13,
    "SEND/RETURN"
   ],
   [
    14,
    "LOOP CTL"
   ],
   [
    15,
    "LOOP STOP"
   ],
   [
    16,
    "LOOP CLEAR"
   ],
   [
    17,
    "MIDI START"
   ]
  ],
  "funcManual": [
   [
    0,
    "OFF"
   ],
   [
    1,
    "BPM TAP"
   ],
   [
    2,
    "TUNER"
   ],
   [
    3,
    "MEMORY/MAN"
   ],
   [
    4,
    "TUNER/MAN"
   ],
   [
    5,
    "MAN/TUNER"
   ],
   [
    8,
    "WAH"
   ],
   [
    9,
    "DIV CH.SEL"
   ],
   [
    10,
    "SEND/RETURN"
   ],
   [
    11,
    "LOOP CTL"
   ],
   [
    12,
    "LOOP STOP"
   ],
   [
    13,
    "LOOP CLEAR"
   ],
   [
    14,
    "MIDI START"
   ]
  ],
  "funcCtl": [
   [
    0,
    "OFF"
   ],
   [
    1,
    "BANK DOWN"
   ],
   [
    2,
    "BANK UP"
   ],
   [
    3,
    "DOWN"
   ],
   [
    4,
    "UP"
   ],
   [
    5,
    "BPM TAP"
   ],
   [
    6,
    "TUNER"
   ],
   [
    7,
    "MEMORY/MAN"
   ],
   [
    8,
    "TUNER/MAN"
   ],
   [
    9,
    "MAN/TUNER"
   ],
   [
    12,
    "WAH"
   ],
   [
    13,
    "DIV CH.SEL"
   ],
   [
    14,
    "SEND/RETURN"
   ],
   [
    15,
    "LOOP CTL"
   ],
   [
    16,
    "LOOP STOP"
   ],
   [
    17,
    "LOOP CLEAR"
   ],
   [
    18,
    "MIDI START"
   ]
  ],
  "funcExp": [
   [
    0,
    "OFF"
   ],
   [
    1,
    "FOOT VOL"
   ],
   [
    2,
    "WAH"
   ],
   [
    3,
    "FV/WAH"
   ],
   [
    4,
    "FV+TU"
   ],
   [
    5,
    "FV+TU/WAH"
   ]
  ],
  "modo": [
   "TOGGLE",
   "MOMENT"
  ],
  "preferencia": [
   "MEMORY",
   "SYSTEM"
  ],
  "comModo": [
   "TUNER",
   "WAH",
   "DIV CH.SEL",
   "SEND/RETURN",
   "MIDI START"
  ],
  "controlMode": [
   "MEMORY",
   "MANUAL",
   "BANK/NUM",
   "MANUAL2"
  ]
 },
 "controles": [
  {
   "rotulo": "UP",
   "lista": "funcDownUp",
   "grupo": "memory",
   "mem": {
    "funcao": 21,
    "modo": 39
   },
   "sis": {
    "pref": 5,
    "funcao": 23,
    "modo": 41
   }
  },
  {
   "rotulo": "DOWN",
   "lista": "funcDownUp",
   "grupo": "memory",
   "mem": {
    "funcao": 20,
    "modo": 38
   },
   "sis": {
    "pref": 4,
    "funcao": 22,
    "modo": 40
   }
  },
  {
   "rotulo": "MANUAL UP",
   "lista": "funcManual",
   "grupo": "manual",
   "mem": {
    "funcao": 24,
    "modo": 42
   },
   "sis": {
    "pref": 8,
    "funcao": 26,
    "modo": 44
   }
  },
  {
   "rotulo": "MANUAL DOWN",
   "lista": "funcManual",
   "grupo": "manual",
   "mem": {
    "funcao": 23,
    "modo": 41
   },
   "sis": {
    "pref": 7,
    "funcao": 25,
    "modo": 43
   }
  },
  {
   "rotulo": "CTL 1",
   "lista": "funcCtl",
   "grupo": "sempre",
   "mem": {
    "funcao": 27,
    "modo": 45
   },
   "sis": {
    "pref": 11,
    "funcao": 29,
    "modo": 47
   }
  },
  {
   "rotulo": "CTL 2",
   "lista": "funcCtl",
   "grupo": "sempre",
   "mem": {
    "funcao": 28,
    "modo": 46
   },
   "sis": {
    "pref": 12,
    "funcao": 30,
    "modo": 48
   }
  },
  {
   "rotulo": "CTL 3",
   "lista": "funcCtl",
   "grupo": "sempre",
   "mem": {
    "funcao": 29,
    "modo": 47
   },
   "sis": {
    "pref": 13,
    "funcao": 31,
    "modo": 49
   }
  },
  {
   "rotulo": "EXP 1 SW",
   "lista": "funcCtl",
   "grupo": "sempre",
   "mem": {
    "funcao": 31,
    "modo": 49
   },
   "sis": {
    "pref": 15,
    "funcao": 33,
    "modo": 51
   }
  },
  {
   "rotulo": "EXP 1 PEDAL",
   "lista": "funcExp",
   "grupo": "sempre",
   "mem": {
    "funcao": 32,
    "modo": null
   },
   "sis": {
    "pref": 16,
    "funcao": 34,
    "modo": null
   }
  },
  {
   "rotulo": "EXP 2",
   "lista": "funcExp",
   "grupo": "sempre",
   "mem": {
    "funcao": 33,
    "modo": null
   },
   "sis": {
    "pref": 17,
    "funcao": 35,
    "modo": null
   }
  },
  {
   "rotulo": "CUR NUM",
   "lista": "funcManual",
   "grupo": "banknum",
   "mem": {
    "funcao": 22,
    "modo": 40
   },
   "sis": {
    "pref": 6,
    "funcao": 24,
    "modo": 42
   }
  }
 ],
 "assign": {
  "campos": [
   {
    "chave": "sw",
    "rotulo": "On/Off",
    "desloc": 0,
    "tipo": "byte",
    "lista": [
     "OFF",
     "ON"
    ]
   },
   {
    "chave": "fxItem",
    "rotulo": "Block",
    "desloc": 1,
    "tipo": "byte",
    "min": 0,
    "max": 19,
    "base1": true
   },
   {
    "chave": "target",
    "rotulo": "Target",
    "desloc": 2,
    "tipo": "nibbles4",
    "min": 0,
    "max": 740,
    "alvos": true
   },
   {
    "chave": "targetMin",
    "rotulo": "Target min",
    "desloc": 6,
    "tipo": "nibbles4",
    "min": 0,
    "max": 65535
   },
   {
    "chave": "targetMax",
    "rotulo": "Target max",
    "desloc": 10,
    "tipo": "nibbles4",
    "min": 0,
    "max": 65535
   },
   {
    "chave": "source",
    "rotulo": "Source",
    "desloc": 14,
    "tipo": "byte",
    "lista": [
     "NUM 1",
     "NUM 2",
     "NUM 3",
     "NUM 4",
     "MAN 1",
     "MAN 2",
     "MAN 3",
     "MAN 4",
     "CUR NUM",
     "BANK DOWN",
     "BANK UP",
     "CTL 1",
     "CTL 2",
     "CTL 3",
     "CTL 4",
     "EXP 1 SW",
     "EXP 1",
     "EXP 2",
     "INT PDL",
     "WAVE PDL",
     "INPUT",
     "CC# 1",
     "CC# 2",
     "CC# 3",
     "CC# 4",
     "CC# 5",
     "CC# 6",
     "CC# 7",
     "CC# 8",
     "CC# 9",
     "CC# 10",
     "CC# 11",
     "CC# 12",
     "CC# 13",
     "CC# 14",
     "CC# 15",
     "CC# 16",
     "CC# 17",
     "CC# 18",
     "CC# 19",
     "CC# 20",
     "CC# 21",
     "CC# 22",
     "CC# 23",
     "CC# 24",
     "CC# 25",
     "CC# 26",
     "CC# 27",
     "CC# 28",
     "CC# 29",
     "CC# 30",
     "CC# 31",
     "CC# 64",
     "CC# 65",
     "CC# 66",
     "CC# 67",
     "CC# 68",
     "CC# 69",
     "CC# 70",
     "CC# 71",
     "CC# 72",
     "CC# 73",
     "CC# 74",
     "CC# 75",
     "CC# 76",
     "CC# 77",
     "CC# 78",
     "CC# 79",
     "CC# 80",
     "CC# 81",
     "CC# 82",
     "CC# 83",
     "CC# 84",
     "CC# 85",
     "CC# 86",
     "CC# 87",
     "CC# 88",
     "CC# 89",
     "CC# 90",
     "CC# 91",
     "CC# 92",
     "CC# 93",
     "CC# 94",
     "CC# 95"
    ]
   },
   {
    "chave": "mode",
    "rotulo": "Mode",
    "desloc": 15,
    "tipo": "byte",
    "lista": [
     "TOGGLE",
     "MOMENT"
    ]
   },
   {
    "chave": "waveRate",
    "rotulo": "Wave rate",
    "desloc": 16,
    "tipo": "byte",
    "min": 0,
    "max": 118
   },
   {
    "chave": "waveform",
    "rotulo": "Waveform",
    "desloc": 17,
    "tipo": "byte",
    "lista": [
     "SAW",
     "TRI",
     "SINE"
    ]
   },
   {
    "chave": "intTrigger",
    "rotulo": "Int pedal trigger",
    "desloc": 18,
    "tipo": "byte",
    "lista": [
     "MEM CHANGE",
     "NUM 1",
     "NUM 2",
     "NUM 3",
     "NUM 4",
     "MAN 1",
     "MAN 2",
     "MAN 3",
     "MAN 4",
     "CUR NUM",
     "BANK DOWN",
     "BANK UP",
     "CTL 1",
     "CTL 2",
     "CTL 3",
     "CTL 4",
     "EXP 1 SW",
     "EXP 1 PDL-LO",
     "EXP 1 PDL-MID",
     "EXP 1 PDL-HI",
     "EXP 2",
     "CC# 1",
     "CC# 2",
     "CC# 3",
     "CC# 4",
     "CC# 5",
     "CC# 6",
     "CC# 7",
     "CC# 8",
     "CC# 9",
     "CC# 10",
     "CC# 11",
     "CC# 12",
     "CC# 13",
     "CC# 14",
     "CC# 15",
     "CC# 16",
     "CC# 17",
     "CC# 18",
     "CC# 19",
     "CC# 20",
     "CC# 21",
     "CC# 22",
     "CC# 23",
     "CC# 24",
     "CC# 25",
     "CC# 26",
     "CC# 27",
     "CC# 28",
     "CC# 29",
     "CC# 30",
     "CC# 31",
     "CC# 64",
     "CC# 65",
     "CC# 66",
     "CC# 67",
     "CC# 68",
     "CC# 69",
     "CC# 70",
     "CC# 71",
     "CC# 72",
     "CC# 73",
     "CC# 74",
     "CC# 75",
     "CC# 76",
     "CC# 77",
     "CC# 78",
     "CC# 79",
     "CC# 80",
     "CC# 81",
     "CC# 82",
     "CC# 83",
     "CC# 84",
     "CC# 85",
     "CC# 86",
     "CC# 87",
     "CC# 88",
     "CC# 89",
     "CC# 90",
     "CC# 91",
     "CC# 92",
     "CC# 93",
     "CC# 94",
     "CC# 95"
    ]
   },
   {
    "chave": "intTime",
    "rotulo": "Int pedal time",
    "desloc": 19,
    "tipo": "byte",
    "min": 0,
    "max": 100
   },
   {
    "chave": "intCurve",
    "rotulo": "Int pedal curve",
    "desloc": 20,
    "tipo": "byte",
    "lista": [
     "LINEAR",
     "SLOW RISE",
     "FAST RISE"
    ]
   },
   {
    "chave": "actLo",
    "rotulo": "Act range lo",
    "desloc": 21,
    "tipo": "nibbles4",
    "min": 0,
    "max": 16382
   },
   {
    "chave": "actHi",
    "rotulo": "Act range hi",
    "desloc": 25,
    "tipo": "nibbles4",
    "min": 1,
    "max": 16383
   },
   {
    "chave": "midiCh",
    "rotulo": "MIDI channel",
    "desloc": 29,
    "tipo": "byte",
    "lista": [
     "SYSTEM",
     "1",
     "2",
     "3",
     "4",
     "5",
     "6",
     "7",
     "8",
     "9",
     "10",
     "11",
     "12",
     "13",
     "14",
     "15",
     "16"
    ]
   },
   {
    "chave": "midiCc",
    "rotulo": "MIDI CC#",
    "desloc": 30,
    "tipo": "byte",
    "min": 0,
    "max": 127
   },
   {
    "chave": "ccMin",
    "rotulo": "CC value min",
    "desloc": 31,
    "tipo": "nibbles4",
    "min": 0,
    "max": 16383
   },
   {
    "chave": "ccMax",
    "rotulo": "CC value max",
    "desloc": 35,
    "tipo": "nibbles4",
    "min": 0,
    "max": 16383
   },
   {
    "chave": "midiPc",
    "rotulo": "MIDI PC#",
    "desloc": 40,
    "tipo": "byte",
    "min": 0,
    "max": 127,
    "base1": true
   }
  ],
  "total": 20,
  "passo": 64,
  "desloc1": 256,
  "paginas": [
   {
    "rotulo": "Page 1",
    "colunas": [
     [
      "On/Off",
      "sw"
     ],
     [
      "Source",
      "source"
     ],
     [
      "Mode",
      "mode"
     ],
     [
      "Category",
      "__bloco"
     ],
     [
      "Parameter",
      "target"
     ]
    ]
   },
   {
    "rotulo": "Page 2",
    "colunas": [
     [
      "Act low",
      "actLo"
     ],
     [
      "Act high",
      "actHi"
     ],
     [
      "Target min",
      "targetMin"
     ],
     [
      "Target max",
      "targetMax"
     ]
    ]
   },
   {
    "rotulo": "Page 3",
    "colunas": [
     [
      "Int pedal trigger",
      "intTrigger"
     ],
     [
      "Int pedal time",
      "intTime"
     ],
     [
      "Int pedal curve",
      "intCurve"
     ]
    ]
   },
   {
    "rotulo": "Page 4",
    "colunas": [
     [
      "Wave form",
      "waveform"
     ],
     [
      "Wave rate",
      "waveRate"
     ],
     [
      "Input sens",
      "__naoMapeado"
     ]
    ]
   },
   {
    "rotulo": "Page 5",
    "colunas": [
     [
      "MIDI channel",
      "midiCh"
     ],
     [
      "CC#",
      "midiCc"
     ],
     [
      "CC min",
      "ccMin"
     ],
     [
      "CC max",
      "ccMax"
     ]
    ]
   },
   {
    "rotulo": "Page 6",
    "colunas": [
     [
      "PC#",
      "midiPc"
     ],
     [
      "Bank MSB",
      "__naoMapeado"
     ],
     [
      "Bank LSB",
      "__naoMapeado"
     ]
    ]
   }
  ]
 },
 "knobs": [
  {
   "rotulo": "Knob 1",
   "fxItem": 105,
   "alvo": 109
  },
  {
   "rotulo": "Knob 2",
   "fxItem": 106,
   "alvo": 113
  },
  {
   "rotulo": "Knob 3",
   "fxItem": 107,
   "alvo": 117
  },
  {
   "rotulo": "Knob 4",
   "fxItem": 108,
   "alvo": 121
  }
 ],
 "memoryMidi": [
  {
   "rotulo": "MIDI 1",
   "campos": [
    {
     "chave": "ch",
     "rotulo": "CH",
     "desloc": 53,
     "tipo": "byte",
     "lista": [
      "OFF",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16"
     ]
    },
    {
     "chave": "pc",
     "rotulo": "PC#",
     "desloc": 58,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "bankMsb",
     "rotulo": "BANK MSB",
     "desloc": 54,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "bankLsb",
     "rotulo": "BANK LSB",
     "desloc": 56,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc1",
     "rotulo": "CC1#",
     "desloc": 60,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc1Val",
     "rotulo": "CC1 VALUE",
     "desloc": 62,
     "tipo": "byte",
     "min": 0,
     "max": 127
    },
    {
     "chave": "cc2",
     "rotulo": "CC2#",
     "desloc": 63,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc2Val",
     "rotulo": "CC2 VALUE",
     "desloc": 65,
     "tipo": "byte",
     "min": 0,
     "max": 127
    }
   ]
  },
  {
   "rotulo": "MIDI 2",
   "campos": [
    {
     "chave": "ch",
     "rotulo": "CH",
     "desloc": 66,
     "tipo": "byte",
     "lista": [
      "OFF",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16"
     ]
    },
    {
     "chave": "pc",
     "rotulo": "PC#",
     "desloc": 71,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "bankMsb",
     "rotulo": "BANK MSB",
     "desloc": 67,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "bankLsb",
     "rotulo": "BANK LSB",
     "desloc": 69,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc1",
     "rotulo": "CC1#",
     "desloc": 73,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc1Val",
     "rotulo": "CC1 VALUE",
     "desloc": 75,
     "tipo": "byte",
     "min": 0,
     "max": 127
    },
    {
     "chave": "cc2",
     "rotulo": "CC2#",
     "desloc": 76,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc2Val",
     "rotulo": "CC2 VALUE",
     "desloc": 78,
     "tipo": "byte",
     "min": 0,
     "max": 127
    }
   ]
  },
  {
   "rotulo": "MIDI 3",
   "campos": [
    {
     "chave": "ch",
     "rotulo": "CH",
     "desloc": 79,
     "tipo": "byte",
     "lista": [
      "OFF",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16"
     ]
    },
    {
     "chave": "pc",
     "rotulo": "PC#",
     "desloc": 84,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "bankMsb",
     "rotulo": "BANK MSB",
     "desloc": 80,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "bankLsb",
     "rotulo": "BANK LSB",
     "desloc": 82,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc1",
     "rotulo": "CC1#",
     "desloc": 86,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc1Val",
     "rotulo": "CC1 VALUE",
     "desloc": 88,
     "tipo": "byte",
     "min": 0,
     "max": 127
    },
    {
     "chave": "cc2",
     "rotulo": "CC2#",
     "desloc": 89,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc2Val",
     "rotulo": "CC2 VALUE",
     "desloc": 91,
     "tipo": "byte",
     "min": 0,
     "max": 127
    }
   ]
  },
  {
   "rotulo": "MIDI 4",
   "campos": [
    {
     "chave": "ch",
     "rotulo": "CH",
     "desloc": 92,
     "tipo": "byte",
     "lista": [
      "OFF",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16"
     ]
    },
    {
     "chave": "pc",
     "rotulo": "PC#",
     "desloc": 97,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "bankMsb",
     "rotulo": "BANK MSB",
     "desloc": 93,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "bankLsb",
     "rotulo": "BANK LSB",
     "desloc": 95,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc1",
     "rotulo": "CC1#",
     "desloc": 99,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc1Val",
     "rotulo": "CC1 VALUE",
     "desloc": 101,
     "tipo": "byte",
     "min": 0,
     "max": 127
    },
    {
     "chave": "cc2",
     "rotulo": "CC2#",
     "desloc": 102,
     "tipo": "nibbles2",
     "min": 0,
     "max": 128,
     "zeroOff": true
    },
    {
     "chave": "cc2Val",
     "rotulo": "CC2 VALUE",
     "desloc": 104,
     "tipo": "byte",
     "min": 0,
     "max": 127
    }
   ]
  }
 ],
 "presetsFabrica": [
  "GX DUAL DRIVE",
  "HEAVY METAL",
  "STUDIO BLUES",
  "JC CLEAN",
  "LEAD DRIVE",
  "CRUNCH LEAD",
  "NEO SOUL",
  "MODERN OD",
  "MODERN DS",
  "CLEAN+SHIMMER",
  "MILD DRIVE",
  "ACOUSTIC GUITAR",
  "X-ULTRA FEED",
  "X-OPTIMA SD-1",
  "X-TITAN MDP",
  "DUAL X LEAD",
  "SLICER DRIVE",
  "HUMANIZER AC",
  "BRIGHT SITAR",
  "AUTO WAH BOX",
  "FUZZY ROCK",
  "PHASER CLEAN",
  "BG DRIVE",
  "OCTAVE CLEAN",
  "HI-GAIN LEAD",
  "DIMENSION FL",
  "DRIVE + OCT CLN",
  "SYNTH LEAD",
  "RICH CHORUS DS",
  "BASIC GIG",
  "ROTARY+ECHO",
  "AMBIENT CLEAN",
  "FUSION SOLO",
  "TWEED DRIVE",
  "FLYING OVERTONE",
  "CONSOLE CLEAN",
  "DUAL CRUNCH",
  "FUZZ SOLO",
  "BOOST BAR BROS",
  "THE BELLS",
  "WINDWARD",
  "ANCIENT MOON",
  "CAPO'S & NUTS",
  "WINTER IN 2047",
  "JAZZ CLUB",
  "GITARRE SPIELEN",
  "SLOW DANCE",
  "OVERTONE ORGAN",
  "NEW AGED BLUES",
  "SPACE ECHO",
  "CLEAR DRIVE",
  "GOOD FEELING",
  "SURF COWBOY",
  "AMERICANA",
  "TREBLE BOOST",
  "DIGITAL OCEAN",
  "FUNK DRIVE",
  "SUPER CLEAN/DS",
  "ANCIENT DREAM",
  "OCTAVE FUNK",
  "GRAVITY GAINS",
  "AMBIENT LEAD",
  "DJENT METAL",
  "SKYBLUE PINK",
  "FUZZY DIST",
  "DIMI GILMORIX",
  "A LIGHTER TOUCH",
  "HARMONIC DIST",
  "PROUD DAD",
  "DRY CRUNCH",
  "OCTAVE CRUNCH",
  "FUSION SWELLS",
  "LO-FI CLEAN",
  "SLAP GUITAR",
  "1993",
  "OCTAVE ORGAN",
  "BIG DRIVE",
  "BLUE LAKE",
  "FAIRY OF FOREST",
  "HARMONIC DRIVE",
  "PROG LEAD TONE",
  "CRYSTAL CLEAN",
  "CLEAN BOOSTER",
  "BUBBLE DELAY",
  "HOT COUNTRY",
  "EXPENSIVE TASTE",
  "SWAMP CHORUS",
  "EVERY 00'S MOVIE",
  "STUDIO BASS",
  "ROCK BASS CRUNCH",
  "CLEAN ROCK BASS",
  "T WAH BASS",
  "DIST ROCK BASS",
  "MONO BASS CLOUD",
  "SYNTHY OCT BASS",
  "FUZZ BASS",
  "LOOPER CLEAN",
  "LOOPER CRUNCH",
  "LOOPER DRIVE"
 ],
 "controlModeDesloc": 52,
 "alvosPorTipo": {
  "0": [
   [
    2,
    "BODY"
   ],
   [
    3,
    "LOW"
   ],
   [
    4,
    "HIGH"
   ],
   [
    5,
    "LEVEL"
   ]
  ],
  "1": [
   [
    6,
    "TYPE"
   ],
   [
    7,
    "RESONANCE"
   ],
   [
    8,
    "TONE"
   ],
   [
    9,
    "LEVEL"
   ]
  ],
  "70": [
   [
    10,
    "SENS"
   ],
   [
    11,
    "RISE TIME"
   ],
   [
    12,
    "LEVEL"
   ]
  ],
  "71": [
   [
    13,
    "SENS"
   ],
   [
    14,
    "RISE TIME"
   ],
   [
    15,
    "LEVEL"
   ]
  ],
  "11": [
   [
    16,
    "SENS"
   ],
   [
    17,
    "DEPTH"
   ],
   [
    18,
    "TONE"
   ],
   [
    19,
    "EFFECT LEVEL"
   ],
   [
    20,
    "ATTACK"
   ],
   [
    21,
    "RESONANCE"
   ],
   [
    22,
    "DIRECT MIX"
   ]
  ],
  "12": [
   [
    23,
    "SENS"
   ],
   [
    24,
    "ATTACK"
   ],
   [
    25,
    "TONE"
   ],
   [
    26,
    "EFFECT LEVEL"
   ],
   [
    27,
    "DIRECT MIX"
   ]
  ],
  "53": [
   [
    28,
    "WAH TYPE"
   ],
   [
    29,
    "PEDAL POSITION"
   ],
   [
    30,
    "PEDAL MIN"
   ],
   [
    31,
    "PEDAL MAX"
   ],
   [
    32,
    "EFFECT LEVEL"
   ],
   [
    33,
    "DIRECT MIX"
   ]
  ],
  "54": [
   [
    34,
    "PEDAL POSITION"
   ],
   [
    35,
    "PEDAL MIN"
   ],
   [
    36,
    "PEDAL MAX"
   ],
   [
    37,
    "EFFECT LEVEL"
   ],
   [
    38,
    "DIRECT MIX"
   ]
  ],
  "72": [
   [
    39,
    "FILTER MODE"
   ],
   [
    40,
    "POLARITY"
   ],
   [
    41,
    "SENS"
   ],
   [
    42,
    "FREQUENCY"
   ],
   [
    43,
    "RESONANCE"
   ],
   [
    44,
    "DECAY"
   ],
   [
    45,
    "EFFECT LEVEL"
   ],
   [
    46,
    "DIRECT MIX"
   ]
  ],
  "73": [
   [
    47,
    "FILTER MODE"
   ],
   [
    48,
    "POLARITY"
   ],
   [
    49,
    "SENS"
   ],
   [
    50,
    "FREQUENCY"
   ],
   [
    51,
    "RESONANCE"
   ],
   [
    52,
    "DECAY"
   ],
   [
    53,
    "EFFECT LEVEL"
   ],
   [
    54,
    "DIRECT MIX"
   ]
  ],
  "8": [
   [
    55,
    "TYPE"
   ],
   [
    56,
    "SUSTAIN"
   ],
   [
    57,
    "ATTACK"
   ],
   [
    58,
    "LEVEL"
   ],
   [
    59,
    "TONE"
   ],
   [
    60,
    "DIRECT MIX"
   ]
  ],
  "9": [
   [
    61,
    "ATTACK"
   ],
   [
    62,
    "LEVEL"
   ],
   [
    63,
    "TONE"
   ],
   [
    64,
    "RATIO"
   ],
   [
    65,
    "DIRECT MIX"
   ],
   [
    66,
    "SUSTAIN"
   ]
  ],
  "10": [
   [
    67,
    "ATTACK"
   ],
   [
    68,
    "LEVEL"
   ],
   [
    69,
    "TONE"
   ],
   [
    70,
    "RATIO"
   ],
   [
    71,
    "DIRECT MIX"
   ],
   [
    72,
    "THRESHOLD"
   ]
  ],
  "36": [
   [
    73,
    "TYPE"
   ],
   [
    74,
    "BOOST"
   ],
   [
    75,
    "TONE"
   ],
   [
    76,
    "EFFECT LEVEL"
   ],
   [
    77,
    "BOTTOM"
   ],
   [
    78,
    "DIRECT MIX"
   ],
   [
    79,
    "SOLO SW"
   ],
   [
    80,
    "SOLO LEVEL"
   ]
  ],
  "37": [
   [
    81,
    "TYPE"
   ],
   [
    82,
    "DRIVE"
   ],
   [
    83,
    "TONE"
   ],
   [
    84,
    "EFFECT LEVEL"
   ],
   [
    85,
    "BOTTOM"
   ],
   [
    86,
    "DIRECT MIX"
   ],
   [
    87,
    "SOLO SW"
   ],
   [
    88,
    "SOLO LEVEL"
   ]
  ],
  "38": [
   [
    89,
    "DRIVE"
   ],
   [
    90,
    "TONE"
   ],
   [
    91,
    "EFFECT LEVEL"
   ],
   [
    92,
    "BOTTOM"
   ],
   [
    93,
    "DIRECT MIX"
   ],
   [
    94,
    "SOLO SW"
   ],
   [
    95,
    "SOLO LEVEL"
   ]
  ],
  "43": [
   [
    96,
    "DRIVE"
   ],
   [
    97,
    "TONE"
   ],
   [
    98,
    "EFFECT LEVEL"
   ],
   [
    99,
    "BOTTOM"
   ],
   [
    100,
    "DIRECT MIX"
   ],
   [
    101,
    "SOLO SW"
   ],
   [
    102,
    "SOLO LEVEL"
   ]
  ],
  "44": [
   [
    103,
    "DRIVE"
   ],
   [
    104,
    "TONE"
   ],
   [
    105,
    "EFFECT LEVEL"
   ],
   [
    106,
    "BOTTOM"
   ],
   [
    107,
    "DIRECT MIX"
   ],
   [
    108,
    "SOLO SW"
   ],
   [
    109,
    "SOLO LEVEL"
   ]
  ],
  "45": [
   [
    110,
    "DRIVE"
   ],
   [
    111,
    "TONE"
   ],
   [
    112,
    "EFFECT LEVEL"
   ],
   [
    113,
    "BOTTOM"
   ],
   [
    114,
    "DIRECT MIX"
   ],
   [
    115,
    "SOLO SW"
   ],
   [
    116,
    "SOLO LEVEL"
   ]
  ],
  "46": [
   [
    117,
    "TYPE"
   ],
   [
    118,
    "DIST"
   ],
   [
    119,
    "TONE"
   ],
   [
    120,
    "EFFECT LEVEL"
   ],
   [
    121,
    "BOTTOM"
   ],
   [
    122,
    "DIRECT MIX"
   ],
   [
    123,
    "SOLO SW"
   ],
   [
    124,
    "SOLO LEVEL"
   ]
  ],
  "47": [
   [
    125,
    "DIST"
   ],
   [
    126,
    "TONE"
   ],
   [
    127,
    "EFFECT LEVEL"
   ],
   [
    128,
    "BOTTOM"
   ],
   [
    129,
    "DIRECT MIX"
   ],
   [
    130,
    "SOLO SW"
   ],
   [
    131,
    "SOLO LEVEL"
   ]
  ],
  "39": [
   [
    132,
    "TYPE"
   ],
   [
    133,
    "DIST"
   ],
   [
    134,
    "TONE"
   ],
   [
    135,
    "EFFECT LEVEL"
   ],
   [
    136,
    "BOTTOM"
   ],
   [
    137,
    "DIRECT MIX"
   ],
   [
    138,
    "SOLO SW"
   ],
   [
    139,
    "SOLO LEVEL"
   ]
  ],
  "40": [
   [
    140,
    "TYPE"
   ],
   [
    141,
    "DRIVE"
   ],
   [
    142,
    "TONE"
   ],
   [
    143,
    "EFFECT LEVEL"
   ],
   [
    144,
    "BOTTOM"
   ],
   [
    145,
    "DIRECT MIX"
   ],
   [
    146,
    "SOLO SW"
   ],
   [
    147,
    "SOLO LEVEL"
   ]
  ],
  "41": [
   [
    148,
    "TYPE"
   ],
   [
    149,
    "FUZZ"
   ],
   [
    150,
    "TONE"
   ],
   [
    151,
    "EFFECT LEVEL"
   ],
   [
    152,
    "BOTTOM"
   ],
   [
    153,
    "DIRECT MIX"
   ],
   [
    154,
    "SOLO SW"
   ],
   [
    155,
    "SOLO LEVEL"
   ]
  ],
  "42": [
   [
    156,
    "FUZZ"
   ],
   [
    157,
    "TONE"
   ],
   [
    158,
    "EFFECT LEVEL"
   ],
   [
    159,
    "BOTTOM"
   ],
   [
    160,
    "DIRECT MIX"
   ],
   [
    161,
    "SOLO SW"
   ],
   [
    162,
    "SOLO LEVEL"
   ]
  ],
  "2": [
   [
    163,
    "TYPE"
   ],
   [
    164,
    "GAIN"
   ],
   [
    165,
    "LEVEL"
   ],
   [
    166,
    "BASS"
   ],
   [
    167,
    "MIDDLE"
   ],
   [
    168,
    "TREBLE"
   ],
   [
    169,
    "PRESENCE"
   ],
   [
    170,
    "GAIN SW"
   ],
   [
    171,
    "SOLO SW"
   ],
   [
    172,
    "SOLO LEVEL"
   ],
   [
    173,
    "BRIGHT SW"
   ],
   [
    174,
    "SAG"
   ],
   [
    175,
    "RESONANCE"
   ],
   [
    176,
    "DIRECT MIX"
   ],
   [
    177,
    "SP TYPE"
   ],
   [
    178,
    "MIC TYPE"
   ],
   [
    179,
    "MIC DISTANCE"
   ],
   [
    180,
    "MIC POSITION"
   ],
   [
    181,
    "MIC LEVEL"
   ]
  ],
  "3": [
   [
    182,
    "TYPE"
   ],
   [
    183,
    "GAIN"
   ],
   [
    184,
    "LEVEL"
   ],
   [
    185,
    "BASS"
   ],
   [
    186,
    "MIDDLE"
   ],
   [
    187,
    "TREBLE"
   ],
   [
    188,
    "PRESENCE"
   ],
   [
    189,
    "GAIN SW"
   ],
   [
    190,
    "SOLO SW"
   ],
   [
    191,
    "SOLO LEVEL"
   ],
   [
    192,
    "BRIGHT SW"
   ],
   [
    193,
    "SAG"
   ],
   [
    194,
    "RESONANCE"
   ],
   [
    195,
    "DIRECT MIX"
   ],
   [
    196,
    "SP TYPE"
   ],
   [
    197,
    "MIC TYPE"
   ],
   [
    198,
    "MIC DISTANCE"
   ],
   [
    199,
    "MIC POSITION"
   ],
   [
    200,
    "MIC LEVEL"
   ]
  ],
  "32": [
   [
    201,
    "THRESHOLD"
   ],
   [
    202,
    "RELEASE"
   ],
   [
    203,
    "DETECT"
   ]
  ],
  "29": [
   [
    204,
    "MODE"
   ],
   [
    205,
    "CH SELECT"
   ],
   [
    206,
    "MIX MODE"
   ],
   [
    207,
    "A:DYNAMIC"
   ],
   [
    208,
    "A:DYNAMIC SENS"
   ],
   [
    209,
    "A:FILTER"
   ],
   [
    210,
    "A:CUTOFF FREQ"
   ],
   [
    211,
    "B:DYNAMIC"
   ],
   [
    212,
    "B:DYNAMIC SENS"
   ],
   [
    213,
    "B:FILTER"
   ],
   [
    214,
    "B:CUTOFF FREQ"
   ]
  ],
  "31": [
   [
    215,
    "MODE"
   ],
   [
    216,
    "A LEVEL"
   ],
   [
    217,
    "B LEVEL"
   ],
   [
    218,
    "A/B BALANCE"
   ],
   [
    219,
    "SPREAD"
   ]
  ],
  "20": [
   [
    220,
    "LOW GAIN"
   ],
   [
    221,
    "HIGH GAIN"
   ],
   [
    222,
    "LEVEL"
   ],
   [
    223,
    "LOW-MID FREQ"
   ],
   [
    224,
    "LOW-MID Q"
   ],
   [
    225,
    "LOW-MID GAIN"
   ],
   [
    226,
    "HIGH-MID FREQ"
   ],
   [
    227,
    "HIGH-MID Q"
   ],
   [
    228,
    "HIGH-MID GAIN"
   ],
   [
    229,
    "LOW CUT"
   ],
   [
    230,
    "HIGH CUT"
   ]
  ],
  "21": [
   [
    231,
    "31.5Hz"
   ],
   [
    232,
    "63Hz"
   ],
   [
    233,
    "125Hz"
   ],
   [
    234,
    "250Hz"
   ],
   [
    235,
    "500Hz"
   ],
   [
    236,
    "1kHz"
   ],
   [
    237,
    "2kHz"
   ],
   [
    238,
    "4kHz"
   ],
   [
    239,
    "8kHz"
   ],
   [
    240,
    "16kHz"
   ],
   [
    241,
    "LEVEL"
   ]
  ],
  "4": [
   [
    242,
    "TYPE"
   ],
   [
    243,
    "DIRECT LEVEL"
   ],
   [
    244,
    "RATE"
   ],
   [
    245,
    "DEPTH"
   ],
   [
    246,
    "EFFECT LEVEL"
   ],
   [
    247,
    "LOW CUT"
   ],
   [
    248,
    "HIGH CUT"
   ],
   [
    249,
    "PRE-DELAY"
   ],
   [
    250,
    "WAVEFORM"
   ],
   [
    251,
    "1:RATE"
   ],
   [
    252,
    "1:DEPTH"
   ],
   [
    253,
    "1:EFFECT LEVEL"
   ],
   [
    254,
    "1:PRE-DELAY"
   ],
   [
    255,
    "1:WAVEFORM"
   ],
   [
    256,
    "1:LOW CUT"
   ],
   [
    257,
    "1:HIGH CUT"
   ],
   [
    258,
    "2:RATE"
   ],
   [
    259,
    "2:DEPTH"
   ],
   [
    260,
    "2:EFFECT LEVEL"
   ],
   [
    261,
    "2:PRE-DELAY"
   ],
   [
    262,
    "2:WAVEFORM"
   ],
   [
    263,
    "2:LOW CUT"
   ],
   [
    264,
    "2:HIGH CUT"
   ],
   [
    265,
    "OUTPUT MODE"
   ]
  ],
  "5": [
   [
    266,
    "TYPE"
   ],
   [
    267,
    "RATE"
   ],
   [
    268,
    "DEPTH"
   ],
   [
    269,
    "EFFECT LEVEL"
   ],
   [
    270,
    "LOW CUT"
   ],
   [
    271,
    "HIGH CUT"
   ],
   [
    272,
    "DIRECT LEVEL"
   ]
  ],
  "6": [
   [
    273,
    "RATE"
   ],
   [
    274,
    "DEPTH"
   ],
   [
    275,
    "EFFECT LEVEL"
   ],
   [
    276,
    "PRE-DELAY"
   ],
   [
    277,
    "WAVEFORM"
   ],
   [
    278,
    "LOW CUT"
   ],
   [
    279,
    "HIGH CUT"
   ],
   [
    280,
    "SWEETNESS"
   ],
   [
    281,
    "BELL"
   ],
   [
    282,
    "OUTPUT MODE"
   ]
  ],
  "48": [
   [
    283,
    "LOWER LEVEL"
   ],
   [
    284,
    "UPPER LEVEL"
   ],
   [
    285,
    "UNISON LEVEL"
   ],
   [
    286,
    "DIRECT LEVEL"
   ],
   [
    287,
    "DETUNE"
   ],
   [
    288,
    "OUTPUT MODE"
   ],
   [
    289,
    "LOW"
   ],
   [
    290,
    "HIGH"
   ]
  ],
  "13": [
   [
    291,
    "TIME"
   ],
   [
    292,
    "FEEDBACK"
   ],
   [
    293,
    "EFFECT LEVEL"
   ],
   [
    294,
    "DIRECT LEVEL"
   ],
   [
    295,
    "HIGH CUT"
   ],
   [
    296,
    "CARRYOVER"
   ]
  ],
  "14": [
   [
    297,
    "TYPE"
   ],
   [
    298,
    "DIRECT LEVEL"
   ],
   [
    299,
    "MOD RATE"
   ],
   [
    300,
    "MOD DEPTH"
   ],
   [
    301,
    "DUCK SENS"
   ],
   [
    302,
    "DUCK PRE"
   ],
   [
    303,
    "DUCK POST"
   ],
   [
    304,
    "CARRYOVER"
   ],
   [
    305,
    "TIME"
   ],
   [
    306,
    "FEEDBACK"
   ],
   [
    307,
    "EFFECT LEVEL"
   ],
   [
    308,
    "HIGH CUT"
   ],
   [
    309,
    "TAP TIME"
   ],
   [
    310,
    "AUTO TRIGGER"
   ],
   [
    311,
    "MODE"
   ],
   [
    312,
    "1:TYPE"
   ],
   [
    313,
    "1:TIME"
   ],
   [
    314,
    "1:FEEDBACK"
   ],
   [
    315,
    "1:EFFECT LEVEL"
   ],
   [
    316,
    "1:HIGH CUT"
   ],
   [
    317,
    "2:HIGH CUT"
   ],
   [
    318,
    "2:TYPE"
   ],
   [
    319,
    "2:TIME"
   ],
   [
    320,
    "2:FEEDBACK"
   ],
   [
    321,
    "2:EFFECT LEVEL"
   ]
  ],
  "15": [
   [
    322,
    "TYPE"
   ],
   [
    323,
    "TIME"
   ],
   [
    324,
    "FEEDBACK"
   ],
   [
    325,
    "EFFECT LEVEL"
   ],
   [
    326,
    "DIRECT LEVEL"
   ],
   [
    327,
    "HIGH CUT"
   ],
   [
    328,
    "MOD RATE"
   ],
   [
    329,
    "MOD DEPTH"
   ],
   [
    330,
    "DUCK SENS"
   ],
   [
    331,
    "DUCK PRE"
   ],
   [
    332,
    "DUCK POST"
   ],
   [
    333,
    "CARRYOVER"
   ]
  ],
  "16": [
   [
    334,
    "TIME"
   ],
   [
    335,
    "FEEDBACK"
   ],
   [
    336,
    "EFFECT LEVEL"
   ],
   [
    337,
    "DIRECT LEVEL"
   ],
   [
    338,
    "HIGH CUT"
   ],
   [
    339,
    "MOD RATE"
   ],
   [
    340,
    "MOD DEPTH"
   ],
   [
    341,
    "DUCK SENS"
   ],
   [
    342,
    "DUCK PRE"
   ],
   [
    343,
    "DUCK POST"
   ],
   [
    344,
    "HEAD"
   ],
   [
    345,
    "WOW FLUTTER"
   ],
   [
    346,
    "CARRYOVER"
   ]
  ],
  "17": [
   [
    347,
    "TIME"
   ],
   [
    348,
    "FEEDBACK"
   ],
   [
    349,
    "EFFECT LEVEL"
   ],
   [
    350,
    "DIRECT LEVEL"
   ],
   [
    351,
    "HIGH CUT"
   ],
   [
    352,
    "MOD RATE"
   ],
   [
    353,
    "MOD DEPTH"
   ],
   [
    354,
    "DUCK SENS"
   ],
   [
    355,
    "DUCK PRE"
   ],
   [
    356,
    "DUCK POST"
   ],
   [
    357,
    "PITCH"
   ],
   [
    358,
    "PITCH BALANCE"
   ],
   [
    359,
    "PITCH FEEDBACK"
   ],
   [
    360,
    "CARRYOVER"
   ]
  ],
  "18": [
   [
    361,
    "MODE"
   ],
   [
    362,
    "TRIGGER"
   ],
   [
    363,
    "LEVEL"
   ],
   [
    364,
    "RISE TIME"
   ],
   [
    365,
    "FALL TIME"
   ],
   [
    366,
    "FADE TIME"
   ],
   [
    367,
    "CARRYOVER"
   ]
  ],
  "19": [
   [
    368,
    "TIME"
   ],
   [
    369,
    "TRIGGER"
   ],
   [
    370,
    "LEVEL"
   ],
   [
    371,
    "CARRYOVER"
   ]
  ],
  "62": [
   [
    372,
    "TYPE"
   ],
   [
    373,
    "TIME"
   ],
   [
    374,
    "PRE-DELAY"
   ],
   [
    375,
    "EFFECT LEVEL"
   ],
   [
    376,
    "DENSITY"
   ],
   [
    377,
    "LOW CUT"
   ],
   [
    378,
    "HIGH CUT"
   ],
   [
    379,
    "DIRECT LEVEL"
   ],
   [
    380,
    "CARRYOVER"
   ]
  ],
  "63": [
   [
    381,
    "TYPE"
   ],
   [
    382,
    "TIME"
   ],
   [
    383,
    "TONE"
   ],
   [
    384,
    "EFFECT LEVEL"
   ],
   [
    385,
    "DENSITY"
   ],
   [
    386,
    "PRE-DELAY"
   ],
   [
    387,
    "LOW CUT"
   ],
   [
    388,
    "HIGH CUT"
   ],
   [
    389,
    "LOW DAMP"
   ],
   [
    390,
    "HIGH DAMP"
   ],
   [
    391,
    "MOD RATE"
   ],
   [
    392,
    "MOD DEPTH"
   ],
   [
    393,
    "DUCK SENS"
   ],
   [
    394,
    "DUCK PRE"
   ],
   [
    395,
    "DUCK POST"
   ],
   [
    396,
    "DIRECT LEVEL"
   ],
   [
    397,
    "CARRYOVER"
   ]
  ],
  "64": [
   [
    398,
    "TIME"
   ],
   [
    399,
    "TONE"
   ],
   [
    400,
    "EFFECT LEVEL"
   ],
   [
    401,
    "DENSITY"
   ],
   [
    402,
    "PRE-DELAY"
   ],
   [
    403,
    "LOW CUT"
   ],
   [
    404,
    "HIGH CUT"
   ],
   [
    405,
    "LOW DAMP"
   ],
   [
    406,
    "HIGH DAMP"
   ],
   [
    407,
    "MOD RATE"
   ],
   [
    408,
    "MOD DEPTH"
   ],
   [
    409,
    "DUCK SENS"
   ],
   [
    410,
    "DUCK PRE"
   ],
   [
    411,
    "DUCK POST"
   ],
   [
    412,
    "DIRECT LEVEL"
   ],
   [
    413,
    "1:PITCH"
   ],
   [
    414,
    "2:PITCH"
   ],
   [
    415,
    "1:LEVEL"
   ],
   [
    416,
    "2:LEVEL"
   ],
   [
    417,
    "CARRYOVER"
   ]
  ],
  "65": [
   [
    418,
    "MODE"
   ],
   [
    419,
    "SPREAD TIME"
   ],
   [
    420,
    "FEEDBACK"
   ],
   [
    421,
    "EFFECT LEVEL"
   ],
   [
    422,
    "TONE"
   ],
   [
    423,
    "DIRECT LEVEL"
   ],
   [
    424,
    "TRIGGER"
   ],
   [
    425,
    "CARRYOVER"
   ]
  ],
  "22": [
   [
    426,
    "RATE"
   ],
   [
    427,
    "DEPTH"
   ],
   [
    428,
    "RESONANCE"
   ],
   [
    429,
    "MANUAL"
   ],
   [
    430,
    "STEP RATE"
   ],
   [
    431,
    "LOW CUT"
   ],
   [
    432,
    "EFFECT LEVEL"
   ],
   [
    433,
    "DIRECT MIX"
   ]
  ],
  "23": [
   [
    434,
    "RATE"
   ],
   [
    435,
    "DEPTH"
   ],
   [
    436,
    "RESONANCE"
   ],
   [
    437,
    "MANUAL"
   ],
   [
    438,
    "STEP RATE"
   ],
   [
    439,
    "LOW CUT"
   ],
   [
    440,
    "EFFECT LEVEL"
   ],
   [
    441,
    "DIRECT MIX"
   ]
  ],
  "24": [
   [
    442,
    "RATE"
   ],
   [
    443,
    "DEPTH"
   ],
   [
    444,
    "RESONANCE"
   ],
   [
    445,
    "MANUAL"
   ],
   [
    446,
    "TURBO"
   ],
   [
    447,
    "WAVEFORM"
   ],
   [
    448,
    "STEP RATE"
   ],
   [
    449,
    "SEPARATION"
   ],
   [
    450,
    "EFFECT LEVEL"
   ],
   [
    451,
    "LOW DAMP"
   ],
   [
    452,
    "HIGH DAMP"
   ],
   [
    453,
    "DIRECT MIX"
   ],
   [
    454,
    "LOW CUT"
   ],
   [
    455,
    "HIGH CUT"
   ]
  ],
  "25": [
   [
    456,
    "RATE"
   ],
   [
    457,
    "DEPTH"
   ],
   [
    458,
    "RESONANCE"
   ],
   [
    459,
    "MANUAL"
   ],
   [
    460,
    "TURBO"
   ],
   [
    461,
    "WAVEFORM"
   ],
   [
    462,
    "STEP RATE"
   ],
   [
    463,
    "SEPARATION"
   ],
   [
    464,
    "EFFECT LEVEL"
   ],
   [
    465,
    "LOW DAMP"
   ],
   [
    466,
    "HIGH DAMP"
   ],
   [
    467,
    "DIRECT MIX"
   ],
   [
    468,
    "LOW CUT"
   ],
   [
    469,
    "HIGH CUT"
   ]
  ],
  "49": [
   [
    470,
    "RATE"
   ],
   [
    471,
    "DEPTH"
   ],
   [
    472,
    "WAVEFORM"
   ],
   [
    473,
    "EFFECT LEVEL"
   ],
   [
    474,
    "DIRECT MIX"
   ]
  ],
  "51": [
   [
    475,
    "PITCH MIN"
   ],
   [
    476,
    "PITCH MAX"
   ],
   [
    477,
    "PEDAL POSITION"
   ],
   [
    478,
    "EFFECT LEVEL"
   ],
   [
    479,
    "DIRECT MIX"
   ]
  ],
  "52": [
   [
    480,
    "PITCH MIN"
   ],
   [
    481,
    "PITCH MAX"
   ],
   [
    482,
    "PEDAL POSITION"
   ],
   [
    483,
    "EFFECT LEVEL"
   ],
   [
    484,
    "DIRECT MIX"
   ]
  ],
  "50": [
   [
    485,
    "PEDAL POSITION"
   ],
   [
    486,
    "VOLUME MIN"
   ],
   [
    487,
    "VOLUME MAX"
   ],
   [
    488,
    "CURVE"
   ]
  ],
  "26": [
   [
    489,
    "VOICE"
   ],
   [
    490,
    "1:HARMONY"
   ],
   [
    491,
    "1:LEVEL"
   ],
   [
    492,
    "1:PRE-DELAY"
   ],
   [
    493,
    "1:FEEDBACK"
   ],
   [
    494,
    "2:HARMONY"
   ],
   [
    495,
    "2:LEVEL"
   ],
   [
    496,
    "2:PRE-DELAY"
   ],
   [
    497,
    "DIRECT LEVEL"
   ],
   [
    498,
    "1:C"
   ],
   [
    499,
    "1:Db"
   ],
   [
    500,
    "1:D"
   ],
   [
    501,
    "1:Eb"
   ],
   [
    502,
    "1:E"
   ],
   [
    503,
    "1:F"
   ],
   [
    504,
    "1:F#"
   ],
   [
    505,
    "1:G"
   ],
   [
    506,
    "1:Ab"
   ],
   [
    507,
    "1:A"
   ],
   [
    508,
    "1:Bb"
   ],
   [
    509,
    "1:B"
   ],
   [
    510,
    "2:C"
   ],
   [
    511,
    "2:Db"
   ],
   [
    512,
    "2:D"
   ],
   [
    513,
    "2:Eb"
   ],
   [
    514,
    "2:E"
   ],
   [
    515,
    "2:F"
   ],
   [
    516,
    "2:F#"
   ],
   [
    517,
    "2:G"
   ],
   [
    518,
    "2:Ab"
   ],
   [
    519,
    "2:A"
   ],
   [
    520,
    "2:Bb"
   ],
   [
    521,
    "2:B"
   ]
  ],
  "27": [
   [
    522,
    "VOICE"
   ],
   [
    523,
    "1:HARMONY"
   ],
   [
    524,
    "1:LEVEL"
   ],
   [
    525,
    "1:PRE-DELAY"
   ],
   [
    526,
    "1:FEEDBACK"
   ],
   [
    527,
    "2:HARMONY"
   ],
   [
    528,
    "2:LEVEL"
   ],
   [
    529,
    "2:PRE-DELAY"
   ],
   [
    530,
    "DIRECT LEVEL"
   ],
   [
    531,
    "1:C"
   ],
   [
    532,
    "1:Db"
   ],
   [
    533,
    "1:D"
   ],
   [
    534,
    "1:Eb"
   ],
   [
    535,
    "1:E"
   ],
   [
    536,
    "1:F"
   ],
   [
    537,
    "1:F#"
   ],
   [
    538,
    "1:G"
   ],
   [
    539,
    "1:Ab"
   ],
   [
    540,
    "1:A"
   ],
   [
    541,
    "1:Bb"
   ],
   [
    542,
    "1:B"
   ],
   [
    543,
    "2:C"
   ],
   [
    544,
    "2:Db"
   ],
   [
    545,
    "2:D"
   ],
   [
    546,
    "2:Eb"
   ],
   [
    547,
    "2:E"
   ],
   [
    548,
    "2:F"
   ],
   [
    549,
    "2:F#"
   ],
   [
    550,
    "2:G"
   ],
   [
    551,
    "2:Ab"
   ],
   [
    552,
    "2:A"
   ],
   [
    553,
    "2:Bb"
   ],
   [
    554,
    "2:B"
   ]
  ],
  "33": [
   [
    555,
    "-2 OCT"
   ],
   [
    556,
    "-1 OCT"
   ],
   [
    557,
    "DIRECT LEVEL"
   ]
  ],
  "34": [
   [
    558,
    "RANGE"
   ],
   [
    559,
    "OCTAVE LEVEL"
   ],
   [
    560,
    "DIRECT LEVEL"
   ]
  ],
  "35": [
   [
    561,
    "-2 OCT"
   ],
   [
    562,
    "-1 OCT"
   ],
   [
    563,
    "DIRECT LEVEL"
   ]
  ],
  "7": [
   [
    564,
    "MODE"
   ],
   [
    565,
    "RATE"
   ],
   [
    566,
    "DEPTH"
   ],
   [
    567,
    "EFFECT LEVEL"
   ]
  ],
  "55": [
   [
    568,
    "STAGE"
   ],
   [
    569,
    "RATE"
   ],
   [
    570,
    "DEPTH"
   ],
   [
    571,
    "RESONANCE"
   ],
   [
    572,
    "MANUAL"
   ],
   [
    573,
    "STEP RATE"
   ],
   [
    574,
    "EFFECT LEVEL"
   ],
   [
    575,
    "DIRECT MIX"
   ]
  ],
  "56": [
   [
    576,
    "STAGE"
   ],
   [
    577,
    "RATE"
   ],
   [
    578,
    "DEPTH"
   ],
   [
    579,
    "RESONANCE"
   ],
   [
    580,
    "MANUAL"
   ],
   [
    581,
    "STEP RATE"
   ],
   [
    582,
    "EFFECT LEVEL"
   ],
   [
    583,
    "DIRECT MIX"
   ]
  ],
  "57": [
   [
    584,
    "STAGE"
   ],
   [
    585,
    "RATE"
   ],
   [
    586,
    "DEPTH"
   ],
   [
    587,
    "RESONANCE"
   ],
   [
    588,
    "MANUAL"
   ],
   [
    589,
    "WAVEFORM"
   ],
   [
    590,
    "STEP RATE"
   ],
   [
    591,
    "BI-PHASE"
   ],
   [
    592,
    "SEPARATION"
   ],
   [
    593,
    "LOW DAMP"
   ],
   [
    594,
    "HIGH DAMP"
   ],
   [
    595,
    "LOW CUT"
   ],
   [
    596,
    "HIGH CUT"
   ],
   [
    597,
    "EFFECT LEVEL"
   ],
   [
    598,
    "DIRECT MIX"
   ]
  ],
  "58": [
   [
    599,
    "STAGE"
   ],
   [
    600,
    "RATE"
   ],
   [
    601,
    "DEPTH"
   ],
   [
    602,
    "RESONANCE"
   ],
   [
    603,
    "MANUAL"
   ],
   [
    604,
    "WAVEFORM"
   ],
   [
    605,
    "STEP RATE"
   ],
   [
    606,
    "BI-PHASE"
   ],
   [
    607,
    "SEPARATION"
   ],
   [
    608,
    "LOW DAMP"
   ],
   [
    609,
    "HIGH DAMP"
   ],
   [
    610,
    "LOW CUT"
   ],
   [
    611,
    "HIGH CUT"
   ],
   [
    612,
    "EFFECT LEVEL"
   ],
   [
    613,
    "DIRECT MIX"
   ]
  ],
  "59": [
   [
    614,
    "RATE"
   ],
   [
    615,
    "DEPTH"
   ],
   [
    616,
    "EFFECT LEVEL"
   ],
   [
    617,
    "DIRECT MIX"
   ]
  ],
  "60": [
   [
    618,
    "VOICE"
   ],
   [
    619,
    "DIRECT LEVEL"
   ],
   [
    620,
    "1:PITCH"
   ],
   [
    621,
    "1:MODE"
   ],
   [
    622,
    "1:FINE"
   ],
   [
    623,
    "1:PRE-DELAY"
   ],
   [
    624,
    "1:LEVEL"
   ],
   [
    625,
    "1:FEEDBACK"
   ],
   [
    626,
    "2:PITCH"
   ],
   [
    627,
    "2:MODE"
   ],
   [
    628,
    "2:FINE"
   ],
   [
    629,
    "2:PRE-DELAY"
   ],
   [
    630,
    "2:LEVEL"
   ]
  ],
  "61": [
   [
    631,
    "VOICE"
   ],
   [
    632,
    "DIRECT LEVEL"
   ],
   [
    633,
    "1:PITCH"
   ],
   [
    634,
    "1:MODE"
   ],
   [
    635,
    "1:FINE"
   ],
   [
    636,
    "1:PRE-DELAY"
   ],
   [
    637,
    "1:LEVEL"
   ],
   [
    638,
    "1:FEEDBACK"
   ],
   [
    639,
    "2:PITCH"
   ],
   [
    640,
    "2:MODE"
   ],
   [
    641,
    "2:FINE"
   ],
   [
    642,
    "2:PRE-DELAY"
   ],
   [
    643,
    "2:LEVEL"
   ]
  ],
  "66": [
   [
    644,
    "INTELLIGENT"
   ],
   [
    645,
    "FREQUENCY"
   ],
   [
    646,
    "MOD RATE"
   ],
   [
    647,
    "MOD DEPTH"
   ],
   [
    648,
    "EFFECT LEVEL"
   ],
   [
    649,
    "DIRECT MIX"
   ]
  ],
  "67": [
   [
    650,
    "SPEED SELECT"
   ],
   [
    651,
    "SLOW RATE"
   ],
   [
    652,
    "FAST RATE"
   ],
   [
    653,
    "EFFECT LEVEL"
   ],
   [
    654,
    "RISE TIME"
   ],
   [
    655,
    "FALL TIME"
   ],
   [
    656,
    "MIC DISTANCE"
   ],
   [
    657,
    "ROTOR/HORN"
   ],
   [
    658,
    "DRIVE"
   ],
   [
    659,
    "DIRECT MIX"
   ]
  ],
  "74": [
   [
    660,
    "RATE"
   ],
   [
    661,
    "DEPTH"
   ],
   [
    662,
    "WAVEFORM"
   ],
   [
    663,
    "EFFECT LEVEL"
   ],
   [
    664,
    "TRIGGER"
   ],
   [
    665,
    "RISE TIME"
   ],
   [
    666,
    "DIRECT MIX"
   ]
  ],
  "75": [
   [
    667,
    "RATE"
   ],
   [
    668,
    "DEPTH"
   ],
   [
    669,
    "TRIGGER"
   ],
   [
    670,
    "RISE TIME"
   ],
   [
    671,
    "EFFECT LEVEL"
   ]
  ],
  "76": [
   [
    672,
    "RATE"
   ],
   [
    673,
    "DEPTH"
   ],
   [
    674,
    "COLOR"
   ],
   [
    675,
    "EFFECT LEVEL"
   ],
   [
    676,
    "TRIGGER"
   ],
   [
    677,
    "RISE TIME"
   ],
   [
    678,
    "DIRECT MIX"
   ]
  ],
  "68": [
   [
    679,
    "TRIGGER"
   ],
   [
    680,
    "PITCH"
   ],
   [
    681,
    "RISE TIME"
   ],
   [
    682,
    "FALL TIME"
   ]
  ],
  "69": [
   [
    683,
    "TRIGGER"
   ],
   [
    684,
    "PITCH"
   ],
   [
    685,
    "RISE TIME"
   ],
   [
    686,
    "FALL TIME"
   ]
  ],
  "28": [
   [
    687,
    "LOOP LEVEL"
   ]
  ],
  "77": [
   [
    688,
    "MODE"
   ],
   [
    689,
    "SEND LEVEL"
   ],
   [
    690,
    "RETURN LEVEL"
   ],
   [
    691,
    "ADJUST"
   ],
   [
    692,
    "INVERT"
   ]
  ],
  "78": [
   [
    702,
    "PATTERN"
   ],
   [
    703,
    "RATE"
   ],
   [
    704,
    "TRIGGER"
   ],
   [
    705,
    "EFFECT LEVEL"
   ],
   [
    706,
    "ATTACK"
   ],
   [
    707,
    "DUTY"
   ],
   [
    708,
    "DIRECT MIX"
   ]
  ],
  "79": [
   [
    709,
    "MODE"
   ],
   [
    710,
    "VOWEL1"
   ],
   [
    711,
    "VOWEL2"
   ],
   [
    712,
    "SENS"
   ],
   [
    713,
    "RATE"
   ],
   [
    714,
    "DEPTH"
   ],
   [
    715,
    "MANUAL"
   ],
   [
    716,
    "LEVEL"
   ]
  ],
  "80": [
   [
    717,
    "MODE"
   ],
   [
    718,
    "TRIGGER"
   ],
   [
    719,
    "DEPTH"
   ],
   [
    720,
    "RISE TIME"
   ],
   [
    721,
    "OCT RISE TIME"
   ],
   [
    722,
    "FEEDBACK"
   ],
   [
    723,
    "OCT FEEDBACK"
   ],
   [
    724,
    "VIB RATE"
   ],
   [
    725,
    "VIB DEPTH"
   ]
  ],
  "81": [
   [
    726,
    "SENS"
   ],
   [
    727,
    "DEPTH"
   ],
   [
    728,
    "TONE"
   ],
   [
    729,
    "EFFECT LEVEL"
   ],
   [
    730,
    "RESONANCE"
   ],
   [
    731,
    "BUZZ"
   ],
   [
    732,
    "DIRECT MIX"
   ]
  ],
  "82": [
   [
    733,
    "FILTER MODE"
   ],
   [
    734,
    "RATE"
   ],
   [
    735,
    "DEPTH"
   ],
   [
    736,
    "EFFECT LEVEL"
   ],
   [
    737,
    "FREQUENCY"
   ],
   [
    738,
    "RESONANCE"
   ],
   [
    739,
    "WAVEFORM"
   ],
   [
    740,
    "DIRECT MIX"
   ]
  ]
 },
 "alvosGlobais": {
  "EFFECT(RENAMED WITH TYPE)": [
   [
    1,
    "ON/OFF"
   ]
  ],
  "MASTER": [
   [
    693,
    "MEMORY LEVEL"
   ],
   [
    694,
    "BPM"
   ],
   [
    695,
    "KEY"
   ],
   [
    696,
    "INPUT SETTING"
   ],
   [
    697,
    "AMP CTL1"
   ],
   [
    698,
    "AMP CTL2"
   ]
  ],
  "TUNER": [
   [
    699,
    "ON/OFF"
   ]
  ],
  "MIDI": [
   [
    700,
    "MIDI CC#"
   ],
   [
    701,
    "MIDI PC#"
   ]
  ]
 }
};
