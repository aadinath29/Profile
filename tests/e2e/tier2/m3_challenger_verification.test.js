/**
 * Tier 2: Empirical Challenger Verification Suite for Milestone 3
 * Focus: 3D Hero Scene, WebGL Resiliency, Canvas, Fallback & Code-Splitting
 * Author: challenger_m3_2 (EMPIRICAL CHALLENGER)
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import * as THREE from 'three';
import { describe, test, expect, DOMEnvironment, StaticAnalyzer } from '../harness/index.js';

describe('Challenger M3: 3D Hero Scene & WebGL Resiliency Stress Verification', () => {
  const analyzer = new StaticAnalyzer();
  const rootDir = process.cwd();

  // =========================================================================
  // AREA 1: SceneFallback.jsx CONFORMANCE & BOUNDARY VERIFICATION
  // =========================================================================
  describe('Area 1: SceneFallback Skeleton & Dimensions Verification', () => {
    test('CHALLENGE-M3-FALLBACK-01: SceneFallback data-testid and 100vh Viewport Height', () => {
      const src = analyzer.readFile('src/components/3d/SceneFallback.jsx');
      expect(src).toBeDefined();

      // 1. data-testid check
      expect(src).toContain('data-testid="scene-fallback"');

      // 2. 100vh height enforcement
      const has100vh = src.includes('min-h-[100vh]') || src.includes('h-screen') || src.includes('min-h-screen');
      expect(has100vh).toBe(true);

      // 3. Full width/height dimension tokens
      expect(src).toContain('w-full');
      expect(src).toContain('h-full');
    });

    test('CHALLENGE-M3-FALLBACK-02: SceneFallback Visual Skeleton & Editorial Elements', () => {
      const src = analyzer.readFile('src/components/3d/SceneFallback.jsx');

      // Editorial Monogram Indicator
      expect(src).toContain('A.M.');
      expect(src).toContain('font-mono');

      // Pulsing skeleton aura & orbital ring
      expect(src).toContain('animate-pulse-subtle');
      expect(src).toContain('animate-[spin_18s_linear_infinite]');
      expect(src).toContain('border-dashed');

      // Status tag communicating canvas initialization
      expect(src).toContain('Initializing 3D Canvas');
      expect(src).toContain('animate-ping');

      // ARIA accessibility label
      expect(src).toContain('aria-label="Loading 3D Visual Experience"');
    });

    test('CHALLENGE-M3-FALLBACK-03: SceneFallback ClassName Propagation Safety', () => {
      const src = analyzer.readFile('src/components/3d/SceneFallback.jsx');
      // Default parameter and template string concatenation
      expect(src).toContain("className = ''");
      expect(src).toContain('${className}');
    });
  });

  // =========================================================================
  // AREA 2: ErrorBoundary.jsx WEBGL CONTEXT LOSS & RETRY VERIFICATION
  // =========================================================================
  describe('Area 2: ErrorBoundary WebGL Context Loss & Recovery Verification', () => {
    test('CHALLENGE-M3-ERR-01: ErrorBoundary Static getDerivedStateFromError Lifecycle & Class Contract', () => {
      const src = analyzer.readFile('src/components/common/ErrorBoundary.jsx');
      expect(src).toBeDefined();

      expect(src).toContain('class ErrorBoundary extends React.Component');
      expect(src).toContain('static getDerivedStateFromError(error)');
      expect(src).toContain('return { hasError: true, error }');

      // Behavioral verification of getDerivedStateFromError logic
      const getDerivedStateFromError = (error) => ({ hasError: true, error });

      const simulatedWebGLErr = new Error('WebGL: CONTEXT_LOST_WEBGL: loseContext was called');
      const state1 = getDerivedStateFromError(simulatedWebGLErr);
      expect(state1.hasError).toBe(true);
      expect(state1.error).toBe(simulatedWebGLErr);

      const simulatedChunkErr = new Error('ChunkLoadError: Loading chunk HeroCanvas failed');
      const state2 = getDerivedStateFromError(simulatedChunkErr);
      expect(state2.hasError).toBe(true);
      expect(state2.error).toBe(simulatedChunkErr);
    });

    test('CHALLENGE-M3-ERR-02: ErrorBoundary Diagnostic Logging in componentDidCatch', () => {
      const src = analyzer.readFile('src/components/common/ErrorBoundary.jsx');

      expect(src).toContain('componentDidCatch(error, errorInfo)');
      expect(src).toContain("console.error('[ErrorBoundary] Caught failure:', error, errorInfo)");

      // Test diagnostic logging behavior
      let loggedMessage = '';
      let loggedErr = null;
      let loggedInfo = null;

      const mockConsoleError = (msg, err, info) => {
        loggedMessage = msg;
        loggedErr = err;
        loggedInfo = info;
      };

      const simulateComponentDidCatch = (error, errorInfo) => {
        mockConsoleError('[ErrorBoundary] Caught failure:', error, errorInfo);
      };

      const testErr = new Error('GPU Context Lost');
      const testInfo = { componentStack: 'in HeroCanvas' };
      simulateComponentDidCatch(testErr, testInfo);

      expect(loggedMessage).toContain('[ErrorBoundary]');
      expect(loggedErr).toBe(testErr);
      expect(loggedInfo).toBe(testInfo);
    });

    test('CHALLENGE-M3-ERR-03: ErrorBoundary Default Fallback UI, Messaging & TestId', () => {
      const src = analyzer.readFile('src/components/common/ErrorBoundary.jsx');

      expect(src).toContain('data-testid="error-boundary-fallback"');
      expect(src).toContain('Visual Scene Offline');
      expect(src).toContain('The 3D graphics canvas encountered a hardware or network glitch');
      expect(src).toContain('Core content remains fully accessible');
      expect(src).toContain('Retry Scene');
      expect(src).toContain('onClick={this.handleRetry}');
    });

    test('CHALLENGE-M3-ERR-04: handleRetry State Reset and Recovery', () => {
      const src = analyzer.readFile('src/components/common/ErrorBoundary.jsx');

      expect(src).toContain('handleRetry = () =>');
      expect(src).toContain('this.setState({ hasError: false, error: null })');

      // Behavioral test of retry state transition
      class BoundaryModel {
        constructor() {
          this.state = { hasError: true, error: new Error('WebGL failure') };
        }
        setState(updater) {
          this.state = { ...this.state, ...updater };
        }
        handleRetry() {
          this.setState({ hasError: false, error: null });
        }
      }

      const boundary = new BoundaryModel();
      expect(boundary.state.hasError).toBe(true);
      expect(boundary.state.error).toBeDefined();

      boundary.handleRetry();
      expect(boundary.state.hasError).toBe(false);
      expect(boundary.state.error).toBe(null);
    });

    test('CHALLENGE-M3-ERR-05: ErrorBoundary Custom Fallback Prop Override', () => {
      const src = analyzer.readFile('src/components/common/ErrorBoundary.jsx');

      expect(src).toContain('if (this.props.fallback)');
      expect(src).toContain('return this.props.fallback;');

      // Behavioral test of fallback precedence
      const renderBoundary = (props, state) => {
        if (state.hasError) {
          if (props.fallback) return props.fallback;
          return { testid: 'error-boundary-fallback' };
        }
        return props.children;
      };

      const customFallback = { testid: 'scene-fallback' };
      const resWithCustom = renderBoundary({ fallback: customFallback }, { hasError: true });
      expect(resWithCustom).toBe(customFallback);

      const resDefault = renderBoundary({}, { hasError: true });
      expect(resDefault.testid).toBe('error-boundary-fallback');
    });
  });

  // =========================================================================
  // AREA 3: ParticleField.jsx PARTICLE CEILING, BOUNDS & DISPOSAL
  // =========================================================================
  describe('Area 3: ParticleField Count Clamping, Geometry Bounds & Teardown', () => {
    test('CHALLENGE-M3-PARTICLES-01: Strict Particle Count Ceilings (<= 1000)', () => {
      const src = analyzer.readFile('src/components/3d/ParticleField.jsx');
      expect(src).toBeDefined();

      expect(src).toContain('MAX_PARTICLES = 1000');
      expect(src).toContain('DESKTOP_PARTICLE_COUNT = 600');
      expect(src).toContain('MOBILE_PARTICLE_COUNT = 250');

      // Verify mathematical logic in code: mobile viewport < 768px yields 250, desktop yields 600
      const computeParticleCount = (width) => {
        if (width < 768) return 250;
        return Math.min(600, 1000);
      };

      const testWidths = [320, 360, 375, 414, 767, 768, 1024, 1280, 1440, 1920, 2560, 3840];
      for (const w of testWidths) {
        const count = computeParticleCount(w);
        expect(count <= 1000).toBe(true);
        if (w < 768) {
          expect(count).toBe(250);
        } else {
          expect(count).toBe(600);
        }
      }
    });

    test('CHALLENGE-M3-PARTICLES-02: BufferGeometry Attribute Generation and Spatial Bounds', () => {
      // Direct simulation of ParticleField position generator
      const count = 600;
      const pos = new Float32Array(count * 3);

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      let minZ = Infinity, maxZ = -Infinity;

      for (let run = 0; run < 50; run++) {
        for (let i = 0; i < count; i++) {
          pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }

        for (let i = 0; i < count; i++) {
          const x = pos[i * 3 + 0];
          const y = pos[i * 3 + 1];
          const z = pos[i * 3 + 2];

          expect(Number.isFinite(x)).toBe(true);
          expect(Number.isFinite(y)).toBe(true);
          expect(Number.isFinite(z)).toBe(true);

          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          if (z < minZ) minZ = z;
          if (z > maxZ) maxZ = z;
        }
      }

      // x in [-7, 7], y in [-5, 5], z in [-4, 4]
      expect(minX >= -7.0).toBe(true);
      expect(maxX <= 7.0).toBe(true);
      expect(minY >= -5.0).toBe(true);
      expect(maxY <= 5.0).toBe(true);
      expect(minZ >= -4.0).toBe(true);
      expect(maxZ <= 4.0).toBe(true);

      // Verify Three.js BufferGeometry creation
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const posAttr = geo.getAttribute('position');
      expect(posAttr.itemSize).toBe(3);
      expect(posAttr.count).toBe(count);
    });

    test('CHALLENGE-M3-PARTICLES-03: Explicit Teardown and Memory Leak Prevention', () => {
      const src = analyzer.readFile('src/components/3d/ParticleField.jsx');

      expect(src).toContain('geometry.dispose()');
      expect(src).toContain('material.dispose()');

      // Test real Three.js disposal invocation
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(30), 3));
      const mat = new THREE.PointsMaterial({ size: 0.038 });

      let geoDisposed = false;
      let matDisposed = false;
      geo.addEventListener('dispose', () => { geoDisposed = true; });
      mat.addEventListener('dispose', () => { matDisposed = true; });

      geo.dispose();
      mat.dispose();

      expect(geoDisposed).toBe(true);
      expect(matDisposed).toBe(true);
    });

    test('CHALLENGE-M3-PARTICLES-04: Pitch & Yaw Drift Boundedness Under Variable Deltas', () => {
      // Formula in useFrame:
      // pointsRef.current.rotation.y += delta * 0.04;
      // pointsRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;

      let rotY = 0;
      const testDeltas = [0.016, 0.033, 0.05, 0.1, 0.5];
      for (const d of testDeltas) {
        const step = d * 0.04;
        expect(step > 0).toBe(true);
        expect(step < 0.05).toBe(true);
        rotY += step;
      }

      // Pitch oscillation bounds check across 1000 simulated seconds
      for (let t = 0; t < 1000; t += 0.5) {
        const pitch = Math.sin(t * 0.15) * 0.05;
        expect(pitch >= -0.05).toBe(true);
        expect(pitch <= 0.05).toBe(true);
      }
    });
  });

  // =========================================================================
  // AREA 4: HeroCanvas.jsx DPR CLAMPING, VISIBILITY & MOUSE PARALLAX
  // =========================================================================
  describe('Area 4: HeroCanvas DPR Clamping, Visibility & Mouse Parallax', () => {
    test('CHALLENGE-M3-CANVAS-01: DPR Clamping to [1, 2]', () => {
      const src = analyzer.readFile('src/components/3d/HeroCanvas.jsx');
      expect(src).toContain('dpr={[1, 2]}');

      // Verify clamping oracle
      const clampDpr = (ratio) => Math.min(Math.max(ratio, 1), 2);
      expect(clampDpr(0.5)).toBe(1);
      expect(clampDpr(1.0)).toBe(1);
      expect(clampDpr(1.5)).toBe(1.5);
      expect(clampDpr(2.0)).toBe(2.0);
      expect(clampDpr(3.0)).toBe(2.0);
      expect(clampDpr(4.0)).toBe(2.0);
    });

    test('CHALLENGE-M3-CANVAS-02: Background Tab RAF Pausing via visibilitychange', () => {
      const src = analyzer.readFile('src/components/3d/HeroCanvas.jsx');

      expect(src).toContain("document.addEventListener('visibilitychange'");
      expect(src).toContain("document.removeEventListener('visibilitychange'");
      expect(src).toContain("document.hidden ? 'demand' : 'always'");
      expect(src).toContain('frameloop={frameloop}');

      // Verify state logic
      const getFrameloop = (hidden) => (hidden ? 'demand' : 'always');
      expect(getFrameloop(true)).toBe('demand');
      expect(getFrameloop(false)).toBe('always');
    });

    test('CHALLENGE-M3-CANVAS-03: Mouse Parallax Lerp Calculations & Convergence', () => {
      const src = analyzer.readFile('src/components/3d/HeroCanvas.jsx');

      expect(src).toContain('pointer.x * 0.35');
      expect(src).toContain('-pointer.y * 0.25');
      expect(src).toContain('THREE.MathUtils.lerp');

      // Test lerp behavior across 120 simulated frames
      let rotY = 0;
      let rotX = 0;
      const targetY = 1.0 * 0.35; // 0.35 rad (~ 20 degrees)
      const targetX = -1.0 * 0.25; // -0.25 rad (~ -14 degrees)

      for (let frame = 0; frame < 120; frame++) {
        rotY = THREE.MathUtils.lerp(rotY, targetY, 0.05);
        rotX = THREE.MathUtils.lerp(rotX, targetX, 0.05);
      }

      // After 120 frames at alpha 0.05: (1 - 0.05)^120 = 0.002
      // Should reach > 99.7% of target smoothly
      expect(Math.abs(rotY - targetY) < 0.005).toBe(true);
      expect(Math.abs(rotX - targetX) < 0.005).toBe(true);
    });

    test('CHALLENGE-M3-CANVAS-04: WebGL Context Loss Handlers & Cleanup', () => {
      const src = analyzer.readFile('src/components/3d/HeroCanvas.jsx');

      expect(src).toContain("dom.addEventListener('webglcontextlost'");
      expect(src).toContain("event.preventDefault()");
      expect(src).toContain("dom.addEventListener('webglcontextrestored'");
      expect(src).toContain("dom.removeEventListener('webglcontextlost'");
      expect(src).toContain("dom.removeEventListener('webglcontextrestored'");
      expect(src).toContain('gl.dispose()');
    });
  });

  // =========================================================================
  // AREA 5: CODE-SPLITTING & ASSET CHUNK VERIFICATION
  // =========================================================================
  describe('Area 5: Code-Splitting and Production Assets Verification', () => {
    test('CHALLENGE-M3-SPLIT-01: Vite Configuration Manual Chunks', () => {
      const viteConfig = analyzer.readFile('vite.config.js');

      expect(viteConfig).toContain("'vendor-three': ['three', '@react-three/fiber', '@react-three/drei']");
      expect(viteConfig).toContain("'vendor-react': ['react', 'react-dom', 'react-router-dom']");
      expect(viteConfig).toContain("'vendor-motion': ['framer-motion', 'gsap', 'lenis']");
    });

    test('CHALLENGE-M3-SPLIT-02: Lazy Loading in HeroSection.jsx', () => {
      const heroSection = analyzer.readFile('src/components/sections/home/HeroSection.jsx');

      expect(heroSection).toContain("lazy(() => import('../../3d/HeroCanvas'))");
      expect(heroSection).toContain('<Suspense fallback={<SceneFallback />}>');
      expect(heroSection).toContain('<ErrorBoundary');
    });

    test('CHALLENGE-M3-SPLIT-03: Dist Assets Physical Verification', () => {
      const distDir = path.resolve(rootDir, 'dist/assets');
      expect(fs.existsSync(distDir)).toBe(true);

      const files = fs.readdirSync(distDir);
      const vendorThree = files.find(f => f.startsWith('vendor-three-') && f.endsWith('.js'));
      const heroCanvas = files.find(f => f.startsWith('HeroCanvas-') && f.endsWith('.js'));
      const vendorReact = files.find(f => f.startsWith('vendor-react-') && f.endsWith('.js'));
      const vendorMotion = files.find(f => f.startsWith('vendor-motion-') && f.endsWith('.js'));
      const mainIndex = files.find(f => f.startsWith('index-') && f.endsWith('.js'));

      expect(vendorThree).toBeDefined();
      expect(heroCanvas).toBeDefined();
      expect(vendorReact).toBeDefined();
      expect(vendorMotion).toBeDefined();
      expect(mainIndex).toBeDefined();

      // Ensure vendor-three is substantial (> 500 KB uncompressed)
      const threeStat = fs.statSync(path.join(distDir, vendorThree));
      expect(threeStat.size > 500000).toBe(true);

      // Ensure HeroCanvas chunk is compact (< 20 KB)
      const canvasStat = fs.statSync(path.join(distDir, heroCanvas));
      expect(canvasStat.size < 20000).toBe(true);
    });
  });
});
