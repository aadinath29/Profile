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

    // Warm terracotta ambient particle material
    const mat = new THREE.PointsMaterial({
      size: 0.028,
      color: new THREE.Color('#C4704A'),
      transparent: true,
      opacity: 0.35,
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
