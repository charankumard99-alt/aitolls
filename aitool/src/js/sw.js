/* ============================================================
   SW.JS — Service Worker for PWA + Offline Support
   ============================================================ */

const CACHE_NAME = 'aitoolshub-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/auth.css',
    '/blog.css',
    '/compare.css',
    '/profile.css',
    '/tool.css',
    '/admin.css',
    '/data.js',
    '/auth.js',
    '/main.js',
    '/extras.js',
    '/user-features.js',
    '/tool.js',
    '/blog.js',
    '/profile.js',
    '/admin.js',
    '/favicon.svg',
    '/logo.svg',
    '/blog.html',
    '/tool.html',
    '/profile.html',
    '/compare.html',
    '/auth.html',
    '/admin.html',
    '/manifest.json'
];

// Install — cache all critical assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching critical assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch — network first, fallback to cache
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Clone and cache the fresh response
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            })
            .catch(() => {
                // Network failed — try cache
                return caches.match(event.request).then((cached) => {
                    if (cached) return cached;

                    // Fallback for navigation requests — serve index
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }

                    // Return a simple offline response
                    return new Response('Offline — content not cached.', {
                        status: 503,
                        headers: { 'Content-Type': 'text/plain' }
                    });
                });
            })
    );
});
