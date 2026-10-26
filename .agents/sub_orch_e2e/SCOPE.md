# Scope: Dual-Track E2E Testing Track

## Architecture
- **Test Strategy**: Opaque-box, requirement-driven automated testing derived directly from `ORIGINAL_REQUEST.md` and user-facing specifications. Independent of implementation internals.
- **Test Harness**: Automated Node.js-based test engine located in `tests/e2e/` executing both static AST/DOM/asset/bundle analysis and live runtime/HTTP/SPA assertions.
- **Test Suite Structure**:
  - `tests/e2e/harness/`: Runner, assertion library, mock server / static router emulator, report formatter.
  - `tests/e2e/tier1/`: Feature coverage suite verifying all 32 inventoried features in isolation (>=5 test cases per feature).
  - `tests/e2e/tier2/`: Boundary and corner case suite (>=5 test cases per feature covering boundaries, empty states, error states, and responsive viewports).
  - `tests/e2e/tier3/`: Cross-feature pairwise combination suite covering interactions between navigation, animations, themes, and forms.
  - `tests/e2e/tier4/`: Real-world application scenarios simulating complete end-user and recruiter browsing workflows.
- **Reporting & Entrypoint**: `npm run test:e2e` or `node tests/e2e/run-all.js` producing structured TAP/JSON/Console reports and zero non-zero exits on full pass.

## Feature Inventory & Test Mapping
Every feature from `PROJECT.md` is covered:
| # | Feature | Target Scope in E2E Suite | Test Tier Mapping |
|---|---------|---------------------------|-------------------|
| 1 | Real Developer Profile & Data | Verification of Aadi's bio, stats, links, contacts in rendered DOM/data | Tier 1, 2, 4 |
| 2 | Project Scaffolding & Dependencies | Dependencies (React, Vite, Tailwind, Three, Lenis, GSAP, Framer) integrity | Tier 1, 2 |
| 3 | Single-Page App Vercel Config | `vercel.json` rewrites and SPA fallback routing | Tier 1, 2 |
| 4 | Asset Setup & Resume Integration | Resume PDF presence, favicon, gradient placeholders | Tier 1, 2 |
| 5 | Dark/Light Color Tokens & CSS Variables | Tailwind theme variables, colors (#07090e, #00f0ff, etc.) | Tier 1, 2, 3 |
| 6 | Anti-FOUC Theme Initialization | `index.html` inline script theme persistence checking | Tier 1, 2, 3 |
| 7 | Theme Toggle Switch Component | Theme switching logic, localStorage persistence, class toggle | Tier 1, 2, 3 |
| 8 | Typography & Google Fonts Loading | Playfair Display & Inter font link/declaration verification | Tier 1, 2 |
| 9 | "A.M." Monogram Preloader | Preloader presence, counter 0-100%, curtain exit | Tier 1, 2, 3 |
| 10 | High-Performance Custom Cursor | Dot & ring cursor elements, hover scaling, touch suppression | Tier 1, 2, 3 |
| 11 | Viewport Scroll Progress Bar | Scroll indicator element, width progression | Tier 1, 2, 3 |
| 12 | Sticky Header & Desktop Hover | Header presence, desktop links, clip-path styles | Tier 1, 2, 3 |
| 13 | Responsive Mobile Menu | Hamburger toggle, overlay menu, responsive breakpoint behavior | Tier 1, 2, 3, 4 |
| 14 | Layout Shell & Lenis Setup | Lenis wrapper, GSAP ticker sync contracts | Tier 1, 2, 3 |
| 15 | Home Hero Content & Word Stagger | Headline, title, resume CTA button | Tier 1, 2, 4 |
| 16 | Animated Stats Counter Grid | 4 stat counters with correct labels and numbers | Tier 1, 2, 4 |
| 17 | Skills Layer 1: Infinite Marquee | Ticker items for React, Node, Mongo, Express, etc. | Tier 1, 2 |
| 18 | Skills Layer 2: Bento Grid | 4 skill domains, proficiency bars | Tier 1, 2, 4 |
| 19 | Home Projects Teaser Grid | Spendly, Business Management, More coming soon cards | Tier 1, 2, 4 |
| 20 | Home Testimonials Marquee | Testimonials quotes and marquee structure | Tier 1, 2 |
| 21 | About Page Hero & Bio Narrative | About editorial headline and verified bio block | Tier 1, 2, 4 |
| 22 | About Experience & Timeline | Education & experience timeline entries | Tier 1, 2, 4 |
| 23 | Projects Full Grid Page | Full projects page, live demo and GitHub links | Tier 1, 2, 4 |
| 24 | Blog Page Article Cards | Blog articles list, tags, reading times | Tier 1, 2, 4 |
| 25 | Contact Page EmailJS Form | Form fields, validation, submit handling, feedback states | Tier 1, 2, 3, 4 |
| 26 | Contact Social & Direct Links | Direct GitHub, LinkedIn, Email, Phone links | Tier 1, 2, 4 |
| 27 | R3F 3D Hero Scene | Canvas element, rotating geometry, particle field | Tier 1, 2, 3 |
| 28 | R3F Code-Splitting & Suspense | `React.lazy` and Suspense fallback skeleton | Tier 1, 2, 3 |
| 29 | About Portrait 3D Parallax Tilt | Portrait placeholder and 3D tilt perspective properties | Tier 1, 2, 3 |
| 30 | GSAP Timeline Line Draw Animation | SVG stroke-dashoffset timeline structure | Tier 1, 2, 3 |
| 31 | Framer Motion Curtain Transitions | AnimatePresence and page curtain transition wrapper | Tier 1, 2, 3 |
| 34 | Production Build & Dist Validation | Dist output verification, clean bundle generation | Tier 1, 2 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E-M1 | Test Architecture, Infrastructure & Harness | Define `TEST_INFRA.md`, build test runner in `tests/e2e/harness/`, CLI entry point, assertion library | none | IN_PROGRESS |
| E2E-M2 | Tier 1: Feature Coverage Test Suite | Implement comprehensive tests for all 32 features (>= 5 test cases per feature) | E2E-M1 | PLANNED |
| E2E-M3 | Tier 2: Boundary & Corner Cases Suite | Implement tests for boundaries, extremes, error handling, viewports (>= 5 per feature) | E2E-M1 | PLANNED |
| E2E-M4 | Tier 3: Cross-Feature Pairwise Combinations | Implement tests for multi-feature interactions (theme x route, scroll x lenis, etc.) | E2E-M2, E2E-M3 | PLANNED |
| E2E-M5 | Tier 4: Real-World Application Scenarios | Implement >= 5 realistic recruiter and end-user browsing journeys | E2E-M4 | PLANNED |
| E2E-M6 | Test Suite Verification & TEST_READY.md | Run full test suite, verify harness resilience, execute review/audit gate, publish `TEST_READY.md` | E2E-M5 | PLANNED |

## Interface Contracts
- **Test Runner Invocation**: `node tests/e2e/run-all.js` or `npm run test:e2e`
- **Output Format**: Standard exit code (0 = all pass, non-zero = failures) + console summary table with pass/fail counts per tier.
- **Signal File**: `TEST_READY.md` at project root with runner commands and coverage verification.
