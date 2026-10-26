import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('=== Milestone 1 (M1-R) Empirical Verification Suite ===\n');

let passCount = 0;
let failCount = 0;

function runCheck(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] ${name}`);
    console.error(`       Error: ${err.message}`);
    failCount++;
  }
}

const rootDir = process.cwd();

// Helper to read file content
function getFile(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

// 1. Check Google Fonts links in index.html
runCheck('index.html: Preconnect to Google Fonts', () => {
  const html = getFile('index.html');
  assert(html.includes('rel="preconnect" href="https://fonts.googleapis.com"'), 'Missing preconnect to fonts.googleapis.com');
  assert(html.includes('rel="preconnect" href="https://fonts.gstatic.com"'), 'Missing preconnect to fonts.gstatic.com');
});

runCheck('index.html: Font stylesheet contains DM Sans, DM Serif Display, and JetBrains Mono', () => {
  const html = getFile('index.html');
  assert(html.includes('family=DM+Sans'), 'Missing DM+Sans in font stylesheet URL');
  assert(html.includes('family=DM+Serif+Display'), 'Missing DM+Serif+Display in font stylesheet URL');
  assert(html.includes('family=JetBrains+Mono'), 'Missing JetBrains+Mono in font stylesheet URL');
});

runCheck('index.html: Default theme-color meta tag and anti-FOUC light default', () => {
  const html = getFile('index.html');
  assert(html.includes('meta name="theme-color" content="#F5F0E8"'), 'Missing or incorrect default theme-color meta tag');
  assert(!html.includes('class="dark"'), 'html tag should not have hardcoded dark class');
  assert(html.includes("var theme = stored === 'dark' ? 'dark' : 'light';"), 'Anti-FOUC script does not default to light');
  assert(html.includes("meta.setAttribute('content', '#F5F0E8');"), 'Anti-FOUC does not restore #F5F0E8 for light');
  assert(html.includes("meta.setAttribute('content', '#141210');"), 'Anti-FOUC does not set #141210 for dark');
});

// 2. Check CSS rules in src/styles/index.css
runCheck('src/styles/index.css: Google Fonts import', () => {
  const css = getFile('src/styles/index.css');
  assert(css.includes('family=DM+Sans'), 'CSS @import missing DM+Sans');
  assert(css.includes('family=DM+Serif+Display'), 'CSS @import missing DM+Serif+Display');
  assert(css.includes('family=JetBrains+Mono'), 'CSS @import missing JetBrains+Mono');
});

runCheck('src/styles/index.css: :root Warm Editorial tokens', () => {
  const css = getFile('src/styles/index.css');
  assert(css.includes('--color-bg: #F5F0E8;'), ':root missing --color-bg: #F5F0E8');
  assert(css.includes('--color-surface: #EDE8DF;'), ':root missing --color-surface: #EDE8DF');
  assert(css.includes('--color-text-primary: #1C1A18;'), ':root missing --color-text-primary: #1C1A18');
  assert(css.includes('--color-text-secondary: #3D3A36;'), ':root missing --color-text-secondary: #3D3A36');
  assert(css.includes('--color-text-muted: #7A756D;'), ':root missing --color-text-muted: #7A756D');
  assert(css.includes('--color-accent: #C4704A;'), ':root missing --color-accent: #C4704A');
  assert(css.includes('--color-accent-glow: transparent;'), ':root legacy glow is not transparent');
});

runCheck('src/styles/index.css: .dark Deep Warm Brown tokens', () => {
  const css = getFile('src/styles/index.css');
  assert(css.includes('--color-bg: #141210;'), '.dark missing --color-bg: #141210');
  assert(css.includes('--color-surface: #1E1B18;'), '.dark missing --color-surface: #1E1B18');
  assert(css.includes('--color-text-primary: #F0EBE3;'), '.dark missing --color-text-primary: #F0EBE3');
  assert(css.includes('--color-text-secondary: #D4CDC3;'), '.dark missing --color-text-secondary: #D4CDC3');
  assert(css.includes('--color-accent: #C4704A;'), '.dark missing --color-accent: #C4704A');
});

runCheck('src/styles/index.css: Body and heading font-family definitions', () => {
  const css = getFile('src/styles/index.css');
  assert(css.includes("font-family: 'DM Sans'"), "body CSS missing 'DM Sans' font family");
  assert(css.includes("font-family: 'DM Serif Display'"), "h1..h4, .font-serif CSS missing 'DM Serif Display' font family");
  assert(css.includes("letter-spacing: -0.025em;"), "headings missing editorial tight letter-spacing");
});

// 3. Check tailwind.config.js
runCheck('tailwind.config.js: fontFamily configuration', () => {
  const tailwind = getFile('tailwind.config.js');
  assert(tailwind.includes('"DM Serif Display"'), 'Tailwind serif font missing DM Serif Display');
  assert(tailwind.includes('"DM Sans"'), 'Tailwind sans font missing DM Sans');
  assert(tailwind.includes('"JetBrains Mono"'), 'Tailwind mono font missing JetBrains Mono');
});

runCheck('tailwind.config.js: editorial colors and glow neutralization', () => {
  const tailwind = getFile('tailwind.config.js');
  assert(tailwind.includes("warmCream: '#F5F0E8'"), 'Tailwind colors missing warmCream');
  assert(tailwind.includes("warmSurface: '#EDE8DF'"), 'Tailwind colors missing warmSurface');
  assert(tailwind.includes("DEFAULT: '#C4704A'"), 'Tailwind colors missing terracotta DEFAULT');
  assert(tailwind.includes("DEFAULT: '#141210'"), 'Tailwind colors missing warmBrown DEFAULT');
  assert(tailwind.includes("'glow-cyan': 'none'"), "Tailwind boxShadow missing 'glow-cyan': 'none'");
  assert(tailwind.includes("'glow-gold': 'none'"), "Tailwind boxShadow missing 'glow-gold': 'none'");
});

// 4. Component Sanity: Preloader.jsx
runCheck('Preloader.jsx: Editorial styling and no cyan/glows', () => {
  const code = getFile('src/components/common/Preloader.jsx');
  assert(!code.includes('#00f0ff'), 'Preloader still contains legacy #00f0ff');
  assert(!code.includes('#00f5ff'), 'Preloader still contains legacy #00f5ff');
  assert(!code.includes('boxShadow'), 'Preloader contains custom boxShadow glow');
  assert(code.includes('bg-[#F5F0E8]'), 'Preloader missing cream background #F5F0E8');
  assert(code.includes('text-[#1C1A18]'), 'Preloader missing charcoal text #1C1A18');
  assert(code.includes('font-serif'), 'Preloader monogram missing font-serif class');
  assert(code.includes('text-[#C4704A]'), 'Preloader missing terracotta counter text');
  assert(code.includes('bg-[#C4704A]'), 'Preloader missing terracotta progress fill');
});

// 5. Component Sanity: PageCurtain.jsx
runCheck('PageCurtain.jsx: Cream background and no legacy dark/cyan', () => {
  const code = getFile('src/components/common/PageCurtain.jsx');
  assert(!code.includes('#00f0ff'), 'PageCurtain contains legacy cyan');
  assert(!code.includes('#07090e'), 'PageCurtain contains legacy dark navy');
  assert(code.includes('bg-[#F5F0E8]'), 'PageCurtain missing cream background #F5F0E8');
});

// 6. Component Sanity: CustomCursor.jsx
runCheck('CustomCursor.jsx: Terracotta styling, zero glow, no legacy cyan', () => {
  const code = getFile('src/components/common/CustomCursor.jsx');
  assert(!code.includes('#00f0ff'), 'CustomCursor contains legacy #00f0ff');
  assert(!code.includes('#00f5ff'), 'CustomCursor contains legacy #00f5ff');
  assert(!code.includes('0 0 20px'), 'CustomCursor contains blur glow');
  assert(code.includes("boxShadow: 'none'"), 'CustomCursor does not explicitly set boxShadow: none');
  assert(code.includes('#C4704A'), 'CustomCursor missing terracotta accent #C4704A');
});

// 7. Component Sanity: ScrollProgressBar.jsx
runCheck('ScrollProgressBar.jsx: 2px terracotta bar with zero glow/cyan', () => {
  const code = getFile('src/components/common/ScrollProgressBar.jsx');
  assert(!code.includes('#00f0ff'), 'ScrollProgressBar contains legacy cyan');
  assert(!code.includes('#00f5ff'), 'ScrollProgressBar contains legacy cyan');
  assert(!code.includes('shadow-'), 'ScrollProgressBar contains glow shadow');
  assert(code.includes('h-[2px]'), 'ScrollProgressBar is not 2px height');
  assert(code.includes('bg-[#C4704A]'), 'ScrollProgressBar missing terracotta #C4704A background');
});

// 8. ThemeContext.jsx sanity
runCheck('ThemeContext.jsx: Light default initialization and meta theme-color sync', () => {
  const code = getFile('src/context/ThemeContext.jsx');
  assert(code.includes("return 'light';"), "ThemeContext fallback default is not 'light'");
  assert(code.includes("#F5F0E8"), 'ThemeContext does not set #F5F0E8 meta color');
  assert(code.includes("#141210"), 'ThemeContext does not set #141210 meta color');
});

// 9. Absence of legacy cyan (#00f0ff / #00f5ff) in M1-R owned components
runCheck('M1-R Owned Files: Zero occurrences of #00f0ff or #00f5ff', () => {
  const files = [
    'src/styles/index.css',
    'tailwind.config.js',
    'index.html',
    'src/context/ThemeContext.jsx',
    'src/components/common/Preloader.jsx',
    'src/components/common/PageCurtain.jsx',
    'src/components/common/CustomCursor.jsx',
    'src/components/common/ScrollProgressBar.jsx'
  ];
  for (const f of files) {
    const c = getFile(f);
    assert(!c.includes('#00f0ff'), `${f} contains #00f0ff`);
    assert(!c.includes('#00f5ff'), `${f} contains #00f5ff`);
  }
});

console.log('\n======================================================');
console.log(`Total Checks: ${passCount + failCount}`);
console.log(`Passed:       ${passCount}`);
console.log(`Failed:       ${failCount}`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
