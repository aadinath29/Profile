# Final Completion Audit Report — Explorer 1

**Scope**: Task 1 (Styles, Common Components, UI Components, 3D Components, Neon/Cyan/Blue/Navy/Glow Audit, Unused Imports/Variables) & Task 6 (App.jsx, Layout.jsx, Navbar.jsx, MobileMenu.jsx, Footer.jsx, Lenis + GSAP sync, Context providers).

---

## 1. Observation

### 1.1 Styles Audit
- **`src/styles/index.css`**:
  - Line 1: Imports Google Fonts `DM Sans`, `DM Serif Display`, and `JetBrains Mono`.
  - Lines 8–24 (`:root`) and lines 27–43 (`.dark`): Variables defined for warm cream (`#F5F0E8`), dark brown (`#141210`), surface (`#EDE8DF`), charcoal (`#1C1A18`, `#3D3A36`, `#7A756D`), and terracotta accent (`#C4704A`).
  - Lines 21–23, 40–42: Backward compatibility aliases present: `--color-accent-cyan: #C4704A`, `--color-accent-gold: #C4704A`, `--color-accent-glow: transparent`.
  - Lines 46–53: `body` resets font family to `'DM Sans'`.
  - Lines 56–60: `h1, h2, h3, h4, .font-serif` sets `'DM Serif Display'`.
  - Lines 63–70: Text selection highlight set to `#C4704A` with white text.
  - Lines 75–94: Lenis reset styles present.
  - Lines 100–112: Custom cursor desktop media query resets `cursor: none !important` on fine pointers, with explicit `cursor: auto !important` exemption for form inputs and textareas.
- **`src/styles/animations.css`**:
  - Direct check: File does **not** exist on disk (`open c:/Users/Dell/Desktop/Profile/src/styles/animations.css: The system cannot find the file specified`).
  - Import check: Neither `index.html`, `src/main.jsx`, `src/App.jsx`, nor `src/styles/index.css` import `animations.css`. No broken imports exist.
- **`tailwind.config.js`**:
  - Lines 22–67: Colors extended with CSS variables and fallback aliases (`accent.cyan` -> terracotta, `accent.gold` -> terracotta, `accent.glow` -> transparent, `glow-cyan` -> none, `glow-gold` -> none).
  - Lines 68–72: Font families configured: `serif: ['"DM Serif Display"', 'Georgia', 'serif']`, `sans: ['"DM Sans"', ... ]`, `mono: ['"JetBrains Mono"', ... ]`.
  - Lines 81–90: Box shadows configured (`warm-subtle`, `warm-card`, `warm-hover`, `terracotta-sm`). Legacy glow classes explicitly neutralized.
- **`index.html`**:
  - Line 6: `<meta name="theme-color" content="#F5F0E8" id="theme-color-meta" />`.
  - Lines 15–20: Preconnects and stylesheets for `DM Sans`, `DM Serif Display`, and `JetBrains Mono`.
  - Lines 23–40: Synchronous anti-FOUC script syncing theme with `#141210` (dark) and `#F5F0E8` (light).
  - Line 42: `<body class="bg-background text-text-primary antialiased selection:bg-[#C4704A] selection:text-white">`.

### 1.2 Common Components Audit
- **`src/components/common/Preloader.jsx`**:
  - Line 75: `className="... bg-[#F5F0E8] text-[#1C1A18] ..."` (Warm cream background, charcoal text).
  - Line 95: Displays `{developer.monogram || 'A.M.'}` in `font-serif text-6xl sm:text-8xl md:text-9xl text-[#1C1A18]`.
  - Line 99: Subtitle in `font-mono tracking-widest uppercase text-[#7A756D]`.
  - Lines 116–121: Progress bar track uses `bg-[#1C1A18]/10` with indicator `bg-[#C4704A]`.
  - Clean: Completely adheres to R11.
- **`src/components/common/CustomCursor.jsx`**:
  - Lines 16–28, 227: Touch device detection (`(hover: none) or (pointer: coarse)`) returns `null` on touch devices.
  - Lines 41–46: GSAP `quickTo` 120fps tracking pipeline for dot and ring.
  - Lines 170, 184, 208, 215, 234, 241: All variants use `#C4704A` (terracotta) or `rgba(196, 112, 74, ...)`.
  - Lines 171, 185, 216: `boxShadow: 'none'` explicitly prevents any legacy glow.
- **`src/components/common/ScrollProgressBar.jsx`**:
  - Line 57: `className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9998] pointer-events-none bg-[#C4704A] will-change-transform"`.
  - Lines 8–13: Route change reset (`location.pathname`).
  - Lines 23–24: Division by zero protection and clamping `[0, 1]`.
- **`src/components/common/PageCurtain.jsx`**:
  - Lines 15, 24: Entrance and exit curtains use `bg-[#F5F0E8]` (warm cream, not black). Clean.
- **`src/components/common/ErrorBoundary.jsx`** *(ISSUE IDENTIFIED)*:
  - Line 33: `<div className="w-12 h-12 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold">`
  - Line 58: `<button onClick={this.handleRetry} className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-accent-cyan border border-accent-cyan/30 rounded-md hover:bg-accent-cyan/10 transition-colors">`
  - Observation: Uses legacy tokens `accent-gold` and `accent-cyan` in active fallback UI.

### 1.3 UI Components Audit
- **`src/components/ui/Button.jsx`**:
  - Direct check: File does **not** exist in `src/components/ui/`.
  - Reference check: No file in `src/` attempts to import `Button.jsx`. Native `<button>` and `<Link>` elements are styled directly with Tailwind classes. No broken imports.
- **`src/components/ui/SectionHeading.jsx`** *(ISSUE IDENTIFIED)*:
  - Line 20: `className="... text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 ..."`
  - Line 24: `<span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />`
  - Observation: Eyebrow badge retains legacy `accent-cyan` classes. (Component is currently only imported by `TestimonialsSection.jsx`, which is omitted from render).
- **`src/components/ui/BentoCard.jsx`** *(ISSUE IDENTIFIED — INACTIVE COMPONENT)*:
  - Line 20: `hover:border-accent-cyan/40 hover:shadow-[0_0_25px_var(--color-accent-glow)]`
  - Line 24: `group-hover:text-accent-cyan`
  - Line 69: `bg-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.4)]` (hardcoded rgba cyan glow)
  - Line 70: `bg-accent-gold/80`
  - Observation: File contains multiple legacy neon cyan/gold/glow styles. However, per R9, BentoCard is removed from render and is **not** imported by `SkillsSection.jsx` or any active page.
- **`src/components/ui/MarqueeTicker.jsx`**:
  - Preserved on disk, only referenced by unrendered `TestimonialsSection.jsx`. Not rendered on any active route.
- **`src/components/ui/ThemeToggle.jsx`** *(CRITICAL ISSUE IDENTIFIED — ACTIVE COMPONENT)*:
  - Line 24: `className="... focus-visible:ring-2 focus-visible:ring-accent-cyan/50 hover:border-accent-cyan/40 hover:shadow-glow-cyan dark:hover:shadow-glow-cyan ..."`
  - Line 30: `<motion.span key="sun" className="flex items-center justify-center text-accent-gold" ...>`
  - Line 41: `<motion.span key="moon" className="flex items-center justify-center text-accent-cyan" ...>`
  - Observation: Actively rendered in both `Navbar.jsx` and `MobileMenu.jsx`. It contains `ring-accent-cyan`, `border-accent-cyan`, `shadow-glow-cyan`, `text-accent-gold`, and `text-accent-cyan`.

### 1.4 3D Components Audit
- **`src/components/3d/HeroCanvas.jsx`**:
  - Line 1: `import React, { Suspense, useEffect, useRef, useState } from 'react';` — `Suspense` is imported but never used in this file (it is lazy-loaded inside Suspense in `HeroSection.jsx`).
  - Lines 34–42: Lighting uses warm ambient (`#FFF8F0`), key light (`#FFFDF9`), and terracotta point fill (`#C4704A`).
  - Lines 70, 78–97: DPR clamped `[1, 2]`, context loss/restore handlers, `gl.dispose()` on teardown.
- **`src/components/3d/HeroGeometry.jsx`**:
  - Line 44: Torus knot wireframe `color="#C4704A"`, opacity 0.22.
  - Lines 56–58: Inner core icosahedron `color="#1C1A18"`, `emissive="#C4704A"`, `emissiveIntensity=0.12`.
  - Line 68: Accent ring `color="#C4704A"`.
  - Clean: Pure warm terracotta and charcoal, ambient background element.
- **`src/components/3d/ParticleField.jsx`**:
  - Line 36: `color: new THREE.Color('#C4704A')`.
  - Lines 13–18: Responsive particle ceiling (600 desktop, 250 mobile).
  - Lines 48–53: Geometry and material disposal on unmount.
- **`src/components/3d/SceneFallback.jsx`** *(CRITICAL ISSUE IDENTIFIED — ACTIVE COMPONENT)*:
  - Line 16: `border border-accent-cyan/20 bg-accent-cyan/5 animate-pulse-subtle`
  - Line 19: `border-accent-cyan/30`
  - Line 22: `shadow-glow-cyan`
  - Line 23: `text-accent-cyan`
  - Line 31: `bg-accent-cyan animate-ping`
  - Observation: Actively used as Suspense fallback and ErrorBoundary fallback in `HeroSection.jsx`.
- **`src/components/3d/GlobeCanvas.jsx` & `GlobeSphere.jsx`**:
  - Contain legacy cyan `#00f0ff` and gold `#fbbf24`. Only imported by `GlobeSection.jsx`, which is not rendered on any active route.

### 1.5 Task 6 (App.jsx & Layout Components Audit)
- **`src/App.jsx`**:
  - Lines 22–23: `<ThemeProvider>` and `<CursorProvider>` wrap the entire application tree.
  - Line 25: `<Preloader />` rendered inside providers.
  - Line 28: `<Layout>` wraps `<AnimatePresence mode="wait">`.
  - Line 30: `<Routes location={location} key={location.pathname}>` provides route-keyed transitions.
  - Lines 31–79: All routes (`/`, `/about`, `/projects`, `/blog`, `/contact`, `*`) are wrapped in `<PageCurtain>`.
  - Clean: Architecture and hierarchy are 100% correct.
- **`src/components/layout/Layout.jsx`**:
  - Lines 24–33: Lenis initialized with smooth wheel enabled.
  - Line 39: `lenis.on('scroll', ScrollTrigger.update)` synchronizes Lenis scroll events with GSAP.
  - Lines 42–47: GSAP ticker pipe: `gsap.ticker.add((time) => lenis.raf(time * 1000))` with `gsap.ticker.lagSmoothing(0)`.
  - Lines 50–55: Full teardown contract removes ticker listener and destroys lenis instance.
  - Lines 58–66: Route change resets scroll to top (`scrollTo(0, { immediate: true })`) and calls `ScrollTrigger.refresh()`.
  - Lines 73–97: Renders WCAG skip-link, `<CustomCursor />`, `<ScrollProgressBar />`, `<Navbar />`, `<main id="main-content">{children}</main>`, and `<Footer />`.
  - Clean: Zero leftover neon/glow, all contracts satisfied.
- **`src/components/layout/Navbar.jsx`**:
  - Line 48: Logo reads "Aadinath" in `font-serif text-2xl font-normal tracking-tight text-text-primary hover:text-[#C4704A]`.
  - Lines 38–41: Header transitions on scroll (`scrollY > 80`) to `bg-[#F5F0E8]/95 dark:bg-[#141210]/95 backdrop-blur-sm border-b border-[#EDE8DF] dark:border-[#1C1A18]`.
  - Lines 72–76: Active and hover navigation link underline is 2px terracotta `bg-[#C4704A]` sliding from left.
  - Lines 87–94: Outlined terracotta resume button `border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white`.
  - Clean.
- **`src/components/layout/MobileMenu.jsx`**:
  - Lines 12–31: Dual-layer body scroll lock + Lenis `stop()` and `start()`.
  - Lines 34–43: Escape key listener.
  - Lines 46–55: Auto-close on viewport resize to `>= 768px`.
  - Lines 103, 106, 122, 143, 145, 153, 165, 179–208: Fully styled with cream/charcoal/terracotta system and real links from `developer.js`.
  - Clean.
- **`src/components/layout/Footer.jsx`**:
  - Lines 13–15: Left: "Aadinath Magar" in `font-serif text-2xl sm:text-3xl font-bold tracking-tight text-text-primary`.
  - Lines 16–18: Subtitle: "Built with React & Vite · 2026" in `font-sans text-xs text-text-muted`.
  - Lines 23–39: Right: GitHub and LinkedIn links in `font-sans text-sm text-text-secondary hover:text-[#C4704A]`.
  - Line 8: Background `bg-background`, border `border-[#EDE8DF] dark:border-[#1C1A18]`.
  - Clean: Exactly adheres to R10.

### 1.6 Additional Findings in Peer Scope Files (Cross-Audit)
- **Unused Imports**:
  - `src/components/sections/home/HeroSection.jsx` line 2: `import { Link } from 'react-router-dom';` is unused.
  - `src/pages/ContactPage.jsx` line 2: `Sparkles` from `lucide-react` is unused.
  - `src/pages/BlogPage.jsx` line 2: `Sparkles` from `lucide-react` is unused.
  - `src/components/sections/blog/BlogCard.jsx` line 3: `Tag` from `lucide-react` is unused.
- **Page Headings & Copy Violations**:
  - `src/pages/ContactPage.jsx` line 17: Heading is `"Let's Build Something Impactful"` (Task 2 & AC strictly mandate: `"Let's talk."`).
  - `src/pages/BlogPage.jsx` line 38: Heading is `"Engineering Insights & Systems Design"` (Task 3 & AC strictly mandate: `"Writing."`).
  - `src/pages/BlogPage.jsx` line 41: Subtitle should be small italic note: `"Thoughts on building, learning, and shipping."`.
  - `src/components/sections/blog/BlogCard.jsx`: Missing small JetBrains Mono placeholder indicator: `// placeholder — content coming soon`.
  - `src/pages/NotFoundPage.jsx` lines 7, 14: Uses `text-accent-cyan` and `bg-accent-cyan text-black`.
  - `src/components/sections/contact/ContactForm.jsx` lines 71, 110, 127, 150, 157: Uses cyan focus rings, cyan success badge, and cyan button with `shadow-glow-cyan`.
  - `src/components/sections/contact/ContactInfo.jsx` lines 22, 24, 29, 37, 39, 44, 74, 87: Uses `accent-cyan` and `accent-gold` throughout.
- **Removed Components Status**:
  - `GlobeSection.jsx`, `StatsSection.jsx`, `TestimonialsSection.jsx` are preserved on disk but **omitted from render** on `HomePage.jsx` and all other pages.
  - `BentoCard.jsx` and `MarqueeTicker.jsx` are preserved on disk but **omitted from render** on all active routes.

---

## 2. Logic Chain

1. **Premise 1**: The user specification requires all leftover `neon`, `cyan`, `blue`, and `glow` tokens to be removed from all active and rendered components (R9, Acceptance Criteria, and Task 1).
   - **Observation 1.3, 1.4**: `ThemeToggle.jsx` (active in header and mobile drawer) and `SceneFallback.jsx` (active fallback for hero 3D canvas) directly contain `focus-visible:ring-accent-cyan/50`, `hover:border-accent-cyan/40`, `hover:shadow-glow-cyan`, `text-accent-cyan`, `text-accent-gold`, and `bg-accent-cyan`.
   - **Observation 1.2**: `ErrorBoundary.jsx` uses `bg-accent-gold/10`, `border-accent-gold/30`, `text-accent-cyan`, and `hover:bg-accent-cyan/10`.
   - **Inference 1**: Even though CSS variable aliases in `index.css` map `--color-accent-cyan` to `#C4704A`, referencing `accent-cyan`, `accent-gold`, and `shadow-glow-cyan` violates the strict requirement that cyan/gold/glow tokens are removed and replaced with the direct palette tokens (`terracotta`, `#C4704A`, `border`, `surface`).

2. **Premise 2**: Task 6 requires verifying that `App.jsx` and `Layout.jsx` correctly wrap providers, configure Lenis and GSAP ticker sync, and assemble the master layout.
   - **Observation 1.5**: `App.jsx` wraps `ThemeProvider` -> `CursorProvider` -> `Preloader` -> `Layout` -> `AnimatePresence mode="wait"` -> `Routes` (keyed by `location.pathname`) -> `PageCurtain` on all routes.
   - **Observation 1.5**: `Layout.jsx` registers `ScrollTrigger`, initializes `Lenis`, adds `lenis.on('scroll', ScrollTrigger.update)`, links the GSAP ticker via `lenis.raf(time * 1000)` with `gsap.ticker.lagSmoothing(0)`, restores scroll on route changes, and cleans up on unmount.
   - **Inference 2**: Task 6 implementation in `App.jsx` and `Layout.jsx` is robust, conforms strictly to all architectural specifications, and has zero defects.

3. **Premise 3**: Clean build and runtime performance require zero broken imports and zero unused variables/imports that trigger linter warnings or dead code overhead.
   - **Observation 1.1, 1.3, 1.6**: `animations.css` and `Button.jsx` do not exist on disk, but neither is imported anywhere. However, unused imports exist in `HeroSection.jsx` (`Link`), `HeroCanvas.jsx` (`Suspense`), `ContactPage.jsx` (`Sparkles`), `BlogPage.jsx` (`Sparkles`), and `BlogCard.jsx` (`Tag`).
   - **Inference 3**: These unused imports should be eliminated during the final polish pass to keep the codebase pristine.

---

## 3. Caveats

1. **Preserved Legacy Files on Disk**: Per requirement R9 ("keep the component file, just don't render it"), files such as `GlobeSection.jsx`, `StatsSection.jsx`, `TestimonialsSection.jsx`, `GlobeCanvas.jsx`, and `GlobeSphere.jsx` exist on disk and contain legacy tokens. Because they are not imported or rendered by any page in `App.jsx`, they do not impact the rendered website or visual identity.
2. **Build and Test Tooling Access**: As an explorer in read-only mode, code execution was limited to non-interactive inspection. Verification was carried out via AST/code inspection across every file in `src/`.

---

## 4. Conclusion & Recommended Action Plan

The foundation built in `App.jsx`, `Layout.jsx`, `Navbar.jsx`, `MobileMenu.jsx`, and `Footer.jsx` is exceptionally high quality, strictly implementing Lenis + GSAP synchronization, the cream/charcoal/terracotta palette, and responsive mobile architecture.

To achieve 100% completion against the acceptance criteria, the following specific code edits are required across the inspected components:

### Proposed Fix 1: `src/components/ui/ThemeToggle.jsx`
Replace lines 24, 30, and 41:
```jsx
// Before (Line 24):
className={`... focus-visible:ring-2 focus-visible:ring-accent-cyan/50 hover:border-accent-cyan/40 hover:shadow-glow-cyan dark:hover:shadow-glow-cyan ${className}`}
// After:
className={`... focus-visible:ring-2 focus-visible:ring-[#C4704A]/50 hover:border-[#C4704A]/40 transition-all duration-300 ${className}`}

// Before (Line 30):
<motion.span key="sun" className="flex items-center justify-center text-accent-gold" ...>
// After:
<motion.span key="sun" className="flex items-center justify-center text-[#C4704A]" ...>

// Before (Line 41):
<motion.span key="moon" className="flex items-center justify-center text-accent-cyan" ...>
// After:
<motion.span key="moon" className="flex items-center justify-center text-text-primary" ...>
```

### Proposed Fix 2: `src/components/3d/SceneFallback.jsx`
Replace lines 16, 19, 22, 23, and 31:
```jsx
// Before:
<div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 animate-pulse-subtle flex items-center justify-center" />
<div className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full border border-dashed border-accent-cyan/30 animate-[spin_18s_linear_infinite]" />
<div className="absolute w-12 h-12 rounded-full bg-surface/80 border border-border flex items-center justify-center backdrop-blur-sm shadow-glow-cyan">
  <span className="text-xs font-mono font-bold text-accent-cyan">A.M.</span>
</div>
...
<span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />

// After:
<div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-[#C4704A]/20 bg-[#C4704A]/5 animate-pulse-subtle flex items-center justify-center" />
<div className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full border border-dashed border-[#C4704A]/30 animate-[spin_18s_linear_infinite]" />
<div className="absolute w-12 h-12 rounded-full bg-surface/80 border border-[#C4704A]/30 flex items-center justify-center backdrop-blur-sm shadow-sm">
  <span className="text-xs font-mono font-bold text-[#C4704A]">A.M.</span>
</div>
...
<span className="w-1.5 h-1.5 rounded-full bg-[#C4704A] animate-ping" />
```

### Proposed Fix 3: `src/components/common/ErrorBoundary.jsx`
Replace lines 33 and 58:
```jsx
// Before (Line 33):
<div className="w-12 h-12 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
// After:
<div className="w-12 h-12 rounded-full bg-[#C4704A]/10 border border-[#C4704A]/30 flex items-center justify-center text-[#C4704A]">

// Before (Line 58):
className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-accent-cyan border border-accent-cyan/30 rounded-md hover:bg-accent-cyan/10 transition-colors"
// After:
className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-[#C4704A] border border-[#C4704A]/30 rounded-md hover:bg-[#C4704A]/10 transition-colors"
```

### Proposed Fix 4: `src/components/ui/SectionHeading.jsx`
Replace lines 20 and 24:
```jsx
// Before:
className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-accent-cyan bg-accent-cyan/10 rounded-full border border-accent-cyan/20 ${isCenter ? 'mx-auto' : ''}`}
<span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
// After:
className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-[#C4704A] bg-[#C4704A]/10 rounded-full border border-[#C4704A]/25 ${isCenter ? 'mx-auto' : ''}`}
<span className="w-1.5 h-1.5 rounded-full bg-[#C4704A] animate-pulse" />
```

### Proposed Fix 5: Remove Unused Imports
- In `src/components/sections/home/HeroSection.jsx` line 2: Remove `Link`.
- In `src/components/3d/HeroCanvas.jsx` line 1: Remove `Suspense`.
- In `src/pages/ContactPage.jsx` line 2: Remove `Sparkles`.
- In `src/pages/BlogPage.jsx` line 2: Remove `Sparkles`.
- In `src/components/sections/blog/BlogCard.jsx` line 3: Remove `Tag`.

---

## 5. Verification Method

1. **Verify No Leftover Tokens in Active Source**:
   Run grep or pattern check across `src/components/common`, `src/components/layout`, `src/components/ui`, and `src/components/3d`:
   ```bash
   # Target pattern: accent-cyan, accent-gold, shadow-glow, #00f0ff, #fbbf24
   ```
   Confirm zero occurrences in `ThemeToggle.jsx`, `SceneFallback.jsx`, `ErrorBoundary.jsx`, and `SectionHeading.jsx`.
2. **Verify App & Layout Wrapping**:
   Inspect `src/App.jsx` lines 22–31 and `src/components/layout/Layout.jsx` lines 24–66.
   Ensure `ThemeProvider`, `CursorProvider`, `Layout`, and `AnimatePresence` wrap all routes, and that Lenis ticker synchronization is active.
3. **Build Verification**:
   Execute:
   ```bash
   npm run build
   ```
   Ensure build passes cleanly (exit code 0) with zero module errors.
4. **Dev Server Verification**:
   Execute:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:5173/`, `http://localhost:5173/about`, `http://localhost:5173/projects`, `http://localhost:5173/blog`, `http://localhost:5173/contact`. Verify browser console has zero errors or warnings.
