# Dispatch: Explorer M1-1 (Toolchain, Bundler & Config Specifications)

- **Working Directory**: `c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_1`
- **Role**: Codebase & Configuration Explorer
- **Authoritative Request**: `c:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md`
- **Project Index**: `c:\Users\Dell\Desktop\Profile\PROJECT.md`
- **Milestone Scope**: `c:\Users\Dell\Desktop\Profile\.agents\sub_orch_m1\SCOPE.md`
- **Architectural Reference**: `c:\Users\Dell\Desktop\Profile\.agents\teamwork_preview_explorer_survey_2\handoff.md`

## Objective
Analyze and specify the exact configurations, toolchains, and dependency manifests for Milestone 1:
1. `package.json`: Specify exact pinned versions for React 18.3.1, react-dom 18.3.1, react-router-dom 6.28.0, three 0.169.0, @react-three/fiber 8.17.10, @react-three/drei 9.117.0, gsap 3.12.5, lenis 1.1.18, framer-motion 11.11.11, @emailjs/browser 4.4.1, lucide-react 0.454.0, vite 5.4.10, tailwindcss 3.4.14, postcss 8.4.47, autoprefixer 10.4.20, and dev types.
2. `vite.config.js`: Detailed configuration with `@vitejs/plugin-react` and chunk splitting optimization if needed.
3. `tailwind.config.js`: Full configuration with `darkMode: 'class'`, custom color variables (`var(--color-bg)`, `var(--color-surface)`, `var(--color-accent-cyan)`, `var(--color-accent-gold)`, etc.), Playfair Display and Inter font families.
4. `postcss.config.js`: Autoprefixer and Tailwind integration.
5. `vercel.json`: Single-Page Application rewrite rules `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.
6. `index.html`: Preconnect for Google Fonts (Playfair Display + Inter) and synchronous inline script in `<head>` for anti-FOUC dark mode persistence (`localStorage.getItem('am_portfolio_theme')`).

Output your concrete specifications and implementation guide in `c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_1\handoff.md`.
Do NOT write or modify application source code files yourself.

## 2026-09-09T18:36:39Z
You are Explorer M1-1 (Toolchain, Bundler & Config Specifications).
Your working directory is: c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_1
You MUST read:
1. c:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md (Authoritative request - read before starting)
2. c:\Users\Dell\Desktop\Profile\PROJECT.md (Project Index)
3. c:\Users\Dell\Desktop\Profile\.agents\sub_orch_m1\SCOPE.md (Milestone 1 Scope)
4. c:\Users\Dell\Desktop\Profile\.agents\teamwork_preview_explorer_survey_2\handoff.md (Architectural reference)
5. c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_1\DISPATCH.md (Your specific task assignment)

Analyze the toolchain, bundler, and configuration requirements for Milestone 1.
Formulate the exact configuration file contents:
- package.json with exact compatible versions (React 18.3.1, Vite 5.4.10, Tailwind 3.4.14, PostCSS, Autoprefixer, three 0.169.0, R3F 8.17.10, drei 9.117.0, gsap 3.12.5, lenis 1.1.18, framer-motion 11.11.11, emailjs 4.4.1, lucide-react 0.454.0)
- vite.config.js
- tailwind.config.js (darkMode: 'class', custom CSS variable color tokens, fonts)
- postcss.config.js
- vercel.json (SPA rewrites rule)
- index.html (anti-FOUC theme script + Google Fonts Playfair Display & Inter)

Write your complete analysis and specification report to c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_1\handoff.md.
Do NOT write or modify application source code files directly.
