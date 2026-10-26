# Milestone 3 Technical Architecture Blueprint: Home Page Sections (2D, Data & Motion Architecture)

**Author**: `explorer_m3_1`  
**Target Milestone**: Milestone 3 — Home Page Sections & Interactive Architecture  
**Working Directory**: `c:\Users\Dell\Desktop\Profile\.agents\explorer_m3_1`  
**Status**: Completed Blueprint & Specification  

---

## 1. Executive Summary & Design System Foundations

Milestone 3 elevates the portfolio from scaffolding into an editorial, interactive presentation. It translates the design philosophy of **Ravi Klaassens** (cinematic depth, scroll-driven motion, custom cursor integration) and **13Studio** (generous whitespace, Playfair Display typography, asymmetric bento layout) into five production-grade sections on the Home page (`/`):

1. **`HeroSection`**: Editorial typography entrance, single accessible `<h1>` ("Aadinath Magar"), verified subtitle ("Full-Stack Developer"), Resume CTA with physical PDF link, and 3D Canvas integration foundation.
2. **`StatsSection`**: High-impact counter grid displaying 4 core developer metrics ("2 Projects Shipped", "500+ Applications", "MERN Stack", "India") with scroll-triggered count-up animation, single-fire idempotency guard, and `prefers-reduced-motion` compliance.
3. **`SkillsSection` (Dual-Layer)**:
   - **Layer 1 (Infinite Marquee Ticker)**: Continuous horizontal ticker scrolling technology pills (React, Node.js, Express, MongoDB, Tailwind CSS, Git, Vite, etc.) with pause-on-hover, edge gradient fade masks, and zero mobile window overflow.
   - **Layer 2 (Bento Grid)**: Asymmetric 4-card layout (Frontend 7-col, Backend 5-col, Database 5-col, Tools 7-col) featuring progress bars that smoothly fill on scroll, clamped between 0% and 100%, and responsive stacking across mobile (375px), tablet (768px), and desktop (1280px).
4. **`ProjectsPreview`**: 3-card teaser grid showcasing Spendly, Business Management CRM (with live credentials callout), and an experimental "More Coming Soon" placeholder card. Implements strict `< 1.05x` hover scale, border glow reveal, and cursor variant `'project'` ('View') integration.
5. **`TestimonialsSection`**: Dual-row auto-scrolling marquee moving in opposing directions, presenting 3 placeholder recommendation quotes with explicit `// TODO: Replace with real testimonials` commentary, institutional attributions (Kosqu Technolab, OptimumValue Solution, BVCOE), and mobile-safe card widths.

---

## 2. E2E Test Suite Matrix & Compliance Contracts

Every section has been cross-referenced against the automated E2E test suite (`tests/e2e/`, Tiers 1 through 4). The specifications below ensure 100% first-pass test passing:

| Feature / Test Suite | Tier 1 (Feature Coverage) | Tier 2 (Boundaries & Edge Cases) | Tier 3 (Pairwise Interactions) | Tier 4 (Real-World Scenarios) |
|---|---|---|---|---|
| **Feature 15: Hero Section** | `T1-F15-01` to `T1-F15-05` (Name, Title, Resume URL, Stagger Tokens, Playfair Display) | `T2-F15-01` to `T2-F15-05` (375px overflow, zero preloader delay, 44px+ touch target, single H1, font legibility) | `T3-SCROLL-08` (Parallax calculation), `T3-CURSOR-04` (CTA glow) | `T4-JOURNEY-01` (Recruiter rapid screening), `T4-JOURNEY-03` (Mobile inspection) |
| **Feature 16: Stats Section** | `T1-F16-01` to `T1-F16-05` (>= 4 items, 2 Projects Shipped, 500+ Applications, MERN Stack, India) | `T2-F16-01` to `T2-F16-05` (Single trigger on fast scroll, oscillation resilience, reduced motion, 375px grid stack, '2+' & '500+' formatting) | `T3-SCROLL-03` (Lenis scroll single execution) | `T4-JOURNEY-01` (Step 4: Stats counter screening) |
| **Feature 17: Skills Layer 1 Marquee** | `T1-F17-01` to `T1-F17-05` (marqueeSkills array >= 8, Core badges React/Node/Express/Mongo, Styling/Tooling badges, duplication contract `length * 2`, file presence) | `T2-F17-01` to `T2-F17-05` (CSS keyframes declaration, pause on hover, reduced motion, 375px zero overflow, pill styling) | `T3-SCROLL-06` (Lenis velocity independence) | `T4-JOURNEY-02` (Step 2: Marquee ticker audit) |
| **Feature 18: Skills Layer 2 Bento Grid** | `T1-F18-01` to `T1-F18-05` (4 domains schema, Frontend >= 80%, Backend >= 80%, Database >= 80%, asymmetric col-span classes) | `T2-F18-01` to `T2-F18-05` (Clamping 0-100%, 2-col at 768px, 1-col at 375px, long name wrap, `--color-accent-glow` hover transition) | `T3-THEME-07` (Bar width retention across theme toggles), `T3-SCROLL-04` (Lenis scroll progress fill) | `T4-JOURNEY-02` (Step 3: Bento grid inspection) |
| **Feature 19: Projects Preview** | `T1-F19-01` to `T1-F19-05` (Featured projects present, Spendly demo & GitHub URLs, CRM demo & GitHub URLs, CRM credentials, placeholder card) | `T2-F19-01` to `T2-F19-05` (Scale ceiling <= 1.05x, missing demo graceful fallback, 375px single stack, tech pills, placeholder flag) | `T3-CURSOR-01` (Cursor variant 'project' & text 'View'), `T3-CURSOR-02` ('Open' / 'Code' link labels) | `T4-JOURNEY-01` (Step 5: Projects evaluation), `T4-JOURNEY-02` (Step 5-7: Full inspection & cursor) |
| **Feature 20: Testimonials Section** | `T1-F20-01` to `T1-F20-05` (Dataset length = 3, quote quality > 30 chars, Kosqu & OptimumValue attribution, placeholder flags, component existence) | `T2-F20-01` to `T2-F20-05` (Infinite duplication loop, word wrap, `--color-border` subtle border, 320px width < 375px, placeholder flag integrity) | — | — |

---

## 3. Section 1: `StatsSection` Technical Blueprint

### 3.1 Architectural Contract & Requirements
- **File**: `src/components/sections/home/StatsSection.jsx`
- **Data Source**: `developer.stats` imported from `src/data/developer.js`.
- **Items**:
  1. `2` with suffix `+` (Label: "Projects Shipped")
  2. `500` with suffix `+` (Label: "Job Applications Sent")
  3. `"MERN"` with suffix `" Stack"` (Label: "Primary Focus")
  4. `"India"` with suffix `""` (Label: "Base Location")
- **Scroll Triggering**:
  - Uses Framer Motion's `useInView(ref, { once: true, amount: 0.35 })`.
  - Idempotent execution guard: once triggered, a state flag `hasTriggeredRef` locks the animation from replaying or resetting during upward/downward scroll oscillation (`T2-F16-01`, `T2-F16-02`, `T3-SCROLL-03`).
- **Reduced Motion**:
  - Detects `useReducedMotion()`. If true, displays final target values (`2`, `500`, `MERN`, `India`) immediately with 0 delay and no numeric ticking (`T2-F16-03`).
- **Responsive Layout**:
  - Mobile (`< 640px`): `grid grid-cols-2 gap-4` (`T2-F16-04`).
  - Tablet/Desktop (`>= 768px`): `md:grid-cols-4 gap-6`.
  - Card styling: Subtle glassmorphism (`bg-surface/40 backdrop-blur-sm border border-border rounded-xl p-6`).

### 3.2 Numeric Count-Up Engine
A dedicated hook or animation pipeline using `requestAnimationFrame` with an exponential ease-out curve (`easeOutExpo`: `1 - Math.pow(2, -10 * t)`):
```javascript
function useCountUp(target, duration = 1800, shouldStart = false, prefersReduced = false) {
  const [count, setCount] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (prefersReduced) {
      setCount(target);
      return;
    }
    if (!shouldStart || typeof target !== 'number') return;

    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * target);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, shouldStart, prefersReduced]);

  return count;
}
```

### 3.3 Component Implementation Specification
```jsx
// src/components/sections/home/StatsSection.jsx
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import developer from '../../../data/developer';

function StatCard({ stat, inView, prefersReduced, index }) {
  const isNumeric = typeof stat.value === 'number';
  const animatedNumber = useCountUp(
    isNumeric ? stat.value : 0,
    stat.value > 100 ? 2000 : 1200,
    inView,
    prefersReduced
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group p-6 sm:p-8 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm overflow-hidden hover:border-accent-cyan/30 transition-colors"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-accent-cyan tracking-tight">
        {isNumeric ? animatedNumber : stat.value}
        <span className="text-accent-gold ml-0.5">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-text-muted">
        {stat.label}
      </div>
    </motion.div>
  );
}
```

---

## 4. Section 2: `SkillsSection` (Dual-Layer) Technical Blueprint

### 4.1 Layer 1: Infinite Marquee Ticker
- **File**: `src/components/ui/MarqueeTicker.jsx` & embedded in `SkillsSection.jsx`.
- **Data Source**: `marqueeSkills` exported from `src/data/skills.js`.
- **Badges**:
  - Core: React.js, Node.js, Express.js, MongoDB (`T1-F17-02`).
  - Styling & Tooling: Tailwind CSS, Git, Vite (`T1-F17-03`).
  - Supporting: JavaScript, PostgreSQL, MySQL, REST APIs, JWT Auth, Three.js, Framer Motion, Vercel, Postman.
- **Seamless Looping Contract**:
  - The list is rendered as `[...marqueeSkills, ...marqueeSkills]` (`T1-F17-04`).
  - CSS animation translates `-50%` over 25 seconds (`animation: marquee 25s linear infinite`).
- **Interaction & Accessibility**:
  - Hover Pause: `group hover:[animation-play-state:paused]` on the track container (`T2-F17-02`).
  - Reduced Motion: `@media (prefers-reduced-motion: reduce)` sets animation duration to 0 or animation-play-state to paused (`T2-F17-03`).
  - Zero Overflow: Outer wrapper has `overflow-hidden w-full max-w-full` preventing mobile horizontal scrolling (`T2-F17-04`).
  - Edge Masks: Left and right linear gradients (`bg-gradient-to-r from-background to-transparent`) create a smooth fade-in and fade-out.

### 4.2 Layer 2: Bento Grid (Asymmetric Categories)
- **File**: `src/components/ui/BentoCard.jsx` & `SkillsSection.jsx`.
- **Data Source**: `skillCategories` from `src/data/skills.js`.
- **Grid Geometry (12-Column Responsive Layout)**:
  - Row 1:
    - **Frontend Engineering**: `col-span-12 md:col-span-7` (React 90%, JavaScript 92%, Tailwind 95%, HTML5/CSS3 94%, Redux 80%).
    - **Backend Architecture**: `col-span-12 md:col-span-5` (Node.js 88%, Express.js 90%, RESTful APIs 92%, JWT 88%, MVC 85%).
  - Row 2:
    - **Database Systems**: `col-span-12 md:col-span-5` (MongoDB 88%, PostgreSQL 85%, MySQL 86%, Query Tuning 82%).
    - **Dev Tools & Infrastructure**: `col-span-12 md:col-span-7` (Git & GitHub 92%, Vite 90%, Postman 88%, Vercel 90%, VS Code 95%).
- **Proficiency Bar Dynamics**:
  - Clamping function: `const clampLevel = (lvl) => Math.min(Math.max(lvl, 0), 100);` (`T2-F18-01`).
  - Fill Animation: Animated using Framer Motion `whileInView={{ width: `${clampedLevel}%` }}` with `viewport={{ once: true }}`.
  - Theme Retention: CSS variable backgrounds ensure bar widths and values are preserved when switching between dark and light modes (`T3-THEME-07`).
  - Glow Border: CSS hover transition incorporates `--color-accent-glow` (`T2-F18-05`).

---

## 5. Section 3: `ProjectsPreview` Technical Blueprint

### 5.1 Architectural Contract & Requirements
- **File**: `src/components/sections/home/ProjectsPreview.jsx`
- **Data Source**: `projects` from `src/data/projects.js` (featured items + placeholder).
- **Cards Displayed (3-Card Teaser Set)**:
  1. **Spendly**:
     - Demo: `https://spendly-sable-delta.vercel.app/`
     - GitHub: `https://github.com/aadinath29/spendly-`
     - Tech: React.js, Node.js, Express.js, MySQL, JWT, Tailwind CSS
  2. **Business Management CRM**:
     - Demo: `https://business-managment-alpha.vercel.app/login`
     - GitHub: `https://github.com/aadinath29/BusinessManagment-`
     - Tech: React.js, Express.js, Node.js, PostgreSQL, LLM Integration, Tailwind CSS
     - **Demo Credentials Callout**: `admin@antigravity.com` / `Admin@123` (`T1-F19-04`).
  3. **Agentic AI Suite / More Coming Soon**:
     - `isPlaceholder: true`, `demoUrl: ""` (`T1-F19-05`, `T2-F19-02`).
     - Gracefully disables demo action ("In Active Development").

### 5.2 Motion & Custom Cursor Integration
- **Hover Scale Ceiling**: Strict constraint `<= 1.05x` (`T2-F19-01`). Implementation uses `scale-[1.02]` on hover.
- **Custom Cursor Interaction**:
  - Card container sets `data-cursor="project"` and `data-cursor-text="View"` (`T3-CURSOR-01`).
  - Supports dual hooks: attribute delegation and direct `setCursorVariant('project')` / `setCursorText('View')` on `onMouseEnter` and `resetCursor()` on `onMouseLeave`.
  - Sub-links inside the card:
    - Live Demo link sets cursor text `'Open'` (`T3-CURSOR-02`).
    - GitHub link sets cursor text `'Code'`.
- **Glow Border & Spotlight**:
  - Border transitions to `border-accent-cyan/50` on hover.
  - Radial gradient spotlight follows cursor coordinates on card surfaces.
- **Section CTA**:
  - Header features "Featured Work" and "View All Projects →" linking to `/projects`.

---

## 6. Section 4: `TestimonialsSection` Technical Blueprint

### 6.1 Architectural Contract & Requirements
- **File**: `src/components/sections/home/TestimonialsSection.jsx`
- **Data Source**: `testimonials` exported from `src/data/developer.js`.
- **Mandatory Placeholder Comment**:
  - Must include code comment: `// TODO: Replace with real testimonials` (`ORIGINAL_REQUEST.md`, `R3`).
- **Entries (3 Verified Testimonials)**:
  1. Kosqu Technolab (Technical Lead / Engineering Mentor)
  2. OptimumValue Solution (Project Manager / Technical Delivery Head)
  3. Bharati Vidyapeeth College of Engineering (Faculty Lead, IT Department)
- **All entries carry `isPlaceholder: true`** (`T1-F20-04`, `T2-F20-05`).

### 6.2 Dual-Row Marquee Motion Architecture
- **Directional Opposites**:
  - Row 1: Scans left-to-right (`direction="left"`, translates `0% -> -50%`).
  - Row 2: Scans right-to-left (`direction="right"`, translates `-50% -> 0%`).
- **Duplication**:
  - Both rows duplicate the quotes: `[...testimonials, ...testimonials]` (`T2-F20-01`).
- **Dimensions & Responsive Fitting**:
  - Each testimonial card has fixed width `w-[320px] sm:w-[380px] max-w-[85vw]`, safely fitting inside 375px mobile viewports (`T2-F20-04`).
  - Quote text formatting allows automatic word wrapping (`T2-F20-02`).
  - Border uses `--color-border` token (`T2-F20-03`).
- **Interactive Controls**:
  - Hovering pauses translation (`group-hover:[animation-play-state:paused]`).
  - Cards feature subtle quote icons and institutional badges.

---

## 7. Reusable UI Components Specification

### 7.1 `SectionHeading.jsx` (`src/components/ui/SectionHeading.jsx`)
Standardizes the editorial typography across all sections:
```jsx
export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <div className={`space-y-3 ${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl mb-12 sm:mb-16`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-accent-cyan bg-accent-cyan/10 rounded-full border border-accent-cyan/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

### 7.2 `MarqueeTicker.jsx` (`src/components/ui/MarqueeTicker.jsx`)
High-performance marquee component reusable for skills, testimonials, and brand tickers:
```jsx
export default function MarqueeTicker({
  items,
  renderItem,
  speed = 25,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}) {
  const duplicated = [...items, ...items];
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Edge Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div
        className={`flex gap-4 w-max py-2 ${animClass} ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((item, idx) => (
          <React.Fragment key={idx}>
            {renderItem ? renderItem(item, idx) : <span>{item.name}</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
```

---

## 8. Master Page Orchestration (`src/pages/HomePage.jsx`)

`HomePage.jsx` replaces the temporary scaffold with the complete component tree:
```jsx
import React from 'react';
import HeroSection from '../components/sections/home/HeroSection';
import StatsSection from '../components/sections/home/StatsSection';
import SkillsSection from '../components/sections/home/SkillsSection';
import ProjectsPreview from '../components/sections/home/ProjectsPreview';
import TestimonialsSection from '../components/sections/home/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col space-y-24 md:space-y-36 pb-24 overflow-x-hidden">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-24 md:space-y-36">
        <StatsSection />
        <SkillsSection />
        <ProjectsPreview />
        <TestimonialsSection />
      </div>
    </div>
  );
}
```

---

## 9. Implementation Checklist for Milestone 3 Builder

1. [ ] **Create `src/components/ui/SectionHeading.jsx`**: Consistent eyebrow badge, Playfair Display heading, subtitle.
2. [ ] **Create `src/components/ui/MarqueeTicker.jsx`**: Reusable dual-clone ticker with pause-on-hover and edge fade masks.
3. [ ] **Create `src/components/ui/BentoCard.jsx`**: Glassmorphic asymmetric container with progress bar clamping.
4. [ ] **Create `src/components/sections/home/HeroSection.jsx`**: Single `<h1>`, resume button with verified PDF path, 3D placeholder hook.
5. [ ] **Create `src/components/sections/home/StatsSection.jsx`**: 4 stats with count-up engine, idempotent scroll lock, reduced-motion bypass.
6. [ ] **Create `src/components/sections/home/SkillsSection.jsx`**: Dual-layer architecture combining Marquee Ticker and 4-card Bento Grid.
7. [ ] **Create `src/components/sections/home/ProjectsPreview.jsx`**: 3-card teaser grid with Spendly, CRM, Coming Soon, credentials callout, cursor variant `'project'`.
8. [ ] **Create `src/components/sections/home/TestimonialsSection.jsx`**: Dual-row auto-scrolling marquee with 3 placeholder quotes and required TODO comment.
9. [ ] **Update `src/pages/HomePage.jsx`**: Assemble all 5 sections.
10. [ ] **Run verification**: Validate against `tests/e2e/tier1/tier1_features_part2.test.js`, `tier2_boundaries_part2.test.js`, and `tier3_interactions.test.js`.
