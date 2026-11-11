// Prints the full conjugation table (all LEARN.VERBS × 7 tenses × 6 persons) and asserts known forms.
// Usage: node scripts/check-verbs.js [--quiet]   (exit code 1 on any failure)
const fs = require("fs"), path = require("path"), vm = require("vm");
const ctx = { console }; ctx.window = ctx; ctx.globalThis = ctx; vm.createContext(ctx);
for (const f of ["lib", "extra"]) vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "public", "learn", f + ".js"), "utf8"), ctx);
const L = ctx.window.LEARN, quiet = process.argv.includes("--quiet");
const errs = []; let n = 0;

/* ---------- 1. verb list sanity ---------- */
const names = L.VERBS.map(v => v[0]);
if (L.VERBS.length !== 90) errs.push(`expected 90 verbs, got ${L.VERBS.length}`);
if (new Set(names).size !== names.length) errs.push("duplicate infinitive in LEARN.VERBS");
if (new Set(L.VERBS.map(v => v[1])).size !== names.length) errs.push("duplicate Arabic meaning in LEARN.VERBS");
for (const [v, ar] of L.VERBS) { if (!/^[a-záéíóúñ]*[aeií]r$/.test(v)) errs.push(`bad infinitive ${v}`); if (!ar || !/[؀-ۿ]/.test(ar)) errs.push(`${v}: missing Arabic meaning`); }

/* ---------- 2. full table (structure check + print) ---------- */
for (const [v, ar] of L.VERBS) {
  if (!quiet) console.log(`\n== ${v} — ${ar} (participio: ${L.participle(v)})`);
  for (const [t, tn] of L.TENSES) {
    const f = L.conj(v, t);
    if (f.length !== 6 || f.some(x => !x || /undefined|NaN/.test(x))) errs.push(`conj ${v} ${t}: ${JSON.stringify(f)}`);
    if (!quiet) console.log(`  ${t.padEnd(5)} ${f.join(" · ")}`);
  }
}

/* ---------- 3. assertions ---------- */
const row = (v, t, exp) => exp.split(" ").forEach((e, i) => one(v, t, i, e));
const one = (v, t, i, exp) => { n++; const got = L.conj(v, t)[i]; if (got !== exp) errs.push(`${v} ${t}[${L.PERSONS[i]}]: expected "${exp}", got "${got}"`); };
const part = (v, exp) => { n++; const got = L.participle(v); if (got !== exp) errs.push(`participle ${v}: expected "${exp}", got "${got}"`); };

// ‑guir (gu→g) + e→i
row("seguir", "pres", "sigo sigues sigue seguimos seguís siguen");
row("seguir", "pret", "seguí seguiste siguió seguimos seguisteis siguieron");
row("seguir", "subj", "siga sigas siga sigamos sigáis sigan");
row("conseguir", "pres", "consigo consigues consigue conseguimos conseguís consiguen");
row("conseguir", "subj", "consiga consigas consiga consigamos consigáis consigan");
one("conseguir", "pret", 2, "consiguió");
// ‑uir (y‑insertion)
row("construir", "pres", "construyo construyes construye construimos construís construyen");
row("construir", "pret", "construí construiste construyó construimos construisteis construyeron");
row("construir", "subj", "construya construyas construya construyamos construyáis construyan");
row("construir", "impf", "construía construías construía construíamos construíais construían");
part("construir", "construido");
// vowel + er/ir: y in 3rd persons, accented í, ‑ído
row("leer", "pres", "leo lees lee leemos leéis leen");
row("leer", "pret", "leí leíste leyó leímos leísteis leyeron");
row("creer", "pret", "creí creíste creyó creímos creísteis creyeron");
row("caer", "pres", "caigo caes cae caemos caéis caen");
row("caer", "pret", "caí caíste cayó caímos caísteis cayeron");
row("caer", "subj", "caiga caigas caiga caigamos caigáis caigan");
row("oír", "pres", "oigo oyes oye oímos oís oyen");
row("oír", "pret", "oí oíste oyó oímos oísteis oyeron");
row("oír", "subj", "oiga oigas oiga oigamos oigáis oigan");
one("oír", "impf", 0, "oía"); one("oír", "fut", 0, "oiré");
part("leer", "leído"); part("creer", "creído"); part("caer", "caído"); part("oír", "oído"); part("traer", "traído");
// ‑gir (g→j)
row("dirigir", "pres", "dirijo diriges dirige dirigimos dirigís dirigen");
row("dirigir", "subj", "dirija dirijas dirija dirijamos dirijáis dirijan");
one("dirigir", "pret", 0, "dirigí");
// vowel + cer/cir (c→zc)
row("conocer", "pres", "conozco conoces conoce conocemos conocéis conocen");
row("conocer", "subj", "conozca conozcas conozca conozcamos conozcáis conozcan");
one("parecer", "pres", 0, "parezco"); one("parecer", "subj", 2, "parezca"); one("parecer", "pres", 3, "parecemos");
one("aparecer", "pres", 0, "aparezco"); one("reconocer", "subj", 0, "reconozca");
row("ofrecer", "subj", "ofrezca ofrezcas ofrezca ofrezcamos ofrezcáis ofrezcan");
one("nacer", "pres", 0, "nazco"); one("nacer", "pret", 2, "nació"); one("nacer", "subj", 3, "nazcamos");
row("producir", "pres", "produzco produces produce producimos producís producen");
row("producir", "pret", "produje produjiste produjo produjimos produjisteis produjeron");
row("producir", "subj", "produzca produzcas produzca produzcamos produzcáis produzcan");
// ‑car/‑gar/‑zar
row("pagar", "pret", "pagué pagaste pagó pagamos pagasteis pagaron");
row("pagar", "subj", "pague pagues pague paguemos paguéis paguen");
one("buscar", "pret", 0, "busqué"); one("buscar", "subj", 0, "busque"); one("buscar", "subj", 3, "busquemos");
one("tocar", "pret", 0, "toqué"); one("tocar", "subj", 5, "toquen");
one("explicar", "pret", 0, "expliqué"); one("explicar", "subj", 0, "explique");
one("sacar", "pret", 0, "saqué"); one("sacar", "subj", 0, "saque");
one("llegar", "pret", 0, "llegué"); one("llegar", "subj", 0, "llegue");
row("empezar", "pres", "empiezo empiezas empieza empezamos empezáis empiezan");
one("empezar", "pret", 0, "empecé");
row("empezar", "subj", "empiece empieces empiece empecemos empecéis empiecen");
one("comenzar", "pres", 0, "comienzo"); one("comenzar", "pret", 0, "comencé"); one("comenzar", "subj", 0, "comience"); one("comenzar", "subj", 3, "comencemos");
one("rezar", "pret", 0, "recé"); one("rezar", "subj", 0, "rece");
row("jugar", "pres", "juego juegas juega jugamos jugáis juegan");
one("jugar", "pret", 0, "jugué");
row("jugar", "subj", "juegue juegues juegue juguemos juguéis jueguen");
// o→ue / e→ie / e→i with weak ‑ir stems
row("dormir", "pres", "duermo duermes duerme dormimos dormís duermen");
row("dormir", "pret", "dormí dormiste durmió dormimos dormisteis durmieron");
row("dormir", "subj", "duerma duermas duerma durmamos durmáis duerman");
row("morir", "pres", "muero mueres muere morimos morís mueren");
one("morir", "pret", 2, "murió"); one("morir", "pret", 5, "murieron"); one("morir", "subj", 3, "muramos");
part("morir", "muerto"); one("morir", "perf", 0, "he muerto");
row("pedir", "pres", "pido pides pide pedimos pedís piden");
row("pedir", "pret", "pedí pediste pidió pedimos pedisteis pidieron");
row("pedir", "subj", "pida pidas pida pidamos pidáis pidan");
row("sentir", "pres", "siento sientes siente sentimos sentís sienten");
one("sentir", "pret", 2, "sintió");
row("sentir", "subj", "sienta sientas sienta sintamos sintáis sientan");
row("servir", "pres", "sirvo sirves sirve servimos servís sirven");
one("servir", "pret", 2, "sirvió"); one("servir", "subj", 3, "sirvamos");
row("repetir", "pres", "repito repites repite repetimos repetís repiten");
one("repetir", "pret", 5, "repitieron"); one("repetir", "subj", 0, "repita"); one("repetir", "subj", 3, "repitamos");
row("convertir", "pres", "convierto conviertes convierte convertimos convertís convierten");
one("convertir", "pret", 2, "convirtió"); one("convertir", "subj", 3, "convirtamos"); one("convertir", "subj", 5, "conviertan");
row("perder", "pres", "pierdo pierdes pierde perdemos perdéis pierden");
one("perder", "subj", 3, "perdamos"); one("perder", "pret", 0, "perdí");
one("entender", "pres", 0, "entiendo"); one("entender", "pres", 3, "entendemos"); one("entender", "subj", 0, "entienda");
row("encontrar", "pres", "encuentro encuentras encuentra encontramos encontráis encuentran");
one("encontrar", "subj", 3, "encontremos"); one("encontrar", "pret", 0, "encontré");
one("recordar", "pres", 0, "recuerdo"); one("recordar", "subj", 0, "recuerde"); one("recordar", "pret", 0, "recordé");
one("volver", "pres", 0, "vuelvo"); one("volver", "subj", 3, "volvamos"); part("volver", "vuelto");
// compounds inherit irregularities
row("mantener", "pres", "mantengo mantienes mantiene mantenemos mantenéis mantienen");
row("mantener", "pret", "mantuve mantuviste mantuvo mantuvimos mantuvisteis mantuvieron");
row("mantener", "fut", "mantendré mantendrás mantendrá mantendremos mantendréis mantendrán");
row("mantener", "subj", "mantenga mantengas mantenga mantengamos mantengáis mantengan");
one("mantener", "cond", 0, "mantendría"); one("mantener", "impf", 0, "mantenía"); part("mantener", "mantenido");
one("suponer", "pres", 0, "supongo");
row("suponer", "pret", "supuse supusiste supuso supusimos supusisteis supusieron");
one("suponer", "fut", 0, "supondré"); one("suponer", "subj", 0, "suponga"); part("suponer", "supuesto");
part("descubrir", "descubierto"); one("descubrir", "perf", 2, "ha descubierto"); one("descubrir", "pres", 0, "descubro");
// valer
row("valer", "pres", "valgo vales vale valemos valéis valen");
row("valer", "fut", "valdré valdrás valdrá valdremos valdréis valdrán");
one("valer", "cond", 0, "valdría"); one("valer", "subj", 0, "valga"); one("valer", "subj", 3, "valgamos"); one("valer", "pret", 0, "valí");
// classic irregulars still right
one("traer", "pres", 0, "traigo");
row("traer", "pret", "traje trajiste trajo trajimos trajisteis trajeron");
row("hacer", "pret", "hice hiciste hizo hicimos hicisteis hicieron");
part("hacer", "hecho"); one("hacer", "fut", 0, "haré"); one("hacer", "subj", 0, "haga");
row("decir", "pres", "digo dices dice decimos decís dicen");
one("decir", "pret", 5, "dijeron"); one("decir", "subj", 3, "digamos"); part("decir", "dicho"); one("decir", "fut", 0, "diré");
row("tener", "pres", "tengo tienes tiene tenemos tenéis tienen");
one("tener", "pret", 0, "tuve"); one("tener", "fut", 0, "tendré"); one("tener", "subj", 3, "tengamos");
one("venir", "subj", 3, "vengamos"); one("venir", "pret", 2, "vino"); one("venir", "pres", 1, "vienes");
one("querer", "pret", 0, "quise"); one("querer", "fut", 0, "querré"); one("querer", "subj", 0, "quiera"); one("querer", "subj", 3, "queramos");
one("poder", "pret", 2, "pudo"); one("poder", "subj", 3, "podamos"); one("poder", "fut", 0, "podré");
one("saber", "pres", 0, "sé"); one("saber", "subj", 0, "sepa"); one("saber", "pret", 0, "supe"); one("saber", "fut", 0, "sabré");
one("poner", "pres", 0, "pongo"); one("poner", "pret", 0, "puse"); part("poner", "puesto");
one("salir", "pres", 0, "salgo"); one("salir", "fut", 0, "saldré");
row("ser", "pres", "soy eres es somos sois son");
one("ser", "impf", 0, "era"); one("ir", "pret", 5, "fueron"); one("ir", "subj", 0, "vaya"); one("ir", "fut", 0, "iré"); one("ir", "perf", 0, "he ido");
one("estar", "pret", 0, "estuve"); one("estar", "subj", 0, "esté");
row("dar", "pret", "di diste dio dimos disteis dieron");
one("dar", "subj", 0, "dé");
one("ver", "impf", 0, "veía"); part("ver", "visto"); one("ver", "subj", 0, "vea"); one("ver", "subj", 3, "veamos");
part("escribir", "escrito"); part("abrir", "abierto");
// regular verbs
row("hablar", "pres", "hablo hablas habla hablamos habláis hablan");
row("hablar", "impf", "hablaba hablabas hablaba hablábamos hablabais hablaban");
row("comer", "pret", "comí comiste comió comimos comisteis comieron");
row("vivir", "fut", "viviré vivirás vivirá viviremos viviréis vivirán");
one("trabajar", "cond", 0, "trabajaría"); one("llamar", "perf", 0, "he llamado"); one("recibir", "perf", 3, "hemos recibido");
one("crear", "pret", 2, "creó"); one("crear", "subj", 0, "cree"); one("crear", "pres", 0, "creo"); part("crear", "creado");
one("cambiar", "pres", 0, "cambio"); one("gustar", "pres", 2, "gusta"); one("gustar", "pres", 5, "gustan"); one("gustar", "impf", 2, "gustaba");
one("ayunar", "pres", 0, "ayuno"); one("enseñar", "pres", 2, "enseña"); one("correr", "pret", 2, "corrió"); one("ocurrir", "pret", 2, "ocurrió");
one("recibir", "pres", 0, "recibo"); one("permitir", "subj", 0, "permita"); one("escuchar", "pret", 0, "escuché"); one("aceptar", "fut", 2, "aceptará");

/* ---------- 4. result ---------- */
console.log(`\n${L.VERBS.length} verbs × ${L.TENSES.length} tenses printed; ${n} form assertions.`);
if (errs.length) { console.error(`\n${errs.length} problem(s):\n` + errs.map(e => " - " + e).join("\n")); process.exit(1); }
console.log("check-verbs OK");
