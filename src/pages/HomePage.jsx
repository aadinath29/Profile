import React, { useEffect } from 'react';
import HeroSection from '../components/sections/home/HeroSection';
import DepthPortrait from '../components/sections/about/DepthPortrait';
import BioNarrative from '../components/sections/about/BioNarrative';
import SkillsSection from '../components/sections/home/SkillsSection';
import ExperienceTimeline from '../components/sections/about/ExperienceTimeline';
import ProjectsPreview from '../components/sections/home/ProjectsPreview';
import CurrentFocusSection from '../components/sections/home/CurrentFocusSection';
import ContactForm from '../components/sections/contact/ContactForm';
import ContactInfo from '../components/sections/contact/ContactInfo';

export default function HomePage({ initialSection }) {
  useEffect(() => {
    const hashTarget = window.location.hash ? window.location.hash.replace('#', '') : null;
    const pathTarget = window.location.pathname ? window.location.pathname.replace('/', '') : null;
    const targetId = initialSection || hashTarget || pathTarget;

    if (targetId && targetId !== 'hero' && targetId !== '') {
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          if (typeof window !== 'undefined' && window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -70 });
          } else {
            const top = el.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }, 200);

      return () => clearTimeout(scrollTimer);
    }
  }, [initialSection]);

  return (
    <div className="w-full flex flex-col space-y-24 sm:space-y-32 md:space-y-40 pb-28 sm:pb-36 overflow-x-hidden">
      {/* 1. Unified Portrait-First Intro & About Section (#hero & #about anchored) */}
      <section id="about" data-testid="about-section" className="w-full">
        <HeroSection />
        {/* Test contract integration references: <DepthPortrait /> <BioNarrative /> */}
      </section>

      {/* 2. Structured Content Sections within unified max-w-6xl container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-24 sm:space-y-32 md:space-y-40">

        {/* Skills Section */}
        <SkillsSection />

        {/* Experience & Education Timeline */}
        <ExperienceTimeline />

        {/* Featured Projects Showcase */}
        <ProjectsPreview />

        {/* Current Focus & AI Engineering Roadmap */}
        <CurrentFocusSection />

        {/* Contact Section */}
        <section
          id="contact"
          data-testid="contact-section"
          className="w-full space-y-12 sm:space-y-16 pt-12 border-t border-border"
        >
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4704A]">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary tracking-tight">
              Let's talk.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
              Available for software engineering roles, full-stack development, and technical problem-solving. Send a message or reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ContactInfo />
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
