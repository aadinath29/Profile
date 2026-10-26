import React from 'react';
import { motion } from 'framer-motion';

export const curtainVariants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0 },
  exit: { scaleY: 1 },
};

export default function PageCurtain({ children }) {
  return (
    <div className="relative w-full flex-grow flex flex-col">
      {/* Entrance Curtain (slides up revealing page) */}
      <motion.div
        className="fixed inset-0 z-50 bg-[#F5F0E8] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden="true"
      />
      {/* Exit Curtain (wipes down covering page on exit) */}
      <motion.div
        className="fixed inset-0 z-50 bg-[#F5F0E8] pointer-events-none origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
