/* رفيق الداعية — offline shell. Static files: network-first with cache fallback. API: network-first, cached copy offline. */
const V = "rafiq-v13";
const SHELL = ["/", "/index.html", "/styles.css", "/app.js", "/visits.js", "/data-core.js", "/data-long.js", "/data-more.js", "/data-trust.js", "/data-cards.js", "/data-quotes.js", "/data-quran.js", "/data-more2.js", "/data-more3.js", "/data-msg-a.js", "/data-msg-b.js", "/data-msg-c.js", "/data-msg-d.js", "/data-msg-e.js", "/data-train.js", "/data-ideas2.js", "/icon.svg", "/manifest.webmanifest", ...["lib", "a1", "a2", "b1", "c1", "c2", "units-more", "units-more2", "extra", "phrases-a", "phrases-b", "phrases-c", "islam", "dawah", "vocab", "vocab-b", "vocab-c", "conv-b", "phrases-d", "vocab-d", "conv-c", "qbank", "exams", "engine", "play", "metodo", "read-b"].map(f => `/learn/${f}.js?v=10`)];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => Promise.allSettled(SHELL.map(u => c.add(new Request(u, { cache: "reload" }))))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || u.pathname.startsWith("/api/translate")) return;
  e.respondWith(fetch(e.request, { cache: "no-cache" }).then(r => { if (r.ok) { const cl = r.clone(); caches.open(V).then(c => c.put(e.request, cl)); } return r; })
    .catch(() => caches.match(e.request).then(m => m || (e.request.mode === "navigate" ? caches.match("/index.html") : Response.error()))));
});
