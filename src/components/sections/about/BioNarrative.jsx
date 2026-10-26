import React from 'react';
import { developer } from '../../../data/developer';

export default function BioNarrative() {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-lg sm:text-[18px] leading-[1.75] text-[#3D3A36] dark:text-[#EDE8DF] font-sans">
        <p>
          I'm Aadinath — a Full-Stack Developer based in India.
        </p>
        <p>
          I build web applications with the MERN stack: MongoDB, Express, React, and Node.js. I care about code that works, interfaces that don't get in the way, and projects I can actually be proud of.
        </p>
        <p>
          Right now I'm looking for full-time roles where I can contribute from day one.
        </p>
      </div>

      {/* Quiet Contact Metadata Bar */}
      <div className="flex flex-wrap gap-5 pt-6 border-t border-border text-xs font-mono text-text-muted">
        <div className="flex items-center gap-1.5">
          <span className="text-[#C4704A] font-semibold">LOC</span>
          <span>{developer.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#C4704A] font-semibold">MAIL</span>
          <a href={`mailto:${developer.email}`} className="hover:text-[#C4704A] transition-colors">
            {developer.email}
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#C4704A] font-semibold">TEL</span>
          <span>{developer.phone}</span>
        </div>
      </div>
    </div>
  );
}
