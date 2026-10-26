# Dispatch: Explorer M1-2 (Directory Structure, Assets & Routing Shell Specifications)

- **Working Directory**: `c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_2`
- **Role**: Architecture & Layout Explorer
- **Authoritative Request**: `c:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md`
- **Project Index**: `c:\Users\Dell\Desktop\Profile\PROJECT.md`
- **Milestone Scope**: `c:\Users\Dell\Desktop\Profile\.agents\sub_orch_m1\SCOPE.md`

## Objective
Analyze and specify the exact directory structure, asset handling, and initial routing shell for Milestone 1:
1. Directory Structure: Full tree per `PROJECT.md § Code Layout` ensuring every directory under `src/components/` (`3d`, `common`, `layout`, `ui`, `sections`), `src/context/`, `src/data/`, `src/hooks/`, `src/pages/`, `src/styles/` is mapped out.
2. `public/` assets: Instructions for copying `Aadi_Resume-04-09-2026.pdf` from project root to `public/`, generating an editorial SVG favicon (`public/favicon.svg`) with the "AM" monogram, and creating placeholder image definitions (`public/portrait-placeholder.jpg`).
3. Core Entry Points:
   - `src/main.jsx`: React 18 createRoot mounting `BrowserRouter` and `App`.
   - `src/App.jsx`: Setting up React Router v6 routes (`/`, `/about`, `/projects`, `/blog`, `/contact`, and `*`) with shell placeholder views or lazy components, ready for page transitions.
   - `src/styles/index.css`: Global CSS variables for `:root` and `.dark` palettes, font declarations, and basic reset.
4. Build sanity & deployment check: Verify that `npm run build` will produce `dist/` cleanly without missing file references.

Output your detailed specifications and layout guide in `c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_2\handoff.md`.
Do NOT write or modify application source code files yourself.

## 2026-09-09T18:36:39Z
You are Explorer M1-2 (Directory Structure, Assets & Routing Shell Specifications).
Your working directory is: c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_2
You MUST read:
1. c:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md (Authoritative request - read before starting)
2. c:\Users\Dell\Desktop\Profile\PROJECT.md (Project Index)
3. c:\Users\Dell\Desktop\Profile\.agents\sub_orch_m1\SCOPE.md (Milestone 1 Scope)
4. c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_2\DISPATCH.md (Your specific task assignment)

Analyze the directory layout, public assets, and routing shell requirements for Milestone 1:
- Map out the full directory tree matching PROJECT.md § Code Layout.
- Specify steps for copying public assets (Aadi_Resume-04-09-2026.pdf from project root to public/), creating public/favicon.svg (monogram AM), and public/portrait-placeholder.jpg.
- Specify initial entry files: src/main.jsx, src/App.jsx (mounting routes /, /about, /projects, /blog, /contact, * cleanly), and src/styles/index.css (root and dark color variables, font imports).
- Detail build verification steps for Vite and dist/ generation.

Write your complete analysis and specification report to c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_2\handoff.md.
Do NOT write or modify application source code files directly.
