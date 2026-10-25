// Service worker: simpan file aplikasi agar bisa dibuka tanpa internet.
const C = 'siagakita-v5';
const FILES = ['./', 'index.html', 'style.css', 'script.js', 'kb.js', 'manifest.json', 'icon.svg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // data BMKG tidak dicegat
  e.respondWith(caches.open(C).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })
      .catch(() => hit || c.match('index.html'));
    return hit || net;
  }));
});
