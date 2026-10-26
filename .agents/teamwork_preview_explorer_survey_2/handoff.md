# Architectural Blueprint & Library Integration Evaluation Report
**Agent**: `teamwork_preview_explorer_survey_2` (Survey Explorer 2 — Architecture & Integration Evaluator)  
**Date**: 2026-09-10T00:07:00+05:30 (UTC: 2026-09-09T18:37:00Z)  
**Project**: Aadinath Magar ("Aadi") Corporate Portfolio Website  
**Working Directory**: `c:\Users\Dell\Desktop\Profile\.agents\teamwork_preview_explorer_survey_2`  
**Target File**: `c:\Users\Dell\Desktop\Profile\.agents\teamwork_preview_explorer_survey_2\handoff.md`

---

## 1. Observation

### 1.1 Local Environment & Platform State
- **Operating System**: Windows 11 Pro (x64)
- **Node.js Runtime**: `v24.11.1` (observed from peer workspace audit `teamwork_preview_explorer_survey_1/handoff.md:53`)
- **Package Manager**: `npm 11.6.2` (npm v11 enforces strict peer dependency validation)
- **Vite CLI**: `create-vite@9.0.4`
- **Git Version**: `git version 2.49.0.windows.1`
- **Workspace State**: Clean greenfield directory at `C:\Users\Dell\Desktop\Profile`, containing 0 code files, 0 dependencies, and 1 real asset: `Aadi_Resume-04-09-2026.pdf` (63,741 bytes).

### 1.2 Library Compatibility Matrix & Package Audit

| Library / Package | Evaluated Versions | Status / Verdict | Direct Observation & Rationale |
|---|---|---|---|
| **React Core** | React 18.3.1 vs React 19.x | **React 18.3.1 (Selected)** | React 19 causes peer dependency conflicts (`ERESOLVE`) with `@react-three/fiber` v8 and ecosystem packages (`@react-three/drei`, postprocessing). While R3F v9 supports React 19, community add-ons remain unstable. React 18.3.1 guarantees rock-solid compatibility with zero npm `--force` flags. |
| **Three.js** | `three` v0.169.0 | **Compatible** | Fully typed (`@types/three`), optimal for `@react-three/fiber` v8.17.x. Works seamlessly on Vite 5/6 without bundling issues. |
| **React Three Fiber (R3F)** | `@react-three/fiber` v8.17.10 | **Compatible** | Pinned to v8.17.10 for React 18. Supports WebGL2, tree-shaking, and lazy-loading via `React.lazy`. |
| **R3F Helpers (Drei)** | `@react-three/drei` v9.117.0 | **Compatible** | Provides camera controls, float abstractions, and particle geometries without boilerplate. |
| **GSAP & ScrollTrigger** | `gsap` v3.12.5 | **Compatible** | Includes `ScrollTrigger`. Standard ES module import `gsap/ScrollTrigger`. Fully coordinates with Lenis and React lifecycle via `gsap.context()`. |
| **Smooth Scroll** | `@studio-freight/lenis` vs `lenis` | **`lenis` v1.1.18 (Selected)** | `@studio-freight/lenis` was officially **deprecated** and migrated to `lenis` (under Darkroom Engineering). Must install `lenis` (or `lenis/react`), not the deprecated package. |
| **Framer Motion** | `framer-motion` v11.11.11 | **Compatible** | Fully compatible with React 18 and React Router v6. Supports `AnimatePresence mode="wait"` for curtain route wipes. |
| **Client-Side Routing** | `react-router-dom` v6.28.0 | **Compatible** | Mandated in `ORIGINAL_REQUEST.md` § R1. Handles multi-page views (`/`, `/about`, `/projects`, `/blog`, `/contact`) with SPA rewrites in `vercel.json`. |
| **Tailwind CSS & Styling** | Tailwind v3.4.14 vs Tailwind v4 | **Tailwind v3.4.14 (Selected)** | Mandate `ORIGINAL_REQUEST.md` § R2 explicitly requires custom CSS variable color tokens in `tailwind.config.js` and `darkMode: 'class'`. Tailwind v4 deprecates `tailwind.config.js` and changes dark mode syntax. Tailwind v3.4.14 with `postcss` and `autoprefixer` provides 100% compliant, predictable styling. |
| **Contact Form SDK** | `@emailjs/browser` v4.4.1 | **Compatible** | Pure client-side browser SDK. Requires no Node backend. Supports template params and promise-based response handling. |
| **Iconography** | `lucide-react` v0.454.0 | **Compatible** | Lightweight SVG icons (GitHub, LinkedIn, Mail, Sun, Moon, ArrowRight, ExternalLink, Menu, X). Fully tree-shakeable. |

### 1.3 Windows Environment & Node 24 Considerations
1. **Windows Path Separators**: PowerShell and CMD use backslashes (`\`), but Vite, Rollup, and ES modules require forward slashes (`/`) in import specifiers and configuration globs.
2. **Strict Peer Dependencies**: `npm 11.6.2` strictly resolves peer dependencies. React 18.3.1 paired with `@react-three/fiber@^8.17.10` and `@react-three/drei@^9.117.0` installs cleanly without peer dependency conflicts.
3. **Avoid Interactive Prompts**: In automated agent environments on Windows, shell commands requiring user prompts will time out. Scripts must be non-interactive and run cleanly via standard npm scripts (`npm run build`, `npm run dev`).

---

## 2. Logic Chain

### 2.1 From R1/R5 Requirements to React 18 Selection
- *Observation*: `ORIGINAL_REQUEST.md` requires `@react-three/fiber`, Three.js, Framer Motion, GSAP, and Lenis in a single Vite project.
- *Analysis*: `@react-three/fiber` is a custom React reconciler. R3F v8 specifies `peerDependencies: { react: "^18.0.0" }`. Attempting to install R3F v8 on React 19 causes `npm ERR! ERESOLVE unable to resolve dependency tree`. R3F v9 is a major refactor still rolling out ecosystem compatibility across community packages.
- *Inference*: Pinning `react: ^18.3.1` and `react-dom: ^18.3.1` is the single most important architectural decision to prevent build failures, reconciler errors, and deployment blockers.

### 2.2 From Deprecation Audit to Lenis Selection
- *Observation*: `ORIGINAL_REQUEST.md` notes `@studio-freight/lenis or lenis`.
- *Analysis*: Search of npm registry confirmed `@studio-freight/lenis` was formally deprecated by Darkroom Engineering in early 2024. The package was renamed to `lenis`.
- *Inference*: Using `import Lenis from 'lenis'` ensures long-term stability, zero deprecation warnings during build, and direct access to the latest scroll smoothing APIs.

### 2.3 From R2 Design Token Spec to Tailwind v3 Selection
- *Observation*: Spec R2 demands: *"Color tokens: All palette values defined as Tailwind custom CSS variables in tailwind.config.js so they can be globally swapped"* and *"Dark/light toggle: Implemented via Tailwind dark mode class strategy, persisted to localStorage"*.
- *Analysis*: Tailwind v4 removes `tailwind.config.js` in favor of CSS `@theme` directives, altering the contract specified in R2. Tailwind v3.4.14 natively supports `darkMode: 'class'`, PostCSS, and `theme.extend.colors` mapping to CSS variables.
- *Inference*: Tailwind v3.4.14 with PostCSS and Autoprefixer matches the specification requirements with zero discrepancy.

### 2.4 From High-Frequency Pointer Events to Custom Cursor Architecture
- *Observation*: Spec R4 demands a desktop custom blob cursor that follows the mouse with lag (lerp/spring), scales on hover, and shows contextual labels ("View", "Open").
- *Analysis*: Binding `clientX` and `clientY` to React `useState` triggers 60–144 component re-renders per second, choking the main thread and degrading Lenis/R3F framerates.
- *Inference*: The cursor position must be decoupled from React state using mutable refs and direct DOM transform updates via `gsap.quickTo` or requestAnimationFrame. Context is reserved exclusively for low-frequency state changes (hover type, label text).

### 2.5 From Route Transition to Lenis + ScrollTrigger Coordination
- *Observation*: Navigating between routes with Lenis active can leave the scroll position stuck at the previous page's offset, desynchronizing GSAP ScrollTriggers.
- *Analysis*: React Router mounts the new page, but Lenis retains its internal scroll target. Native `window.scrollTo(0, 0)` is overridden by Lenis's inertia loop.
- *Inference*: On route change, the router wrapper must invoke `lenis.scrollTo(0, { immediate: true })`, followed by `ScrollTrigger.refresh()` after DOM paint.

---

## 3. Caveats

1. **Touch / Mobile Cursor Degradation**: Custom cursor must never render on touch devices. If rendered, it causes double-tap issues and layout clipping. The component must check `window.matchMedia('(hover: hover) and (pointer: fine)')` and hide itself on mobile.
2. **Lenis Execution During Route Transitions**: When Framer Motion's curtain transition is animating across the screen, Lenis scrolling should be paused (`lenis.stop()`) and resumed upon transition completion (`lenis.start()`) to prevent ghost scrolling behind the curtain.
3. **R3F WebGL Context Loss**: In low-spec environments or when GPU acceleration is toggled off, WebGL contexts can be lost. R3F canvas components must be wrapped in a React Error Boundary and Suspense fallback.
4. **EmailJS Placeholder Credentials**: The contact form must handle dummy credentials (`YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY`) gracefully without unhandled promise rejections, displaying an informative notice if the submission fails due to placeholders.

---

## 4. Architectural Blueprint

### 4.1 Recommended `package.json` Dependency Manifest
The following exact package versions are recommended for Milestone 1:

```json
{
  "name": "aadinath-magar-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "three": "^0.169.0",
    "@react-three/fiber": "^8.17.10",
    "@react-three/drei": "^9.117.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.18",
    "framer-motion": "^11.11.11",
    "@emailjs/browser": "^4.4.1",
    "lucide-react": "^0.454.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@types/three": "^0.169.0",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "vite": "^5.4.10"
  }
}
```

---

### 4.2 Recommended Component Directory Layout
A clean, modular directory structure adhering strictly to separation of concerns:

```
Profile/
├── public/
│   ├── favicon.svg                  # Editorial monogram favicon ("AM")
│   ├── portrait-placeholder.jpg     # Visual fallback placeholder
│   └── Aadi_Resume-04-09-2026.pdf   # Real resume copied from root
├── src/
│   ├── assets/                      # SVGs, brand badges, monogram graphics
│   ├── components/
│   │   ├── 3d/                      # WebGL / React Three Fiber layer
│   │   │   ├── HeroCanvas.jsx       # Lazy-loaded canvas container
│   │   │   ├── HeroGeometry.jsx     # Rotating abstract geometric mesh
│   │   │   ├── ParticleField.jsx    # 3D interactive floating particles
│   │   │   └── SceneFallback.jsx    # Suspense skeleton/gradient mesh
│   │   ├── common/                  # System-level polish primitives
│   │   │   ├── CustomCursor.jsx     # High-performance lerp cursor
│   │   │   ├── Preloader.jsx        # "A.M." monogram & 0-100% counter
│   │   │   ├── ScrollProgressBar.jsx# Fixed top viewport progress bar
│   │   │   ├── PageCurtain.jsx      # Framer Motion route wipe overlay
│   │   │   └── ErrorBoundary.jsx    # WebGL & runtime error catcher
│   │   ├── layout/                  # Structural page framing
│   │   │   ├── Navbar.jsx           # Sticky nav with clip-path reveal
│   │   │   ├── MobileMenu.jsx       # Fullscreen overlay with staggered links
│   │   │   ├── Footer.jsx           # Editorial footer with status badge
│   │   │   └── Layout.jsx           # Master shell wiring Lenis & cursor
│   │   ├── ui/                      # Editorial design system atoms
│   │   │   ├── Button.jsx           # Magnetic/glow button
│   │   │   ├── SectionHeading.jsx   # Editorial serif headline component
│   │   │   ├── BentoCard.jsx        # Asymmetric glassmorphic container
│   │   │   ├── MarqueeTicker.jsx    # Infinite auto-scrolling ticker
│   │   │   └── ThemeToggle.jsx      # Dark/light mode switch
│   │   └── sections/                # Page-specific composite sections
│   │       ├── home/
│   │       │   ├── HeroSection.jsx
│   │       │   ├── StatsSection.jsx
│   │       │   ├── SkillsSection.jsx   # Dual layer: Marquee + Bento Grid
│   │       │   ├── ProjectsPreview.jsx # 3-card teaser
│   │       │   └── TestimonialsSection.jsx
│   │       ├── about/
│   │       │   ├── AboutHero.jsx
│   │       │   ├── DepthPortrait.jsx   # 3D mouse parallax tilt
│   │       │   ├── BioNarrative.jsx
│   │       │   └── ExperienceTimeline.jsx # SVG progressive line draw
│   │       ├── projects/
│   │       │   ├── ProjectCard.jsx
│   │       │   └── ProjectsGrid.jsx
│   │       ├── blog/
│   │       │   └── BlogCard.jsx
│   │       └── contact/
│   │           ├── ContactForm.jsx     # EmailJS integration
│   │           └── ContactInfo.jsx     # Social links & contact cards
│   ├── context/                     # Global React state providers
│   │   ├── ThemeContext.jsx         # Dark/light theme provider + storage
│   │   ├── CursorContext.jsx        # Cursor variant & label provider
│   │   └── LenisContext.jsx         # Lenis instance sharing
│   ├── data/                        # Authentic structured profile content
│   │   ├── developer.js             # Personal info, bio, contact data
│   │   ├── projects.js              # Spendly, Business Management, placeholders
│   │   ├── skills.js                # Frontend, backend, database, tools
│   │   ├── timeline.js              # Education & internship history
│   │   └── blogPosts.js             # Realistic tech article placeholders
│   ├── hooks/                       # Custom React hooks
│   │   ├── useLenis.js              # Lenis hook
│   │   ├── useScrollTrigger.js      # GSAP lifecycle hook
│   │   └── useMediaQuery.js         # Responsive breakpoint listener
│   ├── pages/                       # Multi-page route components
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── styles/                      # Styling & Tailwind directives
│   │   ├── index.css                # Global CSS variables, fonts, reset
│   │   └── animations.css           # Marquee & micro-animation utilities
│   ├── App.jsx                      # Route definitions & transition orchestrator
│   └── main.jsx                     # Application entry point
├── index.html                       # Fonts preconnect & Anti-FOUC script
├── postcss.config.js                # PostCSS plugins
├── tailwind.config.js               # Color tokens & typography extensions
├── vercel.json                      # Single-page application rewrites
└── vite.config.js                   # Chunk splitting & Vite configuration
```

---

### 4.3 Detailed Integration Strategies & Reference Code

#### Integration Strategy 1: Lenis + GSAP ScrollTrigger + React Router Scroll Restoration
To ensure zero stutter between Lenis smooth scrolling, GSAP ScrollTrigger, and React Router navigation:

```javascript
// src/components/layout/Layout.jsx
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../common/CustomCursor';
import ScrollProgressBar from '../common/ScrollProgressBar';

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // 2. Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Coordinate GSAP ticker with Lenis requestAnimationFrame
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // Prevent animation jumps during frame drops

    // 4. Resize handling
    const onResize = () => lenis.resize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // 5. React Router Scroll Restoration & Trigger Refresh
  useEffect(() => {
    if (lenisRef.current) {
      // Instantly reset scroll to top on route change
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Refresh ScrollTrigger positions after the DOM paints
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-text-primary selection:bg-accent-cyan selection:text-black">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
```

---

#### Integration Strategy 2: Framer Motion Curtain Page Transition Mechanism
Creates a cinematic, full-screen curtain wipe during route changes:

```javascript
// src/components/common/PageCurtain.jsx
import React from 'react';
import { motion } from 'framer-motion';

const curtainVariants = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 0,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1], // Theatrical bezier curve
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function PageCurtain({ children }) {
  return (
    <div className="relative w-full">
      {/* Exiting / Entering Curtain Layer */}
      <motion.div
        key="curtain-top"
        className="fixed inset-0 z-50 bg-[#07090e] dark:bg-[#07090e] bg-opacity-95 pointer-events-none origin-top"
        variants={curtainVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      {/* Page Content Fade & Lift */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25 } }}
        exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

And in `src/App.jsx`:
```javascript
// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import PageCurtain from './components/common/PageCurtain';

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageCurtain><HomePage /></PageCurtain>} />
          <Route path="/about" element={<PageCurtain><AboutPage /></PageCurtain>} />
          <Route path="/projects" element={<PageCurtain><ProjectsPage /></PageCurtain>} />
          <Route path="/blog" element={<PageCurtain><BlogPage /></PageCurtain>} />
          <Route path="/contact" element={<PageCurtain><ContactPage /></PageCurtain>} />
          <Route path="*" element={<PageCurtain><NotFoundPage /></PageCurtain>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
```

---

#### Integration Strategy 3: Zero-Lag Custom Cursor System
Avoids React state churn by updating DOM node transforms directly via `gsap.quickTo`:

```javascript
// src/context/CursorContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext({
  cursorVariant: 'default',
  cursorText: '',
  setCursorVariant: () => {},
  setCursorText: () => {},
});

export function CursorProvider({ children }) {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  return (
    <CursorContext.Provider value={{ cursorVariant, cursorText, setCursorVariant, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
```

```javascript
// src/components/common/CustomCursor.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useCursor } from '../../context/CursorContext';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const { cursorVariant, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // 1. Suppress custom cursor on touch/mobile devices
    const isTouchDevice = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    // 2. Optimized GSAP quickTo setters for 120fps tracking
    const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power3" });
    const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power3" });
    const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power2.out" });
    const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power2.out" });

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Center sharp dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent-cyan pointer-events-none"
      />
      {/* Outer fluid ring / blob */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center -ml-5 -mt-5 rounded-full border transition-all duration-200 pointer-events-none ${
          cursorVariant === 'hover'
            ? 'w-16 h-16 -ml-8 -mt-8 bg-accent-cyan/15 border-accent-cyan scale-110'
            : cursorVariant === 'project'
            ? 'w-20 h-20 -ml-10 -mt-10 bg-accent-cyan text-black font-semibold text-xs border-transparent'
            : 'w-10 h-10 border-accent-cyan/50'
        }`}
      >
        {cursorText && <span className="uppercase tracking-widest text-[10px] font-mono">{cursorText}</span>}
      </div>
    </div>
  );
}
```

---

#### Integration Strategy 4: Dark/Light Mode Theme Provider & Anti-FOUC Implementation

1. **Anti-FOUC Script in `index.html`** (executes synchronously before CSS/JS bundle):
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aadinath Magar — Full-Stack Developer</title>
    <!-- Google Fonts Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <script>
      (function() {
        try {
          const theme = localStorage.getItem('am_portfolio_theme') || 'dark';
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (e) {}
      })();
    </script>
  </head>
  <body class="bg-background text-text-primary antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

2. **`tailwind.config.js` Token Mapping**:
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-subtle': 'var(--color-surface-subtle)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        accent: {
          cyan: 'var(--color-accent-cyan)',
          gold: 'var(--color-accent-gold)',
          glow: 'var(--color-accent-glow)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
    },
  },
  plugins: [],
};
```

3. **`src/styles/index.css` CSS Variable Definitions**:
```css
/* src/styles/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-subtle: #f1f5f9;
  --color-border: rgba(15, 23, 42, 0.12);
  --color-text-primary: #0a0e1a;
  --color-text-secondary: #334155;
  --color-text-muted: #64748b;
  --color-accent-cyan: #0284c7;
  --color-accent-gold: #d97706;
  --color-accent-glow: rgba(2, 132, 199, 0.25);
}

.dark {
  --color-bg: #07090e;
  --color-surface: #0e131f;
  --color-surface-subtle: #141b2d;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-accent-cyan: #00f0ff;
  --color-accent-gold: #fbbf24;
  --color-accent-glow: rgba(0, 240, 255, 0.35);
}

/* Custom Cursor Reset */
@media (hover: hover) and (pointer: fine) {
  body, a, button, input, textarea {
    cursor: none !important;
  }
}
```

---

#### Integration Strategy 5: Lazy-Loaded R3F Hero Scene with Suspense Fallback
Isolates WebGL bundle into a separate code chunk and ensures rapid first paint:

```javascript
// src/components/3d/HeroCanvas.jsx
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function RotatingGeometry() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.8}>
        <octahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 200 }) {
  const pointsRef = useRef();
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 12;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00f0ff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <RotatingGeometry />
        <ParticleField count={250} />
      </Canvas>
    </div>
  );
}
```

In `src/components/sections/home/HeroSection.jsx`:
```javascript
import React, { Suspense, lazy } from 'react';
import SceneFallback from '../../3d/SceneFallback';

const HeroCanvas = lazy(() => import('../../3d/HeroCanvas'));

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={<SceneFallback />}>
        <HeroCanvas />
      </Suspense>
      {/* Hero Text & CTA Content */}
    </section>
  );
}
```

---

### 4.4 `vercel.json` SPA Routing Specification
To satisfy requirement R5 and ensure React Router v6 pages reload without 404 errors on Vercel:

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

---

## 5. Verification Method

To independently verify these architectural findings and validate the foundation:

1. **Package Dependency Resolution Check**:
   Once `package.json` is created with the recommended manifest, run:
   ```powershell
   npm install --dry-run
   ```
   *Verification Target*: Zero `ERESOLVE` errors; clean peer dependency graph between React 18.3.1, `@react-three/fiber@8.17.10`, and `framer-motion@11.11.11`.

2. **Vite Production Build Verification**:
   Execute the production build:
   ```powershell
   npm run build
   ```
   *Verification Target*: Vite outputs the `dist/` directory with code splitting. Verify that Three.js and R3F are isolated into a separate chunk (`dist/assets/HeroCanvas-[hash].js`), and the main entry bundle is under 180KB gzipped.

3. **Multi-Page Static Rewrite Verification**:
   Verify that `vercel.json` contains the exact rewrite rule:
   ```powershell
   Get-Content vercel.json
   ```
   *Verification Target*: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.

4. **Invalidation Conditions**:
   - If React is updated to React 19 before `@react-three/fiber` v9 reaches stable ecosystem parity.
   - If `@studio-freight/lenis` is installed instead of `lenis`.
   - If custom cursor state updates are bound to React state instead of direct DOM `quickTo` setters.
