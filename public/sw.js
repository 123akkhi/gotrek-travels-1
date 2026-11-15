// GoTrek Travels - High Altitude Trek Offline Service Worker
const CACHE_NAME = 'gotrek-trek-cache-v5-real-reviews';

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
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[GoTrek SW] Precaching offline app shell & trek resources');
      return cache.addAll(STATIC_ASSETS_TO_CACHE).catch((err) => {
        console.warn('[GoTrek SW] Pre-cache partial fail, continuing anyway:', err);
      });
    })
  );
});

// Activate Event - Clean up ALL stale old caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[GoTrek SW] Purging old cache version:', name);
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

  // CRITICAL: NEVER intercept or cache backend API calls (/api/*), Vite modules, or WebSocket requests!
  if (
    url.pathname.startsWith('/api/') || 
    url.pathname.includes('/@vite/') || 
    url.pathname.includes('/@fs/') ||
    url.pathname.includes('/src/') ||
    url.pathname.endsWith('.ts') ||
    url.pathname.endsWith('.tsx')
  ) {
    return; // Pass directly to native browser network
  }

  // Skip chrome-extension, non-http
  if (!url.protocol.startsWith('http')) return;

  // Handle image and static media assets: Cache first, fallback to network
  if (
    url.pathname.startsWith('/images/') || 
    url.pathname.endsWith('.jpg') || 
    url.pathname.endsWith('.png') || 
    url.pathname.endsWith('.svg') || 
    url.pathname.endsWith('.webp')
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

  // For JavaScript and CSS: Network first to ensure code updates reflect immediately
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
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
        .catch(() => caches.match(event.request))
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
