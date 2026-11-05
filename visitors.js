/* Visitor counter: total unique visitors (persisted on the data volume) and visitors online now.
 * Each browser keeps a random id in localStorage; the server stores only a short hash of it. */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DIR = process.env.DATA_DIR || require("os").tmpdir();
const FILE = path.join(DIR, "visitors.json");
const ONLINE_MS = 75000, MAX_IDS = 500000;
let S = { total: 0, since: new Date().toISOString().slice(0, 10), ids: [] };
try { S = { ...S, ...JSON.parse(fs.readFileSync(FILE, "utf8")) }; } catch (e) { }
const known = new Set(S.ids); const online = new Map(); let dirty = false;
setInterval(() => { if (!dirty) return; dirty = false; S.ids = [...known]; fs.promises.writeFile(FILE, JSON.stringify(S)).catch(() => { }); }, 20000).unref();
/* write before Railway stops the container on redeploy, so no visitor is lost */
process.once("SIGTERM", () => { try { if (dirty) { S.ids = [...known]; fs.writeFileSync(FILE, JSON.stringify(S)); } } catch (e) { } process.exit(0); });
setInterval(() => { const t = Date.now() - ONLINE_MS; for (const [k, v] of online) if (v < t) online.delete(k); }, 30000).unref();

const ipHits = new Map();
function mount(app, express) {
  app.use("/api/visit", express.json({ limit: "1kb" }));
  app.post("/api/visit", (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const id = String((req.body || {}).id || "");
    if (/^[a-z0-9]{16,40}$/.test(id)) {
      const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString().split(",")[0].trim();
      const now = Date.now(); const h = (ipHits.get(ip) || []).filter(x => now - x < 60000);
      if (h.length < 30) {
        h.push(now); ipHits.set(ip, h); if (ipHits.size > 20000) ipHits.clear();
        const k = crypto.createHash("sha256").update(id).digest("hex").slice(0, 16);
        if (!known.has(k)) { S.total++; dirty = true; if (known.size < MAX_IDS) known.add(k); }
        online.set(k, now);
      }
    }
    const t = Date.now() - ONLINE_MS; let n = 0; for (const v of online.values()) if (v >= t) n++;
    res.json({ total: S.total, online: Math.max(n, 1), since: S.since });
  });
}
module.exports = { mount };
