import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = ['Gemini API', 'LangGraph', 'ChromaDB', 'MCP', 'LangSmith'];

const ROADMAP_STEPS = [
  { step: '01', title: 'Tool Calling + RAG' },
  { step: '02', title: 'Agent Workflows + MCP' },
  { step: '03', title: 'Multi-Agent System + Evals' },
];

export default function CurrentFocusSection() {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (elementsRef.current && elementsRef.current.length > 0) {
        gsap.fromTo(
          elementsRef.current,
          {
            clipPath: 'inset(0 100% 0 0)',
            x: -20,
            opacity: 0,
          },
          {
            clipPath: 'inset(0 0% 0 0)',
            x: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="focus"
      ref={sectionRef}
      data-testid="focus-section"
      className="w-full space-y-8 sm:space-y-12"
    >
      {/* Header Eyebrow & Status Bar */}
      <div
        ref={(el) => (elementsRef.current[0] = el)}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 will-change-transform"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#C4704A] font-semibold">
          CURRENT FOCUS · 2026
        </span>
        <div className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary bg-[#EDE8DF]/50 dark:bg-[#181614]/70 px-3.5 py-1.5 rounded-full border border-[#EDE8DF] dark:border-[#2A2724] w-fit shadow-xs">
          <span className="text-[#C4704A] font-semibold tracking-wide">STATUS:</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-text-primary font-medium">In Progress</span>
          <span className="text-text-muted">· 3-Month Roadmap</span>
        </div>
      </div>

      {/* Main Narrative Block: H2 Title & Description */}
      <div
        ref={(el) => (elementsRef.current[1] = el)}
        className="space-y-4 will-change-transform"
      >
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
          AI Agent
        </h2>
        <p className="font-sans text-lg sm:text-xl text-text-secondary max-w-3xl leading-relaxed">
          Building DevOps Knowledge Agent — an AI-powered system combining RAG, tool calling, memory, and multi-agent workflows.
        </p>
      </div>

      {/* Minimalist Structured Typography Rows */}
      <div className="space-y-6 sm:space-y-8 pt-4">
        {/* Row 1: Tech Stack */}
        <div
          ref={(el) => (elementsRef.current[2] = el)}
          className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-4 border-b border-[#EDE8DF] dark:border-[#1C1A18] will-change-transform"
        >
          <span className="font-sans font-medium text-sm uppercase tracking-wider text-[#C4704A] sm:w-36 shrink-0">
            TECH STACK —
          </span>
          <span className="font-sans text-xl sm:text-2xl md:text-3xl font-normal text-text-primary tracking-tight break-words">
            {TECH_STACK.join(' · ')}
          </span>
        </div>

        {/* Row 2: Roadmap Linear Progression */}
        <div
          ref={(el) => (elementsRef.current[3] = el)}
          className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-4 border-b border-[#EDE8DF] dark:border-[#1C1A18] will-change-transform"
        >
          <span className="font-sans font-medium text-sm uppercase tracking-wider text-[#C4704A] sm:w-36 shrink-0">
            ROADMAP —
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base sm:text-xl md:text-2xl font-normal text-text-primary tracking-tight">
            {ROADMAP_STEPS.map((item, idx) => (
              <React.Fragment key={item.step}>
                <span className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#C4704A]">
                  <span className="font-mono text-xs sm:text-sm text-[#C4704A] font-semibold">
                    {item.step}
                  </span>
                  <span className="text-text-muted">—</span>
                  <span>{item.title}</span>
                </span>
                {idx < ROADMAP_STEPS.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#C4704A]/70 shrink-0 mx-1" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
