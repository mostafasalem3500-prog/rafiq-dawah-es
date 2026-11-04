// Validates content data: unique ids, valid taxonomy ids, valid Quran references (surah/ayah ranges).
const fs = require("fs"); const vm = require("vm"); const path = require("path");
const ctx = { window: {} }; ctx.RQ = undefined; vm.createContext(ctx);
for (const f of ["data-core.js", "data-long.js", "data-more.js", "data-trust.js", "data-cards.js", "data-quotes.js"]) vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "public", f), "utf8").replace(/^window\.RQ = window\.RQ \|\| \{\};/m, "var RQ = window.RQ = window.RQ || {};"), ctx);
const RQ = ctx.window.RQ;
const AYAHS=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
const errs = [];
const ids = new Set(); const SI = new Set(RQ.SITU.map(s => s.id)), ST = new Set(RQ.STAGES.map(s => s.id)), AU = new Set(RQ.AUD.map(s => s.id));
const checkQ = (r, where) => { const m = /^(\d+):(\d+)(?:-(\d+))?$/.exec(r); if (!m) return errs.push(`${where}: bad ref ${r}`); const s = +m[1], a = +m[2], b = m[3] ? +m[3] : a; if (s < 1 || s > 114 || a < 1 || b < a || b > AYAHS[s - 1] || b - a > 10) errs.push(`${where}: invalid ayah ${r}`); };
const all = [["MSG", RQ.MSG], ["ART", RQ.ART], ["DLG", RQ.DLG], ["WARN", RQ.WARN], ["GUIDE", RQ.GUIDE]];
for (const [n, arr] of all) for (const x of arr) {
  if (ids.has(x.id)) errs.push(`duplicate id ${x.id}`); ids.add(x.id);
  (x.q || []).forEach(r => checkQ(r, x.id)); (x.h || []).forEach(h => { if (!/^\d+$/.test(h)) errs.push(`${x.id}: bad hadith id ${h}`); });
  (x.si || []).forEach(s => SI.has(s) || errs.push(`${x.id}: unknown situ ${s}`)); (x.st || []).forEach(s => ST.has(s) || errs.push(`${x.id}: unknown stage ${s}`)); (x.au || []).forEach(s => AU.has(s) || errs.push(`${x.id}: unknown aud ${s}`));
}
RQ.COURSE.forEach(c => (c.q || []).forEach(r => checkQ(r, "course " + c.n)));
RQ.NEWM.forEach(c => (c.q || []).forEach(r => checkQ(r, "newm " + c.n)));
RQ.TRAIN.forEach(c => (c.q || []).forEach(r => checkQ(r, "train " + c.n)));
const MSGIDS = new Set(RQ.MSG.map(m => m.id)), WARNIDS = new Set(RQ.WARN.map(w => w.id));
RQ.SERIES.forEach(s => s.days.forEach(d => MSGIDS.has(d) || errs.push(`series ${s.id}: unknown message ${d}`)));
Object.entries(RQ.WARN_BY_SITU || {}).forEach(([k, v]) => { SI.has(k) || errs.push("warn_by_situ: unknown situ " + k); v.forEach(w => WARNIDS.has(w) || errs.push("warn_by_situ: unknown warn " + w)); });
RQ.MSG.forEach(m => { if (!m.es || !m.ar || !m.t) errs.push(`${m.id}: missing es/ar/t`); });
const fq = new Set(); RQ.FAQ.forEach(f => { if (fq.has(f.id)) errs.push("dup faq " + f.id); fq.add(f.id); (f.q || []).forEach(r => checkQ(r, f.id)); (f.h || []).forEach(h => /^\d+$/.test(h) || errs.push(f.id + " bad hadith")); if (!f.es || !f.aes || !f.aar || !f.tip) errs.push(f.id + " incomplete"); if (/\?/.test(f.es) && !/¿/.test(f.es)) errs.push(f.id + " missing ¿"); });
const bk = new Set(); RQ.BOOKS.forEach(b => { if (bk.has(b.id)) errs.push("dup book " + b.id); bk.add(b.id); b.aud.forEach(a => AU.has(a) || errs.push(`book ${b.id}: unknown aud ${a}`)); if (!RQ.BOOK_MSG[b.lvl]) errs.push(`book ${b.id}: no message for ${b.lvl}`); });
const qid = new Set(); RQ.QUOTES.forEach(q => { if (qid.has(q.id)) errs.push("dup quote " + q.id); qid.add(q.id); if (!RQ.QBOOKS[q.b]) errs.push(q.id + " unknown book"); if (!RQ.QTOPICS[q.topic]) errs.push(q.id + " topic"); if (!q.es || !q.ar || !q.note) errs.push(q.id + " incomplete"); });
RQ.TRUST.stages.forEach(s => ST.has(s.st) || errs.push("trust stage " + s.st));
RQ.DETECT.forEach(d => SI.has(d.si) || errs.push("detect: unknown situ " + d.si));
Object.keys(RQ.PLAN).forEach(k => ST.has(k) || errs.push("plan: unknown stage " + k));
const hadiths = new Set([...RQ.MSG, ...RQ.ART, ...RQ.DLG, ...RQ.WARN, ...RQ.GUIDE, ...RQ.COURSE, ...RQ.NEWM, ...RQ.TRAIN, ...RQ.FAQ].flatMap(x => x.h || []));
const verses = new Set([...RQ.MSG, ...RQ.ART, ...RQ.DLG, ...RQ.WARN, ...RQ.GUIDE, ...RQ.COURSE, ...RQ.NEWM, ...RQ.TRAIN, ...RQ.FAQ].flatMap(x => x.q || []));
console.log(`faq ${RQ.FAQ.length}, books ${RQ.BOOKS.length}, ideas ${RQ.IDEAS.length}`); console.log(`messages ${RQ.MSG.length}, articles ${RQ.ART.length}, dialogs ${RQ.DLG.length}, course ${RQ.COURSE.length}, warnings ${RQ.WARN.length}, guide ${RQ.GUIDE.length}, new-muslim ${RQ.NEWM.length}, training ${RQ.TRAIN.length}, ideas ${RQ.IDEAS.length}, series ${RQ.SERIES.length}, situations ${RQ.SITU.length}`);
console.log(`unique Quran refs ${verses.size}: ${[...verses].join(" ")}`);
console.log(`unique hadith ids ${hadiths.size}: ${[...hadiths].join(" ")}`);
if (errs.length) { console.error(errs.join("\n")); process.exit(1); } else console.log("OK: all references valid");
