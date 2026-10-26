import React from 'react';
import { developer } from '../../data/developer';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="w-full border-t border-[#EDE8DF] dark:border-[#1C1A18] bg-background text-text-secondary transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left: "Aadinath Magar" in DM Serif Display */}
        <div>
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Aadinath Magar
          </span>
          <p className="mt-1 font-sans text-xs text-text-muted">
            Built with React &amp; Vite · 2026
          </p>
        </div>

        {/* Right: GitHub + LinkedIn in DM Sans with Terracotta on Hover */}
        <div className="flex items-center gap-6 font-sans text-sm">
          <a
            href={developer.github || 'https://github.com/aadinath29'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-[#C4704A] transition-colors"
          >
            GitHub
          </a>
          <a
            href={developer.linkedin || 'https://www.linkedin.com/in/aadinath-magar-profile'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-[#C4704A] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

