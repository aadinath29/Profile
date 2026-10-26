# Dispatch: Milestone 2 Sub-Orchestrator (Visual Design System, Navigation & Polish)

- **Working Directory**: `c:\Users\Dell\Desktop\Profile\.agents\sub_orch_m2`
- **Parent Conversation ID**: `c7c1b0d8-e98f-4958-b048-9ec29a6d669b`
- **Milestone**: M2 (Features 5–14 from Feature Inventory in `PROJECT.md`)
- **Authoritative Request**: `c:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md`
- **Project Index**: `c:\Users\Dell\Desktop\Profile\PROJECT.md`
- **M1 Handoff Reference**: `c:\Users\Dell\Desktop\Profile\.agents\sub_orch_m1\handoff.md`
- **Architectural Reference**: `c:\Users\Dell\Desktop\Profile\.agents\teamwork_preview_explorer_survey_2\handoff.md`

## Mission & Instructions
You are the Sub-Orchestrator for **Milestone 2: Visual Design System, Navigation & System Polish**.
Your scope is to implement and verify all visual styling, typography, theme toggling, navigation, and system-level chrome components:

1. Read `ORIGINAL_REQUEST.md`, `PROJECT.md`, and the M1 handoff report.
2. Initialize `SCOPE.md`, `BRIEFING.md`, and `progress.md` in your working directory.
3. Delegate implementation to subagents via iteration loops (Explorer -> Worker -> 2 Reviewers -> 2 Challengers -> 1 Forensic Auditor -> Gate):
   - **Visual Design System & Tokens (Features 5, 6, 7, 8)**:
     - `tailwind.config.js` and `src/styles/index.css`: Dark-primary palette (`#07090e`, `#0e131f`, `#00f0ff`, `#fbbf24`), light palette, and CSS variables.
     - `src/context/ThemeContext.jsx` and `src/components/ui/ThemeToggle.jsx`: Persistent dark/light toggle using `localStorage` ('am_portfolio_theme'), updating `document.documentElement.classList`.
     - Anti-FOUC initialization script in `index.html`.
     - Typography: Playfair Display serif headings with tight negative letter-spacing (`-0.03em`) + Inter sans-serif body text.
   - **Branded Preloader (Feature 9)**:
     - `src/components/common/Preloader.jsx`: Editorial "A.M." monogram in Playfair Display serif, 0% -> 100% animated numerical counter, and curtain slide-up exit revealing page. Shows on initial load and exits cleanly.
   - **High-Performance Custom Cursor (Feature 10)**:
     - `src/context/CursorContext.jsx` and `src/components/common/CustomCursor.jsx`: Dual dot + trailing ring cursor using GSAP `quickTo` for 120fps tracking. Contextual reaction to hover states (scaling up, glow, and showing "View" / "Open" labels on project cards). Automatically suppressed on touch devices (`(hover: none) or (pointer: coarse)`).
   - **Scroll Progress Bar (Feature 11)**:
     - `src/components/common/ScrollProgressBar.jsx`: Fixed horizontal progress bar at top of viewport (2px-3px height, neon cyan/gold gradient) filling 0% -> 100% as user scrolls.
   - **Sticky Navigation & Responsive Mobile Menu (Features 12, 13)**:
     - `src/components/layout/Navbar.jsx`: Fixed glassmorphic header with "A—M" logo, desktop navigation links with clip-path slide reveal on hover, theme toggle, and resume CTA button.
     - `src/components/layout/MobileMenu.jsx`: Fullscreen overlay menu with animated hamburger icon and staggered link entrance.
     - `src/components/layout/Footer.jsx`: Editorial footer with status indicator, copyright, social links, and back-to-top button.
   - **Layout Shell & Lenis Smooth Scroll (Feature 14)**:
     - `src/components/layout/Layout.jsx`: Master layout wrapper mounting Lenis smooth scroll, synchronizing Lenis with GSAP ScrollTrigger ticker (`lagSmoothing(0)`), handling route change scroll reset to top, and rendering CustomCursor, ScrollProgressBar, Navbar, and Footer.
4. Enforce mandatory integrity warning for Workers. Run 2 Reviewers, 2 Challengers, and 1 Forensic Auditor (`teamwork_preview_auditor`).
5. Verify dev starts cleanly with `npm run dev` and build succeeds with `npm run build`.
6. Once gate passes, update status in your handoff and report back to Project Orchestrator via `send_message`.
