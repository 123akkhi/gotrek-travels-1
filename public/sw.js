// GoTrek Travels - High Altitude Trek Offline Service Worker
const CACHE_NAME = 'gotrek-trek-cache-v2';

const STATIC_ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.jpg',
  '/favicon.ico',
  '/robots.txt',
  '/images/destinations/adi-kailash4.webp',
  '/images/destinations/adi-kailash3.webp',
  '/images/destinations/mansarovar.jpg',
  '/images/destinations/chardham.jpg'
];

// Install Event - Precache critical shell and offline resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[GoTrek SW] Precaching offline app shell & trek resources');
      return cache.addAll(STATIC_ASSETS_TO_CACHE).catch((err) => {
        console.warn('[GoTrek SW] Pre-cache partial fail, continuing anyway:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[GoTrek SW] Removing old cache version:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate with Offline Fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip chrome-extension, non-http, or backend API modifications
  if (!url.protocol.startsWith('http')) return;

  // Handle image and static assets: Cache first, fallback to network
  if (
    url.pathname.startsWith('/images/') || 
    url.pathname.endsWith('.jpg') || 
    url.pathname.endsWith('.png') || 
    url.pathname.endsWith('.svg') || 
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached asset immediately, but revalidate in background if online
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          }).catch(() => {/* Offline, ignore */});
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // If offline and image fails, return placeholder or cached shell
          return caches.match('/logo.jpg');
        });
      })
    );
    return;
  }

  // Handle HTML navigation requests: Network first with Cache fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;
          const fallback = await caches.match('/index.html');
          if (fallback) return fallback;
          return new Response('GoTrek Offline Trek Mode: Route Map & Altitude Charts are cached in your browser storage.', {
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // Default stale-while-revalidate for other requests
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
