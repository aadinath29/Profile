## 2026-09-10T22:15:00Z

Parent Orchestrator (def7f648-a41e-41f0-85b2-b54f182addbf) dispatched Milestone 4 (M4-R): Projects & About Pages Redesign.

Scope: Requirements R5, R7, R8.
Owned files:
- `src/pages/ProjectsPage.jsx`
- `src/components/sections/projects/ProjectsGrid.jsx`
- `src/components/sections/projects/ProjectCard.jsx`
- `src/pages/AboutPage.jsx`
- `src/components/sections/about/AboutHero.jsx`
- `src/components/sections/about/BioNarrative.jsx`
- `src/components/sections/about/DepthPortrait.jsx`
- `src/components/sections/about/ExperienceTimeline.jsx`

Key Requirements:
1. Projects Section:
   - Desktop (>=1024px): Full-bleed chapter scroll where each project takes full viewport height, project name in massive DM Serif Display (10vw+), description/tech/credentials/links in right panel, subtle background color shifts (#F5F0E8 -> #EDE8DF -> #E5DFD5), clip away upward on scroll, cursor screenshot thumbnail placeholder on hover with comment `// Replace gradient with project screenshot`.
   - Mobile (<768px): Clean minimal cards with thin terracotta border (1px #C4704A at 30% opacity), no glow, no shadow blur, real Spendly and Business Management data, spring-eased staggered scroll entrance.
   - ProjectCard: Clean up any neon cyan/gold classes, use crisp 1px terracotta borders.
2. About Page:
   - Heading: "About me." in massive DM Serif Display with single-block clip-path reveal (remove word-by-word reveal).
   - 40/60 Layout: Left (40%) = portrait placeholder (warm gradient rectangle, aspect ratio 3:4, rounded corners) with comment `// Replace with Aadi's real photo — keep the same container dimensions`; Right (60%) = exact human bio copy ("I'm Aadinath — a full-stack developer based in India..."), body text in DM Sans, 18px, line-height 1.75, #3D3A36.
   - Timeline: Keep GSAP SVG timeline with ScrollTrigger line draw, restyle SVG path to terracotta #C4704A without neon glow drop-shadow, restyle text to charcoal and quiet node highlights.
