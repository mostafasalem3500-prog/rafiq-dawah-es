/* تعلّم الإسبانية — الألعاب التعليمية، بنك الأسئلة المتدرّج، والتحضير للاختبارات الدولية (DELE وSIELE). */
(function () {
  const L = window.LEARN, R = window.RAFIQ, U = L._; if (!U) return;
  const { esc, toast } = R; const { P, save, addXP, runEx, topbar, SAY, W, shuffle, pick, LEVELS, lvName, ACC } = U;
  const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LVS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  P.games = P.games || {}; P.qb = P.qb || {}; P.dele = P.dele || {};
  L.EXT = L.EXT || {};

  /* ---------- مخزن الكلمات للألعاب ---------- */
  const strip = s => s.replace(/^(el|la|los|las|un|una|unos|unas)\s+/i, "");
  function pool(lv) {
    const decks = (L.DECKS || []).filter(d => !lv || d.lv === lv).flatMap(d => d.w);
    const units = L.UNITS.filter(u => (!lv || u.lv === lv) && u.lv !== "DAWAH").flatMap(u => u.w);
    const seen = new Set(); return [...decks, ...units].map(W).filter(w => w.es && w.ar && !seen.has(w.es) && seen.add(w.es));
  }
  const single = ws => ws.map(w => ({ ...w, k: strip(w.es) })).filter(w => /^[a-záéíóúüñ]{4,11}$/i.test(w.k));
  const norm = c => c.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const normW = s => s.toLowerCase().replace(/ñ/g, "\u0001").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\u0001/g, "ñ");
  const lvSel = (id, val, all = true) => `<select id="${id}">${all ? `<option value="">كل المستويات</option>` : ""}${LVS.map(l => `<option value="${l}"${l === val ? " selected" : ""}>${l} · ${lvName(l)}</option>`).join("")}</select>`;
  const best = (g, v) => { if (v != null && v > (P.games[g] || 0)) { P.games[g] = v; save(); return true; } return false; };
  const timerBar = () => `<div class="gm-timer" aria-hidden="true"><i></i></div>`;
  function countdown(sec, onTick, onEnd) {
    const t0 = Date.now(); const bar = $(".gm-timer i"); let stop = false;
    const f = () => { if (stop) return; const left = Math.max(0, sec - (Date.now() - t0) / 1000); if (bar) bar.style.width = (left / sec * 100) + "%"; onTick && onTick(Math.ceil(left)); if (left <= 0) { stop = true; onEnd(); } else requestAnimationFrame(f); };
    requestAnimationFrame(f); return () => { stop = true; };
  }
  const confetti = box => { if (RM() || !box) return; const c = document.createElement("div"); c.className = "gm-confetti"; c.innerHTML = Array.from({ length: 18 }, (_, i) => `<i style="--x:${(Math.random() * 2 - 1) * 160}px;--r:${Math.random() * 720}deg;--d:${i * 25}ms"></i>`).join(""); box.appendChild(c); setTimeout(() => c.remove(), 1600); };
  const resultCard = (ic, title, line, again, extra = "") => `<div class="card lx-result gm-res"><div class="lx-em lx-pop">${ic}</div><h2>${title}</h2><p>${line}</p>${extra}<div class="lx-row" style="justify-content:center"><button type="button" class="primary lx-big" id="${again}">🔁 العب مجددًا</button><a class="btn" href="#aprender/juegos">كل الألعاب</a></div></div>`;

  /* ---------- الألعاب ---------- */
  const GAMES = [
    ["memoria", "🃏", "لعبة الذاكرة", "اقلب البطاقات وطابق الكلمة الإسبانية بمعناها العربي بأقل عدد من المحاولات."],
    ["rapido", "⏱️", "سباق الدقيقة", "60 ثانية: اختر الترجمة الصحيحة لأكبر عدد من الكلمات."],
    ["vf", "✅", "صح أم خطأ", "45 ثانية: هل الترجمة المعروضة صحيحة؟ قرّر بسرعة."],
    ["globos", "🎈", "أنقذ البالونات", "خمّن حروف الكلمة قبل أن تطير البالونات الست (بديل لعبة المشنقة)."],
    ["letras", "🔀", "رتّب الحروف", "حروف الكلمة مبعثرة؛ رتّبها لتكوّن الكلمة الصحيحة."],
    ["escucha", "🎧", "اسمع واكتب", "تسمع الكلمة بالإسبانية فتكتبها بإملائها الصحيح."],
    ["frase", "🧱", "ابنِ الجملة", "رتّب كلمات جملة يومية حقيقية بالترتيب الصحيح."]
  ];
  function hub() {
    return `${topbar("#aprender", "🎮 الألعاب التعليمية")}<p class="muted">ألعاب قصيرة مبنية على مفردات الدورة وجملها. اختر المستوى ثم اللعبة؛ تُحفظ أفضل نتيجة لك في جهازك. اللعب اليومي 10 دقائق يثبّت الكلمات أسرع من الحفظ المجرّد.</p>
      <div class="card"><label>المستوى: ${lvSel("gm-lv", P.gameLv || "")}</label></div>
      <div class="gm-grid">${GAMES.map(([id, ic, t, d], i) => `<a class="card lift gm-card" href="#aprender/juegos/${id}" style="--i:${i}"><span class="gm-ic">${ic}</span><b>${t}</b><span class="muted small">${d}</span>${P.games[id] ? `<span class="tag gold">أفضل نتيجة: ${P.games[id]}</span>` : ""}</a>`).join("")}</div>`;
  }
  function gameView(id) {
    const g = GAMES.find(x => x[0] === id); if (!g) return { html: hub(), bind: bindHub };
    return { html: `${topbar("#aprender/juegos", `${g[1]} ${g[2]}`)}<p class="muted">${g[3]}</p><div class="lx-row"><label class="small">المستوى: ${lvSel("gm-lv", P.gameLv || "")}</label></div><div id="gm-box" class="gm-box"></div>`, bind: () => { const lv = $("#gm-lv"); lv.onchange = () => { P.gameLv = lv.value; save(); RUN[id](); }; RUN[id](); } };
  }
  function bindHub() { const s = $("#gm-lv"); if (s) s.onchange = () => { P.gameLv = s.value; save(); }; }
  const box = () => $("#gm-box");
  const words = (n, filt) => { let ws = pool(P.gameLv || ""); if (filt) ws = filt(ws); if (ws.length < n) ws = filt ? filt(pool("")) : pool(""); return pick(ws, n); };

  const RUN = {
    memoria() {
      const ws = words(6); const cards = shuffle(ws.flatMap((w, i) => [{ i, t: w.es, es: 1 }, { i, t: w.ar }])); let open = [], moves = 0, found = 0; const t0 = Date.now();
      box().innerHTML = `<div class="lx-row between"><span>المحاولات: <b id="mm-m">0</b></span><span>الأزواج: <b id="mm-f">0</b>/6</span></div><div class="gm-mem">${cards.map((c, k) => `<button type="button" class="gm-tile" data-k="${k}" aria-label="بطاقة ${k + 1}"><span class="gm-back">؟</span><span class="gm-face" ${c.es ? 'lang="es" dir="ltr"' : ""}>${esc(c.t)}</span></button>`).join("")}</div>`;
      $$(".gm-tile", box()).forEach(b => b.onclick = () => {
        const k = +b.dataset.k, c = cards[k]; if (b.classList.contains("up") || open.length === 2) return;
        b.classList.add("up"); open.push([b, c]); if (c.es) SAY.say(c.t);
        if (open.length === 2) {
          moves++; $("#mm-m").textContent = moves; const [[b1, c1], [b2, c2]] = open;
          if (c1.i === c2.i && c1.es !== c2.es) { setTimeout(() => { b1.classList.add("ok"); b2.classList.add("ok"); open = []; if (++found === 6) { const sec = Math.round((Date.now() - t0) / 1000), sc = Math.max(10, 100 - (moves - 6) * 6); addXP(Math.round(sc / 5)); const nb = best("memoria", sc); box().innerHTML = resultCard("🏆", "أنهيت اللعبة!", `${moves} محاولة في ${sec} ثانية · النتيجة ${sc}${nb ? " · رقم قياسي جديد ✨" : ""}`, "gm-again"); confetti(box()); $("#gm-again").onclick = RUN.memoria; } $("#mm-f").textContent = found; }, 350); }
          else setTimeout(() => { b1.classList.remove("up"); b2.classList.remove("up"); open = []; }, 900);
        }
      });
    },
    rapido() {
      let score = 0, n = 0; const ws = words(80); let stop;
      const q = () => {
        if (!$("#rp-q")) return; const w = ws[n % ws.length]; n++; const opts = shuffle([w, ...pick(ws.filter(x => x.es !== w.es), 3)]);
        $("#rp-q").innerHTML = `<p class="gm-big">${esc(w.ar)} ${w.em || ""}</p><div class="lx-opts">${opts.map(o => `<button type="button" class="lx-opt" lang="es" dir="ltr" data-v="${esc(o.es)}">${esc(o.es)}</button>`).join("")}</div>`;
        $$("#rp-q .lx-opt").forEach(b => b.onclick = () => { const ok = b.dataset.v === w.es; b.classList.add(ok ? "good" : "bad"); if (ok) score++; $("#rp-s").textContent = score; setTimeout(q, ok ? 180 : 650); if (!ok) $$("#rp-q .lx-opt").find(z => z.dataset.v === w.es)?.classList.add("good"); });
      };
      box().innerHTML = `<div class="card gm-start"><p>عندك 60 ثانية. جاهز؟</p><button type="button" class="primary lx-big" id="rp-go">ابدأ ⏱️</button></div>`;
      $("#rp-go").onclick = () => {
        box().innerHTML = `${timerBar()}<div class="lx-row between"><span>⏱️ <b id="rp-t">60</b> ث</span><span>النقاط: <b id="rp-s">0</b></span></div><div id="rp-q" class="lx-ex card"></div>`; q();
        stop = countdown(60, s => { const t = $("#rp-t"); if (t) t.textContent = s; }, () => { addXP(score); const nb = best("rapido", score); box().innerHTML = resultCard(score >= 25 ? "🏆" : "⏱️", `${score} إجابة صحيحة`, `في دقيقة واحدة${nb ? " · رقم قياسي جديد ✨" : ""}${P.games.rapido ? ` · أفضل نتيجة: ${P.games.rapido}` : ""}`, "gm-again"); if (nb) confetti(box()); $("#gm-again").onclick = RUN.rapido; });
      };
      window.addEventListener("hashchange", () => stop && stop(), { once: true });
    },
    vf() {
      let score = 0, miss = 0; const ws = words(80); let stop, cur;
      const q = () => { const w = pick(ws, 1)[0]; const truth = Math.random() < 0.5; const shown = truth ? w : pick(ws.filter(x => x.ar !== w.ar), 1)[0]; cur = truth; $("#vf-q").innerHTML = `<p class="gm-big" lang="es" dir="ltr">${esc(w.es)}</p><p class="gm-eq">=</p><p class="gm-big">${esc(shown.ar)}</p>`; };
      const ans = v => { const ok = v === cur; if (ok) score++; else miss++; $("#vf-s").textContent = score; const c = $("#vf-q"); c.classList.remove("gm-ok", "gm-no"); void c.offsetWidth; c.classList.add(ok ? "gm-ok" : "gm-no"); q(); };
      box().innerHTML = `<div class="card gm-start"><p>45 ثانية. اضغط ✅ إن كانت الترجمة صحيحة و❌ إن كانت خطأ (أو استعمل السهمين ← →).</p><button type="button" class="primary lx-big" id="vf-go">ابدأ</button></div>`;
      $("#vf-go").onclick = () => {
        box().innerHTML = `${timerBar()}<div class="lx-row between"><span>⏱️ <b id="vf-t">45</b> ث</span><span>النقاط: <b id="vf-s">0</b></span></div><div id="vf-q" class="card gm-vf"></div><div class="lx-row" style="justify-content:center"><button type="button" class="lx-good lx-big" id="vf-y">✅ صحيح</button><button type="button" class="lx-bad lx-big" id="vf-n">❌ خطأ</button></div>`;
        q(); $("#vf-y").onclick = () => ans(true); $("#vf-n").onclick = () => ans(false);
        const key = e => { if (e.key === "ArrowRight") ans(true); if (e.key === "ArrowLeft") ans(false); }; document.addEventListener("keydown", key);
        stop = countdown(45, s => { const t = $("#vf-t"); if (t) t.textContent = s; }, () => { document.removeEventListener("keydown", key); addXP(score); const nb = best("vf", score); box().innerHTML = resultCard("✅", `${score} صحيحة · ${miss} خطأ`, nb ? "رقم قياسي جديد ✨" : `أفضل نتيجة: ${P.games.vf || score}`, "gm-again"); if (nb) confetti(box()); $("#gm-again").onclick = RUN.vf; });
        window.addEventListener("hashchange", () => { stop && stop(); document.removeEventListener("keydown", key); }, { once: true });
      };
    },
    globos() {
      const w = words(1, single)[0]; const word = w.k.toLowerCase(); const got = new Set(); let lives = 6; const tried = new Set();
      const letters = "abcdefghijklmnñopqrstuvwxyz".split("");
      const draw = () => {
        const shown = [...word].map(c => got.has(normW(c)) ? c : "_");
        const win = !shown.includes("_"), lose = lives <= 0;
        box().innerHTML = `<div class="gm-balloons" aria-label="${lives} بالونات متبقية">${Array.from({ length: 6 }, (_, i) => `<span class="gm-bl${i >= lives ? " pop" : ""}" style="--h:${i * 55}">🎈</span>`).join("")}</div>
          <p class="muted">التلميح: <b>${esc(w.ar)}</b> ${w.em || ""} · ${word.length} حروف</p><p class="gm-word" lang="es" dir="ltr">${shown.map(c => `<span>${c === "_" ? "&nbsp;" : esc(c)}</span>`).join("")}</p>
          ${win || lose ? "" : `<div class="gm-keys" dir="ltr">${letters.map(c => `<button type="button" data-l="${c}"${tried.has(c) ? " disabled" : ""}>${c}</button>`).join("")}</div>`}<div id="gb-end"></div>`;
        $$("[data-l]", box()).forEach(b => b.onclick = () => { const c = b.dataset.l; tried.add(c); if ([...word].some(x => normW(x) === c)) got.add(c); else lives--; draw(); });
        if (win || lose) { SAY.say(w.es); if (win) { addXP(10 + lives * 2); P.games.globos = (P.games.globos || 0) + 1; save(); confetti(box()); } $("#gb-end").innerHTML = resultCard(win ? "🎉" : "💨", win ? "أنقذت البالونات!" : "طارت البالونات", `الكلمة: <b lang="es" dir="ltr">${esc(w.es)}</b> = ${esc(w.ar)}${win ? ` · كلمات منقذة: ${P.games.globos}` : ""}`, "gm-again"); $("#gm-again").onclick = RUN.globos; }
      };
      draw();
    },
    letras() {
      const list = words(8, single); let i = 0, score = 0;
      const round = () => {
        if (i >= list.length) { addXP(score * 3); const nb = best("letras", score); box().innerHTML = resultCard("🔀", `${score} من ${list.length}`, nb ? "رقم قياسي جديد ✨" : "", "gm-again"); if (score >= 6) confetti(box()); $("#gm-again").onclick = RUN.letras; return; }
        const w = list[i], k = w.k.toLowerCase(); let mix = shuffle([...k]); if (mix.join("") === k) mix = mix.reverse(); const ans = [];
        box().innerHTML = `<p class="muted">${i + 1} / ${list.length} · المعنى: <b>${esc(w.ar)}</b> ${w.em || ""}</p><p class="gm-word" lang="es" dir="ltr" id="lt-a"></p><div class="gm-keys" dir="ltr" id="lt-k">${mix.map((c, j) => `<button type="button" data-j="${j}">${esc(c)}</button>`).join("")}</div><div class="lx-row"><button type="button" id="lt-undo">⌫ تراجع</button><button type="button" id="lt-skip">تخطَّ</button></div><div id="lt-fb"></div>`;
        const upd = () => { $("#lt-a").innerHTML = [...k].map((_, j) => `<span>${ans[j] != null ? esc(mix[ans[j]]) : "&nbsp;"}</span>`).join(""); $$("#lt-k button").forEach(b => b.disabled = ans.includes(+b.dataset.j)); if (ans.length === k.length) { const ok = ans.map(j => mix[j]).join("") === k; if (ok) score++; SAY.say(w.es); $("#lt-fb").innerHTML = `<div class="lx-fb ${ok ? "ok" : "no"}"><b>${ok ? "صحيح! 🎉" : "الكلمة الصحيحة:"}</b> <span lang="es" dir="ltr">${esc(w.k)}</span> <button type="button" class="primary" id="lt-n">متابعة ←</button></div>`; $("#lt-n").onclick = () => { i++; round(); }; $("#lt-n").focus(); } };
        $$("#lt-k button").forEach(b => b.onclick = () => { if (ans.length < k.length) { ans.push(+b.dataset.j); upd(); } });
        $("#lt-undo").onclick = () => { ans.pop(); upd(); }; $("#lt-skip").onclick = () => { i++; round(); }; upd();
      };
      round();
    },
    escucha() {
      const list = words(8, single); let i = 0, score = 0;
      const round = () => {
        if (i >= list.length) { addXP(score * 3); const nb = best("escucha", score); box().innerHTML = resultCard("🎧", `${score} من ${list.length}`, nb ? "رقم قياسي جديد ✨" : "", "gm-again"); $("#gm-again").onclick = RUN.escucha; return; }
        const w = list[i];
        box().innerHTML = `<div class="lx-ex card"><p class="muted">${i + 1} / ${list.length}</p><div class="lx-row"><button type="button" class="lx-big primary" id="es-p">🔊 استمع</button><button type="button" class="lx-ic" id="es-s" title="ببطء">🐢</button></div><input type="text" id="es-in" dir="ltr" lang="es" autocomplete="off" spellcheck="false" placeholder="اكتب ما تسمعه…">${ACC}<div class="lx-row"><button type="button" class="primary" id="es-c">تحقّق</button><button type="button" id="es-h">💡 تلميح</button></div><div id="es-fb"></div></div>`;
        const play = s => SAY.say(w.k, s); $("#es-p").onclick = () => play(); $("#es-s").onclick = () => play(true); setTimeout(play, 300);
        $("#es-h").onclick = () => { $("#es-in").placeholder = `${w.ar} · يبدأ بـ ${w.k[0]}`; };
        const chk = () => { const v = $("#es-in").value.trim().toLowerCase(); if (!v) return; const ok = v === w.k.toLowerCase(), near = !ok && norm(v) === norm(w.k); if (ok) score++; $("#es-fb").innerHTML = `<div class="lx-fb ${ok ? "ok" : "no"}"><b>${ok ? "ممتاز!" : near ? "قريب جدًا — انتبه للعلامات:" : "الصحيح:"}</b> <span lang="es" dir="ltr">${esc(w.k)}</span> = ${esc(w.ar)} <button type="button" class="primary" id="es-n">متابعة ←</button></div>`; $("#es-n").onclick = () => { i++; round(); }; $("#es-n").focus(); };
        $("#es-c").onclick = chk; $("#es-in").onkeydown = e => { if (e.key === "Enter") chk(); }; $("#es-in").focus();
      };
      round();
    },
    frase() {
      const lv = P.gameLv || ""; const src = (L.PHRASES || []).filter(p => !lv || p.lv === lv).flatMap(p => p.s).map(U.SNT).filter(x => { const n = x.es.split(/\s+/).length; return n >= 4 && n <= 9; });
      const list = pick(src.length >= 8 ? src : (L.PHRASES || []).flatMap(p => p.s).map(U.SNT).filter(x => x.es.split(/\s+/).length >= 4 && x.es.split(/\s+/).length <= 9), 8).map(x => ({ type: "order", es: x.es, ar: x.ar }));
      if (!list.length) { box().innerHTML = `<p class="notice amber">لا توجد جمل كافية لهذا المستوى.</p>`; return; }
      box().innerHTML = `<div id="fr-run"></div>`;
      runEx($("#fr-run"), list, (ok, total) => { const nb = best("frase", ok); box().innerHTML = resultCard("🧱", `${ok} من ${total}`, nb ? "رقم قياسي جديد ✨" : "", "gm-again"); if (ok >= 6) confetti(box()); $("#gm-again").onclick = RUN.frase; });
    }
  };
  L.EXT.juegos = id => id ? gameView(id) : { html: hub(), bind: bindHub };

  /* ---------- بنك الأسئلة ---------- */
  const SK = { gram: ["📐", "القواعد"], voc: ["🔤", "المفردات"], uso: ["💬", "الاستعمال والتعابير"], lec: ["📖", "فهم المقروء"] };
  function bankHome() {
    const Q = L.QBANK || []; if (!Q.length) return `${topbar("#aprender", "🏦 بنك الأسئلة")}<p class="notice amber">لم يُحمَّل بنك الأسئلة بعد؛ أعد تحميل الصفحة.</p>`;
    const by = LVS.map(lv => [lv, Q.filter(q => q.lv === lv).length]); const mx = Math.max(...by.map(x => x[1]));
    return `${topbar("#aprender", "🏦 بنك الأسئلة")}<p class="muted">${Q.length} سؤال اختيار من متعدد مصنّفة حسب مستويات الإطار الأوروبي (<bdi dir="ltr">A1–C2</bdi>) والمهارة، ولكل سؤال شرح عربي قصير. تدرّب بتصحيح فوري، أو ادخل «وضع الاختبار» بمؤقت ونتيجة في النهاية كأنك في قاعة الامتحان.</p>
      <div class="card"><h3>توزيع الأسئلة ودقتك</h3><div class="qb-chart">${by.map(([lv, n], i) => { const st = P.qb[lv] || { s: 0, ok: 0 }; const acc = st.s ? Math.round(st.ok / st.s * 100) : 0; return `<div class="qb-col" style="--i:${i}"><span class="qb-n">${n}</span><div class="qb-bar" style="--h:${Math.round(n / mx * 100)}%"><i style="--a:${acc}%"></i></div><b>${lv}</b><span class="muted small">${st.s ? acc + "%" : "—"}</span></div>`; }).join("")}</div><p class="muted small">العمود: عدد الأسئلة في المستوى · الجزء الذهبي: نسبة إجاباتك الصحيحة فيه.</p></div>
      <div class="card"><div class="form">
        <div class="field"><label for="qb-lv">المستوى</label>${lvSel("qb-lv", P.level && LVS.includes(P.level) ? P.level : "A1", true)}</div>
        <div class="field"><label for="qb-sk">المهارة</label><select id="qb-sk"><option value="">كل المهارات</option>${Object.entries(SK).map(([k, [ic, n]]) => `<option value="${k}">${ic} ${n}</option>`).join("")}</select></div>
        <div class="field"><label for="qb-n">عدد الأسئلة</label><select id="qb-n"><option>10</option><option selected>20</option><option>40</option></select></div>
        <div class="field"><label for="qb-md">الوضع</label><select id="qb-md"><option value="p">تدريب بتصحيح فوري</option><option value="x">وضع الاختبار بمؤقت</option></select></div>
      </div><div class="lx-row"><button type="button" class="primary lx-big" id="qb-go">ابدأ</button><span class="muted small" id="qb-av"></span></div></div><div id="qb-run"></div>`;
  }
  function bindBank() {
    const Q = L.QBANK || []; if (!Q.length) return;
    const sel = () => Q.filter(q => (!$("#qb-lv").value || q.lv === $("#qb-lv").value) && (!$("#qb-sk").value || q.sk === $("#qb-sk").value));
    const av = () => { $("#qb-av").textContent = `${sel().length} سؤالًا متاحًا بهذا الاختيار`; }; ["#qb-lv", "#qb-sk"].forEach(s => $(s).onchange = av); av();
    $("#qb-go").onclick = () => {
      const list = pick(sel(), +$("#qb-n").value); if (!list.length) return toast("لا توجد أسئلة بهذا الاختيار");
      const rec = (q, ok) => { const s = P.qb[q.lv] = P.qb[q.lv] || { s: 0, ok: 0 }; s.s++; if (ok) s.ok++; };
      $("#qb-run").scrollIntoView({ behavior: RM() ? "auto" : "smooth" });
      if ($("#qb-md").value === "p") {
        const items = list.map(q => ({ type: "mcq", prompt: `${SK[q.sk] ? SK[q.sk][0] + " " + SK[q.sk][1] : ""} · ${q.lv}`, es: q.q, opts: q.o, ans: q.a, ex: q.ex, ltr: true, quiet: true, _q: q }));
        runEx($("#qb-run"), items, (ok, total, misses) => { const ms = new Set(misses.map(m => m._q)); list.forEach(q => rec(q, !ms.has(q))); save(); const pct = Math.round(ok / total * 100); $("#qb-run").innerHTML = `<div class="card lx-result"><div class="lx-em">${pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📘"}</div><h2>${ok} من ${total} (${pct}%)</h2><p class="muted">${pct >= 80 ? "مستوى ممتاز؛ جرّب المستوى التالي." : pct >= 60 ? "جيد؛ راجع الأسئلة التي أخطأت فيها." : "راجع دروس هذا المستوى ثم أعد المحاولة."}</p><button type="button" class="primary" id="qb-again">مجموعة جديدة</button></div>`; $("#qb-again").onclick = () => $("#qb-go").click(); });
      } else examRun($("#qb-run"), list.map(q => ({ q: q.q, o: q.o, a: q.a, ex: q.ex, tag: q.lv })), Math.max(3, Math.round(list.length * 0.75)), (res) => { list.forEach((q, i) => rec(q, res[i])); save(); });
    };
  }
  /* محاكي اختبار عام: أسئلة بلا تصحيح فوري + مؤقت + مراجعة نهائية */
  function examRun(el, qs, minutes, onEnd, text) {
    const ans = Array(qs.length).fill(-1); let stop;
    el.innerHTML = `<div class="card ex-sim">${timerBar()}<div class="lx-row between"><b>⏱️ <span id="xs-t">${minutes}:00</span></b><span class="muted small">أجب ثم اضغط «سلّم الإجابات». لا يظهر التصحيح قبل التسليم.</span></div>
      ${text ? `<div class="ex-text" lang="es" dir="ltr">${esc(text).replace(/\n+/g, "<br><br>")}</div>` : ""}
      <ol class="ex-qs">${qs.map((q, i) => `<li><p lang="es" dir="ltr" class="ex-q">${esc(q.q).replace(/\n/g, "<br>")}</p><div class="ex-os">${q.o.map((o, k) => `<label lang="es" dir="ltr"><input type="radio" name="xq${i}" value="${k}"> ${esc(o)}</label>`).join("")}</div></li>`).join("")}</ol>
      <div class="lx-row"><button type="button" class="primary lx-big" id="xs-go">سلّم الإجابات</button><span class="muted small" id="xs-c">0 / ${qs.length}</span></div></div>`;
    $$("input[type=radio]", el).forEach(r => r.onchange = () => { ans[+r.name.slice(2)] = +r.value; $("#xs-c").textContent = `${ans.filter(a => a >= 0).length} / ${qs.length}`; });
    const end = () => {
      stop && stop(); const res = qs.map((q, i) => ans[i] === q.a); const ok = res.filter(Boolean).length, pct = Math.round(ok / qs.length * 100); addXP(ok * 2); onEnd && onEnd(res, pct);
      el.innerHTML = `<div class="card lx-result"><div class="lx-em">${pct >= 60 ? "🏅" : "📘"}</div><h2>${ok} من ${qs.length} (${pct}%)</h2><p class="muted">${pct >= 60 ? "تجاوزت 60%، وهي نسبة النجاح في كثير من أجزاء DELE." : "النجاح يحتاج غالبًا 60% في كل مجموعة؛ راجع الشرح أدناه."}</p></div>
        <div class="card"><h3>مراجعة الإجابات</h3><ol class="ex-rev">${qs.map((q, i) => `<li class="${res[i] ? "ok" : "no"}"><p lang="es" dir="ltr">${esc(q.q).replace(/\n/g, "<br>")}</p><p>${res[i] ? "✅" : "❌"} <span lang="es" dir="ltr">${ans[i] >= 0 ? esc(q.o[ans[i]]) : "—"}</span>${res[i] ? "" : ` · الصحيح: <b lang="es" dir="ltr">${esc(q.o[q.a])}</b>`}</p>${q.ex ? `<p class="small muted">💡 ${esc(q.ex)}</p>` : ""}</li>`).join("")}</ol></div>`;
      el.scrollIntoView({ behavior: RM() ? "auto" : "smooth" });
    };
    $("#xs-go").onclick = () => { if (ans.includes(-1) && !confirmLike()) return; end(); };
    const confirmLike = () => { const b = $("#xs-go"); if (b.dataset.sure) return true; b.dataset.sure = 1; b.textContent = "توجد أسئلة بلا إجابة — اضغط مجددًا للتسليم"; return false; };
    stop = countdown(minutes * 60, s => { const t = $("#xs-t"); if (t) t.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }, () => { toast("انتهى الوقت"); end(); });
    window.addEventListener("hashchange", () => stop && stop(), { once: true });
  }
  L.EXT.banco = () => ({ html: bankHome(), bind: bindBank });

  /* ---------- الاختبارات الدولية: DELE وSIELE ---------- */
  const X = () => L.EXAMS || null;
  const arr = v => Array.isArray(v) ? v : v ? [v] : [];
  const txt = v => typeof v === "string" ? v : v && typeof v === "object" ? Object.values(v).filter(x => typeof x === "string" || typeof x === "number").join(" · ") : "";
  const link = u => u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\//, "").slice(0, 60))}</a>` : "";
  function deleHome() {
    const E = X(); if (!E) return `${topbar("#aprender", "🎓 الاختبارات الدولية")}<p class="notice amber">لم تُحمَّل مادة الاختبارات بعد؛ أعد تحميل الصفحة.</p>`;
    const dele = arr(E.dele); const cur = P.deleLv && dele.some(d => d.lv === P.deleLv) ? P.deleLv : (dele[2] || dele[0] || {}).lv;
    return `${topbar("#aprender", "🎓 DELE وSIELE")}<p class="muted">شهادتا الإسبانية الدوليتان من <b>معهد ثربانتس</b>: <b>DELE</b> دبلوم دائم لكل مستوى (A1–C2)، و<b>SIELE</b> اختبار رقمي واحد يقيس مستواك على مقياس من 1000 نقطة. هنا تجد هيكل كل اختبار من مصادره الرسمية، ونماذج تدريب أصلية بمؤقت، ومهام كتابة وتحدث بنماذج إجابة، ثم تقييم كتابتك عبر المعلّم الذكي.</p>
      ${E.intro ? `<div class="card dl-intro"><p>${esc(txt(E.intro))}</p>${E.validity ? `<p class="small"><b>الصلاحية:</b> DELE: ${esc(E.validity.dele || "")} · SIELE: ${esc(E.validity.siele || "")}</p>` : ""}</div>` : ""}
      <div class="card"><h3>رحلة المستويات ومدة الاختبار</h3><div class="dl-road">${dele.map((d, i) => { const mins = arr(d.parts).reduce((a, p) => a + (+p.minutes || 0), 0); return `<button type="button" class="dl-stop${d.lv === cur ? " on" : ""}" data-dlv="${esc(d.lv)}" style="--i:${i}"><b>${esc(d.lv)}</b><span>${mins ? mins + " د" : ""}</span></button>`; }).join("")}</div><div id="dl-lv"></div></div>
      ${E.siele ? sieleCard(E.siele) : ""}
      <div class="card"><h3>🧪 التدريب العملي</h3><div class="lx-row">${LVS.map(lv => `<button type="button" class="chip" data-dpl="${lv}"${lv === cur ? ' aria-pressed="true"' : ""}>${lv}</button>`).join("")}</div><div id="dl-pr"></div></div>
      <div class="card"><h3>المصادر الرسمية</h3><ul class="small">${arr(E.sources).map(u => `<li>${link(u)}</li>`).join("")}</ul><p class="muted small">آخر تحديث للمعلومات: ${esc(E.updated || "")}. قد تتغير المواعيد والرسوم وتفاصيل الاختبار؛ راجع موقع معهد ثربانتس قبل التسجيل. النماذج هنا من إعداد الموقع للتدريب وليست اختبارات رسمية.</p></div>`;
  }
  function sieleCard(s) {
    return `<div class="card dl-siele"><h3>🖥️ SIELE</h3><div class="dl-mods">${arr(s.modules).map((m, i) => `<div class="dl-mod" style="--i:${i}">${typeof m === "string" ? esc(m) : `<b>${esc(m.name || m.n || "")}</b>${m.minutes ? `<span>${esc(String(m.minutes))} د</span>` : ""}${m.points || m.score ? `<span>${esc(String(m.points || m.score))} نقطة</span>` : ""}${m.ar ? `<span class="muted small">${esc(m.ar)}</span>` : ""}`}</div>`).join("")}</div>
      ${s.by ? `<p class="small muted">${esc(s.by)}</p>` : ""}
      ${s.bands && s.bands.rows ? `<div class="dl-tw"><table class="dl-table"><thead><tr>${s.bands.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${s.bands.rows.map(r => `<tr>${r.map((c, k) => k ? `<td dir="ltr">${esc(c)}</td>` : `<th>${esc(c)}</th>`).join("")}</tr>`).join("")}</tbody></table></div><p class="muted small">النطاقات الرسمية لكل وحدة (من 250 نقطة) وما يقابلها من مستويات.</p>` : ""}
      ${arr(s.variantList).length ? `<div class="dl-vars">${s.variantList.map(v => `<div class="dl-var"><b dir="ltr">SIELE ${esc(v.id)}</b><span class="small">${arr(v.parts).map(esc).join(" + ")}</span></div>`).join("")}</div>` : ""}
      ${s.score ? `<p><b>الدرجة:</b> ${esc(txt(s.score))}</p>` : ""}${s.validity ? `<p><b>الصلاحية:</b> ${esc(txt(s.validity))}</p>` : ""}${s.variants && !arr(s.variantList).length ? `<p><b>الصيغ:</b> ${esc(txt(s.variants))}</p>` : ""}
      ${arr(s.tips).length ? `<ul class="steps">${arr(s.tips).map(t => `<li>${esc(txt(t))}</li>`).join("")}</ul>` : ""}${s.src ? `<p class="small muted">المصدر: ${link(s.src)}</p>` : ""}</div>`;
  }
  function levelInfo(d) {
    const parts = arr(d.parts); const mx = Math.max(1, ...parts.map(p => +p.minutes || 0));
    return `<div class="dl-info fade"><h3>${esc(d.title || "DELE " + d.lv)}${d.unverified ? ` <span class="tag amber">بعض التفاصيل غير مؤكدة</span>` : ""}</h3>
      <div class="dl-parts">${parts.map((p, i) => `<div class="dl-part" style="--i:${i}"><div class="row between"><b lang="es">${esc(p.name || "")}</b><span class="muted small">${p.tasks ? p.tasks + " مهام · " : ""}${p.items ? p.items + " سؤالًا · " : ""}${p.minutes ? p.minutes + " دقيقة" : ""}${p.prep ? ` (+${p.prep} تحضير)` : ""}${p.words ? ` · <bdi dir="ltr">${esc(p.words)}</bdi> كلمة` : ""}</span></div><div class="dl-bar"><i style="--w:${Math.round((+p.minutes || 0) / mx * 100)}%"></i></div>${p.ar ? `<p class="small muted">${esc(p.ar)}</p>` : ""}</div>`).join("")}</div>
      ${d.note ? `<p class="notice amber small">${esc(d.note)}</p>` : ""}${d.total ? `<p><b>المجموع:</b> ${esc(txt(d.total))}</p>` : ""}${d.pass ? `<p><b>شرط النجاح:</b> ${esc(txt(d.pass))}</p>` : ""}
      ${arr(d.tips).length ? `<h4>نصائح</h4><ul class="steps">${arr(d.tips).map(t => `<li>${esc(txt(t))}</li>`).join("")}</ul>` : ""}${d.src ? `<p class="small muted">المصدر: ${link(d.src)}</p>` : ""}</div>`;
  }
  function practice(lv) {
    const E = X(); const mk = arr(E.mocks).filter(m => m.lv === lv), wr = arr(E.writing).map((w, i) => [w, i]).filter(([w]) => w.lv === lv), sp = arr(E.speaking).map((s, i) => [s, i]).filter(([s]) => s.lv === lv);
    const done = id => P.dele[id] != null ? `<span class="tag gold">${P.dele[id]}%</span>` : "";
    return `<div class="dl-prac fade"><h4>📖🎧 نماذج فهم بمؤقت (${mk.length})</h4><div class="lx-units">${mk.map(m => `<a class="card lift lx-unit" href="#aprender/dele/mock:${esc(m.id)}"><span class="lx-uic">${m.audio || /auditiva/i.test(m.type || "") ? "🎧" : m.type === "uso" ? "🧩" : "📖"}</span><span><b lang="es">${esc(m.title || m.id)}</b><br><span class="muted small">${esc(m.type || "")} · ${arr(m.q).length} أسئلة</span></span>${done(m.id)}</a>`).join("") || `<p class="muted">لا توجد نماذج لهذا المستوى.</p>`}</div>
      <h4>✍️ مهام الكتابة (${wr.length})</h4><div class="lx-units">${wr.map(([w, i]) => `<a class="card lift lx-unit" href="#aprender/dele/w:${i}"><span class="lx-uic">✍️</span><span><b>${esc((w.ar || w.prompt || "").slice(0, 70))}</b><br><span class="muted small">${esc(w.words || "")} كلمة</span></span></a>`).join("")}</div>
      <h4>🗣️ مهام التحدث (${sp.length})</h4><div class="lx-units">${sp.map(([s, i]) => `<a class="card lift lx-unit" href="#aprender/dele/s:${i}"><span class="lx-uic">🗣️</span><span><b>${esc((s.ar || s.prompt || "").slice(0, 70))}</b></span></a>`).join("")}</div></div>`;
  }
  function bindDele() {
    const E = X(); if (!E) return; const dele = arr(E.dele);
    const showLv = lv => { const d = dele.find(x => x.lv === lv); $$("[data-dlv]").forEach(b => b.classList.toggle("on", b.dataset.dlv === lv)); if (d) $("#dl-lv").innerHTML = levelInfo(d); P.deleLv = lv; save(); };
    const showPr = lv => { $$("[data-dpl]").forEach(b => b.setAttribute("aria-pressed", b.dataset.dpl === lv)); $("#dl-pr").innerHTML = practice(lv); };
    $$("[data-dlv]").forEach(b => b.onclick = () => { showLv(b.dataset.dlv); showPr(b.dataset.dlv); });
    $$("[data-dpl]").forEach(b => b.onclick = () => showPr(b.dataset.dpl));
    const cur = $(".dl-stop.on"); const lv = cur ? cur.dataset.dlv : "B1"; showLv(lv); showPr(lv);
  }
  function mockView(id) {
    const m = arr((X() || {}).mocks).find(x => x.id === id); if (!m) return { html: deleHome(), bind: bindDele };
    const qs = arr(m.q).map(q => Array.isArray(q) ? { q: q[0], o: q[1], a: q[2] } : { q: q.q, o: q.o, a: q.a, ex: q.ex });
    const mins = Math.max(4, Math.round((m.text || "").split(/\s+/).length / 60 + qs.length * 1.2)); const AUD = !!m.audio || /auditiva/i.test(m.type || "");
    return { html: `${topbar("#aprender/dele", `🧪 ${esc(m.title || m.id)}`)}<p class="muted"><span class="lx-lv">${esc(m.lv)}</span> ${esc(m.type || "")} · ${qs.length} أسئلة · المدة المقترحة ${mins} دقيقة. ${m.ar ? esc(m.ar) : AUD ? "استمع للنص أولًا (مرتين كما في الاختبار الحقيقي) ثم أجب، ويمكنك إظهار النص بعد ذلك." : "اقرأ النص ثم أجب."}</p>${AUD ? `<div class="lx-row"><button type="button" class="primary" id="mk-play">🔊 استمع للتسجيل</button><button type="button" id="mk-show">إظهار النص</button></div>` : ""}<div id="mk-run"></div>`,
      bind: () => { const aud = AUD; const run = (show) => examRun($("#mk-run"), qs, mins, (res, pct) => { P.dele[m.id] = Math.max(pct, P.dele[m.id] || 0); save(); }, show ? m.text : ""); run(!aud); if (aud) { $("#mk-play").onclick = () => R.TTS.speak(m.text, "es"); $("#mk-show").onclick = e => { e.target.remove(); const t = document.createElement("div"); t.className = "ex-text card"; t.lang = "es"; t.dir = "ltr"; t.textContent = m.text; $("#mk-run").before(t); }; } } };
  }
  function writeView(i) {
    const w = arr((X() || {}).writing)[i]; if (!w) return { html: deleHome(), bind: bindDele };
    return { html: `${topbar("#aprender/dele", "✍️ مهمة كتابة")}<div class="card"><p><span class="lx-lv">${esc(w.lv)}</span> <span class="muted small">${esc(w.words || "")} كلمة</span></p><p class="lx-es" lang="es" dir="ltr">${esc(w.prompt)}</p>${w.ar ? `<p class="lx-ar">${esc(w.ar)}</p>` : ""}</div>
      <div class="card"><textarea id="wr-t" dir="ltr" lang="es" rows="10" spellcheck="true" placeholder="Escribe aquí tu texto…"></textarea>${ACC}<div class="lx-row between"><span class="muted small">عدد الكلمات: <b id="wr-n">0</b> · ⏱️ <b id="wr-tm">0:00</b></span><span><button type="button" class="primary" id="wr-ai">🧑‍🏫 قيّم كتابتي</button><button type="button" id="wr-m">عرض نموذج الإجابة</button></span></div></div><div id="wr-out"></div><div id="wr-model" hidden class="card"><h3>نموذج إجابة (من إعداد الموقع)</h3><p class="es-text" lang="es" dir="ltr">${esc(w.model || "").replace(/\n+/g, "<br><br>")}</p><button type="button" data-say="${esc(w.model || "")}">🔊 استمع</button></div>`,
      bind: () => { const ta = $("#wr-t"), k = "dele-w-" + i; try { ta.value = localStorage.getItem(k) || ""; } catch (e) { } const t0 = Date.now(); const tm = setInterval(() => { const el = $("#wr-tm"); if (!el) return clearInterval(tm); const s = Math.round((Date.now() - t0) / 1000); el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }, 1000);
        const cnt = () => { $("#wr-n").textContent = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; try { localStorage.setItem(k, ta.value); } catch (e) { } }; ta.oninput = cnt; cnt();
        $("#wr-m").onclick = () => { $("#wr-model").hidden = false; $("#wr-model").scrollIntoView({ behavior: RM() ? "auto" : "smooth" }); };
        $("#wr-ai").onclick = async () => { const t = ta.value.trim(); if (t.split(/\s+/).length < 15) return toast("اكتب نصًّا أطول قليلًا أولًا"); const q = `Tarea DELE ${w.lv}: ${w.prompt}\n\nTexto del alumno:\n${t}`.slice(0, 1500); const b = $("#wr-ai"); b.disabled = true; $("#wr-out").innerHTML = `<p class="muted">المعلّم يقرأ نصك…</p>`;
          try { const r = await fetch("/api/tutor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ q, mode: "correct", level: LVS.includes(w.lv) ? w.lv : "B1" }) }); const j = await r.json(); if (!r.ok) throw new Error(j.message || r.status); $("#wr-out").innerHTML = `<div class="card fade"><div class="lx-tutor">${esc(j.text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>")}</div><p class="muted small">تقييم آلي للتعلّم وليس درجة رسمية.</p></div>`; addXP(5); }
          catch (e) { $("#wr-out").innerHTML = `<p class="notice amber">تعذّر التقييم الآن: ${esc(e.message)}</p>`; } b.disabled = false; };
      } };
  }
  function speakView(i) {
    const s = arr((X() || {}).speaking)[i]; if (!s) return { html: deleHome(), bind: bindDele };
    return { html: `${topbar("#aprender/dele", "🗣️ مهمة تحدّث")}<div class="card"><p><span class="lx-lv">${esc(s.lv)}</span></p><p class="lx-es" lang="es" dir="ltr">${esc(s.prompt)} <button type="button" class="lx-ic" data-say="${esc(s.prompt)}">🔊</button></p>${s.ar ? `<p class="lx-ar">${esc(s.ar)}</p>` : ""}</div>
      <div class="card"><h3>المؤقت</h3>${timerBar()}<div class="lx-row"><button type="button" id="sp-prep">⏳ تحضير 2 دقيقة</button><button type="button" class="primary" id="sp-talk">🎙️ تحدّث 3 دقائق</button><b id="sp-t"></b></div>${U.SR ? `<p class="muted small">أثناء التحدث يكتب المتصفح ما يسمعه (Chrome)، ثم يمكنك إرسال النص للمعلّم لتصحيحه.</p><div id="sp-tr" class="es-text" lang="es" dir="ltr"></div><button type="button" id="sp-ai" hidden>🧑‍🏫 صحّح ما قلته</button><div id="sp-out"></div>` : ""}</div>
      <div class="card"><h3>عبارات مفيدة</h3>${arr(s.useful).map(u => `<p class="lx-es" lang="es" dir="ltr">${esc(u)} <button type="button" class="lx-ic" data-say="${esc(u)}">🔊</button></p>`).join("")}</div>`,
      bind: () => { let stop; const run = (sec, talk) => { stop && stop(); stop = countdown(sec, t => { const el = $("#sp-t"); if (el) el.textContent = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`; }, () => { toast(talk ? "انتهى وقت التحدث" : "انتهى وقت التحضير — ابدأ الكلام"); }); if (talk && U.SR) listen(sec); };
        let rec; const listen = sec => { try { rec && rec.stop(); rec = new U.SR(); rec.lang = "es-ES"; rec.continuous = true; rec.interimResults = false; const out = []; rec.onresult = e => { for (let k = e.resultIndex; k < e.results.length; k++) if (e.results[k].isFinal) out.push(e.results[k][0].transcript); $("#sp-tr").textContent = out.join(" "); $("#sp-ai").hidden = !out.length; }; rec.start(); setTimeout(() => { try { rec.stop(); } catch (e) { } }, sec * 1000); } catch (e) { } };
        $("#sp-prep").onclick = () => run(120); $("#sp-talk").onclick = () => run(180, true);
        const ai = $("#sp-ai"); if (ai) ai.onclick = async () => { const t = $("#sp-tr").textContent.trim(); if (!t) return; ai.disabled = true; try { const r = await fetch("/api/tutor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ q: `Tarea oral DELE ${s.lv}: ${s.prompt}\n\nTranscripción del alumno:\n${t}`.slice(0, 1500), mode: "correct", level: LVS.includes(s.lv) ? s.lv : "B1" }) }); const j = await r.json(); if (!r.ok) throw new Error(j.message || r.status); $("#sp-out").innerHTML = `<div class="card fade lx-tutor">${esc(j.text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>")}</div>`; } catch (e) { $("#sp-out").innerHTML = `<p class="notice amber">${esc(e.message)}</p>`; } ai.disabled = false; };
        window.addEventListener("hashchange", () => { stop && stop(); try { rec && rec.stop(); } catch (e) { } }, { once: true }); } };
  }
  L.EXT.dele = id => {
    if (id.startsWith("mock:")) return mockView(id.slice(5));
    if (id.startsWith("w:")) return writeView(+id.slice(2));
    if (id.startsWith("s:")) return speakView(+id.slice(2));
    return { html: deleHome(), bind: bindDele };
  };
})();
