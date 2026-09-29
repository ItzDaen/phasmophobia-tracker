/* Phasmophobia Tracker service worker
 *
 * Strategy:
 *  - network-first for navigations and same-origin assets, falling back to the
 *    cache when offline. A deploy is therefore picked up on the next load
 *    instead of being shadowed forever, which is what a plain cache-first
 *    handler would do.
 *  - a new version does NOT skipWaiting on its own. It waits until the page
 *    asks for it (see the "Reload" action in bundle.js), so a half-updated
 *    page never mixes old JS with new assets.
 */
const VERSION = 'v4';
const CACHE_NAME = `phasmo-tracker-${VERSION}`;

const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/init.js',
  './js/data_common.js',
  './js/data_en.js',
  './js/data_it.js',
  './js/bundle.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = (await cache.match(request)) || (await caches.match(request));
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const shell = await caches.match('./index.html');
      if (shell) return shell;
    }
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

// External CDNs (fonts, font-awesome) are never precached and never cached
// here: go straight to the network, and degrade quietly when offline.
async function external(request) {
  try {
    return await fetch(request);
  } catch (err) {
    const cached = await caches.match(request);
    return cached || new Response('', { status: 504 });
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    event.respondWith(external(request));
    return;
  }

  // Let these stay fresh so a deploy is never pinned by the cache.
  if (url.pathname.endsWith('/sw.js') || url.pathname.endsWith('/manifest.json')) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  event.respondWith(networkFirst(request));
});
