// Validates the Spanish course data and the conjugation engine.
const fs = require("fs"), path = require("path"), vm = require("vm");
const ctx = { console }; ctx.window = ctx; ctx.globalThis = ctx; vm.createContext(ctx);
for (const f of ["lib", "a1", "a2", "b1", "c1", "extra"]) vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "public", "learn", f + ".js"), "utf8"), ctx);
const L = ctx.window.LEARN; const errs = [];
const ids = new Set(); const LV = ["A1", "A2", "B1", "B2", "C1", "DAWAH"];
for (const u of L.UNITS) {
  if (ids.has(u.id)) errs.push("dup unit " + u.id); ids.add(u.id);
  if (!LV.includes(u.lv)) errs.push(u.id + " bad level");
  ["t", "tar", "ic", "goal"].forEach(k => u[k] || errs.push(`${u.id} missing ${k}`));
  if (u.w.length < 10) errs.push(`${u.id} only ${u.w.length} words`);
  u.w.forEach(w => { const p = w.split("|"); if (p.length !== 3 || !p[0] || !p[1]) errs.push(`${u.id} bad word ${w}`); });
  if (new Set(u.w.map(w => w.split("|")[0])).size !== u.w.length) errs.push(u.id + " duplicate word");
  if (new Set(u.w.map(w => w.split("|")[1])).size !== u.w.length) errs.push(u.id + " duplicate Arabic meaning");
  [...u.s, ...u.g.ex].forEach(s => { const p = s.split("|"); if (p.length !== 2 || !p[0] || !p[1]) errs.push(`${u.id} bad sentence ${s}`); });
  if (u.s.length < 5) errs.push(u.id + " few sentences");
  u.d.forEach(d => { if (!/^[AB]:/.test(d) || d.slice(2).split("|").length !== 2) errs.push(`${u.id} bad dialogue ${d}`); });
  if (u.d.length < 4) errs.push(u.id + " short dialogue");
  [...u.s.map(s => s.split("|")[0]), ...u.d.map(d => d.slice(2).split("|")[0])].forEach(t => { if (/\?/.test(t) && !/¿/.test(t)) errs.push(`${u.id} missing ¿: ${t}`); if (/!/.test(t) && !/¡/.test(t)) errs.push(`${u.id} missing ¡: ${t}`); });
}
for (const c of L.CONV) { c.d.forEach(d => { if (!/^[AB]:/.test(d) || d.slice(2).split("|").length !== 2) errs.push(`${c.id} bad line ${d}`); }); if (!c.roles || c.roles.length !== 2) errs.push(c.id + " roles"); }
for (const k of L.KIDS) { if (k.w.length < 8) errs.push(k.id + " few"); k.w.forEach(w => { const p = w.split("|"); if (p.length !== 3 || !p[2]) errs.push(`${k.id} bad ${w}`); }); if (new Set(k.w.map(w => w.split("|")[2])).size !== k.w.length) errs.push(k.id + " duplicate emoji"); }
for (const r of L.READ) r.q.forEach(([q, o, a]) => { if (!(a >= 0 && a < o.length)) errs.push(`${r.id} bad answer ${q}`); });
L.PLACEMENT.forEach(([q, o, a, lv]) => { if (!(a >= 0 && a < o.length) || !LV.includes(lv)) errs.push("placement " + q); });
for (const [v] of L.VERBS) for (const [t] of L.TENSES) { const f = L.conj(v, t); if (f.length !== 6 || f.some(x => !x || /undefined/.test(x))) errs.push(`conj ${v} ${t}`); }
const words = L.UNITS.reduce((n, u) => n + u.w.length, 0), sents = L.UNITS.reduce((n, u) => n + u.s.length + u.g.ex.length, 0), lines = L.UNITS.reduce((n, u) => n + u.d.length, 0) + L.CONV.reduce((n, c) => n + c.d.length, 0);
console.log(`units ${L.UNITS.length} (${LV.map(l => l + ":" + L.UNITS.filter(u => u.lv === l).length).join(" ")}), words ${words}, sentences ${sents}, dialogue lines ${lines}, conversations ${L.CONV.length}, readings ${L.READ.length}, placement ${L.PLACEMENT.length}, verbs ${L.VERBS.length}`);
if (errs.length) { console.error(errs.join("\n")); process.exit(1); } else console.log("OK: course data valid");
