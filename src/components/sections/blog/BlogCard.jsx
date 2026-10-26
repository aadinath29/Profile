import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useCursor } from '../../../context/CursorContext';

export default function BlogCard({ post, index }) {
  const { setCursor, resetCursor } = useCursor();

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="hover"
      onMouseEnter={() => setCursor('hover', 'Read')}
      onMouseLeave={resetCursor}
      className="group relative rounded-2xl border border-border bg-surface/50 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between hover:border-[#C4704A]/40 transition-colors duration-300"
    >
      <div className="space-y-4">
        {/* Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C4704A]" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center gap-1.5 text-text-muted">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary group-hover:text-[#C4704A] transition-colors leading-snug">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-text-secondary leading-relaxed font-sans line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tag Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-surface text-text-secondary border border-border"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author and Placeholder Notice */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-6 mt-6 border-t border-border text-xs font-mono">
        <span className="text-text-muted">By {post.author?.name || 'Aadinath Magar'}</span>
        <span className="text-[#C4704A] dark:text-[#D9825C] font-mono text-xs">
          // placeholder — content coming soon
        </span>
      </div>
    </motion.article>
  );
}
