import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { developer } from '../../data/developer';

const SESSION_KEY = 'am_preloader_seen';
const TOTAL_DURATION_MS = 1400; // Well below the 2500ms safety limit

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (isDone) {
      if (onComplete) onComplete();
      return;
    }

    // Freeze body scrolling during preloading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    let frameId;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(elapsed / TOTAL_DURATION_MS, 1);
      // Ease-out quad curve for dynamic counter feel
      const easedRatio = 1 - Math.pow(1 - ratio, 2);
      const currentVal = Math.min(Math.floor(easedRatio * 100), 100);

      setProgress(currentVal);

      if (ratio < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        try {
          sessionStorage.setItem(SESSION_KEY, 'true');
        } catch (e) {}

        // Hold briefly at 100% then trigger curtain slide-up
        setTimeout(() => {
          setIsExiting(true);
          // Safety unlock: guarantee body scroll is restored and preloader finishes
          setTimeout(() => {
            document.body.style.overflow = '';
            setIsDone(true);
            if (onComplete) onComplete();
          }, 800);
        }, 150);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = '';
    };
  }, [isDone, onComplete]);

  // If already seen this session, skip render completely
  if (isDone) {
    return null;
  }

  return (
    <motion.aside
      key="brand-preloader"
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F5F0E8] text-[#1C1A18] select-none pointer-events-auto"
      initial={{ y: '0%' }}
      animate={{ y: isExiting ? '-100%' : '0%' }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (isExiting) {
          document.body.style.overflow = '';
          setIsDone(true);
          if (onComplete) onComplete();
        }
      }}
    >
      {/* Editorial Monogram Section */}
      <div className="relative flex flex-col items-center px-4">
        <motion.div
          className="font-serif text-6xl sm:text-8xl md:text-9xl font-normal tracking-tight text-[#1C1A18]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {developer.monogram || 'A.M.'}
        </motion.div>

        <motion.p
          className="mt-3 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#7A756D] text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {developer.title || 'Full-Stack Developer'}
        </motion.p>
      </div>

      {/* Progress Counter & Visual Bar */}
      <div className="absolute bottom-16 sm:bottom-20 w-64 sm:w-80 flex flex-col gap-3 px-4">
        <div className="flex justify-between items-center text-xs font-mono text-[#3D3A36]">
          <span className="tracking-widest uppercase text-[10px] text-[#7A756D]">INITIALIZING</span>
          <span className="text-[#C4704A] font-semibold text-sm">{progress}%</span>
        </div>

        {/* Refined Minimalist Track */}
        <div className="w-full h-[2px] bg-[#1C1A18]/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#C4704A] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.aside>
  );
}
