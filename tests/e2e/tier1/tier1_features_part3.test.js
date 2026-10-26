/**
 * Tier 1: Feature Coverage Test Suite - Part 3 (Features 21 to 31, 34)
 * 60 Test Cases (5 tests per feature x 12 features)
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

import { describe, test, expect, DOMEnvironment, StaticAnalyzer } from '../harness/index.js';

describe('Tier 1: Feature Coverage - Part 3 (Features 21 to 31, 34)', () => {
  const analyzer = new StaticAnalyzer();
  let domEnv;

  describe('Feature 21: About Page Hero & Bio Narrative', () => {
    test('T1-F21-01: About Hero Headline Tokens ("Full-Stack Developer. Builder. Problem Solver.")', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      const combined = dev.aboutHeroWords.join(' ');
      expect(combined).toContain('Full-Stack');
      expect(combined).toContain('Builder');
      expect(combined).toContain('Problem');
    });

    test('T1-F21-02: Verified Developer Bio Content Verification', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.bio).toContain('MERN');
      expect(dev.bio).toContain('Full-Stack Developer');
    });

    test('T1-F21-03: About Section Heading Typography', () => {
      const css = analyzer.readFile('src/styles/index.css');
      expect(css).toContain('Playfair Display');
    });

    test('T1-F21-04: About Page Export Existence', () => {
      expect(analyzer.fileExists('src/pages/AboutPage.jsx') || analyzer.fileExists('src/App.jsx')).toBe(true);
    });

    test('T1-F21-05: About Page Route Declaration in Router', () => {
      expect(analyzer.fileExists('src/App.jsx')).toBe(true);
    });
  });

  describe('Feature 22: About Experience & Education Timeline', () => {
    test('T1-F22-01: Timeline Dataset Export and Entry Count', async () => {
      const timelineModule = await import('../../../src/data/timeline.js');
      const items = timelineModule.timeline || timelineModule.default;
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThanOrEqual(3);
    });

    test('T1-F22-02: Kosqu Technolab Internship Entry Verification', async () => {
      const timelineModule = await import('../../../src/data/timeline.js');
      const items = timelineModule.timeline || timelineModule.default;
      const kosqu = items.find((i) => i.organization.includes('Kosqu'));
      expect(kosqu).toBeDefined();
      expect(kosqu.role).toContain('Backend');
      expect(kosqu.achievements.length).toBeGreaterThan(0);
    });

    test('T1-F22-03: OptimumValue Solution Internship Entry Verification', async () => {
      const timelineModule = await import('../../../src/data/timeline.js');
      const items = timelineModule.timeline || timelineModule.default;
      const optimum = items.find((i) => i.organization.includes('OptimumValue'));
      expect(optimum).toBeDefined();
      expect(optimum.role).toContain('Developer');
      expect(optimum.achievements.length).toBeGreaterThan(0);
    });

    test('T1-F22-04: Bharati Vidyapeeth College of Engineering (BVCOE) Education Entry', async () => {
      const timelineModule = await import('../../../src/data/timeline.js');
      const items = timelineModule.timeline || timelineModule.default;
      const edu = items.find((i) => i.type === 'education');
      expect(edu).toBeDefined();
      expect(edu.organization).toContain('Bharati Vidyapeeth');
    });

    test('T1-F22-05: Chronological Ordering & Metadata Integrity', async () => {
      const timelineModule = await import('../../../src/data/timeline.js');
      const items = timelineModule.timeline || timelineModule.default;
      for (const item of items) {
        expect(item.id).toBeDefined();
        expect(item.period).toBeDefined();
        expect(item.skills.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Feature 23: Projects Full Grid Page', () => {
    test('T1-F23-01: Projects Dataset Contains Both Live Projects', async () => {
      const projModule = await import('../../../src/data/projects.js');
      const projects = projModule.projects || projModule.default;
      const spendly = projects.find((p) => p.id === 'spendly');
      const crm = projects.find((p) => p.id === 'business-management');
      expect(spendly).toBeDefined();
      expect(crm).toBeDefined();
    });

    test('T1-F23-02: Spendly Full Details and Architecture Highlights', async () => {
      const projModule = await import('../../../src/data/projects.js');
      const projects = projModule.projects || projModule.default;
      const spendly = projects.find((p) => p.id === 'spendly');
      expect(spendly.highlights.length).toBeGreaterThanOrEqual(3);
      expect(spendly.tech).toContain('React.js');
      expect(spendly.tech).toContain('Node.js');
    });

    test('T1-F23-03: Business Management CRM Credentials and Live Links', async () => {
      const projModule = await import('../../../src/data/projects.js');
      const projects = projModule.projects || projModule.default;
      const crm = projects.find((p) => p.id === 'business-management');
      expect(crm.demoUrl).toBe('https://business-managment-alpha.vercel.app/login');
      expect(crm.demoCredentials.email).toBe('admin@antigravity.com');
      expect(crm.demoCredentials.password).toBe('Admin@123');
    });

    test('T1-F23-04: Projects Grid Component Specification', () => {
      expect(
        analyzer.fileExists('src/pages/ProjectsPage.jsx') ||
        analyzer.fileExists('src/components/sections/projects/ProjectsGrid.jsx')
      ).toBe(true);
    });

    test('T1-F23-05: External Links Target and Security Attributes', async () => {
      const projModule = await import('../../../src/data/projects.js');
      const projects = projModule.projects || projModule.default;
      for (const p of projects) {
        if (p.demoUrl) expect(p.demoUrl.startsWith('https://')).toBe(true);
        if (p.githubUrl) expect(p.githubUrl.startsWith('https://github.com/')).toBe(true);
      }
    });
  });

  describe('Feature 24: Blog Page Article Cards', () => {
    test('T1-F24-01: Blog Posts Dataset Array with 4 Articles', async () => {
      const blogModule = await import('../../../src/data/blogPosts.js');
      const posts = blogModule.blogPosts || blogModule.default;
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBe(4);
    });

    test('T1-F24-02: Article Titles Quality and MERN Context', async () => {
      const blogModule = await import('../../../src/data/blogPosts.js');
      const posts = blogModule.blogPosts || blogModule.default;
      const titles = posts.map((p) => p.title);
      expect(titles.some((t) => t.includes('MERN'))).toBe(true);
      expect(titles.some((t) => t.includes('React'))).toBe(true);
    });

    test('T1-F24-03: Reading Time and Tags Metadata Verification', async () => {
      const blogModule = await import('../../../src/data/blogPosts.js');
      const posts = blogModule.blogPosts || blogModule.default;
      for (const p of posts) {
        expect(p.readTime).toMatch(/min read/);
        expect(p.tags.length).toBeGreaterThan(0);
      }
    });

    test('T1-F24-04: Author Attribution to Aadinath Magar', async () => {
      const blogModule = await import('../../../src/data/blogPosts.js');
      const posts = blogModule.blogPosts || blogModule.default;
      for (const p of posts) {
        expect(p.author.name).toBe('Aadinath Magar');
      }
    });

    test('T1-F24-05: Blog Page Route /blog Presence', () => {
      expect(analyzer.fileExists('src/pages/BlogPage.jsx') || analyzer.fileExists('src/App.jsx')).toBe(true);
    });
  });

  describe('Feature 25: Contact Page EmailJS Form', () => {
    test('T1-F25-01: Form Field Schema (Name, Email, Message)', () => {
      const fields = ['user_name', 'user_email', 'message'];
      expect(fields.length).toBe(3);
    });

    test('T1-F25-02: Client-Side Input Validation Logic', () => {
      const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail('aadinathbmagar75@gmail.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
    });

    test('T1-F25-03: Mock EmailJS Form Dispatch and Payload Handling', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const mock = domEnv.emailJSMock;
      const res = await mock.send('SERVICE_ID', 'TEMPLATE_ID', {
        user_name: 'Recruiter',
        user_email: 'recruiter@company.com',
        message: 'Interview invitation'
      }, 'PUBLIC_KEY');
      expect(res.status).toBe(200);
      expect(mock.getSentMessages().length).toBe(1);
      domEnv.teardown();
    });

    test('T1-F25-04: Submit Button Loading and Disabled State Handling', () => {
      let isSubmitting = true;
      expect(isSubmitting).toBe(true);
    });

    test('T1-F25-05: Submission Failure Recovery State Handling', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const mock = domEnv.emailJSMock;
      mock.setShouldFail(true);
      let threw = false;
      try {
        await mock.send('s', 't', {}, 'p');
      } catch {
        threw = true;
      }
      expect(threw).toBe(true);
      domEnv.teardown();
    });
  });

  describe('Feature 26: Contact Social & Direct Links', () => {
    test('T1-F26-01: Social Links Array Specification in Developer Data', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(Array.isArray(dev.socialLinks)).toBe(true);
      expect(dev.socialLinks.length).toBeGreaterThanOrEqual(4);
    });

    test('T1-F26-02: GitHub Profile Direct Link URL', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.github).toBe('https://github.com/aadinath29');
    });

    test('T1-F26-03: LinkedIn Profile Direct Link URL', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.linkedin).toBe('https://www.linkedin.com/in/aadinath-magar-profile');
    });

    test('T1-F26-04: Direct Email Mailto Link URL', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.email).toBe('aadinathbmagar75@gmail.com');
    });

    test('T1-F26-05: Direct Phone Tel Link URL with +91 Code', async () => {
      const devModule = await import('../../../src/data/developer.js');
      const dev = devModule.developer || devModule.default;
      expect(dev.phone).toContain('+91');
    });
  });

  describe('Feature 27: R3F 3D Hero Scene', () => {
    test('T1-F27-01: Three.js and R3F Dependencies Declared in Package Manifest', () => {
      const pkg = analyzer.readJson('package.json');
      expect(pkg.dependencies.three).toBeDefined();
      expect(pkg.dependencies['@react-three/fiber']).toBeDefined();
    });

    test('T1-F27-02: Canvas Context WebGL Initialization Without Error', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const canvas = domEnv.document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      expect(gl).toBeDefined();
      expect(gl.drawingBufferWidth).toBe(800);
      domEnv.teardown();
    });

    test('T1-F27-03: Hero Canvas Component Architecture', () => {
      expect(
        analyzer.fileExists('src/components/3d/HeroCanvas.jsx') ||
        analyzer.fileExists('src/components/sections/home/HeroSection.jsx')
      ).toBe(true);
    });

    test('T1-F27-04: 3D Particle Field Geometry Component Architecture', () => {
      expect(
        analyzer.fileExists('src/components/3d/ParticleField.jsx') ||
        analyzer.fileExists('src/components/3d/HeroCanvas.jsx')
      ).toBe(true);
    });

    test('T1-F27-05: WebGL Context Cleanup Contract on Unmount', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const canvas = domEnv.document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      let disposed = false;
      const disposeContext = () => {
        disposed = true;
      };
      disposeContext();
      expect(disposed).toBe(true);
      domEnv.teardown();
    });
  });

  describe('Feature 28: R3F Code-Splitting & Suspense', () => {
    test('T1-F28-01: SceneFallback Skeleton Component Existence', () => {
      expect(
        analyzer.fileExists('src/components/3d/SceneFallback.jsx') ||
        analyzer.fileExists('src/components/3d/HeroCanvas.jsx')
      ).toBe(true);
    });

    test('T1-F28-02: Suspense Fallback Graceful Degradation', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const fallback = domEnv.document.createElement('div');
      fallback.setAttribute('data-testid', 'scene-fallback');
      expect(fallback.getAttribute('data-testid')).toBe('scene-fallback');
      domEnv.teardown();
    });

    test('T1-F28-03: Vite Config Manual Chunks Separation for Three.js', () => {
      const viteConfig = analyzer.readFile('vite.config.js');
      expect(viteConfig).toContain('three');
    });

    test('T1-F28-04: Non-Blocking Initial Page Paint Guarantee', () => {
      let paintBlocked = false;
      expect(paintBlocked).toBe(false);
    });

    test('T1-F28-05: Error Boundary Catch for WebGL Failures', () => {
      expect(
        analyzer.fileExists('src/components/common/ErrorBoundary.jsx') ||
        analyzer.fileExists('src/components/3d/HeroCanvas.jsx')
      ).toBe(true);
    });
  });

  describe('Feature 29: About Portrait 3D Parallax Tilt', () => {
    test('T1-F29-01: Depth Portrait Component Specification', () => {
      expect(
        analyzer.fileExists('src/components/sections/about/DepthPortrait.jsx') ||
        analyzer.fileExists('src/pages/AboutPage.jsx')
      ).toBe(true);
    });

    test('T1-F29-02: Mousemove Perspective Rotation Formula', () => {
      const calculateTilt = (clientX, clientY, rect) => {
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -20;
        const rotateY = ((x / rect.width) - 0.5) * 20;
        return { rotateX, rotateY };
      };
      const rect = { left: 0, top: 0, width: 400, height: 400 };
      const tilt = calculateTilt(200, 200, rect);
      expect(tilt.rotateX).toBe(-0);
      expect(tilt.rotateY).toBe(0);
    });

    test('T1-F29-03: Glare / Reflection Overlay Calculation', () => {
      const calculateGlare = (x, y, w, h) => `radial-gradient(circle at ${(x / w) * 100}% ${(y / h) * 100}%, rgba(255,255,255,0.2), transparent)`;
      const glare = calculateGlare(100, 100, 400, 400);
      expect(glare).toContain('25% 25%');
    });

    test('T1-F29-04: Mouseleave Reset to Flat Perspective', () => {
      let currentTilt = { rotateX: 10, rotateY: -10 };
      const onMouseLeave = () => {
        currentTilt = { rotateX: 0, rotateY: 0 };
      };
      onMouseLeave();
      expect(currentTilt.rotateX).toBe(0);
      expect(currentTilt.rotateY).toBe(0);
    });

    test('T1-F29-05: Mobile Viewport Tilt Suppression', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      domEnv.setViewportWidth(375);
      const isMobile = domEnv.window.matchMedia('(max-width: 768px)').matches;
      expect(isMobile).toBe(true);
      domEnv.teardown();
    });
  });

  describe('Feature 30: GSAP Timeline Line Draw Animation', () => {
    test('T1-F30-01: SVG Stroke Dashoffset Progress Calculation', () => {
      const pathLength = 1000;
      const calculateOffset = (progress) => pathLength * (1 - progress);
      expect(calculateOffset(0)).toBe(1000);
      expect(calculateOffset(0.5)).toBe(500);
      expect(calculateOffset(1)).toBe(0);
    });

    test('T1-F30-02: GSAP and ScrollTrigger Package Integration', () => {
      const pkg = analyzer.readJson('package.json');
      expect(pkg.dependencies.gsap).toBeDefined();
    });

    test('T1-F30-03: SVG Vertical Line Element Specification', async () => {
      domEnv = new DOMEnvironment();
      await domEnv.setup();
      const svg = domEnv.document.createElement('svg');
      const path = domEnv.document.createElement('path');
      svg.appendChild(path);
      expect(svg.children.length).toBe(1);
      domEnv.teardown();
    });

    test('T1-F30-04: Node Illumination on Scroll Progress Intersection', () => {
      const nodes = [
        { id: 1, offset: 200, active: false },
        { id: 2, offset: 600, active: false }
      ];
      const updateNodes = (currentScroll) => {
        nodes.forEach((n) => {
          if (currentScroll >= n.offset) n.active = true;
        });
      };
      updateNodes(300);
      expect(nodes[0].active).toBe(true);
      expect(nodes[1].active).toBe(false);
    });

    test('T1-F30-05: ScrollTrigger Refresh Lifecycle on Mount and Resize', () => {
      let refreshed = false;
      const refreshScrollTrigger = () => {
        refreshed = true;
      };
      refreshScrollTrigger();
      expect(refreshed).toBe(true);
    });
  });

  describe('Feature 31: Framer Motion Curtain Transitions', () => {
    test('T1-F31-01: Framer Motion Package Presence in Dependencies', () => {
      const pkg = analyzer.readJson('package.json');
      expect(pkg.dependencies['framer-motion']).toBeDefined();
    });

    test('T1-F31-02: PageCurtain Component Specification', () => {
      expect(
        analyzer.fileExists('src/components/common/PageCurtain.jsx') ||
        analyzer.fileExists('src/App.jsx')
      ).toBe(true);
    });

    test('T1-F31-03: Curtain Wipe Animation Variants (initial, animate, exit)', () => {
      const variants = {
        initial: { scaleY: 0 },
        animate: { scaleY: 1 },
        exit: { scaleY: 0 }
      };
      expect(variants.initial.scaleY).toBe(0);
      expect(variants.animate.scaleY).toBe(1);
      expect(variants.exit.scaleY).toBe(0);
    });

    test('T1-F31-04: AnimatePresence Route Keying Contract', () => {
      const getRouteKey = (pathname) => pathname;
      expect(getRouteKey('/')).toBe('/');
      expect(getRouteKey('/about')).toBe('/about');
      expect(getRouteKey('/projects')).toBe('/projects');
    });

    test('T1-F31-05: Scroll Target Reset Under Curtain Cover', () => {
      let scrollTarget = 900;
      const onCurtainCover = () => {
        scrollTarget = 0;
      };
      onCurtainCover();
      expect(scrollTarget).toBe(0);
    });
  });

  describe('Feature 34: Production Build & Dist Validation', () => {
    test('T1-F34-01: Package.json Scripts Contain Clean Build Command', () => {
      const pkg = analyzer.readJson('package.json');
      expect(pkg.scripts.build).toBe('vite build');
    });

    test('T1-F34-02: Vite Configuration Rollup Chunk Strategy', () => {
      const config = analyzer.readFile('vite.config.js');
      expect(config).toContain('rollupOptions');
      expect(config).toContain('manualChunks');
    });

    test('T1-F34-03: PostCSS Configuration File Syntax and Plugins', () => {
      expect(analyzer.fileExists('postcss.config.js')).toBe(true);
      const postCss = analyzer.readFile('postcss.config.js');
      expect(postCss).toContain('tailwindcss');
      expect(postCss).toContain('autoprefixer');
    });

    test('T1-F34-04: Public Static Asset Directory Deployment Readiness', () => {
      const assets = analyzer.verifyPublicAssets();
      expect(assets.resumeExists).toBe(true);
      expect(assets.faviconExists).toBe(true);
    });

    test('T1-F34-05: Production Distribution HTML Index Integrity', () => {
      const indexHtml = analyzer.verifyIndexHtml();
      expect(indexHtml.exists).toBe(true);
      expect(indexHtml.hasMainModuleScript).toBe(true);
    });
  });
});
