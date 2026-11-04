/* رفيق الداعية — offline shell. Static files: network-first with cache fallback. API: network-first, cached copy offline. */
const V = "rafiq-v2.1";
const SHELL = ["/", "/index.html", "/styles.css", "/app.js", "/data-core.js", "/data-long.js", "/data-more.js", "/icon.svg", "/manifest.webmanifest"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || u.pathname.startsWith("/api/translate")) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cl = r.clone(); caches.open(V).then(c => c.put(e.request, cl)); } return r; })
    .catch(() => caches.match(e.request).then(m => m || (e.request.mode === "navigate" ? caches.match("/index.html") : Response.error()))));
});
