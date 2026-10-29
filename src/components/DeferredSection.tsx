import React, { useState, useEffect, useRef, ReactNode } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: string | number;
  className?: string;
  id?: string;
}

/**
 * DeferredSection: Defers rendering of below-the-fold components until
 * they approach the user's viewport (default 450px before entering screen).
 * Drastically reduces initial JS parse time, network requests, and DOM footprint.
 */
export const DeferredSection: React.FC<DeferredSectionProps> = ({
  children,
  fallback,
  rootMargin = "600px 0px",
  minHeight = "280px",
  className = "",
  id,
}) => {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window !== "undefined" && id && window.location.hash === `#${id}`) {
      return true;
    }
    return false;
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    // If targeted by hash or clicked, render immediately
    const checkHash = () => {
      if (id && window.location.hash === `#${id}`) {
        setShouldRender(true);
      }
    };
    window.addEventListener("hashchange", checkHash);

    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => {
      window.removeEventListener("hashchange", checkHash);
      observer.disconnect();
    };
  }, [shouldRender, rootMargin, id]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={className}
      style={{
        minHeight: shouldRender ? undefined : minHeight,
      }}
    >
      {shouldRender ? (
        children
      ) : (
        fallback || (
          <div
            style={{ minHeight }}
            className="w-full flex items-center justify-center bg-transparent pointer-events-none"
            aria-hidden="true"
          />
        )
      )}
    </div>
  );
};

export default DeferredSection;
