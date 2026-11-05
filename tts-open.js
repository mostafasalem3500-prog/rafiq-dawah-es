/* الأصوات مفتوحة المصدر — الطبقة الاحتياطية للصوت حين يغيب مفتاح Gemini أو ينشغل أو تنفد حصته.
 * تعمل على معالج الخادم نفسه: بلا مفتاح ولا حصة ولا تكلفة لكل مقطع.
 *   المحرك: sherpa-onnx (Apache-2.0) مثبّت على 1.12.x، لأن الإصدار 2 حذف مرحلة النطق المدمجة (espeak-ng).
 *   الإسبانية: Kokoro-82M v1.0 (Apache-2.0) بأصوات Dora و Alex و Santa.
 *   العربية: Piper ar_JO-kareem-medium (رخصة بيانات التدريب في MODEL_CARD: للاستخدام غير التجاري).
 * اختبار ذهاب وإياب عبر Whisper (5 نوفمبر 2026): خطأ الكلمات بالإسبانية 1.7%،
 * وبالعربية 28.8% بلا تشكيل و12.5% بالتشكيل؛ لذلك نشكّل النص العربي قبل نطقه (بـ DeepSeek أو Gemini). */
"use strict";
const os = require("os");
const path = require("path");
const voices = require("./scripts/fetch-voices");

let sherpa = null, loadErr = "";
try { sherpa = require("sherpa-onnx-node"); } catch (e) { loadErr = "sherpa-onnx-node غير مثبّت: " + e.message; }

const THREADS = Math.max(1, Number(process.env.OPEN_TTS_THREADS) || Math.min(4, os.cpus().length || 2));
const K = path.join(voices.DIR, "kokoro-int8-multi-lang-v1_0"), P = path.join(voices.DIR, "vits-piper-ar_JO-kareem-medium");
const CFG = {
  es: () => ({ model: { kokoro: { model: path.join(K, "model.int8.onnx"), voices: path.join(K, "voices.bin"), tokens: path.join(K, "tokens.txt"), dataDir: path.join(K, "espeak-ng-data"), lang: "es" }, numThreads: THREADS, provider: "cpu", debug: 0 }, maxNumSentences: 1 }),
  ar: () => ({ model: { vits: { model: path.join(P, "ar_JO-kareem-medium.onnx"), tokens: path.join(P, "tokens.txt"), dataDir: path.join(P, "espeak-ng-data") }, numThreads: THREADS, provider: "cpu", debug: 0 }, maxNumSentences: 1 })
};
const MODEL_OF = { es: "kokoro-int8-multi-lang-v1_0", ar: "vits-piper-ar_JO-kareem-medium" };

/* [id, الاسم العربي, الجنس, رقم المتحدث في النموذج] */
const VOICES = {
  es: [["os-es-dora", "دورا — مفتوح المصدر (مجاني بلا حدود)", "F", 28], ["os-es-alex", "أليكس — مفتوح المصدر (مجاني بلا حدود)", "M", 29], ["os-es-santa", "سانتا — مفتوح المصدر (مجاني بلا حدود)", "M", 53]],
  ar: [["os-ar-kareem", "كريم — مفتوح المصدر (مجاني بلا حدود)", "M", 0]]
};
const BYID = new Map([...VOICES.es, ...VOICES.ar].map(v => [v[0], v]));
const langOf = id => (/^os-ar-|^ar-/.test(id) ? "ar" : "es");
const isOpen = id => BYID.has(id);
/* البديل المفتوح لصوت Gemini المختار: نفس اللغة ونفس الجنس قدر الإمكان */
function fallbackFor(geminiVoice) {
  const lang = langOf(geminiVoice[0]); const list = VOICES[lang];
  return list.find(v => v[2] === geminiVoice[2]) || list[0];
}

/* ---------- تحميل المحركات عند أول حاجة ---------- */
const engines = {}; let state = { es: "idle", ar: "idle" }, lastErr = "";
let fetchTried = 0;
function available(lang) {
  if (!sherpa || state[lang] === "error") return false;
  if (voices.ready(MODEL_OF[lang])) return true;
  /* النماذج لم تُحمَّل وقت البناء: نحمّلها في الخلفية (مرة كل 10 دقائق على الأكثر) ونكمل بما هو متاح */
  if (Date.now() - fetchTried > 600000) { fetchTried = Date.now(); voices.ensure().catch(e => { lastErr = "download: " + e.message; console.error("open voices download", e.message); }); }
  return false;
}
async function engine(lang) {
  if (!sherpa) throw new Error(loadErr);
  if (!engines[lang]) engines[lang] = (async () => {
    if (!voices.ready(MODEL_OF[lang])) { state[lang] = "downloading"; await voices.ensure(); }
    state[lang] = "loading"; const t0 = Date.now();
    const t = await sherpa.OfflineTts.createAsync(CFG[lang]());
    state[lang] = "ready"; console.log(`open tts ${lang} loaded in ${Date.now() - t0}ms (${THREADS} threads)`); return t;
  })().catch(e => { engines[lang] = null; state[lang] = voices.ready(MODEL_OF[lang]) ? "error" : "idle"; lastErr = String(e.message || e); throw e; });
  return engines[lang];
}
/* إن لم يكن هناك مفتاح Gemini فهذه هي الأصوات الأساسية: نجهّزها مبكرًا */
function warm() { for (const l of ["es", "ar"]) engine(l).catch(e => console.error("open tts warm", l, String(e.message).slice(0, 160))); }

/* ---------- تجهيز النص للنطق (لا يغيّر النص المعروض) ---------- */
const HARAKAT = /[ً-ْٰـ]/g, HAS_HARAKAT = /[ً-ْ]/;
const skeleton = t => String(t).replace(HARAKAT, "").replace(/\s+/g, " ").trim();
function prepEs(t) {
  return t.replace(/ﷺ/g, " (la paz y las bendiciones de Allah sean con él) ")
    .replace(/\bAllah\b/g, "Alá")        // espeak يقرأ ll في «Allah» ياءً («Aya»)؛ «Alá» تُنطق صحيحة
    .replace(/[؀-ۿ]+/g, " ")    // الكلمات العربية داخل النص الإسباني لا يقرؤها الصوت الإسباني
    .replace(/\s+/g, " ").trim();
}
function prepAr(t) {
  return t.replace(/ﷺ/g, " صلى الله عليه وسلم ").replace(/ﷻ/g, " جل جلاله ").replace(/ـ/g, "")
    /* لفظ الجلالة يُقرأ أصح بلا تشكيل في هذا الصوت */
    .split(/(\s+)/).map(w => (/لله/.test(skeleton(w)) ? skeleton(w) : w)).join("")
    .replace(/\s+/g, " ").trim();
}
/* يُقبل التشكيل فقط إن بقيت الحروف كما هي حرفًا بحرف */
function acceptTashkeel(orig, out) {
  out = String(out || "").replace(/^[«"'`]+|[»"'`]+$/g, "").trim();
  return out && skeleton(out) === skeleton(orig) ? out : null;
}

/* ---------- طابور: مقطع واحد في كل مرة لكل لغة حتى لا يُخنق المعالج ---------- */
const MAX_PENDING = Number(process.env.OPEN_TTS_QUEUE || 24);
const chain = { es: Promise.resolve(), ar: Promise.resolve() }, pending = { es: 0, ar: 0 };
function enqueue(lang, job) {
  if (pending[lang] >= MAX_PENDING) { const e = new Error("open tts busy"); e.code = "busy"; return Promise.reject(e); }
  pending[lang]++;
  const p = chain[lang].then(job, job); chain[lang] = p.catch(() => { }).finally(() => { pending[lang]--; });
  return p;
}

/* synth(text, voice, {diacritize}) → { pcm: Int16 PCM Buffer, rate, engine } */
async function synth(text, v, o = {}) {
  const lang = langOf(v[0]);
  if (/[﴿﴾]/.test(text)) { const e = new Error("آيات القرآن تُسمع من القراء لا من صوت آلي"); e.code = "quran"; throw e; }
  let spoken = text, tashkeel = false;
  if (lang === "ar") {
    if (HAS_HARAKAT.test(text)) tashkeel = true;
    else if (o.diacritize) { try { const d = acceptTashkeel(text, await o.diacritize(text)); if (d) { spoken = d; tashkeel = true; } } catch (e) { console.error("tashkeel", String(e.message).slice(0, 120)); } }
    spoken = prepAr(spoken);
  } else spoken = prepEs(text);
  if (!spoken) throw new Error("empty text");
  const tts = await engine(lang);
  const a = await enqueue(lang, () => tts.generateAsync({ text: spoken, sid: v[3], speed: 1.0 }));
  const f = a.samples, pcm = Buffer.alloc(f.length * 2);
  for (let i = 0; i < f.length; i++) { const x = Math.max(-1, Math.min(1, f[i])); pcm.writeInt16LE(Math.round(x < 0 ? x * 32768 : x * 32767), i * 2); }
  return { pcm, rate: a.sampleRate, engine: lang === "ar" ? (tashkeel ? "piper+tashkeel" : "piper") : "kokoro" };
}

function status() { return { installed: !!sherpa, es: sherpa ? (voices.ready(MODEL_OF.es) ? state.es : state.es === "idle" ? "not_downloaded" : state.es) : "missing", ar: sherpa ? (voices.ready(MODEL_OF.ar) ? state.ar : state.ar === "idle" ? "not_downloaded" : state.ar) : "missing", threads: THREADS, err: loadErr || lastErr || "" }; }

module.exports = { VOICES, BYID, isOpen, fallbackFor, available, synth, warm, status, langOf, _test: { prepAr, prepEs, acceptTashkeel, skeleton } };
