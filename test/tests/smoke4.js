// Rodada 0.12.0: CTL 1 no BANK/NUM, MAN UP/DOWN, act high, knob, duplo clique no DIV e templates.
const { chromium } = require("playwright");
const P = require("path").resolve(__dirname, "..");
const ok = (t,v) => console.log((v?"  ok  ":" FALHA ")+t+(v?"":"  <<<"));
const n4 = d => (d[0]<<12)|(d[1]<<8)|(d[2]<<4)|d[3];
(async () => {
  const b = await chromium.launch();
  const erros = [];
  const ctx = await b.newContext({ viewport: { width: 1360, height: 980 }, acceptDownloads: true });
  const pg = await ctx.newPage();
  pg.on("pageerror", e => erros.push("pageerror: " + e.message));
  pg.on("console", m => { if (m.type()==="error") erros.push("console: " + m.text()); });
  await pg.addInitScript({ path: __dirname + "/fakemidi.js" });
  // janela "salvar como" de mentira: guarda o que seria escrito no disco
  await pg.addInitScript(() => {
    window.__salvos = [];
    window.showSaveFilePicker = async op => ({
      name: "meu drive.fxt",
      createWritable: async () => ({ write: async c => window.__salvos.push({ op, c }), close: async () => {} })
    });
  });
  await pg.goto("file://" + P + "/index.html?debug=true");
  await pg.waitForTimeout(2600);

  const abre = async nome => {
    await pg.click("#btn-menu"); await pg.click("#btn-ctl-" + nome);
    await pg.waitForFunction(n => document.getElementById("cortina-" + n).classList.contains("aberta"), nome, { timeout: 90000 });
    await pg.waitForTimeout(300);
  };
  const linhasControl = () => pg.evaluate(() => Object.fromEntries([...document.querySelectorAll("#tabela-control tr")].slice(1)
      .map(l => [l.children[0].textContent, !l.classList.contains("desativada")])));

  // ---------- CONTROL ----------
  await pg.evaluate(() => window.__fake.põe([0x00,0x00,0x10,0x34], [2]));     // BANK/NUM
  await abre("control");
  let c = await linhasControl();
  console.log("BANK/NUM:", JSON.stringify(c));
  ok("BANK/NUM desativa CTL 1, UP, DOWN e os MANUAL", !c["CTL 1"] && !c["UP"] && !c["DOWN"] && !c["MANUAL UP"] && !c["MANUAL DOWN"]);
  ok("BANK/NUM mantém CUR NUM, CTL 2, CTL 3 e pedais", c["CUR NUM"] && c["CTL 2"] && c["CTL 3"] && c["EXP 1 SW"] && c["EXP 2"]);
  await pg.click("#control-fecha");
  for (const [modo, nome] of [[0, "MEMORY"], [1, "MANUAL"]]) {
    await pg.evaluate(m => window.__fake.põe([0x00,0x00,0x10,0x34], [m]), modo);
    await abre("control");
    c = await linhasControl();
    ok(nome + " mantém CTL 1 ligado", c["CTL 1"] === true && c["CUR NUM"] === false);
    await pg.click("#control-fecha");
  }

  // ---------- ASSIGN: MAN UP / MAN DOWN ----------
  await abre("assign");
  const linha1 = "[...document.querySelectorAll('#tabela-assign tr.linha-assign')][0]";
  const fontes = await pg.evaluate(l => [...eval(l).children[2].querySelectorAll("option")].slice(0,3).map(o => o.value + "=" + o.textContent), linha1);
  console.log("fontes:", fontes.join(" | "));
  ok("MAN UP = 5 e MAN DOWN = 4", fontes[0] === "5=MAN UP" && fontes[1] === "4=MAN DOWN");
  await pg.evaluate(l => { const s = eval(l).children[2].querySelector("select"); s.value = "5"; s.dispatchEvent(new Event("change")); }, linha1);
  await pg.waitForTimeout(900);
  ok("MAN UP grava 5 na fonte", (await pg.evaluate(() => window.__fake.leTemp(0x100 + 0x0E, 1)[0])) === 5);
  ok("MAN UP aceita TOGGLE/MOMENT", await pg.evaluate(l => !eval(l).children[3].querySelector("select").disabled, linha1));
  await pg.evaluate(() => window.__fake.avisa(0x100 + 0x0E, [4]));           // escolhido na pedaleira
  await pg.waitForFunction(l => eval(l).children[2].querySelector("select").selectedOptions[0].textContent === "MAN DOWN", linha1, { timeout: 30000 });
  ok("MAN DOWN vindo da pedaleira aparece na página", true);
  await pg.evaluate(() => window.__fake.avisa(0x100 + 0x0E, [2]));           // valor que a GX-10 não usa
  await pg.waitForFunction(l => eval(l).children[2].querySelector("select").selectedOptions[0].textContent === "? (2)", linha1, { timeout: 30000 });
  ok("fonte desconhecida aparece com o número, não vazia", true);

  // ---------- ASSIGN: act high ----------
  await pg.evaluate(() => document.querySelectorAll("#abas-assign button")[1].click());
  await pg.waitForTimeout(400);
  await pg.evaluate(() => window.__fake.avisa(0x100 + 0x19, [0x03,0x0F,0x0F,0x0F]));   // 16383 = 127 na pedaleira
  await pg.waitForFunction(l => eval(l).children[2].querySelector("input").value !== "5", linha1, { timeout: 30000 });
  const hi = await pg.evaluate(l => { const i = eval(l).children[2].querySelector("input"); return { v: i.value, max: i.max }; }, linha1);
  console.log("act high:", JSON.stringify(hi));
  ok("act high 16383 aparece como 127", hi.v === "127" && hi.max === "127");
  await pg.evaluate(l => { const i = eval(l).children[2].querySelector("input"); i.value = "100"; i.dispatchEvent(new Event("change")); }, linha1);
  await pg.waitForTimeout(700);
  ok("act high 100 grava 12800", n4(await pg.evaluate(() => window.__fake.leTemp(0x100 + 0x19, 4))) === 12800);
  await pg.evaluate(l => { const i = eval(l).children[2].querySelector("input"); i.value = "999"; i.dispatchEvent(new Event("change")); }, linha1);
  await pg.waitForTimeout(700);
  ok("act high não passa de 127 (grava 16383)", n4(await pg.evaluate(() => window.__fake.leTemp(0x100 + 0x19, 4))) === 16383 &&
     (await pg.evaluate(l => eval(l).children[2].querySelector("input").value, linha1)) === "127");
  await pg.evaluate(l => { const i = eval(l).children[1].querySelector("input"); i.value = "126"; i.dispatchEvent(new Event("change")); }, linha1);
  await pg.waitForTimeout(700);
  ok("act low 126 grava 16128", n4(await pg.evaluate(() => window.__fake.leTemp(0x100 + 0x15, 4))) === 16128);
  await pg.click("#assign-fecha");

  // ---------- KNOB: trocar de bloco não deixa o alvo vazio ----------
  await abre("knob");
  const esperado = await pg.evaluate(() => ({
    id: ordem.find(id => itens[id].typeId === 37),
    alvo: window.GX10_CTLEXP.alvosPorTipo["37"][0][0],
    master: window.GX10_CTLEXP.alvosGlobais.MASTER[0][0]
  }));
  const trocaBloco = async v => {
    await pg.evaluate(v => { const s = [...document.querySelectorAll("#tabela-knob tr")][1].children[1].querySelector("select"); s.value = String(v); s.dispatchEvent(new Event("change")); }, v);
    await pg.waitForTimeout(900);
    return pg.evaluate(() => ({ fx: window.__fake.leTemp(0x69, 1)[0], alvo: window.__fake.leTemp(0x6D, 4),
      par: [...document.querySelectorAll("#tabela-knob tr")][1].children[2].querySelector("select").selectedOptions[0].textContent }));
  };
  let k = await trocaBloco(esperado.id);
  console.log("knob → bloco", esperado.id, JSON.stringify(k), "esperado", esperado.alvo);
  ok("knob: bloco novo leva o primeiro parâmetro do efeito", k.fx === esperado.id && n4(k.alvo) === esperado.alvo && k.par !== "— none —");
  k = await trocaBloco(-2);
  ok("knob: Master leva MEMORY LEVEL", n4(k.alvo) === esperado.master && k.par === "MEMORY LEVEL");
  k = await trocaBloco(-1);
  ok("knob: none zera o alvo", n4(k.alvo) === 0);
  await pg.click("#knob-fecha");

  // ---------- duplo clique no DIV troca o canal ----------
  const chSel = () => pg.evaluate(() => window.__fake.leTemp(0x880 + 3*256 + 7, 4));
  const bloco = txt => pg.locator(".bloco", { hasText: txt }).first();
  ok("DIV começa no canal A", n4(await chSel()) === 0x8000 && (await pg.evaluate(() => canalAtivo)) === "A");
  await bloco("DIV").dblclick(); await pg.waitForTimeout(900);
  let canal = await pg.evaluate(() => ({ ativo: canalAtivo, mudos: [...document.querySelectorAll(".canal")].map(c => c.className.includes("mudo")) }));
  ok("duplo clique no DIV: A → B", n4(await chSel()) === 0x8001 && canal.ativo === "B" && canal.mudos[0] && !canal.mudos[1]);
  ok("painel do DIV aberto mostra Ch Select = B", await pg.evaluate(() => {
    const l = [...document.querySelectorAll(".param")].find(p => /ch.*sel/i.test(p.querySelector(".rotulo").textContent));
    return !!l && l.querySelector(".valor").textContent.trim() === "B";
  }));
  await bloco("DIV").dblclick(); await pg.waitForTimeout(900);
  ok("duplo clique no DIV: B → A", n4(await chSel()) === 0x8000 && (await pg.evaluate(() => canalAtivo)) === "A");
  ok("DIV continua sem on/off", (await pg.evaluate(() => window.__fake.leTemp(0x880 + 3*256 + 1, 1)[0])) === 1);

  // ---------- TEMPLATES ----------
  const valores = () => pg.evaluate(() => [...document.querySelectorAll("#painel .param .valor")].map(v => v.textContent));
  const menuModelo = async opcao => {
    await pg.click(".btn-modelo");
    await pg.locator(".menu-modelo button", { hasText: opcao }).click();
  };
  const od = pg.locator(".bloco").nth(2);
  await od.click(); await pg.waitForTimeout(800);
  const nomeMod = await pg.evaluate(() => document.querySelector(".painel h3").textContent);
  ok("sem botão Remove, com botão Template", await pg.evaluate(() =>
    ![...document.querySelectorAll("#painel button")].some(x => x.textContent === "Remove") && !!document.querySelector(".btn-modelo")));
  await pg.click(".btn-modelo");
  ok("Template abre Save e Load", (await pg.evaluate(() => [...document.querySelectorAll(".menu-modelo.aberto button")].map(x => x.textContent).join())) === "Save,Load");
  await pg.click("h1, body", { position: { x: 5, y: 5 } }).catch(() => {});
  await pg.waitForTimeout(200);

  // muda uns valores para o template não ser tudo igual
  await pg.click(".sortear button"); await pg.waitForTimeout(1500);
  const guardados = await valores();
  await menuModelo("Save"); await pg.waitForTimeout(400);
  const salvo = await pg.evaluate(() => window.__salvos[0]);
  const t = JSON.parse(salvo.c);
  console.log("template:", t.format, "v" + t.version, JSON.stringify(t.module), t.parameters.length, "parâmetros; sugerido:", salvo.op.suggestedName);
  ok("template guarda módulo e parâmetros", t.format === "gx10-module-template" && t.module.typeId === 37 && t.module.name === nomeMod &&
     t.parameters.length > 0 && t.parameters.every(p => p.id && Number.isInteger(p.value)));
  ok("arquivo sugerido termina em .fxt", /\.fxt$/.test(salvo.op.suggestedName));

  // bagunça de novo e traz o template de volta
  await pg.click(".sortear button"); await pg.waitForTimeout(1500);
  const baguncados = await valores();
  const arquivo = { name: "meu drive.fxt", mimeType: "application/json", buffer: Buffer.from(salvo.c) };
  await pg.setInputFiles("#arquivo-modelo", arquivo); await pg.waitForTimeout(1800);
  const restaurados = await valores();
  ok("load devolve os valores salvos", baguncados.join() !== guardados.join() && restaurados.join() === guardados.join());
  const naPedaleira = await pg.evaluate(ps => {
    const mod = Object.values(window.GX10_MODULES).find(m => m.typeId === 37);
    return ps.every(p => { const d = window.__fake.leTemp(0x880 + 2*256 + mod.parameters[p.id].offset, 4);
                           return ((d[0]<<12)|(d[1]<<8)|(d[2]<<4)|d[3]) - 32768 === p.value; });
  }, t.parameters);
  ok("os valores do template chegaram à pedaleira", naPedaleira);
  ok("on/off do bloco não mudou", (await pg.evaluate(() => window.__fake.leTemp(0x880 + 2*256 + 1, 1)[0])) === 1);

  // template de outro módulo: erro na cara do usuário e nada muda
  await pg.locator(".bloco").first().click(); await pg.waitForTimeout(800);
  const antesErro = await valores();
  const escritasAntes = await pg.evaluate(() => window.__fake.escritas.length);
  await pg.setInputFiles("#arquivo-modelo", arquivo);
  await pg.waitForFunction(() => document.getElementById("cortina-confirma").classList.contains("aberta"), null, { timeout: 5000 });
  const aviso = await pg.evaluate(() => ({ t: document.getElementById("confirma-titulo").textContent, x: document.getElementById("confirma-texto").textContent,
                                           cancela: getComputedStyle(document.getElementById("confirma-nao")).display }));
  console.log("aviso:", aviso.t, "|", aviso.x);
  ok("template de outro módulo dispara o alerta", /wrong kind/i.test(aviso.t) && aviso.x.includes(nomeMod) && aviso.cancela === "none");
  await pg.click("#confirma-sim"); await pg.waitForTimeout(300);
  ok("nada foi escrito nem mudou", (await pg.evaluate(() => window.__fake.escritas.length)) === escritasAntes && (await valores()).join() === antesErro.join());
  ok("o Cancel volta para os outros diálogos", (await pg.evaluate(() => getComputedStyle(document.getElementById("confirma-nao")).display)) !== "none");

  // arquivo que não é template
  await pg.setInputFiles("#arquivo-modelo", { name: "lixo.fxt", mimeType: "application/json", buffer: Buffer.from("isto não é json") });
  await pg.waitForFunction(() => document.getElementById("cortina-confirma").classList.contains("aberta"), null, { timeout: 5000 });
  ok("arquivo estranho dispara o alerta", /cannot load/i.test(await pg.evaluate(() => document.getElementById("confirma-titulo").textContent)));
  await pg.click("#confirma-sim"); await pg.waitForTimeout(300);

  // DIV, MIX e Master também têm template
  for (const txt of ["DIV", "MIX"]) {
    await bloco(txt).click(); await pg.waitForTimeout(800);
    ok(txt + " tem botão Template", await pg.evaluate(() => !!document.querySelector("#painel .btn-modelo")));
  }
  await pg.evaluate(() => { delete window.showSaveFilePicker; window.showSaveFilePicker = undefined; });   // navegador sem a janela: vira download
  await pg.locator(".bloco.mestre").click(); await pg.waitForTimeout(800);
  const antesMaster = await valores();
  const espera = pg.waitForEvent("download");
  await menuModelo("Save");
  const dl = await espera;
  const caminho = await dl.path();
  const tm = JSON.parse(require("fs").readFileSync(caminho, "utf8"));
  console.log("template do master:", dl.suggestedFilename(), JSON.stringify(tm.module), tm.parameters.map(p => p.id + "=" + p.value).join(" "));
  ok("Master salva template por download (.fxt)", dl.suggestedFilename() === "Master.fxt" && tm.module.id === "master" && tm.parameters.length === antesMaster.length);
  const nivel = tm.parameters.find(p => p.id === "memoryLevel");
  nivel.value = nivel.value === 80 ? 81 : 80;
  await pg.setInputFiles("#arquivo-modelo", { name: "master.fxt", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(tm)) });
  await pg.waitForTimeout(1200);
  const d = await pg.evaluate(() => window.__fake.pega([0x10,0,0x0F,0x00], 2));
  ok("Master carrega template (memory level = " + nivel.value + ")", ((d[0] << 4) | d[1]) === nivel.value);

  // valor fora da faixa fica de fora, o resto entra
  nivel.value = 9999;
  await pg.setInputFiles("#arquivo-modelo", { name: "master.fxt", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(tm)) });
  await pg.waitForFunction(() => document.getElementById("cortina-confirma").classList.contains("aberta"), null, { timeout: 8000 });
  ok("valor fora da faixa é pulado com aviso", /gaps/i.test(await pg.evaluate(() => document.getElementById("confirma-titulo").textContent)));
  await pg.click("#confirma-sim");

  console.log(erros.length ? "ERROS:\n" + erros.join("\n") : "sem erros de JS");
  await b.close();
})();
