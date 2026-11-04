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
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
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
  if (h.n > 120) return res.status(429).json({ error: "too_many_requests" });
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
      ayahs.push({ aya: n, arabic: r.arabic_text || "", text: r.translation || "", footnotes: r.footnotes || "" });
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
      id: h.id, title: h.title, intro: h.hadeeth_intro || "", text: h.hadeeth, attribution: h.attribution, grade: h.grade,
      explanation: h.explanation, hints: h.hints || [],
      ar: { intro: h.hadeeth_intro_ar || "", text: h.hadeeth_ar || "", attribution: h.attribution_ar || "", grade: h.grade_ar || "", explanation: h.explanation_ar || "" },
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

app.get("/healthz", (req, res) => res.json({ ok: true }));

/* ---------- static ---------- */
app.use(express.static(path.join(__dirname, "public"), {
  extensions: ["html"],
  setHeaders(res, p) { if (/\.(js|css|json)$/.test(p)) res.setHeader("Cache-Control", "public, max-age=600"); }
}));
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, "public", "index.html")));

app.listen(PORT, () => console.log(`rafiq-dawah-es listening on ${PORT}`));
