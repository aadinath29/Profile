import React from 'react';
import AboutHero from '../components/sections/about/AboutHero';
import DepthPortrait from '../components/sections/about/DepthPortrait';
import BioNarrative from '../components/sections/about/BioNarrative';
import ExperienceTimeline from '../components/sections/about/ExperienceTimeline';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Staggered Editorial Headline */}
      <AboutHero />

      {/* 2. 40/60 Layout: Portrait & Bio Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <DepthPortrait />
        </div>
        <div className="lg:col-span-7">
          <BioNarrative />
        </div>
      </div>

      {/* 3. GSAP Animated Vertical Progress Timeline */}
      <ExperienceTimeline />
    </div>
  );
}
