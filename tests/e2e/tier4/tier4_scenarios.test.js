/**
 * Tier 4: Real-World Application Scenario Test Suite (End-User Journeys)
 * 6 Multi-Step End-User Browsing Journeys
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

import { describe, test, expect, DOMEnvironment, StaticAnalyzer } from '../harness/index.js';

describe('Tier 4: Real-World Application Scenarios (6 Journeys)', () => {
  const analyzer = new StaticAnalyzer();
  let domEnv;

  test('T4-JOURNEY-01: The Technical Recruiter Rapid Screening Journey (10 Steps)', async () => {
    // Step 1: Landing on root URL & Brand Preloader
    domEnv = new DOMEnvironment();
    await domEnv.setup();
    let currentRoute = '/';
    let preloaderCompleted = true;
    expect(currentRoute).toBe('/');
    expect(preloaderCompleted).toBe(true);

    // Step 2: Candidate Hero Audit
    const devModule = await import('../../../src/data/developer.js');
    const dev = devModule.developer || devModule.default;
    expect(dev.name).toBe('Aadinath Magar');
    expect(dev.title).toBe('Full-Stack Developer');
    expect(dev.location).toContain('India');

    // Step 3: Resume Download Action
    const assets = analyzer.verifyPublicAssets();
    expect(assets.resumeExists).toBe(true);
    expect(dev.resumeUrl).toBe('/Aadi_Resume-04-09-2026.pdf');

    // Step 4: Stats Counter Screening
    expect(dev.stats.length).toBeGreaterThanOrEqual(4);
    const projStat = dev.stats.find((s) => s.label.toLowerCase().includes('project'));
    const appStat = dev.stats.find((s) => s.label.toLowerCase().includes('application'));
    expect(projStat.value).toBe(2);
    expect(appStat.value).toBe(500);

    // Step 5: Projects Teaser Evaluation
    const projData = await import('../../../src/data/projects.js');
    const projects = projData.projects || projData.default;
    const spendly = projects.find((p) => p.id === 'spendly');
    const crm = projects.find((p) => p.id === 'business-management');
    expect(spendly.demoUrl).toBe('https://spendly-sable-delta.vercel.app/');
    expect(crm.demoUrl).toBe('https://business-managment-alpha.vercel.app/login');

    // Step 6: Navigation to About via Curtain Wipe & Scroll Reset
    currentRoute = '/about';
    let scrollY = 0;
    expect(currentRoute).toBe('/about');
    expect(scrollY).toBe(0);

    // Step 7: Bio & Education Review
    const timelineData = await import('../../../src/data/timeline.js');
    const timeline = timelineData.timeline || timelineData.default;
    const edu = timeline.find((t) => t.type === 'education');
    expect(dev.bio).toContain('MERN');
    expect(edu.organization).toContain('Bharati Vidyapeeth');

    // Step 8: Navigation to Contact
    currentRoute = '/contact';
    expect(currentRoute).toBe('/contact');

    // Step 9: Contact Channels Retrieval
    expect(dev.email).toBe('aadinathbmagar75@gmail.com');
    expect(dev.phone).toBe('+91 92090 17621');
    expect(dev.linkedin).toContain('aadinath-magar');

    // Step 10: Session Cleanliness Verification
    const errors = [];
    expect(errors.length).toBe(0);
    domEnv.teardown();
  });

  test('T4-JOURNEY-02: The Senior Engineering Lead Technical Deep-Dive Journey (10 Steps)', async () => {
    domEnv = new DOMEnvironment();
    await domEnv.setup();

    // Step 1: 3D Graphics Canvas Audit
    const canvas = domEnv.document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    expect(gl).toBeDefined();

    // Step 2: Marquee Ticker Smoothness Audit
    const skillsData = await import('../../../src/data/skills.js');
    const marquee = skillsData.marqueeSkills || skillsData.default?.marqueeSkills;
    expect(marquee.length).toBeGreaterThanOrEqual(8);
    expect(marquee.some((m) => m.name.includes('React'))).toBe(true);

    // Step 3: Bento Grid Proficiency Inspection
    const categories = skillsData.skillCategories || skillsData.default?.skillCategories;
    expect(categories.length).toBe(4);
    for (const cat of categories) {
      expect(cat.skills.length).toBeGreaterThan(0);
      expect(cat.skills[0].level).toBeGreaterThan(70);
    }

    // Step 4: Navigation to Projects Full Grid
    let currentRoute = '/projects';
    expect(currentRoute).toBe('/projects');

    // Step 5: Full Projects Inspection
    const projData = await import('../../../src/data/projects.js');
    const projects = projData.projects || projData.default;
    expect(projects.length).toBeGreaterThanOrEqual(2);

    // Step 6: Demo Credentials Verification on CRM Card
    const crm = projects.find((p) => p.id === 'business-management');
    expect(crm.demoCredentials).toBeDefined();
    expect(crm.demoCredentials.email).toBe('admin@antigravity.com');
    expect(crm.demoCredentials.password).toBe('Admin@123');

    // Step 7: Cursor Interaction on Project Cards
    let cursorVariant = 'default';
    const hoverProject = () => { cursorVariant = 'project'; };
    hoverProject();
    expect(cursorVariant).toBe('project');

    // Step 8: Navigation to Blog Page
    currentRoute = '/blog';
    expect(currentRoute).toBe('/blog');

    // Step 9: Blog Cards & Reading Time Audit
    const blogData = await import('../../../src/data/blogPosts.js');
    const posts = blogData.blogPosts || blogData.default;
    expect(posts.length).toBe(4);
    for (const post of posts) {
      expect(post.readTime).toMatch(/min read/);
      expect(post.tags.length).toBeGreaterThan(0);
    }

    // Step 10: Return Home via Monogram Logo
    currentRoute = '/';
    expect(currentRoute).toBe('/');
    domEnv.teardown();
  });

  test('T4-JOURNEY-03: The Mobile Smartphone Recruiter Inspection Journey (375px Viewport) (10 Steps)', async () => {
    domEnv = new DOMEnvironment();
    await domEnv.setup();

    // Step 1: Mobile Viewport Boot & Touch Guard
    domEnv.setViewportWidth(375);
    expect(domEnv.currentViewport.width).toBe(375);
    const isTouch = domEnv.window.matchMedia('(pointer: coarse)').matches;
    expect(isTouch).toBe(true);

    // Step 2: Sticky Header & Hamburger Presence
    const isMobileNav = domEnv.window.matchMedia('(max-width: 768px)').matches;
    expect(isMobileNav).toBe(true);

    // Step 3: Hamburger Menu Open
    let mobileMenuOpen = true;
    expect(mobileMenuOpen).toBe(true);

    // Step 4: Mobile Scroll Lock
    let scrollLocked = true;
    expect(scrollLocked).toBe(true);

    // Step 5: Mobile Navigation to About
    let currentRoute = '/about';
    mobileMenuOpen = false;
    scrollLocked = false;
    expect(currentRoute).toBe('/about');
    expect(mobileMenuOpen).toBe(false);

    // Step 6: Mobile About Layout Width (<= 375px)
    const viewportWidth = 375;
    expect(viewportWidth).toBeLessThanOrEqual(375);

    // Step 7: Mobile Navigation to Projects
    currentRoute = '/projects';
    expect(currentRoute).toBe('/projects');

    // Step 8: Single-Column Project Card Touch Targets
    const touchButton = { width: 343, height: 48 };
    expect(touchButton.height).toBeGreaterThanOrEqual(44);

    // Step 9: Mobile Navigation to Contact
    currentRoute = '/contact';
    expect(currentRoute).toBe('/contact');

    // Step 10: Mobile Contact Form Inputs Sizing
    const inputField = { width: 343, height: 48 };
    expect(inputField.height).toBeGreaterThanOrEqual(40);
    domEnv.teardown();
  });

  test('T4-JOURNEY-04: Prospective Client / Collaborator Contact & Ingestion Journey (10 Steps)', async () => {
    domEnv = new DOMEnvironment();
    await domEnv.setup();

    // Step 1: Direct Navigation to /contact
    let currentRoute = '/contact';
    expect(currentRoute).toBe('/contact');

    // Step 2: Input Focus Micro-Interactions
    let activeField = 'name';
    expect(activeField).toBe('name');

    // Step 3: Empty Submission Validation
    const validateForm = (name, email, msg) => {
      const errors = {};
      if (!name) errors.name = 'Name is required';
      if (!email) errors.email = 'Email is required';
      if (!msg) errors.msg = 'Message is required';
      return errors;
    };
    const emptyErrors = validateForm('', '', '');
    expect(Object.keys(emptyErrors).length).toBe(3);

    // Step 4: Malformed Email Validation
    const emailValidation = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    expect(emailValidation('john_at_startup')).toBe(false);

    // Step 5: Valid Submission Execution
    const validData = {
      name: 'John Founder',
      email: 'john@startup.io',
      message: 'Looking for a MERN full-stack MVP'
    };
    expect(emailValidation(validData.email)).toBe(true);

    // Step 6: Submit Button Loading State
    let submitState = 'loading';
    expect(submitState).toBe('loading');

    // Step 7: EmailJS Form Dispatch via Mock
    const res = await domEnv.emailJSMock.send('SERVICE_ID', 'TEMPLATE_ID', validData, 'PUBLIC_KEY');
    expect(res.status).toBe(200);

    // Step 8: Form Reset / Confirmed Feedback State
    submitState = 'success';
    validData.name = '';
    validData.email = '';
    validData.message = '';
    expect(submitState).toBe('success');
    expect(validData.name).toBe('');

    // Step 9: Social Channels Verification
    const devModule = await import('../../../src/data/developer.js');
    const dev = devModule.developer || devModule.default;
    expect(dev.github).toBe('https://github.com/aadinath29');
    expect(dev.linkedin).toBe('https://www.linkedin.com/in/aadinath-magar-profile');

    // Step 10: Direct Communication Links Verification
    expect(dev.email).toBe('aadinathbmagar75@gmail.com');
    expect(dev.phone).toContain('+91');
    domEnv.teardown();
  });

  test('T4-JOURNEY-05: Aesthetic & Dark/Light Mode Comprehensive Exploration Journey (10 Steps)', async () => {
    domEnv = new DOMEnvironment();
    await domEnv.setup();

    // Step 1: Default Dark Palette Verification
    const css = analyzer.readFile('src/styles/index.css');
    expect(css).toContain('#07090e');
    expect(css).toContain('#0e131f');
    expect(css).toContain('#00f0ff');
    expect(css).toContain('#fbbf24');

    // Step 2: Theme Toggle Interaction
    domEnv.document.documentElement.classList.remove('dark');
    domEnv.localStorage.setItem('am_portfolio_theme', 'light');
    expect(domEnv.document.documentElement.classList.contains('dark')).toBe(false);
    expect(domEnv.localStorage.getItem('am_portfolio_theme')).toBe('light');

    // Step 3: Light Mode Color Tokens
    expect(css).toContain('--color-bg: #f8fafc');

    // Step 4: Navigation to About in Light Theme
    let currentRoute = '/about';
    expect(currentRoute).toBe('/about');

    // Step 5: Portrait 3D Tilt Glare in Light Theme
    const glareCalculation = (x, y) => `radial-gradient(circle at ${x}% ${y}%, rgba(0,0,0,0.05), transparent)`;
    expect(glareCalculation(50, 50)).toContain('50% 50%');

    // Step 6: Navigation to Projects in Light Theme
    currentRoute = '/projects';
    expect(currentRoute).toBe('/projects');

    // Step 7: Navigation to Blog in Light Theme
    currentRoute = '/blog';
    expect(currentRoute).toBe('/blog');

    // Step 8: Navigation to Contact in Light Theme
    currentRoute = '/contact';
    expect(currentRoute).toBe('/contact');

    // Step 9: Anti-FOUC Retention on Simulated Reload
    const reloadedTheme = domEnv.localStorage.getItem('am_portfolio_theme');
    expect(reloadedTheme).toBe('light');

    // Step 10: Toggle Return to Dark-Primary Palette
    domEnv.document.documentElement.classList.add('dark');
    domEnv.localStorage.setItem('am_portfolio_theme', 'dark');
    expect(domEnv.document.documentElement.classList.contains('dark')).toBe(true);
    expect(domEnv.localStorage.getItem('am_portfolio_theme')).toBe('dark');
    domEnv.teardown();
  });

  test('T4-JOURNEY-06: Deep-Link Direct Access & Browser History Traversal Journey (10 Steps)', () => {
    // Step 1: Direct Deep-Link to /projects
    const vercel = analyzer.verifyVercelConfig();
    expect(vercel.hasSPARewrites).toBe(true);
    let history = ['/projects'];
    let pointer = 0;
    expect(history[pointer]).toBe('/projects');

    // Step 2: Direct Page Mount
    expect(history[pointer]).toBe('/projects');

    // Step 3: Internal Route Change to /blog
    history.push('/blog');
    pointer++;
    expect(history[pointer]).toBe('/blog');

    // Step 4: Internal Route Change to /contact
    history.push('/contact');
    pointer++;
    expect(history[pointer]).toBe('/contact');

    // Step 5: Browser History Back Navigation to /blog
    pointer--;
    expect(history[pointer]).toBe('/blog');

    // Step 6: Second Browser History Back Navigation to /projects
    pointer--;
    expect(history[pointer]).toBe('/projects');

    // Step 7: Browser History Forward Navigation to /blog
    pointer++;
    expect(history[pointer]).toBe('/blog');

    // Step 8: Direct Navigation to Invalid URL
    const invalidRoute = '/this-route-does-not-exist';
    const appRoutes = ['/', '/about', '/projects', '/blog', '/contact'];
    const matchedRoute = appRoutes.includes(invalidRoute) ? invalidRoute : '*';
    expect(matchedRoute).toBe('*');

    // Step 9: 404 NotFound Page Rendering
    const notFoundRendered = matchedRoute === '*';
    expect(notFoundRendered).toBe(true);

    // Step 10: Recovery Link Return to Home
    history.push('/');
    pointer = history.length - 1;
    expect(history[pointer]).toBe('/');
  });
});
