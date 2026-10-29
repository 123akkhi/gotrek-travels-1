/**
 * Service Worker Registration & Offline Network Monitor
 */

import { saveTrekDataOffline } from './offlineTrekStorage';

export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const initSW = () => {
    // Schedule offline storage caching after idle to never contend with first paint
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        saveTrekDataOffline();
      }, { timeout: 3500 });
    } else {
      setTimeout(() => {
        saveTrekDataOffline();
      }, 2000);
    }

    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[GoTrek SW] Registered successfully with scope:', registration.scope);

        // Check for updates periodically
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('[GoTrek SW] New offline content available; will be used on next refresh.');
              } else {
                console.log('[GoTrek SW] Content is now cached for offline trek usage.');
              }
            }
          };
        };
      })
      .catch((error) => {
        console.warn('[GoTrek SW] Service worker registration failed (may be expected in sandboxed iframe):', error);
      });
  };

  if (document.readyState === 'complete') {
    initSW();
  } else {
    window.addEventListener('load', initSW, { once: true });
  }
}

/**
 * Hook or helper for tracking online/offline browser state
 */
export function listenToNetworkChanges(callback: (isOnline: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}
