import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SKILL_GROUPS = [
  {
    category: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'JWT Auth', 'MVC Architecture'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL'],
  },
  {
    category: 'Languages',
    skills: ['JavaScript', 'Python', 'Java', 'SQL'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Postman', 'Vite', 'npm', 'Vercel'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (rowsRef.current && rowsRef.current.length > 0) {
        gsap.fromTo(
          rowsRef.current,
          {
            clipPath: 'inset(0 100% 0 0)',
            x: -20,
            opacity: 0,
          },
          {
            clipPath: 'inset(0 0% 0 0)',
            x: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      data-testid="skills-section"
      className="w-full space-y-8 sm:space-y-12"
    >
      {/* Honest, understated heading: "What I work with" */}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
        What I work with
      </h2>

      {/* Typography-only category list */}
      <div className="space-y-6 sm:space-y-8 pt-4">
        {SKILL_GROUPS.map((group, idx) => (
          <div
            key={group.category}
            ref={(el) => (rowsRef.current[idx] = el)}
            className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-3 border-b border-[#EDE8DF] dark:border-[#1C1A18] will-change-transform"
          >
            <span className="font-sans font-medium text-sm uppercase tracking-wider text-[#C4704A] sm:w-36 shrink-0">
              {group.category} —
            </span>
            <span className="font-sans text-xl sm:text-2xl md:text-3xl font-normal text-text-primary tracking-tight break-words">
              {group.skills.join(' · ')}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
