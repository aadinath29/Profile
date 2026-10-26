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
      { name: "HTML/CSS", level: 94, highlighted: false },
      { name: "Tailwind CSS", level: 95, highlighted: true },
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
      { name: "REST APIs", level: 92, highlighted: true },
      { name: "JWT Auth", level: 88, highlighted: true },
      { name: "MVC Architecture", level: 85, highlighted: false }
    ]
  },
  {
    id: "database",
    title: "Database Systems",
    description: "Modeling relational schemas, query tuning, indexing, and scalable NoSQL document architectures.",
    colSpan: "col-span-12 md:col-span-5",
    skills: [
      { name: "PostgreSQL", level: 88, highlighted: true },
      { name: "MySQL", level: 86, highlighted: true },
      { name: "MongoDB", level: 88, highlighted: true },
      { name: "SQL", level: 85, highlighted: true }
    ]
  },
  {
    id: "tools",
    title: "Dev Tools & Infrastructure",
    description: "Modern build tooling, version control workflows, automated deployment, and package management.",
    colSpan: "col-span-12 md:col-span-7",
    skills: [
      { name: "Git", level: 92, highlighted: true },
      { name: "GitHub", level: 92, highlighted: true },
      { name: "Postman", level: 88, highlighted: true },
      { name: "Vite", level: 90, highlighted: true },
      { name: "npm", level: 90, highlighted: false },
      { name: "Vercel", level: 90, highlighted: true }
    ]
  }
];

export const marqueeSkills = [
  { name: "React", category: "frontend", icon: "react" },
  { name: "JavaScript", category: "language", icon: "javascript" },
  { name: "Node.js", category: "backend", icon: "nodejs" },
  { name: "Express", category: "backend", icon: "express" },
  { name: "PostgreSQL", category: "database", icon: "postgresql" },
  { name: "MySQL", category: "database", icon: "mysql" },
  { name: "MongoDB", category: "database", icon: "mongodb" },
  { name: "Tailwind CSS", category: "styling", icon: "tailwind" },
  { name: "Python", category: "language", icon: "python" },
  { name: "Java", category: "language", icon: "java" },
  { name: "SQL", category: "database", icon: "sql" },
  { name: "Git", category: "tool", icon: "git" },
  { name: "GitHub", category: "tool", icon: "github" },
  { name: "Postman", category: "tool", icon: "postman" },
  { name: "Vite", category: "build", icon: "vite" },
  { name: "npm", category: "tool", icon: "npm" },
  { name: "Vercel", category: "cloud", icon: "vercel" }
];

export default {
  skillCategories,
  marqueeSkills
};
