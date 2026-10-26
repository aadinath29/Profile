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
