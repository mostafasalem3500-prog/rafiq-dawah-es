/* رفيق الداعية — offline shell. Static files: network-first with cache fallback. API: network-first, cached copy offline. */
const V = "rafiq-v4";
const SHELL = ["/", "/index.html", "/styles.css", "/app.js", "/data-core.js", "/data-long.js", "/data-more.js", "/data-trust.js", "/icon.svg", "/manifest.webmanifest", ...["lib", "a1", "a2", "b1", "c1", "extra", "phrases-a", "phrases-b", "islam", "vocab", "engine"].map(f => `/learn/${f}.js?v=3`)];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => Promise.allSettled(SHELL.map(u => c.add(new Request(u, { cache: "reload" }))))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || u.pathname.startsWith("/api/translate")) return;
  e.respondWith(fetch(e.request, { cache: "no-cache" }).then(r => { if (r.ok) { const cl = r.clone(); caches.open(V).then(c => c.put(e.request, cl)); } return r; })
    .catch(() => caches.match(e.request).then(m => m || (e.request.mode === "navigate" ? caches.match("/index.html") : Response.error()))));
});
