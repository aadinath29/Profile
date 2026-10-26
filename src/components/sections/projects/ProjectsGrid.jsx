import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../../data/projects';
import ProjectCard from './ProjectCard';
import { useCursor } from '../../../context/CursorContext';

export default function ProjectsGrid() {
  const [filter, setFilter] = useState('all');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const { setCursor, resetCursor } = useCursor();

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'shipped', label: 'Shipped Products' },
    { id: 'upcoming', label: 'Upcoming Systems' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'shipped') return !p.isPlaceholder;
    if (filter === 'upcoming') return p.isPlaceholder;
    return true;
  });

  const bgColors = [
    'bg-[#F5F0E8] dark:bg-[#141210]',
    'bg-[#EDE8DF] dark:bg-[#191613]',
    'bg-[#E5DFD5] dark:bg-[#1F1A16]',
  ];

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="space-y-12" onMouseMove={handleMouseMove}>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-colors ${
              filter === cat.id
                ? 'bg-[#C4704A] text-white font-medium'
                : 'bg-surface border border-border text-text-muted hover:text-text-primary hover:border-[#C4704A]/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Floating Project Screenshot Preview on Hover (Desktop) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-[120%] w-56 h-36 rounded-xl overflow-hidden shadow-2xl border border-[#C4704A]/30 will-change-transform"
            style={{ left: mousePos.x, top: mousePos.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {/* Replace gradient with project screenshot */}
            <div className="w-full h-full bg-gradient-to-br from-[#C4704A]/25 via-[#EDE8DF] to-[#C4704A]/10 dark:from-[#C4704A]/30 dark:via-[#1e1b18] dark:to-[#141210] flex flex-col items-center justify-center p-4">
              <span className="font-serif text-sm font-semibold text-text-primary text-center">
                {hoveredProject.title}
              </span>
              <span className="font-mono text-[10px] text-[#C4704A] tracking-wider uppercase mt-1">
                Preview
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop (>=1024px) Full-Bleed Chapter Scroll */}
      <div className="hidden lg:block relative w-full rounded-2xl overflow-hidden border border-border">
        {filteredProjects.map((project, idx) => (
          <motion.section
            key={project.id}
            className={`sticky top-0 h-screen w-full flex items-center justify-between px-12 xl:px-20 overflow-hidden ${
              bgColors[idx % bgColors.length]
            }`}
            data-cursor="project"
            data-cursor-text="View"
            onMouseEnter={() => {
              setHoveredProject(project);
              setCursor('project', 'View');
            }}
            onMouseLeave={() => {
              setHoveredProject(null);
              resetCursor();
            }}
          >
            {/* Left Column: Index & Massive Title */}
            <div className="w-1/2 pr-12">
              <span className="font-mono text-xs text-[#C4704A] uppercase tracking-widest block mb-4">
                0{idx + 1} / 0{filteredProjects.length} — {project.subtitle}
              </span>
              <h2 className="font-serif text-[clamp(4.5rem,8.5vw,10.5vw)] font-bold text-text-primary leading-[0.88] tracking-tight">
                {project.title}
              </h2>
            </div>

            {/* Right Column: Narrative, Highlights, Credentials, Tech, CTAs */}
            <div className="w-1/2 pl-12 max-w-xl space-y-6">
              <p className="font-sans text-lg text-text-secondary leading-relaxed">
                {project.description}
              </p>

              {project.highlights && (
                <ul className="space-y-2 text-sm text-text-secondary font-sans">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4704A] mt-2 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {project.demoCredentials && (
                <div className="p-4 rounded-xl border border-[#C4704A]/30 bg-surface/60 space-y-2">
                  <span className="font-mono text-xs font-semibold text-[#C4704A] uppercase tracking-wider block">
                    Demo Credentials
                  </span>
                  <div className="flex gap-6 font-mono text-xs text-text-secondary">
                    <span>
                      Email: <code className="text-text-primary select-all">{project.demoCredentials.email}</code>
                    </span>
                    <span>
                      Pass: <code className="text-text-primary select-all">{project.demoCredentials.password}</code>
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-surface/80 border border-[#C4704A]/20 text-text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border/60">
                {project.demoUrl ? (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor="hover"
                    onMouseEnter={() => setCursor('hover', 'Open')}
                    onMouseLeave={() => setCursor('project', 'View')}
                    className="min-h-[44px] px-6 py-2.5 rounded-lg bg-[#C4704A] text-white font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 hover:bg-[#b0613d] transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                ) : (
                  <span className="font-mono text-xs text-text-muted">Releasing Soon</span>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor="hover"
                    onMouseEnter={() => setCursor('hover', 'Code')}
                    onMouseLeave={() => setCursor('project', 'View')}
                    className="min-h-[44px] px-5 py-2.5 rounded-lg border border-[#C4704A]/40 bg-surface text-text-primary font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 hover:border-[#C4704A] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Mobile/Tablet (<1024px) Clean Minimal Cards */}
      <div className="lg:hidden block space-y-6">
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
}
