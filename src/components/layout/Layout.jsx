import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../common/CustomCursor';
import ScrollProgressBar from '../common/ScrollProgressBar';

// Register GSAP ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);

  // 1. Initialize Lenis & Sync with GSAP Ticker (T1-F14-02, T1-F14-03, T2-F14-05)
  useEffect(() => {
    // Avoid running in non-browser environments
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Pipe GSAP ticker time into Lenis requestAnimationFrame
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // T2-F14-05: Zero lag smoothing guard

    // Teardown Contract (T2-F14-01)
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // 2. Route Change & Hash Scroll Restoration (T1-F14-05, T2-F14-02)
  useEffect(() => {
    const pathSection = location.pathname ? location.pathname.replace('/', '') : '';
    const hashSection = typeof window !== 'undefined' && window.location.hash ? window.location.hash.replace('#', '') : '';
    const targetId = hashSection || (['about', 'skills', 'experience', 'projects', 'contact'].includes(pathSection) ? pathSection : '');

    if (typeof window !== 'undefined' && targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(element, { offset: -70 });
          } else {
            const top = element.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 150);
        ScrollTrigger.refresh();
        return;
      }
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [location.pathname, location.hash]);

  return (
    <div
      data-testid="master-layout"
      className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-[#C4704A]/20 selection:text-text-primary relative"
    >
      {/* Skip to Main Content Link for WCAG Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#C4704A] focus:text-white focus:font-medium focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>

      {/* High-Performance Custom Desktop Cursor (Feature 10) */}
      <CustomCursor />

      {/* Viewport Scroll Progress Bar (Feature 11) */}
      <ScrollProgressBar />

      {/* Sticky Header / Navigation (Feature 12) */}
      <Navbar />

      {/* Primary Page Content Wrapper (T1-F14-04) */}
      <main id="main-content" className="flex-grow pt-20 focus:outline-none">
        {children}
      </main>

      {/* Global Editorial Footer */}
      <Footer />
    </div>
  );
}
