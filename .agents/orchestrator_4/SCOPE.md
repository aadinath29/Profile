# Scope: Final 5% Completion of Aadinath Magar's Portfolio

## Architecture & Code Layout
- React 18.3.1 + Vite 5.4.10 + Tailwind CSS 3.4.14
- Multi-page routing: /, /about, /projects, /blog, /contact
- Design System: Cream (#F5F0E8), Charcoal (#1C1A18, #3D3A36), Terracotta (#C4704A), Surface (#EDE8DF), Dark (#141210)
- Fonts: DM Serif Display, DM Sans, JetBrains Mono

## Feature Inventory & Tasks
| # | Task | Description | Acceptance Criteria |
|---|------|-------------|---------------------|
| 1 | Full Audit across src/ | Check every file in src/ for leftover neon/cyan/blue/glow CSS, removed component imports (StatsSection, GlobeSection, TestimonialsSection, MarqueeTicker, BentoCard), broken imports, unused vars, AI filler copy | Zero leftover neon/cyan/blue/glow, zero dead imports |
| 2 | ContactPage Completion | src/pages/ContactPage.jsx, ContactForm.jsx, ContactInfo.jsx: cream/charcoal/terracotta, border-[#C4704A] focus, DM Sans labels, terracotta submit button, valid social URLs (github: aadinath29, linkedin: aadinath-magar-profile), Heading: 'Let's talk.' | Heading: 'Let's talk.', terracotta focus ring, correct links |
| 3 | BlogPage Completion | src/pages/BlogPage.jsx, BlogCard.jsx: clean minimal card with border-border, no glow/shadow, Heading: 'Writing.', italic note 'Thoughts on building, learning, and shipping.', placeholder note '// placeholder — content coming soon' | Heading: 'Writing.', italic note present, clean cards |
| 4 | ExperienceTimeline Polish | src/components/sections/about/ExperienceTimeline.jsx: SVG line stroke='#C4704A', dot markers bg-[#C4704A], year labels JetBrains Mono text-[#C4704A], placeholder comment | Terracotta line and dots, JetBrains Mono years, comment |
| 5 | BioNarrative Human Copy | src/components/sections/about/BioNarrative.jsx: Verbatim copy check: 'I'm Aadinath — a full-stack developer based in India...' | Verbatim match to specification |
| 6 | App.jsx & Layout Check | src/App.jsx & src/components/layout/Layout.jsx: ThemeContext & CursorContext wrap all, Lenis + GSAP ticker sync, AnimatePresence with useLocation() key, Layout renders CustomCursor, ScrollProgressBar, Navbar, main, Footer | Providers, ticker sync, AnimatePresence, Layout complete |
| 7 | Mobile Responsiveness | Check 375px: responsive padding px-4 sm:px-6 lg:px-8, hero portrait hidden/stacked below text on mobile, chapter scroll disabled on mobile < 768px | No overflow at 375px, portrait stacked/hidden, card layout on mobile |
| 8 | Final Build Verification | npm run build exits 0, no dev console errors, 5 routes render, node tests/e2e/run-all.js | Build passes, 5 routes render |
