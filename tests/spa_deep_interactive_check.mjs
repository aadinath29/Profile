import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

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

console.log('\n=============================================================');
console.log(' DEEP COMPONENT, ASSET & INTERACTION INTEGRITY VERIFICATION ');
console.log('=============================================================\n');

// 1. Developer Data Integrity
console.log('[Check 1: Developer Personal & Social Data Integrity]');
import('../src/data/developer.js').then(async (devMod) => {
  const dev = devMod.developer;
  assert(dev.name === 'Aadinath Magar', 'Developer name is strictly "Aadinath Magar"');
  assert(dev.title === 'Full-Stack Developer', 'Developer title is "Full-Stack Developer"');
  assert(dev.email === 'aadinathbmagar75@gmail.com', 'Email is verified: aadinathbmagar75@gmail.com');
  assert(dev.phone === '+91 92090 17621', 'Phone is verified: +91 92090 17621');
  assert(dev.github === 'https://github.com/aadinath29', 'GitHub URL is verified: https://github.com/aadinath29');
  assert(dev.linkedin === 'https://www.linkedin.com/in/aadinath-magar-profile', 'LinkedIn profile URL verified');
  assert(dev.bio.includes('MERN') && dev.bio.includes('Full-Stack Developer'), 'Bio includes MERN stack and Full-Stack Developer');

  // 2. Production Projects Data & Credentials
  console.log('\n[Check 2: Production Projects & Live Demo Credentials]');
  const projMod = await import('../src/data/projects.js');
  const projects = projMod.projects;
  assert(projects.length >= 2, `Projects collection contains ${projects.length} defined entries`);

  const spendly = projects.find((p) => p.id === 'spendly');
  assert(spendly && spendly.demoUrl === 'https://spendly-sable-delta.vercel.app/', 'Spendly live demo URL verified');
  assert(spendly && spendly.githubUrl === 'https://github.com/aadinath29/spendly-', 'Spendly GitHub repository URL verified');

  const crm = projects.find((p) => p.id === 'business-management');
  assert(crm && crm.demoUrl === 'https://business-managment-alpha.vercel.app/login', 'CRM live demo URL verified');
  assert(crm && crm.githubUrl === 'https://github.com/aadinath29/BusinessManagment-', 'CRM GitHub repository URL verified');
  assert(crm && crm.demoCredentials?.email === 'admin@antigravity.com', 'CRM demo login email verified (admin@antigravity.com)');
  assert(crm && crm.demoCredentials?.password === 'Admin@123', 'CRM demo login password verified (Admin@123)');

  // 3. Timeline & Education Verification
  console.log('\n[Check 3: Timeline & Education Verification]');
  const timeMod = await import('../src/data/timeline.js');
  const timeline = timeMod.timeline;
  assert(timeline.length >= 2, `Timeline contains ${timeline.length} verified milestone nodes`);
  const college = timeline.find((t) => t.organization.includes('Bharati Vidyapeeth') || t.organization.includes('BVCOE'));
  assert(Boolean(college), 'BVCOE College education record verified in timeline');

  // 4. Physical Asset Files Verification
  console.log('\n[Check 4: Static Public Assets Physical Existence]');
  assert(fs.existsSync(path.join(projectRoot, 'public/Aadi_Resume-04-09-2026.pdf')), 'Resume PDF exists in public directory');
  assert(fs.existsSync(path.join(projectRoot, 'public/favicon.svg')), 'Favicon SVG exists in public directory');

  // 5. Anti-FOUC Theme Script in index.html
  console.log('\n[Check 5: Anti-FOUC Synchronous Theme Initialization]');
  const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf-8');
  assert(indexHtml.includes('am_portfolio_theme'), 'Synchronous anti-FOUC theme script reads am_portfolio_theme key');
  assert(indexHtml.includes('classList.add(\'dark\')'), 'Anti-FOUC script applies dark class on html root element');

  // 6. Lenis Smooth Scroll & GSAP Sync Contract
  console.log('\n[Check 6: Lenis Smooth Scroll & GSAP Coordination Contract]');
  const layoutSrc = fs.readFileSync(path.join(projectRoot, 'src/components/layout/Layout.jsx'), 'utf-8');
  assert(layoutSrc.includes('lenis.on(\'scroll\', ScrollTrigger.update)'), 'Lenis scroll pipes to GSAP ScrollTrigger');
  assert(layoutSrc.includes('gsap.ticker.add'), 'GSAP ticker drives Lenis animation frame');
  assert(layoutSrc.includes('gsap.ticker.lagSmoothing(0)'), 'Zero lag smoothing applied to prevent scroll drift');
  assert(layoutSrc.includes('location.hash'), 'Layout coordinates initial hash scroll restoration');

  console.log('\n-------------------------------------------------------------');
  console.log(`Results: ${passed} Passed | ${failed} Failed`);
  console.log('-------------------------------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('✔ All 20 Deep Integrity Checks Passed With 100% Accuracy!\n');
  }
});
