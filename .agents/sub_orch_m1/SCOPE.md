# Scope: Milestone 1 — Tech Stack Foundation & Architecture

## Architecture
- **Bundler & Framework**: Vite 5.4.10 + React 18.3.1
- **Styling**: Tailwind CSS 3.4.14 + PostCSS + Autoprefixer
- **Dependencies**:
  - Production: `react` ^18.3.1, `react-dom` ^18.3.1, `react-router-dom` ^6.28.0, `three` ^0.169.0, `@react-three/fiber` ^8.17.10, `@react-three/drei` ^9.117.0, `gsap` ^3.12.5, `lenis` ^1.1.18, `framer-motion` ^11.11.11, `@emailjs/browser` ^4.4.1, `lucide-react` ^0.454.0
  - Dev: `vite` ^5.4.10, `@vitejs/plugin-react` ^4.3.3, `tailwindcss` ^3.4.14, `postcss` ^8.4.47, `autoprefixer` ^10.4.20, `@types/react` ^18.3.12, `@types/react-dom` ^18.3.1, `@types/three` ^0.169.0
- **Configuration**:
  - `vite.config.js`: React plugin, `@` alias to `./src`, Rollup `manualChunks` vendor splitting
  - `tailwind.config.js`: `darkMode: 'class'`, custom CSS variable tokens for colors (background, surface, surface-subtle, border, text-primary, text-secondary, text-muted, accent-cyan, accent-gold, accent-glow), Playfair Display serif & Inter sans fonts
  - `postcss.config.js`: tailwindcss, autoprefixer
  - `vercel.json`: SPA rewrites `[{ "source": "/(.*)", "destination": "/index.html" }]`
- **Layout & Structure**: Complete 17-folder tree per `PROJECT.md § Code Layout`
- **Public Assets**: `Aadi_Resume-04-09-2026.pdf` (63,741 bytes) copied to `public/`, `favicon.svg` (monogram AM), `portrait-placeholder.jpg`
- **Data Layer**:
  - `src/data/developer.js`: Authentic bio, links, stats, contact
  - `src/data/projects.js`: Spendly, Business Management (real links and info), placeholder
  - `src/data/skills.js`: Frontend, Backend, Database, Tools, marquee ticker
  - `src/data/timeline.js`: Education, internship, BVCOE
  - `src/data/blogPosts.js`: 4 realistic placeholder articles
- **Router Scaffolding**:
  - `src/App.jsx` and `src/main.jsx`: Mounting `/`, `/about`, `/projects`, `/blog`, `/contact`, and `*` cleanly.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Real Developer Profile & Data | Structured data module containing Aadinath Magar's contact info, bio, stats, education, and internships | M1 | Resume & Request |
| 2 | Project Scaffolding & Dependencies | Vite, React 18, Tailwind, Router v6, Three.js, R3F, Lenis, GSAP, Framer Motion, EmailJS, Lucide | M1 | R1 |
| 3 | Single-Page App Vercel Config | `vercel.json` with rewrite rules to `/index.html` | M1 | R5 |
| 4 | Asset Setup & Resume Integration | Resume PDF in `public/` and favicon/placeholder definitions | M1 | R1, R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1.1 | Project Scaffolding & Dependencies | package.json, vite.config.js, tailwind.config.js, postcss.config.js, vercel.json, index.html | none | DONE |
| M1.2 | Public Assets & Folder Layout | public/ assets, src/ layout directories | M1.1 | DONE |
| M1.3 | Authentic Data Modules | src/data/*.js | M1.1 | DONE |
| M1.4 | Initial Routing Shell & Build Verification | src/App.jsx, src/main.jsx, src/styles/index.css, dist/ build verification | M1.1, M1.2, M1.3 | DONE |

## Gate Result
- **Iteration 1**: **PASS** (Worker build exit code 0, Reviewer 1 APPROVE, Reviewer 2 APPROVE, Challenger 1 APPROVE, Challenger 2 APPROVE, Auditor CLEAN).
