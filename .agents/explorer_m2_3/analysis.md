# Technical Analysis & Blueprint: Navigation, Editorial Footer, Layout Shell & Lenis Smooth Scrolling

**Explorer**: Explorer M2-3 (Milestone 2: Visual Design System & Polish)  
**Date**: 2026-09-10  
**Status**: COMPLETE / READY FOR WORKER IMPLEMENTATION  
**Target Scope**:
- **Feature 12**: Sticky Header & Desktop Navigation (`src/components/layout/Navbar.jsx`)
- **Feature 13**: Responsive Mobile Menu (`src/components/layout/MobileMenu.jsx`)
- **Editorial Footer**: Developer status, colophon, socials, and back-to-top (`src/components/layout/Footer.jsx`)
- **Feature 14**: Master Layout Shell & Lenis Smooth Scrolling (`src/components/layout/Layout.jsx`, `src/hooks/useLenis.js`)
- **App Shell Integration**: Provider hierarchy & route mounting (`src/App.jsx`)
- **CSS Enhancements**: Lenis performance resets and clip-path styling (`src/styles/index.css`)

---

## 1. Executive Summary & Architectural Overview

Milestone 2 establishes the high-fidelity visual design system, navigation architecture, and kinetic motion foundation for the corporate-grade personal portfolio of **Aadinath Magar ("Aadi")**.

This technical blueprint delivers the concrete architecture and complete production-grade source code for the structural envelope of the entire application:

1. **Sticky Header & Desktop Navigation (`Navbar.jsx` — Feature 12)**:
   A fixed glassmorphic header (`backdrop-blur-md`, `bg-surface/80`) featuring the authentic editorial `"A—M"` monogram logo linking to `/`, desktop navigation covering all 5 core routes (`/`, `/about`, `/projects`, `/blog`, `/contact`) with **raviklaassens-style dual-line clip-path slide reveal hover effects**, persistent `ThemeToggle` switch integration, and a high-contrast Resume CTA button linking to `/Aadi_Resume-04-09-2026.pdf`. Implements a hysteresis-free scroll boundary at `scrollY > 80px` for dynamic height and shadow contraction.

2. **Responsive Mobile Menu (`MobileMenu.jsx` — Feature 13)**:
   A full-screen mobile overlay (`fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl`) triggered by an accessible hamburger button that morphs into a close "X". Incorporates **dual-layer scroll locking** (`document.body.style.overflow = 'hidden'` + imperative `lenis.stop()`), auto-closure on route selection, auto-closure on viewport expansion (`window.innerWidth >= 768px`), Escape key handling, and staggered Framer Motion entrance animations with oversized editorial serif typography and index tokens (`01`, `02`, `03`...).

3. **Editorial Footer (`Footer.jsx`)**:
   An editorial colophon adhering to the *13studio.framer.website/about* visual benchmark. Features a live availability badge (`"● Available for roles"` with pulsing emerald indicator), copyright notice, real developer links (GitHub, LinkedIn, Email, Phone), and an intelligent **Back-to-Top** button that leverages the active Lenis instance for buttery smooth acceleration back to the top of the document.

4. **Master Layout Shell & Lenis Smooth Scrolling (`Layout.jsx` — Feature 14)**:
   The master frame encapsulating `CustomCursor` (Feature 10), `ScrollProgressBar` (Feature 11), `Navbar` (Feature 12), `<main id="main-content">{children}</main>`, and `Footer`. Initializes the `lenis` smooth scroll engine, binds `lenis.on('scroll', ScrollTrigger.update)`, connects to `gsap.ticker` with `gsap.ticker.lagSmoothing(0)`, resets scroll position to `(0, 0)` immediately upon route transitions (`ScrollTrigger.refresh()`), and cleans up all listeners and ticker hooks upon unmount.

5. **Application Root Assembly (`App.jsx`)**:
   Replaces the preliminary Milestone 1 placeholder layout with a resilient provider chain: `ThemeProvider` -> `CursorProvider` -> `Preloader` -> `Layout` -> `<Routes>`.

---

## 2. Requirements & Verification Matrix

The following table maps every test requirement and boundary across Features 12, 13, and 14 to our architectural solution:

| Test ID | Feature / Module | Requirement & Constraint | Architectural Blueprint Solution |
|---|---|---|---|
| `T1-F12-01` | Navbar Export | `src/components/layout/Navbar.jsx` exists and is exported | Create `src/components/layout/Navbar.jsx` with default & named export |
| `T1-F12-02` | Brand Monogram | Monogram `"A—M"` links to root `/` | `<Link to="/">` with `developer.navLogo` (`"A—M"`) |
| `T1-F12-03` | Core Routes | 5 links: `Home`, `About`, `Projects`, `Blog`, `Contact` | Standardized `NAV_LINKS` array mapping exact names to paths |
| `T1-F12-04` | Sticky Nav | Viewport sticky positioning (`fixed top-0` / `sticky top-0`) | Fixed top header with `z-40`, full width, and glassmorphic backdrop |
| `T1-F12-05` | Glassmorphism | Backdrop blur styling in CSS and component | `backdrop-blur-md` with `bg-surface/80` and CSS fallback |
| `T2-F12-01` | Scrolled Boundary | Header state switch at `scrollY > 80px` (`isScrolled(y) => y > 80`) | Scroll listener checking `window.scrollY > 80`, toggles compact class |
| `T2-F12-02` | Direction Reversal | Rapid scroll reversal does not cause layout/state flapping | Passive scroll handler with boolean hysteresis guard |
| `T2-F12-03` | Link Accessibility | Focus rings on nav links for keyboard navigation | `focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-sm` |
| `T2-F12-04` | Mobile Suppression | Desktop links container hidden on mobile (`< 768px`) | Class `hidden md:flex` on desktop navigation `<nav>` |
| `T2-F12-05` | Blur Fallback | Contrast preserved on browsers lacking backdrop-filter | Solid/translucent base color variable `--color-surface` |
| `T1-F13-01` | MobileMenu Export | `src/components/layout/MobileMenu.jsx` exists and is exported | Create `src/components/layout/MobileMenu.jsx` with default & named export |
| `T1-F13-02` | Hamburger Trigger | Hamburger visible on mobile viewport (`375px`) | Button with class `md:hidden` visible at `< 768px` |
| `T1-F13-03` | Open/Close State | Menu opens and closes via boolean toggle | Managed `isOpen` state with Framer Motion `AnimatePresence` |
| `T1-F13-04` | Link Parity | Mobile menu contains exact desktop 5 routes | Shared `NAV_LINKS` constant across desktop and mobile |
| `T1-F13-05` | Scroll Locking | Body scroll locked while mobile menu is open | `document.body.style.overflow = 'hidden'` + `lenis.stop()` on open |
| `T2-F13-01` | Escape Key | Pressing `Escape` key closes open mobile menu | `window.addEventListener('keydown')` matching `e.key === 'Escape'` |
| `T2-F13-02` | Auto-Close on Link | Clicking any mobile link closes the drawer | `onClick={onClose}` on every mobile `<Link>` |
| `T2-F13-03` | Resize Auto-Close | Expanding viewport `>= 768px` auto-closes menu | `window.addEventListener('resize')` closes menu if width `>= 768` |
| `T2-F13-04` | Touch Target Size | Mobile nav link touch targets `>= 44px` height | `min-h-[48px]` with generous vertical padding |
| `T2-F13-05` | ARIA Attributes | Hamburger button has `aria-expanded` and `aria-label` | Proper ARIA props dynamically bound to `isOpen` |
| `T3-THEME-04` | Theme Preservation | Toggling theme inside drawer does not close or reset menu | Theme switch uses isolated context without affecting drawer state |
| `T1-F14-01` | Layout Component | `src/components/layout/Layout.jsx` exists and is exported | Create `src/components/layout/Layout.jsx` |
| `T1-F14-02` | Lenis Reference | Lenis library imported and initialized | `import Lenis from 'lenis'` with custom easing & duration |
| `T1-F14-03` | GSAP Ticker Hook | Lenis synchronized with GSAP ScrollTrigger ticker | `gsap.ticker.add((time) => lenis.raf(time * 1000))` |
| `T1-F14-04` | Layout Structure | Layout encapsulates children, header, footer, cursor, progress | Comprehensive master shell rendering all 5 components |
| `T1-F14-05` | Scroll Reset | Route navigation resets scroll to 0 | `lenis.scrollTo(0, { immediate: true })` on `location.pathname` change |
| `T2-F14-01` | Lenis Teardown | Lenis and ticker destroyed cleanly on unmount | Clean-up return in `useEffect`: `gsap.ticker.remove()`, `lenis.destroy()` |
| `T2-F14-02` | Rapid Nav Race | Fast sequential route changes reset scroll target safely | Immediate scroll jump `immediate: true` + `ScrollTrigger.refresh()` |
| `T2-F14-03` | Keyboard Scrolling | Keyboard scrolling (Space, PageDown, Up/Down) unimpeded | Default Lenis wheel/key bubbling preserved on window |
| `T2-F14-04` | Touch Inertia | Mobile touch viewports (375px) scroll smoothly | `smoothWheel: true`, `touchMultiplier: 2` configured |
| `T2-F14-05` | Lag Smoothing Guard | GSAP ticker lag smoothing explicitly set to 0 | `gsap.ticker.lagSmoothing(0)` called on mount |

---

## 3. Feature 12: Sticky Header & Desktop Navigation (`Navbar.jsx`)

### 3.1 Design Anatomy & Interactions

The navigation bar serves as the persistent editorial anchor across the website.

1. **Brand Identity ("A—M")**:
   - Monogram derived from `developer.navLogo` (`"A—M"`).
   - Displayed in serif (`font-serif tracking-tight text-2xl font-bold`).
   - Sits on the far left. On hover, transitions from `text-accent-cyan` to `text-accent-gold` with a subtle glow.
   - Wrapped in `<Link to="/" aria-label="Aadinath Magar — Home">`.

2. **Scrolled State Hysteresis (Threshold: 80px)**:
   - When `scrollY <= 80px`:
     - Container height: `h-20` (80px), generous breathing room.
     - Background: `bg-surface/60 backdrop-blur-md border-b border-border/20`.
     - Shadow: none.
   - When `scrollY > 80px` (`T2-F12-01`):
     - Container height: `h-16` (64px), compact editorial bar.
     - Background: `bg-surface/85 backdrop-blur-md border-b border-border/60`.
     - Shadow: `shadow-[0_8px_30px_rgba(0,0,0,0.12)]`.
   - Transitions smoothly via `transition-all duration-300 ease-out`.

3. **Raviklaassens-Style Clip-Path Slide Reveal Hover Effect**:
   On *raviklaassens.com*, navigation items feature a kinetic rolling text effect where the primary text translates upward into an overflow clip while an exact duplicate translates up from underneath.
   - Each link item contains an inner `<span className="relative block overflow-hidden py-0.5">`.
   - Contains two layers:
     - **Primary Layer**: `span` that slides up on group hover: `transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full`.
     - **Duplicate Layer (`aria-hidden="true"`)**: `span` positioned `absolute inset-0 translate-y-full group-hover:translate-y-0 text-accent-cyan transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]`.
   - An active route is decorated with a micro accent dot or animated underline: `<span className="absolute bottom-0 left-1 right-1 h-[2px] bg-accent-cyan rounded-full" />`.
   - Inactive routes feature an underline that expands on hover from `scale-x-0` to `scale-x-100 origin-left`.
   - Completely accessible: Screen readers only parse the primary label; layout geometry is locked by the primary text dimensions (zero cumulative layout shift).

4. **Action Cluster (Right Side)**:
   - `<ThemeToggle />`: persistent light/dark mode switch (44x44px touch target).
   - **Resume CTA Button**:
     - Direct download/view link to `developer.resumeUrl` (`/Aadi_Resume-04-09-2026.pdf`).
     - Styled with an editorial gold border: `border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold hover:shadow-glow-gold`.
     - Includes Lucide `<FileDown className="w-3.5 h-3.5" />` icon.
     - Rendered on desktop (`hidden sm:inline-flex`).
   - **Mobile Hamburger Toggle**:
     - Rendered on screens `< 768px` (`md:hidden`).
     - Button dimensions: `w-11 h-11` (meets `>= 44px` accessibility guideline).
     - Controlled `aria-expanded` and `aria-label` attributes (`T2-F13-05`).
     - Visual icon transitioning between three bars and an "X".

---

### 3.2 Complete Code Implementation: `src/components/layout/Navbar.jsx`

```jsx
/**
 * Navbar Component (Feature 12)
 * Sticky glassmorphic header with editorial monogram logo,
 * raviklaassens-style clip-path rolling hover nav links,
 * ThemeToggle switch, Resume CTA button, and MobileMenu trigger.
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileDown, Menu, X } from 'lucide-react';
import { developer } from '../../data/developer';
import ThemeToggle from '../ui/ThemeToggle';
import MobileMenu from './MobileMenu';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for header compaction (T2-F12-01: y > 80px)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'h-16 bg-surface/85 backdrop-blur-md border-b border-border shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
            : 'h-20 bg-surface/60 backdrop-blur-md border-b border-border/40'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Brand Logo Monogram */}
          <Link
            to="/"
            aria-label="Aadinath Magar — Home"
            className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-accent-cyan group-hover:text-accent-gold transition-colors duration-300">
              {developer.navLogo || 'A—M'}
            </span>
            <span className="hidden lg:inline-block font-mono text-[10px] uppercase tracking-widest text-text-muted opacity-60">
              / portfolio
            </span>
          </Link>

          {/* Desktop Navigation Links (hidden on mobile < 768px: T2-F12-04) */}
          <nav
            aria-label="Desktop Primary Navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative py-1 text-sm tracking-wide font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-sm ${
                    isActive
                      ? 'text-accent-cyan font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {/* raviklaassens clip-path rolling text reveal */}
                  <span className="relative block overflow-hidden">
                    {/* Top line slides up */}
                    <span
                      className={`block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full ${
                        isActive ? 'text-accent-cyan' : ''
                      }`}
                    >
                      {link.name}
                    </span>
                    {/* Bottom line slides into place */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 text-accent-cyan font-medium"
                    >
                      {link.name}
                    </span>
                  </span>

                  {/* Underline Indicator */}
                  {isActive ? (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan rounded-full" />
                  ) : (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Cluster (Theme Toggle, Resume CTA, Mobile Hamburger) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Switcher Component (Feature 7) */}
            <ThemeToggle />

            {/* Resume Download CTA Button */}
            <a
              href={developer.resumeUrl || '/Aadi_Resume-04-09-2026.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-full border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold transition-all duration-300 hover:shadow-glow-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Button (>= 44px target: T2-F13-04, T2-F13-05) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg border border-border/60 text-text-primary hover:text-accent-cyan hover:border-accent-cyan/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 transition-transform duration-200" />
              ) : (
                <Menu className="w-5 h-5 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
}
```

---

## 4. Feature 13: Responsive Mobile Menu (`MobileMenu.jsx`)

### 4.1 Design Anatomy & Lifecycle Guards

1. **Fullscreen Glassmorphic Overlay**:
   - Fixed position covering the entire viewport: `fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl`.
   - Semantic dialog role: `role="dialog" aria-modal="true" aria-label="Mobile Navigation" id="mobile-navigation-drawer"`.
   - Padding: `p-6 sm:p-10 flex flex-col justify-between`.

2. **Dual-Layer Background Scroll Locking (`T1-F13-05`)**:
   When mobile menu opens:
   - Native DOM lock: `document.body.style.overflow = 'hidden'`.
   - Lenis lock: `window.__lenis?.stop()` prevents touch momentum scrolling underneath the drawer.
   - On cleanup/close: `document.body.style.overflow = ''` and `window.__lenis?.start()`.

3. **Event Listeners & Automatic Closure**:
   - **Escape Key (`T2-F13-01`)**: `window.addEventListener('keydown', (e) => { if (e.key === 'Escape') onClose(); })`.
   - **Auto-close on Link Click (`T2-F13-02`)**: Every link has `onClick={onClose}`.
   - **Auto-close on Desktop Viewport Resize (`T2-F13-03`)**: `window.addEventListener('resize')` triggers `onClose()` if `window.innerWidth >= 768`.

4. **Staggered Motion Choreography (Framer Motion)**:
   - Overlay container slides gently down/fade: `y: -20, opacity: 0` -> `y: 0, opacity: 1`.
   - Children links stagger by `0.07s`.
   - Each link features an oversized editorial serif label (`text-3xl sm:text-4xl font-serif font-bold`) accompanied by an index counter (`01`, `02`, `03`...) in monospace cyan.
   - Minimum touch target >= 44px (`min-h-[48px] py-3`).

5. **Drawer Drawer Footer**:
   - Availability status indicator ("● Available for roles").
   - Quick social links with direct access to GitHub, LinkedIn, and Email.
   - Resume download link.
   - ThemeToggle switch allowing theme change directly inside the drawer without closing it (`T3-THEME-04`).

---

### 4.2 Complete Code Implementation: `src/components/layout/MobileMenu.jsx`

```jsx
/**
 * MobileMenu Component (Feature 13)
 * Fullscreen mobile overlay drawer with staggered link reveal,
 * keyboard accessibility, scroll locking, and theme preservation.
 */

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { developer } from '../../data/developer';
import ThemeToggle from '../ui/ThemeToggle';

export default function MobileMenu({ isOpen, onClose, navLinks = [] }) {
  const location = useLocation();

  // 1. Dual-Layer Body Scroll Lock (T1-F13-05)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen]);

  // 2. Escape Key Listener (T2-F13-01)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 3. Viewport Resize to Desktop (>= 768px) Auto-Close (T2-F13-03)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  // Framer Motion Animation Variants
  const overlayVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 0.45,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -30 },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          id="mobile-navigation-drawer"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:hidden overflow-y-auto"
        >
          {/* Top Bar: Brand Monogram, Theme Toggle & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-border/40">
            <Link
              to="/"
              onClick={onClose}
              className="font-serif text-2xl font-bold tracking-tight text-accent-cyan"
            >
              {developer.navLogo || 'A—M'}
            </Link>

            <div className="flex items-center gap-3">
              {/* Theme Toggle within Mobile Menu (T3-THEME-04) */}
              <ThemeToggle />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-border/60 text-text-primary hover:text-accent-cyan hover:border-accent-cyan/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Staggered Navigation Link List */}
          <motion.nav
            aria-label="Mobile Navigation Links"
            className="flex flex-col gap-2 my-auto py-8"
          >
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              const formattedIndex = String(index + 1).padStart(2, '0');

              return (
                <motion.div key={link.path} variants={itemVariants}>
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className={`group flex items-baseline justify-between py-3 min-h-[48px] border-b border-border/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded ${
                      isActive
                        ? 'text-accent-cyan font-bold'
                        : 'text-text-primary hover:text-accent-cyan'
                    }`}
                  >
                    <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                      {link.name}
                    </span>
                    <span className="font-mono text-xs tracking-widest text-text-muted group-hover:text-accent-cyan transition-colors">
                      {formattedIndex}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Bottom Cluster: Availability, Social Links & Resume */}
          <div className="pt-6 border-t border-border/40 flex flex-col gap-5">
            {/* Availability Badge */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Available for roles • India
              </span>
            </div>

            {/* Social Links & Resume */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <a
                  href={developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-border/50 text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/60 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-border/50 text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/60 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${developer.email}`}
                  aria-label="Send Email"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-border/50 text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/60 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <a
                href={developer.resumeUrl || '/Aadi_Resume-04-09-2026.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest font-semibold rounded-full border border-accent-gold/40 text-accent-gold bg-accent-gold/5 hover:bg-accent-gold/15 transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 5. Editorial Footer (`Footer.jsx`)

### 5.1 Design Anatomy & Hierarchy

The footer completes the page with an editorial signature:

1. **Availability Pill**:
   A status indicator showing `"Available for roles"` with an emerald pulsing dot, communicating immediate hireability for full-stack and backend roles.

2. **Editorial Branding & Monogram**:
   Displays the developer's full name **Aadinath Magar ("Aadi")**, title **Full-Stack Developer**, and core focus (MERN & AI).

3. **Smooth Back-to-Top Trigger**:
   - Queries the active Lenis instance via `window.__lenis`.
   - Calls `window.__lenis.scrollTo(0, { duration: 1.4 })` with fallback to `window.scrollTo({ top: 0, behavior: 'smooth' })`.
   - Kinetic micro-interaction on hover: up-arrow floats upward.

4. **Direct Social & Communication Channels**:
   - GitHub (`https://github.com/aadinath29`)
   - LinkedIn (`https://www.linkedin.com/in/aadinath-magar-profile`)
   - Email (`mailto:aadinathbmagar75@gmail.com`)
   - Resume download link

---

### 5.2 Complete Code Implementation: `src/components/layout/Footer.jsx`

```jsx
/**
 * Footer Component
 * Editorial footer featuring developer availability badge,
 * social channels, copyright colophon, and Lenis-powered Back-to-Top trigger.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Mail, FileDown, Heart } from 'lucide-react';
import { developer } from '../../data/developer';
import { NAV_LINKS } from './Navbar';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Smooth Back-to-Top Trigger utilizing Lenis if present
  const handleScrollToTop = () => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      data-testid="footer"
      className="border-t border-border/60 bg-surface/40 backdrop-blur-sm text-text-secondary transition-colors duration-300 relative overflow-hidden"
    >
      {/* Subtle top ambient glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Top Tier: Brand, Status Badge & Back-to-Top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-border/40">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="font-serif text-2xl font-bold tracking-tight text-accent-cyan hover:text-accent-gold transition-colors"
            >
              {developer.navLogo || 'A—M'}
            </Link>
            <p className="text-sm text-text-muted">
              {developer.title} — {developer.location}
            </p>
          </div>

          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for roles</span>
          </div>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={handleScrollToTop}
            aria-label="Scroll back to top"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-accent-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded px-2 py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Middle Tier: Navigation Links & Social Channels */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Navigation Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
              Navigation
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-text-secondary hover:text-accent-cyan transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Profiles */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
              Connect
            </span>
            <div className="flex items-center gap-4">
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-surface border border-border/50 text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-surface border border-border/50 text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${developer.email}`}
                aria-label="Email"
                className="p-2 rounded-lg bg-surface border border-border/50 text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Resume & Documents */}
          <div className="flex flex-col gap-3 md:items-end">
            <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
              Curriculum Vitae
            </span>
            <a
              href={developer.resumeUrl || '/Aadi_Resume-04-09-2026.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-gold hover:underline"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Aadi_Resume-04-09-2026.pdf</span>
            </a>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Colophon */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {currentYear} Aadinath Magar ("Aadi"). All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Engineered with React 18 • Tailwind CSS • Lenis • Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 6. Feature 14: Master Layout Shell & Lenis Setup (`Layout.jsx`)

### 6.1 Lenis & GSAP ScrollTrigger Ticker Synchronization

1. **Smooth Scroll Engine Setup**:
   `lenis` (version `^1.1.18`) is initialized inside a `useEffect` on window mount with calibrated parameters:
   ```javascript
   const lenis = new Lenis({
     duration: 1.2,
     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
     orientation: 'vertical',
     gestureOrientation: 'vertical',
     smoothWheel: true,
     wheelMultiplier: 1,
     touchMultiplier: 2,
     infinite: false,
   });
   ```

2. **Ticker Binding (`T1-F14-03`, `T2-F14-05`)**:
   - ScrollTrigger update: `lenis.on('scroll', ScrollTrigger.update);`
   - GSAP ticker callback:
     ```javascript
     const updateTicker = (time) => {
       lenis.raf(time * 1000);
     };
     gsap.ticker.add(updateTicker);
     gsap.ticker.lagSmoothing(0); // Prevents scroll jumps on frame hitching
     ```

3. **Global Instance Reference**:
   Exposed via `window.__lenis = lenis;` so that subcomponents (e.g., Footer back-to-top, Hero scroll indicator) can smoothly command scroll offsets without prop drilling. Cleaned up on unmount: `delete window.__lenis`.

4. **Lifecycle Teardown (`T2-F14-01`)**:
   On layout unmount:
   ```javascript
   gsap.ticker.remove(updateTicker);
   lenis.destroy();
   ```

5. **Route Change Scroll Restoration (`T1-F14-05`, `T2-F14-02`)**:
   Listens to `location.pathname`. On transition:
   ```javascript
   lenis.scrollTo(0, { immediate: true });
   ScrollTrigger.refresh();
   ```

6. **Component Encapsulation (`T1-F14-04`)**:
   Renders:
   - `<CustomCursor />` (Feature 10)
   - `<ScrollProgressBar />` (Feature 11)
   - `<Navbar />` (Feature 12)
   - `<main id="main-content" className="flex-grow pt-20">{children}</main>`
   - `<Footer />`

---

### 6.2 Complete Code Implementation: `src/components/layout/Layout.jsx`

```jsx
/**
 * Master Layout Shell Component (Feature 14)
 * Wraps page routes with Lenis smooth scrolling, GSAP ScrollTrigger ticker
 * synchronization, route change scroll restoration, CustomCursor, ScrollProgressBar,
 * Navbar, and Footer.
 */

import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../common/CustomCursor';
import ScrollProgressBar from '../common/ScrollProgressBar';

// Register GSAP ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);

  // 1. Initialize Lenis & Sync with GSAP Ticker (T1-F14-02, T1-F14-03, T2-F14-05)
  useEffect(() => {
    // Avoid running in non-browser environments
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Pipe GSAP ticker time into Lenis requestAnimationFrame
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // T2-F14-05: Zero lag smoothing guard

    // Teardown Contract (T2-F14-01)
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // 2. Route Change Scroll Restoration (T1-F14-05, T2-F14-02)
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div
      data-testid="master-layout"
      className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent-cyan selection:text-black relative"
    >
      {/* Skip to Main Content Link for WCAG Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-cyan focus:text-black focus:font-semibold focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>

      {/* High-Performance Custom Desktop Cursor (Feature 10) */}
      <CustomCursor />

      {/* Viewport Scroll Progress Bar (Feature 11) */}
      <ScrollProgressBar />

      {/* Sticky Header / Navigation (Feature 12) */}
      <Navbar />

      {/* Primary Page Content Wrapper (T1-F14-04) */}
      <main id="main-content" className="flex-grow pt-20 focus:outline-none">
        {children}
      </main>

      {/* Global Editorial Footer */}
      <Footer />
    </div>
  );
}
```

---

### 6.3 Auxiliary Hook: `src/hooks/useLenis.js`

To enable any component in the tree to trigger programmatic smooth scrolls without relying on raw `window` lookups:

```javascript
/**
 * useLenis Hook
 * Provides direct access to the active Lenis smooth scroll instance
 * and a declarative scrollTo helper.
 */

import { useState, useEffect } from 'react';

export function useLenis() {
  const [lenis, setLenis] = useState(() =>
    typeof window !== 'undefined' ? window.__lenis || null : null
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.__lenis) {
      setLenis(window.__lenis);
      return;
    }

    const interval = setInterval(() => {
      if (window.__lenis) {
        setLenis(window.__lenis);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (target, options = {}) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const element = document.querySelector(target);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return { lenis, scrollTo };
}

export default useLenis;
```

---

## 7. Application Integration: `src/App.jsx`

### 7.1 Architecture & Provider Hierarchy

In Milestone 1, `src/App.jsx` had inline `<header>` and `<footer>` placeholders.  
In Milestone 2, `src/App.jsx` becomes the clean orchestration layer:

```
<ThemeProvider>             <-- Feature 7: theme state ('dark' | 'light')
  <CursorProvider>          <-- Feature 10: cursor variants & labels
    <Preloader />           <-- Feature 9: "A.M." monogram 0-100% curtain
    <Layout>                <-- Feature 14: Lenis + Navbar + Progress + Footer
      <Routes>              <-- Multi-page router routes
        <Route path="/" ... />
        <Route path="/about" ... />
        <Route path="/projects" ... />
        <Route path="/blog" ... />
        <Route path="/contact" ... />
        <Route path="*" ... />
      </Routes>
    </Layout>
  </CursorProvider>
</ThemeProvider>
```

---

### 7.2 Complete Code Implementation: `src/App.jsx`

```jsx
/**
 * Root Application Component
 * Wires ThemeProvider, CursorProvider, Preloader, Layout Shell,
 * and multi-page routing.
 */

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { CursorProvider } from './context/CursorContext';
import Preloader from './components/common/Preloader';
import Layout from './components/layout/Layout';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <CursorProvider>
        {/* Branded "A.M." Monogram Preloader (Feature 9) */}
        <Preloader />

        {/* Master Layout Shell with Lenis Smooth Scrolling (Feature 14) */}
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </CursorProvider>
    </ThemeProvider>
  );
}
```

---

## 8. CSS Refinements (`src/styles/index.css`)

To guarantee that Lenis does not conflict with native CSS smooth scrolling, add these optimizations to `src/styles/index.css`:

```css
/* ==========================================================================
   Lenis Smooth Scroll Resets & Optimizations
   ========================================================================== */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
```

---

## 9. Implementation File Checklist & Verification Plan

### Deliverables Created by Workers:
1. `src/components/layout/Navbar.jsx` (Feature 12)
2. `src/components/layout/MobileMenu.jsx` (Feature 13)
3. `src/components/layout/Footer.jsx` (Editorial Footer)
4. `src/components/layout/Layout.jsx` (Feature 14)
5. `src/hooks/useLenis.js` (Auxiliary Hook)
6. `src/App.jsx` (Root wiring with providers)
7. `src/styles/index.css` (Lenis resets)

### Verification Commands & Expected Results:
- `node tests/e2e/run-all.js`
  - All tests in `Feature 12: Sticky Header & Desktop Hover` pass (`T1-F12-01..05`, `T2-F12-01..05`).
  - All tests in `Feature 13: Responsive Mobile Menu` pass (`T1-F13-01..05`, `T2-F13-01..05`).
  - All tests in `Feature 14: Layout Shell & Lenis Setup` pass (`T1-F14-01..05`, `T2-F14-01..05`).
  - `T3-THEME-03`, `T3-THEME-04`, and `T4-JOURNEY-01` pass.
- `npm run build`
  - Vite generates clean `dist/` bundle with zero syntax or import errors.
