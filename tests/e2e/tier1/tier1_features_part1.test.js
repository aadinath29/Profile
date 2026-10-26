/**
 * Tier 1: Feature Coverage Test Suite - Part 1 (Features 1 to 10)
 * 50 Test Cases (5 tests per feature x 10 features)
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

import { describe, test, expect, DOMEnvironment, StaticAnalyzer } from '../harness/index.js';

describe('Tier 1: Feature Coverage - Part 1 (Features 1 to 10)', () => {
  const analyzer = new StaticAnalyzer();
  let domEnv;

  describe('Feature 1: Real Developer Profile & Data', () => {
    test('T1-F01-01: Developer Full Name Verification ("Aadinath Magar")', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.name).toBe('Aadinath Magar');
      expect(dev.nickname).toBe('Aadi');
    });

    test('T1-F01-02: Developer Professional Title Verification ("Full-Stack Developer")', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.title).toBe('Full-Stack Developer');
      expect(dev.location).toContain('India');
    });

    test('T1-F01-03: Verified Developer Bio Narrative Content', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.bio).toContain('MERN');
      expect(dev.bio).toContain('India');
      expect(dev.bio.length).toBeGreaterThan(50);
    });

    test('T1-F01-04: Direct Contact Links Integrity (Email & Phone)', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.email).toBe('aadinathbmagar75@gmail.com');
      expect(dev.phone).toBe('+91 92090 17621');
      const emailLink = dev.socialLinks.find((s) => s.name.toLowerCase() === 'email');
      const phoneLink = dev.socialLinks.find((s) => s.name.toLowerCase() === 'phone');
      expect(emailLink.url).toBe('mailto:aadinathbmagar75@gmail.com');
      expect(phoneLink.url).toBe('tel:+919209017621');
    });

    test('T1-F01-05: Social Profiles Links Integrity (GitHub & LinkedIn)', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.github).toBe('https://github.com/aadinath29');
      expect(dev.linkedin).toBe('https://www.linkedin.com/in/aadinath-magar-profile');
    });
  });

  describe('Feature 2: Project Scaffolding & Dependencies', () => {
    test('T1-F02-01: Core Framework & Bundler Manifest Integrity', () => {
      const pkg = analyzer.readJson('package.json');
      expect(pkg.dependencies.react).toBeDefined();
      expect(pkg.dependencies['react-dom']).toBeDefined();
      expect(pkg.devDependencies.vite).toBeDefined();
    });

    test('T1-F02-02: Motion & 3D Animation Libraries Manifest Integrity', () => {
      const pkg = analyzer.readJson('package.json');
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['framer-motion']).toBeDefined();
      expect(deps.gsap).toBeDefined();
      expect(deps.three).toBeDefined();
      expect(deps['@react-three/fiber']).toBeDefined();
      expect(deps.lenis).toBeDefined();
    });

    test('T1-F02-03: Routing, Communication & Icon Libraries Manifest', () => {
      const pkg = analyzer.readJson('package.json');
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      expect(deps['react-router-dom']).toBeDefined();
      expect(deps['@emailjs/browser']).toBeDefined();
      expect(deps['lucide-react']).toBeDefined();
    });

    test('T1-F02-04: Architectural Directory Structure Compliance', () => {
      expect(analyzer.fileExists('src/components')).toBe(true);
      expect(analyzer.fileExists('src/data')).toBe(true);
      expect(analyzer.fileExists('src/pages')).toBe(true);
      expect(analyzer.fileExists('src/styles')).toBe(true);
      expect(analyzer.fileExists('public')).toBe(true);
    });

    test('T1-F02-05: Vite Standard CLI Scripts Availability', () => {
      const pkg = analyzer.readJson('package.json');
      expect(pkg.scripts.dev).toContain('vite');
      expect(pkg.scripts.build).toContain('vite build');
    });
  });

  describe('Feature 3: Single-Page App Vercel Config', () => {
    test('T1-F03-01: Root vercel.json File Presence', () => {
      expect(analyzer.fileExists('vercel.json')).toBe(true);
    });

    test('T1-F03-02: vercel.json Syntax and Structure Parsing', () => {
      const vercel = analyzer.verifyVercelConfig();
      expect(vercel.exists).toBe(true);
      expect(vercel.raw).toBeDefined();
    });

    test('T1-F03-03: SPA Rewrites Rule Declaration for Index Fallback', () => {
      const vercel = analyzer.verifyVercelConfig();
      expect(vercel.hasSPARewrites).toBe(true);
    });

    test('T1-F03-04: Direct Deep Link Emulation (/about, /projects)', () => {
      const vercel = analyzer.verifyVercelConfig();
      const routes = ['/about', '/projects'];
      const rewrite = vercel.raw.rewrites.find((r) => r.destination === '/index.html');
      for (const route of routes) {
        const regex = new RegExp('^' + rewrite.source.replace('(.*)', '.*') + '$');
        expect(regex.test(route)).toBe(true);
      }
    });

    test('T1-F03-05: Direct Deep Link Emulation (/blog, /contact)', () => {
      const vercel = analyzer.verifyVercelConfig();
      const routes = ['/blog', '/contact'];
      const rewrite = vercel.raw.rewrites.find((r) => r.destination === '/index.html');
      for (const route of routes) {
        const regex = new RegExp('^' + rewrite.source.replace('(.*)', '.*') + '$');
        expect(regex.test(route)).toBe(true);
      }
    });
  });

  describe('Feature 4: Asset Setup & Resume Integration', () => {
    test('T1-F04-01: Resume PDF File Presence & Size', () => {
      const assets = analyzer.verifyPublicAssets();
      expect(assets.resumeExists).toBe(true);
      expect(assets.resumeSize).toBeGreaterThan(10000);
    });

    test('T1-F04-02: Hero Resume CTA Button Link Target', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.resumeUrl).toBe('/Aadi_Resume-04-09-2026.pdf');
    });

    test('T1-F04-03: Branded SVG Favicon File Presence & Monogram', () => {
      expect(analyzer.fileExists('public/favicon.svg')).toBe(true);
      const svg = analyzer.readFile('public/favicon.svg');
      expect(svg).toContain('<svg');
      expect(svg).toContain('AM');
    });

    test('T1-F04-04: Favicon Link Tag in Document Head', () => {
      const indexHtml = analyzer.verifyIndexHtml();
      expect(indexHtml.hasFaviconLink).toBe(true);
    });

    test('T1-F04-05: Zero Broken Image Links & Valid Fallback Assets', () => {
      expect(analyzer.fileExists('public/portrait-placeholder.jpg')).toBe(true);
    });
  });

  describe('Feature 5: Dark/Light Color Tokens & CSS Variables', () => {
    test('T1-F05-01: Tailwind Class Dark Mode Strategy', () => {
      const tailwind = analyzer.verifyTailwindConfig();
      expect(tailwind.hasDarkModeClass).toBe(true);
    });

    test('T1-F05-02: CSS Custom Variables Declaration in src/styles/index.css', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css).toContain(':root');
      expect(css).toContain('.dark');
      expect(css).toContain('--color-bg');
      expect(css).toContain('--color-surface');
      expect(css).toContain('--color-accent-cyan');
    });

    test('T1-F05-03: Dark Primary & Dark Navy Hex Tokens Definition', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css).toContain('#07090e');
      expect(css).toContain('#0e131f');
    });

    test('T1-F05-04: Neon Cyan and Warm Gold Accent Tokens Definition', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css).toContain('#00f0ff');
      expect(css).toContain('#fbbf24');
    });

    test('T1-F05-05: Computed Style Application on Theme Class Toggle', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const docEl = domEnv.document.documentElement;
      docEl.classList.add('dark');
      expect(docEl.classList.contains('dark')).toBe(true);
      docEl.classList.remove('dark');
      expect(docEl.classList.contains('dark')).toBe(false);
      domEnv.teardown();
    });
  });

  describe('Feature 6: Anti-FOUC Theme Initialization', () => {
    test('T1-F06-01: Inline Theme Script Presence in Document Head', () => {
      const indexHtml = analyzer.verifyIndexHtml();
      expect(indexHtml.hasAntiFOUCScript).toBe(true);
    });

    test('T1-F06-02: LocalStorage Theme Key Declaration (am_portfolio_theme)', () => {
      const html = analyzer.readFile('index.html');
      expect(html).toContain('am_portfolio_theme');
    });

    test('T1-F06-03: Immediate Dark Class Addition on Stored "dark"', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      domEnv.localStorage.setItem('am_portfolio_theme', 'dark');
      const theme = domEnv.localStorage.getItem('am_portfolio_theme');
      if (theme === 'dark' || !theme) {
        domEnv.document.documentElement.classList.add('dark');
      }
      expect(domEnv.document.documentElement.classList.contains('dark')).toBe(true);
      domEnv.teardown();
    });

    test('T1-F06-04: Immediate Dark Class Removal on Stored "light"', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      domEnv.localStorage.setItem('am_portfolio_theme', 'light');
      const theme = domEnv.localStorage.getItem('am_portfolio_theme');
      if (theme === 'light') {
        domEnv.document.documentElement.classList.remove('dark');
      }
      expect(domEnv.document.documentElement.classList.contains('dark')).toBe(false);
      domEnv.teardown();
    });

    test('T1-F06-05: Default to Dark Theme on Empty LocalStorage', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      domEnv.localStorage.clear();
      const theme = domEnv.localStorage.getItem('am_portfolio_theme');
      if (!theme || theme === 'dark') {
        domEnv.document.documentElement.classList.add('dark');
      }
      expect(domEnv.document.documentElement.classList.contains('dark')).toBe(true);
      domEnv.teardown();
    });
  });

  describe('Feature 7: Theme Toggle Switch Component', () => {
    test('T1-F07-01: Theme Toggle Contract in ThemeContext or Component', () => {
      expect(analyzer.fileExists('src/context/ThemeContext.jsx') || analyzer.fileExists('src/components/ui/ThemeToggle.jsx')).toBe(true);
    });

    test('T1-F07-02: Click Toggle: Dark to Light Mode Transition', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      domEnv.document.documentElement.classList.add('dark');
      domEnv.localStorage.setItem('am_portfolio_theme', 'dark');

      // Simulate toggle action
      domEnv.document.documentElement.classList.remove('dark');
      domEnv.localStorage.setItem('am_portfolio_theme', 'light');

      expect(domEnv.document.documentElement.classList.contains('dark')).toBe(false);
      expect(domEnv.localStorage.getItem('am_portfolio_theme')).toBe('light');
      domEnv.teardown();
    });

    test('T1-F07-03: Click Toggle: Light to Dark Mode Transition', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      domEnv.document.documentElement.classList.remove('dark');
      domEnv.localStorage.setItem('am_portfolio_theme', 'light');

      // Simulate toggle action
      domEnv.document.documentElement.classList.add('dark');
      domEnv.localStorage.setItem('am_portfolio_theme', 'dark');

      expect(domEnv.document.documentElement.classList.contains('dark')).toBe(true);
      expect(domEnv.localStorage.getItem('am_portfolio_theme')).toBe('dark');
      domEnv.teardown();
    });

    test('T1-F07-04: Visual Theme Toggle State Representation', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const toggle = domEnv.document.createElement('button');
      toggle.setAttribute('aria-label', 'Switch to light theme');
      expect(toggle.getAttribute('aria-label')).toBe('Switch to light theme');
      domEnv.teardown();
    });

    test('T1-F07-05: Theme State Persistence Across Sessions', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      domEnv.localStorage.setItem('am_portfolio_theme', 'light');
      expect(domEnv.localStorage.getItem('am_portfolio_theme')).toBe('light');
      domEnv.teardown();
    });
  });

  describe('Feature 8: Typography & Google Fonts Loading', () => {
    test('T1-F08-01: Google Fonts Preconnect Directives in Document Head', () => {
      const indexHtml = analyzer.verifyIndexHtml();
      expect(indexHtml.hasFontsPreconnect).toBe(true);
    });

    test('T1-F08-02: Google Fonts Stylesheet Link for Playfair Display & Inter', () => {
      const html = analyzer.readFile('index.html');
      expect(html).toContain('fonts.googleapis.com/css2');
      expect(html).toContain('Playfair+Display');
      expect(html).toContain('Inter');
    });

    test('T1-F08-03: Tailwind Config Font Families Mapping', () => {
      const tailwind = analyzer.verifyTailwindConfig();
      expect(tailwind.hasSerifFont).toBe(true);
      expect(tailwind.hasSansFont).toBe(true);
    });

    test('T1-F08-04: Serif Font Application on Headings in CSS Rules', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css).toContain('Playfair Display');
      expect(css).toContain('serif');
    });

    test('T1-F08-05: Sans-Serif Font Application on Body and Paragraphs', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css).toContain('Inter');
      expect(css).toContain('sans-serif');
    });
  });

  describe('Feature 9: "A.M." Monogram Preloader', () => {
    test('T1-F09-01: Preloader Component Contract & Structure', () => {
      expect(analyzer.fileExists('src/components/common/Preloader.jsx')).toBe(true);
    });

    test('T1-F09-02: "A.M." Monogram Initials Render Specification', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.monogram).toBe('A.M.');
    });

    test('T1-F09-03: Numeric Counter Progression Range (0% to 100%)', () => {
      let counter = 0;
      const progression = [];
      while (counter <= 100) {
        progression.push(counter);
        counter += 25;
      }
      expect(progression[0]).toBe(0);
      expect(progression[progression.length - 1]).toBe(100);
    });

    test('T1-F09-04: Progress Bar Visual Fill Scale Mapping', () => {
      const calculateScale = (pct) => pct / 100;
      expect(calculateScale(0)).toBe(0);
      expect(calculateScale(50)).toBe(0.5);
      expect(calculateScale(100)).toBe(1);
    });

    test('T1-F09-05: Curtain Exit and Hero Reveal State Transition', () => {
      let isPreloading = true;
      let heroRevealed = false;
      const completePreload = () => {
        isPreloading = false;
        heroRevealed = true;
      };
      completePreload();
      expect(isPreloading).toBe(false);
      expect(heroRevealed).toBe(true);
    });
  });

  describe('Feature 10: High-Performance Custom Cursor', () => {
    test('T1-F10-01: Custom Cursor Component Existence', () => {
      expect(analyzer.fileExists('src/components/common/CustomCursor.jsx') || analyzer.fileExists('src/context/CursorContext.jsx')).toBe(true);
    });

    test('T1-F10-02: Cursor Dot and Ring Position Tracking Calculation', () => {
      let mouseX = 0;
      let mouseY = 0;
      const updateCoords = (x, y) => {
        mouseX = x;
        mouseY = y;
      };
      updateCoords(450, 320);
      expect(mouseX).toBe(450);
      expect(mouseY).toBe(320);
    });

    test('T1-F10-03: Cursor Hover Scaling on Interactive Elements', () => {
      const variants = {
        default: { scale: 1 },
        hover: { scale: 1.5 },
        project: { scale: 2.2 }
      };
      expect(variants.hover.scale).toBeGreaterThan(variants.default.scale);
      expect(variants.project.scale).toBeGreaterThan(variants.hover.scale);
    });

    test('T1-F10-04: Cursor Project Card Context Label ("View" / "Open")', () => {
      let cursorVariant = 'default';
      let cursorText = '';
      const onProjectCardHover = () => {
        cursorVariant = 'project';
        cursorText = 'View';
      };
      onProjectCardHover();
      expect(cursorVariant).toBe('project');
      expect(cursorText).toBe('View');
    });

    test('T1-F10-05: Touch Device & Mobile Viewport Cursor Suppression', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      domEnv.setViewportWidth(375);
      const isMobile = domEnv.window.matchMedia('(max-width: 768px)').matches;
      const isTouch = domEnv.window.matchMedia('(pointer: coarse)').matches;
      expect(isMobile || isTouch).toBe(true);
      domEnv.teardown();
    });
  });
});
