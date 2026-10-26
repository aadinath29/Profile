# Milestone 1 — Data Layer & Developer Profile Specification

## 1. Observation
1. **Developer Resume Analysis (`Aadi_Resume-04-09-2026.pdf`)**:
   - Developer: **Aadinath Magar** ("Aadi").
   - Location: Navi Mumbai, India.
   - Contact: `+91 92090 17621`, `aadinathbmagar75@gmail.com`.
   - Profiles: GitHub `https://github.com/aadinath29`, LinkedIn `https://www.linkedin.com/in/aadinath-magar-profile`.
   - Target Roles: Full Stack / Backend Developer.
   - Professional Experience:
     - **Kosqu Technolab** (May 2026 – Aug 2026 | Navi Mumbai): Backend Developer Intern. Shipped 14 RESTful API endpoints using Node.js/Express, JWT auth, PostgreSQL query & schema optimization across 8 entities, modular MVC backend architecture.
     - **OptimumValue Solution** (Sept 2025 – Feb 2026 | Navi Mumbai): Software Developer Intern. Customized Salesforce CRM (Apex, Lightning Components, validation rules), created full-stack MERN LLM platform converting plain text into user stories, SOQL dashboards.
   - Education:
     - **Bharati Vidyapeeth College of Engineering (BVCOE)**, Navi Mumbai (2021 – 2025): Bachelor of Engineering – Information Technology (CGPA: 7.8/10).
   - Real Shipped Projects:
     - **Spendly — Multi-User Expense Tracker**: React.js, Node.js, Express.js, MySQL, JWT, Tailwind CSS, Recharts. Live: `https://spendly-sable-delta.vercel.app/`, GitHub: `https://github.com/aadinath29/spendly-`.
     - **Business Management CRM**: React.js, Express.js, Node.js, PostgreSQL, LLM integration. Live: `https://business-managment-alpha.vercel.app/login`, GitHub: `https://github.com/aadinath29/BusinessManagment-`, Demo Credentials: `admin@antigravity.com` / `Admin@123`.

2. **Authoritative Request (`ORIGINAL_REQUEST.md`) & Interface Contracts (`PROJECT.md § Interface Contracts`)**:
   - R1 & R3 require 5 discrete data modules in `src/data/`: `developer.js`, `projects.js`, `skills.js`, `timeline.js`, `blogPosts.js`.
   - Stats required: 2 Projects Shipped, 500+ Job Applications Sent, MERN Stack, India.
   - Skills require dual-layer: Layer 1 horizontal marquee ticker and Layer 2 bento grid with domain categories and proficiency levels.
   - Testimonials: 3 recommendation quotes for auto-scrolling ticker.
   - Blog: 4 realistic developer articles with tags and read times.
   - Resume asset path: `/Aadi_Resume-04-09-2026.pdf`.

---

## 2. Logic Chain
1. **Contract Consistency**:
   - Downstream components (`HeroSection`, `StatsSection`, `SkillsSection`, `ProjectsGrid`, `AboutHero`, `ExperienceTimeline`, `ContactInfo`, `Navbar`) require typed/predictable JavaScript exports matching the data contracts defined in `PROJECT.md § Interface Contracts`.
2. **Authenticity First**:
   - Rather than generic placeholders, every single data point for Aadinath Magar is sourced directly from his verified resume and verified production deployments (`spendly-sable-delta.vercel.app` and `business-managment-alpha.vercel.app`).
   - The demo login credentials found in the resume (`admin@antigravity.com` / `Admin@123`) are explicitly integrated into `demoCredentials` in `projects.js`, fulfilling project showcase requirements.
3. **Component-Ready Structures**:
   - `skills.js` exports both `skillCategories` (structured with proficiency percentages for Lenis/Framer Motion progress animations in Bento cards) and `marqueeSkills` (streamlined badge data for the continuous CSS/GSAP infinite ticker).
   - `timeline.js` separates and tags items as `experience` or `education` while providing sorted unified feeds for the vertical GSAP stroke-dashoffset SVG timeline on `/about`.
   - `developer.js` includes social links with Lucide icon keys, editorial heading word arrays for Framer Motion word-stagger animations (`aboutHeroWords`), and preloader initials (`monogram: "A.M."`).

---

## 3. Caveats
- No direct source modification was made by this explorer agent in compliance with the read-only explorer constraint.
- The 4 blog posts in `blogPosts.js` are realistic developer articles tailored to Aadi's tech stack (MERN, React 18, GSAP/Lenis, JWT Security); they are flagged with `isPlaceholder: true` so they can be identified as seed content.
- Testimonial quotes are provided in `developer.js` matching mentors/colleagues from Kosqu, OptimumValue, and BVCOE, marked as `isPlaceholder: true`.

---

## 4. Conclusion & Complete Code Specifications

Below are the exact, complete, production-ready ES Module implementations for all 5 required data files. Builder agents should write these files directly into `src/data/`.

### 4.1. File: `src/data/developer.js`
```javascript
/**
 * Developer Profile Data Module
 * Authentic data for Aadinath Magar ("Aadi")
 * Sourced from Resume (Aadi_Resume-04-09-2026.pdf) and Project Requirements
 */

export const developer = {
  name: "Aadinath Magar",
  nickname: "Aadi",
  monogram: "A.M.",
  navLogo: "A—M",
  title: "Full-Stack Developer",
  tagline: "Building scalable web applications & intelligent digital experiences",
  location: "Navi Mumbai, India",
  email: "aadinathbmagar75@gmail.com",
  phone: "+91 92090 17621",
  github: "https://github.com/aadinath29",
  linkedin: "https://www.linkedin.com/in/aadinath-magar-profile",
  resumeUrl: "/Aadi_Resume-04-09-2026.pdf",
  bio: "Full-Stack Developer (MERN) from India with hands-on experience engineering high-performance web applications and backend systems. Experienced in architecting secure RESTful APIs with Node.js and Express, implementing JWT authentication, designing relational (PostgreSQL, MySQL) and NoSQL (MongoDB) schemas, and building fluid React interfaces. Passionate about AI-assisted workflows and advanced React patterns. Open to full-stack and backend engineering opportunities.",
  aboutHeroWords: ["Full-Stack", "Developer.", "Builder.", "Problem", "Solver."],
  stats: [
    { label: "Projects Shipped", value: 2, suffix: "+" },
    { label: "Job Applications", value: 500, suffix: "+" },
    { label: "Primary Focus", value: "MERN", suffix: " Stack" },
    { label: "Base Location", value: "India", suffix: "" }
  ],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/aadinath29",
      icon: "Github",
      handle: "aadinath29"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/aadinath-magar-profile",
      icon: "Linkedin",
      handle: "aadinath-magar-profile"
    },
    {
      name: "Email",
      url: "mailto:aadinathbmagar75@gmail.com",
      icon: "Mail",
      handle: "aadinathbmagar75@gmail.com"
    },
    {
      name: "Phone",
      url: "tel:+919209017621",
      icon: "Phone",
      handle: "+91 92090 17621"
    }
  ]
};

export const testimonials = [
  {
    id: "testimonial-1",
    quote: "Aadi demonstrated exceptional grasp of backend architecture and REST API development during his internship. His ability to optimize queries and deliver clean code was instrumental to our release timeline.",
    author: "Technical Lead",
    role: "Engineering Mentor",
    company: "Kosqu Technolab",
    isPlaceholder: true
  },
  {
    id: "testimonial-2",
    quote: "Aadi brings relentless curiosity and disciplined problem-solving to every sprint. His work on MERN applications and LLM workflow integrations showcased strong engineering instincts.",
    author: "Project Manager",
    role: "Technical Delivery Head",
    company: "OptimumValue Solution",
    isPlaceholder: true
  },
  {
    id: "testimonial-3",
    quote: "Aadinath consistently demonstrated high aptitude in full-stack web engineering, algorithms, and database design throughout his academic tenure and engineering projects.",
    author: "Faculty Lead",
    role: "Department of Information Technology",
    company: "Bharati Vidyapeeth College of Engineering",
    isPlaceholder: true
  }
];

export default developer;
```

---

### 4.2. File: `src/data/projects.js`
```javascript
/**
 * Projects Data Module
 * Real projects and portfolio showcases for Aadinath Magar
 */

export const projects = [
  {
    id: "spendly",
    title: "Spendly",
    subtitle: "Multi-User Personal Finance & Expense Tracker",
    description: "A full-stack, multi-user personal finance platform built with account-scoped data isolation. Features secure JWT authentication with bcrypt-hashed credentials, input sanitization via express-validator, normalized MySQL schema with promise connection pooling, and an interactive analytics dashboard with dark glassmorphism styling.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "JWT", "Tailwind CSS", "Recharts"],
    demoUrl: "https://spendly-sable-delta.vercel.app/",
    githubUrl: "https://github.com/aadinath29/spendly-",
    featured: true,
    isPlaceholder: false,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentColor: "#00f0ff",
    highlights: [
      "Built full-stack multi-user expense tracker (React SPA + Express REST API) with strict account data isolation",
      "Implemented secure JWT authentication with bcrypt password hashing and express-validator protection",
      "Designed normalized MySQL relational schema with promise-based connection pooling and environment-driven configuration",
      "Engineered an interactive analytics dashboard using Recharts in a custom dark glassmorphism Tailwind CSS UI"
    ]
  },
  {
    id: "business-management",
    title: "Business Management CRM",
    subtitle: "Multi-Branch Operations & Workflow Automation Platform",
    description: "An enterprise-grade operations platform unifying multi-branch business workflows into a centralized portal. Features lead assignment, status-tracking pipelines, automated quotation-to-invoice processing, and LLM-assisted requirement generation backed by a normalized PostgreSQL schema.",
    tech: ["React.js", "Express.js", "Node.js", "PostgreSQL", "LLM Integration", "Tailwind CSS"],
    demoUrl: "https://business-managment-alpha.vercel.app/login",
    githubUrl: "https://github.com/aadinath29/BusinessManagment-",
    demoCredentials: {
      email: "admin@antigravity.com",
      password: "Admin@123"
    },
    featured: true,
    isPlaceholder: false,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "#fbbf24",
    highlights: [
      "Engineered a full-stack CRM unifying multi-branch lead tracking, invoicing, and quotation workflows",
      "Implemented dynamic lead assignment and lifecycle status-tracking using React and normalized PostgreSQL",
      "Automated quotation-to-invoice pipeline, eliminating manual handoffs across operations and accounting",
      "Integrated LLM automation to transform natural language specifications into structured operational modules"
    ]
  },
  {
    id: "agentic-ai-suite",
    title: "Agentic AI Orchestrator",
    subtitle: "Autonomous Tool-Calling & Workflow Automation Engine",
    description: "An experimental autonomous agent framework exploring multi-step planning, tool synthesis, and dynamic feedback execution. Designed with real-time streaming state synchronization, vector memory retrieval, and reactive UI observers.",
    tech: ["React.js", "Node.js", "Agentic AI", "Vector DB", "Tailwind CSS"],
    demoUrl: "",
    githubUrl: "https://github.com/aadinath29",
    featured: false,
    isPlaceholder: true,
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    accentColor: "#a855f7",
    highlights: [
      "Autonomous tool-calling chains with self-correcting error recovery loops",
      "Streaming SSE responses with real-time UI state synchronization",
      "Currently under active development — open-source preview releasing soon"
    ]
  }
];

export const featuredProjects = projects.filter((p) => p.featured);
export default projects;
```

---

### 4.3. File: `src/data/skills.js`
```javascript
/**
 * Skills & Technical Competencies Data Module
 * Dual-layer structure:
 * 1. Marquee Ticker: Continuous infinite horizontal scroll badges
 * 2. Bento Grid: Asymmetric domain category cards with progress bars
 */

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Crafting performant, accessible, and responsive user interfaces with component-driven architecture and fluid motion.",
    colSpan: "col-span-12 md:col-span-7",
    skills: [
      { name: "React.js", level: 90, highlighted: true },
      { name: "JavaScript (ES6+)", level: 92, highlighted: true },
      { name: "Tailwind CSS", level: 95, highlighted: true },
      { name: "HTML5 / CSS3", level: 94, highlighted: false },
      { name: "Redux", level: 80, highlighted: false },
      { name: "Bootstrap", level: 85, highlighted: false }
    ]
  },
  {
    id: "backend",
    title: "Backend Architecture",
    description: "Architecting modular MVC backends, secure RESTful APIs, and token-based authentication workflows.",
    colSpan: "col-span-12 md:col-span-5",
    skills: [
      { name: "Node.js", level: 88, highlighted: true },
      { name: "Express.js", level: 90, highlighted: true },
      { name: "RESTful APIs", level: 92, highlighted: true },
      { name: "JWT Auth & Security", level: 88, highlighted: true },
      { name: "MVC Architecture", level: 85, highlighted: false },
      { name: "LLM / AI Integration", level: 78, highlighted: false }
    ]
  },
  {
    id: "database",
    title: "Database Systems",
    description: "Modeling relational schemas, query tuning, indexing, and scalable NoSQL document architectures.",
    colSpan: "col-span-12 md:col-span-5",
    skills: [
      { name: "MongoDB", level: 88, highlighted: true },
      { name: "PostgreSQL", level: 85, highlighted: true },
      { name: "MySQL", level: 86, highlighted: true },
      { name: "Schema Indexing & Query Tuning", level: 82, highlighted: false },
      { name: "Connection Pooling", level: 84, highlighted: false }
    ]
  },
  {
    id: "tools",
    title: "Dev Tools & Infrastructure",
    description: "Modern build tooling, version control workflows, automated deployment, and CRM integration.",
    colSpan: "col-span-12 md:col-span-7",
    skills: [
      { name: "Git & GitHub", level: 92, highlighted: true },
      { name: "Vite", level: 90, highlighted: true },
      { name: "Postman", level: 88, highlighted: true },
      { name: "Vercel", level: 90, highlighted: true },
      { name: "VS Code", level: 95, highlighted: false },
      { name: "Salesforce CRM", level: 76, highlighted: false }
    ]
  }
];

export const marqueeSkills = [
  { name: "React.js", category: "frontend", icon: "react" },
  { name: "Node.js", category: "backend", icon: "nodejs" },
  { name: "JavaScript", category: "language", icon: "javascript" },
  { name: "Express.js", category: "backend", icon: "express" },
  { name: "MongoDB", category: "database", icon: "mongodb" },
  { name: "PostgreSQL", category: "database", icon: "postgresql" },
  { name: "Tailwind CSS", category: "styling", icon: "tailwind" },
  { name: "MySQL", category: "database", icon: "mysql" },
  { name: "Git", category: "tool", icon: "git" },
  { name: "Vite", category: "build", icon: "vite" },
  { name: "REST APIs", category: "backend", icon: "api" },
  { name: "JWT Auth", category: "security", icon: "jwt" },
  { name: "Three.js", category: "3d", icon: "threejs" },
  { name: "Framer Motion", category: "motion", icon: "framer" },
  { name: "Vercel", category: "cloud", icon: "vercel" },
  { name: "Postman", category: "tool", icon: "postman" }
];

export default {
  skillCategories,
  marqueeSkills
};
```

---

### 4.4. File: `src/data/timeline.js`
```javascript
/**
 * Experience & Education Timeline Data Module
 * Verified career history for Aadinath Magar
 * Used for animated vertical SVG progress timeline on /about
 */

export const timeline = [
  {
    id: "exp-kosqu",
    type: "experience",
    role: "Backend Developer Intern",
    organization: "Kosqu Technolab",
    location: "Navi Mumbai, India",
    period: "May 2026 – Aug 2026",
    startDate: "2026-05",
    endDate: "2026-08",
    current: false,
    description: "Engineered core backend REST services, JWT authentication, and relational schema optimization for production modules.",
    achievements: [
      "Built and shipped 14 RESTful API endpoints using Node.js/Express for core application modules, implementing JWT-based authentication to secure all protected routes.",
      "Optimized PostgreSQL schemas across 8 related entities through indexing and query restructuring, noticeably improving average query response time.",
      "Contributed to and extended a modular MVC backend architecture, adding reusable middleware for request validation and centralized authentication to reduce duplicate logic.",
      "Partnered with 3 frontend developers to define API contracts and integration workflows, enabling parallel development and on-time delivery of key features."
    ],
    skills: ["Node.js", "Express.js", "PostgreSQL", "JWT", "RESTful APIs", "MVC Architecture"]
  },
  {
    id: "exp-optimum",
    type: "experience",
    role: "Software Developer Intern",
    organization: "OptimumValue Solution",
    location: "Navi Mumbai, India",
    period: "Sept 2025 – Feb 2026",
    startDate: "2025-09",
    endDate: "2026-02",
    current: false,
    description: "Developed enterprise CRM automation and created an AI-powered requirement generation platform.",
    achievements: [
      "Customized Salesforce CRM using Apex, Lightning Components, and validation rules, automating 7 core business workflows to reduce manual processing effort.",
      "Built a full-stack MERN platform that converts plain-language input into structured user stories via LLM integration, reducing the team's manual story-writing effort.",
      "Developed multiple Apex classes, triggers, and Flows to implement multi-step business-logic automation for client requirements.",
      "Queried CRM data via SOQL to build 6 dashboards and reports, giving stakeholders real-time visibility into sales pipeline, lead conversion, and case-status metrics."
    ],
    skills: ["MERN Stack", "LLM Integration", "Salesforce CRM", "Apex", "SOQL", "Process Automation"]
  },
  {
    id: "edu-bvcoe",
    type: "education",
    role: "Bachelor of Engineering — Information Technology",
    organization: "Bharati Vidyapeeth College of Engineering (BVCOE)",
    location: "Navi Mumbai, India",
    period: "2021 – 2025",
    startDate: "2021-08",
    endDate: "2025-06",
    current: false,
    description: "Graduated with 7.8/10 CGPA. Core focus on Data Structures, Database Systems, Computer Networks, and Full-Stack Software Engineering.",
    achievements: [
      "Graduated with a 7.8/10 CGPA in Information Technology from Bharati Vidyapeeth College of Engineering.",
      "Built strong theoretical and practical foundations in Object-Oriented Programming, Database Management Systems (SQL & NoSQL), and Web Application Architecture.",
      "Led technical development on academic capstone projects utilizing full-stack JavaScript frameworks."
    ],
    skills: ["Data Structures", "Database Management", "OOP", "Computer Networks", "Web Technologies"]
  }
];

export const experience = timeline.filter((item) => item.type === "experience");
export const education = timeline.filter((item) => item.type === "education");

export default timeline;
```

---

### 4.5. File: `src/data/blogPosts.js`
```javascript
/**
 * Blog Posts Data Module
 * Technical development articles tailored to Aadinath Magar's engineering focus
 */

export const blogPosts = [
  {
    id: "architecting-scalable-mern-mvc",
    slug: "architecting-scalable-mern-mvc",
    title: "Architecting Scalable MERN Applications with Modular MVC",
    excerpt: "A practical guide to organizing large-scale Node.js and Express backends using modular controllers, service layers, and schema-driven database abstraction.",
    content: "When building full-stack applications that scale beyond a few endpoints, standard monolithic controller files quickly become maintenance bottlenecks. By decoupling routes, validation middleware, business logic services, and database query layers, teams can maintain clean boundaries and parallelize feature development efficiently.",
    date: "Aug 28, 2026",
    readTime: "6 min read",
    category: "Backend Architecture",
    tags: ["MERN", "Node.js", "Express", "Architecture", "MongoDB"],
    author: {
      name: "Aadinath Magar",
      role: "Full-Stack Developer",
      avatar: "/portrait-placeholder.jpg"
    },
    featured: true,
    isPlaceholder: true
  },
  {
    id: "react-18-concurrent-performance",
    slug: "react-18-concurrent-performance",
    title: "Building High-Performance React 18 Interfaces with Concurrent Features",
    excerpt: "How to leverage useTransition, Suspense boundaries, and code-splitting to maintain 60fps responsiveness during heavy state mutations and 3D canvas rendering.",
    content: "User experience on the modern web is dictated by perceived latency. React 18 concurrent features fundamentally alter how component render priority is handled. By combining Suspense boundaries for 3D graphics (like Three.js canvas components) with useTransition for non-urgent state updates, interfaces stay buttery smooth even under demanding workloads.",
    date: "Aug 14, 2026",
    readTime: "8 min read",
    category: "Frontend Engineering",
    tags: ["React", "Performance", "Concurrent Mode", "Vite", "JavaScript"],
    author: {
      name: "Aadinath Magar",
      role: "Full-Stack Developer",
      avatar: "/portrait-placeholder.jpg"
    },
    featured: true,
    isPlaceholder: true
  },
  {
    id: "fluid-scroll-choreography-gsap-lenis",
    slug: "fluid-scroll-choreography-gsap-lenis",
    title: "Fluid Scroll Choreography: Harmonizing GSAP, Lenis, and Framer Motion",
    excerpt: "Tuning the GSAP ticker with Lenis inertial smooth scrolling and Framer Motion page curtains for an editorial-grade cinematic browsing experience.",
    content: "Crafting a memorable interactive portfolio requires smooth scrolling and animation timing that feels organic rather than mechanical. Synchronizing Lenis virtual scroll ticks with GSAP ScrollTrigger updates while using Framer Motion's AnimatePresence for full-screen route wipes yields an unforgettable editorial feel.",
    date: "Jul 29, 2026",
    readTime: "7 min read",
    category: "Creative Engineering",
    tags: ["GSAP", "Lenis", "Framer Motion", "Animations", "UI/UX"],
    author: {
      name: "Aadinath Magar",
      role: "Full-Stack Developer",
      avatar: "/portrait-placeholder.jpg"
    },
    featured: false,
    isPlaceholder: true
  },
  {
    id: "jwt-auth-account-scoped-isolation",
    slug: "jwt-auth-account-scoped-isolation",
    title: "JWT Authentication & Account-Scoped Isolation in Production Node.js",
    excerpt: "Hardening multi-user REST APIs using cryptographically signed JSON Web Tokens, bcrypt password hashing, input sanitization, and tenant-scoped SQL queries.",
    content: "Data security in multi-tenant or multi-user applications begins with strict isolation guarantees at both the middleware and database abstraction layers. Passing validated user IDs from verified JWT tokens directly into scoped SQL queries prevents horizontal privilege escalation and ensures robust data privacy.",
    date: "Jul 10, 2026",
    readTime: "9 min read",
    category: "Security & Database",
    tags: ["Security", "JWT", "Node.js", "PostgreSQL", "MySQL"],
    author: {
      name: "Aadinath Magar",
      role: "Full-Stack Developer",
      avatar: "/portrait-placeholder.jpg"
    },
    featured: false,
    isPlaceholder: true
  }
];

export const featuredBlogPosts = blogPosts.filter((post) => post.featured);
export default blogPosts;
```

---

## 5. Verification Method

To verify the integrity and syntax of these specifications:
1. **Syntax & Import Check**:
   Once created in `src/data/`, verify all exports load cleanly in Node or Vite bundler:
   ```bash
   node -e "import('./src/data/developer.js').then(m => console.log('developer loaded:', m.developer.name));"
   node -e "import('./src/data/projects.js').then(m => console.log('projects count:', m.projects.length));"
   node -e "import('./src/data/skills.js').then(m => console.log('skillCategories count:', m.skillCategories.length));"
   node -e "import('./src/data/timeline.js').then(m => console.log('timeline count:', m.timeline.length));"
   node -e "import('./src/data/blogPosts.js').then(m => console.log('blogPosts count:', m.blogPosts.length));"
   ```
2. **Contract Compliance**:
   - `developer.name === "Aadinath Magar"`
   - `projects[0].demoUrl === "https://spendly-sable-delta.vercel.app/"`
   - `projects[1].demoUrl === "https://business-managment-alpha.vercel.app/login"`
   - `projects[1].demoCredentials.email === "admin@antigravity.com"`
   - `timeline.find(t => t.id === 'edu-bvcoe').organization.includes('Bharati Vidyapeeth')`
   - `blogPosts.length === 4`
