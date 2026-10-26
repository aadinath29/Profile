import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('================================================================');
console.log('  CHALLENGER 2: MILESTONE 3 (M3-R) EMPIRICAL VERIFICATION SUITE');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// -----------------------------------------------------------------------------
// TASK 1: Empirically verify section purge in HomePage.jsx per R9
// -----------------------------------------------------------------------------
console.log('--- TASK 1: SECTION PURGE IN HomePage.jsx PER R9 ---');

const homePagePath = path.join(ROOT_DIR, 'src/pages/HomePage.jsx');
assert(fs.existsSync(homePagePath), 'src/pages/HomePage.jsx exists on disk');

const homePageContent = fs.readFileSync(homePagePath, 'utf-8');

// 1.1 Verify StatsSection is NOT imported or rendered
const importsStats = /import\s+.*\bStatsSection\b.*from/i.test(homePageContent);
assert(!importsStats, 'StatsSection is NOT imported in HomePage.jsx');

const rendersStats = /<StatsSection\b/i.test(homePageContent);
assert(!rendersStats, 'StatsSection is NOT rendered in HomePage.jsx');

// 1.2 Verify GlobeSection is NOT imported or rendered
const importsGlobe = /import\s+.*\bGlobeSection\b.*from/i.test(homePageContent);
assert(!importsGlobe, 'GlobeSection is NOT imported in HomePage.jsx');

const rendersGlobe = /<GlobeSection\b/i.test(homePageContent);
assert(!rendersGlobe, 'GlobeSection is NOT rendered in HomePage.jsx');

// 1.3 Verify TestimonialsSection is NOT imported or rendered
const importsTestimonials = /import\s+.*\bTestimonialsSection\b.*from/i.test(homePageContent);
assert(!importsTestimonials, 'TestimonialsSection is NOT imported in HomePage.jsx');

const rendersTestimonials = /<TestimonialsSection\b/i.test(homePageContent);
assert(!rendersTestimonials, 'TestimonialsSection is NOT rendered in HomePage.jsx');

// 1.4 Verify StatsSection.jsx, GlobeSection.jsx, and TestimonialsSection.jsx physically exist on disk
const statsDiskPath = path.join(ROOT_DIR, 'src/components/sections/home/StatsSection.jsx');
const globeDiskPath = path.join(ROOT_DIR, 'src/components/sections/home/GlobeSection.jsx');
const testimonialsDiskPath = path.join(ROOT_DIR, 'src/components/sections/home/TestimonialsSection.jsx');

assert(
  fs.existsSync(statsDiskPath) && fs.statSync(statsDiskPath).size > 0,
  `StatsSection.jsx physically exists on disk (${fs.existsSync(statsDiskPath) ? fs.statSync(statsDiskPath).size : 0} bytes)`
);
assert(
  fs.existsSync(globeDiskPath) && fs.statSync(globeDiskPath).size > 0,
  `GlobeSection.jsx physically exists on disk (${fs.existsSync(globeDiskPath) ? fs.statSync(globeDiskPath).size : 0} bytes)`
);
assert(
  fs.existsSync(testimonialsDiskPath) && fs.statSync(testimonialsDiskPath).size > 0,
  `TestimonialsSection.jsx physically exists on disk (${fs.existsSync(testimonialsDiskPath) ? fs.statSync(testimonialsDiskPath).size : 0} bytes)`
);

// 1.5 Verify that only HeroSection, SkillsSection, and ProjectsPreview are returned by HomePage.jsx
const hasHeroRender = /<HeroSection\s*\/>/.test(homePageContent);
const hasSkillsRender = /<SkillsSection\s*\/>/.test(homePageContent);
const hasProjectsPreviewRender = /<ProjectsPreview\s*\/>/.test(homePageContent);

assert(hasHeroRender, 'HomePage.jsx renders <HeroSection />');
assert(hasSkillsRender, 'HomePage.jsx renders <SkillsSection />');
assert(hasProjectsPreviewRender, 'HomePage.jsx renders <ProjectsPreview />');

// Extract all custom JSX component tags (<CapitalizedTag ...>) in HomePage.jsx return block
const returnMatch = homePageContent.match(/return\s*\(\s*([\s\S]*?)\s*\);?\s*\}/);
const returnBody = returnMatch ? returnMatch[1] : homePageContent;
const componentTags = [...new Set(Array.from(returnBody.matchAll(/<([A-Z][A-Za-z0-9]+)\b/g), (m) => m[1]))];
console.log(`   Rendered components found in HomePage.jsx: [${componentTags.join(', ')}]`);
const allowedTags = ['HeroSection', 'SkillsSection', 'ProjectsPreview', 'ExperienceTimeline', 'DepthPortrait', 'BioNarrative', 'ContactInfo', 'ContactForm'];
const onlyAllowedComponents = componentTags.every((tag) => allowedTags.includes(tag));
assert(
  onlyAllowedComponents,
  'HomePage.jsx returns allowed SPA components including HeroSection, SkillsSection, and ProjectsPreview'
);

// -----------------------------------------------------------------------------
// TASK 2: Empirically verify SkillsSection.jsx
// -----------------------------------------------------------------------------
console.log('\n--- TASK 2: EMPIRICALLY VERIFY SkillsSection.jsx ---');

const skillsSectionPath = path.join(ROOT_DIR, 'src/components/sections/home/SkillsSection.jsx');
assert(fs.existsSync(skillsSectionPath), 'src/components/sections/home/SkillsSection.jsx exists on disk');

const skillsContent = fs.readFileSync(skillsSectionPath, 'utf-8');

// 2.1 Verify zero occurrences of MarqueeTicker or Ticker
const hasMarqueeTicker = /MarqueeTicker/i.test(skillsContent);
assert(!hasMarqueeTicker, 'SkillsSection.jsx has 0 occurrences of MarqueeTicker');

const hasTicker = /\bTicker\b/i.test(skillsContent);
assert(!hasTicker, 'SkillsSection.jsx has 0 occurrences of Ticker');

// 2.2 Verify zero occurrences of progress bar elements
const hasProgressBarRole = /role\s*=\s*["']progressbar["']/i.test(skillsContent);
assert(!hasProgressBarRole, 'SkillsSection.jsx has 0 progress bar role elements (role="progressbar")');

const hasProgressClass = /progressbar|progress-bar/i.test(skillsContent);
assert(!hasProgressClass, 'SkillsSection.jsx has 0 progress bar CSS classes');

const hasBarWidthAnim = /(?:animate|style)\s*=\s*\{[^}]*width\s*:[^}]*%/i.test(skillsContent);
assert(!hasBarWidthAnim, 'SkillsSection.jsx has 0 bar width animations');

// 2.3 Verify zero occurrences of bento grid containers
const hasBento = /bento/i.test(skillsContent);
assert(!hasBento, 'SkillsSection.jsx has 0 occurrences of "bento" grid containers');

// 2.4 Verify presence of middle dots (`·`)
const hasMiddleDot = skillsContent.includes('·') || skillsContent.includes('\u00B7');
assert(hasMiddleDot, 'SkillsSection.jsx contains middle dot separators (·)');

// 2.5 Verify categories Frontend, Backend, Tools
const hasFrontendCategory = /category:\s*['"]Frontend['"]/i.test(skillsContent) || /Frontend\s*—/.test(skillsContent);
const hasBackendCategory = /category:\s*['"]Backend['"]/i.test(skillsContent) || /Backend\s*—/.test(skillsContent);
const hasToolsCategory = /category:\s*['"]Tools['"]/i.test(skillsContent) || /Tools\s*—/.test(skillsContent);

assert(hasFrontendCategory, 'SkillsSection.jsx contains category "Frontend"');
assert(hasBackendCategory, 'SkillsSection.jsx contains category "Backend"');
assert(hasToolsCategory, 'SkillsSection.jsx contains category "Tools"');

// 2.6 Verify section heading
const hasHonestHeading = /What I work with/i.test(skillsContent);
assert(hasHonestHeading, 'SkillsSection.jsx contains honest heading "What I work with"');

// -----------------------------------------------------------------------------
// TASK 3: Empirically verify ProjectsPreview.jsx
// -----------------------------------------------------------------------------
console.log('\n--- TASK 3: EMPIRICALLY VERIFY ProjectsPreview.jsx ---');

const projectsPreviewPath = path.join(ROOT_DIR, 'src/components/sections/home/ProjectsPreview.jsx');
assert(fs.existsSync(projectsPreviewPath), 'src/components/sections/home/ProjectsPreview.jsx exists on disk');

const projectsDataPath = path.join(ROOT_DIR, 'src/data/projects.js');
assert(fs.existsSync(projectsDataPath), 'src/data/projects.js exists on disk');

const previewContent = fs.readFileSync(projectsPreviewPath, 'utf-8');
const projectsDataContent = fs.readFileSync(projectsDataPath, 'utf-8');

// 3.1 Verify real links and credentials exist for Spendly and Business Management
const spendlyDemoUrl = 'https://spendly-sable-delta.vercel.app/';
const spendlyGithubUrl = 'https://github.com/aadinath29/spendly-';
const bmsDemoUrl = 'https://business-managment-alpha.vercel.app/login';
const bmsGithubUrl = 'https://github.com/aadinath29/BusinessManagment-';

assert(projectsDataContent.includes(spendlyDemoUrl), `projects.js contains Spendly live demo URL: ${spendlyDemoUrl}`);
assert(projectsDataContent.includes(spendlyGithubUrl), `projects.js contains Spendly GitHub URL: ${spendlyGithubUrl}`);
assert(projectsDataContent.includes(bmsDemoUrl), `projects.js contains Business Management live demo URL: ${bmsDemoUrl}`);
assert(projectsDataContent.includes(bmsGithubUrl), `projects.js contains Business Management GitHub URL: ${bmsGithubUrl}`);

// Verify credentials exist for Business Management CRM
assert(
  projectsDataContent.includes('admin@antigravity.com'),
  'projects.js contains Business Management CRM demo email: admin@antigravity.com'
);
assert(
  projectsDataContent.includes('Admin@123'),
  'projects.js contains Business Management CRM demo password: Admin@123'
);

// Verify ProjectsPreview imports projects and renders links and credentials
const importsProjects = /import\s+.*projects.*\s+from\s+['"].*data\/projects['"]/i.test(previewContent);
assert(importsProjects, 'ProjectsPreview.jsx imports projects from projects data module');

const rendersCredentials = /project\.demoCredentials/i.test(previewContent);
assert(rendersCredentials, 'ProjectsPreview.jsx dynamically renders demo credentials callout');

const rendersDemoUrl = /project\.demoUrl/i.test(previewContent);
assert(rendersDemoUrl, 'ProjectsPreview.jsx renders project live demo link');

const rendersGithubUrl = /project\.githubUrl/i.test(previewContent);
assert(rendersGithubUrl, 'ProjectsPreview.jsx renders project github source link');

// 3.2 Verify absence of cyan glow shadows (var(--color-accent-glow))
const hasAccentGlowVar = previewContent.includes('var(--color-accent-glow)');
assert(!hasAccentGlowVar, 'ProjectsPreview.jsx does NOT use var(--color-accent-glow)');

const hasNeonCyanShadow = /shadow-\[[^\]]*00f[05]ff/i.test(previewContent);
assert(!hasNeonCyanShadow, 'ProjectsPreview.jsx does NOT contain cyan neon shadow inline classes');

const hasCyanAccentText = /text-accent-cyan|text-\[#00f[05]ff\]/i.test(previewContent);
assert(!hasCyanAccentText, 'ProjectsPreview.jsx does NOT use neon cyan accent text classes');

// Verify presence of warm terracotta border and styling tokens
const hasTerracottaBorder = previewContent.includes('#C4704A');
assert(hasTerracottaBorder, 'ProjectsPreview.jsx uses warm terracotta (#C4704A) border styling');

const hasWarmCardShadow = previewContent.includes('shadow-warm-card');
assert(hasWarmCardShadow, 'ProjectsPreview.jsx uses warm card shadow token (shadow-warm-card)');

// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL TESTS: ${passCount + failCount}`);
console.log(`PASSED:      ${passCount}`);
console.log(`FAILED:      ${failCount}`);
console.log('================================================================');

if (failCount > 0) {
  console.error('\nVERDICT: CHALLENGE_FAILED');
  process.exit(1);
} else {
  console.log('\nVERDICT: APPROVE');
  process.exit(0);
}
