import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollProgress } from './components/ScrollAnimations';
import { SectionSpacer, ScrollReactiveBackground } from './components/GraphicEffects';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Experience from './components/sections/Experience';
import Hackathons from './components/sections/Hackathons';
import ExtraCurricular from './components/sections/ExtraCurricular';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the loading screen after 1.5s to allow layout & background to finish rendering
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-12 h-12 border-[3px] border-slate-200 border-t-blue-600 rounded-full mb-4"
            />
            <motion.h2
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="text-slate-500 font-semibold tracking-[0.2em] text-sm uppercase"
            >
              Loading
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-slate-900 font-inter min-h-screen overflow-x-hidden relative">
        <ScrollReactiveBackground />
        <div className="relative" style={{ zIndex: 1 }}>
        <Chatbot />
      <Navbar />
      <Hero />
      <SectionSpacer />
      <About />
      <SectionSpacer />
      <Education />
      <SectionSpacer />
      <Skills />
      <SectionSpacer />
      <Projects />
      <SectionSpacer />
      <Certifications />
      <SectionSpacer />
      <Experience />
      <SectionSpacer />
      <Hackathons />
      <SectionSpacer />
      <ExtraCurricular />
      <SectionSpacer />
      <Contact />
      <Footer />
      </div>
    </div>
    </>
  );
}

export default App;
