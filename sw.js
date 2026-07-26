const CACHE_NAME = 'mockup-pwa-v11';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(['./', './index.html']))
      .then(() => self.skipWaiting())
  );
});

// Clean up old caches (this is what deletes the old v3)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => clients.claim())
  );
});

// NETWORK-FIRST STRATEGY
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request).then(networkResponse => {
      // If online, fetch newest file and save a copy to cache
      const responseClone = networkResponse.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
      return networkResponse;
    }).catch(() => {
      // If offline, serve from cache
      return caches.match(event.request).then(cached => cached || caches.match('./index.html'));
    })
  );
});
