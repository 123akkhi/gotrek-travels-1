import React, { lazy, ComponentType } from 'react';

const prefetchedFactories = new Set<string>();

/**
 * Speculative prefetch for lazy-loaded route/component chunks during idle time or hover.
 * Ensures instant page transitions when a user clicks a destination, package, or tab.
 */
export function prefetchComponent(
  factory: () => Promise<any>,
  key?: string,
  immediate: boolean = false
): void {
  if (typeof window === 'undefined') return;
  const nav = navigator as any;
  if (nav?.connection?.saveData) return;

  const cacheKey = key || factory.toString();
  if (prefetchedFactories.has(cacheKey)) return;
  prefetchedFactories.add(cacheKey);

  const runPrefetch = () => {
    factory().catch(() => {
      prefetchedFactories.delete(cacheKey);
    });
  };

  if (immediate) {
    runPrefetch();
  } else if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(runPrefetch, { timeout: 2500 });
  } else {
    setTimeout(runPrefetch, 600);
  }
}

/**
 * Enhanced lazy component loader with automatic retry on dynamic import chunk failures.
 * Handles network hiccups, dev server module rebuilding, stale bundler chunk hashes, and named exports seamlessly.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T } | Record<string, any>>,
  namedExport?: string
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    const isRefreshed = typeof window !== 'undefined' && sessionStorage.getItem('chunk_retry_refreshed') === 'true';
    const delays = [200, 500, 1000, 2000];

    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const module = await factory();
        // Clear refresh flag on successful load
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('chunk_retry_refreshed', 'false');
        }

        if ('default' in module && module.default) {
          return { default: module.default as T };
        }
        if (namedExport && module[namedExport]) {
          return { default: module[namedExport] as T };
        }
        // Fallback to finding any component function export
        const values = Object.values(module);
        const comp = values.find((val) => typeof val === 'function');
        if (comp) {
          return { default: comp as T };
        }

        return module as { default: T };
      } catch (error: any) {
        console.warn(`[GoTrek] Module dynamic import attempt ${attempt}/4 failed:`, error?.message || error);

        // Check if error is chunk/module load failure
        const isModuleFetchError = 
          error?.name === 'ChunkLoadError' ||
          error?.message?.includes('Failed to fetch dynamically imported module') ||
          error?.message?.includes('Importing a module script failed') ||
          error?.message?.includes('error loading dynamically imported module');

        if (attempt < 4) {
          // Progressive backoff delay
          await new Promise((resolve) => setTimeout(resolve, delays[attempt - 1]));
        } else if (isModuleFetchError && !isRefreshed && typeof window !== 'undefined') {
          // If 4 attempts failed and haven't reloaded yet, perform one clean reload
          sessionStorage.setItem('chunk_retry_refreshed', 'true');
          window.location.reload();
          // Keep promise pending while reload occurs
          return new Promise(() => {});
        } else {
          // Graceful non-crashing fallback component using React.createElement
          const FallbackComponent: React.FC<any> = () => {
            return React.createElement(
              'div',
              { className: 'p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200 m-2' },
              React.createElement('p', { className: 'font-semibold text-slate-700 mb-1' }, 'Content Loading Paused'),
              React.createElement('p', { className: 'text-[11px] mb-2' }, 'Connecting to server to retrieve yatra details...'),
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: () => window.location.reload(),
                  className: 'px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-bold cursor-pointer',
                },
                'Reload'
              )
            );
          };
          return { default: FallbackComponent as unknown as T };
        }
      }
    }

    const SafeFallback: React.FC<any> = () => null;
    return { default: SafeFallback as unknown as T };
  });
}
