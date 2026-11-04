/* تعلّم الإسبانية — المحرك: المسار، الدرس، التمارين، المراجعة المتباعدة، المهارات، الأطفال، الاختبارات، التقدم. */
(function () {
  const L = window.LEARN, R = window.RAFIQ;
  const { esc, toast } = R; const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const LEVELS = [
    ["A1", "مبتدئ", "تفهم وتستعمل عبارات يومية بسيطة جدًا: التحية والتعارف والأرقام والطلبات الأساسية."],
    ["A2", "أساسي", "تتعامل مع مواقف الحياة اليومية: التسوق والمواصلات والطبيب، وتحكي عن الماضي والخطط."],
    ["B1", "متوسط", "تعبّر عن تجاربك وآرائك وأمنياتك، وتسرد قصة، وتفهم النقاط الرئيسية في كلام واضح."],
    ["B2", "فوق المتوسط", "تناقش موضوعات عامة ومجردة بطلاقة معقولة، وتنقل الكلام، وتجري مقابلة عمل."],
    ["C1", "متقدم", "تفهم التعابير الاصطلاحية والنصوص الطويلة، وتحاجّ وتكتب مراسلات رسمية بدقة."],
    ["DAWAH", "الإسبانية للداعية", "مصطلحات إسلامية دقيقة وعبارات حوار دعوي مهذب وأمين، على منهج أهل السنة."]
  ];
  const W = s => { const [es, ar, em] = s.split("|"); return { es, ar, em: em || "" }; };
  const SNT = s => { const [es, ar] = s.split("|"); return { es, ar }; };
  const DL = s => { const who = s[0]; const [es, ar] = s.slice(2).split("|"); return { who, es, ar }; };
  const unitById = id => L.UNITS.find(u => u.id === id);
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  const today = () => new Date().toLocaleDateString("en-CA");
  const dayAdd = (d, n) => { const x = new Date(d + "T12:00:00"); x.setDate(x.getDate() + n); return x.toLocaleDateString("en-CA"); };
  const lvName = lv => (LEVELS.find(l => l[0] === lv) || [lv, lv])[1];

  /* ---------- التقدم ---------- */
  const KEY = "rafiq-learn";
  const P = Object.assign({ xp: 0, days: {}, streak: { n: 0, last: "" }, goal: 30, done: {}, srs: {}, level: null, exams: {}, reads: {}, convs: {}, tr: true, big: false, kids: {} }, (() => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } })());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { } };
  function addXP(n) {
    const t = today(); P.xp += n; P.days[t] = (P.days[t] || 0) + n;
    if (P.streak.last !== t) { P.streak.n = P.streak.last === dayAdd(t, -1) ? P.streak.n + 1 : 1; P.streak.last = t; }
    save(); const b = $("#lx-xp"); if (b) b.textContent = P.xp;
  }
  const streakNow = () => (P.streak.last === today() || P.streak.last === dayAdd(today(), -1)) ? P.streak.n : 0;
  const BOX = [0, 1, 3, 7, 14, 30, 60];
  function srsAdd(u) { u.w.map(W).forEach(w => { if (!P.srs[w.es]) P.srs[w.es] = { b: 0, d: today(), ar: w.ar, em: w.em, u: u.id }; }); save(); }
  const srsDue = () => Object.entries(P.srs).filter(([, v]) => v.d <= today()).map(([es, v]) => ({ es, ...v }));
  function srsGrade(es, ok) { const c = P.srs[es]; if (!c) return; c.b = ok ? Math.min(c.b + 1, BOX.length - 1) : 0; c.d = dayAdd(today(), ok ? BOX[c.b] : 0); save(); }

  /* ---------- الصوت والميكروفون ---------- */
  const SAY = {
    say(text, slow) { return R.TTS.speak(text, "es", null, { rate: slow ? 0.65 : undefined, quiet: true }); },
    list(texts) { return R.TTS.seq(texts.map(t => ({ text: t }))); },
    seq(lines, onLine) { const v = R.TTS.nv("es"), p = R.TTS.partner(v); return R.TTS.seq(lines.map(l => ({ text: l.es, voice: l.who === "B" ? p : v })), onLine); }
  };
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function hear() {
    return new Promise((res, rej) => {
      if (!SR) return rej(new Error("unsupported"));
      const r = new SR(); r.lang = "es-ES"; r.interimResults = false; r.maxAlternatives = 3;
      r.onresult = e => res([...e.results[0]].map(a => a.transcript)); r.onerror = e => rej(new Error(e.error)); r.onnomatch = () => res([]);
      r.start(); setTimeout(() => { try { r.stop(); } catch (e) { } }, 9000);
    });
  }
  async function checkSpeech(target, btn, out) {
    btn.disabled = true; btn.textContent = "🎙️ تكلّم الآن…";
    try {
      const alts = await hear(); const best = alts.map(a => [a, L.similar(a, target)]).sort((a, b) => b[1] - a[1])[0] || ["", 0];
      const pct = Math.round(best[1] * 100); const ok = best[1] >= 0.7;
      out.innerHTML = `<div class="lx-fb ${ok ? "ok" : "no"}"><b>${ok ? "أحسنت! " : "حاول مرة أخرى. "}${pct}%</b><br><span class="small">سمعتُ: <i lang="es" dir="ltr">${esc(best[0] || "—")}</i></span></div>`;
      return best[1];
    } catch (e) { out.innerHTML = `<p class="notice amber small">${e.message === "unsupported" ? "التعرّف على الكلام غير مدعوم في هذا المتصفح؛ جرّب Chrome على الحاسوب أو أندرويد." : e.message === "not-allowed" ? "اسمح للموقع باستعمال الميكروفون من إعدادات المتصفح." : "لم أسمع شيئًا؛ حاول مرة أخرى."}</p>`; return 0; }
    finally { btn.disabled = false; btn.textContent = "🎤 انطقها"; }
  }

  /* ---------- مكوّنات عرض ---------- */
  const tr = es => P.tr ? `<span class="lx-tr" dir="rtl">${esc(L.translit(es))}</span>` : "";
  const sayBtns = (es, k = "") => `<button type="button" class="lx-ic" data-say="${esc(es)}" title="استمع" aria-label="استمع">🔊</button><button type="button" class="lx-ic" data-say="${esc(es)}" data-slow="1" title="ببطء" aria-label="استمع ببطء">🐢</button>${k}`;
  const ACC = `<div class="lx-acc" aria-label="حروف خاصة">${["á", "é", "í", "ó", "ú", "ñ", "ü", "¿", "¡"].map(c => `<button type="button" data-ins="${c}">${c}</button>`).join("")}</div>`;
  const topbar = (back, title) => `<div class="lx-top"><a class="btn" href="${back}">→ رجوع</a><b>${title}</b><span class="lx-stat" title="نقاط الخبرة">⭐ <span id="lx-xp">${P.xp}</span> · 🔥 ${streakNow()}</span></div>`;

  /* ---------- مولّد التمارين ---------- */
  const allSent = lv => L.UNITS.filter(u => !lv || u.lv === lv).flatMap(u => u.s.map(SNT));
  const allLines = lv => L.UNITS.filter(u => !lv || u.lv === lv).flatMap(u => u.d.map(DL));
  const toks = s => s.split(/\s+/).filter(Boolean);
  /* genSet: يولّد تمارين من أي مجموعة كلمات/جمل/حوار (تُحذف الأنواع التي لا تتوفر مادتها) */
  function genSet(wsRaw, ssRaw, dsRaw, lv, n = 11) {
    const ws = (wsRaw || []).map(W), ss = (ssRaw || []).map(SNT), ds = (dsRaw || []).map(DL); const ex = [];
    const poolW = ws.length >= 4 ? ws : ws.concat(pick(L.UNITS.flatMap(u => u.w.map(W)), 6));
    const mcWord = (w, dir) => { const others = pick(poolW.filter(x => x.es !== w.es && x.ar !== w.ar), 3); return dir === "es" ? { type: "mc", prompt: "ما معنى هذه الكلمة؟", es: w.es, opts: shuffle([w, ...others]).map(x => x.ar), ans: w.ar, say: w.es, key: w } : { type: "mc", prompt: `اختر الكلمة الإسبانية: «${w.ar}»`, em: w.em, opts: shuffle([w, ...others]).map(x => x.es), ans: w.es, ltr: true, key: w }; };
    if (ws.length) {
      const pw = pick(ws, 4);
      pw.slice(0, 2).forEach(w => ex.push(mcWord(w, "es"))); if (pw[2]) ex.push(mcWord(pw[2], "ar"));
      if (pw[3]) { const w = pw[3]; const others = pick(poolW.filter(x => x.es !== w.es), 3); ex.push({ type: "mc", prompt: "استمع واختر ما سمعت", audio: w.es, opts: shuffle([w, ...others]).map(x => `${x.em ? x.em + " " : ""}${x.es}`), ans: `${w.em ? w.em + " " : ""}${w.es}`, ltr: true, key: w }); }
      if (ws.length >= 4) ex.push({ type: "match", pairs: pick(ws, 4) });
    }
    if (ss.length) {
      const shortS = ss.filter(x => toks(x.es).length <= 10); const ps = pick(shortS.length >= 3 ? shortS : ss, 4);
      ps.slice(0, 2).forEach(x => ex.push({ type: "order", es: x.es, ar: x.ar, key: x }));
      const fs = pick(ss, 1)[0]; const ft = toks(fs.es); const cand = ft.map((t, i) => [t.replace(/[¿¡?!.,;:«»]/g, ""), i]).filter(([t]) => t.length > 2);
      const pool = [...new Set(ss.concat(allSent(lv).slice(0, 200)).flatMap(x => toks(x.es)).map(t => t.replace(/[¿¡?!.,;:«»]/g, "")).filter(t => t.length > 2))];
      if (cand.length) { const [word, idx] = cand[Math.random() * cand.length | 0]; const blank = ft.map((t, i) => i === idx ? t.replace(word, "____") : t).join(" "); ex.push({ type: "mc", prompt: `أكمل الجملة: «${fs.ar}»`, es: blank, opts: shuffle([word, ...pick(pool.filter(t => L.norm(t) !== L.norm(word)), 3)]), ans: word, ltr: true, key: fs }); }
      const mm = ps[2] || ps[0]; const others = pick(ss.filter(x => x.es !== mm.es), 2);
      if (others.length === 2) ex.push({ type: "mc", prompt: "ما معنى هذه الجملة؟", es: mm.es, say: mm.es, opts: shuffle([mm, ...others]).map(x => x.ar), ans: mm.ar, key: mm });
      const tt = ps[3] || ps[1] || ps[0]; ex.push(Math.random() < 0.5 ? { type: "type", es: tt.es, ar: tt.ar, key: tt } : { type: "dict", es: tt.es, ar: tt.ar, key: tt });
      if (SR) { const sp = pick(ss, 1)[0]; ex.push({ type: "speak", es: sp.es, key: sp }); }
    }
    if (ds.length > 1) {
      const ri = Math.random() * (ds.length - 1) | 0; const next = ds[ri + 1]; const distract = pick(allLines(lv).concat(allLines()).filter(l => l.es !== next.es && l.es !== ds[ri].es), 2);
      ex.push({ type: "mc", prompt: "اختر الرد المناسب في الحوار", es: ds[ri].es, sub: ds[ri].ar, opts: shuffle([next, ...distract]).map(x => x.es), ans: next.es, ltr: true, say: ds[ri].es, key: next });
    }
    return shuffle(ex.filter(x => x.type !== "match")).slice(0, n).concat(ex.filter(x => x.type === "match"));
  }
  const genUnit = (u, n = 11) => genSet(u.w, u.s, u.d, u.lv, n);
  function genLevel(lv) {
    const units = L.UNITS.filter(u => u.lv === lv); const ex = [];
    for (let i = 0; i < 20; i++) {
      const u = units[i % units.length]; const g = genUnit(u, 11).filter(x => !["speak", "match"].includes(x.type));
      ex.push(g[i % g.length]);
    }
    return shuffle(ex);
  }

  /* ---------- مشغّل التمارين ---------- */
  function runEx(box, list, onDone) {
    let i = 0, ok = 0, total = 0; const misses = [];
    const bar = () => `<div class="lx-prog"><i style="width:${Math.round(i / list.length * 100)}%"></i></div>`;
    function show() {
      if (i >= list.length) return onDone(ok, total, misses);
      const x = list[i]; R.TTS.stop(true);
      box.innerHTML = bar() + `<div class="lx-ex card">${render(x)}</div><div id="lx-fbz"></div>`;
      bind(x); if (x.audio) setTimeout(() => SAY.say(x.audio), 300);
    }
    function finish(correct, answerHTML, item) {
      total++; if (correct) { ok++; addXP(10); } else { misses.push(item); if (item && item.key && item.key.es) { P.miss = (P.miss || []).filter(m => m.es !== item.key.es); P.miss.unshift({ es: item.key.es, ar: item.key.ar || "", em: item.key.em || "" }); P.miss = P.miss.slice(0, 150); save(); } }
      if (correct && item && item.fromMiss) { P.miss = (P.miss || []).filter(m => m.es !== item.es); save(); }
      if (item && item.srsWord) srsGrade(item.srsWord, correct);
      $("#lx-fbz", box).innerHTML = `<div class="lx-fb ${correct ? "ok" : "no"}"><b>${correct ? pick(["أحسنت! 🎉", "ممتاز! ✨", "صحيح! 👏", "رائع! 🌟"], 1)[0] : "الإجابة الصحيحة:"}</b>${answerHTML ? `<div>${answerHTML}</div>` : ""}<button type="button" class="primary" id="lx-next">متابعة ←</button></div>`;
      $$(".lx-ex button, .lx-ex input", box).forEach(b => { if (!b.classList.contains("lx-ic")) b.disabled = true; });
      const nb = $("#lx-next", box); nb.focus(); nb.onclick = () => { i++; show(); };
    }
    function render(x) {
      if (x.type === "mc" || x.type === "mcq") return `<p class="lx-q">${esc(x.prompt || x.q)}</p>${x.em ? `<div class="lx-em">${x.em}</div>` : ""}${x.audio ? `<div class="lx-row"><button type="button" class="lx-big" data-say="${esc(x.audio)}">🔊 استمع</button><button type="button" class="lx-ic" data-say="${esc(x.audio)}" data-slow="1">🐢</button></div>` : ""}${x.es ? `<p class="lx-es" lang="es" dir="ltr">${esc(x.es)} ${x.say ? sayBtns(x.say) : ""}</p>` : ""}${x.sub ? `<p class="muted small">${esc(x.sub)}</p>` : ""}<div class="lx-opts">${x.opts.map((o, k) => `<button type="button" class="lx-opt" data-o="${k}" ${x.ltr ? 'dir="ltr" lang="es"' : ""}>${esc(o)}</button>`).join("")}</div>`;
      if (x.type === "match") return `<p class="lx-q">صِل كل كلمة بمعناها</p><div class="lx-match"><div>${shuffle(x.pairs).map(p => `<button type="button" class="lx-opt" data-m="es" data-v="${esc(p.es)}" dir="ltr" lang="es">${esc(p.em)} ${esc(p.es)}</button>`).join("")}</div><div>${shuffle(x.pairs).map(p => `<button type="button" class="lx-opt" data-m="ar" data-v="${esc(p.es)}">${esc(p.ar)}</button>`).join("")}</div></div>`;
      if (x.type === "order") return `<p class="lx-q">رتّب الكلمات لتكوّن الجملة</p><p class="lx-ar">${esc(x.ar)}</p><div class="lx-ans" id="lx-ans" dir="ltr"></div><div class="lx-bank" dir="ltr">${shuffle(toks(x.es).map((t, k) => [t, k])).map(([t, k]) => `<button type="button" class="lx-tok" data-t="${k}">${esc(t)}</button>`).join("")}</div><div class="lx-row"><button type="button" class="primary" id="lx-chk" disabled>تحقّق</button></div>`;
      if (x.type === "type") return `<p class="lx-q">اكتب الجملة بالإسبانية</p><p class="lx-ar">${esc(x.ar)}</p><input type="text" id="lx-in" dir="ltr" lang="es" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe en español…">${ACC}<div class="lx-row"><button type="button" class="primary" id="lx-chk">تحقّق</button><button type="button" id="lx-hint">تلميح</button></div>`;
      if (x.type === "dict") return `<p class="lx-q">استمع واكتب ما تسمعه (إملاء)</p><div class="lx-row"><button type="button" class="lx-big" data-say="${esc(x.es)}">🔊 استمع</button><button type="button" class="lx-ic" data-say="${esc(x.es)}" data-slow="1">🐢</button></div><input type="text" id="lx-in" dir="ltr" lang="es" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe lo que oyes…">${ACC}<div class="lx-row"><button type="button" class="primary" id="lx-chk">تحقّق</button></div>`;
      if (x.type === "speak") return `<p class="lx-q">انطق هذه الجملة بصوت واضح</p><p class="lx-es" lang="es" dir="ltr">${esc(x.es)} ${sayBtns(x.es)}</p>${tr(x.es)}<div class="lx-row"><button type="button" class="primary" id="lx-mic">🎤 انطقها</button><button type="button" id="lx-skip">تخطَّ</button></div><div id="lx-sr"></div>`;
      if (x.type === "card") return `<p class="lx-q">هل تتذكر معنى هذه الكلمة؟</p><div class="lx-em">${x.em}</div><p class="lx-es" lang="es" dir="ltr">${esc(x.es)} ${sayBtns(x.es)}</p>${tr(x.es)}<div id="lx-back" hidden><p class="lx-ar big">${esc(x.ar)}</p></div><div class="lx-row" id="lx-cr"><button type="button" class="primary" id="lx-flip">أظهر المعنى</button></div>`;
      return "";
    }
    function bind(x) {
      if (x.type === "mc" || x.type === "mcq") $$(".lx-opt", box).forEach(b => b.onclick = () => {
        const o = x.opts[+b.dataset.o]; const right = x.type === "mcq" ? +b.dataset.o === x.ans : o === x.ans;
        b.classList.add(right ? "good" : "bad"); if (!right) $$(".lx-opt", box).find(z => (x.type === "mcq" ? +z.dataset.o === x.ans : x.opts[+z.dataset.o] === x.ans))?.classList.add("good");
        const ansTxt = x.type === "mcq" ? x.opts[x.ans] : x.ans; if (x.ltr || x.type === "mcq") SAY.say(ansTxt.replace(/^[^\p{L}¿¡]+\s/u, ""));
        finish(right, right ? "" : `<span ${x.ltr ? 'dir="ltr" lang="es"' : ""}>${esc(ansTxt)}</span>`, x);
      });
      if (x.type === "match") {
        let sel = null, miss = 0, left = x.pairs.length;
        $$("[data-m]", box).forEach(b => b.onclick = () => {
          if (b.classList.contains("good")) return;
          if (b.dataset.m === "es") { SAY.say(b.dataset.v); $$('[data-m="es"]', box).forEach(z => z.classList.remove("sel")); b.classList.add("sel"); sel = b; return; }
          if (!sel) { toast("اختر الكلمة الإسبانية أولًا"); return; }
          if (sel.dataset.v === b.dataset.v) { sel.classList.replace("sel", "good"); b.classList.add("good"); sel = null; if (--left === 0) finish(miss <= 1, miss ? `أخطاء: ${miss}` : "", x); }
          else { miss++; b.classList.add("bad"); setTimeout(() => b.classList.remove("bad"), 500); }
        });
      }
      if (x.type === "order") {
        const ans = $("#lx-ans", box), chk = $("#lx-chk", box); const T = toks(x.es);
        $$(".lx-tok", box).forEach(b => b.onclick = () => { if (b.parentElement === ans) $(".lx-bank", box).appendChild(b); else ans.appendChild(b); chk.disabled = !ans.children.length; });
        chk.onclick = () => { const got = $$(".lx-tok", ans).map(b => T[+b.dataset.t]).join(" "); const right = L.exact(got, x.es); SAY.say(x.es); finish(right, `<span dir="ltr" lang="es">${esc(x.es)}</span>`, x); };
      }
      if (x.type === "type" || x.type === "dict") {
        const inp = $("#lx-in", box); inp.focus();
        const go = () => { const v = inp.value.trim(); if (!v) return; const s = L.similar(v, x.es); const right = s >= 0.85; const accNote = right && !L.accentsOk(v, x.es) ? "<br><span class='small'>انتبه للعلامات والحروف الخاصة.</span>" : ""; SAY.say(x.es); finish(right, `<span dir="ltr" lang="es">${esc(x.es)}</span>${accNote}`, x); };
        $("#lx-chk", box).onclick = go; inp.onkeydown = e => { if (e.key === "Enter") go(); };
        const h = $("#lx-hint", box); if (h) h.onclick = () => { const w = toks(x.es); inp.value = w.slice(0, Math.ceil(w.length / 3)).join(" ") + " "; inp.focus(); h.disabled = true; };
      }
      if (x.type === "speak") {
        $("#lx-mic", box).onclick = async e => { const s = await checkSpeech(x.es, e.currentTarget, $("#lx-sr", box)); if (s >= 0.7) finish(true, "", x); };
        $("#lx-skip", box).onclick = () => { i++; show(); };
      }
      if (x.type === "card") {
        $("#lx-flip", box).onclick = () => { $("#lx-back", box).hidden = false; $("#lx-cr", box).innerHTML = `<button type="button" class="lx-good" id="lx-k1">✅ عرفتها</button><button type="button" class="lx-bad" id="lx-k0">🔁 لم أعرفها</button>`; $("#lx-k1", box).onclick = () => finish(true, "", Object.assign(x, { srsWord: x.es })); $("#lx-k0", box).onclick = () => finish(false, `<span>${esc(x.ar)}</span>`, Object.assign(x, { srsWord: x.es })); };
      }
    }
    show();
  }

  /* ---------- الصفحة الرئيسية للمسار ---------- */
  function nextUnit() { return L.UNITS.find(u => !P.done[u.id] && (!P.level || LEVELS.findIndex(l => l[0] === u.lv) >= LEVELS.findIndex(l => l[0] === P.level))) || L.UNITS.find(u => !P.done[u.id]) || L.UNITS[0]; }
  function home() {
    const t = today(), dx = P.days[t] || 0, due = srsDue().length, learned = Object.keys(P.srs).length, nu = nextUnit(); const doneN = Object.keys(P.done).length;
    const nPh = L.PHRASES.reduce((a, x) => a + x.s.length, 0), nDk = L.DECKS.reduce((a, x) => a + x.w.length, 0), nIs = L.ISLAM.reduce((a, x) => a + x.w.length + x.s.length, 0);
    const tiles = [["reto", "⚡", "تحدي اليوم", P.reto && P.reto[t] ? "أُنجز اليوم ✅" : "10 أسئلة + 30 نقطة"], ["islam", "🕌", "الإسبانية الشرعية والدعوية", `${nIs} مصطلحًا وجملة`], ["frases", "🗂️", "كتاب العبارات", `${nPh} عبارة يومية`], ["vocab", "🧩", "بطاقات المفردات", `${nDk} كلمة في ${L.DECKS.length} موضوعًا`], ["diccionario", "📖", "القاموس", "ابحث بالعربية أو الإسبانية"], ["errores", "🎯", "أخطائي", `${(P.miss || []).length} عنصرًا للمراجعة`], ["nivel", "🧭", "حدّد مستواك", "اختبار 20 سؤالًا"], ["repaso", "🔁", "المراجعة الذكية", due ? `${due} كلمة مستحقة اليوم` : "لا مراجعة مستحقة"], ["conv", "💬", "محادثات يومية", `${L.CONV.length} موقفًا بالصوت ولعب الأدوار`], ["verbos", "🔤", "مدرّب الأفعال", `${L.VERBS.length} فعلًا × 7 أزمنة`], ["habilidades", "🎯", "المهارات الأربع", "استماع، نطق، قراءة، كتابة"], ["abc", "🅰️", "الحروف والنطق", "دليل الأصوات للعربي"], ["ninos", "🧒", "ركن الصغار", "ألعاب بالصور والصوت"], ["tutor", "🧑‍🏫", "اسأل المعلّم", "شرح وتصحيح عبر Gemini"], ["progreso", "📊", "تقدّمي", "الإحصاءات والإعدادات"]];
    return `${R.head("تعلّم الإسبانية من الصفر إلى الاحتراف", "مسار متدرج على مستويات الإطار الأوروبي المرجعي للغات (A1 → C1)، بشرح عربي مبسّط، وصوت لكل كلمة وجملة، ونطق تقريبي بالحروف العربية، وتمارين متنوعة، ومراجعة متباعدة، ومسار خاص للداعية. يناسب الكبار والصغار، ويحفظ تقدّمك في جهازك. كل الدروس مفتوحة: ابدأ من حيث تريد، أو تخطَّ ما تعرفه باختبار قصير.")}
    <div class="lx-hero card"><div class="lx-kpis"><div><b>⭐ <span id="lx-xp">${P.xp}</span></b><span>نقاط الخبرة</span></div><div><b>🔥 ${streakNow()}</b><span>أيام متتالية</span></div><div><b>📚 ${doneN}/${L.UNITS.length}</b><span>دروس منجزة</span></div><div><b>🧠 ${learned}</b><span>كلمة في ذاكرتك</span></div></div>
      <div class="lx-goal"><span>هدف اليوم: ${Math.min(dx, P.goal)} / ${P.goal} نقطة</span><div class="lx-prog"><i style="width:${Math.min(100, Math.round(dx / P.goal * 100))}%"></i></div></div>
      <div class="lx-row"><a class="btn primary lx-big" href="#aprender/unidad/${nu.id}">${doneN ? "تابع" : "ابدأ"}: ${nu.ic} ${esc(nu.tar)} ←</a>${due ? `<a class="btn" href="#aprender/repaso">🔁 راجع ${due} كلمة</a>` : ""}${P.level ? `<span class="tag gold">مستواك: ${P.level}</span>` : `<a class="btn" href="#aprender/nivel">🧭 لا تعرف مستواك؟</a>`}<label class="small">🎙️ صوت المعلّم <select id="lx-voice">${R.NV.es.map(v => `<option value="${v[0]}"${v[0] === R.TTS.nv("es") ? " selected" : ""}>${v[1]}</option>`).join("")}</select></label></div></div>
    <div class="lx-tiles">${tiles.map(([h, ic, t, s]) => `<a class="lx-tile card lift" href="#aprender/${h}"><span class="lx-tic">${ic}</span><b>${t}</b><span class="muted small">${s}</span></a>`).join("")}</div>
    ${LEVELS.map(([lv, name, desc]) => { const us = L.UNITS.filter(u => u.lv === lv); const d = us.filter(u => P.done[u.id]).length; return `<section class="lx-level" id="lv-${lv}"><div class="row between"><h2>${lv === "DAWAH" ? "🕌" : `<span class="lx-lv">${lv}</span>`} ${name}</h2><span class="muted small">${d}/${us.length}${P.exams[lv] ? ` · اختبار المستوى ${P.exams[lv]}% 🏅` : ""}</span></div><p class="muted">${desc}</p>
      <div class="lx-units">${us.map(u => { const st = P.done[u.id]; return `<a class="lx-unit card lift${st ? " done" : ""}${u.id === nu.id ? " next" : ""}" href="#aprender/unidad/${u.id}"><span class="lx-uic">${u.ic}</span><span><b>${esc(u.tar)}</b><br><bdi class="small muted" lang="es">${esc(u.t)}</bdi></span><span class="lx-stars">${st ? "★".repeat(st.stars) + "☆".repeat(3 - st.stars) : ""}</span></a>`; }).join("")}</div>
      ${lv !== "DAWAH" ? `<p><a class="btn" href="#aprender/examen/${lv}">🏅 اختبار المستوى ${lv}</a></p>` : ""}</section>`; }).join("")}
    <p class="muted small">المستويات مبنية على أوصاف الإطار الأوروبي المرجعي المشترك للغات (MCER/CEFR). الموقع أداة تعلّم مجانية وليس جهة مانحة لشهادات رسمية؛ للشهادة المعتمدة يمكنك التقدم لاختبار DELE أو SIELE من معهد ثربانتس.</p>`;
  }

  /* ---------- الدرس ---------- */
  const STEPS = [["words", "الكلمات"], ["grammar", "القاعدة"], ["sentences", "الجمل"], ["dialogue", "الحوار"], ["practice", "التمارين"]];
  function lessonView(u) {
    const idx = L.UNITS.indexOf(u);
    return `${topbar("#aprender", `${u.ic} ${esc(u.tar)}`)}<p class="muted"><span class="lx-lv">${u.lv}</span> <bdi lang="es">${esc(u.t)}</bdi> · <b>الهدف:</b> ${esc(u.goal)}</p>
      <div class="lx-row">${P.done[u.id] ? `<span class="tag gold">✅ أنجزته</span>` : ""}<button type="button" id="lx-skip-test" title="إن كنت تعرف هذا الدرس فاجتز اختبارًا قصيرًا لتتخطاه">⏭️ أعرفه — اختبرني لأتخطّاه</button></div>
      <div class="lx-steps" role="tablist">${STEPS.map(([k, n], i) => `<button type="button" role="tab" data-step="${k}">${i + 1}. ${n}</button>`).join("")}</div>
      <div id="lx-body"></div>
      <div class="lx-row between"><span>${idx > 0 ? `<a class="btn" href="#aprender/unidad/${L.UNITS[idx - 1].id}">→ الدرس السابق</a>` : ""}</span><span>${idx < L.UNITS.length - 1 ? `<a class="btn" href="#aprender/unidad/${L.UNITS[idx + 1].id}">الدرس التالي ←</a>` : ""}</span></div>`;
  }
  function bindLesson(u) {
    const body = $("#lx-body"); const ws = u.w.map(W), ss = u.s.map(SNT), ds = u.d.map(DL);
    const go = k => {
      $$("[data-step]").forEach(b => b.setAttribute("aria-selected", b.dataset.step === k)); R.TTS.stop(true);
      const nextBtn = n => `<div class="lx-row"><button type="button" class="primary lx-big" data-go="${n}">التالي ←</button></div>`;
      if (k === "words") body.innerHTML = `<div class="lx-row"><button type="button" id="lx-all">▶ استمع لكل الكلمات</button><label class="small"><input type="checkbox" id="lx-trc"${P.tr ? " checked" : ""}> النطق بالحروف العربية</label></div><div class="lx-words">${ws.map(w => `<div class="lx-word card" data-say="${esc(w.es)}" tabindex="0" role="button"><span class="lx-em">${w.em}</span><b lang="es" dir="ltr">${esc(w.es)}</b>${tr(w.es)}<span class="lx-ar">${esc(w.ar)}</span><span class="lx-row"><button type="button" class="lx-ic" data-say="${esc(w.es)}" data-slow="1">🐢</button>${SR ? `<button type="button" class="lx-ic" data-rep="${esc(w.es)}" title="كرّر وتحقّق من نطقك">🎤</button>` : ""}</span><span class="lx-srz"></span></div>`).join("")}</div>${nextBtn("grammar")}`;
      if (k === "grammar") body.innerHTML = `<div class="card"><h3>${esc(u.g.t)}</h3><ul class="steps">${u.g.b.map(b => `<li>${esc(b)}</li>`).join("")}</ul><h4>أمثلة</h4>${u.g.ex.map(SNT).map(e => `<div class="lx-sent"><p class="lx-es" lang="es" dir="ltr">${esc(e.es)} ${sayBtns(e.es)}</p>${tr(e.es)}<p class="lx-ar">${esc(e.ar)}</p></div>`).join("")}</div>${u.tip ? `<p class="notice small">💡 ${esc(u.tip)}</p>` : ""}${nextBtn("sentences")}`;
      if (k === "sentences") body.innerHTML = `<div class="card">${ss.map(e => `<div class="lx-sent"><p class="lx-es" lang="es" dir="ltr">${esc(e.es)} ${sayBtns(e.es, SR ? `<button type="button" class="lx-ic" data-rep="${esc(e.es)}">🎤</button>` : "")}</p>${tr(e.es)}<p class="lx-ar">${esc(e.ar)}</p><span class="lx-srz"></span></div>`).join("")}</div>${nextBtn("dialogue")}`;
      if (k === "dialogue") { body.innerHTML = `<div class="lx-row"><button type="button" id="lx-play">▶ استمع للحوار</button><label class="small"><input type="checkbox" id="lx-hidear"> أخفِ الترجمة</label></div><div class="lx-dlg card">${ds.map((l, i) => `<div class="bubble ${l.who === "A" ? "in" : "da"}" data-li="${i}"><p lang="es" dir="ltr" class="lx-es">${esc(l.es)} <button type="button" class="lx-ic" data-say="${esc(l.es)}">🔊</button></p>${tr(l.es)}<p class="lx-ar small">${esc(l.ar)}</p></div>`).join("")}</div>${nextBtn("practice")}`;
        $("#lx-play").onclick = () => SAY.seq(ds, i => { $$("[data-li]").forEach(b => b.classList.toggle("lx-now", +b.dataset.li === i)); });
        $("#lx-hidear").onchange = e => $$(".lx-dlg .lx-ar").forEach(p => p.hidden = e.target.checked); }
      if (k === "practice") { body.innerHTML = `<div id="lx-run"></div>`; runEx($("#lx-run"), genUnit(u), (ok, total) => {
        const pct = total ? Math.round(ok / total * 100) : 0; const stars = pct >= 90 ? 3 : pct >= 75 ? 2 : pct >= 50 ? 1 : 0;
        if (stars) { const prev = P.done[u.id]; P.done[u.id] = { stars: Math.max(stars, prev ? prev.stars : 0), best: Math.max(pct, prev ? prev.best : 0), at: today() }; srsAdd(u); addXP(20); }
        save(); const nx = L.UNITS[L.UNITS.indexOf(u) + 1];
        body.innerHTML = `<div class="card lx-result"><div class="lx-em">${stars === 3 ? "🏆" : stars ? "🎉" : "💪"}</div><h2>${stars ? "أحسنت! أنهيت الدرس" : "قاربت! أعد المحاولة"}</h2><p class="lx-stars big">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</p><p>${ok} من ${total} صحيحة (${pct}%)${stars ? " · +20 نقطة إنجاز" : ""}</p>${stars ? "<p class='muted small'>أُضيفت كلمات الدرس إلى المراجعة الذكية.</p>" : ""}
          <div class="lx-row" style="justify-content:center"><button type="button" data-go="practice">🔁 أعد التمارين</button>${nx ? `<a class="btn primary" href="#aprender/unidad/${nx.id}">الدرس التالي ←</a>` : ""}<a class="btn" href="#aprender">المسار</a></div></div>`;
      }); }
      if (k === "words") { $("#lx-all").onclick = () => SAY.list(ws.map(w => w.es)); $("#lx-trc").onchange = e => { P.tr = e.target.checked; save(); go("words"); }; }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    $$("[data-step]").forEach(b => b.onclick = () => go(b.dataset.step));
    $("#lx-skip-test").onclick = () => { $$("[data-step]").forEach(b => b.setAttribute("aria-selected", "false")); body.innerHTML = `<p class="notice small">اختبار تخطٍّ: 10 أسئلة، تحتاج 80% لتسجيل الدرس منجزًا.</p><div id="lx-run"></div>`; runEx($("#lx-run"), genUnit(u, 10).filter(x => x.type !== "speak"), (ok, total) => { const pct = total ? Math.round(ok / total * 100) : 0; const pass = pct >= 80; if (pass) { P.done[u.id] = { stars: pct === 100 ? 3 : 2, best: pct, at: today(), skip: 1 }; srsAdd(u); addXP(20); save(); } const nx = L.UNITS[L.UNITS.indexOf(u) + 1]; body.innerHTML = `<div class="card lx-result"><div class="lx-em">${pass ? "⏭️" : "📘"}</div><h2>${pass ? "ممتاز! تخطّيت هذا الدرس" : "يحسن أن تراجع الدرس أولًا"}</h2><p>${ok} من ${total} (${pct}%)</p><div class="lx-row" style="justify-content:center">${pass && nx ? `<a class="btn primary" href="#aprender/unidad/${nx.id}">الدرس التالي ←</a>` : `<button type="button" data-go="words">ابدأ الدرس</button>`}</div></div>`; }); };
    body.addEventListener("click", async e => {
      const g = e.target.closest("[data-go]"); if (g) return go(g.dataset.go);
      const rp = e.target.closest("[data-rep]"); if (rp) { e.stopPropagation(); const box = rp.closest(".lx-word, .lx-sent").querySelector(".lx-srz"); const s = await checkSpeech(rp.dataset.rep, rp, box); rp.textContent = "🎤"; if (s >= 0.7) addXP(2); }
    });
    go("words");
  }

  /* ---------- المراجعة المتباعدة ---------- */
  function review() {
    const due = srsDue(); const all = Object.entries(P.srs).map(([es, v]) => ({ es, ...v }));
    const boxes = [0, 1, 2, 3, 4, 5, 6].map(b => all.filter(c => c.b === b).length);
    return `${topbar("#aprender", "🔁 المراجعة الذكية")}<p class="muted">تعتمد على التكرار المتباعد (نظام صناديق لايتنر): الكلمة التي تعرفها تعود بعد 1 ثم 3 ثم 7 ثم 14 ثم 30 ثم 60 يومًا، والتي تنساها تعود اليوم. هذا من أنجع أساليب الحفظ طويل المدى.</p>
      <div class="card"><div class="lx-kpis"><div><b>${due.length}</b><span>مستحقة اليوم</span></div><div><b>${all.length}</b><span>كل الكلمات</span></div><div><b>${boxes[5] + boxes[6]}</b><span>محفوظة جيدًا</span></div></div></div>
      ${all.length ? `<div class="lx-row"><button type="button" class="primary lx-big" id="rv-go"${due.length ? "" : " disabled"}>ابدأ المراجعة (${Math.min(due.length, 20)})</button><button type="button" id="rv-extra">تمرين إضافي على كلمات عشوائية</button></div>` : `<p class="notice">أنهِ درسًا واحدًا على الأقل لتُضاف كلماته هنا. <a href="#aprender">اذهب إلى المسار</a></p>`}<div id="rv-run"></div>`;
  }
  function bindReview() {
    const start = cards => runEx($("#rv-run"), cards.map(c => ({ type: "card", es: c.es, ar: c.ar, em: c.em })), (ok, total) => { addXP(5); $("#rv-run").innerHTML = `<div class="card lx-result"><div class="lx-em">🧠</div><h2>انتهت المراجعة</h2><p>${ok} من ${total} تذكرتها.</p><a class="btn primary" href="#aprender/repaso">تحديث</a> <a class="btn" href="#aprender">المسار</a></div>`; });
    const g = $("#rv-go"); if (g) g.onclick = () => start(shuffle(srsDue()).slice(0, 20));
    const x = $("#rv-extra"); if (x) x.onclick = () => start(pick(Object.entries(P.srs).map(([es, v]) => ({ es, ...v })), 10));
  }

  /* ---------- المحادثات ---------- */
  function convList() {
    const units = L.UNITS.map(u => ({ id: "u-" + u.id, lv: u.lv, ic: u.ic, tar: u.tar, t: u.t }));
    return `${topbar("#aprender", "💬 محادثات يومية")}<p class="muted">استمع للحوار بصوتين، ثم العب دور أحد الطرفين: تختفي جملك فتقولها بنفسك، ويتحقق الميكروفون من نطقك.</p>
      <h2>مواقف الحياة اليومية</h2><div class="lx-units">${L.CONV.map(c => `<a class="lx-unit card lift${P.convs[c.id] ? " done" : ""}" href="#aprender/conv/${c.id}"><span class="lx-uic">${c.ic}</span><span><b>${esc(c.tar)}</b><br><bdi class="small muted" lang="es">${esc(c.t)}</bdi></span><span class="lx-lv">${c.lv}</span></a>`).join("")}</div>
      ${L.ISLAM_DLG.length ? `<h2>حوارات دعوية</h2><div class="lx-units">${L.ISLAM_DLG.map(c => `<a class="lx-unit card lift${P.convs[c.id] ? " done" : ""}" href="#aprender/conv/${c.id}"><span class="lx-uic">${c.ic}</span><span><b>${esc(c.tar)}</b><br><bdi class="small muted" lang="es">${esc(c.t)}</bdi></span><span class="lx-lv">${c.lv}</span></a>`).join("")}</div>` : ""}
      <h2>حوارات الدروس</h2><div class="lx-units">${units.map(c => `<a class="lx-unit card lift" href="#aprender/conv/${c.id}"><span class="lx-uic">${c.ic}</span><span><b>${esc(c.tar)}</b><br><bdi class="small muted" lang="es">${esc(c.t)}</bdi></span><span class="lx-lv">${c.lv}</span></a>`).join("")}</div>`;
  }
  const convById = id => { if (id.startsWith("u-")) { const u = unitById(id.slice(2)); return u && { id, ic: u.ic, tar: u.tar, t: u.t, lv: u.lv, roles: ["A", "B"], d: u.d }; } return L.CONV.find(c => c.id === id) || L.ISLAM_DLG.find(c => c.id === id); };
  function convView(c) {
    const ds = c.d.map(DL); const roles = c.roles || ["A", "B"];
    return `${topbar("#aprender/conv", `${c.ic} ${esc(c.tar)}`)}<p class="muted"><span class="lx-lv">${c.lv}</span> <bdi lang="es">${esc(c.t)}</bdi></p>
      <div class="card lx-row"><button type="button" class="primary" id="cv-play">▶ استمع للحوار كاملًا</button><label class="small">أنا ألعب دور: <select id="cv-role"><option value="">لا أحد (استماع)</option><option value="A">${esc(roles[0])}</option><option value="B">${esc(roles[1])}</option></select></label><label class="small"><input type="checkbox" id="cv-ar"> أخفِ الترجمة</label></div>
      <div class="lx-dlg card" id="cv-dlg">${ds.map((l, i) => `<div class="bubble ${l.who === "A" ? "in" : "da"}" data-li="${i}" data-who="${l.who}"><span class="small muted">${esc(l.who === "A" ? roles[0] : roles[1])}</span><div class="cv-txt"><p lang="es" dir="ltr" class="lx-es">${esc(l.es)} <button type="button" class="lx-ic" data-say="${esc(l.es)}">🔊</button><button type="button" class="lx-ic" data-say="${esc(l.es)}" data-slow="1">🐢</button></p>${tr(l.es)}</div><p class="lx-ar small">${esc(l.ar)}</p><div class="cv-me" hidden><p class="lx-ar small">${esc(l.ar)}</p><div class="lx-row">${SR ? `<button type="button" data-rep="${esc(l.es)}">🎤 قلها</button>` : ""}<button type="button" data-reveal>👁 أظهر</button></div><span class="lx-srz"></span></div></div>`).join("")}</div>
      <div class="lx-row"><button type="button" id="cv-done">✔ أتممت هذه المحادثة (+15)</button></div>`;
  }
  function bindConv(c) {
    const ds = c.d.map(DL);
    $("#cv-play").onclick = () => SAY.seq(ds, i => $$("[data-li]").forEach(b => b.classList.toggle("lx-now", +b.dataset.li === i)));
    $("#cv-ar").onchange = e => $$("#cv-dlg > .bubble > .lx-ar").forEach(p => p.hidden = e.target.checked);
    $("#cv-role").onchange = e => { const r = e.target.value; $$("#cv-dlg .bubble").forEach(b => { const me = b.dataset.who === r; b.querySelector(".cv-txt").hidden = me; b.querySelector(".cv-me").hidden = !me; b.querySelector(":scope > .lx-ar").hidden = me || $("#cv-ar").checked; }); };
    $("#cv-dlg").addEventListener("click", async e => {
      const rv = e.target.closest("[data-reveal]"); if (rv) { const b = rv.closest(".bubble"); b.querySelector(".cv-txt").hidden = false; return; }
      const rp = e.target.closest("[data-rep]"); if (rp) { const s = await checkSpeech(rp.dataset.rep, rp, rp.closest(".cv-me").querySelector(".lx-srz")); rp.textContent = "🎤 قلها"; if (s >= 0.7) { addXP(3); rp.closest(".bubble").querySelector(".cv-txt").hidden = false; } }
    });
    $("#cv-done").onclick = () => { if (!P.convs[c.id]) { P.convs[c.id] = today(); addXP(15); toast("أحسنت! +15 نقطة"); } else toast("سجّلتها من قبل"); };
  }

  /* ---------- مدرّب الأفعال ---------- */
  function verbsView() {
    return `${topbar("#aprender", "🔤 مدرّب الأفعال")}<p class="muted">اختر فعلًا وزمنًا لترى التصريف كاملًا مع الصوت، ثم اختبر نفسك. يشمل الأفعال الشاذة وتغيّر الجذر.</p>
      <div class="card"><div class="form"><div class="field"><label for="vb-v">الفعل</label><select id="vb-v" dir="ltr">${L.VERBS.map(([v, a]) => `<option value="${v}">${v} — ${a}</option>`).join("")}</select></div><div class="field"><label for="vb-t">الزمن</label><select id="vb-t">${L.TENSES.map(([k, n]) => `<option value="${k}">${n}</option>`).join("")}</select></div></div>
      <div id="vb-table"></div></div>
      <div class="card"><h3>اختبر نفسك</h3><div id="vb-quiz"></div></div>`;
  }
  function bindVerbs() {
    const show = () => { const v = $("#vb-v").value, t = $("#vb-t").value; const f = L.conj(v, t); $("#vb-table").innerHTML = `<table class="lx-table" dir="ltr"><tbody>${L.PERSONS.map((p, i) => `<tr><td class="muted">${p}${i === 4 ? " <small>(España)</small>" : ""}</td><td><b lang="es">${esc(f[i])}</b></td><td><button type="button" class="lx-ic" data-say="${esc((p.split(" ")[0]) + " " + f[i])}">🔊</button></td></tr>`).join("")}</tbody></table><button type="button" id="vb-all">▶ استمع للجدول</button>`; $("#vb-all").onclick = () => SAY.list(f.map((x, i) => L.PERSONS[i].split(" ")[0] + " " + x)); };
    $("#vb-v").onchange = show; $("#vb-t").onchange = show; show();
    const q = () => {
      const [v, a] = L.VERBS[Math.random() * L.VERBS.length | 0]; const [t, tn] = L.TENSES[Math.random() * 4 | 0]; const p = Math.random() * 6 | 0; if (p === 4) return q(); const ans = L.conj(v, t)[p];
      $("#vb-quiz").innerHTML = `<p>صرّف <b dir="ltr" lang="es">${v}</b> (${a}) في <b>${tn}</b> مع <b dir="ltr">${L.PERSONS[p]}</b></p><input type="text" id="vq-in" dir="ltr" lang="es" autocomplete="off" autocapitalize="off" spellcheck="false">${ACC}<div class="lx-row"><button type="button" class="primary" id="vq-chk">تحقّق</button><button type="button" id="vq-new">سؤال آخر</button></div><div id="vq-fb"></div>`;
      const chk = () => { const g = $("#vq-in").value.trim(); if (!g) return; const ok = L.exact(g, ans); const acc = ok && !L.accentsOk(g, ans); if (ok) addXP(5); SAY.say(ans); $("#vq-fb").innerHTML = `<div class="lx-fb ${ok ? "ok" : "no"}"><b>${ok ? "صحيح!" : "الصواب:"}</b> <span dir="ltr" lang="es">${esc(ans)}</span>${acc ? "<br><span class='small'>انتبه لعلامة النبر.</span>" : ""}</div>`; };
      $("#vq-chk").onclick = chk; $("#vq-in").onkeydown = e => { if (e.key === "Enter") chk(); }; $("#vq-new").onclick = q;
    };
    q();
  }

  /* ---------- المهارات ---------- */
  function skillsView() {
    return `${topbar("#aprender", "🎯 المهارات الأربع")}<div class="lx-tiles">
      <button type="button" class="lx-tile card lift" data-sk="escuchar"><span class="lx-tic">👂</span><b>الاستماع (إملاء)</b><span class="muted small">استمع لجملة واكتبها</span></button>
      <button type="button" class="lx-tile card lift" data-sk="hablar"><span class="lx-tic">🗣️</span><b>التحدث والنطق</b><span class="muted small">${SR ? "انطق والميكروفون يقيّم" : "يتطلب Chrome أو Edge"}</span></button>
      <button type="button" class="lx-tile card lift" data-sk="escribir"><span class="lx-tic">✍️</span><b>الكتابة</b><span class="muted small">ترجم من العربية إلى الإسبانية</span></button>
      <a class="lx-tile card lift" href="#aprender/leer"><span class="lx-tic">📖</span><b>القراءة</b><span class="muted small">${L.READ.length} نصوص بأسئلة فهم</span></a></div>
      <div class="card"><label>المستوى: <select id="sk-lv">${["A1", "A2", "B1", "B2", "C1", "DAWAH"].map(l => `<option${l === (P.level || "A1") ? " selected" : ""}>${l}</option>`).join("")}</select></label></div><div id="sk-run"></div>`;
  }
  function bindSkills() {
    $$("[data-sk]").forEach(b => b.onclick = () => {
      const lv = $("#sk-lv").value; const ss = pick(allSent(lv), 8); const k = b.dataset.sk;
      const list = ss.map(s => k === "escuchar" ? { type: "dict", ...s } : k === "hablar" ? (SR ? { type: "speak", es: s.es } : { type: "order", ...s }) : { type: "type", ...s });
      runEx($("#sk-run"), list, (ok, total) => { $("#sk-run").innerHTML = `<div class="card lx-result"><div class="lx-em">🎯</div><h2>${ok} من ${total}</h2><button type="button" class="primary" onclick="this.closest('.lx-result').remove()">حسنًا</button></div>`; });
      $("#sk-run").scrollIntoView({ behavior: "smooth" });
    });
  }
  function readList() { return `${topbar("#aprender/habilidades", "📖 القراءة")}<div class="lx-units">${[...L.READ].sort((a, b) => ["A1", "A2", "B1", "B2", "C1"].indexOf(a.lv) - ["A1", "A2", "B1", "B2", "C1"].indexOf(b.lv)).map(r => `<a class="lx-unit card lift${P.reads[r.id] ? " done" : ""}" href="#aprender/leer/${r.id}"><span class="lx-lv">${r.lv}</span><span><b>${esc(r.tar)}</b><br><bdi class="small muted" lang="es">${esc(r.t)}</bdi></span><span class="small">${P.reads[r.id] ? P.reads[r.id] + "%" : ""}</span></a>`).join("")}</div>`; }
  function readView(r) {
    const sents = r.text.match(/[^.!?]+[.!?»]+/g) || [r.text];
    return `${topbar("#aprender/leer", `📖 ${esc(r.tar)}`)}<div class="card"><div class="row between"><h2 lang="es" dir="ltr">${esc(r.t)}</h2><span class="lx-lv">${r.lv}</span></div><div class="lx-row"><button type="button" id="rd-all">▶ استمع للنص</button><span class="muted small">اضغط أي جملة لسماعها</span></div>
      <p class="muted small">اضغط 🔊 بجانب الجملة لسماعها، واضغط أي كلمة لترى معناها.</p><div id="rd-pop" class="lx-pop-box" hidden></div>
      <p class="lx-read" lang="es" dir="ltr">${sents.map(s => `<span class="lx-rs">${s.trim().split(/\s+/).map(w => `<span class="lx-tw">${esc(w)}</span>`).join(" ")} <button type="button" class="lx-ic" data-say="${esc(s.trim())}">🔊</button></span>`).join(" ")}</p>
      <details><summary>مفردات مساعدة</summary><ul>${r.gl.map(g => { const [e, a] = g.split("|"); return `<li><b dir="ltr" lang="es">${esc(e)}</b> — ${esc(a)}</li>`; }).join("")}</ul></details></div>
      <div class="card"><h3>أسئلة الفهم</h3><div id="rd-q"></div></div>`;
  }
  function bindRead(r) {
    $("#rd-all").onclick = () => SAY.list((r.text.match(/[^.!?]+[.!?»]+/g) || [r.text]).map(x => x.trim()));
    const gl = new Map(r.gl.map(g => { const [e, a] = g.split("|"); return [L.norm(e), a]; }));
    $(".lx-read").addEventListener("click", e => { const w = e.target.closest(".lx-tw"); if (!w) return; const raw = w.textContent.replace(/[¿¡?!.,;:«»"()]/g, ""); const k = L.norm(raw); const D = dict(); const hit = gl.get(k) || (D.map.get(k) || D.map.get(D.strip(raw)) || {}).ar; $$(".lx-tw.on").forEach(x => x.classList.remove("on")); w.classList.add("on"); const pop = $("#rd-pop"); pop.hidden = false; pop.innerHTML = `<b dir="ltr" lang="es">${esc(raw)}</b> <button type="button" class="lx-ic" data-say="${esc(raw)}">🔊</button> — ${hit ? esc(hit) : `<span class="muted">ليست في القاموس.</span> <a href="https://translate.google.com/?sl=es&tl=ar&text=${encodeURIComponent(raw)}" target="_blank" rel="noopener">ترجمها</a>`}`; SAY.say(raw); });
    runEx($("#rd-q"), r.q.map(([q, o, a]) => ({ type: "mcq", q, opts: o, ans: a, ltr: true })), (ok, total) => { const pct = Math.round(ok / total * 100); P.reads[r.id] = Math.max(pct, P.reads[r.id] || 0); save(); $("#rd-q").innerHTML = `<div class="lx-fb ${pct >= 67 ? "ok" : "no"}"><b>${ok} من ${total}</b> ${pct >= 67 ? "فهمٌ ممتاز!" : "أعد القراءة وحاول مجددًا."} <a class="btn" href="#aprender/leer">نصوص أخرى</a></div>`; });
  }

  /* ---------- الحروف ---------- */
  function abcView() {
    return `${topbar("#aprender", "🅰️ الحروف والنطق")}<div class="card"><h3>قواعد ذهبية للمتعلم العربي</h3><ul class="steps">${L.SOUNDTIPS.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
      <div class="lx-abc">${L.ABC.map(([l, n, s, ex]) => `<div class="card lx-letter"><b dir="ltr">${l}</b><span class="muted small" dir="ltr">${n}</span><span>${esc(s)}</span><button type="button" data-say="${esc(ex.replace(" · ", ", "))}" dir="ltr">🔊 ${esc(ex)}</button></div>`).join("")}</div>`;
  }

  /* ---------- ركن الصغار ---------- */
  function kidsView(arg) {
    const sets = L.KIDS;
    if (!arg) return `${topbar("#aprender", "🧒 ركن الصغار")}<p class="lx-kidsintro">اختر بطاقة لتلعب! 🎈 استمع للكلمة واضغط الصورة الصحيحة.</p><div class="lx-units kids">${sets.map(u => `<a class="lx-unit card lift" href="#aprender/ninos/${u.id}"><span class="lx-uic big">${u.ic}</span><span><b>${esc(u.tar)}</b><br><span class="small">${"⭐".repeat(P.kids[u.id] || 0)}</span></span></a>`).join("")}</div>`;
    const u = L.KIDS.find(k => k.id === arg);
    return `${topbar("#aprender/ninos", `${u.ic} ${esc(u.tar)}`)}<div class="lx-row"><button type="button" id="kd-learn" class="lx-big">📚 تعلّم</button><button type="button" id="kd-play" class="lx-big primary">🎮 العب</button></div><div id="kd-box"></div>`;
  }
  function bindKids(arg) {
    if (!arg) return; const u = L.KIDS.find(k => k.id === arg); const ws = u.w.map(W); const box = $("#kd-box");
    const learn = () => { box.innerHTML = `<div class="lx-kgrid">${ws.map(w => `<button type="button" class="lx-kcard" data-say="${esc(w.es)}"><span>${w.em}</span><b dir="ltr">${esc(w.es)}</b><small>${esc(w.ar)}</small></button>`).join("")}</div>`; };
    const play = () => {
      let round = 0, score = 0; const order = shuffle(ws).slice(0, 8);
      const next = () => {
        if (round >= order.length) { const st = score >= 7 ? 3 : score >= 5 ? 2 : 1; P.kids[u.id] = Math.max(st, P.kids[u.id] || 0); addXP(score * 2); box.innerHTML = `<div class="lx-result card"><div class="lx-em lx-pop">${st === 3 ? "🏆" : "🎉"}</div><h2>${score} / ${order.length}</h2><p class="lx-stars big">${"⭐".repeat(st)}</p><button type="button" class="lx-big primary" id="kd-again">🔁 مرة أخرى</button></div>`; $("#kd-again").onclick = play; SAY.say(st === 3 ? "¡Excelente!" : "¡Muy bien!"); return; }
        const w = order[round]; const opts = shuffle([w, ...pick(ws.filter(x => x.es !== w.es), 3)]);
        box.innerHTML = `<p class="lx-kq">${round + 1} / ${order.length} <button type="button" class="lx-big" data-say="${esc(w.es)}">🔊 ${P.tr ? esc(L.translit(w.es)) : "استمع"}</button></p><div class="lx-kgrid">${opts.map(o => `<button type="button" class="lx-kcard" data-k="${esc(o.es)}"><span>${o.em}</span></button>`).join("")}</div>`;
        setTimeout(() => SAY.say(w.es), 250);
        $$("[data-k]", box).forEach(b => b.onclick = () => { const ok = b.dataset.k === w.es; b.classList.add(ok ? "good" : "bad"); if (ok) { score++; SAY.say("¡Sí! " + w.es); } else { $$("[data-k]", box).find(z => z.dataset.k === w.es).classList.add("good"); SAY.say(w.es); } $$("[data-k]", box).forEach(z => z.disabled = true); round++; setTimeout(next, 1400); });
      };
      next();
    };
    $("#kd-learn").onclick = learn; $("#kd-play").onclick = play; learn();
  }

  /* ---------- تحديد المستوى واختبار المستوى ---------- */
  function placementView() { return `${topbar("#aprender", "🧭 تحديد المستوى")}<p class="muted">20 سؤالًا متدرجًا من A1 إلى C1. أجب بما تعرف ولا تخمّن كثيرًا؛ النتيجة تقترح لك من أين تبدأ.</p><div id="pl-run"></div>`; }
  function bindPlacement() {
    const qs = L.PLACEMENT.map(([q, o, a, lv]) => ({ type: "mcq", q, opts: o, ans: a, lv }));
    runEx($("#pl-run"), qs, (ok, total, misses) => {
      const order = ["A1", "A2", "B1", "B2", "C1"]; let level = "A1";
      for (const lv of order) { const n = qs.filter(q => q.lv === lv).length, m = misses.filter(q => q.lv === lv).length; if ((n - m) / n >= 0.6) level = order[Math.min(order.indexOf(lv) + 1, 4)]; else break; }
      if (ok <= 3) level = "A1"; P.level = level; save(); const u = L.UNITS.find(x => x.lv === level);
      $("#pl-run").innerHTML = `<div class="card lx-result"><div class="lx-em">🧭</div><h2>نقترح أن تبدأ من ${level} (${lvName(level)})</h2><p>${ok} من ${total} إجابة صحيحة.</p><a class="btn primary lx-big" href="#aprender/unidad/${u.id}">ابدأ: ${u.ic} ${esc(u.tar)} ←</a> <a class="btn" href="#aprender">المسار</a></div>`;
    });
  }
  function examView(lv) { return `${topbar("#aprender", `🏅 اختبار المستوى ${lv}`)}<p class="muted">20 سؤالًا من كل دروس ${lv} (${lvName(lv)}). النجاح من 70%.</p><div id="ex-run"></div>`; }
  function bindExam(lv) {
    runEx($("#ex-run"), genLevel(lv), (ok, total) => {
      const pct = Math.round(ok / total * 100); if (pct >= 70) { P.exams[lv] = Math.max(pct, P.exams[lv] || 0); addXP(50); } save();
      $("#ex-run").innerHTML = `<div class="card lx-result"><div class="lx-em">${pct >= 70 ? "🏅" : "📘"}</div><h2>${pct >= 70 ? `اجتزت مستوى ${lv}!` : "لم تجتز بعد"}</h2><p>${ok} من ${total} (${pct}%)</p>${pct >= 70 ? "<p class='muted small'>+50 نقطة. شارة المستوى تظهر في المسار.</p>" : "<p class='muted small'>راجع دروس المستوى ثم أعد المحاولة.</p>"}<a class="btn primary" href="#aprender">المسار</a></div>`;
    });
  }

  /* ---------- المعلّم (Gemini) ---------- */
  function tutorView() {
    return `${topbar("#aprender", "🧑‍🏫 اسأل المعلّم")}<p class="muted">اسأل عن أي قاعدة أو كلمة، أو اكتب جملة إسبانية ليصححها لك ويشرح أخطاءك بالعربية. يعمل عبر Gemini بمفتاح الموقع.</p>
      <p class="notice amber" id="tu-off" hidden>المعلّم غير مفعّل بعد: يلزم إضافة GEMINI_API_KEY في إعدادات الخادم.</p>
      <div class="card"><div class="lx-row"><label><input type="radio" name="tu-m" value="explain" checked> اشرح لي</label><label><input type="radio" name="tu-m" value="correct"> صحّح جملتي</label></div>
      <textarea id="tu-q" dir="auto" placeholder="مثال: ما الفرق بين ser وestar؟ — أو: Yo tengo 20 años y estoy de Egipto."></textarea>${ACC}
      <div class="lx-row"><button type="button" class="primary" id="tu-go">أرسل</button></div></div><div id="tu-out"></div>
      <div class="card"><h3>أسئلة مقترحة</h3><div class="lx-row">${["ما الفرق بين ser وestar؟", "متى أستعمل subjuntivo؟", "الفرق بين por وpara", "كيف أنطق حرف r وrr؟", "ما الفرق بين indefinido وimperfecto؟"].map(s => `<button type="button" class="chip" data-sug="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>`;
  }
  async function bindTutor() {
    let on = false; try { on = (await (await fetch("/api/translate/status")).json()).enabled; } catch (e) { }
    $("#tu-off").hidden = on; $("#tu-go").disabled = !on;
    $$("[data-sug]").forEach(b => b.onclick = () => { $("#tu-q").value = b.dataset.sug; $("input[value=explain]").checked = true; });
    $("#tu-go").onclick = async () => {
      const q = $("#tu-q").value.trim(); if (!q) return; const mode = $("input[name=tu-m]:checked").value; const b = $("#tu-go"); b.disabled = true; $("#tu-out").innerHTML = `<p class="muted">المعلّم يكتب…</p>`;
      try { const r = await fetch("/api/tutor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ q, mode, level: P.level || "A1" }) }); const j = await r.json(); if (!r.ok) throw new Error(j.message || r.status);
        $("#tu-out").innerHTML = `<div class="card fade"><div class="lx-tutor">${fmt(j.text)}</div><p class="muted small">إجابة آلية للمساعدة في التعلّم؛ تحقّق من المهم منها.</p></div>`; addXP(3);
      } catch (e) { $("#tu-out").innerHTML = `<p class="notice amber">تعذّر الحصول على إجابة: ${esc(e.message)}</p>`; }
      b.disabled = false;
    };
  }
  const fmt = t => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/^\s*[-*]\s+/gm, "• ").replace(/\n/g, "<br>").replace(/«([^»]{1,140})»/g, (m, s) => `«<span lang="es">${s}</span>» <button type="button" class="lx-ic" data-say="${s}">🔊</button>`);

  /* ---------- التقدم والإعدادات ---------- */
  function progressView() {
    const days = [...Array(14)].map((_, i) => dayAdd(today(), i - 13)); const mx = Math.max(10, ...days.map(d => P.days[d] || 0));
    return `${topbar("#aprender", "📊 تقدّمي")}<div class="card"><div class="lx-kpis"><div><b>${P.xp}</b><span>نقاط</span></div><div><b>${streakNow()}</b><span>أيام متتالية</span></div><div><b>${Object.keys(P.done).length}</b><span>دروس</span></div><div><b>${Object.keys(P.srs).length}</b><span>كلمات</span></div></div>
      <h3>آخر 14 يومًا</h3><div class="lx-chart">${days.map(d => `<div title="${d}: ${P.days[d] || 0}"><i style="height:${Math.round((P.days[d] || 0) / mx * 100)}%"></i><span>${d.slice(8)}</span></div>`).join("")}</div></div>
      <div class="card"><h3>المستويات</h3>${LEVELS.map(([lv, n]) => { const us = L.UNITS.filter(u => u.lv === lv); const d = us.filter(u => P.done[u.id]).length; return `<div class="lx-lvrow"><span>${lv === "DAWAH" ? "🕌" : lv} ${n}</span><div class="lx-prog"><i style="width:${Math.round(d / us.length * 100)}%"></i></div><span>${d}/${us.length}${P.exams[lv] ? " 🏅" : ""}</span></div>`; }).join("")}</div>
      <div class="card"><h3>الإعدادات</h3><div class="form"><div class="field"><label for="pg-goal">الهدف اليومي (نقاط)</label><select id="pg-goal">${[10, 20, 30, 50, 100].map(g => `<option${g === P.goal ? " selected" : ""}>${g}</option>`).join("")}</select></div>
      <div class="field"><label><input type="checkbox" id="pg-tr"${P.tr ? " checked" : ""}> إظهار النطق بالحروف العربية</label><label><input type="checkbox" id="pg-big"${P.big ? " checked" : ""}> خط كبير (لكبار السن والصغار)</label></div></div>
      <div class="field"><label for="pg-voice">صوت المعلّم</label><select id="pg-voice">${R.NV.es.map(v => `<option value="${v[0]}"${v[0] === R.TTS.nv("es") ? " selected" : ""}>${v[1]} (${v[2] === "F" ? "امرأة" : "رجل"})</option>`).join("")}</select></div>
      <p class="small muted">أصوات طبيعية بلهجات إسبانيا والمكسيك وأمريكا اللاتينية. في الحوارات يتكلم الطرف الثاني بصوت من اللهجة نفسها. للمزيد من الإعدادات افتح قسم «النطق».</p>
      <div class="lx-row"><button type="button" id="pg-exp">⬇ تصدير تقدّمي</button><label class="btn">⬆ استيراد<input type="file" id="pg-imp" accept="application/json" hidden></label><button type="button" id="pg-reset">مسح التقدم</button></div></div>`;
  }
  function bindProgress() {
    $("#pg-goal").onchange = e => { P.goal = +e.target.value; save(); };
    $("#pg-tr").onchange = e => { P.tr = e.target.checked; save(); };
    $("#pg-voice").onchange = e => { R.S.nvEs = e.target.value; R.S.engine = "neural"; R.TTS.down = false; R.saveS(); SAY.say("¡Hola! Vamos a aprender español juntos."); };
    $("#pg-big").onchange = e => { P.big = e.target.checked; save(); document.body.classList.toggle("lx-bigtext", P.big); };
    $("#pg-exp").onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(P)], { type: "application/json" })); a.download = `rafiq-espanol-${today()}.json`; a.click(); };
    $("#pg-imp").onchange = async e => { try { const j = JSON.parse(await e.target.files[0].text()); if (typeof j.xp !== "number") throw 0; Object.keys(P).forEach(k => delete P[k]); Object.assign(P, j); save(); toast("استُورد التقدم"); location.hash = "#aprender"; } catch (er) { toast("ملف غير صالح"); } };
    $("#pg-reset").onclick = () => { $("#pg-reset").outerHTML = `<span class="notice amber small">سيُمسح كل تقدمك. <button type="button" id="pg-yes">نعم، امسح</button></span>`; $("#pg-yes").onclick = () => { localStorage.removeItem(KEY); location.reload(); }; };
  }

  /* ---------- مجموعات إضافية: العبارات، المفردات، القسم الإسلامي ---------- */
  ["PHRASES", "DECKS", "ISLAM", "ISLAM_DLG", "KIDS"].forEach(k => { L[k] = L[k] || []; });
  function srsAddList(items, src) { let n = 0; items.forEach(x => { if (!P.srs[x.es]) { P.srs[x.es] = { b: 0, d: today(), ar: x.ar, em: x.em || "", u: src }; n++; } }); save(); toast(n ? `أُضيف ${n} إلى المراجعة الذكية` : "موجودة في المراجعة من قبل"); }
  const lvOrder = ["A1", "A2", "B1", "B2", "C1"];
  const sentRow = e => `<div class="lx-sent"><p class="lx-es" lang="es" dir="ltr">${esc(e.es)} ${sayBtns(e.es, SR ? `<button type="button" class="lx-ic" data-rep="${esc(e.es)}" title="انطقها">🎤</button>` : "")}<button type="button" class="lx-ic" data-copy="${esc(e.es)}" title="نسخ">📋</button></p>${tr(e.es)}<p class="lx-ar">${esc(e.ar)}</p><span class="lx-srz"></span></div>`;
  const wordCard = w => `<div class="lx-word card" data-say="${esc(w.es)}" tabindex="0" role="button">${w.em ? `<span class="lx-em">${w.em}</span>` : ""}<b lang="es" dir="ltr">${esc(w.es)}</b>${tr(w.es)}<span class="lx-ar">${esc(w.ar)}</span><span class="lx-row"><button type="button" class="lx-ic" data-say="${esc(w.es)}" data-slow="1">🐢</button>${SR ? `<button type="button" class="lx-ic" data-rep="${esc(w.es)}">🎤</button>` : ""}</span><span class="lx-srz"></span></div>`;
  function bindCommon(box) {
    box.addEventListener("click", async e => {
      const rp = e.target.closest("[data-rep]"); if (rp) { e.stopPropagation(); const host = rp.closest(".lx-word, .lx-sent"); const s = await checkSpeech(rp.dataset.rep, rp, host.querySelector(".lx-srz")); rp.textContent = "🎤"; if (s >= 0.7) addXP(2); return; }
      const cp = e.target.closest("[data-copy]"); if (cp) { R.copy(cp.dataset.copy); }
    });
  }
  function setView({ back, title, intro, items, kind, lv, words, sents, src }) {
    return `${topbar(back, title)}${intro ? `<p class="muted">${intro}</p>` : ""}
      <div class="lx-row"><button type="button" class="primary" id="st-prac">✍️ تدرّب على هذه المجموعة</button><button type="button" id="st-all">▶ استمع للكل</button>${sents && sents.length ? `<button type="button" id="st-shadow">🎧 استمع وردّد</button>` : ""}<button type="button" id="st-srs">🧠 أضف للمراجعة</button><label class="small"><input type="checkbox" id="st-ar"> أخفِ العربية</label></div>
      <div id="st-run"></div>
      ${words && words.length ? `<div class="lx-words">${words.map(wordCard).join("")}</div>` : ""}
      ${sents && sents.length ? `<div class="card" id="st-sents">${sents.map(sentRow).join("")}</div>` : ""}`;
  }
  function bindSet({ words = [], sents = [], dlg = [], lv, src }) {
    const box = $(".lx"); bindCommon(box);
    $("#st-prac").onclick = () => { runEx($("#st-run"), genSet(words.map(w => `${w.es}|${w.ar}|${w.em || ""}`), sents.map(x => `${x.es}|${x.ar}`), dlg, lv, 12), (ok, total) => { const pct = total ? Math.round(ok / total * 100) : 0; P.sets = P.sets || {}; P.sets[src] = Math.max(pct, P.sets[src] || 0); save(); $("#st-run").innerHTML = `<div class="card lx-result"><div class="lx-em">${pct >= 80 ? "🏆" : "💪"}</div><h2>${ok} من ${total} (${pct}%)</h2><button type="button" class="primary" id="st-again">🔁 تمرين جديد</button></div>`; $("#st-again").onclick = () => $("#st-prac").click(); }); $("#st-run").scrollIntoView({ behavior: "smooth" }); };
    $("#st-all").onclick = () => SAY.list((sents.length ? sents : words).map(x => x.es));
    const sh = $("#st-shadow"); if (sh) sh.onclick = async () => { const rows = $$("#st-sents .lx-sent"); for (let i = 0; i < sents.length; i++) { rows.forEach((r, j) => r.classList.toggle("lx-now", i === j)); rows[i].scrollIntoView({ block: "center", behavior: "smooth" }); await SAY.say(sents[i].es); await new Promise(r => setTimeout(r, 900 + sents[i].es.length * 70)); if (!document.body.contains(sh)) return; } rows.forEach(r => r.classList.remove("lx-now")); };
    $("#st-srs").onclick = () => srsAddList(words.length ? words : sents, src);
    $("#st-ar").onchange = e => $$(".lx .lx-ar").forEach(p => p.hidden = e.target.checked);
  }
  const listGrid = (items, href, sub) => `<div class="lx-units">${items.map(x => `<a class="lx-unit card lift${P.sets && P.sets[x.id] >= 80 ? " done" : ""}" href="${href}${x.id}"><span class="lx-uic">${x.ic || "📘"}</span><span><b>${esc(x.tar)}</b><br><bdi class="small muted" lang="es">${esc(x.t)}</bdi></span><span class="small">${x.lv ? `<span class="lx-lv">${x.lv}</span>` : ""}<br>${sub(x)}</span></a>`).join("")}</div>`;
  function phrasesView(id) {
    const ph = L.PHRASES.find(x => x.id === id);
    if (ph) return setView({ back: "#aprender/frases", title: `${ph.ic} ${esc(ph.tar)}`, intro: `<span class="lx-lv">${ph.lv}</span> <bdi lang="es">${esc(ph.t)}</bdi> · ${ph.s.length} جملة. استمع، كرّر بصوتك، ثم تدرّب.`, sents: ph.s.map(SNT) });
    const n = L.PHRASES.reduce((a, x) => a + x.s.length, 0);
    return `${topbar("#aprender", "🗂️ كتاب العبارات")}<p class="muted">${n} عبارة جاهزة في ${L.PHRASES.length} موضوعًا من A1 إلى C1، بالصوت والنطق والترجمة. كل المواضيع مفتوحة؛ ابدأ بما تحتاجه.</p>${lvOrder.map(lv => { const it = L.PHRASES.filter(x => x.lv === lv); return it.length ? `<h2><span class="lx-lv">${lv}</span> ${lvName(lv)}</h2>${listGrid(it, "#aprender/frases/", x => `${x.s.length} جملة`)}` : ""; }).join("")}`;
  }
  function vocabView(id) {
    const d = L.DECKS.find(x => x.id === id);
    if (d) return setView({ back: "#aprender/vocab", title: `${d.ic} ${esc(d.tar)}`, intro: `<span class="lx-lv">${d.lv}</span> <bdi lang="es">${esc(d.t)}</bdi> · ${d.w.length} كلمة.`, words: d.w.map(W) });
    const n = L.DECKS.reduce((a, x) => a + x.w.length, 0);
    return `${topbar("#aprender", "🧩 بطاقات المفردات")}<p class="muted">${n} كلمة في ${L.DECKS.length} مجموعة موضوعية، الأكثر استعمالًا في الحياة اليومية.</p>${listGrid(L.DECKS, "#aprender/vocab/", x => `${x.w.length} كلمة`)}`;
  }
  function islamView(id) {
    const c = L.ISLAM.find(x => x.id === id);
    if (c) return setView({ back: "#aprender/islam", title: `${c.ic} ${esc(c.tar)}`, intro: `${c.note ? esc(c.note) + " · " : ""}${c.w.length} مصطلحًا و${c.s.length} جملة.`, words: c.w.map(W), sents: c.s.map(SNT) });
    const nw = L.ISLAM.reduce((a, x) => a + x.w.length, 0), ns = L.ISLAM.reduce((a, x) => a + x.s.length, 0);
    return `${topbar("#aprender", "🕌 الإسبانية للعلوم الشرعية والدعوة")}<p class="muted">${nw} مصطلحًا شرعيًّا و${ns} جملة دعوية بالإسبانية، بالمقابلات المعتمدة في ترجمات QuranEnc وIslamHouse، على منهج أهل السنة والجماعة. للتدرب على الكلام مع الباحث عن الإسلام والمسلم الجديد.</p>
      ${listGrid(L.ISLAM, "#aprender/islam/", x => `${x.w.length} + ${x.s.length}`)}
      ${L.ISLAM_DLG.length ? `<h2>حوارات دعوية للتدريب</h2>${listGrid(L.ISLAM_DLG, "#aprender/conv/", x => `${x.d.length} سطرًا`)}` : ""}
      <p class="notice small">💡 لا تترجم الآيات من عندك: انسخ نص الآية من «المكتبة» بترجمتها المعتمدة ومصدرها.</p>`;
  }
  /* القاموس */
  let DICT = null;
  function dict() {
    if (DICT) return DICT; const list = [];
    const add = (arr, src) => arr.forEach(s => { const w = W(s); list.push({ ...w, src }); });
    L.UNITS.forEach(u => add(u.w, u.tar)); L.DECKS.forEach(d => add(d.w, d.tar)); L.ISLAM.forEach(c => add(c.w, c.tar)); L.KIDS.forEach(k => add(k.w, k.tar));
    "el|الـ (مذكر)|;la|الـ (مؤنث)|;los|الـ (جمع مذكر)|;las|الـ (جمع مؤنث)|;un|أداة تنكير (مذكر)|;una|أداة تنكير (مؤنث)|;de|مِن / لِـ|;del|من الـ|;al|إلى الـ|;en|في|;y|و|;o|أو|;que|أنّ / الذي|;a|إلى|;con|مع|;sin|بدون|;por|بسبب / عبر|;para|لِـ / من أجل|;es|يكون / هو|;son|يكونون / هم|;está|يوجد / يكون (حالة)|;están|يوجدون|;muy|جدًا|;no|لا|;sí|نعم|;se|ضمير انعكاسي|;su|ـه / ـها / ـهم|;sus|ـه / ـهم (جمع)|;mi|ـي|;tu|ـك|;lo|ـه (مفعول)|;le|له / لها|;como|مثل / كما|;más|أكثر|;pero|لكن|;también|أيضًا|;hay|يوجد|;ya|بالفعل|;este|هذا|;esta|هذه|;ese|ذلك|;esa|تلك|;muchos|كثيرون|;mucho|كثير|;todo|كل|;todos|الجميع|;cuando|عندما|;donde|حيث|;porque|لأن|;si|إذا|;nos|نا (ضمير)|;me|ـني / لي|;te|ـك / لك|;yo|أنا|;él|هو|;ella|هي|;nosotros|نحن|;ellos|هم".split(";").forEach(s => { const [es, ar] = s.split("|"); list.push({ es, ar, em: "", src: "كلمات وظيفية" }); });
    const map = new Map(); const strip = t => L.norm(t.replace(/\s*\(.*?\)\s*/g, " ")).replace(/^(el|la|los|las|un|una|unos|unas) /, "");
    list.forEach(e => { [L.norm(e.es), strip(e.es)].forEach(k => { if (k && !map.has(k)) map.set(k, e); }); });
    DICT = { list, map, strip }; return DICT;
  }
  function dictView() { return `${topbar("#aprender", "📖 القاموس")}<p class="muted">ابحث بالإسبانية أو بالعربية في كل كلمات الموقع (${dict().list.length} مدخلًا).</p><input type="search" id="dc-q" placeholder="مثال: mezquita أو صلاة" dir="auto" style="width:100%;font-size:1.2rem;padding:12px">${ACC}<div id="dc-res" class="lx-words" style="margin-top:12px"></div>`; }
  function bindDict() {
    const D = dict(); const box = $(".lx"); bindCommon(box);
    const run = () => { const q = $("#dc-q").value.trim(); if (q.length < 2) { $("#dc-res").innerHTML = ""; return; } const nq = L.norm(q); const seen = new Set(); const res = D.list.filter(e => (L.norm(e.es).includes(nq) || e.ar.includes(q)) && !seen.has(e.es) && seen.add(e.es)).slice(0, 60); $("#dc-res").innerHTML = res.length ? res.map(w => wordCard(w).replace('<span class="lx-srz"></span>', `<span class="small muted">${esc(w.src)}</span><span class="lx-srz"></span>`)).join("") : `<p class="muted">لا نتائج. <a href="https://translate.google.com/?sl=auto&tl=es&text=${encodeURIComponent(q)}" target="_blank" rel="noopener">جرّب Google</a></p>`; };
    let t; $("#dc-q").oninput = () => { clearTimeout(t); t = setTimeout(run, 200); }; $("#dc-q").focus();
  }
  /* التحدي اليومي والأخطاء */
  function challengeView() { const done = P.reto && P.reto[today()]; return `${topbar("#aprender", "⚡ تحدي اليوم")}<p class="muted">10 أسئلة متنوعة من كل أقسام الدورة. ${done ? `أنجزت تحدي اليوم (${done}%)؛ يمكنك اللعب مجددًا للتدريب.` : "أنجزه لتحصل على 30 نقطة إضافية."}</p><div id="ch-run"></div>`; }
  function bindChallenge() {
    const pools = [...L.UNITS.map(u => () => genUnit(u)), ...L.PHRASES.map(p => () => genSet([], p.s, [], p.lv)), ...L.DECKS.map(d => () => genSet(d.w, [], [], d.lv)), ...L.ISLAM.map(c => () => genSet(c.w, c.s, [], "B1"))];
    const list = []; while (list.length < 10) { const g = pick(pools, 1)[0]().filter(x => !["speak", "match"].includes(x.type)); if (g.length) list.push(g[0]); }
    runEx($("#ch-run"), list, (ok, total) => { const pct = Math.round(ok / total * 100); P.reto = P.reto || {}; const first = !P.reto[today()]; P.reto[today()] = Math.max(pct, P.reto[today()] || 0); if (first) addXP(30); save(); $("#ch-run").innerHTML = `<div class="card lx-result"><div class="lx-em">⚡</div><h2>${ok} من ${total}</h2>${first ? "<p>+30 نقطة لتحدي اليوم</p>" : ""}<a class="btn primary" href="#aprender">المسار</a></div>`; });
  }
  function mistakesView() { const m = P.miss || []; return `${topbar("#aprender", "🎯 أخطائي")}<p class="muted">كل ما أخطأت فيه يُحفظ هنا تلقائيًا، ويُحذف عندما تجيبه صحيحًا. مراجعة الأخطاء من أسرع طرق التحسن.</p>${m.length ? `<div class="lx-row"><button type="button" class="primary lx-big" id="ms-go">تدرّب على أخطائي (${Math.min(m.length, 15)})</button></div><div id="ms-run"></div><div class="card">${m.slice(0, 60).map(x => sentRow(x)).join("")}</div>` : `<p class="notice">لا أخطاء محفوظة بعد. 👏</p>`}`; }
  function bindMistakes() {
    const b = $("#ms-go"); bindCommon($(".lx")); if (!b) return;
    b.onclick = () => { const list = pick(P.miss, 15).map(x => toks(x.es).length > 2 && x.ar ? (Math.random() < 0.5 ? { type: "order", es: x.es, ar: x.ar, fromMiss: 1 } : { type: "type", es: x.es, ar: x.ar, fromMiss: 1 }) : { type: "card", es: x.es, ar: x.ar, em: x.em, fromMiss: 1 }); runEx($("#ms-run"), list, (ok, total) => { $("#ms-run").innerHTML = `<div class="card lx-result"><h2>${ok} من ${total}</h2><a class="btn primary" href="#aprender/errores">تحديث</a></div>`; }); };
  }
  /* ---------- التوجيه ---------- */
  L.mount = function (view, arg) {
    document.body.classList.toggle("lx-bigtext", !!P.big);
    const [sub, id] = (arg || "").split("/"); let html, bind = () => { };
    if (sub === "unidad" && unitById(id)) { const u = unitById(id); html = lessonView(u); bind = () => bindLesson(u); }
    else if (sub === "repaso") { html = review(); bind = bindReview; }
    else if (sub === "conv" && id && convById(id)) { const c = convById(id); html = convView(c); bind = () => bindConv(c); }
    else if (sub === "conv") html = convList();
    else if (sub === "verbos") { html = verbsView(); bind = bindVerbs; }
    else if (sub === "habilidades") { html = skillsView(); bind = bindSkills; }
    else if (sub === "leer" && id && L.READ.find(r => r.id === id)) { const r = L.READ.find(x => x.id === id); html = readView(r); bind = () => bindRead(r); }
    else if (sub === "leer") html = readList();
    else if (sub === "abc") html = abcView();
    else if (sub === "ninos") { const k = id && L.KIDS.find(x => x.id === id) ? id : ""; html = kidsView(k); bind = () => bindKids(k); }
    else if (sub === "nivel") { html = placementView(); bind = bindPlacement; }
    else if (sub === "examen" && ["A1", "A2", "B1", "B2", "C1"].includes(id)) { html = examView(id); bind = () => bindExam(id); }
    else if (sub === "tutor") { html = tutorView(); bind = bindTutor; }
    else if (sub === "progreso") { html = progressView(); bind = bindProgress; }
    else if (sub === "frases") { const ph = L.PHRASES.find(x => x.id === id); html = phrasesView(id); bind = ph ? () => bindSet({ sents: ph.s.map(SNT), lv: ph.lv, src: ph.id }) : () => { }; }
    else if (sub === "vocab") { const d = L.DECKS.find(x => x.id === id); html = vocabView(id); bind = d ? () => bindSet({ words: d.w.map(W), lv: d.lv, src: d.id }) : () => { }; }
    else if (sub === "islam") { const c = L.ISLAM.find(x => x.id === id); html = islamView(id); bind = c ? () => bindSet({ words: c.w.map(W), sents: c.s.map(SNT), lv: "B1", src: c.id }) : () => { }; }
    else if (sub === "diccionario") { html = dictView(); bind = bindDict; }
    else if (sub === "reto") { html = challengeView(); bind = bindChallenge; }
    else if (sub === "errores") { html = mistakesView(); bind = bindMistakes; }
    else { html = home(); bind = () => { const v = $("#lx-voice"); if (v) v.onchange = e => { R.S.nvEs = e.target.value; R.S.engine = "neural"; R.TTS.down = false; R.saveS(); SAY.say("¡Hola! Vamos a aprender español juntos."); }; }; }
    view.innerHTML = `<div class="lx">${html}</div>`; bind();
  };
  document.addEventListener("click", e => {
    if (e.target.closest("[data-rep],[data-reveal]")) return;
    const s = e.target.closest("[data-say]"); if (s && s.closest(".lx")) { SAY.say(s.dataset.say, !!s.dataset.slow); return; }
    const ins = e.target.closest("[data-ins]"); if (ins) { const inp = ins.closest(".lx-ex, .card, #vb-quiz")?.querySelector("input[type=text], textarea") || document.activeElement; if (inp && "value" in inp) { const p = inp.selectionStart ?? inp.value.length; inp.value = inp.value.slice(0, p) + ins.dataset.ins + inp.value.slice(inp.selectionEnd ?? p); inp.focus(); inp.setSelectionRange(p + 1, p + 1); } }
  }, true);
  document.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.closest?.(".lx-word")) SAY.say(e.target.dataset.say); });
})();
