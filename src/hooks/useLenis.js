import { useState, useEffect } from 'react';

export function useLenis() {
  const [lenis, setLenis] = useState(() =>
    typeof window !== 'undefined' ? window.__lenis || null : null
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.__lenis) {
      setLenis(window.__lenis);
      return;
    }

    const interval = setInterval(() => {
      if (window.__lenis) {
        setLenis(window.__lenis);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (target, options = {}) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const element = document.querySelector(target);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return { lenis, scrollTo };
}

export default useLenis;
