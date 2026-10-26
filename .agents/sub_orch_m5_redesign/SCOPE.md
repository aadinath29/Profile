# Scope: Milestone 5 (M5-R) — Full Build, Routes & Visual E2E Verification & Forensic Audit

## Milestone Overview
Milestone 5 (M5-R) provides end-to-end verification, production build confirmation, full route validation, visual audit against requirements R1–R11, adversarial stress testing, and forensic code integrity auditing for the visual redesign of Aadinath Magar's portfolio website.

## Scope of Verification
1. **Production Build & Compilation**:
   - `npm run build` passes with exit code 0.
   - Zero syntax, bundler, or asset errors.
   - Build output verified in `dist/` (assets, js chunks, index.html).
2. **Route Integrity (All 5 Routes)**:
   - `/` (HomePage): Hero, Skills, ProjectsPreview, quiet physics, warm editorial theme.
   - `/about` (AboutPage): "About me." clip reveal, 40/60 layout, 3:4 portrait placeholder, authentic bio copy, restyled GSAP SVG timeline.
   - `/projects` (ProjectsPage): Desktop full-bleed chapter scroll, mobile minimal cards, real Spendly and Business Management data.
   - `/blog` (BlogPage): Clean layout, warm theme, responsive cards, no broken components.
   - `/contact` (ContactPage): Contact form, social links, warm theme, no broken layout.
   - `*` (404 catch-all): Graceful fallback.
3. **Visual Acceptance Criteria (R1–R11)**:
   - **R1 Theme & Palette**: Cream `#F5F0E8` base, surface `#EDE8DF`, charcoal `#1C1A18`, terracotta `#C4704A` sole accent, dark mode `#141210`. Zero neon cyan / electric blue / gold gradients.
   - **R2 Typography**: DM Serif Display for headings, DM Sans for body text, JetBrains Mono for accent/labels/code.
   - **R3 Hero**: 60/40 layout, warm portrait placeholder (3:4 aspect ratio), ambient R3F background (subdued terracotta), char-by-char H1 jitter reveal, exact copy ("I build things for the web.").
   - **R4 Navbar**: Cream background transition on 80px scroll, DM Serif "Aadinath" logo, terracotta underline hover, clean mobile menu.
   - **R5 Projects**: Desktop chapter scroll with sticky viewport sections, mobile minimal cards with 1px terracotta border, real Spendly & CRM links.
   - **R6 Skills**: "What I work with" typography-only list, no bento grid, no progress bars.
   - **R7 About**: "About me." single clip-path reveal, 40/60 layout, human bio copy, terracotta SVG timeline.
   - **R8 Quiet Physics & Curtain**: Spring entrance, physical hover states, cream `#F5F0E8` PageCurtain wipe.
   - **R9 Omissions**: Marquee ticker, stat counters, bento grid, GlobeSection, testimonials removed from render.
   - **R10 Footer**: "Aadinath Magar" in DM Serif, DM Sans GitHub/LinkedIn, "Built with React & Vite · 2026", terracotta hover.
   - **R11 Preloader**: Cream `#F5F0E8` background, charcoal `#1C1A18` text, "A.M." DM Serif monogram.
4. **Adversarial & Forensic Verification**:
   - Viewport scaling (mobile 375px, tablet 768px, desktop 1280px+).
   - Theme switching consistency (light/dark mode toggle and persistence).
   - Forensic integrity audit: Zero cheating, zero hardcoded test facades, authentic logic.
