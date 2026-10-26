import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Key, ArrowRight } from 'lucide-react';
import { projects } from '../../../data/projects';
import { useCursor } from '../../../context/CursorContext';

export default function ProjectsPreview() {
  const { setCursor, resetCursor } = useCursor();

  // Featured production projects: Spendly and Business Management CRM
  const teaserProjects = projects.filter((p) => p.featured !== false).slice(0, 2);

  return (
    <section
      id="projects"
      data-testid="projects-preview-section"
      className="w-full space-y-10 sm:space-y-14"
    >
      {/* Header with Direct Navigation Link to All Projects */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EDE8DF] dark:border-[#1C1A18] pb-6">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Featured Work
          </h2>
          <p className="font-sans text-base text-text-secondary max-w-xl">
            Real applications shipped to production — MERN stack, database design, and end-to-end functionality.
          </p>
        </div>
      </div>

      {/* 2-Card Featured Grid with Crisp Terracotta Borders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {teaserProjects.map((project, idx) => {
          const isPlaceholder = Boolean(project.isPlaceholder);

          return (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
              data-cursor="project"
              data-cursor-text="View"
              onMouseEnter={() => setCursor('project', 'View')}
              onMouseLeave={resetCursor}
              className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[#C4704A]/25 bg-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-[#C4704A] hover:shadow-warm-card overflow-hidden break-words ${
                isPlaceholder ? 'border-dashed opacity-85' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Subtitle / Category pill */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C4704A]">
                    {project.subtitle || 'Production Project'}
                  </span>
                  {isPlaceholder && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono border border-[#C4704A]/30 text-text-muted">
                      In Development
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary transition-colors group-hover:text-[#C4704A]">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="font-sans text-sm text-text-secondary leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Demo Credentials Callout */}
                {project.demoCredentials && (
                  <div className="p-3 rounded-xl border border-[#C4704A]/25 bg-surface-subtle font-mono text-xs space-y-1.5 overflow-hidden">
                    <div className="flex items-center gap-1.5 font-semibold text-[#C4704A]">
                      <Key className="w-3.5 h-3.5 shrink-0" />
                      <span>Demo Credentials</span>
                    </div>
                    <div className="text-[11px] text-text-secondary flex flex-wrap gap-x-3 gap-y-1 break-all">
                      <span>
                        <strong className="text-text-primary">Email:</strong> {project.demoCredentials.email}
                      </span>
                      <span>
                        <strong className="text-text-primary">Pass:</strong> {project.demoCredentials.password}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-surface/80 border border-[#EDE8DF] dark:border-[#1C1A18] text-text-secondary group-hover:border-[#C4704A]/30 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#EDE8DF] dark:border-[#1C1A18] mt-6">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setCursor('link', 'Open');
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setCursor('project', 'View');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#C4704A] hover:underline min-h-[44px]"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted min-h-[44px] flex items-center">
                    Preview Soon
                  </span>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setCursor('link', 'Code');
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setCursor('project', 'View');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors ml-auto min-h-[44px]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
