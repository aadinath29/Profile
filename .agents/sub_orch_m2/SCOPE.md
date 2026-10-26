# Scope: Milestone 2 — Visual Design System, Navigation & System Polish

## Architecture
Milestone 2 delivers the entire global visual design layer, theme management, system-level polish, and structural layout framing:
- **Theme & Design Tokens**: `ThemeContext`, `ThemeToggle`, Tailwind color tokens mapping CSS custom properties for `:root` and `.dark`, Playfair Display & Inter typography, and synchronous anti-FOUC script.
- **Branded Preloader**: Editorial "A.M." monogram in serif, 0% -> 100% animated counter, and curtain slide-up exit revealing the page.
- **Custom Desktop Cursor**: `CursorContext` + `CustomCursor` with GSAP `quickTo` 120fps tracking, contextual hover states ('hover', 'project', 'default'), custom labels ("View", "Open"), and touch device suppression.
- **Viewport Scroll Progress Bar**: Fixed top horizontal neon cyan/gold gradient bar tracking 0% -> 100% of document scroll.
- **Sticky Navigation & Responsive Mobile Menu**: Fixed glassmorphic `Navbar` with "A—M" logo, clip-path hover slide reveals for desktop links, theme switcher, and resume button. Fullscreen `MobileMenu` overlay with staggered link entrance animations. `Footer` with developer info, links, and back-to-top button.
- **Master Layout Shell & Lenis**: `Layout` integrating `lenis` smooth scrolling synchronized with `gsap.ticker` (`lagSmoothing(0)`), route change scroll restoration, and mounting `CustomCursor`, `ScrollProgressBar`, `Navbar`, and `Footer`.

## Feature Inventory (Assigned to M2)
| # | Feature | Description | Milestone | Status |
|---|---------|-------------|-----------|--------|
| 5 | Dark/Light Color Tokens & CSS Variables | Tailwind config mapping CSS variables for dark and light palettes | M2 | IN_PROGRESS |
| 6 | Anti-FOUC Theme Initialization | Synchronous `<head>` script in `index.html` loading theme from `localStorage` | M2 | IN_PROGRESS |
| 7 | Theme Toggle Switch Component | Persistent theme switcher button with smooth transition | M2 | IN_PROGRESS |
| 8 | Typography & Google Fonts Loading | Playfair Display serif + Inter sans-serif preconnect and Tailwind fonts | M2 | IN_PROGRESS |
| 9 | "A.M." Monogram Preloader | Branded loading screen with monogram and 0–100% counter with curtain exit | M2 | IN_PROGRESS |
| 10 | High-Performance Custom Cursor | Dual dot/ring cursor with GSAP `quickTo`, hover scaling, labels, touch suppression | M2 | IN_PROGRESS |
| 11 | Viewport Scroll Progress Bar | 2px–3px top progress bar filling 0%–100% on page scroll | M2 | IN_PROGRESS |
| 12 | Sticky Header & Desktop Hover | Sticky glassmorphic navbar with desktop clip-path reveal hover effects | M2 | IN_PROGRESS |
| 13 | Responsive Mobile Menu | Fullscreen overlay mobile menu with staggered navigation entrance | M2 | IN_PROGRESS |
| 14 | Layout Shell & Lenis Setup | Master layout wrapping Lenis smooth scroll and synchronizing GSAP ticker | M2 | IN_PROGRESS |

## Interface Contracts

### 1. ThemeContext (`src/context/ThemeContext.jsx`)
- Exports `ThemeProvider` and `useTheme()`.
- State: `theme` ('dark' | 'light').
- Methods: `toggleTheme()`.
- Side effects: Syncs with `localStorage.getItem('am_portfolio_theme')` and toggles `.dark` class on `document.documentElement`.

### 2. CursorContext (`src/context/CursorContext.jsx`)
- Exports `CursorProvider` and `useCursor()`.
- State: `cursorVariant` ('default' | 'hover' | 'project' | 'hidden'), `cursorText` (string).
- Methods: `setCursorVariant(variant)`, `setCursorText(text)`.

### 3. Layout Component (`src/components/layout/Layout.jsx`)
- Props: `{ children }`.
- Integrates Lenis smooth scroll instance.
- Hooks `lenis.on('scroll', ScrollTrigger.update)`.
- Connects `gsap.ticker.add((time) => lenis.raf(time * 1000))` and `gsap.ticker.lagSmoothing(0)`.
- Resets scroll on route change via `lenis.scrollTo(0, { immediate: true })` + `ScrollTrigger.refresh()`.
- Renders `CustomCursor`, `ScrollProgressBar`, `Navbar`, `<main>{children}</main>`, and `Footer`.

### 4. Navbar Component (`src/components/layout/Navbar.jsx`)
- Glassmorphic top bar (`backdrop-blur-md`, fixed).
- Editorial "A—M" monogram link to `/`.
- Desktop links with clip-path slide reveals on hover.
- Renders `ThemeToggle`.
- Renders Resume CTA button linking to `/Aadi_Resume-04-09-2026.pdf`.
- Hamburger toggle triggering `MobileMenu`.

### 5. Preloader Component (`src/components/common/Preloader.jsx`)
- Editorial "A.M." monogram.
- Animated 0% to 100% counter.
- On 100%, curtain slide-up reveals page and component cleanly unmounts or transitions out.
