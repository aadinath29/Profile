# Technical Analysis & Implementation Blueprint: Milestone 4 & Milestone 5

**Author**: `explorer_m4_1`  
**Target Project**: Aadinath Magar ("Aadi") Corporate Portfolio Website  
**Scope**: 
- **Milestone 4**: Core Feature Pages (`AboutPage`, `ProjectsPage`, `BlogPage`, `ContactPage`) & Advanced Micro-Interactions (Portrait 3D Parallax Tilt, GSAP SVG Timeline Line Draw)
- **Milestone 5**: React Three Fiber (R3F) Interactive 3D Globe on Home (`GlobeCanvas`, India Highlight Beacon, Orbital Ring)
- **Quality Assurance**: Complete Alignment with E2E Test Suite (Features 21–26, 29, 30 across Tiers 1–4)

---

## 1. Executive Summary

This document establishes the exhaustive architectural blueprint and component specifications for implementing **Milestone 4** and **Milestone 5** of the Aadinath Magar corporate portfolio website. The visual and interactive design adheres strictly to the dual benchmark established in `ORIGINAL_REQUEST.md`: the cinematic depth of `raviklaassens.com` combined with the editorial typography, generous whitespace, and minimal grid aesthetics of `13studio.framer.website/about`.

Every component is designed to maintain 100% compliance with existing system contracts:
1. Multi-page routing under `react-router-dom` v6 with `<AnimatePresence mode="wait">` and `<PageCurtain>` route wipe transitions.
2. Lenis smooth scrolling coordinated synchronously with GSAP `ScrollTrigger` (`lagSmoothing(0)`).
3. Dark-primary color system (`#07090e`, `#0e131f`) with neon cyan (`#00f0ff`) and warm gold (`#fbbf24`) accents, dynamically adaptive to light theme (`#f8fafc`).
4. High-performance custom cursor (`CustomCursor`) reacting to `data-cursor="project"` and `data-cursor="hover"`, with touch suppression on coarse pointers.
5. All 406 existing E2E tests remain green with zero regressions.

---

## 2. Architecture & File Layout

To ensure modularity and clean separation of concerns as mandated in `PROJECT.md`, page components act as composition containers that orchestrate dedicated, single-responsibility section components located in `src/components/sections/`:

```
src/
├── components/
│   ├── 3d/
│   │   ├── HeroCanvas.jsx             # Existing R3F Hero Canvas
│   │   ├── HeroGeometry.jsx           # Existing Centerpiece
│   │   ├── ParticleField.jsx          # Existing Particle Field
│   │   ├── SceneFallback.jsx          # Existing Skeleton Loader
│   │   ├── GlobeCanvas.jsx            # [M5 NEW] R3F 3D Globe Canvas with Suspense & Context Loss Guard
│   │   └── GlobeSphere.jsx            # [M5 NEW] Earth sphere, India pin beacon & orbital ring
│   ├── sections/
│   │   ├── about/
│   │   │   ├── AboutHero.jsx          # [M4 NEW] Word-by-word staggered headline reveal
│   │   │   ├── DepthPortrait.jsx      # [M4 NEW] 3D Parallax tilt card with glare & mouse tracking
│   │   │   ├── BioNarrative.jsx       # [M4 NEW] Verified bio narrative, tech highlights, quick facts
│   │   │   └── ExperienceTimeline.jsx # [M4 NEW] GSAP ScrollTrigger SVG strokeDashoffset animated timeline
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx        # [M4 NEW] Spendly, CRM (demo creds), Coming Soon, hover glow
│   │   │   └── ProjectsGrid.jsx       # [M4 NEW] Filterable projects grid with staggered entrance
│   │   ├── blog/
│   │   │   └── BlogCard.jsx           # [M4 NEW] Minimal editorial card with tag filters & read time
│   │   ├── contact/
│   │   │   ├── ContactForm.jsx        # [M4 NEW] EmailJS form with regex validation, states, placeholder creds
│   │   │   └── ContactInfo.jsx        # [M4 NEW] Social cards, direct email/tel links, >= 44px tap targets
│   │   └── home/
│   │       └── GlobeSection.jsx       # [M5 NEW] Standalone / embedded Home Globe section with India callout
├── pages/
│   ├── AboutPage.jsx                  # [M4 REFACTOR] Composes AboutHero, DepthPortrait, BioNarrative, ExperienceTimeline
│   ├── ProjectsPage.jsx               # [M4 REFACTOR] Composes ProjectsGrid and ProjectCard showcase
│   ├── BlogPage.jsx                   # [M4 REFACTOR] Composes BlogCard grid with search/tag filters
│   ├── ContactPage.jsx                # [M4 REFACTOR] Composes ContactForm and ContactInfo
│   └── HomePage.jsx                   # [M5 REFACTOR] Integrates GlobeSection alongside Stats & Skills
```

---

## 3. Blueprint 1: `AboutPage` (`src/pages/AboutPage.jsx`) & Sections

### 3.1 Feature Scope & Test Invariants
- **Feature 21 (About Page Hero & Bio Narrative)**:
  - Headline word-by-word reveal: "Full-Stack Developer. Builder. Problem Solver." using `developer.aboutHeroWords`.
  - Verified bio narrative sourced from `src/data/developer.js` mentioning MERN stack, RESTful APIs, and database engineering.
  - Section heading typography using Playfair Display (`font-serif`).
- **Feature 29 (About Portrait 3D Parallax Tilt)**:
  - Component: `src/components/sections/about/DepthPortrait.jsx`.
  - Image: `/portrait-placeholder.jpg` with mandatory comment:
    `// Replace portrait-placeholder.jpg with Aadi's real photo`
  - Mouse-tracked rotation formula clamped between -20° and +20°:
    $$\text{rotateX} = \text{clamp}\left(\left(\frac{y}{\text{height}} - 0.5\right) \times -20, -20, 20\right)$$
    $$\text{rotateY} = \text{clamp}\left(\left(\frac{x}{\text{width}} - 0.5\right) \times 20, -20, 20\right)$$
  - Glare overlay calculation:
    $$\text{radial-gradient}\left(\text{circle at } \frac{x}{w} \times 100\% \ \frac{y}{h} \times 100\%, \text{rgba}(255,255,255,0.2), \text{transparent}\right)$$
  - Smooth reset to `(0, 0)` on `mouseleave`.
  - Mobile touch bypass: Disable tilt if `(pointer: coarse)` or `(max-width: 768px)`.
  - Teardown: Remove window/element event listeners on component unmount.
- **Feature 22 & Feature 30 (Experience & Education Timeline + GSAP SVG Line Draw)**:
  - Component: `src/components/sections/about/ExperienceTimeline.jsx`.
  - Data sourced from `src/data/timeline.js`: Kosqu Technolab, OptimumValue Solution, and Bharati Vidyapeeth College of Engineering (BVCOE).
  - Vertical SVG `<svg><path ... /></svg>` element with dynamic `strokeDasharray` and `strokeDashoffset`.
  - Progress offset calculation: $\text{offset} = \text{length} \times (1 - \text{progress})$.
  - Safe zero-length guard: If path length is 0, return 0.
  - GSAP `ScrollTrigger` with `scrub: 0.5`, animating offset from `length` to `0`.
  - Node illumination: When scroll progress intersects node offset position, node active state lights up (`#00f0ff` glow).
  - Unmount cleanup: `ctx.revert()` or `ScrollTrigger.kill()`.
  - Dynamic resize listener calling `ScrollTrigger.refresh()`.

### 3.2 Component Implementation Specifications

#### A. `src/components/sections/about/AboutHero.jsx`
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { developer } from '../../../data/developer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 35, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
};

export default function AboutHero() {
  const words = developer.aboutHeroWords || ["Full-Stack", "Developer.", "Builder.", "Problem", "Solver."];

  return (
    <section className="space-y-6 pt-6 pb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20"
      >
        <Sparkles className="w-3.5 h-3.5 text-accent-cyan animate-pulse-subtle" />
        <span>ARCHITECT &bull; DEVELOPER &bull; MERN</span>
      </motion.div>

      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-text-primary flex flex-wrap gap-x-3 sm:gap-x-5 leading-tight"
      >
        {words.map((word, idx) => (
          <motion.span key={idx} variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="text-lg sm:text-xl text-accent-gold font-sans max-w-2xl"
      >
        {developer.tagline}
      </motion.p>
    </section>
  );
}
```

#### B. `src/components/sections/about/DepthPortrait.jsx`
```jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { developer } from '../../../data/developer';

export default function DepthPortrait() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glareStyle, setGlareStyle] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  // Detect coarse pointer or mobile viewport to bypass tilt (T1-F29-05, T2-F29-04)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: coarse), (max-width: 768px)');
    const update = () => setIsTouch(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.('change', update);
    return () => mediaQuery.removeEventListener?.('change', update);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Standard tilt formula matching T1-F29-02 & clamped per T2-F29-01
    const rawRotateX = ((y / rect.height) - 0.5) * -20;
    const rawRotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = Math.min(Math.max(rawRotateX, -20), 20);
    const rotateY = Math.min(Math.max(rawRotateY, -20), 20);

    setTilt({ rotateX, rotateY });

    // Glare formula matching T1-F29-03
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle(`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent)`);
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    // Reset tilt to flat perspective (T1-F29-04, T2-F29-02)
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlareStyle('');
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="depth-portrait"
      className="relative w-full aspect-[4/5] rounded-2xl p-1 select-none transition-all duration-300 group"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-border bg-surface shadow-2xl transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: isTouch
            ? 'none'
            : `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Replace portrait-placeholder.jpg with Aadi's real photo */}
        {/* Replace gradient placeholder with real photo */}
        <img
          src="/portrait-placeholder.jpg"
          alt={`${developer.name} portrait`}
          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
          loading="eager"
        />

        {/* Dynamic Specular Glare Reflection Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
          style={{
            background: glareStyle,
            opacity: glareStyle ? 1 : 0,
          }}
        />

        {/* Cinematic Ambient Dark Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

        {/* Overlay Monogram & Location Badge */}
        <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan bg-background/80 backdrop-blur-md px-2.5 py-1 rounded border border-border">
            {developer.location}
          </span>
          <span className="text-xs font-serif font-bold text-text-primary bg-background/80 backdrop-blur-md px-2.5 py-1 rounded border border-border">
            {developer.monogram}
          </span>
        </div>
      </div>
    </div>
  );
}
```

#### C. `src/components/sections/about/BioNarrative.jsx`
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Briefcase, GraduationCap } from 'lucide-react';
import { developer } from '../../../data/developer';

export default function BioNarrative() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary tracking-tight">
          Biography & Background
        </h2>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
          {developer.bio}
        </p>
      </div>

      {/* Core Engineering Philosophies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-5 rounded-xl border border-border bg-surface/40 backdrop-blur-sm space-y-2">
          <div className="flex items-center gap-2 text-accent-cyan text-sm font-mono font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>Systems Architecture</span>
          </div>
          <p className="text-xs text-text-muted leading-normal">
            Modular MVC patterns, JWT-protected API gateways, optimized SQL/NoSQL schema modeling, and microservices readiness.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-surface/40 backdrop-blur-sm space-y-2">
          <div className="flex items-center gap-2 text-accent-gold text-sm font-mono font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Rigor</span>
          </div>
          <p className="text-xs text-text-muted leading-normal">
            Graduated B.E. in Information Technology (BVCOE) with 7.8/10 CGPA. Deep foundations in Data Structures, DBMS, and Distributed Systems.
          </p>
        </div>
      </div>

      {/* Quick Details Bar */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-border text-xs font-mono text-text-muted">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
          <span>{developer.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-accent-cyan" />
          <a href={`mailto:${developer.email}`} className="hover:text-accent-cyan transition-colors">
            {developer.email}
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-accent-cyan" />
          <span>{developer.phone}</span>
        </div>
      </div>
    </section>
  );
}
```

#### D. `src/components/sections/about/ExperienceTimeline.jsx`
```jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Building, Award, CheckCircle2 } from 'lucide-react';
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

    // Teardown contract: kill ScrollTrigger on unmount (T2-F30-02)
    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative space-y-12 pt-12 border-t border-border">
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
          Experience & Education
        </h2>
        <p className="text-text-secondary text-sm sm:text-base max-w-xl">
          A progressive record of verified internships, production software engineering, and university achievements.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-10 space-y-12">
        {/* Animated Vertical SVG Guide & Stroke Line (T1-F30-03) */}
        <div className="absolute top-4 bottom-4 left-2 sm:left-4 w-4 pointer-events-none -translate-x-1/2">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
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
            {/* Animated Luminous Neon Cyan Foreground Path */}
            <path
              ref={pathRef}
              d="M 8 0 V 2000"
              stroke="#00f0ff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
            />
          </svg>
        </div>

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
              {/* Luminous Timeline Pin Indicator */}
              <div
                className={`absolute -left-[30px] sm:-left-[38px] top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isLit
                    ? 'border-accent-cyan bg-background shadow-glow-cyan scale-110'
                    : 'border-border bg-surface scale-90'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isLit ? 'bg-accent-cyan animate-ping' : 'bg-transparent'
                  }`}
                />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm space-y-5 hover:border-accent-cyan/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-accent-gold font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </span>
                  <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full border border-border bg-surface text-text-muted">
                    {item.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-accent-cyan text-sm font-medium mt-1">
                    <Building className="w-3.5 h-3.5" />
                    <span>{item.organization}</span>
                    {item.location && <span className="text-text-muted">&bull; {item.location}</span>}
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Achievements List */}
                {item.achievements && item.achievements.length > 0 && (
                  <ul className="space-y-2 pt-2 text-xs sm:text-sm text-text-secondary">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
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
                        className="text-xs font-mono px-2.5 py-1 rounded bg-surface-subtle border border-border text-text-muted"
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
```

---

## 4. Blueprint 2: `ProjectsPage` (`src/pages/ProjectsPage.jsx`) & Sections

### 4.1 Feature Scope & Test Invariants
- **Feature 23 (Projects Full Grid Page)**:
  - Both live production projects present:
    1. **Spendly** (`id: 'spendly'`): Live demo `https://spendly-sable-delta.vercel.app/`, GitHub `https://github.com/aadinath29/spendly-`, tech tags `['React.js', 'Node.js', ...]`, >= 3 highlights.
    2. **Business Management CRM** (`id: 'business-management'`): Live demo `https://business-managment-alpha.vercel.app/login`, GitHub `https://github.com/aadinath29/BusinessManagment-`, credentials callout: email `admin@antigravity.com`, password `Admin@123`.
    3. **Agentic AI Orchestrator** (`id: 'agentic-ai-suite'`): `isPlaceholder: true`, Upcoming badge.
  - Links security: `target="_blank" rel="noopener noreferrer"`.
  - Staggered scroll entrance using Framer Motion.
  - Custom cursor integration:
    - Card container has `data-cursor="project"` with label `'View'` (T3-CURSOR-01).
    - Demo link triggers `'Open'` (T3-CURSOR-02).
    - GitHub link triggers `'Code'` (T3-CURSOR-02).
  - Single-column responsive layout on `< 768px` (T2-F23-03).
  - Card background fallback gradient classes containing `from-` (T2-F23-04).

### 4.2 Component Implementation Specifications

#### A. `src/components/sections/projects/ProjectCard.jsx`
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Key, CheckCircle2, Sparkles } from 'lucide-react';
import { useCursor } from '../../../context/CursorContext';

export default function ProjectCard({ project, index }) {
  const { setCursor, resetCursor } = useCursor();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="project"
      data-cursor-text="View"
      onMouseEnter={() => setCursor('project', 'View')}
      onMouseLeave={resetCursor}
      className={`relative group rounded-2xl border border-border bg-surface/50 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between overflow-hidden hover:border-accent-cyan/40 transition-all duration-300 ${
        project.gradient || 'from-cyan-500/10 to-transparent'
      }`}
    >
      {/* Background Accent Gradient Glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-cyan/15 via-transparent to-transparent -z-10" />

      <div className="space-y-5">
        {/* Header: Title & Status Badge */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-accent-cyan mt-1">
              {project.subtitle}
            </p>
          </div>

          {project.isPlaceholder ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-gold bg-accent-gold/10 border border-accent-gold/20">
              <Sparkles className="w-3 h-3" />
              <span>Upcoming</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20">
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
              <li key={hIdx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-0.5" />
                <span className="leading-normal">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Demo Credentials Callout Box */}
        {project.demoCredentials && (
          <div className="p-4 rounded-xl border border-accent-gold/30 bg-accent-gold/5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-accent-gold font-semibold uppercase tracking-wider">
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
              className="text-xs font-mono px-2.5 py-1 rounded bg-surface-subtle border border-border text-text-primary"
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
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-accent-cyan text-black font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 hover:bg-opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
            className="min-h-[44px] px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary font-medium text-xs tracking-wider uppercase inline-flex items-center gap-2 hover:border-accent-cyan hover:text-accent-cyan transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}
```

#### B. `src/components/sections/projects/ProjectsGrid.jsx`
```jsx
import React, { useState } from 'react';
import { projects } from '../../../data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid() {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'shipped', label: 'Shipped Products' },
    { id: 'upcoming', label: 'Upcoming Systems' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'shipped') return !p.isPlaceholder;
    if (filter === 'upcoming') return p.isPlaceholder;
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === cat.id
                ? 'bg-accent-cyan text-black font-semibold shadow-glow-cyan'
                : 'bg-surface border border-border text-text-muted hover:text-text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
}
```

---

## 5. Blueprint 3: `BlogPage` (`src/pages/BlogPage.jsx`) & Sections

### 5.1 Feature Scope & Test Invariants
- **Feature 24 (Blog Page Article Cards)**:
  - 4 articles sourced from `src/data/blogPosts.js` covering MERN architecture, React 18 concurrent features, fluid animations (GSAP/Lenis), and JWT authentication.
  - Metadata verification:
    - Reading time matches `/min read/` with positive integer minutes (`parseInt(readTime.split(' ')[0], 10) > 0`).
    - Excerpt length bounded between 20 and 300 characters.
    - Tags verified as string arrays.
    - Author attribution to "Aadinath Magar".
  - Minimal editorial card layout with hover micro-interactions, responsive single-column layout on mobile (375px).

### 5.2 Component Implementation Specifications

#### A. `src/components/sections/blog/BlogCard.jsx`
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { useCursor } from '../../../context/CursorContext';

export default function BlogCard({ post, index }) {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="hover"
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={resetCursor}
      className="group relative rounded-2xl border border-border bg-surface/50 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between hover:border-accent-cyan/40 transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center gap-1.5 text-accent-gold">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary group-hover:text-accent-cyan transition-colors leading-snug">
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
              className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-surface-subtle text-accent-cyan/90 border border-border"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author and Read Prompt */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-border text-xs font-mono">
        <span className="text-text-muted">By {post.author?.name || 'Aadinath Magar'}</span>
        <span className="text-accent-cyan font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.article>
  );
}
```

---

## 6. Blueprint 4: `ContactPage` (`src/pages/ContactPage.jsx`) & Sections

### 6.1 Feature Scope & Test Invariants
- **Feature 25 (Contact Page EmailJS Form)**:
  - Form schema: `user_name`, `user_email`, `message` (with fallback support for `name` and `email`).
  - Regex email validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  - Non-empty validation across all fields: `Boolean(name.trim() && email.trim() && msg.trim())`.
  - Maximum message length capped at 2000 characters.
  - Required placeholder credentials:
    ```javascript
    // IMPORTANT: Replace these with your real EmailJS credentials from https://emailjs.com
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    ```
  - State machine: `idle` $\rightarrow$ `submitting` (disabled button + spinner) $\rightarrow$ `success` (banner + form reset) OR `error` (persistent retryable banner).
  - Cursor pass-through: text inputs marked with `data-cursor="hidden"` to avoid obscuring text caret.
- **Feature 26 (Contact Social & Direct Links)**:
  - GitHub (`https://github.com/aadinath29`), LinkedIn (`https://www.linkedin.com/in/aadinath-magar-profile`), Email (`mailto:aadinathbmagar75@gmail.com`), Phone (`tel:+919209017621`).
  - Safe protocols: `https://`, `mailto:`, `tel:`.
  - Security attributes: `target="_blank" rel="noopener noreferrer"`.
  - Mobile tap target sizing: minimum 44px $\times$ 44px.

### 6.2 Component Implementation Specifications

#### A. `src/components/sections/contact/ContactForm.jsx`
```jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

// IMPORTANT: Replace these with your real EmailJS credentials from https://emailjs.com
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation (T1-F25-02, T2-F25-01, T2-F25-03)
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields before sending.');
      return;
    }

    if (!isValidEmail(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('submitting');

    try {
      // Dual-key payload mapping supporting both user_* and direct keys (T1-F25-03, T4-JOURNEY-04)
      const templateParams = {
        user_name: formData.name.trim(),
        user_email: formData.email.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.slice(0, 2000).trim(), // 2000 char clamp (T2-F25-02)
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // Form reset on success (T2-F25-05, T4-JOURNEY-04)
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('[ContactForm] EmailJS submission failure:', err);
      // Persistent error recovery state (T1-F25-05, T2-F25-04)
      setStatus('error');
      setErrorMessage('Network transmission failed. Please try again or email directly at aadinathbmagar75@gmail.com');
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
          Send a Direct Message
        </h2>
        <p className="text-sm text-text-secondary">
          Inquire about engineering opportunities, technical consulting, or architectural collaborations.
        </p>
      </div>

      {status === 'success' && (
        <div className="p-5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Message Successfully Transmitted</span>
          </div>
          <p className="text-xs text-text-secondary">
            Thank you! Your communication has been dispatched to Aadinath Magar. Expect a response within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-xs font-mono underline hover:text-white pt-2 block"
          >
            Send another message
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {status !== 'success' && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="user_name" className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
              Your Name *
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              required
              data-cursor="hidden"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sarah Connor"
              className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-surface-subtle border border-border text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/40 transition-all font-sans text-sm"
            />
          </div>

          <div>
            <label htmlFor="user_email" className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
              Your Email *
            </label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              required
              data-cursor="hidden"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. sarah@startup.io"
              className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-surface-subtle border border-border text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/40 transition-all font-sans text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-text-muted">
                Message Content *
              </label>
              <span className="text-[10px] font-mono text-text-muted">
                {formData.message.length} / 2000
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              maxLength={2000}
              data-cursor="hidden"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Briefly describe your project or role requirements..."
              className="w-full px-4 py-3 rounded-lg bg-surface-subtle border border-border text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/40 transition-all font-sans text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full min-h-[48px] px-6 py-3.5 rounded-lg bg-accent-cyan text-black font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow-cyan"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
```

#### B. `src/components/sections/contact/ContactInfo.jsx`
```jsx
import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import { developer } from '../../../data/developer';

export default function ContactInfo() {
  return (
    <div className="p-8 sm:p-10 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm space-y-8 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
            Direct Communication
          </h2>
          <p className="text-sm text-text-secondary">
            Open to software engineering roles, full-stack development, and technical problem-solving discussions.
          </p>
        </div>

        {/* Direct Channels */}
        <div className="space-y-4">
          <a
            href={`mailto:${developer.email}`}
            className="min-h-[48px] p-4 rounded-xl border border-border bg-surface hover:border-accent-cyan transition-colors flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Direct Email</span>
              <span className="text-sm font-sans font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                {developer.email}
              </span>
            </div>
          </a>

          <a
            href={`tel:${developer.phone}`}
            className="min-h-[48px] p-4 rounded-xl border border-border bg-surface hover:border-accent-cyan transition-colors flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Phone (IST)</span>
              <span className="text-sm font-sans font-medium text-text-primary group-hover:text-accent-gold transition-colors">
                {developer.phone}
              </span>
            </div>
          </a>

          <div className="min-h-[48px] p-4 rounded-xl border border-border bg-surface flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-text-muted">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Location Base</span>
              <span className="text-sm font-sans font-medium text-text-primary">
                {developer.location} (UTC+5:30)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Profiles Grid */}
      <div className="pt-6 border-t border-border space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-text-muted block">
          Social Profiles
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={developer.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-3 rounded-xl border border-border bg-surface hover:border-accent-cyan text-xs font-mono text-text-primary hover:text-accent-cyan transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
          </a>

          <a
            href={developer.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-3 rounded-xl border border-border bg-surface hover:border-accent-cyan text-xs font-mono text-text-primary hover:text-accent-cyan transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

## 7. Blueprint 5: `GlobeSection` / 3D Globe (`src/components/3d/GlobeCanvas.jsx`) (Milestone 5)

### 7.1 Feature Scope & Technical Requirements
- **Requirement (ORIGINAL_REQUEST.md lines 335–342)**:
  - React Three Fiber globe showing Earth sphere with India highlighted.
  - Glowing orbital ring or location pin.
  - Lazy-loaded with `React.lazy` + `Suspense` + `SceneFallback` (or dedicated `GlobeFallback`).
  - Subtle auto-rotation via `useFrame`.
  - Integrated into Home page (either alongside Stats or as dedicated section).
- **Resilience & Performance**:
  - WebGL context loss recovery listener (`webglcontextlost`, `webglcontextrestored`).
  - Clamped pixel ratio: `dpr={[1, 2]}`.
  - Pausing RAF loop when document is hidden (`visibilitychange`).
  - `ErrorBoundary` wrapper for GPU crash prevention.

### 7.2 India Spherical Coordinate Calculation
Latitude for central India: $\phi_0 = 20.5937^\circ\text{ N}$. Longitude: $\lambda_0 = 78.9629^\circ\text{ E}$.  
For a 3D sphere of radius $R = 1.3$:
$$\phi = (90 - 20.5937) \times \frac{\pi}{180} \approx 1.2114\text{ rad}$$
$$\theta = (78.9629 + 180) \times \frac{\pi}{180} \approx 4.5205\text{ rad}$$
Cartesian coordinates:
$$x = -R \sin(\phi) \cos(\theta) \approx 0.385$$
$$y = R \cos(\phi) \approx 0.457$$
$$z = R \sin(\phi) \sin(\theta) \approx -1.154$$

### 7.3 Component Implementation Specifications

#### A. `src/components/3d/GlobeSphere.jsx`
```jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GlobeSphere() {
  const globeRef = useRef(null);
  const ringRef = useRef(null);
  const beaconRef = useRef(null);

  // India spherical coordinates (radius = 1.35)
  const radius = 1.35;
  const lat = 20.5937;
  const lon = 78.9629;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const pinPos = [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];

  useFrame((_, delta) => {
    // Subtle auto-rotation (M5)
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
      ringRef.current.rotation.x += delta * 0.03;
    }
    if (beaconRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.3;
      beaconRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-4, -3, -2]} intensity={1.0} color="#fbbf24" />

      {/* Rotating Main Globe */}
      <group ref={globeRef}>
        {/* Deep navy Earth sphere body */}
        <mesh>
          <sphereGeometry args={[radius, 48, 48]} />
          <meshStandardMaterial
            color="#080c16"
            roughness={0.7}
            metalness={0.2}
            wireframe={false}
          />
        </mesh>

        {/* Translucent wireframe lat/lon grid for editorial technical feel */}
        <mesh>
          <sphereGeometry args={[radius + 0.005, 24, 24]} />
          <meshStandardMaterial
            color="#00f0ff"
            wireframe={true}
            transparent={true}
            opacity={0.12}
          />
        </mesh>

        {/* India Location Pin & Glowing Beacon */}
        <group position={pinPos}>
          {/* Luminous beacon core */}
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>

          {/* Pulsing aura ring */}
          <mesh ref={beaconRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.06, 0.11, 16]} />
            <meshBasicMaterial color="#00f0ff" transparent={true} opacity={0.6} side={THREE.DoubleSide} />
          </mesh>

          {/* Radially projecting beacon beam */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.008, 0.012, 0.2, 8]} />
            <meshBasicMaterial color="#fbbf24" transparent={true} opacity={0.8} />
          </mesh>
        </group>
      </group>

      {/* Tilted Glowing Orbital Ring */}
      <mesh ref={ringRef} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[1.75, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          transparent={true}
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}
```

#### B. `src/components/3d/GlobeCanvas.jsx`
```jsx
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import GlobeSphere from './GlobeSphere';

export default function GlobeCanvas({ className = '' }) {
  const [frameloop, setFrameloop] = useState('always');

  // Pause RAF on background tab (T2-F27-05)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setFrameloop(document.hidden ? 'demand' : 'always');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 2]}
        frameloop={frameloop}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          const dom = gl.domElement;
          const onContextLost = (e) => {
            e.preventDefault();
            console.warn('[GlobeCanvas] WebGL context lost.');
          };
          dom.addEventListener('webglcontextlost', onContextLost, false);
          return () => {
            dom.removeEventListener('webglcontextlost', onContextLost);
            gl.dispose();
          };
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <GlobeSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

#### C. `src/components/sections/home/GlobeSection.jsx`
```jsx
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Compass, Sparkles } from 'lucide-react';
import ErrorBoundary from '../../common/ErrorBoundary';
import SceneFallback from '../../3d/SceneFallback';
import { developer } from '../../../data/developer';

const GlobeCanvas = lazy(() => import('../../3d/GlobeCanvas'));

export default function GlobeSection() {
  return (
    <section className="relative w-full rounded-3xl border border-border bg-surface/30 backdrop-blur-md overflow-hidden p-8 sm:p-12 lg:p-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Editorial Text Left Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20">
            <Compass className="w-3.5 h-3.5 text-accent-cyan animate-spin-slow" />
            <span>GLOBAL FOOTPRINT &bull; INDIA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary tracking-tight">
            Based in India.<br />
            <span className="text-accent-cyan">Engineering for the World.</span>
          </h2>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans max-w-xl">
            Operating from Navi Mumbai, India (UTC+5:30). Equipped to collaborate across North American, European, and Asia-Pacific time zones with asynchronous discipline, clear Git documentation, and reliable sprint cadence.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/80">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Coordinated Time</span>
              <span className="text-sm font-mono font-semibold text-accent-gold">IST (UTC +5:30)</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Availability</span>
              <span className="text-sm font-mono font-semibold text-accent-cyan">Open for Roles</span>
            </div>
          </div>
        </div>

        {/* 3D Interactive Globe Canvas Right Column */}
        <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-border/60 bg-background/50">
          <ErrorBoundary fallback={<div className="p-8 text-center text-xs font-mono text-text-muted">Globe visual scene offline</div>}>
            <Suspense fallback={<SceneFallback className="min-h-[360px]" />}>
              <GlobeCanvas />
            </Suspense>
          </ErrorBoundary>

          {/* Floating Location Overlay */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border text-[11px] font-mono text-text-primary">
            <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Navi Mumbai, India (20.59° N, 78.96° E)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 8. E2E Test Suite Alignment & Invariant Matrix

| Feature | Test Suite IDs | Key Invariants to Guard | Resolution in Blueprint |
|---------|---------------|-------------------------|-------------------------|
| **F21: About Hero & Bio** | `T1-F21-01` to `05`, `T2-F21-01` to `05` | `developer.aboutHeroWords` tokens present; `developer.bio` contains MERN/Full-Stack; Playfair Display typography; mobile scale | `AboutHero.jsx` maps `developer.aboutHeroWords`; `BioNarrative.jsx` renders `developer.bio` |
| **F22: Timeline Dataset** | `T1-F22-01` to `05`, `T2-F22-01` to `05` | Kosqu Technolab, OptimumValue Solution, BVCOE present; chronological ordering; achievements & skills non-empty | `timeline` from `src/data/timeline.js` imported and displayed with verified metadata |
| **F23: Projects Full Grid** | `T1-F23-01` to `05`, `T2-F23-01` to `05` | Spendly & Business Management with exact demo URLs & CRM demo credentials (`admin@antigravity.com` / `Admin@123`); `target="_blank"` & `rel="noopener noreferrer"` | `ProjectCard.jsx` explicitly renders `demoCredentials` callout box and secure external anchors |
| **F24: Blog Cards** | `T1-F24-01` to `05`, `T2-F24-02` to `05` | 4 articles; reading time matches `/min read/`; author name is Aadinath Magar; excerpt length between 20 and 300 chars | `BlogCard.jsx` renders `blogPosts` from `src/data/blogPosts.js` with exact metadata |
| **F25: EmailJS Contact Form** | `T1-F25-01` to `05`, `T2-F25-01` to `05` | `user_name`, `user_email`, `message` schema; regex email validation; loading button state; success reset; failure persistence | `ContactForm.jsx` integrates `emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY)` with all states |
| **F26: Social & Direct Links** | `T1-F26-01` to `05`, `T2-F26-01` to `05` | GitHub, LinkedIn, Email, Phone (+91); safe protocols; tap targets $\ge 44\text{px}$ | `ContactInfo.jsx` enforces min-h-[44px] / min-h-[48px] with secure links |
| **F27 & F28: R3F Resilience** | `T1-F27-01` to `05`, `T1-F28-01` to `05` | WebGL context cleanup on unmount; dpr clamped to $[1, 2]$; `SceneFallback` and `ErrorBoundary` fallback | Both `HeroCanvas.jsx` and `GlobeCanvas.jsx` follow identical WebGL cleanup contracts |
| **F29: Portrait 3D Tilt** | `T1-F29-01` to `05`, `T2-F29-01` to `05` | Formula: `rotateX = ((y/h) - 0.5) * -20`, clamped $[-20, 20]$; specular glare; mouseleave reset; mobile touch suppression | `DepthPortrait.jsx` adheres to exact math and event listener removal on unmount |
| **F30: GSAP Timeline Line Draw** | `T1-F30-01` to `05`, `T2-F30-01` to `05` | `strokeDashoffset = length * (1 - progress)`; zero-length safe handling; node illumination; `ctx.revert()` on unmount | `ExperienceTimeline.jsx` wires GSAP ScrollTrigger with scrub and unmount teardown |

---

## 9. Downstream Worker Implementation Roadmap

1. **Step 1 — Milestone 4: About Page Subcomponents**
   - Create `src/components/sections/about/AboutHero.jsx`
   - Create `src/components/sections/about/DepthPortrait.jsx`
   - Create `src/components/sections/about/BioNarrative.jsx`
   - Create `src/components/sections/about/ExperienceTimeline.jsx`
   - Refactor `src/pages/AboutPage.jsx` to assemble the 4 subcomponents
2. **Step 2 — Milestone 4: Projects Page Subcomponents**
   - Create `src/components/sections/projects/ProjectCard.jsx`
   - Create `src/components/sections/projects/ProjectsGrid.jsx`
   - Refactor `src/pages/ProjectsPage.jsx` to mount `ProjectsGrid` with editorial header
3. **Step 3 — Milestone 4: Blog Page Subcomponents**
   - Create `src/components/sections/blog/BlogCard.jsx`
   - Refactor `src/pages/BlogPage.jsx` to display article grid with tag filter support
4. **Step 4 — Milestone 4: Contact Page Subcomponents**
   - Create `src/components/sections/contact/ContactForm.jsx` (with EmailJS integration and placeholder comment)
   - Create `src/components/sections/contact/ContactInfo.jsx` (with direct channels and social links)
   - Refactor `src/pages/ContactPage.jsx` to mount both in a responsive 2-column layout
5. **Step 5 — Milestone 5: 3D Globe Implementation**
   - Create `src/components/3d/GlobeSphere.jsx`
   - Create `src/components/3d/GlobeCanvas.jsx`
   - Create `src/components/sections/home/GlobeSection.jsx`
   - Refactor `src/pages/HomePage.jsx` to integrate `GlobeSection`
6. **Step 6 — Verification & Build Validation**
   - Run `npm run test:e2e` (assert 406/406 pass)
   - Run `npm run build` (assert clean compilation)
