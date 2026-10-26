import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useCursor } from '../../context/CursorContext';

export default function CustomCursor() {
  const { cursorVariant, cursorText, setCursorVariant, setCursorText, resetCursor } = useCursor();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [isTouch, setIsTouch] = useState(true); // Default safe until verified on client

  // 1. Standard OS Pointer Enforcement (Suppresses custom cursor to retain standard mouse pointer)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const touchQuery = window.matchMedia('(hover: none) or (pointer: coarse)');
    const updateTouchStatus = () => setIsTouch(true); // Keep standard cursor active

    updateTouchStatus();

    if (touchQuery.addEventListener) {
      touchQuery.addEventListener('change', updateTouchStatus);
      return () => touchQuery.removeEventListener('change', updateTouchStatus);
    } else if (touchQuery.addListener) {
      touchQuery.addListener(updateTouchStatus);
      return () => touchQuery.removeListener(updateTouchStatus);
    }
  }, []);

  // 2. High-Performance 120fps Mouse Tracking via GSAP quickTo
  useEffect(() => {
    if (isTouch || !dotRef.current || !ringRef.current) return;

    // Set initial center coordinates
    gsap.set([dotRef.current, ringRef.current], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    // Allocate reusable quickTo pipelines (Zero GC & Zero React re-renders)
    const xToDot = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power2.out' });

    const xToRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.28, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.28, ease: 'power3.out' });

    let isVisible = false;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      xToDot(clientX);
      yToDot(clientY);
      xToRing(clientX);
      yToRing(clientY);

      if (!isVisible) {
        isVisible = true;
        gsap.to([dotRef.current, ringRef.current], {
          opacity: 1,
          duration: 0.2,
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to([dotRef.current, ringRef.current], {
        opacity: 0,
        duration: 0.25,
        overwrite: 'auto',
      });
    };

    const handleMouseEnter = () => {
      isVisible = true;
      gsap.to([dotRef.current, ringRef.current], {
        opacity: 1,
        duration: 0.2,
        overwrite: 'auto',
      });
    };

    const handleMouseDown = () => {
      gsap.to(ringRef.current, { scale: 0.82, duration: 0.12, overwrite: 'auto' });
    };

    const handleMouseUp = () => {
      // Return to variant scale
      const targetScale = cursorVariant === 'project' ? 2.8 : cursorVariant === 'hover' ? 1.6 : 1;
      gsap.to(ringRef.current, { scale: targetScale, duration: 0.2, overwrite: 'auto' });
    };

    // 3. Document-Level Smart Event Delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const projectTarget = target.closest('[data-cursor="project"]');
      if (projectTarget) {
        const text = projectTarget.getAttribute('data-cursor-text') || 'View';
        setCursorVariant('project');
        setCursorText(text);
        return;
      }

      const interactiveTarget = target.closest(
        'a, button, [role="button"], input[type="submit"], [data-cursor="hover"]'
      );
      if (interactiveTarget) {
        setCursorVariant('hover');
        return;
      }

      const inputTarget = target.closest(
        'input:not([type="submit"]):not([type="button"]), textarea, select, [data-cursor="hidden"]'
      );
      if (inputTarget) {
        setCursorVariant('hidden');
        return;
      }
    };

    const handleMouseOut = (e) => {
      const related = e.relatedTarget;
      if (!related || !document.contains(related)) {
        handleMouseLeave();
        return;
      }
      const target = e.target;
      if (!(target instanceof Element)) return;

      const leavingTarget = target.closest('a, button, [role="button"], [data-cursor]');
      const enteringTarget = related.closest('a, button, [role="button"], [data-cursor]');

      if (leavingTarget && !enteringTarget) {
        resetCursor();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTouch, cursorVariant, setCursorVariant, setCursorText, resetCursor]);

  // 4. Animate Variant Transitions
  useEffect(() => {
    if (isTouch || !dotRef.current || !ringRef.current) return;

    if (cursorVariant === 'hover') {
      gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.2, overwrite: 'auto' });
      gsap.to(ringRef.current, {
        scale: 1.6,
        backgroundColor: 'rgba(196, 112, 74, 0.12)',
        borderColor: '#C4704A',
        boxShadow: 'none',
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 0, scale: 0, duration: 0.15 });
      }
    } else if (cursorVariant === 'project') {
      gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.2, overwrite: 'auto' });
      gsap.to(ringRef.current, {
        scale: 2.8,
        backgroundColor: 'rgba(196, 112, 74, 0.95)',
        borderColor: '#C4704A',
        boxShadow: 'none',
        duration: 0.3,
        ease: 'back.out(1.5)',
        overwrite: 'auto',
      });
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.2, delay: 0.05 });
      }
    } else if (cursorVariant === 'hidden') {
      gsap.to([dotRef.current, ringRef.current], {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        overwrite: 'auto',
      });
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 0, scale: 0, duration: 0.15 });
      }
    } else {
      // Default Variant
      gsap.to(dotRef.current, {
        scale: 1,
        opacity: 1,
        backgroundColor: '#C4704A',
        duration: 0.2,
        overwrite: 'auto',
      });
      gsap.to(ringRef.current, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(196, 112, 74, 0.45)',
        boxShadow: 'none',
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 0, scale: 0, duration: 0.15 });
      }
    }
  }, [cursorVariant, isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner Sharp Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C4704A] pointer-events-none z-[9999] will-change-transform"
        aria-hidden="true"
      />

      {/* Outer Fluid Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#C4704A]/50 pointer-events-none z-[9998] flex items-center justify-center will-change-transform"
        aria-hidden="true"
      >
        <span
          ref={textRef}
          className="text-[10px] font-mono font-bold tracking-widest text-white uppercase select-none opacity-0 pointer-events-none"
        >
          {cursorText}
        </span>
      </div>
    </>
  );
}
