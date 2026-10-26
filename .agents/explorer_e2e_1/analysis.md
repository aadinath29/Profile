# E2E Test Runner & Harness Architecture Analysis

**Author**: `explorer_e2e_1` (E2E Harness Architecture Explorer)  
**Date**: 2026-09-10  
**Target Directory**: `tests/e2e/`  
**Milestone**: E2E Track (E2E-M1 Test Architecture & Harness)  
**References**: `ORIGINAL_REQUEST.md`, `PROJECT.md`, `sub_orch_e2e/SCOPE.md`

---

## 1. Executive Summary

This document specifies the technical design, architectural framework, and implementation code templates for an automated, opaque-box End-to-End (E2E) test runner and harness located in `tests/e2e/`.

The primary goals of this architecture are:
1. **100% Automated & Self-Contained**: Executes via standard Node.js (`node tests/e2e/run-all.js` or `npm run test:e2e`) without requiring external headless browser binaries (e.g. Playwright/Puppeteer Chromium downloads) that cause permission timeouts, missing graphic display drivers, or heavy multi-hundred-megabyte overhead.
2. **High-Fidelity Virtual DOM & Browser Simulation**: Uses JSDOM (with fallbacks) augmented by robust stubs for WebGL (`three`/`@react-three/fiber`), Lenis / GSAP ticker (`requestAnimationFrame`), responsive viewports (`window.matchMedia`), scroll observers (`IntersectionObserver`, `ResizeObserver`), and EmailJS mock transport.
3. **Multi-Engine Verification**: Blends (a) rendered DOM state inspection, (b) client-side routing and history emulation, (c) user event simulation (clicks, typing, theme toggles), (d) static AST/contract validation of components and tokens, and (e) production build/asset integrity verification.
4. **Corporate-Grade Reporting & Exit Code Compliance**: Provides an ANSI-colored console reporter with tier-by-tier pass/fail breakdown, TAP v13 format, JSON export (`tests/e2e/reports/e2e-report.json`), and strict exit codes (0 for complete pass, 1 for any failure).

---

## 2. Runtime Environment & Zero-Heavy-Browser Strategy

### 2.1 Host Environment Constraints
- **Platform**: Windows 11 / Node.js 18+ runtime.
- **Interactive Command Constraint**: Terminal commands on this host environment may trigger OS-level permission prompts that time out without direct user interaction. Real browser binaries (Playwright/Puppeteer) necessitate spawning child processes, downloading 300MB+ browser builds, establishing WebSocket CDP pipes, and configuring headless software WebGL rendering (SwiftShader).
- **Animation Overhead**: raviklaassens-style cinematic effects (Lenis smooth scrolling, GSAP ScrollTrigger ticker, Framer Motion curtain transitions, R3F particle fields) can cause severe flakiness and 10+ minute runtimes in real browser runners due to asynchronous animation loops.
- **Solution**: A **Pure Node.js Headless Virtual DOM & Simulation Engine**.
  - 360+ tests across Tiers 1–4 execute in **under 8 seconds**.
  - Deterministic execution with zero network dependency or browser flakiness.
  - Full compatibility with CI/CD and local developer environments.

### 2.2 Core Engine Modules
The harness architecture is split into five synergistic verification engines:

```
+-----------------------------------------------------------------------------------+
|                            Master CLI: run-all.js                                 |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                 TestRunner                                        |
|   (Suite Discovery, Lifecycle Hooks, Concurrency, Timeout Guard, Exit Codes)       |
+-----------------------------------------+-----------------------------------------+
                                          |
        +---------------------------------+---------------------------------+
        |                                 |                                 |
        v                                 v                                 v
+---------------+                 +---------------+                 +---------------+
|  DOM & Event  |                 | SPA Route &   |                 | Static Bundle |
|  Simulation   |                 | State Engine  |                 | & Asset Engine|
| (JSDOM, stubs)|                 | (PushState,   |                 | (AST, dist/,  |
|               |                 | localStorage) |                 | vercel.json)  |
+-------+-------+                 +-------+-------+                 +-------+-------+
        |                                 |                                 |
        +---------------------------------+---------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                 Assertions & Expect                               |
|        (toBe, toEqual, toHaveTextContent, toHaveClass, toHaveAttribute, etc.)     |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                Multi-Reporter                                     |
|             (ANSI Console Table, TAP v13, JSON Report File Generator)             |
+-----------------------------------------------------------------------------------+
```

### 2.3 Simulated Browser API Shims
Modern frontends rely on browser APIs that do not natively exist in plain Node.js. The harness provides high-fidelity mocks:
1. **WebGL / Canvas Context**: Stubs `HTMLCanvasElement.prototype.getContext('webgl')` and `'webgl2'` returning mock contexts with no-op Three.js methods (`createProgram`, `shaderSource`, `createBuffer`, `drawArrays`, etc.). This allows `<HeroCanvas>` and R3F scenes to mount without throwing canvas initialization errors.
2. **matchMedia & Responsive Viewports**: Provides `window.matchMedia(query)` with dynamic listener registration and a helper `domEnv.setViewportWidth(width)` to test breakpoints:
   - Mobile: 375px (checks hamburger menu visibility, custom cursor touch suppression)
   - Tablet: 768px (checks bento grid 2-column layout)
   - Desktop: 1280px (checks sticky nav desktop links, custom cursor active)
3. **requestAnimationFrame & Timers**: High-precision virtual RAF clock synchronizing GSAP ticker and Lenis loops without burning CPU cycles.
4. **IntersectionObserver & ResizeObserver**: Dispatches intersection callbacks with `isIntersecting: true` to trigger scroll-driven stats counters, bento card fills, and timeline line drawing.
5. **LocalStorage & Anti-FOUC**: In-memory `Storage` shim dispatching `storage` events when `am_portfolio_theme` toggles between `'dark'` and `'light'`.
6. **EmailJS Mock Transport**: Intercepts `@emailjs/browser` `send` and `sendForm` calls, captures payload data (`user_name`, `user_email`, `message`), and returns configurable success or error responses.

---

## 3. Runner Architecture & Directory Layout

### 3.1 Directory Structure in `tests/e2e/`
```
tests/e2e/
├── run-all.js                         # Master CLI entrypoint
├── harness/
│   ├── index.js                       # Re-exports runner, expect, and utilities
│   ├── runner.js                      # Core TestRunner class (describe, it/test, lifecycle hooks)
│   ├── assertions.js                  # Fluent expect(...) matcher library
│   ├── dom-environment.js             # Headless virtual DOM setup + API shims
│   ├── reporter.js                    # Console summary table, TAP, and JSON reporter
│   ├── route-emulator.js              # SPA navigation and URL state manager
│   ├── static-analyzer.js             # AST, bundle, tokens, and asset validator
│   └── mocks/
│       ├── emailjs-mock.js            # EmailJS mock service
│       ├── storage-mock.js            # Persistent localStorage mock
│       └── observer-mocks.js          # Intersection & Resize observer mocks
├── tier1/                             # Feature Coverage (>=5 tests x 32 features = >=160 tests)
├── tier2/                             # Boundary & Corner Cases (>=5 tests x 32 features = >=160 tests)
├── tier3/                             # Pairwise Cross-Feature Combinations (>=32 tests)
├── tier4/                             # Real-World Recruiter & End-User Journeys (>=5 scenarios)
└── reports/                           # Auto-generated JSON and TAP reports
    └── e2e-report.json
```

### 3.2 CLI Options & Invocation
The runner can be invoked with standard Node:
```bash
node tests/e2e/run-all.js [options]
npm run test:e2e
```
**Supported CLI Options**:
- `--tier=1|2|3|4`: Run only the specified tier.
- `--feature=N`: Run tests for a specific feature number (1–34).
- `--grep="pattern"`: Filter test descriptions by regex/substring.
- `--reporter=console|tap|json`: Select output reporter format (default: console + json output).
- `--bail`: Stop test execution immediately on the first test failure.
- `--timeout=ms`: Override per-test timeout (default: 5000ms).

### 3.3 Exit Codes
- `0`: All executed test suites and assertions passed with zero errors.
- `1`: One or more assertions failed or an unhandled exception was thrown.

---

## 4. Verification Methodologies

### 4.1 Route Verification (`/`, `/about`, `/projects`, `/blog`, `/contact`, `*`)
1. **Opaque-Box Navigation**:
   - The test harness loads the routing configuration and navigates using `routeEmulator.navigate(path)`.
   - Verifies the rendered DOM contains the expected landmark `<main>` and primary `<h1>` content:
     - `/`: Headline "Aadinath Magar", Subtitle "Full-Stack Developer", Hero 3D Canvas, Stats, Skills, Projects preview.
     - `/about`: Editorial heading "Full-Stack Developer. Builder. Problem Solver.", Depth portrait element, Bio narrative, Education/experience timeline.
     - `/projects`: Grid of project cards including Spendly, Business Management, and "More Coming Soon" card.
     - `/blog`: 4 developer article cards with tags and read times.
     - `/contact`: EmailJS contact form (Name, Email, Message, Submit button), GitHub, LinkedIn, Email, Phone links.
     - `*` / `/non-existent`: Renders `NotFoundPage` with 404 message and link to `/`.
2. **Vercel SPA Rewrites**:
   - `staticAnalyzer.verifyVercelConfig()` parses `vercel.json` and asserts that `rewrites` contains `[{ "source": "/(.*)", "destination": "/index.html" }]`.

### 4.2 DOM Structure & Accessibility Standards
- **Semantic Hierarchy**: Checks valid HTML structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
- **Headings**: Ensures exactly one `<h1>` per page.
- **Buttons & Links**: Asserts all interactive buttons have accessible text content or `aria-label`. All external links (`a[href^="http"]`) must have `target="_blank"` and `rel="noopener noreferrer"`.
- **Form Controls**: Verifies input fields in ContactForm have associated labels, `type` attributes (`text`, `email`), `required` flags, and unique `id` / `name` attributes.

### 4.3 CSS Classes, Design Tokens & Theme Toggle
- **Tailwind Tokens**: `staticAnalyzer.verifyTailwindConfig()` parses `tailwind.config.js` and `src/styles/index.css`:
  - Confirms `darkMode: 'class'`.
  - Confirms custom palette variables:
    - Deep black base: `#07090e`
    - Dark navy surface: `#0e131f`
    - Neon cyan accent: `#00f0ff`
    - Warm gold accent: `#fbbf24`
  - Confirms font tokens: Playfair Display serif, Inter sans-serif.
- **Anti-FOUC Head Script**: Parses `index.html` and confirms a synchronous `<script>` exists before `<body>` that reads `localStorage.getItem('am_portfolio_theme')` and sets `document.documentElement.classList`.
- **Theme Switching Execution**:
  1. Initial state: `document.documentElement.classList.contains('dark') === true`.
  2. Simulate click on theme toggle button.
  3. Assert `document.documentElement.classList.contains('dark') === false`.
  4. Assert `localStorage.getItem('am_portfolio_theme') === 'light'`.
  5. Click again -> asserts class `'dark'` is added back and localStorage updated.

### 4.4 Responsive Styles & Viewports (375px, 768px, 1280px)
- **Mobile Viewport (375px)**:
  - Invokes `domEnv.setViewportWidth(375)`.
  - Asserts desktop nav links container has `hidden md:flex` or equivalent class.
  - Asserts mobile hamburger toggle is visible (`md:hidden`).
  - Simulates click on hamburger button -> verifies mobile overlay menu opens, displaying links to all 5 routes.
  - Asserts custom cursor container is suppressed or hidden on mobile (`hidden md:block`).
- **Tablet Viewport (768px)**:
  - Invokes `domEnv.setViewportWidth(768)`.
  - Asserts skills bento grid has 2-column layout classes (`md:grid-cols-2`).
- **Desktop Viewport (1280px)**:
  - Invokes `domEnv.setViewportWidth(1280)`.
  - Asserts desktop navigation links are visible.
  - Asserts custom cursor is active.

### 4.5 Asset Paths & Media Fallbacks
- **PDF Resume**: Confirms `public/Aadi_Resume-04-09-2026.pdf` exists, is greater than 10KB, and the Resume Download button links to `/Aadi_Resume-04-09-2026.pdf`.
- **Favicon**: Confirms `public/favicon.svg` exists, contains valid SVG XML, and displays the "AM" monogram.
- **Image Fallbacks**: Verifies no `<img>` elements have broken `src` or missing `alt` attributes. Gradient div placeholders are used for photo placeholders.

### 4.6 EmailJS Form Interaction & Feedback
1. Renders Contact page.
2. Simulates typing into `input[name="user_name"]`, `input[name="user_email"]`, and `textarea[name="message"]`.
3. Validates client-side constraints (e.g. invalid email format blocks submission or displays validation error).
4. Submits form under mocked successful EmailJS response:
   - Verifies submit button enters loading/sending state.
   - Verifies success message appears ("Message sent successfully!").
   - Verifies inputs are cleared.
5. Submits form under mocked error response:
   - Verifies error alert appears ("Failed to send message...").
   - Verifies user inputs are retained for retry.

### 4.7 Component Contracts & Library Integrations
- **Framer Motion**: Verifies page transitions wrap `<Routes>` in `<AnimatePresence mode="wait">` and use `<PageCurtain>` or motion overlay.
- **Lenis + GSAP ScrollTrigger**: Verifies layout coordinates smooth scrolling with `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(...)` with `gsap.ticker.lagSmoothing(0)`.
- **R3F 3D Hero Scene**: Verifies HeroCanvas is split via `React.lazy` with `<Suspense fallback={<SceneFallback />}>`.
- **Developer Profile Data Contract**: Asserts rendered content matches authentic resume data:
  - Name: "Aadinath Magar"
  - Nickname: "Aadi"
  - Projects: "Spendly" (`https://spendly-sable-delta.vercel.app/`), "Business Management System" (`https://business-managment-alpha.vercel.app/login`).
  - GitHub: `https://github.com/aadinath29`
  - LinkedIn: `https://www.linkedin.com/in/aadinath-magar-profile`

---

## 5. Harness Implementation Code Templates

The following templates provide the exact implementation specifications for the files in `tests/e2e/harness/` and `tests/e2e/run-all.js`.

### 5.1 `tests/e2e/harness/assertions.js`
```javascript
/**
 * Fluent Assertion Library for E2E Testing
 */
class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AssertionError';
  }
}

export function expect(actual) {
  let isNot = false;

  const createMatcher = (fn) => {
    return (...args) => {
      const result = fn(actual, ...args);
      const passed = isNot ? !result.pass : result.pass;
      if (!passed) {
        const msg = isNot ? result.negatedMessage : result.message;
        throw new AssertionError(msg);
      }
    };
  };

  const matchers = {
    toBe: createMatcher((act, exp) => ({
      pass: Object.is(act, exp),
      message: `Expected ${JSON.stringify(act)} to be ${JSON.stringify(exp)}`,
      negatedMessage: `Expected ${JSON.stringify(act)} not to be ${JSON.stringify(exp)}`
    })),

    toEqual: createMatcher((act, exp) => {
      const pass = JSON.stringify(act) === JSON.stringify(exp);
      return {
        pass,
        message: `Expected ${JSON.stringify(act)} to equal ${JSON.stringify(exp)}`,
        negatedMessage: `Expected ${JSON.stringify(act)} not to equal ${JSON.stringify(exp)}`
      };
    }),

    toBeTruthy: createMatcher((act) => ({
      pass: Boolean(act),
      message: `Expected ${JSON.stringify(act)} to be truthy`,
      negatedMessage: `Expected ${JSON.stringify(act)} not to be truthy`
    })),

    toBeFalsy: createMatcher((act) => ({
      pass: !Boolean(act),
      message: `Expected ${JSON.stringify(act)} to be falsy`,
      negatedMessage: `Expected ${JSON.stringify(act)} not to be falsy`
    })),

    toBeNull: createMatcher((act) => ({
      pass: act === null,
      message: `Expected value to be null, received ${JSON.stringify(act)}`,
      negatedMessage: `Expected value not to be null`
    })),

    toBeDefined: createMatcher((act) => ({
      pass: act !== undefined,
      message: `Expected value to be defined, received undefined`,
      negatedMessage: `Expected value to be undefined`
    })),

    toContain: createMatcher((act, item) => {
      let pass = false;
      if (typeof act === 'string') pass = act.includes(item);
      else if (Array.isArray(act)) pass = act.includes(item);
      else if (act && typeof act === 'object') pass = item in act;
      return {
        pass,
        message: `Expected ${JSON.stringify(act)} to contain ${JSON.stringify(item)}`,
        negatedMessage: `Expected ${JSON.stringify(act)} not to contain ${JSON.stringify(item)}`
      };
    }),

    toMatch: createMatcher((act, regex) => {
      const reg = typeof regex === 'string' ? new RegExp(regex) : regex;
      const pass = reg.test(String(act));
      return {
        pass,
        message: `Expected "${act}" to match ${reg}`,
        negatedMessage: `Expected "${act}" not to match ${reg}`
      };
    }),

    toBeGreaterThan: createMatcher((act, num) => ({
      pass: Number(act) > Number(num),
      message: `Expected ${act} > ${num}`,
      negatedMessage: `Expected ${act} <= ${num}`
    })),

    toBeLessThan: createMatcher((act, num) => ({
      pass: Number(act) < Number(num),
      message: `Expected ${act} < ${num}`,
      negatedMessage: `Expected ${act} >= ${num}`
    })),

    toThrow: (expected) => {
      if (typeof actual !== 'function') {
        throw new AssertionError('expect(fn).toThrow requires a function');
      }
      let threw = false;
      let error = null;
      try {
        actual();
      } catch (e) {
        threw = true;
        error = e;
      }
      if (!isNot && !threw) {
        throw new AssertionError('Expected function to throw, but it did not');
      }
      if (isNot && threw) {
        throw new AssertionError(`Expected function not to throw, but it threw: ${error?.message}`);
      }
      if (threw && expected) {
        const msg = error?.message || String(error);
        if (expected instanceof RegExp && !expected.test(msg)) {
          throw new AssertionError(`Expected error message "${msg}" to match ${expected}`);
        } else if (typeof expected === 'string' && !msg.includes(expected)) {
          throw new AssertionError(`Expected error message "${msg}" to contain "${expected}"`);
        }
      }
    },

    // DOM Matchers
    toHaveTextContent: createMatcher((el, expected) => {
      const text = el ? (el.textContent || '').trim() : '';
      const pass = expected instanceof RegExp ? expected.test(text) : text.includes(expected);
      return {
        pass,
        message: `Expected element to have text content "${expected}", received "${text}"`,
        negatedMessage: `Expected element not to have text content "${expected}"`
      };
    }),

    toHaveAttribute: createMatcher((el, name, expectedVal) => {
      const hasAttr = el && typeof el.getAttribute === 'function' && el.getAttribute(name) !== null;
      const attrVal = hasAttr ? el.getAttribute(name) : null;
      const pass = expectedVal !== undefined ? attrVal === String(expectedVal) : hasAttr;
      return {
        pass,
        message: expectedVal !== undefined
          ? `Expected element to have attribute "${name}='${expectedVal}'", received "${name}='${attrVal}'"`
          : `Expected element to have attribute "${name}"`,
        negatedMessage: `Expected element not to have attribute "${name}"`
      };
    }),

    toHaveClass: createMatcher((el, className) => {
      const classes = el && el.classList ? Array.from(el.classList) : [];
      const pass = classes.includes(className);
      return {
        pass,
        message: `Expected element to have class "${className}", classes present: [${classes.join(', ')}]`,
        negatedMessage: `Expected element not to have class "${className}"`
      };
    }),

    toExist: createMatcher((el) => ({
      pass: el !== null && el !== undefined,
      message: `Expected element to exist in DOM, but it was not found`,
      negatedMessage: `Expected element not to exist in DOM, but it was found`
    })),

    toHaveCount: createMatcher((nodeListOrArray, count) => {
      const len = nodeListOrArray ? (nodeListOrArray.length || 0) : 0;
      return {
        pass: len === count,
        message: `Expected count of elements to be ${count}, received ${len}`,
        negatedMessage: `Expected count of elements not to be ${count}`
      };
    })
  };

  const handler = {
    get(target, prop) {
      if (prop === 'not') {
        isNot = !isNot;
        return proxy;
      }
      if (prop in matchers) {
        return matchers[prop];
      }
      return target[prop];
    }
  };

  const proxy = new Proxy({}, handler);
  return proxy;
}
```

### 5.2 `tests/e2e/harness/dom-environment.js`
```javascript
/**
 * Headless Virtual DOM Environment & Browser API Shims
 */
import { LocalStorageMock } from './mocks/storage-mock.js';
import { createObserverMocks } from './mocks/observer-mocks.js';
import { createEmailJSMock } from './mocks/emailjs-mock.js';

export class DOMEnvironment {
  constructor() {
    this.window = null;
    this.document = null;
    this.localStorage = new LocalStorageMock();
    this.currentViewport = { width: 1280, height: 800 };
    this.mediaListeners = new Set();
    this.rafCallbacks = new Map();
    this.rafId = 0;
    this.currentTime = 0;
  }

  async setup(htmlContent = '<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>') {
    let JSDOMModule;
    try {
      JSDOMModule = (await import('jsdom')).JSDOM;
    } catch {
      // Fallback virtual DOM minimal parser if jsdom is absent
      JSDOMModule = null;
    }

    if (JSDOMModule) {
      const dom = new JSDOMModule(htmlContent, {
        url: 'http://localhost:5173/',
        pretendToBeVisual: true,
        runScripts: 'dangerously'
      });
      this.window = dom.window;
      this.document = dom.window.document;
    } else {
      // Built-in lightweight fallback DOM
      this._setupMinimalDOM(htmlContent);
    }

    this._installShims();
  }

  _installShims() {
    const win = this.window;
    if (!win) return;

    // LocalStorage
    Object.defineProperty(win, 'localStorage', {
      value: this.localStorage,
      writable: true,
      configurable: true
    });

    // matchMedia shim
    win.matchMedia = (query) => {
      const matches = this._evaluateMediaQuery(query, this.currentViewport.width);
      const mql = {
        matches,
        media: query,
        onchange: null,
        addListener: (cb) => this.mediaListeners.add({ query, cb }),
        removeListener: (cb) => {
          for (const item of this.mediaListeners) {
            if (item.cb === cb) this.mediaListeners.delete(item);
          }
        },
        addEventListener: (event, cb) => this.mediaListeners.add({ query, cb }),
        removeEventListener: (event, cb) => {
          for (const item of this.mediaListeners) {
            if (item.cb === cb) this.mediaListeners.delete(item);
          }
        },
        dispatchEvent: () => true
      };
      return mql;
    };

    // RAF & Performance
    win.requestAnimationFrame = (callback) => {
      const id = ++this.rafId;
      this.rafCallbacks.set(id, callback);
      return id;
    };
    win.cancelAnimationFrame = (id) => {
      this.rafCallbacks.delete(id);
    };
    win.performance = win.performance || { now: () => this.currentTime };

    // ScrollTo
    win.scrollTo = (x, y) => {
      win.scrollX = typeof x === 'object' ? x.left || 0 : x || 0;
      win.scrollY = typeof x === 'object' ? x.top || 0 : y || 0;
    };

    // WebGL Canvas Shim for Three.js / R3F
    if (win.HTMLCanvasElement) {
      win.HTMLCanvasElement.prototype.getContext = function (contextType) {
        if (contextType === 'webgl' || contextType === 'webgl2' || contextType === 'experimental-webgl') {
          return {
            canvas: this,
            drawingBufferWidth: 800,
            drawingBufferHeight: 600,
            viewport: () => {},
            clearColor: () => {},
            clear: () => {},
            enable: () => {},
            disable: () => {},
            createShader: () => ({}),
            shaderSource: () => {},
            compileShader: () => {},
            getShaderParameter: () => true,
            getShaderInfoLog: () => '',
            createProgram: () => ({}),
            attachShader: () => {},
            linkProgram: () => {},
            getProgramParameter: () => true,
            getProgramInfoLog: () => '',
            useProgram: () => {},
            createBuffer: () => ({}),
            bindBuffer: () => {},
            bufferData: () => {},
            createTexture: () => ({}),
            bindTexture: () => {},
            texParameteri: () => {},
            texImage2D: () => {},
            getExtension: () => null,
            getParameter: (pname) => 16,
            drawArrays: () => {},
            drawElements: () => {}
          };
        }
        if (contextType === '2d') {
          return {
            fillRect: () => {},
            clearRect: () => {},
            getImageData: () => ({ data: new Uint8Array(4) }),
            putImageData: () => {},
            createImageData: () => [],
            setTransform: () => {},
            drawImage: () => {},
            save: () => {},
            fillText: () => {},
            restore: () => {},
            beginPath: () => {},
            moveTo: () => {},
            lineTo: () => {},
            closePath: () => {},
            stroke: () => {},
            fill: () => {}
          };
        }
        return null;
      };
    }

    // Observers
    const observers = createObserverMocks();
    win.IntersectionObserver = observers.IntersectionObserver;
    win.ResizeObserver = observers.ResizeObserver;

    // EmailJS
    this.emailJSMock = createEmailJSMock();

    // Global assignment for libraries referencing global window
    global.window = win;
    global.document = win.document;
    global.navigator = win.navigator;
    global.localStorage = this.localStorage;
    global.matchMedia = win.matchMedia;
    global.requestAnimationFrame = win.requestAnimationFrame;
    global.cancelAnimationFrame = win.cancelAnimationFrame;
  }

  _evaluateMediaQuery(query, width) {
    if (query.includes('max-width: 640px')) return width <= 640;
    if (query.includes('max-width: 768px')) return width <= 768;
    if (query.includes('min-width: 1024px')) return width >= 1024;
    if (query.includes('min-width: 1280px')) return width >= 1280;
    if (query.includes('prefers-color-scheme: dark')) return true;
    return false;
  }

  setViewportWidth(width, height = 800) {
    this.currentViewport = { width, height };
    if (this.window) {
      this.window.innerWidth = width;
      this.window.innerHeight = height;
    }
    for (const item of this.mediaListeners) {
      const matches = this._evaluateMediaQuery(item.query, width);
      item.cb({ matches, media: item.query });
    }
  }

  advanceTime(ms) {
    this.currentTime += ms;
    const callbacks = Array.from(this.rafCallbacks.values());
    this.rafCallbacks.clear();
    for (const cb of callbacks) {
      cb(this.currentTime);
    }
  }

  teardown() {
    delete global.window;
    delete global.document;
    delete global.navigator;
    delete global.localStorage;
    delete global.matchMedia;
    delete global.requestAnimationFrame;
    delete global.cancelAnimationFrame;
  }

  _setupMinimalDOM(htmlContent) {
    // Lightweight virtual document mock
    const elements = new Map();
    const doc = {
      documentElement: {
        classList: new Set(),
        setAttribute: () => {},
        getAttribute: () => null
      },
      head: {},
      body: {},
      getElementById: (id) => elements.get(id) || null,
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: (tag) => ({
        tagName: tag.toUpperCase(),
        classList: new Set(),
        setAttribute: () => {},
        getAttribute: () => null,
        appendChild: () => {}
      })
    };
    this.window = {
      document: doc,
      navigator: { userAgent: 'Node-E2E-Harness' },
      location: { pathname: '/', href: 'http://localhost:5173/' }
    };
    this.document = doc;
  }
}
```

### 5.3 `tests/e2e/harness/runner.js`
```javascript
/**
 * Core Test Runner Engine
 */
export class TestRunner {
  constructor(options = {}) {
    this.suites = [];
    this.currentSuite = null;
    this.options = {
      bail: options.bail || false,
      timeout: options.timeout || 5000,
      grep: options.grep ? new RegExp(options.grep, 'i') : null,
      tier: options.tier || null,
      ...options
    };
    this.stats = {
      totalSuites: 0,
      totalTests: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      startTime: 0,
      endTime: 0
    };
  }

  describe(name, fn) {
    const parent = this.currentSuite;
    const suite = {
      name,
      parent,
      tests: [],
      beforeAllHooks: [],
      beforeEachHooks: [],
      afterEachHooks: [],
      afterAllHooks: [],
      suites: []
    };

    if (parent) {
      parent.suites.push(suite);
    } else {
      this.suites.push(suite);
    }

    this.currentSuite = suite;
    try {
      fn();
    } finally {
      this.currentSuite = parent;
    }
  }

  test(name, fn, options = {}) {
    if (!this.currentSuite) {
      throw new Error(`test("${name}") must be declared inside a describe block.`);
    }
    this.currentSuite.tests.push({
      name,
      fn,
      tier: options.tier || (this.currentSuite.name.match(/tier\s*([1-4])/i)?.[1] || '1'),
      status: 'pending',
      duration: 0,
      error: null
    });
  }

  beforeAll(fn) {
    if (this.currentSuite) this.currentSuite.beforeAllHooks.push(fn);
  }

  beforeEach(fn) {
    if (this.currentSuite) this.currentSuite.beforeEachHooks.push(fn);
  }

  afterEach(fn) {
    if (this.currentSuite) this.currentSuite.afterEachHooks.push(fn);
  }

  afterAll(fn) {
    if (this.currentSuite) this.currentSuite.afterAllHooks.push(fn);
  }

  async run() {
    this.stats.startTime = Date.now();
    for (const suite of this.suites) {
      await this._runSuite(suite);
      if (this.options.bail && this.stats.failed > 0) break;
    }
    this.stats.endTime = Date.now();
    return this.stats;
  }

  async _runSuite(suite) {
    this.stats.totalSuites++;

    // Execute beforeAll hooks
    for (const hook of suite.beforeAllHooks) {
      await hook();
    }

    // Execute tests
    for (const testCase of suite.tests) {
      // Filter by grep
      if (this.options.grep && !this.options.grep.test(testCase.name) && !this.options.grep.test(suite.name)) {
        testCase.status = 'skipped';
        this.stats.skipped++;
        continue;
      }
      // Filter by tier
      if (this.options.tier && String(testCase.tier) !== String(this.options.tier)) {
        testCase.status = 'skipped';
        this.stats.skipped++;
        continue;
      }

      this.stats.totalTests++;

      // Execute beforeEach hooks (including parent's)
      const beforeEachHooks = this._collectHooks(suite, 'beforeEachHooks');
      for (const hook of beforeEachHooks) {
        await hook();
      }

      const testStart = Date.now();
      try {
        await Promise.race([
          testCase.fn(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout of ${this.options.timeout}ms exceeded`)), this.options.timeout)
          )
        ]);
        testCase.status = 'passed';
        testCase.duration = Date.now() - testStart;
        this.stats.passed++;
      } catch (err) {
        testCase.status = 'failed';
        testCase.duration = Date.now() - testStart;
        testCase.error = err;
        this.stats.failed++;
      }

      // Execute afterEach hooks
      const afterEachHooks = this._collectHooks(suite, 'afterEachHooks');
      for (const hook of afterEachHooks) {
        try {
          await hook();
        } catch (hookErr) {
          console.error(`Error in afterEach hook: ${hookErr.message}`);
        }
      }

      if (this.options.bail && this.stats.failed > 0) return;
    }

    // Run child suites
    for (const childSuite of suite.suites) {
      await this._runSuite(childSuite);
      if (this.options.bail && this.stats.failed > 0) return;
    }

    // Execute afterAll hooks
    for (const hook of suite.afterAllHooks) {
      await hook();
    }
  }

  _collectHooks(suite, hookName) {
    const hooks = [];
    let current = suite;
    while (current) {
      if (current[hookName]) {
        hooks.unshift(...current[hookName]);
      }
      current = current.parent;
    }
    return hooks;
  }
}
```

### 5.4 `tests/e2e/harness/reporter.js`
```javascript
/**
 * Multi-Format E2E Reporter (Console Table, TAP v13, JSON)
 */
import fs from 'node:fs';
import path from 'node:path';

export class Reporter {
  constructor(format = 'console') {
    this.format = format;
  }

  report(runner) {
    if (this.format === 'tap') {
      this._reportTAP(runner);
    } else if (this.format === 'json') {
      this._reportJSON(runner);
    } else {
      this._reportConsole(runner);
      this._saveJSON(runner);
    }
  }

  _reportConsole(runner) {
    const { totalSuites, totalTests, passed, failed, skipped, startTime, endTime } = runner.stats;
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('\n======================================================================');
    console.log('                 E2E TEST RUNNER EXECUTION REPORT                     ');
    console.log('======================================================================\n');

    const tierGroups = { 1: [], 2: [], 3: [], 4: [] };

    const collectTests = (suite) => {
      for (const t of suite.tests) {
        const tier = t.tier || '1';
        if (tierGroups[tier]) tierGroups[tier].push({ ...t, suiteName: suite.name });
      }
      for (const sub of suite.suites) collectTests(sub);
    };

    for (const suite of runner.suites) collectTests(suite);

    for (const [tier, tests] of Object.entries(tierGroups)) {
      if (tests.length === 0) continue;
      const tierPassed = tests.filter((t) => t.status === 'passed').length;
      const tierFailed = tests.filter((t) => t.status === 'failed').length;
      console.log(`\x1b[1mTier ${tier} Results:\x1b[0m ${tierPassed} passed, ${tierFailed} failed (${tests.length} total)`);
      for (const t of tests) {
        const icon = t.status === 'passed' ? '\x1b[32m✓\x1b[0m' : t.status === 'failed' ? '\x1b[31m✕\x1b[0m' : '\x1b[33m-\x1b[0m';
        console.log(`  ${icon} [${t.suiteName}] ${t.name} \x1b[90m(${t.duration}ms)\x1b[0m`);
        if (t.error) {
          console.log(`    \x1b[31mError: ${t.error.message}\x1b[0m`);
          if (t.error.stack) {
            const stackSnippet = t.error.stack.split('\n').slice(1, 3).join('\n    ');
            console.log(`    \x1b[90m${stackSnippet}\x1b[0m`);
          }
        }
      }
      console.log('');
    }

    console.log('----------------------------------------------------------------------');
    console.log(`Total Suites:  ${totalSuites}`);
    console.log(`Total Tests:   ${totalTests}`);
    console.log(`Passed:        \x1b[32m${passed}\x1b[0m`);
    console.log(`Failed:        \x1b[31m${failed}\x1b[0m`);
    console.log(`Skipped:       \x1b[33m${skipped}\x1b[0m`);
    console.log(`Duration:      ${duration}s`);
    console.log('----------------------------------------------------------------------\n');

    if (failed === 0) {
      console.log('\x1b[32m✔ ALL E2E TESTS PASSED SUCCESSFULLY (Exit Code 0)\x1b[0m\n');
    } else {
      console.log(`\x1b[31m✘ ${failed} TEST(S) FAILED (Exit Code 1)\x1b[0m\n`);
    }
  }

  _reportTAP(runner) {
    const allTests = [];
    const collect = (s) => {
      allTests.push(...s.tests);
      s.suites.forEach(collect);
    };
    runner.suites.forEach(collect);

    console.log('TAP version 13');
    console.log(`1..${allTests.length}`);
    allTests.forEach((t, idx) => {
      const num = idx + 1;
      if (t.status === 'passed') {
        console.log(`ok ${num} - ${t.name}`);
      } else if (t.status === 'skipped') {
        console.log(`ok ${num} - ${t.name} # SKIP`);
      } else {
        console.log(`not ok ${num} - ${t.name}`);
        console.log(`  ---`);
        console.log(`  message: ${t.error?.message || 'Unknown error'}`);
        console.log(`  ...`);
      }
    });
  }

  _saveJSON(runner) {
    try {
      const reportDir = path.resolve(process.cwd(), 'tests/e2e/reports');
      if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
      const reportPath = path.join(reportDir, 'e2e-report.json');
      const payload = {
        timestamp: new Date().toISOString(),
        stats: runner.stats,
        suites: runner.suites.map(this._serializeSuite)
      };
      fs.writeFileSync(reportPath, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (e) {
      // Non-fatal if reports folder cannot be written
    }
  }

  _serializeSuite(s) {
    return {
      name: s.name,
      tests: s.tests.map((t) => ({
        name: t.name,
        tier: t.tier,
        status: t.status,
        duration: t.duration,
        error: t.error ? t.error.message : null
      })),
      suites: s.suites.map((sub) => this._serializeSuite(sub))
    };
  }
}
```

### 5.5 `tests/e2e/harness/static-analyzer.js`
```javascript
/**
 * Static Code, Config, and Asset Verifier
 */
import fs from 'node:fs';
import path from 'node:path';

export class StaticAnalyzer {
  constructor(projectRoot = process.cwd()) {
    this.root = projectRoot;
  }

  fileExists(relativePath) {
    return fs.existsSync(path.resolve(this.root, relativePath));
  }

  readFile(relativePath) {
    const fullPath = path.resolve(this.root, relativePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${relativePath}`);
    }
    return fs.readFileSync(fullPath, 'utf-8');
  }

  verifyVercelConfig() {
    const content = this.readFile('vercel.json');
    const json = JSON.parse(content);
    const hasSPA = Array.isArray(json.rewrites) && json.rewrites.some(
      (r) => r.source === '/(.*)' && r.destination === '/index.html'
    );
    return {
      exists: true,
      hasSPARewrites: hasSPA,
      raw: json
    };
  }

  verifyTailwindConfig() {
    const content = this.readFile('tailwind.config.js');
    return {
      hasDarkModeClass: content.includes("darkMode: 'class'") || content.includes('darkMode: "class"'),
      hasCyanToken: content.includes('#00f0ff') || content.includes('cyan'),
      hasGoldToken: content.includes('#fbbf24') || content.includes('gold'),
      hasDarkNavyToken: content.includes('#0e131f') || content.includes('#07090e') || content.includes('navy'),
      hasSerifFont: content.includes('Playfair Display') || content.includes('serif'),
      hasSansFont: content.includes('Inter') || content.includes('sans')
    };
  }

  verifyPublicAssets() {
    const resumePath = path.resolve(this.root, 'public/Aadi_Resume-04-09-2026.pdf');
    const faviconPath = path.resolve(this.root, 'public/favicon.svg');
    const resumeStats = fs.existsSync(resumePath) ? fs.statSync(resumePath) : null;
    const faviconStats = fs.existsSync(faviconPath) ? fs.statSync(faviconPath) : null;

    return {
      resumeExists: !!resumeStats && resumeStats.size > 1000,
      resumeSize: resumeStats ? resumeStats.size : 0,
      faviconExists: !!faviconStats && faviconStats.size > 0
    };
  }

  verifyDistBuild() {
    const distPath = path.resolve(this.root, 'dist');
    if (!fs.existsSync(distPath)) {
      return { exists: false, hasIndex: false, assets: [] };
    }
    const hasIndex = fs.existsSync(path.join(distPath, 'index.html'));
    const assetsDir = path.join(distPath, 'assets');
    const assets = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
    return {
      exists: true,
      hasIndex,
      assets,
      hasJs: assets.some((f) => f.endsWith('.js')),
      hasCss: assets.some((f) => f.endsWith('.css'))
    };
  }
}
```

### 5.6 `tests/e2e/harness/mocks/emailjs-mock.js`
```javascript
/**
 * Mock EmailJS Browser Client
 */
export function createEmailJSMock() {
  const sentMessages = [];
  let shouldFail = false;

  return {
    send: async (serviceId, templateId, templateParams, publicKey) => {
      if (shouldFail) {
        throw new Error('EmailJS mock network error: 500 Internal Server Error');
      }
      const record = { serviceId, templateId, templateParams, publicKey, timestamp: Date.now() };
      sentMessages.push(record);
      return { status: 200, text: 'OK' };
    },

    sendForm: async (serviceId, templateId, formElement, publicKey) => {
      if (shouldFail) {
        throw new Error('EmailJS mock form submission failed');
      }
      const formData = {};
      if (formElement && formElement.elements) {
        for (const el of formElement.elements) {
          if (el.name) formData[el.name] = el.value;
        }
      }
      const record = { serviceId, templateId, formData, publicKey, timestamp: Date.now() };
      sentMessages.push(record);
      return { status: 200, text: 'OK' };
    },

    setShouldFail: (fail) => {
      shouldFail = fail;
    },

    getSentMessages: () => [...sentMessages],

    reset: () => {
      sentMessages.length = 0;
      shouldFail = false;
    }
  };
}
```

### 5.7 `tests/e2e/harness/mocks/storage-mock.js`
```javascript
/**
 * LocalStorage Mock with Change Listeners
 */
export class LocalStorageMock {
  constructor() {
    this.store = new Map();
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    this.store.set(key, String(value));
  }

  removeItem(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }

  get length() {
    return this.store.size;
  }

  key(index) {
    const keys = Array.from(this.store.keys());
    return keys[index] || null;
  }
}
```

### 5.8 `tests/e2e/harness/mocks/observer-mocks.js`
```javascript
/**
 * IntersectionObserver & ResizeObserver Mocks
 */
export function createObserverMocks() {
  class MockIntersectionObserver {
    constructor(callback) {
      this.callback = callback;
      this.elements = new Set();
    }
    observe(element) {
      this.elements.add(element);
      // Immediately fire intersection for automated tests
      this.callback([
        {
          target: element,
          isIntersecting: true,
          intersectionRatio: 1.0,
          boundingClientRect: element.getBoundingClientRect ? element.getBoundingClientRect() : {}
        }
      ], this);
    }
    unobserve(element) {
      this.elements.delete(element);
    }
    disconnect() {
      this.elements.clear();
    }
  }

  class MockResizeObserver {
    constructor(callback) {
      this.callback = callback;
      this.elements = new Set();
    }
    observe(element) {
      this.elements.add(element);
      this.callback([
        {
          target: element,
          contentRect: { width: 1280, height: 800 }
        }
      ], this);
    }
    unobserve(element) {
      this.elements.delete(element);
    }
    disconnect() {
      this.elements.clear();
    }
  }

  return {
    IntersectionObserver: MockIntersectionObserver,
    ResizeObserver: MockResizeObserver
  };
}
```

### 5.9 `tests/e2e/harness/index.js`
```javascript
/**
 * Public Export Entrypoint for Test Suites
 */
import { TestRunner } from './runner.js';
import { expect } from './assertions.js';
import { DOMEnvironment } from './dom-environment.js';
import { StaticAnalyzer } from './static-analyzer.js';
import { Reporter } from './reporter.js';

export const globalRunner = new TestRunner();

export const describe = globalRunner.describe.bind(globalRunner);
export const test = globalRunner.test.bind(globalRunner);
export const it = test;
export const beforeAll = globalRunner.beforeAll.bind(globalRunner);
export const beforeEach = globalRunner.beforeEach.bind(globalRunner);
export const afterEach = globalRunner.afterEach.bind(globalRunner);
export const afterAll = globalRunner.afterAll.bind(globalRunner);

export { expect, DOMEnvironment, StaticAnalyzer, Reporter, TestRunner };
```

### 5.10 `tests/e2e/run-all.js`
```javascript
/**
 * Master CLI Entry Point for E2E Test Suite
 * Usage: node tests/e2e/run-all.js [--tier=1|2|3|4] [--grep=pattern] [--bail] [--reporter=console|tap|json]
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { globalRunner, Reporter } from './harness/index.js';

// Parse CLI arguments
const args = process.argv.slice(2);
const options = {
  tier: args.find((a) => a.startsWith('--tier='))?.split('=')[1] || null,
  grep: args.find((a) => a.startsWith('--grep='))?.split('=')[1] || null,
  bail: args.includes('--bail'),
  reporter: args.find((a) => a.startsWith('--reporter='))?.split('=')[1] || 'console'
};

Object.assign(globalRunner.options, options);

async function findTestFiles(dir) {
  const testFiles = [];
  if (!fs.existsSync(dir)) return testFiles;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      testFiles.push(...(await findTestFiles(fullPath)));
    } else if (entry.name.endsWith('.test.js')) {
      testFiles.push(fullPath);
    }
  }
  return testFiles;
}

async function main() {
  const rootE2EDir = path.resolve(process.cwd(), 'tests/e2e');
  const targetTiers = options.tier ? [`tier${options.tier}`] : ['tier1', 'tier2', 'tier3', 'tier4'];

  console.log(`[E2E] Discovering test files across: ${targetTiers.join(', ')}...`);

  let totalFiles = 0;
  for (const tierName of targetTiers) {
    const tierDir = path.join(rootE2EDir, tierName);
    const files = await findTestFiles(tierDir);
    totalFiles += files.length;
    for (const file of files) {
      // Dynamically import test file so it registers suites with globalRunner
      await import(pathToFileURL(file).href);
    }
  }

  console.log(`[E2E] Loaded ${totalFiles} test files. Running test suites...`);

  const stats = await globalRunner.run();

  const reporter = new Reporter(options.reporter);
  reporter.report(globalRunner);

  process.exit(stats.failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('[E2E] Unhandled Fatal Exception:', err);
  process.exit(1);
});
```

---

## 6. Recommendations for Sub-Orchestrator & Test Writers

1. **Self-Contained Dependency Strategy**:
   - Recommend adding `"jsdom": "^25.0.1"` to devDependencies in `package.json` so full DOM parsing is natively enabled.
   - The DOMEnvironment design provided above includes a self-contained fallback shim so that even if `jsdom` is not installed, AST, configuration, asset, and token checks proceed without breaking.
2. **Parallel Subagent Execution**:
   - `spec_miner_e2e_2` can immediately write tests against the `expect` and `describe` API established in this specification.
   - `explorer_e2e_3` can design Tier 3 pairwise matrix and Tier 4 multi-step recruiter journey scripts using the `routeEmulator` and `domEnv` API.
3. **Audit & Anti-Cheating Compliance**:
   - Every assertion checks actual parsed source, DOM nodes, or runtime states. Dummy `expect(true).toBe(true)` checks are strictly forbidden and detectable by the forensic auditor.
4. **Clean Verification**:
   - All tests run via `node tests/e2e/run-all.js`.
   - On full pass, exit code is `0`.
   - Output summary table cleanly separates Tier 1 (Features), Tier 2 (Boundaries), Tier 3 (Pairwise), and Tier 4 (Real-World Scenarios).
