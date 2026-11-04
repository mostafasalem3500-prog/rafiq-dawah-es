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
  const S = Object.assign({ voice: "", arVoice: "", rate: 0.9, pitch: 1, showAr: true }, (() => { try { return JSON.parse(localStorage.getItem("rafiq-settings") || "{}"); } catch (e) { return {}; } })());
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

  /* ---------- TTS ---------- */
  const TTS = {
    ok: "speechSynthesis" in window, voices: [], paused: false,
    init() {
      if (!this.ok) return;
      const load = () => { this.voices = speechSynthesis.getVoices(); document.dispatchEvent(new Event("voices")); };
      load(); speechSynthesis.addEventListener("voiceschanged", load);
    },
    list(lang) { return this.voices.filter(v => lang === "es" ? /^es([-_]|$)/i.test(v.lang) : /^ar([-_]|$)/i.test(v.lang)); },
    pick(lang) {
      const list = this.list(lang); const uri = lang === "es" ? S.voice : S.arVoice;
      return list.find(v => v.voiceURI === uri) || list.find(v => /es-ES|es_ES/i.test(v.lang) && lang === "es") || list[0] || null;
    },
    split(text) { return String(text).replace(/\s+/g, " ").match(/[^.!?…؟]+[.!?…؟]*["»”)]*\s*/g)?.map(s => s.trim()).filter(Boolean) || [text]; },
    speak(text, lang = "es", onSentence) {
      if (!this.ok) { toast("متصفحك لا يدعم النطق الصوتي"); return; }
      speechSynthesis.cancel(); this.paused = false;
      const parts = this.split(text); const voice = this.pick(lang);
      if (!voice && lang === "ar") toast("لا يوجد صوت عربي في متصفحك؛ جرّب Chrome أو Edge");
      parts.forEach((p, i) => {
        const u = new SpeechSynthesisUtterance(p);
        u.lang = voice ? voice.lang : (lang === "es" ? "es-ES" : "ar-SA"); if (voice) u.voice = voice;
        u.rate = Number(S.rate) || 0.9; u.pitch = Number(S.pitch) || 1;
        u.onstart = () => { $("#now-text").textContent = p; if (onSentence) onSentence(i); };
        u.onend = () => { if (i === parts.length - 1) this.done(); };
        u.onerror = () => { if (i === parts.length - 1) this.done(); };
        speechSynthesis.speak(u);
      });
      $("#player").hidden = false; $("#p-pause").textContent = "⏸";
    },
    done() { $("#player").hidden = true; $$("mark.speaking").forEach(m => m.replaceWith(...m.childNodes)); document.dispatchEvent(new Event("tts-end")); },
    stop() { if (this.ok) speechSynthesis.cancel(); this.done(); },
    toggle() { if (!this.ok) return; if (speechSynthesis.paused) { speechSynthesis.resume(); $("#p-pause").textContent = "⏸"; } else { speechSynthesis.pause(); $("#p-pause").textContent = "▶"; } }
  };
  TTS.init();
  $("#p-pause").onclick = () => TTS.toggle();
  $("#p-stop").onclick = () => TTS.stop();
  $("#p-rate").value = S.rate; $("#p-rate-out").textContent = Number(S.rate).toFixed(2) + "×";
  $("#p-rate").oninput = e => { S.rate = Number(e.target.value); $("#p-rate-out").textContent = S.rate.toFixed(2) + "×"; saveS(); syncRate(); };
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
    return `<div class="actions"><button type="button" data-act="say" data-k="${k}">🔊 استمع</button>${o.ar ? `<button type="button" data-act="say-ar" data-k="${k}">🔊 المعنى</button>` : ""}<button type="button" data-act="copy" data-k="${k}">نسخ</button>${(o.q && o.q.length) || (o.h && o.h.length) ? `<button type="button" data-act="copyref" data-k="${k}">نسخ مع الآية والحديث</button>` : ""}<a class="btn" href="${wa(o.es)}" target="_blank" rel="noopener">واتساب</a>${extra}</div>`;
  }
  function msgCard(m, hl) {
    return `<article class="card lift${hl ? " hl" : ""}" id="${m.id}"><div class="row between"><h3>${esc(m.t)}</h3><span class="tags">${m.st.map(s => `<span class="tag gold">${esc(stLbl(s))}</span>`).join("")}</span></div>
      <p class="es-text" lang="es">${esc(m.es)}</p>${S.showAr ? `<p class="ar-text">${esc(m.ar)}</p>` : ""}
      <div class="tags">${m.si.map(s => `<span class="tag">${esc(siLbl(s))}</span>`).join("")}</div>
      ${refsHTML(m.q, m.h)}${actions({ es: m.es, ar: m.ar, q: m.q, h: m.h })}</article>`;
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
    const SM = { jesus: 5, trinidad: 5, profeta: 6, coran: 7, dios: 3, proposito: 1, listo: 12, primeros: 9, curioso: 2 };
    const sessions = [...new Set([...(SM[si] ? [SM[si]] : []), ...CM[st]])].slice(0, 2).map(n => RQ.COURSE.find(c => c.n === n));
    const W = new Set(["w01", "w12"]);
    ({ jesus: ["w07"], trinidad: ["w07", "w02"], violencia: ["w04", "w06"], mujer: ["w06", "w11"], duelo: ["w03"], listo: ["w08"], presion: ["w15"], dios: ["w09"], coran: ["w13", "w10"], profeta: ["w10"], perdon: ["w03"] }[si] || []).forEach(w => W.add(w));
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
      <div class="card"><h3>من المنهج</h3>${sessions.map(c => `<p><span class="num">${c.n}</span> <a href="#curso/${c.n}">${esc(c.tar)}</a> — <span lang="es" class="muted">${esc(c.t)}</span></p>`).join("")}</div>`;
    $("#comp-out").classList.add("fade"); $("#comp-out").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  V.analizar = () => `${head("حلّل رسالة المحاور", "الصق رسالته بالإسبانية كما وصلتك. يكشف الموقع الموضوع، ويقترح الرد والقالب، وينبّهك إلى المزالق. يعمل على جهازك دون إرسال النص إلى أي جهة.")}
    <div class="card"><div class="field"><label for="an-text">رسالة المحاور</label><textarea id="an-text" dir="auto" lang="es" placeholder="Ejemplo: Mi madre murió el año pasado y no entiendo por qué Dios permite el sufrimiento. ¿Los musulmanes creen en Jesús?"></textarea></div>
    <div class="row" style="margin-top:12px"><button class="primary" type="button" id="an-go">حلّل الرسالة</button><button type="button" id="an-say">🔊 استمع لنطقها</button><a class="btn" id="an-tr" href="#" target="_blank" rel="noopener">ترجمها في Google</a><button type="button" id="an-sample">مثال</button></div></div>
    <div id="an-out"></div>`;
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
      <div class="field"><label for="m-ar">المعنى العربي</label><select id="m-ar"><option value="1"${S.showAr ? " selected" : ""}>ظاهر</option><option value="0"${!S.showAr ? " selected" : ""}>مخفي</option></select></div></div></div>
      <p class="muted small" id="m-count"></p><div class="grid" id="m-list"></div>`;
  };
  function renderMsgs(hl) {
    const si = $("#m-si").value, st = $("#m-st").value, au = $("#m-au").value;
    const list = RQ.MSG.filter(m => (!si || m.si.includes(si)) && (!st || m.st.includes(st)) && (!au || m.au.includes(au)));
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

  V.curso = (arg) => `${head("المنهج: اكتشف الإسلام في 12 لقاءً", "<span lang='es'>Descubre el islam en 12 encuentros</span> — منهج متدرج يبدأ بسؤال الغاية وينتهي بالشهادتين. لكل لقاء هدف وفكرة أساسية بالإسبانية، وسؤال تطرحه، ونصوص من مصادرها، ونوع مادة مقترحة من IslamHouse.")}
    <div style="display:grid;gap:12px">${RQ.COURSE.map(c => { const k = reg({ es: c.es, ar: c.ar, q: c.q, h: c.h }); const kq = reg({ es: c.ask.es, ar: c.ask.ar }); return `<details class="card" id="c${c.n}"${String(c.n) === String(arg) ? " open" : ""}><summary><span class="row"><span class="num">${c.n}</span><span><b>${esc(c.tar)}</b><br><span class="muted small" lang="es">${esc(c.t)}</span></span></span></summary>
      <p><b>الهدف:</b> ${esc(c.goal)}</p><p class="es-text big" lang="es">${esc(c.es)}</p><p class="ar-text">${esc(c.ar)}</p>
      <div class="actions"><button type="button" data-act="say" data-k="${k}">🔊 استمع</button><button type="button" data-act="say-ar" data-k="${k}">🔊 المعنى</button><button type="button" data-act="copyref" data-k="${k}">نسخ مع الآيات</button></div>
      <div class="notice small"><b>سؤال تطرحه:</b> <span lang="es" class="es-text">${esc(c.ask.es)}</span><br>${esc(c.ask.ar)} <button type="button" data-act="say" data-k="${kq}">🔊</button></div>
      ${refsHTML(c.q, c.h)}<p class="small"><b>مادة مقترحة:</b> <a href="#biblioteca/ih-${c.ih}">${{ books: "كتاب", articles: "مقالة", videos: "فيديو", audios: "صوتية" }[c.ih]} من IslamHouse بالإسبانية</a> · <b>نصيحة:</b> ${esc(c.tip)}</p></details>`; }).join("")}</div>`;

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
      <div class="row" style="margin-top:10px"><button class="primary" type="button" id="pr-all">🔊 اقرأ كاملًا</button><button type="button" id="pr-next">▶ الجملة التالية</button><button type="button" id="pr-stop">⏹</button><a class="btn" id="pr-tr" href="#" target="_blank" rel="noopener">المعنى في Google</a></div>
      <div id="pr-sent" class="es-text" lang="es" style="margin-top:12px"></div></div>
    <div class="card"><h3>الصوت والسرعة</h3><div class="field"><label for="v-es">الصوت الإسباني</label><select id="v-es"></select><small class="muted" id="v-count"></small></div>
      <div class="field"><span class="small" style="font-weight:700">لهجة سريعة</span><div class="chips" id="v-dial"></div></div>
      <div class="field"><label for="v-rate">السرعة</label><div class="row"><input type="range" id="v-rate" data-rate min="0.5" max="1.5" step="0.05" value="${S.rate}" style="flex:1"><output data-rate-out>${Number(S.rate).toFixed(2)}×</output></div></div>
      <div class="field"><label for="v-pitch">طبقة الصوت</label><input type="range" id="v-pitch" min="0.7" max="1.3" step="0.05" value="${S.pitch}"></div>
      <div class="field"><label for="v-ar">الصوت العربي (للمعاني)</label><select id="v-ar"></select></div>
      <p class="muted small">الأصوات المتاحة تعتمد على جهازك ومتصفحك. أكثرها تنوعًا في Microsoft Edge وGoogle Chrome. على الهاتف ثبّت «صوت Google» أو أصوات الإسبانية من إعدادات تحويل النص إلى كلام.</p></div></div>
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
    return `${head(`نتائج البحث عن «${esc(q)}»`, `${R.length} نتيجة`)}${R.length ? `<div style="display:grid;gap:10px">${R.map(r => `<a class="card lift" href="${r[2]}" style="text-decoration:none;color:inherit"><div class="row"><span class="tag gold">${r[0]}</span><b>${esc(r[1])}</b></div><p class="es-text small muted" lang="es">${esc(String(r[3]).slice(0, 180))}</p></a>`).join("")}</div>` : `<p class="empty">لا نتائج. جرّب كلمة أخرى بالعربية أو الإسبانية، أو ابحث في <a href="#biblioteca">المكتبة</a>.</p>`}`;
  };

  /* ---------- router ---------- */
  const ORDER = ["inicio", "componer", "analizar", "mensajes", "conversaciones", "articulos", "curso", "biblioteca", "pronunciar", "guia", "avisos", "buscar"];
  function route() {
    const h = decodeURIComponent(location.hash.slice(1)); const [name0, ...rest] = h.split("/"); const name = ORDER.includes(name0) ? name0 : "inicio"; const arg = rest.join("/");
    TTS.stop(); REG = new Map();
    view.innerHTML = V[name](arg); view.classList.remove("fade"); void view.offsetWidth; view.classList.add("fade");
    $$("#nav a").forEach(a => { if (a.getAttribute("href") === "#" + name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.title = (name === "inicio" ? "" : ($(`#nav a[href="#${name}"]`)?.textContent || "بحث") + " — ") + "رفيق الداعية";
    if (name === "componer") { $("#comp-form").onsubmit = e => { e.preventDefault(); composeResult(); }; if (arg) composeResult(); }
    if (name === "mensajes") { ["#m-si", "#m-st", "#m-au"].forEach(s => $(s).onchange = () => renderMsgs()); $("#m-ar").onchange = e => { S.showAr = e.target.value === "1"; saveS(); renderMsgs(); }; renderMsgs(arg); }
    if (name === "analizar") {
      const upd = () => { $("#an-tr").href = `https://translate.google.com/?sl=es&tl=ar&op=translate&text=${encodeURIComponent($("#an-text").value.slice(0, 4000))}`; };
      $("#an-text").oninput = upd; upd();
      $("#an-go").onclick = analyze; $("#an-say").onclick = () => { const t = $("#an-text").value.trim(); if (t) TTS.speak(t, "es"); };
      $("#an-sample").onclick = () => { $("#an-text").value = "Hola. Mi padre murió hace poco y estoy muy triste. Soy católico, pero tengo curiosidad: ¿los musulmanes creen en Jesús? ¿Y es verdad que el islam obliga a las mujeres a taparse?"; upd(); analyze(); };
    }
    if (name === "biblioteca") { $$("[data-lib]").forEach(b => b.onclick = () => { LIB.tab = b.dataset.lib; renderLib(); }); renderLib(); }
    if (name === "pronunciar") bindPron();
    if ((name === "avisos" || name === "guia") && arg && $("#" + CSS.escape(arg))) $("#" + CSS.escape(arg)).scrollIntoView({ block: "center" });
    if (name === "curso" && arg && $("#c" + arg)) $("#c" + arg).scrollIntoView({ block: "start" });
    if (!["mensajes", "avisos", "guia", "curso"].includes(name) || !arg) window.scrollTo({ top: 0 });
    $("#q").value = name === "buscar" ? decodeURIComponent(arg || "") : "";
  }
  window.addEventListener("hashchange", route);
  $("#search-form").onsubmit = e => { e.preventDefault(); const q = $("#q").value.trim(); if (q) location.hash = "buscar/" + encodeURIComponent(q); };

  /* ---------- global actions ---------- */
  document.addEventListener("click", async e => {
    const rb = e.target.closest(".ref-btn"); if (rb) { toggleRef(rb); return; }
    const b = e.target.closest("[data-act]"); if (!b) return;
    const o = REG.get(b.dataset.k); if (!o) return;
    const act = b.dataset.act;
    if (act === "say") TTS.speak(o.es, "es");
    else if (act === "say-ar") TTS.speak(o.ar, "ar");
    else if (act === "copy") copy(o.es);
    else if (act === "copyref") { b.disabled = true; const t = await composeWithRefs(o); b.disabled = false; copy(t, "نُسخ النص مع الآيات والأحاديث ومصادرها"); }
  });

  route();
})();
