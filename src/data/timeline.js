/**
 * Experience & Education Timeline Data Module
 * Verified career history for Aadinath Magar
 * Used for animated vertical SVG progress timeline on /about
 */

// TODO: Replace with real experience/education entries
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

export const timelineItems = timeline;
export const experience = timeline.filter((item) => item.type === "experience");
export const education = timeline.filter((item) => item.type === "education");

export default timeline;
