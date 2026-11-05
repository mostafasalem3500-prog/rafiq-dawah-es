/* Monthly Gemini spending guard.
 * Every Gemini response reports its token usage; we price it with the published paid-tier
 * rates (ai.google.dev/gemini-api/docs/pricing, read 4 Nov 2026) and keep a running monthly total
 * on disk. When the month's estimate reaches the budget, Gemini features pause until next month
 * (the site falls back to browser voices and the Google Translate link). */
const fs = require("fs");
const path = require("path");

const BUDGET = Number(process.env.GEMINI_MONTHLY_BUDGET_USD || 35);
const PAID = process.env.GEMINI_PAID === "1"; // free tier: Google charges nothing, so the cap only reports
const DIR = process.env.DATA_DIR || require("os").tmpdir();
const FILE = path.join(DIR, "gemini-spend.json");
try { fs.mkdirSync(DIR, { recursive: true }); } catch (e) { }

/* USD per 1M tokens [input, output]; `x2027` = multiplier from 1 Jan 2027 (announced doubling) */
const PRICES = [
  [/flash-lite-tts/, 0.5, 6, 2],
  [/flash-tts/, 0.5, 9, 2],
  [/tts/, 1, 20, 1],                 // older/preview TTS: priced conservatively
  [/3\.1-flash-lite/, 0.25, 1.5, 1],
  [/flash-lite/, 0.30, 2.5, 1],
  [/3\.8-flash/, 0.75, 3.75, 2],
  [/deepseek/, 0.28, 0.42, 1],       // DeepSeek (prepaid balance) — priced conservatively
  [/./, 1.5, 7.5, 1]                 // anything else: conservative
];
function price(model) {
  const p = PRICES.find(([re]) => re.test(model)); const k = Date.now() >= Date.UTC(2027, 0, 1) ? p[3] : 1;
  return [p[1] * k, p[2] * k];
}
const month = () => new Date().toISOString().slice(0, 7);
let S = { month: month(), usd: 0, calls: 0, byKind: {}, or: { usd: 0, calls: 0 } };
try { const j = JSON.parse(fs.readFileSync(FILE, "utf8")); if (j.month === S.month) S = { ...j, or: j.or || { usd: 0, calls: 0 } }; } catch (e) { }
let dirty = false;
setInterval(() => { if (dirty) { dirty = false; fs.promises.writeFile(FILE, JSON.stringify(S)).catch(() => { }); } }, 15000).unref();

function roll() { if (S.month !== month()) { S = { month: month(), usd: 0, calls: 0, byKind: {}, or: { usd: 0, calls: 0 } }; dirty = true; } }
/* OpenRouter is paid from a prepaid balance; it returns the real cost of each call (usage.cost, USD),
 * so we add that exact figure and stop using OpenRouter once the month's cap is reached. */
const OR_BUDGET = Number(process.env.OPENROUTER_MONTHLY_BUDGET_USD || 8);
function recordOR(usd) { roll(); const v = Number(usd) || 0; S.or.usd += v; S.or.calls++; S.usd += v; S.byKind.openrouter = (S.byKind.openrouter || 0) + v; dirty = true; }
function orAllowed() { roll(); return S.or.usd < OR_BUDGET; }
function record(model, usage, kind) {
  roll(); if (!usage) return;
  const [pi, po] = price(model);
  const out = (usage.candidatesTokenCount || 0) + (usage.thoughtsTokenCount || 0);
  const usd = ((usage.promptTokenCount || 0) * pi + out * po) / 1e6;
  S.usd += usd; S.calls++; S.byKind[kind] = (S.byKind[kind] || 0) + usd; dirty = true;
}
/* text features keep working until 100%; audio stops at 85% so translation/tutor keep a reserve */
function allowed(kind) { roll(); if (!PAID) return true; return S.usd < BUDGET * (kind === "tts" ? 0.85 : 1); }
function report() { roll(); return { tier: PAID ? "paid" : "free (no charges; estimate only)", month: S.month, estimatedUSD: +S.usd.toFixed(3), budgetUSD: BUDGET, calls: S.calls, openrouter: { usd: +S.or.usd.toFixed(4), calls: S.or.calls, budgetUSD: OR_BUDGET, paused: S.or.usd >= OR_BUDGET }, byKind: Object.fromEntries(Object.entries(S.byKind).map(([k, v]) => [k, +v.toFixed(3)])) }; }
module.exports = { record, allowed, report, BUDGET, recordOR, orAllowed, OR_BUDGET };
