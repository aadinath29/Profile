## 2026-09-10T16:45:16Z

You are the implementation Worker for Milestone 3 (M3-R): Home Page Redesign & Ambient 3D.
Your working directory is: C:\Users\Dell\Desktop\Profile\.agents\worker_m3_redesign
Your parent orchestrator ID is: 61700d27-4837-4c04-b63c-6d0903dbee67

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Context and Blueprints to Read:
1. `C:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md` (specifically the section starting at ## 2026-09-10T16:14:41Z)
2. `C:\Users\Dell\Desktop\Profile\.agents\orchestrator_3\PROJECT.md`
3. `C:\Users\Dell\Desktop\Profile\.agents\explorer_redesign_survey_2\handoff.md` (Contains exact blueprints for HeroSection, SkillsSection, ProjectsPreview, and HomePage)
4. `C:\Users\Dell\Desktop\Profile\.agents\explorer_redesign_survey_3\handoff.md` (Contains blueprints for HeroCanvas, HeroGeometry, and ParticleField ambient demotion)
5. `C:\Users\Dell\Desktop\Profile\.agents\sub_orch_m3_redesign\SCOPE.md`

Files you exclusively own to update:
- `src/pages/HomePage.jsx`
- `src/components/sections/home/HeroSection.jsx`
- `src/components/sections/home/SkillsSection.jsx`
- `src/components/sections/home/ProjectsPreview.jsx`
- `src/components/3d/HeroCanvas.jsx`
- `src/components/3d/HeroGeometry.jsx`
- `src/components/3d/ParticleField.jsx`

Key implementation requirements:
- `HeroSection.jsx`:
  - 60/40 layout (e.g. `lg:grid-cols-12` with 7 cols left / 5 cols right or flex 60/40).
  - Left 60%:
    - H1: "I build things for the web." with char-by-char GSAP reveal with irregular jitter (+-0.01s).
    - Subtext: "Aadinath Magar — full-stack developer from India. MERN stack, clean architecture, and details that matter."
    - CTAs: "See my work" (links to `/projects`) and "Resume ↗" (links to `/resume` or external resume).
  - Right 40%:
    - Warm gradient portrait placeholder with aspect ratio 3:4 (`aspect-[3/4]`), terracotta/warm stone subtle gradient, comment `// Replace with Aadi's real photo — keep the same container dimensions` and GSAP spring scale entrance.
  - Ambient R3F Canvas tucked non-intrusively in background corner (absolute positioned, pointer-events-none, subdued opacity).
- `3D Scene` (`HeroCanvas.jsx`, `HeroGeometry.jsx`, `ParticleField.jsx`):
  - Demote to subtle ambient background element (opacity ~30%, warm lighting, terracotta `#C4704A` wireframe with low opacity, terracotta particles).
  - Inspect `explorer_redesign_survey_3/handoff.md` for exact props, lighting, materials, and canvas configuration.
- `SkillsSection.jsx`:
  - Typography-only category list ("What I work with").
  - Categories: Frontend, Backend, Tools with middle dots (`·`) between skills.
  - GSAP staggered clip/fade reveal on scroll.
  - Remove marquee ticker and bento grid with progress bars.
- `HomePage.jsx`:
  - Purge from render (keep files on disk): StatsSection, GlobeSection, TestimonialsSection per R9.
  - Render only HeroSection, SkillsSection, and ProjectsPreview.
- `ProjectsPreview.jsx`:
  - Clean teaser cards with terracotta borders/accents, no neon glow.
  - Real Spendly and Business Management links/details matching the portfolio.

Verification:
- Run `npm run build` in `c:\Users\Dell\Desktop\Profile` using `run_command`. Ensure build succeeds with exit code 0.
- Document all modified files, changes made, and verification build output in `C:\Users\Dell\Desktop\Profile\.agents\worker_m3_redesign\handoff.md`.
- Send a completion message via `send_message` to parent orchestrator (`61700d27-4837-4c04-b63c-6d0903dbee67`).
