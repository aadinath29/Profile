# Handoff Report: Visual Redesign Survey — Navigation, Layout, Footer & Home Page

## 1. Observation

Direct code examination was conducted across the target layout, home page, and section components in `C:\Users\Dell\Desktop\Profile`:

### A. Layout & Navigation Files
1. **`src/components/layout/Navbar.jsx`**
   - Lines 40-45: Uses glassmorphism with heavy backdrop blur and borders:
     `isScrolled ? 'h-16 bg-surface/85 backdrop-blur-md border-b border-border shadow-[0_8px_30px_rgba(0,0,0,0.12)]' : 'h-20 bg-surface/60 backdrop-blur-md border-b border-border/40'`
   - Lines 53-58: Brand logo renders `{developer.navLogo || 'A—M'}` with cyan text `text-accent-cyan` and a `/ portfolio` sub-label in monospace.
   - Lines 78-95: Desktop nav links implement a raviklaassens-style dual-span clip-path rolling text reveal (`group-hover:-translate-y-full` and `translate-y-full group-hover:translate-y-0 text-accent-cyan`). Underline indicator at line 99 uses `bg-accent-cyan`.
   - Lines 114-122: Resume CTA button uses `border-accent-gold/40 text-accent-gold hover:shadow-glow-gold`.
   - Lines 131-138: Hamburger button uses `hover:text-accent-cyan hover:border-accent-cyan/60`.

2. **`src/components/layout/MobileMenu.jsx`**
   - Line 103: Fullscreen drawer uses `bg-background/98 backdrop-blur-2xl`.
   - Line 110-113: Logo uses `font-serif text-2xl font-bold tracking-tight text-accent-cyan` displaying `A—M`.
   - Lines 144-156: Mobile links use `text-accent-cyan` for active state and `text-text-primary hover:text-accent-cyan`.
   - Lines 180-207: Social buttons and Resume PDF pill use `hover:text-accent-cyan` and `border-accent-gold/40 text-accent-gold`.

3. **`src/components/layout/Footer.jsx`**
   - Line 22: Background uses `bg-surface/40 backdrop-blur-sm`.
   - Line 25: Renders top ambient cyan glow line:
     `<div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />`
   - Lines 33-35: Monogram link `A—M` in `text-accent-cyan hover:text-accent-gold`.
   - Lines 43-46: Availability pill in emerald (`bg-emerald-500/10 border-emerald-500/25 text-emerald-400`).
   - Lines 61-129: Multi-column links with social buttons (`hover:text-accent-cyan`) and gold resume link.
   - Lines 133-136: Bottom tier renders `© {currentYear} Aadinath Magar ("Aadi"). All rights reserved.` and `Engineered with React 18 • Tailwind CSS • Lenis • Three.js`.

4. **`src/components/layout/Layout.jsx`**
   - Lines 20-56: Integrates Lenis 1.1.18 smooth scroll synchronized with GSAP ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))` and `lagSmoothing(0)`).
   - Lines 58-66: Listens to `location.pathname` and calls `lenis.scrollTo(0, { immediate: true })` and `ScrollTrigger.refresh()`.
   - Line 71: Selection styles use `selection:bg-accent-cyan selection:text-black`.
   - Line 76: Skip-link focus style uses `focus:bg-accent-cyan focus:text-black`.

### B. Home Page & Section Files
1. **`src/pages/HomePage.jsx`**
   - Lines 2-7: Imports `HeroSection`, `StatsSection`, `SkillsSection`, `ProjectsPreview`, `GlobeSection`, and `TestimonialsSection`.
   - Lines 13-22: Renders all 6 components in vertical sequence:
     ```jsx
     <HeroSection />
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-24 md:space-y-36">
       <StatsSection />
       <SkillsSection />
       <ProjectsPreview />
       <GlobeSection />
       <TestimonialsSection />
     </div>
     ```

2. **`src/components/sections/home/HeroSection.jsx`**
   - Lines 48-55: R3F Canvas layer (`<HeroCanvas />`) is centered and takes full screen background (`absolute inset-0 z-0`).
   - Lines 58: Single-column centered content container (`max-w-5xl mx-auto px-6 text-center space-y-6`).
   - Lines 60-68: Pill badge `FULL-STACK DEVELOPER • MERN` with `Sparkles` icon and cyan styling.
   - Lines 71-86: H1 renders `developer.name` split into words with `containerVariants` and `wordVariants` in `font-serif` (`Playfair Display`).
   - Lines 89-96: Subtitle renders `developer.title` ("Full-Stack Developer") in `text-accent-gold`.
   - Lines 99-107: Tagline renders `developer.tagline`.
   - Lines 116-139: CTAs render "Download Resume" (cyan filled button with `shadow-glow-cyan`) and "View Projects" (bordered button).
   - Lines 143-153: Bouncing down-arrow scroll indicator in cyan.

3. **`src/components/sections/home/SkillsSection.jsx`**
   - Lines 15-19: SectionHeading with `eyebrow="STACK & COMPETENCIES"`, `title="Technical Architecture"`.
   - Lines 21-39: Layer 1 infinite marquee ticker rendering `marqueeSkills`.
   - Lines 41-55: Layer 2 bento grid rendering 4 `BentoCard` elements with animated progress bars (0-100%).

4. **`src/components/sections/home/StatsSection.jsx`**
   - Lines 80-110: Renders 4 number counter cards: "Projects Shipped: 2+", "Job Applications: 500+", "Primary Focus: MERN Stack", "Base Location: India". Uses `useCountUp` and `easeOutExpo` easing with cyan/gold colors.

5. **`src/components/sections/home/TestimonialsSection.jsx`**
   - Lines 50-90: Dual-row opposing marquee ticker rendering 3 placeholder recommendation quotes with `Quote`, `UserCheck`, and `Building2` icons.

6. **`src/components/sections/home/GlobeSection.jsx`**
   - Lines 10-59: Full-width section loading `GlobeCanvas` via `React.lazy` + `Suspense` and displaying India coordinate pins.

7. **`src/components/sections/home/ProjectsPreview.jsx`**
   - Lines 41-176: 3-card teaser grid (Spendly, CRM, Placeholder) with cyan hover borders, cyan glow shadow `shadow-[0_0_30px_var(--color-accent-glow)]`, and cyan pulse indicator.

---

## 2. Logic Chain

1. **Alignment with R9 (Elements to completely remove from render)**:
   - Observation: `HomePage.jsx` renders `StatsSection`, `GlobeSection`, and `TestimonialsSection`. `SkillsSection.jsx` renders `MarqueeTicker` and `BentoCard`.
   - Deduction: Requirement R9 mandates removing:
     - Marquee ticker
     - Animated number stat counters (`StatsSection`)
     - Bento grid with progress bars (`BentoCard`)
     - Neon glow effects on any element
     - `GlobeSection` (must keep component file intact, but remove render from `HomePage.jsx`)
     - Testimonials marquee (`TestimonialsSection`)
   - Direct Action: In `HomePage.jsx`, remove `<StatsSection />`, `<GlobeSection />`, and `<TestimonialsSection />` from JSX. In `SkillsSection.jsx`, remove `<MarqueeTicker />` and `<BentoCard />`.

2. **HeroSection Architectural Shift (R3 & R8)**:
   - Observation: Current `HeroSection.jsx` is centered, full-screen 3D canvas, Playfair Display heading, gold subtitle, generic fade-up words.
   - Deduction: Requirement R3 requires:
     - 60/40 layout: Left 60% text column (left-aligned), Right 40% portrait placeholder.
     - Portrait placeholder: warm gradient rectangle, aspect ratio 3:4 (`aspect-[3/4]`), rounded corners, code comment `// Replace with Aadi's real photo — keep the same container dimensions`.
     - Ambient R3F scene: The 3D geometry must not be the centerpiece; place it as a subtle ambient background layer (e.g. top-right or behind text/portrait, low opacity).
     - Exact copy:
       - H1: "I build things for the web."
       - Subheading: "Aadinath Magar — full-stack developer from India. MERN stack, clean architecture, and details that matter."
       - CTA 1: "See my work" (scrolls to projects)
       - CTA 2: "Resume ↗" (links to `/Aadi_Resume-04-09-2026.pdf`)
     - Entrance Animation (Quiet physics, R8):
       - H1: Character-by-character GSAP reveal with randomized timing jitter (`base stagger 0.03s ± 0.01s`), sliding `y: 20 -> 0`, `opacity: 0 -> 1` (or `y: 100% -> 0%` inside overflow-hidden span).
       - Portrait: Scales `0.95 -> 1.0` with spring ease, slight clip-path reveal from bottom.
       - Subtext: Fades in as one block after H1 completes, 400ms delay.
       - CTAs: Slide in from left, 600ms after subtext.

3. **Navbar & MobileMenu Shift (R4)**:
   - Observation: Current `Navbar.jsx` uses glassmorphic blur `bg-surface/85 backdrop-blur-md`, logo `A—M`, raviklaassens clip-path roll hover, cyan underline, and gold resume button.
   - Deduction: Requirement R4 demands:
     - Background: Transparent on page load; on scroll (`scrollY > 80px`), transition cleanly to cream `#F5F0E8` (dark mode: `#141210`) with `backdrop-blur-sm` and a clean, subtle border. Remove heavy glassmorphism and glow.
     - Logo: "Aadinath" in DM Serif Display (`font-serif`), light weight. Remove "A—M" and `/ portfolio`.
     - Nav links: DM Sans (`font-sans`), regular weight, `#3D3A36` in light mode. Underline hover: simple 2px terracotta line (`bg-[#C4704A]`) that slides in from left (`scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300`). Remove double-span text roll.
     - Resume CTA: Simple terracotta outlined button (`border border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white`).
     - MobileMenu: Update logo to "Aadinath", replace cyan/gold with cream background and terracotta accents.

4. **SkillsSection Redesign (R6)**:
   - Observation: Current `SkillsSection.jsx` uses `MarqueeTicker` and `BentoCard` with proficiency percentages.
   - Deduction: Requirement R6 mandates:
     - Heading: "What I work with" (DM Serif Display).
     - Typography-only: Horizontal category list:
       - `Frontend — React · JavaScript · HTML/CSS · Tailwind`
       - `Backend — Node.js · Express · MongoDB`
       - `Tools — Git · Vite · Vercel`
     - Staggered GSAP scroll reveal: Each category line clips in from left, one by one, with a 0.15s stagger using GSAP ScrollTrigger.
     - Zero progress bars, zero icons, zero bento boxes.

5. **Footer Redesign (R10)**:
   - Observation: Current `Footer.jsx` has a top cyan glow line, 3-tier card layout, gold links, and complex colophon.
   - Deduction: Requirement R10 requires:
     - Left: "Aadinath Magar" in DM Serif Display.
     - Right: GitHub + LinkedIn links in DM Sans, terracotta on hover (`text-text-secondary hover:text-[#C4704A]`).
     - Bottom line: "Built with React & Vite · 2026".
     - Background: Same warm cream `#F5F0E8` as page. Remove cyan glow line entirely.

---

## 3. Caveats

1. **Color Token Prerequisites**:
   The redesign relies on Tailwind design tokens (`#F5F0E8` cream base, `#EDE8DF` surface, `#1C1A18` charcoal text, `#3D3A36` body text, `#C4704A` terracotta accent, and `#141210` dark mode). Component implementations can either use Tailwind utility classes mapped to CSS variables (e.g. `bg-background`, `text-text-primary`, `text-accent`) or explicit terracotta utilities (`text-[#C4704A]`, `border-[#C4704A]`, `bg-[#C4704A]`).
2. **Existing E2E Test Suite**:
   The static analyzer in `tests/e2e/tier1/tier1_features_part2.test.js` previously asserted `dev.navLogo === 'A—M'` and marquee/bento presence from earlier milestones. When the visual redesign replaces these, test files may need updating to reflect the new requirements if full `npm run test:e2e` is executed.
3. **Projects Preview Component**:
   The prompt specifically requested survey of `ProjectsPreview.jsx`. In `HomePage.jsx`, `ProjectsPreview` should either be updated to the full-bleed chapter scroll / clean mobile cards (R5) or kept cleanly styled with terracotta accents and zero neon glow.

---

## 4. Conclusion & Implementation Blueprint

Below is the concrete, ready-to-implement code blueprint for the implementer agent.

### A. `src/pages/HomePage.jsx` (Cleaned Render List)

```jsx
import React from 'react';
import HeroSection from '../components/sections/home/HeroSection';
import SkillsSection from '../components/sections/home/SkillsSection';
import ProjectsPreview from '../components/sections/home/ProjectsPreview';
// Note: StatsSection, GlobeSection, and TestimonialsSection are preserved in the codebase
// but deliberately omitted from render per Requirement R9.

export default function HomePage() {
  return (
    <div className="w-full flex flex-col space-y-28 sm:space-y-36 md:space-y-48 pb-28 sm:pb-36 overflow-x-hidden">
      {/* 1. Portrait-First Hero Section (60/40 layout with ambient R3F) */}
      <HeroSection />

      {/* 2. Structured Content Sections with generous editorial whitespace */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-28 sm:space-y-36 md:space-y-48">
        <SkillsSection />
        <ProjectsPreview />
      </div>
    </div>
  );
}
```

---

### B. `src/components/sections/home/HeroSection.jsx` (60/40 Layout, Portrait Placeholder, Ambient R3F, GSAP Jitter Entrance)

```jsx
import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { developer } from '../../../data/developer';
import SceneFallback from '../../3d/SceneFallback';
import ErrorBoundary from '../../common/ErrorBoundary';

const HeroCanvas = lazy(() => import('../../3d/HeroCanvas'));

export default function HeroSection() {
  const containerRef = useRef(null);
  const h1Ref = useRef(null);
  const subtextRef = useRef(null);
  const ctasRef = useRef(null);
  const portraitRef = useRef(null);

  const headlineText = "I build things for the web.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Character-by-character GSAP reveal with randomized timing jitter (R3, R8)
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

      // 2. Portrait: scales 0.95 -> 1.0 with spring ease, clip-path reveal from bottom (R3)
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

      // 3. Subtext: Fades in as one block after H1 completes, 400ms delay (R3)
      // Base H1 duration ~ (27 chars * 0.03s + 0.5s) ≈ 1.3s -> delay ~ 1.2s
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

      // 4. CTAs: Slide in from left, 600ms after subtext (R3)
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
      ref={containerRef}
      data-testid="hero-section"
      className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
    >
      {/* Subtle Ambient R3F 3D Background Element (R3: corner or behind text, NOT centerpiece) */}
      <div className="absolute top-1/4 right-0 w-[320px] sm:w-[420px] lg:w-[500px] h-[320px] sm:h-[420px] lg:h-[500px] -z-10 opacity-35 pointer-events-none overflow-hidden blur-[0.5px]">
        <ErrorBoundary fallback={<SceneFallback />}>
          <Suspense fallback={<SceneFallback />}>
            <HeroCanvas />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* 60/40 Two-Column Layout */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column (60%): Headline, Subtext, CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 z-10">
          {/* H1: Character-by-character GSAP reveal with tight editorial letter spacing */}
          <h1
            ref={h1Ref}
            className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-bold tracking-tight text-text-primary leading-[1.06]"
            style={{ letterSpacing: '-0.03em' }}
          >
            {headlineText.split('').map((char, index) => (
              <span key={index} className="inline-block overflow-hidden">
                <span className="hero-char inline-block will-change-transform">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </span>
            ))}
          </h1>

          {/* Subheading: Real, human voice */}
          <p
            ref={subtextRef}
            className="font-sans text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl"
          >
            Aadinath Magar — full-stack developer from India. MERN stack, clean architecture, and details that matter.
          </p>

          {/* CTAs */}
          <div
            ref={ctasRef}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* CTA 1: Primary "See my work" */}
            <a
              href="#projects-preview"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-text-primary text-background font-sans font-medium text-sm tracking-wide transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              See my work
            </a>

            {/* CTA 2: Outlined Terracotta "Resume ↗" */}
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

        {/* Right Column (40%): Warm Gradient Portrait Placeholder (Aspect Ratio 3:4) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <div
            ref={portraitRef}
            className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] aspect-[3/4] rounded-2xl lg:rounded-3xl bg-gradient-to-tr from-[#C4704A]/25 via-[#EDE8DF] to-[#F5F0E8] dark:from-[#C4704A]/20 dark:via-[#1c1a18] dark:to-[#141210] border border-[#C4704A]/25 shadow-sm overflow-hidden flex flex-col items-center justify-end p-6"
          >
            {/* Replace with Aadi's real photo — keep the same container dimensions */}
            <div className="text-center space-y-1">
              <span className="font-serif text-lg font-medium text-text-primary/70">
                Aadinath Magar
              </span>
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Portrait Placeholder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### C. `src/components/layout/Navbar.jsx` (Minimal, 80px Scroll Cream Transition, DM Serif Logo, Terracotta Underline)

```jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { developer } from '../../data/developer';
import ThemeToggle from '../ui/ThemeToggle';
import MobileMenu from './MobileMenu';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'h-16 bg-[#F5F0E8]/95 dark:bg-[#141210]/95 backdrop-blur-sm border-b border-[#EDE8DF] dark:border-[#1C1A18]'
            : 'h-20 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo: "Aadinath" in DM Serif Display */}
          <Link
            to="/"
            aria-label="Aadinath — Home"
            className="font-serif text-2xl font-normal tracking-tight text-text-primary hover:text-[#C4704A] transition-colors focus:outline-none"
          >
            Aadinath
          </Link>

          {/* Desktop Nav Links with 2px Terracotta Underline Hover */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative py-1 font-sans text-sm tracking-normal transition-colors ${
                    isActive
                      ? 'text-text-primary font-medium'
                      : 'text-[#3D3A36] dark:text-[#A8A39D] hover:text-text-primary'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Underline: 2px terracotta line sliding from left */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#C4704A] rounded-full transition-transform duration-300 ease-out origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Simple Terracotta Outlined Resume Button */}
            <a
              href={developer.resumeUrl || '/Aadi_Resume-04-09-2026.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-1.5 text-xs font-sans font-medium rounded border border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white transition-all duration-200"
            >
              Resume ↗
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded border border-[#EDE8DF] dark:border-[#1C1A18] text-text-primary hover:text-[#C4704A] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
}
```

---

### D. `src/components/sections/home/SkillsSection.jsx` (Typography-Only Category List, No Bars, No Bento, GSAP Clip Reveal)

```jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SKILL_GROUPS = [
  {
    category: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Vite', 'Vercel'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (rowsRef.current && rowsRef.current.length > 0) {
        gsap.fromTo(
          rowsRef.current,
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
            stagger: 0.15,
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
      id="skills"
      ref={sectionRef}
      data-testid="skills-section"
      className="w-full space-y-8 sm:space-y-12"
    >
      {/* Honest, understated heading: "What I work with" */}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
        What I work with
      </h2>

      {/* Typography-only category list */}
      <div className="space-y-6 sm:space-y-8 pt-4">
        {SKILL_GROUPS.map((group, idx) => (
          <div
            key={group.category}
            ref={(el) => (rowsRef.current[idx] = el)}
            className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-3 border-b border-[#EDE8DF] dark:border-[#1C1A18] will-change-transform"
          >
            <span className="font-sans font-medium text-sm uppercase tracking-wider text-[#C4704A] sm:w-32 shrink-0">
              {group.category} —
            </span>
            <span className="font-sans text-xl sm:text-2xl md:text-3xl font-normal text-text-primary tracking-tight">
              {group.skills.join(' · ')}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### E. `src/components/layout/Footer.jsx` (Minimal, DM Serif Logo, DM Sans Socials, 2026 Note, Cream Background)

```jsx
import React from 'react';
import { developer } from '../../data/developer';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="w-full border-t border-[#EDE8DF] dark:border-[#1C1A18] bg-background text-text-secondary transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
```

---

### F. R9 Elements Checklist for Implementer

| Component | File Path | Action Required |
|---|---|---|
| **Marquee Ticker** | `src/components/ui/MarqueeTicker.jsx` | Removed from render in `SkillsSection.jsx` and `HomePage.jsx` |
| **Stat Counters** | `src/components/sections/home/StatsSection.jsx` | Removed from render in `HomePage.jsx` (keep file on disk) |
| **Bento Grid** | `src/components/ui/BentoCard.jsx` | Removed from render in `SkillsSection.jsx` (keep file on disk) |
| **Neon Glows** | All components & CSS | Purged from styles, replaced with warm cream, charcoal, and terracotta |
| **Globe Section** | `src/components/sections/home/GlobeSection.jsx` | Removed from render in `HomePage.jsx` (keep file on disk) |
| **Fake Testimonials** | `src/components/sections/home/TestimonialsSection.jsx` | Removed from render in `HomePage.jsx` (keep file on disk) |

---

## 5. Verification Method

To independently verify after implementation:

1. **Clean Production Build**:
   ```bash
   npm run build
   ```
   Must complete with 0 errors and produce a clean Vite distribution folder.

2. **DOM & Code Inspection**:
   - Inspect `HomePage.jsx`: Verify that only `HeroSection`, `SkillsSection`, and `ProjectsPreview` are rendered. Verify `StatsSection`, `GlobeSection`, and `TestimonialsSection` are absent from JSX.
   - Inspect `HeroSection.jsx`:
     - Verify 60/40 grid layout.
     - Verify H1 character wrapper spans with `.hero-char` and GSAP stagger jitter.
     - Verify warm gradient portrait container has `aspect-[3/4]` and comment `// Replace with Aadi's real photo — keep the same container dimensions`.
     - Verify H1 reads verbatim: `"I build things for the web."`
     - Verify subtitle reads verbatim: `"Aadinath Magar — full-stack developer from India. MERN stack, clean architecture, and details that matter."`
     - Verify CTAs: `"See my work"` and `"Resume ↗"`.
     - Verify ambient R3F container is backgrounded and non-intrusive.
   - Inspect `Navbar.jsx`:
     - Verify scroll threshold `scrollY > 80px`.
     - Verify logo is `"Aadinath"` in DM Serif Display.
     - Verify underline hover uses 2px terracotta `origin-left` slide.
     - Verify absence of cyan and heavy glassmorphism.
   - Inspect `SkillsSection.jsx`:
     - Verify heading is `"What I work with"`.
     - Verify typography-only output with middle dots (`·`) and category labels.
     - Verify GSAP `clipPath` reveal on scroll.
     - Verify absence of `MarqueeTicker` and `BentoCard`.
   - Inspect `Footer.jsx`:
     - Verify `"Aadinath Magar"` in DM Serif Display.
     - Verify `"Built with React & Vite · 2026"`.
     - Verify GitHub and LinkedIn links in DM Sans with terracotta hover.
     - Verify absence of ambient cyan glow line.
