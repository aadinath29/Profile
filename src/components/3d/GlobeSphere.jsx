import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GlobeSphere() {
  const globeRef = useRef(null);
  const ringRef = useRef(null);
  const beaconRef = useRef(null);

  // India spherical coordinates (radius = 1.35, 20.5937° N, 78.9629° E)
  const radius = 1.35;
  const lat = 20.5937;
  const lon = 78.9629;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const pinPos = [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];

  useFrame((_, delta) => {
    // Subtle auto-rotation (Milestone 5)
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
      ringRef.current.rotation.x += delta * 0.03;
    }
    if (beaconRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.3;
      beaconRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Lighting Scheme */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-4, -3, -2]} intensity={1.0} color="#fbbf24" />

      {/* Rotating Main Globe */}
      <group ref={globeRef}>
        {/* Deep navy Earth sphere body */}
        <mesh>
          <sphereGeometry args={[radius, 48, 48]} />
          <meshStandardMaterial
            color="#080c16"
            roughness={0.7}
            metalness={0.2}
            wireframe={false}
          />
        </mesh>

        {/* Translucent wireframe lat/lon grid for technical editorial feel */}
        <mesh>
          <sphereGeometry args={[radius + 0.005, 24, 24]} />
          <meshStandardMaterial
            color="#00f0ff"
            wireframe={true}
            transparent={true}
            opacity={0.12}
          />
        </mesh>

        {/* India Location Pin & Glowing Beacon */}
        <group position={pinPos}>
          {/* Luminous beacon core */}
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>

          {/* Pulsing aura ring */}
          <mesh ref={beaconRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.06, 0.11, 16]} />
            <meshBasicMaterial color="#00f0ff" transparent={true} opacity={0.6} side={THREE.DoubleSide} />
          </mesh>

          {/* Radially projecting beacon beam */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.008, 0.012, 0.2, 8]} />
            <meshBasicMaterial color="#fbbf24" transparent={true} opacity={0.8} />
          </mesh>
        </group>
      </group>

      {/* Tilted Glowing Orbital Ring */}
      <mesh ref={ringRef} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[1.75, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          transparent={true}
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}
