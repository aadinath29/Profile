import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollProgressBar() {
  const barRef = useRef(null);
  const location = useLocation();

  // 1. Reset progress bar to 0% on route change (T3-ROUTE-02)
  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform = 'scaleX(0)';
    }
  }, [location.pathname]);

  // 2. Hardware-accelerated scroll tracking via scaleX
  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Division-by-zero protection (T2-F11-01) & clamping [0, 1]
      const progress = maxScroll <= 0 ? 0 : Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateProgress();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  return (
    <div
      ref={barRef}
      data-testid="scroll-progress"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9998] pointer-events-none bg-[#C4704A] will-change-transform"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
}
