import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import GlobeSphere from './GlobeSphere';

export default function GlobeCanvas({ className = '' }) {
  const [frameloop, setFrameloop] = useState('always');

  // Pause RAF on background tab (T2-F27-05)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setFrameloop(document.hidden ? 'demand' : 'always');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 2]}
        frameloop={frameloop}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          const dom = gl.domElement;
          const onContextLost = (e) => {
            e.preventDefault();
            console.warn('[GlobeCanvas] WebGL context lost.');
          };
          const onContextRestored = () => {
            console.info('[GlobeCanvas] WebGL context restored.');
          };
          dom.addEventListener('webglcontextlost', onContextLost, false);
          dom.addEventListener('webglcontextrestored', onContextRestored, false);

          return () => {
            dom.removeEventListener('webglcontextlost', onContextLost);
            dom.removeEventListener('webglcontextrestored', onContextRestored);
            gl.dispose();
          };
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <GlobeSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
