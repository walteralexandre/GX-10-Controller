// Pedaleira GX-10 de mentira: responde RQ1 com DT1, aceita DT1 e imita os limites
// de resposta do aparelho (corta no fim da estrutura e no fim de um parâmetro).
window.__fake = (function () {
    const MODEL = [0x00,0x00,0x00,0x00,0x0B];
    const lin = a => (a[0]<<21)|(a[1]<<14)|(a[2]<<7)|a[3];
    const addr = (base, soma) => { const t = lin(base)+soma; return [(t>>21)&0x7F,(t>>14)&0x7F,(t>>7)&0x7F,t&0x7F]; };
    const mem = new Map();
    const põe = (a, bytes) => bytes.forEach((b,i) => mem.set(lin(a)+i, b));
    const pega = (a, n) => Array.from({length:n}, (_,i) => mem.get(lin(a)+i) ?? 0);

    const SEG = (() => {
        const s = [[0x0000,129],[0x00C0,28]];
        for (let i=0;i<20;i++) s.push([0x0100 + i*0x40, 45]);
        s.push([0x0780,62]);
        for (let i=0;i<20;i++) s.push([0x0880 + i*0x100, 179]);
        return s;
    })();
    const LIN_TEMP = lin([0x10,0,0,0]), LIN_USER = lin([0x20,0,0,0]), PASSO_MEM = 0x06<<14;
    const endMem = n => addr([0x20,0,0,0], (n-1)*PASSO_MEM);

    põe([0x00,0x00,0x00,0x00], [0,0,0,4]);
    põe([0x00,0x00,0x10,0x00], new Array(102).fill(0));
    põe([0x00,0x00,0x10,0x34], [0x00]);
    põe([0x00,0x00,0x10,0x1D], [0x06]);

    const tipos = [53, 9, 37, 29, 2, 30, 2, 31, 32, 50];
    const cadeia = new Array(50).fill(0);
    cadeia[0] = 1;
    for (let i=0;i<49;i++) cadeia[1+i] = i+1;
    tipos.forEach((_,i) => { cadeia[1+i] = i+1 < tipos.length ? i+2 : 0; });
    põe([0x10,0,0x0F,0x0C], cadeia);
    põe([0x10,0,0x0F,0x00], [0x06,0x04, 0x00,0x04,0x0E,0x02, 0x00, 0x00,0x00, 0x01, 0x00, 0x32]);
    põe([0x10,0,0x00,0x00], [...("TESTE PRESET    ")].map(c=>c.charCodeAt(0)));
    põe([0x10,0,0x00,0x1B], [0x0C]);
    tipos.forEach((t,slot) => {
        const base = addr([0x10,0,0x11,0x00], slot*256);
        põe(base, [t, 1, 0]);
        for (let p=0;p<44;p++) põe(addr(base, 3 + p*4), [0x08,0x00,0x00,0x05]);
    });
    põe(addr([0x10,0,0x11,0x00], 3*256 + 3), [0x08,0x00,0x00,0x00, 0x08,0x00,0x00,0x00]);
    põe([0x10,0,0x02,0x00], [0x01, 0x00]);
    põe([0x10,0,0x02,0x02], [0,0,0x01,0x0D]);
    põe([0x10,0,0x02,0x06], [0x08,0x00,0x00,0x00]);
    põe([0x10,0,0x02,0x0A], [0x08,0x00,0x00,0x64]);
    põe([0x10,0,0x02,0x0E], [0x0B, 0x01]);
    põe([0x10,0,0x02,0x15], [0,0,0,0]);
    põe([0x10,0,0x02,0x19], [0x00,0x02,0x08,0x00]);   // act high = 5 x 128
    põe([0x10,0,0x00,0x69], [0x00,0x02,0x00,0x00]);
    põe([0x10,0,0x00,0x6D], [0,0,0x01,0x0D]);
    for (let n = 1; n <= 198; n++) {
        põe(endMem(n), [...("MEM " + String(n).padStart(3,"0")).padEnd(16," ")].map(c=>c.charCodeAt(0)));
        põe(addr(endMem(n), 0x20), [n & 0x7F]);
    }

    function soma(b){ return (128 - (b.reduce((x,y)=>x+y,0) % 128)) % 128; }
    function quantoCabe(end, pedido) {
        const a = lin(end);
        let off = null;
        if (end[0] === 0x10) off = a - LIN_TEMP;
        else if (end[0] >= 0x20 && end[0] <= 0x29) off = (a - LIN_USER) % PASSO_MEM;
        if (off === null) return pedido;
        const seg = SEG.find(([d,t]) => off >= d && off < d + t);
        if (!seg) return 0;
        let cabe = seg[0] + seg[1] - off;
        if (seg[1] === 179) {
            const local = off - seg[0];
            let n = Math.min(cabe, pedido, 127);
            if (local + n > 3) { while (n > 0 && ((local + n - 3) % 4) !== 0) n--; }
            return Math.max(n, Math.min(cabe, pedido, 1));
        }
        return cabe;
    }

    const ouvintes = [], fechadas = [], escritas = [];
    const mudos = { ativo:false }, recusa = { endereco:null }, partir = { ativo:false };

    const saida = {
        id:"out1", name:"GX-10", manufacturer:"Roland", state:"connected", type:"output",
        close(){ fechadas.push("out"); return Promise.resolve(); },
        send(bytes) {
            if (this.state !== "connected") throw new DOMException("port closed","InvalidStateError");
            if (mudos.ativo || bytes[0] !== 0xF0) return;
            if (bytes[8] === 0x12) {
                const end = bytes.slice(9,13), dados = bytes.slice(13, bytes.length-2);
                if (recusa.endereco !== null && end[0] === recusa.endereco) return;
                dados.forEach((b,i) => mem.set(lin(end)+i, b));
                escritas.push({ end: end.join(","), n: dados.length });
                if (end.join(",") === "0,0,0,0" && dados.length === 4) {
                    const v = (dados[0]<<12)|(dados[1]<<8)|(dados[2]<<4)|dados[3];
                    const de = lin(endMem(v+1));
                    SEG.forEach(([d,t]) => { for (let i=0;i<t;i++) mem.set(LIN_TEMP+d+i, mem.get(de+d+i) ?? 0); });
                }
                return;
            }
            if (bytes[8] !== 0x11) return;
            const end = bytes.slice(9,13);
            let tam = (bytes[13]<<21)|(bytes[14]<<14)|(bytes[15]<<7)|bytes[16];
            const limite = quantoCabe(end, tam);
            if (limite === 0) return;
            tam = Math.min(tam, limite);
            const partes = partir.ativo && tam > 8 ? [Math.floor(tam/2), tam - Math.floor(tam/2)] : [tam];
            let desloc = 0, atraso = 4;
            for (const quanto of partes) {
                const e = addr(end, desloc);
                const corpo = [...e, ...pega(e, quanto)];
                const msg = [0xF0,0x41,0x10,...MODEL,0x12,...corpo,soma(corpo),0xF7];
                setTimeout(()=>ouvintes.forEach(f=>f({data:new Uint8Array(msg)})), atraso);
                desloc += quanto; atraso += 6;
            }
        }
    };
    const entrada = {
        id:"in1", name:"GX-10", manufacturer:"Roland", state:"connected", type:"input",
        close(){ fechadas.push("in"); return Promise.resolve(); },
        set onmidimessage(f){ ouvintes.length=0; ouvintes.push(f); }, get onmidimessage(){ return ouvintes[0]; }
    };
    const acesso = { inputs:new Map([["in1",entrada]]), outputs:new Map([["out1",saida]]), onstatechange:null };
    navigator.requestMIDIAccess = async () => acesso;

    return {
        mem, pega, põe, addr, endMem, acesso, escritas, fechadas, mudos, recusa, partir,
        leMem(n, desloc, quanto) { return pega(addr(endMem(n), desloc), quanto); },
        leTemp(desloc, quanto) { return pega(addr([0x10,0,0,0], desloc), quanto); },
        poeTemp(desloc, bytes) { põe(addr([0x10,0,0,0], desloc), bytes); },
        avisa(desloc, bytes) {
            const e = addr([0x10,0,0,0], desloc);
            bytes.forEach((b,i)=>mem.set(lin(e)+i,b));
            const corpo = [...e, ...bytes];
            const msg = [0xF0,0x41,0x10,...MODEL,0x12,...corpo,soma(corpo),0xF7];
            ouvintes.forEach(f=>f({data:new Uint8Array(msg)}));
        },
        desconectar() { [entrada,saida].forEach(p => { p.state="disconnected"; if (acesso.onstatechange) acesso.onstatechange({port:p}); }); }
    };
})();
