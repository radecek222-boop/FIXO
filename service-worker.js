// FIXO Service Worker - PWA Offline Support
const CACHE_NAME = 'fixo-cache-v1';
const urlsToCache = [
  '/FIXO/',
  '/FIXO/index.html',
  '/FIXO/public/css/styles.css',
  '/FIXO/public/css/design-system.css',
  '/FIXO/public/css/components.css',
  '/FIXO/public/css/layout.css',
  '/FIXO/manifest.json'
];

// Install - cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('FIXO: Cache otevřena');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('FIXO: Mažu starý cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip API requests (always fetch from network)
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone and cache the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        if (event.request.mode === 'navigate') {
          return caches.match('/FIXO/index.html');
        }
      })
  );
});

// Background sync for offline photo uploads
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-photos') {
    event.waitUntil(syncPhotos());
  }
});

async function syncPhotos() {
  // TODO: Implement offline photo sync when back online
  console.log('FIXO: Synchronizace fotek...');
}
