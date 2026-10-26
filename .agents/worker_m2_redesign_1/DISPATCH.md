## 2026-09-10T16:47:00Z
You are the Worker implementing Milestone 2 (M2-R): Navigation, Layout & Minimalist Footer for the visual redesign of Aadinath Magar's portfolio website.

Your working directory for metadata is: C:\Users\Dell\Desktop\Profile\.agents\worker_m2_redesign_1
Your parent sub-orchestrator conversation ID is: 44f14f83-c18c-47b4-9971-b9edd04eb1b9

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Context & Source Files:
- Authoritative user request: C:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md (specifically section starting at ## 2026-09-10T16:14:41Z)
- Blueprints: C:\Users\Dell\Desktop\Profile\.agents\explorer_redesign_survey_2\handoff.md

You EXCLUSIVELY own and will modify these files:
1. `src/components/layout/Navbar.jsx`
2. `src/components/layout/MobileMenu.jsx`
3. `src/components/layout/Footer.jsx`
4. `src/components/layout/Layout.jsx`

Detailed Requirements & Blueprint specifications:
1. `src/components/layout/Navbar.jsx`:
   - Follow blueprint in `explorer_redesign_survey_2/handoff.md` Section 4.C.
   - Transparent on page load; on scroll (`scrollY > 80`), transition cleanly to cream `#F5F0E8` (dark: `#141210`) with `backdrop-blur-sm` and border `#EDE8DF` (dark: `#1C1A18`).
   - Logo: "Aadinath" in DM Serif Display (`font-serif text-2xl font-normal tracking-tight text-text-primary hover:text-[#C4704A]`). Remove "A—M" monogram and `/ portfolio` sublabel.
   - Desktop nav links in DM Sans with 2px terracotta underline (`bg-[#C4704A]`) that slides in from left on hover (`origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`). Active link has `scale-x-100`.
   - Simple terracotta outlined button for Resume (`border border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white`).
   - Remove heavy glassmorphism, cyan glows, gold glows, and rolling text effects.

2. `src/components/layout/MobileMenu.jsx`:
   - Clean fullscreen drawer using warm cream / dark background (`bg-[#F5F0E8]/98 dark:bg-[#141210]/98 backdrop-blur-md`).
   - Brand logo in top bar: "Aadinath" in DM Serif Display (`font-serif text-2xl font-bold tracking-tight text-text-primary hover:text-[#C4704A]`).
   - Mobile nav links: DM Serif or DM Sans, active: `text-[#C4704A] font-bold`, inactive: `text-text-primary hover:text-[#C4704A]`.
   - Resume button: Terracotta pill/button (`border border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white`).
   - Social buttons: clean borders with `hover:text-[#C4704A] hover:border-[#C4704A]/60`.
   - Preserve body scroll lock (Lenis stop/start), Escape key listener, and resize listener.
   - Remove all cyan/gold neon styling.

3. `src/components/layout/Footer.jsx`:
   - Follow blueprint in `explorer_redesign_survey_2/handoff.md` Section 4.E.
   - Clean minimal footer on cream background (`bg-background text-text-secondary border-t border-[#EDE8DF] dark:border-[#1C1A18]`).
   - Left: "Aadinath Magar" in DM Serif Display (`font-serif text-2xl sm:text-3xl font-bold tracking-tight text-text-primary`).
   - Subtext: "Built with React & Vite · 2026" in DM Sans (`font-sans text-xs text-text-muted`).
   - Right: GitHub and LinkedIn links in DM Sans with terracotta hover (`text-text-secondary hover:text-[#C4704A] transition-colors`).
   - Remove cyan glow line (`via-accent-cyan/30`), remove multi-column links, remove gold styling.

4. `src/components/layout/Layout.jsx`:
   - Warm selection styling (`selection:bg-[#C4704A]/20 selection:text-text-primary`).
   - Skip-to-main-content focus styling (`focus:bg-[#C4704A] focus:text-white`).
   - Ensure clean wrapper, Lenis scroll coordination, and GSAP ScrollTrigger registration are preserved.

Verification:
- Run `npm run build` and ensure 0 errors, 0 warnings/failures.
- Document all changes, files modified, and build output in `C:\Users\Dell\Desktop\Profile\.agents\worker_m2_redesign_1\handoff.md`.
- Send completion message back to parent conversation ID: `44f14f83-c18c-47b4-9971-b9edd04eb1b9`.
