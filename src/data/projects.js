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
    gradient: "from-[#C4704A]/20 via-[#EDE8DF]/30 to-transparent",
    accentColor: "#C4704A",
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
    gradient: "from-[#C4704A]/20 via-[#EDE8DF]/30 to-transparent",
    accentColor: "#C4704A",
    highlights: [
      "Engineered a full-stack CRM unifying multi-branch lead tracking, invoicing, and quotation workflows",
      "Implemented dynamic lead assignment and lifecycle status-tracking using React and normalized PostgreSQL",
      "Automated quotation-to-invoice pipeline, eliminating manual handoffs across operations and accounting",
      "Integrated LLM automation to transform natural language specifications into structured operational modules"
    ]
  }
];

export const featuredProjects = projects.filter((p) => p.featured);
export default projects;
