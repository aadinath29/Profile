import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { developer } from '../../../data/developer';

// Ease-out exponential easing function
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

// Custom hook for numeric count-up with reduced motion bypass (T2-F16-01, T2-F16-02, T2-F16-03)
function useCountUp(target, duration = 1800, shouldStart = false, prefersReduced = false) {
  const [count, setCount] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (prefersReduced) {
      setCount(target);
      return;
    }
    if (!shouldStart || typeof target !== 'number') return;

    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.floor(eased * target);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, shouldStart, prefersReduced]);

  return count;
}

function StatCard({ stat, inView, prefersReduced, index }) {
  const isNumeric = typeof stat.value === 'number';
  const animatedNumber = useCountUp(
    isNumeric ? stat.value : 0,
    stat.value > 100 ? 1800 : 1200,
    inView,
    prefersReduced
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group p-6 sm:p-8 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm overflow-hidden hover:border-accent-cyan/40 transition-all duration-300"
    >
      {/* Background Accent Glow on Card Hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-accent-cyan/10 to-transparent -z-10" />

      <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-accent-cyan tracking-tight">
        {isNumeric ? animatedNumber : stat.value}
        <span className="text-accent-gold ml-0.5">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-text-muted font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const hasTriggeredRef = useRef(false);

  // Idempotent execution guard: once triggered, prevent resetting (T2-F16-01, T2-F16-02, T3-SCROLL-03)
  if (inView && !hasTriggeredRef.current) {
    hasTriggeredRef.current = true;
  }
  const shouldAnimate = inView || hasTriggeredRef.current;

  return (
    <section
      ref={sectionRef}
      data-testid="stats-section"
      className="w-full"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {developer.stats.map((stat, idx) => (
          <StatCard
            key={stat.label || idx}
            stat={stat}
            inView={shouldAnimate}
            prefersReduced={Boolean(prefersReduced)}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
