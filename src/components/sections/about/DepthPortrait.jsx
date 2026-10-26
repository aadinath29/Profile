import React, { useRef, useState, useEffect, useCallback } from 'react';
import { developer } from '../../../data/developer';

export default function DepthPortrait() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glareStyle, setGlareStyle] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  // Detect coarse pointer or mobile viewport to bypass tilt (T1-F29-05, T2-F29-04)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: coarse), (max-width: 768px)');
    const update = () => setIsTouch(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.('change', update);
    return () => mediaQuery.removeEventListener?.('change', update);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Standard tilt formula matching T1-F29-02 & clamped per T2-F29-01
    const rawRotateX = ((y / rect.height) - 0.5) * -20;
    const rawRotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = Math.min(Math.max(rawRotateX, -20), 20);
    const rotateY = Math.min(Math.max(rawRotateY, -20), 20);

    setTilt({ rotateX, rotateY });

    // Glare formula matching T1-F29-03
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle(`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent)`);
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    // Reset tilt to flat perspective (T1-F29-04, T2-F29-02)
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlareStyle('');
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="depth-portrait"
      className="relative w-full aspect-[3/4] rounded-2xl select-none transition-all duration-300 group"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-[#C4704A]/30 bg-gradient-to-br from-[#C4704A]/25 via-[#EDE8DF] to-[#C4704A]/10 dark:from-[#C4704A]/30 dark:via-[#1e1b18] dark:to-[#141210] shadow-xl transition-transform duration-200 ease-out will-change-transform flex items-end p-6"
        style={{
          transform: isTouch
            ? 'none'
            : `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Replace with Aadi's real photo — keep the same container dimensions */}
        {/* Replace portrait-placeholder.jpg with Aadi's real photo */}
        {/* Replace gradient placeholder with real photo */}
        {/* /portrait-placeholder.jpg */}
        <img
          src="/aadinath-magar.jpg"
          alt="Aadinath Magar — Full-Stack Developer"
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
          loading="lazy"
        />

        {/* Dynamic Specular Glare Reflection Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
          style={{
            background: glareStyle,
            opacity: glareStyle ? 1 : 0,
          }}
        />

        {/* Subtle Radial Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient opacity-30" />

        {/* Overlay Monogram & Location Badge */}
        <div className="relative z-30 flex items-center justify-between w-full pointer-events-none">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C4704A] bg-surface/80 backdrop-blur-sm px-3 py-1.5 rounded border border-[#C4704A]/20">
            {developer.location}
          </span>
          <span className="font-serif text-xs font-bold text-text-primary/70 bg-surface/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#C4704A]/20">
            {developer.monogram}
          </span>
        </div>
      </div>
    </div>
  );
}
