import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass } from 'lucide-react';
import ErrorBoundary from '../../common/ErrorBoundary';
import SceneFallback from '../../3d/SceneFallback';
import { developer } from '../../../data/developer';

const GlobeCanvas = lazy(() => import('../../3d/GlobeCanvas'));

export default function GlobeSection() {
  return (
    <section className="relative w-full rounded-3xl border border-border bg-surface/30 backdrop-blur-md overflow-hidden p-8 sm:p-12 lg:p-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Editorial Text Left Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20">
            <Compass className="w-3.5 h-3.5 text-accent-cyan animate-spin-slow" />
            <span>GLOBAL FOOTPRINT &bull; INDIA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary tracking-tight">
            Based in India.<br />
            <span className="text-accent-cyan">Engineering for the World.</span>
          </h2>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans max-w-xl">
            Operating from Navi Mumbai, India (UTC+5:30). Equipped to collaborate across North American, European, and Asia-Pacific time zones with asynchronous discipline, clear Git documentation, and reliable sprint cadence.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/80">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Coordinated Time</span>
              <span className="text-sm font-mono font-semibold text-accent-gold">IST (UTC +5:30)</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Availability</span>
              <span className="text-sm font-mono font-semibold text-accent-cyan">Open for Roles</span>
            </div>
          </div>
        </div>

        {/* 3D Interactive Globe Canvas Right Column */}
        <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-border/60 bg-background/50">
          <ErrorBoundary fallback={<div className="p-8 text-center text-xs font-mono text-text-muted">Globe visual scene offline</div>}>
            <Suspense fallback={<SceneFallback className="!min-h-[360px]" />}>
              <GlobeCanvas />
            </Suspense>
          </ErrorBoundary>

          {/* Floating Location Overlay */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border text-[11px] font-mono text-text-primary">
            <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Navi Mumbai, India (20.59° N, 78.96° E)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
