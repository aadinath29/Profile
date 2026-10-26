import React from 'react';
import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="pt-6 pb-8 overflow-hidden">
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)', y: 30 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-text-primary">
          About me.
        </h1>
      </motion.div>
    </section>
  );
}
