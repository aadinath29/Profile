import React from 'react';

export default function SceneFallback({ className = '' }) {
  return (
    <div
      data-testid="scene-fallback"
      className={`relative w-full h-full min-h-[100vh] flex flex-col items-center justify-center bg-transparent overflow-hidden ${className}`}
      aria-label="Loading 3D Visual Experience"
    >
      {/* Radial Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      {/* Abstract Skeleton Centerpiece */}
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Aura */}
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-[#C4704A]/20 bg-[#C4704A]/5 animate-pulse-subtle flex items-center justify-center" />

        {/* Inner Dashed Orbital Ring */}
        <div className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full border border-dashed border-[#C4704A]/30 animate-[spin_18s_linear_infinite]" />

        {/* Core Monogram Indicator */}
        <div className="absolute w-12 h-12 rounded-full bg-surface/80 border border-[#C4704A]/30 flex items-center justify-center backdrop-blur-sm shadow-sm">
          <span className="text-xs font-mono font-bold text-[#C4704A]">
            A.M.
          </span>
        </div>
      </div>

      {/* Editorial Status Tag */}
      <div className="mt-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C4704A] animate-ping" />
        <span className="text-[11px] font-mono tracking-widest text-text-muted uppercase">
          Initializing 3D Canvas
        </span>
      </div>
    </div>
  );
}
