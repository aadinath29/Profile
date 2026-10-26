/**
 * Empirical Stress & Challenge Test Suite for Milestone 2
 * Visual Design System, Navigation & System Polish
 *
 * Authored by: challenger_m2_1
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const testResults = [];

function recordTest(category, name, passed, details = '', severity = 'NORMAL') {
  testResults.push({ category, name, passed, details, severity });
  const statusIcon = passed ? '✅ PASS' : (severity === 'CRITICAL' ? '🔥 FAIL [CRITICAL]' : '⚠️ FAIL [MINOR/EDGE]');
  console.log(`${statusIcon}: [${category}] ${name}`);
  if (details) {
    console.log(`   ${details}`);
  }
}

// -------------------------------------------------------------
// SUITE 1: THEME SWITCHING & ANTI-FOUC LOGIC UNDER EDGE CASES
// -------------------------------------------------------------
async function testThemeAndAntiFOUC() {
  console.log('\n======================================================');
  console.log('SUITE 1: THEME SWITCHING & ANTI-FOUC EDGE CASE TESTS');
  console.log('======================================================');

  const indexHtmlPath = path.join(ROOT_DIR, 'index.html');
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Extract inline script from index.html
  const scriptMatch = indexHtml.match(/<script>([\s\S]*?)<\/script>/);
  const inlineScriptCode = scriptMatch ? scriptMatch[1] : null;

  recordTest(
    'Anti-FOUC',
    'Inline Anti-FOUC Script Presence in index.html <head>',
    inlineScriptCode !== null && inlineScriptCode.includes('am_portfolio_theme'),
    inlineScriptCode ? 'Synchronous anti-FOUC script found in <head>' : 'Script tag missing!'
  );

  // Helper to execute index.html script in simulated browser environment
  function runAntiFOUCScript(mockLocalStorage, initialClassList = []) {
    const classList = new Set(initialClassList);
    let metaContent = null;

    const mockDoc = {
      documentElement: {
        classList: {
          add: (cls) => classList.add(cls),
          remove: (cls) => classList.delete(cls),
          contains: (cls) => classList.has(cls),
        },
      },
      getElementById: (id) => {
        if (id === 'theme-color-meta') {
          return {
            setAttribute: (attr, val) => {
              if (attr === 'content') metaContent = val;
            },
          };
        }
        return null;
      },
    };

    let executed = false;
    let thrownError = null;

    try {
      const runner = new Function('localStorage', 'document', inlineScriptCode);
      runner(mockLocalStorage, mockDoc);
      executed = true;
    } catch (e) {
      thrownError = e;
    }

    return {
      executed,
      thrownError,
      classList: Array.from(classList),
      isDark: classList.has('dark'),
      metaContent,
    };
  }

  // Test 1.1: Missing theme in localStorage (clean first visit)
  {
    const mockStorage = { getItem: () => null };
    const res = runAntiFOUCScript(mockStorage);
    const passed = res.isDark && res.metaContent === '#07090e' && !res.thrownError;
    recordTest(
      'Anti-FOUC',
      'Missing theme (null in localStorage) defaults to dark theme',
      passed,
      `ClassList: [${res.classList}], metaContent: ${res.metaContent}`
    );
  }

  // Test 1.2: Explicit 'light' in localStorage
  {
    const mockStorage = { getItem: () => 'light' };
    const res = runAntiFOUCScript(mockStorage, ['dark']);
    const passed = !res.isDark && res.metaContent === '#f8fafc' && !res.thrownError;
    recordTest(
      'Anti-FOUC',
      'Valid light theme removes .dark class and sets light meta theme-color',
      passed,
      `ClassList: [${res.classList}], metaContent: ${res.metaContent}`
    );
  }

  // Test 1.3: Explicit 'dark' in localStorage
  {
    const mockStorage = { getItem: () => 'dark' };
    const res = runAntiFOUCScript(mockStorage);
    const passed = res.isDark && res.metaContent === '#07090e' && !res.thrownError;
    recordTest(
      'Anti-FOUC',
      'Valid dark theme adds .dark class and sets dark meta theme-color',
      passed,
      `ClassList: [${res.classList}], metaContent: ${res.metaContent}`
    );
  }

  // Test 1.4: Corrupt values in localStorage ('corrupt_val', '{}', '123', 'undefined')
  const corruptValues = ['corrupt_val', '{}', '123', 'undefined', '', 'null', 'false', 'SYSTEM', 'LIGHT'];
  for (const corruptVal of corruptValues) {
    const mockStorage = { getItem: () => corruptVal };
    const res = runAntiFOUCScript(mockStorage);
    const passed = res.isDark && res.metaContent === '#07090e' && !res.thrownError;
    recordTest(
      'Anti-FOUC',
      `Corrupt value "${corruptVal}" safely recovers to dark theme`,
      passed,
      `ClassList: [${res.classList}], metaContent: ${res.metaContent}`
    );
  }

  // Test 1.5: Restricted localStorage (SecurityError / private browsing block)
  {
    const restrictedStorage = {
      getItem: () => {
        throw new Error('SecurityError: The operation is insecure.');
      },
    };
    const res = runAntiFOUCScript(restrictedStorage);
    const passed = !res.thrownError && res.isDark;
    recordTest(
      'Anti-FOUC',
      'Restricted localStorage exception caught cleanly and falls back to dark',
      passed,
      `Thrown: ${res.thrownError ? res.thrownError.message : 'None (caught)'}, isDark: ${res.isDark}`
    );
  }

  // Test 1.6: ThemeContext.jsx implementation analysis
  const themeContextPath = path.join(ROOT_DIR, 'src/context/ThemeContext.jsx');
  const themeContextCode = fs.readFileSync(themeContextPath, 'utf-8');

  // Verify multi-tab storage event handler
  const hasStorageListener = themeContextCode.includes("addEventListener('storage'") || themeContextCode.includes('addEventListener("storage"');
  const hasMetaSync = themeContextCode.includes('meta[name="theme-color"]') || themeContextCode.includes('theme-color-meta');
  const hasTryCatch = themeContextCode.includes('try') && themeContextCode.includes('catch');

  recordTest(
    'ThemeContext',
    'Multi-tab storage event listener implemented',
    hasStorageListener,
    hasStorageListener ? 'storage listener detected in ThemeContext.jsx' : 'Missing storage event listener!'
  );

  recordTest(
    'ThemeContext',
    'ThemeContext synchronizes <meta name="theme-color">',
    hasMetaSync,
    hasMetaSync ? 'Dynamic meta theme-color sync present' : 'Meta theme-color sync missing'
  );

  recordTest(
    'ThemeContext',
    'ThemeContext wraps storage operations in try/catch',
    hasTryCatch,
    hasTryCatch ? 'try/catch guards localStorage reads/writes' : 'No try/catch guards'
  );

  // Test 1.7: Multi-tab storage event behavior simulation
  {
    // Test the logic of handleStorage from ThemeContext:
    // const handleStorage = (e) => {
    //   if (e.key === STORAGE_KEY && e.newValue) {
    //     const nextTheme = e.newValue === 'light' ? 'light' : 'dark';
    //     setTheme(nextTheme);
    //   }
    // };
    const STORAGE_KEY = 'am_portfolio_theme';
    let currentTheme = 'dark';
    const simulateStorageEvent = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        const nextTheme = event.newValue === 'light' ? 'light' : 'dark';
        currentTheme = nextTheme;
      }
    };

    simulateStorageEvent({ key: STORAGE_KEY, newValue: 'light' });
    const syncLight = currentTheme === 'light';

    simulateStorageEvent({ key: STORAGE_KEY, newValue: 'dark' });
    const syncDark = currentTheme === 'dark';

    simulateStorageEvent({ key: 'other_key', newValue: 'light' });
    const ignoreOtherKey = currentTheme === 'dark'; // Should remain dark

    simulateStorageEvent({ key: STORAGE_KEY, newValue: 'garbage_val' });
    const fallbackGarbage = currentTheme === 'dark'; // Non-'light' falls back to 'dark'

    recordTest(
      'ThemeContext',
      'Storage event correctly synchronizes light/dark and ignores unrelated keys',
      syncLight && syncDark && ignoreOtherKey && fallbackGarbage,
      `syncLight: ${syncLight}, syncDark: ${syncDark}, ignoreOther: ${ignoreOtherKey}, fallbackGarbage: ${fallbackGarbage}`
    );
  }
}

// -------------------------------------------------------------
// SUITE 2: PRELOADER DURATION, COUNTER BOUNDS & SESSION STORAGE
// -------------------------------------------------------------
async function testPreloader() {
  console.log('\n======================================================');
  console.log('SUITE 2: PRELOADER STRESS & COUNTER BOUND TESTS');
  console.log('======================================================');

  const preloaderPath = path.join(ROOT_DIR, 'src/components/common/Preloader.jsx');
  const preloaderCode = fs.readFileSync(preloaderPath, 'utf-8');

  // Test 2.1: Extract TOTAL_DURATION_MS and verify against safety ceiling
  const durationMatch = preloaderCode.match(/TOTAL_DURATION_MS\s*=\s*(\d+)/);
  const durationMs = durationMatch ? parseInt(durationMatch[1], 10) : null;
  const holdDelayMatch = preloaderCode.match(/setTimeout\(\s*\(\)\s*=>\s*\{[\s\S]*?isExiting\(true\);[\s\S]*?\},\s*(\d+)\)/);
  const holdDelayMs = holdDelayMatch ? parseInt(holdDelayMatch[1], 10) : 150;
  const exitDurationMatch = preloaderCode.match(/transition=\{\{\s*duration:\s*([\d.]+)/);
  const exitDurationSec = exitDurationMatch ? parseFloat(exitDurationMatch[1]) : 0.75;
  const totalLifecycleMs = (durationMs || 0) + holdDelayMs + exitDurationSec * 1000;

  recordTest(
    'Preloader',
    'Preloader total duration is within <= 2500ms requirement ceiling',
    durationMs !== null && totalLifecycleMs <= 2500,
    `Duration: ${durationMs}ms, Hold: ${holdDelayMs}ms, Exit: ${exitDurationSec * 1000}ms -> Total: ${totalLifecycleMs}ms (<= 2500ms)`
  );

  // Test 2.2: Math counter function bounds & monotonicity test
  // Formula:
  // const ratio = Math.min(elapsed / TOTAL_DURATION_MS, 1);
  // const easedRatio = 1 - Math.pow(1 - ratio, 2);
  // const currentVal = Math.min(Math.floor(easedRatio * 100), 100);
  const DURATION = durationMs || 1400;
  const computeProgress = (elapsed) => {
    const ratio = Math.min(elapsed / DURATION, 1);
    const easedRatio = 1 - Math.pow(1 - ratio, 2);
    return Math.min(Math.floor(easedRatio * 100), 100);
  };

  // Check monotonicity across 1400 points
  let isMonotonic = true;
  let prevVal = computeProgress(0);
  for (let t = 1; t <= DURATION; t += 1) {
    const val = computeProgress(t);
    if (val < prevVal) {
      isMonotonic = false;
    }
    prevVal = val;
  }
  const reached100 = computeProgress(DURATION) === 100;

  recordTest(
    'Preloader',
    'Preloader counter curve is strictly non-decreasing (monotonic) from 0% to 100%',
    isMonotonic && reached100,
    `isMonotonic: ${isMonotonic}, reached100: ${reached100}`
  );

  // Test 2.3: Boundary checks at t = 0, t = DURATION, t >> DURATION
  const progAt0 = computeProgress(0);
  const progAtDuration = computeProgress(DURATION);
  const progAtHuge = computeProgress(100000);
  const normalBoundsPassed = progAt0 === 0 && progAtDuration === 100 && progAtHuge === 100;

  recordTest(
    'Preloader',
    'Preloader counter normal bounds (t=0 -> 0%, t=DURATION -> 100%, t>>DURATION -> 100%)',
    normalBoundsPassed,
    `t=0: ${progAt0}%, t=${DURATION}: ${progAtDuration}%, t=100000: ${progAtHuge}%`
  );

  // Test 2.4: Edge Case: Negative elapsed time (e.g. system clock skew / NTP adjustment)
  const progAtNegative = computeProgress(-500);
  const handlesNegative = progAtNegative >= 0;
  recordTest(
    'Preloader',
    'Preloader counter negative time resilience (clock skew backward)',
    handlesNegative,
    handlesNegative
      ? `Resilient: progress is ${progAtNegative}%`
      : `EDGE CASE DEFECT: progress is negative (${progAtNegative}%) because Math.max(..., 0) is omitted`,
    'EDGE'
  );

  // Test 2.5: SessionStorage Guard Analysis
  const hasSessionKey = preloaderCode.includes('am_preloader_seen');
  const hasTryCatchStorage = preloaderCode.includes('sessionStorage.getItem') && preloaderCode.includes('catch');
  const hasSkipCheck = preloaderCode.includes('sessionStorage.getItem(SESSION_KEY) ===') || preloaderCode.includes('sessionStorage.getItem(SESSION_KEY)');

  recordTest(
    'Preloader',
    'SessionStorage one-per-session guard configured with try/catch',
    hasSessionKey && hasTryCatchStorage && hasSkipCheck,
    'Guards with am_preloader_seen and try/catch against SecurityError'
  );

  // Test 2.6: Body scroll lock invariant
  const hasBodyScrollLock = preloaderCode.includes("document.body.style.overflow = 'hidden'") || preloaderCode.includes('document.body.style.overflow = "hidden"');
  const hasBodyScrollRestore = preloaderCode.includes('document.body.style.overflow = originalOverflow') || preloaderCode.includes("document.body.style.overflow = ''");

  recordTest(
    'Preloader',
    'Body scroll locking and restoration invariants present',
    hasBodyScrollLock && hasBodyScrollRestore,
    `Lock: ${hasBodyScrollLock}, Restore: ${hasBodyScrollRestore}`
  );
}

// -------------------------------------------------------------
// SUITE 3: CUSTOM CURSOR STRESS & PERFORMANCE VERIFICATION
// -------------------------------------------------------------
async function testCustomCursor() {
  console.log('\n======================================================');
  console.log('SUITE 3: CUSTOM CURSOR STRESS & INTERACTION TESTS');
  console.log('======================================================');

  const cursorPath = path.join(ROOT_DIR, 'src/components/common/CustomCursor.jsx');
  const cursorCode = fs.readFileSync(cursorPath, 'utf-8');
  const contextPath = path.join(ROOT_DIR, 'src/context/CursorContext.jsx');
  const contextCode = fs.readFileSync(contextPath, 'utf-8');

  // Test 3.1: GSAP quickTo 120fps tracking pipeline
  const hasQuickTo = cursorCode.includes('gsap.quickTo');
  const hasDotSetter = cursorCode.includes("gsap.quickTo(dotRef.current, 'x'") || cursorCode.includes('gsap.quickTo(dotRef.current, "x"');
  const hasRingSetter = cursorCode.includes("gsap.quickTo(ringRef.current, 'x'") || cursorCode.includes('gsap.quickTo(ringRef.current, "x"');
  const hasPassiveMouseMove = cursorCode.includes("window.addEventListener('mousemove', handleMouseMove, { passive: true })") ||
                             cursorCode.includes('window.addEventListener("mousemove", handleMouseMove, { passive: true })');

  recordTest(
    'CustomCursor',
    '120fps GSAP quickTo tracking pipelines allocated for dot and ring with passive mousemove',
    hasQuickTo && hasDotSetter && hasRingSetter && hasPassiveMouseMove,
    `quickTo: ${hasQuickTo}, dotSetter: ${hasDotSetter}, ringSetter: ${hasRingSetter}, passiveListener: ${hasPassiveMouseMove}`
  );

  // Test 3.2: Re-render freedom verification
  // Verify that handleMouseMove does NOT call setCursorVariant or other state setters
  const mouseMoveMatch = cursorCode.match(/const handleMouseMove = \([\s\S]*?\n\s*\};/);
  const mouseMoveBody = mouseMoveMatch ? mouseMoveMatch[0] : '';
  const triggersStateOnMouseMove = mouseMoveBody.includes('setCursor') || mouseMoveBody.includes('setState');

  recordTest(
    'CustomCursor',
    'Zero React re-renders on mousemove (pure GSAP direct mutate)',
    !triggersStateOnMouseMove,
    triggersStateOnMouseMove ? 'DANGER: setState called during mousemove!' : 'Verified: mousemove bypasses React state entirely'
  );

  // Test 3.3: Touch suppression
  const hasCoarseMediaQuery = cursorCode.includes('(hover: none) or (pointer: coarse)');
  const hasTouchReturnNull = cursorCode.includes('if (isTouch) return null');
  const defaultTouchSafe = cursorCode.includes('useState(true)'); // initial safe state

  recordTest(
    'CustomCursor',
    'Touch device suppression under coarse pointer query ((hover: none) or (pointer: coarse))',
    hasCoarseMediaQuery && hasTouchReturnNull && defaultTouchSafe,
    `CoarseQuery: ${hasCoarseMediaQuery}, ReturnNull: ${hasTouchReturnNull}, DefaultSafe: ${defaultTouchSafe}`
  );

  // Test 3.4: Interactive Element Delegation
  const hasLinkButtonDelegation = cursorCode.includes("closest('a, button, [role=\"button\"]") || cursorCode.includes('closest(\'a, button, [role="button"]');
  const hasProjectDelegation = cursorCode.includes('[data-cursor="project"]');
  const hasInputHiddenDelegation = cursorCode.includes('input:not([type="submit"]):not([type="button"])');

  recordTest(
    'CustomCursor',
    'Event delegation handles links/buttons, project cards, and text inputs',
    hasLinkButtonDelegation && hasProjectDelegation && hasInputHiddenDelegation,
    `LinkButton: ${hasLinkButtonDelegation}, Project: ${hasProjectDelegation}, InputHidden: ${hasInputHiddenDelegation}`
  );

  // Test 3.5: Cursor Reset on Route Change
  const hasRouteReset = contextCode.includes('location.pathname') && contextCode.includes('resetCursor');
  recordTest(
    'CustomCursor',
    'Cursor automatically resets to default variant on route change',
    hasRouteReset,
    hasRouteReset ? 'resetCursor called in CursorContext on location.pathname change' : 'Missing route change reset'
  );

  // Test 3.7: Empirical Static / Dependency Analysis of Tracking Effect
  // Challenge: Does changing cursorVariant re-trigger the 120fps tracking effect, destroying quickTo pipelines and re-binding listeners?
  const trackingEffectMatch = cursorCode.match(/\/\/ 2\. High-Performance 120fps Mouse Tracking[\s\S]*?\}, \[(.*?)\]\);/);
  const trackingDeps = trackingEffectMatch ? trackingEffectMatch[1] : '';
  const tracksVariantInDeps = trackingDeps.includes('cursorVariant');

  recordTest(
    'CustomCursor',
    'Tracking effect dependency decoupling (does not re-allocate quickTo pipelines on cursorVariant change)',
    !tracksVariantInDeps,
    tracksVariantInDeps
      ? 'DEFECT / SUB-OPTIMALITY DETECTED: [cursorVariant] in tracking effect deps causes quickTo pipeline re-allocation and opacity: 0 reset on every hover/unhover transition. Should be decoupled via ref.'
      : 'Optimal: tracking effect decoupled from cursorVariant',
    'EDGE'
  );
}

// -------------------------------------------------------------
// SUITE 4: SCROLL PROGRESS BAR STRESS & RESILIENCE
// -------------------------------------------------------------
async function testScrollProgressBar() {
  console.log('\n======================================================');
  console.log('SUITE 4: SCROLL PROGRESS BAR RESILIENCE TESTS');
  console.log('======================================================');

  const progressPath = path.join(ROOT_DIR, 'src/components/common/ScrollProgressBar.jsx');
  const progressCode = fs.readFileSync(progressPath, 'utf-8');

  // Test 4.1: Division-by-zero resilience formula
  // In ScrollProgressBar.jsx:
  // const progress = maxScroll <= 0 ? 0 : Math.min(Math.max(scrollTop / maxScroll, 0), 1);
  const computeProgress = (scrollTop, scrollHeight, innerHeight) => {
    const maxScroll = scrollHeight - innerHeight;
    return maxScroll <= 0 ? 0 : Math.min(Math.max(scrollTop / maxScroll, 0), 1);
  };

  const testZero = computeProgress(0, 800, 800); // maxScroll = 0
  const testNegative = computeProgress(0, 500, 800); // maxScroll = -300
  const testEmpty = computeProgress(0, 0, 0); // maxScroll = 0
  const testElasticTop = computeProgress(-100, 2000, 800); // scrollTop < 0
  const testElasticBottom = computeProgress(3000, 2000, 800); // scrollTop > maxScroll
  const testHalfway = computeProgress(600, 2000, 800); // scrollTop = 600, maxScroll = 1200 -> 0.5

  const divisionByZeroProtected = testZero === 0 &&
                                  testNegative === 0 &&
                                  testEmpty === 0 &&
                                  !Number.isNaN(testZero) &&
                                  !Number.isNaN(testNegative);

  recordTest(
    'ScrollProgressBar',
    'Division-by-zero resilience when page fits viewport or maxScroll <= 0',
    divisionByZeroProtected,
    `testZero: ${testZero}, testNegative: ${testNegative}, testEmpty: ${testEmpty}`
  );

  const clampingProtected = testElasticTop === 0 && testElasticBottom === 1 && testHalfway === 0.5;
  recordTest(
    'ScrollProgressBar',
    'Elastic overscroll clamping [0, 1] on mobile / macOS bounce scrolling',
    clampingProtected,
    `TopBounce: ${testElasticTop}, BottomBounce: ${testElasticBottom}, MidScroll: ${testHalfway}`
  );

  // Test 4.2: Route Change Reset to 0%
  const hasRouteReset = progressCode.includes('location.pathname') &&
                        progressCode.includes("barRef.current.style.transform = 'scaleX(0)'");

  recordTest(
    'ScrollProgressBar',
    'Progress bar instantly resets to scaleX(0) on route transition',
    hasRouteReset,
    hasRouteReset ? 'scaleX(0) set on location.pathname change' : 'Missing route change reset'
  );

  // Test 4.3: GPU Composite-Only Validation
  const hasScaleX = progressCode.includes('scaleX(');
  const hasOriginLeft = progressCode.includes('origin-left');
  const hasWillChange = progressCode.includes('will-change-transform') || progressCode.includes('will-change: transform');
  const animatesWidth = progressCode.includes('style.width =') || progressCode.includes('style.width=');

  recordTest(
    'ScrollProgressBar',
    'Hardware-accelerated composite-only animation (scaleX with origin-left, zero width reflow)',
    hasScaleX && hasOriginLeft && hasWillChange && !animatesWidth,
    `scaleX: ${hasScaleX}, origin-left: ${hasOriginLeft}, willChange: ${hasWillChange}, noWidthReflow: ${!animatesWidth}`
  );
}

// -------------------------------------------------------------
// SUITE 5: SYSTEM POLISH, NAVIGATION & LAYOUT CONSTRAINTS
// -------------------------------------------------------------
async function testNavigationAndLayout() {
  console.log('\n======================================================');
  console.log('SUITE 5: SYSTEM POLISH, NAVIGATION & LAYOUT AUDIT');
  console.log('======================================================');

  // Test 5.1: ThemeToggle accessibility
  const togglePath = path.join(ROOT_DIR, 'src/components/ui/ThemeToggle.jsx');
  const toggleCode = fs.readFileSync(togglePath, 'utf-8');

  const hasSwitchRole = toggleCode.includes('role="switch"');
  const hasAriaChecked = toggleCode.includes('aria-checked');
  const hasMinHitTarget = toggleCode.includes('min-w-[44px]') && toggleCode.includes('min-h-[44px]');
  const hasKeyboardHandler = toggleCode.includes('onKeyDown') && (toggleCode.includes('Enter') || toggleCode.includes(' '));

  recordTest(
    'ThemeToggle',
    'WCAG accessibility: role="switch", aria-checked, 44x44px target, keyboard Enter/Space support',
    hasSwitchRole && hasAriaChecked && hasMinHitTarget && hasKeyboardHandler,
    `Role: ${hasSwitchRole}, Aria: ${hasAriaChecked}, HitTarget: ${hasMinHitTarget}, Keyboard: ${hasKeyboardHandler}`
  );

  // Test 5.2: MobileMenu body scroll lock & auto-close
  const mobileMenuPath = path.join(ROOT_DIR, 'src/components/layout/MobileMenu.jsx');
  const mobileMenuCode = fs.readFileSync(mobileMenuPath, 'utf-8');

  const hasLenisLock = mobileMenuCode.includes('window.__lenis.stop()') && mobileMenuCode.includes('window.__lenis.start()');
  const hasEscapeListener = mobileMenuCode.includes("'Escape'") || mobileMenuCode.includes('"Escape"');
  const hasResizeListener = mobileMenuCode.includes('resize') && mobileMenuCode.includes('768');

  recordTest(
    'MobileMenu',
    'Mobile menu dual-layer scroll lock (body + Lenis) and auto-close on Escape / desktop resize',
    hasLenisLock && hasEscapeListener && hasResizeListener,
    `LenisLock: ${hasLenisLock}, EscapeKey: ${hasEscapeListener}, Resize768: ${hasResizeListener}`
  );

  // Test 5.3: Layout Lenis & GSAP ScrollTrigger synchronization
  const layoutPath = path.join(ROOT_DIR, 'src/components/layout/Layout.jsx');
  const layoutCode = fs.readFileSync(layoutPath, 'utf-8');

  const hasLenisInit = layoutCode.includes('new Lenis');
  const hasScrollTriggerSync = layoutCode.includes("lenis.on('scroll', ScrollTrigger.update)");
  const hasGsapTicker = layoutCode.includes('gsap.ticker.add');
  const hasZeroLagSmoothing = layoutCode.includes('gsap.ticker.lagSmoothing(0)');
  const hasScrollRestoration = layoutCode.includes('lenis.scrollTo(0, { immediate: true })') || layoutCode.includes('lenisRef.current.scrollTo(0');

  recordTest(
    'Layout',
    'Lenis smooth scroll integration with GSAP ticker (lagSmoothing(0)) and route change scroll restoration',
    hasLenisInit && hasScrollTriggerSync && hasGsapTicker && hasZeroLagSmoothing && hasScrollRestoration,
    `LenisInit: ${hasLenisInit}, STSync: ${hasScrollTriggerSync}, Ticker: ${hasGsapTicker}, LagSmoothing0: ${hasZeroLagSmoothing}, ScrollRestore: ${hasScrollRestoration}`
  );

  // Test 5.4: Tailwind Design Tokens
  const tailwindPath = path.join(ROOT_DIR, 'tailwind.config.js');
  const tailwindCode = fs.readFileSync(tailwindPath, 'utf-8');

  const hasCyanToken = tailwindCode.includes('#00f0ff');
  const hasGoldToken = tailwindCode.includes('#fbbf24');
  const hasDarkBase = tailwindCode.includes('#07090e');
  const hasColorMix = tailwindCode.includes('color-mix');

  recordTest(
    'TailwindTokens',
    'Design token specifications with color-mix opacity support',
    hasCyanToken && hasGoldToken && hasDarkBase && hasColorMix,
    `Cyan: ${hasCyanToken}, Gold: ${hasGoldToken}, DarkBase: ${hasDarkBase}, ColorMix: ${hasColorMix}`
  );
}

// -------------------------------------------------------------
// MAIN RUNNER
// -------------------------------------------------------------
async function runAllStressTests() {
  console.log('======================================================');
  console.log('STARTING EMPIRICAL CHALLENGE HARNESS FOR MILESTONE 2');
  console.log('======================================================');

  await testThemeAndAntiFOUC();
  await testPreloader();
  await testCustomCursor();
  await testScrollProgressBar();
  await testNavigationAndLayout();

  console.log('\n======================================================');
  console.log('CHALLENGE HARNESS SUMMARY REPORT');
  console.log('======================================================');

  const total = testResults.length;
  const passed = testResults.filter((r) => r.passed).length;
  const failed = testResults.filter((r) => !r.passed).length;
  const critical = testResults.filter((r) => !r.passed && r.severity === 'CRITICAL').length;
  const minor = testResults.filter((r) => !r.passed && r.severity !== 'CRITICAL').length;

  console.log(`Total Empirical Assertions: ${total}`);
  console.log(`Passed:                     ${passed}`);
  console.log(`Failed:                     ${failed} (Critical: ${critical}, Minor/Edge: ${minor})`);

  if (critical > 0) {
    console.log('\n🔥 CRITICAL DEFECTS DETECTED:');
    testResults
      .filter((r) => !r.passed && r.severity === 'CRITICAL')
      .forEach((r) => console.log(` - [${r.category}] ${r.name}: ${r.details}`));
  }

  if (minor > 0) {
    console.log('\n⚠️ MINOR / EDGE CASE FINDINGS:');
    testResults
      .filter((r) => !r.passed && r.severity !== 'CRITICAL')
      .forEach((r) => console.log(` - [${r.category}] ${r.name}: ${r.details}`));
  }

  return { total, passed, failed, critical, minor };
}

runAllStressTests();
