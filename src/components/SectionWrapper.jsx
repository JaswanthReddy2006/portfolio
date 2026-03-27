import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal, BlurIn } from './ScrollAnimations';

export default function SectionWrapper({ id, children, className = '', bg = 'white' }) {
  // Use subtle glassmorphism to let the colorful background shine through
  // 'alt' gets a slightly more opaque/different tint for separation
  const bgClass = bg === 'alt' 
    ? 'bg-slate-50/60 backdrop-blur-sm' 
    : 'bg-white/40 backdrop-blur-sm';

  return (
    <section id={id} className={`relative py-20 px-4 sm:px-6 lg:px-8 ${className} overflow-hidden ${bgClass}`}>
      <div className="max-w-6xl mx-auto relative z-10">{children}</div>
    </section>
  );
}

export function SectionTitle({ children, subtitle }) {
  return (
    <div className="text-center mb-16">
      <TextReveal>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{children}</h2>
      </TextReveal>
      {subtitle && (
        <BlurIn>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </BlurIn>
      )}
      <TextReveal>
        <motion.div
          className="mt-4 mx-auto w-20 h-1 rounded-full overflow-hidden"
          whileInView={{ width: [20, 80] }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="h-full w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            style={{ backgroundSize: '200% 100%' }}
          />
        </motion.div>
      </TextReveal>
    </div>
  );
}
