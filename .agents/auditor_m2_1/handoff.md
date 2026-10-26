# Forensic Audit Report: Milestone 2 (M2-R) — Navigation, Layout & Minimalist Footer

## 1. Observation

Direct code examination, static integrity analysis, regex token validation, and independent production build verification were executed across the four target work products in `C:\Users\Dell\Desktop\Profile`:
- `src/components/layout/Navbar.jsx`
- `src/components/layout/MobileMenu.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/layout/Layout.jsx`

### A. Static Code Inspection & Prohibited Pattern Checks

1. **`src/components/layout/Navbar.jsx`**:
   - Lines 18-31: Authentic lifecycle state and passive scroll listener:
     ```jsx
     const [isScrolled, setIsScrolled] = useState(false);
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

     useEffect(() => {
       const handleScroll = () => {
         const scrollY = window.scrollY || document.documentElement.scrollTop;
         setIsScrolled(scrollY > 80);
       };

       window.addEventListener('scroll', handleScroll, { passive: true });
       handleScroll();

       return () => window.removeEventListener('scroll', handleScroll);
     }, []);
     ```
   - Lines 37-41: Transition on scroll threshold (`scrollY > 80`):
     - Initial load: `h-20 bg-transparent border-b border-transparent`
     - Compact scrolled: `h-16 bg-[#F5F0E8]/95 dark:bg-[#141210]/95 backdrop-blur-sm border-b border-[#EDE8DF] dark:border-[#1C1A18]`
   - Lines 48-51: Logo rendered as `"Aadinath"` in DM Serif Display (`font-serif text-2xl font-normal tracking-tight text-text-primary hover:text-[#C4704A] transition-colors focus:outline-none`). Monogram `A—M` and `/ portfolio` subtitle were completely removed.
   - Lines 72-76: Desktop nav links render a 2px terracotta underline indicator (`bg-[#C4704A] rounded-full transition-transform duration-300 ease-out origin-left`) with `scale-x-0 group-hover:scale-x-100` (active: `scale-x-100`). Dual-span clip-path text rolling effect was removed.
   - Lines 87-94: Resume CTA rendered as simple terracotta outlined button (`border border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white transition-all duration-200`) linking to `developer.resumeUrl || '/Aadi_Resume-04-09-2026.pdf'` with `target="_blank"` and `rel="noopener noreferrer"`.
   - Lines 98-106: Mobile hamburger button maintains accessibility and size: `min-w-[44px] min-h-[44px]`, `aria-expanded={isMobileMenuOpen}`, `aria-controls="mobile-navigation-drawer"`, with borders styled to `#EDE8DF` (dark: `#1C1A18`) and hover `text-[#C4704A]`.

2. **`src/components/layout/MobileMenu.jsx`**:
   - Lines 12-31: Dual-layer body scroll lock with Lenis coordination:
     ```jsx
     useEffect(() => {
       if (isOpen) {
         document.body.style.overflow = 'hidden';
         if (typeof window !== 'undefined' && window.__lenis) {
           window.__lenis.stop();
         }
       } else {
         document.body.style.overflow = '';
         if (typeof window !== 'undefined' && window.__lenis) {
           window.__lenis.start();
         }
       }
       return () => {
         document.body.style.overflow = '';
         if (typeof window !== 'undefined' && window.__lenis) {
           window.__lenis.start();
         }
       };
     }, [isOpen]);
     ```
   - Lines 34-43: Escape key listener with cleanup on unmount.
   - Lines 46-55: Window resize listener auto-closing menu when `window.innerWidth >= 768`.
   - Lines 94-104: Drawer container styled to `bg-[#F5F0E8]/98 dark:bg-[#141210]/98 backdrop-blur-md` with `role="dialog"`, `aria-modal="true"`, `aria-label="Mobile Navigation"`.
   - Lines 107-113: Brand logo renders `"Aadinath"` in DM Serif Display (`font-serif text-2xl font-bold tracking-tight text-text-primary hover:text-[#C4704A]`).
   - Lines 143-155: Active link state styled in `text-[#C4704A] font-bold`, inactive in `text-text-primary hover:text-[#C4704A]`, item separators styled in `#EDE8DF` (dark: `#1C1A18`).
   - Lines 165-209: Availability dot in terracotta `bg-[#C4704A]`, social links with terracotta hover (`hover:text-[#C4704A] hover:border-[#C4704A]/60`), and Resume PDF CTA button styled as terracotta pill (`border border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white`).

3. **`src/components/layout/Footer.jsx`**:
   - Line 8: Border and background: `w-full border-t border-[#EDE8DF] dark:border-[#1C1A18] bg-background text-text-secondary transition-colors duration-300`.
   - Lines 13-18: Left column displays `"Aadinath Magar"` in DM Serif Display (`font-serif text-2xl sm:text-3xl font-bold tracking-tight text-text-primary`) and subtext `"Built with React & Vite · 2026"` in DM Sans (`font-sans text-xs text-text-muted`).
   - Lines 23-39: Right column renders GitHub and LinkedIn links in DM Sans with terracotta hover (`text-text-secondary hover:text-[#C4704A] transition-colors`).
   - Verbatim removal: Ambient cyan glow line (`via-accent-cyan/30`), complex multi-column links, and gold accent styling were completely purged.

4. **`src/components/layout/Layout.jsx`**:
   - Lines 20-56: Full Lenis smooth scrolling initialization, requestAnimationFrame sync via `gsap.ticker.add`, zero lag smoothing guard `gsap.ticker.lagSmoothing(0)`, and full teardown contract on unmount (`gsap.ticker.remove`, `lenis.destroy()`).
   - Lines 59-66: Immediate scroll restoration on route change (`lenis.scrollTo(0, { immediate: true })` / `window.scrollTo(0, 0)` and `ScrollTrigger.refresh()`).
   - Line 71: Selection styles updated to warm terracotta: `selection:bg-[#C4704A]/20 selection:text-text-primary`.
   - Lines 74-79: Skip-to-main-content keyboard accessibility link updated to terracotta focus styling: `focus:bg-[#C4704A] focus:text-white`.
   - Lines 82-97: Clean structural composition wrapping `CustomCursor`, `ScrollProgressBar`, `Navbar`, `<main id="main-content">`, and `Footer`.

### B. Prohibited Token Audit (Regex Scan)

Execution of pattern search across all layout components (`src/components/layout/*`):
- Pattern: `cyan|gold|neon|via-accent`
  - Result: 0 matches found (Exit code 0, empty stdout).
- Pattern: `#C4704A` (terracotta token)
  - Result: 17 matches confirmed across `Footer.jsx`, `Layout.jsx`, `MobileMenu.jsx`, and `Navbar.jsx`.

### C. Independent Build Execution

Direct command execution of `npm run build`:
- Command: `npm run build`
- Working Directory: `C:\Users\Dell\Desktop\Profile`
- Exit code: `0`
- Verbatim Output:
  ```
  > aadinath-magar-portfolio@1.0.0 build
  > vite build

  vite v5.4.21 building for production...
  transforming...
  ✓ 2017 modules transformed.
  rendering chunks...
  computing gzip size...
  dist/index.html                          2.26 kB │ gzip:   0.99 kB
  dist/assets/index-tQI7tWH9.css          48.04 kB │ gzip:   8.31 kB
  dist/assets/HeroCanvas-CLI2uX5M.js       3.48 kB │ gzip:   1.50 kB
  dist/assets/index-BZtyemwH.js          138.49 kB │ gzip:  42.57 kB
  dist/assets/vendor-react-D4sPK0kq.js   161.68 kB │ gzip:  52.78 kB
  dist/assets/vendor-motion-CW2eEwTr.js  205.92 kB │ gzip:  71.29 kB
  dist/assets/vendor-three-CljgXs92.js   816.19 kB │ gzip: 219.47 kB
  ✓ built in 1m 5s
  ```

---

## 2. Logic Chain

1. **Compliance with User Ground-Truth Constraints (`ORIGINAL_REQUEST.md` R1, R2, R4, R10)**:
   - Ground truth specifies replacement of neon cyan and gold gradients with warm cream (`#F5F0E8`), dark brown (`#141210`), and terracotta (`#C4704A`).
   - Observations 1.A.1–1.A.4 and 1.B show that all four layout components have eliminated cyan and gold tokens, and replaced them with the specified palette.
   - Observation 1.A.1 verifies the header compaction threshold (`scrollY > 80`), the DM Serif Display `"Aadinath"` logo, the 2px terracotta underline, and the terracotta outlined resume button per R4.
   - Observation 1.A.3 verifies the minimalist single-row footer, DM Serif `"Aadinath Magar"`, DM Sans `"Built with React & Vite · 2026"`, terracotta hover socials, and absence of the cyan ambient glow line per R10.

2. **Absence of Prohibited Patterns (Integrity Forensics)**:
   - Hardcoded test results: None detected; no mock returns or hardcoded test fixtures exist in the layout components.
   - Facade implementations: None detected; all components implement authentic React state hooks, real DOM event listeners with proper teardowns, and genuine Framer Motion animation variants.
   - Fabricated verification outputs: The worker noted command timeout in its handoff; the auditor independently executed `npm run build` directly and confirmed a clean zero-error exit code and valid bundle generation.
   - Self-certifying tests: No layout code bypasses verification or asserts false passes.
   - Execution delegation: No unauthorized external wrappers or dummy components used.

3. **Runtime & Compilation Health**:
   - Observation 1.C proves that the Vite build pipeline compiles 2017 modules cleanly with 0 errors and produces all required production distribution chunks.

---

## 3. Caveats

No caveats. All four layout components were inspected directly, token usage was verified empirically, and independent production build was executed and verified.

---

## 4. Conclusion & Forensic Audit Report

### Forensic Audit Report

**Work Product**: `src/components/layout/Navbar.jsx`, `src/components/layout/MobileMenu.jsx`, `src/components/layout/Footer.jsx`, `src/components/layout/Layout.jsx`  
**Profile**: General Project  
**Integrity Mode**: Demo (per `ORIGINAL_REQUEST.md`)  
**Verdict**: **CLEAN**

### Phase Results
- **Hardcoded Test Results Check**: PASS — No hardcoded test responses or fake assertions.
- **Facade Implementation Check**: PASS — Authentic React components with genuine logic, lifecycle management, and event teardowns.
- **Fabricated Artifact Detection**: PASS — Production build independently verified.
- **Palette & Visual Token Purge**: PASS — Cyan glow lines, gold gradients, and heavy glassmorphic styles completely eradicated; warm cream, dark brown, and terracotta design tokens authentically applied.
- **Interaction & Accessibility Contracts**: PASS — Header compaction at `scrollY > 80`, `>= 44px` mobile touch targets, ARIA dialog and expanded attributes, dual-layer body scroll lock with Lenis coordination, and keyboard navigation links fully preserved.
- **Build Verification**: PASS — `npm run build` exited with code 0 (`✓ built in 1m 5s`, 2017 modules transformed).

---

## 5. Verification Method

To independently reproduce this forensic audit:

1. **Verify Token Purge in Layout Directory**:
   ```powershell
   Get-ChildItem -Path "src\components\layout\*" -Recurse | Select-String -Pattern "cyan|gold|neon|via-accent"
   ```
   *Expected*: 0 matches.

2. **Verify Terracotta Token Usage**:
   ```powershell
   Get-ChildItem -Path "src\components\layout\*" -Recurse | Select-String -Pattern "#C4704A"
   ```
   *Expected*: 17 matches across the 4 files.

3. **Verify Clean Production Build**:
   ```bash
   npm run build
   ```
   *Expected*: Exit code 0, 0 errors, output generated in `dist/`.
