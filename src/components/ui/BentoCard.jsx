import React from 'react';
import { motion } from 'framer-motion';

// Clamping utility ensuring proficiency bar remains strictly in [0, 100]% (T2-F18-01)
export const clampLevel = (lvl) => Math.min(Math.max(lvl, 0), 100);

export default function BentoCard({
  category,
  index = 0,
  className = '',
}) {
  const { title, description, colSpan, skills = [] } = category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group p-6 sm:p-8 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-[0_0_25px_var(--color-accent-glow)] ${colSpan} ${className}`}
    >
      {/* Category Header */}
      <div className="space-y-2 mb-6">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
            {description}
          </p>
        )}
      </div>

      {/* Skills Proficiency List */}
      <div className="space-y-4">
        {skills.map((skill, sIdx) => {
          const clamped = clampLevel(skill.level);

          return (
            <div key={skill.name || sIdx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span
                  className={`font-medium tracking-wide break-words ${
                    skill.highlighted
                      ? 'text-text-primary font-semibold'
                      : 'text-text-secondary'
                  }`}
                >
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-text-muted">
                  {clamped}%
                </span>
              </div>

              {/* Progress Track */}
              <div className="h-2 w-full rounded-full bg-surface-subtle/80 overflow-hidden border border-border/40">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${clamped}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.1,
                    delay: 0.15 + sIdx * 0.08,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className={`h-full rounded-full transition-colors ${
                    skill.highlighted
                      ? 'bg-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                      : 'bg-accent-gold/80'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
