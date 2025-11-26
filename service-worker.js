// FIXO Service Worker - PWA Offline Support v4.0
const CACHE_NAME = 'fixo-cache-v4';
const DATA_CACHE_NAME = 'fixo-data-cache-v3';

// Static assets to cache
const STATIC_ASSETS = [
    '/FIXO/',
    '/FIXO/index.html',
    '/FIXO/styles/main.css',
    '/FIXO/styles/design-system.css',
    '/FIXO/styles/components.css',
    '/FIXO/styles/layout.css',
    '/FIXO/styles/app.css',
    '/FIXO/src/app.js',
    '/FIXO/manifest.json'
];

// Data files to cache for offline access
const DATA_ASSETS = [
    '/FIXO/data/repairs.json',
    '/FIXO/data/craftsmen.json'
];

// External resources to cache
const EXTERNAL_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Install - cache all files
self.addEventListener('install', (event) => {
    console.log('FIXO SW: Installing v4.0...');
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(CACHE_NAME).then((cache) => {
                console.log('FIXO SW: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            // Cache data assets
            caches.open(DATA_CACHE_NAME).then((cache) => {
                console.log('FIXO SW: Caching data assets');
                return cache.addAll(DATA_ASSETS);
            })
        ]).then(() => {
            console.log('FIXO SW: Installation complete');
            return self.skipWaiting();
        })
    );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
    console.log('FIXO SW: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
                        console.log('FIXO SW: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('FIXO SW: Claiming clients');
            return self.clients.claim();
        })
    );
});

// Fetch strategy: Cache first, network fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip API requests (always fetch from network)
    if (url.pathname.includes('/api/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Handle data files with stale-while-revalidate
    if (url.pathname.includes('/data/') && url.pathname.endsWith('.json')) {
        event.respondWith(staleWhileRevalidate(request, DATA_CACHE_NAME));
        return;
    }

    // Handle image requests
    if (request.destination === 'image') {
        event.respondWith(cacheFirst(request, CACHE_NAME));
        return;
    }

    // Default: cache first for static assets
    event.respondWith(cacheFirst(request, CACHE_NAME));
});

// Cache first strategy
async function cacheFirst(request, cacheName) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Offline fallback for navigation
        if (request.mode === 'navigate') {
            return caches.match('/FIXO/index.html');
        }
        throw error;
    }
}

// Network first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Stale-while-revalidate strategy (good for data that changes)
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    // Fetch fresh data in background
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => {
        // Network failed, return cached if available
        return cachedResponse;
    });

    // Return cached immediately, or wait for network
    return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('FIXO SW: Background sync triggered:', event.tag);

    if (event.tag === 'sync-photos') {
        event.waitUntil(syncPhotos());
    }

    if (event.tag === 'sync-repair-history') {
        event.waitUntil(syncRepairHistory());
    }
});

async function syncPhotos() {
    console.log('FIXO SW: Syncing photos...');
    // Get pending photos from IndexedDB and upload
    // TODO: Implement when backend is ready
}

async function syncRepairHistory() {
    console.log('FIXO SW: Syncing repair history...');
    // Sync repair history to cloud
    // TODO: Implement when backend is ready
}

// Push notifications
self.addEventListener('push', (event) => {
    console.log('FIXO SW: Push notification received');

    let data = { title: 'FIXO', body: 'Máte novou zprávu' };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: '/FIXO/public/images/icon-192.png',
        badge: '/FIXO/public/images/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
            url: data.url || '/FIXO/'
        },
        actions: [
            { action: 'open', title: 'Otevřít' },
            { action: 'close', title: 'Zavřít' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('FIXO SW: Notification clicked');
    event.notification.close();

    if (event.action === 'close') return;

    const urlToOpen = event.notification.data?.url || '/FIXO/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                // If app is already open, focus it
                for (const client of windowClients) {
                    if (client.url.includes('/FIXO/') && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Otherwise open new window
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// Message handler for cache updates
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_REPAIR') {
        // Cache specific repair data for offline use
        cacheRepairData(event.data.repair);
    }
});

async function cacheRepairData(repair) {
    const cache = await caches.open(DATA_CACHE_NAME);
    // Store repair in cache for offline access
    const response = new Response(JSON.stringify(repair), {
        headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(`/FIXO/offline-repair-${repair.id}`, response);
    console.log('FIXO SW: Repair cached for offline:', repair.id);
}

console.log('FIXO SW: Service Worker loaded v3.0');
