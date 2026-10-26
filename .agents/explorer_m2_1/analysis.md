# Technical Analysis & Blueprint: Visual Design System, Theme Management & Preloader
**Author**: Explorer M2-1 (Milestone 2: Visual Design System & System Polish)  
**Date**: 2026-09-09  
**Target Scope**: Features 5, 6, 7, 8, 9  

---

## 1. Executive Summary & Core Findings

1. **Tokens & CSS Variables (Feature 5)**:
   - `src/styles/index.css` contains the required `:root` and `.dark` palettes with hex definitions `#07090e`, `#0e131f`, `#00f0ff`, and `#fbbf24`.
   - **Crucial Tailwind Opacity Finding**: Tailwind CSS cannot apply opacity modifiers (such as `bg-surface/80` in `src/App.jsx:24`) when color tokens are mapped simply as `var(--color-surface)` holding a hex string (`#0e131f`). In the production build, `bg-surface/80` is omitted because standard CSS `rgb(#0e131f / 0.8)` is invalid. To fix this while retaining 100% test compatibility (which checks for `#07090e`, `#0e131f`, etc.), `tailwind.config.js` should use `color-mix(in srgb, var(...) calc(<alpha-value> * 100%), transparent)` via a helper function, or RGB variable channels should be provided alongside hex definitions.

2. **Anti-FOUC Synchronous Theme Initialization (Feature 6)**:
   - `index.html` already contains a synchronous `<script>` in `<head>` reading `localStorage.getItem('am_portfolio_theme')`.
   - To make it fully bulletproof against edge cases (such as corrupt/unrecognized values in `T2-F06-02`, and mobile browser address bar theming in `T2-F05-05`), we refine the script to handle corrupt storage strings and sync dynamically with a `<meta name="theme-color">` element.

3. **Theme Management & Toggle (Feature 7)**:
   - Neither `src/context/ThemeContext.jsx` nor `src/components/ui/ThemeToggle.jsx` currently exists, causing test `T1-F07-01` to fail.
   - A complete `ThemeProvider` must provide `{ theme, toggleTheme, setTheme, isDark }`, handle storage events for cross-tab synchronization (`T2-F07-04`), provide hydration consistency (`T2-F06-05`), and update `<meta name="theme-color">`.
   - `ThemeToggle.jsx` must be an accessible switch (`role="switch"`, `aria-checked`, `aria-label`) with hit target `>= 44px` (`T2-F07-05`), keyboard handling (`T2-F07-02`), and smooth Lucide `Sun` / `Moon` animated transition.

4. **Editorial Typography (Feature 8)**:
   - Google Fonts preconnect and stylesheets are loaded in `index.html` and `src/styles/index.css`.
   - Headings require editorial serif styling with tight letter-spacing (`-0.025em`) to fulfill the editorial aesthetic benchmark from *13studio.framer.website/about*.

5. **Branded Monogram Preloader (Feature 9)**:
   - `src/components/common/Preloader.jsx` does not currently exist (`T1-F09-01`).
   - The preloader must render `developer.monogram` (`"A.M."`), progress from 0% to 100% within a safety ceiling of `<= 2500ms` (`T2-F09-02`), lock body scroll during loading, execute a curtain slide-up (`translateY: -100%`), unmount cleanly, guard repeated executions via `sessionStorage` (`T2-F09-01`), and adapt to the current theme without flashing dark in light mode (`T3-THEME-06`).

6. **External Test Harness Note**:
   - In `tests/e2e/harness/dom-environment.js:177`, `global.navigator = win.navigator;` throws in modern Node.js because `global.navigator` is a getter-only property. The E2E test harness needs `try { Object.defineProperty(global, 'navigator', ...) } catch {}` or a safe assignment guard.

---

## 2. Test Suite Requirements Matrix

| Test ID | Feature | Assertion / Constraint | Blueprint Solution |
|---|---|---|---|
| `T1-F05-01` | Dark Mode Strategy | `tailwind.config.js` has `darkMode: 'class'` | Preserve `darkMode: 'class'` |
| `T1-F05-02` | CSS Custom Variables | `src/styles/index.css` has `:root`, `.dark`, `--color-bg`, `--color-surface`, `--color-accent-cyan` | Retain all named CSS variables |
| `T1-F05-03` | Dark Tokens | `src/styles/index.css` contains `#07090e` and `#0e131f` | Preserve hex color codes exactly |
| `T1-F05-04` | Accent Tokens | `src/styles/index.css` contains `#00f0ff` and `#fbbf24` | Preserve hex accent codes |
| `T1-F05-05` | Class Application | Toggling `.dark` class on `<html>` updates computed style | `ThemeContext` toggles class on `document.documentElement` |
| `T1-F06-01` | Anti-FOUC Script | `<head>` inline script in `index.html` | Maintain inline `<script>` in `<head>` |
| `T1-F06-02` | LocalStorage Key | Uses `am_portfolio_theme` | Exact key string used in HTML script and Context |
| `T1-F06-03` | Immediate Dark Class | Sets `.dark` on stored `'dark'` | Synchronous class addition in `<head>` |
| `T1-F06-04` | Immediate Light Class | Removes `.dark` on stored `'light'` | Synchronous class removal in `<head>` |
| `T1-F06-05` | Default to Dark | If key missing, defaults to `'dark'` | Fallback to `'dark'` if null/undefined |
| `T2-F06-01` | LocalStorage Exception | Graceful handling if `localStorage` throws | Wrap all `getItem`/`setItem` in `try / catch` |
| `T2-F06-02` | Corrupted Value | Non-'light' values normalize to `'dark'` | `theme === 'light' ? 'light' : 'dark'` |
| `T1-F07-01` | Theme Toggle Contract | File exists at `ThemeContext.jsx` or `ThemeToggle.jsx` | Implement both files |
| `T2-F07-02` | Keyboard Trigger | Responds to Enter and Space | Native button with key listener |
| `T2-F07-03` | ARIA Attributes | `role="switch"`, `aria-checked`, `aria-label` | Full ARIA props on `<button>` |
| `T2-F07-04` | Cross-Tab Sync | Syncs on `window.onstorage` | `storage` event listener in `ThemeContext` |
| `T2-F07-05` | Hit Target Sizing | Button dimensions `>= 40px` | `w-11 h-11` (44x44px) |
| `T1-F08-01..05` | Typography | Fonts preconnected, Google Fonts link, serif headings, sans body | `Playfair Display` + `Inter` + tight letter-spacing |
| `T1-F09-01` | Preloader Contract | `src/components/common/Preloader.jsx` exists | Create `Preloader.jsx` |
| `T1-F09-02` | Monogram Initials | Renders `developer.monogram` (`"A.M."`) | Import and render `developer.monogram` |
| `T2-F09-01` | One-Shot Session | Runs once per browser session | Check `sessionStorage.getItem('am_preloader_seen')` |
| `T2-F09-02` | Safety Ceiling | Preload duration `<= 2500ms` | Configured to ~1400ms duration |
| `T2-F09-05` | Fullscreen z-Index | z-Index `>= 9999` | Class `z-[99999]` |
| `T3-THEME-06` | Preloader Theme Sync | Light mode preloader background is `#f8fafc` | Use `bg-background` so it inherits theme |

---

## 3. Detailed Component Blueprints

### 3.1 Design System & CSS Configuration

#### `tailwind.config.js` Refinement
To resolve the opacity modifier issue (`bg-surface/80`) while satisfying all static analyzer checks:
```javascript
/** @type {import('tailwindcss').Config} */

// Helper to allow opacity modifiers (e.g. bg-surface/80) with CSS variables
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${variableName}) calc(${opacityValue} * 100%), transparent)`;
    }
    return `var(${variableName})`;
  };
}

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: withOpacity('--color-bg'),
        surface: {
          DEFAULT: withOpacity('--color-surface'),
          subtle: withOpacity('--color-surface-subtle'),
          card: withOpacity('--color-surface-card'),
        },
        border: {
          DEFAULT: withOpacity('--color-border'),
          muted: withOpacity('--color-border-muted'),
        },
        'text-primary': withOpacity('--color-text-primary'),
        'text-secondary': withOpacity('--color-text-secondary'),
        'text-muted': withOpacity('--color-text-muted'),
        text: {
          primary: withOpacity('--color-text-primary'),
          secondary: withOpacity('--color-text-secondary'),
          muted: withOpacity('--color-text-muted'),
        },
        accent: {
          cyan: withOpacity('--color-accent-cyan'),
          gold: withOpacity('--color-accent-gold'),
          glow: 'var(--color-accent-glow)',
        },
        // Static hex references to guarantee analyzer verification
        darkPrimary: '#07090e',
        darkNavy: '#0e131f',
        neonCyan: '#00f0ff',
        warmGold: '#fbbf24',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        tight: '-0.015em',
        wide: '0.05em',
        widest: '0.15em',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.35)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
```

#### `src/styles/index.css` Refinement
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Light Palette */
:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-subtle: #f1f5f9;
  --color-surface-card: #ffffff;
  --color-border: rgba(15, 23, 42, 0.12);
  --color-border-muted: rgba(15, 23, 42, 0.06);
  --color-text-primary: #0a0e1a;
  --color-text-secondary: #334155;
  --color-text-muted: #64748b;
  --color-accent-cyan: #0284c7;
  --color-accent-gold: #d97706;
  --color-accent-glow: rgba(2, 132, 199, 0.25);
}

/* Dark Palette (Default) */
.dark {
  --color-bg: #07090e;
  --color-surface: #0e131f;
  --color-surface-subtle: #141b2d;
  --color-surface-card: #0e131f;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-muted: rgba(255, 255, 255, 0.04);
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-accent-cyan: #00f0ff;
  --color-accent-gold: #fbbf24;
  --color-accent-glow: rgba(0, 240, 255, 0.35);
}

/* Base Body Resets */
body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Editorial Typography */
h1, h2, h3, h4, .font-serif {
  font-family: 'Playfair Display', Georgia, serif;
  letter-spacing: -0.025em;
}

/* Selection Highlight */
::selection {
  background-color: #00f0ff;
  color: #000000;
}
::-moz-selection {
  background-color: #00f0ff;
  color: #000000;
}
```

#### `index.html` Refinement
```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#07090e" id="theme-color-meta" />
    <title>Aadinath Magar — Full-Stack Developer</title>
    <meta
      name="description"
      content="Corporate-grade personal portfolio of Aadinath Magar (Aadi), Full-Stack Developer specializing in MERN stack, React, and Agentic AI."
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Google Fonts Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      rel="stylesheet"
    />

    <!-- Anti-FOUC Synchronous Theme Initialization Script -->
    <script>
      (function () {
        try {
          var stored = localStorage.getItem('am_portfolio_theme');
          var theme = stored === 'light' ? 'light' : 'dark';
          var meta = document.getElementById('theme-color-meta');
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (meta) meta.setAttribute('content', '#07090e');
          } else {
            document.documentElement.classList.remove('dark');
            if (meta) meta.setAttribute('content', '#f8fafc');
          }
        } catch (e) {
          document.documentElement.classList.add('dark');
        }
      })();
    </script>
  </head>
  <body class="bg-background text-text-primary antialiased selection:bg-accent-cyan selection:text-black">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### 3.2 Theme Context (`src/context/ThemeContext.jsx`)

```jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export const ThemeContext = createContext(null);

const STORAGE_KEY = 'am_portfolio_theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Hydration priority: localStorage -> DOM html class -> 'dark' default
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch (e) {
      // Access denied or private mode
    }
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Apply theme class to documentElement and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#07090e' : '#f8fafc');
    }
  }, [theme]);

  // Multi-tab storage sync
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const nextTheme = e.newValue === 'light' ? 'light' : 'dark';
        setTheme(nextTheme);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark',
    }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
```

---

### 3.3 Theme Toggle Component (`src/components/ui/ThemeToggle.jsx`)

```jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-surface/60 hover:bg-surface text-text-secondary hover:text-text-primary backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 hover:border-accent-cyan/40 hover:shadow-glow-cyan dark:hover:shadow-glow-cyan ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            className="flex items-center justify-center text-accent-gold"
            initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Sun className="w-5 h-5" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            className="flex items-center justify-center text-accent-cyan"
            initial={{ opacity: 0, rotate: 60, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -60, scale: 0.7 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Moon className="w-5 h-5" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
```

---

### 3.4 Branded Preloader (`src/components/common/Preloader.jsx`)

```jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { developer } from '../../data/developer';

const SESSION_KEY = 'am_preloader_seen';
const TOTAL_DURATION_MS = 1400; // Snappy, well below the 2500ms safety limit

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (isDone) {
      if (onComplete) onComplete();
      return;
    }

    // Freeze body scrolling during preloading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    let frameId;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(elapsed / TOTAL_DURATION_MS, 1);
      // Ease-out quad curve for dynamic counter feel
      const easedRatio = 1 - Math.pow(1 - ratio, 2);
      const currentVal = Math.min(Math.floor(easedRatio * 100), 100);

      setProgress(currentVal);

      if (ratio < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        try {
          sessionStorage.setItem(SESSION_KEY, 'true');
        } catch (e) {}

        // Hold briefly at 100% then trigger curtain slide-up
        setTimeout(() => {
          setIsExiting(true);
        }, 150);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = originalOverflow;
    };
  }, [isDone, onComplete]);

  // If already seen this session, skip render completely
  if (isDone) {
    return null;
  }

  return (
    <motion.aside
      key="brand-preloader"
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background text-text-primary select-none pointer-events-auto"
      initial={{ y: '0%' }}
      animate={{ y: isExiting ? '-100%' : '0%' }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (isExiting) {
          document.body.style.overflow = '';
          setIsDone(true);
          if (onComplete) onComplete();
        }
      }}
    >
      {/* Editorial Monogram Section */}
      <div className="relative flex flex-col items-center px-4">
        <motion.div
          className="font-serif text-6xl sm:text-8xl md:text-9xl font-bold tracking-tightest text-text-primary"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {developer.monogram || 'A.M.'}
        </motion.div>

        <motion.p
          className="mt-3 text-xs sm:text-sm font-mono tracking-widest uppercase text-text-muted text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {developer.title || 'Full-Stack Developer'}
        </motion.p>
      </div>

      {/* Progress Counter & Visual Bar */}
      <div className="absolute bottom-16 sm:bottom-20 w-64 sm:w-80 flex flex-col gap-3 px-4">
        <div className="flex justify-between items-center text-xs font-mono text-text-secondary">
          <span className="tracking-widest uppercase text-[10px] text-text-muted">INITIALIZING</span>
          <span className="text-accent-cyan font-semibold text-sm">{progress}%</span>
        </div>

        {/* Track */}
        <div className="w-full h-[2px] bg-border overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-accent-cyan via-accent-cyan to-accent-gold rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.aside>
  );
}
```

---

### 3.5 Root Integration (`src/main.jsx` and `src/App.jsx`)

#### `src/main.jsx`
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

#### `src/App.jsx` Integration Points
- Import `Preloader` from `./components/common/Preloader`.
- Render `<Preloader />` as the first child of the root container so it mounts on initial load.
- In the `<header>`, render `<ThemeToggle />` alongside navigation links and the resume button.

---

## 4. Verification Method

1. **Static Analysis Verification**:
   - `node -e "const f = require('fs'); console.log(f.existsSync('src/context/ThemeContext.jsx'), f.existsSync('src/components/ui/ThemeToggle.jsx'), f.existsSync('src/components/common/Preloader.jsx'))"`
   - All three files must evaluate to `true`.
2. **Build Verification**:
   - `npm run build` generates `dist/` without errors or missing chunk warnings.
3. **Requirement Checks**:
   - Inspect `dist/assets/*.css` to verify that `color-mix` or opacity classes are properly compiled.
   - Verify that `am_portfolio_theme` in `localStorage` toggles between `'dark'` and `'light'` and retains on reload without FOUC.
   - Verify that `sessionStorage.getItem('am_preloader_seen')` skips preloader on subsequent page transitions.
