/**
 * Static Code, Config, and Asset Verifier
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

import fs from 'node:fs';
import path from 'node:path';

export class StaticAnalyzer {
  constructor(projectRoot = process.cwd()) {
    this.root = projectRoot;
  }

  fileExists(relativePath) {
    return fs.existsSync(path.resolve(this.root, relativePath));
  }

  readFile(relativePath) {
    const fullPath = path.resolve(this.root, relativePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${relativePath}`);
    }
    return fs.readFileSync(fullPath, 'utf-8');
  }

  readJson(relativePath) {
    const content = this.readFile(relativePath);
    return JSON.parse(content);
  }

  verifyVercelConfig() {
    if (!this.fileExists('vercel.json')) {
      return { exists: false, hasSPARewrites: false, raw: null };
    }
    const content = this.readFile('vercel.json');
    try {
      const json = JSON.parse(content);
      const hasSPA =
        Array.isArray(json.rewrites) &&
        json.rewrites.some(
          (r) =>
            (r.source === '/(.*)' || r.source === '/(.*)?' || r.source === '/:path*') &&
            r.destination === '/index.html'
        );
      return {
        exists: true,
        hasSPARewrites: hasSPA,
        raw: json
      };
    } catch (e) {
      return { exists: true, hasSPARewrites: false, error: e.message };
    }
  }

  verifyTailwindConfig() {
    if (!this.fileExists('tailwind.config.js')) {
      return { exists: false };
    }
    const content = this.readFile('tailwind.config.js');
    const cssContent = this.fileExists('src/styles/index.css')
      ? this.readFile('src/styles/index.css')
      : '';

    return {
      exists: true,
      hasDarkModeClass:
        content.includes("darkMode: 'class'") ||
        content.includes('darkMode: "class"') ||
        content.includes("darkMode: ['class'"),
      hasCyanToken:
        content.includes('#00f0ff') ||
        content.includes('cyan') ||
        cssContent.includes('#00f0ff'),
      hasGoldToken:
        content.includes('#fbbf24') ||
        content.includes('gold') ||
        cssContent.includes('#fbbf24'),
      hasDarkNavyToken:
        content.includes('#0e131f') ||
        content.includes('#07090e') ||
        content.includes('navy') ||
        cssContent.includes('#0e131f') ||
        cssContent.includes('#07090e'),
      hasSerifFont:
        content.includes('Playfair Display') ||
        content.includes('Cormorant') ||
        content.includes('serif'),
      hasSansFont:
        content.includes('Inter') ||
        content.includes('Geist') ||
        content.includes('sans')
    };
  }

  verifyPublicAssets() {
    const publicResume = path.resolve(this.root, 'public/Aadi_Resume-04-09-2026.pdf');
    const rootResume = path.resolve(this.root, 'Aadi_Resume-04-09-2026.pdf');
    const resumePath = fs.existsSync(publicResume) ? publicResume : rootResume;

    const faviconPath = path.resolve(this.root, 'public/favicon.svg');
    const resumeStats = fs.existsSync(resumePath) ? fs.statSync(resumePath) : null;
    const faviconStats = fs.existsSync(faviconPath) ? fs.statSync(faviconPath) : null;

    return {
      resumeExists: Boolean(resumeStats && resumeStats.size > 1000),
      resumeSize: resumeStats ? resumeStats.size : 0,
      faviconExists: Boolean(faviconStats && faviconStats.size > 0),
      publicResumeExists: fs.existsSync(publicResume)
    };
  }

  verifyIndexHtml() {
    if (!this.fileExists('index.html')) {
      return { exists: false };
    }
    const html = this.readFile('index.html');
    return {
      exists: true,
      hasFontsPreconnect:
        html.includes('fonts.googleapis.com') && html.includes('fonts.gstatic.com'),
      hasGoogleFontsLink:
        html.includes('Playfair+Display') || html.includes('Inter'),
      hasFaviconLink: html.includes('favicon.svg'),
      hasAntiFOUCScript:
        html.includes('am_portfolio_theme') || html.includes('localStorage.getItem'),
      hasMainModuleScript:
        html.includes('src="/src/main.jsx"') || html.includes("src='/src/main.jsx'") || html.includes('type="module"')
    };
  }

  verifyDistBuild() {
    const distPath = path.resolve(this.root, 'dist');
    if (!fs.existsSync(distPath)) {
      return { exists: false, hasIndex: false, assets: [] };
    }
    const hasIndex = fs.existsSync(path.join(distPath, 'index.html'));
    const assetsDir = path.join(distPath, 'assets');
    const assets = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
    return {
      exists: true,
      hasIndex,
      assets,
      hasJs: assets.some((f) => f.endsWith('.js')),
      hasCss: assets.some((f) => f.endsWith('.css'))
    };
  }
}
