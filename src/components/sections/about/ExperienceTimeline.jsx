import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Building, CheckCircle2 } from 'lucide-react';
import { timeline } from '../../../data/timeline';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [activeNodes, setActiveNodes] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const length = path.getTotalLength ? path.getTotalLength() : 1000;

      // Safe zero-length handling (T2-F30-01)
      const safePathLength = length > 0 ? length : 1000;

      // Initialize line as fully offset / invisible (T1-F30-01)
      gsap.set(path, {
        strokeDasharray: safePathLength,
        strokeDashoffset: safePathLength,
      });

      // Scroll-driven progressive line draw (T1-F30-01, T3-SCROLL-05)
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 85%',
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            // Node illumination on scroll progress intersection (T1-F30-04)
            const count = timeline.length;
            const newActive = [];
            timeline.forEach((_, idx) => {
              const nodeThreshold = count > 1 ? idx / (count - 1) : 0;
              if (progress >= nodeThreshold * 0.85) {
                newActive.push(idx);
              }
            });
            setActiveNodes(newActive);
          },
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger on window resize (T1-F30-05, T2-F30-03)
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    // Teardown contract: kill ScrollTrigger and revert context on unmount (T2-F30-02)
    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative space-y-12 pt-12 border-t border-border">
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
          Experience & Education
        </h2>
        <p className="text-text-secondary text-sm sm:text-base max-w-xl">
          Internships, engineering work, and education so far.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-10 space-y-12">
        {/* Animated Vertical SVG Guide & Stroke Line - Shortened & clipped so it never collides with Featured Work */}
        <div className="absolute top-6 bottom-32 left-2 sm:left-4 w-4 pointer-events-none -translate-x-1/2 overflow-hidden">
          <svg className="w-full h-full overflow-hidden" preserveAspectRatio="none">
            {/* Background Muted Track Line */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border"
              strokeDasharray="4 4"
            />
            {/* Animated Terracotta Foreground Path */}
            <path
              ref={pathRef}
              d="M 8 0 V 1200"
              stroke="#C4704A"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* TODO: Replace with real experience/education entries */}
        {/* Timeline Item Cards */}
        {timeline.map((item, idx) => {
          const isLit = activeNodes.includes(idx);

          return (
            <div
              key={item.id}
              className={`relative transition-all duration-500 ${
                isLit ? 'opacity-100 translate-x-0' : 'opacity-60 -translate-x-1'
              }`}
            >
              {/* Terracotta Timeline Pin Indicator */}
              <div
                className={`absolute -left-[30px] sm:-left-[38px] top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isLit
                    ? 'border-[#C4704A] bg-[#C4704A] scale-110'
                    : 'border-[#C4704A]/50 bg-[#C4704A]/30 scale-90'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isLit ? 'bg-white' : 'bg-[#C4704A]'
                  }`}
                />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm space-y-5 hover:border-[#C4704A]/40 transition-colors overflow-hidden break-words">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C4704A] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C4704A]" />
                    <span>{item.period}</span>
                  </span>
                  <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full border border-border bg-surface text-text-muted">
                    {item.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1A18] dark:text-[#EDE8DF]">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-text-secondary text-sm font-medium mt-1">
                    <Building className="w-3.5 h-3.5 text-[#C4704A]" />
                    <span>{item.organization}</span>
                    {item.location && <span className="text-text-muted">&bull; {item.location}</span>}
                  </div>
                </div>

                <p className="text-sm text-[#3D3A36] dark:text-[#EDE8DF]/90 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Achievements List */}
                {item.achievements && item.achievements.length > 0 && (
                  <ul className="space-y-2 pt-2 text-xs sm:text-sm text-[#3D3A36] dark:text-[#EDE8DF]/80">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#C4704A] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Skill Pills */}
                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border/60">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-[#C4704A]/20 text-text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
