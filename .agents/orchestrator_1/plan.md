# Orchestration Plan — Aadinath Magar Portfolio Website

## Phase 0: Survey & Requirements Mapping
1. Dispatch 3 parallel survey agents:
   - Explorer 1 (`teamwork_preview_explorer`): Survey workspace repository state, existing files, package.json, installed dependencies, build configs.
   - Spec Miner (`teamwork_preview_spec_miner`): Extract and enumerate all functional and design requirements from `ORIGINAL_REQUEST.md` (R1-R5, all 5 pages, animations, polish, styling, constraints).
   - Explorer 2 (`teamwork_preview_explorer`): Technical feasibility and dependency graph analysis (Three.js/R3F compatibility, GSAP ScrollTrigger, Lenis integration, EmailJS setup, Tailwind configuration).
2. Collect findings, synthesize into `PROJECT.md` (Feature Inventory, Milestones, Architecture, Interface Contracts, Code Layout).

## Phase 1: Dual Track Decomposition & Launch
1. **E2E Testing Track**:
   - Establish `TEST_INFRA.md`.
   - Implement opaque-box automated test harness / scripts verifying routes, DOM elements, responsive viewports, builds, assets, and functionality.
   - Signal completion with `TEST_READY.md`.
2. **Implementation Track**:
   - **Milestone 1**: Project Foundation & Architecture (Vite + React + Tailwind + React Router v6 + dependencies + folder structure).
   - **Milestone 2**: Visual Design System & System Polish (Color tokens, Playfair Display/Inter typography, dark/light theme toggle, A.M. preloader, custom cursor, scroll progress, sticky nav).
   - **Milestone 3**: Core Pages Content & Routing (Home, About, Projects with Spendly/Business Management, Blog cards, Contact with EmailJS).
   - **Milestone 4**: 3D Graphics & Motion Interactivity (R3F hero particles/geometry with Suspense skeleton, Lenis smooth scroll, portrait 3D tilt, SVG drawing timeline, curtain page transitions).
   - **Milestone 5**: Full E2E Test Suite Validation, Hardening & Deployment Readiness (`vercel.json`, `npm run build` dist validation, responsive checks).

## Phase 2: Iteration Loop per Milestone
For each milestone:
1. Explorer analyzes milestone scope.
2. Worker implements code, runs builds & tests, reports results. (Mandatory integrity warning included).
3. 2 Reviewers independently verify correctness, completeness, and interface compliance.
4. 2 Challengers adversarially test and stress edge cases.
5. 1 Forensic Auditor verifies zero cheating / facades.
6. Gate check: strict AND across all verdicts.

## Phase 3: Final Acceptance & Victory
1. Confirm all acceptance criteria met:
   - `npm run dev` clean
   - `npm run build` succeeds generating `dist/`
   - All 5 routes render cleanly
   - All interactive and polish items functioning
   - Responsive at 375px, 768px, 1280px
   - Real developer data and live links active
2. Send final victory report to parent caller.
