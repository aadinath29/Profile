import React, { useEffect, useRef, useState } from 'react';
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
      {/* Editorial Warm Lighting Scheme */}
      <ambientLight intensity={0.8} color="#FFF8F0" />
      {/* Primary Warm Key Light */}
      <directionalLight position={[6, 8, 5]} intensity={1.2} color="#FFFDF9" />
      {/* Accent Rim / Fill Light: Warm Terracotta */}
      <pointLight position={[-4, -3, -2]} intensity={0.8} color="#C4704A" />
      {/* Subtle Top Ambient Highlight */}
      <pointLight position={[0, 5, 2]} intensity={0.4} color="#EDE8DF" />

      {/* Rotating Abstract Wireframe Geometry */}
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
