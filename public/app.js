"use strict";
/* رفيق الداعية — واجهة التطبيق */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fold = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[ً-ٰٟـ]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");
  const by = (arr, id) => arr.find(x => x.id === id) || {};
  const siLbl = id => by(RQ.SITU, id).ar || id;
  const stLbl = id => by(RQ.STAGES, id).ar || id;
  const auLbl = id => by(RQ.AUD, id).ar || id;
  const view = $("#view");

  /* ---------- settings ---------- */
  const S = Object.assign({ voice: "", arVoice: "", rate: 0.95, pitch: 1, engine: "neural", nvEs: "es-kore", nvAr: "ar-charon", showAr: true, favs: [], tone: "tu" }, (() => { try { return JSON.parse(localStorage.getItem("rafiq-settings") || "{}"); } catch (e) { return {}; } })());
  const saveS = () => { try { localStorage.setItem("rafiq-settings", JSON.stringify(S)); } catch (e) { } };

  /* ---------- toast & copy ---------- */
  function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2400); }
  async function copy(text, msg) {
    try { await navigator.clipboard.writeText(text); toast(msg || "نُسخ النص"); }
    catch (e) { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); toast(msg || "نُسخ النص"); } catch (x) { toast("تعذّر النسخ"); } ta.remove(); }
  }

  /* ---------- API ---------- */
  const apiCache = new Map();
  async function api(url) {
    if (apiCache.has(url)) return apiCache.get(url);
    const p = fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
    apiCache.set(url, p);
    try { return await p; } catch (e) { apiCache.delete(url); throw e; }
  }
  const quranUrl = (ref, t) => { const [s, a] = ref.split(":"); return `/api/quran/${encodeURIComponent(s)}/${encodeURIComponent(a)}?t=${encodeURIComponent(t || "spanish_garcia")}`; };
  const getQuran = (ref, t) => api(quranUrl(ref, t));
  const getHadith = id => api(`/api/hadith/${encodeURIComponent(id)}`);

  /* ---------- text registry for buttons ---------- */
  let REG = new Map(), regN = 0;
  const reg = o => { const k = "k" + (regN++); REG.set(k, o); return k; };

  /* ---------- TTS: natural (neural) voices from the server, browser voices as fallback ---------- */
  const NV = {
    es: [["es-kore", "كوري — إسبانيا", "F"], ["es-puck", "بَك — إسبانيا", "M"], ["es-sulafat", "سولافات — إسبانيا (دافئ)", "F"], ["es-iapetus", "إيابيتوس — إسبانيا (واضح)", "M"], ["mx-aoede", "إيودي — المكسيك", "F"], ["mx-charon", "كارون — المكسيك", "M"], ["la-leda", "ليدا — لاتين أمريكا (شابة)", "F"], ["la-achird", "أشيرد — لاتين أمريكا (ودود)", "M"], ["la-vindemiatrix", "فينديمياتريكس — لاتين أمريكا (هادئ)", "F"], ["la-orus", "أوروس — لاتين أمريكا (رصين)", "M"]],
    ar: [["ar-charon", "كارون — عربي فصيح", "M"], ["ar-kore", "كوري — عربي فصيح", "F"], ["ar-sadaltager", "سعد — عربي فصيح", "M"]]
  };
  const TTS = {
    ok: "speechSynthesis" in window, voices: [], paused: false, tok: 0, au: new Audio(), down: false, mode: "",
    init() {
      this.au.preload = "auto";
      fetch("/api/tts/voices").then(r => r.json()).then(j => { this.server = !!j.enabled; if (!j.enabled) this.down = true; document.dispatchEvent(new Event("voices")); }).catch(() => { this.down = true; });
      if (!this.ok) return;
      const load = () => { this.voices = speechSynthesis.getVoices(); document.dispatchEvent(new Event("voices")); };
      load(); speechSynthesis.addEventListener("voiceschanged", load);
    },
    neural() { return S.engine !== "browser" && !this.down; },
    nv(lang) { const id = lang === "ar" ? S.nvAr : S.nvEs; return NV[lang].some(v => v[0] === id) ? id : NV[lang][0][0]; },
    partner(id) { const v = NV.es.find(x => x[0] === id) || NV.es[0]; const pre = v[0].split("-")[0]; const same = NV.es.filter(x => x[0].split("-")[0] === pre && x[2] !== v[2]); return (same[0] || NV.es.find(x => x[2] !== v[2]))[0]; },
    list(lang) { return this.voices.filter(v => lang === "es" ? /^es([-_]|$)/i.test(v.lang) : /^ar([-_]|$)/i.test(v.lang)); },
    pick(lang) {
      const list = this.list(lang); const uri = lang === "es" ? S.voice : S.arVoice;
      const good = v => /natural|neural|online|google|premium|enhanced|siri/i.test(v.name);
      return list.find(v => v.voiceURI === uri) || list.find(v => good(v) && (lang !== "es" || /es[-_](ES|MX|US)/i.test(v.lang))) || list.find(good) || list.find(v => /es-ES|es_ES/i.test(v.lang) && lang === "es") || list[0] || null;
    },
    split(text) {
      const s = String(text).replace(/\s+/g, " ").match(/[^.!?…؟]+[.!?…؟]*["»”)]*\s*/g)?.map(x => x.trim()).filter(Boolean) || [String(text)];
      return s.flatMap(x => x.length <= 280 ? [x] : x.split(/(?<=[,;:،])\s+/).reduce((a, w) => { if (a.length && (a[a.length - 1] + " " + w).length <= 280) a[a.length - 1] += " " + w; else a.push(w); return a; }, []));
    },
    url(t, v) { return `/api/tts?v=${encodeURIComponent(v)}&t=${encodeURIComponent(t)}`; },
    /* speak(text, lang, onSentence, {voice, rate, quiet}) → Promise that resolves when finished */
    speak(text, lang = "es", onSentence, o = {}) {
      this.stop(true); const my = ++this.tok; const parts = this.split(text); if (!parts.length) return Promise.resolve();
      if (!o.quiet) { $("#player").hidden = false; $("#p-pause").textContent = "⏸"; }
      const rate = o.rate || Number(S.rate) || 0.9;
      const run = this.neural() ? this.playNeural(parts, o.voice || this.nv(lang), rate, onSentence, my).catch(e => { if (my !== this.tok) return; if (e && e.name === "NotAllowedError") return; this.down = true; toast("الصوت الطبيعي غير متاح الآن؛ نستعمل صوت المتصفح"); return this.playBrowser(parts.slice(e.at || 0), lang, rate, onSentence, my); })
        : this.playBrowser(parts, lang, rate, onSentence, my);
      return run.finally(() => { if (my === this.tok && !o.keep) this.done(); });
    },
    async playNeural(parts, voice, rate, onSentence, my) {
      this.mode = "neural";
      for (let i = 0; i < parts.length; i++) {
        if (my !== this.tok) return;
        if (parts[i + 1]) { const pre = new Audio(); pre.preload = "auto"; pre.src = this.url(parts[i + 1], voice); }
        $("#now-text").textContent = parts[i]; if (onSentence) onSentence(i);
        try {
          await new Promise((res, rej) => {
            const a = this.au; a.onended = res; a.onerror = () => rej(new Error("audio")); a.src = this.url(parts[i], voice);
            a.playbackRate = rate; a.defaultPlaybackRate = rate; if ("preservesPitch" in a) a.preservesPitch = true;
            a.play().catch(rej);
          });
        } catch (e) { e.at = i; throw e; }
      }
    },
    playBrowser(parts, lang, rate, onSentence, my) {
      this.mode = "browser";
      return new Promise(res => {
        if (!this.ok) { toast("متصفحك لا يدعم النطق الصوتي"); return res(); }
        speechSynthesis.cancel(); const voice = this.pick(lang);
        if (!voice && lang === "ar") toast("لا يوجد صوت عربي في متصفحك");
        parts.forEach((p, i) => {
          const u = new SpeechSynthesisUtterance(p);
          u.lang = voice ? voice.lang : (lang === "es" ? "es-ES" : "ar-SA"); if (voice) u.voice = voice;
          u.rate = rate; u.pitch = Number(S.pitch) || 1;
          u.onstart = () => { if (my !== this.tok) return; $("#now-text").textContent = p; if (onSentence) onSentence(i); };
          u.onend = u.onerror = () => { if (i === parts.length - 1) res(); };
          speechSynthesis.speak(u);
        });
      });
    },
    /* lines: [{text, lang, voice}] played one after another */
    async seq(lines, onLine) {
      this.stop(true); const my = ++this.tok; $("#player").hidden = false; $("#p-pause").textContent = "⏸";
      const rate = Number(S.rate) || 0.9;
      for (let i = 0; i < lines.length; i++) {
        if (my !== this.tok) return; if (onLine) onLine(i);
        const lang = lines[i].lang || "es", parts = this.split(lines[i].text), voice = lines[i].voice || this.nv(lang);
        if (this.neural()) { try { await this.playNeural(parts, voice, rate, null, my); } catch (e) { if (my !== this.tok || e.name === "NotAllowedError") return; this.down = true; await this.playBrowser(parts, lang, rate, null, my); } }
        else await this.playBrowser(parts, lang, rate, null, my);
      }
      if (my === this.tok) { if (onLine) onLine(lines.length); this.done(); }
    },
    done() { $("#player").hidden = true; $$("mark.speaking").forEach(m => m.replaceWith(...m.childNodes)); document.dispatchEvent(new Event("tts-end")); },
    stop(silent) { this.tok++; try { this.au.pause(); this.au.removeAttribute("src"); this.au.load(); } catch (e) { } if (this.ok) speechSynthesis.cancel(); if (!silent) this.done(); },
    toggle() {
      if (this.mode === "neural") { if (this.au.paused) { this.au.play().catch(() => { }); $("#p-pause").textContent = "⏸"; } else { this.au.pause(); $("#p-pause").textContent = "▶"; } return; }
      if (!this.ok) return; if (speechSynthesis.paused) { speechSynthesis.resume(); $("#p-pause").textContent = "⏸"; } else { speechSynthesis.pause(); $("#p-pause").textContent = "▶"; }
    }
  };
  TTS.init();
  $("#p-pause").onclick = () => TTS.toggle();
  $("#p-stop").onclick = () => TTS.stop();
  $("#p-rate").value = S.rate; $("#p-rate-out").textContent = Number(S.rate).toFixed(2) + "×";
  $("#p-rate").oninput = e => { S.rate = Number(e.target.value); $("#p-rate-out").textContent = S.rate.toFixed(2) + "×"; saveS(); syncRate(); TTS.au.playbackRate = S.rate; };
  function syncRate() { $$("[data-rate]").forEach(i => { i.value = S.rate; }); $$("[data-rate-out]").forEach(o => o.textContent = Number(S.rate).toFixed(2) + "×"); }

  /* ---------- reference widgets (QuranEnc / HadeethEnc) ---------- */
  function refsHTML(q = [], h = []) {
    if (!q.length && !h.length) return "";
    return `<div class="refs"><div class="row small">${q.map(r => `<button type="button" class="ref-btn" data-ref="q:${esc(r)}">📖 القرآن ${esc(r)}</button>`).join("")}${h.map(id => `<button type="button" class="ref-btn" data-ref="h:${esc(id)}">📜 حديث ${esc(id)}</button>`).join("")}</div><div class="ref-slot"></div></div>`;
  }
  function quranBox(d) {
    const es = d.ayahs.map(a => `${a.text}`).join(" ");
    const cite = `(Corán ${d.sura}:${d.from}${d.to > d.from ? "-" + d.to : ""}) — ${d.translation.title}, ${d.source}${d.translation.version ? " v" + d.translation.version : ""}`;
    const k = reg({ es: `${es}\n${cite}` });
    return `<div class="ref-box"><p class="ar-text quran" lang="ar">${d.ayahs.map(a => `${esc(a.arabic)} ﴿${a.aya}﴾`).join(" ")}</p>
      <p class="es-text" lang="es">${d.ayahs.map(a => `<sup>${a.aya}</sup> ${esc(a.text)}`).join(" ")}</p>
      ${d.ayahs.some(a => a.footnotes) ? `<details class="small"><summary>الحواشي</summary><p class="es-text small" lang="es">${esc(d.ayahs.map(a => a.footnotes).filter(Boolean).join(" "))}</p></details>` : ""}
      <p class="src">المصدر: <a href="${esc(d.url)}" rel="noopener" target="_blank">${esc(d.source)}</a> — ${esc(d.translation.title)}${d.translation.version ? " · الإصدار " + esc(d.translation.version) : ""}. النص منقول كما هو.</p>
      <div class="actions"><button type="button" data-act="say" data-k="${k}">🔊 استمع للترجمة</button><button type="button" data-act="copy" data-k="${k}">نسخ مع المصدر</button></div></div>`;
  }
  function hadithBox(d) {
    const es = `${d.intro ? d.intro + " " : ""}${d.text}`;
    const cite = `(${d.attribution} — ${d.grade}) Fuente: ${d.source}`;
    const k = reg({ es: `${es}\n${cite}`, ar: d.ar.text });
    return `<div class="ref-box"><p class="es-text" lang="es"><b>${esc(d.title)}</b></p>
      <p class="es-text" lang="es">${esc(es)}</p>
      <p class="small"><span class="grade">${esc(d.grade)}</span> · <span lang="es">${esc(d.attribution)}</span></p>
      ${d.ar.text ? `<p class="ar-text">${esc(d.ar.intro ? d.ar.intro + " " : "")}${esc(d.ar.text)} <span class="muted small">(${esc(d.ar.grade)} — ${esc(d.ar.attribution)})</span></p>` : ""}
      ${d.explanation ? `<details class="small"><summary>الشرح بالإسبانية والعربية</summary><p class="es-text small" lang="es">${esc(d.explanation)}</p>${d.ar.explanation ? `<p class="small" style="margin-top:8px">${esc(d.ar.explanation)}</p>` : ""}</details>` : ""}
      <p class="src">المصدر: <a href="${esc(d.url)}" rel="noopener" target="_blank">${esc(d.source)}</a>. النص والدرجة منقولان كما هما.</p>
      <div class="actions"><button type="button" data-act="say" data-k="${k}">🔊 استمع</button><button type="button" data-act="copy" data-k="${k}">نسخ مع المصدر</button></div></div>`;
  }
  async function toggleRef(btn) {
    const slot = btn.closest(".refs").querySelector(".ref-slot"); const ref = btn.dataset.ref;
    const ex = slot.querySelector(`[data-for="${CSS.escape(ref)}"]`);
    if (ex) { ex.remove(); btn.removeAttribute("aria-expanded"); return; }
    const box = document.createElement("div"); box.dataset.for = ref; box.innerHTML = '<p class="muted small">جارٍ الجلب من المصدر…</p>'; slot.appendChild(box); btn.setAttribute("aria-expanded", "true");
    try {
      const [kind, val] = [ref.slice(0, 1), ref.slice(2)];
      box.innerHTML = kind === "q" ? quranBox(await getQuran(val)) : hadithBox(await getHadith(val));
    } catch (e) {
      const [kind, val] = [ref.slice(0, 1), ref.slice(2)];
      const link = kind === "q" ? `https://quranenc.com/es/browse/spanish_garcia/${val.split(":")[0]}/${val.split(":")[1].split("-")[0]}` : `https://hadeethenc.com/es/browse/hadith/${val}`;
      box.innerHTML = `<p class="notice amber small">تعذّر جلب النص الآن. افتحه من المصدر مباشرة: <a href="${link}" target="_blank" rel="noopener">${kind === "q" ? "QuranEnc" : "HadeethEnc"}</a></p>`;
    }
  }
  async function composeWithRefs(o) {
    const out = [o.es];
    for (const r of o.q || []) { try { const d = await getQuran(r); out.push(`\n«${d.ayahs.map(a => a.text).join(" ")}» (Corán ${r}) — ${d.translation.title}, QuranEnc.com${d.translation.version ? " v" + d.translation.version : ""}`); } catch (e) { out.push(`\n(Corán ${r})`); } }
    for (const id of o.h || []) { try { const d = await getHadith(id); out.push(`\n«${d.text}» (${d.attribution}; ${d.grade}) — HadeethEnc.com`); } catch (e) { } }
    return out.join("\n");
  }

  /* ---------- cards ---------- */
  const wa = t => `https://wa.me/?text=${encodeURIComponent(t)}`;
  function actions(o, extra = "") {
    const k = reg(o);
    if (o.id) extra = `<button type="button" data-fav="${o.id}" aria-pressed="${S.favs.includes(o.id)}" title="حفظ في المفضلة">${S.favs.includes(o.id) ? "★ محفوظة" : "☆ احفظ"}</button>${/^m\d/.test(o.id) ? `<a class="btn" href="#tarjetas/${o.id}">🖼 بطاقة</a>` : ""}` + extra;
    return `<div class="actions"><button type="button" data-act="say" data-k="${k}">🔊 استمع</button>${o.ar ? `<button type="button" data-act="say-ar" data-k="${k}">🔊 المعنى</button>` : ""}<button type="button" data-act="copy" data-k="${k}">نسخ</button>${(o.q && o.q.length) || (o.h && o.h.length) ? `<button type="button" data-act="copyref" data-k="${k}">نسخ مع الآية والحديث</button>` : ""}<a class="btn" href="${wa(o.es)}" target="_blank" rel="noopener">واتساب</a>${extra}</div>`;
  }
  function msgCard(m, hl) {
    return `<article class="card lift${hl ? " hl" : ""}" id="${m.id}"><div class="row between"><h3>${esc(m.t)}</h3><span class="tags">${m.st.map(s => `<span class="tag gold">${esc(stLbl(s))}</span>`).join("")}</span></div>
      <p class="es-text" lang="es">${esc(m.es)}</p>${S.showAr ? `<p class="ar-text">${esc(m.ar)}</p>` : ""}
      <div class="tags">${m.si.map(s => `<span class="tag">${esc(siLbl(s))}</span>`).join("")}</div>
      ${refsHTML(m.q, m.h)}${actions({ id: m.id, es: m.es, ar: m.ar, q: m.q, h: m.h })}</article>`;
  }
  const warnCard = w => `<article class="card warn ${w.lvl}" id="${w.id}"><div class="row between"><h3>${esc(w.t)}</h3><span class="tag ${w.lvl === "red" ? "red" : "amber"}">${w.lvl === "red" ? "خط أحمر" : "تجنّب"}</span></div><p><b>لماذا؟</b> ${esc(w.why)}</p><p><b>البديل:</b> ${esc(w.instead)}</p>${refsHTML(w.q, w.h)}</article>`;

  /* ---------- views ---------- */
  const V = {};
  const head = (t, p) => `<div class="head"><h1>${t}</h1>${p ? `<p>${p}</p>` : ""}</div>`;

  V.inicio = () => {
    const day = Math.floor(Date.now() / 86400000); const m = RQ.MSG[day % RQ.MSG.length];
    return `<section class="hero"><h1>ماذا أمامك الآن؟</h1><p>اختر الموقف الذي تمر به مع محاورك، فيعطيك الموقع خطة ورسالة بالإسبانية مع معناها ونطقها، وآيات وأحاديث من مصادرها كما هي.</p>
      <div class="situ-grid">${RQ.SITU.map(s => `<a class="btn" href="#componer/${s.id}">${esc(s.ar)}</a>`).join("")}</div>
      <div class="row"><a class="btn primary" href="#componer">افتح المُركِّب</a><a class="btn" href="#analizar">الصق رسالة من المحاور</a><a class="btn" href="#guia">ابدأ من دليل الداعية</a></div></section>
      <a class="card lift learn-promo" href="#aprender"><span class="lp-ic">🗣️</span><span><b>تعلّم الإسبانية من الصفر إلى الاحتراف</b><br><span class="muted small">آلاف الكلمات والجمل من A1 إلى C1، وقسم للإسبانية الشرعية والدعوية، بأصوات طبيعية ومحادثات وتمارين واختبارات ومراجعة ذكية، لكل الأعمار.</span></span><span class="btn primary">ابدأ ←</span></a>
      <div class="lx-tiles">${[["#confianza", "🤝", "بناء الثقة", "8 مبادئ و5 مراحل وخطة شهر"], ["#preguntas", "❓", "أسئلة الباحثين", `${RQ.FAQ.length} سؤالًا بإجابات جاهزة`], ["#libros", "📚", "دليل كتب IslamHouse", `${RQ.BOOKS.length} كتابًا حسب المحاور`], ["#seguimiento", "🗓️", "متابعة المحاورين", "لا تنسَ أحدًا ولا تكرر رسالة"]].map(([h, ic, t, d]) => `<a class="lx-tile card lift" href="${h}"><span class="lx-tic">${ic}</span><b>${t}</b><span class="muted small">${d}</span></a>`).join("")}</div>
      <div class="stats">${[[RQ.MSG.length, "رسالة قصيرة"], [RQ.DLG.length, "قالب محادثة"], [RQ.ART.length, "مقالة قصيرة"], [RQ.COURSE.length, "لقاءً في المنهج"], [RQ.WARN.length, "تحذيرًا للداعية"]].map(s => `<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div>
      <div class="two"><div><h2 style="margin-bottom:10px">رسالة اليوم</h2>${msgCard(m)}</div>
      <div class="card"><h2>كيف يعمل الموقع؟</h2><ol class="steps"><li><b>المُركِّب</b> يفهم نوع محاورك ومرحلته وموقفه، ويجمع لك خطة ورسالة ومحادثة.</li><li><b>حلّل رسالة المحاور</b>: الصق ما كتبه بالإسبانية، فيكشف الموضوع ويحذّرك من المزالق.</li><li><b>النطق</b> بأكثر من لهجة إسبانية وبسرعة تتحكم فيها، للداعية مهما كانت خبرته.</li><li><b>المكتبة</b> تجلب الآيات من QuranEnc والأحاديث من HadeethEnc والكتب من IslamHouse.</li><li><b>التحذيرات</b> تحميك من المواضيع التي تُخسرك الباحث عن الحقيقة.</li></ol></div></div>`;
  };

  V.componer = (arg) => {
    const pre = arg && RQ.SITU.some(s => s.id === arg) ? arg : "";
    const sel = (id, arr, val, all) => `<select id="${id}">${all ? `<option value="">${all}</option>` : ""}${arr.map(a => `<option value="${a.id}"${a.id === val ? " selected" : ""}>${esc(a.ar)}</option>`).join("")}</select>`;
    return `${head("المُركِّب: خطة ورسالة حسب محاورك", "أجب عن خمسة أسئلة قصيرة، فيجمع الموقع لك خطة الحديث، والرسالة الأنسب، وقالب المحادثة، والمقالة، ولقاء المنهج، والتحذيرات. كل ذلك من نصوص مراجَعة ومصادر موثوقة، دون توليد آلي للنصوص الدينية.")}
      <form class="card" id="comp-form"><div class="form">
        <div class="field"><label for="c-aud">من هو المحاور؟</label>${sel("c-aud", RQ.AUD, "general")}</div>
        <div class="field"><label for="c-st">في أي مرحلة هو؟</label>${sel("c-st", RQ.STAGES, pre === "listo" ? "cerca" : pre === "primeros" || pre === "presion" ? "nuevo" : "contacto")}</div>
        <div class="field"><label for="c-si">ما الموقف أو السؤال؟</label>${sel("c-si", RQ.SITU, pre, "لا يوجد موقف محدد")}</div>
        <div class="field"><label for="c-ch">أين يدور الحديث؟</label><select id="c-ch"><option value="wa">رسالة واتساب أو تيليجرام</option><option value="cara">حديث وجهًا لوجه</option><option value="post">منشور عام</option></select></div>
        <div class="field"><label for="c-ex">خبرتك في الدعوة</label><select id="c-ex"><option value="beg">مبتدئ</option><option value="adv">لديّ خبرة</option></select></div>
      </div><div class="row" style="margin-top:14px"><button class="primary" type="submit">اجمع لي الخطة</button></div></form>
      <div id="comp-out"></div>`;
  };
  function composeResult() {
    const aud = $("#c-aud").value, st = $("#c-st").value, si = $("#c-si").value, ch = $("#c-ch").value, ex = $("#c-ex").value;
    const score = x => (si && x.si && x.si.includes(si) ? 5 : 0) + (x.st && x.st.includes(st) ? 3 : 0) + (x.au && x.au.includes(aud) ? 2 : 0) + (x.au && x.au.includes("general") ? .5 : 0);
    const msgs = RQ.MSG.map(m => [score(m), m]).filter(x => x[0] >= 3).sort((a, b) => b[0] - a[0]).slice(0, 3).map(x => x[1]);
    const dlg = RQ.DLG.map(d => [score(d), d]).sort((a, b) => b[0] - a[0])[0];
    const art = RQ.ART.map(a => [score(a), a]).sort((a, b) => b[0] - a[0])[0];
    const CM = { contacto: [1, 3], conocer: [2, 4, 6], dudas: [3, 5, 7], cerca: [11, 12], nuevo: [9, 8] };
    const SM = { jesus: 5, trinidad: 5, profeta: 6, coran: 7, dios: 3, proposito: 1, listo: 12, primeros: 9, curioso: 2, sufrimiento: 11, religiones: 4, practicas: 9 };
    const sessions = [...new Set([...(SM[si] ? [SM[si]] : []), ...CM[st]])].slice(0, 2).map(n => RQ.COURSE.find(c => c.n === n));
    const W = new Set(["w01", "w12"]);
    ({ jesus: ["w07"], trinidad: ["w07", "w02"], violencia: ["w04", "w06"], mujer: ["w06", "w11"], duelo: ["w03"], listo: ["w08"], presion: ["w15"], dios: ["w09"], coran: ["w13", "w10"], profeta: ["w10"], perdon: ["w03"] }[si] || []).forEach(w => W.add(w));
    ((RQ.WARN_BY_SITU || {})[si] || []).forEach(w => W.add(w));
    if (aud === "catolico" || aud === "protestante") { W.add("w02"); W.add("w07"); }
    if (aud === "nuevo" || st === "nuevo") W.add("w05");
    if (ex === "beg") { W.add("w10"); W.add("w15"); }
    W.add("w11");
    const chAdv = { wa: "رسالة واحدة قصيرة (أقل من 60 كلمة)، ثم سؤال واحد، ورابط واحد على الأكثر. انتظر رده قبل الرسالة التالية.", cara: "استعمل قالب المحادثة دليلًا لا نصًّا تقرؤه من الهاتف. احفظ الفكرة، وابتسم، واستمع أكثر.", post: "استعمل مقالة قصيرة أو رسالة مع آية، واذكر المصدر دائمًا، وتجنّب الجدل في التعليقات." }[ch];
    const exAdv = ex === "beg" ? "التزم بالنصوص الجاهزة كما هي، ولا تجتهد في الفتوى، وأحِل الأسئلة الصعبة إلى مختص." : "عدّل الصياغة بما يناسب محاورك، مع إبقاء الآيات والأحاديث كما هي من مصادرها.";
    $("#comp-out").innerHTML = `<div class="two"><div class="card"><h2>الخطة: ${esc(stLbl(st))}${si ? " · " + esc(siLbl(si)) : ""}</h2><ol class="steps">${RQ.PLAN[st].map(p => `<li>${esc(p)}</li>`).join("")}</ol><p class="notice small"><b>القناة:</b> ${esc(chAdv)}</p><p class="notice small"><b>لخبرتك:</b> ${esc(exAdv)}</p></div>
      <div class="card"><h2>احذر في هذا الموقف</h2>${[...W].map(id => by(RQ.WARN, id)).map(w => `<p><span class="tag ${w.lvl === "red" ? "red" : "amber"}">${w.lvl === "red" ? "خط أحمر" : "تجنّب"}</span> <a href="#avisos/${w.id}">${esc(w.t)}</a></p>`).join("")}</div></div>
      <h2>الرسالة الأنسب${msgs.length > 1 ? " وبدائلها" : ""}</h2>${msgs.length ? `<div class="grid">${msgs.map(m => msgCard(m)).join("")}</div>` : `<p class="notice amber">لا توجد رسالة جاهزة تطابق هذا الاختيار بدقة. جرّب تغيير المرحلة، أو استعمل قالب المحادثة أدناه.</p>`}
      <div class="two">${dlg ? `<div class="card"><h3>قالب المحادثة المقترح</h3><p><a href="#conversaciones/${dlg[1].id}">${esc(dlg[1].t)}</a></p><p class="muted small">${esc(dlg[1].goal)}</p></div>` : ""}
      ${art ? `<div class="card"><h3>مقالة قصيرة يمكن إرسالها</h3><p><a href="#articulos/${art[1].id}" lang="es">${esc(art[1].t)}</a></p><p class="muted small">${esc(art[1].tar)}</p></div>` : ""}</div>
      <div class="card"><h3>من المنهج</h3>${sessions.map(c => `<p><span class="num">${c.n}</span> <a href="#curso/${c.n}">${esc(c.tar)}</a> — <span lang="es" class="muted">${esc(c.t)}</span></p>`).join("")}${st === "nuevo" || aud === "nuevo" ? `<p><a href="#curso/nuevo">منهج المسلم الجديد: 8 دروس</a></p>` : ""}${(RQ.SERIES || []).filter(x => x.au === aud).map(x => `<p>سلسلة جاهزة: <a href="#ideas/series">${esc(x.t)}</a></p>`).join("")}</div>`;
    $("#comp-out").classList.add("fade"); $("#comp-out").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  V.analizar = () => `${head("حلّل رسالة المحاور", "الصق رسالته بالإسبانية كما وصلتك. يكشف الموقع الموضوع، ويقترح الرد والقالب، وينبّهك إلى المزالق. يعمل على جهازك دون إرسال النص إلى أي جهة.")}
    <div class="card"><div class="field"><label for="an-text">رسالة المحاور</label><textarea id="an-text" dir="auto" lang="es" placeholder="Ejemplo: Mi madre murió el año pasado y no entiendo por qué Dios permite el sufrimiento. ¿Los musulmanes creen en Jesús?"></textarea></div>
    <div class="row" style="margin-top:12px"><button class="primary" type="button" id="an-go">حلّل الرسالة</button><button type="button" id="an-say">🔊 استمع لنطقها</button><button type="button" class="gem-btn" data-gem-src="#an-text" data-gem-dir="es-ar" data-gem-out="#an-gem" hidden>✨ ترجمها عبر Gemini</button><a class="btn" id="an-tr" href="#" target="_blank" rel="noopener">ترجمها في Google</a><button type="button" id="an-sample">مثال</button></div></div>
    <div id="an-gem"></div><div id="an-out"></div>`;
  function analyze() {
    const raw = $("#an-text").value.trim(); if (!raw) { toast("الصق الرسالة أولًا"); return; }
    const f = " " + fold(raw) + " ";
    const found = RQ.DETECT.map(d => [d.w.filter(w => f.includes(fold(w))).length, d.si]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).map(x => x[1]);
    const warns = RQ.WARN.filter(w => w.kw.some(k => f.includes(fold(k))));
    if (found.includes("duelo") && /(murio|fallecio)/.test(f) && /(infierno|salv|cielo|paraiso)/.test(f)) { const w3 = by(RQ.WARN, "w03"); if (!warns.includes(w3)) warns.unshift(w3); }
    const top = found.slice(0, 4);
    const msgs = RQ.MSG.filter(m => m.si.some(s => top.includes(s))).sort((a, b) => top.indexOf(a.si.find(s => top.includes(s))) - top.indexOf(b.si.find(s => top.includes(s)))).slice(0, 3);
    const dlgs = RQ.DLG.filter(d => d.si.some(s => top.includes(s))).slice(0, 2);
    const out = $("#an-out");
    if (!found.length && !warns.length) { out.innerHTML = `<p class="notice">لم يتعرف الموقع على موضوع محدد. استعمل <a href="#componer">المُركِّب</a> واختر الموقف بنفسك، أو ابحث بكلمة من رسالته.</p>`; return; }
    out.innerHTML = `<div class="card"><h2>ما فهمه الموقع</h2><div class="chips">${top.map(s => `<a class="btn chip" href="#componer/${s}">${esc(siLbl(s))}</a>`).join("")}</div><p class="muted small">اضغط على الموقف لفتح الخطة الكاملة في المُركِّب.</p>
      ${warns.length ? `<h3>انتبه قبل أن ترد</h3>${warns.map(w => `<p><span class="tag ${w.lvl === "red" ? "red" : "amber"}">${w.lvl === "red" ? "خط أحمر" : "تجنّب"}</span> <b>${esc(w.t)}</b> — ${esc(w.instead)}</p>`).join("")}` : ""}</div>
      ${dlgs.length ? `<div class="card"><h3>قوالب محادثة مناسبة</h3>${dlgs.map(d => `<p><a href="#conversaciones/${d.id}">${esc(d.t)}</a> <span class="muted small">— ${esc(d.goal)}</span></p>`).join("")}</div>` : ""}
      ${msgs.length ? `<h2>ردود مقترحة</h2><div class="grid">${msgs.map(m => msgCard(m)).join("")}</div>` : ""}`;
    out.classList.add("fade");
  }

  V.mensajes = (arg) => {
    return `${head("الرسائل القصيرة", "رسائل جاهزة بالإسبانية مع معناها العربي. كل رسالة مرتبطة بآية أو حديث يُجلب من مصدره كما هو. استمع لها، وانسخها، أو أرسلها مباشرة.")}
      <div class="card"><div class="form"><div class="field"><label for="m-si">الموقف</label><select id="m-si"><option value="">الكل</option>${RQ.SITU.map(s => `<option value="${s.id}">${esc(s.ar)}</option>`).join("")}</select></div>
      <div class="field"><label for="m-st">المرحلة</label><select id="m-st"><option value="">الكل</option>${RQ.STAGES.map(s => `<option value="${s.id}">${esc(s.ar)}</option>`).join("")}</select></div>
      <div class="field"><label for="m-au">المحاور</label><select id="m-au"><option value="">الكل</option>${RQ.AUD.filter(a => a.id !== "general").map(s => `<option value="${s.id}">${esc(s.ar)}</option>`).join("")}</select></div>
      <div class="field"><label for="m-fav">المفضلة</label><select id="m-fav"><option value="">كل الرسائل</option><option value="1">المحفوظة فقط</option></select></div>
      <div class="field"><label for="m-ar">المعنى العربي</label><select id="m-ar"><option value="1"${S.showAr ? " selected" : ""}>ظاهر</option><option value="0"${!S.showAr ? " selected" : ""}>مخفي</option></select></div></div></div>
      <p class="muted small" id="m-count"></p><div class="grid" id="m-list"></div>`;
  };
  function renderMsgs(hl) {
    const si = $("#m-si").value, st = $("#m-st").value, au = $("#m-au").value, fv = $("#m-fav").value;
    const list = RQ.MSG.filter(m => (!si || m.si.includes(si)) && (!st || m.st.includes(st)) && (!au || m.au.includes(au)) && (!fv || S.favs.includes(m.id)));
    REG = new Map();
    $("#m-count").textContent = `${list.length} رسالة`;
    $("#m-list").innerHTML = list.map(m => msgCard(m, m.id === hl)).join("") || `<p class="empty">لا رسائل بهذه المرشحات.</p>`;
    if (hl && $("#" + hl)) $("#" + hl).scrollIntoView({ block: "center" });
  }

  V.conversaciones = (arg) => {
    const d = arg && RQ.DLG.find(x => x.id === arg);
    if (d) {
      return `<p><a href="#conversaciones">← كل القوالب</a></p>${head(esc(d.t), `<b>الهدف:</b> ${esc(d.goal)}`)}
        <div class="tags">${d.au.map(a => `<span class="tag">${esc(auLbl(a))}</span>`).join("")}${d.st.map(s => `<span class="tag gold">${esc(stLbl(s))}</span>`).join("")}</div>
        <div class="row"><button type="button" class="primary" data-act="say" data-k="${reg({ es: d.steps.filter(s => s.w === "da").map(s => s.es).join(" ") })}">🔊 استمع لكلام الداعية كاملًا</button></div>
        <div class="chat">${d.steps.map(s => { const k = reg({ es: s.es, ar: s.ar }); return `<div class="bubble ${s.w}"><span class="who">${s.w === "da" ? "أنت (الداعية)" : "المحاور"}</span><p class="es-text" lang="es">${esc(s.es)}</p><p class="small">${esc(s.ar)}</p>${s.note ? `<p class="note">${esc(s.note)}</p>` : ""}<div class="actions"><button type="button" data-act="say" data-k="${k}">🔊</button><button type="button" data-act="say-ar" data-k="${k}">🔊 عربي</button>${s.w === "da" ? `<button type="button" data-act="copy" data-k="${k}">نسخ</button>` : ""}</div></div>`; }).join("")}</div>
        <div class="card"><h3>نصوص للاستشهاد</h3>${refsHTML(d.q, d.h)}</div>
        <div class="card warn"><h3>تجنّب في هذه المحادثة</h3><ul class="steps">${d.avoid.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>`;
    }
    return `${head("قوالب المحادثات", "حوارات نموذجية لمواقف تتكرر، بالإسبانية مع المعنى العربي وإرشاد للداعية عند كل خطوة. استعملها دليلًا، وتصرّف بحسب محاورك.")}
      <div class="grid">${RQ.DLG.map(d => `<a class="card lift" href="#conversaciones/${d.id}" style="text-decoration:none;color:inherit"><h3>${esc(d.t)}</h3><p class="muted small">${esc(d.goal)}</p><div class="tags">${d.si.map(s => `<span class="tag">${esc(siLbl(s))}</span>`).join("")}${d.st.map(s => `<span class="tag gold">${esc(stLbl(s))}</span>`).join("")}</div></a>`).join("")}</div>`;
  };

  V.articulos = (arg) => {
    const a = arg && RQ.ART.find(x => x.id === arg);
    if (a) {
      const all = a.es.join("\n\n");
      return `<p><a href="#articulos">← كل المقالات</a></p><article class="card"><h1 lang="es" dir="ltr" style="text-align:start">${esc(a.t)}</h1><p class="muted">${esc(a.tar)}</p>
        ${a.es.map(p => `<p class="es-text big" lang="es">${esc(p)}</p>`).join("")}
        <div class="ar-text"><b>الخلاصة بالعربية:</b> ${esc(a.ar)}</div>${refsHTML(a.q, a.h)}${actions({ es: all, ar: a.ar, q: a.q, h: a.h })}
        <p class="muted small">نص مستقل أُعدّ بالاستعانة بمواد IslamHouse وQuranEnc وHadeethEnc، وليس إصدارًا منها.</p></article>`;
    }
    return `${head("مقالات قصيرة", "مقالات من ثلاث فقرات للمنشورات أو للإرسال لمن يريد أن يقرأ أكثر، مع خلاصة عربية للداعية.")}
      <div class="grid">${RQ.ART.map(a => `<a class="card lift" href="#articulos/${a.id}" style="text-decoration:none;color:inherit"><h3 lang="es" dir="ltr" style="text-align:start">${esc(a.t)}</h3><p class="muted small">${esc(a.tar)}</p><div class="tags">${a.si.map(s => `<span class="tag">${esc(siLbl(s))}</span>`).join("")}</div></a>`).join("")}</div>`;
  };

  /* library */
  const LIB = { tab: "quran", ihType: "books", ihPage: 1, hCat: null, hPage: 1 };
  V.biblioteca = (arg) => {
    if (arg && arg.startsWith("ih-")) { LIB.tab = "ih"; LIB.ihType = arg.slice(3); LIB.ihPage = 1; }
    else if (arg === "hadiz") LIB.tab = "hadith"; else if (arg === "coran") LIB.tab = "quran";
    return `${head("المكتبة الموثوقة", "تُجلب مباشرة من مصادرها: الآيات من QuranEnc.com، والأحاديث من HadeethEnc.com، والكتب والمقالات والمرئيات من IslamHouse.com. تُعرض كما هي مع المصدر.")}
      <div class="tabs">${[["quran", "📖 القرآن"], ["hadith", "📜 الأحاديث"], ["ih", "📚 IslamHouse بالإسبانية"]].map(t => `<button type="button" class="chip" data-lib="${t[0]}" aria-pressed="${LIB.tab === t[0]}">${t[1]}</button>`).join("")}</div><div id="lib-body"></div>`;
  };
  function renderLib() {
    $$("[data-lib]").forEach(b => b.setAttribute("aria-pressed", b.dataset.lib === LIB.tab));
    const body = $("#lib-body"); if (!body) return;
    if (LIB.tab === "quran") {
      const used = [...new Set([...RQ.MSG, ...RQ.ART, ...RQ.COURSE, ...RQ.DLG].flatMap(x => x.q || []))].sort((a, b) => { const [s1, a1] = a.split(":").map(parseFloat), [s2, a2] = b.split(":").map(parseFloat); return s1 - s2 || a1 - a2; });
      body.innerHTML = `<div class="card"><div class="form"><div class="field"><label for="qr">السورة:الآية</label><input type="text" id="qr" dir="ltr" placeholder="13:28 أو 94:5-6" value="13:28"></div>
        <div class="field"><label for="qt">الترجمة</label><select id="qt"><option value="spanish_garcia">محمد عيسى غارسيا</option><option value="spanish_montada_latin">مركز نور الدولي — أمريكا اللاتينية</option><option value="spanish_montada_eu">مركز نور الدولي</option></select></div></div>
        <div class="row" style="margin-top:12px"><button class="primary" type="button" id="q-go">اعرض الآية</button></div><div id="q-out" style="margin-top:12px"></div></div>
        <div class="card"><h3>الآيات المستعملة في الموقع</h3><div class="chips">${used.map(r => `<button type="button" class="chip" data-qref="${r}">${r}</button>`).join("")}</div></div>`;
      const go = async () => {
        const ref = $("#qr").value.trim().replace(/\s/g, ""); if (!/^\d{1,3}:\d{1,3}(-\d{1,3})?$/.test(ref)) { toast("اكتب المرجع هكذا: 13:28"); return; }
        $("#q-out").innerHTML = '<p class="muted">جارٍ الجلب…</p>';
        try { $("#q-out").innerHTML = quranBox(await getQuran(ref, $("#qt").value)); } catch (e) { $("#q-out").innerHTML = `<p class="notice amber">تعذّر الجلب. تأكد من رقم السورة والآية، أو حاول لاحقًا.</p>`; }
      };
      $("#q-go").onclick = go; $("#qr").onkeydown = e => { if (e.key === "Enter") go(); };
      $$("[data-qref]").forEach(b => b.onclick = () => { $("#qr").value = b.dataset.qref; go(); });
    } else if (LIB.tab === "hadith") {
      body.innerHTML = `<div class="card" id="h-cats"><p class="muted">جارٍ جلب التصنيفات…</p></div><div id="h-list"></div>`;
      api("/api/hadith/categories").then(cats => {
        $("#h-cats").innerHTML = `<h3>تصنيفات HadeethEnc بالإسبانية</h3><div class="chips">${cats.map(c => `<button type="button" class="chip" data-hcat="${esc(c.id)}" aria-pressed="${String(LIB.hCat) === String(c.id)}"><span lang="es">${esc(c.title)}</span> (${esc(c.hadeeths_count)})</button>`).join("")}</div>`;
        $$("[data-hcat]").forEach(b => b.onclick = () => { LIB.hCat = b.dataset.hcat; LIB.hPage = 1; $$("[data-hcat]").forEach(x => x.setAttribute("aria-pressed", x === b)); loadHList(); });
        if (LIB.hCat) loadHList();
      }).catch(() => { $("#h-cats").innerHTML = `<p class="notice amber">تعذّر الاتصال بـ HadeethEnc الآن. <a href="https://hadeethenc.com/es/home" target="_blank" rel="noopener">افتح الموقع مباشرة</a></p>`; });
    } else {
      body.innerHTML = `<div class="tabs">${[["books", "كتب"], ["articles", "مقالات"], ["videos", "مرئيات"], ["audios", "صوتيات"], ["fatwa", "فتاوى"]].map(t => `<button type="button" class="chip" data-iht="${t[0]}" aria-pressed="${LIB.ihType === t[0]}">${t[1]}</button>`).join("")}</div><div id="ih-out" style="margin-top:12px"></div>`;
      $$("[data-iht]").forEach(b => b.onclick = () => { LIB.ihType = b.dataset.iht; LIB.ihPage = 1; renderLib(); });
      loadIH();
    }
  }
  async function loadHList() {
    const out = $("#h-list"); out.innerHTML = '<p class="muted">جارٍ الجلب…</p>';
    try {
      const j = await api(`/api/hadith/list/${LIB.hCat}?page=${LIB.hPage}`); const m = j.meta || {};
      out.innerHTML = `<div class="card"><div style="display:grid;gap:8px">${(j.data || []).map(h => `<div class="refs"><div class="row"><button type="button" class="ref-btn" data-ref="h:${esc(h.id)}">📜 ${esc(h.id)}</button><span lang="es" class="es-text small">${esc(h.title)}</span></div><div class="ref-slot"></div></div>`).join("")}</div>
        <div class="pager"><button type="button" id="hp-prev"${LIB.hPage <= 1 ? " disabled" : ""}>السابق</button><span class="small">${LIB.hPage} / ${esc(m.last_page || 1)}</span><button type="button" id="hp-next"${LIB.hPage >= (m.last_page || 1) ? " disabled" : ""}>التالي</button></div></div>`;
      $("#hp-prev").onclick = () => { LIB.hPage--; loadHList(); }; $("#hp-next").onclick = () => { LIB.hPage++; loadHList(); };
    } catch (e) { out.innerHTML = `<p class="notice amber">تعذّر الجلب الآن.</p>`; }
  }
  async function loadIH() {
    const out = $("#ih-out"); out.innerHTML = '<p class="muted">جارٍ الجلب من IslamHouse…</p>';
    try {
      const j = await api(`/api/ih/${LIB.ihType}?page=${LIB.ihPage}`);
      out.innerHTML = `<p class="muted small">${j.total} مادة بالإسبانية · الصفحة ${j.page} من ${j.pages}</p><div class="grid">${j.items.map(it => `<article class="card"><h3 lang="es" dir="ltr" style="text-align:start"><a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.title)}</a></h3>
        ${it.authors.length ? `<p class="small muted" lang="es">${esc(it.authors.map(a => a.title).join(" · "))}</p>` : ""}
        ${it.description && it.description !== it.title ? `<p class="es-text small" lang="es">${esc(it.description.slice(0, 260))}${it.description.length > 260 ? "…" : ""}</p>` : ""}
        <div class="actions">${it.files.slice(0, 3).map(f => `<a class="btn" href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.ext || "ملف")}${f.size ? " · " + esc(f.size) : ""}</a>`).join("")}<button type="button" data-act="copy" data-k="${reg({ es: `${it.title}\n${it.url}\nFuente: IslamHouse.com` })}">نسخ الرابط</button></div></article>`).join("")}</div>
        <div class="pager"><button type="button" id="ip-prev"${j.page <= 1 ? " disabled" : ""}>السابق</button><span class="small">${j.page} / ${j.pages}</span><button type="button" id="ip-next"${j.page >= j.pages ? " disabled" : ""}>التالي</button></div>`;
      $("#ip-prev").onclick = () => { LIB.ihPage--; loadIH(); }; $("#ip-next").onclick = () => { LIB.ihPage++; loadIH(); };
    } catch (e) { out.innerHTML = `<p class="notice amber">تعذّر الاتصال بـ IslamHouse الآن. <a href="https://islamhouse.com/es/" target="_blank" rel="noopener">افتح الموقع مباشرة</a></p>`; }
  }

  /* pronunciation */
  const PHRASES = [
    ["Hola, ¿cómo estás? Encantado de conocerte.", "مرحبًا، كيف حالك؟ سعيد بالتعرف عليك."],
    ["¿Puedo hacerte una pregunta?", "هل يمكنني أن أسألك سؤالًا؟"],
    ["Es una muy buena pregunta.", "إنه سؤال جيد جدًا."],
    ["¿Qué sabes del islam?", "ماذا تعرف عن الإسلام؟"],
    ["No lo sé con seguridad; lo consultaré y te respondo.", "لا أعرف ذلك يقينًا؛ سأسأل وأجيبك."],
    ["Te entiendo, y respeto tu opinión.", "أفهمك، وأحترم رأيك."],
    ["En el islam creemos en un solo Dios.", "في الإسلام نؤمن بإله واحد."],
    ["Allah es la palabra árabe para Dios.", "«الله» هي الكلمة العربية للإله."],
    ["Los musulmanes amamos a Jesús y a su madre María.", "نحن المسلمين نحب عيسى وأمه مريم."],
    ["El Corán es la palabra de Dios.", "القرآن كلام الله."],
    ["¿Te gustaría leer un libro breve sobre esto?", "هل تحب أن تقرأ كتابًا مختصرًا عن هذا؟"],
    ["Que Dios te guíe y te dé paz.", "أسأل الله أن يهديك ويمنحك السكينة."],
    ["Lo siento mucho. Te acompaño en el sentimiento.", "أعزّيك من قلبي."],
    ["Gracias por tu tiempo; ha sido un placer hablar contigo.", "شكرًا على وقتك؛ سعدت بالحديث معك."],
    ["Atestiguo que no hay más dios que Allah, y atestiguo que Muhammad es el Mensajero de Allah.", "أشهد أن لا إله إلا الله، وأشهد أن محمدًا رسول الله."],
    ["Bienvenido al islam, hermano.", "مرحبًا بك في الإسلام يا أخي."]
  ];
  const DIALECTS = [["es-ES", "إسبانيا"], ["es-MX", "المكسيك"], ["es-US", "إسبان أمريكا"], ["es-AR", "الأرجنتين"], ["es-CO", "كولومبيا"], ["es-419", "أمريكا اللاتينية"]];
  V.pronunciar = () => `${head("مختبر النطق", "الصق أي نص إسباني لتسمعه بأكثر من لهجة وبالسرعة التي تناسبك، جملة جملة أو كاملًا. مفيد للداعية المبتدئ ليتدرب قبل أن يتكلم.")}
    <div class="two"><div class="card"><div class="field"><label for="pr-text">النص الإسباني</label><textarea id="pr-text" lang="es" dir="ltr">${esc(RQ.MSG[0].es)}</textarea></div>
      <div class="row" style="margin-top:10px"><button class="primary" type="button" id="pr-all">🔊 اقرأ كاملًا</button><button type="button" id="pr-next">▶ الجملة التالية</button><button type="button" id="pr-stop">⏹</button><button type="button" class="gem-btn" data-gem-src="#pr-text" data-gem-dir="es-ar" data-gem-out="#pr-gem" hidden>✨ المعنى عبر Gemini</button><a class="btn" id="pr-tr" href="#" target="_blank" rel="noopener">المعنى في Google</a></div><div id="pr-gem"></div>
      <div id="pr-sent" class="es-text" lang="es" style="margin-top:12px"></div></div>
    <div class="card"><h3>الصوت والسرعة</h3>
      <div class="field"><label for="v-eng">نوع الصوت</label><select id="v-eng"><option value="neural"${S.engine !== "browser" ? " selected" : ""}>أصوات بشرية طبيعية (موصى بها)</option><option value="browser"${S.engine === "browser" ? " selected" : ""}>أصوات المتصفح (تعمل دون إنترنت)</option></select></div>
      <div class="field"><label for="nv-es">الصوت الإسباني</label><select id="nv-es">${NV.es.map(v => `<option value="${v[0]}"${v[0] === TTS.nv("es") ? " selected" : ""}>${v[1]} (${v[2] === "F" ? "امرأة" : "رجل"})</option>`).join("")}</select></div>
      <div class="field"><span class="small" style="font-weight:700">جرّب الأصوات</span><div class="chips">${NV.es.map(v => `<button type="button" class="chip" data-nvtry="${v[0]}" aria-pressed="${v[0] === TTS.nv("es")}">${v[2] === "F" ? "👩" : "👨"} ${v[1].split(" — ")[1]} · ${v[1].split(" — ")[0]}</button>`).join("")}</div></div>
      <div class="field"><label for="nv-ar">الصوت العربي (للمعاني)</label><select id="nv-ar">${NV.ar.map(v => `<option value="${v[0]}"${v[0] === TTS.nv("ar") ? " selected" : ""}>${v[1]} (${v[2] === "F" ? "امرأة" : "رجل"})</option>`).join("")}</select></div>
      <div class="field"><label for="v-rate">السرعة</label><div class="row"><input type="range" id="v-rate" data-rate min="0.5" max="1.5" step="0.05" value="${S.rate}" style="flex:1"><output data-rate-out>${Number(S.rate).toFixed(2)}×</output></div></div>
      <details class="small"><summary>أصوات المتصفح (احتياطي عند انقطاع الإنترنت)</summary>
      <div class="field"><label for="v-es">صوت المتصفح الإسباني</label><select id="v-es"></select><small class="muted" id="v-count"></small></div>
      <div class="field"><span class="small" style="font-weight:700">لهجة سريعة</span><div class="chips" id="v-dial"></div></div>
      <div class="field"><label for="v-pitch">طبقة الصوت</label><input type="range" id="v-pitch" min="0.7" max="1.3" step="0.05" value="${S.pitch}"></div>
      <div class="field"><label for="v-ar">صوت المتصفح العربي</label><select id="v-ar"></select></div></details>
      <p class="muted small" id="v-note">الأصوات الطبيعية من نماذج Google Gemini الصوتية (بلهجات إسبانيا والمكسيك وأمريكا اللاتينية)، تُولَّد على الخادم مرة واحدة لكل جملة ثم تُحفظ. إذا لم تتوفر يستعمل الموقع أفضل صوت في متصفحك تلقائيًا؛ وأجود أصوات المتصفح المجانية في Microsoft Edge (الأصوات المسماة Natural).</p></div></div>
    <div class="card"><h3>عبارات يحتاجها الداعية</h3>${PHRASES.map(p => { const k = reg({ es: p[0], ar: p[1] }); return `<div class="phrase"><div><p class="es-text" lang="es">${esc(p[0])}</p><p class="small muted">${esc(p[1])}</p></div><div class="actions"><button type="button" data-act="say" data-k="${k}" aria-label="استمع">🔊</button><button type="button" data-act="copy" data-k="${k}">نسخ</button></div></div>`; }).join("")}</div>`;
  function bindPron() {
    const fillVoices = () => {
      const es = TTS.list("es"), ar = TTS.list("ar");
      $("#v-es").innerHTML = es.length ? es.map(v => `<option value="${esc(v.voiceURI)}"${v.voiceURI === (TTS.pick("es") || {}).voiceURI ? " selected" : ""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("") : `<option>لا توجد أصوات إسبانية في هذا المتصفح</option>`;
      $("#v-ar").innerHTML = ar.length ? ar.map(v => `<option value="${esc(v.voiceURI)}"${v.voiceURI === (TTS.pick("ar") || {}).voiceURI ? " selected" : ""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("") : `<option>لا يوجد صوت عربي</option>`;
      $("#v-count").textContent = TTS.ok ? `${es.length} صوتًا إسبانيًا متاحًا على جهازك` : "متصفحك لا يدعم النطق";
      const langs = new Set(es.map(v => v.lang.replace("_", "-")));
      $("#v-dial").innerHTML = DIALECTS.filter(d => langs.has(d[0])).map(d => `<button type="button" class="chip" data-dial="${d[0]}">${d[1]}</button>`).join("") || `<span class="muted small">لم تُكتشف لهجات متعددة</span>`;
      $$("[data-dial]").forEach(b => b.onclick = () => { const v = es.find(x => x.lang.replace("_", "-") === b.dataset.dial); if (v) { S.voice = v.voiceURI; saveS(); fillVoices(); TTS.speak("Hola, soy tu compañero de dawah.", "es"); } });
    };
    fillVoices(); document.addEventListener("voices", () => { if ($("#v-es")) fillVoices(); });
    $("#v-es").onchange = e => { S.voice = e.target.value; saveS(); };
    $("#v-ar").onchange = e => { S.arVoice = e.target.value; saveS(); };
    $("#v-rate").oninput = e => { S.rate = Number(e.target.value); saveS(); $("#p-rate").value = S.rate; $("#p-rate-out").textContent = S.rate.toFixed(2) + "×"; syncRate(); };
    $("#v-pitch").oninput = e => { S.pitch = Number(e.target.value); saveS(); };
    $("#v-eng").onchange = e => { S.engine = e.target.value; TTS.down = false; saveS(); TTS.speak("Hola, soy tu compañero de dawah.", "es"); };
    $("#nv-es").onchange = e => { S.nvEs = e.target.value; saveS(); $$("[data-nvtry]").forEach(b => b.setAttribute("aria-pressed", b.dataset.nvtry === S.nvEs)); TTS.speak("Hola, soy tu compañero de dawah. ¿Cómo estás?", "es"); };
    $("#nv-ar").onchange = e => { S.nvAr = e.target.value; saveS(); TTS.speak("السلام عليكم، أنا رفيقك في الدعوة.", "ar"); };
    $$("[data-nvtry]").forEach(b => b.onclick = () => { S.nvEs = b.dataset.nvtry; S.engine = "neural"; TTS.down = false; saveS(); $("#nv-es").value = S.nvEs; $("#v-eng").value = "neural"; $$("[data-nvtry]").forEach(x => x.setAttribute("aria-pressed", x === b)); TTS.speak("Hola, ¿qué tal? Es un placer hablar contigo.", "es"); });
    let idx = 0;
    const sents = () => TTS.split($("#pr-text").value);
    const showSent = i => { const s = sents(); $("#pr-sent").innerHTML = s.map((x, j) => j === i ? `<mark class="speaking">${esc(x)}</mark>` : esc(x)).join(" "); };
    const upd = () => { $("#pr-tr").href = `https://translate.google.com/?sl=es&tl=ar&op=translate&text=${encodeURIComponent($("#pr-text").value.slice(0, 4000))}`; };
    upd(); $("#pr-text").oninput = () => { idx = 0; upd(); $("#pr-sent").textContent = ""; };
    $("#pr-all").onclick = () => { TTS.speak($("#pr-text").value, "es", i => showSent(i)); };
    $("#pr-next").onclick = () => { const s = sents(); if (idx >= s.length) idx = 0; showSent(idx); TTS.speak(s[idx], "es"); idx++; };
    $("#pr-stop").onclick = () => { TTS.stop(); idx = 0; };
  }

  V.guia = () => `${head("دليل الداعية", "إرشادات مختصرة بالعربية على منهج أهل السنة والجماعة، لكل داعية مهما كانت خبرته.")}
    <div style="display:grid;gap:14px">${RQ.GUIDE.map(g => `<section class="card" id="${g.id}"><h2>${esc(g.t)}</h2><ul class="steps">${g.body.map(b => `<li>${esc(b)}</li>`).join("")}</ul>${refsHTML(g.q, g.h)}</section>`).join("")}</div>`;

  V.avisos = () => `${head("تحذيرات للداعية", "مواضيع وأخطاء تُخسر الباحث عن الحقيقة. الخطوط الحمراء لا تُتجاوز، والبقية تُؤجَّل أو تُعالج بحكمة.")}
    <div class="grid">${[...RQ.WARN].sort((a, b) => (a.lvl === "red" ? 0 : 1) - (b.lvl === "red" ? 0 : 1)).map(warnCard).join("")}</div>`;

  V.buscar = (arg) => {
    const q = decodeURIComponent(arg || ""); const f = fold(q).trim();
    if (!f) return `${head("بحث", "اكتب كلمة في مربع البحث بالأعلى.")}`;
    const hit = t => fold(t).includes(f);
    const R = [];
    RQ.MSG.forEach(m => { if (hit(m.t + " " + m.es + " " + m.ar)) R.push(["رسالة", m.t, `#mensajes/${m.id}`, m.es]); });
    RQ.ART.forEach(a => { if (hit(a.t + " " + a.tar + " " + a.es.join(" ") + " " + a.ar)) R.push(["مقالة", a.tar + " — " + a.t, `#articulos/${a.id}`, a.es[0]]); });
    RQ.DLG.forEach(d => { if (hit(d.t + " " + d.goal + " " + d.steps.map(s => s.es + " " + s.ar).join(" "))) R.push(["قالب محادثة", d.t, `#conversaciones/${d.id}`, d.goal]); });
    RQ.COURSE.forEach(c => { if (hit(c.t + " " + c.tar + " " + c.es + " " + c.ar)) R.push(["المنهج", `${c.n}. ${c.tar}`, `#curso/${c.n}`, c.es]); });
    RQ.WARN.forEach(w => { if (hit(w.t + " " + w.why + " " + w.instead)) R.push(["تحذير", w.t, `#avisos/${w.id}`, w.instead]); });
    RQ.GUIDE.forEach(g => { if (hit(g.t + " " + g.body.join(" "))) R.push(["دليل الداعية", g.t, `#guia/${g.id}`, g.body[0]]); });
    PHRASES.forEach(p => { if (hit(p[0] + " " + p[1])) R.push(["عبارة", p[1], "#pronunciar", p[0]]); });
    (RQ.NEWM || []).forEach(c => { if (hit(c.t + " " + c.tar + " " + c.es + " " + c.ar)) R.push(["منهج المسلم الجديد", `${c.n}. ${c.tar}`, `#curso/nuevo`, c.es]); });
    (RQ.TRAIN || []).forEach(c => { if (hit(c.t + " " + c.points.join(" "))) R.push(["دروس الداعية", `${c.n}. ${c.t}`, `#curso/dai`, c.points[0]]); });
    (RQ.IDEAS || []).forEach(c => { if (hit(c.t + " " + c.body)) R.push(["فكرة دعوية", c.t, `#ideas`, c.body]); });
    (RQ.FAQ || []).forEach(c => { if (hit(c.es + " " + c.ar + " " + c.aes + " " + c.aar)) R.push(["سؤال باحث", c.ar, `#preguntas/${c.id}`, c.aes]); });
    (RQ.QUOTES || []).forEach(c => { if (hit(c.es + " " + c.ar)) R.push(["مقتطف IslamHouse", qBook(c.b)[0], `#citas/${c.id}`, c.es]); });
    (RQ.BOOKS || []).forEach(c => { if (hit(c.t + " " + c.note)) R.push(["كتاب IslamHouse", c.t, `#libros`, c.note]); });
    return `${head(`نتائج البحث عن «${esc(q)}»`, `${R.length} نتيجة`)}${R.length ? `<div style="display:grid;gap:10px">${R.map(r => `<a class="card lift" href="${r[2]}" style="text-decoration:none;color:inherit"><div class="row"><span class="tag gold">${r[0]}</span><b>${esc(r[1])}</b></div><p class="es-text small muted" lang="es">${esc(String(r[3]).slice(0, 180))}</p></a>`).join("")}</div>` : `<p class="empty">لا نتائج. جرّب كلمة أخرى بالعربية أو الإسبانية، أو ابحث في <a href="#biblioteca">المكتبة</a>.</p>`}`;
  };

  /* ---------- curricula (3 tracks) ---------- */
  V.curso = (arg) => {
    const tab = arg === "nuevo" ? "nuevo" : arg === "dai" ? "dai" : "dawah";
    const tabs = `<div class="tabs">${[["dawah", "اكتشف الإسلام: 12 لقاءً", "#curso"], ["nuevo", "منهج المسلم الجديد: 8 دروس", "#curso/nuevo"], ["dai", "دروس الداعية: 8 دروس", "#curso/dai"]].map(t => `<a class="btn chip" href="${t[2]}" aria-pressed="${tab === t[0]}">${t[1]}</a>`).join("")}</div>`;
    if (tab === "nuevo") return `${head("منهج المسلم الجديد", "<span lang='es'>Curso para el nuevo musulmán</span> — ثمانية دروس قصيرة بالإسبانية مع المعنى العربي وتمرين عملي لكل درس، للرفيق الذي يتابع المسلم الجديد.")}${tabs}
      <div style="display:grid;gap:12px">${RQ.NEWM.map(c => { const k = reg({ es: c.es, ar: c.ar, q: c.q, h: c.h }); const kp = reg({ es: c.practice.es, ar: c.practice.ar }); return `<details class="card" id="n${c.n}"${c.n === 1 ? " open" : ""}><summary><span class="row"><span class="num">${c.n}</span><span><b>${esc(c.tar)}</b><br><span class="muted small" lang="es">${esc(c.t)}</span></span></span></summary>
        <p><b>الهدف:</b> ${esc(c.goal)}</p><p class="es-text big" lang="es">${esc(c.es)}</p><p class="ar-text">${esc(c.ar)}</p>
        <div class="actions"><button type="button" data-act="say" data-k="${k}">🔊 استمع</button><button type="button" data-act="say-ar" data-k="${k}">🔊 المعنى</button><button type="button" data-act="copyref" data-k="${k}">نسخ مع الآيات</button></div>
        <div class="notice small"><b>تمرين:</b> <span lang="es" class="es-text">${esc(c.practice.es)}</span><br>${esc(c.practice.ar)} <button type="button" data-act="copy" data-k="${kp}">نسخ</button></div>${refsHTML(c.q, c.h)}</details>`; }).join("")}</div>`;
    if (tab === "dai") return `${head("دروس الداعية", "ثمانية دروس تدريبية بالعربية لتأهيل الداعية، مع تمرين عملي لكل درس، على منهج أهل السنة والجماعة.")}${tabs}
      <div class="grid">${RQ.TRAIN.map(c => `<article class="card" id="t${c.n}"><div class="row"><span class="num">${c.n}</span><h3>${esc(c.t)}</h3></div><ul class="steps">${c.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul><p class="notice small"><b>تمرين:</b> ${esc(c.practice)}</p>${refsHTML(c.q, c.h)}</article>`).join("")}</div>`;
    return `${head("المنهج: اكتشف الإسلام في 12 لقاءً", "<span lang='es'>Descubre el islam en 12 encuentros</span> — منهج متدرج يبدأ بسؤال الغاية وينتهي بالشهادتين. لكل لقاء هدف وفكرة أساسية بالإسبانية، وسؤال تطرحه، ونصوص من مصادرها، ونوع مادة مقترحة من IslamHouse.")}${tabs}
    <div style="display:grid;gap:12px">${RQ.COURSE.map(c => { const k = reg({ es: c.es, ar: c.ar, q: c.q, h: c.h }); const kq = reg({ es: c.ask.es, ar: c.ask.ar }); return `<details class="card" id="c${c.n}"${String(c.n) === String(arg) ? " open" : ""}><summary><span class="row"><span class="num">${c.n}</span><span><b>${esc(c.tar)}</b><br><span class="muted small" lang="es">${esc(c.t)}</span></span></span></summary>
      <p><b>الهدف:</b> ${esc(c.goal)}</p><p class="es-text big" lang="es">${esc(c.es)}</p><p class="ar-text">${esc(c.ar)}</p>
      <div class="actions"><button type="button" data-act="say" data-k="${k}">🔊 استمع</button><button type="button" data-act="say-ar" data-k="${k}">🔊 المعنى</button><button type="button" data-act="copyref" data-k="${k}">نسخ مع الآيات</button></div>
      <div class="notice small"><b>سؤال تطرحه:</b> <span lang="es" class="es-text">${esc(c.ask.es)}</span><br>${esc(c.ask.ar)} <button type="button" data-act="say" data-k="${kq}">🔊</button></div>
      ${refsHTML(c.q, c.h)}<p class="small"><b>مادة مقترحة:</b> <a href="#biblioteca/ih-${c.ih}">${{ books: "كتاب", articles: "مقالة", videos: "فيديو", audios: "صوتية" }[c.ih]} من IslamHouse بالإسبانية</a> · <b>نصيحة:</b> ${esc(c.tip)}</p></details>`; }).join("")}</div>`;
  };

  /* ---------- ideas & series ---------- */
  V.ideas = () => `${head("أفكار دعوية وسلاسل جاهزة", "أفكار عملية مجرَّبة لفتح باب الحديث، وسلاسل رسائل يومية جاهزة لأنواع المحاورين.")}
    <div class="grid tight">${RQ.IDEAS.map(i => `<article class="card lift"><div class="row between"><h3>${esc(i.t)}</h3><span class="tag gold">${esc(i.tag)}</span></div><p>${esc(i.body)}</p>${i.link ? `<p><a href="${i.link}">افتح ←</a></p>` : ""}</article>`).join("")}</div>
    <h2 id="series">سلاسل رسائل جاهزة</h2><p class="muted">أرسل رسالة واحدة يوميًا، وانتظر رده قبل التالية، وأجب عن أسئلته أولًا.</p>
    <div style="display:grid;gap:12px">${RQ.SERIES.map(s => { const msgs = s.days.map(id => RQ.MSG.find(m => m.id === id)).filter(Boolean); const k = reg({ es: msgs.map((m, i) => `Día ${i + 1}:\n${m.es}`).join("\n\n") }); return `<details class="card"><summary><b>${esc(s.t)}</b></summary><div class="actions"><button type="button" data-act="copy" data-k="${k}">نسخ السلسلة كاملة</button></div><ol class="steps">${msgs.map((m, i) => { const km = reg({ es: m.es, ar: m.ar, q: m.q, h: m.h }); return `<li><b>اليوم ${i + 1}: ${esc(m.t)}</b><p class="es-text" lang="es">${esc(m.es)}</p><p class="small muted">${esc(m.ar)}</p><div class="actions"><button type="button" data-act="copy" data-k="${km}">نسخ</button><button type="button" data-act="copyref" data-k="${km}">مع الآية</button><button type="button" data-act="say" data-k="${km}">🔊</button><a class="btn" href="#tarjetas/${m.id}">🖼 بطاقة</a></div></li>`; }).join("")}</ol></details>`; }).join("")}</div>`;

  /* ---------- Gemini translation ---------- */
  let GEM = null;
  async function gemInit() {
    if (GEM === null) { try { GEM = await (await fetch("/api/translate/status")).json(); } catch (e) { GEM = { enabled: false }; } }
    $$(".gem-btn").forEach(b => b.hidden = !GEM.enabled);
    const n = $("#gem-note"); if (n) n.hidden = !!GEM.enabled;
  }
  async function gemTranslate(text, dir, tone) {
    const r = await fetch("/api/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, dir, tone }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.message || j.error || ("HTTP " + r.status));
    return j.text;
  }
  function gemBox(t, dir) {
    const toEs = dir === "ar-es"; const k = reg(toEs ? { es: t } : { es: t, ar: t });
    return `<div class="card fade"><div class="row between"><h3>ترجمة Gemini</h3><span class="tag gold">ترجمة آلية للمساعدة</span></div>
      <p class="${toEs ? "es-text big" : "ar-text"}" ${toEs ? 'lang="es"' : ""} dir="${toEs ? "ltr" : "rtl"}">${esc(t).replace(/\n/g, "<br>")}</p>
      <div class="actions">${toEs ? `<button type="button" data-act="say" data-k="${k}">🔊 استمع</button>` : `<button type="button" data-act="say-ar" data-k="${k}">🔊 استمع</button>`}<button type="button" data-act="copy" data-k="${k}">نسخ</button>${toEs ? `<a class="btn" href="${wa(t)}" target="_blank" rel="noopener">واتساب</a>` : ""}</div>
      <p class="muted small">راجع الترجمة قبل الإرسال. الآيات والأحاديث لا تُترجم آليًا؛ خذ نصوصها من «المكتبة» بترجمتها المعتمدة.</p></div>`;
  }
  async function runGem(b) {
    const src = $(b.dataset.gemSrc), out = $(b.dataset.gemOut); const text = (src.value || "").trim();
    if (!text) { toast("اكتب النص أولًا"); return; }
    b.disabled = true; out.innerHTML = '<p class="muted small">جارٍ الترجمة عبر Gemini…</p>';
    try { out.innerHTML = gemBox(await gemTranslate(text, b.dataset.gemDir, S.tone), b.dataset.gemDir); }
    catch (e) { out.innerHTML = `<p class="notice amber small">تعذّرت الترجمة: ${esc(e.message)}</p>`; }
    b.disabled = false;
  }
  V.traducir = () => `${head("مترجم الداعية", "ترجم رسالة المحاور من الإسبانية إلى العربية لتفهمها، أو اكتب ردك بالعربية ليُترجم إلى إسبانية طبيعية. يعمل بـ Gemini عبر مفتاحك، مع رابط Google بديلًا.")}
    <p class="notice amber" id="gem-note" hidden>ترجمة Gemini غير مفعّلة بعد: يلزم إضافة المتغير <code dir="ltr">GEMINI_API_KEY</code> في إعدادات الخدمة على Railway. رابط Google يعمل في الأثناء.</p>
    <div class="card"><div class="form"><div class="field"><label for="tr-dir">الاتجاه</label><select id="tr-dir"><option value="es-ar">من الإسبانية إلى العربية</option><option value="ar-es">من العربية إلى الإسبانية</option></select></div>
      <div class="field"><label for="tr-tone">مخاطبة المحاور بالإسبانية</label><select id="tr-tone"><option value="tu">ودّية (tú)</option><option value="usted">رسمية (usted)</option></select></div></div>
      <div class="field" style="margin-top:12px"><label for="tr-text">النص</label><textarea id="tr-text" dir="auto"></textarea></div>
      <div class="row" style="margin-top:12px"><button class="primary gem-btn" type="button" id="tr-go" data-gem-src="#tr-text" data-gem-dir="es-ar" data-gem-out="#tr-out" hidden>✨ ترجم عبر Gemini</button><a class="btn" id="tr-google" href="#" target="_blank" rel="noopener">ترجم في Google</a><button type="button" id="tr-say">🔊 استمع للنص</button></div></div>
    <div id="tr-out"></div>
    <div class="card"><h3>نصائح لترجمة دقيقة</h3><ul class="steps"><li>اكتب ردك بالعربية بجمل قصيرة واضحة؛ فتخرج الترجمة أدق.</li><li>الآيات والأحاديث لا تُترجم آليًا: انسخها من «المكتبة» بترجمتها المعتمدة ومصدرها.</li><li>اختر «رسمية» مع كبار السن ومن لا تعرفه، و«ودّية» مع الأصدقاء والشباب.</li><li>تأكد من الأسماء: Allah، Muhammad ﷺ، Jesús (la paz sea con él)، María.</li></ul></div>`;
  function bindTrad() {
    const upd = () => { const d = $("#tr-dir").value; $("#tr-go").dataset.gemDir = d; const [sl, tl] = d.split("-"); $("#tr-google").href = `https://translate.google.com/?sl=${sl}&tl=${tl}&op=translate&text=${encodeURIComponent($("#tr-text").value.slice(0, 4000))}`; $("#tr-text").setAttribute("lang", sl); };
    $("#tr-dir").onchange = upd; $("#tr-text").oninput = upd; $("#tr-tone").value = S.tone;
    $("#tr-tone").onchange = e => { S.tone = e.target.value; saveS(); }; upd();
    $("#tr-say").onclick = () => { const t = $("#tr-text").value.trim(); if (t) TTS.speak(t, $("#tr-dir").value.startsWith("es") ? "es" : "ar"); };
  }

  /* ---------- image cards ---------- */
  V.tarjetas = (arg) => `${head("صانع البطاقات", "حوّل أي رسالة إلى صورة جاهزة لحالة واتساب أو إنستغرام، مع نص الآية من ترجمتها المعتمدة ومصدرها.")}
    <div class="two"><div class="card"><div class="field"><label for="cd-msg">الرسالة</label><select id="cd-msg">${RQ.MSG.map(m => `<option value="${m.id}"${m.id === arg ? " selected" : ""}>${esc(m.t)}</option>`).join("")}<option value="custom">نص من عندي…</option></select></div>
      <div class="field" id="cd-custom-wrap" hidden><label for="cd-custom">النص الإسباني</label><textarea id="cd-custom" lang="es" dir="ltr" placeholder="Escribe aquí tu mensaje…"></textarea></div>
      <div class="form"><div class="field"><label for="cd-size">المقاس</label><select id="cd-size"><option value="1080x1350">منشور 4:5</option><option value="1080x1920">حالة أو ستوري</option><option value="1080x1080">مربع</option></select></div>
      <div class="field"><label for="cd-theme">الطابع</label><select id="cd-theme"><option value="green">أخضر وذهبي</option><option value="light">فاتح</option><option value="night">ليلي</option></select></div></div>
      <label class="row small" style="font-weight:600;margin-top:10px"><input type="checkbox" id="cd-verse" checked> أضف نص الآية من QuranEnc إن وُجدت</label>
      <label class="row small" style="font-weight:600"><input type="checkbox" id="cd-ar"> أضف المعنى العربي</label>
      <div class="field" style="margin-top:8px"><label for="cd-sign">توقيع اختياري</label><input type="text" id="cd-sign" dir="ltr" placeholder="t.me/CimsEspaniol"></div>
      <div class="row" style="margin-top:12px"><button class="primary" type="button" id="cd-dl">⬇ تنزيل الصورة</button><button type="button" id="cd-copy">نسخ النص</button></div></div>
      <div class="card"><canvas id="cd-canvas" style="width:100%;height:auto;border-radius:12px;border:1px solid var(--line)"></canvas><p class="muted small" id="cd-note"></p></div></div>`;
  const THEMES = {
    green: { a: "#0d5a46", b: "#063328", ink: "#ffffff", acc: "#d9b45a", muted: "rgba(255,255,255,.78)", pat: "rgba(255,255,255,.055)" },
    light: { a: "#f7f4ec", b: "#ebe4d2", ink: "#14231d", acc: "#8a6714", muted: "#4f6359", pat: "rgba(11,77,60,.06)" },
    night: { a: "#132033", b: "#0a111d", ink: "#f1f5f9", acc: "#e6c472", muted: "rgba(241,245,249,.75)", pat: "rgba(255,255,255,.045)" }
  };
  let cardTok = 0;
  async function drawCard() {
    const tok = ++cardTok;
    const id = $("#cd-msg").value; const m = RQ.MSG.find(z => z.id === id);
    $("#cd-custom-wrap").hidden = id !== "custom";
    const es = id === "custom" ? $("#cd-custom").value.trim() || "Escribe tu mensaje…" : m.es;
    let verse = null;
    if ($("#cd-verse").checked && m && m.q.length) {
      try { const d = await getQuran(m.q[0]); verse = { text: d.ayahs.map(a => a.text).join(" "), ref: `Corán ${m.q[0]}`, src: `${d.translation.title.replace(/^Spanish Translation\s*-\s*/i, "Trad. ")} · QuranEnc.com${d.translation.version ? " v" + d.translation.version : ""}` }; }
      catch (e) { verse = { text: "", ref: `Corán ${m.q[0]}`, src: "QuranEnc.com" }; }
    }
    try { await Promise.all([document.fonts.load('500 48px "Source Serif 4"'), document.fonts.load('italic 400 40px "Source Serif 4"'), document.fonts.load('700 40px "Cairo"')]); } catch (e) { }
    if (tok !== cardTok) return;
    const [W, H] = $("#cd-size").value.split("x").map(Number); const T = THEMES[$("#cd-theme").value];
    const c = $("#cd-canvas"); c.width = W; c.height = H; const x = c.getContext("2d");
    const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, T.a); g.addColorStop(1, T.b); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.strokeStyle = T.pat; x.lineWidth = 2; const step = 120;
    for (let yy = step / 2; yy < H; yy += step) for (let xx = step / 2; xx < W; xx += step) { x.beginPath(); for (let i = 0; i < 16; i++) { const r = i % 2 ? 22 : 46; const an = Math.PI / 8 * i; x.lineTo(xx + r * Math.cos(an), yy + r * Math.sin(an)); } x.closePath(); x.stroke(); }
    const pad = W * 0.09, maxW = W - pad * 2;
    const wrap = (text, font, mw) => { x.font = font; const out = []; let line = ""; for (const w of text.split(/\s+/)) { const t = line ? line + " " + w : w; if (x.measureText(t).width > mw && line) { out.push(line); line = w; } else line = t; } if (line) out.push(line); return out; };
    const showAr = $("#cd-ar").checked && m;
    let size = Math.round(W * 0.056), L, VL = [], AL = [], total = 0;
    for (; size >= 24; size -= 2) {
      L = wrap(es, `500 ${size}px "Source Serif 4", Georgia, serif`, maxW); total = L.length * size * 1.45;
      if (verse && verse.text) { VL = wrap(`«${verse.text}»`, `italic 400 ${Math.round(size * .8)}px "Source Serif 4", Georgia, serif`, maxW - 40); total += VL.length * size * .8 * 1.5 + size * 2.6; }
      if (showAr) { AL = wrap(m.ar, `600 ${Math.round(size * .7)}px Cairo, Tahoma, sans-serif`, maxW); total += AL.length * size * .7 * 1.75 + size * 1.2; }
      if (total <= H * 0.7) break;
    }
    let y = Math.max(pad * 1.3, (H - total) / 2);
    x.fillStyle = T.acc; x.fillRect(pad, y - size * 1.4, W * 0.12, 6);
    x.direction = "ltr"; x.textAlign = "left"; x.textBaseline = "alphabetic"; x.fillStyle = T.ink; x.font = `500 ${size}px "Source Serif 4", Georgia, serif`;
    L.forEach(l => { y += size * 1.45; x.fillText(l, pad, y); });
    if (verse && verse.text) {
      y += size * 1.2; const vs = Math.round(size * .8); const top = y;
      x.font = `italic 400 ${vs}px "Source Serif 4", Georgia, serif`; x.fillStyle = T.ink;
      VL.forEach(l => { y += vs * 1.5; x.fillText(l, pad + 40, y); });
      x.fillStyle = T.acc; x.fillRect(pad, top + vs * .4, 6, y - top);
      y += vs * 1.4; x.font = `600 ${Math.round(vs * .78)}px "Source Serif 4", Georgia, serif`; x.fillStyle = T.acc; x.fillText(`${verse.ref} — ${verse.src}`, pad + 40, y);
    }
    if (showAr) {
      y += size * 1.1; const as = Math.round(size * .7); x.direction = "rtl"; x.textAlign = "right"; x.font = `600 ${as}px Cairo, Tahoma, sans-serif`; x.fillStyle = T.muted;
      AL.forEach(l => { y += as * 1.75; x.fillText(l, W - pad, y); }); x.direction = "ltr"; x.textAlign = "left";
    }
    const sign = $("#cd-sign").value.trim();
    x.font = `600 ${Math.round(W * .026)}px "Source Serif 4", Georgia, serif`; x.fillStyle = T.acc; x.textAlign = "center";
    if (sign) x.fillText(sign, W / 2, H - pad * .7);
    $("#cd-note").textContent = verse && verse.text ? "نص الآية منقول كما هو من QuranEnc.com مع اسم الترجمة ورقم إصدارها." : (m && m.q.length && $("#cd-verse").checked ? "تعذّر جلب نص الآية؛ سيظهر المرجع فقط." : "");
  }
  function bindCard(arg) {
    if (arg && arg.startsWith("q:")) { const q = RQ.QUOTES.find(x => x.id === arg.slice(2)); if (q) { $("#cd-msg").value = "custom"; $("#cd-custom").value = `«${q.es}»`; $("#cd-sign").value = `${qBook(q.b)[0]} · IslamHouse.com`; $("#cd-verse").checked = false; } }
    ["#cd-msg", "#cd-size", "#cd-theme", "#cd-verse", "#cd-ar"].forEach(s => $(s).onchange = drawCard);
    let t; ["#cd-custom", "#cd-sign"].forEach(s => $(s).oninput = () => { clearTimeout(t); t = setTimeout(drawCard, 250); });
    $("#cd-dl").onclick = () => { $("#cd-canvas").toBlob(b => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `tarjeta-${$("#cd-msg").value}.png`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast("نُزّلت الصورة"); }, "image/png"); };
    $("#cd-copy").onclick = () => { const id = $("#cd-msg").value; const m = RQ.MSG.find(z => z.id === id); copy(id === "custom" ? $("#cd-custom").value : m.es); };
    drawCard();
  }

  /* ---------- scholarly review page ---------- */
  const REV_KEY = "rafiq-review";
  const loadRev = () => { try { return JSON.parse(localStorage.getItem(REV_KEY) || "{}"); } catch (e) { return {}; } };
  const saveRev = r => { try { localStorage.setItem(REV_KEY, JSON.stringify(r)); } catch (e) { } };
  function revItems() {
    return [
      ["الرسائل القصيرة", RQ.MSG.map(m => ({ id: m.id, t: m.t, es: m.es, ar: m.ar, q: m.q, h: m.h }))],
      ["المقالات", RQ.ART.map(a => ({ id: a.id, t: a.tar, es: a.es.join(" "), ar: a.ar, q: a.q, h: a.h }))],
      ["قوالب المحادثات", RQ.DLG.map(d => ({ id: d.id, t: d.t, es: d.steps.map(s => s.es).join(" ¶ "), ar: d.steps.map(s => s.ar).join(" ¶ "), q: d.q, h: d.h }))],
      ["منهج اكتشف الإسلام", RQ.COURSE.map(c => ({ id: "c" + c.n, t: c.tar, es: c.es, ar: c.ar, q: c.q, h: c.h }))],
      ["منهج المسلم الجديد", RQ.NEWM.map(c => ({ id: "n" + c.n, t: c.tar, es: c.es, ar: c.ar, q: c.q, h: c.h }))],
      ["دروس الداعية", RQ.TRAIN.map(c => ({ id: "t" + c.n, t: c.t, es: "", ar: c.points.join(" ¶ "), q: c.q, h: c.h }))],
      ["التحذيرات", RQ.WARN.map(w => ({ id: w.id, t: w.t, es: "", ar: w.why + " ¶ " + w.instead, q: w.q, h: w.h }))],
      ["دليل الداعية", RQ.GUIDE.map(g => ({ id: g.id, t: g.t, es: "", ar: g.body.join(" ¶ "), q: g.q, h: g.h }))]
    ];
  }
  V.revision = () => {
    const R = loadRev(); const groups = revItems(); const all = groups.flatMap(g => g[1]); const done = all.filter(i => R[i.id] && R[i.id].ok).length;
    return `${head("صفحة المراجعة العلمية", "لطالب العلم المراجِع: كل نص مؤلَّف في الموقع، وبجانبه نصوص الآيات والأحاديث المستشهد بها من مصادرها، ليتأكد أن الاستشهاد في محله. تُحفظ المراجعة في هذا المتصفح، ويمكن نسخ تقريرها وإرساله.")}
      <div class="card"><div class="row between"><b id="rv-count">روجع ${done} من ${all.length}</b><div class="row"><label class="row small" style="font-weight:600"><input type="checkbox" id="rv-pending"> غير المراجَع فقط</label><button type="button" id="rv-fetch" class="primary">اجلب نصوص كل المراجع</button><button type="button" id="rv-report">نسخ تقرير المراجعة</button></div></div><div class="progress-bar"><i id="rv-bar" style="width:${Math.round(done / all.length * 100)}%"></i></div><p class="muted small" id="rv-status"></p></div>
      ${groups.map(([name, items]) => `<h2>${name} <span class="muted small">(${items.length})</span></h2><div style="display:grid;gap:10px">${items.map(i => `<article class="card rv-item" data-rv="${i.id}"><div class="row between"><b>${esc(i.id)} · ${esc(i.t)}</b><label class="row small" style="font-weight:700"><input type="checkbox" data-rv-ok="${i.id}"${R[i.id] && R[i.id].ok ? " checked" : ""}> روجع وأُقرّ</label></div>
        ${i.es ? `<p class="es-text small" lang="es">${esc(i.es)}</p>` : ""}<p class="small">${esc(i.ar)}</p>
        <div class="small muted">المراجع: ${[...i.q.map(r => "القرآن " + r), ...i.h.map(h => "حديث " + h)].join(" · ") || "—"}</div><div class="rv-refs" data-q="${esc(i.q.join(","))}" data-h="${esc(i.h.join(","))}"></div>
        <input type="text" data-rv-note="${i.id}" placeholder="ملاحظة المراجع (اختياري)" value="${esc(R[i.id] && R[i.id].note || "")}"></article>`).join("")}</div>`).join("")}`;
  };
  function bindRev() {
    const R = loadRev(); const total = $$(".rv-item").length;
    const upd = () => { const d = Object.values(R).filter(v => v.ok).length; $("#rv-count").textContent = `روجع ${d} من ${total}`; $("#rv-bar").style.width = Math.round(d / total * 100) + "%"; };
    $$("[data-rv-ok]").forEach(c => c.onchange = () => { const id = c.dataset.rvOk; R[id] = Object.assign(R[id] || {}, { ok: c.checked }); saveRev(R); upd(); if ($("#rv-pending").checked && c.checked) c.closest(".rv-item").hidden = true; });
    $$("[data-rv-note]").forEach(i => i.onchange = () => { const id = i.dataset.rvNote; R[id] = Object.assign(R[id] || {}, { note: i.value.trim() }); saveRev(R); });
    $("#rv-pending").onchange = e => $$(".rv-item").forEach(a => a.hidden = e.target.checked && !!(R[a.dataset.rv] && R[a.dataset.rv].ok));
    $("#rv-report").onclick = () => { const lines = revItems().flatMap(([g, items]) => [`== ${g} ==`, ...items.map(i => `${R[i.id] && R[i.id].ok ? "✔" : "✗"} ${i.id} ${i.t}${R[i.id] && R[i.id].note ? " — " + R[i.id].note : ""}`)]); copy(`تقرير المراجعة العلمية — رفيق الداعية (${new Date().toISOString().slice(0, 10)})\n` + lines.join("\n"), "نُسخ تقرير المراجعة"); };
    $("#rv-fetch").onclick = async () => {
      const boxes = $$(".rv-refs"); const jobs = [];
      boxes.forEach(b => { b.innerHTML = ""; (b.dataset.q ? b.dataset.q.split(",") : []).forEach(r => jobs.push([b, "q", r])); (b.dataset.h ? b.dataset.h.split(",") : []).forEach(h => jobs.push([b, "h", h])); });
      let n = 0, fail = 0; $("#rv-fetch").disabled = true;
      const work = async () => { while (jobs.length) { const [b, kind, v, tries = 0] = jobs.shift(); try {
        if (kind === "q") { const d = await getQuran(v); b.insertAdjacentHTML("beforeend", `<div class="ref-box small"><b>📖 ${esc(v)}</b> <span class="ar-text quran" style="font-size:1.1rem">${esc(d.ayahs.map(a => a.arabic).join(" "))}</span><span class="es-text" lang="es">${esc(d.ayahs.map(a => a.text).join(" "))}</span><span class="src">${esc(d.translation.title)} v${esc(d.translation.version)}</span></div>`); }
        else { const d = await getHadith(v); b.insertAdjacentHTML("beforeend", `<div class="ref-box small"><b>📜 حديث ${esc(v)}: <span lang="es">${esc(d.title)}</span></b><p class="ar-text">${esc(d.ar.text)}</p><p class="es-text" lang="es">${esc(d.text)}</p><span class="grade">${esc(d.ar.grade || d.grade)} — ${esc(d.ar.attribution || d.attribution)}</span></div>`); }
      } catch (e) { if (tries < 2) { await new Promise(r => setTimeout(r, 4000)); jobs.push([b, kind, v, tries + 1]); continue; } fail++; b.insertAdjacentHTML("beforeend", `<div class="notice amber small">تعذّر جلب ${kind === "q" ? "الآية" : "الحديث"} ${esc(v)}</div>`); } n++; $("#rv-status").textContent = `جُلب ${n} مرجعًا${fail ? `، وتعذّر ${fail}` : ""}`; } };
      await Promise.all([work(), work(), work()]); $("#rv-fetch").disabled = false;
    };
  }

  /* ---------- v3: بناء الثقة، أسئلة الباحثين، دليل الكتب، متابعة المحاورين ---------- */
  const audLbl = id => (RQ.AUD.find(a => a.id === id) || { ar: id }).ar;
  V.confianza = () => { const T = RQ.TRUST; return `${head("بناء الثقة مع الباحث عن الإسلام", "الدعوة علاقة إنسانية قبل أن تكون معلومات. هذه مبادئ ومراحل عملية تساعدك على أن تكون أهلًا لثقة محاورك، مع عبارات إسبانية جاهزة لكل مبدأ.")}
    <h2>ثمانية مبادئ</h2><div class="grid">${T.principles.map((p, i) => { const k = reg({ es: p.es }); return `<article class="card"><div class="row"><span class="num">${i + 1}</span><h3>${esc(p.t)}</h3></div><p>${esc(p.body)}</p><p class="es-text" lang="es">«${esc(p.es)}» <button type="button" data-act="say" data-k="${k}">🔊</button><button type="button" data-act="copy" data-k="${k}">نسخ</button></p></article>`; }).join("")}</div>
    <h2>المراحل الخمس وما يناسب كل مرحلة</h2><div style="display:grid;gap:12px">${T.stages.map(s => `<details class="card"><summary><b>${esc(s.t)}</b> — <span class="muted">${esc(s.goal)}</span></summary><div class="two"><div><h4>افعل</h4><ul class="steps">${s.do.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div><div><h4>تجنّب</h4><ul class="steps">${s.dont.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div><p><a class="btn" href="#mensajes">رسائل هذه المرحلة</a> <a class="btn" href="#componer">المُركِّب</a></p></details>`).join("")}</div>
    <h2>خطة أول شهر</h2><div class="card"><ol class="steps">${T.plan.map(p => `<li><b>${esc(p[0])}:</b> ${esc(p[1])}</li>`).join("")}</ol><p><a class="btn primary" href="#seguimiento">افتح «متابعة المحاورين» لتطبيق الخطة</a></p></div>`; };

  V.preguntas = (arg) => `${head("أسئلة الباحثين عن الإسلام", "أكثر الأسئلة تكرارًا من غير المسلمين، مع إجابة قصيرة بالإسبانية جاهزة للإرسال، ومعناها بالعربية، ونصيحة للداعية، والآيات بأرقامها تُجلب من مصدرها. هذه إجابات مختصرة للبداية؛ ما تجاوزها فيُحال إلى أهل العلم.")}
    <div class="row"><input type="search" id="fq-q" placeholder="ابحث في الأسئلة…" dir="auto" style="flex:1"></div>
    <div id="fq-list" style="display:grid;gap:12px;margin-top:12px">${RQ.FAQ.map(f => `<article class="card${f.id === arg ? " hl" : ""}" id="${f.id}" data-fq="${esc((f.es + " " + f.ar + " " + f.aes + " " + f.aar).toLowerCase())}"><h3><span lang="es" dir="ltr">${esc(f.es)}</span><br><span class="muted small">${esc(f.ar)}</span></h3>
      <p class="es-text" lang="es">${esc(f.aes)}</p><p class="ar-text">${esc(f.aar)}</p><p class="notice small">💡 ${esc(f.tip)}</p>${refsHTML(f.q || [], f.h || [])}${actions({ es: `${f.es}\n${f.aes}`, ar: f.aar, q: f.q || [], h: f.h || [] })}</article>`).join("")}</div>`;

  const LS_BOOKS = "rafiq-books-sent";
  V.libros = () => `${head("دليل كتب IslamHouse للداعية", "مختارات من كتب IslamHouse.com الإسبانية المجانية، مرتبة حسب المحاور ومرحلة الحوار، مع رسالة إسبانية قصيرة جاهزة لمرافقة الرابط. العناوين والروابط من IslamHouse كما هي؛ والملاحظة والرسالة من إعداد الموقع.")}
    <div class="card"><div class="form"><div class="field"><label for="bk-aud">المحاور</label><select id="bk-aud"><option value="">الجميع</option>${RQ.AUD.map(a => `<option value="${a.id}">${esc(a.ar)}</option>`).join("")}</select></div><div class="field"><label for="bk-lvl">المرحلة</label><select id="bk-lvl"><option value="">الكل</option>${[...new Set(RQ.BOOKS.map(b => b.lvl))].map(l => `<option>${l}</option>`).join("")}</select></div></div>
    <p class="notice small">ابدأ بكتب «أول تواصل» و«تعريف». كتب «مقارنة» لا تُرسل إلا لمن طلب المقارنة بنفسه وبعد بناء الثقة.</p></div>
    <div id="bk-reader" style="margin-top:12px"></div>
    <div id="bk-list" class="grid" style="margin-top:12px"></div>
    <p class="muted small">للمزيد: تصفّح كل الكتب الإسبانية (285 كتابًا) في <a href="#biblioteca">المكتبة</a>.</p>`;
  function bindLibros() {
    let sent = {}; try { sent = JSON.parse(localStorage.getItem(LS_BOOKS) || "{}"); } catch (e) { }
    const render = () => { const a = $("#bk-aud").value, l = $("#bk-lvl").value; const list = RQ.BOOKS.filter(b => (!a || b.aud.includes(a)) && (!l || b.lvl === l));
      $("#bk-list").innerHTML = list.map(b => { const url = `https://islamhouse.com/es/books/${b.id}/`; const msg = (RQ.BOOK_MSG[b.lvl] || "") + url; const k = reg({ es: msg }); return `<article class="card"><div class="row between"><span class="tag gold">${esc(b.lvl)}</span>${sent[b.id] ? `<span class="tag">أُرسل ${esc(sent[b.id])}</span>` : ""}</div><h3 lang="es" dir="ltr" style="text-align:left">📘 ${esc(b.t)}</h3><p class="small">${esc(b.note)}</p><p class="small muted">يناسب: ${b.aud.map(audLbl).join("، ")}</p><p class="es-text small" lang="es">${esc(msg)}</p><div class="actions"><button type="button" data-read="${b.id}">📖 اقرأ هنا واقتبس</button><a class="btn" href="${url}" target="_blank" rel="noopener">افتح في IslamHouse</a><button type="button" data-act="copy" data-k="${k}">نسخ الرسالة مع الرابط</button><a class="btn" href="${wa(msg)}" target="_blank" rel="noopener">واتساب</a><button type="button" data-sent="${b.id}">✔ أرسلته</button></div></article>`; }).join("") || `<p class="muted">لا كتب لهذا الاختيار.</p>`;
      $$("[data-read]").forEach(x => x.onclick = () => openReader(x.dataset.read, $("#bk-reader")));
      $$("[data-sent]").forEach(x => x.onclick = () => { sent[x.dataset.sent] = new Date().toLocaleDateString("ar-SA-u-nu-latn"); try { localStorage.setItem(LS_BOOKS, JSON.stringify(sent)); } catch (e) { } render(); toast("سُجّل الإرسال"); }); };
    $("#bk-aud").onchange = render; $("#bk-lvl").onchange = render; render();
  }

  /* متابعة المحاورين: تُحفظ في هذا الجهاز فقط */
  const LS_CT = "rafiq-contacts";
  const loadCt = () => { try { return JSON.parse(localStorage.getItem(LS_CT) || "[]"); } catch (e) { return []; } };
  const saveCt = c => { try { localStorage.setItem(LS_CT, JSON.stringify(c)); } catch (e) { } };
  const dIso = (n = 0) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toLocaleDateString("en-CA"); };
  V.seguimiento = () => `${head("متابعة المحاورين", "سجلّ بسيط لمن تحاورهم: المرحلة، والاهتمامات، وآخر تواصل، وموعد التواصل التالي، مع اقتراح الرسالة المناسبة. البيانات محفوظة في جهازك فقط ولا تُرسل لأي جهة؛ استعمل اسمًا مستعارًا أو الاسم الأول فقط.")}
    <div class="card"><h3>إضافة محاور</h3><form id="ct-form" class="form"><div class="field"><label for="ct-n">الاسم (أو اسم مستعار)</label><input id="ct-n" required maxlength="40"></div>
      <div class="field"><label for="ct-a">النوع</label><select id="ct-a">${RQ.AUD.map(a => `<option value="${a.id}">${esc(a.ar)}</option>`).join("")}</select></div>
      <div class="field"><label for="ct-s">المرحلة</label><select id="ct-s">${RQ.STAGES.map(s => `<option value="${s.id}">${esc(s.ar)}</option>`).join("")}</select></div>
      <div class="field"><label for="ct-i">اهتماماته أو أسئلته</label><input id="ct-i" maxlength="120" placeholder="مثال: يسأل عن عيسى، يحب التاريخ"></div>
      <div class="field"><label for="ct-d">التواصل التالي</label><input type="date" id="ct-d" value="${dIso(3)}"></div>
      <div class="field" style="align-self:end"><button class="primary" type="submit">أضف</button></div></form></div>
    <div class="row between" style="margin-top:12px"><b id="ct-sum"></b><span class="row"><button type="button" id="ct-exp">⬇ تصدير</button><label class="btn">⬆ استيراد<input type="file" id="ct-imp" accept="application/json" hidden></label></span></div>
    <div id="ct-list" style="display:grid;gap:10px;margin-top:10px"></div>`;
  function bindSeguimiento() {
    let C = loadCt();
    const sugg = c => { const used = new Set(c.sent || []); return RQ.MSG.filter(m => m.st.includes(c.st) && m.au.includes(c.au) && !used.has(m.id)).slice(0, 3); };
    const render = () => {
      const t = dIso(); C.sort((a, b) => (a.next || "9") < (b.next || "9") ? -1 : 1); const due = C.filter(c => c.next && c.next <= t).length;
      $("#ct-sum").textContent = C.length ? `${C.length} محاورًا · ${due} يحتاجون تواصلًا اليوم` : "لا يوجد محاورون بعد.";
      $("#ct-list").innerHTML = C.map((c, i) => { const s = sugg(c); return `<article class="card${c.next && c.next <= t ? " hl" : ""}"><div class="row between"><h3>${esc(c.n)} <span class="tag">${esc(audLbl(c.au))}</span> <span class="tag gold">${esc(stLbl(c.st))}</span></h3><span class="small ${c.next && c.next <= t ? "" : "muted"}">${c.next && c.next <= t ? "⏰ موعد التواصل اليوم" : "التالي: " + esc(c.next || "—")}</span></div>
        ${c.i ? `<p class="small">${esc(c.i)}</p>` : ""}<p class="small muted">آخر تواصل: ${esc(c.last || "—")} · أُرسل له: ${(c.sent || []).length} رسالة</p>
        <div class="small"><b>رسائل مقترحة لم تُرسل له:</b> ${s.map(m => `<button type="button" class="chip" data-ctm="${i}|${m.id}">${esc(m.t)}</button>`).join(" ") || "—"}</div>
        <div class="actions"><button type="button" data-ctdone="${i}">✔ تواصلت اليوم (+3 أيام)</button><select data-ctst="${i}">${RQ.STAGES.map(st => `<option value="${st.id}"${st.id === c.st ? " selected" : ""}>${esc(st.ar)}</option>`).join("")}</select><a class="btn" href="#componer">المُركِّب</a><button type="button" data-ctdel="${i}">حذف</button></div></article>`; }).join("");
    };
    $("#ct-form").onsubmit = e => { e.preventDefault(); C.push({ n: $("#ct-n").value.trim(), au: $("#ct-a").value, st: $("#ct-s").value, i: $("#ct-i").value.trim(), next: $("#ct-d").value, last: "", sent: [] }); saveCt(C); e.target.reset(); $("#ct-d").value = dIso(3); render(); toast("أُضيف"); };
    $("#ct-list").addEventListener("click", e => {
      const m = e.target.closest("[data-ctm]"); if (m) { const [i, id] = m.dataset.ctm.split("|"); const msg = RQ.MSG.find(x => x.id === id); copy(msg.es, "نُسخت الرسالة؛ سُجّلت له"); const c = C[+i]; c.sent = [...(c.sent || []), id]; c.last = dIso(); c.next = dIso(3); saveCt(C); render(); return; }
      const d = e.target.closest("[data-ctdone]"); if (d) { const c = C[+d.dataset.ctdone]; c.last = dIso(); c.next = dIso(3); saveCt(C); render(); return; }
      const x = e.target.closest("[data-ctdel]"); if (x) { if (x.dataset.confirm) { C.splice(+x.dataset.ctdel, 1); saveCt(C); render(); } else { x.dataset.confirm = 1; x.textContent = "تأكيد الحذف"; } }
    });
    $("#ct-list").addEventListener("change", e => { const s = e.target.closest("[data-ctst]"); if (s) { C[+s.dataset.ctst].st = s.value; saveCt(C); render(); } });
    $("#ct-exp").onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(C)], { type: "application/json" })); a.download = `rafiq-seguimiento-${dIso()}.json`; a.click(); };
    $("#ct-imp").onchange = async e => { try { const j = JSON.parse(await e.target.files[0].text()); if (!Array.isArray(j)) throw 0; C = j; saveCt(C); render(); toast("استُورد"); } catch (er) { toast("ملف غير صالح"); } };
    render();
  }

  /* ---------- مقتطفات IslamHouse وقارئ الكتب ---------- */
  const qBook = id => RQ.QBOOKS[id] || ["IslamHouse", "books", ""];
  const qUrl = q => `https://islamhouse.com/es/${qBook(q.b)[1]}/${q.b}/`;
  const qCite = q => `${q.es}\n— «${qBook(q.b)[0]}», IslamHouse.com: ${qUrl(q)}`;
  V.citas = (arg) => `${head("مقتطفات من كتب IslamHouse", "نصوص قصيرة منقولة حرفيًّا من كتب IslamHouse.com الإسبانية، جاهزة للإرسال مع مصدرها، مصنفة حسب الموضوع ومرحلة الحوار. المعنى العربي ترجمة تقريبية من إعداد الموقع للمساعدة على الفهم. ولتقتبس بنفسك من أي كتاب افتح «دليل الكتب» واضغط «اقرأ هنا».")}
    <div class="card"><div class="form"><div class="field"><label for="ct-t">الموضوع</label><select id="qt-t"><option value="">الكل</option>${Object.entries(RQ.QTOPICS).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select></div><div class="field"><label for="qt-l">المرحلة</label><select id="qt-l"><option value="">الكل</option><option>بداية</option><option>تعريف</option><option>تعمق</option></select></div></div>
    <p class="notice small">«بداية» للتعارف الأول، و«تعريف» بعد أن يسأل، و«تعمق» بعد بناء الثقة.</p></div>
    <div id="qt-list" style="display:grid;gap:12px;margin-top:12px"></div>`;
  function bindCitas(arg) {
    const render = () => { const t = $("#qt-t").value, l = $("#qt-l").value; $("#qt-list").innerHTML = RQ.QUOTES.filter(q => (!t || q.topic === t) && (!l || q.lvl === l)).map(q => { const k = reg({ es: qCite(q), ar: q.ar }); const ks = reg({ es: q.es }); return `<article class="card${q.id === arg ? " hl" : ""}" id="${q.id}"><div class="row between"><span class="tag">${esc(RQ.QTOPICS[q.topic])}</span><span class="tag gold">${esc(q.lvl)}</span></div>
      <blockquote class="es-text big" lang="es">«${esc(q.es)}»</blockquote><p class="small muted">— <a href="${qUrl(q)}" target="_blank" rel="noopener" lang="es">${esc(qBook(q.b)[0])}</a>، IslamHouse.com</p>
      <p class="ar-text small"><span class="muted">المعنى (ترجمة تقريبية):</span> ${esc(q.ar)}</p><p class="notice small">💡 ${esc(q.note)}</p>
      <div class="actions"><button type="button" data-act="say" data-k="${ks}">🔊 استمع</button><button type="button" data-act="copy" data-k="${k}">نسخ مع المصدر</button><a class="btn" href="${wa(qCite(q))}" target="_blank" rel="noopener">واتساب</a><a class="btn" href="#tarjetas/q:${q.id}">🖼 بطاقة</a></div></article>`; }).join(""); };
    $("#qt-t").onchange = render; $("#qt-l").onchange = render; render();
    if (arg && $("#" + CSS.escape(arg))) $("#" + CSS.escape(arg)).scrollIntoView({ block: "center" });
  }
  /* قارئ نصوص كتب IslamHouse */
  let IHIDX = null;
  async function ihFind(id) {
    if (!IHIDX) { IHIDX = new Map(); for (const block of ["books", "articles"]) { for (let p = 1; p <= 15; p++) { const j = await api(`/api/ih/${block}?page=${p}`); j.items.forEach(i => IHIDX.set(i.id, i)); if (p >= j.pages) break; } } }
    return IHIDX.get(+id);
  }
  async function openReader(id, box) {
    box.innerHTML = `<div class="card"><p class="muted">جارٍ تحميل نص الكتاب من IslamHouse…</p></div>`; box.scrollIntoView({ behavior: "smooth" });
    try {
      const it = await ihFind(id); const f = it && it.files.find(x => /pdf/i.test(x.ext)); if (!f) throw new Error("لا يوجد ملف PDF لهذا العنوان");
      const j = await api(`/api/ihtext?u=${encodeURIComponent(f.url)}`); if (!j.text) throw new Error("تعذّر استخراج النص (قد يكون الكتاب صورًا)");
      const paras = j.text.replace(/(\w)-\n(\w)/g, "$1$2").split(/\n\s*\n+/).map(p => p.replace(/\s+/g, " ").trim()).filter(p => p.length > 40 && !/pdfMachine|www\.broadgun/i.test(p));
      const cite = `— «${it.title}», IslamHouse.com: ${it.url}`;
      box.innerHTML = `<div class="card"><div class="row between"><h2 lang="es" dir="ltr" style="text-align:left">📖 ${esc(it.title)}</h2><button type="button" id="rd-close">إغلاق</button></div><p class="muted small">${j.pages} صفحة · النص مستخرج آليًّا من ملف PDF الأصلي؛ قد تسقط بعض الرموز (مثل ﷺ) أو تختلط أرقام الصفحات بالنص، فراجع المقطع قبل إرساله. اختر أي فقرة وانسخها مع مصدرها.</p><input type="search" id="rd-q" placeholder="ابحث داخل الكتاب… (مثال: Jesús, oración)" dir="auto" style="width:100%"><div id="rd-paras" style="margin-top:10px"></div></div>`;
      const renderP = q => { const list = paras.map((p, i) => [p, i]).filter(([p]) => !q || p.toLowerCase().includes(q)).slice(0, 120); $("#rd-paras").innerHTML = list.map(([p, i]) => { const k = reg({ es: `«${p}»\n${cite}` }); const ks = reg({ es: p }); return `<div class="rd-para"><p class="es-text" lang="es">${esc(p)}</p><div class="actions"><button type="button" data-act="say" data-k="${ks}">🔊</button><button type="button" data-act="copy" data-k="${k}">نسخ مع المصدر</button></div></div>`; }).join("") || `<p class="muted">لا نتائج.</p>`; };
      $("#rd-q").oninput = e => renderP(e.target.value.trim().toLowerCase()); renderP("");
      $("#rd-close").onclick = () => { box.innerHTML = ""; };
    } catch (e) { box.innerHTML = `<p class="notice amber">${esc(e.message)}</p>`; }
  }

  /* ---------- Spanish course (lazy) ---------- */
  V.aprender = () => `<div class="head"><h1>تعلّم الإسبانية</h1><p>جارٍ تحميل الدروس…</p></div>`;
  let learnP = null;
  function loadLearn() {
    if (window.LEARN && window.LEARN.mount) return Promise.resolve();
    if (learnP) return learnP;
    const files = ["lib", "a1", "a2", "b1", "c1", "extra", "phrases-a", "phrases-b", "islam", "vocab", "engine"], optional = new Set(["phrases-a", "phrases-b", "islam", "vocab"]);
    learnP = files.reduce((p, f) => p.then(() => new Promise((res, rej) => { const sc = document.createElement("script"); sc.src = `/learn/${f}.js?v=3`; sc.onload = res; sc.onerror = optional.has(f) ? res : rej; document.head.appendChild(sc); })), Promise.resolve());
    learnP.catch(() => { learnP = null; });
    return learnP;
  }
  window.RAFIQ = { TTS, NV, toast, copy, esc, head, S, saveS };

  /* ---------- router ---------- */
  const ORDER = ["inicio", "componer", "analizar", "traducir", "mensajes", "tarjetas", "conversaciones", "articulos", "curso", "ideas", "biblioteca", "pronunciar", "guia", "avisos", "revision", "aprender", "confianza", "preguntas", "libros", "seguimiento", "citas", "buscar"];
  function route() {
    const h = decodeURIComponent(location.hash.slice(1)); const [name0, ...rest] = h.split("/"); const name = ORDER.includes(name0) ? name0 : "inicio"; const arg = rest.join("/");
    TTS.stop(); REG = new Map(); if ("speechSynthesis" in window) speechSynthesis.cancel();
    view.innerHTML = V[name](arg); view.classList.remove("fade"); void view.offsetWidth; view.classList.add("fade");
    $$("#nav a").forEach(a => { if (a.getAttribute("href") === "#" + name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.title = (name === "inicio" ? "" : ($(`#nav a[href="#${name}"]`)?.textContent || "بحث") + " — ") + "رفيق الداعية";
    if (name === "componer") { $("#comp-form").onsubmit = e => { e.preventDefault(); composeResult(); }; if (arg) composeResult(); }
    if (name === "mensajes") { ["#m-si", "#m-st", "#m-au", "#m-fav"].forEach(s => $(s).onchange = () => renderMsgs()); $("#m-ar").onchange = e => { S.showAr = e.target.value === "1"; saveS(); renderMsgs(); }; renderMsgs(arg); }
    if (name === "analizar") {
      const upd = () => { $("#an-tr").href = `https://translate.google.com/?sl=es&tl=ar&op=translate&text=${encodeURIComponent($("#an-text").value.slice(0, 4000))}`; };
      $("#an-text").oninput = upd; upd();
      $("#an-go").onclick = analyze; $("#an-say").onclick = () => { const t = $("#an-text").value.trim(); if (t) TTS.speak(t, "es"); };
      $("#an-sample").onclick = () => { $("#an-text").value = "Hola. Mi padre murió hace poco y estoy muy triste. Soy católico, pero tengo curiosidad: ¿los musulmanes creen en Jesús? ¿Y es verdad que el islam obliga a las mujeres a taparse?"; upd(); analyze(); };
    }
    if (name === "biblioteca") { $$("[data-lib]").forEach(b => b.onclick = () => { LIB.tab = b.dataset.lib; renderLib(); }); renderLib(); }
    if (name === "pronunciar") bindPron();
    if (name === "traducir") bindTrad();
    if (name === "tarjetas") bindCard(arg);
    if (name === "revision") bindRev();
    if (name === "libros") bindLibros();
    if (name === "citas") bindCitas(arg);
    if (name === "seguimiento") bindSeguimiento();
    if (name === "preguntas") { $("#fq-q").oninput = e => { const q = e.target.value.trim().toLowerCase(); $$("[data-fq]").forEach(c => c.hidden = q && !c.dataset.fq.includes(q)); }; if (arg && $("#" + CSS.escape(arg))) $("#" + CSS.escape(arg)).scrollIntoView({ block: "start" }); }
    if (name === "aprender") loadLearn().then(() => { if (location.hash.slice(1).split("/")[0] === "aprender") { window.LEARN.mount(view, arg); window.scrollTo({ top: 0 }); } }).catch(() => { view.innerHTML = `<p class="notice amber">تعذّر تحميل قسم التعلّم. تحقّق من الاتصال وأعد المحاولة.</p>`; });
    gemInit();
    if ((name === "avisos" || name === "guia") && arg && $("#" + CSS.escape(arg))) $("#" + CSS.escape(arg)).scrollIntoView({ block: "center" });
    if (name === "curso" && arg && $("#c" + arg)) $("#c" + arg).scrollIntoView({ block: "start" });
    if (name === "ideas" && arg === "series" && $("#series")) $("#series").scrollIntoView({ block: "start" });
    if (!["mensajes", "avisos", "guia", "curso", "ideas", "aprender", "preguntas"].includes(name) || !arg || ["nuevo", "dai"].includes(arg)) window.scrollTo({ top: 0 });
    $("#q").value = name === "buscar" ? decodeURIComponent(arg || "") : "";
  }
  window.addEventListener("hashchange", route);
  $("#search-form").onsubmit = e => { e.preventDefault(); const q = $("#q").value.trim(); if (q) location.hash = "buscar/" + encodeURIComponent(q); };

  /* ---------- global actions ---------- */
  document.addEventListener("click", async e => {
    const rb = e.target.closest(".ref-btn"); if (rb) { toggleRef(rb); return; }
    const fb = e.target.closest("[data-fav]"); if (fb) { const id = fb.dataset.fav; S.favs = S.favs.includes(id) ? S.favs.filter(x => x !== id) : [...S.favs, id]; saveS(); fb.setAttribute("aria-pressed", S.favs.includes(id)); fb.textContent = S.favs.includes(id) ? "★ محفوظة" : "☆ احفظ"; toast(S.favs.includes(id) ? "حُفظت في المفضلة" : "أزيلت من المفضلة"); return; }
    const gb = e.target.closest(".gem-btn"); if (gb) { runGem(gb); return; }
    const b = e.target.closest("[data-act]"); if (!b) return;
    const o = REG.get(b.dataset.k); if (!o) return;
    const act = b.dataset.act;
    if (act === "say") TTS.speak(o.es, "es");
    else if (act === "say-ar") TTS.speak(o.ar, "ar");
    else if (act === "copy") copy(o.es);
    else if (act === "copyref") { b.disabled = true; const t = await composeWithRefs(o); b.disabled = false; copy(t, "نُسخ النص مع الآيات والأحاديث ومصادرها"); }
  });

  route();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => { });
})();
