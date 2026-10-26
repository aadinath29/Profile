import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

function readFile(relPath) {
  return fs.readFileSync(path.join(projectRoot, relPath), 'utf-8');
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✕ FAILED: ${message}`);
    failed++;
  }
}

console.log('\n======================================================');
console.log(' SPA ARCHITECTURE & ALIGNMENT VERIFICATION TEST SUITE ');
console.log('======================================================\n');

// 1. Single Page Application Section Anchors
console.log('[Suite 1: Unified SPA Section Architecture]');
const homeSrc = readFile('src/pages/HomePage.jsx');
const heroComponentSrc = readFile('src/components/sections/home/HeroSection.jsx');
const skillsComponentSrc = readFile('src/components/sections/home/SkillsSection.jsx');
const timelineComponentSrc = readFile('src/components/sections/about/ExperienceTimeline.jsx');
const projectsComponentSrc = readFile('src/components/sections/home/ProjectsPreview.jsx');
const focusComponentSrc = readFile('src/components/sections/home/CurrentFocusSection.jsx');

assert(homeSrc.includes('<HeroSection') && heroComponentSrc.includes('id="hero"'), 'Hero Section (#hero) rendered and anchored');
assert(homeSrc.includes('id="about"') && homeSrc.includes('<DepthPortrait') && homeSrc.includes('<BioNarrative'), 'About Section (#about) rendered and anchored');
assert(homeSrc.includes('<SkillsSection') && skillsComponentSrc.includes('id="skills"'), 'Skills Section (#skills) rendered and anchored');
assert(homeSrc.includes('<ExperienceTimeline') && timelineComponentSrc.includes('id="experience"'), 'Experience Section (#experience) rendered and anchored');
assert(homeSrc.includes('<ProjectsPreview') && projectsComponentSrc.includes('id="projects"'), 'Featured Projects Section (#projects) rendered and anchored');
assert(homeSrc.includes('<CurrentFocusSection') && focusComponentSrc.includes('id="focus"'), 'Current Focus Section (#focus) rendered and anchored');
assert(homeSrc.includes('id="contact"') && homeSrc.includes('<ContactForm') && homeSrc.includes('<ContactInfo'), 'Direct Contact Section (#contact) rendered and anchored');

// 2. Navigation & Scrollspy Integration
console.log('\n[Suite 2: Navbar & Scrollspy Integration]');
const navSrc = readFile('src/components/layout/Navbar.jsx');
assert(navSrc.includes("href: '#hero'"), 'Navbar links include #hero anchor');
assert(navSrc.includes("href: '#about'"), 'Navbar links include #about anchor');
assert(navSrc.includes("href: '#skills'"), 'Navbar links include #skills anchor');
assert(navSrc.includes("href: '#experience'"), 'Navbar links include #experience anchor');
assert(navSrc.includes("href: '#projects'"), 'Navbar links include #projects anchor');
assert(navSrc.includes("href: '#focus'"), 'Navbar links include #focus anchor');
assert(navSrc.includes("href: '#contact'"), 'Navbar links include #contact anchor');
assert(navSrc.includes('activeSection'), 'Navbar tracks active section for Scrollspy');
assert(navSrc.includes('window.__lenis.scrollTo'), 'Navbar utilizes Lenis smooth scrolling with offset');
assert(navSrc.includes('group-hover:-translate-y-full'), 'Navbar contains kinetic text hover reveal');

// 3. Mobile Menu Anchor Navigation
console.log('\n[Suite 3: Mobile Menu Anchor Navigation]');
const mobSrc = readFile('src/components/layout/MobileMenu.jsx');
assert(mobSrc.includes('targetId'), 'MobileMenu resolves target section IDs');
assert(mobSrc.includes('window.__lenis.scrollTo'), 'MobileMenu executes smooth scroll to target section');
assert(mobSrc.includes("document.body.style.overflow = 'hidden'"), 'MobileMenu retains body scroll lock contract');

// 4. Layout Container Consistency (Unified max-w-6xl grid)
console.log('\n[Suite 4: Standardized max-w-6xl Grid Alignment]');
assert(homeSrc.includes('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'), 'HomePage strictly standardized on max-w-6xl container');
const aboutSrc = readFile('src/pages/AboutPage.jsx');
assert(aboutSrc.includes('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'), 'AboutPage container aligned to max-w-6xl');
const projSrc = readFile('src/pages/ProjectsPage.jsx');
assert(projSrc.includes('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'), 'ProjectsPage container aligned to max-w-6xl');
const blogSrc = readFile('src/pages/BlogPage.jsx');
assert(blogSrc.includes('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'), 'BlogPage container aligned to max-w-6xl');
const contactPageSrc = readFile('src/pages/ContactPage.jsx');
assert(contactPageSrc.includes('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'), 'ContactPage container aligned to max-w-6xl');

// 5. Overflow & Boundary Hardening
console.log('\n[Suite 5: Component Overflow & Text Clamping Guards]');
const cssSrc = readFile('src/styles/index.css');
assert(cssSrc.includes('overflow-x: hidden'), 'Global body reset enforces overflow-x: hidden');

assert(heroComponentSrc.includes('overflow-hidden') && heroComponentSrc.includes('HeroCanvas'), 'Hero 3D ambient canvas bounded by overflow-hidden');
assert(heroComponentSrc.includes('clamp('), 'Hero headline uses responsive font size clamping');

assert(timelineComponentSrc.includes('overflow-hidden break-words'), 'Experience timeline cards enforce overflow-hidden break-words');

assert(projectsComponentSrc.includes('overflow-hidden break-words'), 'Projects preview cards enforce overflow-hidden break-words');
assert(projectsComponentSrc.includes('break-all'), 'Project demo credentials box enforces break-all');

const contactInfoSrc = readFile('src/components/sections/contact/ContactInfo.jsx');
assert(contactInfoSrc.includes('break-all'), 'Contact email direct channel enforces break-all');
assert(contactInfoSrc.includes('min-w-0 flex-1 overflow-hidden'), 'Contact info direct channel items protect flex layout from overflow');

console.log('\n------------------------------------------------------');
console.log(`Results: ${passed} Passed | ${failed} Failed`);
console.log('------------------------------------------------------\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✔ All SPA Alignment & Integrity Assertions Verified Successfully!\n');
}
