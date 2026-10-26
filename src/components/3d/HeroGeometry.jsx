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

    // 1. Floating vertical harmonic bobbing (gentle ambient float)
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.0) * 0.08;
    }

    // 2. Multi-axis continuous rotation for outer wireframe (slowed down for ambient subtlety)
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.15;
      outerMeshRef.current.rotation.y += delta * 0.22;
    }

    // 3. Counter-rotation for inner core
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.1;
      innerMeshRef.current.rotation.z += delta * 0.15;
    }

    // 4. Slow orbital precession for accent ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.85}>
      {/* Outer Abstract Wireframe: Torus Knot - warm terracotta wireframe (R3 ambient demotion) */}
      <mesh ref={outerMeshRef}>
        <torusKnotGeometry args={[1.1, 0.28, 128, 32]} />
        <meshStandardMaterial
          wireframe
          color="#C4704A"
          transparent
          opacity={0.22}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Inner Core: Solid Icosahedron - subtle terracotta emissive warmth */}
      <mesh ref={innerMeshRef}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#1C1A18"
          emissive="#C4704A"
          emissiveIntensity={0.12}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Secondary Accent Ring: Terracotta Accent */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <ringGeometry args={[1.75, 1.78, 64]} />
        <meshBasicMaterial
          color="#C4704A"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
