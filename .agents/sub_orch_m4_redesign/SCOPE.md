# Scope: Milestone 4 (M4-R) — Projects & About Pages Redesign

## Architecture & Responsibilities
This milestone implements the visual and architectural redesign for the Projects subsystem and the About subsystem of Aadinath Magar's portfolio website.

## Status: DONE
All 8 owned files implemented, independently reviewed by 2 Reviewers, empirically challenged by 2 Challengers, audited as CLEAN by 1 Forensic Auditor, and passed the gate check.

## Owned Files
Exclusively owned by M4-R:
- `src/pages/ProjectsPage.jsx` [DONE]
- `src/components/sections/projects/ProjectsGrid.jsx` [DONE]
- `src/components/sections/projects/ProjectCard.jsx` [DONE]
- `src/pages/AboutPage.jsx` [DONE]
- `src/components/sections/about/AboutHero.jsx` [DONE]
- `src/components/sections/about/BioNarrative.jsx` [DONE]
- `src/components/sections/about/DepthPortrait.jsx` [DONE]
- `src/components/sections/about/ExperienceTimeline.jsx` [DONE]

## Feature Requirements Verification
1. **Projects Section (R5)**:
   - Desktop chapter scroll (>=1024px) with massive DM Serif Display titles (10.5vw), right panel with narrative, highlights, credentials, and links.
   - Background shifts (#F5F0E8 -> #EDE8DF -> #E5DFD5 / dark mode counterparts).
   - Floating screenshot thumbnail placeholder with verbatim comment `// Replace gradient with project screenshot`.
   - Mobile minimal cards with crisp 1px terracotta border (`border-[#C4704A]/30`), no glow, spring-eased scroll entrance.
   - Zero neon cyan/gold classes.
2. **About Page (R7)**:
   - Heading: "About me." in DM Serif Display with single-block clip-path reveal.
   - 40/60 Layout: Left (40%) = 3:4 warm gradient portrait placeholder with comment `// Replace with Aadi's real photo — keep the same container dimensions`; Right (60%) = verbatim human bio copy in DM Sans 18px / 1.75 line-height / #3D3A36.
   - Timeline: GSAP SVG timeline with ScrollTrigger progressive line draw in terracotta #C4704A without neon glow drop-shadow, quiet pin nodes, charcoal text.
3. **Integrity & Security**:
   - Clean audit: 0 dummy/mocked logic.
   - Security: 100% external links enforce `rel="noopener noreferrer"`.
   - Clean build: `npm run build` passes with exit code 0.
