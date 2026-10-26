# Scope: Milestone 2 (M2-R) — Navigation, Layout & Minimalist Footer

## Architecture
- Presentation / Layout layer of Aadinath Magar's portfolio website.
- Coordination with Lenis smooth scroll, GSAP ScrollTrigger, route transitions, and responsive navigation drawer.

## Feature Inventory
| # | Feature | Description | Milestone | Status | Source |
|---|---------|-------------|-----------|--------|--------|
| R4 | Minimal Navbar & MobileMenu | Transparent -> 80px cream scroll transition, DM Serif Aadinath logo, DM Sans links with 2px terracotta underline, terracotta outline Resume button, fullscreen mobile menu | M2-R | DONE | ORIGINAL_REQUEST.md §2026-09-10T16:14:41Z |
| R8 | Quiet Physics & Layout Coordination | 60/40 visual balance, quiet easing, Lenis synchronization, WCAG skip link, warm selection styles | M2-R | DONE | ORIGINAL_REQUEST.md §2026-09-10T16:14:41Z |
| R10 | Minimalist Editorial Footer | Clean cream footer, DM Serif Aadinath Magar, DM Sans GitHub + LinkedIn with terracotta hover, Built with React & Vite · 2026, no cyan glow line | M2-R | DONE | ORIGINAL_REQUEST.md §2026-09-10T16:14:41Z |

## Exclusively Owned Files
- src/components/layout/Navbar.jsx
- src/components/layout/MobileMenu.jsx
- src/components/layout/Footer.jsx
- src/components/layout/Layout.jsx

## Verification Gates
1. Worker build passes (
pm run build). [PASS]
2. Two independent Reviewers approve. [PASS: reviewer_1 & reviewer_2]
3. Two independent Challengers approve. [PASS: challenger_1 & challenger_2]
4. Forensic Auditor approves (CLEAN integrity verdict). [PASS: auditor_1 - Exit code 0]
