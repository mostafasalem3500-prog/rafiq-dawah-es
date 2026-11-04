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

function wav(pcm, rate = 24000) {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(rate, 24);
  h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

/* a clip much longer than the text means the model also read the instruction aloud */
const tooLong = (buf, text) => { const sec = (buf.length - 44) / (24000 * 2); return sec > 2.5 + text.length / 7; };
async function synth(text, v) {
  const lang = v[0].startsWith("ar") ? "ar" : "es";
  const styled = lang === "es" ? `Say in a natural, warm, unhurried voice ${v[4]}: ${text}` : `Say in a calm, clear Modern Standard Arabic voice: ${text}`;
  let lastErr; await discoverTts();
  for (const model of MODELS) {
    try {
      let b = await synthOnce(model, styled, v);
      if (tooLong(b, text)) { b = await synthOnce(model, text, v); if (tooLong(b, text)) throw new Error("audio length check failed"); }
      return b;
    } catch (e) { lastErr = e; if (!/demand|overload|unavailable|429|500|503|not found|timeout|aborted|length check/i.test(String(e.message))) break; }
  }
  throw lastErr;
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
function mount(app) {
  app.get("/api/tts/voices", (req, res) => res.json({ enabled: !!KEY, ok: status.ok, cooling: Date.now() < coolUntil, voices: VOICES.es.concat(VOICES.ar).map(v => v.slice(0, 3)) }));
  app.get("/api/tts", async (req, res) => {
    const text = String(req.query.t || "").replace(/\s+/g, " ").trim();
    const v = BYID.get(String(req.query.v || ""));
    if (!text || text.length > 600) return res.status(400).json({ error: "bad_text" });
    if (!v) return res.status(400).json({ error: "bad_voice" });
    const k = crypto.createHash("sha1").update(`p2|${v[0]}|${text}`).digest("hex");
    const send = b => { res.setHeader("Content-Type", "audio/wav"); res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); res.setHeader("Content-Length", b.length); res.end(b); };
    const hit = await cached(k); if (hit) return send(hit);
    if (!KEY) return res.status(503).json({ error: "disabled" });
    if (Date.now() < coolUntil) return res.status(503).json({ error: "quota_cooldown" });
    if (!spend.allowed("tts")) return res.status(503).json({ error: "budget" });
    if (!inflight.has(k)) {
      const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString().split(",")[0].trim();
      const now = Date.now(); const h = (ipHits.get(ip) || []).filter(t => now - t < 60000);
      if (h.length >= 40) return res.status(429).json({ error: "rate" });
      h.push(now); ipHits.set(ip, h); if (ipHits.size > 5000) ipHits.clear();
      const d = new Date().toISOString().slice(0, 10); if (day.d !== d) day = { d, n: 0 };
      if (day.n >= DAILY) return res.status(429).json({ error: "daily" });
      day.n++;
      inflight.set(k, synth(text, v).then(b => { remember(k, b); fs.promises.writeFile(path.join(DIR, k + ".wav"), b).catch(() => { }); status = { ok: true, err: "" }; return b; })
        .catch(e => { status = { ok: false, err: String(e.message || e) }; if (/quota|rate|429/i.test(e.message)) { const m = /retry in ([\d.]+)s/i.exec(e.message); coolUntil = Date.now() + (m ? Math.ceil(+m[1]) * 1000 : 60000); } console.error("tts", String(e.message).slice(0, 200)); throw e; })
        .finally(() => inflight.delete(k)));
    }
    try { send(await inflight.get(k)); } catch (e) { res.status(502).json({ error: "tts_unavailable", message: String(e.message || e) }); }
  });
}
module.exports = { mount, VOICES };
