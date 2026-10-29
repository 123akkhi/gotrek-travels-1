import React, { useEffect, useRef } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (barRef.current) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
              const currentProgress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
              barRef.current.style.transform = `scaleX(${currentProgress}) translateZ(0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-[3px] z-[120] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 origin-left transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(245,158,11,0.6)]"
        style={{
          transform: 'scaleX(0) translateZ(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

