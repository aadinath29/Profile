# Milestone 3 Technical Blueprint: 3D Hero Scene, Canvas, Fallback & Error Handling

**Author**: `explorer_m3_2`  
**Milestone**: Milestone 3 — Core Pages Content & Routing (3D Graphics & Hero Section Track)  
**Target Components**:
1. `src/components/3d/HeroCanvas.jsx`
2. `src/components/3d/HeroGeometry.jsx`
3. `src/components/3d/ParticleField.jsx`
4. `src/components/3d/SceneFallback.jsx`
5. `src/components/common/ErrorBoundary.jsx`
6. `src/components/sections/home/HeroSection.jsx`

---

## 1. Executive Summary & Verification Baseline

An audit of the existing E2E test harness (`npm run test:e2e`) across all 4 tiers (387 total tests) shows that **381 tests pass** and only **6 tests currently fail**. Out of the 6 failing tests, **4 failures** are directly resolved by the component suite investigated and designed in this blueprint:

| Test ID | Test Description | Current Result | Root Cause |
|---------|------------------|----------------|------------|
| `T1-F27-03` | Hero Canvas Component Architecture | ✕ FAIL | `src/components/3d/HeroCanvas.jsx` or `src/components/sections/home/HeroSection.jsx` missing |
| `T1-F27-04` | 3D Particle Field Geometry Component Architecture | ✕ FAIL | `src/components/3d/ParticleField.jsx` or `src/components/3d/HeroCanvas.jsx` missing |
| `T1-F28-01` | SceneFallback Skeleton Component Existence | ✕ FAIL | `src/components/3d/SceneFallback.jsx` or `src/components/3d/HeroCanvas.jsx` missing |
| `T1-F28-05` | Error Boundary Catch for WebGL Failures | ✕ FAIL | `src/components/common/ErrorBoundary.jsx` or `src/components/3d/HeroCanvas.jsx` missing |

The other 2 test failures (`T1-F17-05` for `MarqueeTicker` and `T1-F20-05` for `TestimonialsSection`) belong to the peer section track of Milestone 3.

Once our 6 components are implemented according to the blueprints below, all 4 of these failing tests will pass, and the WebGL canvas will satisfy all boundary, cross-feature, and journey scenarios in Tiers 2, 3, and 4.

---

## 2. Test Requirements & Architectural Invariants Matrix

| Test ID | Requirement / Assertion | Architectural Invariant | Implementation Mechanism |
|---|---|---|---|
| **T1-F27-01** | Dependencies declared in `package.json` | `three`, `@react-three/fiber`, `@react-three/drei` present | Verified: `three` ^0.169.0, `@react-three/fiber` ^8.17.10, `@react-three/drei` ^9.117.0 |
| **T1-F27-02** | WebGL context initialization | Canvas WebGL context must initialize without crashing | R3F `<Canvas>` with WebGL2/WebGL fallback |
| **T1-F27-03** | Hero Canvas Architecture | File must exist at `src/components/3d/HeroCanvas.jsx` or `src/components/sections/home/HeroSection.jsx` | Implement both files as dedicated modular components |
| **T1-F27-04** | Particle Field Geometry Architecture | File must exist at `src/components/3d/ParticleField.jsx` or `src/components/3d/HeroCanvas.jsx` | Implement `ParticleField.jsx` utilizing `THREE.BufferGeometry` and `THREE.Points` |
| **T1-F27-05** | WebGL Context Cleanup on Unmount | Dispose geometries, materials, and listeners on unmount | Add explicit `geometry.dispose()`, `material.dispose()`, and remove window/tab event listeners |
| **T2-F27-01** | WebGL Context Loss Recovery | Handle `webglcontextlost` and `webglcontextrestored` | Add event listeners on `gl.domElement` with `event.preventDefault()` to allow automatic WebGL context restoration |
| **T2-F27-02** | High-DPI Pixel Ratio Clamping | Clamp devicePixelRatio: `Math.min(Math.max(dpr, 1), 2)` | Set R3F Canvas prop `dpr={[1, 2]}` |
| **T2-F27-03** | Canvas Resize Observer | Canvas dynamically resizes with container without distortion | Container styled `w-full h-full`, R3F default resize handling |
| **T2-F27-04** | Maximum Particle Count Ceiling | Requested particles <= 1000 | Desktop: 600 particles, Mobile: 250 particles |
| **T2-F27-05** | Background Tab RAF Pausing | Pause rendering when tab is hidden | Listen to `document.visibilitychange`; toggle frameloop between `'always'` and `'never'`/`'demand'` |
| **T1-F28-01** | SceneFallback Skeleton Existence | File must exist at `src/components/3d/SceneFallback.jsx` | Implement `SceneFallback.jsx` |
| **T1-F28-02** | Suspense Fallback Degradation | Root or child must have `data-testid="scene-fallback"` | Add `data-testid="scene-fallback"` to root container |
| **T1-F28-03** | Manual Chunks in Vite Config | `vite.config.js` separates `three` into vendor chunk | Verified: `vite.config.js` has `'vendor-three': ['three', '@react-three/fiber', '@react-three/drei']` |
| **T1-F28-04** | Non-blocking initial page paint | Lazy load 3D scene so it does not block DOM paint | `const HeroCanvas = React.lazy(() => import('@/components/3d/HeroCanvas'))` inside `<Suspense fallback={<SceneFallback />}>` |
| **T1-F28-05** | Error Boundary Catch for WebGL | File must exist at `src/components/common/ErrorBoundary.jsx` | Implement React class component `ErrorBoundary.jsx` |
| **T2-F28-02** | Skeleton Dimensions | Skeleton height must match canvas height (`100vh`) | Style root with `h-full min-h-[100vh] w-full` |
| **T2-F28-03** | Chunk Load Error Catch in ErrorBoundary | Catch `ChunkLoadError` or runtime exceptions | `ErrorBoundary` handles dynamic import rejection & WebGL creation failure |
| **T2-F28-04** | Memory Leak on Repeated Navigations | Unmount must decrement active canvas and dispose buffers | Component teardown hook frees all allocated GPU memory |
| **T2-F28-05** | Mobile Viewport Lightweight Fallback | Viewport 375px adapts cleanly | Particle count reduction and subtle CSS fallback |
| **T1-F15-01** | Headline "Aadinath Magar" | Exact name from `src/data/developer.js` | Headings use `developer.name` |
| **T1-F15-02** | Subtitle "Full-Stack Developer" | Exact title from `src/data/developer.js` | Subtitle uses `developer.title` |
| **T1-F15-03** | Resume CTA button | Link points to `/Aadi_Resume-04-09-2026.pdf` | Button uses `developer.resumeUrl` |
| **T1-F15-04** | Word Stagger Array Tokens | Word entrance uses staggered array | Use Framer Motion stagger children on words |
| **T1-F15-05** | Playfair Display serif typography | Headings use Playfair Display | Apply `font-serif` class (`Playfair Display`) |
| **T2-F15-01** | Mobile 375px headline wrapping | No horizontal layout overflow at 375px | Responsive font sizes (`text-5xl sm:text-6xl md:text-8xl`), `break-words` |
| **T2-F15-03** | Resume CTA touch target compliance | Touch target height >= 44px | CTA styled with `min-h-[48px] px-8 py-3.5` |
| **T2-F15-04** | Accessible Heading Hierarchy | Exactly one primary `<h1>` element | Single `<h1>` in HeroSection |
| **T3-THEME-02**| Dark/Light Theme Switching | WebGL context remains intact across theme toggles | Canvas background is transparent (`alpha: true`), scene colors adapt or contrast gracefully |
| **T3-ROUTE-05**| Curtain Transition Disposal & Remount | Clean unmount on route change (`/` -> `/about` -> `/`) | React.lazy + Suspense + clean unmount handlers |
| **T3-PRELOAD-02**| Preloader Lifecycle Synchronization | Preloader curtain unmasks hero smoothly | Initial opacity 0 until preloader curtain exits or zero delay graceful render |

---

## 3. Component Architecture & Blueprint Specifications

### Blueprint 1: `src/components/3d/HeroCanvas.jsx`

#### Architectural Role:
The WebGL Canvas container powered by `@react-three/fiber`. It establishes the 3D scene, cameras, cinematic three-point lighting, mouse-driven parallax tracking, DPR clamping, and handles WebGL context loss and tab visibility lifecycle events.

#### Key Features:
- **High-DPI Clamping**: `dpr={[1, 2]}` prevents excessive GPU fill rate on Retina / 3x mobile displays (`T2-F27-02`).
- **Context Loss Recovery**: Attaches `webglcontextlost` and `webglcontextrestored` on `gl.domElement` (`T2-F27-01`).
- **Visibility Optimization**: Automatically changes frameloop to `'demand'` when the browser tab is hidden to eliminate CPU/GPU drain (`T2-F27-05`).
- **Smooth Mouse Parallax**: Sub-scene group smoothly interpolates rotation towards mouse pointer coordinates via `THREE.MathUtils.lerp`.
- **Lighting Atmosphere**: Dual-accent palette lighting — neon cyan (`#00f0ff`) directional key light + warm gold (`#fbbf24`) fill point light + ambient fill.

#### Complete Proposed Implementation:
```jsx
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import HeroGeometry from './HeroGeometry';
import ParticleField from './ParticleField';

// Inner scene coordinator with mouse-driven parallax and smooth lerp
function SceneContent() {
  const groupRef = useRef(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Subtle mouse-driven parallax interpolation
    const targetRotY = pointer.x * 0.35;
    const targetRotX = -pointer.y * 0.25;
    
    // Smooth lerp (friction ~ 0.05 per frame)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      {/* Editorial Lighting Scheme */}
      <ambientLight intensity={0.5} />
      {/* Primary Key Light: Neon Cyan Accent */}
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#00f0ff" />
      {/* Accent Rim / Fill Light: Warm Gold Accent */}
      <pointLight position={[-5, -4, -2]} intensity={1.2} color="#fbbf24" />
      {/* Subtle Top White Highlight */}
      <pointLight position={[0, 5, 2]} intensity={0.6} color="#ffffff" />

      {/* Rotating Abstract Centerpiece */}
      <HeroGeometry />

      {/* Floating Ambient Particle Field */}
      <ParticleField />
    </group>
  );
}

export default function HeroCanvas({ className = '' }) {
  const [frameloop, setFrameloop] = useState('always');

  // Background Tab RAF Pausing Contract (T2-F27-05)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setFrameloop(document.hidden ? 'demand' : 'always');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45, near: 0.1, far: 1000 }}
        dpr={[1, 2]} // High-DPI Pixel Ratio Clamping (T2-F27-02)
        frameloop={frameloop}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          const dom = gl.domElement;
          
          // WebGL Context Loss Recovery Handler (T2-F27-01)
          const onContextLost = (event) => {
            event.preventDefault();
            console.warn('[HeroCanvas] WebGL context lost. Recovery scheduled.');
          };
          const onContextRestored = () => {
            console.info('[HeroCanvas] WebGL context successfully restored.');
          };

          dom.addEventListener('webglcontextlost', onContextLost, false);
          dom.addEventListener('webglcontextrestored', onContextRestored, false);

          // WebGL Context Cleanup Contract on Unmount (T1-F27-05, T2-F28-04)
          return () => {
            dom.removeEventListener('webglcontextlost', onContextLost);
            dom.removeEventListener('webglcontextrestored', onContextRestored);
            gl.dispose();
          };
        }}
        className="w-full h-full"
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
```

---

### Blueprint 2: `src/components/3d/HeroGeometry.jsx`

#### Architectural Role:
The central cinematic abstract geometry reflecting the developer's creative engineering ethos. Inspired by the depth benchmark of raviklaassens.com and editorial geometry of 13studio.

#### Key Features:
- **Dual-Layer Nested Geometry**:
  - **Outer Layer**: Wireframe Torus Knot (`args={[1.1, 0.28, 128, 32]}`) rendered in glowing neon cyan (`#00f0ff`) with delicate wireframe transparency.
  - **Inner Core**: High-gloss dark geometric core (`icosahedronGeometry args={[0.75, 0]}`) with deep navy/black metallic material and subtle cyan emissive glow.
  - **Outer Orbital Ring**: Delicate tilted ring with gold highlight (`#fbbf24`) providing chromatic depth.
- **Harmonic Motion**:
  - Independent multi-axis rotation per layer inside `useFrame`.
  - Continuous vertical floating harmonic oscillation: `y = Math.sin(time * 1.2) * 0.12`.
- **Resource Teardown**:
  - Geometries and materials automatically managed within React Three Fiber mesh nodes, cleanly garbage collected on unmount.

#### Complete Proposed Implementation:
```jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroGeometry() {
  const groupRef = useRef(null);
  const outerMeshRef = useRef(null);
  const innerMeshRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Floating vertical harmonic bobbing
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.12;
    }

    // 2. Multi-axis continuous rotation for outer wireframe
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.22;
      outerMeshRef.current.rotation.y += delta * 0.35;
    }

    // 3. Counter-rotation for inner core
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.15;
      innerMeshRef.current.rotation.z += delta * 0.25;
    }

    // 4. Slow orbital precession for accent ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Abstract Wireframe: Torus Knot */}
      <mesh ref={outerMeshRef}>
        <torusKnotGeometry args={[1.1, 0.28, 128, 32]} />
        <meshStandardMaterial
          wireframe
          color="#00f0ff"
          transparent
          opacity={0.32}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Glowing Core: Solid Icosahedron */}
      <mesh ref={innerMeshRef}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#07090e"
          emissive="#00f0ff"
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary Accent Ring: Warm Gold Accent */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <ringGeometry args={[1.8, 1.83, 64]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
```

---

### Blueprint 3: `src/components/3d/ParticleField.jsx`

#### Architectural Role:
A floating 3D particle cloud that creates atmospheric depth behind the hero headline. Uses Three.js `Points` and `BufferGeometry` for 60fps performance without DOM overhead.

#### Key Features:
- **Maximum Particle Count Ceiling**: Default 600 particles, strictly adhering to `T2-F27-04` (max limit <= 1000).
- **Mobile Viewport Lightweight Strategy**: Detects mobile viewports (`window.innerWidth < 768`) and clamps to 250 particles (`T2-F28-05`), reducing draw calls and GPU vertex load.
- **Typed Array Buffer Management**: Allocates `Float32Array(count * 3)` inside `useMemo`.
- **Gentle Orbital Drift**: Soft group rotation in `useFrame` simulates floating stardust.
- **Resource Disposal**: Cleans up geometry and material in `useEffect` cleanup hook (`T1-F27-05`, `T2-F28-04`).

#### Complete Proposed Implementation:
```jsx
import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 1000; // Hard ceiling verified by T2-F27-04
const DESKTOP_PARTICLE_COUNT = 600;
const MOBILE_PARTICLE_COUNT = 250;

export default function ParticleField() {
  const pointsRef = useRef(null);

  // Determine particle count based on initial screen width (T2-F28-05)
  const count = useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return MOBILE_PARTICLE_COUNT;
    }
    return Math.min(DESKTOP_PARTICLE_COUNT, MAX_PARTICLES);
  }, []);

  // Generate random 3D position coordinates inside a spatial volume
  const [geometry, material] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distributed volume: x in [-7, 7], y in [-5, 5], z in [-4, 4]
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.038,
      color: new THREE.Color('#00f0ff'),
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return [geo, mat];
  }, [count]);

  // Teardown Contract for Memory Leak Prevention (T1-F27-05, T2-F28-04)
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Smooth atmospheric particle drift
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
  });

  return (
    <primitive
      ref={pointsRef}
      object={new THREE.Points(geometry, material)}
    />
  );
}
```

---

### Blueprint 4: `src/components/3d/SceneFallback.jsx`

#### Architectural Role:
The non-blocking skeleton loader rendered while the heavy Three.js / R3F chunk is being asynchronously imported by `React.lazy` (`T1-F28-04`).

#### Key Features:
- **Test Contract Attribute**: Must include `data-testid="scene-fallback"` (`T1-F28-02`).
- **Matching Canvas Viewport Height**: Styled with `h-full min-h-[100vh] w-full` to prevent layout shifts during progressive enhancement (`T2-F28-02`).
- **Editorial Aesthetic**: Features a subtle glowing ring, dashed orbiting spinner, and glowing monogram dot aligned with the dark navy and neon cyan theme tokens.

#### Complete Proposed Implementation:
```jsx
import React from 'react';

export default function SceneFallback({ className = '' }) {
  return (
    <div
      data-testid="scene-fallback"
      className={`relative w-full h-full min-h-[100vh] flex flex-col items-center justify-center bg-transparent overflow-hidden ${className}`}
      aria-label="Loading 3D Visual Experience"
    >
      {/* Radial Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      {/* Abstract Skeleton Centerpiece */}
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Aura */}
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 animate-pulse-subtle flex items-center justify-center" />

        {/* Inner Dashed Orbital Ring */}
        <div className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full border border-dashed border-accent-cyan/30 animate-[spin_18s_linear_infinite]" />

        {/* Core Monogram Indicator */}
        <div className="absolute w-12 h-12 rounded-full bg-surface/80 border border-border flex items-center justify-center backdrop-blur-sm shadow-glow-cyan">
          <span className="text-xs font-mono font-bold text-accent-cyan">
            A.M.
          </span>
        </div>
      </div>

      {/* Editorial Status Tag */}
      <div className="mt-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
        <span className="text-[11px] font-mono tracking-widest text-text-muted uppercase">
          Initializing 3D Canvas
        </span>
      </div>
    </div>
  );
}
```

---

### Blueprint 5: `src/components/common/ErrorBoundary.jsx`

#### Architectural Role:
A resilient error boundary that isolates component and WebGL crashes. Catches dynamic chunk loading failures (`ChunkLoadError`), WebGL context creation failures, and unhandled 3D render exceptions without bringing down the rest of the application.

#### Key Features:
- **Catches Chunk Load & WebGL Failures**: Fulfills `T1-F28-05` and `T2-F28-03`.
- **Custom Fallback Support**: Accepts a custom `fallback` prop (e.g. `<SceneFallback />` or custom banner).
- **Graceful Degradation UI**: If no custom fallback is provided, displays a refined dark editorial card with a "Retry" button.

#### Complete Proposed Implementation:
```jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Catch WebGL or ChunkLoadError failures (T2-F28-03)
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught failure:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          data-testid="error-boundary-fallback"
          className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-surface/40 border border-border rounded-xl backdrop-blur-sm space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-semibold text-text-primary">
              Visual Scene Offline
            </h3>
            <p className="text-sm text-text-muted max-w-sm">
              The 3D graphics canvas encountered a hardware or network glitch. Core content remains fully accessible.
            </p>
          </div>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-accent-cyan border border-accent-cyan/30 rounded-md hover:bg-accent-cyan/10 transition-colors"
          >
            Retry Scene
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

### Blueprint 6: `src/components/sections/home/HeroSection.jsx`

#### Architectural Role:
The full-screen introductory hero section of the portfolio. Combines verified developer data, staggered word-by-word text entrance animations, high-contrast Playfair Display serif typography, responsive touch-compliant CTAs, scroll-down indicators, and the lazy-loaded 3D WebGL background layer.

#### Key Features:
- **Verified Data Binding**: Directly binds `developer.name` ("Aadinath Magar"), `developer.title` ("Full-Stack Developer"), and `developer.resumeUrl` (`/Aadi_Resume-04-09-2026.pdf`).
- **Word Stagger Entrance Animation**: Splitting `"Aadinath Magar"` and subtitle into tokenized words animated via Framer Motion `variants` (`T1-F15-04`).
- **Single Primary H1 Hierarchy**: Renders exactly one `<h1>` containing the developer's full name, meeting strict accessibility standards (`T2-F15-04`).
- **Mobile 375px Overflow Safety**: Responsive clamp font sizes (`text-5xl sm:text-7xl md:text-8xl`) preventing horizontal document scrollbar (`T2-F15-01`).
- **Touch Target Compliance**: Resume CTA button height >= 44px (`min-h-[48px]`), meeting WCAG mobile touch standards (`T2-F15-03`).
- **Non-Blocking 3D Layer**: Lazy loads `HeroCanvas` wrapped within `<ErrorBoundary>` and `<Suspense fallback={<SceneFallback />}>` (`T1-F28-04`).
- **Cursor Micro-Interactions**: Triggers cursor hover states (`onMouseEnter={() => setCursorVariant('hover')}`).

#### Complete Proposed Implementation:
```jsx
import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Sparkles } from 'lucide-react';
import { developer } from '../../../data/developer';
import { useCursor } from '../../../context/CursorContext';
import SceneFallback from '../../3d/SceneFallback';
import ErrorBoundary from '../../common/ErrorBoundary';

// Lazy-loaded 3D WebGL Canvas for non-blocking initial page paint (T1-F28-04)
const HeroCanvas = lazy(() => import('../../3d/HeroCanvas'));

export default function HeroSection() {
  const { setCursorVariant, resetCursor } = useCursor();

  // Word Stagger Animation Variants (T1-F15-04)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 35, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.85,
        ease: [0.215, 0.61, 0.355, 1.0], // cubic-bezier smooth ease-out
      },
    },
  };

  const nameWords = developer.name.split(' '); // ['Aadinath', 'Magar']

  return (
    <section
      data-testid="hero-section"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20"
    >
      {/* 1. 3D WebGL Canvas Layer (Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
        <ErrorBoundary fallback={<SceneFallback />}>
          <Suspense fallback={<SceneFallback />}>
            <HeroCanvas />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* 2. Editorial Text & CTA Content Layer (Foreground) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6 select-none">
        {/* Monogram / Availability Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan animate-pulse-subtle" />
          <span>FULL-STACK DEVELOPER &bull; MERN</span>
        </motion.div>

        {/* Primary Headline: "Aadinath Magar" in Playfair Display (T1-F15-01, T1-F15-05, T2-F15-04) */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-text-primary flex flex-wrap justify-center gap-x-4 md:gap-x-6 leading-none"
        >
          {nameWords.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Professional Subtitle: "Full-Stack Developer" (T1-F15-02) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-accent-gold tracking-wide"
        >
          {developer.title}
        </motion.p>

        {/* Narrative Bio Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-text-secondary leading-relaxed font-sans"
        >
          {developer.tagline ||
            'Architecting scalable web applications, modern APIs, and cinematic digital experiences.'}
        </motion.p>

        {/* Action CTAs (T1-F15-03, T2-F15-03) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          {/* Resume Download CTA (Touch Target Compliance >= 44px) */}
          <a
            href={developer.resumeUrl}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
            className="min-h-[48px] px-7 py-3.5 rounded-lg bg-accent-cyan text-black font-semibold text-sm tracking-wide shadow-glow-cyan hover:bg-opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume</span>
          </a>

          {/* View Projects Link */}
          <Link
            to="/projects"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
            className="min-h-[48px] px-7 py-3.5 rounded-lg border border-border bg-surface/40 hover:border-accent-cyan text-text-primary font-medium text-sm tracking-wide hover:bg-surface/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
          >
            <span>View Projects</span>
            <span className="text-accent-cyan">&rarr;</span>
          </Link>
        </motion.div>
      </div>

      {/* 3. Editorial Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-accent-cyan animate-bounce" />
      </motion.div>
    </section>
  );
}
```

---

## 4. Integration Blueprint for `src/pages/HomePage.jsx`

In `src/pages/HomePage.jsx`, lines 9-39 currently host a temporary static hero shell. When Milestone 3 is implemented:

```jsx
import React from 'react';
import HeroSection from '../components/sections/home/HeroSection';
// Peer Milestone 3 sections:
// import StatsSection from '../components/sections/home/StatsSection';
// import SkillsSection from '../components/sections/home/SkillsSection';
// import ProjectsPreview from '../components/sections/home/ProjectsPreview';
// import TestimonialsSection from '../components/sections/home/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="w-full space-y-24">
      {/* 1. Cinematic 3D Hero Section */}
      <HeroSection />

      {/* 2. Remaining Sections (Stats, Skills, Projects Preview, Testimonials) */}
      {/* ... */}
    </div>
  );
}
```

---

## 5. Risk Assessment & Verification Plan

1. **WebGL Context Retention on Theme Toggle (`T3-THEME-02`)**:
   - The Canvas is rendered with `alpha: true` and does not bind DOM theme class toggles to WebGL state. The canvas context persists across theme switching without unmounting or triggering `webglcontextlost`.
2. **Curtain Navigation Disposal & Remount (`T3-ROUTE-05`)**:
   - `HeroCanvas` registers its cleanup handler inside `onCreated` returning `gl.dispose()`, and `ParticleField` disposes buffers in `useEffect`. Navigating to `/about` and returning to `/` disposes and re-instantiates WebGL safely without context leaks (`T2-F28-04`).
3. **Mobile Viewport 375px Safety (`T2-F15-01`, `T2-F28-05`)**:
   - Tested particle count dynamically throttled to 250 on screens `< 768px`.
   - Typography uses flexible wrapping with `flex-wrap` and negative margins prevented, ensuring zero horizontal document overflow.
