# Project: Aadinath Magar ("Aadi") Corporate Portfolio Website

## Architecture
- **Framework & Bundler**: React 18.3.1 + Vite 5.4.10 + Tailwind CSS 3.4.14
- **Multi-Page Routing**: React Router v6 (`react-router-dom` 6.28.0) covering `/`, `/about`, `/projects`, `/blog`, `/contact`, and `*` (404)
- **3D Graphics Layer**: Three.js 0.169.0 + `@react-three/fiber` 8.17.10 + `@react-three/drei` 9.117.0 (lazy loaded with Suspense and skeleton fallback)
- **Motion & Smooth Scrolling**:
  - `framer-motion` 11.11.11 for curtain page transitions, hero text word stagger, layout reveals
  - `gsap` 3.12.5 + `ScrollTrigger` for timeline SVG stroke-dashoffset animation and cursor `quickTo` 120fps tracking
  - `lenis` 1.1.18 for inertial smooth scrolling synchronized with GSAP ticker (`lagSmoothing(0)`) and route change scroll restoration
- **Communication & Forms**: `@emailjs/browser` 4.4.1 with client-side feedback states and placeholder credentials
- **Visual Design System**:
  - Dark-primary palette (deep black `#07090e`, dark navy `#0e131f`) with neon cyan (`#00f0ff`) and warm gold (`#fbbf24`) accents
  - Light theme counterpart persisted in `localStorage` (`am_portfolio_theme`) with synchronous anti-FOUC script in `index.html`
  - Playfair Display serif headings + Inter sans-serif body text via Google Fonts
  - Tailwind custom CSS variables mapped in `tailwind.config.js` and defined in `src/styles/index.css`
- **Deployment Readiness**: Static SPA routing rewrites in `vercel.json`, zero broken image links via CSS/SVG gradient placeholders, real resume served from `public/`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Real Developer Profile & Data | Structured data module containing Aadinath Magar's contact info, bio, stats, education, and internships | M1 | Resume & Request |
| 2 | Project Scaffolding & Dependencies | Vite, React 18, Tailwind, Router v6, Three.js, R3F, Lenis, GSAP, Framer Motion, EmailJS, Lucide | M1 | R1 |
| 3 | Single-Page App Vercel Config | `vercel.json` with rewrite rules to `/index.html` | M1 | R5 |
| 4 | Asset Setup & Resume Integration | Resume PDF in `public/` and favicon/placeholder definitions | M1 | R1, R5 |
| 5 | Dark/Light Color Tokens & CSS Variables | Tailwind config mapping CSS variables for dark and light palettes | M2 | R2 |
| 6 | Anti-FOUC Theme Initialization | Synchronous `<head>` script in `index.html` loading theme from `localStorage` | M2 | R2 |
| 7 | Theme Toggle Switch Component | Persistent theme switcher button with smooth transition | M2 | R2 |
| 8 | Typography & Google Fonts Loading | Playfair Display serif + Inter sans-serif preconnect and Tailwind fonts | M2 | R2 |
| 9 | "A.M." Monogram Preloader | Branded loading screen with monogram and 0–100% counter with curtain exit | M2 | R4 |
| 10 | High-Performance Custom Cursor | Dual dot/ring cursor with GSAP `quickTo`, hover scaling, labels, touch suppression | M2 | R4 |
| 11 | Viewport Scroll Progress Bar | 2px–3px top progress bar filling 0%–100% on page scroll | M2 | R4 |
| 12 | Sticky Header & Desktop Hover | Sticky glassmorphic navbar with desktop clip-path reveal hover effects | M2 | R4 |
| 13 | Responsive Mobile Menu | Fullscreen overlay mobile menu with staggered navigation entrance | M2 | R4 |
| 14 | Layout Shell & Lenis Setup | Master layout wrapping Lenis smooth scroll and synchronizing GSAP ticker | M2 | R1, R4 |
| 15 | Home Hero Content & Word Stagger | Headline "Aadinath Magar", subtitle "Full-Stack Developer", Resume CTA button | M3 | R3 |
| 16 | Animated Stats Counter Grid | Counters for 2 Projects, 500+ Applications, MERN Stack, India | M3 | R3 |
| 17 | Skills Layer 1: Infinite Marquee | Seamless horizontal ticker with technology badges | M3 | R3 |
| 18 | Skills Layer 2: Bento Grid | Asymmetric cards with domain categories and proficiency indicators | M3 | R3 |
| 19 | Home Projects Teaser Grid | 3 cards: Spendly, Business Management (with live URLs), More Coming Soon | M3 | R3 |
| 20 | Home Testimonials Marquee | Auto-scrolling ticker with 3 placeholder recommendation quotes | M3 | R3 |
| 21 | About Page Hero & Bio Narrative | Editorial headline stagger + verified developer bio narrative block | M3 | R3 |
| 22 | About Experience & Education Timeline | Timeline nodes with verified college (BVCOE) and internship history | M3 | R3 |
| 23 | Projects Full Grid Page | Full showcase with Spendly, Business Management, demo creds, and GitHub links | M3 | R3 |
| 24 | Blog Page Article Cards | 4 engineering articles with tags and read times | M3 | R3 |
| 25 | Contact Page EmailJS Form | Name, Email, Message inputs with animated focus and feedback states | M3 | R3 |
| 26 | Contact Social & Direct Links | GitHub, LinkedIn, Email, Phone links with micro-interactions | M3 | R3 |
| 27 | R3F 3D Hero Scene | Rotating 3D geometry + floating particle field in WebGL Canvas | M4 | R3 |
| 28 | R3F Code-Splitting & Suspense | `React.lazy` canvas with `<SceneFallback>` skeleton loader | M4 | R5 |
| 29 | About Portrait 3D Parallax Tilt | Perspective transform (`rotateX`, `rotateY`, glare) tracking cursor on photo card | M4 | R3 |
| 30 | GSAP Timeline Line Draw Animation | SVG dynamic `strokeDashoffset` progress on timeline scroll | M4 | R3 |
| 31 | Framer Motion Curtain Transitions | Full-screen curtain wipe on route changes with `AnimatePresence` | M4 | R4 |
| 32 | E2E Testing Suite (Tiers 1–4) | Complete opaque-box automated test suite validating requirements | E2E Track | Acceptance |
| 33 | Adversarial Coverage & Hardening (Tier 5) | White-box stress testing, edge case verification, and bug fixes | M5 | Acceptance |
| 34 | Production Build & Dist Validation | Clean `npm run build` with chunk splitting and zero warnings | M5 | Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Requirement-driven opaque-box test runner and test suite (Tiers 1–4), publishes `TEST_READY.md` | none | DONE (406/406 tests pass) |
| M1 | Tech Stack Foundation & Architecture | Project scaffolding, dependencies, Vite, Tailwind, Router v6, folder structure, data models, `vercel.json` | none | DONE |
| M2 | Visual Design System, Navigation & Polish | Design tokens, anti-FOUC dark/light theme, typography, "A.M." preloader, custom cursor, scroll progress, sticky nav & mobile menu | M1 | DONE |
| M3 | Core Pages Content & Routing | Home, About, Projects (Spendly & CRM real links), Blog, Contact (EmailJS + social links) page sections and data | M2 | DONE |
| M4 | 3D Graphics, Advanced Animations & Interactions | R3F lazy-loaded hero canvas, Lenis scroll coordination, Framer Motion curtain transitions, portrait 3D tilt, SVG timeline draw | M3 | DONE |
| M5 | E2E Test Suite Validation, Hardening & Deployment | Pass 100% E2E test suite, adversarial coverage hardening, clean `npm run build` in `dist/`, responsive validation at 375px/768px/1280px | M4, E2E | DONE |


## Interface Contracts

### 1. Data Contracts (`src/data/developer.js`, `projects.js`, `skills.js`, `timeline.js`, `blogPosts.js`)
- `developer`:
  - `name`: string ("Aadinath Magar")
  - `nickname`: string ("Aadi")
  - `title`: string ("Full-Stack Developer")
  - `location`: string ("Navi Mumbai, India")
  - `email`: string ("aadinathbmagar75@gmail.com")
  - `phone`: string ("+91 92090 17621")
  - `github`: string ("https://github.com/aadinath29")
  - `linkedin`: string ("https://www.linkedin.com/in/aadinath-magar-profile")
  - `resumeUrl`: string ("/Aadi_Resume-04-09-2026.pdf")
  - `bio`: string (verified developer summary)
  - `stats`: array of `{ label: string, value: string | number, suffix?: string }`
- `projects`:
  - array of `{ id, title, subtitle, description, tech: string[], demoUrl: string, githubUrl: string, demoCredentials?: { email, password }, featured: boolean, isPlaceholder?: boolean }`

### 2. Context Contracts
- `ThemeContext`: `{ theme: 'dark' | 'light', toggleTheme: () => void }`
- `CursorContext`: `{ cursorVariant: 'default' | 'hover' | 'project' | 'hidden', cursorText: string, setCursorVariant: (v: string) => void, setCursorText: (t: string) => void }`

### 3. Motion & Animation Integration Contract
- `Lenis`: Coordinates with GSAP ScrollTrigger via:
  ```javascript
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- On route change: `lenis.scrollTo(0, { immediate: true })` + `ScrollTrigger.refresh()`.
- Page Transition: `<AnimatePresence mode="wait">` wrapping `<Routes location={location} key={location.pathname}>`.

## Code Layout
```
Profile/
├── public/
│   ├── favicon.svg
│   ├── portrait-placeholder.jpg
│   └── Aadi_Resume-04-09-2026.pdf
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── HeroCanvas.jsx
│   │   │   ├── HeroGeometry.jsx
│   │   │   ├── ParticleField.jsx
│   │   │   └── SceneFallback.jsx
│   │   ├── common/
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── Preloader.jsx
│   │   │   ├── ScrollProgressBar.jsx
│   │   │   ├── PageCurtain.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── MobileMenu.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   ├── BentoCard.jsx
│   │   │   ├── MarqueeTicker.jsx
│   │   │   └── ThemeToggle.jsx
│   │   └── sections/
│   │       ├── home/
│   │       │   ├── HeroSection.jsx
│   │       │   ├── StatsSection.jsx
│   │       │   ├── SkillsSection.jsx
│   │       │   ├── ProjectsPreview.jsx
│   │       │   └── TestimonialsSection.jsx
│   │       ├── about/
│   │       │   ├── AboutHero.jsx
│   │       │   ├── DepthPortrait.jsx
│   │       │   ├── BioNarrative.jsx
│   │       │   └── ExperienceTimeline.jsx
│   │       ├── projects/
│   │       │   ├── ProjectCard.jsx
│   │       │   └── ProjectsGrid.jsx
│   │       ├── blog/
│   │       │   └── BlogCard.jsx
│   │       └── contact/
│   │           ├── ContactForm.jsx
│   │           └── ContactInfo.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── CursorContext.jsx
│   ├── data/
│   │   ├── developer.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── timeline.js
│   │   └── blogPosts.js
│   ├── hooks/
│   │   ├── useLenis.js
│   │   └── useScrollTrigger.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── styles/
│   │   ├── index.css
│   │   └── animations.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── package.json
```
