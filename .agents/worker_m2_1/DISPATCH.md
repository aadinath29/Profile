## 2026-09-09T19:17:33Z
# Original User Request

## Initial Request â€” 2026-09-09T18:30:21Z

Build a corporate-grade personal portfolio website for a software developer named Aadinath Magar (goes by "Aadi"). The visual language blends two references: the cinematic animation depth of raviklaassens.com (immersive 3D, scroll-driven motion, preloader, custom cursor) with the clean editorial layout structure of 13studio.framer.website/about (generous whitespace, strong typographic hierarchy, minimal grid sections). Sections should breathe and feel calm at rest â€” but when things move, they move cinematically. Multi-page routing with animated page transitions.

Working directory: C:\Users\Dell\Desktop\Profile
Integrity mode: demo

## Developer Profile (from resume â€” use this REAL data throughout the site)

**Name**: Aadinath Magar
**Nickname/Brand**: Aadi
**GitHub**: https://github.com/aadinath29
**LinkedIn**: https://www.linkedin.com/in/aadinath-magar-profile

**Projects** (use these in the Projects section with real links):
1. **Spendly** â€” Personal finance / expense tracker app
   - Live Demo: https://spendly-sable-delta.vercel.app/
   - GitHub: https://github.com/aadinath29/spendly-
2. **Business Management System** â€” Business operations management platform
   - Live Demo: https://business-managment-alpha.vercel.app/login
   - GitHub: https://github.com/aadinath29/BusinessManagment-

**Tech Stack** (use in skills section):
- Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Tools: Git, GitHub, Vite, VS Code, Vercel
- Currently Learning: MERN Stack advanced patterns, Agentic AI

**About / Bio** (use in About page):
Aadinath Magar is a full-stack developer from India, specializing in MERN stack development. Passionate about building clean, performant web applications with great UX. Currently focused on expanding into Agentic AI and advanced React patterns. Open to full-time software engineering roles.

**Stats** (use in stats counter section):
- 2 Projects shipped
- 500+ Job Applications sent
- MERN Stack focus
- Based in India

**Preloader initials**: A.M. (or stylized "AM" monogram)
**Nav logo**: "Aâ€”M" or "Aadinath.dev" (choose whichever looks more editorial)

## References
- **Motion + polish benchmark**: https://www.raviklaassens.com/ â€” study animation patterns, preloader, Lenis smooth scroll, menu micro-interactions, custom cursor, and 3D depth portrait.
- **Layout + editorial benchmark**: https://13studio.framer.website/about â€” study section spacing, typographic hierarchy, bento grid approach, and clean minimal structure.

## Requirements

### R1. Tech Stack & Architecture
Build the project using **React + Vite** + **Tailwind CSS**. Use **React Router v6** for multi-page routing (Home, About, Projects, Blog, Contact). Install and wire in from the start: **Framer Motion** (page transitions + micro-interactions), **GSAP + ScrollTrigger** (scroll-driven animations), **React Three Fiber + Three.js** (3D scenes, lazy-loaded), and **Lenis** (buttery smooth scrolling, same as raviklaassens). Folder structure must be component-based â€” each section and animation is independently modifiable.

### R2. Visual Design System
- **Theme**: Dark-primary â€” deep blacks + dark navy base, with neon cyan/gold accent colors
- **Dark/light toggle**: Implemented via Tailwind dark mode class strategy, persisted to localStorage
- **Typography**: Bold serif for headings (**Playfair Display** or **Cormorant Garant** from Google Fonts) + clean sans-serif for body (**Inter** or **Geist**). Headings: large scale, tight letter-spacing (editorial feel). Body: readable, light weight.
- **Color tokens**: All palette values defined as Tailwind custom CSS variables in `tailwind.config.js` so they can be globally swapped

### R3. Pages & Sections

#### Page: Home (`/`)
- **Hero Section** â€” Full-screen. R3F 3D scene: rotating abstract geometry + floating particle field. Animated text reveal on load (Playfair Display heading showing "Aadinath Magar" and title "Full-Stack Developer"). Scroll-driven parallax as user scrolls. Prominent Resume Download CTA button.
- **Stats Counter** â€” Animated number counters: "2 Projects Shipped", "500+ Job Applications", "MERN Stack", "India" â€” triggered on scroll into view.
- **Skills / Tech Stack (dual-layer)**:
  - Layer 1: Horizontal infinite-scroll marquee ticker (tech logos + skill names for React, Node.js, MongoDB, Express, Tailwind, Git, Vite, JavaScript â€” always running)
  - Layer 2: Bento grid layout â€” asymmetric cards per skill domain (Frontend, Backend, Database, Tools) with proficiency bars that fill on scroll via Lenis scroll progress
- **Projects Showcase (preview)** â€” 3-card teaser grid featuring Spendly and Business Management with real links, plus one "More Coming Soon" placeholder card. Hover animations: scale, glow border reveal, overlay. Links to `/projects` for full list.
- **Testimonials** â€” Auto-scrolling marquee of 3 placeholder recommendation quotes (mark them as placeholder â€” Aadi will add real ones later).

#### Page: About (`/about`)
- **Hero text reveal** â€” Large editorial heading animated word-by-word on page load: "Full-Stack Developer. Builder. Problem Solver."
- **Portrait with depth/parallax tilt** â€” Placeholder photo (`/public/portrait-placeholder.jpg` â€” use a solid color gradient div as placeholder) with mouse-tracked 3D tilt effect (CSS perspective transform + JS mousemove, similar to raviklaassens' depth portrait). Add a code comment: `// Replace portrait-placeholder.jpg with Aadi's real photo`
- **Bio text block** â€” Use the bio from the Developer Profile section above. Animated text reveal on scroll.
- **Experience / Timeline** â€” Animated vertical timeline for education. SVG line draws progressively as user scrolls (GSAP stroke-dashoffset approach). Include placeholder entries for education (use realistic CS/engineering education for an Indian developer â€” mark as placeholder).

#### Page: Projects (`/projects`)
- Full card grid with Spendly and Business Management using their real live demo + GitHub links
- Each card: project name, description, tech stack tags, hover animations (scale, glow, overlay text reveal)
- Smooth scroll-triggered card entrance animations (staggered)
- "More projects coming soon" placeholder card

#### Page: Blog (`/blog`)
- Minimal card layout
- 3-4 placeholder blog card entries with realistic developer topics (e.g., "Building with MERN Stack", "React Performance Tips")
- Mark as placeholder â€” Aadi will fill with real articles later

#### Page: Contact (`/contact`)
- Form via **EmailJS** â€” Name, Email, Message fields. Animated focus states on inputs. Show success/error state after submit. Use placeholder credentials: `SERVICE_ID = 'YOUR_SERVICE_ID'`, `TEMPLATE_ID = 'YOUR_TEMPLATE_ID'`, `PUBLIC_KEY = 'YOUR_PUBLIC_KEY'` with a prominent code comment: `// IMPORTANT: Replace these with your real EmailJS credentials from https://emailjs.com`
- GitHub link: https://github.com/aadinath29
- LinkedIn link: https://www.linkedin.com/in/aadinath-magar-profile
- Social links with hover micro-interactions
- Animated section entrance

### R4. System-Level Polish (All Required)
- **Animated preloader**: Branded loading screen with "A.M." initials or monogram, progress bar animation that covers the page until load is complete, then animates away. Matches raviklaassens' approach.
- **Animated page transitions**: On route change, a full-screen curtain slides in and out (Framer Motion `AnimatePresence` + route wrapper). Should feel like a scene change, not a fade.
- **Custom animated cursor**: Desktop only. A circular blob cursor that:
  - Follows mouse with slight lag (lerp/spring)
  - Scales up + changes color on hover over buttons and links
  - Shows a text label ("View", "Open") when hovering project cards
- **Scroll progress indicator**: Thin horizontal bar at the top of the viewport, fills left-to-right as user scrolls, accent color.
- **Navigation**: Sticky top nav. Logo "Aâ€”M" on left. Desktop: text links (Home, About, Projects, Blog, Contact) with clip-path slide reveal on hover (like raviklaassens). Mobile: animated hamburger â†’ fullscreen menu overlay with staggered link entrance.

### R5. Performance & Deployment Readiness
- R3F / Three.js components must be `React.lazy` + `Suspense` wrapped with a skeleton fallback â€” heavy 3D should not block initial page render
- `npm run build` must produce a clean Vite dist folder, deployable to Vercel with zero config
- EmailJS wired but using placeholder credentials with clear comments
- All images use simple colored gradient div placeholders (no broken image tags)
- Include a `vercel.json` with SPA routing config so React Router works on Vercel: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`

## Acceptance Criteria

### Foundation
- [ ] `npm run dev` starts with no errors or warnings in the terminal
- [ ] `npm run build` completes â€” dist folder is generated and would deploy to Vercel
- [ ] All 5 libraries are installed and actively used: Framer Motion, GSAP + ScrollTrigger, React Three Fiber, Lenis, EmailJS
- [ ] React Router v6 routes: `/`, `/about`, `/projects`, `/blog`, `/contact` â€” all render without 404
- [ ] `vercel.json` present with SPA rewrite config

### Sections & Pages
- [ ] All 5 pages exist with full section content (no empty shells)
- [ ] Home hero renders an R3F 3D scene (geometry + particles) with no console errors
- [ ] Skills section has both the marquee ticker AND the bento grid with proficiency indicators
- [ ] About page has the depth/parallax portrait tilt effect working on mousemove
- [ ] Experience timeline SVG line animates on scroll
- [ ] Projects page shows Spendly and Business Management with correct live demo + GitHub URLs
- [ ] Contact form submits via EmailJS (placeholder creds) and shows success/error feedback

### Polish
- [ ] Preloader appears on initial load and exits before hero is revealed
- [ ] Page transitions (curtain effect) animate correctly on every route change
- [ ] Custom cursor is visible on desktop, follows mouse, reacts to hover states
- [ ] Scroll progress bar fills as user scrolls each page
- [ ] Dark/light mode toggle switches theme and persists state to localStorage
- [ ] Lenis smooth scrolling active â€” native scroll behavior should feel noticeably different

### Design Quality
- [ ] Playfair Display (or Cormorant Garant) is loaded and applied to all headings
- [ ] Inter or Geist is used for body text
- [ ] Dark navy + neon accent palette is applied consistently with Tailwind tokens
- [ ] Fully responsive at 375px (mobile), 768px (tablet), 1280px (desktop)
- [ ] Real developer name "Aadinath Magar" and real project links appear in the site â€” no Lorem Ipsum in key sections
