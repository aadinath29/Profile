# Milestone 1 Handoff Report: Directory Structure, Assets & Routing Shell Specifications
**Agent**: Explorer M1-2 (`explorer_m1_2`)  
**Parent**: Sub-Orchestrator M1 (`sub_orch_m1` / `37a2caa7-a416-4400-a5d8-c1269558039a`)  
**Date**: 2026-09-10T00:10:00+05:30 (UTC: 2026-09-09T18:40:00Z)  
**Target Path**: `c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_2\handoff.md`  

---

## 1. Observation

### 1.1 Direct File System & Workspace Inspection
1. **Project Root Asset**:
   - Inspected `c:\Users\Dell\Desktop\Profile` via `list_dir`.
   - Verified that `Aadi_Resume-04-09-2026.pdf` exists directly in the project root with exact size **63,741 bytes** (verified via `list_dir: sizeBytes: "63741"`).
   - Currently, neither `public/` nor `src/` exists yet.
2. **System Runtimes**:
   - Node.js runtime: `v24.11.1` (observed via `node -v`).
   - PowerShell with .NET runtime: `System.Drawing` is fully loaded and functional on this Windows 11 host (verified via test execution of `[System.Drawing.Bitmap]` generating a valid 29,435 byte JPEG).
3. **Authoritative Contracts & Requirements**:
   - `ORIGINAL_REQUEST.md § R1`: "React Router v6 for multi-page routing (Home, About, Projects, Blog, Contact)... Folder structure must be component-based — each section and animation is independently modifiable."
   - `ORIGINAL_REQUEST.md § R3`: Requires `/`, `/about`, `/projects`, `/blog`, `/contact` routes.
   - `ORIGINAL_REQUEST.md § R4 & R5`: Monogram "AM" or "A.M.", placeholder portrait at `/public/portrait-placeholder.jpg`, clean Vite `dist/` build deployable to Vercel with zero config, and `vercel.json` SPA rewrite rules.
   - `PROJECT.md § Code Layout`: Defines a strict 17-folder hierarchy under `src/` and `public/`.
   - `PROJECT.md § Interface Contracts`: Specifies developer resume served at `"/Aadi_Resume-04-09-2026.pdf"` and data contracts in `src/data/`.
   - `sub_orch_m1/SCOPE.md`: Milestone 1 tasks M1.2 (Public Assets & Folder Layout) and M1.4 (Initial Routing Shell & Build Verification).

---

## 2. Logic Chain

1. **Directory Structure Completeness (Observation 1.3 -> Step 1)**:
   - *Reasoning*: If only the root folders are created in Milestone 1, Milestones 2, 3, and 4 will require ad-hoc directory creation, risking inconsistent naming, divergent import paths, and build breaks.
   - *Deduction*: Milestone 1 Worker must scaffold the complete directory tree matching `PROJECT.md § Code Layout` immediately.
2. **Asset Path Consistency (Observation 1.1 & 1.3 -> Step 2)**:
   - *Reasoning*: Vite serves static assets in `public/` at the root URL path (`/`). `Aadi_Resume-04-09-2026.pdf` must be copied from root to `public/Aadi_Resume-04-09-2026.pdf` so it can be accessed directly at `/Aadi_Resume-04-09-2026.pdf` (which matches `developer.resumeUrl` in `src/data/developer.js`).
   - *Deduction*: Copying the binary resume to `public/` and creating `public/favicon.svg` and `public/portrait-placeholder.jpg` satisfies all asset requirements and ensures zero 404 requests.
3. **Zero-Warning Initial Routing Shell (Observation 1.3 -> Step 3)**:
   - *Reasoning*: If `App.jsx` mounts routes to missing page components, Rollup bundling fails during `npm run build`.
   - *Deduction*: The Worker must create minimal, functional page components in `src/pages/` for all 6 routes (`/`, `/about`, `/projects`, `/blog`, `/contact`, `*`) that import and render real developer data from `src/data/developer.js`.
4. **Styling & Theming Foundation (Observation 1.3 -> Step 4)**:
   - *Reasoning*: `tailwind.config.js` maps colors to CSS variables (`var(--color-bg)`, `var(--color-text-primary)`, etc.). Without their definitions in `src/styles/index.css`, Tailwind utility classes will fail to resolve color values.
   - *Deduction*: `src/styles/index.css` must define both `:root` and `.dark` variable blocks with exact hex/rgba values, import Google Fonts (`Playfair Display` and `Inter`), and apply global resets.
5. **Static Deployment Guarantee (Observation 1.3 -> Step 5)**:
   - *Reasoning*: Single-page applications built with Vite copy all files from `public/` to `dist/` during `npm run build`.
   - *Deduction*: With `vercel.json` configuring SPA rewrites, any route reloaded on Vercel serves `/index.html`, and all assets in `dist/` are accessible with HTTP 200.

---

## 3. Caveats

1. **Read-Only Explorer Constraint**: This report contains specifications and exact code snippets. In accordance with the Teamwork Explorer protocol, no application source code or public assets were written outside `.agents/explorer_m1_2`.
2. **Component Granularity Across Milestones**: Milestone 1 creates the directory tree and initial page shells. Advanced sections (such as 3D Canvas, Lenis smooth scroll ticker, and cursor tracking) will be implemented in Milestones 2, 3, and 4.
3. **Image Placeholder**: `portrait-placeholder.jpg` is a temporary visual placeholder. A code comment `// Replace portrait-placeholder.jpg with Aadi's real photo` must be placed in `AboutPage.jsx`.

---

## 4. Conclusion & Implementation Specifications

### 4.1 Specification 1: Directory Tree Creation

The Worker must execute the following PowerShell command (or Node.js script) to generate the full directory tree matching `PROJECT.md § Code Layout`:

```powershell
New-Item -ItemType Directory -Force -Path `
  public, `
  src/assets, `
  src/components/3d, `
  src/components/common, `
  src/components/layout, `
  src/components/ui, `
  src/components/sections/home, `
  src/components/sections/about, `
  src/components/sections/projects, `
  src/components/sections/blog, `
  src/components/sections/contact, `
  src/context, `
  src/data, `
  src/hooks, `
  src/pages, `
  src/styles
```

#### Directory Role Map:
| Directory | Target Role & Contents |
|---|---|
| `public/` | Unbundled static assets (`favicon.svg`, `portrait-placeholder.jpg`, `Aadi_Resume-04-09-2026.pdf`). |
| `src/assets/` | Bundled vector icons, logos, brand marks. |
| `src/components/3d/` | R3F 3D canvas, geometry, particle field, and Suspense fallback skeleton. |
| `src/components/common/` | Reusable global primitives (`CustomCursor`, `Preloader`, `ScrollProgressBar`, `PageCurtain`, `ErrorBoundary`). |
| `src/components/layout/` | Frame components (`Navbar`, `MobileMenu`, `Footer`, `Layout`). |
| `src/components/ui/` | Design system atoms (`Button`, `SectionHeading`, `BentoCard`, `MarqueeTicker`, `ThemeToggle`). |
| `src/components/sections/home/` | Page sections for Home (`HeroSection`, `StatsSection`, `SkillsSection`, `ProjectsPreview`, `TestimonialsSection`). |
| `src/components/sections/about/` | Page sections for About (`AboutHero`, `DepthPortrait`, `BioNarrative`, `ExperienceTimeline`). |
| `src/components/sections/projects/` | Page sections for Projects (`ProjectCard`, `ProjectsGrid`). |
| `src/components/sections/blog/` | Page sections for Blog (`BlogCard`). |
| `src/components/sections/contact/` | Page sections for Contact (`ContactForm`, `ContactInfo`). |
| `src/context/` | React Context providers (`ThemeContext.jsx`, `CursorContext.jsx`). |
| `src/data/` | Authentic data modules (`developer.js`, `projects.js`, `skills.js`, `timeline.js`, `blogPosts.js`). |
| `src/hooks/` | Custom hooks (`useLenis.js`, `useScrollTrigger.js`). |
| `src/pages/` | Multi-page route components (`HomePage.jsx`, `AboutPage.jsx`, `ProjectsPage.jsx`, `BlogPage.jsx`, `ContactPage.jsx`, `NotFoundPage.jsx`). |
| `src/styles/` | Global CSS styling (`index.css`, `animations.css`). |

---

### 4.2 Specification 2: Public Assets Handling

#### Asset A: Resume PDF Replication
- **Source**: `C:\Users\Dell\Desktop\Profile\Aadi_Resume-04-09-2026.pdf` (63,741 bytes)
- **Target**: `C:\Users\Dell\Desktop\Profile\public\Aadi_Resume-04-09-2026.pdf`
- **Replication Command**:
  ```powershell
  Copy-Item -Path ".\Aadi_Resume-04-09-2026.pdf" -Destination ".\public\Aadi_Resume-04-09-2026.pdf" -Force
  ```
- **Integrity Validation**: Verify `(Get-Item .\public\Aadi_Resume-04-09-2026.pdf).Length -eq 63741`.

#### Asset B: Editorial Favicon (`public/favicon.svg`)
The Worker must create `public/favicon.svg` with the following SVG markup:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e131f" />
      <stop offset="100%" stop-color="#07090e" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <!-- Base background with rounded corners -->
  <rect width="64" height="64" rx="14" fill="url(#bgGrad)" stroke="rgba(0, 240, 255, 0.3)" stroke-width="1.5" />
  
  <!-- Subtle inner geometric accent ring -->
  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(251, 191, 36, 0.12)" stroke-width="1" />
  
  <!-- AM Monogram - Editorial Serif Typography & Modern Geometry -->
  <g font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="28" letter-spacing="-1.5" text-anchor="middle" filter="url(#subtleGlow)">
    <text x="32" y="41" fill="url(#accentGrad)">AM</text>
  </g>
  
  <!-- Tiny cyan accent spark dot -->
  <circle cx="51" cy="17" r="2" fill="#00f0ff" />
</svg>
```

#### Asset C: Portrait Placeholder (`public/portrait-placeholder.jpg`)
The Worker can generate a valid, anti-aliased 800x1000 dark navy gradient JPEG using PowerShell's built-in .NET `System.Drawing`:

```powershell
$psScript = @"
Add-Type -AssemblyName System.Drawing
`$width = 800
`$height = 1000
`$bmp = New-Object System.Drawing.Bitmap(`$width, `$height)
`$gfx = [System.Drawing.Graphics]::FromImage(`$bmp)
`$gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

`$rect = New-Object System.Drawing.Rectangle(0, 0, `$width, `$height)
`$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    `$rect,
    [System.Drawing.ColorTranslator]::FromHtml('#0e131f'),
    [System.Drawing.ColorTranslator]::FromHtml('#07090e'),
    45.0
)
`$gfx.FillRectangle(`$brush, `$rect)

`$fontSerif = New-Object System.Drawing.Font('Georgia', 32, [System.Drawing.FontStyle]::Bold)
`$fontSans = New-Object System.Drawing.Font('Arial', 14, [System.Drawing.FontStyle]::Regular)
`$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#f8fafc'))
`$accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#00f0ff'))

`$format = New-Object System.Drawing.StringFormat
`$format.Alignment = [System.Drawing.StringAlignment]::Center
`$format.LineAlignment = [System.Drawing.StringAlignment]::Center

`$gfx.DrawString('Aadinath Magar', `$fontSerif, `$textBrush, (`$width / 2), (`$height / 2 - 30), `$format)
`$gfx.DrawString('DEVELOPER PORTRAIT PLACEHOLDER', `$fontSans, `$accentBrush, (`$width / 2), (`$height / 2 + 30), `$format)

`$bmp.Save('.\public\portrait-placeholder.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
`$gfx.Dispose()
`$bmp.Dispose()
"@
Set-Content -Path ".\generate_placeholder.ps1" -Value $psScript
powershell -File ".\generate_placeholder.ps1"
Remove-Item -Path ".\generate_placeholder.ps1" -Force
```

Alternatively, the Worker can execute a single Node.js command writing a valid base64-encoded JPEG directly:
```javascript
// Node one-liner if PowerShell is restricted:
node -e "const fs = require('fs'); const sampleB64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA='; fs.writeFileSync('public/portrait-placeholder.jpg', Buffer.from(sampleB64, 'base64'));"
```

---

### 4.3 Specification 3: Core Entry Points & Routing Shell

#### 1. `src/main.jsx`
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

#### 2. `src/App.jsx`
```jsx
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent-cyan selection:text-black">
      {/* Sticky Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-accent-cyan hover:text-accent-gold transition-colors">
            A—M
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'text-accent-cyan border-b-2 border-accent-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-text-muted bg-surface/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Aadinath Magar ("Aadi"). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/aadinath29" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/aadinath-magar-profile" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
              LinkedIn
            </a>
            <a href="/Aadi_Resume-04-09-2026.pdf" target="_blank" rel="noreferrer" className="text-accent-gold hover:underline">
              Resume (PDF)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

#### 3. Minimal Functional Page Shells (`src/pages/*.jsx`)
These shells import authentic data from `src/data/` to ensure zero compilation or module resolution errors:

##### `src/pages/HomePage.jsx`
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import developer from '../data/developer';
import projects from '../data/projects';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      {/* Hero Shell */}
      <section className="text-center py-12 space-y-6">
        <div className="inline-block px-3 py-1 text-xs font-mono tracking-widest text-accent-cyan bg-accent-cyan/10 rounded-full border border-accent-cyan/20">
          PORTFOLIO & PROFILE
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-serif text-text-primary tracking-tight">
          {developer.name}
        </h1>
        <p className="text-xl md:text-2xl text-accent-gold font-medium">
          {developer.title}
        </p>
        <p className="max-w-2xl mx-auto text-text-secondary leading-relaxed">
          {developer.bio}
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <a
            href={developer.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded bg-accent-cyan text-black font-semibold hover:bg-opacity-90 transition-all"
          >
            Download Resume
          </a>
          <Link
            to="/projects"
            className="px-6 py-3 rounded border border-border text-text-primary hover:border-accent-cyan transition-all"
          >
            View Projects
          </Link>
        </div>
      </section>

      {/* Stats Shell */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border">
        {developer.stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-3xl md:text-4xl font-bold font-serif text-accent-cyan">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-xs uppercase tracking-wider text-text-muted mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Projects Teaser Shell */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold text-text-primary">Featured Work</h2>
            <p className="text-sm text-text-muted">Real-world production applications</p>
          </div>
          <Link to="/projects" className="text-sm text-accent-cyan hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map((proj) => (
            <div key={proj.id} className="p-6 rounded-lg border border-border bg-surface/50 space-y-4">
              <h3 className="text-xl font-bold font-serif text-text-primary">{proj.title}</h3>
              <p className="text-sm text-text-secondary">{proj.description}</p>
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-surface rounded text-accent-gold border border-border">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm pt-2">
                <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="text-accent-cyan hover:underline">
                  Live Demo ↗
                </a>
                <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-primary">
                  GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

##### `src/pages/AboutPage.jsx`
```jsx
import React from 'react';
import developer from '../data/developer';
import { timelineItems } from '../data/timeline';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-text-primary">
          Full-Stack Developer. Builder. Problem Solver.
        </h1>
        <p className="text-lg text-accent-cyan">
          {developer.tagline}
        </p>
      </section>

      {/* Portrait & Bio Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="relative rounded-xl overflow-hidden border border-border bg-surface aspect-[4/5]">
          {/* Replace portrait-placeholder.jpg with Aadi's real photo */}
          <img
            src="/portrait-placeholder.jpg"
            alt={`${developer.name} portrait`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-text-primary">Biography</h2>
          <p className="text-text-secondary leading-relaxed whitespace-pre-line">
            {developer.bio}
          </p>
          <div className="pt-4 space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">Education</h3>
            <p className="text-base text-text-primary font-medium">
              Bharati Vidyapeeth College of Engineering (BVCOE), Navi Mumbai
            </p>
            <p className="text-sm text-text-secondary">
              B.E. in Information Technology (2021 – 2025)
            </p>
          </div>
        </div>
      </section>

      {/* Experience & Timeline Shell */}
      <section className="space-y-8 border-t border-border pt-12">
        <h2 className="text-3xl font-serif font-bold text-text-primary">Timeline & Experience</h2>
        <div className="space-y-6">
          {timelineItems.map((item) => (
            <div key={item.id} className="p-6 rounded-lg border border-border bg-surface/40 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-accent-gold">
                <span>{item.period}</span>
                <span className="uppercase px-2 py-0.5 rounded bg-surface border border-border">{item.type}</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary">{item.role} · {item.organization}</h3>
              <p className="text-sm text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

##### `src/pages/ProjectsPage.jsx`
```jsx
import React from 'react';
import projects from '../data/projects';

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-text-primary">
          Selected Projects
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          A showcase of full-stack web applications, REST API architectures, and enterprise solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <div key={proj.id} className="p-8 rounded-xl border border-border bg-surface flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-serif font-bold text-text-primary">{proj.title}</h2>
                {proj.isPlaceholder && (
                  <span className="text-xs font-mono text-accent-gold px-2 py-1 bg-accent-gold/10 rounded">
                    Upcoming
                  </span>
                )}
              </div>
              <p className="text-xs uppercase tracking-wider text-accent-cyan font-mono">{proj.subtitle}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{proj.description}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {proj.tech.map((t, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 bg-surface-subtle text-text-primary rounded border border-border">
                    {t}
                  </span>
                ))}
              </div>

              {proj.demoCredentials && (
                <div className="text-xs font-mono p-3 bg-surface-subtle border border-border rounded text-text-muted">
                  <p>Demo Login: <span className="text-text-primary">{proj.demoCredentials.email}</span></p>
                  <p>Password: <span className="text-text-primary">{proj.demoCredentials.password}</span></p>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4 border-t border-border text-sm">
              {proj.demoUrl && (
                <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="text-accent-cyan font-medium hover:underline">
                  Live Demo ↗
                </a>
              )}
              {proj.githubUrl && (
                <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-primary">
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

##### `src/pages/BlogPage.jsx`
```jsx
import React from 'react';
import blogPosts from '../data/blogPosts';

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-text-primary">
          Engineering Insights
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Architectural reflections, performance optimization patterns, and modern full-stack development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="p-8 rounded-xl border border-border bg-surface space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-text-muted">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary hover:text-accent-cyan transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="text-xs px-2 py-0.5 rounded bg-surface-subtle text-accent-gold border border-border">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

##### `src/pages/ContactPage.jsx`
```jsx
import React, { useState } from 'react';
import developer from '../data/developer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // EmailJS integration wired in Milestone 3
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-text-primary">
          Let's Build Something
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Available for software engineering roles, full-stack development, and technical consulting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8 p-8 rounded-xl border border-border bg-surface">
          <h2 className="text-2xl font-serif font-bold text-text-primary">Direct Contact</h2>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-xs uppercase tracking-wider text-text-muted block">Email</span>
              <a href={developer.socialLinks.find(s => s.name === 'Email')?.url || `mailto:${developer.email}`} className="text-accent-cyan hover:underline">
                {developer.email}
              </a>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-text-muted block">Phone</span>
              <a href={developer.socialLinks.find(s => s.name === 'Phone')?.url || `tel:${developer.phone}`} className="text-text-primary hover:text-accent-cyan">
                {developer.phone}
              </a>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-text-muted block">Location</span>
              <span className="text-text-secondary">{developer.location}</span>
            </div>
          </div>
          <div className="pt-4 border-t border-border flex gap-4">
            <a href={developer.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded border border-border text-sm hover:border-accent-cyan">
              GitHub Profile
            </a>
            <a href={developer.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 rounded border border-border text-sm hover:border-accent-cyan">
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Form Shell */}
        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl border border-border bg-surface">
          <h2 className="text-2xl font-serif font-bold text-text-primary">Send a Message</h2>
          {submitted ? (
            <div className="p-4 rounded bg-accent-cyan/10 border border-accent-cyan text-accent-cyan text-sm">
              Thank you! Your message inquiry has been recorded.
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text-muted mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-surface-subtle border border-border text-text-primary focus:outline-none focus:border-accent-cyan"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text-muted mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-surface-subtle border border-border text-text-primary focus:outline-none focus:border-accent-cyan"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text-muted mb-2">Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-surface-subtle border border-border text-text-primary focus:outline-none focus:border-accent-cyan"
                  placeholder="Discussing a new project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded bg-accent-cyan text-black font-semibold hover:bg-opacity-90 transition-all"
              >
                Send Message
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
```

##### `src/pages/NotFoundPage.jsx`
```jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-6">
      <div className="text-8xl font-serif font-bold text-accent-cyan">404</div>
      <h1 className="text-3xl font-serif font-bold text-text-primary">Page Not Found</h1>
      <p className="text-text-secondary max-w-md">
        The route you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded bg-accent-cyan text-black font-semibold hover:bg-opacity-90 transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
```

#### 4. `src/styles/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-subtle: #f1f5f9;
  --color-border: rgba(15, 23, 42, 0.12);
  --color-text-primary: #0a0e1a;
  --color-text-secondary: #334155;
  --color-text-muted: #64748b;
  --color-accent-cyan: #0284c7;
  --color-accent-gold: #d97706;
  --color-accent-glow: rgba(2, 132, 199, 0.25);
}

.dark {
  --color-bg: #07090e;
  --color-surface: #0e131f;
  --color-surface-subtle: #141b2d;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-accent-cyan: #00f0ff;
  --color-accent-gold: #fbbf24;
  --color-accent-glow: rgba(0, 240, 255, 0.35);
}

/* Base Body Resets */
body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Editorial Typography */
h1, h2, h3, h4, .font-serif {
  font-family: 'Playfair Display', Georgia, serif;
}

/* Custom Selection Highlight */
::selection {
  background-color: #00f0ff;
  color: #000000;
}
```

---

## 5. Verification Method

### 5.1 Independent Directory Structure Check
Run in PowerShell:
```powershell
Get-ChildItem -Directory -Recurse src | Select-Object FullName
```
**Verification Target**: Every single folder specified in Section 4.1 exists without typos.

### 5.2 Independent Asset Integrity Verification
Run in PowerShell:
```powershell
# 1. Check Resume PDF existence and size
$pdf = Get-Item "public\Aadi_Resume-04-09-2026.pdf"
Write-Output "PDF Size: $($pdf.Length) (Expected: 63741)"
if ($pdf.Length -ne 63741) { throw "Resume PDF corrupted or truncated!" }

# 2. Check Favicon SVG
if (-not (Test-Path "public\favicon.svg")) { throw "Missing favicon.svg!" }

# 3. Check Portrait Placeholder JPG
$jpg = Get-Item "public\portrait-placeholder.jpg"
Write-Output "Placeholder JPG Size: $($jpg.Length)"
if ($jpg.Length -le 0) { throw "Placeholder JPG is empty!" }
```

### 5.3 Independent Vite Build & Dist Generation Test
Once Milestone 1 scaffolding is written by the Worker:
```powershell
npm run build
```
**Verification Target**:
1. Vite exits with code `0`.
2. `dist/` contains:
   - `dist/index.html`
   - `dist/favicon.svg`
   - `dist/Aadi_Resume-04-09-2026.pdf`
   - `dist/portrait-placeholder.jpg`
   - `dist/assets/index-[hash].js`
   - `dist/assets/index-[hash].css`
3. Zero unresolved import warnings or missing asset references.

### 5.4 Invalidation Conditions
- Any route component missing an export or import.
- `Aadi_Resume-04-09-2026.pdf` missing from `public/` or not matching 63,741 bytes.
- CSS color variable names in `tailwind.config.js` not matching `src/styles/index.css`.
