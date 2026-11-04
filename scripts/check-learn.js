// Validates the Spanish course data and the conjugation engine.
const fs = require("fs"), path = require("path"), vm = require("vm");
const ctx = { console }; ctx.window = ctx; ctx.globalThis = ctx; vm.createContext(ctx);
for (const f of ["lib", "a1", "a2", "b1", "c1", "c2", "extra", "phrases-a", "phrases-b", "phrases-c", "islam", "dawah", "vocab", "vocab-b", "conv-b", "qbank", "exams"]) if (fs.existsSync(path.join(__dirname, "..", "public", "learn", f + ".js"))) vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "public", "learn", f + ".js"), "utf8"), ctx);
const L = ctx.window.LEARN; const errs = [];
const ids = new Set(); const LV = ["A1", "A2", "B1", "B2", "C1", "C2", "DAWAH"];
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
const qmarks = (t, where) => { if (/\?/.test(t) && !/¿/.test(t)) errs.push(`${where} missing ¿: ${t}`); if (/!/.test(t) && !/¡/.test(t)) errs.push(`${where} missing ¡: ${t}`); };
const chkS = (arr, where) => { const seen = new Set(); arr.forEach(x => { const p = x.split("|"); if (p.length !== 2 || !p[0].trim() || !p[1].trim()) errs.push(`${where} bad sentence ${x}`); else { qmarks(p[0], where); if (seen.has(p[0])) errs.push(`${where} dup ${p[0]}`); seen.add(p[0]); } }); };
const chkW = (arr, where) => arr.forEach(x => { const p = x.split("|"); if (p.length !== 3 || !p[0].trim() || !p[1].trim()) errs.push(`${where} bad word ${x}`); if (/[\u{1F1E6}-\u{1F1FF}]/u.test(x)) errs.push(`${where} flag emoji ${x}`); });
const ids2 = new Set();
(L.PHRASES || []).forEach(t => { if (ids2.has(t.id)) errs.push("dup " + t.id); ids2.add(t.id); if (!LV.includes(t.lv)) errs.push(t.id + " level"); chkS(t.s, t.id); });
(L.DECKS || []).forEach(d => { if (ids2.has(d.id)) errs.push("dup " + d.id); ids2.add(d.id); chkW(d.w, d.id); });
(L.DAWAH || []).forEach(c => { if (ids2.has(c.id)) errs.push("dup " + c.id); ids2.add(c.id); chkS(c.s, c.id); c.s.forEach(x => { if (/«[^»]{25,}»/.test(x)) errs.push(`${c.id} quoted text check: ${x}`); }); });
(L.ISLAM || []).forEach(c => { if (ids2.has(c.id)) errs.push("dup " + c.id); ids2.add(c.id); chkW(c.w, c.id); chkS(c.s, c.id); c.s.forEach(x => { if (/«[^»]{25,}»/.test(x) && /Corán|Allah dice|Dios dice/.test(x)) errs.push(`${c.id} possible quoted verse: ${x}`); }); });
[...(L.ISLAM_DLG || []), ...L.CONV].forEach(c => { if (ids2.has(c.id)) errs.push("dup " + c.id); ids2.add(c.id); });
const words = L.UNITS.reduce((n, u) => n + u.w.length, 0), sents = L.UNITS.reduce((n, u) => n + u.s.length + u.g.ex.length, 0), lines = L.UNITS.reduce((n, u) => n + u.d.length, 0) + L.CONV.reduce((n, c) => n + c.d.length, 0);
console.log(`phrases ${(L.PHRASES||[]).reduce((n,t)=>n+t.s.length,0)} in ${(L.PHRASES||[]).length} topics, decks ${(L.DECKS||[]).reduce((n,d)=>n+d.w.length,0)} words, islam ${(L.ISLAM||[]).reduce((n,c)=>n+c.w.length,0)} words + ${(L.ISLAM||[]).reduce((n,c)=>n+c.s.length,0)} sentences, islam dialogues ${(L.ISLAM_DLG||[]).length}, dawah ${(L.DAWAH||[]).reduce((n,c)=>n+c.s.length,0)}`); console.log(`units ${L.UNITS.length} (${LV.map(l => l + ":" + L.UNITS.filter(u => u.lv === l).length).join(" ")}), words ${words}, sentences ${sents}, dialogue lines ${lines}, conversations ${L.CONV.length}, readings ${L.READ.length}, placement ${L.PLACEMENT.length}, verbs ${L.VERBS.length}`);
/* بنك الأسئلة والاختبارات الدولية */
if (L.QBANK) { const qi = new Set(), qq = new Set(); for (const q of L.QBANK) { if (qi.has(q.id)) errs.push("dup qbank " + q.id); qi.add(q.id); if (!["A1", "A2", "B1", "B2", "C1", "C2"].includes(q.lv)) errs.push(q.id + " bad lv"); if (!["gram", "voc", "uso", "lec"].includes(q.sk)) errs.push(q.id + " bad sk"); if (!Array.isArray(q.o) || q.o.length !== 4 || new Set(q.o).size !== 4) errs.push(q.id + " options"); if (!(q.a >= 0 && q.a < 4)) errs.push(q.id + " answer"); if (!q.q || !q.ex) errs.push(q.id + " text"); if (qq.has(q.q)) errs.push(q.id + " dup question"); qq.add(q.q); } }
if (L.EXAMS) { const E = L.EXAMS; if (!Array.isArray(E.dele) || E.dele.length < 6) errs.push("exams: dele levels"); (E.mocks || []).forEach(m => { if (!m.id || !m.lv || !m.text || !Array.isArray(m.q) || !m.q.length) errs.push("mock " + m.id); m.q.forEach(q => { const [t, o, a] = Array.isArray(q) ? q : [q.q, q.o, q.a]; if (!t || !Array.isArray(o) || !(a >= 0 && a < o.length)) errs.push("mock q " + m.id); }); }); }
if (errs.length) { console.error(errs.join("\n")); process.exit(1); } else console.log("OK: course data valid");
