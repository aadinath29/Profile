# Scope: Milestone 3 (M3-R) — Home Page Redesign & Ambient 3D

## Architecture
Home page components and ambient 3D canvas for the editorial/warm-industrial portfolio redesign:
- `src/pages/HomePage.jsx`: Clean composition rendering only HeroSection, SkillsSection, and ProjectsPreview.
- `src/components/sections/home/HeroSection.jsx`: 60/40 editorial hero layout with GSAP character reveal, portrait placeholder, and background ambient 3D canvas container.
- `src/components/sections/home/SkillsSection.jsx`: Typography-only category list with middle dots and GSAP clip reveal.
- `src/components/sections/home/ProjectsPreview.jsx`: Minimalist teaser cards with terracotta borders and direct routing.
- `src/components/3d/HeroCanvas.jsx`: Ambient Canvas tucked non-intrusively into background corner, pointer-events-none, subdued opacity.
- `src/components/3d/HeroGeometry.jsx`: Slow gentle rotating wireframe in warm terracotta (#C4704A) at 20-30% opacity.
- `src/components/3d/ParticleField.jsx`: Ambient dust/star particles with warm terracotta tint.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---|---|---|---|
| R3 | Editorial Hero Section | 60/40 split layout, char-by-char GSAP reveal with jitter (+-0.01s), exact subtext & CTAs, 3:4 portrait placeholder | M3-R | ORIGINAL_REQUEST §2026-09-10T16:14:41Z |
| R6 | Ambient 3D Demotion | Demote 3D canvas to ambient background element (opacity ~30%, warm lighting, terracotta wireframe, particles) | M3-R | ORIGINAL_REQUEST §2026-09-10T16:14:41Z |
| R8 | Typography-only Skills | "What I work with", Frontend, Backend, Tools with middle dots (`·`), GSAP staggered reveal, remove ticker/bars | M3-R | ORIGINAL_REQUEST §2026-09-10T16:14:41Z |
| R9 | Purge Generic Sections | Remove StatsSection, GlobeSection, TestimonialsSection from HomePage render | M3-R | ORIGINAL_REQUEST §2026-09-10T16:14:41Z |
| R-Teaser | Projects Preview Teaser | Clean cards with terracotta borders, no neon glow, real Spendly & Business Management links | M3-R | ORIGINAL_REQUEST & Survey 2 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| M3-R | Home Page Redesign & Ambient 3D | All 7 files implemented, verified with build & review gates | M1-R design tokens | DONE |

## Interface Contracts
- `HomePage.jsx` imports `HeroSection`, `SkillsSection`, `ProjectsPreview` from `./components/sections/home/`.
- `HeroSection.jsx` imports `HeroCanvas` from `../3d/HeroCanvas`.
- `HeroCanvas.jsx` renders `HeroGeometry` and `ParticleField` inside a responsive React Three Fiber `Canvas`.
- All styling uses Tailwind classes conforming to palette (bg-neutral-950, text-stone-100, border-stone-800, terracotta #C4704A / text-accent-terracotta).

## Blueprints
- `C:\Users\Dell\Desktop\Profile\.agents\explorer_redesign_survey_2\handoff.md`
- `C:\Users\Dell\Desktop\Profile\.agents\explorer_redesign_survey_3\handoff.md`
