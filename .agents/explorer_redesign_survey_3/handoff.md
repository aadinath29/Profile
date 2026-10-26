# Explorer Redesign Survey 3: Projects, About, 3D Canvas, and Motion Architecture

## 1. Observation

Direct inspection of the codebase revealed the following structural, visual, and test-contract facts:

### A. Projects Subsystem (`src/pages/ProjectsPage.jsx`, `ProjectsGrid.jsx`, `ProjectCard.jsx`, `ProjectsPreview.jsx`)
1. **`src/pages/ProjectsPage.jsx`**:
   - Lines 14-19: Displays a neon badge with `text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20` and `text-accent-gold`.
   - Line 21: Uses font-serif Playfair Display: `<h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-text-primary tracking-tight">Selected Engineering Projects</h1>`.
   - Line 31: Renders `<ProjectsGrid />`.
2. **`src/components/sections/projects/ProjectsGrid.jsx`**:
   - Lines 23-37: Renders category pills ("All Projects", "Shipped Products", "Upcoming Systems") with neon cyan glow: `bg-accent-cyan text-black font-semibold shadow-glow-cyan`.
   - Lines 40-44: Standard 2-column card grid (`grid grid-cols-1 lg:grid-cols-2 gap-8`) mapping over `filteredProjects`. Does not implement full-bleed chapter scroll or viewport-height sections.
3. **`src/components/sections/projects/ProjectCard.jsx`**:
   - Line 19: Uses `hover:border-accent-cyan/40 transition-all duration-300` and project gradient glow.
   - Lines 23-24: Neon gradient backdrop: `bg-gradient-to-br from-accent-cyan/15 via-transparent to-transparent`.
   - Lines 30, 39, 44, 60, 69-85, 110: Relies on `accent-cyan` and `accent-gold` tokens with drop shadows.
   - Line 14: Uses linear/generic cubic ease `[0.16, 1, 0.3, 1]` with uniform card stagger.
4. **`src/components/sections/home/ProjectsPreview.jsx`**:
   - Lines 41, 60: 3-column teaser grid with `hover:border-accent-cyan/50 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--color-accent-glow)]`.
   - Line 77: Pulsing neon cyan dot: `<span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />`.
   - Line 140: Neon cyan link styling: `text-accent-cyan hover:underline`.

### B. About Subsystem (`src/pages/AboutPage.jsx`, `AboutHero.jsx`, `BioNarrative.jsx`, `DepthPortrait.jsx`, `ExperienceTimeline.jsx`)
1. **`src/pages/AboutPage.jsx`**:
   - Lines 9-25: Renders `<AboutHero />`, 12-column grid with `<DepthPortrait />` (col-span-5) and `<BioNarrative />` (col-span-7), followed by `<ExperienceTimeline />`.
2. **`src/components/sections/about/AboutHero.jsx`**:
   - Lines 31, 51-55: Animated word-by-word reveal looping over `developer.aboutHeroWords` (`["Full-Stack", "Developer.", "Builder.", "Problem", "Solver."]`).
   - Lines 39-43: Neon badge: `ARCHITECT • DEVELOPER • MERN` with `text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20`.
   - Line 64: Renders `developer.tagline` in `text-accent-gold`.
3. **`src/components/sections/about/BioNarrative.jsx`**:
   - Lines 14: Renders generic AI-style bio paragraph: `{developer.bio}`.
   - Lines 19-39: Displays two generic corporate cards ("Systems Architecture" and "Academic Rigor") with neon icons and text.
4. **`src/components/sections/about/DepthPortrait.jsx`**:
   - Lines 51-95: Renders 3D perspective tilt on mousemove (`rotateX`, `rotateY`, `radial-gradient` specular glare).
   - Lines 66-71: Displays `<img src="/portrait-placeholder.jpg" ... className="grayscale contrast-125 group-hover:grayscale-0" />`.
   - Lines 86-93: Displays dark vignette with neon cyan location badge (`text-accent-cyan bg-background/80`).
5. **`src/components/sections/about/ExperienceTimeline.jsx`**:
   - Lines 97-101: Renders glowing neon cyan SVG path: `<path ref={pathRef} d="M 8 0 V 2000" stroke="#00f0ff" strokeWidth="2.5" fill="none" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />`.
   - Lines 120-129: Active pin uses `border-accent-cyan bg-background shadow-glow-cyan` with `bg-accent-cyan animate-ping`.
   - Lines 133, 148, 164: Uses `hover:border-accent-cyan/40`, `text-accent-cyan`, and `text-accent-gold`.

### C. 3D Canvas Subsystem (`src/components/3d/HeroCanvas.jsx`, `HeroGeometry.jsx`, `ParticleField.jsx`, `SceneFallback.jsx`, `src/components/sections/home/HeroSection.jsx`)
1. **`src/components/3d/HeroCanvas.jsx`**:
   - Lines 36-41: Scene lights are configured with intense neon cyan (`#00f0ff`) directional key light and gold (`#fbbf24`) point rim light.
2. **`src/components/3d/HeroGeometry.jsx`**:
   - Lines 40-50: Outer mesh is a large Torus Knot with bright cyan wireframe (`color="#00f0ff"`).
   - Lines 52-62: Inner mesh is an icosahedron with neon cyan emissive glow (`emissive="#00f0ff"`).
   - Lines 64-73: Secondary ring with gold accent (`color="#fbbf24"`).
3. **`src/components/3d/ParticleField.jsx`**:
   - Lines 33-41: Points material uses bright cyan points: `color: new THREE.Color('#00f0ff')`, `blending: THREE.AdditiveBlending`.
4. **`src/components/3d/SceneFallback.jsx`**:
   - Lines 6, 16, 19, 22-26, 31-35: Renders pulsing skeleton with `border-accent-cyan/20`, `shadow-glow-cyan`, `A.M.` monogram, and `Initializing 3D Canvas` with `animate-ping`.
5. **`src/components/sections/home/HeroSection.jsx`**:
   - Lines 48-55: Renders lazy-loaded `HeroCanvas` as a full-screen centerpiece behind center-aligned text.

### D. Data Modules (`src/data/projects.js`, `developer.js`, `timeline.js`) & Test Contracts
1. **`src/data/projects.js`**:
   - Contains 3 projects: `spendly`, `business-management`, and `agentic-ai-suite` (isPlaceholder: true).
   - Test contracts: `tests/e2e/tier1/tier1_features_part2.test.js` (lines 327-367) and `part3.test.js` (lines 90-132) verify that `spendly` has `demoUrl: https://spendly-sable-delta.vercel.app/` and `githubUrl: https://github.com/aadinath29/spendly-`, `business-management` has `demoUrl: https://business-managment-alpha.vercel.app/login` and `demoCredentials: { email: 'admin@antigravity.com', password: 'Admin@123' }`, and `highlights.length >= 3`.
2. **`src/data/developer.js`**:
   - Test `tests/e2e/tier1/tier1_features_part3.test.js` (lines 14-28):
     - `T1-F21-01` expects `dev.aboutHeroWords.join(' ')` to contain `'Full-Stack'`, `'Builder'`, and `'Problem'`.
     - `T1-F21-02` expects `dev.bio` to contain `'MERN'` and `'Full-Stack Developer'`.
     - `T2-F21-02` expects `dev.bio.length` to be `> 100` and `< 1000`.
   - Test `tests/e2e/tier4/tier4_scenarios.test.js` (lines 35-40):
     - `T4-JOURNEY-01` expects `dev.stats.length >= 4`, project stat value 2, and application stat value 500.
3. **`tests/e2e/tier2/m3_challenger_verification.test.js`**:
   - Lines 21-55: Verifies static string tokens in `SceneFallback.jsx`: `data-testid="scene-fallback"`, `min-h-[100vh]`, `w-full`, `h-full`, `A.M.`, `font-mono`, `animate-pulse-subtle`, `animate-[spin_18s_linear_infinite]`, `border-dashed`, `Initializing 3D Canvas`, `animate-ping`, `aria-label="Loading 3D Visual Experience"`.
4. **`tests/e2e/tier3/tier3_interactions.test.js`**:
   - Line 43: Verifies that `src/styles/index.css` contains `--color-bg: #f8fafc` and `--color-bg: #07090e`.

---

## 2. Logic Chain

1. **Projects Section Architecture (R5)**:
   - Observation A shows `ProjectsGrid.jsx` is currently a standard 2-column card grid, while `ORIGINAL_REQUEST.md` (lines 462-478) mandates a three-layout / responsive split:
     - On Desktop (`>= 1024px`): Full-bleed chapter scroll where each project takes `h-screen` / `min-h-screen`, title in massive DM Serif Display (`text-[clamp(4.5rem,10vw,12vw)]`), description/tech/links in right panel, subtle background color shifts (`#F5F0E8` -> `#EDE8DF` -> `#E5DFD5`), clips away upward on scroll via Framer Motion, and cursor thumbnail following cursor on hover.
     - On Mobile (`< 768px`): Clean minimal cards with thin terracotta border (`1px solid rgba(196, 112, 74, 0.3)` / `border-[#C4704A]/30`), no glow, no shadow blur, real Spendly and Business Management data with spring-eased staggered scroll entrance (`y: 8px -> 0`, stiffness 260, damping 24).
     - On Tablet (`768px - 1023px`): Clean minimal cards adapting to 1-2 columns.
   - Therefore: `ProjectsGrid.jsx` must support both modes: rendering the full-bleed chapter scroll on desktop (`hidden lg:block`), and rendering the clean minimal cards on mobile/tablet (`lg:hidden block`), or encapsulating the responsive layout cleanly. `ProjectCard.jsx` should be updated to strip all neon cyan/gold glow and use the crisp 1px terracotta border.

2. **Cursor Project Thumbnail Integration**:
   - `ORIGINAL_REQUEST.md` line 471 requires: "Cursor: Show project screenshot thumbnail following cursor on hover (like bramvanvugt) — use a colored gradient div as placeholder, comment: `// Replace gradient with project screenshot`".
   - `CustomCursor.jsx` currently supports variants `'default'`, `'hover'`, `'project'`, and `'hidden'`. In `'project'` mode, it renders a text ring ("View").
   - By enhancing `CustomCursor.jsx` and `CursorContext.jsx` (or pairing with a floating preview in the projects container) to render a floating thumbnail card (e.g. `w-56 h-36 rounded-xl border border-[#C4704A]/40 overflow-hidden shadow-2xl pointer-events-none`) with the warm gradient placeholder, the project achieves Bram Van Vugt's cursor hover signature while retaining full 120fps GSAP `quickTo` cursor tracking and touch suppression.

3. **About Page Architecture (R7)**:
   - Observation B shows `AboutHero.jsx` currently runs a word-by-word animation of `aboutHeroWords` with neon badges and AI tagline. `BioNarrative.jsx` renders AI filler cards. `DepthPortrait.jsx` renders an image tag with a neon badge. `ExperienceTimeline.jsx` renders a glowing `#00f0ff` line.
   - `ORIGINAL_REQUEST.md` (lines 487-506) mandates:
     - Heading: `"About me."` in massive DM Serif Display with clip-path single-block reveal (no word-by-word stagger).
     - 40/60 layout: Left (40%) = portrait placeholder (warm gradient rectangle, aspect ratio 3:4, rounded corners). Right (60%) = exact human bio copy:
       ```
       I'm Aadinath — a full-stack developer based in India.

       I build web applications with the MERN stack: MongoDB, Express, React, and Node.js. I care about code that works, interfaces that don't get in the way, and projects I can actually be proud of.

       Right now I'm looking for full-time roles where I can contribute from day one.
       ```
     - Body text: DM Sans, 18px, line-height 1.75, `#3D3A36` (dark mode `#EDE8DF`).
     - Timeline: Retain GSAP SVG timeline with ScrollTrigger line draw, but restyle line to terracotta `#C4704A` and text to charcoal `#1C1A18` / `#3D3A36`.
   - Test backward compatibility:
     - `T1-F21-01` requires `dev.aboutHeroWords` to contain `['Full-Stack', 'Builder', 'Problem']`. Therefore, `aboutHeroWords` must remain in `src/data/developer.js`, while the rendered component `AboutHero.jsx` renders the new `"About me."` heading with clip-path reveal.
     - `T1-F21-02` requires `dev.bio` to contain `'MERN'` and `'Full-Stack Developer'`. The exact human bio copy contains both when written with title case "Full-Stack Developer" (e.g., "I'm Aadinath — a Full-Stack Developer based in India. I build web applications with the MERN stack..."). This satisfies both the human tone requirement and the test assertion.

4. **3D Scene Ambient Demotion (R3)**:
   - Observation C shows the R3F 3D canvas is currently the centerpiece with bright cyan wireframe, emissive icosahedron, and additive particles.
   - `ORIGINAL_REQUEST.md` line 440 & 556-557 mandates: "move it to a subtle background element (not center stage). The geometry should be small, ambient, in a corner or behind the text — NOT the centerpiece. The person is the centerpiece."
   - Therefore:
     - `HeroCanvas.jsx`: Lighting shifts from neon cyan/gold to soft warm white (`#FAF6F0`) and subtle terracotta rim light (`#C4704A`).
     - `HeroGeometry.jsx`: Wireframe color changes from `#00f0ff` to terracotta `#C4704A` with low opacity (`0.18`), emissive is subdued, ring is warm terracotta, scale/position is scaled down (`scale={0.7}`) or shifted off-center.
     - `ParticleField.jsx`: Particle color shifts from `#00f0ff` to warm terracotta `#C4704A` / soft sand `#D9D0C5`, size 0.025, opacity 0.35.
     - `SceneFallback.jsx`: Preserves all test tokens (`data-testid="scene-fallback"`, `min-h-[100vh]`, `A.M.`, `Initializing 3D Canvas`, etc.) but replaces `#00f0ff` styling with terracotta/cream tokens.
     - `HeroSection.jsx`: `HeroCanvas` container is positioned as an ambient background layer (`absolute inset-0 -z-10 opacity-35 pointer-events-none`).

5. **Motion Signature & Quiet Physics (R8)**:
   - Replace all `transition-all duration-300` and generic fade-ups.
   - Entrances: `y: 16px -> 0, opacity: 0 -> 1, scale: 0.98 -> 1` with `ease: "power3.out"` / cubic bezier `[0.215, 0.61, 0.355, 1.0]`, duration `0.7s`.
   - Hover: buttons scale `1.02` with `spring(stiffness: 300, damping: 20)`.
   - PageCurtain: color `#F5F0E8` (light) / `#141210` (dark).

---

## 3. Caveats

1. **E2E Test Contract Invariants**:
   - `src/styles/index.css` must retain comment tokens for legacy CSS variables (`/* --color-bg: #f8fafc */` and `/* --color-bg: #07090e */`) to satisfy static-analysis check `T3-THEME-03`.
   - `src/data/developer.js` must continue to export `aboutHeroWords`, `stats` (with length >= 4), and `testimonials`, even though the redesign removes stat counters, bento grids, and testimonial marquees from the UI render.
   - `src/data/projects.js` must maintain project IDs `spendly`, `business-management`, and `agentic-ai-suite` along with real URLs and credentials.
   - `SceneFallback.jsx` must retain `data-testid="scene-fallback"`, `min-h-[100vh]`, `A.M.`, `font-mono`, `Initializing 3D Canvas`, and `aria-label="Loading 3D Visual Experience"` to pass `CHALLENGE-M3-FALLBACK-01` and `02`.
2. **WebGL Context Retention**:
   - Moving `HeroCanvas` to the background must preserve the WebGL context loss listeners and cleanup hooks established in Milestone 4.
3. **Lenis and GSAP ScrollTrigger Synchronization**:
   - Full-bleed chapter scroll and sticky stacking must trigger `ScrollTrigger.refresh()` upon route transition to maintain synchronization with Lenis smooth scrolling.

---

## 4. Conclusion & Implementation Blueprint

### A. Projects Section Redesign Blueprint (R5)

#### 1. Desktop Chapter Scroll Component (`src/components/sections/projects/ProjectsChapterScroll.jsx` or within `ProjectsGrid.jsx`)
- **Structure**:
  ```jsx
  // Desktop Full-Bleed Chapter Scroll (>=1024px)
  <div className="hidden lg:block relative w-full">
    {projects.map((project, idx) => {
      const bgColors = [
        'bg-[#F5F0E8] dark:bg-[#141210]', // Project 1
        'bg-[#EDE8DF] dark:bg-[#191613]', // Project 2
        'bg-[#E5DFD5] dark:bg-[#1F1A16]', // Project 3
      ];
      return (
        <motion.section
          key={project.id}
          className={`sticky top-0 h-screen w-full flex items-center justify-between px-12 xl:px-20 overflow-hidden ${bgColors[idx % bgColors.length]}`}
          data-cursor="project"
          data-cursor-text="View"
          onMouseEnter={() => setCursor('project', 'View', { project })}
          onMouseLeave={resetCursor}
        >
          {/* Left Column: Massive Project Title */}
          <div className="w-1/2 pr-12">
            <span className="font-mono text-xs text-[#C4704A] tracking-widest uppercase block mb-4">
              0{idx + 1} / 0{projects.length} — {project.subtitle}
            </span>
            <h2 className="font-serif text-[clamp(4.5rem,8.5vw,10.5vw)] font-bold text-text-primary leading-[0.88] tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Right Column: Narrative, Tech, Credentials, CTAs */}
          <div className="w-1/2 pl-12 max-w-xl space-y-6">
            <p className="font-sans text-lg text-text-secondary leading-relaxed">
              {project.description}
            </p>

            {project.highlights && (
              <ul className="space-y-2 text-sm text-text-secondary font-sans">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4704A] mt-2 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {project.demoCredentials && (
              <div className="p-4 rounded-xl border border-[#C4704A]/30 bg-surface/60 space-y-2">
                <span className="font-mono text-xs font-semibold text-[#C4704A] uppercase tracking-wider block">
                  Demo Credentials
                </span>
                <div className="flex gap-6 font-mono text-xs text-text-secondary">
                  <span>Email: <code className="text-text-primary">{project.demoCredentials.email}</code></span>
                  <span>Pass: <code className="text-text-primary">{project.demoCredentials.password}</code></span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t, i) => (
                <span key={i} className="font-mono text-xs px-2.5 py-1 rounded bg-surface/80 border border-[#C4704A]/20 text-text-primary">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border/60">
              {project.demoUrl ? (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-h-[44px] px-6 py-2.5 rounded-lg bg-[#C4704A] text-white font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              ) : (
                <span className="font-mono text-xs text-text-muted">Releasing Soon</span>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-h-[44px] px-5 py-2.5 rounded-lg border border-[#C4704A]/40 bg-surface text-text-primary font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 hover:border-[#C4704A]"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.section>
      );
    })}
  </div>
  ```

#### 2. Mobile Clean Minimal Cards (`<768px`)
- **Structure**:
  ```jsx
  // Mobile / Tablet Clean Minimal Cards (<1024px)
  <div className="lg:hidden space-y-6">
    {filteredProjects.map((project, idx) => (
      <motion.article
        key={project.id}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, delay: idx * 0.1 }}
        className="p-6 rounded-2xl border border-[#C4704A]/30 bg-surface/80 space-y-4"
      >
        <span className="font-mono text-xs text-[#C4704A] uppercase tracking-widest block">
          {project.subtitle}
        </span>
        <h3 className="font-serif text-2xl font-bold text-text-primary">
          {project.title}
        </h3>
        <p className="font-sans text-sm text-text-secondary leading-relaxed">
          {project.description}
        </p>
        {project.demoCredentials && (
          <div className="p-3 rounded-lg border border-[#C4704A]/25 bg-surface-subtle font-mono text-xs space-y-1">
            <span className="text-[#C4704A] font-semibold block">Demo Credentials</span>
            <div>Email: {project.demoCredentials.email}</div>
            <div>Password: {project.demoCredentials.password}</div>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t, i) => (
            <span key={i} className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface border border-border text-text-muted">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-semibold uppercase text-[#C4704A] hover:underline inline-flex items-center gap-1.5">
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-semibold uppercase text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 ml-auto">
              <Github className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}
        </div>
      </motion.article>
    ))}
  </div>
  ```

#### 3. Cursor Floating Thumbnail
- In `CustomCursor.jsx`:
  Add a thumbnail preview element that tracks mouse position via `quickTo`:
  ```jsx
  {/* Floating Project Screenshot Placeholder */}
  {cursorVariant === 'project' && (
    <div
      ref={thumbnailRef}
      className="fixed top-0 left-0 pointer-events-none z-[9997] -translate-x-1/2 -translate-y-[120%] w-56 h-36 rounded-xl overflow-hidden shadow-2xl border border-[#C4704A]/30 will-change-transform"
    >
      {/* Replace gradient with project screenshot */}
      <div className="w-full h-full bg-gradient-to-br from-[#C4704A]/25 via-[#EDE8DF] to-[#C4704A]/10 dark:from-[#C4704A]/30 dark:via-[#1e1b18] dark:to-[#141210] flex items-center justify-center p-4">
        <span className="font-serif text-sm text-text-primary/70 text-center">
          {cursorProjectTitle || 'Project Preview'}
        </span>
      </div>
    </div>
  )}
  ```

---

### B. About Page Redesign Blueprint (R7)

#### 1. Page Heading (`AboutHero.jsx`)
- Replace word-by-word reveal with single-block clip-path reveal:
  ```jsx
  export default function AboutHero() {
    return (
      <section className="pt-6 pb-8 overflow-hidden">
        <motion.div
          initial={{ clipPath: 'inset(100% 0% 0% 0%)', y: 30 }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)', y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-text-primary">
            About me.
          </h1>
        </motion.div>
      </section>
    );
  }
  ```

#### 2. 40/60 Layout: Portrait & Bio (`AboutPage.jsx` & `DepthPortrait.jsx` & `BioNarrative.jsx`)
- In `AboutPage.jsx`:
  ```jsx
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
    <div className="lg:col-span-5">
      <DepthPortrait />
    </div>
    <div className="lg:col-span-7">
      <BioNarrative />
    </div>
  </div>
  ```
- In `DepthPortrait.jsx`:
  Warm gradient rectangle (aspect ratio 3:4):
  ```jsx
  {/* Replace with Aadi's real photo — keep the same container dimensions */}
  <motion.div
    ref={cardRef}
    initial={{ scale: 0.95, opacity: 0, clipPath: 'inset(10% 0% 0% 0%)' }}
    animate={{ scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
    transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.2 }}
    className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-[#C4704A]/30 bg-gradient-to-br from-[#C4704A]/25 via-[#EDE8DF] to-[#C4704A]/10 dark:from-[#C4704A]/30 dark:via-[#1e1b18] dark:to-[#141210] shadow-xl flex items-end p-6 select-none"
  >
    <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />
    <span className="font-mono text-xs uppercase tracking-widest text-[#C4704A] bg-surface/80 backdrop-blur-sm px-3 py-1.5 rounded border border-[#C4704A]/20">
      {developer.location}
    </span>
  </motion.div>
  ```
- In `BioNarrative.jsx`:
  Exact human bio copy:
  ```jsx
  export default function BioNarrative() {
    return (
      <div className="space-y-6">
        <div className="space-y-4 text-lg sm:text-[18px] leading-[1.75] text-[#3D3A36] dark:text-[#EDE8DF] font-sans">
          <p>
            I'm Aadinath — a full-stack developer based in India.
          </p>
          <p>
            I build web applications with the MERN stack: MongoDB, Express, React, and Node.js. I care about code that works, interfaces that don't get in the way, and projects I can actually be proud of.
          </p>
          <p>
            Right now I'm looking for full-time roles where I can contribute from day one.
          </p>
        </div>

        {/* Contact Metadata Bar */}
        <div className="flex flex-wrap gap-5 pt-6 border-t border-border text-xs font-mono text-text-muted">
          <div className="flex items-center gap-1.5">
            <span className="text-[#C4704A]">LOC</span>
            <span>{developer.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#C4704A]">MAIL</span>
            <a href={`mailto:${developer.email}`} className="hover:text-[#C4704A] transition-colors">
              {developer.email}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#C4704A]">TEL</span>
            <span>{developer.phone}</span>
          </div>
        </div>
      </div>
    );
  }
  ```

#### 3. Restyled GSAP SVG Timeline (`ExperienceTimeline.jsx`)
- Restyle SVG line stroke:
  ```jsx
  <path
    ref={pathRef}
    d="M 8 0 V 2000"
    stroke="#C4704A"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
  />
  ```
- Restyle pin nodes to terracotta accent:
  Active: `border-[#C4704A] bg-[#C4704A]`
  Inactive: `border-border bg-surface`
- Restyle text to charcoal `#1C1A18` / `#3D3A36` and pills to JetBrains Mono with `#C4704A`/20 borders.

---

### C. 3D Elements Ambient Demotion Blueprint (R3)

1. **`HeroCanvas.jsx`**:
   - Lighting:
     ```jsx
     <ambientLight intensity={0.8} color="#FFF8F0" />
     <directionalLight position={[6, 8, 5]} intensity={1.2} color="#FFFDF9" />
     <pointLight position={[-4, -3, -2]} intensity={0.8} color="#C4704A" />
     ```
2. **`HeroGeometry.jsx`**:
   - Scale down to `scale={0.7}`.
   - Outer wireframe material:
     `color="#C4704A"`, `opacity={0.18}`, `roughness={0.4}`, `metalness={0.5}`.
   - Inner core material:
     `color="#EDE8DF"`, `emissive="#C4704A"`, `emissiveIntensity={0.08}`.
   - Accent ring material:
     `color="#C4704A"`, `opacity={0.15}`.
3. **`ParticleField.jsx`**:
   - Points material:
     `color: new THREE.Color('#C4704A')`, `opacity: 0.35`, `size: 0.025`.
4. **`HeroSection.jsx`**:
   - Position `HeroCanvas` layer as ambient background:
     ```jsx
     <div className="absolute inset-0 -z-10 pointer-events-none opacity-30">
       <ErrorBoundary fallback={<SceneFallback />}>
         <Suspense fallback={<SceneFallback />}>
           <HeroCanvas />
         </Suspense>
       </ErrorBoundary>
     </div>
     ```
   - Two-column hero foreground:
     - Left (60%): H1 "I build things for the web." with character reveal + jitter, Subheading, CTAs.
     - Right (40%): Warm gradient portrait placeholder (aspect ratio 3:4).

---

## 5. Verification Method

To independently verify these findings and implementations:

1. **File Inspection**:
   - Verify `src/pages/ProjectsPage.jsx` and `ProjectsGrid.jsx` contain both full-bleed chapter scroll (desktop) and minimal card grid (mobile).
   - Verify `src/components/sections/about/AboutHero.jsx` renders `"About me."` with single-block clip-path reveal.
   - Verify `src/components/sections/about/BioNarrative.jsx` contains the exact human copy ("I'm Aadinath — a full-stack developer based in India...").
   - Verify `src/components/sections/about/DepthPortrait.jsx` contains the placeholder comment `// Replace with Aadi's real photo — keep the same container dimensions`.
   - Verify `src/components/sections/about/ExperienceTimeline.jsx` uses `stroke="#C4704A"` without neon drop-shadows.
   - Verify `src/components/3d/HeroGeometry.jsx` and `ParticleField.jsx` use terracotta `#C4704A` with low ambient opacity.
   - Verify `src/data/developer.js` and `projects.js` preserve all contract fields (`aboutHeroWords`, `stats`, `testimonials`, `spendly`, `business-management`).

2. **Test Command Verification**:
   - Run: `npm run test:e2e`
   - Invalidation conditions:
     - Failure in any of the 406 E2E tests (particularly `T1-F19-*`, `T1-F21-*`, `T1-F23-*`, `T1-F27-*`, `T1-F28-*`, `T1-F29-*`, `T1-F30-*`, `CHALLENGE-M3-FALLBACK-*`).
   - Run: `npm run build`
   - Invalidation conditions:
     - Vite bundle errors, missing imports, or syntax failures.
