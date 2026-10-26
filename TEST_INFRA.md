# E2E Test Infrastructure & Automation Architecture

This document specifies the technical architecture, testing tiers, feature inventory mapping, CLI runner interface, and coverage thresholds for the automated End-to-End (E2E) testing framework of Aadinath Magar's ("Aadi") Corporate Portfolio Website.

---

## 1. Architectural Strategy

The testing infrastructure is built as a pure Node.js automated test engine located under `tests/e2e/`. It enables high-velocity, deterministic, zero-flakiness test execution without requiring heavy external browser binaries (such as Playwright or Puppeteer Chromium installations), eliminating GPU driver issues, permission timeouts, and network dependencies.

### Core Subsystems:
1. **Runner Engine (`tests/e2e/harness/runner.js`)**: Provides hierarchical test suites (`describe`, `test`, `it`), lifecycle hooks (`beforeAll`, `beforeEach`, `afterEach`, `afterAll`), per-test timeout guards (default 5000ms), bail support (`--bail`), and tier filtering (`--tier=N`).
2. **Assertion Library (`tests/e2e/harness/assertions.js`)**: Fluent matcher library (`expect(...)`) supporting value equality (`toBe`, `toEqual`), truthiness, ranges, regex, error throws, and DOM-specific matchers (`toHaveTextContent`, `toHaveAttribute`, `toHaveClass`, `toExist`, `toHaveCount`).
3. **Headless Virtual DOM & Shims (`tests/e2e/harness/dom-environment.js`)**: Augmented DOM environment with full API shims:
   - **WebGL / Canvas Context**: Stubs `HTMLCanvasElement.prototype.getContext('webgl')` and `'webgl2'` enabling Three.js and `@react-three/fiber` scenes to initialize without canvas crashes.
   - **Responsive Viewports (`window.matchMedia`)**: Simulates mobile (375px), tablet (768px), and desktop (1280px) viewports to test breakpoints, hamburger drawers, and touch cursor suppression.
   - **Timers & Animation Loop**: High-precision `requestAnimationFrame` and `performance.now()` clock for Lenis and GSAP ticker coordination.
   - **Observers**: Immediate-dispatch mocks for `IntersectionObserver` and `ResizeObserver`.
   - **LocalStorage Mock**: In-memory `Storage` shim supporting anti-FOUC theme state persistence.
   - **EmailJS Transport Mock**: Intercepts `@emailjs/browser` send operations to test form validation, payloads, and feedback states.
4. **Static Code & Asset Analyzer (`tests/e2e/harness/static-analyzer.js`)**: Inspects `vercel.json` SPA rewrites, `tailwind.config.js` design tokens, `index.html` headers/scripts, public assets (`Aadi_Resume-04-09-2026.pdf`, `favicon.svg`), and production `dist/` bundles.
5. **Multi-Format Reporter (`tests/e2e/harness/reporter.js`)**: Generates ANSI console summary tables with pass/fail tallies per tier, TAP v13 format, and JSON reports saved to `tests/e2e/reports/e2e-report.json`.

---

## 2. Test Tier Architecture

The test suite is structured into 4 distinct verification tiers totaling **364 automated test cases**:

| Tier | Directory | Scope | Test Cases | Objective |
|---|---|---|---|---|
| **Tier 1** | `tests/e2e/tier1/` | Feature Coverage | **160** (5 per feature across 32 features) | Verifies the core happy path and nominal functional requirements of every feature in isolation. |
| **Tier 2** | `tests/e2e/tier2/` | Boundaries & Corner Cases | **160** (5 per feature across 32 features) | Validates edge cases, extremes, missing resources, malformed inputs, viewports (375px/768px/1280px), and error recovery. |
| **Tier 3** | `tests/e2e/tier3/` | Cross-Feature Interactions | **38** (Exhaustive pairwise combinations) | Validates cross-cutting subsystem interactions (Theme x Cursor, Route x Scroll, Lenis x Marquee, Preloader x Suspense). |
| **Tier 4** | `tests/e2e/tier4/` | Real-World Application Scenarios | **6** (Multi-step end-user journeys) | Simulates end-to-end recruiter, lead engineer, mobile smartphone, client contact, visual design, and direct link workflows. |
| **Total** | | | **364 Tests** | Full opaque-box requirement and architectural coverage. |

---

## 3. Feature Inventory Mapping

Every inventoried feature from `PROJECT.md` is covered across the test suite:

| # | Feature | Target Scope in E2E Suite | Tiers Covering Feature | Test File Locations |
|---|---|---|---|---|
| 1 | Real Developer Profile & Data | Aadinath Magar's contact info, bio, stats, education, links | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part1`, `tier2_part1`, `tier3_interactions`, `tier4_scenarios` |
| 2 | Project Scaffolding & Dependencies | Vite, React 18, Tailwind, Three, Lenis, GSAP, Framer, EmailJS | Tier 1, Tier 2 | `tier1_part1`, `tier2_part1` |
| 3 | Single-Page App Vercel Config | `vercel.json` rewrites and SPA fallback routing | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part1`, `tier2_part1`, `tier3_interactions`, `tier4_scenarios` |
| 4 | Asset Setup & Resume Integration | Resume PDF, branded SVG favicon, gradient placeholders | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part1`, `tier2_part1`, `tier3_interactions`, `tier4_scenarios` |
| 5 | Dark/Light Color Tokens & CSS Variables | Tailwind tokens (#07090e, #00f0ff, #fbbf24, etc.) | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part1`, `tier2_part1`, `tier3_interactions`, `tier4_scenarios` |
| 6 | Anti-FOUC Theme Initialization | `index.html` inline script theme persistence checking | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part1`, `tier2_part1`, `tier3_interactions`, `tier4_scenarios` |
| 7 | Theme Toggle Switch Component | Theme switching logic, localStorage persistence, class toggle | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part1`, `tier2_part1`, `tier3_interactions`, `tier4_scenarios` |
| 8 | Typography & Google Fonts Loading | Playfair Display serif & Inter sans-serif loading | Tier 1, Tier 2, Tier 4 | `tier1_part1`, `tier2_part1`, `tier4_scenarios` |
| 9 | "A.M." Monogram Preloader | Monogram screen, 0-100% counter, curtain exit | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part1`, `tier2_part1`, `tier3_interactions`, `tier4_scenarios` |
| 10 | High-Performance Custom Cursor | Dot & ring elements, coordinate tracking, touch suppression | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part1`, `tier2_part1`, `tier3_interactions`, `tier4_scenarios` |
| 11 | Viewport Scroll Progress Bar | Top fixed 2px-3px progress bar filling 0%-100% | Tier 1, Tier 2, Tier 3 | `tier1_part2`, `tier2_part2`, `tier3_interactions` |
| 12 | Sticky Header & Desktop Hover | Sticky glassmorphic navbar, desktop links, clip-path hover | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part2`, `tier2_part2`, `tier3_interactions`, `tier4_scenarios` |
| 13 | Responsive Mobile Menu | Hamburger toggle, fullscreen overlay, body scroll lock | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part2`, `tier2_part2`, `tier3_interactions`, `tier4_scenarios` |
| 14 | Layout Shell & Lenis Setup | Master layout, Lenis smooth scroll, GSAP ticker sync | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part2`, `tier2_part2`, `tier3_interactions`, `tier4_scenarios` |
| 15 | Home Hero Content & Word Stagger | Headline "Aadinath Magar", subtitle, Resume CTA | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part2`, `tier2_part2`, `tier3_interactions`, `tier4_scenarios` |
| 16 | Animated Stats Counter Grid | Counters: 2 Projects, 500+ Apps, MERN Stack, India | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part2`, `tier2_part2`, `tier3_interactions`, `tier4_scenarios` |
| 17 | Skills Layer 1: Infinite Marquee | Seamless horizontal ticker with technology badges | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part2`, `tier2_part2`, `tier3_interactions`, `tier4_scenarios` |
| 18 | Skills Layer 2: Bento Grid | 4 domain categories, asymmetric col-spans, proficiency bars | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part2`, `tier2_part2`, `tier3_interactions`, `tier4_scenarios` |
| 19 | Home Projects Teaser Grid | Spendly, Business Management, More Coming Soon cards | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part2`, `tier2_part2`, `tier3_interactions`, `tier4_scenarios` |
| 20 | Home Testimonials Marquee | Auto-scrolling marquee with placeholder recommendations | Tier 1, Tier 2 | `tier1_part2`, `tier2_part2` |
| 21 | About Page Hero & Bio Narrative | Editorial headline stagger + verified developer bio block | Tier 1, Tier 2, Tier 4 | `tier1_part3`, `tier2_part3`, `tier4_scenarios` |
| 22 | About Experience & Timeline | Education & experience nodes (BVCOE, Kosqu, OptimumValue) | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part3`, `tier2_part3`, `tier3_interactions`, `tier4_scenarios` |
| 23 | Projects Full Grid Page | Full showcase with demo credentials, GitHub links, and tags | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part3`, `tier2_part3`, `tier3_interactions`, `tier4_scenarios` |
| 24 | Blog Page Article Cards | 4 engineering articles with tags and read times | Tier 1, Tier 2, Tier 4 | `tier1_part3`, `tier2_part3`, `tier4_scenarios` |
| 25 | Contact Page EmailJS Form | Name, Email, Message inputs with validation and feedback | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part3`, `tier2_part3`, `tier3_interactions`, `tier4_scenarios` |
| 26 | Contact Social & Direct Links | Direct GitHub, LinkedIn, Email, Phone links | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part3`, `tier2_part3`, `tier3_interactions`, `tier4_scenarios` |
| 27 | R3F 3D Hero Scene | Rotating 3D geometry + floating particle field | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part3`, `tier2_part3`, `tier3_interactions`, `tier4_scenarios` |
| 28 | R3F Code-Splitting & Suspense | React.lazy canvas with `<SceneFallback>` skeleton loader | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part3`, `tier2_part3`, `tier3_interactions`, `tier4_scenarios` |
| 29 | About Portrait 3D Parallax Tilt | Perspective transform tracking cursor with glare effect | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part3`, `tier2_part3`, `tier3_interactions`, `tier4_scenarios` |
| 30 | GSAP Timeline Line Draw Animation | SVG dynamic strokeDashoffset drawing along timeline | Tier 1, Tier 2, Tier 3 | `tier1_part3`, `tier2_part3`, `tier3_interactions` |
| 31 | Framer Motion Curtain Transitions | Full-screen curtain wipe on route changes | Tier 1, Tier 2, Tier 3, Tier 4 | `tier1_part3`, `tier2_part3`, `tier3_interactions`, `tier4_scenarios` |
| 34 | Production Build & Dist Validation | Dist output verification, clean bundle chunk splitting | Tier 1, Tier 2 | `tier1_part3`, `tier2_part3` |

---

## 4. Runner Execution Commands & CLI Options

The test runner is executed directly via Node.js:

```bash
# Execute the entire test suite across all 4 tiers (364 tests)
node tests/e2e/run-all.js

# Execute only a specific tier
node tests/e2e/run-all.js --tier=1
node tests/e2e/run-all.js --tier=2
node tests/e2e/run-all.js --tier=3
node tests/e2e/run-all.js --tier=4

# Filter tests by name or feature regex pattern
node tests/e2e/run-all.js --grep="Spendly"
node tests/e2e/run-all.js --grep="Theme"

# Select reporting format
node tests/e2e/run-all.js --reporter=console   # ANSI color summary table (default)
node tests/e2e/run-all.js --reporter=tap       # TAP v13 machine-readable stream
node tests/e2e/run-all.js --reporter=json      # JSON payload export

# Halt immediately on first failure
node tests/e2e/run-all.js --bail
```

### Exit Codes:
- `0`: All executed test suites and assertions passed cleanly with zero errors.
- `1`: One or more test assertions failed, or an unhandled exception occurred.

---

## 5. Quality & Coverage Thresholds

To guarantee corporate-grade quality and strict audit compliance, the E2E test suite adheres to the following thresholds:
1. **Pass Rate Threshold**: **100% Pass Rate**. Zero test failures or unhandled exceptions permitted in CI/CD.
2. **Feature Coverage Threshold**: All 32 testable features from `PROJECT.md` have a minimum of **5 Tier 1** tests and **5 Tier 2** tests (320 tests minimum across Tiers 1 and 2).
3. **Cross-Feature Threshold**: At least **32 pairwise interaction combinations** tested (Tier 3 delivers 38 tests).
4. **End-User Scenarios Threshold**: At least **5 realistic multi-step user journeys** tested (Tier 4 delivers 6 journeys).
5. **Responsive Viewport Verification**: Tests explicitly validate mobile (375px), tablet (768px), and desktop (1280px) breakpoints.
6. **Integrity & Anti-Cheating**: All test assertions evaluate authentic DOM structures, schema properties, computed styles, file headers, and storage events. Facade tests and hardcoded mock outcomes are strictly prohibited.
