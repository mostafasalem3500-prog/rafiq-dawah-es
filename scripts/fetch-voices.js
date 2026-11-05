#!/usr/bin/env node
/* يحمّل نماذج الأصوات مفتوحة المصدر من إصدارات sherpa-onnx على GitHub (لا تُرفع إلى المستودع لكبر حجمها).
 * يعمل تلقائيًّا بعد npm install (postinstall)، فتُبنى صورة Railway والنماذج داخلها.
 * لا يُفشل التثبيت أبدًا: إن تعذّر التحميل يعمل الموقع بـ Gemini وحده، ويعيد الخادم المحاولة عند الحاجة.
 * تخطَّ التحميل محليًّا بـ SKIP_OPEN_VOICES=1 */
"use strict";
const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream/promises");
const { Readable } = require("stream");

const BASE = "https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/";
const DIR = process.env.OPEN_TTS_DIR || path.join(__dirname, "..", "models");
/* [المجلد، الملف الذي يدل على اكتمال التحميل، ما نحتفظ به من الأرشيف] */
const MODELS = [
  ["kokoro-int8-multi-lang-v1_0", "model.int8.onnx", /^(model\.int8\.onnx|voices\.bin|tokens\.txt|LICENSE|espeak-ng-data\/.*)$/],
  ["vits-piper-ar_JO-kareem-medium", "ar_JO-kareem-medium.onnx", /^(ar_JO-kareem-medium\.onnx|tokens\.txt|MODEL_CARD|espeak-ng-data\/.*)$/]
];

const ready = name => { const m = MODELS.find(x => x[0] === name); return !!m && fs.existsSync(path.join(DIR, m[0], ".complete")); };

async function fetchOne([name, , keep]) {
  if (ready(name)) return false;
  const tar = require("tar"), bz2 = require("unbzip2-stream");
  const tmp = path.join(DIR, name + ".partial");
  fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp, { recursive: true });
  const t0 = Date.now();
  const r = await fetch(BASE + name + ".tar.bz2", { redirect: "follow" });
  if (!r.ok || !r.body) throw new Error(`${name}: HTTP ${r.status}`);
  await pipeline(Readable.fromWeb(r.body), bz2(), tar.x({
    cwd: tmp, strip: 1,
    filter: p => keep.test(p.replace(/^[^/]+\//, ""))
  }));
  fs.writeFileSync(path.join(tmp, ".complete"), new Date().toISOString());
  const dest = path.join(DIR, name); fs.rmSync(dest, { recursive: true, force: true }); fs.renameSync(tmp, dest);
  console.log(`open voices: ${name} ready in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  return true;
}

let running = null;
/* يحمّل الناقص فقط؛ آمن للاستدعاء أكثر من مرة */
function ensure() {
  if (!running) running = (async () => { fs.mkdirSync(DIR, { recursive: true }); for (const m of MODELS) await fetchOne(m); })().finally(() => { running = null; });
  return running;
}

module.exports = { ensure, ready, DIR, MODELS };

if (require.main === module) {
  if (process.env.SKIP_OPEN_VOICES === "1") { console.log("open voices: skipped (SKIP_OPEN_VOICES=1)"); process.exit(0); }
  ensure().then(() => process.exit(0)).catch(e => { console.warn("open voices: download failed, the site will use Gemini only until the server retries —", e.message); process.exit(0); });
}
