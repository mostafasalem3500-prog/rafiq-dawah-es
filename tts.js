/* Natural voices for رفيق الداعية via the official Gemini text-to-speech API (same GEMINI_API_KEY).
 * Each clip is synthesized once and cached (memory + disk). If the key is missing or the quota is
 * exhausted, the browser falls back to its own voices automatically. */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const KEY = process.env.GEMINI_API_KEY || "";
const spend = require("./spend");
const MODEL = process.env.GEMINI_TTS_MODEL || "gemini-3.8-flash-lite-tts";
let MODELS = [MODEL, "gemini-3.8-flash-tts", "gemini-2.5-flash-preview-tts"].filter((m, i, a) => a.indexOf(m) === i);
let ttsModelsAt = 0;
async function discoverTts() {
  if (!KEY || Date.now() - ttsModelsAt < 6 * 3600 * 1000) return; ttsModelsAt = Date.now();
  try {
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=200", { headers: { "x-goog-api-key": KEY } }); const j = await r.json(); if (!r.ok) return;
    const tts = (j.models || []).map(m => m.name.replace(/^models\//, "")).filter(n => /tts/.test(n) && !/pro/.test(n));
    const rank = n => (/flash-lite-tts$/.test(n) ? 0 : /flash-tts$/.test(n) ? 1 : /preview/.test(n) ? 3 : 2) * 100 - parseFloat((/(\d+\.\d+)/.exec(n) || [0, 0])[1]);
    if (tts.length) MODELS = [MODEL, ...tts.sort((a, b) => rank(a) - rank(b))].filter((m, i, a) => a.indexOf(m) === i && (m !== MODEL || tts.includes(m))).slice(0, 3);
    console.log("tts models:", MODELS.join(", "));
  } catch (e) { }
}
const DAILY = Number(process.env.TTS_DAILY_LIMIT || 2000);
/* paid backup: the same Gemini TTS voices through OpenRouter (prepaid balance, shared monthly cap in spend.js) */
const OR_KEY = (process.env.OPENROUTER_API_KEY || "").trim();
const OR_TTS = (process.env.OPENROUTER_TTS_MODELS || "google/gemini-3.8-flash-lite-tts,google/gemini-3.8-flash-tts").split(",").map(x => x.trim()).filter(Boolean);
/* USD per 1M tokens [text in, audio out] (openrouter.ai/api/v1/models, read 5 Nov 2026); audio ≈ 25 tokens/s */
const orPrice = m => /lite/.test(m) ? [0.5, 6] : [0.5, 9];
const orReady = () => !!OR_KEY && spend.orAllowed();

/* presets: [id, Arabic label, gender, Gemini voice, accent instruction] */
const ACC = { es: "with a Spain Spanish accent", mx: "with a Mexican Spanish accent", la: "with a neutral Latin American Spanish accent", ar: "" };
const VOICES = {
  es: [
    ["es-kore", "كوري — إسبانيا", "F", "Kore", ACC.es], ["es-puck", "بَك — إسبانيا", "M", "Puck", ACC.es],
    ["es-sulafat", "سولافات — إسبانيا (دافئ)", "F", "Sulafat", ACC.es], ["es-iapetus", "إيابيتوس — إسبانيا (واضح)", "M", "Iapetus", ACC.es],
    ["mx-aoede", "إيودي — المكسيك", "F", "Aoede", ACC.mx], ["mx-charon", "كارون — المكسيك", "M", "Charon", ACC.mx],
    ["la-leda", "ليدا — لاتين أمريكا (شابة)", "F", "Leda", ACC.la], ["la-achird", "أشيرد — لاتين أمريكا (ودود)", "M", "Achird", ACC.la],
    ["la-vindemiatrix", "فينديمياتريكس — لاتين أمريكا (هادئ)", "F", "Vindemiatrix", ACC.la], ["la-orus", "أوروس — لاتين أمريكا (رصين)", "M", "Orus", ACC.la]
  ],
  ar: [["ar-charon", "كارون — عربي فصيح (رجل)", "M", "Charon", ""], ["ar-kore", "كوري — عربي فصيح (امرأة)", "F", "Kore", ""], ["ar-sadaltager", "سعد — عربي فصيح (رجل)", "M", "Sadaltager", ""]]
};
const BYID = new Map([...VOICES.es, ...VOICES.ar].map(v => [v[0], v]));

/* تنظيف المقطع: قصّ الصمت والضجيج في الطرفين، وحذف «نفَس» أو طقّة قصيرة معزولة بعد انتهاء الكلام، ثم تلاشٍ ناعم */
function clean(pcm, rate = 24000) {
  if (pcm.length % 2) pcm = pcm.subarray(0, pcm.length - 1);
  const n = pcm.length / 2; if (n < rate / 10) return pcm;
  const x = new Int16Array(n); for (let i = 0; i < n; i++) x[i] = pcm.readInt16LE(i * 2);
  const F = Math.round(rate / 100), nf = Math.floor(n / F), rms = new Float64Array(nf), zcr = new Float64Array(nf);
  for (let f = 0; f < nf; f++) { let e = 0, z = 0; for (let i = f * F; i < (f + 1) * F; i++) { e += x[i] * x[i]; if (i && (x[i] >= 0) !== (x[i - 1] >= 0)) z++; } rms[f] = Math.sqrt(e / F); zcr[f] = z / F; }
  const peak = Math.max(...rms); if (!peak) return pcm;
  const thr = Math.max(220, peak * 0.05), voiced = [...rms].map(r => r > thr);
  /* إطار «تشويش»: عالٍ جدًّا وعريض الطيف (نسبة عبور الصفر مرتفعة) — الكلام العالي حروف علة منخفضة العبور، والصفير (s) منخفض الشدة */
  const art = [...rms].map((r, f) => r > peak * 0.35 && zcr[f] > 0.12);
  /* المقاطع المنطوقة: ندمج الفجوات القصيرة (< 150ms) داخل الكلام */
  const segs = []; for (let f = 0; f < nf; f++) if (voiced[f]) { const L = segs[segs.length - 1]; if (L && f - L[1] <= 15) L[1] = f; else segs.push([f, f]); }
  if (!segs.length) return pcm;
  /* نهاية المقطع: أسقط مقطعًا أخيرًا أغلبه تشويش، أو ذيلًا قصيرًا (< 120ms) معزولًا بفجوة ≥ 100ms؛ ثم قصّ إطارات التشويش/الصمت من آخر المقطع المتبقي */
  let dropped = 0;
  for (let k = 0; k < 4 && segs.length; k++) {
    const L = segs[segs.length - 1], len = L[1] - L[0] + 1; let a = 0; for (let f = L[0]; f <= L[1]; f++) if (art[f]) a++;
    const gap = segs.length > 1 ? L[0] - segs[segs.length - 2][1] : 99;
    if ((a >= len * 0.4 && segs.length > 1) || (len < 12 && gap >= 10 && segs.length > 1)) { segs.pop(); dropped++; continue; }
    let e = L[1]; while (e > L[0] && (art[e] || !voiced[e])) e--; if (e < L[1]) dropped++; L[1] = e; break;
  }
  const s0 = Math.max(0, (segs[0][0] - 6) * F), e0 = Math.min(n, (segs[segs.length - 1][1] + 16) * F);
  const len = e0 - s0, tail = Math.round(rate * 0.08), out = Buffer.alloc((len + tail) * 2);
  const fi = Math.min(len, Math.round(rate * 0.008)), fo = Math.min(len, Math.round(rate * 0.06));
  for (let i = 0; i < len; i++) {
    let g = 1; if (i < fi) g = 0.5 - 0.5 * Math.cos(Math.PI * i / fi); const r = len - 1 - i; if (r < fo) g *= 0.5 - 0.5 * Math.cos(Math.PI * r / fo);
    out.writeInt16LE(Math.round(x[s0 + i] * g), i * 2);
  }
  if (process.env.NODE_ENV !== "test") console.log(`tts clean: ${(n / rate).toFixed(2)}s -> ${((len + tail) / rate).toFixed(2)}s${dropped ? " (noise tail removed)" : ""}`);
  return out; // ينتهي بـ 80ms صمت رقمي حتى لا يقطع المشغّل آخر الكلمة
}
function wav(pcm, rate = 24000) {
  pcm = clean(pcm, rate);
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(rate, 24);
  h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

/* a clip much longer than the text means the model also read the instruction aloud */
const tooLong = (buf, text) => { const sec = (buf.length - 44) / (24000 * 2); return sec > 2.5 + text.length / 7; };
async function synth(text, v, useGemini = true) {
  const lang = v[0].startsWith("ar") ? "ar" : "es";
  const styled = lang === "es" ? `Say in a natural, warm, unhurried voice ${v[4]}: ${text}` : `Say in a calm, clear Modern Standard Arabic voice: ${text}`;
  const tryModels = async (models, once) => {
    let lastErr;
    for (const model of models) {
      try {
        let b = await once(model, styled, v);
        if (tooLong(b, text)) { b = await once(model, text, v); if (tooLong(b, text)) throw new Error("audio length check failed"); }
        return { b, model };
      } catch (e) { lastErr = e; if (!/demand|overload|unavailable|429|500|502|503|not found|timeout|aborted|length check|no audio/i.test(String(e.message))) break; }
    }
    throw lastErr;
  };
  let gErr;
  if (KEY && useGemini) {
    await discoverTts();
    try { return (await tryModels(MODELS, synthOnce)).b; } catch (e) { gErr = e; if (/quota|rate|429|exhaust/i.test(e.message)) { const m = /retry in ([\d.]+)s/i.exec(e.message); coolUntil = Date.now() + (m ? Math.ceil(+m[1]) * 1000 : 60000); } if (!orReady()) throw e; console.error("gemini tts failed, using openrouter:", String(e.message).slice(0, 120)); }
  }
  if (orReady()) { const r = await tryModels(OR_TTS, synthOpenRouter); orStatus = { ok: true, err: "", model: r.model }; return r.b; }
  throw gErr || new Error("no tts engine");
}
let orStatus = { ok: null, err: "", model: "" };
async function synthOpenRouter(model, prompt, v) {
  const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 40000);
  try {
    const r = await fetch("https://openrouter.ai/api/v1/audio/speech", {
      method: "POST", signal: ctl.signal,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${OR_KEY}`, "HTTP-Referer": "https://web-production-d19218.up.railway.app", "X-Title": "Rafiq al-Da'i" },
      body: JSON.stringify({ model, input: prompt, voice: v[3], response_format: "pcm" })
    });
    if (!r.ok) { const j = await r.json().catch(() => ({})); const e = new Error((j.error && j.error.message) || `OpenRouter TTS HTTP ${r.status}`); orStatus = { ok: false, err: String(e.message).slice(0, 160), model }; throw e; }
    const pcm = Buffer.from(await r.arrayBuffer());
    if (pcm.length < 2000) throw new Error("no audio returned");
    const ct = r.headers.get("content-type") || ""; const m = /rate=(\d+)/.exec(ct); const rate = m ? +m[1] : 24000;
    const [pi, po] = orPrice(model); spend.recordOR(((prompt.length / 3) * pi + (pcm.length / 2 / rate) * 25 * po) / 1e6);
    return wav(pcm, rate);
  } catch (e) { if (e.name === "AbortError") throw new Error("OpenRouter TTS timeout"); throw e; }
  finally { clearTimeout(to); }
}
async function synthOnce(model, prompt, v) {
  const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 30000);
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST", signal: ctl.signal, headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: v[3] } } } } })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error((j.error && j.error.message) || `HTTP ${r.status}`);
    spend.record(model, j.usageMetadata, "tts");
    const part = (j.candidates?.[0]?.content?.parts || []).find(p => p.inlineData && p.inlineData.data);
    if (!part) throw new Error("no audio returned");
    const m = /rate=(\d+)/.exec(part.inlineData.mimeType || "");
    return wav(Buffer.from(part.inlineData.data, "base64"), m ? +m[1] : 24000);
  } finally { clearTimeout(to); }
}

const DIR = process.env.TTS_CACHE_DIR || path.join(process.env.DATA_DIR || require("os").tmpdir(), "tts");
try { fs.mkdirSync(DIR, { recursive: true }); } catch (e) { }
const mem = new Map(); let memBytes = 0; const MEM_MAX = 80 * 1024 * 1024;
const inflight = new Map(); let day = { d: "", n: 0 }; const ipHits = new Map();
function remember(k, b) { mem.set(k, b); memBytes += b.length; while (memBytes > MEM_MAX && mem.size) { const [ok, ob] = mem.entries().next().value; mem.delete(ok); memBytes -= ob.length; } }
async function cached(k) {
  if (mem.has(k)) { const b = mem.get(k); mem.delete(k); mem.set(k, b); return b; }
  try { const b = await fs.promises.readFile(path.join(DIR, k + ".wav")); remember(k, b); return b; } catch (e) { return null; }
}

let status = { ok: null, err: "" }; let coolUntil = 0;
/* one tiny startup check of the paid voice path, so the logs show whether OpenRouter speech works */
if (OR_KEY && process.env.NODE_ENV !== "test") setTimeout(async () => {
  const t0 = Date.now();
  for (const model of OR_TTS) {
    try { const b = await synthOpenRouter(model, "Hola, bienvenido.", BYID.get("es-kore")); orStatus = { ok: true, err: "", model }; console.log(`openrouter tts selftest OK (${model}) in ${Date.now() - t0}ms, ${((b.length - 44) / 48000).toFixed(2)}s audio`); return; }
    catch (e) { console.error("openrouter tts selftest FAILED", model, String(e.message).slice(0, 200)); }
  }
}, 6000);
function mount(app) {
  app.get("/api/tts/voices", (req, res) => res.json({ enabled: !!KEY || orReady(), ok: status.ok, cooling: Date.now() < coolUntil && !orReady(), engines: { gemini: !!KEY, openrouter: OR_KEY ? (!spend.orAllowed() ? "budget" : orStatus.ok === false ? "error" : "ready") : false }, openrouter: OR_KEY ? { ...orStatus, models: OR_TTS } : null, voices: VOICES.es.concat(VOICES.ar).map(v => v.slice(0, 3)) }));
  app.get("/api/tts", async (req, res) => {
    const text = String(req.query.t || "").replace(/\s+/g, " ").trim();
    const v = BYID.get(String(req.query.v || ""));
    if (!text || text.length > 600) return res.status(400).json({ error: "bad_text" });
    if (!v) return res.status(400).json({ error: "bad_voice" });
    const k = crypto.createHash("sha1").update(`p4|${v[0]}|${text}`).digest("hex");
    const send = b => { res.setHeader("Content-Type", "audio/wav"); res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); res.setHeader("Content-Length", b.length); res.end(b); };
    const hit = await cached(k); if (hit) return send(hit);
    if (!KEY && !orReady()) return res.status(503).json({ error: "disabled" });
    const geminiOk = !!KEY && Date.now() >= coolUntil;
    if (!geminiOk && !orReady()) return res.status(503).json({ error: "quota_cooldown" });
    if (!spend.allowed("tts")) return res.status(503).json({ error: "budget" });
    if (!inflight.has(k)) {
      const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString().split(",")[0].trim();
      const now = Date.now(); const h = (ipHits.get(ip) || []).filter(t => now - t < 60000);
      if (h.length >= 40) return res.status(429).json({ error: "rate" });
      h.push(now); ipHits.set(ip, h); if (ipHits.size > 5000) ipHits.clear();
      const d = new Date().toISOString().slice(0, 10); if (day.d !== d) day = { d, n: 0 };
      if (day.n >= DAILY) return res.status(429).json({ error: "daily" });
      day.n++;
      inflight.set(k, synth(text, v, geminiOk).then(b => { remember(k, b); fs.promises.writeFile(path.join(DIR, k + ".wav"), b).catch(() => { }); status = { ok: true, err: "" }; return b; })
        .catch(e => { status = { ok: false, err: String(e.message || e) }; if (/quota|rate|429/i.test(e.message)) { const m = /retry in ([\d.]+)s/i.exec(e.message); coolUntil = Date.now() + (m ? Math.ceil(+m[1]) * 1000 : 60000); } console.error("tts", String(e.message).slice(0, 200)); throw e; })
        .finally(() => inflight.delete(k)));
    }
    try { send(await inflight.get(k)); } catch (e) { res.status(502).json({ error: "tts_unavailable", message: String(e.message || e) }); }
  });
}
module.exports = { mount, VOICES, clean };
