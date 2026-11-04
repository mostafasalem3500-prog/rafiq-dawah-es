"use strict";
/**
 * رفيق الداعية — Compañero del Da'i
 * Express server: serves the SPA and a small caching proxy to the trusted sources
 * (QuranEnc.com, HadeethEnc.com, IslamHouse.com). Source texts are passed through unchanged,
 * with source and version metadata, as the IslamHouse API usage policy requires.
 */
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;
const IH_KEY = process.env.ISLAMHOUSE_API_KEY || "paV29H2gm56kvLPy"; // public key published in the IslamHouse API docs
const QURAN_TRANSLATIONS = new Set(["spanish_garcia", "spanish_montada_latin", "spanish_montada_eu"]);
const AYAHS = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];

const app = express();
app.disable("x-powered-by");

/* ---------- security headers ---------- */
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
  );
  next();
});

/* ---------- tiny in-memory cache + rate limit ---------- */
const cache = new Map(); // key -> {t, v}
const MAX_CACHE = 5000;
function cacheGet(k, ttl) { const e = cache.get(k); if (e && Date.now() - e.t < ttl) return e.v; return null; }
function cacheSet(k, v) { if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value); cache.set(k, { t: Date.now(), v }); }
const DAY = 24 * 3600 * 1000;

const hits = new Map();
function rateLimit(req, res, next) {
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString().split(",")[0].trim();
  const now = Date.now();
  const h = hits.get(ip) || { n: 0, t: now };
  if (now - h.t > 60000) { h.n = 0; h.t = now; }
  h.n++; hits.set(ip, h);
  if (hits.size > 20000) hits.clear();
  if (h.n > 400) return res.status(429).json({ error: "too_many_requests" });
  next();
}

async function getJSON(url, ttl) {
  const hit = cacheGet(url, ttl);
  if (hit) return hit;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "rafiq-dawah-es/1.0 (+https://github.com)", Accept: "application/json" } });
    if (!r.ok) throw new Error("upstream " + r.status);
    const j = await r.json();
    cacheSet(url, j);
    return j;
  } finally { clearTimeout(timer); }
}
const send = (res, data, maxAge = 3600) => { res.setHeader("Cache-Control", `public, max-age=${maxAge}`); res.json(data); };
const fail = (res, e) => res.status(502).json({ error: "source_unavailable", detail: String(e && e.message || e) });

app.use("/api", rateLimit);

/* ---------- QuranEnc ---------- */
async function translationMeta(key) {
  const list = await getJSON("https://quranenc.com/api/v1/translations/list/es", DAY);
  const t = (list.translations || []).find(x => x.key === key) || {};
  return { key, title: t.title || key, version: t.version || "", last_update: t.last_update || "" };
}
app.get("/api/quran/:sura/:aya", async (req, res) => {
  const s = parseInt(req.params.sura, 10);
  const [a1, a2raw] = String(req.params.aya).split("-");
  const a = parseInt(a1, 10); const b = a2raw ? parseInt(a2raw, 10) : a;
  const key = QURAN_TRANSLATIONS.has(req.query.t) ? req.query.t : "spanish_garcia";
  if (!(s >= 1 && s <= 114) || !(a >= 1 && b >= a && b <= AYAHS[s - 1]) || b - a > 10)
    return res.status(400).json({ error: "invalid_reference", maxAyah: AYAHS[s - 1] || null });
  try {
    const meta = await translationMeta(key);
    const ayahs = [];
    for (let n = a; n <= b; n++) {
      const j = await getJSON(`https://quranenc.com/api/v1/translation/aya/${key}/${s}/${n}`, 30 * DAY);
      const r = j.result || {};
      ayahs.push({ aya: n, arabic: r.arabic_text || "", text: String(r.translation || "").replace(/^\s*\d+\s*[.\-–:]\s*/, ""), footnotes: r.footnotes || "" });
    }
    send(res, { sura: s, from: a, to: b, ayahs, translation: meta, source: "QuranEnc.com", url: `https://quranenc.com/es/browse/${key}/${s}/${a}` }, 86400);
  } catch (e) { fail(res, e); }
});

/* ---------- HadeethEnc ---------- */
app.get("/api/hadith/categories", async (req, res) => {
  try { send(res, await getJSON("https://hadeethenc.com/api/v1/categories/roots/?language=es", DAY), 86400); }
  catch (e) { fail(res, e); }
});
app.get("/api/hadith/list/:cat", async (req, res) => {
  const cat = parseInt(req.params.cat, 10); const page = Math.max(1, parseInt(req.query.page || "1", 10));
  if (!cat) return res.status(400).json({ error: "invalid_category" });
  try { send(res, await getJSON(`https://hadeethenc.com/api/v1/hadeeths/list/?language=es&category_id=${cat}&page=${page}&per_page=20`, DAY), 3600); }
  catch (e) { fail(res, e); }
});
app.get("/api/hadith/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: "invalid_id" });
  try {
    const h = await getJSON(`https://hadeethenc.com/api/v1/hadeeths/one/?language=es&id=${id}`, 30 * DAY);
    send(res, {
      id: h.id, title: h.title, intro: h.hadeeth_intro && !String(h.hadeeth || "").startsWith(String(h.hadeeth_intro).trim()) ? h.hadeeth_intro : "", text: h.hadeeth, attribution: h.attribution, grade: h.grade,
      explanation: h.explanation, hints: h.hints || [],
      ar: { intro: h.hadeeth_intro_ar && !String(h.hadeeth_ar || "").startsWith(String(h.hadeeth_intro_ar).trim()) ? h.hadeeth_intro_ar : "", text: h.hadeeth_ar || "", attribution: h.attribution_ar || "", grade: h.grade_ar || "", explanation: h.explanation_ar || "" },
      source: "HadeethEnc.com", url: `https://hadeethenc.com/es/browse/hadith/${id}`
    }, 86400);
  } catch (e) { fail(res, e); }
});

/* ---------- IslamHouse ---------- */
const IH_BLOCKS = new Set(["showall", "books", "articles", "videos", "audios", "fatwa"]);
app.get("/api/ih/:block", async (req, res) => {
  const block = req.params.block; const page = Math.max(1, Math.min(500, parseInt(req.query.page || "1", 10)));
  if (!IH_BLOCKS.has(block)) return res.status(400).json({ error: "invalid_block" });
  try {
    const j = await getJSON(`https://api3.islamhouse.com/v3/${IH_KEY}/main/${block}/es/es/${page}/20/json`, 6 * 3600 * 1000);
    const items = (j.data || []).map(it => ({
      id: it.id, title: it.title, type: it.type, description: it.description || "", date: it.add_date || null,
      authors: (it.prepared_by || []).filter(p => p.title).map(p => ({ title: p.title, kind: p.kind })),
      files: (it.attachments || []).map(a => ({ url: a.url, ext: a.extension_type, size: a.size })),
      url: `https://islamhouse.com/es/${it.type}/${it.id}/`
    }));
    const l = j.links || {};
    send(res, { items, page: l.current_page || page, pages: l.pages_number || 1, total: l.total_items || items.length, source: "IslamHouse.com" }, 3600);
  } catch (e) { fail(res, e); }
});

/* ---------- Gemini translation (key stays on the server) ---------- */
const GEMINI_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const TR_DAILY = Number(process.env.TRANSLATE_DAILY_LIMIT || 300);
const trHits = new Map(); let trDay = { d: "", n: 0 };
const TR_SYSTEM = `Eres un traductor profesional árabe↔español al servicio de predicadores musulmanes sunníes (Ahl al-Sunnah wal-Jamá'ah).
Reglas estrictas:
1. Traduce con fidelidad el sentido completo; no añadas, no omitas, no comentes, no expliques. Devuelve SOLO la traducción.
2. Español natural y sencillo, apropiado para WhatsApp/Telegram; respeta saltos de línea.
3. Mantén "Allah" (nunca "Dios" si el original dice الله); ﷺ = "(la paz y las bendiciones de Allah sean con él)"; عليه السلام = "(la paz sea con él)"; رضي الله عنه = "(que Allah esté complacido con él)". Nombres: Muhammad, Isa/Jesús, Musa/Moisés, Maryam/María.
4. Términos islámicos: escribe el término transliterado y entre paréntesis su sentido la primera vez (p. ej. tawhid (unicidad de Allah), salah (oración)).
5. Si el texto contiene una aleya del Corán, NO la traduzcas tú: escribe [Aleya: cita la traducción aprobada de QuranEnc.com] con la referencia si se ve. Si contiene un hadiz, traduce sólo si es necesario y añade [Verificar el texto del hadiz en HadeethEnc.com].
6. Nunca generes fatwas ni opiniones religiosas nuevas; si el texto pide una fatwa, tradúcelo tal cual.
7. Al traducir del español al árabe usa árabe estándar claro.`;
app.use("/api/translate", express.json({ limit: "20kb" }));
/* shared Gemini call + per-IP / daily limits */
function geminiGate(req, res) {
  if (!GEMINI_KEY) { res.status(503).json({ error: "disabled", message: "لم يُضف مفتاح GEMINI_API_KEY بعد" }); return false; }
  const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress;
  const now = Date.now(); const h = (trHits.get(ip) || []).filter(t => now - t < 60000);
  if (h.length >= 12) { res.status(429).json({ error: "rate", message: "طلبات كثيرة؛ انتظر دقيقة" }); return false; }
  h.push(now); trHits.set(ip, h); if (trHits.size > 5000) trHits.clear();
  const day = new Date().toISOString().slice(0, 10); if (trDay.d !== day) trDay = { d: day, n: 0 };
  if (trDay.n >= TR_DAILY) { res.status(429).json({ error: "daily", message: "بلغ الموقع الحد اليومي لطلبات Gemini" }); return false; }
  return true;
}
async function gemini(system, user, temperature = 0.2) {
  trDay.n++;
  const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 25000);
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`, {
      method: "POST", signal: ctl.signal, headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_KEY },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts: [{ text: user }] }], generationConfig: { temperature, maxOutputTokens: 4096 } })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { console.error("gemini", r.status, JSON.stringify(j).slice(0, 300)); throw new Error((j.error && j.error.message) || `Gemini HTTP ${r.status}`); }
    const out = (j.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("").trim();
    if (!out) throw new Error("لم يُرجع Gemini نصًّا (ربما حُجب الطلب)");
    return out;
  } catch (e) { throw new Error(e.name === "AbortError" ? "انتهت مهلة الاتصال بـ Gemini" : String(e.message || e)); }
  finally { clearTimeout(to); }
}
const TUTOR_SYSTEM = `Eres «المعلّم», un profesor de español paciente y preciso para estudiantes cuya lengua materna es el árabe, dentro de una web de dawah sunní.
- Responde SIEMPRE en árabe estándar sencillo; escribe los ejemplos en español entre comillas «...» y su traducción árabe.
- Sé breve y claro: máximo 180 palabras, con viñetas cortas. Adapta el nivel al indicado (MCER).
- Modo "explain": explica la regla o la palabra con 2–3 ejemplos.
- Modo "correct": muestra primero la frase corregida entre «», luego enumera cada error y por qué, sin humillar al alumno.
- Si la pregunta no trata del idioma español, di amablemente que solo ayudas con el español.
- No emitas fatwas ni opiniones religiosas; para temas religiosos remite a un sabio de confianza.`;
app.use("/api/tutor", express.json({ limit: "10kb" }));
app.post("/api/tutor", async (req, res) => {
  const { q, mode, level } = req.body || {}; const t = String(q || "").trim();
  if (!t || t.length > 1500) return res.status(400).json({ error: "bad_text", message: "النص فارغ أو أطول من 1500 حرف" });
  const lv = ["A1", "A2", "B1", "B2", "C1"].includes(level) ? level : "A1"; const m = mode === "correct" ? "correct" : "explain";
  const ck = `tu:${m}:${lv}:${t}`; const cached = cacheGet(ck, 7 * DAY); if (cached) return res.json(cached);
  if (!geminiGate(req, res)) return;
  try { const out = await gemini(TUTOR_SYSTEM, `Modo: ${m}. Nivel del alumno: ${lv}.\n\n${t}`, 0.3); const result = { text: out, model: GEMINI_MODEL }; cacheSet(ck, result); res.setHeader("Cache-Control", "no-store"); res.json(result); }
  catch (e) { res.status(502).json({ error: "gemini", message: e.message }); }
});
app.get("/api/translate/status", (req, res) => res.json({ enabled: !!GEMINI_KEY, model: GEMINI_KEY ? GEMINI_MODEL : null }));
app.post("/api/translate", async (req, res) => {
  const { text, dir, tone } = req.body || {};
  const t = String(text || "").trim();
  if (!t || t.length > 4000) return res.status(400).json({ error: "bad_text", message: "النص فارغ أو أطول من 4000 حرف" });
  if (!["es-ar", "ar-es"].includes(dir)) return res.status(400).json({ error: "bad_dir" });
  const ck = `tr:${dir}:${tone}:${t}`; const cached = cacheGet(ck, 7 * DAY);
  if (cached) return res.json(cached);
  if (!geminiGate(req, res)) return;
  const task = dir === "es-ar" ? "Traduce al árabe estándar el siguiente texto en español."
    : `Traduce al español el siguiente texto en árabe. Trata al lector de ${tone === "usted" ? "usted (registro respetuoso)" : "tú (registro cercano y amable)"}.`;
  try {
    const out = (await gemini(TR_SYSTEM, `${task}\n\n<<<\n${t}\n>>>`)).replace(/^<<<\s*|\s*>>>$/g, "");
    const result = { text: out, model: GEMINI_MODEL, engine: "gemini" }; cacheSet(ck, result);
    res.setHeader("Cache-Control", "no-store"); res.json(result);
  } catch (e) { res.status(502).json({ error: "gemini", message: e.message }); }
});

/* IslamHouse document text (PDF → text) for reading and quoting; restricted to IslamHouse Spanish files */
const pdfParse = require("pdf-parse/lib/pdf-parse.js");
app.get("/api/ihtext", async (req, res) => {
  const u = String(req.query.u || "");
  if (!/^https:\/\/d1\.islamhouse\.com\/data\/es\/[\w\/.\-%]+\.pdf$/i.test(u)) return res.status(400).json({ error: "bad_url" });
  const key = "pdf:" + u; const hit = cacheGet(key, 30 * DAY); if (hit) return send(res, hit, 86400);
  try {
    const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 30000);
    const r = await fetch(u, { signal: ctl.signal, headers: { "User-Agent": "rafiq-dawah-es/1.0" } }); clearTimeout(to);
    if (!r.ok) throw new Error("upstream " + r.status);
    const buf = Buffer.from(await r.arrayBuffer()); if (buf.length > 15 * 1024 * 1024) throw new Error("too large");
    const d = await pdfParse(buf);
    const out = { url: u, pages: d.numpages, text: d.text.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim(), source: "IslamHouse.com" };
    cacheSet(key, out); send(res, out, 86400);
  } catch (e) { fail(res, e); }
});

require("./tts").mount(app);

app.get("/healthz", (req, res) => res.json({ ok: true }));

/* ---------- static ---------- */
app.use(express.static(path.join(__dirname, "public"), {
  extensions: ["html"],
  setHeaders(res, p) { if (/\.(js|css|json|webmanifest|html)$/.test(p)) res.setHeader("Cache-Control", "no-cache"); if (/sw\.js$/.test(p)) res.setHeader("Cache-Control", "no-cache"); }
}));
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, "public", "index.html")));

app.listen(PORT, () => console.log(`rafiq-dawah-es listening on ${PORT}`));
