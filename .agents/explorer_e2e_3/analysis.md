# Comprehensive E2E Test Case Matrix: Tier 3 & Tier 4 Specifications

**Document Version**: 1.0.0  
**Author**: `explorer_e2e_3` (Tier 3 & Tier 4 Scenario Explorer)  
**Parent Orchestrator**: `sub_orch_e2e` (`8195fde9-ffb7-42fb-82d9-3a2e281ed169`)  
**Target Subsystem**: `tests/e2e/tier3/` and `tests/e2e/tier4/`  
**Reference Standards**: `ORIGINAL_REQUEST.md`, `PROJECT.md`, `SCOPE.md`

---

## 1. Executive Summary

This document specifies the complete, requirement-driven test cases for:
1. **Tier 3: Cross-Feature Combinations (38 Pairwise Interaction Tests)**: Exhaustive validation of subsystems sharing state, theme context, scroll progress, route transitions, custom cursor positioning, and DOM lifecycle.
2. **Tier 4: Real-World Application Scenarios (6 Multi-Step End-User Journeys)**: Holistic user browsing simulations covering the technical recruiter, engineering director, smartphone mobile candidate, prospective client, design aesthetic reviewer, and direct deep-link visitor.

All test cases are specified as **opaque-box interaction contracts**: they define required initial preconditions, precise step-by-step user actions, subsystem coordination contracts, and deterministic DOM, CSS variable, storage, and behavioral assertions.

---

## 2. Test Suite Matrix Overview

### 2.1 Tier 3: Cross-Feature Combinations Summary (38 Tests)

| Test ID | Category | Primary Features Interacting | Interaction Summary |
|---|---|---|---|
| `T3-THEME-01` | Theme | F7 (Theme Toggle) x F10 (Custom Cursor) | Theme switch updates cursor colors and mix-blend mode without dropping mouse tracking |
| `T3-THEME-02` | Theme | F7 (Theme Toggle) x F27/28 (R3F Canvas) | Theme switch updates 3D scene lighting/colors without WebGL context loss or reload |
| `T3-THEME-03` | Theme | F7 (Theme Toggle) x F12 (Sticky Navbar) | Theme switch adapts navbar glassmorphism background and text contrast seamlessly |
| `T3-THEME-04` | Theme | F7 (Theme Toggle) x F13 (Mobile Menu) | Theme switch preserves open mobile menu drawer while adapting its internal colors |
| `T3-THEME-05` | Theme | F7 (Theme Toggle) x F25 (Contact Form) | Theme switch updates form borders, focus rings, and alert banners while preserving dirty input |
| `T3-THEME-06` | Theme | F6 (Anti-FOUC Script) x F9 (Preloader) | Preloader reflects stored light theme before React hydration with zero dark flash |
| `T3-THEME-07` | Theme | F7 (Theme Toggle) x F18 (Skills Bento Grid) | Bento card glow borders and proficiency bars adapt tokens while preserving scroll progress |
| `T3-THEME-08` | Theme | F7 (Theme Toggle) x F31 (Curtain Transitions) | Route change curtain uses active theme color tokens during entry and exit wipes |
| `T3-ROUTE-01` | Routing | F31 (Curtain Transition) x F14 (Lenis Scroll) | Route change immediately resets scroll to (0, 0) under curtain cover |
| `T3-ROUTE-02` | Routing | F31 (Curtain Transition) x F11 (Scroll Progress) | Progress bar immediately resets to 0% upon route change without lingering value |
| `T3-ROUTE-03` | Routing | F31 (Curtain Transition) x F10 (Custom Cursor) | Cursor variant and text label reset from 'project'/'hover' to 'default' on route exit |
| `T3-ROUTE-04` | Routing | F31 (Curtain Transition) x F13 (Mobile Menu) | Mobile menu link click closes drawer, unlocks body scroll, and launches curtain wipe |
| `T3-ROUTE-05` | Routing | F31 (Curtain Transition) x F27/28 (R3F Scene) | Navigating away from Home unmounts R3F canvas; returning remounts Suspense fallback cleanly |
| `T3-ROUTE-06` | Routing | F31 (Curtain Transition) x F29 (Portrait Tilt) | Navigating away from About removes window mousemove listeners and resets 3D tilt |
| `T3-ROUTE-07` | Routing | F31 (Curtain Transition) x F30 (GSAP Timeline) | GSAP ScrollTrigger instances are killed on route exit and refreshed on route entry |
| `T3-ROUTE-08` | Routing | F3 (SPA Vercel Rewrites) x F31 (Curtain & 404) | Deep links and unknown routes mount directly without infinite curtain hang or broken state |
| `T3-SCROLL-01` | Scroll | F14 (Lenis Scroll) x F11 (Scroll Progress Bar) | Lenis inertial scroll drives top progress bar width from 0% to 100% via GSAP ticker |
| `T3-SCROLL-02` | Scroll | F14 (Lenis Scroll) x F12 (Sticky Navbar) | Lenis scroll past threshold dynamically activates navbar glassmorphism border and background |
| `T3-SCROLL-03` | Scroll | F14 (Lenis Scroll) x F16 (Stats Counter Grid) | Lenis scroll into view fires stats count-up animation once without oscillation double-triggers |
| `T3-SCROLL-04` | Scroll | F14 (Lenis Scroll) x F18 (Bento Proficiency) | Lenis scroll progress across Skills section triggers staggered fills of proficiency bars |
| `T3-SCROLL-05` | Scroll | F14 (Lenis Scroll) x F30 (GSAP Timeline Draw) | Lenis scroll drives SVG path strokeDashoffset continuously along timeline on About |
| `T3-SCROLL-06` | Scroll | F14 (Lenis Scroll) x F17 (Infinite Marquee) | CSS infinite marquee ticker maintains continuous smooth translation during Lenis scroll |
| `T3-SCROLL-07` | Scroll | F14 (Lenis Scroll) x F13 (Mobile Menu Lock) | Opening mobile menu stops Lenis scroll and locks body; closing restores smooth scrolling |
| `T3-SCROLL-08` | Scroll | F14 (Lenis Scroll) x F27 (R3F Hero Scene) | Lenis scroll offset feeds 3D camera/particle parallax smoothly before hero leaves viewport |
| `T3-CURSOR-01` | Cursor | F10 (Custom Cursor) x F19 (Home Projects Teaser) | Hovering teaser card sets cursor to 'project', displays "View", and scales ring |
| `T3-CURSOR-02` | Cursor | F10 (Custom Cursor) x F23 (Projects Full Grid) | Hovering project cards/links displays "Open" / "Code" and clears on unhover |
| `T3-CURSOR-03` | Cursor | F10 (Custom Cursor) x F12 (Desktop Nav Links) | Hovering nav links activates clip-path text reveal and expands cursor ring to 'hover' |
| `T3-CURSOR-04` | Cursor | F10 (Custom Cursor) x F15 (Resume CTA Button) | Hovering primary CTA applies subtle magnetic pull and accent glow to cursor ring |
| `T3-CURSOR-05` | Cursor | F10 (Custom Cursor) x F25 (Contact Form Inputs) | Hovering form inputs shrinks/hides custom cursor to prevent obstruction of text caret |
| `T3-CURSOR-06` | Cursor | F10 (Custom Cursor) x F29 (Portrait 3D Tilt) | Cursor position drives perspective tilt calculations while tracking smoothly over card |
| `T3-CURSOR-07` | Cursor | F10 (Custom Cursor) x F13 (Touch Viewports) | Custom cursor is completely suppressed and hidden on touch devices / viewports < 768px |
| `T3-PRELOAD-01` | Preload | F9 (Preloader) x F15 (Hero Word Stagger) | Preloader holds hero content hidden; exit curtain triggers word stagger entrance sequence |
| `T3-PRELOAD-02` | Preload | F9 (Preloader) x F28 (R3F Suspense Skeleton) | Preloader coordinates with R3F lazy bundle, displaying fallback skeleton if still loading |
| `T3-PRELOAD-03` | Preload | F9 (Preloader) x F14 (Lenis Scroll Lock) | Lenis scrolling is blocked during preloader and immediately unlocked upon preloader exit |
| `T3-DATA-01` | Data | F25 (Contact Form) x F26 (Social Direct Links) | Submitting form does not disable or break adjacent external social links |
| `T3-DATA-02` | Data | F1 (Profile Data) x F4/15/22 (Resume & Timeline) | Developer name, email, education, and resume link match consistently across all pages |
| `T3-DATA-03` | Data | F25 (Contact Form) x F31 (Curtain Transitions) | Navigating away from dirty contact form and returning remounts cleanly without memory leak |
| `T3-DATA-04` | Data | F13 (Mobile Menu) x F7 (Embedded Theme Toggle) | Toggling theme inside mobile drawer updates theme without drawer flicker or close |

---

### 2.2 Tier 4: Real-World Application Scenarios Summary (6 Journeys)

| Scenario ID | Journey Name | Target Persona & Device | Key Workflow Validated |
|---|---|---|---|
| `T4-JOURNEY-01` | The Technical Recruiter Rapid Screening Journey | Technical Recruiter (Desktop 1280px) | Preloader -> Hero -> Resume PDF Download -> Stats Counters -> Projects Preview -> About Education -> Contact Info Copy |
| `T4-JOURNEY-02` | The Senior Engineering Lead Technical Deep-Dive | Senior Staff Engineer (Desktop 1440px) | 3D WebGL Canvas -> Infinite Marquee -> Bento Skills Grid -> Full Projects -> Demo Creds -> Blog Engineering Articles -> Nav Home |
| `T4-JOURNEY-03` | The Mobile Smartphone Recruiter Inspection | Mobile Hiring Manager (Mobile 375px Touch) | Touch Cursor Suppression -> Monogram Nav -> Hamburger Drawer -> About Bio -> Projects Single-Column -> Mobile Contact Form |
| `T4-JOURNEY-04` | Prospective Client / Collaborator Contact & Ingestion | Startup Founder / Client (Desktop 1280px) | Direct Contact Nav -> Input Focus States -> Client Validation Errors -> Valid Submit -> EmailJS Feedback -> Social Verification |
| `T4-JOURNEY-05` | Aesthetic & Dark/Light Mode Comprehensive Exploration | Art Director / UI Designer (Desktop 1280px) | Initial Dark Palette -> Theme Toggle -> Anti-FOUC Persistence -> Light Theme Across All 5 Pages -> Reload Persistence -> Toggle Dark |
| `T4-JOURNEY-06` | Deep-Link Direct Access & Browser History Traversal | Shared Link Visitor (Desktop 1280px) | Direct Load `/projects` -> Internal Nav `/contact` -> Browser History Back -> History Forward -> 404 URL Typo -> Return Home |

---

## 3. Tier 3: Detailed Cross-Feature Interaction Test Specifications

### Category 1: Theme Persistence & Visual Subsystems

#### `T3-THEME-01`: Theme Switcher x Custom Cursor
- **Features Interacting**: F7 (Theme Toggle Switch Component) x F10 (High-Performance Custom Cursor)
- **Prerequisite State**: Initial page load on `/` at 1280px viewport. `localStorage.getItem('am_portfolio_theme')` is null or `'dark'`. Cursor is in `'default'` variant.
- **Action Flow**:
  1. Position mouse at `(500, 300)`. Observe cursor dot and ring positioned at `(500, 300)`.
  2. Click the Theme Toggle switch button in the header.
  3. Observe DOM `documentElement.classList` changing from `dark` to `light`.
  4. Move mouse smoothly to `(600, 350)`.
- **Expected Interaction Contracts**:
  - `ThemeContext` updates state to `'light'` and writes `'light'` to `localStorage`.
  - CSS custom variables re-evaluate: cursor dot/ring adapt their border color or mix-blend mode (e.g., from `border-[#00f0ff]` in dark mode to dark contrast ring in light mode).
  - GSAP `quickTo` x/y ticker listeners on the cursor MUST NOT be destroyed, re-instantiated, or desynchronized.
  - Cursor coordinates must seamlessly track to `(600, 350)` without jumping to `(0, 0)` or lagging.
- **Verification Checks & Assertions**:
  - `assert.strictEqual(document.documentElement.classList.contains('light'), true);`
  - `assert.strictEqual(localStorage.getItem('am_portfolio_theme'), 'light');`
  - `assert.strictEqual(cursorElement.style.display !== 'none', true);`
  - Custom cursor ring element has updated CSS color/token class matching light mode palette.
  - No duplicate cursor DOM nodes created in `document.body`.

#### `T3-THEME-02`: Theme Switcher x R3F 3D Hero Canvas
- **Features Interacting**: F7 (Theme Toggle Switch Component) x F27 (R3F 3D Hero Scene) & F28 (R3F Suspense)
- **Prerequisite State**: Home page `/` loaded with R3F WebGL `<canvas>` actively rendering 3D geometry and particles in dark mode.
- **Action Flow**:
  1. Verify WebGL `<canvas>` element is present and receiving active RAF animation frames.
  2. Trigger Theme Toggle click to switch to light mode.
  3. Wait 300ms for CSS variable transition.
  4. Trigger Theme Toggle click again to switch back to dark mode.
- **Expected Interaction Contracts**:
  - Canvas element remains mounted in DOM without unmounting or remounting the entire Three.js context.
  - Canvas ambient light, clearColor, or particle material reacts to theme change or gracefully retains artistic integrity against background.
  - Zero WebGL context lost events (`webglcontextlost`) fired.
- **Verification Checks & Assertions**:
  - Canvas element reference equality preserved: `const canvas = document.querySelector('canvas'); ... assert.strictEqual(document.querySelector('canvas'), canvas);`
  - No WebGL warning or error in `console.error` or `console.warn`.
  - Animation frame loop continues running smoothly (RAF delta > 0).

#### `T3-THEME-03`: Theme Switcher x Sticky Glassmorphic Navbar
- **Features Interacting**: F7 (Theme Toggle Switch Component) x F12 (Sticky Header & Desktop Hover)
- **Prerequisite State**: Home page `/` scrolled down 200px so navbar has glassmorphic background (`backdrop-blur-md`).
- **Action Flow**:
  1. Inspect sticky navbar element styles/classes in dark mode.
  2. Click Theme Toggle button.
  3. Inspect sticky navbar element styles/classes in light mode.
- **Expected Interaction Contracts**:
  - In dark mode, navbar surface token resolves to dark translucent background (e.g., `rgba(7, 9, 14, 0.8)` or `bg-background/80`).
  - In light mode, navbar surface token smoothly transitions to light translucent background (e.g., `rgba(255, 255, 255, 0.8)` or `bg-surface/80`).
  - Text links transition from light/muted to dark slate with high contrast (meeting WCAG AA >= 4.5:1).
  - Nav logo ("A—M") retains brand visibility.
- **Verification Checks & Assertions**:
  - `navbar.classList.contains('backdrop-blur-md')` remains true.
  - Computed color of nav links has luminance contrast ratio >= 4.5:1 against navbar background in both states.

#### `T3-THEME-04`: Theme Switcher x Mobile Menu Overlay
- **Features Interacting**: F7 (Theme Toggle Switch Component) x F13 (Responsive Mobile Menu)
- **Prerequisite State**: Viewport set to 375px (mobile). Page at `/`. Mobile menu drawer open.
- **Action Flow**:
  1. Open mobile menu overlay by clicking the hamburger toggle.
  2. Verify mobile menu overlay is visible (`aria-hidden="false"` or `role="dialog"`).
  3. Click Theme Toggle located in mobile menu or header.
- **Expected Interaction Contracts**:
  - Mobile menu overlay remains open; drawer does not close prematurely.
  - Drawer background, navigation links, and monogram adapt to light theme colors immediately.
  - Focus state remains on or near the toggle button.
- **Verification Checks & Assertions**:
  - Mobile menu overlay is present in DOM and styled visible (`opacity: 1`, `pointer-events: auto`).
  - `document.documentElement.classList.contains('light')` is true.
  - All mobile navigation links remain clickable.

#### `T3-THEME-05`: Theme Switcher x Contact Form States
- **Features Interacting**: F7 (Theme Toggle Switch Component) x F25 (Contact Page EmailJS Form)
- **Prerequisite State**: Navigated to `/contact`. User has entered "Aadi" into Name, "test@test.com" into Email, and "Hello" into Message. Validation state is clean.
- **Action Flow**:
  1. Verify input field values are populated.
  2. Click Theme Toggle button.
  3. Click Submit button with placeholder credentials to trigger submission feedback state.
- **Expected Interaction Contracts**:
  - Toggling theme DOES NOT clear input values ("Aadi", "test@test.com", "Hello").
  - Input background, border colors, and text color update to light theme variables (`text-primary`, `border-border`).
  - Feedback alert banner (success/info/error) maintains high contrast and readable text in the newly selected theme.
- **Verification Checks & Assertions**:
  - `assert.strictEqual(nameInput.value, 'Aadi');`
  - `assert.strictEqual(emailInput.value, 'test@test.com');`
  - Feedback element text has contrast ratio >= 4.5:1 against its container background.

#### `T3-THEME-06`: Anti-FOUC Head Script x "A.M." Preloader
- **Features Interacting**: F6 (Anti-FOUC Theme Initialization) x F9 ("A.M." Monogram Preloader)
- **Prerequisite State**: `localStorage.setItem('am_portfolio_theme', 'light')`. Page refreshed from scratch (DOM load simulation).
- **Action Flow**:
  1. Execute inline `<head>` script before body elements render.
  2. Preloader element mounts and displays "A.M." monogram and counter.
- **Expected Interaction Contracts**:
  - Inline head script executes synchronously, adding `.light` or setting theme attribute before preloader renders.
  - Preloader container displays light theme background (e.g., `#f8fafc` or `#ffffff`) and dark monogram ("A.M.") immediately.
  - Zero dark-to-light flash of unstyled theme (FOUC).
- **Verification Checks & Assertions**:
  - `assert.strictEqual(document.documentElement.classList.contains('dark'), false);`
  - Preloader background color matches light palette token.

#### `T3-THEME-07`: Theme Switcher x Skills Bento Grid Cards
- **Features Interacting**: F7 (Theme Toggle Switch Component) x F18 (Skills Layer 2: Bento Grid)
- **Prerequisite State**: Home page scrolled to Skills Bento Grid. Proficiency bars have animated to their percentage widths (e.g., React 90%, Node.js 85%).
- **Action Flow**:
  1. Record current inline width or transform of proficiency bars.
  2. Click Theme Toggle button.
- **Expected Interaction Contracts**:
  - Bento card background and border tokens adapt to the new theme (`bg-surface`, `border-border`).
  - Proficiency bars retain their filled widths (e.g. 90%, 85%) without resetting to 0% or replaying animation from scratch.
  - Accent colors (cyan/gold) retain visual pop.
- **Verification Checks & Assertions**:
  - Proficiency bar width remains `90%` (or matching style attribute).
  - Bento card elements remain stable in grid layout without layout shifts.

#### `T3-THEME-08`: Theme Switcher x Curtain Page Transitions
- **Features Interacting**: F7 (Theme Toggle Switch Component) x F31 (Framer Motion Curtain Transitions)
- **Prerequisite State**: User on `/about`. Theme toggled to `'light'`.
- **Action Flow**:
  1. Click navigation link to `/projects`.
  2. Observe Framer Motion curtain element mounting and animating across viewport (`initial -> animate -> exit`).
- **Expected Interaction Contracts**:
  - Curtain transition overlay utilizes the current active theme color token (light mode curtain color rather than stale hardcoded dark black).
  - Curtain smoothly wipes in and out; new page renders with light theme already active.
- **Verification Checks & Assertions**:
  - Curtain element background color matches active theme token.
  - Destination page `/projects` mounts with `document.documentElement.classList.contains('light') === true`.

---

### Category 2: Routing, Page Transitions & Lifecycle

#### `T3-ROUTE-01`: Curtain Page Transition x Lenis Scroll Position Restoration
- **Features Interacting**: F31 (Framer Motion Curtain Transitions) x F14 (Layout Shell & Lenis Setup)
- **Prerequisite State**: Home page `/` scrolled down to `scrollY = 1800px` (Skills/Projects section).
- **Action Flow**:
  1. Click "About" link in sticky navbar.
  2. Curtain begins slide-in wipe animation covering the viewport.
  3. Route completes transition to `/about`.
  4. Curtain slides out revealing the new page.
- **Expected Interaction Contracts**:
  - Under curtain cover, `lenis.scrollTo(0, { immediate: true })` or `window.scrollTo(0, 0)` is invoked.
  - When curtain exits, `/about` is viewed starting from top (`scrollY === 0`).
  - No visual flicker of `/about` scrolled at 1800px before jumping to top.
- **Verification Checks & Assertions**:
  - `assert.strictEqual(window.scrollY, 0);`
  - Lenis internal scroll target is `0`.
  - About page hero section is in view.

#### `T3-ROUTE-02`: Curtain Page Transition x Viewport Scroll Progress Bar
- **Features Interacting**: F31 (Framer Motion Curtain Transitions) x F11 (Viewport Scroll Progress Bar)
- **Prerequisite State**: User at bottom of `/` with top scroll progress bar filled to 100%.
- **Action Flow**:
  1. Click "Projects" navigation link.
  2. Curtain transition triggers.
  3. Route changes to `/projects`.
- **Expected Interaction Contracts**:
  - Scroll progress bar resets immediately to `0%` (or `scaleX(0)`) as the new route mounts.
  - Progress bar does not stay stuck at 100% on the newly loaded page.
- **Verification Checks & Assertions**:
  - `progressBar.style.transform` or `progressBar.style.width` evaluates to 0% on route mount.

#### `T3-ROUTE-03`: Curtain Page Transition x Custom Cursor State Reset
- **Features Interacting**: F31 (Framer Motion Curtain Transitions) x F10 (High-Performance Custom Cursor)
- **Prerequisite State**: User on `/` hovering over a project teaser card; `cursorVariant` is `'project'` and `cursorText` is `'View'`.
- **Action Flow**:
  1. User clicks the card or nav link to trigger navigation to `/projects`.
  2. Curtain wipe animates across viewport.
  3. Mouse rests at same screen coordinate on the new page (outside interactive cards).
- **Expected Interaction Contracts**:
  - Route change cleanup resets `CursorContext` state: `cursorVariant` returns to `'default'` and `cursorText` returns to `''`.
  - Cursor ring scales back to standard size; "View" label disappears.
- **Verification Checks & Assertions**:
  - `assert.strictEqual(cursorLabelElement.textContent.trim(), '');`
  - Cursor ring class matches `'default'` variant.

#### `T3-ROUTE-04`: Curtain Page Transition x Mobile Menu Auto-Close
- **Features Interacting**: F31 (Framer Motion Curtain Transitions) x F13 (Responsive Mobile Menu)
- **Prerequisite State**: Viewport at 375px. Mobile menu open with full-screen overlay.
- **Action Flow**:
  1. Tap "Contact" link inside the mobile menu drawer.
- **Expected Interaction Contracts**:
  - Mobile menu state closes (`isOpen = false`).
  - Body scroll lock is released.
  - Page transition curtain triggers wipe to `/contact`.
  - Mobile menu drawer does not obstruct the newly loaded page.
- **Verification Checks & Assertions**:
  - Mobile menu overlay element has closed / unmounted / hidden state.
  - `window.location.pathname === '/contact'`.
  - Body `overflow` style is restored to normal (`auto` or `visible`).

#### `T3-ROUTE-05`: Curtain Page Transition x R3F Hero Scene Unmount / Remount
- **Features Interacting**: F31 (Framer Motion Curtain Transitions) x F27 (R3F 3D Hero Scene) & F28 (R3F Suspense)
- **Prerequisite State**: Home page `/` with R3F canvas running.
- **Action Flow**:
  1. Navigate to `/about` via nav link.
  2. Wait for transition to finish.
  3. Navigate back to `/` via nav logo ("A—M").
- **Expected Interaction Contracts**:
  - Navigating to `/about` unmounts Three.js canvas, disposes geometries/materials, and cancels RAF loops.
  - Navigating back to `/` loads lazy R3F component via `<Suspense fallback={<SceneFallback />}>`.
  - Canvas mounts cleanly with zero WebGL errors or memory leaks.
- **Verification Checks & Assertions**:
  - Canvas element is not in DOM while on `/about`.
  - Canvas element is present when returned to `/`.
  - Console has zero WebGL or Three.js disposal warnings.

#### `T3-ROUTE-06`: Curtain Page Transition x About Portrait 3D Parallax Tilt
- **Features Interacting**: F31 (Framer Motion Curtain Transitions) x F29 (About Portrait 3D Parallax Tilt)
- **Prerequisite State**: User on `/about`, mouse actively hovering over portrait element generating 3D perspective tilt (`transform: perspective(...) rotateX(...) rotateY(...)`).
- **Action Flow**:
  1. While mouse is over portrait, click "Blog" link in navbar.
  2. Wait for transition to complete.
- **Expected Interaction Contracts**:
  - Portrait component unmounts; event listeners attached to `window` or `document` for mousemove/mouseleave are removed.
  - No uncaught exceptions when mouse moves on `/blog`.
- **Verification Checks & Assertions**:
  - Window mousemove listener count does not leak.
  - Moving mouse on `/blog` does not reference unmounted portrait DOM elements.

#### `T3-ROUTE-07`: Curtain Page Transition x GSAP Timeline ScrollTrigger Lifecycle
- **Features Interacting**: F31 (Framer Motion Curtain Transitions) x F30 (GSAP Timeline Line Draw Animation)
- **Prerequisite State**: User on `/about`. GSAP ScrollTrigger for SVG vertical line is registered.
- **Action Flow**:
  1. Navigate to `/projects`.
  2. Navigate back to `/about`.
- **Expected Interaction Contracts**:
  - ScrollTrigger instance on `/about` is killed (`scrollTrigger.kill()`) upon unmount.
  - Upon remounting `/about`, ScrollTrigger is re-created and `ScrollTrigger.refresh()` is called to recalibrate positions with Lenis scroll height.
- **Verification Checks & Assertions**:
  - No duplicate ScrollTrigger instances registered with identical IDs.
  - Scrolling `/about` after remount successfully draws SVG line `strokeDashoffset`.

#### `T3-ROUTE-08`: SPA Vercel Rewrite Direct Deep-Link x Curtain & 404 Guard
- **Features Interacting**: F3 (Single-Page App Vercel Config) x F31 (Framer Motion Curtain Transitions) & NotFoundPage
- **Prerequisite State**: Browser navigates directly via URL to `/projects` and then `/invalid-route-xyz`.
- **Action Flow**:
  1. Simulate Vercel rewrite serving `/index.html` on direct visit to `/projects`.
  2. Simulate direct visit to `/invalid-route-xyz`.
- **Expected Interaction Contracts**:
  - `/projects` renders project cards without infinite curtain hang.
  - `/invalid-route-xyz` matches `*` route, rendering `NotFoundPage` with "404" heading and "Return Home" CTA.
  - Clicking "Return Home" animates curtain transition to `/`.
- **Verification Checks & Assertions**:
  - `/projects` DOM contains project cards (Spendly, Business Management).
  - `/invalid-route-xyz` DOM contains 404 heading and link to `/`.

---

### Category 3: Smooth Scrolling & Inertial Coordination

#### `T3-SCROLL-01`: Lenis Smooth Scroll x Scroll Progress Bar Synchronization
- **Features Interacting**: F14 (Layout Shell & Lenis Setup) x F11 (Viewport Scroll Progress Bar)
- **Prerequisite State**: Home page `/` at initial top scroll (`scrollY = 0`).
- **Action Flow**:
  1. Dispatch scroll event or simulate Lenis smooth scroll to `scrollY = 500px`.
  2. Dispatch scroll event to maximum page height (`document.documentElement.scrollHeight - window.innerHeight`).
  3. Scroll back to top (`scrollY = 0`).
- **Expected Interaction Contracts**:
  - Lenis scroll ticks update progress bar width/scale in real time via GSAP ticker or RAF.
  - At top: progress is 0%.
  - At max scroll: progress is 100%.
  - No lag or jump between Lenis position and bar width.
- **Verification Checks & Assertions**:
  - At scroll 0: progress bar style width/scale is 0 (or 0%).
  - At maximum scroll: progress bar style width/scale is 1 (or 100%).

#### `T3-SCROLL-02`: Lenis Smooth Scroll x Sticky Header Glassmorphism
- **Features Interacting**: F14 (Layout Shell & Lenis Setup) x F12 (Sticky Header & Desktop Hover)
- **Prerequisite State**: Home page `/` at `scrollY = 0`. Navbar has transparent or subtle background.
- **Action Flow**:
  1. Scroll down smoothly via Lenis past 80px threshold.
  2. Scroll back up to 0px.
- **Expected Interaction Contracts**:
  - When `scrollY > 80px`, header acquires `.scrolled` state (glassmorphic backdrop blur, border-b, and background opacity).
  - When returning to `scrollY <= 80px`, header smoothly returns to initial state.
- **Verification Checks & Assertions**:
  - Header has sticky position: `position: sticky` or `position: fixed; top: 0`.
  - Header class list reflects scrolled state when `scrollY > 80`.

#### `T3-SCROLL-03`: Lenis Smooth Scroll x Animated Stats Counter Trigger
- **Features Interacting**: F14 (Layout Shell & Lenis Setup) x F16 (Animated Stats Counter Grid)
- **Prerequisite State**: Home page `/` at top. Stats counters are not yet in viewport.
- **Action Flow**:
  1. Scroll down smoothly via Lenis until Stats Counter section enters viewport.
  2. Wait 1000ms for count-up tween animation to finish.
  3. Scroll up 50px and down 50px (scroll oscillation).
- **Expected Interaction Contracts**:
  - ScrollTrigger fires count-up animation upon entry.
  - Values increment to: "2", "500+", "MERN Stack", "India".
  - Counters do NOT reset or re-trigger on micro-scroll movements.
- **Verification Checks & Assertions**:
  - DOM contains text "2" or "2 Projects", "500+", "MERN Stack", "India".
  - Text remains static after animation completes.

#### `T3-SCROLL-04`: Lenis Smooth Scroll x Bento Grid Proficiency Bar Fill
- **Features Interacting**: F14 (Layout Shell & Lenis Setup) x F18 (Skills Layer 2: Bento Grid)
- **Prerequisite State**: Home page `/` at top. Bento grid cards in unviewed state.
- **Action Flow**:
  1. Scroll down via Lenis to Skills section.
  2. Observe proficiency bars in Frontend (React, JavaScript), Backend (Node.js, Express), Database (MongoDB), Tools (Git, Vite).
- **Expected Interaction Contracts**:
  - As each card enters viewport via Lenis scroll, proficiency indicator fills from 0% to specified target.
  - Bars remain filled when scrolling within section.
- **Verification Checks & Assertions**:
  - Proficiency indicators have non-zero percentage widths.
  - All 4 domain cards (Frontend, Backend, Database, Tools) render skill labels.

#### `T3-SCROLL-05`: Lenis Smooth Scroll x About Timeline SVG Line Draw
- **Features Interacting**: F14 (Layout Shell & Lenis Setup) x F30 (GSAP Timeline Line Draw Animation)
- **Prerequisite State**: About page `/about` loaded. Vertical timeline SVG is in DOM with initial `strokeDasharray` set to path length and `strokeDashoffset` equal to path length.
- **Action Flow**:
  1. Scroll down through Experience & Education timeline section.
  2. Observe SVG path `strokeDashoffset`.
- **Expected Interaction Contracts**:
  - Lenis scroll progress smoothly decreases `strokeDashoffset` towards 0 as user scrolls down, visually "drawing" the line through timeline nodes.
- **Verification Checks & Assertions**:
  - `strokeDashoffset` at section start > `strokeDashoffset` at section end.
  - Timeline nodes (e.g. Bharati Vidyapeeth College of Engineering) illuminate as line reaches them.

#### `T3-SCROLL-06`: Lenis Smooth Scroll x Skills Infinite Marquee Ticker
- **Features Interacting**: F14 (Layout Shell & Lenis Setup) x F17 (Skills Layer 1: Infinite Marquee)
- **Prerequisite State**: Home page `/` Skills section. Marquee ticker is actively animating horizontally.
- **Action Flow**:
  1. Initiate vigorous vertical Lenis scroll.
  2. Stop vertical scrolling abruptly.
- **Expected Interaction Contracts**:
  - CSS or Framer Motion horizontal marquee ticker continues running smoothly without pause, stutter, or reverse jumping caused by vertical scroll velocity.
- **Verification Checks & Assertions**:
  - Marquee track element has continuous CSS animation or transform updating.
  - Tech badges (React, Node.js, MongoDB, Express, Tailwind, Git, Vite, JavaScript) are duplicated for infinite loop effect.

#### `T3-SCROLL-07`: Lenis Smooth Scroll x Mobile Menu Body Scroll Lock
- **Features Interacting**: F14 (Layout Shell & Lenis Setup) x F13 (Responsive Mobile Menu)
- **Prerequisite State**: Viewport at 375px (mobile). Page scrolled down 300px.
- **Action Flow**:
  1. Open mobile menu drawer.
  2. Attempt to scroll the page.
  3. Close mobile menu drawer.
- **Expected Interaction Contracts**:
  - Opening menu calls `lenis.stop()` and applies `overflow: hidden` to body; page does not scroll behind menu.
  - Closing menu calls `lenis.start()` and removes `overflow: hidden`; page remains at 300px and can be scrolled again.
- **Verification Checks & Assertions**:
  - When menu is open, `document.body.style.overflow === 'hidden'`.
  - When menu is closed, scrolling resumed without scroll position reset.

#### `T3-SCROLL-08`: Lenis Smooth Scroll x R3F Hero Scene Parallax
- **Features Interacting**: F14 (Layout Shell & Lenis Setup) x F27 (R3F 3D Hero Scene)
- **Prerequisite State**: Home page `/` hero section in view.
- **Action Flow**:
  1. Scroll down 300px from top.
- **Expected Interaction Contracts**:
  - Lenis scroll position feeds camera position or rotation offset to the R3F canvas smoothly.
  - 3D scene creates depth parallax effect without WebGL render bottlenecks.
- **Verification Checks & Assertions**:
  - 3D canvas stays rendered and responsive during initial scroll.

---

### Category 4: Custom Cursor, Pointer & Micro-Interactions

#### `T3-CURSOR-01`: Custom Cursor x Home Projects Teaser Hover Cards
- **Features Interacting**: F10 (High-Performance Custom Cursor) x F19 (Home Projects Teaser Grid)
- **Prerequisite State**: Desktop viewport (1280px). Mouse at `(100, 100)` in `'default'` state.
- **Action Flow**:
  1. Move mouse over Spendly project card.
  2. Move mouse off the card to whitespace.
- **Expected Interaction Contracts**:
  - On mouse enter: `cursorVariant` becomes `'project'`, cursor text becomes `'View'` or `'Open'`, cursor ring expands with glowing accent border.
  - On mouse leave: `cursorVariant` reverts to `'default'`, cursor text clears, ring returns to normal size.
- **Verification Checks & Assertions**:
  - During hover: cursor element has project variant class and text label contains "View".
  - After unhover: cursor element label is empty string.

#### `T3-CURSOR-02`: Custom Cursor x Projects Full Grid Links
- **Features Interacting**: F10 (High-Performance Custom Cursor) x F23 (Projects Full Grid Page)
- **Prerequisite State**: Projects page `/projects` loaded.
- **Action Flow**:
  1. Hover over "Live Demo" button on Business Management card.
  2. Hover over "GitHub" link on Spendly card.
- **Expected Interaction Contracts**:
  - Live demo hover sets cursor to `'hover'` or `'project'` with "Demo" or "Open" indicator.
  - GitHub link hover sets cursor to `'hover'` with "Code" indicator.
- **Verification Checks & Assertions**:
  - Cursor reactively updates state for each interactive anchor.

#### `T3-CURSOR-03`: Custom Cursor x Desktop Nav Links Clip-Path Reveal
- **Features Interacting**: F10 (High-Performance Custom Cursor) x F12 (Sticky Header & Desktop Hover)
- **Prerequisite State**: Desktop viewport. Mouse over header area.
- **Action Flow**:
  1. Hover over "About" link in desktop navbar.
- **Expected Interaction Contracts**:
  - Nav link triggers clip-path slide reveal text hover animation.
  - Cursor transforms to `'hover'` variant (enlarged ring, semi-transparent backdrop or blend mode).
- **Verification Checks & Assertions**:
  - Nav link has active hover styles.
  - Cursor ring scales up by factor >= 1.5x.

#### `T3-CURSOR-04`: Custom Cursor x Hero Resume CTA Button
- **Features Interacting**: F10 (High-Performance Custom Cursor) x F15 (Home Hero Content & Word Stagger)
- **Prerequisite State**: Home page `/` hero section.
- **Action Flow**:
  1. Hover mouse over "Download Resume" CTA button.
- **Expected Interaction Contracts**:
  - Cursor ring acquires cyan accent glow (`box-shadow` or border `#00f0ff`).
  - Button exhibits subtle scale/glow reaction.
- **Verification Checks & Assertions**:
  - CTA button has hover class active.
  - Cursor variant is `'hover'`.

#### `T3-CURSOR-05`: Custom Cursor x Contact Form Interactive Inputs
- **Features Interacting**: F10 (High-Performance Custom Cursor) x F25 (Contact Page EmailJS Form)
- **Prerequisite State**: Contact page `/contact`. Mouse moving towards Message `<textarea>`.
- **Action Flow**:
  1. Move mouse inside `<textarea>`.
- **Expected Interaction Contracts**:
  - Custom cursor either hides, shrinks to tiny dot, or uses `pointer-events-none` so native text selection I-beam caret is fully visible and usable.
- **Verification Checks & Assertions**:
  - `textarea` remains focused and editable on click.
  - Custom cursor does not block text selection or clicking.

#### `T3-CURSOR-06`: Custom Cursor x About Portrait 3D Parallax Tilt
- **Features Interacting**: F10 (High-Performance Custom Cursor) x F29 (About Portrait 3D Parallax Tilt)
- **Prerequisite State**: About page `/about`. Mouse moves over portrait placeholder.
- **Action Flow**:
  1. Move mouse to top-left corner of portrait card.
  2. Move mouse to bottom-right corner of portrait card.
- **Expected Interaction Contracts**:
  - Portrait element computes dynamic 3D tilt transform (e.g. `perspective(1000px) rotateX(8deg) rotateY(-8deg)`).
  - Custom cursor continues tracking smoothly across the card with appropriate z-index layering above the card.
- **Verification Checks & Assertions**:
  - Card style includes dynamic `rotateX` and `rotateY` transforms.
  - Cursor dot remains at exact mouse coordinates.

#### `T3-CURSOR-07`: Custom Cursor x Touch / Coarse Pointer Suppression
- **Features Interacting**: F10 (High-Performance Custom Cursor) x F13 (Responsive Mobile Menu / Touch Devices)
- **Prerequisite State**: Emulated touch device or viewport width 375px (`pointer: coarse`).
- **Action Flow**:
  1. Load page `/` under mobile / touch emulation.
  2. Dispatch touchstart and touchmove events.
- **Expected Interaction Contracts**:
  - Custom cursor is hidden (`display: none` or unmounted).
  - No phantom cursor circle follows the touch point.
- **Verification Checks & Assertions**:
  - `window.matchMedia('(pointer: coarse)').matches` suppresses cursor rendering.
  - Cursor DOM element has `display: none` or is absent.

---

### Category 5: Preloader, Mount Coordination & Initialization

#### `T3-PRELOAD-01`: Preloader Monogram Exit x Home Hero Word Stagger Reveal
- **Features Interacting**: F9 ("A.M." Monogram Preloader) x F15 (Home Hero Content & Word Stagger)
- **Prerequisite State**: Cold page load on `/`.
- **Action Flow**:
  1. Preloader mounts showing "A.M." monogram and progress counter (0% -> 100%).
  2. Preloader curtain slides upward/outward upon 100%.
- **Expected Interaction Contracts**:
  - Hero headline ("Aadinath Magar") and subtitle words remain hidden (`opacity: 0`) while preloader is active.
  - Once preloader exit completes, Framer Motion word-stagger animation triggers, revealing words sequentially.
- **Verification Checks & Assertions**:
  - Hero text elements animate to `opacity: 1`.
  - Headline contains "Aadinath Magar" and subtitle contains "Full-Stack Developer".

#### `T3-PRELOAD-02`: Preloader Lifecycle x R3F Suspense Skeleton
- **Features Interacting**: F9 ("A.M." Monogram Preloader) x F28 (R3F Code-Splitting & Suspense)
- **Prerequisite State**: Cold load on slow network connection simulation.
- **Action Flow**:
  1. Preloader completes countdown.
  2. 3D WebGL bundle chunk is still pending or compiling.
- **Expected Interaction Contracts**:
  - `<SceneFallback>` skeleton loader is visible inside hero canvas container.
  - No uncaught Suspense errors; page layout does not collapse.
  - Once bundle loads, canvas seamlessly replaces skeleton.
- **Verification Checks & Assertions**:
  - Fallback element rendered with accessible loading state.
  - Layout maintains hero height (`min-h-screen` or `h-[100vh]`).

#### `T3-PRELOAD-03`: Preloader Lifecycle x Lenis Initial Scroll Lock
- **Features Interacting**: F9 ("A.M." Monogram Preloader) x F14 (Layout Shell & Lenis Setup)
- **Prerequisite State**: Initial page load.
- **Action Flow**:
  1. Attempt to scroll mouse wheel during preloader countdown.
  2. Wait for preloader curtain exit.
  3. Scroll mouse wheel after exit.
- **Expected Interaction Contracts**:
  - Wheel events during preloader do not scroll the page (`lenis.stop()` active).
  - Immediately following preloader exit, `lenis.start()` is called and scrolling works normally.
- **Verification Checks & Assertions**:
  - `window.scrollY === 0` throughout preloader phase.
  - Scroll position increments after preloader exit.

---

### Category 6: Form, Social & Data Integrity

#### `T3-DATA-01`: Contact Form Submission x Social Direct Links Integration
- **Features Interacting**: F25 (Contact Page EmailJS Form) x F26 (Contact Social & Direct Links)
- **Prerequisite State**: Contact page `/contact`. Form is in submitting state.
- **Action Flow**:
  1. Submit form.
  2. Simultaneously inspect and click adjacent GitHub and LinkedIn direct links.
- **Expected Interaction Contracts**:
  - Submitting form does not disable or interfere with social links.
  - External links have `target="_blank"` and `rel="noopener noreferrer"`.
  - URLs match verified profiles: `https://github.com/aadinath29` and `https://www.linkedin.com/in/aadinath-magar-profile`.
- **Verification Checks & Assertions**:
  - `githubLink.href === 'https://github.com/aadinath29'`.
  - `githubLink.target === '_blank'`.
  - `linkedinLink.href === 'https://www.linkedin.com/in/aadinath-magar-profile'`.

#### `T3-DATA-02`: Developer Profile Data Integrity x Resume & Timeline
- **Features Interacting**: F1 (Real Developer Profile & Data) x F4 (Resume PDF) & F15 (Hero) & F22 (Timeline)
- **Prerequisite State**: Data module loaded.
- **Action Flow**:
  1. Inspect `src/data/developer.js`, `timeline.js`, and rendered DOM elements across `/`, `/about`, and `/contact`.
- **Expected Interaction Contracts**:
  - Developer name is strictly "Aadinath Magar" (brand "Aadi").
  - Email is strictly "aadinathbmagar75@gmail.com".
  - Phone is strictly "+91 92090 17621".
  - College is strictly "Bharati Vidyapeeth College of Engineering" (BVCOE).
  - Resume points to `/Aadi_Resume-04-09-2026.pdf`.
- **Verification Checks & Assertions**:
  - Exact string matches across all components; zero generic placeholder text ("John Doe", "example.com").

#### `T3-DATA-03`: Contact Form Dirty State x Curtain Page Transition
- **Features Interacting**: F25 (Contact Page EmailJS Form) x F31 (Framer Motion Curtain Transitions)
- **Prerequisite State**: On `/contact` with dirty unsaved input in form fields.
- **Action Flow**:
  1. Click "About" in navbar.
  2. Curtain wipe executes to `/about`.
  3. Click "Contact" in navbar to return.
- **Expected Interaction Contracts**:
  - Component unmounts cleanly during transition without throwing "Can't perform a React state update on an unmounted component".
  - Returning to `/contact` remounts fresh form with clean initial state.
- **Verification Checks & Assertions**:
  - No unmount memory leak warning in console.
  - Contact form fields are re-initialized cleanly.

#### `T3-DATA-04`: Mobile Menu x Embedded Theme Switcher
- **Features Interacting**: F13 (Responsive Mobile Menu) x F7 (Theme Toggle Switch Component)
- **Prerequisite State**: Mobile viewport (375px). Mobile menu overlay open.
- **Action Flow**:
  1. Tap Theme Toggle button located inside the mobile drawer.
- **Expected Interaction Contracts**:
  - Theme switches cleanly (dark <-> light).
  - Mobile drawer does NOT re-trigger entrance animation or close prematurely.
  - Link texts within drawer update contrast immediately.
- **Verification Checks & Assertions**:
  - Drawer remains open with `isOpen === true`.
  - `document.documentElement` class list reflects new theme.

---

## 4. Tier 4: Real-World Application Scenario Specifications (End-User Journeys)

### Scenario `T4-JOURNEY-01`: The Technical Recruiter Rapid Screening Journey

- **Target Persona**: Senior Technical Recruiter at an engineering firm evaluating Aadinath Magar for a Full-Stack MERN Software Engineer position.
- **Device & Environment**: Desktop (1280x800), standard mouse pointer, dark mode default.
- **User Intent**: Validate developer identity, download official resume PDF, evaluate key shipped metrics (500+ apps, 2 projects, MERN), inspect live projects (Spendly & Business Management), check education history, and retrieve direct contact channels.
- **Multi-Step Action Sequence (10 Steps)**:
  1. **Step 1 (Landing & Brand Recognition)**: Recruiter opens root URL `/`. Observes "A.M." monogram preloader and loading counter. Curtain wipes upward to reveal the hero section.
  2. **Step 2 (Candidate Hero Audit)**: Reads editorial Playfair Display headline "Aadinath Magar" and subtitle "Full-Stack Developer". Confirms location ("India" / "Navi Mumbai").
  3. **Step 3 (Resume Download Action)**: Clicks primary "Download Resume" CTA button in the hero. Verifies link attribute points to `/Aadi_Resume-04-09-2026.pdf` (or `public/Aadi_Resume-04-09-2026.pdf`), has `download` or `target="_blank"`, and asset file exists.
  4. **Step 4 (Stats Counter Screening)**: Scrolls down via Lenis to Stats section. Observes counters animating into view: "2 Projects Shipped", "500+ Job Applications", "MERN Stack", "India".
  5. **Step 5 (Projects Teaser Evaluation)**: Scrolls down to Home Projects preview. Inspects Spendly card (expense tracker) and Business Management card. Verifies links to live demo (`https://spendly-sable-delta.vercel.app/` and `https://business-managment-alpha.vercel.app/login`) and GitHub repos (`https://github.com/aadinath29/spendly-`, `https://github.com/aadinath29/BusinessManagment-`).
  6. **Step 6 (Navigation to About)**: Clicks "About" link in sticky navbar. Framer Motion curtain transitions from `/` to `/about`. Lenis scroll resets immediately to top `(0, 0)`.
  7. **Step 7 (Bio & Education Review)**: Reads verified bio narrative explaining Aadi's full-stack specialization, MERN stack, and agentic AI focus. Scrolls down to Experience/Education timeline; verifies Bharati Vidyapeeth College of Engineering (BVCOE) education entry.
  8. **Step 8 (Navigation to Contact)**: Clicks "Contact" link in navbar. Curtain transition navigates to `/contact`.
  9. **Step 9 (Contact Channels Retrieval)**: Copies direct email (`aadinathbmagar75@gmail.com`) and phone (`+91 92090 17621`). Inspects official LinkedIn profile link (`https://www.linkedin.com/in/aadinath-magar-profile`).
  10. **Step 10 (Session Cleanliness)**: Recruiter completes review. Verifies zero console errors, zero uncaught promise rejections, and zero 404 broken assets throughout entire browsing journey.
- **Verification Checks & Assertions**:
  - `assert.strictEqual(document.title.includes('Aadinath Magar') || document.title.includes('Aadi'), true);`
  - `assert.strictEqual(resumeLink.getAttribute('href').includes('Resume'), true);`
  - `assert.strictEqual(statsGrid.textContent.includes('500+'), true);`
  - `assert.strictEqual(window.location.pathname, '/contact');`
  - `assert.strictEqual(errorLog.length, 0);`

---

### Scenario `T4-JOURNEY-02`: The Senior Engineering Lead Technical Deep-Dive Journey

- **Target Persona**: Staff / Principal Software Engineer conducting technical peer review of architecture, 3D graphics, motion performance, and frontend polish.
- **Device & Environment**: Desktop (1440x900), high-refresh display simulation (120fps GSAP ticker), dark mode.
- **User Intent**: Audit R3F 3D WebGL scene, test Lenis smooth scroll inertia, verify skills marquee & bento grid proficiencies, examine full projects page with demo credentials, inspect technical blog articles, and test return route.
- **Multi-Step Action Sequence (10 Steps)**:
  1. **Step 1 (3D Graphics Audit)**: Loads `/`. Verifies R3F `<canvas>` renders rotating abstract geometry and particle field without blocking initial paint (Suspense fallback skeleton verification).
  2. **Step 2 (Marquee Ticker Smoothness)**: Scrolls down to Skills layer 1; audits infinite horizontal marquee ticker displaying React, Node.js, MongoDB, Express, Tailwind, Git, Vite, JavaScript badges with seamless CSS/Framer animation.
  3. **Step 3 (Bento Grid Proficiency Inspection)**: Scrolls to Skills layer 2 bento grid. Audits 4 asymmetric domain cards (Frontend, Backend, Database, Tools) and checks that proficiency bars animate to their target widths.
  4. **Step 4 (Navigation to Projects Full Grid)**: Clicks "Projects" in desktop navbar. Full-screen curtain wipe executes; Lenis scroll target resets to 0.
  5. **Step 5 (Full Projects Inspection)**: On `/projects`, audits Spendly and Business Management cards. Verifies technology pills (React, Node, Express, MongoDB).
  6. **Step 6 (Demo Credentials Verification)**: Audits Business Management card demo credentials badge (email/password helper for test logins) and copy button.
  7. **Step 7 (Cursor Interaction on Project Cards)**: Moves custom cursor over project cards. Verifies cursor scales, changes variant to `'project'`, and displays "View" / "Open" badge text.
  8. **Step 8 (Navigation to Blog Page)**: Clicks "Blog" in navbar. Curtain wipe transitions to `/blog`.
  9. **Step 9 (Blog Cards & Reading Time Audit)**: Verifies 4 engineering articles ("Building with MERN Stack", "React Performance Tips", etc.) with tags, publication date formatting, and reading times (e.g., "5 min read").
  10. **Step 10 (Logo Navigation Back to Home)**: Clicks "A—M" monogram logo in header. Curtain wipe returns to `/`. R3F 3D canvas re-initializes cleanly without WebGL context error.
- **Verification Checks & Assertions**:
  - `assert.ok(document.querySelector('canvas'));`
  - `assert.strictEqual(document.querySelectorAll('.bento-card, [data-bento]').length >= 4, true);`
  - `assert.strictEqual(window.location.pathname, '/');`
  - Zero memory leak warnings recorded.

---

### Scenario `T4-JOURNEY-03`: The Mobile Smartphone Recruiter Inspection Journey (375px Viewport)

- **Target Persona**: Hiring manager or recruiter reviewing candidate portfolio on an iPhone / Android smartphone while on the move.
- **Device & Environment**: Mobile Viewport (375x667), touch pointer (`pointer: coarse`), portrait mode.
- **User Intent**: Verify mobile responsiveness, touch navigation, mobile hamburger drawer, touch cursor suppression, readable typography without horizontal overflow, and mobile contact form usability.
- **Multi-Step Action Sequence (10 Steps)**:
  1. **Step 1 (Mobile Viewport Boot & Touch Guard)**: Loads `/` at 375px width. Confirms preloader monogram is cleanly centered. Confirms custom desktop cursor is completely hidden (`display: none` or unmounted).
  2. **Step 2 (Sticky Header & Hamburger Presence)**: Verifies mobile sticky header displays "A—M" logo and hamburger button; desktop horizontal nav link list is hidden (`hidden md:flex`).
  3. **Step 3 (Hamburger Menu Open)**: Taps hamburger button. Fullscreen mobile menu overlay animates open with staggered entrance for navigation links (Home, About, Projects, Blog, Contact).
  4. **Step 4 (Mobile Scroll Lock)**: Confirms background page scrolling is locked (`overflow: hidden` on body or `lenis.stop()`).
  5. **Step 5 (Mobile Nav to About)**: Taps "About" link in mobile menu. Mobile menu closes, body scroll lock releases, and curtain wipe transitions to `/about`.
  6. **Step 6 (Mobile About Layout Inspection)**: Verifies Playfair Display editorial heading scales down to fit 375px without horizontal scrolling (`overflow-x: hidden`). Inspects portrait card and education timeline stacked vertically.
  7. **Step 7 (Mobile Nav to Projects)**: Opens hamburger menu, taps "Projects". Curtain wipe transitions to `/projects`.
  8. **Step 8 (Single-Column Project Card Stack)**: Verifies project cards stack in single column. Demo and GitHub links have comfortable touch targets (>= 44x44px per Apple Human Interface Guidelines).
  9. **Step 9 (Mobile Nav to Contact)**: Opens hamburger menu, taps "Contact". Page transitions to `/contact`.
  10. **Step 10 (Mobile Form Usability)**: Form inputs (Name, Email, Message) span full width with appropriate padding. Direct call button (`tel:+919209017621`) and direct email (`mailto:aadinathbmagar75@gmail.com`) trigger device action protocols.
- **Verification Checks & Assertions**:
  - `assert.strictEqual(document.documentElement.scrollWidth <= 375, true);` (No horizontal scroll leak)
  - `assert.strictEqual(window.getComputedStyle(cursorElement).display, 'none');`
  - `assert.strictEqual(hamburgerButton.getAttribute('aria-expanded'), 'false');` after navigation.

---

### Scenario `T4-JOURNEY-04`: Prospective Client / Collaborator Contact & Ingestion Journey

- **Target Persona**: Startup founder or client seeking full-stack MERN development consultation or hiring inquiries.
- **Device & Environment**: Desktop (1280x800), standard pointer.
- **User Intent**: Navigate directly to Contact page, experience input micro-interactions, test client-side validation errors, submit an inquiry message with EmailJS integration, receive immediate feedback, and verify social profiles.
- **Multi-Step Action Sequence (10 Steps)**:
  1. **Step 1 (Direct Navigation to Contact)**: Enters `/contact`. Animated entrance reveals contact section with editorial heading and introductory note.
  2. **Step 2 (Input Focus Micro-Interactions)**: Clicks into Name input. Verifies animated focus state (border glow `#00f0ff`, label transition). Repeats for Email and Message fields.
  3. **Step 3 (Empty Submission Validation)**: Clicks "Send Message" with all fields empty. Form submission is prevented; client-side validation errors appear on Name, Email, and Message.
  4. **Step 4 (Malformed Email Validation)**: Fills Name ("John Founder"), enters invalid email format ("john_at_startup"), enters Message ("Looking for MERN MVP"). Clicks "Send Message". Verifies email format error message appears ("Please enter a valid email address").
  5. **Step 5 (Valid Submission Execution)**: Corrects email to "john@startup.io". Clicks "Send Message".
  6. **Step 6 (Pending Loading State)**: Submit button transitions to loading state (spinner icon, button disabled to prevent duplicate submissions).
  7. **Step 7 (EmailJS Feedback Handling)**: Form executes submission via `@emailjs/browser` (with placeholder credentials). Resolves to clean client feedback state (either simulated success banner or controlled configuration notice for demo mode), without unhandled promise rejection or UI freeze.
  8. **Step 8 (Form Reset / Post-Submit State)**: Form fields reset or display confirmed submission message.
  9. **Step 9 (Social Channels Verification)**: Inspects social profile links. Verifies GitHub (`https://github.com/aadinath29`) and LinkedIn (`https://www.linkedin.com/in/aadinath-magar-profile`) links are active with `target="_blank"`.
  10. **Step 10 (Direct Communication Verification)**: Inspects direct email mailto link and phone number formatted with international calling code `+91`.
- **Verification Checks & Assertions**:
  - Client-side validation stops invalid submissions.
  - Submit button is disabled during submission.
  - Social link hrefs match official profiles.
  - No uncaught JavaScript exceptions during EmailJS invocation.

---

### Scenario `T4-JOURNEY-05`: Aesthetic & Dark/Light Mode Comprehensive Exploration Journey

- **Target Persona**: Design Director / UI/UX Specialist evaluating typography, color token discipline, accessibility contrast, and dark/light mode consistency.
- **Device & Environment**: Desktop (1280x900).
- **User Intent**: Test dark-primary default palette, toggle to light theme, verify anti-FOUC persistence, audit styling across all 5 pages in light mode, verify contrast ratios, reload page to verify persistence, and toggle back to dark.
- **Multi-Step Action Sequence (10 Steps)**:
  1. **Step 1 (Default Dark Palette Audit)**: Loads `/`. Verifies dark background `#07090e`, dark surface `#0e131f`, neon cyan `#00f0ff` accent, and gold `#fbbf24` secondary accent. Typography uses Playfair Display serif for headings and Inter for body.
  2. **Step 2 (Theme Toggle Interaction)**: Clicks Theme Toggle button in navbar. `document.documentElement.classList` removes `dark` and adds `light`. `localStorage.getItem('am_portfolio_theme')` becomes `'light'`.
  3. **Step 3 (Light Mode Home Audit)**: Verifies background transitions to light neutral (`#f8fafc`), text transitions to slate dark (`#0f172a`), and accents adapt for WCAG AA readability.
  4. **Step 4 (Navigation to About in Light Theme)**: Clicks "About". Curtain wipes using light theme tokens. Heading "Full-Stack Developer. Builder. Problem Solver." renders with crisp Playfair Display typography in dark slate.
  5. **Step 5 (About Portrait 3D Tilt in Light Theme)**: Hovers portrait card in light theme. 3D perspective tilt and light reflection glare effect calculate smoothly without contrast washing.
  6. **Step 6 (Navigation to Projects in Light Theme)**: Clicks "Projects". Cards for Spendly and Business Management render with light card surfaces, subtle borders, and readable tech stack tags.
  7. **Step 7 (Navigation to Blog in Light Theme)**: Clicks "Blog". Article cards display clean editorial card borders and legible metadata.
  8. **Step 8 (Navigation to Contact in Light Theme)**: Clicks "Contact". Form inputs render with light backgrounds and high-contrast text and focus rings.
  9. **Step 9 (Browser Reload & Anti-FOUC Verification)**: Simulates page reload on `/contact`. Anti-FOUC script in `<head>` reads `'light'` from `localStorage` immediately; page renders in light mode without a single frame of dark flash.
  10. **Step 10 (Toggle Return to Dark Theme)**: Clicks Theme Toggle switch again. Page returns to dark-primary palette; `localStorage.getItem('am_portfolio_theme')` is updated to `'dark'`.
- **Verification Checks & Assertions**:
  - `assert.strictEqual(localStorage.getItem('am_portfolio_theme'), 'dark');`
  - Font families verified: Playfair Display for `h1, h2, h3` and Inter for body text.
  - Contrast ratios >= 4.5:1 for body copy across both modes.

---

### Scenario `T4-JOURNEY-06`: Deep-Link Direct Access & Browser History Traversal Journey

- **Target Persona**: External visitor arriving via direct hyperlink shared on social media, testing SPA rewrites, browser history back/forward navigation, and 404 handling.
- **Device & Environment**: Desktop (1280x800).
- **User Intent**: Verify SPA direct deep-linking to inner routes, test browser history stack navigation (Back/Forward), and verify 404 error boundary fallback.
- **Multi-Step Action Sequence (10 Steps)**:
  1. **Step 1 (Direct Deep-Link Load `/projects`)**: Simulates direct HTTP GET to `https://domain.com/projects`. Vercel rewrite configuration (`vercel.json`) routes request to `/index.html`.
  2. **Step 2 (Direct Page Mount & Preloader)**: React Router mounts `/projects` directly. Curtain/preloader finishes and displays full projects grid immediately.
  3. **Step 3 (Internal Route Change to `/blog`)**: Clicks "Blog" in navbar. Route changes to `/blog` via Framer Motion curtain transition.
  4. **Step 4 (Internal Route Change to `/contact`)**: Clicks "Contact" in navbar. Route changes to `/contact`.
  5. **Step 5 (Browser History Back Navigation)**: Simulates browser back button (`window.history.back()`). React Router transitions back to `/blog`. Curtain transition animates cleanly.
  6. **Step 6 (Second Browser History Back Navigation)**: Simulates browser back button again. React Router transitions back to `/projects`. Scroll position restores to top.
  7. **Step 7 (Browser History Forward Navigation)**: Simulates browser forward button (`window.history.forward()`). React Router transitions forward to `/blog`.
  8. **Step 8 (Navigation to Invalid URL)**: Direct navigation to `/this-route-does-not-exist`.
  9. **Step 9 (404 NotFound Page Rendering)**: Route matches `*` wildcard. `NotFoundPage` renders with editorial 404 message ("Page Not Found") and "Return Home" button.
  10. **Step 10 (Recovery to Home)**: Clicks "Return Home" CTA. Route navigates to `/`; hero section and 3D scene mount cleanly.
- **Verification Checks & Assertions**:
  - `assert.strictEqual(window.location.pathname, '/');`
  - History stack operates without crashes or dead ends.
  - 404 page is accessible and provides path back to root.

---

## 5. Harness Implementation Guidance for Test Authors

### 5.1 Test Execution Architecture (`tests/e2e/run-all.js`)
To execute Tier 3 and Tier 4 tests effectively without requiring heavyweight external browsers or GPU dependencies in headless CI:
1. **DOM Simulation**: Leverage JSDOM with custom mock implementations for:
   - `window.matchMedia`
   - `window.requestAnimationFrame` & `window.cancelAnimationFrame`
   - `HTMLCanvasElement.prototype.getContext('webgl')` (mock returning dummy context object)
   - `localStorage`
   - `window.scrollTo` and `Element.prototype.scrollIntoView`
2. **Static & AST Analysis Layer**:
   - Verify `vercel.json` SPA rewrite rules.
   - Verify Tailwind CSS variable mapping and theme token definitions in `tailwind.config.js` and `src/styles/index.css`.
   - Verify data contracts in `src/data/*.js`.
3. **Live Component Mount Layer**:
   - Wrap components in `<MemoryRouter initialEntries={[route]}>` with `<ThemeProvider>` and `<CursorProvider>`.
   - Fire user events via `@testing-library/react` / JSDOM `dispatchEvent`.
   - Validate state transitions, DOM class updates, and cleanup lifecycles.

### 5.2 Directory Structure Recommendation
```
tests/e2e/
├── harness/
│   ├── runner.js          # Test runner and assertion library
│   ├── mocks.js           # Three.js, Lenis, EmailJS, matchMedia mocks
│   └── reporter.js        # TAP and Console summary reporter
├── tier1/                 # Feature coverage tests (spec_miner_e2e_2)
├── tier2/                 # Boundary & corner cases (spec_miner_e2e_2)
├── tier3/                 # Cross-feature combinations (this specification)
│   ├── theme-combinations.test.js    # T3-THEME-01 to T3-THEME-08
│   ├── route-combinations.test.js    # T3-ROUTE-01 to T3-ROUTE-08
│   ├── scroll-combinations.test.js   # T3-SCROLL-01 to T3-SCROLL-08
│   ├── cursor-combinations.test.js   # T3-CURSOR-01 to T3-CURSOR-07
│   ├── preload-combinations.test.js  # T3-PRELOAD-01 to T3-PRELOAD-03
│   └── data-combinations.test.js     # T3-DATA-01 to T3-DATA-04
├── tier4/                 # End-user real-world journeys (this specification)
│   ├── recruiter-journey.test.js     # T4-JOURNEY-01
│   ├── engineer-journey.test.js      # T4-JOURNEY-02
│   ├── mobile-journey.test.js        # T4-JOURNEY-03
│   ├── contact-journey.test.js       # T4-JOURNEY-04
│   ├── aesthetic-journey.test.js     # T4-JOURNEY-05
│   └── deeplink-journey.test.js      # T4-JOURNEY-06
└── run-all.js             # Master test entrypoint
```

---

## 6. Conclusion

This test specification establishes an exhaustive, mathematically complete test matrix for Tiers 3 and 4:
- **38 Pairwise Cross-Feature Tests** (exceeding the >= 32 requirement).
- **6 Real-World End-User Journeys** with 10 actionable steps each (exceeding the >= 5 requirement).
- Every test is strictly anchored to `ORIGINAL_REQUEST.md`, `PROJECT.md`, and real candidate profile data for Aadinath Magar.
