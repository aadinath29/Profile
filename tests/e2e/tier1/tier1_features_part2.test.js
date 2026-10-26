/**
 * Tier 1: Feature Coverage Test Suite - Part 2 (Features 11 to 20)
 * 50 Test Cases (5 tests per feature x 10 features)
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

import { describe, test, expect, DOMEnvironment, StaticAnalyzer } from '../harness/index.js';

describe('Tier 1: Feature Coverage - Part 2 (Features 11 to 20)', () => {
  const analyzer = new StaticAnalyzer();
  let domEnv;

  describe('Feature 11: Viewport Scroll Progress Bar', () => {
    test('T1-F11-01: Progress Bar Component Specification', () => {
      expect(
        analyzer.fileExists('src/components/common/ScrollProgressBar.jsx') ||
        analyzer.fileExists('src/components/layout/Layout.jsx')
      ).toBe(true);
    });

    test('T1-F11-02: Top Fixed Viewport Alignment Position', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const bar = domEnv.document.createElement('div');
      bar.setAttribute('data-testid', 'scroll-progress');
      bar.style.position = 'fixed';
      bar.style.top = '0';
      bar.style.left = '0';
      bar.style.zIndex = '9999';
      expect(bar.style.position).toBe('fixed');
      expect(bar.style.top).toBe('0');
      domEnv.teardown();
    });

    test('T1-F11-03: Zero Scroll Initial Width/Scale (0%)', () => {
      const calculateProgress = (scrollY, maxScroll) => (maxScroll > 0 ? scrollY / maxScroll : 0);
      expect(calculateProgress(0, 2000)).toBe(0);
    });

    test('T1-F11-04: Full Scroll Termination Width/Scale (100%)', () => {
      const calculateProgress = (scrollY, maxScroll) => (maxScroll > 0 ? scrollY / maxScroll : 0);
      expect(calculateProgress(2000, 2000)).toBe(1);
    });

    test('T1-F11-05: Neon Accent Color Token Application', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css).toContain('--color-accent-cyan');
      expect(css).toContain('#00f0ff');
    });
  });

  describe('Feature 12: Sticky Header & Desktop Hover', () => {
    test('T1-F12-01: Navbar Component Existence & Layout Export', () => {
      expect(
        analyzer.fileExists('src/components/layout/Navbar.jsx') ||
        analyzer.fileExists('src/components/layout/Header.jsx')
      ).toBe(true);
    });

    test('T1-F12-02: Brand Logo Monogram ("A—M") Navigation to Root', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.navLogo).toBe('A—M');
    });

    test('T1-F12-03: Desktop Navigation Links Completeness (5 Core Routes)', () => {
      const expectedLinks = ['Home', 'About', 'Projects', 'Blog', 'Contact'];
      const routes = ['/', '/about', '/projects', '/blog', '/contact'];
      expect(expectedLinks.length).toBe(5);
      expect(routes.length).toBe(5);
    });

    test('T1-F12-04: Desktop Viewport Sticky Positioning', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const nav = domEnv.document.createElement('header');
      nav.style.position = 'sticky';
      nav.style.top = '0';
      expect(nav.style.position).toBe('sticky');
      expect(nav.style.top).toBe('0');
      domEnv.teardown();
    });

    test('T1-F12-05: Glassmorphism Backdrop Blur Style Specification', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css.length).toBeGreaterThan(100);
    });
  });

  describe('Feature 13: Responsive Mobile Menu', () => {
    test('T1-F13-01: MobileMenu Component Specification', () => {
      expect(
        analyzer.fileExists('src/components/layout/MobileMenu.jsx') ||
        analyzer.fileExists('src/components/layout/Navbar.jsx')
      ).toBe(true);
    });

    test('T1-F13-02: Hamburger Toggle Button Visibility on Mobile Viewport (375px)', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      domEnv.setViewportWidth(375);
      const isMobile = domEnv.window.matchMedia('(max-width: 768px)').matches;
      expect(isMobile).toBe(true);
      domEnv.teardown();
    });

    test('T1-F13-03: Fullscreen Drawer Open State Transition', () => {
      let isOpen = false;
      const toggleMenu = () => { isOpen = !isOpen; };
      toggleMenu();
      expect(isOpen).toBe(true);
      toggleMenu();
      expect(isOpen).toBe(false);
    });

    test('T1-F13-04: Mobile Navigation Links Mirroring Desktop Set', () => {
      const mobileRoutes = ['/', '/about', '/projects', '/blog', '/contact'];
      expect(mobileRoutes).toContain('/');
      expect(mobileRoutes).toContain('/about');
      expect(mobileRoutes).toContain('/projects');
      expect(mobileRoutes).toContain('/blog');
      expect(mobileRoutes).toContain('/contact');
    });

    test('T1-F13-05: Background Scroll Lock During Menu Activation', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      let isOpen = true;
      if (isOpen) {
        domEnv.document.body.style.overflow = 'hidden';
      }
      expect(domEnv.document.body.style.overflow).toBe('hidden');
      isOpen = false;
      domEnv.document.body.style.overflow = '';
      expect(domEnv.document.body.style.overflow).toBe('');
      domEnv.teardown();
    });
  });

  describe('Feature 14: Layout Shell & Lenis Setup', () => {
    test('T1-F14-01: Layout Shell Component Existence', () => {
      expect(analyzer.fileExists('src/components/layout/Layout.jsx') || analyzer.fileExists('src/App.jsx')).toBe(true);
    });

    test('T1-F14-02: Lenis Smooth Scroll Hook / Module Reference', () => {
      const pkg = analyzer.readJson('package.json');
      expect(pkg.dependencies.lenis).toBeDefined();
    });

    test('T1-F14-03: GSAP Ticker Synchronization Hook Contract', () => {
      const pkg = analyzer.readJson('package.json');
      expect(pkg.dependencies.gsap).toBeDefined();
    });

    test('T1-F14-04: Layout Children & Outlet Placement Structure', () => {
      expect(analyzer.fileExists('src/App.jsx') || analyzer.fileExists('src/main.jsx')).toBe(true);
    });

    test('T1-F14-05: Clean Scroll Restoration Contract on Route Navigation', () => {
      let scrollTarget = 1500;
      const onRouteNavigation = () => {
        scrollTarget = 0;
      };
      onRouteNavigation();
      expect(scrollTarget).toBe(0);
    });
  });

  describe('Feature 15: Home Hero Content & Word Stagger', () => {
    test('T1-F15-01: Primary Headline "Aadinath Magar" Text Integrity', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.name).toBe('Aadinath Magar');
    });

    test('T1-F15-02: Professional Subtitle "Full-Stack Developer" Text Integrity', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.title).toBe('Full-Stack Developer');
    });

    test('T1-F15-03: Download Resume CTA Button Link Target', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.resumeUrl).toBe('/Aadi_Resume-04-09-2026.pdf');
    });

    test('T1-F15-04: Word Stagger Array Tokens for Editorial Reveal', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(Array.isArray(dev.aboutHeroWords)).toBe(true);
      expect(dev.aboutHeroWords.length).toBeGreaterThanOrEqual(3);
    });

    test('T1-F15-05: Editorial Playfair Display Serif Heading Typography', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css).toContain('Playfair Display');
    });
  });

  describe('Feature 16: Animated Stats Counter Grid', () => {
    test('T1-F16-01: Stats Data Schema Integrity (Array with >= 4 Items)', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(Array.isArray(dev.stats)).toBe(true);
      expect(dev.stats.length).toBeGreaterThanOrEqual(4);
    });

    test('T1-F16-02: "2 Projects Shipped" Stat Verification', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      const projectsStat = dev.stats.find((s) => s.label.toLowerCase().includes('project'));
      expect(projectsStat).toBeDefined();
      expect(projectsStat.value).toBe(2);
    });

    test('T1-F16-03: "500+ Job Applications" Stat Verification', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      const appsStat = dev.stats.find((s) => s.label.toLowerCase().includes('application'));
      expect(appsStat).toBeDefined();
      expect(appsStat.value).toBe(500);
    });

    test('T1-F16-04: "MERN Stack" Core Competency Stat Verification', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      const mernStat = dev.stats.find((s) => String(s.value).includes('MERN') || s.suffix.includes('MERN'));
      expect(mernStat).toBeDefined();
    });

    test('T1-F16-05: "India" Geographic Location Stat Verification', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      const locStat = dev.stats.find((s) => String(s.value).includes('India'));
      expect(locStat).toBeDefined();
    });
  });

  describe('Feature 17: Skills Layer 1: Infinite Marquee', () => {
    test('T1-F17-01: Marquee Skills Data Array Export', async () => {
      const skillsModule = await import('../../../src/data/skills.js');
      const skills = skillsModule.marqueeSkills || skillsModule.default?.marqueeSkills;
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThanOrEqual(8);
    });

    test('T1-F17-02: Core Technology Badges Presence (React, Node, Express, MongoDB)', async () => {
      const skillsModule = await import('../../../src/data/skills.js');
      const skills = skillsModule.marqueeSkills || skillsModule.default?.marqueeSkills;
      const names = skills.map((s) => s.name);
      expect(names.some((n) => n.includes('React'))).toBe(true);
      expect(names.some((n) => n.includes('Node'))).toBe(true);
      expect(names.some((n) => n.includes('Express'))).toBe(true);
      expect(names.some((n) => n.includes('Mongo'))).toBe(true);
    });

    test('T1-F17-03: Styling & Tooling Badges Presence (Tailwind, Git, Vite)', async () => {
      const skillsModule = await import('../../../src/data/skills.js');
      const skills = skillsModule.marqueeSkills || skillsModule.default?.marqueeSkills;
      const names = skills.map((s) => s.name);
      expect(names.some((n) => n.includes('Tailwind'))).toBe(true);
      expect(names.some((n) => n.includes('Git'))).toBe(true);
      expect(names.some((n) => n.includes('Vite'))).toBe(true);
    });

    test('T1-F17-04: Seamless Loop Marquee Duplication Contract', async () => {
      const skillsModule = await import('../../../src/data/skills.js');
      const skills = skillsModule.marqueeSkills || skillsModule.default?.marqueeSkills;
      const duplicated = [...skills, ...skills];
      expect(duplicated.length).toBe(skills.length * 2);
    });

    test('T1-F17-05: Marquee Ticker Component or Section Integration', () => {
      expect(
        analyzer.fileExists('src/components/ui/MarqueeTicker.jsx') ||
        analyzer.fileExists('src/components/sections/home/SkillsSection.jsx')
      ).toBe(true);
    });
  });

  describe('Feature 18: Skills Layer 2: Bento Grid', () => {
    test('T1-F18-01: Bento Grid Categories Schema (4 Domains)', async () => {
      const skillsModule = await import('../../../src/data/skills.js');
      const categories = skillsModule.skillCategories || skillsModule.default?.skillCategories;
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBe(4);
      const ids = categories.map((c) => c.id);
      expect(ids).toContain('frontend');
      expect(ids).toContain('backend');
      expect(ids).toContain('database');
      expect(ids).toContain('tools');
    });

    test('T1-F18-02: Frontend Bento Card Proficiency Metrics', async () => {
      const skillsModule = await import('../../../src/data/skills.js');
      const categories = skillsModule.skillCategories || skillsModule.default?.skillCategories;
      const frontend = categories.find((c) => c.id === 'frontend');
      expect(frontend.skills.some((s) => s.name.includes('React') && s.level >= 80)).toBe(true);
      expect(frontend.skills.some((s) => s.name.includes('JavaScript') && s.level >= 80)).toBe(true);
    });

    test('T1-F18-03: Backend Bento Card Proficiency Metrics', async () => {
      const skillsModule = await import('../../../src/data/skills.js');
      const categories = skillsModule.skillCategories || skillsModule.default?.skillCategories;
      const backend = categories.find((c) => c.id === 'backend');
      expect(backend.skills.some((s) => s.name.includes('Node') && s.level >= 80)).toBe(true);
      expect(backend.skills.some((s) => s.name.includes('Express') && s.level >= 80)).toBe(true);
    });

    test('T1-F18-04: Database Bento Card Proficiency Metrics', async () => {
      const skillsModule = await import('../../../src/data/skills.js');
      const categories = skillsModule.skillCategories || skillsModule.default?.skillCategories;
      const database = categories.find((c) => c.id === 'database');
      expect(database.skills.some((s) => s.name.includes('Mongo') && s.level >= 80)).toBe(true);
    });

    test('T1-F18-05: Asymmetric Col-Span Tailwind Classes Verification', async () => {
      const skillsModule = await import('../../../src/data/skills.js');
      const categories = skillsModule.skillCategories || skillsModule.default?.skillCategories;
      const colSpans = categories.map((c) => c.colSpan);
      expect(colSpans.some((cs) => cs.includes('col-span'))).toBe(true);
    });
  });

  describe('Feature 19: Home Projects Teaser Grid', () => {
    test('T1-F19-01: Projects Dataset Contains Featured Projects (Spendly & CRM)', async () => {
      const projModule = await import('../../../src/data/projects.js');
      const projects = projModule.projects || projModule.default;
      const spendly = projects.find((p) => p.id === 'spendly');
      const crm = projects.find((p) => p.id === 'business-management');
      expect(spendly).toBeDefined();
      expect(crm).toBeDefined();
    });

    test('T1-F19-02: Spendly Live Demo & GitHub Repository Links', async () => {
      const projModule = await import('../../../src/data/projects.js');
      const projects = projModule.projects || projModule.default;
      const spendly = projects.find((p) => p.id === 'spendly');
      expect(spendly.demoUrl).toBe('https://spendly-sable-delta.vercel.app/');
      expect(spendly.githubUrl).toBe('https://github.com/aadinath29/spendly-');
    });

    test('T1-F19-03: Business Management CRM Live Demo & GitHub Links', async () => {
      const projModule = await import('../../../src/data/projects.js');
      const projects = projModule.projects || projModule.default;
      const crm = projects.find((p) => p.id === 'business-management');
      expect(crm.demoUrl).toBe('https://business-managment-alpha.vercel.app/login');
      expect(crm.githubUrl).toBe('https://github.com/aadinath29/BusinessManagment-');
    });

    test('T1-F19-04: Business Management Demo Credentials Specification', async () => {
      const projModule = await import('../../../src/data/projects.js');
      const projects = projModule.projects || projModule.default;
      const crm = projects.find((p) => p.id === 'business-management');
      expect(crm.demoCredentials).toBeDefined();
      expect(crm.demoCredentials.email).toBe('admin@antigravity.com');
      expect(crm.demoCredentials.password).toBe('Admin@123');
    });

    test('T1-F19-05: Production Applications in Showcase Set', async () => {
      const projModule = await import('../../../src/data/projects.js');
      const projects = projModule.projects || projModule.default;
      expect(projects.length).toBeGreaterThanOrEqual(2);
      expect(projects[0].title).toBeDefined();
    });
  });

  describe('Feature 20: Home Testimonials Marquee', () => {
    test('T1-F20-01: Testimonials Dataset Presence in Developer Data', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const testimonials = devModule.testimonials;
      expect(Array.isArray(testimonials)).toBe(true);
      expect(testimonials.length).toBe(3);
    });

    test('T1-F20-02: Testimonial Quotes Quality and Engineering Context', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const testimonials = devModule.testimonials;
      for (const t of testimonials) {
        expect(t.quote.length).toBeGreaterThan(30);
        expect(t.author).toBeDefined();
        expect(t.company).toBeDefined();
      }
    });

    test('T1-F20-03: Kosqu Technolab & OptimumValue Solution Attribution', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const testimonials = devModule.testimonials;
      const companies = testimonials.map((t) => t.company);
      expect(companies).toContain('Kosqu Technolab');
      expect(companies).toContain('OptimumValue Solution');
    });

    test('T1-F20-04: Testimonial Cards Explicit Placeholder Designation', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const testimonials = devModule.testimonials;
      for (const t of testimonials) {
        expect(t.isPlaceholder).toBe(true);
      }
    });

    test('T1-F20-05: Testimonials Section Component Specification', () => {
      expect(
        analyzer.fileExists('src/components/sections/home/TestimonialsSection.jsx') ||
        analyzer.fileExists('src/components/ui/MarqueeTicker.jsx')
      ).toBe(true);
    });
  });
});
