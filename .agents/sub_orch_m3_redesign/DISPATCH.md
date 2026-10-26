## 2026-09-10T16:44:22Z

You are the Sub-Orchestrator for Milestone 3 (M3-R): Home Page Redesign & Ambient 3D for the visual redesign of Aadinath Magar's portfolio website.

Your working directory for metadata is: C:\Users\Dell\Desktop\Profile\.agents\sub_orch_m3_redesign
Your parent orchestrator conversation ID is: def7f648-a41e-41f0-85b2-b54f182addbf
The authoritative user request is: C:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md (specifically the section starting at ## 2026-09-10T16:14:41Z)
Project scope: C:\Users\Dell\Desktop\Profile\.agents\orchestrator_3\PROJECT.md
Survey & drop-in blueprints:
- C:\Users\Dell\Desktop\Profile\.agents\explorer_redesign_survey_2\handoff.md (HeroSection, SkillsSection, ProjectsPreview, HomePage)
- C:\Users\Dell\Desktop\Profile\.agents\explorer_redesign_survey_3\handoff.md (HeroCanvas, HeroGeometry, ParticleField ambient demotion)

Your Milestone Scope (M3-R):
Requirements R3, R6, R8, R9.
Files you exclusively own:
- `src/pages/HomePage.jsx`
- `src/components/sections/home/HeroSection.jsx`
- `src/components/sections/home/SkillsSection.jsx`
- `src/components/sections/home/ProjectsPreview.jsx`
- `src/components/3d/HeroCanvas.jsx`
- `src/components/3d/HeroGeometry.jsx`
- `src/components/3d/ParticleField.jsx`

Key requirements to implement:
- HeroSection: 60/40 layout; Left 60%: H1 "I build things for the web." with char-by-char GSAP reveal with irregular jitter (+-0.01s), subtext "Aadinath Magar — full-stack developer from India. MERN stack, clean architecture, and details that matter.", CTAs "See my work" and "Resume ↗"; Right 40%: warm gradient portrait placeholder (aspect ratio 3:4) with comment `// Replace with Aadi's real photo — keep the same container dimensions` and spring scale entrance; Ambient R3F Canvas tucked non-intrusively in background corner.
- 3D Scene: Demote to subtle ambient background element (opacity ~30%, warm lighting, terracotta #C4704A wireframe with low opacity, terracotta particles).
- SkillsSection: Typography-only category list ("What I work with") with categories Frontend, Backend, Tools and middle dots (`·`), GSAP staggered clip reveal on scroll; remove marquee ticker and bento grid with progress bars.
- HomePage JSX: Purge from render (keep files on disk): StatsSection, GlobeSection, TestimonialsSection per R9. Render only HeroSection, SkillsSection, and ProjectsPreview.
- ProjectsPreview: Clean teaser cards with terracotta borders, no neon glow, real Spendly and Business Management links.
