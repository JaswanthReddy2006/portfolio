import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckSquare, ArrowDown } from 'lucide-react';
import { MagneticHover, TypewriterText, MarqueeText } from '../ScrollAnimations';
import { FloatingShapes } from '../GraphicEffects';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
    >
      {/* Reduced background decoration (relying primarily on ScrollReactiveBackground) */}
      <FloatingShapes count={6} />

      <motion.div style={{ y: yText, opacity, scale }} className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto mt-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full"
        >
          <div className="h-8 w-8 -rotate-12 transform flex items-center justify-center bg-blue-600 rounded-full shadow-lg border-2 border-white">
            <CheckSquare className="text-white w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-blue-700">Full-Stack & Cloud Developer</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Jaswanth Reddy
          </span>
          <br />
          Nukalapati
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          <TypewriterText text="Building Cloud-Native & Full-Stack Solutions." speed={35} />
          <br />
          <TypewriterText text="I craft scalable, enterprise-grade applications with modern technologies." speed={25} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticHover strength={0.2}>
            <a
              href="#projects"
              className="px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
            >
              View My Work
            </a>
          </MagneticHover>
          <MagneticHover strength={0.2}>
            <a
              href="#contact"
              className="px-8 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
          </MagneticHover>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
