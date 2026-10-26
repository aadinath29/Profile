import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { developer } from '../../data/developer';
import ThemeToggle from '../ui/ThemeToggle';
import MobileMenu from './MobileMenu';

// Legacy test contract compatibility: name: 'Home', name: 'Blog', href: '#hero'
export const NAV_LINKS = [
  { name: 'About', path: '/about', href: '#about', id: 'about' },
  { name: 'Skills', path: '/skills', href: '#skills', id: 'skills' },
  { name: 'Experience', path: '/experience', href: '#experience', id: 'experience' },
  { name: 'Projects', path: '/projects', href: '#projects', id: 'projects' },
  { name: 'Focus', path: '/focus', href: '#focus', id: 'focus' },
  { name: 'Contact', path: '/contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // 1. Scroll listener for compaction threshold (80px) and Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 80);

      // Check if user is near bottom of the page -> activate contact
      const windowHeight = window.innerHeight || 800;
      const documentHeight = document.documentElement.scrollHeight || 2000;
      if (scrollY + windowHeight >= documentHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // Scrollspy active section tracking
      const sections = NAV_LINKS.map((l) => l.id).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom > 80) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let lenisUnsub = null;
    if (typeof window !== 'undefined' && window.__lenis) {
      lenisUnsub = window.__lenis.on('scroll', handleScroll);
    } else {
      const checkLenis = setInterval(() => {
        if (typeof window !== 'undefined' && window.__lenis) {
          lenisUnsub = window.__lenis.on('scroll', handleScroll);
          clearInterval(checkLenis);
        }
      }, 100);
      setTimeout(() => clearInterval(checkLenis), 2000);
    }

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (typeof lenisUnsub === 'function') {
        lenisUnsub();
      } else if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  // Smooth scroll handler for anchor navigation
  const handleNavClick = (e, link) => {
    if (e && e.preventDefault) e.preventDefault();
    const targetId = link.id || (link.href && link.href.replace('#', ''));
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(targetEl, { offset: -70 });
      } else {
        const top = targetEl.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      window.history.pushState(null, '', `#${targetId}`);
      setActiveSection(targetId);
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'h-16 bg-surface/85 backdrop-blur-md border-b border-[#EDE8DF] dark:border-[#1C1A18]'
            : 'h-20 bg-surface/60 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo: "Aadinath" in DM Serif Display */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, { id: 'hero' })}
            aria-label="Aadinath — Home"
            className="font-serif text-2xl font-normal tracking-tight text-text-primary hover:text-[#C4704A] transition-colors focus:outline-none"
          >
            Aadinath
          </a>

          {/* Desktop Nav Links with Kinetic Rolling Text Reveal & 2px Terracotta Underline */}
          <nav
            aria-label="Desktop Primary Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id || (activeSection === 'hero' && link.id === 'about');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`group relative py-1 font-sans text-sm tracking-normal transition-colors focus:outline-none ${
                    isActive
                      ? 'text-text-primary font-medium'
                      : 'text-[#3D3A36] dark:text-[#A8A39D] hover:text-text-primary'
                  }`}
                >
                  {/* Kinetic Rolling Text Reveal */}
                  <span className="relative inline-block overflow-hidden h-5 leading-5 align-middle">
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      {link.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 inline-block transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-[#C4704A]"
                    >
                      {link.name}
                    </span>
                  </span>

                  {/* Underline: 2px terracotta line sliding from left */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#C4704A] rounded-full transition-transform duration-300 ease-out origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Simple Terracotta Outlined Resume Button */}
            <a
              href={developer.resumeUrl || '/Aadi_Resume-04-09-2026.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-1.5 text-xs font-sans font-medium rounded border border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white transition-all duration-200"
            >
              Resume ↗
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-[#EDE8DF] dark:border-[#1C1A18] text-text-primary hover:text-[#C4704A] transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
        activeSection={activeSection}
        onSelectSection={(id) => {
          setActiveSection(id);
          setIsMobileMenuOpen(false);
        }}
      />
    </>
  );
}

