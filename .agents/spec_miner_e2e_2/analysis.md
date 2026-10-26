# Comprehensive E2E Test Specification Matrix (Tier 1 & Tier 2)

**Author**: `spec_miner_e2e_2` (Tier 1 & Tier 2 Test Spec Miner)  
**Parent Conversation ID**: `8195fde9-ffb7-42fb-82d9-3a2e281ed169`  
**Date**: 2026-09-09  
**Status**: COMPLETE  
**Coverage Scope**: Features 1–31 and Feature 34 (All 32 Inventoried Features from `PROJECT.md`)  
**Test Case Counts**:
- **Tier 1 (Feature Coverage)**: 160 Test Cases (5 per feature across 32 features)
- **Tier 2 (Boundary & Corner Cases)**: 160 Test Cases (5 per feature across 32 features)
- **Total Test Cases Specified**: 320 Test Cases

---

## 1. Specification Mining Methodology & Opaque-Box Rules

### 1.1 Authoritative Sources
This test specification is mined directly from:
1. `c:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md` (Authoritative User Specification, Requirements R1–R5, Acceptance Criteria, Developer Profile, Reference Sites)
2. `c:\Users\Dell\Desktop\Profile\PROJECT.md` (Architecture, Feature Inventory 1–31 & 34, Interface Contracts, Code Layout)
3. `c:\Users\Dell\Desktop\Profile\.agents\sub_orch_e2e\SCOPE.md` (Dual-Track E2E Scope, Tier 1–4 Harness Strategy)

### 1.2 Opaque-Box Testing Principles
All test cases specified herein adhere strictly to opaque-box criteria:
- **No private state inspection**: Assertions evaluate only rendered DOM, computed CSS properties, network activity, HTML attributes, console logs, and storage.
- **User-centric interactions**: Actions are triggered via standard browser events (clicks, input typing, scrolling, keyboard tabs, viewport resizes).
- **Decoupled execution**: Tests must pass against the production Vite build as well as the dev server without modifying source code.

---

## 2. Master Feature Inventory & Test Distribution

| # | Feature Name | Milestone | Tier 1 Tests (Feature Coverage) | Tier 2 Tests (Boundaries & Corners) | Total Tests |
|---|--------------|-----------|----------------------------------|--------------------------------------|-------------|
| 1 | Real Developer Profile & Data | M1 | `T1-F01-01` .. `T1-F01-05` (5) | `T2-F01-01` .. `T2-F01-05` (5) | 10 |
| 2 | Project Scaffolding & Dependencies | M1 | `T1-F02-01` .. `T1-F02-05` (5) | `T2-F02-01` .. `T2-F02-05` (5) | 10 |
| 3 | Single-Page App Vercel Config | M1 | `T1-F03-01` .. `T1-F03-05` (5) | `T2-F03-01` .. `T2-F03-05` (5) | 10 |
| 4 | Asset Setup & Resume Integration | M1 | `T1-F04-01` .. `T1-F04-05` (5) | `T2-F04-01` .. `T2-F04-05` (5) | 10 |
| 5 | Dark/Light Color Tokens & CSS Variables | M2 | `T1-F05-01` .. `T1-F05-05` (5) | `T2-F05-01` .. `T2-F05-05` (5) | 10 |
| 6 | Anti-FOUC Theme Initialization | M2 | `T1-F06-01` .. `T1-F06-05` (5) | `T2-F06-01` .. `T2-F06-05` (5) | 10 |
| 7 | Theme Toggle Switch Component | M2 | `T1-F07-01` .. `T1-F07-05` (5) | `T2-F07-01` .. `T2-F07-05` (5) | 10 |
| 8 | Typography & Google Fonts Loading | M2 | `T1-F08-01` .. `T1-F08-05` (5) | `T2-F08-01` .. `T2-F08-05` (5) | 10 |
| 9 | "A.M." Monogram Preloader | M2 | `T1-F09-01` .. `T1-F09-05` (5) | `T2-F09-01` .. `T2-F09-05` (5) | 10 |
| 10 | High-Performance Custom Cursor | M2 | `T1-F10-01` .. `T1-F10-05` (5) | `T2-F10-01` .. `T2-F10-05` (5) | 10 |
| 11 | Viewport Scroll Progress Bar | M2 | `T1-F11-01` .. `T1-F11-05` (5) | `T2-F11-01` .. `T2-F11-05` (5) | 10 |
| 12 | Sticky Header & Desktop Hover | M2 | `T1-F12-01` .. `T1-F12-05` (5) | `T2-F12-01` .. `T2-F12-05` (5) | 10 |
| 13 | Responsive Mobile Menu | M2 | `T1-F13-01` .. `T1-F13-05` (5) | `T2-F13-01` .. `T2-F13-05` (5) | 10 |
| 14 | Layout Shell & Lenis Setup | M2 | `T1-F14-01` .. `T1-F14-05` (5) | `T2-F14-01` .. `T2-F14-05` (5) | 10 |
| 15 | Home Hero Content & Word Stagger | M3 | `T1-F15-01` .. `T1-F15-05` (5) | `T2-F15-01` .. `T2-F15-05` (5) | 10 |
| 16 | Animated Stats Counter Grid | M3 | `T1-F16-01` .. `T1-F16-05` (5) | `T2-F16-01` .. `T2-F16-05` (5) | 10 |
| 17 | Skills Layer 1: Infinite Marquee | M3 | `T1-F17-01` .. `T1-F17-05` (5) | `T2-F17-01` .. `T2-F17-05` (5) | 10 |
| 18 | Skills Layer 2: Bento Grid | M3 | `T1-F18-01` .. `T1-F18-05` (5) | `T2-F18-01` .. `T2-F18-05` (5) | 10 |
| 19 | Home Projects Teaser Grid | M3 | `T1-F19-01` .. `T1-F19-05` (5) | `T2-F19-01` .. `T2-F19-05` (5) | 10 |
| 20 | Home Testimonials Marquee | M3 | `T1-F20-01` .. `T1-F20-05` (5) | `T2-F20-01` .. `T2-F20-05` (5) | 10 |
| 21 | About Page Hero & Bio Narrative | M3 | `T1-F21-01` .. `T1-F21-05` (5) | `T2-F21-01` .. `T2-F21-05` (5) | 10 |
| 22 | About Experience & Timeline | M3 | `T1-F22-01` .. `T1-F22-05` (5) | `T2-F22-01` .. `T2-F22-05` (5) | 10 |
| 23 | Projects Full Grid Page | M3 | `T1-F23-01` .. `T1-F23-05` (5) | `T2-F23-01` .. `T2-F23-05` (5) | 10 |
| 24 | Blog Page Article Cards | M3 | `T1-F24-01` .. `T1-F24-05` (5) | `T2-F24-01` .. `T2-F24-05` (5) | 10 |
| 25 | Contact Page EmailJS Form | M3 | `T1-F25-01` .. `T1-F25-05` (5) | `T2-F25-01` .. `T2-F25-05` (5) | 10 |
| 26 | Contact Social & Direct Links | M3 | `T1-F26-01` .. `T1-F26-05` (5) | `T2-F26-01` .. `T2-F26-05` (5) | 10 |
| 27 | R3F 3D Hero Scene | M4 | `T1-F27-01` .. `T1-F27-05` (5) | `T2-F27-01` .. `T2-F27-05` (5) | 10 |
| 28 | R3F Code-Splitting & Suspense | M4 | `T1-F28-01` .. `T1-F28-05` (5) | `T2-F28-01` .. `T2-F28-05` (5) | 10 |
| 29 | About Portrait 3D Parallax Tilt | M4 | `T1-F29-01` .. `T1-F29-05` (5) | `T2-F29-01` .. `T2-F29-05` (5) | 10 |
| 30 | GSAP Timeline Line Draw Animation | M4 | `T1-F30-01` .. `T1-F30-05` (5) | `T2-F30-01` .. `T2-F30-05` (5) | 10 |
| 31 | Framer Motion Curtain Transitions | M4 | `T1-F31-01` .. `T1-F31-05` (5) | `T2-F31-01` .. `T2-F31-05` (5) | 10 |
| 34 | Production Build & Dist Validation | M5 | `T1-F34-01` .. `T1-F34-05` (5) | `T2-F34-01` .. `T2-F34-05` (5) | 10 |
| **Total** | **32 Features** | | **160 Tests** | **160 Tests** | **320 Tests** |

---

## 3. Detailed Test Specification Matrix: Features 1 to 16

### Feature 1: Real Developer Profile & Data
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 10–43; `PROJECT.md` lines 22, 69–81.
- **Contract**: Verified developer data model (`name: "Aadinath Magar"`, `nickname: "Aadi"`, `title: "Full-Stack Developer"`, `location: "Navi Mumbai, India"`, `email: "aadinathbmagar75@gmail.com"`, `phone: "+91 92090 17621"`, `github: "https://github.com/aadinath29"`, `linkedin: "https://www.linkedin.com/in/aadinath-magar-profile"`).

#### Tier 1: Feature Coverage
1. `T1-F01-01`: **Developer Full Name Render**  
   - *Input*: Navigate to `/` (Home page).  
   - *Steps*: Query the primary hero heading element (`h1` or `[data-testid="hero-name"]`).  
   - *Assertion*: Text content matches or contains verbatim `"Aadinath Magar"`.  
   - *Verification*: DOM Text node inspection.
2. `T1-F01-02`: **Developer Professional Title Render**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Query hero subtitle / professional badge element.  
   - *Assertion*: Text contains `"Full-Stack Developer"`.  
   - *Verification*: DOM Text inspection.
3. `T1-F01-03`: **Verified Developer Bio Narrative on About Page**  
   - *Input*: Navigate to `/about`.  
   - *Steps*: Query bio narrative section (`[data-testid="bio-narrative"]` or `p.bio-text`).  
   - *Assertion*: Rendered text contains `"Aadinath Magar"`, `"MERN stack"`, `"India"`, and `"Agentic AI"`.  
   - *Verification*: DOM Substring search.
4. `T1-F01-04`: **Direct Contact Information Verification**  
   - *Input*: Navigate to `/contact`.  
   - *Steps*: Locate email link and telephone link elements.  
   - *Assertion*: Email `href` is `mailto:aadinathbmagar75@gmail.com` and phone `href` is `tel:+919209017621`. Display text accurately reflects the addresses.  
   - *Verification*: Attribute check (`href`).
5. `T1-F01-05`: **External Social Profiles Links**  
   - *Input*: Navigate to `/` and `/contact`.  
   - *Steps*: Query GitHub and LinkedIn profile links in header, footer, and contact section.  
   - *Assertion*: GitHub link has `href="https://github.com/aadinath29"`, LinkedIn link has `href="https://www.linkedin.com/in/aadinath-magar-profile"`, both having `target="_blank"` and `rel="noopener noreferrer"`.  
   - *Verification*: Attribute check (`href`, `target`, `rel`).

#### Tier 2: Boundary & Corner Cases
1. `T2-F01-01`: **Mobile Viewport (375px) Name Wrapping & Layout Overflow**  
   - *Input*: Viewport set to 375px x 667px (iPhone SE).  
   - *Steps*: Measure `document.documentElement.scrollWidth` and hero heading bounding box.  
   - *Assertion*: `document.documentElement.scrollWidth <= 375` (zero horizontal overflow); text wraps cleanly without word clipping.  
   - *Verification*: DOM Geometry / Overflow check.
2. `T2-F01-02`: **Data Contract Completeness & Type Integrity**  
   - *Input*: Import `src/data/developer.js` (or inspect rendered data attribute).  
   - *Steps*: Validate schema of exported `developer` object.  
   - *Assertion*: All 8 fields (`name`, `nickname`, `title`, `location`, `email`, `phone`, `github`, `linkedin`) are non-empty strings; `stats` is an array with length >= 4.  
   - *Verification*: Static Data Schema validation.
3. `T2-F01-03`: **Generic Dummy Placeholder Absence Assertion**  
   - *Input*: Scan all rendered text across all pages (`/`, `/about`, `/projects`, `/blog`, `/contact`).  
   - *Steps*: Execute regex search for forbidden placeholder patterns: `/John Doe|Jane Doe|developer@example\.com|123-456-7890/i`.  
   - *Assertion*: Match count is strictly 0.  
   - *Verification*: Text Corpus Negative assertion.
4. `T2-F01-04`: **Special Character and URI Scheme Encoding Integrity**  
   - *Input*: Inspect email/phone click handlers and DOM attributes.  
   - *Steps*: Verify `href` values are RFC-compliant URI schemes.  
   - *Assertion*: `href` contains no whitespace or unescaped characters; phone begins with `+91`.  
   - *Verification*: URI Syntax validation.
5. `T2-F01-05`: **Tablet (768px) and Desktop (1280px) Typographic Flow**  
   - *Input*: Viewports at 768px x 1024px and 1280px x 800px.  
   - *Steps*: Evaluate computed styles on developer name and bio paragraphs.  
   - *Assertion*: `line-height >= 1.2` for heading; paragraph line length does not exceed 80ch for optimal reading comfort.  
   - *Verification*: Computed CSS property check.

---

### Feature 2: Project Scaffolding & Dependencies
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 50–52, 113–119; `PROJECT.md` lines 4–11, 23, 100–181.
- **Contract**: React 18, Vite 5, Tailwind CSS 3, React Router v6, Framer Motion, GSAP + ScrollTrigger, Three.js, R3F, Lenis, EmailJS, Lucide.

#### Tier 1: Feature Coverage
1. `T1-F02-01`: **Core Framework & Bundler Manifest Integrity**  
   - *Input*: Read `package.json`.  
   - *Steps*: Check `dependencies` and `devDependencies`.  
   - *Assertion*: `react` (^18.x), `react-dom` (^18.x), and `vite` (^5.x) are present.  
   - *Verification*: Manifest JSON inspection.
2. `T1-F02-02`: **Motion & 3D Animation Libraries Manifest Integrity**  
   - *Input*: Read `package.json`.  
   - *Steps*: Inspect dependencies for required motion libraries.  
   - *Assertion*: `framer-motion`, `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`, and `lenis` are declared.  
   - *Verification*: Manifest JSON inspection.
3. `T1-F02-03`: **Communication, Routing & UI Icons Manifest Integrity**  
   - *Input*: Read `package.json`.  
   - *Steps*: Inspect dependencies for routing and forms.  
   - *Assertion*: `react-router-dom` (>=6.20.0), `@emailjs/browser` (>=4.0.0), and `lucide-react` (>=0.400.0) are declared.  
   - *Verification*: Manifest JSON inspection.
4. `T1-F02-04`: **Architectural Directory Structure Compliance**  
   - *Input*: Inspect file system tree under `src/`.  
   - *Steps*: Verify existence of subdirectories: `src/components/{3d,common,layout,ui,sections}`, `src/context`, `src/data`, `src/hooks`, `src/pages`, `src/styles`.  
   - *Assertion*: All specified directory paths exist.  
   - *Verification*: File system existence check.
5. `T1-F02-05`: **Vite Standard CLI Scripts Availability**  
   - *Input*: Read `package.json` `scripts`.  
   - *Steps*: Check script commands.  
   - *Assertion*: `scripts.dev` contains `"vite"`, `scripts.build` contains `"vite build"`, `scripts.preview` contains `"vite preview"`.  
   - *Verification*: JSON property check.

#### Tier 2: Boundary & Corner Cases
1. `T2-F02-01`: **Dependency Peer Conflict & Duplicate Module Absence**  
   - *Input*: Run `npm ls --depth=0` or inspect dependency graph.  
   - *Steps*: Analyze for missing peer dependencies or duplicate conflicting React versions.  
   - *Assertion*: Zero unmet peer dependency warnings; single resolved instance of `react` and `react-dom`.  
   - *Verification*: Package resolution audit.
2. `T2-F02-02`: **Case-Sensitive Import Resolution Across All Files**  
   - *Input*: AST scan of all `.js` and `.jsx` files in `src/`.  
   - *Steps*: Resolve every `import ... from '...'` against local file system matching exact case.  
   - *Assertion*: 100% of imported file paths match disk casing exactly (preventing Linux build failure on Windows).  
   - *Verification*: Static AST Import path analysis.
3. `T2-F02-03`: **Missing Environment Variables Fault Tolerance**  
   - *Input*: Launch app with empty `.env` / no `VITE_*` variables defined.  
   - *Steps*: Load all routes (`/`, `/about`, `/projects`, `/blog`, `/contact`).  
   - *Assertion*: Application loads without throwing fatal reference errors; falls back to placeholder credentials safely.  
   - *Verification*: Runtime initialization under empty env.
4. `T2-F02-04`: **Vite Config Custom Chunk Strategy Verification**  
   - *Input*: Read `vite.config.js`.  
   - *Steps*: Inspect `build.rollupOptions.output.manualChunks`.  
   - *Assertion*: Config separates heavy vendors (e.g. `three`, `gsap`, `framer-motion`) into discrete chunk bundles.  
   - *Verification*: AST / Config inspection.
5. `T2-F02-05`: **Entry Point Script Module Tag Verification**  
   - *Input*: Read `index.html`.  
   - *Steps*: Inspect `<script>` tag referencing `src/main.jsx`.  
   - *Assertion*: Contains `type="module"` and `src="/src/main.jsx"`.  
   - *Verification*: HTML tag attribute assertion.

---

### Feature 3: Single-Page App Vercel Config
- **Specification Source**: `ORIGINAL_REQUEST.md` line 109, 118; `PROJECT.md` line 24.
- **Contract**: Root `vercel.json` with SPA rewrite rule `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.

#### Tier 1: Feature Coverage
1. `T1-F03-01`: **Root `vercel.json` File Existence**  
   - *Input*: File system check at workspace root.  
   - *Steps*: Check `fs.existsSync("vercel.json")`.  
   - *Assertion*: File exists at root.  
   - *Verification*: File system existence check.
2. `T1-F03-02`: **`vercel.json` Syntax and Parsing Validation**  
   - *Input*: Read `vercel.json` content.  
   - *Steps*: Parse via `JSON.parse(content)`.  
   - *Assertion*: Parses successfully without syntax errors; returns an Object.  
   - *Verification*: JSON parsing validation.
3. `T1-F03-03`: **SPA Rewrites Rule Declaration**  
   - *Input*: Parse `vercel.json`.  
   - *Steps*: Check `rewrites` array.  
   - *Assertion*: Contains at least one rule with `source: "/(.*)"` (or `/(.*)`) and `destination: "/index.html"`.  
   - *Verification*: JSON schema assertion.
4. `T1-F03-04`: **Direct Deep Link Emulation (`/about`, `/projects`)**  
   - *Input*: Static server emulation of Vercel rewrite rules.  
   - *Steps*: Request GET `/about` and GET `/projects`.  
   - *Assertion*: Server serves `/index.html` with HTTP 200 (allowing client-side router to mount target route).  
   - *Verification*: HTTP status and response body check.
5. `T1-F03-05`: **Direct Deep Link Emulation (`/blog`, `/contact`)**  
   - *Input*: Static server emulation of Vercel rewrite rules.  
   - *Steps*: Request GET `/blog` and GET `/contact`.  
   - *Assertion*: Server serves `/index.html` with HTTP 200.  
   - *Verification*: HTTP status and response body check.

#### Tier 2: Boundary & Corner Cases
1. `T2-F03-01`: **Arbitrary Non-Existent Nested URL Fallback**  
   - *Input*: Request GET `/random/deeply/nested/route/xyz`.  
   - *Steps*: Evaluate rewrite rule output.  
   - *Assertion*: Rewrite delivers `/index.html` allowing React Router's `NotFoundPage.jsx` (`*` route) to render branded 404.  
   - *Verification*: HTTP Response and Client Router catch assertion.
2. `T2-F03-02`: **URL Query Parameters and Hash Fragments Retention**  
   - *Input*: Request GET `/contact?service=consulting&budget=high#form`.  
   - *Steps*: Process through SPA rewrite and inspect client `window.location`.  
   - *Assertion*: `search` is `"?service=consulting&budget=high"` and `hash` is `"#form"` without truncation.  
   - *Verification*: Client URL state inspection.
3. `T2-F03-03`: **Static Asset Path Rewrite Bypass**  
   - *Input*: Request GET `/favicon.svg` and GET `/Aadi_Resume-04-09-2026.pdf`.  
   - *Steps*: Evaluate Vercel static asset priority over rewrites.  
   - *Assertion*: Request returns raw file content (SVG / PDF) rather than HTML fallback.  
   - *Verification*: HTTP `Content-Type` header assertion (`image/svg+xml`, `application/pdf`).
4. `T2-F03-04`: **Trailing Slash Resilience**  
   - *Input*: Request GET `/about/` vs `/about`.  
   - *Steps*: Evaluate rewrite and React Router behavior.  
   - *Assertion*: Both URLs resolve to the About page without redirect loop or blank page.  
   - *Verification*: Client route matching.
5. `T2-F03-05`: **Vercel Clean URLs and Header Hygiene**  
   - *Input*: Inspect `vercel.json` for invalid configuration keys.  
   - *Steps*: Validate against official Vercel schema (no disallowed properties or malformed headers).  
   - *Assertion*: Schema is valid; no invalid headers interfering with asset caching.  
   - *Verification*: Schema validation.

---

### Feature 4: Asset Setup & Resume Integration
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 41, 62, 108; `PROJECT.md` line 25, 79, 102–105.
- **Contract**: Resume PDF in `public/Aadi_Resume-04-09-2026.pdf`, favicon `public/favicon.svg`, portrait placeholder, zero broken images.

#### Tier 1: Feature Coverage
1. `T1-F04-01`: **Resume PDF File Presence & Non-Trivial Size**  
   - *Input*: Check `public/Aadi_Resume-04-09-2026.pdf`.  
   - *Steps*: Check file existence and byte size.  
   - *Assertion*: File exists and size > 50,000 bytes (valid PDF).  
   - *Verification*: File stats check.
2. `T1-F04-02`: **Hero Resume CTA Button Link Target**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Locate "Download Resume" / "Resume" CTA button.  
   - *Assertion*: Attribute `href` matches `/Aadi_Resume-04-09-2026.pdf` (or includes download attribute).  
   - *Verification*: Element attribute inspection.
3. `T1-F04-03`: **Branded SVG Favicon File Presence**  
   - *Input*: Check `public/favicon.svg`.  
   - *Steps*: Read file and validate XML/SVG structure.  
   - *Assertion*: File exists; root tag is `<svg>`; contains text or path representing "A.M." monogram.  
   - *Verification*: XML/SVG content inspection.
4. `T1-F04-04`: **Favicon Link Tag in Document Head**  
   - *Input*: Read `index.html`.  
   - *Steps*: Query `<head>` for `<link rel="icon">`.  
   - *Assertion*: Element exists with `href="/favicon.svg"` and `type="image/svg+xml"`.  
   - *Verification*: HTML head parsing.
5. `T1-F04-05`: **Zero Broken Image Tags Across All Routes**  
   - *Input*: Navigate to `/`, `/about`, `/projects`, `/blog`, `/contact`.  
   - *Steps*: Query all `<img>` tags and inspect `naturalWidth` or fallback styling.  
   - *Assertion*: Zero `img` elements have `naturalWidth === 0` after load; placeholders use CSS gradient divs instead of broken `<img>` tags.  
   - *Verification*: Image DOM naturalWidth and network error monitoring.

#### Tier 2: Boundary & Corner Cases
1. `T2-F04-01`: **Missing / Errored Image Graceful Degradation**  
   - *Input*: Simulate network failure for any image asset.  
   - *Steps*: Trigger image `error` event.  
   - *Assertion*: Component catches error and renders CSS gradient placeholder div without throwing React unhandled exception.  
   - *Verification*: DOM Error event simulation.
2. `T2-F04-02`: **Direct HTTP GET Request for Resume File**  
   - *Input*: HTTP GET `/Aadi_Resume-04-09-2026.pdf`.  
   - *Steps*: Send HTTP request to running dev/preview server.  
   - *Assertion*: Returns HTTP 200, Content-Type `application/pdf`, and magic bytes `%PDF-`.  
   - *Verification*: HTTP byte inspection.
3. `T2-F04-03`: **Resume Button Accessibility Attributes**  
   - *Input*: Locate Resume CTA button.  
   - *Steps*: Check accessibility attributes.  
   - *Assertion*: Has descriptive `aria-label` (e.g. `"Download Aadinath Magar's Resume (PDF)"`) and `rel="noopener noreferrer"`.  
   - *Verification*: Accessibility attribute check.
4. `T2-F04-04`: **Mobile (375px) Asset Scaling & Aspect Ratio**  
   - *Input*: Viewport at 375px.  
   - *Steps*: Inspect portrait container and project card visual containers.  
   - *Assertion*: Bounding box width <= 375px; aspect ratio maintained via `aspect-video` or `aspect-square`; zero horizontal scroll distortion.  
   - *Verification*: Computed layout metrics.
5. `T2-F04-05`: **SVG Favicon Dark/Light Theme Adaptability**  
   - *Input*: Read `public/favicon.svg`.  
   - *Steps*: Check SVG style definitions for CSS media query `(prefers-color-scheme: dark)`.  
   - *Assertion*: SVG uses `currentColor` or includes `@media (prefers-color-scheme: ...)` styles for contrast on dark and light browser tab bars.  
   - *Verification*: SVG style text inspection.

---

### Feature 5: Dark/Light Color Tokens & CSS Variables
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 53–58; `PROJECT.md` lines 12–16, 26, 85.
- **Contract**: Dark-primary palette (deep black `#07090e`, dark navy `#0e131f`), neon cyan (`#00f0ff`), warm gold (`#fbbf24`), CSS variables in `index.css`, Tailwind `darkMode: 'class'`.

#### Tier 1: Feature Coverage
1. `T1-F05-01`: **Tailwind Class Dark Mode Strategy**  
   - *Input*: Read `tailwind.config.js`.  
   - *Steps*: Check `darkMode` property.  
   - *Assertion*: `darkMode: 'class'` is explicitly configured.  
   - *Verification*: Config file AST / property inspection.
2. `T1-F05-02`: **CSS Custom Variables Declaration in `src/styles/index.css`**  
   - *Input*: Read `src/styles/index.css`.  
   - *Steps*: Check `:root` and `.dark` rule blocks.  
   - *Assertion*: Both `:root` (light) and `.dark` blocks declare `--bg-primary`, `--bg-secondary`, `--text-primary`, `--accent-cyan`, `--accent-gold`.  
   - *Verification*: CSS rule AST inspection.
3. `T1-F05-03`: **Dark Primary & Dark Navy Hex Tokens Definition**  
   - *Input*: Read `src/styles/index.css` and `tailwind.config.js`.  
   - *Steps*: Search for dark palette hex codes.  
   - *Assertion*: Hex values `#07090e` (deep black) and `#0e131f` (dark navy) are defined as primary/secondary dark tokens.  
   - *Verification*: Substring search in style tokens.
4. `T1-F05-04`: **Neon Cyan and Warm Gold Accent Tokens Definition**  
   - *Input*: Read `src/styles/index.css` and `tailwind.config.js`.  
   - *Steps*: Search for accent palette hex codes.  
   - *Assertion*: Hex values `#00f0ff` (neon cyan) and `#fbbf24` (warm gold) are defined.  
   - *Verification*: Substring search in style tokens.
5. `T1-F05-05`: **Computed Style Reflection on Class Toggle**  
   - *Input*: Render DOM with `<html>` element.  
   - *Steps*: Add class `'dark'` to `document.documentElement`, inspect computed background color of body; remove `'dark'`, inspect computed color.  
   - *Assertion*: Background color computes to dark value when `'dark'` is present and light value when absent.  
   - *Verification*: Window computed style assertion (`getComputedStyle`).

#### Tier 2: Boundary & Corner Cases
1. `T2-F05-01`: **WCAG AA Contrast Ratio Compliance in Both Modes**  
   - *Input*: Measure foreground text color and background color in dark and light modes.  
   - *Steps*: Calculate contrast ratio using WCAG relative luminance formula.  
   - *Assertion*: Body text contrast ratio >= 4.5:1; heading contrast ratio >= 3.0:1 in both modes.  
   - *Verification*: Algorithmic color contrast evaluation.
2. `T2-F05-02`: **Default Fallback Theme when No Class is Specified**  
   - *Input*: Clear all classes from `document.documentElement`.  
   - *Steps*: Inspect default styling applied.  
   - *Assertion*: Default theme fallback maintains dark-primary styling per project specification.  
   - *Verification*: DOM computed style inspection.
3. `T2-F05-03`: **System Forced Colors / High Contrast Media Query Resilience**  
   - *Input*: Emulate `@media (forced-colors: active)`.  
   - *Steps*: Inspect border visibility and button outlines.  
   - *Assertion*: Critical borders and interactive elements retain outlines (`outline: 1px solid transparent` or standard system colors).  
   - *Verification*: CSS rules audit.
4. `T2-F05-04`: **Responsive Viewport Theming Uniformity (375px/768px/1280px)**  
   - *Input*: Switch themes across viewports 375px, 768px, and 1280px.  
   - *Steps*: Measure header, main, and footer background colors.  
   - *Assertion*: Theme colors apply uniformly across all breakpoints without layout-dependent color breaks.  
   - *Verification*: Cross-breakpoint style assertion.
5. `T2-F05-05`: **Browser Mobile Theme-Color Meta Tag Update**  
   - *Input*: Toggle theme between light and dark.  
   - *Steps*: Inspect `<meta name="theme-color">` in `<head>`.  
   - *Assertion*: `content` attribute updates to match current active background color (`#07090e` for dark, `#ffffff` or light token for light).  
   - *Verification*: Meta tag attribute assertion.

---

### Feature 6: Anti-FOUC Theme Initialization
- **Specification Source**: `ORIGINAL_REQUEST.md` line 55; `PROJECT.md` line 14, 27.
- **Contract**: Synchronous inline `<script>` in `<head>` of `index.html` reading `am_portfolio_theme` from `localStorage` and applying `'dark'` class before body renders.

#### Tier 1: Feature Coverage
1. `T1-F06-01`: **Inline Script Presence in `<head>`**  
   - *Input*: Read `index.html`.  
   - *Steps*: Query `<head>` elements for an inline `<script>` (without `src`).  
   - *Assertion*: Inline script exists in `<head>` before `<body>`.  
   - *Verification*: HTML AST inspection.
2. `T1-F06-02`: **LocalStorage Theme Key Inspection**  
   - *Input*: Inspect script text in `index.html`.  
   - *Steps*: Search for `localStorage.getItem` invocation.  
   - *Assertion*: Script references `'am_portfolio_theme'` (or theme storage key).  
   - *Verification*: Substring / regex search.
3. `T1-F06-03`: **Immediate Dark Class Addition on Stored `'dark'`**  
   - *Input*: Set `localStorage.setItem('am_portfolio_theme', 'dark')`.  
   - *Steps*: Execute the inline script logic in DOM environment.  
   - *Assertion*: `document.documentElement.classList.contains('dark')` is `true`.  
   - *Verification*: DOM class assertion.
4. `T1-F06-04`: **Immediate Dark Class Removal on Stored `'light'`**  
   - *Input*: Set `localStorage.setItem('am_portfolio_theme', 'light')`.  
   - *Steps*: Execute inline script logic.  
   - *Assertion*: `document.documentElement.classList.contains('dark')` is `false`.  
   - *Verification*: DOM class assertion.
5. `T1-F06-05`: **Default to Dark on Empty LocalStorage**  
   - *Input*: Clear `localStorage` (`localStorage.clear()`).  
   - *Steps*: Execute inline script logic.  
   - *Assertion*: Defaults to adding `'dark'` class to `document.documentElement`.  
   - *Verification*: DOM class assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F06-01`: **Missing / Blocked LocalStorage Error Resilience**  
   - *Input*: Mock `localStorage.getItem` to throw `new Error("SecurityError: Access Denied")` (private browsing simulation).  
   - *Steps*: Execute inline script.  
   - *Assertion*: Script catches error gracefully (try/catch); does not throw uncaught error; defaults to `'dark'` mode.  
   - *Verification*: Exception handling assertion.
2. `T2-F06-02`: **Corrupt / Malformed LocalStorage Value Handling**  
   - *Input*: Set `localStorage.setItem('am_portfolio_theme', 'INVALID_THEME_xyz123')`.  
   - *Steps*: Execute inline script.  
   - *Assertion*: Script treats unrecognized value as dark default and adds `'dark'` class.  
   - *Verification*: DOM class assertion.
3. `T2-F06-03`: **Script Execution Latency Guarantee (Zero FOUC)**  
   - *Input*: Measure execution time of inline script.  
   - *Steps*: Run performance measurement (`performance.now()`).  
   - *Assertion*: Execution duration < 3ms.  
   - *Verification*: Performance timing benchmark.
4. `T2-F06-04`: **System Preference Integration when Storage is Clean**  
   - *Input*: Storage is empty; mock `window.matchMedia` for `prefers-color-scheme: light`.  
   - *Steps*: Execute script.  
   - *Assertion*: Script respects project dark-primary default or seamlessly matches preference without throwing.  
   - *Verification*: Behavioral assertion.
5. `T2-F06-05`: **Hydration Consistency between Inline Script and React State**  
   - *Input*: Mount React `App` after inline script execution.  
   - *Steps*: Inspect `ThemeContext` initial state.  
   - *Assertion*: React theme state matches `document.documentElement.className` without triggering a re-render flash or mismatch warning.  
   - *Verification*: Console warning and React state check.

---

### Feature 7: Theme Toggle Switch Component
- **Specification Source**: `ORIGINAL_REQUEST.md` line 55, 134; `PROJECT.md` line 28, line 86.
- **Contract**: Persistent toggle button with smooth icon transition, `ThemeContext`, updating `localStorage` (`am_portfolio_theme`).

#### Tier 1: Feature Coverage
1. `T1-F07-01`: **Theme Toggle Button Render in Navigation**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Query navigation for theme toggle button (`[data-testid="theme-toggle"]` or button with aria-label containing "theme").  
   - *Assertion*: Toggle button exists and is visible.  
   - *Verification*: DOM element presence check.
2. `T1-F07-02`: **Click Toggle: Dark to Light Transition**  
   - *Input*: App initially in dark mode (`document.documentElement` has class `'dark'`).  
   - *Steps*: Click theme toggle button.  
   - *Assertion*: Class `'dark'` is removed from `document.documentElement`; `localStorage.getItem('am_portfolio_theme')` equals `'light'`.  
   - *Verification*: DOM class and localStorage check.
3. `T1-F07-03`: **Click Toggle: Light to Dark Transition**  
   - *Input*: App in light mode.  
   - *Steps*: Click theme toggle button.  
   - *Assertion*: Class `'dark'` is added to `document.documentElement`; `localStorage.getItem('am_portfolio_theme')` equals `'dark'`.  
   - *Verification*: DOM class and localStorage check.
4. `T1-F07-04`: **Visual Icon State Transformation**  
   - *Input*: Inspect toggle button internal SVG icon in dark vs light mode.  
   - *Steps*: Toggle mode and query icon.  
   - *Assertion*: In dark mode, Moon icon (or Sun indicator) is rendered; in light mode, Sun icon (or Moon indicator) is rendered.  
   - *Verification*: SVG icon / title attribute inspection.
5. `T1-F07-05`: **State Persistence Across Page Refresh**  
   - *Input*: Set theme to `'light'` via toggle; reload window (`window.location.reload()`).  
   - *Steps*: Check DOM classes after reload.  
   - *Assertion*: `document.documentElement` remains in light mode without reverting to dark.  
   - *Verification*: Persistence test across reload.

#### Tier 2: Boundary & Corner Cases
1. `T2-F07-01`: **Rapid Multi-Click Stress Test**  
   - *Input*: Click toggle button 15 times within 300ms.  
   - *Steps*: Count toggle events and check final state.  
   - *Assertion*: Final state corresponds cleanly to odd/even clicks (15 clicks = opposite of start); zero uncaught state race conditions or UI desync.  
   - *Verification*: Rapid event firing test.
2. `T2-F07-02`: **Keyboard Tab Focus & Keypress Trigger**  
   - *Input*: Focus toggle button via `Tab` key.  
   - *Steps*: Dispatch `keydown` with `Enter` and `Space`.  
   - *Assertion*: Both keys successfully toggle the theme; focus ring is visibly rendered (`focus-visible`).  
   - *Verification*: Keyboard event assertion.
3. `T2-F07-03`: **ARIA Accessibility Attributes Compliance**  
   - *Input*: Query theme toggle button.  
   - *Steps*: Check `aria-label`, `role`, and `aria-pressed` / `aria-checked`.  
   - *Assertion*: Has `aria-label="Switch to light theme"` (or dark); role is `"button"` or `"switch"`.  
   - *Verification*: Accessibility attribute inspection.
4. `T2-F07-04`: **Cross-Tab Synchronization via Storage Event**  
   - *Input*: Simulate storage event: `window.dispatchEvent(new StorageEvent('storage', { key: 'am_portfolio_theme', newValue: 'light' }))`.  
   - *Steps*: Check active theme class and context state.  
   - *Assertion*: UI updates to light mode in current tab immediately without page reload.  
   - *Verification*: Storage event listener verification.
5. `T2-F07-05`: **Mobile Viewport (375px) Toggle Accessibility**  
   - *Input*: Viewport set to 375px.  
   - *Steps*: Query toggle position in header or mobile drawer.  
   - *Assertion*: Click target bounding box >= 40px x 40px; not obscured by hamburger button or logo.  
   - *Verification*: BoundingClientRect dimensions and hit-test.

---

### Feature 8: Typography & Google Fonts Loading
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 56, 138–139; `PROJECT.md` line 15, 29.
- **Contract**: Headings in Playfair Display (or Cormorant) serif; body in Inter (or Geist) sans-serif; Google Fonts preconnect and links in `index.html`.

#### Tier 1: Feature Coverage
1. `T1-F08-01`: **Google Fonts Preconnect Hints in `<head>`**  
   - *Input*: Read `index.html`.  
   - *Steps*: Query `<link rel="preconnect">` tags.  
   - *Assertion*: Contains preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (with `crossorigin`).  
   - *Verification*: HTML tag inspection.
2. `T1-F08-02`: **Font Stylesheet Link for Playfair Display & Inter**  
   - *Input*: Read `index.html`.  
   - *Steps*: Query `<link rel="stylesheet">` pointing to Google Fonts.  
   - *Assertion*: URL query contains `family=Playfair+Display` (or `Cormorant`) and `family=Inter` with `display=swap`.  
   - *Verification*: URL substring match.
3. `T1-F08-03`: **Tailwind Config Font Families Mapping**  
   - *Input*: Read `tailwind.config.js`.  
   - *Steps*: Inspect `theme.extend.fontFamily`.  
   - *Assertion*: `serif` includes `"Playfair Display"` (or `"Cormorant"`) and `sans` includes `"Inter"`.  
   - *Verification*: JS Object inspection.
4. `T1-F08-04`: **Serif Font Application on Primary Headings**  
   - *Input*: Navigate to `/` and `/about`.  
   - *Steps*: Query `h1` and `h2` elements; inspect computed `font-family`.  
   - *Assertion*: Computed `font-family` contains `"Playfair Display"` or serif fallback.  
   - *Verification*: `getComputedStyle(el).fontFamily`.
5. `T1-F08-05`: **Sans-Serif Font Application on Body and Paragraphs**  
   - *Input*: Navigate to `/` and `/about`.  
   - *Steps*: Query `<p>` elements; inspect computed `font-family`.  
   - *Assertion*: Computed `font-family` contains `"Inter"` or sans-serif fallback.  
   - *Verification*: `getComputedStyle(el).fontFamily`.

#### Tier 2: Boundary & Corner Cases
1. `T2-F08-01`: **Font Network Disconnection / Offline Resilience**  
   - *Input*: Block network requests to `fonts.googleapis.com` and `fonts.gstatic.com`.  
   - *Steps*: Load application.  
   - *Assertion*: Text renders immediately with fallback system fonts (Georgia/Times for serif, system-ui/Arial for sans-serif); zero invisible text flashes (`font-display: swap`).  
   - *Verification*: Fallback font rendering check.
2. `T2-F08-02`: **Mobile (375px) Heading Letter-Spacing & Hyphenation**  
   - *Input*: Viewport at 375px; inspect hero headline "Aadinath Magar".  
   - *Steps*: Measure text bounding box and computed `letter-spacing`.  
   - *Assertion*: Letter-spacing does not cause negative character collision or overflow outside viewport.  
   - *Verification*: DOM Geometry and visual bounding check.
3. `T2-F08-03`: **Multiple Font Weight Declarations Verification**  
   - *Input*: Inspect Google Fonts link and stylesheet.  
   - *Steps*: Verify requested font weights.  
   - *Assertion*: Includes at least 400 (regular), 600 (semi-bold), and 700 (bold) weights.  
   - *Verification*: Stylesheet query string inspection.
4. `T2-F08-04`: **Cumulative Layout Shift (CLS) Font Metric Minimization**  
   - *Input*: Simulate font swap event.  
   - *Steps*: Measure layout shift score via PerformanceObserver during font load.  
   - *Assertion*: Cumulative Layout Shift (CLS) attributed to typography <= 0.05.  
   - *Verification*: Performance API CLS measurement.
5. `T2-F08-05`: **Special Characters & Typographic Monogram Rendering**  
   - *Input*: Inspect editorial elements with em-dashes ("A—M"), quotes, and currency symbols.  
   - *Steps*: Verify glyph rendering.  
   - *Assertion*: Characters render without tofu (``) or unprintable box artifacts.  
   - *Verification*: Text rendering inspection.

---

### Feature 9: "A.M." Monogram Preloader
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 41, 95, 130; `PROJECT.md` line 30.
- **Contract**: Branded screen with "A.M." monogram, 0–100% counter, progress bar, curtain exit revealing hero.

#### Tier 1: Feature Coverage
1. `T1-F09-01`: **Preloader Element Mounting on Initial Load**  
   - *Input*: Fresh page load at `/`.  
   - *Steps*: Query `[data-testid="preloader"]` or `.preloader-container`.  
   - *Assertion*: Preloader element exists in DOM with fixed full-screen overlay styles (`position: fixed; inset: 0; z-index: 99999`).  
   - *Verification*: DOM presence and style check.
2. `T1-F09-02`: **"A.M." Monogram Render**  
   - *Input*: Inspect preloader content during active phase.  
   - *Steps*: Query monogram text/SVG element.  
   - *Assertion*: Displays `"A.M."` or stylized monogram initials.  
   - *Verification*: Text / SVG element check.
3. `T1-F09-03`: **Numeric Counter Progression (0% to 100%)**  
   - *Input*: Observe preloader counter element over time.  
   - *Steps*: Sample counter text value at intervals.  
   - *Assertion*: Initial value is `"0%"` (or near 0); counter increments monotonically and reaches `"100%"`.  
   - *Verification*: Monotonic progression assertion.
4. `T1-F09-04`: **Progress Bar Visual Fill**  
   - *Input*: Inspect progress bar element inside preloader.  
   - *Steps*: Measure computed `width` or `scaleX`.  
   - *Assertion*: Scales from 0 to full width (100%) in synchronization with numeric counter.  
   - *Verification*: CSS transform / width animation check.
5. `T1-F09-05`: **Curtain Exit & Interactive Hero Reveal**  
   - *Input*: Wait for preloader to reach 100%.  
   - *Steps*: Observe exit animation and hero interactive state.  
   - *Assertion*: Preloader triggers exit slide animation; overlay becomes `pointer-events: none` or unmounts; Hero CTA buttons become clickable.  
   - *Verification*: Computed pointer-events / DOM removal assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F09-01`: **One-Shot Session Storage Guard**  
   - *Input*: Complete preloader once; navigate from `/` to `/about` and back to `/`.  
   - *Steps*: Check if preloader re-triggers full 0-100% delay.  
   - *Assertion*: Subsequent internal route visits do not replay full preloader blocking the user.  
   - *Verification*: Session state check.
2. `T2-F09-02`: **Maximum Timeout Safety Ceiling**  
   - *Input*: Simulate slow asset loading (network delay on heavy 3D assets).  
   - *Steps*: Measure time until preloader completes and dismisses.  
   - *Assertion*: Preloader forcibly dismisses within <= 2500ms fallback ceiling to guarantee usability.  
   - *Verification*: Max timeout assertion.
3. `T2-F09-03`: **Keyboard Focus Trap Prevention During Preload**  
   - *Input*: Press `Tab` while preloader is active.  
   - *Steps*: Check active element in document.  
   - *Assertion*: Focus does not pass to hidden background inputs or links behind preloader.  
   - *Verification*: ActiveElement containment check.
4. `T2-F09-04`: **Mobile (375px) Monogram & Counter Centering**  
   - *Input*: Viewport set to 375px x 667px.  
   - *Steps*: Calculate center offset of monogram and counter.  
   - *Assertion*: Elements are horizontally and vertically centered; zero clipping at screen edges.  
   - *Verification*: Geometry bounding box calculation.
5. `T2-F09-05`: **Accessibility / Screen Reader Live Region**  
   - *Input*: Inspect preloader container attributes.  
   - *Steps*: Check ARIA progressbar or aria-live attributes.  
   - *Assertion*: Has `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"`, and dynamic `aria-valuenow`.  
   - *Verification*: Accessibility attribute assertion.

---

### Feature 10: High-Performance Custom Cursor
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 97–100, 132; `PROJECT.md` line 31, 87.
- **Contract**: Dual dot/ring cursor, GSAP `quickTo` / spring follow, hover scale, project "View" label, touch suppression.

#### Tier 1: Feature Coverage
1. `T1-F10-01`: **Custom Cursor Elements Mounting on Desktop**  
   - *Input*: Viewport set to 1280px x 800px.  
   - *Steps*: Query cursor DOM elements (`[data-testid="custom-cursor"]` or `.custom-cursor-dot`, `.custom-cursor-ring`).  
   - *Assertion*: Elements exist in DOM with `pointer-events: none` and `position: fixed`.  
   - *Verification*: DOM query and CSS style check.
2. `T1-F10-02`: **Mouse Coordinate Tracking**  
   - *Input*: Dispatch `mousemove` event at client coordinates `(x: 350, y: 420)`.  
   - *Steps*: Wait for animation frame and inspect cursor transform style.  
   - *Assertion*: Cursor element translates to `(350px, 420px)` (accounting for center offset).  
   - *Verification*: Transform matrix / translate style inspection.
3. `T1-F10-03`: **Interactive Element Hover Scaling**  
   - *Input*: Dispatch `mouseenter` over a `<button>` or `<a>` link.  
   - *Steps*: Inspect computed scale or class of cursor outer ring.  
   - *Assertion*: Cursor ring expands in scale (e.g. `scale(1.5)` or adds `.cursor-hover` class) and accent color illuminates.  
   - *Verification*: Computed transform / class assertion.
4. `T1-F10-04`: **Project Card Hover Label ("View" / "Open")**  
   - *Input*: Dispatch `mouseenter` over a project card (`[data-testid="project-card"]`).  
   - *Steps*: Query text content inside cursor element.  
   - *Assertion*: Cursor displays label text `"View"` or `"Open"`.  
   - *Verification*: DOM Text inspection inside cursor element.
5. `T1-F10-05`: **Document Mouseleave Cursor Invisibility**  
   - *Input*: Dispatch `mouseleave` on `document.documentElement`.  
   - *Steps*: Inspect cursor opacity / visibility.  
   - *Assertion*: Cursor opacity transitions to `0` or `display: none`.  
   - *Verification*: Computed opacity assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F10-01`: **Touch Device Suppression (375px Mobile)**  
   - *Input*: Viewport at 375px; emulate touch screen (`window.matchMedia('(pointer: coarse)').matches === true`).  
   - *Steps*: Check visibility and display of custom cursor elements.  
   - *Assertion*: Custom cursor is hidden (`display: none` or not rendered); native touch interaction unimpeded.  
   - *Verification*: Touch media query assertion.
2. `T2-F10-02`: **High-Frequency Mousemove Jitter Prevention (120Hz/144Hz)**  
   - *Input*: Dispatch 500 `mousemove` events within 50ms.  
   - *Steps*: Monitor React component re-render count.  
   - *Assertion*: React component does NOT re-render on every mouse event (uses direct DOM / GSAP `quickTo` animation).  
   - *Verification*: React profiler / render counter assertion.
3. `T2-F10-03`: **Native Cursor Suppression Synchronization**  
   - *Input*: Inspect `body` style on desktop when custom cursor is active.  
   - *Steps*: Check computed `cursor` property of `body`.  
   - *Assertion*: `cursor: none` is applied on desktop pointer viewports.  
   - *Verification*: Computed style check.
4. `T2-F10-04`: **Screen Boundary Edge Clamp & Window Re-Entry**  
   - *Input*: Move cursor to `(x: 0, y: 0)` then immediately to `(x: 1280, y: 800)`.  
   - *Steps*: Check cursor coordinates.  
   - *Assertion*: Cursor element tracks accurately without NaN coordinates or hanging off-screen.  
   - *Verification*: Coordinate boundary check.
5. `T2-F10-05`: **Tactile Click Mousedown Compression**  
   - *Input*: Dispatch `mousedown` on window.  
   - *Steps*: Inspect cursor ring scale.  
   - *Assertion*: Cursor ring compresses slightly (`scale(0.8)`); on `mouseup`, rebounds back to normal.  
   - *Verification*: Transform scale animation check.

---

### Feature 11: Viewport Scroll Progress Bar
- **Specification Source**: `ORIGINAL_REQUEST.md` line 101, 133; `PROJECT.md` line 32.
- **Contract**: Top fixed 2px–3px bar filling 0%–100% on page scroll, accent color, zero GPU thrash.

#### Tier 1: Feature Coverage
1. `T1-F11-01`: **Scroll Progress Bar Container Positioning**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Query `[data-testid="scroll-progress"]` or `.scroll-progress-bar`.  
   - *Assertion*: Element has `position: fixed; top: 0; left: 0; z-index >= 50; height: 2px` (or `3px`).  
   - *Verification*: Computed CSS style inspection.
2. `T1-F11-02`: **Initial Zero Scroll State**  
   - *Input*: At page top (`window.scrollY === 0`).  
   - *Steps*: Inspect computed `transform` or `width` of the indicator bar.  
   - *Assertion*: `scaleX` is `0` (or `width: 0%`).  
   - *Verification*: Computed style inspection.
3. `T1-F11-03`: **Mid-Page Scroll Progress Proportionality**  
   - *Input*: Scroll page to 50% of maximum scroll height (`scrollY = maxScroll / 2`).  
   - *Steps*: Inspect indicator progress.  
   - *Assertion*: `scaleX` is approximately `0.5` (within +/- 0.05 tolerance).  
   - *Verification*: Numeric progress calculation.
4. `T1-F11-04`: **Full Scroll Bottom Completion (100%)**  
   - *Input*: Scroll page to maximum scroll height (`scrollY = maxScroll`).  
   - *Steps*: Inspect indicator progress.  
   - *Assertion*: `scaleX` equals `1` (or `width: 100%`).  
   - *Verification*: Computed progress assertion.
5. `T1-F11-05`: **Neon Accent Color Token Application**  
   - *Input*: Inspect progress bar color.  
   - *Steps*: Query computed `background-color`.  
   - *Assertion*: Matches neon cyan (`#00f0ff`) or accent gold (`#fbbf24`).  
   - *Verification*: Computed color assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F11-01`: **Zero-Scroll Short Page Resilience (No NaN Errors)**  
   - *Input*: Render a view where `document.documentElement.scrollHeight <= window.innerHeight`.  
   - *Steps*: Evaluate progress calculation formula.  
   - *Assertion*: Does not divide by zero; `scaleX` remains `0` without emitting `NaN` in CSS transform.  
   - *Verification*: Transform string check for `NaN`.
2. `T2-F11-02`: **Dynamic Window Resize Recalculation**  
   - *Input*: Scroll to midpoint, then resize window height from 800px to 400px.  
   - *Steps*: Trigger `resize` event.  
   - *Assertion*: Progress bar recalculates progress against new scrollable height immediately.  
   - *Verification*: Re-evaluated scroll progress check.
3. `T2-F11-03`: **Mobile Touch Viewport (375px) Tracking**  
   - *Input*: Viewport at 375px; dispatch mobile touch scroll events.  
   - *Steps*: Monitor progress bar updates.  
   - *Assertion*: Updates continuously during mobile scroll without jumping or lagging behind touch.  
   - *Verification*: Touch scroll event response test.
4. `T2-F11-04`: **Route Change Immediate Reset**  
   - *Input*: Scroll to bottom of `/` (100%), then navigate to `/contact`.  
   - *Steps*: Inspect progress bar immediately upon new route mount.  
   - *Assertion*: Progress bar resets to `0%` immediately.  
   - *Verification*: Reset assertion on route navigation.
5. `T2-F11-05`: **Transform vs Reflow Optimization Audit**  
   - *Input*: Inspect CSS implementation of progress indicator.  
   - *Steps*: Verify animation property.  
   - *Assertion*: Uses `transform: scaleX(...)` with `transform-origin: left` rather than animating `width` to prevent browser layout reflow.  
   - *Verification*: CSS rule / performance property inspection.

---

### Feature 12: Sticky Header & Desktop Hover
- **Specification Source**: `ORIGINAL_REQUEST.md` line 102; `PROJECT.md` line 33.
- **Contract**: Sticky glassmorphic navbar (`backdrop-blur`), logo "A—M", 5 desktop links with clip-path hover.

#### Tier 1: Feature Coverage
1. `T1-F12-01`: **Sticky / Fixed Navbar Header Positioning**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Query `<header>` element.  
   - *Assertion*: Position is `fixed` or `sticky; top: 0; z-index >= 40`.  
   - *Verification*: Computed style check.
2. `T1-F12-02`: **Glassmorphic Backdrop Blur Styling**  
   - *Input*: Inspect header CSS classes.  
   - *Steps*: Check computed backdrop-filter.  
   - *Assertion*: Contains `backdrop-blur` (e.g. `backdrop-filter: blur(...)`) and semi-transparent background color.  
   - *Verification*: Computed style inspection.
3. `T1-F12-03`: **Branded Editorial Logo ("A—M") Link**  
   - *Input*: Locate logo element on header left.  
   - *Steps*: Query text and `href`.  
   - *Assertion*: Text contains `"A—M"` (or `"Aadinath.dev"`); `href` links to `/`.  
   - *Verification*: Text and attribute check.
4. `T1-F12-04`: **Complete 5-Page Desktop Navigation Links**  
   - *Input*: Desktop viewport (1280px).  
   - *Steps*: Query desktop nav links inside `<nav>`.  
   - *Assertion*: Renders links to Home (`/`), About (`/about`), Projects (`/projects`), Blog (`/blog`), Contact (`/contact`).  
   - *Verification*: DOM links inventory check.
5. `T1-F12-05`: **Clip-Path Reveal / Underline Hover Micro-Interaction**  
   - *Input*: Hover over desktop nav link.  
   - *Steps*: Inspect hover pseudo-element or inner text span animation.  
   - *Assertion*: Animated clip-path or underline element activates on `:hover`.  
   - *Verification*: CSS hover rule inspection.

#### Tier 2: Boundary & Corner Cases
1. `T2-F12-01`: **Scroll-Driven Elevation Transition**  
   - *Input*: Scroll page from `scrollY = 0` to `scrollY = 100px`.  
   - *Steps*: Inspect header class list / border style.  
   - *Assertion*: Header gains subtle bottom border or enhanced background opacity when scrolled down.  
   - *Verification*: Scroll state class assertion.
2. `T2-F12-02`: **Breakpoint Visibility Transition at 768px**  
   - *Input*: Resize viewport from 769px to 767px.  
   - *Steps*: Query desktop navigation link container.  
   - *Assertion*: Desktop nav container becomes hidden (`display: none` or Tailwind `hidden md:flex`).  
   - *Verification*: Responsive display style assertion.
3. `T2-F12-03`: **Sequential Keyboard Tab Navigation**  
   - *Input*: Press `Tab` starting from document top.  
   - *Steps*: Record focus order.  
   - *Assertion*: Order follows Logo -> Home -> About -> Projects -> Blog -> Contact -> Theme Toggle -> Resume/Action.  
   - *Verification*: Focus order array check.
4. `T2-F12-04`: **Logo Click on Active Home Route (Scroll to Top)**  
   - *Input*: At `/`, scroll down 1500px; click logo.  
   - *Steps*: Monitor scroll position.  
   - *Assertion*: Page scrolls back to top (`scrollY === 0`).  
   - *Verification*: Scroll position assertion.
5. `T2-F12-05`: **Extreme Browser Zoom (200%) Layout Integrity**  
   - *Input*: Set viewport emulation to 200% zoom (640px equivalent width).  
   - *Steps*: Inspect header items.  
   - *Assertion*: Nav elements do not wrap into overlapping second line breaking header height.  
   - *Verification*: Header height bounding box check.

---

### Feature 13: Responsive Mobile Menu
- **Specification Source**: `ORIGINAL_REQUEST.md` line 102; `PROJECT.md` line 34.
- **Contract**: Hamburger button (< 768px), fullscreen overlay menu, staggered link entrance, body scroll lock.

#### Tier 1: Feature Coverage
1. `T1-F13-01`: **Hamburger Button Mobile Visibility & Desktop Invisibility**  
   - *Input*: Viewport at 375px vs 1280px.  
   - *Steps*: Query hamburger toggle button (`[data-testid="hamburger-btn"]`).  
   - *Assertion*: Button is visible (`display != none`) at 375px; button is hidden at 1280px (`hidden md:flex`).  
   - *Verification*: Computed visibility check.
2. `T1-F13-02`: **Overlay Menu Open on Hamburger Click**  
   - *Input*: Viewport at 375px; click hamburger button.  
   - *Steps*: Query mobile menu overlay element (`[data-testid="mobile-menu"]`).  
   - *Assertion*: Overlay mounts with full-screen coverage (`position: fixed; inset: 0; z-index >= 45`).  
   - *Verification*: DOM element presence and style assertion.
3. `T1-F13-03`: **Complete 5-Page Mobile Nav Links Render**  
   - *Input*: Open mobile menu at 375px.  
   - *Steps*: Query links inside overlay.  
   - *Assertion*: Displays Home (`/`), About (`/about`), Projects (`/projects`), Blog (`/blog`), Contact (`/contact`).  
   - *Verification*: Links text and href assertion.
4. `T1-F13-04`: **Auto-Close Overlay on Navigation Link Click**  
   - *Input*: Open mobile menu; click "About" link.  
   - *Steps*: Observe route change and mobile overlay visibility.  
   - *Assertion*: URL updates to `/about`; mobile overlay closes (`display: none` or unmounted).  
   - *Verification*: Route change and DOM dismissal assertion.
5. `T1-F13-05`: **Close Button / Toggle Click to Dismiss**  
   - *Input*: Open mobile menu; click close button (or toggle again).  
   - *Steps*: Inspect overlay state.  
   - *Assertion*: Overlay closes smoothly; hamburger icon returns to normal state.  
   - *Verification*: Overlay dismissal assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F13-01`: **Body Scroll Lock / Unlock State Management**  
   - *Input*: Open mobile menu; check `document.body.style.overflow`; close mobile menu; re-check.  
   - *Steps*: Inspect body overflow property.  
   - *Assertion*: `document.body.style.overflow === 'hidden'` while menu is open; reverts to `''` or `'unset'` when closed.  
   - *Verification*: Body style assertion.
2. `T2-F13-02`: **Escape (ESC) Key Dismissal Handler**  
   - *Input*: Open mobile menu; dispatch `keydown` event with `{ key: 'Escape' }`.  
   - *Steps*: Inspect overlay state.  
   - *Assertion*: Menu closes immediately; body scroll lock releases.  
   - *Verification*: Keyboard event response test.
3. `T2-F13-03`: **Viewport Width Resize While Menu Open**  
   - *Input*: Open mobile menu at 375px; resize viewport width to 1024px.  
   - *Steps*: Check overlay and body overflow.  
   - *Assertion*: Mobile menu closes automatically; body scroll is unlocked on desktop.  
   - *Verification*: Resize listener assertion.
4. `T2-F13-04`: **ARIA Expanded & Accessibility State**  
   - *Input*: Inspect hamburger button attributes when closed vs open.  
   - *Steps*: Check `aria-expanded` and `aria-controls`.  
   - *Assertion*: `aria-expanded` toggles from `"false"` to `"true"`; `aria-label` reflects current state ("Open navigation" / "Close navigation").  
   - *Verification*: Accessibility attribute assertion.
5. `T2-F13-05`: **Mobile Menu Quick Social Links Presence**  
   - *Input*: Open mobile menu at 375px.  
   - *Steps*: Query social links at bottom of drawer.  
   - *Assertion*: GitHub and LinkedIn links are rendered with minimum touch target size (>= 44px x 44px).  
   - *Verification*: Touch target size and presence assertion.

---

### Feature 14: Layout Shell & Lenis Setup
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 51, 135; `PROJECT.md` lines 10, 35, 90–96.
- **Contract**: Master layout shell, Lenis smooth scrolling coordinated with GSAP ticker (`lagSmoothing(0)`), route scroll reset.

#### Tier 1: Feature Coverage
1. `T1-F14-01`: **Master Layout Component Wrapping Application**  
   - *Input*: Inspect component hierarchy in `App.jsx`.  
   - *Steps*: Check root layout wrapper.  
   - *Assertion*: `Layout.jsx` wraps Header, dynamic page `<main>`, and Footer.  
   - *Verification*: React tree / DOM wrapper inspection.
2. `T1-F14-02`: **Lenis Smooth Scroll Instance Initialization**  
   - *Input*: Load app on desktop.  
   - *Steps*: Check `window.__lenis` or inspect Lenis instance creation in `useLenis` hook.  
   - *Assertion*: Lenis is instantiated with smooth scrolling parameters enabled.  
   - *Verification*: Instance existence assertion.
3. `T1-F14-03`: **Lenis Scroll Event Coordination with GSAP ScrollTrigger**  
   - *Input*: Read `src/hooks/useLenis.js` (or Layout component).  
   - *Steps*: Check Lenis event listener registration.  
   - *Assertion*: Contains `lenis.on('scroll', ScrollTrigger.update)`.  
   - *Verification*: Code AST / hook verification.
4. `T1-F14-04`: **GSAP Ticker Integration with Lag Smoothing(0)**  
   - *Input*: Inspect GSAP ticker registration.  
   - *Steps*: Check ticker hooks.  
   - *Assertion*: Registers `gsap.ticker.add(...)` calling `lenis.raf` and sets `gsap.ticker.lagSmoothing(0)`.  
   - *Verification*: Code AST / runtime ticker assertion.
5. `T1-F14-05`: **Route Change Scroll Restoration to Top**  
   - *Input*: Scroll down 800px on `/`; click "About" link.  
   - *Steps*: Observe scroll position on `/about`.  
   - *Assertion*: Scroll position immediately resets to `0` via `lenis.scrollTo(0, { immediate: true })`.  
   - *Verification*: Scroll position assertion after route navigation.

#### Tier 2: Boundary & Corner Cases
1. `T2-F14-01`: **Unmount & Route Cleanup (Zero Memory Leaks)**  
   - *Input*: Mount and unmount Layout / navigation routes 5 times.  
   - *Steps*: Check active GSAP ticker callbacks and event listeners.  
   - *Assertion*: Old listeners removed; single active Lenis RAF listener remains.  
   - *Verification*: Event listener leak audit.
2. `T2-F14-02`: **`prefers-reduced-motion` Scroll Fallback**  
   - *Input*: Set `window.matchMedia('(prefers-reduced-motion: reduce)')` to match.  
   - *Steps*: Inspect Lenis configuration or native scrolling behavior.  
   - *Assertion*: Smooth scroll easing is disabled or duration reduced to 0 for instant response.  
   - *Verification*: Reduced motion configuration assertion.
3. `T2-F14-03`: **Anchor Hash Navigation Coordination (`#skills`, `#contact`)**  
   - *Input*: Trigger navigation to `/#skills`.  
   - *Steps*: Monitor scroll behavior.  
   - *Assertion*: Lenis scrolls smoothly to the target section element without skipping or jumping.  
   - *Verification*: Target element scroll offset assertion.
4. `T2-F14-04`: **Touch Screen Native Scrolling Delegation (375px)**  
   - *Input*: Viewport at 375px mobile touch device.  
   - *Steps*: Evaluate Lenis touch options (`smoothTouch: false` or touch bypass).  
   - *Assertion*: Native touch momentum scrolling is preserved without rubber-band stutter.  
   - *Verification*: Mobile touch scroll benchmark.
5. `T2-F14-05`: **Dynamic DOM Mutation Height Recalculation**  
   - *Input*: Dynamically expand a collapsed section adding 600px of height.  
   - *Steps*: Trigger `lenis.resize()` or observe auto-resize.  
   - *Assertion*: Lenis `limit` updates to match new `scrollHeight - clientHeight`.  
   - *Verification*: Lenis limit dimension check.

---

### Feature 15: Home Hero Content & Word Stagger
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 62, 138–142; `PROJECT.md` line 36.
- **Contract**: Headline "Aadinath Magar", subtitle "Full-Stack Developer", Framer Motion word stagger, Resume CTA button.

#### Tier 1: Feature Coverage
1. `T1-F15-01`: **Hero Section Container Render**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Query `[data-testid="hero-section"]` or `<section>` containing hero content.  
   - *Assertion*: Section exists with full viewport height styling (`min-h-screen` or `100vh`).  
   - *Verification*: DOM container check.
2. `T1-F15-02`: **Primary Headline "Aadinath Magar" Render**  
   - *Input*: Query `h1` in hero section.  
   - *Steps*: Check text content.  
   - *Assertion*: Text matches `"Aadinath Magar"`.  
   - *Verification*: DOM Text node assertion.
3. `T1-F15-03`: **Subtitle "Full-Stack Developer" Render**  
   - *Input*: Query subtitle element in hero section.  
   - *Steps*: Check text content.  
   - *Assertion*: Text matches `"Full-Stack Developer"`.  
   - *Verification*: DOM Text node assertion.
4. `T1-F15-04`: **Word / Letter Stagger Animation Wrapper**  
   - *Input*: Inspect DOM structure of `h1`.  
   - *Steps*: Check for Framer Motion span wrappers (`motion.span` or inline block spans).  
   - *Assertion*: Words are wrapped in separate animated span elements with staggered delays.  
   - *Verification*: DOM AST / class inspection.
5. `T1-F15-05`: **Resume CTA Button Verification**  
   - *Input*: Locate "Download Resume" / "Resume" button in hero.  
   - *Steps*: Query attributes.  
   - *Assertion*: Button has `href="/Aadi_Resume-04-09-2026.pdf"`, text indicating resume download, and visible icon.  
   - *Verification*: Attribute and text assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F15-01`: **Responsive Fluid Headline Typography (375px vs 768px vs 1280px)**  
   - *Input*: Measure `h1` font size at 375px, 768px, and 1280px viewports.  
   - *Steps*: Calculate computed `font-size`.  
   - *Assertion*: Font size scales progressively (e.g. >= 2rem at 375px, >= 3.5rem at 768px, >= 5rem at 1280px); zero horizontal clipping.  
   - *Verification*: Computed font size comparison.
2. `T2-F15-02`: **Scroll Parallax Translation Offset**  
   - *Input*: Scroll down 300px from top.  
   - *Steps*: Measure computed transform of hero content container.  
   - *Assertion*: Hero container translates with vertical parallax offset (`translateY` or `opacity` change).  
   - *Verification*: Transform matrix assertion on scroll.
3. `T2-F15-03`: **`prefers-reduced-motion` Immediate Opacity**  
   - *Input*: Set `prefers-reduced-motion: reduce`.  
   - *Steps*: Check initial opacity and transform of hero words.  
   - *Assertion*: Words render immediately at `opacity: 1` with `transform: none` without stagger latency.  
   - *Verification*: Computed style assertion under reduced motion.
4. `T2-F15-04`: **Secondary CTA Action Navigation**  
   - *Input*: Click secondary CTA button ("Explore Projects" / "Contact Me").  
   - *Steps*: Observe navigation target.  
   - *Assertion*: Navigates to `/projects` or `/contact` seamlessly.  
   - *Verification*: Route change assertion.
5. `T2-F15-05`: **Dark and Light Background Contrast on Hero Text**  
   - *Input*: Measure headline text color against background canvas in dark vs light mode.  
   - *Steps*: Calculate contrast ratio.  
   - *Assertion*: Ratio >= 4.5:1 in both modes.  
   - *Verification*: Contrast measurement.

---

### Feature 16: Animated Stats Counter Grid
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 35–40, 63; `PROJECT.md` line 37.
- **Contract**: 4 stats ("2 Projects Shipped", "500+ Job Applications", "MERN Stack", "India"), animated on scroll into view.

#### Tier 1: Feature Coverage
1. `T1-F16-01`: **Stats Counter Section Render**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Query `[data-testid="stats-section"]` or `.stats-grid`.  
   - *Assertion*: Section exists and renders 4 distinct stat items.  
   - *Verification*: DOM item count check.
2. `T1-F16-02`: **Stat 1: "2 Projects Shipped" Verification**  
   - *Input*: Scroll stats section into view.  
   - *Steps*: Query first stat card value and label.  
   - *Assertion*: Displays number `"2"` with label containing `"Projects"`.  
   - *Verification*: Text node assertion.
3. `T1-F16-03`: **Stat 2: "500+ Job Applications" Verification**  
   - *Input*: Scroll stats section into view.  
   - *Steps*: Query second stat card value and label.  
   - *Assertion*: Displays `"500+"` (or counts to 500 with `+` suffix) and label containing `"Applications"`.  
   - *Verification*: Text node assertion.
4. `T1-F16-04`: **Stat 3: "MERN Stack" Verification**  
   - *Input*: Query third stat card.  
   - *Steps*: Inspect value and label text.  
   - *Assertion*: Displays `"MERN Stack"` (or `"MERN"`) with label indicating specialization/focus.  
   - *Verification*: Text node assertion.
5. `T1-F16-05`: **Stat 4: "India" Location Verification**  
   - *Input*: Query fourth stat card.  
   - *Steps*: Inspect value and label text.  
   - *Assertion*: Displays `"India"` (or `"Based in India"`).  
   - *Verification*: Text node assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F16-01`: **Scroll Trigger Activation on Viewport Intersection**  
   - *Input*: Start at top of page (`scrollY = 0`).  
   - *Steps*: Check counter value before scrolling; scroll stats section into view; wait 1000ms.  
   - *Assertion*: Counters do not finish animating while out of view; animate to final numbers upon intersection.  
   - *Verification*: IntersectionObserver trigger assertion.
2. `T2-F16-02`: **Non-Retriggering Stability on Repeat Scroll**  
   - *Input*: Scroll past stats section, then scroll back up and down across it 3 times.  
   - *Steps*: Inspect displayed values.  
   - *Assertion*: Numbers remain stable at `"2"` and `"500+"` without resetting to 0 or flashing.  
   - *Verification*: Stability check across multiple scroll cycles.
3. `T2-F16-03`: **Responsive Grid Wrapping (375px vs 768px vs 1280px)**  
   - *Input*: Measure card grid columns at 375px (1 or 2 cols), 768px (2 cols), 1280px (4 cols in single row).  
   - *Steps*: Inspect computed CSS grid `grid-template-columns`.  
   - *Assertion*: Matches responsive grid layout without text overflow or card clipping.  
   - *Verification*: Computed CSS grid assertion.
4. `T2-F16-04`: **Numeric Increment Smoothness (Zero NaN or Floating Glitches)**  
   - *Input*: Sample counter text every 50ms during animation.  
   - *Steps*: Parse sampled values.  
   - *Assertion*: Every intermediate value is a valid integer string; never produces `NaN`, `undefined`, or decimal fractions.  
   - *Verification*: Value parsing assertion.
5. `T2-F16-05`: **`prefers-reduced-motion` Immediate Final Values**  
   - *Input*: Enable `prefers-reduced-motion: reduce`.  
   - *Steps*: Load stats section.  
   - *Assertion*: Values show `"2"` and `"500+"` instantly without counting duration.  
   - *Verification*: Reduced motion test.

---

## 4. Detailed Test Specification Matrix: Features 17 to 31, and 34

### Feature 17: Skills Layer 1: Infinite Marquee
- **Specification Source**: `ORIGINAL_REQUEST.md` line 65, 123; `PROJECT.md` line 38.
- **Contract**: Horizontal infinite ticker, continuous loop, tech badges (React, Node.js, MongoDB, Express, Tailwind, Git, Vite, JavaScript).

#### Tier 1: Feature Coverage
1. `T1-F17-01`: **Marquee Container & Overflow Styling**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Query `[data-testid="skills-marquee"]` or `.marquee-container`.  
   - *Assertion*: Container has `overflow: hidden; white-space: nowrap`.  
   - *Verification*: Computed style inspection.
2. `T1-F17-02`: **Core 8 Technologies Verification**  
   - *Input*: Query all tech badges inside marquee track.  
   - *Steps*: Extract text content of all badges.  
   - *Assertion*: Contains: `"React"`, `"Node.js"` (or `"Node"`), `"MongoDB"`, `"Express"`, `"Tailwind CSS"` (or `"Tailwind"`), `"Git"`, `"Vite"`, `"JavaScript"`.  
   - *Verification*: Array containment assertion.
3. `T1-F17-03`: **Tech Logo / Icon Render on Badges**  
   - *Input*: Query child elements of each tech badge.  
   - *Steps*: Check for SVG icon or image.  
   - *Assertion*: Each technology badge renders an associated vector icon or logo.  
   - *Verification*: DOM child presence check.
4. `T1-F17-04`: **Duplicate Track for Seamless Infinite Looping**  
   - *Input*: Inspect child tracks within marquee.  
   - *Steps*: Count instances of the tech badges list.  
   - *Assertion*: Contains at least 2 identical sets of items (original + clone track) to prevent blank gaps during animation wrap.  
   - *Verification*: DOM element count comparison.
5. `T1-F17-05`: **Continuous Translation Animation Declaration**  
   - *Input*: Inspect CSS animation or GSAP tween on marquee track.  
   - *Steps*: Check computed `animation-name` or inline `transform`.  
   - *Assertion*: Has active animation with `animation-iteration-count: infinite; animation-timing-function: linear`.  
   - *Verification*: Computed CSS animation property check.

#### Tier 2: Boundary & Corner Cases
1. `T2-F17-01`: **Hover Pause / Deceleration Micro-Interaction**  
   - *Input*: Dispatch `mouseenter` over marquee container.  
   - *Steps*: Inspect `animation-play-state`.  
   - *Assertion*: Computed `animation-play-state` becomes `"paused"` (or speed slows down substantially).  
   - *Verification*: Computed style assertion on hover.
2. `T2-F17-02`: **Mobile Viewport (375px) Horizontal Scroll Containment**  
   - *Input*: Viewport at 375px.  
   - *Steps*: Measure `document.documentElement.scrollWidth`.  
   - *Assertion*: Running marquee does not induce horizontal window scrolling (`scrollWidth <= 375`).  
   - *Verification*: Window scrollWidth assertion.
3. `T2-F17-03`: **GPU Hardware Acceleration Layer**  
   - *Input*: Inspect CSS properties of moving track.  
   - *Steps*: Check `will-change` and `transform`.  
   - *Assertion*: Uses `transform: translateX(...)` with `will-change: transform` to prevent CPU rasterization lag.  
   - *Verification*: CSS rule inspection.
4. `T2-F17-04`: **Background Tab Switch Throttling Recovery**  
   - *Input*: Dispatch `visibilitychange` (`document.hidden = true`), wait 2000ms, then dispatch `document.hidden = false`.  
   - *Steps*: Observe animation track position.  
   - *Assertion*: Marquee resumes smoothly without jumping across the screen or tearing.  
   - *Verification*: Visibility recovery test.
5. `T2-F17-05`: **`prefers-reduced-motion` Accessible Representation**  
   - *Input*: Enable `prefers-reduced-motion: reduce`.  
   - *Steps*: Check animation state.  
   - *Assertion*: Translation animation is stopped (`animation: none`); items render in accessible wrap or scrollable row.  
   - *Verification*: Reduced motion style check.

---

### Feature 18: Skills Layer 2: Bento Grid
- **Specification Source**: `ORIGINAL_REQUEST.md` line 66, 123; `PROJECT.md` line 39.
- **Contract**: Asymmetric bento grid, 4 domain categories (Frontend, Backend, Database, Tools), scroll-progress proficiency bars.

#### Tier 1: Feature Coverage
1. `T1-F18-01`: **4 Domain Category Cards Render**  
   - *Input*: Navigate to `/` (Skills section).  
   - *Steps*: Query bento cards (`[data-testid="bento-card"]`).  
   - *Assertion*: Renders 4 domain cards: Frontend, Backend, Database, Tools.  
   - *Verification*: DOM count and card heading text check.
2. `T1-F18-02`: **Frontend Skills Domain Content**  
   - *Input*: Query Frontend bento card.  
   - *Steps*: Inspect listed technologies.  
   - *Assertion*: Contains React, JavaScript, HTML5, CSS3, Tailwind CSS with associated proficiency indicators.  
   - *Verification*: Card contents assertion.
3. `T1-F18-03`: **Backend Skills Domain Content**  
   - *Input*: Query Backend bento card.  
   - *Steps*: Inspect listed technologies.  
   - *Assertion*: Contains Node.js, Express.js, and REST APIs.  
   - *Verification*: Card contents assertion.
4. `T1-F18-04`: **Database Skills Domain Content**  
   - *Input*: Query Database bento card.  
   - *Steps*: Inspect listed technologies.  
   - *Assertion*: Contains MongoDB and Mongoose.  
   - *Verification*: Card contents assertion.
5. `T1-F18-05`: **Tools Skills Domain Content**  
   - *Input*: Query Tools bento card.  
   - *Steps*: Inspect listed technologies.  
   - *Assertion*: Contains Git, GitHub, Vite, VS Code, Vercel.  
   - *Verification*: Card contents assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F18-01`: **Proficiency Bar Scroll Progress Fill Animation**  
   - *Input*: Scroll bento grid into view.  
   - *Steps*: Monitor proficiency bar width elements.  
   - *Assertion*: Bars animate from `width: 0%` to their target percentages (e.g. 90%, 85%) as scrolled into view.  
   - *Verification*: Computed width animation inspection.
2. `T2-F18-02`: **Asymmetric Bento Layout at Desktop (1280px)**  
   - *Input*: Viewport set to 1280px.  
   - *Steps*: Inspect grid column spans (`col-span-2` / row spans).  
   - *Assertion*: Grid displays asymmetric editorial layout with featured card spanning 2 columns.  
   - *Verification*: Computed grid layout check.
3. `T2-F18-03`: **Responsive Single-Column Collapse at Mobile (375px)**  
   - *Input*: Viewport set to 375px.  
   - *Steps*: Inspect card widths and wrapping.  
   - *Assertion*: All cards collapse to full-width single-column layout without clipping or horizontal overflow.  
   - *Verification*: Layout geometry check.
4. `T2-F18-04`: **Card Hover Elevation & Border Glow**  
   - *Input*: Hover over a bento card.  
   - *Steps*: Inspect border color and box-shadow.  
   - *Assertion*: Border highlights with cyan/gold accent glow and card subtly elevates.  
   - *Verification*: Computed hover style assertion.
5. `T2-F18-05`: **"Currently Learning" Agentic AI Callout**  
   - *Input*: Inspect bento grid callout / badge.  
   - *Steps*: Search for currently learning badge.  
   - *Assertion*: Contains callout for `"Agentic AI"` and `"Advanced React Patterns"`.  
   - *Verification*: Text node assertion.

---

### Feature 19: Home Projects Teaser Grid
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 17–24, 67, 126; `PROJECT.md` line 40.
- **Contract**: 3-card grid: Spendly (live demo + GitHub), Business Management (live demo + GitHub), More Coming Soon placeholder, link to `/projects`.

#### Tier 1: Feature Coverage
1. `T1-F19-01`: **Exactly 3 Teaser Cards Render**  
   - *Input*: Navigate to `/` (Projects section).  
   - *Steps*: Query project teaser cards (`[data-testid="project-teaser-card"]`).  
   - *Assertion*: Exactly 3 cards are rendered.  
   - *Verification*: Card count assertion.
2. `T1-F19-02`: **Spendly Teaser Card Links & Content**  
   - *Input*: Query Spendly card.  
   - *Steps*: Check title, Live Demo link, and GitHub link.  
   - *Assertion*: Title is `"Spendly"`; Live Demo has `href="https://spendly-sable-delta.vercel.app/"`; GitHub has `href="https://github.com/aadinath29/spendly-"`.  
   - *Verification*: Card title and link attributes check.
3. `T1-F19-03`: **Business Management System Teaser Card Links & Content**  
   - *Input*: Query Business Management card.  
   - *Steps*: Check title, Live Demo link, and GitHub link.  
   - *Assertion*: Title contains `"Business Management"`; Live Demo has `href="https://business-managment-alpha.vercel.app/login"`; GitHub has `href="https://github.com/aadinath29/BusinessManagment-"`.  
   - *Verification*: Card title and link attributes check.
4. `T1-F19-04`: **"More Coming Soon" Placeholder Card Render**  
   - *Input*: Query third card.  
   - *Steps*: Inspect title and styling.  
   - *Assertion*: Title contains `"Coming Soon"` or `"More Projects Coming Soon"` with placeholder styling.  
   - *Verification*: Card text assertion.
5. `T1-F19-05`: **"View All Projects" Navigation CTA**  
   - *Input*: Locate "View All Projects" button/link.  
   - *Steps*: Click button.  
   - *Assertion*: Route changes to `/projects`.  
   - *Verification*: URL location check.

#### Tier 2: Boundary & Corner Cases
1. `T2-F19-01`: **Card Hover Scale & Glow Border Transition**  
   - *Input*: Dispatch `mouseenter` on project card.  
   - *Steps*: Inspect computed transform and border-color.  
   - *Assertion*: Card scales up subtly (`transform: scale(1.02+)`) and border shifts to cyan accent glow.  
   - *Verification*: Computed style assertion.
2. `T2-F19-02`: **Custom Cursor Interaction on Card Hover**  
   - *Input*: Dispatch `mouseenter` on project card on desktop.  
   - *Steps*: Query custom cursor context / DOM element.  
   - *Assertion*: Cursor switches to project variant and displays `"View"` or `"Open"` text.  
   - *Verification*: Cursor element text assertion.
3. `T2-F19-03`: **External Link Security Attributes**  
   - *Input*: Query all outbound project demo and GitHub links.  
   - *Steps*: Check `target` and `rel`.  
   - *Assertion*: All external links contain `target="_blank"` and `rel="noopener noreferrer"`.  
   - *Verification*: Attribute check.
4. `T2-F19-04`: **Responsive Card Stacking (375px vs 768px vs 1280px)**  
   - *Input*: Measure layout at 375px (1 col), 768px (2 cols / wrapped), 1280px (3 cols in row).  
   - *Steps*: Inspect computed bounding rects.  
   - *Assertion*: Cards stack cleanly without overlapping or breaking grid container boundaries.  
   - *Verification*: Bounding box layout check.
5. `T2-F19-05`: **Independent Keyboard Navigation of Demo vs Repo Links**  
   - *Input*: Focus Spendly card using keyboard `Tab`.  
   - *Steps*: Verify tab stops for Live Demo and GitHub links.  
   - *Assertion*: Both links can be focused and activated independently via keyboard without triggering card wrapper.  
   - *Verification*: Keyboard focus navigation test.

---

### Feature 20: Home Testimonials Marquee
- **Specification Source**: `ORIGINAL_REQUEST.md` line 68; `PROJECT.md` line 41.
- **Contract**: Auto-scrolling ticker with 3 placeholder recommendation quotes, author names/roles.

#### Tier 1: Feature Coverage
1. `T1-F20-01`: **Testimonials Section Container Render**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Query `[data-testid="testimonials-section"]` or `.testimonials-marquee`.  
   - *Assertion*: Section exists and renders testimonials ticker.  
   - *Verification*: DOM container check.
2. `T1-F20-02`: **3 Recommendation Quotes Render**  
   - *Input*: Query quote cards in testimonials track.  
   - *Steps*: Count distinct quote items.  
   - *Assertion*: Exactly 3 distinct quotes are present.  
   - *Verification*: DOM count assertion.
3. `T1-F20-03`: **Author Name and Role/Title Presentation**  
   - *Input*: Query each testimonial card.  
   - *Steps*: Extract author name and professional title.  
   - *Assertion*: Each card renders author name (e.g. mentor/peer name) and title/organization.  
   - *Verification*: DOM text extraction.
4. `T1-F20-04`: **Continuous Horizontal Scrolling Animation**  
   - *Input*: Inspect CSS animation on testimonials track.  
   - *Steps*: Check animation properties.  
   - *Assertion*: Track has continuous horizontal translation animation running.  
   - *Verification*: Computed CSS animation property check.
5. `T1-F20-05`: **Placeholder Status Marking**  
   - *Input*: Inspect testimonials section header or card badges.  
   - *Steps*: Check for placeholder indicator.  
   - *Assertion*: Visual badge or disclaimer indicates these are placeholder recommendations.  
   - *Verification*: Text / badge inspection.

#### Tier 2: Boundary & Corner Cases
1. `T2-F20-01`: **Hover / Touch Pause on Reading**  
   - *Input*: Dispatch `mouseenter` or touch hold on a testimonial card.  
   - *Steps*: Check `animation-play-state`.  
   - *Assertion*: Animation pauses (`paused`) so user can comfortably read quote.  
   - *Verification*: Computed style assertion.
2. `T2-F20-02`: **Semantic Quotation Tagging**  
   - *Input*: Inspect DOM tags for testimonial cards.  
   - *Steps*: Query for semantic HTML elements.  
   - *Assertion*: Uses `<figure>`, `<blockquote>`, and `<figcaption>` or `<cite>` tags for accessibility.  
   - *Verification*: Semantic tag inspection.
3. `T2-F20-03`: **Mobile (375px) Quote Text Wrapping**  
   - *Input*: Viewport at 375px.  
   - *Steps*: Measure card width and text height.  
   - *Assertion*: Quote text wraps cleanly without text overflow or vertical truncation.  
   - *Verification*: Text bounding box assertion.
4. `T2-F20-04`: **Infinite Loop Seamless Clones**  
   - *Input*: Inspect children of marquee track.  
   - *Steps*: Check clone elements for seamless loop.  
   - *Assertion*: Track contains cloned nodes to eliminate wrap stutter.  
   - *Verification*: Clone count assertion.
5. `T2-F20-05`: **`prefers-reduced-motion` Static Grid Display**  
   - *Input*: Enable `prefers-reduced-motion: reduce`.  
   - *Steps*: Inspect layout and animation.  
   - *Assertion*: Animation stops; cards display as static horizontal scroll or wrap grid.  
   - *Verification*: Reduced motion test.

---

### Feature 21: About Page Hero & Bio Narrative
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 32–34, 71, 73; `PROJECT.md` line 42.
- **Contract**: Route `/about`, editorial headline "Full-Stack Developer. Builder. Problem Solver.", verified bio narrative, generous whitespace.

#### Tier 1: Feature Coverage
1. `T1-F21-01`: **About Page Route Mount (`/about`)**  
   - *Input*: Navigate to `/about`.  
   - *Steps*: Query page container.  
   - *Assertion*: About page component mounts successfully; URL is `/about`.  
   - *Verification*: URL and DOM check.
2. `T1-F21-02`: **Editorial Headline Text Verification**  
   - *Input*: Query primary `h1` on `/about`.  
   - *Steps*: Check headline text.  
   - *Assertion*: Text matches `"Full-Stack Developer. Builder. Problem Solver."`.  
   - *Verification*: Text node assertion.
3. `T1-F21-03`: **Editorial Headline Font Family (Playfair Display)**  
   - *Input*: Query computed `font-family` of headline.  
   - *Steps*: Check font-family.  
   - *Assertion*: Inherits `"Playfair Display"` (or serif fallback).  
   - *Verification*: Computed style assertion.
4. `T1-F21-04`: **Verified Bio Narrative Text Content**  
   - *Input*: Query bio narrative paragraph(s).  
   - *Steps*: Extract text.  
   - *Assertion*: Contains Aadinath Magar's verified bio: full-stack developer from India, MERN stack specialization, Agentic AI exploration, open to full-time engineering roles.  
   - *Verification*: Substring content assertion.
5. `T1-F21-05`: **Headline Word-by-Word Entrance Stagger**  
   - *Input*: Inspect headline child elements.  
   - *Steps*: Check for Framer Motion word span wrappers.  
   - *Assertion*: Words are wrapped in motion spans with staggered transition delays.  
   - *Verification*: DOM structure and animation variant check.

#### Tier 2: Boundary & Corner Cases
1. `T2-F21-01`: **Mobile Fluid Typography (375px vs 768px vs 1280px)**  
   - *Input*: Measure headline dimensions at 375px, 768px, and 1280px.  
   - *Steps*: Check computed `font-size` and bounding box.  
   - *Assertion*: Scales smoothly without horizontal overflow; line-height maintains editorial proportions.  
   - *Verification*: Responsive typography check.
2. `T2-F21-02`: **Direct Deep-Link Browser Refresh at `/about`**  
   - *Input*: Trigger hard browser reload at URL `/about`.  
   - *Steps*: Observe render.  
   - *Assertion*: Page renders immediately with zero 404 errors, zero hydration mismatches, and complete bio text.  
   - *Verification*: Direct entry test.
3. `T2-F21-03`: **Editorial Whitespace Ratio Compliance**  
   - *Input*: Measure vertical padding of About sections at 1280px.  
   - *Steps*: Compute padding in rem / px.  
   - *Assertion*: Section vertical padding >= 5rem (80px), adhering to 13studio editorial breathing room reference.  
   - *Verification*: Computed padding assertion.
4. `T2-F21-04`: **`prefers-reduced-motion` Immediate Headline Visibility**  
   - *Input*: Set `prefers-reduced-motion: reduce`.  
   - *Steps*: Load `/about`.  
   - *Assertion*: All words in headline are immediately visible at `opacity: 1` without stagger delay.  
   - *Verification*: Computed opacity assertion.
5. `T2-F21-05`: **Light Theme Text Legibility & Contrast**  
   - *Input*: Switch to light mode on `/about`.  
   - *Steps*: Measure contrast ratio of bio body text.  
   - *Assertion*: Contrast ratio >= 4.5:1 against light background.  
   - *Verification*: Contrast measurement.

---

### Feature 22: About Experience & Education Timeline
- **Specification Source**: `ORIGINAL_REQUEST.md` line 74; `PROJECT.md` lines 43, 80.
- **Contract**: Timeline with BVCOE engineering education and internship/project milestones.

#### Tier 1: Feature Coverage
1. `T1-F22-01`: **Timeline Section Render on `/about`**  
   - *Input*: Navigate to `/about`.  
   - *Steps*: Query `[data-testid="experience-timeline"]` or `.timeline-container`.  
   - *Assertion*: Timeline section exists and renders vertical timeline nodes.  
   - *Verification*: DOM container check.
2. `T1-F22-02`: **BVCOE College Education Node Verification**  
   - *Input*: Query education node.  
   - *Steps*: Inspect institution and degree.  
   - *Assertion*: Contains `"Bharati Vidyapeeth"` (or `"BVCOE"`), `"Computer Engineering"` (or Bachelor of Engineering), and location/date.  
   - *Verification*: Text node assertion.
3. `T1-F22-03`: **Internship / Experience Milestones Verification**  
   - *Input*: Query experience nodes.  
   - *Steps*: Inspect roles and descriptions.  
   - *Assertion*: Displays verified internship/software developer project experiences with clear descriptions.  
   - *Verification*: Text node assertion.
4. `T1-F22-04`: **Timeline Node Milestone Badges**  
   - *Input*: Query timeline node date/milestone indicators.  
   - *Steps*: Check for date tags (e.g. "2022 - 2026", "2024").  
   - *Assertion*: Every timeline node displays an explicit timeframe/date badge.  
   - *Verification*: Date tag check.
5. `T1-F22-05`: **Vertical Timeline Connector Structure**  
   - *Input*: Inspect timeline background guide line.  
   - *Steps*: Check for vertical guide line element connecting nodes.  
   - *Assertion*: Vertical line element runs continuously behind node markers.  
   - *Verification*: DOM guide line check.

#### Tier 2: Boundary & Corner Cases
1. `T2-F22-01`: **Responsive Alternating to Left-Aligned Collapse (375px Mobile)**  
   - *Input*: Viewport at 375px vs 1280px.  
   - *Steps*: Inspect node alignment.  
   - *Assertion*: Alternating left/right desktop nodes collapse to uniform left-aligned column on 375px mobile without layout clipping.  
   - *Verification*: Computed layout alignment check.
2. `T2-F22-02`: **Chronological Sorting & Completeness**  
   - *Input*: Read timeline data items from `src/data/timeline.js`.  
   - *Steps*: Verify order of entries.  
   - *Assertion*: Items follow clean reverse-chronological order (most recent first) without missing date fields.  
   - *Verification*: Data sort order assertion.
3. `T2-F22-03`: **Scroll-Triggered Node Reveal Stagger**  
   - *Input*: Scroll down through timeline.  
   - *Steps*: Observe node opacity and translation.  
   - *Assertion*: Each node reveals progressively as its trigger point crosses the viewport.  
   - *Verification*: ScrollTrigger animation check.
4. `T2-F22-04`: **`prefers-reduced-motion` Immediate Node Visibility**  
   - *Input*: Enable `prefers-reduced-motion: reduce`.  
   - *Steps*: Load timeline section.  
   - *Assertion*: All nodes are fully visible immediately without scroll animation.  
   - *Verification*: Computed style check.
5. `T2-F22-05`: **Zero Truncation on Multi-Paragraph Milestone Descriptions**  
   - *Input*: Inspect milestone achievement bullet points.  
   - *Steps*: Check for text overflow or hidden overflow.  
   - *Assertion*: Full milestone descriptions are readable with proper line wrapping.  
   - *Verification*: Text bounding box assertion.

---

### Feature 23: Projects Full Grid Page
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 76–80, 126; `PROJECT.md` line 44.
- **Contract**: Route `/projects`, Spendly + Business Management cards with live demos & repos, demo credentials, "More Coming Soon" card.

#### Tier 1: Feature Coverage
1. `T1-F23-01`: **Projects Page Route Mount (`/projects`)**  
   - *Input*: Navigate to `/projects`.  
   - *Steps*: Query page container.  
   - *Assertion*: Projects page mounts; URL is `/projects`.  
   - *Verification*: URL and DOM check.
2. `T1-F23-02`: **Spendly Full Card Verification**  
   - *Input*: Query Spendly project card on `/projects`.  
   - *Steps*: Inspect title, description, tech stack tags, Live Demo link, and GitHub link.  
   - *Assertion*: Title is `"Spendly"`; Live Demo has `href="https://spendly-sable-delta.vercel.app/"`; GitHub has `href="https://github.com/aadinath29/spendly-"`; tech tags include React, Node, Express, MongoDB.  
   - *Verification*: Card contents and link attributes check.
3. `T1-F23-03`: **Business Management System Full Card Verification**  
   - *Input*: Query Business Management project card.  
   - *Steps*: Inspect title, description, tech stack tags, Live Demo link, and GitHub link.  
   - *Assertion*: Title contains `"Business Management"`; Live Demo has `href="https://business-managment-alpha.vercel.app/login"`; GitHub has `href="https://github.com/aadinath29/BusinessManagment-"`.  
   - *Verification*: Card contents and link attributes check.
4. `T1-F23-04`: **Demo Credentials Display for Business Management System**  
   - *Input*: Query demo credentials box on Business Management card.  
   - *Steps*: Inspect credentials text.  
   - *Assertion*: Displays test login credentials (Email / Password) to facilitate recruiter evaluation.  
   - *Verification*: Credentials text assertion.
5. `T1-F23-05`: **"More Projects Coming Soon" Card Render**  
   - *Input*: Query coming soon card.  
   - *Steps*: Inspect title and styling.  
   - *Assertion*: Displays `"More Projects Coming Soon"` with placeholder styling.  
   - *Verification*: Card text assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F23-01`: **Direct Deep-Link Browser Reload at `/projects`**  
   - *Input*: Trigger hard browser reload at `/projects`.  
   - *Steps*: Observe render.  
   - *Assertion*: Page renders immediately with complete project cards and valid links (zero 404 errors).  
   - *Verification*: Direct entry test.
2. `T2-F23-02`: **Tech Stack Tag Wrapping on Varied Viewports (375px vs 768px)**  
   - *Input*: Viewport at 375px.  
   - *Steps*: Inspect tech tag container (`flex-wrap`).  
   - *Assertion*: Tags wrap onto multiple lines without overflowing card boundaries.  
   - *Verification*: Layout geometry check.
3. `T2-F23-03`: **Hover Card Glare & Border Accent Animation**  
   - *Input*: Hover over project card.  
   - *Steps*: Inspect border glow and overlay transition.  
   - *Assertion*: Card elevates and accent border activates.  
   - *Verification*: Computed hover style check.
4. `T2-F23-04`: **Custom Cursor Interaction on Full Projects Page**  
   - *Input*: Hover over project cards on desktop.  
   - *Steps*: Inspect custom cursor variant.  
   - *Assertion*: Cursor transitions to project mode with `"View"` label.  
   - *Verification*: Cursor state assertion.
5. `T2-F23-05`: **Staggered Card Entrance Animation on Route Mount**  
   - *Input*: Navigate from `/` to `/projects`.  
   - *Steps*: Observe card entrance.  
   - *Assertion*: Cards enter with sequential staggered fade/slide animation.  
   - *Verification*: Framer Motion stagger assertion.

---

### Feature 24: Blog Page Article Cards
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 82–85; `PROJECT.md` line 45.
- **Contract**: Route `/blog`, minimal editorial layout, 3–4 developer articles (MERN, React Performance, Agentic AI), tags, read times.

#### Tier 1: Feature Coverage
1. `T1-F24-01`: **Blog Page Route Mount (`/blog`)**  
   - *Input*: Navigate to `/blog`.  
   - *Steps*: Query page container.  
   - *Assertion*: Blog page mounts; URL is `/blog`.  
   - *Verification*: URL and DOM check.
2. `T1-F24-02`: **3 to 4 Article Cards Render**  
   - *Input*: Query article cards (`[data-testid="blog-card"]`).  
   - *Steps*: Count article cards.  
   - *Assertion*: Renders at least 3 to 4 developer article cards.  
   - *Verification*: DOM count assertion.
3. `T1-F24-03`: **Realistic Developer Topics Titles**  
   - *Input*: Query titles of all article cards.  
   - *Steps*: Check titles.  
   - *Assertion*: Titles cover realistic topics (e.g. MERN stack patterns, React performance, Agentic AI).  
   - *Verification*: Title text assertion.
4. `T1-F24-04`: **Reading Time & Publication Date Display**  
   - *Input*: Query metadata on each blog card.  
   - *Steps*: Inspect date and reading time elements.  
   - *Assertion*: Each card displays a valid reading time (e.g. `"5 min read"`) and publication date.  
   - *Verification*: Metadata text assertion.
5. `T1-F24-05`: **Article Topic Category Tags**  
   - *Input*: Query tags on each blog card.  
   - *Steps*: Check tag text.  
   - *Assertion*: Each card displays category tags (e.g. "React", "AI", "Architecture").  
   - *Verification*: Category badge assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F24-01`: **Direct Deep-Link Browser Reload at `/blog`**  
   - *Input*: Trigger hard browser reload at `/blog`.  
   - *Steps*: Observe render.  
   - *Assertion*: Page loads without 404 errors or missing content.  
   - *Verification*: Direct entry test.
2. `T2-F24-02`: **Article Click Placeholder / Modal Feedback**  
   - *Input*: Click on an article card or "Read More" button.  
   - *Steps*: Observe reaction.  
   - *Assertion*: Opens a coming soon reading preview modal or notification; does not trigger broken 404 page navigation.  
   - *Verification*: Modal / notification assertion.
3. `T2-F24-03`: **Article Excerpt Multi-Line Clamp**  
   - *Input*: Inspect computed styles of article excerpt paragraph.  
   - *Steps*: Check `-webkit-line-clamp`.  
   - *Assertion*: Clamped to 2 or 3 lines (`line-clamp-3`) to maintain uniform card heights across the grid.  
   - *Verification*: Computed CSS property check.
4. `T2-F24-04`: **Responsive Grid Column Layout (375px vs 768px vs 1280px)**  
   - *Input*: Viewports at 375px (1 col), 768px (2 cols), 1280px (3 cols).  
   - *Steps*: Measure card widths and grid columns.  
   - *Assertion*: Grid scales cleanly without text truncation or horizontal overflow.  
   - *Verification*: Layout geometry check.
5. `T2-F24-05`: **Card Hover Elevation & Cursor Transition**  
   - *Input*: Hover over blog card on desktop.  
   - *Steps*: Inspect card transform and cursor variant.  
   - *Assertion*: Card elevates subtly and cursor displays hover state.  
   - *Verification*: Hover style assertion.

---

### Feature 25: Contact Page EmailJS Form
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 87–88, 107, 127; `PROJECT.md` lines 11, 46.
- **Contract**: Route `/contact`, EmailJS form with Name, Email, Message, validation, submit feedback (loading/success/error), placeholder creds.

#### Tier 1: Feature Coverage
1. `T1-F25-01`: **Contact Page Route Mount (`/contact`)**  
   - *Input*: Navigate to `/contact`.  
   - *Steps*: Query page container.  
   - *Assertion*: Contact page mounts; URL is `/contact`.  
   - *Verification*: URL and DOM check.
2. `T1-F25-02`: **Form Fields Presence (Name, Email, Message, Submit)**  
   - *Input*: Query form elements inside `[data-testid="contact-form"]`.  
   - *Steps*: Check input and textarea elements.  
   - *Assertion*: Contains Name input (`name="name"`), Email input (`name="email"`), Message textarea (`name="message"`), and Submit button.  
   - *Verification*: Form control elements check.
3. `T1-F25-03`: **Animated Input Focus States**  
   - *Input*: Focus Name input field.  
   - *Steps*: Inspect computed border-color and ring styles.  
   - *Assertion*: Border illuminates with cyan accent color and label transitions smoothly.  
   - *Verification*: Focus pseudo-class style check.
4. `T1-F25-04`: **Client-Side Validation on Empty Fields**  
   - *Input*: Click Submit button with all fields empty.  
   - *Steps*: Observe form reaction.  
   - *Assertion*: Submission is prevented; validation feedback messages indicate required fields.  
   - *Verification*: Validation error assertion.
5. `T1-F25-05`: **Client-Side Validation on Invalid Email Format**  
   - *Input*: Fill Name: "Test User", Email: "invalid-email-string", Message: "Hello". Click Submit.  
   - *Steps*: Observe validation feedback.  
   - *Assertion*: Submission is blocked; error indicates invalid email address format.  
   - *Verification*: Email validation assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F25-01`: **Simulated EmailJS API Network Failure & Retry Error State**  
   - *Input*: Mock EmailJS `send` / `sendForm` to reject with `new Error("Network Error")`. Submit valid form.  
   - *Steps*: Observe form UI.  
   - *Assertion*: Error alert displays informing user of failure with option to retry; form does not crash.  
   - *Verification*: Error state UI assertion.
2. `T2-F25-02`: **Successful Submission Flow & Form Reset**  
   - *Input*: Mock EmailJS to resolve successfully. Fill valid inputs; click Submit.  
   - *Steps*: Observe loading state then success message.  
   - *Assertion*: Button disables with loading spinner during submission; on success, displays confirmation message and inputs are reset to empty.  
   - *Verification*: Form lifecycle state assertion.
3. `T2-F25-03`: **Rapid Double-Click Debounce on Submit Button**  
   - *Input*: Click Submit button 3 times within 100ms on valid form.  
   - *Steps*: Count outgoing EmailJS send calls.  
   - *Assertion*: Exactly 1 API call is dispatched; button remains disabled during in-flight request.  
   - *Verification*: Mock API call count assertion.
4. `T2-F25-04`: **Large Input Boundary Handling (1000+ Characters)**  
   - *Input*: Enter 100-character name and 2000-character message.  
   - *Steps*: Inspect input container rendering.  
   - *Assertion*: Layout expands gracefully without text breaking container width; submission payload handles full string.  
   - *Verification*: Boundary string layout assertion.
5. `T2-F25-05`: **Mobile Viewport (375px) Form Usability & Input Sizing**  
   - *Input*: Viewport at 375px.  
   - *Steps*: Measure input font size and touch target height.  
   - *Assertion*: Input font-size >= 16px (preventing iOS auto-zoom on focus); submit button height >= 44px.  
   - *Verification*: Mobile touch input dimension check.

---

### Feature 26: Contact Social & Direct Links
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 89–91; `PROJECT.md` line 47, 75–78.
- **Contract**: GitHub (`https://github.com/aadinath29`), LinkedIn (`https://www.linkedin.com/in/aadinath-magar-profile`), direct Email (`mailto:aadinathbmagar75@gmail.com`), Phone (`tel:+919209017621`).

#### Tier 1: Feature Coverage
1. `T1-F26-01`: **Direct GitHub Link Verification**  
   - *Input*: Query GitHub link on `/contact` (and footer).  
   - *Steps*: Inspect `href`.  
   - *Assertion*: `href="https://github.com/aadinath29"`.  
   - *Verification*: Attribute check.
2. `T1-F26-02`: **Direct LinkedIn Link Verification**  
   - *Input*: Query LinkedIn link on `/contact` (and footer).  
   - *Steps*: Inspect `href`.  
   - *Assertion*: `href="https://www.linkedin.com/in/aadinath-magar-profile"`.  
   - *Verification*: Attribute check.
3. `T1-F26-03`: **Direct Mailto Email Link Verification**  
   - *Input*: Query email link on `/contact`.  
   - *Steps*: Inspect `href` and text.  
   - *Assertion*: `href="mailto:aadinathbmagar75@gmail.com"`; text displays `aadinathbmagar75@gmail.com`.  
   - *Verification*: Attribute and text check.
4. `T1-F26-04`: **Direct Tel Telephone Link Verification**  
   - *Input*: Query phone link on `/contact`.  
   - *Steps*: Inspect `href` and text.  
   - *Assertion*: `href="tel:+919209017621"`; text displays `+91 92090 17621`.  
   - *Verification*: Attribute and text check.
5. `T1-F26-05`: **Security Attributes on Outbound Social Links**  
   - *Input*: Query GitHub and LinkedIn links.  
   - *Steps*: Check `target` and `rel`.  
   - *Assertion*: Contains `target="_blank"` and `rel="noopener noreferrer"`.  
   - *Verification*: Attribute check.

#### Tier 2: Boundary & Corner Cases
1. `T2-F26-01`: **Social Link Hover Micro-Interactions**  
   - *Input*: Hover over social link icons.  
   - *Steps*: Inspect icon transform and color transition.  
   - *Assertion*: Icon elevates (`translateY(-2px)`) and color shifts to accent cyan.  
   - *Verification*: Computed hover style check.
2. `T2-F26-02`: **Mobile Touch Target Dimensions (375px)**  
   - *Input*: Viewport at 375px.  
   - *Steps*: Measure bounding box of social link clickable areas.  
   - *Assertion*: Width >= 44px and Height >= 44px for effortless touch interaction.  
   - *Verification*: BoundingClientRect check.
3. `T2-F26-03`: **Keyboard Focus Outline Visibility**  
   - *Input*: Focus social links sequentially using `Tab`.  
   - *Steps*: Inspect `:focus-visible` styling.  
   - *Assertion*: Clear outline / ring appears on active link element.  
   - *Verification*: Focus outline assertion.
4. `T2-F26-04`: **One-Click Copy Email / Phone Feedback**  
   - *Input*: Click copy icon / button adjacent to email.  
   - *Steps*: Check clipboard API invocation and visual feedback.  
   - *Assertion*: Writes email to clipboard; renders temporary "Copied!" confirmation badge.  
   - *Verification*: Clipboard mock and tooltip assertion.
5. `T2-F26-05`: **Screen Reader ARIA Labels**  
   - *Input*: Inspect social icon links.  
   - *Steps*: Check `aria-label` attributes.  
   - *Assertion*: Distinct labels present (e.g. `"Visit Aadinath's GitHub Profile"`).  
   - *Verification*: ARIA label assertion.

---

### Feature 27: R3F 3D Hero Scene
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 62, 105, 122; `PROJECT.md` line 48.
- **Contract**: Three.js / R3F Canvas in Home hero, rotating 3D abstract geometry + floating particle field, interactive pointer tilt.

#### Tier 1: Feature Coverage
1. `T1-F27-01`: **R3F WebGL `<canvas>` Mount in Hero**  
   - *Input*: Navigate to `/`.  
   - *Steps*: Query `<canvas>` element inside Hero section.  
   - *Assertion*: Canvas exists and initializes WebGL/WebGL2 rendering context.  
   - *Verification*: Canvas element and WebGL context check.
2. `T1-F27-02`: **3D Abstract Geometry Component Render**  
   - *Input*: Inspect 3D scene graph.  
   - *Steps*: Verify presence of mesh geometry (torus / icosahedron / wireframe).  
   - *Assertion*: 3D geometry mesh is active in scene.  
   - *Verification*: Three.js scene graph / canvas snapshot check.
3. `T1-F27-03`: **Floating Particle Field Render**  
   - *Input*: Inspect scene graph for Points / BufferGeometry.  
   - *Steps*: Verify particle points mesh presence.  
   - *Assertion*: Particle field is active in scene with particle points.  
   - *Verification*: Three.js scene graph inspection.
4. `T1-F27-04`: **Continuous Animation Loop Execution (`useFrame`)**  
   - *Input*: Observe scene over 300ms.  
   - *Steps*: Record mesh rotation values.  
   - *Assertion*: Geometry rotation changes monotonically over consecutive frames.  
   - *Verification*: Frame delta rotation test.
5. `T1-F27-05`: **Mousemove Interactive Tilt Reaction**  
   - *Input*: Dispatch `mousemove` from center to top-right corner.  
   - *Steps*: Observe target rotation coordinates.  
   - *Assertion*: Geometry rotates towards cursor direction.  
   - *Verification*: Pointer interaction test.

#### Tier 2: Boundary & Corner Cases
1. `T2-F27-01`: **WebGL Context Loss & Fallback Recovery**  
   - *Input*: Simulate WebGL context loss event: `canvas.dispatchEvent(new Event('webglcontextlost'))`.  
   - *Steps*: Observe application reaction.  
   - *Assertion*: Application does not crash; `<SceneFallback>` renders cleanly in place of canvas.  
   - *Verification*: Context loss event simulation.
2. `T2-F27-02`: **Pointer Events Passthrough for Overlay Text & CTAs**  
   - *Input*: Inspect canvas CSS `pointer-events`.  
   - *Steps*: Attempt clicking Hero "Download Resume" CTA positioned over canvas.  
   - *Assertion*: Canvas has `pointer-events: none` on background container, allowing click events to reach CTA buttons without obstruction.  
   - *Verification*: Hit-test and click event propagation check.
3. `T2-F27-03`: **Mobile Viewport (375px) GPU Optimization**  
   - *Input*: Viewport at 375px.  
   - *Steps*: Inspect canvas device pixel ratio and particle count.  
   - *Assertion*: `dpr` is clamped to <= 2; particle count is constrained for mobile GPU performance.  
   - *Verification*: DPR clamp assertion.
4. `T2-F27-04`: **Visibility Throttling when Tab is Inactive**  
   - *Input*: Emulate background tab (`document.hidden = true`).  
   - *Steps*: Monitor RAF loop frequency.  
   - *Assertion*: Render loop pauses or throttles down, avoiding wasteful CPU/battery drain.  
   - *Verification*: Background render throttling assertion.
5. `T2-F27-05`: **Canvas Resize on Window Dimension Change**  
   - *Input*: Resize window width from 1280px to 768px.  
   - *Steps*: Inspect canvas width and height attributes.  
   - *Assertion*: Canvas drawing buffer resizes cleanly to match container dimensions.  
   - *Verification*: Canvas buffer dimension assertion.

---

### Feature 28: R3F Code-Splitting & Suspense
- **Specification Source**: `ORIGINAL_REQUEST.md` line 105; `PROJECT.md` lines 6, 49.
- **Contract**: `React.lazy` canvas import, wrapped in `<Suspense fallback={<SceneFallback />}>`, vendor chunk split, CLS = 0.

#### Tier 1: Feature Coverage
1. `T1-F28-01`: **`React.lazy` Dynamic Import Declaration**  
   - *Input*: Read `src/components/sections/home/HeroSection.jsx`.  
   - *Steps*: Check for lazy import of 3D Canvas.  
   - *Assertion*: Contains `const HeroCanvas = React.lazy(...)` (or `lazy(...)`).  
   - *Verification*: Code AST inspection.
2. `T1-F28-02`: **`<Suspense>` Boundary Wrapper**  
   - *Input*: Inspect JSX inside `HeroSection.jsx`.  
   - *Steps*: Check element wrapping `HeroCanvas`.  
   - *Assertion*: `<Suspense fallback={<SceneFallback ... />}>` wraps the lazy 3D component.  
   - *Verification*: JSX AST inspection.
3. `T1-F28-03`: **`<SceneFallback>` Component Existence & Rendering**  
   - *Input*: Check `src/components/3d/SceneFallback.jsx`.  
   - *Steps*: Render fallback component.  
   - *Assertion*: Component exists and renders a styled CSS/SVG gradient skeleton placeholder.  
   - *Verification*: Component presence and render check.
4. `T1-F28-04`: **Non-Blocking Initial DOM Paint**  
   - *Input*: Measure First Contentful Paint (FCP) of `/`.  
   - *Steps*: Monitor initial HTML paint before 3D bundle executes.  
   - *Assertion*: Hero headline and navbar paint immediately without waiting for Three.js bundle download.  
   - *Verification*: Performance timing check.
5. `T1-F28-05`: **Vite Vendor Chunk Splitting for Three.js**  
   - *Input*: Inspect generated chunks in `dist/assets/`.  
   - *Steps*: Search for separated Three.js chunk.  
   - *Assertion*: Three.js / R3F is bundled into a distinct vendor chunk separate from index bundle.  
   - *Verification*: Bundle chunk analysis.

#### Tier 2: Boundary & Corner Cases
1. `T2-F28-01`: **Slow Network (3G) Fallback Presentation**  
   - *Input*: Throttle network to Slow 3G.  
   - *Steps*: Observe Hero section while 3D chunk downloads.  
   - *Assertion*: `<SceneFallback>` displays a smooth pulse shimmer; no broken layout or blank space.  
   - *Verification*: Slow network simulation.
2. `T2-F28-02`: **Chunk Download Network Failure Resilience**  
   - *Input*: Mock dynamic import of 3D canvas to fail (simulate offline network drop).  
   - *Steps*: Observe React error boundary behavior.  
   - *Assertion*: ErrorBoundary catches chunk load failure gracefully; retains fallback visual; page remains functional.  
   - *Verification*: Chunk rejection test.
3. `T2-F28-03`: **Zero Cumulative Layout Shift (CLS = 0)**  
   - *Input*: Measure layout shift when `<SceneFallback>` transitions to loaded `<HeroCanvas>`.  
   - *Steps*: Record CLS score.  
   - *Assertion*: CLS score is strictly 0 (fallback occupies exact same dimensions as loaded Canvas).  
   - *Verification*: CLS score measurement.
4. `T2-F28-04`: **Three.js Memory Cleanup on Route Change**  
   - *Input*: Navigate from `/` to `/about`.  
   - *Steps*: Check memory disposal.  
   - *Assertion*: WebGL geometries and textures are disposed on unmount to prevent GPU memory leak.  
   - *Verification*: Memory disposal hook check.
5. `T2-F28-05`: **Idle Prefetching Compatibility**  
   - *Input*: Inspect bundle prefetching hints.  
   - *Steps*: Verify chunk load strategy.  
   - *Assertion*: Dynamic import does not block main bundle parse time.  
   - *Verification*: Bundle load timing test.

---

### Feature 29: About Portrait 3D Parallax Tilt
- **Specification Source**: `ORIGINAL_REQUEST.md` lines 72, 124; `PROJECT.md` line 50.
- **Contract**: Portrait container (`DepthPortrait.jsx`), mousemove perspective transform (`rotateX`, `rotateY`, glare), smooth spring reset, code comment.

#### Tier 1: Feature Coverage
1. `T1-F29-01`: **Portrait Card Container Render on `/about`**  
   - *Input*: Navigate to `/about`.  
   - *Steps*: Query `[data-testid="depth-portrait"]` or `.depth-portrait-card`.  
   - *Assertion*: Element exists with 3D perspective CSS styling (`perspective: 1000px`).  
   - *Verification*: Computed style inspection.
2. `T1-F29-02`: **Dynamic 3D Rotation on Mousemove**  
   - *Input*: Dispatch `mousemove` over portrait card at top-left quadrant.  
   - *Steps*: Inspect computed `transform` on inner card element.  
   - *Assertion*: Applies `rotateX(...)` and `rotateY(...)` based on cursor offset.  
   - *Verification*: Transform matrix assertion.
3. `T1-F29-03`: **Glare / Sheen Reflection Gradient Tracking**  
   - *Input*: Dispatch `mousemove` across card.  
   - *Steps*: Query glare overlay element.  
   - *Assertion*: Glare gradient translates / changes opacity following mouse coordinates.  
   - *Verification*: Glare element style inspection.
4. `T1-F29-04`: **Smooth Spring Reset on Mouseleave**  
   - *Input*: Move mouse outside portrait card (`mouseleave`).  
   - *Steps*: Observe transform reset.  
   - *Assertion*: `rotateX` and `rotateY` reset smoothly to `0deg`.  
   - *Verification*: Reset transform assertion.
5. `T1-F29-05`: **Required Code Comment Presence**  
   - *Input*: Read `src/components/sections/about/DepthPortrait.jsx`.  
   - *Steps*: Search file for required code comment.  
   - *Assertion*: Contains comment: `// Replace portrait-placeholder.jpg with Aadi's real photo`.  
   - *Verification*: Source code comment search.

#### Tier 2: Boundary & Corner Cases
1. `T2-F29-01`: **Touch Device Tilt Suppression (375px Mobile)**  
   - *Input*: Viewport at 375px; emulate touch screen.  
   - *Steps*: Check tilt event listeners.  
   - *Assertion*: Mousemove tilt listeners are disabled on touch devices; portrait renders as clean static card.  
   - *Verification*: Touch device assertion.
2. `T2-F29-02`: **Rotation Angle Clamp Boundary (+/- 15deg)**  
   - *Input*: Dispatch `mousemove` at extreme corner of card.  
   - *Steps*: Calculate applied `rotateX` and `rotateY` degrees.  
   - *Assertion*: Angles are clamped to maximum safety range (<= 15deg) to prevent extreme warping.  
   - *Verification*: Rotation angle clamp calculation.
3. `T2-F29-03`: **Rapid Pointer Enter/Exit Jitter Prevention**  
   - *Input*: Dispatch rapid sequence of alternating `mouseenter` and `mouseleave` events within 100ms.  
   - *Steps*: Check final resting transform.  
   - *Assertion*: Resting transform is neutral `rotateX(0deg) rotateY(0deg)` without stuck tilt state.  
   - *Verification*: Rapid event test.
4. `T2-F29-04`: **`prefers-reduced-motion` Perspective Bypass**  
   - *Input*: Enable `prefers-reduced-motion: reduce`.  
   - *Steps*: Dispatch `mousemove` over portrait.  
   - *Assertion*: Tilt transform remains disabled (`transform: none`).  
   - *Verification*: Reduced motion test.
5. `T2-F29-05`: **Placeholder Image Fallback Styling**  
   - *Input*: Inspect portrait card background.  
   - *Steps*: Verify styling when placeholder image is rendered.  
   - *Assertion*: Displays styled gradient placeholder with no broken image icon.  
   - *Verification*: Visual placeholder check.

---

### Feature 30: GSAP Timeline Line Draw Animation
- **Specification Source**: `ORIGINAL_REQUEST.md` line 74, 125; `PROJECT.md` line 51.
- **Contract**: Vertical SVG line on `/about` timeline, dynamic `strokeDashoffset` scroll progress via GSAP ScrollTrigger.

#### Tier 1: Feature Coverage
1. `T1-F30-01`: **SVG Path Line Element Presence on `/about`**  
   - *Input*: Navigate to `/about` (Timeline section).  
   - *Steps*: Query `<svg>` containing timeline drawing line.  
   - *Assertion*: SVG `<path>` or `<line>` element exists.  
   - *Verification*: DOM query check.
2. `T1-F30-02`: **Stroke-Dasharray Path Length Initialization**  
   - *Input*: Inspect SVG path attributes/styles.  
   - *Steps*: Query `stroke-dasharray`.  
   - *Assertion*: `stroke-dasharray` is set to the total length of the SVG path.  
   - *Verification*: SVG attribute inspection.
3. `T1-F30-03`: **Initial Hidden Line State (`strokeDashoffset` === length)**  
   - *Input*: At initial state before scrolling timeline into view.  
   - *Steps*: Inspect `stroke-dashoffset`.  
   - *Assertion*: `stroke-dashoffset` equals total path length (line fully undrawn).  
   - *Verification*: Computed stroke-dashoffset check.
4. `T1-F30-04`: **Scroll-Driven Line Drawing Progress**  
   - *Input*: Scroll progressively through timeline section.  
   - *Steps*: Measure `stroke-dashoffset` at 25%, 50%, and 100% scroll progress.  
   - *Assertion*: `stroke-dashoffset` decreases monotonically towards 0 as user scrolls down.  
   - *Verification*: Monotonic decrease assertion.
5. `T1-F30-05`: **Node Marker Activation Synchronization**  
   - *Input*: Scroll until SVG line reaches a milestone node.  
   - *Steps*: Inspect node dot / badge styling.  
   - *Assertion*: Node marker illuminates / adds active accent class when the drawn line reaches its offset.  
   - *Verification*: Milestone active class assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F30-01`: **Rapid Scroll Scrub Up/Down Resilience**  
   - *Input*: Rapidly scroll timeline up and down 5 times.  
   - *Steps*: Observe `strokeDashoffset`.  
   - *Assertion*: Recalculates smoothly without detached line segments or visual tearing.  
   - *Verification*: Scroll scrub stress test.
2. `T2-F30-02`: **Mobile Viewport (375px) Line Alignment**  
   - *Input*: Viewport at 375px.  
   - *Steps*: Measure SVG line horizontal position relative to timeline nodes.  
   - *Assertion*: SVG line remains perfectly centered through timeline node dots on mobile screens.  
   - *Verification*: Coordinate alignment check.
3. `T2-F30-03`: **Window Resize Recalculation (`ScrollTrigger.refresh()`)**  
   - *Input*: Resize window height while scrolled halfway down timeline.  
   - *Steps*: Trigger window resize.  
   - *Assertion*: `ScrollTrigger.refresh()` recalculates path length and updates draw offset accurately.  
   - *Verification*: Resize trigger test.
4. `T2-F30-04`: **`prefers-reduced-motion` Fully Drawn Initial State**  
   - *Input*: Enable `prefers-reduced-motion: reduce`.  
   - *Steps*: Inspect timeline SVG line.  
   - *Assertion*: Line is rendered fully drawn immediately (`strokeDashoffset: 0`) without scroll animation.  
   - *Verification*: Reduced motion test.
5. `T2-F30-05`: **ScrollTrigger Kill on Route Unmount**  
   - *Input*: Navigate from `/about` to `/projects`.  
   - *Steps*: Check active ScrollTrigger instances.  
   - *Assertion*: Timeline ScrollTrigger instance is cleanly killed (`trigger.kill()`), preventing memory leaks.  
   - *Verification*: ScrollTrigger registry audit.

---

### Feature 31: Framer Motion Curtain Transitions
- **Specification Source**: `ORIGINAL_REQUEST.md` line 96, 131; `PROJECT.md` lines 8, 52, 97.
- **Contract**: `<AnimatePresence mode="wait">`, full-screen `<PageCurtain>` wipe on route change, cinematic scene change feel.

#### Tier 1: Feature Coverage
1. `T1-F31-01`: **`<AnimatePresence mode="wait">` Wrapper Declaration**  
   - *Input*: Read `src/App.jsx`.  
   - *Steps*: Inspect route rendering container.  
   - *Assertion*: `<AnimatePresence mode="wait">` wraps `<Routes location={location} key={location.pathname}>`.  
   - *Verification*: JSX AST inspection.
2. `T1-F31-02`: **Curtain Element Wipe-In on Route Change**  
   - *Input*: Click navigation link from `/` to `/about`.  
   - *Steps*: Observe DOM during route transition.  
   - *Assertion*: Fullscreen curtain element (`PageCurtain`) animates across viewport (`scaleY` or `translateY`).  
   - *Verification*: Curtain DOM presence and animation check.
3. `T1-F31-03`: **Old Page Unmount & New Page Mount Coordination**  
   - *Input*: Monitor DOM during route change.  
   - *Steps*: Verify transition phases.  
   - *Assertion*: Curtain wipes in covering view -> old page unmounts -> new page mounts -> curtain wipes out revealing new page.  
   - *Verification*: Transition lifecycle sequence assertion.
4. `T1-F31-04`: **Scroll Position Top Reset During Transition**  
   - *Input*: At bottom of `/projects`, click "Contact".  
   - *Steps*: Measure scroll position when Contact page mounts.  
   - *Assertion*: Scroll position resets to top `(0, 0)` before curtain wipes out.  
   - *Verification*: Scroll position assertion.
5. `T1-F31-05`: **Universal Route Transition Coverage (All 5 Routes)**  
   - *Input*: Navigate between all route pairs: `/` -> `/about` -> `/projects` -> `/blog` -> `/contact` -> `/`.  
   - *Steps*: Observe transition curtain on every navigation.  
   - *Assertion*: Curtain transition fires reliably on every route change.  
   - *Verification*: Multi-route transition assertion.

#### Tier 2: Boundary & Corner Cases
1. `T2-F31-01`: **Rapid Route Navigation Clicks Queue Resilience**  
   - *Input*: Rapidly click "About", "Projects", "Blog" in succession within 200ms.  
   - *Steps*: Observe animation and final route.  
   - *Assertion*: UI does not get permanently stuck under curtain; resolves smoothly to the final route.  
   - *Verification*: Rapid click stress test.
2. `T2-F31-02`: **Browser History Navigation (Popstate Back/Forward)**  
   - *Input*: Navigate `/` -> `/about`, then click browser Back button.  
   - *Steps*: Observe transition.  
   - *Assertion*: Curtain transition animates on popstate navigation; correctly mounts Home page.  
   - *Verification*: History back navigation test.
3. `T2-F31-03`: **Ghost Click Prevention via Pointer-Events**  
   - *Input*: Inspect curtain container `pointer-events` during active wipe.  
   - *Steps*: Attempt clicking underlying buttons while curtain is wiping.  
   - *Assertion*: Curtain sets `pointer-events: all` while covering screen, blocking ghost clicks; sets `pointer-events: none` once exited.  
   - *Verification*: Pointer-events state assertion.
4. `T2-F31-04`: **`prefers-reduced-motion` Transition Replacement**  
   - *Input*: Enable `prefers-reduced-motion: reduce`.  
   - *Steps*: Navigate between routes.  
   - *Assertion*: Heavy sliding curtain is bypassed in favor of instant switch or subtle fade.  
   - *Verification*: Reduced motion test.
5. `T2-F31-05`: **Mobile Viewport (375px) Full-Screen Curtain Alignment**  
   - *Input*: Viewport at 375px.  
   - *Steps*: Measure curtain element bounding box during animation.  
   - *Assertion*: Covers 100% of viewport width and height without inducing horizontal scrollbars.  
   - *Verification*: Viewport coverage check.

---

### Feature 34: Production Build & Dist Validation
- **Specification Source**: `ORIGINAL_REQUEST.md` line 106, 115; `PROJECT.md` line 55.
- **Contract**: Clean `npm run build`, `dist/index.html`, chunk splitting, copied public assets, preview 200.

#### Tier 1: Feature Coverage
1. `T1-F34-01`: **Clean Build Execution (Exit Code 0)**  
   - *Input*: Execute `npm run build`.  
   - *Steps*: Monitor build process.  
   - *Assertion*: Completes successfully with exit code `0`.  
   - *Verification*: CLI exit code assertion.
2. `T1-F34-02`: **`dist/index.html` Production HTML Generation**  
   - *Input*: Check `dist/index.html`.  
   - *Steps*: Verify file existence and non-zero size.  
   - *Assertion*: `dist/index.html` exists and contains minified production HTML.  
   - *Verification*: File stats check.
3. `T1-F34-03`: **`dist/assets/` JavaScript and CSS Bundle Generation**  
   - *Input*: List files in `dist/assets/`.  
   - *Steps*: Check for `.js` and `.css` files.  
   - *Assertion*: Contains generated JavaScript bundles and CSS stylesheets.  
   - *Verification*: File listing assertion.
4. `T1-F34-04`: **Public Static Asset Copying to `dist/`**  
   - *Input*: Check `dist/` for static assets.  
   - *Steps*: Verify `dist/favicon.svg` and `dist/Aadi_Resume-04-09-2026.pdf`.  
   - *Assertion*: Both files exist in `dist/` with identical byte sizes to `public/` sources.  
   - *Verification*: File existence and size comparison.
5. `T1-F34-05`: **Valid Asset Link References in `dist/index.html`**  
   - *Input*: Parse asset script/link tags in `dist/index.html`.  
   - *Steps*: Verify each referenced file exists in `dist/`.  
   - *Assertion*: 100% of referenced `.js` and `.css` paths resolve to real files in `dist/`.  
   - *Verification*: Asset path resolution test.

#### Tier 2: Boundary & Corner Cases
1. `T2-F34-01`: **Chunk Size Safety Ceiling (< 600KB Uncompressed)**  
   - *Input*: Inspect byte sizes of all generated `.js` chunks in `dist/assets/`.  
   - *Steps*: Check largest chunk size.  
   - *Assertion*: No individual chunk exceeds 600KB uncompressed (verifies effective manual chunking).  
   - *Verification*: File size threshold check.
2. `T2-F34-02`: **Zero Unresolved Import or Circular Dependency Warnings**  
   - *Input*: Capture stdout/stderr during `npm run build`.  
   - *Steps*: Scan build log for warnings.  
   - *Assertion*: Build log contains zero warnings regarding missing exports, unresolved modules, or circular imports.  
   - *Verification*: Build log text audit.
3. `T2-F34-03`: **CSS Variable Retention Post-Minification**  
   - *Input*: Read generated `.css` file in `dist/assets/`.  
   - *Steps*: Search for `--bg-primary` and `--accent-cyan`.  
   - *Assertion*: CSS custom variables are retained and not mangled by the CSS minifier.  
   - *Verification*: CSS bundle substring search.
4. `T2-F34-04`: **Production Preview Server HTTP 200 on All Routes**  
   - *Input*: Launch `npm run preview`.  
   - *Steps*: Send HTTP GET requests to `/`, `/about`, `/projects`, `/blog`, `/contact`.  
   - *Assertion*: Returns HTTP 200 with valid HTML for every route.  
   - *Verification*: HTTP status code check.
5. `T2-F34-05`: **Asset Gzip / Brotli Compression Ratio**  
   - *Input*: Compress main bundle chunks with Gzip.  
   - *Steps*: Compute compressed byte size.  
   - *Assertion*: Gzip compressed size of main bundle <= 150KB.  
   - *Verification*: Compression size calculation.

---

## 5. Verification Matrix Summary & Traceability

```
Total Inventoried Features: 32 (Features 1–31, and 34)
Tier 1 Test Cases: 160 (Exactly 5 per feature)
Tier 2 Test Cases: 160 (Exactly 5 per feature)
Total Test Specifications Mined: 320 Test Cases

Breakpoints Explicitly Covered in Tier 2:
- Mobile: 375px x 667px (iPhone SE standard)
- Tablet: 768px x 1024px (iPad standard)
- Desktop: 1280px x 800px (Editorial standard)

Corner Conditions Explicitly Covered:
- Empty states & missing inputs
- Network failures & simulated API errors
- Blocked / corrupted localStorage (anti-FOUC & theme)
- WebGL context loss & hardware fallback
- Reduced motion preferences (prefers-reduced-motion: reduce)
- Rapid multi-clicks & debounce stress testing
- Memory leak prevention & event listener cleanup
```
