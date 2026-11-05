/* تعلّم الإسبانية — «الطريقة الاحترافية»: دليل طرق التعلّم المثبتة، وجلسة يومية موجّهة (مراجعة متباعدة + استرجاع نشط + قوالب جاهزة + ترديد + إملاء + إنتاج)، وأداتا الترديد والبطاقات العكسية. */
(function () {
  const L = window.LEARN, R = window.RAFIQ; if (!L || !L._) return;
  const { P, save, addXP, runEx, topbar, SAY, W, SNT, shuffle, pick, today, tr, sayBtns, checkSpeech, SR } = L._;
  const { esc, toast } = R; const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const LVS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const lv = () => LVS.includes(P.level) ? P.level : "A1";
  const BOX = [0, 1, 3, 7, 14, 30, 60];
  const dayAdd = (d, n) => { const x = new Date(d + "T12:00:00"); x.setDate(x.getDate() + n); return x.toLocaleDateString("en-CA"); };
  const seed = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const byDay = (arr, salt = "") => arr.length ? arr[seed(today() + salt) % arr.length] : null;
  const nearLv = (items, l) => { for (let d = 0; d < 6; d++) for (const s of [-1, 1]) { const i = LVS.indexOf(l) + d * s; const hit = items.filter(x => x.lv === LVS[i]); if (hit.length) return hit; } return items; };
  const DAILY_CONV = () => L.CONV.filter(c => +c.id.slice(2) < 60 || +c.id.slice(2) >= 80); // المحادثات اليومية (لا الدعوية)
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const pauseFor = t => 900 + Math.min(9000, t.length * 85);
  const md = () => { P.mt = P.mt || { days: {}, n: 0 }; return P.mt; };

  /* ---------- دليل الطرق ---------- */
  const METHODS = [
    ["🔁", "التكرار المتباعد", "Spaced repetition", "تراجع الكلمة قبل أن تنساها مباشرة: بعد يوم، ثم 3 أيام، ثم أسبوع، ثم أسبوعين… فتنتقل من الذاكرة القصيرة إلى الطويلة بأقلّ وقت.", "#aprender/repaso", "راجع كلماتك"],
    ["🧠", "الاسترجاع النشط", "Active recall", "لا تكتفِ بقراءة الكلمة؛ انظر إلى المعنى العربي وحاول أن تقول الكلمة الإسبانية من ذاكرتك قبل أن تراها. محاولة التذكّر نفسها هي التي تثبّت المعلومة.", "#aprender/metodo/tarjetas", "بطاقات الاسترجاع"],
    ["🎧", "الترديد خلف المتحدّث", "Shadowing", "تسمع الجملة من متحدّث أصلي ثم تكرّرها فورًا بالإيقاع والنبرة نفسيهما. يحسّن النطق والطلاقة والاستماع معًا.", "#aprender/metodo/sombra", "تدرّب على الترديد"],
    ["🧩", "التعلّم بالقوالب الجاهزة", "Chunks", "احفظ عبارات كاملة مثل «¿Te importaría…?» لا كلمات مفردة. المتحدّث الطليق يركّب كلامه من قوالب جاهزة لا من قواعد في كلّ مرّة.", "#aprender/frases", "كتاب العبارات"],
    ["🔝", "الأكثر تكرارًا أوّلًا", "Frequency first", "قرابة ألف كلمة تغطّي معظم الكلام اليومي. ابدأ بالأسماء والصفات والأفعال الأكثر استعمالًا قبل الكلمات النادرة.", "#aprender/vocab/dk-101", "الأسماء الأكثر تكرارًا"],
    ["📖", "المدخلات المفهومة", "Comprehensible input", "اقرأ واستمع لنصوص أعلى من مستواك بقليل، تفهم أغلبها من السياق. هكذا يكتسب الطفل لغته، وهكذا تتعلّم القواعد دون حفظ جافّ.", "#aprender/leer", "نصوص متدرّجة"],
    ["✍️", "الإملاء", "Dictation", "تسمع جملة وتكتبها كما سمعتها. تكشف لك فورًا ما لا تميّزه أذنك بعد، وتربط الصوت بالكتابة.", "#aprender/habilidades", "تمارين الإملاء"],
    ["🗣️", "الإنتاج مع التصحيح", "Output + feedback", "تكلّم واكتب منذ اليوم الأوّل، ثم اطلب التصحيح. الخطأ ليس فشلًا؛ هو الطريق الأسرع لتعرف ما ينقصك.", "#aprender/tutor", "اسأل المعلّم"],
    ["🔀", "المزج بين الموضوعات", "Interleaving", "اخلط في التمرين الواحد موضوعات مختلفة بدل تكرار نوع واحد. أصعب قليلًا، لكنّه يجعل التعلّم أثبت.", "#aprender/reto", "تحدّي اليوم"],
    ["🎭", "التعلّم بالمهامّ", "Task-based learning", "تدرّب على مواقف حقيقية: شراء، موعد، اتّصال بفنّي… العب دور أحد الطرفين حتّى تصبح الجمل جزءًا منك.", "#aprender/conv", "محادثات يومية"]
  ];
  function guide() {
    const m = md(), done = m.days[today()], nDays = Object.keys(m.days).length;
    return `${topbar("#aprender", "🧭 الطريقة الاحترافية")}
      <div class="card mt-hero"><h2>جلسة اليوم الموجّهة — 20 دقيقة</h2>
        <p class="muted">خمس محطّات مبنية على أبحاث تعلّم اللغات: مراجعة متباعدة بالاسترجاع النشط، ثم قوالب جاهزة تسمعها وتكرّرها، ثم ترديد حوار يومي، ثم إملاء، ثم إنتاج تتكلّم فيه بنفسك ويصحّحه المعلّم. المستوى: <b>${lv()}</b>${P.level ? "" : ` · <a href="#aprender/nivel">حدّد مستواك</a>`}</p>
        <ol class="mt-plan"><li>🔁 مراجعة واسترجاع (5 د)</li><li>🧩 قوالب جاهزة (4 د)</li><li>🎧 ترديد حوار (4 د)</li><li>✍️ إملاء (3 د)</li><li>🗣️ تكلّم واكتب (4 د)</li></ol>
        <div class="lx-row"><a class="btn primary lx-big" href="#aprender/metodo/sesion">${done ? "✅ أنجزت جلسة اليوم — أعدها" : "▶ ابدأ جلسة اليوم"}</a><span class="tag gold">جلسات منجزة: ${nDays}</span></div></div>
      <h2>عشر طرق احترافية يستعملها معلّمو اللغات</h2>
      <div class="mt-grid">${METHODS.map(([ic, ar, en, d, href, cta]) => `<article class="card mt-m"><h3><span aria-hidden="true">${ic}</span> ${ar} <small class="muted" dir="ltr">${en}</small></h3><p>${d}</p><a class="btn" href="${href}">${cta} ←</a></article>`).join("")}</div>
      <div class="card"><h3>نصائح ذهبية</h3><ul class="steps">
        <li>قليل دائم خير من كثير منقطع: 20 دقيقة كلّ يوم أنفع من ثلاث ساعات مرّة في الأسبوع.</li>
        <li>تكلّم بصوت مسموع دائمًا، حتّى وأنت وحدك؛ الفم يحتاج تدريبًا كالأذن.</li>
        <li>اكتب كلّ كلمة جديدة في جملة عن حياتك أنت، فتتذكّرها أسرع.</li>
        <li>لا تترجم في رأسك كلمة كلمة؛ تعلّم الجملة كاملة كما يقولها أهلها.</li>
        <li>استمع يوميًّا لشيء ممتع بالإسبانية ولو لم تفهم كلّ شيء.</li></ul></div>`;
  }

  /* ---------- بطاقات الاسترجاع (عربي ← إسباني) ---------- */
  function freqPool() { const ids = ["dk-101", "dk-102", "dk-103", "dk-31", "dk-26", "dk-112", "dk-104", "dk-105"]; return ids.map(id => L.DECKS.find(d => d.id === id)).filter(Boolean).flatMap(d => d.w.map(W).map(w => ({ ...w, u: d.id }))); }
  function grade(es, g, card) {
    const c = P.srs[es] || (P.srs[es] = { b: 0, d: today(), ar: card.ar, em: card.em || "", u: card.u || "metodo" });
    c.b = g === 0 ? 0 : g === 1 ? Math.max(1, c.b) : Math.min(c.b + 1, BOX.length - 1);
    c.d = dayAdd(today(), g === 0 ? 0 : g === 1 ? 1 : BOX[c.b]); save();
  }
  /* يعرض بطاقات: المعنى العربي أوّلًا، يحاول المتعلّم أن يقولها، ثم يكشفها ويقيّم نفسه */
  function recall(box, cards, onDone) {
    let i = 0, ok = 0;
    const show = () => {
      if (i >= cards.length) return onDone(ok, cards.length);
      const c = cards[i];
      box.innerHTML = `<div class="card lx-ex mt-card"><p class="muted small">${i + 1} / ${cards.length} · قلها بالإسبانية بصوت مسموع قبل أن تكشفها</p>${c.em ? `<div class="lx-em">${c.em}</div>` : ""}<p class="lx-ar big">${esc(c.ar)}</p>
        <div id="mt-back" hidden><p class="lx-es" lang="es" dir="ltr">${esc(c.es)} ${sayBtns(c.es)}</p>${tr(c.es)}</div>
        <div class="lx-row" id="mt-act"><button type="button" class="primary lx-big" id="mt-flip">أظهر الجواب</button>${SR ? `<button type="button" id="mt-mic">🎤 قلها وأتحقّق</button>` : ""}</div><div class="lx-srz" id="mt-sr"></div></div>`;
      const flip = () => { $("#mt-back", box).hidden = false; SAY.say(c.es); $("#mt-act", box).innerHTML = `<span class="muted small">كيف كان تذكّرك؟</span><button type="button" data-g="0">😕 نسيتها</button><button type="button" data-g="1">🤔 صعبة</button><button type="button" class="primary" data-g="2">😊 عرفتها</button>`;
        $$("[data-g]", box).forEach(b => b.onclick = () => { const g = +b.dataset.g; grade(c.es, g, c); if (g) { ok++; addXP(2); } i++; show(); }); };
      $("#mt-flip", box).onclick = flip;
      const mic = $("#mt-mic", box); if (mic) mic.onclick = async () => { const s = await checkSpeech(c.es, mic, $("#mt-sr", box)); mic.textContent = "🎤 مرّة أخرى"; if (s >= 0.7) flip(); };
    };
    show();
  }
  function cardsView() {
    const due = Object.entries(P.srs).filter(([, v]) => v.d <= today()).length;
    return `${topbar("#aprender/metodo", "🧠 بطاقات الاسترجاع النشط")}<p class="muted">ترى المعنى بالعربية، فتقول الكلمة الإسبانية من ذاكرتك بصوت مسموع، ثم تكشفها وتقيّم نفسك بصدق. النتيجة تحدّد موعد مراجعتها القادم تلقائيًّا.</p>
      <div class="lx-row"><button type="button" class="primary" id="mc-due"${due ? "" : " disabled"}>🔁 كلماتي المستحقّة (${due})</button><button type="button" id="mc-new">🔝 ١٠ كلمات جديدة من الأكثر تكرارًا</button></div><div id="mc-run"></div>`;
  }
  function bindCards() {
    const end = (ok, n) => { $("#mc-run").innerHTML = `<div class="card lx-result"><div class="lx-em">🧠</div><h2>${ok} من ${n}</h2><p class="muted">الكلمات التي نسيتها ستعود إليك اليوم، والتي عرفتها تبتعد مواعيدها.</p><a class="btn primary" href="#aprender/metodo/tarjetas">جولة أخرى</a></div>`; };
    $("#mc-due").onclick = () => recall($("#mc-run"), shuffle(Object.entries(P.srs).filter(([, v]) => v.d <= today()).map(([es, v]) => ({ es, ...v }))).slice(0, 20), end);
    $("#mc-new").onclick = () => { const fresh = freqPool().filter(w => !P.srs[w.es]); if (!fresh.length) return toast("أتممت كلّ الكلمات الأكثر تكرارًا 👏"); recall($("#mc-run"), fresh.slice(0, 10), end); };
  }

  /* ---------- الترديد (Shadowing) ---------- */
  let shadowTok = 0;
  async function shadow(lines, rows, opts = {}) {
    const my = ++shadowTok; const v = R.TTS.nv("es"), p = R.TTS.partner(v);
    for (let i = 0; i < lines.length; i++) {
      if (my !== shadowTok) return false;
      rows.forEach((r, j) => r.classList.toggle("lx-now", i === j)); rows[i] && rows[i].scrollIntoView({ block: "center", behavior: "smooth" });
      const turn = rows[i] && rows[i].querySelector(".mt-turn"); if (turn) turn.textContent = "🔊 استمع…";
      await R.TTS.speak(lines[i].es, "es", null, { quiet: true, voice: lines[i].who === "B" ? p : v, rate: opts.slow ? 0.75 : undefined });
      if (my !== shadowTok) return false;
      if (turn) turn.textContent = "🗣️ دورك: ردّدها الآن";
      await wait(pauseFor(lines[i].es) * (opts.slow ? 1.3 : 1));
      if (turn) turn.textContent = "✓";
    }
    rows.forEach(r => r.classList.remove("lx-now")); return my === shadowTok;
  }
  const lineRows = (ls, showAr = true) => ls.map((l, i) => `<div class="lx-sent mt-line" data-li="${i}"><p class="lx-es" lang="es" dir="ltr">${l.who ? `<b class="muted">${l.who}:</b> ` : ""}${esc(l.es)} ${sayBtns(l.es)}</p>${tr(l.es)}<p class="lx-ar small"${showAr ? "" : " hidden"}>${esc(l.ar)}</p><span class="mt-turn small muted"></span></div>`).join("");
  function shadowView(id) {
    const list = DAILY_CONV(), c = list.find(x => x.id === id);
    if (!c) return `${topbar("#aprender/metodo", "🎧 الترديد خلف المتحدّث")}<p class="muted">اختر حوارًا: تسمع كلّ سطر بصوت متحدّث أصلي، ثم يتوقّف المشغّل لتكرّره أنت بالنبرة والإيقاع نفسيهما. ابدأ بإظهار النصّ، ثم أخفه حين تتقن.</p>
      <div class="lx-units">${[...list].sort((a, b) => LVS.indexOf(a.lv) - LVS.indexOf(b.lv)).map(x => `<a class="lx-unit card lift" href="#aprender/metodo/sombra/${x.id}"><span class="lx-uic">${x.ic}</span><span><b>${esc(x.tar)}</b><br><bdi class="small muted" lang="es">${esc(x.t)}</bdi></span><span class="lx-lv">${x.lv}</span></a>`).join("")}</div>`;
    const ls = c.d.map(s => ({ who: s[0], es: s.slice(2).split("|")[0], ar: s.slice(2).split("|")[1] }));
    return `${topbar("#aprender/metodo/sombra", `🎧 ${esc(c.tar)}`)}<p class="muted"><span class="lx-lv">${c.lv}</span> تسمع السطر ثم تردّده في الفراغ الذي يليه. كرّر الحوار ثلاث مرّات: بالنصّ، ثم بلا ترجمة، ثم بلا نصّ.</p>
      <div class="card lx-row"><button type="button" class="primary" id="sh-go">▶ ابدأ الترديد</button><button type="button" id="sh-slow">🐢 ببطء</button><button type="button" id="sh-stop">⏹ إيقاف</button><label class="small"><input type="checkbox" id="sh-ar"> أخفِ الترجمة</label><label class="small"><input type="checkbox" id="sh-es"> أخفِ النصّ الإسباني</label></div>
      <div class="card" id="sh-lines">${lineRows(ls)}</div>`;
  }
  function bindShadow(id) {
    const c = DAILY_CONV().find(x => x.id === id); if (!c) return;
    const ls = c.d.map(s => ({ who: s[0], es: s.slice(2).split("|")[0], ar: s.slice(2).split("|")[1] })); const rows = $$("#sh-lines .mt-line");
    const go = async slow => { const ok = await shadow(ls, rows, { slow }); if (ok) { addXP(8); md().sh = (md().sh || 0) + 1; save(); toast("أحسنت! أعد الحوار مرّة أخرى بلا ترجمة 👏"); } };
    $("#sh-go").onclick = () => go(false); $("#sh-slow").onclick = () => go(true);
    $("#sh-stop").onclick = () => { shadowTok++; R.TTS.stop(); };
    $("#sh-ar").onchange = e => $$("#sh-lines .lx-ar").forEach(x => x.hidden = e.target.checked);
    $("#sh-es").onchange = e => $$("#sh-lines .lx-es, #sh-lines .lx-tr").forEach(x => x.style.visibility = e.target.checked ? "hidden" : "");
    addEventListener("hashchange", () => { shadowTok++; }, { once: true });
  }

  /* ---------- أسئلة الإنتاج (تكلّم واكتب) ---------- */
  const PROMPTS = {
    A1: ["¿Cómo te llamas y de dónde eres?|ما اسمك ومن أين أنت؟", "¿Qué haces por la mañana?|ماذا تفعل في الصباح؟", "Describe tu casa.|صِف بيتك.", "¿Qué te gusta comer?|ماذا تحبّ أن تأكل؟", "Habla de tu familia.|تحدّث عن عائلتك."],
    A2: ["¿Qué hiciste el fin de semana pasado?|ماذا فعلت في نهاية الأسبوع الماضي؟", "Describe tu barrio.|صِف حيّك.", "¿Cómo vas al trabajo o a clase?|كيف تذهب إلى العمل أو الدراسة؟", "Invita a un amigo a cenar y dile la hora y el lugar.|ادعُ صديقًا إلى العشاء وأخبره بالوقت والمكان.", "Pide comida por teléfono.|اطلب طعامًا بالهاتف."],
    B1: ["Cuenta algo divertido que te pasó.|احكِ شيئًا طريفًا حدث لك.", "¿Qué ventajas tiene vivir en una ciudad grande?|ما مزايا العيش في مدينة كبيرة؟", "Explica un problema en tu casa a un técnico.|اشرح لفنّي مشكلة في بيتك.", "¿Qué harías con un mes de vacaciones?|ماذا ستفعل بشهر إجازة؟", "Da consejos a alguien que empieza a aprender árabe.|انصح شخصًا يبدأ تعلّم العربية."],
    B2: ["¿Teletrabajo u oficina? Defiende tu opinión.|العمل عن بعد أم في المكتب؟ دافع عن رأيك.", "¿Cómo se puede mejorar la convivencia en un edificio?|كيف يمكن تحسين التعايش في عمارة سكنية؟", "Describe una costumbre de tu país que te guste.|صِف عادة من بلدك تحبّها.", "Pide con cortesía una reparación a tu casero.|اطلب بأدب من صاحب البيت إصلاحًا.", "¿Qué papel tiene la familia hoy en día?|ما دور الأسرة اليوم؟"],
    C1: ["¿Hasta qué punto la tecnología nos aísla?|إلى أيّ حدّ تعزلنا التقنية؟", "Argumenta a favor y en contra del consumo rápido.|قدّم حججًا مع الاستهلاك السريع وضدّه.", "¿Qué significa para ti una vida con sentido?|ماذا تعني لك حياة ذات معنى؟", "Resume una noticia reciente y da tu opinión.|لخّص خبرًا حديثًا وأبدِ رأيك.", "¿Cómo explicarías tu cultura a alguien que no la conoce?|كيف تشرح ثقافتك لمن لا يعرفها؟"]
  };
  PROMPTS.C2 = PROMPTS.C1;
  function outputBox(box, onDone) {
    const [es, ar] = byDay(PROMPTS[lv()], "out").split("|");
    box.innerHTML = `<div class="card lx-ex"><p class="lx-q">أجب بالإسبانية في 3 إلى 6 جمل. تكلّم أوّلًا بصوت مسموع، ثم اكتب ما قلت أو أملِه بالميكروفون.</p>
      <p class="lx-es" lang="es" dir="ltr">${esc(es)} ${sayBtns(es)}</p><p class="lx-ar small">${esc(ar)}</p>
      <textarea id="mt-out" dir="ltr" lang="es" rows="5" placeholder="Escribe aquí…"></textarea>
      <div class="lx-row">${SR ? `<button type="button" id="mt-dic">🎤 أملِ بصوتك</button>` : ""}<button type="button" class="primary" id="mt-fix">🧑‍🏫 صحّح لي</button><button type="button" id="mt-end">إنهاء الجلسة ✓</button></div><div id="mt-fb"></div></div>`;
    const dic = $("#mt-dic", box); if (dic) dic.onclick = () => { const S = window.SpeechRecognition || window.webkitSpeechRecognition; const r = new S(); r.lang = "es-ES"; r.interimResults = false; dic.textContent = "🎙️ تكلّم…"; r.onresult = e => { const t = e.results[0][0].transcript; const ta = $("#mt-out", box); ta.value = (ta.value ? ta.value + " " : "") + t; }; r.onend = () => { dic.textContent = "🎤 أملِ بصوتك"; }; r.onerror = () => { dic.textContent = "🎤 أملِ بصوتك"; }; r.start(); };
    $("#mt-fix", box).onclick = async () => {
      const q = $("#mt-out", box).value.trim(); if (q.length < 8) return toast("اكتب جملة أو أكثر أوّلًا"); const b = $("#mt-fix", box); b.disabled = true; $("#mt-fb", box).innerHTML = `<p class="muted">المعلّم يقرأ…</p>`;
      try { const r = await fetch("/api/tutor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ q, mode: "correct", level: lv() }) }); const j = await r.json(); if (!r.ok) throw new Error(j.message || r.status);
        $("#mt-fb", box).innerHTML = `<div class="lx-tutor card">${esc(j.text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>")}</div><p class="muted small">أعد قراءة الجملة المصحّحة بصوت مسموع مرّتين.</p>`; addXP(5);
      } catch (e) { $("#mt-fb", box).innerHTML = `<p class="notice amber small">تعذّر التصحيح الآن: ${esc(e.message)}</p>`; }
      b.disabled = false;
    };
    $("#mt-end", box).onclick = () => onDone();
  }

  /* ---------- الجلسة اليومية ---------- */
  const STAGES = [["🔁", "مراجعة"], ["🧩", "قوالب"], ["🎧", "ترديد"], ["✍️", "إملاء"], ["🗣️", "إنتاج"]];
  function sessionView() {
    return `${topbar("#aprender/metodo", "▶ جلسة اليوم")}<div class="mt-steps" role="list">${STAGES.map(([ic, n], i) => `<span role="listitem" data-st="${i}">${ic} ${n}</span>`).join("")}</div><div id="mt-stage"></div>`;
  }
  function bindSession() {
    const box = $("#mt-stage"); const l = lv(); let lastSents = [];
    const mark = i => $$("[data-st]").forEach(s => { const k = +s.dataset.st; s.classList.toggle("mt-on", k === i); s.classList.toggle("mt-ok", k < i); });
    const head = (ic, t, d) => `<div class="card"><h2>${ic} ${t}</h2><p class="muted">${d}</p></div>`;
    const next = (i, label = "المحطّة التالية ←") => `<div class="lx-row"><button type="button" class="primary lx-big" data-next="${i}">${label}</button></div>`;
    const hook = () => $$("[data-next]", box).forEach(b => b.onclick = () => { shadowTok++; R.TTS.stop(true); stage(+b.dataset.next); scrollTo({ top: 0, behavior: "smooth" }); });
    function stage(i) {
      mark(i);
      if (i === 0) {
        const due = shuffle(Object.entries(P.srs).filter(([, v]) => v.d <= today()).map(([es, v]) => ({ es, ...v }))).slice(0, 10);
        const fresh = freqPool().filter(w => !P.srs[w.es]).slice(0, Math.max(0, 8 - due.length));
        const cards = [...due, ...fresh];
        box.innerHTML = head("🔁", "المراجعة والاسترجاع النشط", `${due.length ? `${due.length} كلمة حان موعد مراجعتها` : "لا كلمات مستحقّة اليوم"}${fresh.length ? ` + ${fresh.length} كلمات جديدة من الأكثر تكرارًا` : ""}. انظر إلى المعنى وقل الكلمة الإسبانية بصوت مسموع قبل أن تكشفها.`) + `<div id="mt-r"></div>`;
        if (!cards.length) { $("#mt-r").innerHTML = `<p class="notice small">أتممت كلّ الكلمات المتاحة لهذه المرحلة 👏</p>${next(1)}`; return hook(); }
        recall($("#mt-r"), cards, (ok, n) => { $("#mt-r").innerHTML = `<div class="lx-fb ok"><b>${ok} من ${n}</b> — ستعود إليك الكلمات في مواعيدها تلقائيًّا.</div>${next(1)}`; hook(); });
      }
      if (i === 1) {
        const topic = byDay(nearLv(L.PHRASES, l), "ph"); const ss = pick(topic.s.map(SNT), 6); lastSents = ss;
        box.innerHTML = head("🧩", `قوالب جاهزة: ${esc(topic.tar)}`, "عبارات كاملة يقولها الناس كما هي. استمع لكلّ جملة، ثم ردّدها في الفراغ الذي يليها. اضغط 🎤 لتتحقّق من نطقك.")
          + `<div class="card lx-row"><button type="button" class="primary" id="mt-play">▶ استمع وردّد</button><button type="button" id="mt-slow">🐢 ببطء</button></div><div class="card" id="mt-lines">${ss.map((s, k) => `<div class="lx-sent mt-line" data-li="${k}"><p class="lx-es" lang="es" dir="ltr">${esc(s.es)} ${sayBtns(s.es, SR ? `<button type="button" class="lx-ic" data-rep="${esc(s.es)}" title="انطقها">🎤</button>` : "")}</p>${tr(s.es)}<p class="lx-ar small">${esc(s.ar)}</p><span class="mt-turn small muted"></span><span class="lx-srz"></span></div>`).join("")}</div>`
          + `<div class="lx-row"><button type="button" id="mt-srs">🧠 أضفها إلى المراجعة</button></div>${next(2)}`;
        const rows = $$("#mt-lines .mt-line"); $("#mt-play").onclick = () => shadow(ss, rows); $("#mt-slow").onclick = () => shadow(ss, rows, { slow: true });
        $("#mt-srs").onclick = () => { let n = 0; ss.forEach(s => { if (!P.srs[s.es]) { P.srs[s.es] = { b: 0, d: dayAdd(today(), 1), ar: s.ar, em: "", u: topic.id }; n++; } }); save(); toast(n ? `أُضيفت ${n} جمل إلى المراجعة` : "موجودة في المراجعة"); };
        $("#mt-lines").addEventListener("click", async e => { const rp = e.target.closest("[data-rep]"); if (!rp) return; const s = await checkSpeech(rp.dataset.rep, rp, rp.closest(".mt-line").querySelector(".lx-srz")); rp.textContent = "🎤"; if (s >= 0.7) addXP(2); });
        hook();
      }
      if (i === 2) {
        const c = byDay(nearLv(DAILY_CONV(), l), "cv"); const ls = c.d.map(s => ({ who: s[0], es: s.slice(2).split("|")[0], ar: s.slice(2).split("|")[1] }));
        lastSents = lastSents.concat(pick(ls, 3));
        box.innerHTML = head("🎧", `ترديد حوار: ${esc(c.tar)}`, "تسمع كلّ سطر بصوت مختلف لكلّ متحدّث، ثم يتوقّف المشغّل لتكرّره بالإيقاع والنبرة نفسيهما. أعده مرّة ثانية مع إخفاء الترجمة.")
          + `<div class="card lx-row"><button type="button" class="primary" id="mt-play">▶ ابدأ الترديد</button><label class="small"><input type="checkbox" id="mt-ar"> أخفِ الترجمة</label><a class="btn" href="#aprender/conv/${c.id}">🎭 العب دورًا في هذا الحوار</a></div><div class="card" id="mt-lines">${lineRows(ls)}</div>${next(3)}`;
        const rows = $$("#mt-lines .mt-line"); $("#mt-play").onclick = async () => { if (await shadow(ls, rows)) addXP(8); };
        $("#mt-ar").onchange = e => $$("#mt-lines .lx-ar").forEach(x => x.hidden = e.target.checked); hook();
      }
      if (i === 3) {
        const list = pick(lastSents.filter(s => s.es.split(" ").length <= 12), 4).map(s => ({ type: "dict", es: s.es, ar: s.ar }));
        box.innerHTML = head("✍️", "إملاء", "استمع واكتب ما تسمعه. هذه جمل مرّت بك قبل قليل، فالإملاء هنا يثبّتها ويكشف ما لم تلتقطه أذنك.") + `<div id="mt-d"></div>`;
        if (!list.length) { $("#mt-d").innerHTML = next(4); return hook(); }
        runEx($("#mt-d"), list, (ok, n) => { $("#mt-d").innerHTML = `<div class="lx-fb ${ok >= n / 2 ? "ok" : "no"}"><b>${ok} من ${n}</b></div>${next(4)}`; hook(); });
      }
      if (i === 4) {
        box.innerHTML = head("🗣️", "تكلّم واكتب", "الإنتاج هو ما يحوّل ما تعرفه إلى ما تستطيع قوله. لا تخف من الخطأ؛ المعلّم يصحّح لك ويشرح بالعربية.") + `<div id="mt-o"></div>`;
        outputBox($("#mt-o"), finish);
      }
    }
    function finish() {
      const m = md(); const first = !m.days[today()]; m.days[today()] = 1; m.n = (m.n || 0) + 1; if (first) addXP(25); save();
      $$("[data-st]").forEach(s => { s.classList.remove("mt-on"); s.classList.add("mt-ok"); });
      box.innerHTML = `<div class="card lx-result"><div class="lx-em lx-pop">🏆</div><h2>أتممت جلسة اليوم!</h2><p>${first ? "+25 نقطة. " : ""}عدد جلساتك: ${Object.keys(m.days).length}. نلقاك غدًا إن شاء الله؛ الاستمرار هو السرّ.</p><div class="lx-row"><a class="btn primary" href="#aprender">العودة إلى الدورة</a><a class="btn" href="#aprender/metodo/sombra">🎧 ترديد إضافي</a></div></div>`;
    }
    stage(0);
    addEventListener("hashchange", () => { shadowTok++; }, { once: true });
  }

  L.EXT = L.EXT || {};
  L.EXT.metodo = (id, arg) => {
    const [, sub, x] = String(arg || "").split("/");
    if (sub === "sesion") return { html: sessionView(), bind: bindSession };
    if (sub === "sombra") return { html: shadowView(x), bind: () => bindShadow(x) };
    if (sub === "tarjetas") return { html: cardsView(), bind: bindCards };
    return { html: guide(), bind: () => { } };
  };
})();
