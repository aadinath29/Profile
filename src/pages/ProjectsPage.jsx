import React from 'react';
import { Layers } from 'lucide-react';
import ProjectsGrid from '../components/sections/projects/ProjectsGrid';
import { projects } from '../data/projects';

export default function ProjectsPage() {
  const shippedCount = projects.filter((p) => !p.isPlaceholder).length;
  const upcomingCount = projects.filter((p) => p.isPlaceholder).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#C4704A] bg-[#C4704A]/10 border border-[#C4704A]/25">
          <Layers className="w-3.5 h-3.5 text-[#C4704A]" />
          <span>PRODUCTION PORTFOLIO</span>
          <span className="text-text-muted">&bull;</span>
          <span className="text-text-secondary">{shippedCount} Shipped / {upcomingCount} Upcoming</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-text-primary tracking-tight">
          Selected Engineering Projects
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
          A showcase of full-stack web applications, database architectures, and distributed systems. Built with strict data isolation, responsive interfaces, and production reliability.
        </p>
      </div>

      {/* Filterable Projects Grid */}
      <ProjectsGrid />
    </div>
  );
}
