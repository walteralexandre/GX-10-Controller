const { chromium } = require("playwright");
const P = require("path").resolve(__dirname, "..");
const N = __dirname;
const ok = (t,v) => console.log((v?"  ok  ":" FALHA ")+t+(v?"":"  <<<"));
(async () => {
  const b = await chromium.launch();
  const erros = [];
  const pg = await b.newPage({ viewport: { width: 1360, height: 980 } });
  pg.on("pageerror", e => erros.push("pageerror: " + e.message));
  pg.on("console", m => { if (m.type()==="error") erros.push("console: " + m.text()); });
  await pg.addInitScript({ path: __dirname + "/fakemidi.js" });
  await pg.goto("file://" + P + "/index.html?debug=true");
  await pg.waitForTimeout(2600);

  // ---------- CONTROL: endereços novos ----------
  await pg.click("#btn-menu"); await pg.click("#btn-ctl-control");
  await pg.waitForFunction(() => document.getElementById("cortina-control").classList.contains("aberta"), null, { timeout: 60000 });
  const escreve = async (linha, valor) => {
    await pg.evaluate(([i,v]) => { const s=[...document.querySelectorAll("#tabela-control tr")][i].children[1].querySelector("select"); s.value=String(v); s.dispatchEvent(new Event("change")); }, [linha, valor]);
    await pg.waitForTimeout(350);
  };
  await escreve(1, 5);   // UP -> TUNER (Num2, 0x11)
  await escreve(2, 5);   // DOWN -> TUNER (Num1, 0x10)
  await escreve(5, 6);   // CTL 1 -> TUNER (0x1B)
  await escreve(6, 6);   // CTL 2 -> TUNER (Ctl3, 0x1D)
  await escreve(7, 6);   // CTL 3 -> TUNER (Ctl4, 0x1E)
  const bytes = await pg.evaluate(() => ({
    num1: window.__fake.leTemp(0x10,1)[0], num2: window.__fake.leTemp(0x11,1)[0],
    ctl1: window.__fake.leTemp(0x1B,1)[0], ctl2doc: window.__fake.leTemp(0x1C,1)[0],
    ctl3doc: window.__fake.leTemp(0x1D,1)[0], ctl4doc: window.__fake.leTemp(0x1E,1)[0]
  }));
  console.log("control bytes:", JSON.stringify(bytes));
  ok("UP grava em Num2 (0x11)", bytes.num2 === 5);
  ok("DOWN grava em Num1 (0x10)", bytes.num1 === 5);
  ok("CTL1→0x1B, CTL2→0x1D, CTL3→0x1E, nada em 0x1C", bytes.ctl1===6 && bytes.ctl3doc===6 && bytes.ctl4doc===6 && bytes.ctl2doc===0);
  await pg.click("#control-fecha");

  // ---------- ASSIGN ----------
  await pg.click("#btn-menu"); await pg.click("#btn-ctl-assign");
  await pg.waitForFunction(() => document.getElementById("cortina-assign").classList.contains("aberta"), null, { timeout: 90000 });
  const p1 = await pg.evaluate(() => {
    const l = [...document.querySelectorAll("#tabela-assign tr.linha-assign")][0];
    return {
      fontes: [...l.children[2].querySelectorAll("option")].map(o => o.textContent),
      fonteAtual: l.children[2].querySelector("select").selectedOptions[0].textContent,
      modoDesligado: l.children[3].querySelector("select").disabled,
      categorias: [...l.children[4].querySelectorAll("option")].map(o => o.textContent)
    };
  });
  console.log("assign p1 fontes:", p1.fontes.length, p1.fontes.slice(0,8).join(","), "| atual:", p1.fonteAtual);
  ok("75 fontes, sem NUM 3/4 e sem CTL 4", p1.fontes.length === 75 && !p1.fontes.includes("CTL 4") && p1.fontes[0] === "MAN UP");
  ok("category tem — none — e Master/Tuner", p1.categorias[0] === "— none —" && p1.categorias.includes("Master") && p1.categorias.includes("Tuner"));
  ok("mode ligado para CTL 1", p1.modoDesligado === false);
  // fonte EXP 1 (16) desliga o mode
  await pg.evaluate(() => { const s=[...document.querySelectorAll("#tabela-assign tr.linha-assign")][0].children[2].querySelector("select"); s.value="16"; s.dispatchEvent(new Event("change")); });
  await pg.waitForTimeout(900);
  ok("EXP 1 desliga o mode", await pg.evaluate(() => [...document.querySelectorAll("#tabela-assign tr.linha-assign")][0].children[3].querySelector("select").disabled));

  // página 2: escala e min/max pelo parâmetro
  await pg.evaluate(() => document.querySelectorAll("#abas-assign button")[1].click());
  await pg.waitForTimeout(400);
  const p2 = await pg.evaluate(() => {
    const l = [...document.querySelectorAll("#tabela-assign tr.linha-assign")][0];
    return { actLo: l.children[1].querySelector("input").value, max: l.children[1].querySelector("input").max,
             min3: l.children[3].querySelector("select") ? "select" : l.children[3].querySelector("input").value };
  });
  console.log("assign p2:", JSON.stringify(p2));
  ok("act low em 0..126", p2.max === "126");
  await pg.evaluate(() => { const i=[...document.querySelectorAll("#tabela-assign tr.linha-assign")][0].children[1].querySelector("input"); i.value="10"; i.dispatchEvent(new Event("change")); });
  await pg.waitForTimeout(900);
  const gravado = await pg.evaluate(() => window.__fake.leTemp(0x100+0x15, 4));
  console.log("act low gravado:", gravado, "=", (gravado[0]<<12)|(gravado[1]<<8)|(gravado[2]<<4)|gravado[3]);
  ok("10 na tela = 1280 na pedaleira", ((gravado[0]<<12)|(gravado[1]<<8)|(gravado[2]<<4)|gravado[3]) === 1280);
  ok("act high subiu junto", await pg.evaluate(() => {
    const d = window.__fake.leTemp(0x100+0x19, 4);
    return (((d[0]<<12)|(d[1]<<8)|(d[2]<<4)|d[3]) / 128) === 11;
  }));

  // min/max como opções do parâmetro: volta à página 1, escolhe preamp/type
  await pg.evaluate(() => document.querySelectorAll("#abas-assign button")[0].click());
  await pg.waitForTimeout(900);
  console.log("  (antes) colunas da linha:", await pg.evaluate(() => [...document.querySelector("#tabela-assign tr.linha-assign").children].length,
    ), "| aba ativa:", await pg.evaluate(() => document.querySelector("#abas-assign button.ativa").textContent));
  await pg.evaluate(() => { const s=[...document.querySelectorAll("#tabela-assign tr.linha-assign")][0].children[4].querySelector("select");
    const op=[...s.options].find(o=>o.textContent.startsWith("AIRD Preamp"));
    if(!op) throw new Error("sem AIRD Preamp: " + [...s.options].map(o=>o.textContent).join("|"));
    s.value=op.value; s.dispatchEvent(new Event("change")); });
  await pg.waitForTimeout(1100);
  console.log("  parâmetros do preamp:", await pg.evaluate(() =>
    [...document.querySelector("#tabela-assign tr.linha-assign").children[5].querySelectorAll("option")].map(o=>o.textContent).slice(0,5)));
  await pg.evaluate(() => { const s=[...document.querySelectorAll("#tabela-assign tr.linha-assign")][0].children[5].querySelector("select");
    const op=[...s.options].find(o=>o.textContent==="TYPE");
    if(!op) throw new Error("sem TYPE");
    s.value=op.value; s.dispatchEvent(new Event("change")); });
  await pg.waitForTimeout(1100);
  await pg.evaluate(() => document.querySelectorAll("#abas-assign button")[1].click());
  await pg.waitForTimeout(400);
  const minmax = await pg.evaluate(() => {
    const l = [...document.querySelectorAll("#tabela-assign tr.linha-assign")][0];
    const s = l.children[3].querySelector("select");
    return s ? [...s.options].slice(0,4).map(o=>o.textContent) : ["(input)"];
  });
  console.log("target min (preamp/type):", JSON.stringify(minmax));
  ok("min/max viram a lista do parâmetro", minmax[0] === "TRANSPARENT");
  await pg.click("#assign-fecha");

  // ---------- KNOB ----------
  await pg.click("#btn-menu"); await pg.click("#btn-ctl-knob");
  await pg.waitForFunction(() => document.getElementById("cortina-knob").classList.contains("aberta"), null, { timeout: 60000 });
  const kb = await pg.evaluate(() => {
    const l = [...document.querySelectorAll("#tabela-knob tr")].slice(1);
    return { opcoes: [...l[0].children[1].querySelectorAll("option")].map(o=>o.textContent) };
  });
  ok("knob tem Master e Tuner", kb.opcoes.includes("Master") && kb.opcoes.includes("Tuner"));
  await pg.evaluate(() => { const s=[...document.querySelectorAll("#tabela-knob tr")][1].children[2].querySelector("select");
    s.value="29"; s.dispatchEvent(new Event("change")); });
  await pg.waitForTimeout(800);
  const kAlvo = await pg.evaluate(() => window.__fake.leTemp(0x6D,4));
  console.log("knob alvo gravado:", kAlvo);
  ok("knob grava o alvo", ((kAlvo[0]<<12)|(kAlvo[1]<<8)|(kAlvo[2]<<4)|kAlvo[3]) === 29);
  ok("gravou a área inteira dos knobs", await pg.evaluate(() => window.__fake.escritas.slice(-1)[0].n === 20));
  await pg.click("#knob-fecha");

  // ---------- cadeia: canal B e duplo clique ----------
  await pg.evaluate(() => {  // Divider: ch select = B
    const d = window.__fake; d.poeTemp(0x880 + 3*256 + 7, [0x08,0x00,0x00,0x01]);
    d.avisa(0x880 + 3*256 + 7, [0x08,0x00,0x00,0x01]);
  });
  await pg.waitForTimeout(1500);
  const canal = await pg.evaluate(() => ({ ativo: canalAtivo, mudos: [...document.querySelectorAll(".canal")].map(c=>c.className.includes("mudo")) }));
  console.log("canal depois de mudar para B:", JSON.stringify(canal));
  ok("canal B passa a ser o ativo", canal.ativo === "B" && canal.mudos[0] === true && canal.mudos[1] === false);

  const antes = await pg.evaluate(() => window.__fake.leTemp(0x880 + 1, 1)[0]);   // Wah on/off
  await pg.locator(".bloco").first().dblclick();
  await pg.waitForTimeout(600);
  const depois = await pg.evaluate(() => window.__fake.leTemp(0x880 + 1, 1)[0]);
  ok("duplo clique liga/desliga (" + antes + "→" + depois + ")", antes !== depois);
  await pg.evaluate(() => [...document.querySelectorAll(".bloco")].find(b=>b.textContent.includes("DIV")).dispatchEvent(new MouseEvent("dblclick",{bubbles:true})));
  await pg.waitForTimeout(400);
  ok("DIV não é afetado pelo duplo clique", await pg.evaluate(() => window.__fake.leTemp(0x880 + 3*256 + 1, 1)[0] === 1));

  // ---------- faixa do preset abre a lista ----------
  await pg.click("#faixa-preset");
  await pg.waitForTimeout(2500);
  ok("clicar no preset abre a lista", await pg.evaluate(() => document.getElementById("cortina-presets").classList.contains("aberta")));
  await pg.screenshot({ path: __dirname + "/t4.png" });

  console.log(erros.length ? "ERROS:\n" + erros.join("\n") : "sem erros de JS");
  await b.close();
})();
