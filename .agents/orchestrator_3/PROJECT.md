# Project: Visual Redesign of Aadinath Magar Portfolio Website

## Architecture
- **Framework & Bundler**: React 18.3.1 + Vite 5.4.10 + Tailwind CSS 3.4.14
- **Multi-Page Routing**: React Router v6 covering `/`, `/about`, `/projects`, `/blog`, `/contact`, and `*` (404)
- **Visual Design System (Warm Editorial)**:
  - Base background: `#F5F0E8` (warm cream)
  - Surface: `#EDE8DF` (warmer cream)
  - Headings text: `#1C1A18` (deep charcoal)
  - Body text: `#3D3A36` (warm charcoal)
  - Accent: `#C4704A` (terracotta) as single accent color used sparingly
  - Dark mode: `#141210` (deep warm brown) background, `#F0EBE3` text, terracotta accent
  - Total elimination of neon cyan, electric blue, gold gradients, and glowing borders
- **Typography System**:
  - Headings: `DM Serif Display` (editorial, tight letter spacing -0.025em)
  - Body: `DM Sans` (warm geometric sans-serif)
  - Accent/code/labels: `JetBrains Mono`
- **Quiet Physics Motion**:
  - Default entrance: `y: 16px -> 0, opacity: 0 -> 1`, `power3.out`, spring `scale: 0.98 -> 1`
  - Button hover: `scale: 1.02, spring(stiffness: 300, damping: 20)`
  - PageCurtain: Cream `#F5F0E8` wipe
- **3D Layer**:
  - Ambient background element, demoted from centerpiece (opacity ~30%, scaled down, warm lighting)
- **Purge of AI Artifacts (R9)**:
  - Marquee ticker, stat counters, bento grid with progress bars, neon glows, GlobeSection (unrendered), fake testimonials removed from UI

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Warm Editorial Color System | Warm cream #F5F0E8, surface #EDE8DF, charcoal #1C1A18, terracotta #C4704A, warm brown #141210 | M1-R | R1 |
| 2 | DM Serif / DM Sans / JetBrains Mono | Google Fonts loading and Tailwind fontFamily configuration | M1-R | R2 |
| 3 | Cream Preloader with DM Serif Monogram | Cream #F5F0E8 bg, charcoal text, DM Serif "A.M." monogram, terracotta progress | M1-R | R11 |
| 4 | Cream PageCurtain Wipe | Page transition curtain in warm cream #F5F0E8 | M1-R | R8 |
| 5 | Minimal Terracotta Custom Cursor & ScrollBar | 2px terracotta scrollbar, terracotta cursor rings with zero blur glow | M1-R | R1, R8 |
| 6 | Minimal Navbar with Scroll Transition | Transparent -> cream on 80px scroll, DM Serif "Aadinath" logo, terracotta underline hover | M2-R | R4 |
| 7 | Minimalist Footer | "Aadinath Magar" in DM Serif, GitHub/LinkedIn in DM Sans, "Built with React & Vite · 2026" | M2-R | R10 |
| 8 | Clean Layout Shell & Mobile Menu | Cream background drawer, clean borders, quiet physics | M2-R | R4, R8 |
| 9 | Hero Section 60/40 Layout & Copy | "I build things for the web.", human subtitle, CTAs, 3:4 warm portrait placeholder | M3-R | R3 |
| 10 | Hero GSAP Character Reveal with Jitter | Char-by-char stagger with random timing jitter (+-0.01s), spring portrait entrance | M3-R | R3, R8 |
| 11 | Ambient R3F 3D Background | Backgrounded R3F canvas with warm lighting and subdued terracotta wireframe | M3-R | R3 |
| 12 | Typography-Only Skills Section | "What I work with" category list with middle dots, GSAP staggered clip reveal, no bento/bars | M3-R | R6 |
| 13 | R9 Elements Purge from HomePage | Marquee, StatsSection, GlobeSection, TestimonialsSection removed from JSX render | M3-R | R9 |
| 14 | Projects Desktop Full-Bleed Chapter Scroll | Full viewport height sticky scroll, 10vw+ DM Serif titles, right narrative panel, cursor thumbnail | M4-R | R5 |
| 15 | Projects Mobile Clean Minimal Cards | 1px terracotta border, spring scroll entrance, real Spendly and CRM links | M4-R | R5 |
| 16 | About Page "About me." Clip Reveal | Single-block clip-path reveal of massive DM Serif heading | M4-R | R7 |
| 17 | About Page 40/60 Layout & Human Bio | 3:4 warm portrait placeholder on left, exact human bio copy on right in DM Sans | M4-R | R7 |
| 18 | Restyled GSAP SVG Timeline | Terracotta #C4704A line stroke, charcoal text, quiet node highlights | M4-R | R7 |
| 19 | Full E2E & Production Build Verification | Zero errors on npm run build, all 5 routes render without 404, visual acceptance check | M5-R | Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1-R | Theme Tokens, Colors, Typography & Polish | index.css, tailwind.config.js, index.html, ThemeContext, Preloader, PageCurtain, CustomCursor, ScrollProgressBar | none | DONE (Passed Gate & Audit) |
| M2-R | Navigation, Layout & Footer | Navbar, MobileMenu, Footer, Layout | M1-R | DONE (Passed Gate & Audit) |
| M3-R | Home Page Redesign & Ambient 3D | HomePage, HeroSection, SkillsSection, ProjectsPreview, HeroCanvas/Geometry/Particles | M1-R | DONE (Passed Gate & Audit) |
| M4-R | Projects & About Pages Redesign | ProjectsPage, ProjectsGrid, ProjectCard, AboutPage, AboutHero, BioNarrative, DepthPortrait, ExperienceTimeline | M1-R | DONE (Passed Gate & Audit) |
| M5-R | Full Build, Routes & Visual Verification | npm run build, all 5 routes, zero console errors, forensic integrity audit | M2-R, M3-R, M4-R | READY |

## Code Layout & Ownership Boundaries
- **M1-R Files**:
  - `src/styles/index.css`
  - `tailwind.config.js`
  - `index.html`
  - `src/context/ThemeContext.jsx`
  - `src/components/common/Preloader.jsx`
  - `src/components/common/PageCurtain.jsx`
  - `src/components/common/CustomCursor.jsx`
  - `src/components/common/ScrollProgressBar.jsx`
- **M2-R Files**:
  - `src/components/layout/Navbar.jsx`
  - `src/components/layout/MobileMenu.jsx`
  - `src/components/layout/Footer.jsx`
  - `src/components/layout/Layout.jsx`
- **M3-R Files**:
  - `src/pages/HomePage.jsx`
  - `src/components/sections/home/HeroSection.jsx`
  - `src/components/sections/home/SkillsSection.jsx`
  - `src/components/sections/home/ProjectsPreview.jsx`
  - `src/components/3d/HeroCanvas.jsx`
  - `src/components/3d/HeroGeometry.jsx`
  - `src/components/3d/ParticleField.jsx`
- **M4-R Files**:
  - `src/pages/ProjectsPage.jsx`
  - `src/components/sections/projects/ProjectsGrid.jsx`
  - `src/components/sections/projects/ProjectCard.jsx`
  - `src/pages/AboutPage.jsx`
  - `src/components/sections/about/AboutHero.jsx`
  - `src/components/sections/about/BioNarrative.jsx`
  - `src/components/sections/about/DepthPortrait.jsx`
  - `src/components/sections/about/ExperienceTimeline.jsx`
