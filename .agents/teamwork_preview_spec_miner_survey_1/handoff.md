# Handoff Report: Specification Mining & Requirements Catalog
**Agent**: `teamwork_preview_spec_miner_survey_1`  
**Date**: 2026-09-10T00:05:00+05:30 (UTC: 2026-09-09T18:35:00Z)  
**Project**: Aadinath Magar ("Aadi") Corporate Portfolio Website  
**Working Directory**: `c:\Users\Dell\Desktop\Profile\.agents\teamwork_preview_spec_miner_survey_1`  
**Target File**: `c:\Users\Dell\Desktop\Profile\.agents\teamwork_preview_spec_miner_survey_1\handoff.md`

---

## 1. Observation
1. **Primary Spec Document (`ORIGINAL_REQUEST.md`)**:
   - Location: `c:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md` (143 lines, 10,842 bytes).
   - Mandates a corporate-grade personal portfolio website for Aadinath Magar (brand name "Aadi").
   - Blends two design benchmarks:
     - **Cinematic animation depth**: `raviklaassens.com` (immersive 3D, scroll-driven motion, preloader, custom cursor, Lenis smooth scroll, depth portrait, clip-path hover).
     - **Clean editorial layout structure**: `13studio.framer.website/about` (generous whitespace, strong typographic hierarchy, bento grid sections, calm rest state).
   - Prescribes 5 required tech libraries: React + Vite + Tailwind CSS, React Router v6, Framer Motion, GSAP + ScrollTrigger, React Three Fiber (R3F) + Three.js, and Lenis smooth scrolling, plus EmailJS.
   - Mandates 5 multi-page routes: Home (`/`), About (`/about`), Projects (`/projects`), Blog (`/blog`), Contact (`/contact`).
   - Requires dark-primary palette with neon cyan/gold accents, dark/light mode toggle with localStorage persistence, Playfair Display/Cormorant serif headings, and Inter/Geist body text.
   - Demands system polish: "A.M." preloader, curtain page transitions, desktop custom blob cursor with hover states/labels, top scroll progress bar, sticky navigation with desktop clip-path hover and mobile overlay menu.
   - Demands deployment readiness: lazy-loaded R3F with Suspense skeleton, clean Vite build, `vercel.json` SPA rewrites, and placeholder image divs.

2. **Ground Truth Resume Asset (`Aadi_Resume-04-09-2026.pdf`)**:
   - Location: `c:\Users\Dell\Desktop\Profile\Aadi_Resume-04-09-2026.pdf` (63,741 bytes).
   - Directly observed and extracted:
     - Real contact email: `aadinathbmagar75@gmail.com`
     - Phone: `+91 92090 17621`
     - Location: Navi Mumbai, India
     - GitHub: `https://github.com/aadinath29`
     - LinkedIn: `https://www.linkedin.com/in/aadinath-magar-profile`
     - Real Education: Bharati Vidyapeeth College of Engineering, Navi Mumbai (2021–2025), Bachelor of Engineering in Information Technology, CGPA: 7.8/10.
     - Real Experience:
       - Backend Developer Intern at Kosqu Technolab (May 2026 – Aug 2026, Navi Mumbai): 14 Node/Express REST APIs, JWT, PostgreSQL schema indexing across 8 entities, modular MVC.
       - Software Developer Intern at OptimumValue Solution (Sept 2025 – Feb 2026, Navi Mumbai): Salesforce CRM Apex/Lightning, MERN platform converting natural language to user stories via LLM integration, 6 SOQL dashboards.
     - Real Projects:
       - **Spendly — Multi-User Expense Tracker**: Live Demo `https://spendly-sable-delta.vercel.app/`, GitHub `https://github.com/aadinath29/spendly-`, React SPA + Express REST API, MySQL connection pooling, JWT + bcrypt, Recharts dark glassmorphism dashboard.
       - **Business Management CRM**: Live Demo `https://business-managment-alpha.vercel.app/login`, GitHub `https://github.com/aadinath29/BusinessManagment-`, React, Node.js, PostgreSQL, LLM integration, lead tracking, quotation-to-invoice automation, Demo Login Credentials: `admin@antigravity.com` / `Admin@123`.

3. **Orchestrator Plan (`.agents/orchestrator_1/plan.md`)**:
   - Establishes a 4-phase rollout: Phase 0 (Survey), Phase 1 (Test Infra + 5 Implementation Milestones), Phase 2 (Iteration loop with 2 Reviewers, 2 Challengers, 1 Forensic Auditor), Phase 3 (Final Acceptance & Deployment).

---

## 2. Logic Chain
1. *From developer profile & resume analysis*: The site must represent a real engineer in Navi Mumbai seeking full-stack and backend roles. Integrating real metrics ("2 Projects shipped", "500+ Job Applications sent", "MERN Stack focus", "Based in India"), real demo credentials, and real internship history elevates the portfolio from a generic template into a high-credibility, corporate-grade showcase.
2. *From visual reference analysis (`raviklaassens.com` + `13studio.framer.website/about`)*: The visual design must balance resting stillness with motion drama. Generous padding (`py-24`, `py-32`), editorial serif headlines (`Playfair Display`), and tight negative letter-spacing establish the editorial structure. When the user scrolls or hovers, GSAP ScrollTrigger, Lenis smooth scrolling, R3F particles, and Framer Motion curtain transitions deliver cinematic momentum.
3. *From performance constraints (R5)*: R3F and Three.js carry a bundle weight of ~150KB–250KB gzipped. Loading this synchronously blocks first contentful paint (FCP). Therefore, code-splitting via `React.lazy` and wrapping in `<Suspense fallback={<HeroSkeleton />}>` is mandatory.
4. *From single-page app (SPA) routing on Vercel*: React Router v6 handles client-side routes. Direct navigation or refreshing `/about`, `/projects`, etc. on static hosts returns 404 unless routed to `/index.html` via `vercel.json` rewrites.
5. *From UX polish requirements (R4)*:
   - Desktop custom cursor must be suppressed on touch devices to avoid ghost taps and layout clipping.
   - Dark/light theme state must be initialized prior to render or synced immediately with `localStorage` to prevent flashing unstyled themes (FOUC).
   - EmailJS integration must provide instant UI feedback (submitting, success, error) and clear code comments indicating placeholder credentials.

---

## 3. Comprehensive Specification & Requirements Catalog

### Features Discovered
| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Profile & Data | Developer Profile Ground Truth | Authentic personal, contact, and social data for Aadinath Magar | Resume PDF & Request | Rendered profile attributes across all sections | Fallback to default copy if key missing | `Aadi_Resume-04-09-2026.pdf` & `ORIGINAL_REQUEST.md` |
| 2 | Profile & Data | Spendly Showcase Card | Feature card with live URL, repo URL, Recharts dashboard tags | User click / hover | External navigation to demo or repo | `target="_blank"` with `rel="noreferrer"` | `ORIGINAL_REQUEST.md` § Projects |
| 3 | Profile & Data | Business Management CRM Card | Feature card with demo login credentials (`admin@antigravity.com` / `Admin@123`) | User click / hover | External navigation to demo login | Visible demo credentials banner | `Aadi_Resume-04-09-2026.pdf` & `ORIGINAL_REQUEST.md` |
| 4 | Architecture | Multi-Page Routing | Client-side routing for 5 primary routes: `/`, `/about`, `/projects`, `/blog`, `/contact` | URL pathname changes | Rendered page view corresponding to path | Catch-all redirect to `/` or 404 page | `ORIGINAL_REQUEST.md` § R1 |
| 5 | Architecture | Lenis Smooth Scrolling | Inertial momentum scroll engine attached to window | User wheel / touch gestures | Smooth interpolated scroll position | Degrades to native scroll if disabled | `ORIGINAL_REQUEST.md` § R1 |
| 6 | Architecture | Component Architecture | Independent, modular component structure per section and motion layer | Props, state, context | Rendered UI tree | React Error Boundaries prevent app-wide crash | `ORIGINAL_REQUEST.md` § R1 |
| 7 | Visual Design | Dark/Light Theme System | CSS variable-based palette with `class` dark mode, persisted to `localStorage` | Toggle button click | Toggles `.dark` on `document.documentElement` | Defaults to dark theme if unset | `ORIGINAL_REQUEST.md` § R2 |
| 8 | Visual Design | Editorial Typography | Playfair Display / Cormorant serif headings + Inter / Geist body text | Google Fonts CSS | Editorial high-contrast typography hierarchy | Fallback to `serif` / `sans-serif` | `ORIGINAL_REQUEST.md` § R2 |
| 9 | Home Page | 3D Hero Scene | Interactive R3F canvas: rotating geometry + floating particle field | Mouse coordinates, scroll delta | WebGL render in background | Suspense skeleton fallback if slow/unsupported | `ORIGINAL_REQUEST.md` § R3 |
| 10 | Home Page | Animated Hero Text Reveal | Word-by-word staggered entrance for "Aadinath Magar" & "Full-Stack Developer" | Component mount event | Staggered fade/slide-up animation | Renders immediately if animations reduced | `ORIGINAL_REQUEST.md` § R3 |
| 11 | Home Page | Animated Stats Counters | 4 counters: 2 Projects Shipped, 500+ Applications, MERN Stack, India | Scroll into viewport | Numbers animate upward from 0 | Displays final value directly if JS fails | `ORIGINAL_REQUEST.md` § R3 |
| 12 | Home Page | Infinite Skills Marquee (Layer 1) | Horizontal ticker of skills (React, Node, Mongo, Express, Tailwind, etc.) | Continuous timer / CSS | Infinite seamless horizontal looping | Pauses on hover | `ORIGINAL_REQUEST.md` § R3 |
| 13 | Home Page | Skills Bento Grid (Layer 2) | Domain-categorized asymmetric cards with animated progress indicators | Scroll position via Lenis | Visual proficiency indicators fill dynamically | Static filled bars if scroll tracking disabled | `ORIGINAL_REQUEST.md` § R3 |
| 14 | Home Page | Projects Teaser Grid | 3-card teaser (Spendly, Business Management, Coming Soon) | Hover / click | Border glow, card scale, cursor label change | Opens links safely | `ORIGINAL_REQUEST.md` § R3 |
| 15 | Home Page | Testimonials Marquee | Auto-scrolling carousel of 3 recommendation quotes | Continuous scroll | Smooth ticker of testimonials | Pauses on hover | `ORIGINAL_REQUEST.md` § R3 |
| 16 | About Page | Hero Headline Stagger | Large editorial heading: "Full-Stack Developer. Builder. Problem Solver." | Page mount | Word-by-word entrance reveal | Visible on initial render fallback | `ORIGINAL_REQUEST.md` § R3 |
| 17 | About Page | Depth Parallax Portrait Tilt | Portrait card with 3D perspective tilt driven by cursor position | Mousemove over card | CSS 3D transform (`rotateX`, `rotateY`, glare) | Smoothly resets to neutral on mouseleave | `ORIGINAL_REQUEST.md` § R3 |
| 18 | About Page | Narrative Bio Section | Full developer bio from profile with scroll-triggered fade | Scroll into view | Opacity & translation animation | Renders static text if motion off | `ORIGINAL_REQUEST.md` § R3 |
| 19 | About Page | Animated SVG Timeline | Education & internship timeline with SVG line drawing on scroll | Scroll position | GSAP `strokeDashoffset` dynamically updates | Solid line if GSAP inactive | `ORIGINAL_REQUEST.md` § R3 |
| 20 | Projects Page | Full Project Grid & Filters | Complete project showcase with rich tags, live URLs, GitHub buttons | User interaction | Staggered grid entrance and hover overlays | External links open safely | `ORIGINAL_REQUEST.md` § R3 |
| 21 | Blog Page | Minimal Article Cards | 3-4 developer article teaser cards with reading times and categories | User click / hover | Card hover lift, tag highlights | Clearly marked as placeholder articles | `ORIGINAL_REQUEST.md` § R3 |
| 22 | Contact Page | EmailJS Contact Form | Name, Email, and Message inputs with animated focus states | User form input + Submit | Sends email payload via EmailJS SDK | Inline error notification + fallback email | `ORIGINAL_REQUEST.md` § R3 |
| 23 | Contact Page | Social Networking Links | GitHub, LinkedIn, and direct email buttons with micro-interactions | Hover / click | Magnetic pull / glow highlight | Opens target URLs in new tab | `ORIGINAL_REQUEST.md` § R3 |
| 24 | System Polish | "A.M." Branded Preloader | Initial loading screen with initials monogram and 0–100% progress counter | Initial app initialization | Smooth split or curtain exit reveal | Auto-completes within timeout safety | `ORIGINAL_REQUEST.md` § R4 |
| 25 | System Polish | Curtain Page Transitions | Full-screen curtain wipe on route transitions | Route navigation event | Enters from edge, covers, and slides away | Graceful fade fallback if interrupted | `ORIGINAL_REQUEST.md` § R4 |
| 26 | System Polish | Custom Animated Cursor | Dual-layer dot + ring cursor with lerp following and contextual labels | Mouse movement & element hover | Cursor scales, morphs, and shows "View"/"Open" | Hidden on touch/mobile devices | `ORIGINAL_REQUEST.md` § R4 |
| 27 | System Polish | Viewport Scroll Progress Bar | 2px–3px neon cyan/gold gradient bar fixed at top of viewport | Window scroll event | Bar width scales 0% → 100% | Clamped between 0 and 100% | `ORIGINAL_REQUEST.md` § R4 |
| 28 | System Polish | Sticky Navigation & Mobile Menu | Sticky header with desktop clip-path hover and mobile full-screen overlay | Scroll & hamburger click | Glassmorphism bar & animated mobile menu | Focus trapped while mobile menu open | `ORIGINAL_REQUEST.md` § R4 |
| 29 | Performance | R3F Lazy Loading & Suspense | 3D Canvas component dynamically imported via `React.lazy` | Page load | Suspense fallback skeleton until bundle ready | Error boundary prevents app disruption | `ORIGINAL_REQUEST.md` § R5 |
| 30 | Deployment | Vercel SPA Routing Configuration | `vercel.json` rewrites all requests to `/index.html` | Client route requests on Vercel | Serves `index.html` without 404 | Prevents static server route failure | `ORIGINAL_REQUEST.md` § R5 |

---

### Edge Cases
| # | Feature | Input / Condition | Observed / Required Behavior |
|---|---------|-------------------|------------------------------|
| 1 | R3F 3D Scene | WebGL context lost or hardware acceleration disabled | Catch with Error Boundary; render stylized gradient fallback without breaking page layout. |
| 2 | Lenis Smooth Scroll | Rapid window resizing or orientation change | Trigger `lenis.resize()` on window resize event to recalculate scroll dimensions accurately. |
| 3 | Lenis + GSAP ScrollTrigger | Lenis smooth scroll active during ScrollTrigger calculations | Connect `lenis.on('scroll', ScrollTrigger.update)` and link to GSAP ticker with `lagSmoothing(0)`. |
| 4 | Custom Cursor | Mobile device or touch screen device (`pointer: coarse`) | Hide cursor completely via `@media (hover: none)` and ensure `pointer-events: none` on cursor elements. |
| 5 | Framer Motion Page Transitions | User clicks route links repeatedly in rapid succession | Set `AnimatePresence mode="wait"` with unique route `key={location.pathname}` so previous curtain cleans up before next mounts. |
| 6 | Theme Toggle | User switches theme before JS initializes | Read `localStorage.getItem('theme')` or system preference synchronously in `index.html` head to prevent FOUC (flash of unstyled content). |
| 7 | EmailJS Form Submission | Form submitted with placeholder credentials (`YOUR_SERVICE_ID`) | Intercept or handle API rejection; show clear inline error message instructing user to contact `aadinathbmagar75@gmail.com` directly. |
| 8 | Direct URL Navigation on Vercel | User refreshes `/about`, `/projects`, `/blog`, or `/contact` | `vercel.json` rewrite rule `{ "source": "/(.*)", "destination": "/index.html" }` serves SPA root cleanly. |
| 9 | Skills Marquee | Reduced motion accessibility preference (`prefers-reduced-motion`) | Marquee ticker pauses or switches to stationary grid to honor user accessibility preferences. |
| 10 | Portrait Tilt on Mobile | Device orientation tilt or touch move | Disable desktop 3D perspective tilt on touch screens; display clean high-fidelity card instead. |

---

### Detailed Catalog Breakdown

#### Catalog 1: Real Developer Profile Data
- **Full Legal Name**: Aadinath Magar
- **Brand / Nickname**: Aadi
- **Preloader Monogram**: "A.M." or stylized "AM"
- **Navigation Logo**: "A—M" or "Aadinath.dev"
- **Location**: Navi Mumbai, Maharashtra, India ("Based in India")
- **Direct Email**: `aadinathbmagar75@gmail.com`
- **Phone**: `+91 92090 17621`
- **GitHub Profile**: `https://github.com/aadinath29`
- **LinkedIn Profile**: `https://www.linkedin.com/in/aadinath-magar-profile`
- **Key Career Stats**:
  - `2` — Projects Shipped
  - `500+` — Job Applications Sent
  - `MERN` — Core Stack Focus
  - `India` — Based in Navi Mumbai, India
- **Core Bio Text**:
  > "Aadinath Magar is a full-stack developer from India, specializing in MERN stack development. Passionate about building clean, performant web applications with great UX. Currently focused on expanding into Agentic AI and advanced React patterns. Open to full-time software engineering roles."
- **Education (Ground Truth)**:
  - **Institution**: Bharati Vidyapeeth College of Engineering, Navi Mumbai
  - **Degree**: Bachelor of Engineering – Information Technology (2021 – 2025)
  - **Performance**: CGPA 7.8 / 10
- **Internship Experience (Ground Truth)**:
  1. **Backend Developer Intern — Kosqu Technolab** (May 2026 – Aug 2026 | Navi Mumbai):
     - Built & shipped 14 RESTful API endpoints using Node.js/Express with JWT authentication.
     - Optimized PostgreSQL schemas across 8 entities via indexing and query restructuring.
     - Extended modular MVC backend with reusable middleware for validation and auth.
     - Defined API contracts with frontend engineers for parallel sprint execution.
  2. **Software Developer Intern — OptimumValue Solution** (Sept 2025 – Feb 2026 | Navi Mumbai):
     - Automated 7 business workflows in Salesforce CRM using Apex, Lightning Components, validation rules.
     - Built full-stack MERN tool converting natural language to structured user stories via LLM integration.
     - Developed Apex triggers and multi-step business logic automations.
     - Constructed 6 SOQL dashboards for sales pipelines and lead conversion visibility.
- **Real Projects Catalog**:
  1. **Spendly — Multi-User Expense Tracker**:
     - **Live URL**: `https://spendly-sable-delta.vercel.app/`
     - **GitHub URL**: `https://github.com/aadinath29/spendly-`
     - **Architecture**: React SPA + Express REST API, MySQL database, JWT authentication with bcrypt password hashing and express-validator.
     - **Highlights**: Account-scoped data isolation, promise-based connection pooling, dark glassmorphism Tailwind UI with Recharts spending analytics.
  2. **Business Management CRM**:
     - **Live URL**: `https://business-managment-alpha.vercel.app/login`
     - **GitHub URL**: `https://github.com/aadinath29/BusinessManagment-`
     - **Demo Credentials**: Email `admin@antigravity.com` | Password `Admin@123`
     - **Architecture**: Full-stack MERN + PostgreSQL + LLM integration.
     - **Highlights**: Multi-branch business operations, lead tracking, quotation-to-invoice automated accounting workflow.
  3. **Upcoming Work Teaser**:
     - **Card Title**: "More Coming Soon" / "Agentic AI Workflow Studio"
     - **Status**: Active Development

---

#### Catalog 2: R1 — Tech Stack & Architecture Specifications
- **Framework & Bundler**: React 18 / 19 + Vite + Tailwind CSS.
- **Routing**: React Router v6 (`react-router-dom`), route paths:
  - `/` (Home)
  - `/about` (About)
  - `/projects` (Projects)
  - `/blog` (Blog)
  - `/contact` (Contact)
  - `*` (Catch-all / Not Found)
- **Mandatory Libraries**:
  1. `framer-motion`: Page transitions, layout animations, curtain reveals, micro-interactions.
  2. `gsap` & `gsap/ScrollTrigger`: High-performance scroll-driven animations, SVG path drawing.
  3. `@react-three/fiber` & `@react-three/drei` & `three`: Interactive 3D hero canvas with geometry and particle system.
  4. `@studio-freight/lenis` / `lenis`: Smooth inertial scroll engine.
  5. `@emailjs/browser`: Contact form submission handler.
  6. `lucide-react`: Modern minimalist iconography.
- **Component Folder Architecture**:
  ```
  src/
  ├── components/
  │   ├── common/
  │   │   ├── Navbar.jsx
  │   │   ├── Footer.jsx
  │   │   ├── CustomCursor.jsx
  │   │   ├── Preloader.jsx
  │   │   ├── ScrollProgress.jsx
  │   │   ├── PageTransition.jsx
  │   │   └── ThemeToggle.jsx
  │   ├── 3d/
  │   │   ├── HeroCanvas.jsx
  │   │   ├── GeometryMesh.jsx
  │   │   ├── ParticleField.jsx
  │   │   └── CanvasSkeleton.jsx
  │   ├── home/
  │   │   ├── HeroSection.jsx
  │   │   ├── StatsCounter.jsx
  │   │   ├── SkillsMarquee.jsx
  │   │   ├── SkillsBento.jsx
  │   │   ├── ProjectsTeaser.jsx
  │   │   └── TestimonialsMarquee.jsx
  │   ├── about/
  │   │   ├── AboutHero.jsx
  │   │   ├── DepthPortrait.jsx
  │   │   ├── BioSection.jsx
  │   │   └── ExperienceTimeline.jsx
  │   ├── projects/
  │   │   ├── ProjectGrid.jsx
  │   │   └── ProjectCard.jsx
  │   ├── blog/
  │   │   ├── BlogGrid.jsx
  │   │   └── BlogCard.jsx
  │   └── contact/
  │       ├── ContactForm.jsx
  │       └── SocialLinks.jsx
  ├── context/
  │   ├── ThemeContext.jsx
  │   └── CursorContext.jsx
  ├── hooks/
  │   ├── useLenis.js
  │   └── useScrollProgress.js
  ├── data/
  │   ├── profileData.js
  │   ├── projectsData.js
  │   ├── skillsData.js
  │   ├── timelineData.js
  │   └── blogData.js
  ├── pages/
  │   ├── Home.jsx
  │   ├── About.jsx
  │   ├── Projects.jsx
  │   ├── Blog.jsx
  │   ├── Contact.jsx
  │   └── NotFound.jsx
  ├── styles/
  │   └── globals.css
  ├── App.jsx
  └── main.jsx
  ```

---

#### Catalog 3: R2 — Visual Design System Tokens
- **Theme Philosophy**: Dark-primary luxury editorial aesthetic. Deep blacks and dark navy baseline paired with electric neon cyan and warm gold accents.
- **CSS Color Tokens (Defined in `tailwind.config.js` & `globals.css`)**:
  - `--bg-primary`: `#05070e` (Dark) / `#fafaf9` (Light)
  - `--bg-secondary`: `#0b1120` (Dark) / `#f1f5f9` (Light)
  - `--surface`: `rgba(15, 23, 42, 0.7)` (Dark) / `rgba(255, 255, 255, 0.9)` (Light)
  - `--surface-border`: `rgba(255, 255, 255, 0.08)` (Dark) / `rgba(0, 0, 0, 0.08)` (Light)
  - `--accent-cyan`: `#00f0ff` (Dark primary accent) / `#0284c7` (Light primary accent)
  - `--accent-gold`: `#f59e0b` / `#fbbf24` (Dark secondary accent) / `#d97706` (Light secondary accent)
  - `--text-primary`: `#f8fafc` (Dark) / `#0f172a` (Light)
  - `--text-secondary`: `#94a3b8` (Dark) / `#64748b` (Light)
  - `--text-muted`: `#64748b` (Dark) / `#94a3b8` (Light)
- **Typography System**:
  - Headings: `font-serif` mapped to **Playfair Display** (or **Cormorant Garamond**) — elegant editorial display styling, tight letter-spacing (`-0.03em`), high contrast.
  - Body: `font-sans` mapped to **Inter** (or **Geist**) — clean geometric grotesque sans-serif, light/regular weight, high legibility.
  - Mono / Accent: `font-mono` mapped to **JetBrains Mono** — applied to metrics, tags, code snippets, dates.
- **Theme Persistence**:
  - Synchronized via `localStorage.getItem('theme')` / `localStorage.setItem('theme', newTheme)`.
  - Default: `'dark'`.
  - Class-based strategy in Tailwind (`darkMode: 'class'`).

---

#### Catalog 4: R3 — Pages & Sections Specifications

##### Page 1: Home (`/`)
1. **Hero Section**:
   - 100vh full-screen height.
   - 3D Canvas (R3F): rotating 3D faceted geometry (torus knot / icosahedron) + interactive floating particle field.
   - Code-split with `React.lazy` and wrapped in `<Suspense fallback={<CanvasSkeleton />}>`.
   - Typography reveal: Large Playfair Display headline "Aadinath Magar", subtitle "Full-Stack Developer", animated word-by-word with Framer Motion.
   - Parallax scroll effect: Canvas and typography translate at differentiated speeds as user scrolls down.
   - CTA Buttons: "Download Resume" (linking to resume file) + "View Projects" (smooth scroll to showcase).
2. **Stats Counter Section**:
   - 4-column metric grid:
     1. `2` — Projects Shipped
     2. `500+` — Job Applications Sent
     3. `MERN` — Stack Specialization
     4. `India` — Based in Navi Mumbai
   - Numbers animate progressively from 0 when scrolled into view.
3. **Dual-Layer Skills Section**:
   - **Layer 1: Continuous Marquee Ticker**:
     - Infinite horizontal auto-scrolling ticker.
     - Displays skills: React, Node.js, MongoDB, Express, JavaScript, Tailwind CSS, PostgreSQL, MySQL, Git, Vite, Postman, REST APIs.
     - Pauses smoothly on hover.
   - **Layer 2: Bento Grid Layout**:
     - Asymmetric cards grouped by domain:
       - Frontend (React, JavaScript, Tailwind, Redux)
       - Backend & APIs (Node.js, Express, REST APIs, JWT, MVC)
       - Databases (MongoDB, PostgreSQL, MySQL)
       - Dev Tools & Cloud (Git, GitHub, Vite, Postman, Vercel)
       - Emerging Technologies (Agentic AI, LLM Integration)
     - Animated proficiency bars fill on scroll via Lenis progress / GSAP ScrollTrigger.
4. **Projects Showcase (Teaser)**:
   - 3-card grid:
     - Spendly (Personal Finance Tracker) — Live Demo + GitHub link.
     - Business Management System (CRM) — Live Demo + GitHub link + demo credentials pill.
     - "More Coming Soon" placeholder card.
   - Hover effects: 3D scale, neon glow border reveal, glassmorphism overlay.
   - "View All Projects" link routing to `/projects`.
5. **Testimonials Marquee**:
   - Auto-scrolling horizontal marquee of 3 recommendation quotes.
   - Clearly labeled placeholder cards awaiting production references.

##### Page 2: About (`/about`)
1. **Hero Text Reveal**:
   - Editorial headline: "Full-Stack Developer. Builder. Problem Solver."
   - Staggered word-by-word reveal on load.
2. **Depth / Parallax Portrait Tilt**:
   - Placeholder image container (`/public/portrait-placeholder.jpg` with modern CSS gradient fallback).
   - Mouse-driven 3D perspective tilt (`rotateX`, `rotateY`, dynamic specular lighting).
   - Prominent code comment: `// Replace portrait-placeholder.jpg with Aadi's real photo`.
3. **Bio Narrative Block**:
   - Full developer profile bio highlighting MERN stack proficiency, passion for performant UX, and focus on Agentic AI.
   - Scroll-triggered text reveal.
4. **Education & Experience Timeline**:
   - Central vertical SVG line that dynamically draws as user scrolls (GSAP `strokeDashoffset`).
   - Milestone nodes:
     - 2021–2025: Bharati Vidyapeeth College of Engineering, Navi Mumbai — B.E. in Information Technology (CGPA 7.8/10).
     - Sept 2025 – Feb 2026: OptimumValue Solution — Software Developer Intern (MERN + Salesforce + LLM).
     - May 2026 – Aug 2026: Kosqu Technolab — Backend Developer Intern (Node.js REST APIs + PostgreSQL).

##### Page 3: Projects (`/projects`)
1. **Header**:
   - Editorial title: "Selected Works & Systems".
   - Subhead: "A curated index of production-ready web applications, distributed APIs, and full-stack platforms."
2. **Project Grid**:
   - **Spendly — Multi-User Expense Tracker**:
     - Full technical description (React SPA, Express REST API, MySQL pooling, JWT authentication, Recharts dark UI).
     - Live Demo URL: `https://spendly-sable-delta.vercel.app/`
     - GitHub URL: `https://github.com/aadinath29/spendly-`
     - Badges: React, Express, MySQL, JWT, Tailwind, Recharts.
   - **Business Management System**:
     - Full technical description (Multi-branch operations CRM, lead tracking, quotation-to-invoice automation, PostgreSQL).
     - Demo Credentials: `admin@antigravity.com` / `Admin@123`
     - Live Demo URL: `https://business-managment-alpha.vercel.app/login`
     - GitHub URL: `https://github.com/aadinath29/BusinessManagment-`
     - Badges: React, Node.js, Express, PostgreSQL, LLM Integration.
   - **More Projects Coming Soon**:
     - Modern glassmorphism teaser card with pulsating glow badge.
3. **Interactions**:
   - Staggered card entrance on mount.
   - Hover zoom, neon border glow, cursor text changes to "Open".

##### Page 4: Blog (`/blog`)
1. **Header**:
   - "Engineering Notes & Insights".
   - Subhead: "Reflections on software architecture, performance optimizations, and agentic workflows."
2. **Article Cards (3–4 Placeholders)**:
   - Article 1: "Architecting Scalable Multi-Tenant REST APIs with Node.js and Express" (Backend, 6 min read)
   - Article 2: "Why Normalized Relational Schemas Matter in Modern CRM Development" (Database, 5 min read)
   - Article 3: "Performance Optimization in React: Profiling, Memoization, and Bundle Splitting" (Frontend, 7 min read)
   - Article 4: "The Shift from MERN to Agentic AI: Autonomous Workflows for Modern Engineers" (AI, 8 min read)
   - Cards marked with placeholder tag; hover arrow micro-interaction.

##### Page 5: Contact (`/contact`)
1. **Header & Context**:
   - "Let's Build Something Exceptional".
   - Location: Navi Mumbai, India | Open for Full-Time Software Engineering Roles.
   - Direct Email: `aadinathbmagar75@gmail.com` | Phone: `+91 92090 17621`.
2. **EmailJS Form**:
   - Fields: Name, Email, Message.
   - Floating / glowing animated focus states on inputs.
   - Interactive feedback states: Idle, Sending, Success ("Message received! Aadi will respond shortly."), Error ("Message delivery failed. Please email aadinathbmagar75@gmail.com directly.").
   - Credentials configured with placeholders and clear comment:
     ```javascript
     // IMPORTANT: Replace these with your real EmailJS credentials from https://emailjs.com
     const SERVICE_ID = 'YOUR_SERVICE_ID';
     const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
     const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
     ```
3. **Social & Networking Links**:
   - GitHub (`https://github.com/aadinath29`)
   - LinkedIn (`https://www.linkedin.com/in/aadinath-magar-profile`)
   - Email (`mailto:aadinathbmagar75@gmail.com`)
   - Micro-interactions: magnetic hover pull, neon glow border.

---

#### Catalog 5: R4 — System Polish Specifications
1. **"A.M." Branded Preloader**:
   - Initial loading screen featuring stylized "A.M." monogram in Playfair Display serif.
   - Numerical counter (0% → 100%) tracking asset/font readiness.
   - Smooth curtain slide-up reveal exiting to hero view.
2. **Framer Motion Curtain Page Transitions**:
   - Full-screen curtain layer sliding across screen on route change.
   - `AnimatePresence mode="wait"` wrapped around routes.
   - Evokes a cinematic stage scene change rather than a standard opacity crossfade.
3. **Custom Desktop Cursor**:
   - Visible exclusively on non-touch desktop screens (`@media (hover: hover) and (pointer: fine)`).
   - Dual-component: inner dot + smooth trailing outer ring with spring interpolation.
   - Contextual reaction:
     - Hover over buttons / links: scales up 2.5x with subtle glow.
     - Hover over project cards: displays "View" or "Open" badge.
     - Hidden over native form inputs if desired for standard caret visibility.
4. **Scroll Progress Indicator**:
   - Fixed horizontal bar at top of viewport (`z-[100]`).
   - Height: 2px–3px.
   - Fills from left to right (0% → 100%) using gradient (`from-cyan-400 to-amber-400`).
5. **Sticky Navigation & Responsive Menu**:
   - Fixed header with subtle backdrop blur and border.
   - Left: "A—M" editorial logo.
   - Desktop: Navigation links with clip-path slide reveal or sliding underline on hover.
   - Right: Theme toggle button + "Resume" download button.
   - Mobile: Animated hamburger icon transitioning to full-screen overlay with staggered link entrance.

---

#### Catalog 6: R5 — Performance & Deployment Readiness
1. **Lazy Loading & Code Splitting**:
   - 3D Canvas / R3F scene dynamically imported with `React.lazy()`.
   - Suspense fallback skeleton ensures initial DOM renders in <500ms without WebGL stalls.
2. **Clean Vite Build**:
   - `npm run build` must succeed without warnings or unresolved imports.
   - Generates production-ready `dist/` directory.
3. **Vercel SPA Rewrites Configuration**:
   - Root `vercel.json` file:
     ```json
     {
       "rewrites": [
         {
           "source": "/(.*)",
           "destination": "/index.html"
         }
       ]
     }
     ```
4. **Placeholder Assets**:
   - CSS gradient and SVG fallbacks for portraits and project previews so no broken image links exist.
   - Actual resume PDF placed in `public/` directory for immediate download functionality.

---

#### Catalog 7: Acceptance Criteria Matrix

| Criterion ID | Category | Testable Verification Check | Expected Result | Pass Criteria |
|--------------|----------|-----------------------------|-----------------|---------------|
| AC-01 | Foundation | `npm run dev` startup | Starts Vite dev server with 0 errors | Terminal clean, HTTP 200 on port |
| AC-02 | Foundation | `npm run build` build test | Vite production bundle compiles | `dist/` created with `index.html` & assets |
| AC-03 | Foundation | Core 5 libraries installed | `package.json` contains framer-motion, gsap, @react-three/fiber + three, lenis, @emailjs/browser | All 5 present and imported |
| AC-04 | Foundation | React Router v6 routing | Navigate to `/`, `/about`, `/projects`, `/blog`, `/contact` | All 5 routes render without 404 |
| AC-05 | Foundation | Vercel rewrite configuration | Inspect `vercel.json` | Contains `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` |
| AC-06 | Pages & Sections | Home 3D Hero Scene | Hero renders R3F canvas with geometry + particles | Canvas element in DOM, no WebGL errors |
| AC-07 | Pages & Sections | Hero Typography Reveal | "Aadinath Magar" & "Full-Stack Developer" animate on load | Words animate with opacity/transform |
| AC-08 | Pages & Sections | Stats Counters | Scroll to Stats section | Counters animate up to 2, 500+, MERN, India |
| AC-09 | Pages & Sections | Skills Dual-Layer | Home skills section has Layer 1 (Marquee) and Layer 2 (Bento) | Infinite ticker running + bento grid with progress bars |
| AC-10 | Pages & Sections | Projects Teaser Grid | 3 teaser cards (Spendly, Business Management, Coming Soon) | Spendly and CRM cards link to real demos & repos |
| AC-11 | Pages & Sections | Testimonials Marquee | Home testimonials section renders auto-scrolling quotes | Ticker loops smoothly with 3 quotes |
| AC-12 | Pages & Sections | About Hero Stagger | About page displays "Full-Stack Developer. Builder. Problem Solver." | Heading revealed word-by-word |
| AC-13 | Pages & Sections | Depth Portrait 3D Tilt | Move mouse over portrait card on About page | Card tilts in 3D perspective following mouse coordinates |
| AC-14 | Pages & Sections | Experience Timeline | Scroll down About page timeline | Central SVG line animates stroke-dashoffset |
| AC-15 | Pages & Sections | Projects Page Full Grid | Navigate to `/projects` | Displays Spendly & Business Management with live demo & GitHub links |
| AC-16 | Pages & Sections | Business CRM Demo Creds | Inspect Business Management card | Displays `admin@antigravity.com` / `Admin@123` |
| AC-17 | Pages & Sections | Blog Page Cards | Navigate to `/blog` | Displays 3–4 developer article cards with reading times |
| AC-18 | Pages & Sections | Contact Form EmailJS | Fill Name, Email, Message on `/contact` and submit | Input validation active; feedback state rendered |
| AC-19 | Pages & Sections | Social Links | Click GitHub, LinkedIn links | Correct URLs open with `target="_blank"` |
| AC-20 | System Polish | "A.M." Preloader | Initial page load | Preloader displays monogram + progress bar, then slides away |
| AC-21 | System Polish | Curtain Page Transition | Switch between routes | Full-screen curtain slides across viewport before new page renders |
| AC-22 | System Polish | Custom Desktop Cursor | Move mouse on desktop screen | Dot + ring cursor follows mouse, scales on links, hidden on mobile |
| AC-23 | System Polish | Scroll Progress Bar | Scroll any page | Thin top bar expands 0% → 100% proportionally |
| AC-24 | System Polish | Dark / Light Theme Toggle | Click theme toggle button | Toggles dark/light class, swaps variables, persists in `localStorage` |
| AC-25 | System Polish | Lenis Smooth Scroll | Scroll page using mouse wheel | Inertial smooth scroll active, noticeable difference from native |
| AC-26 | Design Quality | Typography hierarchy | Headings use Playfair Display / Cormorant; body uses Inter / Geist | Computed font-family matches specified fonts |
| AC-27 | Design Quality | Color Tokens | Inspect CSS classes & variables | Deep navy/black + neon cyan/gold accents used consistently |
| AC-28 | Design Quality | Responsive Viewports | Test at 375px (mobile), 768px (tablet), 1280px (desktop) | No horizontal overflow, mobile navigation menu functions |
| AC-29 | Design Quality | Zero Fake Data in Key Areas | Verify name, links, education, internships | Real data from `Aadi_Resume-04-09-2026.pdf` used |

---

## 4. Caveats
1. **EmailJS Sandbox Credential Limits**: In demo / local development mode, EmailJS keys are placeholders (`YOUR_SERVICE_ID`, etc.). Submissions will trigger the error state unless replaced with real credentials. The UI must gracefully catch this error and display helpful guidance to the user.
2. **WebGL Fallback on Unsupported Environments**: Low-powered devices or virtualization environments without WebGL acceleration may fail to compile shaders. The 3D hero canvas must be enclosed within an error boundary and suspense container to render a clean gradient fallback.
3. **Touch Device Custom Cursor Suppression**: The custom cursor must strictly be suppressed on touch devices (`@media (hover: none)`) to avoid interfering with mobile touch events or creating visual artifacts.

---

## 5. Conclusion
The specification mining survey is complete and authoritative. Every functional requirement, design token, page section, micro-interaction, animation mechanic, and acceptance criterion has been mapped and cross-referenced with both `ORIGINAL_REQUEST.md` and the ground truth resume `Aadi_Resume-04-09-2026.pdf`. The catalog is fully organized, actionable, and ready for immediate decomposition into milestones and test infrastructure by the orchestrator and team.

---

## 6. Verification Method
To independently verify this specification report:
1. Compare profile data against `c:\Users\Dell\Desktop\Profile\Aadi_Resume-04-09-2026.pdf`:
   - Name: Aadinath Magar
   - College: Bharati Vidyapeeth College of Engineering, Navi Mumbai
   - Spendly & Business Management live URLs and demo credentials
2. Compare functional specifications against `c:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md`:
   - Verify R1–R5 section numbers, page specifications (Home, About, Projects, Blog, Contact), and Acceptance Criteria checklist.
3. Validate that all 30 features and 10 edge cases map to concrete requirements.
