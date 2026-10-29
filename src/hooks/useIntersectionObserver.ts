import { useState, useEffect, RefObject } from "react";

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  enabled?: boolean;
}

/**
 * Custom React hook for IntersectionObserver-based lazy rendering and loading.
 * Efficiently delays payload download until an element approaches or enters the viewport.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = "250px",
    freezeOnceVisible = true,
    enabled = true,
  }: UseIntersectionObserverOptions = {}
): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (!enabled) return true;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (!enabled) {
      setIsVisible(true);
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          if (freezeOnceVisible) {
            observer.disconnect();
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, enabled, isVisible]);

  return isVisible;
}

export default useIntersectionObserver;
