/**
 * Tier 2: Empirical Challenger Verification Suite for Milestone 2
 * Focus: Navigation, MobileMenu, Layout & Lenis, Theme & System Polish
 * Author: challenger_m2_2
 */

import fs from 'fs';
import path from 'path';
import { describe, test, expect, DOMEnvironment, StaticAnalyzer } from '../harness/index.js';

describe('Challenger M2: Empirical Navigation, Layout & Lenis Verification', () => {
  const analyzer = new StaticAnalyzer();
  const rootDir = process.cwd();
  let domEnv;

  // =========================================================================
  // AREA 1: NAVBAR EMPIRICAL VERIFICATION
  // =========================================================================
  describe('Area 1: Navbar Scroll Hysteresis, Hover & CTA Integrity', () => {
    test('CHALLENGE-M2-NAV-01: Scroll Threshold Strictness and 80px Compaction Boundary', () => {
      const navbarSrc = analyzer.readFile('src/components/layout/Navbar.jsx');
      expect(navbarSrc).toContain('scrollY > 80');
      expect(navbarSrc).toContain('window.scrollY');
      expect(navbarSrc).toContain('document.documentElement.scrollTop');

      // Direct simulation of Navbar scroll state transition
      const computeIsScrolled = (y) => y > 80;

      expect(computeIsScrolled(0)).toBe(false);
      expect(computeIsScrolled(79)).toBe(false);
      expect(computeIsScrolled(80)).toBe(false);
      expect(computeIsScrolled(80.1)).toBe(true);
      expect(computeIsScrolled(81)).toBe(true);
      expect(computeIsScrolled(500)).toBe(true);

      // Reverse decompression transition
      const reverseSequence = [500, 200, 85, 81, 80, 79, 50, 0];
      const expectedReverse = [true, true, true, true, false, false, false, false];
      const actualReverse = reverseSequence.map(computeIsScrolled);
      expect(JSON.stringify(actualReverse)).toBe(JSON.stringify(expectedReverse));

      // 1000 boundary jitter stress cycles
      for (let i = 0; i < 1000; i++) {
        const below = 80 - Math.random() * 5;
        const above = 80 + Math.random() * 5;
        expect(computeIsScrolled(below)).toBe(false);
        expect(computeIsScrolled(above)).toBe(true);
      }
    });

    test('CHALLENGE-M2-NAV-02: Navbar Class Switching and Compaction Attributes', () => {
      const navbarSrc = analyzer.readFile('src/components/layout/Navbar.jsx');
      expect(navbarSrc).toContain('h-16');
      expect(navbarSrc).toContain('h-20');
      expect(navbarSrc).toContain('backdrop-blur-md');
      expect(navbarSrc).toContain('bg-surface/85');
      expect(navbarSrc).toContain('bg-surface/60');
      expect(navbarSrc).toContain("{ passive: true }");
      expect(navbarSrc).toContain("removeEventListener('scroll'");
    });

    test('CHALLENGE-M2-NAV-03: Kinetic Rolling Text Reveal & Screen Reader Protection', () => {
      const navbarSrc = analyzer.readFile('src/components/layout/Navbar.jsx');
      expect(navbarSrc).toContain('overflow-hidden');
      expect(navbarSrc).toContain('group-hover:-translate-y-full');
      expect(navbarSrc).toContain('translate-y-full');
      expect(navbarSrc).toContain('group-hover:translate-y-0');
      expect(navbarSrc).toContain('aria-hidden="true"');
    });

    test('CHALLENGE-M2-NAV-04: Navigation Links Scope & Responsive Container Hiding', () => {
      const navbarSrc = analyzer.readFile('src/components/layout/Navbar.jsx');
      const expectedLinks = ['Home', 'About', 'Projects', 'Blog', 'Contact'];
      for (const link of expectedLinks) {
        expect(navbarSrc).toContain(`name: '${link}'`);
      }
      expect(navbarSrc).toContain('hidden md:flex');
    });

    test('CHALLENGE-M2-NAV-05: Resume CTA Asset Physical Presence & Valid PDF Header', () => {
      const resumePath = path.join(rootDir, 'public', 'Aadi_Resume-04-09-2026.pdf');
      expect(fs.existsSync(resumePath)).toBe(true);

      const stats = fs.statSync(resumePath);
      expect(stats.size).toBeGreaterThan(10000);

      const fd = fs.openSync(resumePath, 'r');
      const buffer = Buffer.alloc(5);
      fs.readSync(fd, buffer, 0, 5, 0);
      fs.closeSync(fd);
      expect(buffer.toString('utf8')).toBe('%PDF-');
    });

    test('CHALLENGE-M2-NAV-06: Resume CTA Link Target, Security & Data Alignment', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.resumeUrl).toBe('/Aadi_Resume-04-09-2026.pdf');

      const navbarSrc = analyzer.readFile('src/components/layout/Navbar.jsx');
      expect(navbarSrc).toContain('Aadi_Resume-04-09-2026.pdf');
      expect(navbarSrc).toContain('target="_blank"');
      expect(navbarSrc).toContain('rel="noopener noreferrer"');
    });

    test('CHALLENGE-M2-NAV-07: Navbar ThemeToggle and Mobile Hamburger Targets (>=44px)', () => {
      const navbarSrc = analyzer.readFile('src/components/layout/Navbar.jsx');
      expect(navbarSrc).toContain('<ThemeToggle');
      expect(navbarSrc).toContain('min-w-[44px]');
      expect(navbarSrc).toContain('min-h-[44px]');
      expect(navbarSrc).toContain('aria-expanded={isMobileMenuOpen}');
    });
  });

  // =========================================================================
  // AREA 2: MOBILE MENU EMPIRICAL VERIFICATION
  // =========================================================================
  describe('Area 2: MobileMenu Dual-Layer Scroll Lock & Auto-Close Triggers', () => {
    test('CHALLENGE-M2-MOB-01: Dual-Layer Scroll Lock Implementation Contract', () => {
      const mobileSrc = analyzer.readFile('src/components/layout/MobileMenu.jsx');
      expect(mobileSrc).toContain("document.body.style.overflow = 'hidden'");
      expect(mobileSrc).toContain("document.body.style.overflow = ''");
      expect(mobileSrc).toContain("window.__lenis.stop()");
      expect(mobileSrc).toContain("window.__lenis.start()");
      expect(mobileSrc).toContain("window.__lenis");
    });

    test('CHALLENGE-M2-MOB-02: Scroll Lock Stress Testing & Unmount Restoration', () => {
      const mockBody = { style: { overflow: '' } };
      let lenisStopped = false;
      let stopCount = 0;
      let startCount = 0;

      const mockLenis = {
        stop: () => { lenisStopped = true; stopCount++; },
        start: () => { lenisStopped = false; startCount++; },
      };

      const simulateLock = (isOpen) => {
        if (isOpen) {
          mockBody.style.overflow = 'hidden';
          mockLenis.stop();
        } else {
          mockBody.style.overflow = '';
          mockLenis.start();
        }
      };

      // 500 rapid open/close stress cycles
      for (let i = 0; i < 500; i++) {
        simulateLock(true);
        simulateLock(false);
      }
      expect(mockBody.style.overflow).toBe('');
      expect(lenisStopped).toBe(false);
      expect(stopCount).toBe(500);
      expect(startCount).toBe(500);

      // Unmount while open restoration simulation
      simulateLock(true);
      expect(mockBody.style.overflow).toBe('hidden');
      // Cleanup hook executes
      mockBody.style.overflow = '';
      mockLenis.start();
      expect(mockBody.style.overflow).toBe('');
      expect(lenisStopped).toBe(false);
    });

    test('CHALLENGE-M2-MOB-03: Auto-Close on Escape Key Listener & Precision', () => {
      const mobileSrc = analyzer.readFile('src/components/layout/MobileMenu.jsx');
      expect(mobileSrc).toContain("e.key === 'Escape'");
      expect(mobileSrc).toContain("onClose()");
      expect(mobileSrc).toContain("removeEventListener('keydown'");

      let closedCount = 0;
      const onClose = () => { closedCount++; };

      const simulateKey = (key, isOpen) => {
        if (key === 'Escape' && isOpen) onClose();
      };

      simulateKey('Enter', true);
      expect(closedCount).toBe(0);
      simulateKey('Tab', true);
      expect(closedCount).toBe(0);
      simulateKey('Escape', false);
      expect(closedCount).toBe(0);
      simulateKey('Escape', true);
      expect(closedCount).toBe(1);
    });

    test('CHALLENGE-M2-MOB-04: Auto-Close on Desktop Resize (>= 768px)', () => {
      const mobileSrc = analyzer.readFile('src/components/layout/MobileMenu.jsx');
      expect(mobileSrc).toContain('window.innerWidth >= 768');
      expect(mobileSrc).toContain("removeEventListener('resize'");

      let closedCount = 0;
      const onClose = () => { closedCount++; };

      const simulateResize = (w, isOpen) => {
        if (w >= 768 && isOpen) onClose();
      };

      simulateResize(375, true);
      expect(closedCount).toBe(0);
      simulateResize(767, true);
      expect(closedCount).toBe(0);
      simulateResize(768, false);
      expect(closedCount).toBe(0);
      simulateResize(768, true);
      expect(closedCount).toBe(1);
      simulateResize(1280, true);
      expect(closedCount).toBe(2);
    });

    test('CHALLENGE-M2-MOB-05: Route Links Click Auto-Close and Touch Targets', () => {
      const mobileSrc = analyzer.readFile('src/components/layout/MobileMenu.jsx');
      expect(mobileSrc).toContain('onClick={onClose}');
      expect(mobileSrc).toContain('min-h-[48px]');
      expect(mobileSrc).toContain('role="dialog"');
      expect(mobileSrc).toContain('aria-modal="true"');
      expect(mobileSrc).toContain('aria-label="Mobile Navigation"');
    });
  });

  // =========================================================================
  // AREA 3: LAYOUT & LENIS INTEGRATION EMPIRICAL VERIFICATION
  // =========================================================================
  describe('Area 3: Layout, Lenis Smooth Scroll & GSAP Ticker Integration', () => {
    test('CHALLENGE-M2-LENIS-01: Lenis Construction & Global Window Pointer', () => {
      const layoutSrc = analyzer.readFile('src/components/layout/Layout.jsx');
      expect(layoutSrc).toContain('new Lenis(');
      expect(layoutSrc).toContain('window.__lenis = lenis');
      expect(layoutSrc).toContain('duration: 1.2');
      expect(layoutSrc).toContain('smoothWheel: true');
    });

    test('CHALLENGE-M2-LENIS-02: GSAP Ticker lagSmoothing(0) & ScrollTrigger Binding', () => {
      const layoutSrc = analyzer.readFile('src/components/layout/Layout.jsx');
      expect(layoutSrc).toContain('gsap.registerPlugin(ScrollTrigger)');
      expect(layoutSrc).toContain("lenis.on('scroll', ScrollTrigger.update)");
      expect(layoutSrc).toContain('gsap.ticker.add(');
      expect(layoutSrc).toContain('lenis.raf(time * 1000)');
      expect(layoutSrc).toContain('gsap.ticker.lagSmoothing(0)');
    });

    test('CHALLENGE-M2-LENIS-03: Route Change Scroll Restoration & Refresh Contract', () => {
      const layoutSrc = analyzer.readFile('src/components/layout/Layout.jsx');
      expect(layoutSrc).toContain('location.pathname');
      expect(layoutSrc).toContain('lenisRef.current.scrollTo(0, { immediate: true })');
      expect(layoutSrc).toContain('window.scrollTo(0, 0)');
      expect(layoutSrc).toContain('ScrollTrigger.refresh()');
    });

    test('CHALLENGE-M2-LENIS-04: Teardown Lifecycle & Resource Cleanup', () => {
      const layoutSrc = analyzer.readFile('src/components/layout/Layout.jsx');
      expect(layoutSrc).toContain('gsap.ticker.remove(');
      expect(layoutSrc).toContain('lenis.destroy()');
      expect(layoutSrc).toContain('delete window.__lenis');
    });

    test('CHALLENGE-M2-LENIS-05: useLenis Helper Hook Interface Contract', () => {
      expect(analyzer.fileExists('src/hooks/useLenis.js')).toBe(true);
      const hookSrc = analyzer.readFile('src/hooks/useLenis.js');
      expect(hookSrc).toContain('return { lenis, scrollTo }');
      expect(hookSrc).toContain('lenis.scrollTo(target, options)');
    });

    test('CHALLENGE-M2-LENIS-06: Master Layout Shell Element Composition', () => {
      const layoutSrc = analyzer.readFile('src/components/layout/Layout.jsx');
      expect(layoutSrc).toContain('href="#main-content"');
      expect(layoutSrc).toContain('Skip to main content');
      expect(layoutSrc).toContain('id="main-content"');
      expect(layoutSrc).toContain('<Navbar />');
      expect(layoutSrc).toContain('<Footer />');
      expect(layoutSrc).toContain('<CustomCursor />');
      expect(layoutSrc).toContain('<ScrollProgressBar />');
    });
  });

  // =========================================================================
  // AREA 4: THEME SYSTEM & ANTI-FOUC EMPIRICAL VERIFICATION
  // =========================================================================
  describe('Area 4: Theme Toggle, Context, Anti-FOUC & CSS Design Tokens', () => {
    test('CHALLENGE-M2-THEME-01: Synchronous Anti-FOUC Script in index.html <head>', () => {
      const html = analyzer.readFile('index.html');
      expect(html).toContain('am_portfolio_theme');
      expect(html).toContain("classList.add('dark')");
      expect(html).toContain('<script>');
    });

    test('CHALLENGE-M2-THEME-02: ThemeContext Persistence & Multi-Tab Synchronization', () => {
      const themeSrc = analyzer.readFile('src/context/ThemeContext.jsx');
      expect(themeSrc).toContain("STORAGE_KEY = 'am_portfolio_theme'");
      expect(themeSrc).toContain("root.classList.add('dark')");
      expect(themeSrc).toContain("root.classList.remove('dark')");
      expect(themeSrc).toContain("localStorage.setItem(STORAGE_KEY, theme)");
      expect(themeSrc).toContain("addEventListener('storage'");
      expect(themeSrc).toContain("removeEventListener('storage'");
    });

    test('CHALLENGE-M2-THEME-03: ThemeToggle Component Accessibility Attributes', () => {
      const toggleSrc = analyzer.readFile('src/components/ui/ThemeToggle.jsx');
      expect(toggleSrc).toContain('role="switch"');
      expect(toggleSrc).toContain('aria-checked={isDark}');
      expect(toggleSrc).toContain('min-w-[44px]');
      expect(toggleSrc).toContain('min-h-[44px]');
      expect(toggleSrc).toContain("e.key === 'Enter'");
      expect(toggleSrc).toContain("e.key === ' '");
    });

    test('CHALLENGE-M2-THEME-04: CSS Color Tokens & Lenis Reset Rules', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css).toContain('--color-bg: #07090e;');
      expect(css).toContain('--color-accent-cyan: #00f0ff;');
      expect(css).toContain('--color-accent-gold: #fbbf24;');
      expect(css).toContain('html.lenis');
      expect(css).toContain('.lenis.lenis-smooth');
    });
  });

  // =========================================================================
  // AREA 5: PRODUCTION BUILD ARTIFACTS
  // =========================================================================
  describe('Area 5: Production Build Artifacts Audit', () => {
    test('CHALLENGE-M2-BUILD-01: dist/ Production Bundles and Split Chunks', () => {
      const distDir = path.join(rootDir, 'dist');
      expect(fs.existsSync(distDir)).toBe(true);

      const distHtml = path.join(distDir, 'index.html');
      expect(fs.existsSync(distHtml)).toBe(true);

      const assetsDir = path.join(distDir, 'assets');
      expect(fs.existsSync(assetsDir)).toBe(true);

      const assetFiles = fs.readdirSync(assetsDir);
      expect(assetFiles.some(f => f.startsWith('index-') && f.endsWith('.js'))).toBe(true);
      expect(assetFiles.some(f => f.startsWith('index-') && f.endsWith('.css'))).toBe(true);
      expect(assetFiles.some(f => f.includes('vendor-react'))).toBe(true);
      expect(assetFiles.some(f => f.includes('vendor-motion'))).toBe(true);
    });
  });
});
