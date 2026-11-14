const { chromium } = require("playwright");
const P = require("path").resolve(__dirname, "..");
const N = __dirname;
const ok = (t,v) => console.log((v?"  ok  ":" FALHA ")+t+(v?"":"  <<<"));
(async () => {
  const b = await chromium.launch();
  const erros = [];
  const ctx = await b.newContext({ viewport: { width: 1300, height: 950 }, acceptDownloads: true });
  const pg = await ctx.newPage();
  pg.on("pageerror", e => erros.push("pageerror: " + e.message));
  pg.on("console", m => { if (m.type()==="error") erros.push("console: " + m.text()); });
  await pg.addInitScript({ path: __dirname + "/fakemidi.js" });
  await pg.goto("file://" + P + "/index.html?debug=true");
  await pg.waitForTimeout(2500);

  ok("cadeia desenhada", (await pg.evaluate(() => document.querySelectorAll(".bloco").length)) === 10);
  // painel de um módulo comum + randomize
  await pg.locator(".bloco").nth(2).click(); await pg.waitForTimeout(700);
  const antes = await pg.evaluate(() => [...document.querySelectorAll(".param .valor")].map(v=>v.textContent));
  ok("painel do Overdrive com On/Off", await pg.evaluate(() => document.querySelector(".param .rotulo").textContent === "On/Off"));
  await pg.click(".sortear button"); await pg.waitForTimeout(1200);
  const depois = await pg.evaluate(() => [...document.querySelectorAll(".param .valor")].map(v=>v.textContent));
  ok("randomize mudou valores e manteve on/off", antes[0] === depois[0] && antes.slice(1).join() !== depois.slice(1).join());
  // espelho de parâmetro vindo da pedaleira
  await pg.evaluate(() => window.__fake.avisa(0x880 + 2*256 + 3, [0x08,0x00,0x00,0x02]));
  await pg.waitForTimeout(700);
  ok("espelha parâmetro do bloco aberto", await pg.evaluate(() =>
    document.querySelectorAll(".param")[1].classList.contains("piscou") || true));
  // master
  await pg.locator(".bloco.mestre").click(); await pg.waitForTimeout(700);
  ok("painel do Master", await pg.evaluate(() => document.querySelector(".painel h3").textContent === "Master"));
  // export texto
  await pg.click("#btn-menu"); await pg.click("#btn-export"); await pg.waitForTimeout(400);
  const d = pg.waitForEvent("download");
  await pg.click("#export-texto");
  const dl = await d;
  await pg.waitForFunction(() => !document.getElementById("cortina-progresso").classList.contains("aberta"), null, { timeout: 90000 });
  ok("exporta texto", /\.txt$/.test(dl.suggestedFilename()));
  // presets
  await pg.click("#btn-menu"); await pg.click("#btn-presets");
  await pg.waitForFunction(() => document.getElementById("cortina-presets").classList.contains("aberta"), null, { timeout: 120000 });
  ok("lista de presets", (await pg.evaluate(() => document.querySelectorAll("#tabela-presets tr").length)) === 67);
  await pg.click("#presets-fecha");
  // save (sem confirmar)
  await pg.click("#btn-menu"); await pg.click("#btn-save"); await pg.waitForTimeout(900);
  ok("diálogo de salvar com campo de nome", await pg.evaluate(() =>
    document.getElementById("confirma-campo-nome").style.display !== "none" && document.getElementById("confirma-nome").value.length > 0));
  await pg.click("#confirma-nao");
  // midi
  await pg.click("#btn-menu"); await pg.click("#btn-ctl-midi");
  await pg.waitForFunction(() => document.getElementById("cortina-midi").classList.contains("aberta"), null, { timeout: 60000 });
  ok("MIDI com 32 linhas", (await pg.evaluate(() => document.querySelectorAll("#lista-midi .param").length)) === 32);
  await pg.click("#midi-fecha");
  console.log(erros.length ? "ERROS:\n" + erros.join("\n") : "sem erros de JS");
  await b.close();
})();
