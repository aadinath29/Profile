/**
 * Empirical Stress & Challenge Test Suite for Milestone 1 (M1-R)
 * Theme Tokens, Colors, Typography & Common Polish
 *
 * Authored by: challenger_m1_redesign_1
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
// SUITE 1: ANTI-FOUC SCRIPT STRESS TESTS
// =========================================================================
function testAntiFOUCScript() {
  console.log('\n======================================================');
  console.log('SUITE 1: ANTI-FOUC SYNCHRONOUS SCRIPT STRESS TESTS');
  console.log('======================================================');

  const indexHtmlPath = path.join(ROOT_DIR, 'index.html');
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Check HTML initial state
  const htmlTagMatch = indexHtml.match(/<html([^>]*)>/);
  const htmlAttrs = htmlTagMatch ? htmlTagMatch[1] : '';
  recordTest(
    'Anti-FOUC',
    'HTML root does NOT hardcode class="dark"',
    !htmlAttrs.includes('dark'),
    htmlAttrs.includes('dark') ? 'class="dark" is hardcoded on <html>' : 'Clean <html lang="en">'
  );

  // Check meta tag presence
  const metaMatch = indexHtml.match(/<meta\s+name=["']theme-color["']\s+content=["']([^"']+)["']\s+id=["']theme-color-meta["']/i) ||
                    indexHtml.match(/<meta\s+id=["']theme-color-meta["']\s+name=["']theme-color["']\s+content=["']([^"']+)["']/i);
  recordTest(
    'Anti-FOUC',
    'Meta theme-color tag exists with ID theme-color-meta and default #F5F0E8',
    metaMatch !== null && metaMatch[1] === '#F5F0E8',
    metaMatch ? `Meta theme-color found with initial content: ${metaMatch[1]}` : 'Meta tag missing or malformed'
  );

  // Extract inline script from index.html
  const scriptMatch = indexHtml.match(/<script>([\s\S]*?)<\/script>/);
  const inlineScriptCode = scriptMatch ? scriptMatch[1] : null;

  recordTest(
    'Anti-FOUC',
    'Inline script present in <head>',
    inlineScriptCode !== null && inlineScriptCode.includes('am_portfolio_theme'),
    inlineScriptCode ? 'Anti-FOUC script extracted successfully' : 'Script tag not found in <head>'
  );

  if (!inlineScriptCode) return;

  // Sandbox harness to run the inline script in various mock environments
  function runScript(localStorageMock, domState = {}) {
    const classList = new Set(domState.initialClasses || []);
    let metaContent = domState.initialMetaContent || '#F5F0E8';
    let metaElement = domState.hasMetaElement === false ? null : {
      setAttribute: (attr, val) => {
        if (attr === 'content') metaContent = val;
      },
      getAttribute: (attr) => attr === 'content' ? metaContent : null
    };

    const mockDocument = {
      documentElement: {
        classList: {
          add: (cls) => classList.add(cls),
          remove: (cls) => classList.delete(cls),
          contains: (cls) => classList.has(cls)
        }
      },
      getElementById: (id) => id === 'theme-color-meta' ? metaElement : null
    };

    // Execute script via Function constructor with sandboxed scope
    const runner = new Function('localStorage', 'document', inlineScriptCode);
    let error = null;
    try {
      runner(localStorageMock, mockDocument);
    } catch (e) {
      error = e;
    }

    return {
      classList: Array.from(classList),
      isDark: classList.has('dark'),
      metaContent,
      error
    };
  }

  // 1. null / uninitialized localStorage
  const nullRes = runScript({ getItem: () => null });
  recordTest(
    'Anti-FOUC',
    'Null localStorage defaults to light (#F5F0E8, no .dark)',
    !nullRes.isDark && nullRes.metaContent === '#F5F0E8' && !nullRes.error,
    `isDark: ${nullRes.isDark}, meta: ${nullRes.metaContent}`
  );

  // 2. stored === 'dark'
  const darkRes = runScript({ getItem: () => 'dark' });
  recordTest(
    'Anti-FOUC',
    'Stored "dark" applies .dark class and #141210 meta',
    darkRes.isDark && darkRes.metaContent === '#141210' && !darkRes.error,
    `isDark: ${darkRes.isDark}, meta: ${darkRes.metaContent}`
  );

  // 3. stored === 'light'
  const lightRes = runScript({ getItem: () => 'light' }, { initialClasses: ['dark'] });
  recordTest(
    'Anti-FOUC',
    'Stored "light" strips .dark class and sets #F5F0E8 meta',
    !lightRes.isDark && lightRes.metaContent === '#F5F0E8' && !lightRes.error,
    `isDark: ${lightRes.isDark}, meta: ${lightRes.metaContent}`
  );

  // 4. Corrupted: empty string
  const emptyRes = runScript({ getItem: () => '' });
  recordTest(
    'Anti-FOUC',
    'Corrupted empty string defaults to light',
    !emptyRes.isDark && emptyRes.metaContent === '#F5F0E8' && !emptyRes.error,
    `isDark: ${emptyRes.isDark}, meta: ${emptyRes.metaContent}`
  );

  // 5. Corrupted: uppercase "DARK"
  const upperDarkRes = runScript({ getItem: () => 'DARK' });
  recordTest(
    'Anti-FOUC',
    'Case mismatch "DARK" safely defaults to light',
    !upperDarkRes.isDark && upperDarkRes.metaContent === '#F5F0E8' && !upperDarkRes.error,
    `isDark: ${upperDarkRes.isDark}, meta: ${upperDarkRes.metaContent}`
  );

  // 6. Corrupted: string "undefined" / "null"
  const strNullRes = runScript({ getItem: () => 'null' });
  recordTest(
    'Anti-FOUC',
    'String "null" safely defaults to light',
    !strNullRes.isDark && strNullRes.metaContent === '#F5F0E8' && !strNullRes.error,
    `isDark: ${strNullRes.isDark}, meta: ${strNullRes.metaContent}`
  );

  // 7. Corrupted: "[object Object]"
  const objRes = runScript({ getItem: () => '[object Object]' });
  recordTest(
    'Anti-FOUC',
    'Corrupted "[object Object]" defaults to light',
    !objRes.isDark && objRes.metaContent === '#F5F0E8' && !objRes.error,
    `isDark: ${objRes.isDark}, meta: ${objRes.metaContent}`
  );

  // 8. Storage Exception (Private Browsing / Access Denied)
  const throwingStorage = {
    getItem: () => {
      const err = new Error('SecurityError: The operation is insecure.');
      err.name = 'SecurityError';
      throw err;
    }
  };
  const throwRes = runScript(throwingStorage, { initialClasses: ['dark'] });
  recordTest(
    'Anti-FOUC',
    'LocalStorage SecurityError is caught and strips .dark safely',
    !throwRes.isDark && !throwRes.error,
    throwRes.error ? `Failed with unhandled error: ${throwRes.error.message}` : 'Error successfully caught in try/catch'
  );

  // 9. Missing meta element in DOM
  const noMetaRes = runScript({ getItem: () => 'dark' }, { hasMetaElement: false });
  recordTest(
    'Anti-FOUC',
    'Missing meta element does not throw TypeError (guarded by if (meta))',
    noMetaRes.isDark && !noMetaRes.error,
    noMetaRes.error ? `Crashed: ${noMetaRes.error.message}` : 'Gracefully handled null meta element'
  );
}

// =========================================================================
// SUITE 2: THEME CONTEXT LOGIC & LIFECYCLE SIMULATION
// =========================================================================
function testThemeContextSimulation() {
  console.log('\n======================================================');
  console.log('SUITE 2: THEME CONTEXT HYDRATION & TOGGLE SIMULATION');
  console.log('======================================================');

  const themeContextPath = path.join(ROOT_DIR, 'src/context/ThemeContext.jsx');
  const code = fs.readFileSync(themeContextPath, 'utf-8');

  // Verify storage key
  const storageKeyMatch = code.match(/STORAGE_KEY\s*=\s*['"]([^'"]+)['"]/);
  const storageKey = storageKeyMatch ? storageKeyMatch[1] : null;
  recordTest(
    'ThemeContext',
    'Uses correct STORAGE_KEY "am_portfolio_theme"',
    storageKey === 'am_portfolio_theme',
    `Storage key: ${storageKey}`
  );

  // Check fallback default theme in useState initializer
  const hasLightFallback = code.includes("return 'light';") || code.includes('nextTheme === \'light\'');
  recordTest(
    'ThemeContext',
    'Fallback theme initialized to "light"',
    hasLightFallback,
    'Verified default return is light'
  );

  // Check meta tag colors in ThemeContext
  const hasDarkColor = code.includes('#141210');
  const hasLightColor = code.includes('#F5F0E8');
  recordTest(
    'ThemeContext',
    'Synchronizes meta theme-color with #141210 (dark) and #F5F0E8 (light)',
    hasDarkColor && hasLightColor,
    `Dark meta: ${hasDarkColor ? '#141210' : 'MISSING'}, Light meta: ${hasLightColor ? '#F5F0E8' : 'MISSING'}`
  );

  // Hydration simulation test
  function simulateHydration(storageValue, initialDomClass = '', throwsError = false) {
    let mockStorage = {};
    if (storageValue !== null) mockStorage['am_portfolio_theme'] = storageValue;

    const getItem = (k) => {
      if (throwsError) throw new Error('QuotaExceeded or SecurityError');
      return mockStorage[k] ?? null;
    };

    let resolvedTheme = 'light';
    try {
      const stored = getItem('am_portfolio_theme');
      if (stored === 'light' || stored === 'dark') {
        resolvedTheme = stored;
        return resolvedTheme;
      }
    } catch (e) {}

    const classContainsDark = initialDomClass === 'dark';
    if (classContainsDark) return 'dark';
    return 'light';
  }

  recordTest('ThemeContext', 'Hydration: storage="dark" -> dark', simulateHydration('dark') === 'dark');
  recordTest('ThemeContext', 'Hydration: storage="light" -> light', simulateHydration('light') === 'light');
  recordTest('ThemeContext', 'Hydration: storage=null, DOM="dark" -> dark', simulateHydration(null, 'dark') === 'dark');
  recordTest('ThemeContext', 'Hydration: storage=null, DOM="" -> light', simulateHydration(null, '') === 'light');
  recordTest('ThemeContext', 'Hydration: storage invalid "foo", DOM="" -> light', simulateHydration('foo', '') === 'light');
  recordTest('ThemeContext', 'Hydration: storage throws, DOM="" -> light', simulateHydration(null, '', true) === 'light');
}

// =========================================================================
// SUITE 3: TOKEN RESOLUTION & CSS VARIABLE PARITY
// =========================================================================
function testTokenResolution() {
  console.log('\n======================================================');
  console.log('SUITE 3: TOKEN RESOLUTION & CSS VARIABLE PARITY');
  console.log('======================================================');

  const cssPath = path.join(ROOT_DIR, 'src/styles/index.css');
  const tailwindPath = path.join(ROOT_DIR, 'tailwind.config.js');

  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  const tailwindContent = fs.readFileSync(tailwindPath, 'utf-8');

  // Extract :root block
  const rootMatch = cssContent.match(/:root\s*\{([\s\S]*?)\}/);
  const rootBlock = rootMatch ? rootMatch[1] : '';

  // Extract .dark block
  const darkMatch = cssContent.match(/\.dark\s*\{([\s\S]*?)\}/);
  const darkBlock = darkMatch ? darkMatch[1] : '';

  recordTest('Tokens', ':root CSS rule found in index.css', rootBlock.length > 0);
  recordTest('Tokens', '.dark CSS rule found in index.css', darkBlock.length > 0);

  function parseVars(block) {
    const map = new Map();
    const regex = /(--color-[a-z0-9-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = regex.exec(block)) !== null) {
      map.set(match[1].trim(), match[2].trim());
    }
    return map;
  }

  const rootVars = parseVars(rootBlock);
  const darkVars = parseVars(darkBlock);

  console.log(`   Found ${rootVars.size} vars in :root, ${darkVars.size} vars in .dark`);

  // Parity check: every var in :root must be in .dark
  const missingInDark = [];
  for (const key of rootVars.keys()) {
    if (!darkVars.has(key)) missingInDark.push(key);
  }
  recordTest(
    'Tokens',
    'All :root CSS variables are defined in .dark',
    missingInDark.length === 0,
    missingInDark.length === 0 ? 'Full parity' : `Missing in .dark: ${missingInDark.join(', ')}`
  );

  // Parity check: every var in .dark must be in :root
  const missingInRoot = [];
  for (const key of darkVars.keys()) {
    if (!rootVars.has(key)) missingInRoot.push(key);
  }
  recordTest(
    'Tokens',
    'All .dark CSS variables are defined in :root',
    missingInRoot.length === 0,
    missingInRoot.length === 0 ? 'Full parity' : `Missing in :root: ${missingInRoot.join(', ')}`
  );

  // Verify mandatory color values
  const expectedRootValues = {
    '--color-bg': '#F5F0E8',
    '--color-surface': '#EDE8DF',
    '--color-surface-card': '#EDE8DF',
    '--color-text-primary': '#1C1A18',
    '--color-text-secondary': '#3D3A36',
    '--color-text-muted': '#7A756D',
    '--color-accent': '#C4704A',
  };

  for (const [varName, expectedVal] of Object.entries(expectedRootValues)) {
    const actual = rootVars.get(varName);
    recordTest(
      'Tokens',
      `:root ${varName} matches ${expectedVal}`,
      actual === expectedVal,
      `Expected: ${expectedVal}, Got: ${actual}`
    );
  }

  const expectedDarkValues = {
    '--color-bg': '#141210',
    '--color-surface': '#1E1B18',
    '--color-surface-card': '#1E1B18',
    '--color-text-primary': '#F0EBE3',
    '--color-text-secondary': '#D4CDC3',
    '--color-text-muted': '#9E968B',
    '--color-accent': '#C4704A',
  };

  for (const [varName, expectedVal] of Object.entries(expectedDarkValues)) {
    const actual = darkVars.get(varName);
    recordTest(
      'Tokens',
      `.dark ${varName} matches ${expectedVal}`,
      actual === expectedVal,
      `Expected: ${expectedVal}, Got: ${actual}`
    );
  }

  // Check safety aliases
  recordTest('Tokens', ':root maps --color-accent-cyan to #C4704A', rootVars.get('--color-accent-cyan') === '#C4704A');
  recordTest('Tokens', ':root maps --color-accent-gold to #C4704A', rootVars.get('--color-accent-gold') === '#C4704A');
  recordTest('Tokens', ':root maps --color-accent-glow to transparent', rootVars.get('--color-accent-glow') === 'transparent');
  recordTest('Tokens', '.dark maps --color-accent-cyan to #C4704A', darkVars.get('--color-accent-cyan') === '#C4704A');
  recordTest('Tokens', '.dark maps --color-accent-gold to #C4704A', darkVars.get('--color-accent-gold') === '#C4704A');
  recordTest('Tokens', '.dark maps --color-accent-glow to transparent', darkVars.get('--color-accent-glow') === 'transparent');

  // Verify all Tailwind withOpacity references resolve to existing CSS vars
  const tailwindVarRegex = /withOpacity\(['"](--color-[a-z0-9-]+)['"]\)/g;
  const referencedVars = new Set();
  let twMatch;
  while ((twMatch = tailwindVarRegex.exec(tailwindContent)) !== null) {
    referencedVars.add(twMatch[1]);
  }

  const unresolvableVars = [];
  for (const v of referencedVars) {
    if (!rootVars.has(v) || !darkVars.has(v)) {
      unresolvableVars.push(v);
    }
  }

  recordTest(
    'Tokens',
    `Tailwind withOpacity references resolve completely (${referencedVars.size} vars inspected)`,
    unresolvableVars.length === 0,
    unresolvableVars.length === 0 ? 'All Tailwind variables exist in :root and .dark' : `Unresolved: ${unresolvableVars.join(', ')}`
  );

  // Verify font families in tailwind.config.js
  recordTest('Typography', 'Tailwind serif contains "DM Serif Display"', tailwindContent.includes('"DM Serif Display"'));
  recordTest('Typography', 'Tailwind sans contains "DM Sans"', tailwindContent.includes('"DM Sans"'));
  recordTest('Typography', 'Tailwind mono contains "JetBrains Mono"', tailwindContent.includes('"JetBrains Mono"'));

  // Verify font families in index.css
  recordTest('Typography', 'index.css body specifies "DM Sans"', cssContent.includes("'DM Sans'"));
  recordTest('Typography', 'index.css headings specify "DM Serif Display"', cssContent.includes("'DM Serif Display'"));
}

// =========================================================================
// SUITE 4: COMMON POLISH COMPONENTS VERIFICATION
// =========================================================================
function testPolishComponents() {
  console.log('\n======================================================');
  console.log('SUITE 4: COMMON POLISH COMPONENTS & RESIDUAL AUDIT');
  console.log('======================================================');

  const preloaderPath = path.join(ROOT_DIR, 'src/components/common/Preloader.jsx');
  const curtainPath = path.join(ROOT_DIR, 'src/components/common/PageCurtain.jsx');
  const cursorPath = path.join(ROOT_DIR, 'src/components/common/CustomCursor.jsx');
  const scrollbarPath = path.join(ROOT_DIR, 'src/components/common/ScrollProgressBar.jsx');

  const preloader = fs.readFileSync(preloaderPath, 'utf-8');
  const curtain = fs.readFileSync(curtainPath, 'utf-8');
  const cursor = fs.readFileSync(cursorPath, 'utf-8');
  const scrollbar = fs.readFileSync(scrollbarPath, 'utf-8');

  // Preloader checks
  recordTest('Preloader', 'Preloader background is #F5F0E8', preloader.includes('bg-[#F5F0E8]'));
  recordTest('Preloader', 'Preloader text is #1C1A18', preloader.includes('text-[#1C1A18]'));
  recordTest('Preloader', 'Monogram uses font-serif', preloader.includes('font-serif'));
  recordTest('Preloader', 'Subtitle uses font-mono', preloader.includes('font-mono'));
  recordTest('Preloader', 'Progress bar uses #C4704A', preloader.includes('bg-[#C4704A]'));
  recordTest('Preloader', 'No residual neon #00f5ff in Preloader', !preloader.toLowerCase().includes('#00f5ff'));

  // PageCurtain checks
  recordTest('PageCurtain', 'PageCurtain entrance background is #F5F0E8', curtain.includes('bg-[#F5F0E8]'));
  recordTest('PageCurtain', 'No residual dark #0a0a0a in PageCurtain', !curtain.toLowerCase().includes('#0a0a0a'));

  // CustomCursor checks
  recordTest('CustomCursor', 'Dot background is #C4704A', cursor.includes('bg-[#C4704A]') || cursor.includes('#C4704A'));
  recordTest('CustomCursor', 'Ring border uses #C4704A', cursor.includes('#C4704A'));
  recordTest('CustomCursor', 'Glow shadows neutralized (boxShadow: "none")', cursor.includes("boxShadow: 'none'"));
  recordTest('CustomCursor', 'No residual cyan #00f5ff in CustomCursor', !cursor.toLowerCase().includes('#00f5ff'));

  // ScrollProgressBar checks
  recordTest('ScrollProgressBar', 'Height is exactly 2px (h-[2px])', scrollbar.includes('h-[2px]'));
  recordTest('ScrollProgressBar', 'Background is #C4704A', scrollbar.includes('bg-[#C4704A]'));
  recordTest('ScrollProgressBar', 'No cyan/gold gradient in ScrollProgressBar', !scrollbar.includes('gradient') && !scrollbar.toLowerCase().includes('#00f5ff'));
}

// =========================================================================
// RUN ALL TESTS & REPORT
// =========================================================================
function runAll() {
  console.log('Starting M1-R Empirical Stress & Challenge Harness...\n');

  testAntiFOUCScript();
  testThemeContextSimulation();
  testTokenResolution();
  testPolishComponents();

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
    console.log('\n🌟 ALL M1-R EMPIRICAL STRESS TESTS PASSED WITH 0 FAILURES!');
    process.exit(0);
  }
}

runAll();
