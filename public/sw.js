/**
 * Service Worker for Nivasi Space PWA
 * Prevents app refresh on minimize/restore and enables offline caching
 */

const CACHE_NAME = 'nivasi-space-v1';
const STATIC_CACHE_NAME = 'nivasi-static-v1';
const DYNAMIC_CACHE_NAME = 'nivasi-dynamic-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/logo.png',
    '/logo.svg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');

    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Install failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');

    event.waitUntil(
        Promise.all([
            // Take control of all clients immediately
            self.clients.claim(),

            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => {
                            return name !== STATIC_CACHE_NAME &&
                                name !== DYNAMIC_CACHE_NAME &&
                                name !== CACHE_NAME;
                        })
                        .map((name) => {
                            console.log('[Service Worker] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
        ])
    );
});

// Fetch event - Network first, fallback to cache strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests (except for fonts and images)
    if (url.origin !== location.origin) {
        // Allow Google Fonts and other CDN resources
        if (!url.hostname.includes('googleapis.com') &&
            !url.hostname.includes('gstatic.com') &&
            !url.hostname.includes('firebase')) {
            return;
        }
    }

    // Skip firebase auth and API requests - let them go through network
    if (url.pathname.includes('/__/auth/') ||
        url.pathname.includes('/api/') ||
        url.hostname.includes('firebaseapp.com') ||
        url.hostname.includes('firebase.google.com') ||
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('identitytoolkit')) {
        return;
    }

    // For HTML pages - Network first, cache fallback
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone the response before caching
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // Fallback to index.html for SPA routing
                        return caches.match('/index.html');
                    });
                })
        );
        return;
    }

    // For static assets (JS, CSS, images) - Cache first, network fallback
    if (request.destination === 'script' ||
        request.destination === 'style' ||
        request.destination === 'image' ||
        request.destination === 'font') {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached response and update cache in background
                    fetch(request).then((networkResponse) => {
                        if (networkResponse.ok) {
                            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                                cache.put(request, networkResponse);
                            });
                        }
                    }).catch(() => { });
                    return cachedResponse;
                }

                // Not in cache, fetch from network and cache
                return fetch(request).then((networkResponse) => {
                    const responseClone = networkResponse.clone();
                    caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return networkResponse;
                });
            })
        );
        return;
    }

    // For all other requests - Network first with cache fallback
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Only cache successful responses
                if (response.ok) {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(request);
            })
    );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => caches.delete(cacheName))
            );
        });
    }
});

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);
});

// Handle push notifications (if needed in future)
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push received:', event);
});

// Lifecycle event - this helps prevent app refresh on minimize
self.addEventListener('visibilitychange', () => {
    // Service worker stays active when app is minimized
    console.log('[Service Worker] Visibility changed');
});

// Keep the service worker alive
self.addEventListener('periodicsync', (event) => {
    console.log('[Service Worker] Periodic sync:', event.tag);
});
