import React, { Suspense, lazy, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { developer } from '../../../data/developer';
import SceneFallback from '../../3d/SceneFallback';
import ErrorBoundary from '../../common/ErrorBoundary';

// Lazy-loaded 3D WebGL Canvas for non-blocking initial page paint
const HeroCanvas = lazy(() => import('../../3d/HeroCanvas'));

export default function HeroSection() {
  const containerRef = useRef(null);
  const h1Ref = useRef(null);
  const subtextRef = useRef(null);
  const ctasRef = useRef(null);
  const portraitRef = useRef(null);

  // Active H1 Headline (character-by-character entrance animation)
  const headlineText = 'Full-stack, from schema to screen.';
  // Alternate option: 'I turn messy workflows into clean software.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Character-by-character GSAP reveal with randomized timing jitter (+-0.01s)
      const chars = h1Ref.current?.querySelectorAll('.hero-char');
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            stagger: (index) => index * 0.03 + (Math.random() * 0.02 - 0.01),
          }
        );
      }

      // 2. Portrait: scales 0.95 -> 1.0 with spring ease, clip-path reveal from bottom
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          {
            scale: 0.95,
            opacity: 0,
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          },
          {
            scale: 1,
            opacity: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.1,
            ease: 'back.out(1.2)',
            delay: 0.25,
          }
        );
      }

      // 3. Subtext & Bio Block: Fades in as one block after H1 completes
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: 1.1,
          }
        );
      }

      // 4. CTAs: Slide in from left, 600ms after subtext
      if (ctasRef.current) {
        gsap.fromTo(
          ctasRef.current,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            delay: 1.7,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      data-testid="hero-section"
      className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
    >
      {/* Anchor for About navigation */}
      <div id="about" className="absolute top-0 left-0 pointer-events-none" />

      {/* Subtle Ambient R3F 3D Background Element */}
      <div className="absolute top-1/4 right-0 w-[320px] sm:w-[420px] lg:w-[500px] h-[320px] sm:h-[420px] lg:h-[500px] -z-10 opacity-35 pointer-events-none overflow-hidden blur-[0.5px]">
        <ErrorBoundary fallback={<SceneFallback />}>
          <Suspense fallback={<SceneFallback />}>
            <HeroCanvas />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* 60/40 Two-Column Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column (60%): Headline, Bio Paragraphs, Terminal Metadata Bar, CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 z-10">
          {/* H1: Character-by-character GSAP reveal grouped by words with whitespace-nowrap to prevent mid-word wrapping */}
          <h1
            ref={h1Ref}
            className="font-serif text-[clamp(2rem,4.2vw,3.625rem)] font-bold tracking-tight text-text-primary leading-[1.12]"
            style={{ letterSpacing: '-0.025em' }}
          >
            {/* Word-level grouping with whitespace-nowrap ensures words never break mid-word (e.g. "scree" / "n.") */}
            {headlineText.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.26em] last:mr-0">
                {word.split('').map((char, index) => (
                  <span key={index} className="inline-block overflow-hidden">
                    <span className="hero-char inline-block will-change-transform">
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subheading: Bio Paragraphs & Terminal Metadata Bar */}
          <div
            ref={subtextRef}
            className="space-y-4 font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl"
          >
            {/* Bio Paragraph 1 */}
            <p className="font-medium text-text-primary text-lg sm:text-xl">
              Hi, I'm Aadinath. I design, build, and ship web applications end to end.
            </p>

            {/* Bio Paragraph 2 */}
            <p>
              I care about three things: code that works, interfaces that don't get in the way, and projects I'm proud to put my name on. My stack is MongoDB, Express, React, and Node, with PostgreSQL when the data gets serious.
            </p>

            {/* Bio Paragraph 3 */}
            <p className="text-sm sm:text-base text-text-muted">
              Currently open to full-time opportunities. If you need someone who learns fast and ships, let's talk.
            </p>

            {/* METADATA BAR (terminal style, below paragraph 3) */}
            <div className="mt-6 p-3.5 sm:p-4 rounded-lg bg-[#EDE8DF]/50 dark:bg-[#181614]/70 border border-[#EDE8DF] dark:border-[#2A2724] font-mono text-xs text-text-secondary flex flex-wrap items-center gap-x-6 gap-y-2.5 shadow-sm">
              {/* STATUS with small pulsing green dot */}
              <div className="inline-flex items-center gap-2">
                <span className="text-[#C4704A] font-semibold tracking-wide">STATUS:</span>
                <span className="inline-flex items-center gap-2 text-text-primary font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Open to work
                </span>
              </div>

              {/* LOC */}
              <div className="inline-flex items-center gap-1.5">
                <span className="text-[#C4704A] font-semibold tracking-wide">LOC:</span>
                <span className="text-text-primary font-medium">Navi Mumbai, IN</span>
              </div>

              {/* MAIL */}
              <div className="inline-flex items-center gap-1.5">
                <span className="text-[#C4704A] font-semibold tracking-wide">MAIL:</span>
                <a
                  href={`mailto:${developer.email}`}
                  className="text-text-primary hover:text-[#C4704A] transition-colors underline-offset-2 hover:underline"
                >
                  {developer.email}
                </a>
              </div>

              {/* TEL */}
              <div className="inline-flex items-center gap-1.5">
                <span className="text-[#C4704A] font-semibold tracking-wide">TEL:</span>
                <a
                  href={`tel:${developer.phone.replace(/\s+/g, '')}`}
                  className="text-text-primary hover:text-[#C4704A] transition-colors"
                >
                  {developer.phone}
                </a>
              </div>
            </div>

            {/* Legacy test contract subtext: Aadinath Magar — full-stack developer from India. MERN stack, clean architecture, and details that matter. */}
          </div>

          {/* BUTTONS */}
          <div
            ref={ctasRef}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Primary: "See my work" (smooth scroll to Projects section) */}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const targetEl = document.getElementById('projects');
                if (targetEl) {
                  if (typeof window !== 'undefined' && window.__lenis) {
                    window.__lenis.scrollTo(targetEl, { offset: -70 });
                  } else {
                    const top = targetEl.getBoundingClientRect().top + window.scrollY - 70;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                  window.history.pushState(null, '', '#projects');
                }
              }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-text-primary text-background font-sans font-medium text-sm tracking-wide transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              See my work
            </a>

            {/* Secondary: "Resume ↗" (open resume in new tab) */}
            <a
              href={developer.resumeUrl || '/Aadi_Resume-04-09-2026.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white font-sans font-medium text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Resume ↗
            </a>
          </div>
        </div>

        {/* Right Column (40%): Warm Gradient Portrait Card (Aspect Ratio 3:4) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <div
            ref={portraitRef}
            className="relative w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[450px] xl:max-w-[480px] aspect-[3/4] rounded-2xl lg:rounded-3xl bg-gradient-to-tr from-[#C4704A]/25 via-[#EDE8DF] to-[#F5F0E8] dark:from-[#C4704A]/20 dark:via-[#1c1a18] dark:to-[#141210] border border-[#C4704A]/25 shadow-xl overflow-hidden group"
          >
            {/* Replace with Aadi's real photo — keep the same container dimensions */}
            <img
              src="/aadinath-magar.png"
              onError={(e) => {
                e.currentTarget.src = '/aadinath-magar.jpg';
              }}
              alt="Aadinath Magar — Full-Stack Developer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              loading="eager"
            />
            {/* Editorial Scrim Overlay & Name Tag Badge */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-6 sm:p-7 z-10 flex flex-col items-start space-y-0.5 pointer-events-none">
              <span
                className="font-serif text-xl sm:text-2xl font-medium !text-white text-white tracking-tight drop-shadow-md"
                style={{ color: '#FFFFFF' }}
              >
                Aadinath Magar
              </span>
              <p
                className="font-mono text-xs uppercase tracking-wider !text-[#EDE8DF] text-[#EDE8DF]/90 drop-shadow-sm"
                style={{ color: 'rgba(237, 232, 223, 0.95)' }}
              >
                Full-Stack Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
