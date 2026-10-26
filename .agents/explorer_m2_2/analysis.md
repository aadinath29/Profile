# Technical Blueprint: Features 10 & 11 (Custom Desktop Cursor & Viewport Scroll Progress Bar)

**Explorer**: Explorer 2 (Milestone 2)  
**Date**: 2026-09-10  
**Status**: COMPLETE / READY FOR IMPLEMENTATION  
**Target Files**:
- `src/context/CursorContext.jsx` (New file — Feature 10)
- `src/components/common/CustomCursor.jsx` (New file — Feature 10)
- `src/components/common/ScrollProgressBar.jsx` (New file — Feature 11)
- `src/styles/index.css` (Style modification — Feature 10 CSS reset & progress styling)

---

## 1. Executive Summary & Architectural Overview

This blueprint provides the exact engineering specifications, performance guarantees, and complete drop-in code implementations for:
1. **Feature 10: High-Performance Custom Desktop Cursor** — A dual-element cursor (sharp center dot + fluid outer ring) delivering 120fps mouse tracking via GSAP `quickTo`, contextual hover expansions, dynamic project card text overlays ("View" / "Open"), strict touch device deactivation, and desktop-only CSS cursor suppression.
2. **Feature 11: Viewport Scroll Progress Bar** — A fixed 3px horizontal gradient bar at the top of the viewport tracking 0% to 100% document scroll using composite-only GPU transforms (`scaleX` with `origin-left`), division-by-zero resilience, and automatic route-reset synchronization.

### Core Architectural Principles
- **Zero React Re-Renders on Mouse Movement**: Mouse coordinates `(clientX, clientY)` are never dispatched to React state or context. Mouse movement events pipe directly into GSAP `quickTo` setters manipulating DOM transform matrices on composite layers.
- **Strict Touch Device Suppression**: Touch devices are detected via `window.matchMedia('(hover: none) or (pointer: coarse)')`. Touch sessions completely bypass DOM creation and listener registration.
- **Hardware-Accelerated Composite Pipeline**: Both cursor movement and scroll progress bar utilize CSS transforms (`translate3d` and `scaleX`), bypassing layout recalculations (reflows) and paint stages.
- **Universal Event Delegation + Programmatic API**: Interactive hovers are captured via lightweight document-level event delegation (targeting `<a>`, `<button>`, `[data-cursor]`), while `CursorContext` provides fine-grained programmatic control for specialized interactive states.

---

## 2. Feature 10: High-Performance Custom Desktop Cursor

### 2.1 Interface Contract & `CursorContext.jsx`

`src/context/CursorContext.jsx` manages discrete cursor visual states without tracking mouse coordinates.

#### State Model
- `cursorVariant`: `'default' | 'hover' | 'project' | 'hidden'`
- `cursorText`: `string` (default `''`, e.g., `'View'`, `'Open'`)

#### Exposed Context API
```typescript
interface CursorContextType {
  cursorVariant: 'default' | 'hover' | 'project' | 'hidden';
  cursorText: string;
  setCursorVariant: (variant: 'default' | 'hover' | 'project' | 'hidden') => void;
  setCursorText: (text: string) => void;
  setCursor: (variant: 'default' | 'hover' | 'project' | 'hidden', text?: string) => void;
  resetCursor: () => void;
}
```

#### Route Change Lifecycle Guarantee (`T3-ROUTE-03`)
Whenever a route transition occurs, `resetCursor()` is automatically invoked so that a cursor hovered over a link or project card does not retain a stale `'project'` or `'hover'` state on the newly mounted page.

---

### 2.2 Dual-Element Anatomy & GSAP `quickTo` Engine (`CustomCursor.jsx`)

The custom cursor consists of two independent, concentric DOM elements positioned at `fixed top-0 left-0`:

```
┌───────────────────────────────────────────────────────────────┐
│                      OUTER FLUID RING                         │
│  - Diameter: 36px (default), 58px (hover), 100px (project)    │
│  - GSAP quickTo duration: 0.28s, ease: "power3.out" (lag)    │
│  - Holds text label (e.g. "View") in 'project' variant        │
│                                                               │
│                   ┌───────────────────────┐                   │
│                   │   INNER CENTER DOT    │                   │
│                   │  - Diameter: 8px      │                   │
│                   │  - quickTo: 0.08s     │                   │
│                   │  - Instant response   │                   │
│                   └───────────────────────┘                   │
└───────────────────────────────────────────────────────────────┘
```

#### GSAP `quickTo` Pipeline Setup
Using standard `gsap.to()` on every `mousemove` allocates new Tween instances and generates garbage collector pressure at 120Hz. `gsap.quickTo` builds a reusable pipeline directly updating transforms:

```javascript
// Initial center alignment
gsap.set([dotRef.current, ringRef.current], {
  xPercent: -50,
  yPercent: -50,
  pointerEvents: 'none',
});

// Reusable quickTo setters
const xToDot = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power2.out' });
const yToDot = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power2.out' });

const xToRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.28, ease: 'power3.out' });
const yToRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.28, ease: 'power3.out' });

const onMouseMove = (e) => {
  xToDot(e.clientX);
  yToDot(e.clientY);
  xToRing(e.clientX);
  yToRing(e.clientY);
};
```

---

### 2.3 Variant State Machine & Visual Specifications

| Variant | Inner Dot Spec | Outer Ring Spec | Text Label Spec | Trigger Condition |
|---|---|---|---|---|
| `'default'` | `scale: 1`, `opacity: 1`, `bg: #00f0ff` | `scale: 1` (36px), `border: rgba(0,240,255,0.5)`, `bg: transparent`, `boxShadow: none` | `opacity: 0`, `scale: 0` | Default body / neutral canvas |
| `'hover'` | `scale: 0`, `opacity: 0` (morphed) | `scale: 1.6` (~58px), `border: #00f0ff`, `bg: rgba(0,240,255,0.15)`, `boxShadow: 0 0 16px rgba(0,240,255,0.35)` | `opacity: 0`, `scale: 0` | Interactive `<a>`, `<button>`, `[role="button"]` |
| `'project'` | `scale: 0`, `opacity: 0` | `scale: 2.8` (~100px), `border: #00f0ff`, `bg: rgba(0,240,255,0.95)`, `boxShadow: 0 0 24px rgba(0,240,255,0.5)` | `opacity: 1`, `scale: 1`, font: uppercase bold serif/sans, text color: `#000000` | Project teaser & grid cards (`data-cursor="project"`) |
| `'hidden'` | `scale: 0`, `opacity: 0` | `scale: 0`, `opacity: 0` | `opacity: 0`, `scale: 0` | Mouse leave viewport, text inputs, textareas |

#### Click Compression Feedback
On `mousedown`, the outer ring shrinks by ~15% (`scale: currentScale * 0.85`, duration `0.1s`), and snaps back on `mouseup`, providing crisp tactile physical feedback.

---

### 2.4 Universal Event Delegation
Instead of burdening every component with `onMouseEnter`/`onMouseLeave` props, `CustomCursor` attaches document-level listeners:
- Elements matching `a, button, [role="button"], [data-cursor="hover"]` trigger `'hover'`.
- Elements matching `[data-cursor="project"]` trigger `'project'` and extract `data-cursor-text` (defaulting to `"View"`).
- Elements matching `input:not([type="submit"]):not([type="button"]), textarea, select, [data-cursor="hidden"]` trigger `'hidden'`, revealing the native OS text-selection I-beam.

---

### 2.5 Touch Device Suppression
To strictly comply with `USER_REQUEST` and tests `T1-F10-05` & `T2-F10-05`:
```javascript
const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none) or (pointer: coarse)').matches;
};
```
If `isTouchDevice()` is `true`:
1. The component returns `null`.
2. No DOM nodes are injected into the tree.
3. No `mousemove` or `scroll` event listeners are attached.
4. An active `mediaQueryList.addEventListener('change', ...)` listens for dynamic pointer mode transitions (e.g. tablet docking).

---

### 2.6 Desktop CSS Reset in `src/styles/index.css`
In `src/styles/index.css`, native cursor suppression is wrapped in a strict media query so mobile and touch devices retain default OS pointer handling:

```css
/* Desktop-Only Custom Cursor Reset */
@media (hover: hover) and (pointer: fine) {
  *, *::before, *::after {
    cursor: none !important;
  }

  /* Retain native cursor on editable form controls */
  input:not([type="button"]):not([type="submit"]):not([type="reset"]),
  textarea,
  select,
  [contenteditable="true"] {
    cursor: auto !important;
  }
}
```

---

## 3. Feature 11: Viewport Scroll Progress Bar

### 3.1 Component Architecture (`ScrollProgressBar.jsx`)
`src/components/common/ScrollProgressBar.jsx` renders a fixed horizontal bar across the top of the viewport.

#### Visual Styling Specifications
- **Position**: `fixed top-0 left-0 right-0 z-[9998]` (high z-index, directly below cursor z-index `9999`).
- **Thickness**: `3px` (`h-[3px]`, satisfying mobile & desktop requirements `T1-F11-02` and `T2-F11-04`).
- **Gradient Fill**: Neon cyan to warm gold:
  `bg-gradient-to-r from-accent-cyan via-accent-cyan to-accent-gold`
  (uses CSS tokens `--color-accent-cyan: #00f0ff` and `--color-accent-gold: #fbbf24`).
- **Glow Shadow**: `shadow-[0_0_10px_rgba(0,240,255,0.7)]`.
- **Pass-Through**: `pointer-events-none`.

---

### 3.2 Hardware-Accelerated Composite Pipeline
- **NEVER** animate `width: ${pct}%`: changing `width` forces reflow, recalculating geometry for all descendant elements on every scroll tick.
- **MUST** use `transform: scaleX(progress)` with `transformOrigin: 'left'` (`origin-left` in Tailwind):
  - Handled exclusively on the GPU compositor thread.
  - Paired with `will-change: transform`.
  - Zero reflows, zero repaints during active scrolling.

---

### 3.3 Boundary & Edge Case Protections

#### 1. Division-by-Zero Resilience (`T2-F11-01`)
On pages where `scrollHeight <= innerHeight` (short pages, modal views, initial render before images load):
```javascript
const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
const progress = maxScroll <= 0 ? 0 : Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
```
Guarantees `progress` is always a clean numeric value in `[0, 1]`, never `NaN` or `Infinity`.

#### 2. Rapid Scroll Direction Reversal (`T2-F11-02`)
The scroll progress bar does not oscillate or flap. When scroll reaches top (`scrollY = 0`), `scaleX = 0`; when scroll reaches bottom, `scaleX = 1`.

#### 3. Sub-Pixel Progression Accuracy (`T2-F11-03`)
Continuous floating-point accuracy without aggressive rounding ensures smooth visual bar growth.

#### 4. Route Change Reset (`T3-ROUTE-02`)
When the route changes via `useLocation()`, the progress bar immediately resets its transform to `scaleX(0)` before the new page mounts or scrolls.

---

## 4. Production-Ready Code Implementations

Below are the complete, ready-to-implement code proposals. The implementer can directly copy these files.

### 4.1 Proposal: `src/context/CursorContext.jsx`

```jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const location = useLocation();

  const setCursor = useCallback((variant, text = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorVariant('default');
    setCursorText('');
  }, []);

  // Reset cursor on route change (T3-ROUTE-03 guarantee)
  useEffect(() => {
    resetCursor();
  }, [location.pathname, resetCursor]);

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        cursorText,
        setCursorVariant,
        setCursorText,
        setCursor,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}

export default CursorContext;
```

---

### 4.2 Proposal: `src/components/common/CustomCursor.jsx`

```jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useCursor } from '../../context/CursorContext';

export default function CustomCursor() {
  const { cursorVariant, cursorText, setCursorVariant, setCursorText, resetCursor } = useCursor();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [isTouch, setIsTouch] = useState(true); // Default safe until verified on client

  // 1. Detect Touch Device (T1-F10-05, T2-F10-05)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const touchQuery = window.matchMedia('(hover: none) or (pointer: coarse)');
    const updateTouchStatus = () => setIsTouch(touchQuery.matches);

    updateTouchStatus();

    if (touchQuery.addEventListener) {
      touchQuery.addEventListener('change', updateTouchStatus);
      return () => touchQuery.removeEventListener('change', updateTouchStatus);
    } else {
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
        backgroundColor: 'rgba(0, 240, 255, 0.12)',
        borderColor: '#00f0ff',
        boxShadow: '0 0 16px rgba(0, 240, 255, 0.35)',
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
        backgroundColor: 'rgba(0, 240, 255, 0.95)',
        borderColor: '#00f0ff',
        boxShadow: '0 0 24px rgba(0, 240, 255, 0.5)',
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
        backgroundColor: '#00f0ff',
        duration: 0.2,
        overwrite: 'auto',
      });
      gsap.to(ringRef.current, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(0, 240, 255, 0.45)',
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
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-cyan pointer-events-none z-[9999] will-change-transform"
        aria-hidden="true"
      />

      {/* Outer Fluid Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-accent-cyan/50 pointer-events-none z-[9998] flex items-center justify-center will-change-transform"
        aria-hidden="true"
      >
        <span
          ref={textRef}
          className="text-[10px] font-sans font-bold tracking-widest text-black uppercase select-none opacity-0 pointer-events-none"
        >
          {cursorText}
        </span>
      </div>
    </>
  );
}
```

---

### 4.3 Proposal: `src/components/common/ScrollProgressBar.jsx`

```jsx
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollProgressBar() {
  const barRef = useRef(null);
  const location = useLocation();

  // 1. Reset progress bar to 0% on route change (T3-ROUTE-02)
  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform = 'scaleX(0)';
    }
  }, [location.pathname]);

  // 2. Hardware-accelerated scroll tracking via scaleX
  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Division-by-zero protection (T2-F11-01) & clamping [0, 1]
      const progress = maxScroll <= 0 ? 0 : Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateProgress();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  return (
    <div
      ref={barRef}
      data-testid="scroll-progress"
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9998] pointer-events-none bg-gradient-to-r from-accent-cyan via-accent-cyan to-accent-gold shadow-[0_0_10px_rgba(0,240,255,0.7)] will-change-transform"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
}
```

---

### 4.4 Proposal: Additions to `src/styles/index.css`

Append the following desktop cursor reset rules to `src/styles/index.css`:

```css
/* ==========================================================================
   Desktop Custom Cursor Reset (Feature 10)
   Strictly active only on desktop pointer devices with hover capability
   ========================================================================== */
@media (hover: hover) and (pointer: fine) {
  *, *::before, *::after {
    cursor: none !important;
  }

  /* Retain native OS text cursor on form text controls */
  input:not([type="button"]):not([type="submit"]):not([type="reset"]),
  textarea,
  select,
  [contenteditable="true"] {
    cursor: auto !important;
  }
}
```

---

## 5. Integration Architecture

### Application & Layout Hierarchy
To seamlessly integrate these components into the application:

1. **Wrap in `App.jsx` or `main.jsx`**:
   `CursorProvider` must wrap the router routes so all components can access `useCursor()`.
   
   ```jsx
   <CursorProvider>
     <Layout>
       <Routes>...</Routes>
     </Layout>
   </CursorProvider>
   ```

2. **Mount in `Layout.jsx`**:
   In `src/components/layout/Layout.jsx`:
   ```jsx
   import React from 'react';
   import CustomCursor from '../common/CustomCursor';
   import ScrollProgressBar from '../common/ScrollProgressBar';
   import Navbar from './Navbar';
   import Footer from './Footer';

   export default function Layout({ children }) {
     return (
       <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent-cyan selection:text-black">
         <ScrollProgressBar />
         <CustomCursor />
         <Navbar />
         <main className="flex-grow pt-20">{children}</main>
         <Footer />
       </div>
     );
   }
   ```

3. **Consuming in Custom Components**:
   - **For Links & Standard Buttons**: Handled automatically by event delegation! No extra code needed.
   - **For Project Cards**:
     Add `data-cursor="project"` and `data-cursor-text="View"` or `data-cursor-text="Open"` to the project card container.
     ```jsx
     <div
       data-cursor="project"
       data-cursor-text="View"
       className="cursor-pointer group relative ..."
     >
       ...
     </div>
     ```
   - **Programmatic Control (Optional)**:
     ```jsx
     import { useCursor } from '../../context/CursorContext';
     const { setCursorVariant, setCursorText, resetCursor } = useCursor();
     ```

---

## 6. E2E Test Suite Verification Matrix

| Test ID | Test Name | Expected Behavior | Implementation Validation |
|---|---|---|---|
| **T1-F10-01** | Custom Cursor Component Existence | `CustomCursor.jsx` or `CursorContext.jsx` exists | Both files created in designated paths |
| **T1-F10-02** | Cursor Dot/Ring Tracking | Mouse coordinates properly captured | GSAP `quickTo` setters on `window.mousemove` |
| **T1-F10-03** | Cursor Hover Scaling | Hover scales ring > 1, project scales > hover | Default `1.0`, Hover `1.6`, Project `2.8` |
| **T1-F10-04** | Project Card Label Overlay | Sets variant to `'project'` and text to `'View'` / `'Open'` | `data-cursor-text` rendered inside ring `span` |
| **T1-F10-05** | Mobile Viewport / Touch Suppression | Media query `(pointer: coarse)` deactivates cursor | `window.matchMedia('(hover: none) or (pointer: coarse)')` returns `null` |
| **T2-F10-01** | Rapid Movement Jitter Smoothing | Lerp / GSAP inertial easing | `quickTo` with `duration: 0.28`, `ease: 'power3.out'` |
| **T2-F10-02** | Viewport Boundary Clamping | Clean handling when mouse exits screen | `mouseleave` event triggers opacity fade to 0 |
| **T2-F10-03** | Rapid Hover Transition Debouncing | Instant smooth tween to new variant scale | GSAP `overwrite: 'auto'` on variant change |
| **T2-F10-04** | Pointer-Events None Pass-Through | `pointer-events: none` on both dot and ring | `pointer-events-none` on both elements |
| **T2-F10-05** | Touch Device Coarse Pointer Deactivation | Deactivates on coarse pointer | Direct matchMedia suppression |
| **T3-ROUTE-03**| Cursor State Reset on Route Exit | Variant reset to `'default'`, text reset to `''` | `useEffect` with `location.pathname` dependency calls `resetCursor()` |
| **T1-F11-01** | Progress Bar Component Specification | `ScrollProgressBar.jsx` exists | File created in `src/components/common/` |
| **T1-F11-02** | Top Fixed Viewport Alignment Position | `position: fixed`, `top: 0`, `left: 0` | Fixed position styling with `z-[9998]` |
| **T1-F11-03** | Zero Scroll Initial Scale (0%) | 0 scroll equals 0 scale | Initial `scaleX(0)` |
| **T1-F11-04** | Full Scroll Termination Scale (100%) | Max scroll equals 1 scale | `Math.min(..., 1)` produces 1.0 at scroll bottom |
| **T1-F11-05** | Neon Accent Color Token Application | Contains `--color-accent-cyan` and `#00f0ff` | Tailwind classes `from-accent-cyan` & `to-accent-gold` |
| **T2-F11-01** | Zero Scroll Height Division-by-Zero Resilience | `maxScroll <= 0 ? 0 : ...` | Clean guard preventing `NaN` |
| **T2-F11-02** | Rapid Scroll Direction Reversal Stability | Stable range progression without flapping | Immediate RAF transform update |
| **T2-F11-03** | Sub-Pixel Scroll Progression Accuracy | Accurate fraction calculation | Unrounded float division |
| **T2-F11-04** | Mobile Viewport Progress Bar Thickness | 3px height on mobile | `h-[3px]` class applied universally |
| **T3-ROUTE-02**| Scroll Progress Reset on Route Change | Scale resets to 0 on route change | `useEffect` on `location.pathname` resets `scaleX(0)` |

---

## 7. Next Steps for Implementer
1. Create `src/context/CursorContext.jsx` using Section 4.1 code.
2. Create `src/components/common/CustomCursor.jsx` using Section 4.2 code.
3. Create `src/components/common/ScrollProgressBar.jsx` using Section 4.3 code.
4. Append desktop cursor reset rules to `src/styles/index.css` using Section 4.4 code.
5. Wire `CursorProvider` into `App.jsx` and render `CustomCursor` and `ScrollProgressBar` in `Layout.jsx` (or `App.jsx`).
6. Run `npm test` or `node tests/e2e/run-all.js` to verify all Tier 1–4 tests pass cleanly.
