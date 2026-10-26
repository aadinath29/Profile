import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown, Github, Linkedin, Mail } from 'lucide-react';
import { developer } from '../../data/developer';
import ThemeToggle from '../ui/ThemeToggle';

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks = [],
  activeSection,
  onSelectSection,
}) {
  const location = useLocation();

  // 1. Dual-Layer Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen]);

  // 2. Escape Key Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 3. Viewport Resize to Desktop (>= 768px) Auto-Close
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  // Framer Motion Animation Variants
  const overlayVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 0.45,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -30 },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          id="mobile-navigation-drawer"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-50 bg-[#F5F0E8]/98 dark:bg-[#141210]/98 backdrop-blur-md flex flex-col justify-between p-6 sm:p-10 md:hidden overflow-y-auto"
        >
          {/* Top Bar: Brand Logo, Theme Toggle & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-[#EDE8DF] dark:border-[#1C1A18]">
            <Link
              to="/"
              onClick={onClose}
              className="font-serif text-2xl font-bold tracking-tight text-text-primary hover:text-[#C4704A] transition-colors focus:outline-none"
            >
              Aadinath
            </Link>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-[#EDE8DF] dark:border-[#1C1A18] text-text-primary hover:text-[#C4704A] hover:border-[#C4704A]/60 transition-colors focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Staggered Navigation Link List */}
          <motion.nav
            aria-label="Mobile Navigation Links"
            className="flex flex-col gap-2 my-auto py-8"
          >
            {navLinks.map((link, index) => {
              const isActive = (activeSection && link.id === activeSection) || location.pathname === link.path;
              const formattedIndex = String(index + 1).padStart(2, '0');

              return (
                <motion.div key={link.path || link.name} variants={itemVariants}>
                  <Link
                    to={link.path || '/'}
                    onClick={(e) => {
                      const targetId = link.id || (link.href && link.href.replace('#', ''));
                      if (targetId) {
                        const targetEl = document.getElementById(targetId);
                        if (targetEl) {
                          e.preventDefault();
                          onClose();
                          setTimeout(() => {
                            if (typeof window !== 'undefined' && window.__lenis) {
                              window.__lenis.scrollTo(targetEl, { offset: -70 });
                            } else {
                              const top = targetEl.getBoundingClientRect().top + window.scrollY - 70;
                              window.scrollTo({ top, behavior: 'smooth' });
                            }
                            window.history.pushState(null, '', `#${targetId}`);
                            if (onSelectSection) onSelectSection(targetId);
                          }, 200);
                          return;
                        }
                      }
                      onClose();
                    }}
                    className={`group flex items-baseline justify-between py-3 min-h-[48px] border-b border-[#EDE8DF] dark:border-[#1C1A18] transition-colors focus:outline-none ${
                      isActive
                        ? 'text-[#C4704A] font-bold'
                        : 'text-text-primary hover:text-[#C4704A]'
                    }`}
                  >
                    <span className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
                      {link.name}
                    </span>
                    <span className="font-mono text-xs tracking-widest text-text-muted group-hover:text-[#C4704A] transition-colors">
                      {formattedIndex}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Bottom Cluster: Availability, Social Links & Resume */}
          <div className="pt-6 border-t border-[#EDE8DF] dark:border-[#1C1A18] flex flex-col gap-5">
            {/* Availability Badge */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C4704A]" />
              <span className="text-xs font-sans uppercase tracking-wider text-text-muted">
                Available for roles • India
              </span>
            </div>

            {/* Social Links & Resume */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-[#EDE8DF] dark:border-[#1C1A18] text-text-secondary hover:text-[#C4704A] hover:border-[#C4704A]/60 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-[#EDE8DF] dark:border-[#1C1A18] text-text-secondary hover:text-[#C4704A] hover:border-[#C4704A]/60 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${developer.email}`}
                  aria-label="Send Email"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-[#EDE8DF] dark:border-[#1C1A18] text-text-secondary hover:text-[#C4704A] hover:border-[#C4704A]/60 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <a
                href={developer.resumeUrl || '/Aadi_Resume-04-09-2026.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans font-medium rounded border border-[#C4704A] text-[#C4704A] hover:bg-[#C4704A] hover:text-white transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

