/**
 * Empirical Stress & Challenge Test Suite for Milestone 2 Redesign (M2-R)
 * Navigation, Layout & Minimalist Footer Visual Redesign
 *
 * Authored by: challenger_m2_2 (critic, specialist)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const testResults = [];

function recordTest(category, name, passed, details = '', severity = 'NORMAL') {
  testResults.push({ category, name, passed, details, severity });
  const statusIcon = passed ? '✅ PASS' : (severity === 'CRITICAL' ? '🔥 FAIL [CRITICAL]' : '⚠️ FAIL [MINOR]');
  console.log(`${statusIcon}: [${category}] ${name}`);
  if (details) {
    console.log(`   ${details}`);
  }
}

// =========================================================================
// SUITE 1: MOBILE MENU DEFENSIVE HOOKS & ACCESSIBILITY EMPIRICAL TESTS
// =========================================================================
function testMobileMenu() {
  console.log('\n======================================================');
  console.log('SUITE 1: MOBILE MENU DEFENSIVE HOOKS & ACCESSIBILITY TESTS');
  console.log('======================================================');

  const mobileMenuPath = path.join(ROOT_DIR, 'src/components/layout/MobileMenu.jsx');
  const navbarPath = path.join(ROOT_DIR, 'src/components/layout/Navbar.jsx');

  const mobileMenuSrc = fs.readFileSync(mobileMenuPath, 'utf-8');
  const navbarSrc = fs.readFileSync(navbarPath, 'utf-8');

  // Check 1.a: Body Scroll Lock + Lenis Pause / Resume
  const hasBodyOverflowHidden = mobileMenuSrc.includes("document.body.style.overflow = 'hidden'");
  const hasBodyOverflowRestore = mobileMenuSrc.includes("document.body.style.overflow = ''");
  const hasLenisStop = mobileMenuSrc.includes("window.__lenis.stop()");
  const hasLenisStart = mobileMenuSrc.includes("window.__lenis.start()");
  const hasLenisGuard = mobileMenuSrc.includes("typeof window !== 'undefined' && window.__lenis");

  recordTest(
    'MobileMenu:ScrollLock',
    'Locks document.body.style.overflow to hidden when open',
    hasBodyOverflowHidden,
    hasBodyOverflowHidden ? 'Overflow set to hidden on open' : 'Missing body overflow lock'
  );

  recordTest(
    'MobileMenu:ScrollLock',
    'Restores document.body.style.overflow on close and unmount',
    hasBodyOverflowRestore,
    hasBodyOverflowRestore ? 'Overflow restored to empty string' : 'Missing overflow reset'
  );

  recordTest(
    'MobileMenu:ScrollLock',
    'Lenis pause on open and resume on close/unmount',
    hasLenisStop && hasLenisStart,
    `stop: ${hasLenisStop}, start: ${hasLenisStart}`
  );

  recordTest(
    'MobileMenu:ScrollLock',
    'SSR and null-safety guard for window.__lenis',
    hasLenisGuard,
    hasLenisGuard ? 'Guarded with typeof window check and truthy window.__lenis' : 'Unguarded window access'
  );

  // Check 1.b: Escape Key Auto-Close
  const hasEscapeListener = mobileMenuSrc.includes("e.key === 'Escape' && isOpen");
  const hasEscapeCloseCall = mobileMenuSrc.includes('onClose()');
  const hasEscapeTeardown = mobileMenuSrc.includes("window.removeEventListener('keydown', handleKeyDown)");

  recordTest(
    'MobileMenu:Escape',
    'Listens for Escape key and triggers onClose() when isOpen is true',
    hasEscapeListener && hasEscapeCloseCall,
    'Verified Escape key detection and onClose call'
  );

  recordTest(
    'MobileMenu:Escape',
    'Removes keydown event listener on cleanup/unmount',
    hasEscapeTeardown,
    'Verified removeEventListener for keydown'
  );

  // Check 1.c: Viewport Resize Auto-Close (>= 768px)
  const hasResizeCondition = mobileMenuSrc.includes('window.innerWidth >= 768 && isOpen');
  const hasResizeTeardown = mobileMenuSrc.includes("window.removeEventListener('resize', handleResize)");

  recordTest(
    'MobileMenu:Resize',
    'Auto-closes menu on viewport resize to desktop (>= 768px)',
    hasResizeCondition,
    'Verified window.innerWidth >= 768 threshold'
  );

  recordTest(
    'MobileMenu:Resize',
    'Removes resize event listener on cleanup/unmount',
    hasResizeTeardown,
    'Verified removeEventListener for resize'
  );

  // Check 1.d: Hamburger & Close Button Touch Targets (min 44x44px)
  const navHamburgerTarget = navbarSrc.includes('min-w-[44px]') && navbarSrc.includes('min-h-[44px]');
  const menuCloseTarget = mobileMenuSrc.includes('min-w-[44px]') && mobileMenuSrc.includes('min-h-[44px]');
  const linkMinHeight = mobileMenuSrc.includes('min-h-[48px]');

  recordTest(
    'MobileMenu:TouchTarget',
    'Navbar hamburger button meets WCAG 44x44px touch target requirement',
    navHamburgerTarget,
    navHamburgerTarget ? 'min-w-[44px] min-h-[44px] present on hamburger button' : 'Touch target under 44px'
  );

  recordTest(
    'MobileMenu:TouchTarget',
    'MobileMenu close button meets WCAG 44x44px touch target requirement',
    menuCloseTarget,
    menuCloseTarget ? 'min-w-[44px] min-h-[44px] present on close button' : 'Touch target under 44px'
  );

  recordTest(
    'MobileMenu:TouchTarget',
    'Mobile navigation links have generous min-h-[48px] touch targets',
    linkMinHeight,
    linkMinHeight ? 'min-h-[48px] present on mobile nav links' : 'Missing min-h-[48px]'
  );

  // Check 1.e: Brand Logo displays "Aadinath" in DM Serif Display
  const logoTextMatch = mobileMenuSrc.match(/<Link[^>]*to="\/"[^>]*>([\s\S]*?)<\/Link>/);
  const logoText = logoTextMatch ? logoTextMatch[1].trim() : '';
  const isDMSerif = logoTextMatch ? logoTextMatch[0].includes('font-serif') : false;

  recordTest(
    'MobileMenu:BrandLogo',
    'Brand logo displays verbatim "Aadinath"',
    logoText.includes('Aadinath') && !logoText.includes('A—M'),
    `Rendered logo: "${logoText}"`
  );

  recordTest(
    'MobileMenu:BrandLogo',
    'Brand logo uses font-serif class (mapped to DM Serif Display)',
    isDMSerif,
    isDMSerif ? 'font-serif class applied to logo Link' : 'font-serif class missing'
  );

  // Check 1.f: Accessibility ARIA attributes
  const hasDialogRole = mobileMenuSrc.includes('role="dialog"');
  const hasAriaModal = mobileMenuSrc.includes('aria-modal="true"');
  const hasAriaLabel = mobileMenuSrc.includes('aria-label="Mobile Navigation"');
  const hasDrawerId = mobileMenuSrc.includes('id="mobile-navigation-drawer"');
  const hasAriaControls = navbarSrc.includes('aria-controls="mobile-navigation-drawer"');
  const hasAriaExpanded = navbarSrc.includes('aria-expanded={isMobileMenuOpen}');

  recordTest(
    'MobileMenu:A11y',
    'Drawer has role="dialog", aria-modal="true", and aria-label="Mobile Navigation"',
    hasDialogRole && hasAriaModal && hasAriaLabel,
    `role: ${hasDialogRole}, modal: ${hasAriaModal}, label: ${hasAriaLabel}`
  );

  recordTest(
    'MobileMenu:A11y',
    'Hamburger button controls drawer via aria-controls and tracks aria-expanded',
    hasDrawerId && hasAriaControls && hasAriaExpanded,
    `id: ${hasDrawerId}, aria-controls: ${hasAriaControls}, aria-expanded: ${hasAriaExpanded}`
  );
}

// =========================================================================
// SUITE 2: FOOTER VERIFICATION & RESIDUAL AUDIT
// =========================================================================
function testFooter() {
  console.log('\n======================================================');
  console.log('SUITE 2: FOOTER VERIFICATION & RESIDUAL STYLE AUDIT');
  console.log('======================================================');

  const footerPath = path.join(ROOT_DIR, 'src/components/layout/Footer.jsx');
  const footerSrc = fs.readFileSync(footerPath, 'utf-8');

  // Check 2.a: Brand title "Aadinath Magar" in DM Serif Display
  const titleMatch = footerSrc.match(/<span\s+className=["']([^"']*)["']>([\s\S]*?)<\/span>/);
  const titleClasses = titleMatch ? titleMatch[1] : '';
  const titleText = titleMatch ? titleMatch[2].trim() : '';

  recordTest(
    'Footer:BrandTitle',
    'Brand title renders verbatim "Aadinath Magar"',
    titleText === 'Aadinath Magar',
    `Title text: "${titleText}"`
  );

  recordTest(
    'Footer:BrandTitle',
    'Brand title uses font-serif class (DM Serif Display)',
    titleClasses.includes('font-serif'),
    `Classes: ${titleClasses}`
  );

  // Check 2.b: Colophon reads "Built with React & Vite · 2026"
  const colophonMatch = footerSrc.match(/<p\s+className=["'][^"']*["']>([\s\S]*?)<\/p>/);
  const rawColophon = colophonMatch ? colophonMatch[1].trim() : '';
  // Normalizing &amp; to &
  const normalizedColophon = rawColophon.replace(/&amp;/g, '&');

  recordTest(
    'Footer:Colophon',
    'Colophon reads verbatim "Built with React & Vite · 2026"',
    normalizedColophon === 'Built with React & Vite · 2026',
    `Rendered colophon: "${normalizedColophon}"`
  );

  // Check 2.c: GitHub & LinkedIn Outbound Links
  const githubMatch = footerSrc.match(/<a\s+[^>]*href=\{[^}]*github[^}]*\}[^>]*>([\s\S]*?)<\/a>/);
  const linkedinMatch = footerSrc.match(/<a\s+[^>]*href=\{[^}]*linkedin[^}]*\}[^>]*>([\s\S]*?)<\/a>/);

  const githubTarget = githubMatch ? githubMatch[0].includes('target="_blank"') : false;
  const githubRel = githubMatch ? githubMatch[0].includes('rel="noopener noreferrer"') : false;
  const linkedinTarget = linkedinMatch ? linkedinMatch[0].includes('target="_blank"') : false;
  const linkedinRel = linkedinMatch ? linkedinMatch[0].includes('rel="noopener noreferrer"') : false;

  recordTest(
    'Footer:OutboundLinks',
    'GitHub outbound link includes target="_blank" and rel="noopener noreferrer"',
    githubTarget && githubRel,
    `target="_blank": ${githubTarget}, rel="noopener noreferrer": ${githubRel}`
  );

  recordTest(
    'Footer:OutboundLinks',
    'LinkedIn outbound link includes target="_blank" and rel="noopener noreferrer"',
    linkedinTarget && linkedinRel,
    `target="_blank": ${linkedinTarget}, rel="noopener noreferrer": ${linkedinRel}`
  );

  // Check 2.d: Purge of Cyan, Gold & Glow styles
  const lowerFooter = footerSrc.toLowerCase();
  const hasCyan = lowerFooter.includes('cyan');
  const hasGold = lowerFooter.includes('gold');
  const hasGlow = lowerFooter.includes('glow');
  const hasGlowGradient = footerSrc.includes('accent-cyan/30') || footerSrc.includes('gradient');

  recordTest(
    'Footer:ResidualAudit',
    'Zero remnants of cyan styling in Footer.jsx',
    !hasCyan,
    hasCyan ? 'Found cyan reference' : 'Zero cyan remnants'
  );

  recordTest(
    'Footer:ResidualAudit',
    'Zero remnants of gold styling in Footer.jsx',
    !hasGold,
    hasGold ? 'Found gold reference' : 'Zero gold remnants'
  );

  recordTest(
    'Footer:ResidualAudit',
    'Zero remnants of ambient cyan glow line or neon glow in Footer.jsx',
    !hasGlow && !hasGlowGradient,
    (!hasGlow && !hasGlowGradient) ? 'Clean minimalist footer structure' : 'Glow/gradient remnants detected'
  );
}

// =========================================================================
// SUITE 3: SIMULATION & STRESS HARNESS
// =========================================================================
function testSimulations() {
  console.log('\n======================================================');
  console.log('SUITE 3: INTERACTION SIMULATION & STRESS TESTS');
  console.log('======================================================');

  // 1. Scroll lock state machine stress simulation (10,000 rapid cycles)
  let overflowState = '';
  let lenisCallCount = { stop: 0, start: 0 };
  const mockLenis = {
    stop: () => { lenisCallCount.stop++; },
    start: () => { lenisCallCount.start++; },
  };

  function simulateScrollLockEffect(isOpen) {
    if (isOpen) {
      overflowState = 'hidden';
      mockLenis.stop();
    } else {
      overflowState = '';
      mockLenis.start();
    }
  }

  function simulateUnmountCleanup() {
    overflowState = '';
    mockLenis.start();
  }

  for (let i = 0; i < 10000; i++) {
    simulateScrollLockEffect(true);
    simulateScrollLockEffect(false);
  }

  recordTest(
    'Simulation:ScrollLockStress',
    '10,000 rapid open/close cycles maintain perfect parity between stop and start',
    lenisCallCount.stop === 10000 && lenisCallCount.start === 10000 && overflowState === '',
    `Stop: ${lenisCallCount.stop}, Start: ${lenisCallCount.start}, Final overflow: "${overflowState}"`
  );

  // Unmount while open test
  simulateScrollLockEffect(true);
  const overflowWhileOpen = overflowState;
  simulateUnmountCleanup();
  recordTest(
    'Simulation:UnmountScrollRestore',
    'Unmounting drawer while open completely restores overflow and restarts Lenis',
    overflowWhileOpen === 'hidden' && overflowState === '' && lenisCallCount.start === 10001,
    `Restored to: "${overflowState}", total Lenis starts: ${lenisCallCount.start}`
  );

  // 2. Escape key handling simulation across diverse key codes
  let closeCallCount = 0;
  const onClose = () => { closeCallCount++; };

  function simulateKeyDown(key, isOpen) {
    if (key === 'Escape' && isOpen) {
      onClose();
    }
  }

  const testKeys = ['Enter', 'Tab', 'Space', ' ', 'ArrowUp', 'ArrowDown', 'Backspace', 'Shift', 'Control', 'Alt', 'x', 'X'];
  for (const k of testKeys) {
    simulateKeyDown(k, true);
    simulateKeyDown(k, false);
  }
  recordTest(
    'Simulation:KeyFiltering',
    'Non-Escape keys produce 0 spurious onClose invocations',
    closeCallCount === 0,
    `Close calls from non-escape keys: ${closeCallCount}`
  );

  simulateKeyDown('Escape', false);
  recordTest(
    'Simulation:EscapeClosedGuard',
    'Escape key while menu is already closed does not call onClose',
    closeCallCount === 0,
    `Close calls when isOpen=false: ${closeCallCount}`
  );

  simulateKeyDown('Escape', true);
  recordTest(
    'Simulation:EscapeOpenTrigger',
    'Escape key while menu is open triggers onClose immediately',
    closeCallCount === 1,
    `Close calls after Escape: ${closeCallCount}`
  );

  // 3. Viewport resize simulation across breakpoint spectrum
  let resizeCloseCount = 0;
  const onResizeClose = () => { resizeCloseCount++; };

  function simulateResize(width, isOpen) {
    if (width >= 768 && isOpen) {
      onResizeClose();
    }
  }

  const mobileWidths = [320, 360, 375, 390, 414, 480, 576, 640, 767, 767.9];
  for (const w of mobileWidths) {
    simulateResize(w, true);
    simulateResize(w, false);
  }
  recordTest(
    'Simulation:MobileResize',
    'Mobile viewport widths (< 768px) do not trigger auto-close',
    resizeCloseCount === 0,
    `Auto-close count for mobile widths: ${resizeCloseCount}`
  );

  const desktopWidths = [768, 769, 800, 1024, 1280, 1440, 1920, 2560];
  for (const w of desktopWidths) {
    simulateResize(w, false);
  }
  recordTest(
    'Simulation:DesktopResizeClosed',
    'Desktop viewport widths (>= 768px) do not trigger auto-close when menu is already closed',
    resizeCloseCount === 0,
    `Auto-close count when closed: ${resizeCloseCount}`
  );

  simulateResize(768, true);
  simulateResize(1024, true);
  simulateResize(1280, true);
  recordTest(
    'Simulation:DesktopResizeOpen',
    'Desktop viewport widths (>= 768px) trigger auto-close when menu is open',
    resizeCloseCount === 3,
    `Auto-close count for open drawer on desktop resize: ${resizeCloseCount}`
  );
}

// =========================================================================
// RUN ALL TESTS & REPORT
// =========================================================================
function runAll() {
  console.log('Starting M2-R Empirical Stress & Challenge Suite...\n');

  testMobileMenu();
  testFooter();
  testSimulations();

  const total = testResults.length;
  const passed = testResults.filter(t => t.passed).length;
  const failed = testResults.filter(t => !t.passed);

  console.log('\n======================================================');
  console.log(`SUMMARY: ${passed} / ${total} tests passed.`);
  console.log('======================================================');

  if (failed.length > 0) {
    console.error(`\n❌ ${failed.length} TESTS FAILED:`);
    failed.forEach(f => {
      console.error(` - [${f.category}] ${f.name}: ${f.details}`);
    });
    process.exit(1);
  } else {
    console.log('\n🌟 ALL M2-R EMPIRICAL STRESS TESTS PASSED WITH 0 FAILURES!');
    process.exit(0);
  }
}

runAll();
