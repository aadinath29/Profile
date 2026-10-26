# Handoff Report: Visual Redesign System Survey (Styling, Tokens, Typography, Polish)

**Agent**: Explorer (`explorer_redesign_survey_1`)  
**Mission**: Codebase survey for Requirements R1, R2, R8, R11 (Warm Editorial Visual Redesign)  
**Date**: 2026-09-10T16:24:00Z  
**Target Recipient**: Orchestrator / Worker agents implementing Phase 1 Redesign  

---

## 1. Observation

### 1.1 Direct File Observations

#### A. `src/styles/index.css`
- **Line 1**: Imports legacy fonts:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  ```
- **Lines 8–21 (`:root` - Light Palette)**:
  ```css
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
  ```
- **Lines 24–37 (`.dark` - Dark Palette)**:
  ```css
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
  ```
- **Lines 40–47 (`body`)**:
  `font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`
- **Lines 50–53 (`h1, h2, h3, h4, .font-serif`)**:
  `font-family: 'Playfair Display', Georgia, serif; letter-spacing: -0.025em;`
- **Lines 56–63 (`::selection`, `::-moz-selection`)**:
  Hardcoded `background-color: #00f0ff; color: #000000;`.

#### B. `tailwind.config.js`
- **Lines 40–50**:
  ```javascript
  accent: {
    cyan: withOpacity('--color-accent-cyan'),
    gold: withOpacity('--color-accent-gold'),
    glow: 'var(--color-accent-glow)',
  },
  darkPrimary: '#07090e',
  darkNavy: '#0e131f',
  neonCyan: '#00f0ff',
  warmGold: '#fbbf24',
  ```
- **Lines 51–55**:
  ```javascript
  fontFamily: {
    serif: ['"Playfair Display"', 'Georgia', 'serif'],
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace'],
  },
  ```
- **Lines 63–67**:
  ```javascript
  boxShadow: {
    'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
    'glow-gold': '0 0 20px rgba(251, 191, 36, 0.35)',
    'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
  ```

#### C. `index.html`
- **Line 2**: `<html lang="en" class="dark">` defaults to dark theme on raw HTML.
- **Line 6**: `<meta name="theme-color" content="#07090e" id="theme-color-meta" />`.
- **Lines 17–20**: Google font preloading for `Inter` and `Playfair Display`.
- **Lines 26–37**: Synchronous anti-FOUC script sets dark mode to `#07090e` and light mode to `#f8fafc`.
- **Line 42**: `<body class="bg-background text-text-primary antialiased selection:bg-accent-cyan selection:text-black">`.

#### D. `src/context/ThemeContext.jsx`
- **Line 21**: Fallback theme initializes to `'dark'`.
- **Line 39**: Synchronizes meta tag: `meta.setAttribute('content', theme === 'dark' ? '#07090e' : '#f8fafc');`.

#### E. `src/components/common/Preloader.jsx`
- **Line 75**: `<motion.aside ... className="... bg-background text-text-primary ...">` inherits dark mode if set, rather than light cream.
- **Line 90**: Monogram styled with `font-serif text-6xl sm:text-8xl md:text-9xl font-bold tracking-tightest text-text-primary`.
- **Line 112**: Progress percentage styled with `text-accent-cyan font-semibold`.
- **Line 118**: Loading bar styled with `bg-gradient-to-r from-accent-cyan via-accent-cyan to-accent-gold`.

#### F. `src/components/common/PageCurtain.jsx`
- **Lines 15 & 24**: Both entrance and exit curtains use `bg-background` (which renders dark `#07090e` or `#141210`), instead of warm cream `#F5F0E8`.

#### G. `src/components/common/CustomCursor.jsx`
- **Lines 169–171**: Hover variant uses `backgroundColor: 'rgba(0, 240, 255, 0.12)', borderColor: '#00f0ff', boxShadow: '0 0 16px rgba(0, 240, 255, 0.35)'`.
- **Lines 183–185**: Project variant uses `backgroundColor: 'rgba(0, 240, 255, 0.95)', borderColor: '#00f0ff', boxShadow: '0 0 24px rgba(0, 240, 255, 0.5)'`.
- **Lines 208 & 215**: Default variant uses `#00f0ff` and `rgba(0, 240, 255, 0.45)`.
- **Lines 234 & 241**: JSX elements use `bg-accent-cyan` and `border-accent-cyan/50`.

#### H. `src/components/common/ScrollProgressBar.jsx`
- **Line 57**: Progress element has:
  `className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9998] pointer-events-none bg-gradient-to-r from-accent-cyan via-accent-cyan to-accent-gold shadow-[0_0_10px_rgba(0,240,255,0.7)] will-change-transform"`

---

### 1.2 Codebase-Wide Legacy Token Census
A complete automated AST/Regex scan (`survey_scanner.cjs`) across all 53 source files mapped every single usage of legacy colors:
- **`cyan` / `accent-cyan`**: 129 occurrences
- **`gold` / `accent-gold`**: 36 occurrences
- **`glow`**: 22 occurrences
- **`#00f0ff`**: 19 occurrences
- **`#fbbf24`**: 7 occurrences
- **`#07090e`**: 6 occurrences
- **`#0e131f`**: 3 occurrences
- **`neon`**: 3 occurrences
- **`blue`**: 1 occurrence

#### Distribution of occurrences by file:
1. `src/components/3d/GlobeSphere.jsx`: 10 occurrences (Lines 41, 42, 61, 68, 73, 79, 85, 90, 94, 95)
2. `src/components/3d/HeroCanvas.jsx`: 5 occurrences (Lines 36, 37, 38, 39)
3. `src/components/3d/HeroGeometry.jsx`: 6 occurrences (Lines 44, 52, 56, 57, 64, 68)
4. `src/components/3d/ParticleField.jsx`: 1 occurrence (Line 35)
5. `src/components/3d/SceneFallback.jsx`: 6 occurrences (Lines 16, 19, 22, 23, 31)
6. `src/components/common/CustomCursor.jsx`: 5 occurrences (Lines 170, 184, 208, 234, 241)
7. `src/components/common/ErrorBoundary.jsx`: 2 occurrences (Lines 33, 58)
8. `src/components/common/Preloader.jsx`: 3 occurrences (Lines 112, 118)
9. `src/components/common/ScrollProgressBar.jsx`: 2 occurrences (Line 57)
10. `src/components/layout/Footer.jsx`: 10 occurrences (Lines 24, 25, 33, 53, 72, 91, 100, 107, 123)
11. `src/components/layout/Layout.jsx`: 2 occurrences (Lines 71, 76)
12. `src/components/layout/MobileMenu.jsx`: 10 occurrences (Lines 110, 123, 144, 146, 147, 153, 180, 189, 196, 206)
13. `src/components/layout/Navbar.jsx`: 12 occurrences (Lines 51, 53, 72, 74, 83, 91, 99, 101, 118, 131)
14. `src/components/sections/about/AboutHero.jsx`: 3 occurrences (Lines 39, 41, 62)
15. `src/components/sections/about/BioNarrative.jsx`: 6 occurrences (Lines 21, 31, 44, 48, 49, 54)
16. `src/components/sections/about/DepthPortrait.jsx`: 1 occurrence (Line 87)
17. `src/components/sections/about/ExperienceTimeline.jsx`: 10 occurrences (Lines 93, 97, 121, 127, 133, 135, 148, 164)
18. `src/components/sections/blog/BlogCard.jsx`: 6 occurrences (Lines 18, 24, 27, 34, 48, 59)
19. `src/components/sections/contact/ContactForm.jsx`: 6 occurrences (Lines 71, 110, 127, 150, 157)
20. `src/components/sections/contact/ContactInfo.jsx`: 8 occurrences (Lines 22, 24, 29, 37, 39, 44, 74, 87)
21. `src/components/sections/home/GlobeSection.jsx`: 6 occurrences (Lines 16, 17, 23, 33, 37, 52)
22. `src/components/sections/home/HeroSection.jsx`: 8 occurrences (Lines 64, 66, 93, 123, 134, 137, 152)
23. `src/components/sections/home/ProjectsPreview.jsx`: 12 occurrences (Lines 33, 60, 67, 71, 76, 81, 92, 93, 115, 140)
24. `src/components/sections/home/SkillsSection.jsx`: 2 occurrences (Lines 31, 32)
25. `src/components/sections/home/StatsSection.jsx`: 5 occurrences (Lines 63, 65, 66, 68, 70)
26. `src/components/sections/home/TestimonialsSection.jsx`: 4 occurrences (Lines 11, 15, 30, 40)
27. `src/components/sections/projects/ProjectCard.jsx`: 13 occurrences (Lines 19, 20, 23, 24, 30, 33, 39, 44, 60, 69, 70, 110, 127)
28. `src/components/sections/projects/ProjectsGrid.jsx`: 2 occurrences (Line 30)
29. `src/components/ui/BentoCard.jsx`: 5 occurrences (Lines 20, 24, 69, 70)
30. `src/components/ui/SectionHeading.jsx`: 2 occurrences (Lines 20, 24)
31. `src/components/ui/ThemeToggle.jsx`: 4 occurrences (Lines 24, 30, 41)
32. `src/context/ThemeContext.jsx`: 1 occurrence (Line 39)
33. `src/data/projects.js`: 4 occurrences (Lines 17, 18, 41)
34. `src/pages/BlogPage.jsx`: 6 occurrences (Lines 32, 33, 56, 73, 93)
35. `src/pages/ContactPage.jsx`: 2 occurrences (Lines 11, 12)
36. `src/pages/NotFoundPage.jsx`: 2 occurrences (Lines 7, 14)
37. `src/pages/ProjectsPage.jsx`: 3 occurrences (Lines 14, 15, 18)
38. `src/styles/index.css`: 15 occurrences (Lines 18, 19, 20, 25, 26, 28, 34, 35, 36, 57, 61)
39. `index.html`: 3 occurrences (Lines 6, 31, 42)
40. `tailwind.config.js`: 15 occurrences (Lines 41, 42, 43, 46, 47, 48, 49, 64, 65, 66)

---

## 2. Logic Chain

1. **Premise 1 (Color Architecture - R1)**: The brief mandates replacing dark navy + neon cyan with:
   - Base light background: `#F5F0E8` (Warm cream)
   - Card/surface: `#EDE8DF` (Warmer cream)
   - Headings text: `#1C1A18` (Deep charcoal)
   - Body text: `#3D3A36` (Warm charcoal)
   - Muted text: `#7A756D` (Refined earth tone)
   - Accent: `#C4704A` (Terracotta) as the single accent color used sparingly
   - Dark mode background: `#141210` (Deep warm brown)
   - Dark mode surface: `#1E1B18`
   - Dark mode text: `#F0EBE3` (Warm off-white)
   - Dark mode text secondary: `#D4CDC3`
   - Removal of all glowing borders, neon cyan, electric blue, gold gradients.
   *Reasoning*: Updating `:root` and `.dark` CSS variables in `src/styles/index.css` alongside `tailwind.config.js` will instantly cascade the base and surface tones through `bg-background`, `bg-surface`, and `text-text-primary`. Aliasing `accent.cyan` and `accent.gold` to `accent` (#C4704A) in `tailwind.config.js` provides safety against broken styles while individual components are refactored.

2. **Premise 2 (Typography Architecture - R2)**:
   - Headings: `DM Serif Display`
   - Body: `DM Sans`
   - Accent/code/labels: `JetBrains Mono`
   *Reasoning*: `index.html` must replace the Google Fonts link with the three families:
   `DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000`,
   `DM+Serif+Display:ital@0;1`,
   `JetBrains+Mono:ital,wght@0,100..800;1,100..800`.
   `tailwind.config.js` must map:
   `serif: ['"DM Serif Display"', 'Georgia', 'serif']`,
   `sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']`,
   `mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace']`.
   `src/styles/index.css` must update `body` to `'DM Sans'` and `h1, h2, h3, h4, .font-serif` to `'DM Serif Display'`.

3. **Premise 3 (First Impression & Transition Polish - R8, R11)**:
   - `Preloader.jsx`: The preloader must render on cream background `#F5F0E8` with charcoal text `#1C1A18`, displaying the "A.M." monogram in `DM Serif Display`. The neon counter (`text-accent-cyan`) and the cyan-to-gold gradient progress bar must be replaced with terracotta `#C4704A` and subtle charcoal `#1C1A18`/10.
   - `PageCurtain.jsx`: Currently wipes with `bg-background`. R8 & R11 specify changing curtain color to `#F5F0E8` so page transitions evoke warm editorial parchment paper rather than a dark void.
   - `ScrollProgressBar.jsx`: The 3px cyan-to-gold gradient bar with `shadow-[0_0_10px_rgba(0,240,255,0.7)]` violates R1 and R8. Replacing it with a clean 2px bar in `#C4704A` without glow produces an understated editorial scroll indicator.
   - `CustomCursor.jsx`: The cyan rings and box-shadow glow are replaced with terracotta `#C4704A`, border `#C4704A`/50, and zero shadow blur.

4. **Premise 4 (Animation Signature: Quiet Physics - R8)**:
   - R8 requires eliminating generic `fade-up` with uniform stagger.
   - Elements arrive with weight: `y: 16px → 0, opacity: 0 → 1, ease: "power3.out"`, duration `0.7s`, with a slight spring scale settle `0.98 → 1`.
   - Hover states use spring physics: `scale: 1.02, spring(stiffness: 300, damping: 20)`.
   - Layout transitions eliminate arbitrary `transition-all duration-300`.

---

## 3. Detailed Proposed Replacements

### 3.1 `src/styles/index.css`
```css
/* ==========================================================================
   Editorial Typography Import (DM Serif Display, DM Sans, JetBrains Mono)
   ========================================================================== */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ==========================================================================
   Warm Editorial Color System (R1)
   ========================================================================== */

/* Light Palette (Primary Default) */
:root {
  --color-bg: #F5F0E8;             /* Warm cream base */
  --color-surface: #EDE8DF;        /* Warmer cream surface */
  --color-surface-subtle: #E3DDD2; /* Subtle contrast surface */
  --color-surface-card: #EDE8DF;   /* Card surface */
  --color-border: rgba(28, 26, 24, 0.12);
  --color-border-muted: rgba(28, 26, 24, 0.06);
  --color-text-primary: #1C1A18;   /* Deep charcoal */
  --color-text-secondary: #3D3A36; /* Warm charcoal body */
  --color-text-muted: #7A756D;     /* Subtle muted charcoal */
  --color-accent: #C4704A;         /* Terracotta accent */
  --color-accent-muted: rgba(196, 112, 74, 0.12);
  /* Safety aliases during component migration */
  --color-accent-cyan: #C4704A;
  --color-accent-gold: #C4704A;
  --color-accent-glow: transparent;
}

/* Dark Palette (Deep Warm Brown) */
.dark {
  --color-bg: #141210;             /* Deep warm brown */
  --color-surface: #1E1B18;        /* Warm dark surface */
  --color-surface-subtle: #272320; /* Subtle warm dark surface */
  --color-surface-card: #1E1B18;   /* Card surface */
  --color-border: rgba(240, 235, 227, 0.12);
  --color-border-muted: rgba(240, 235, 227, 0.06);
  --color-text-primary: #F0EBE3;   /* Warm off-white */
  --color-text-secondary: #D4CDC3; /* Soft warm gray */
  --color-text-muted: #9E968B;     /* Muted warm gray */
  --color-accent: #C4704A;         /* Same terracotta accent */
  --color-accent-muted: rgba(196, 112, 74, 0.2);
  /* Safety aliases */
  --color-accent-cyan: #C4704A;
  --color-accent-gold: #C4704A;
  --color-accent-glow: transparent;
}

/* Base Body Resets */
body {
  background-color: var(--color-bg);
  color: var(--color-text-secondary);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Editorial Typography */
h1, h2, h3, h4, .font-serif {
  font-family: 'DM Serif Display', Georgia, serif;
  letter-spacing: -0.025em;
  color: var(--color-text-primary);
}

/* Custom Selection Highlight */
::selection {
  background-color: #C4704A;
  color: #FFFFFF;
}
::-moz-selection {
  background-color: #C4704A;
  color: #FFFFFF;
}

/* Lenis and Custom Cursor rules remain intact */
```

---

### 3.2 `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */

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
          DEFAULT: withOpacity('--color-accent'),
          terracotta: '#C4704A',
          muted: withOpacity('--color-accent-muted'),
          // Safety aliases mapping legacy tokens to terracotta
          cyan: withOpacity('--color-accent'),
          gold: withOpacity('--color-accent'),
          glow: 'transparent',
        },
        // Static named tokens for the new system
        warmCream: '#F5F0E8',
        warmSurface: '#EDE8DF',
        charcoal: {
          DEFAULT: '#1C1A18',
          body: '#3D3A36',
          muted: '#7A756D',
        },
        terracotta: {
          DEFAULT: '#C4704A',
          hover: '#B35E38',
          light: '#D9825C',
        },
        warmBrown: {
          DEFAULT: '#141210',
          surface: '#1E1B18',
          subtle: '#272320',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        tight: '-0.015em',
        normal: '0',
        wide: '0.02em',
        widest: '0.08em',
      },
      boxShadow: {
        'warm-subtle': '0 2px 8px -2px rgba(28, 26, 24, 0.05)',
        'warm-card': '0 4px 20px -4px rgba(28, 26, 24, 0.06)',
        'warm-hover': '0 8px 30px -4px rgba(28, 26, 24, 0.1)',
        'terracotta-sm': '0 2px 10px rgba(196, 112, 74, 0.2)',
        // Neutralize old glow classes
        'glow-cyan': 'none',
        'glow-gold': 'none',
        'glow-card': '0 4px 20px -4px rgba(28, 26, 24, 0.06)',
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

---

### 3.3 `index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#F5F0E8" id="theme-color-meta" />
    <title>Aadinath Magar — Full-Stack Developer</title>
    <meta
      name="description"
      content="Portfolio of Aadinath Magar (Aadi), Full-Stack Developer specializing in MERN stack, clean architecture, and details that matter."
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Google Fonts Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
      rel="stylesheet"
    />

    <!-- Anti-FOUC Synchronous Theme Initialization Script -->
    <script>
      (function () {
        try {
          var stored = localStorage.getItem('am_portfolio_theme');
          var theme = stored === 'dark' ? 'dark' : 'light';
          var meta = document.getElementById('theme-color-meta');
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (meta) meta.setAttribute('content', '#141210');
          } else {
            document.documentElement.classList.remove('dark');
            if (meta) meta.setAttribute('content', '#F5F0E8');
          }
        } catch (e) {
          document.documentElement.classList.remove('dark');
        }
      })();
    </script>
  </head>
  <body class="bg-background text-text-primary antialiased selection:bg-[#C4704A] selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### 3.4 `src/context/ThemeContext.jsx`
- Replace default theme fallback `'dark'` with `'light'`:
  ```javascript
  export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          return stored;
        }
      } catch (e) {}
      if (typeof document !== 'undefined') {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      }
      return 'light';
    });
  ```
- Replace meta color updating on line 39:
  ```javascript
  const meta = document.querySelector('meta[name="theme-color"]') || document.getElementById('theme-color-meta');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#141210' : '#F5F0E8');
  }
  ```

---

### 3.5 `src/components/common/Preloader.jsx`
- Replace container styling on Line 75:
  ```jsx
  className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F5F0E8] text-[#1C1A18] select-none pointer-events-auto"
  ```
- Replace monogram typography on Line 90:
  ```jsx
  <motion.div
    className="font-serif text-6xl sm:text-8xl md:text-9xl font-normal tracking-tight text-[#1C1A18]"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
  >
    {developer.monogram || 'A.M.'}
  </motion.div>
  ```
- Replace title subtitle on Line 99:
  ```jsx
  <motion.p
    className="mt-3 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#7A756D] text-center"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15, duration: 0.4 }}
  >
    {developer.title || 'Full-Stack Developer'}
  </motion.p>
  ```
- Replace progress indicator on Lines 109–122:
  ```jsx
  <div className="absolute bottom-16 sm:bottom-20 w-64 sm:w-80 flex flex-col gap-3 px-4">
    <div className="flex justify-between items-center text-xs font-mono text-[#3D3A36]">
      <span className="tracking-widest uppercase text-[10px] text-[#7A756D]">INITIALIZING</span>
      <span className="text-[#C4704A] font-semibold text-sm">{progress}%</span>
    </div>

    {/* Refined Minimalist Track */}
    <div className="w-full h-[2px] bg-[#1C1A18]/10 overflow-hidden rounded-full">
      <div
        className="h-full bg-[#C4704A] rounded-full transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
  ```

---

### 3.6 `src/components/common/PageCurtain.jsx`
- Replace `bg-background` with `bg-[#F5F0E8]` on Lines 15 and 24:
  ```jsx
  {/* Entrance Curtain (slides up revealing page) */}
  <motion.div
    className="fixed inset-0 z-50 bg-[#F5F0E8] pointer-events-none origin-top"
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    exit={{ scaleY: 0 }}
    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    aria-hidden="true"
  />
  {/* Exit Curtain (wipes down covering page on exit) */}
  <motion.div
    className="fixed inset-0 z-50 bg-[#F5F0E8] pointer-events-none origin-bottom"
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 0 }}
    exit={{ scaleY: 1 }}
    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
    aria-hidden="true"
  />
  ```

---

### 3.7 `src/components/common/CustomCursor.jsx`
- In GSAP variant transitions (Lines 169–220):
  - **Hover variant**:
    ```javascript
    gsap.to(ringRef.current, {
      scale: 1.6,
      backgroundColor: 'rgba(196, 112, 74, 0.12)',
      borderColor: '#C4704A',
      boxShadow: 'none',
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    ```
  - **Project variant**:
    ```javascript
    gsap.to(ringRef.current, {
      scale: 2.8,
      backgroundColor: 'rgba(196, 112, 74, 0.95)',
      borderColor: '#C4704A',
      boxShadow: 'none',
      duration: 0.3,
      ease: 'back.out(1.5)',
      overwrite: 'auto',
    });
    ```
  - **Default variant**:
    ```javascript
    gsap.to(dotRef.current, {
      scale: 1,
      opacity: 1,
      backgroundColor: '#C4704A',
      duration: 0.2,
      overwrite: 'auto',
    });
    gsap.to(ringRef.current, {
      scale: 1,
      backgroundColor: 'transparent',
      borderColor: 'rgba(196, 112, 74, 0.45)',
      boxShadow: 'none',
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    ```
- In JSX elements (Lines 232–251):
  ```jsx
  <div
    ref={dotRef}
    className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C4704A] pointer-events-none z-[9999] will-change-transform"
    aria-hidden="true"
  />
  <div
    ref={ringRef}
    className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#C4704A]/50 pointer-events-none z-[9998] flex items-center justify-center will-change-transform"
    aria-hidden="true"
  >
    <span
      ref={textRef}
      className="text-[10px] font-mono font-bold tracking-widest text-white uppercase select-none opacity-0 pointer-events-none"
    >
      {cursorText}
    </span>
  </div>
  ```

---

### 3.8 `src/components/common/ScrollProgressBar.jsx`
- Replace progress bar markup on Line 57:
  ```jsx
  <div
    ref={barRef}
    data-testid="scroll-progress"
    className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9998] pointer-events-none bg-[#C4704A] will-change-transform"
    style={{ transform: 'scaleX(0)' }}
    aria-hidden="true"
  />
  ```

---

### 3.9 Quiet Physics Motion Presets (R8 Specification)
Create or apply these animation presets:
```javascript
// Default Entrance: y: 16px -> 0, opacity: 0 -> 1, power3.out, slight spring scale 0.98 -> 1
export const quietEntrance = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1], // Power3.out
      delay: customDelay,
      scale: {
        type: 'spring',
        stiffness: 280,
        damping: 22,
      },
    },
  }),
};

// Button Spring Hover
export const buttonSpringHover = {
  whileHover: {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  whileTap: {
    scale: 0.98,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
};
```

---

## 4. Caveats

1. **GlobeSection.jsx & 3D GlobeSphere**: Requirement R9 specifies that `GlobeSection` must be removed from `HomePage.jsx` render, but the file is kept in the codebase. Legacy tokens exist in `GlobeSphere.jsx` and `GlobeSection.jsx`. If they remain unrendered, they won't affect runtime styling, but for 100% token purity, their lights and materials can be neutral or warm.
2. **Existing E2E Test Suite Assertions**: The existing test suite in `tests/` contains tests written for Milestone 2-5 checks. Some tests may assert specific CSS variable names (e.g., `--color-accent-cyan`). To prevent test breakages while fulfilling R1, aliasing `--color-accent-cyan: #C4704A` in CSS and `accent.cyan` in Tailwind preserves backward contract compatibility while rendering terracotta.
3. **External Google Fonts Network Dependency**: If building or running in an offline environment, Google Fonts fallback to system fonts (`Georgia, serif`, `-apple-system, sans-serif`, `monospace`).

---

## 5. Conclusion

1. **Styling and Tokens (R1)**: The color migration from dark navy/cyan to warm cream `#F5F0E8` (light) / deep warm brown `#141210` (dark) with `#C4704A` terracotta accent is straightforward, well-encapsulated in `index.css` and `tailwind.config.js`.
2. **Typography (R2)**: Switching from Playfair Display/Inter to `DM Serif Display`, `DM Sans`, and `JetBrains Mono` requires updating `index.html` font preloads and `tailwind.config.js` `fontFamily`.
3. **Common Polish Components (R8, R11)**:
   - `Preloader.jsx`: Needs explicit `#F5F0E8` cream background, `#1C1A18` text, "A.M." in DM Serif Display, and removal of cyan/gold gradients.
   - `PageCurtain.jsx`: Curtain color must be `#F5F0E8`.
   - `CustomCursor.jsx`: Needs terracotta `#C4704A` replacement and removal of cyan glow.
   - `ScrollProgressBar.jsx`: Refined 2px `#C4704A` bar without glow.
4. **Actionable Implementation Steps for Next Agents**:
   - Step 1: Update `index.html`, `src/styles/index.css`, and `tailwind.config.js`.
   - Step 2: Update `ThemeContext.jsx` (default light mode, meta color updates).
   - Step 3: Update `Preloader.jsx`, `PageCurtain.jsx`, `CustomCursor.jsx`, `ScrollProgressBar.jsx`.
   - Step 4: Run `npm run build` to verify build integrity.

---

## 6. Verification Method

To independently verify these findings and proposed changes:

1. **Verify Baseline Build Health**:
   The baseline build was executed and verified clean:
   ```bash
   npm run build
   ```
   *Result*: Exited with code 0 in 1m 13s. All 2026 modules transformed cleanly with zero warnings or errors.

2. **Verify Token Occurrences**:
   Run the survey scanner script:
   ```bash
   node .agents/explorer_redesign_survey_1/survey_scanner.cjs
   ```
   Inspect `.agents/explorer_redesign_survey_1/token_survey_summary.txt`.

3. **Verify Visual Tokens in Browser / Dev Server**:
   Start dev server:
   ```bash
   npm run dev
   ```
   Inspect DOM root computed styles for:
   - `--color-bg: #F5F0E8`
   - `--color-surface: #EDE8DF`
   - `--color-accent: #C4704A`
   - `--color-text-primary: #1C1A18`
   - `font-family` on `h1` resolving to `"DM Serif Display"`
   - `font-family` on `p` resolving to `"DM Sans"`
