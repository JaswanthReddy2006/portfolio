import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
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
    >
      {/* Reduced background decoration (relying primarily on ScrollReactiveBackground) */}
      {/* <FloatingShapes count={6} /> */}

      <motion.div style={{ y: yText, opacity, scale }} className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto mt-8">
        


        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 leading-tight mb-8 tracking-tight"
        >
          Hi, I'm{' '}
          <br className="sm:hidden" />
          <span className="relative inline-block px-4 py-1">
            {/* Soft Background Blur for Name */}
            <motion.span 
              className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-2xl -z-10 shadow-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            {/* Radiant Text - Metallic Finish - Fast Speed */}
            <motion.span
              animate={{ 
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-sky-300 to-slate-900 bg-[length:200%_auto] pb-2 font-black"
            >
               <TypewriterText text="Jaswanth Reddy" speed={100} cursor={true} />
            </motion.span>
          </span>
        </motion.h1>

        <div className="relative inline-block max-w-3xl mx-auto mb-12">
            {/* Soft Background Blur for Description */}
             <motion.div 
            className="absolute -inset-4 bg-white/40 backdrop-blur-md rounded-xl -z-10 shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <motion.div
            className="text-xl sm:text-2xl text-slate-700 font-medium leading-relaxed"
          >
            <div className="mb-2">
              <TypewriterText text="Building Cloud-Native & Full-Stack Solutions." speed={30} delay={1.5} />
            </div>
            <div>
              <TypewriterText text="I craft scalable, enterprise-grade applications with modern technologies." speed={30} delay={2.5} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <MagneticHover strength={0.3}>
            <a
              href="#projects"
              className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1"
            >
              View My Work
            </a>
          </MagneticHover>
          <MagneticHover strength={0.3}>
            <a
              href="#contact"
              className="px-10 py-4 bg-white/80 backdrop-blur-md text-slate-800 text-lg font-bold rounded-2xl border border-white/60 hover:border-blue-300 hover:text-blue-600 transition-all hover:-translate-y-1 hover:bg-white shadow-lg shadow-black/5"
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
