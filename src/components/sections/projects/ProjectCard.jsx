import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Key, CheckCircle2, Sparkles } from 'lucide-react';
import { useCursor } from '../../../context/CursorContext';

export default function ProjectCard({ project, index }) {
  const { setCursor, resetCursor } = useCursor();

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24, delay: index * 0.1 }}
      data-cursor="project"
      data-cursor-text="View"
      onMouseEnter={() => setCursor('project', 'View')}
      onMouseLeave={resetCursor}
      className="relative group rounded-2xl border border-[#C4704A]/30 bg-surface/80 p-6 sm:p-8 flex flex-col justify-between overflow-hidden hover:border-[#C4704A]/50 transition-colors"
    >
      <div className="space-y-5">
        {/* Header: Title & Status Badge */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary group-hover:text-[#C4704A] transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-[#C4704A] mt-1">
              {project.subtitle}
            </p>
          </div>

          {project.isPlaceholder ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#C4704A] bg-[#C4704A]/10 border border-[#C4704A]/25">
              <Sparkles className="w-3 h-3" />
              <span>Upcoming</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-text-secondary bg-surface border border-border">
              Shipped
            </span>
          )}
        </div>

        {/* Narrative Description */}
        <p className="text-sm text-text-secondary leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Architecture Highlights */}
        {project.highlights && (
          <ul className="space-y-2 pt-2 text-xs text-text-secondary">
            {project.highlights.map((item, hIdx) => (
              <li key={hIdx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4704A] shrink-0 mt-1.5" />
                <span className="leading-normal">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Demo Credentials Callout Box */}
        {project.demoCredentials && (
          <div className="p-4 rounded-xl border border-[#C4704A]/30 bg-surface/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#C4704A] font-semibold uppercase tracking-wider">
              <Key className="w-3.5 h-3.5" />
              <span>Demo Credentials</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-text-secondary">
              <div>
                <span className="text-text-muted block text-[10px]">EMAIL:</span>
                <code className="text-text-primary select-all">{project.demoCredentials.email}</code>
              </div>
              <div>
                <span className="text-text-muted block text-[10px]">PASSWORD:</span>
                <code className="text-text-primary select-all">{project.demoCredentials.password}</code>
              </div>
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-[#C4704A]/20 text-text-primary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links Bar */}
      <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border">
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            onMouseEnter={() => setCursor('hover', 'Open')}
            onMouseLeave={() => setCursor('project', 'View')}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#C4704A] text-white font-mono font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 hover:bg-[#b0613d] transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-xs font-mono text-text-muted">Preview Releasing Soon</span>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            onMouseEnter={() => setCursor('hover', 'Code')}
            onMouseLeave={() => setCursor('project', 'View')}
            className="min-h-[44px] px-4 py-2.5 rounded-lg border border-[#C4704A]/40 bg-surface text-text-primary font-mono font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 hover:border-[#C4704A] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}
