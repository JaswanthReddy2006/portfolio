import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BookOpen, Code } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { DrawLine, BlurIn, FlipIn, SlideIn } from '../ScrollAnimations';
import { FloatingShapes, TiltCard } from '../GraphicEffects';

const experiences = [
  {
    title: 'Data Structures & Algorithms using C++',
    type: 'Training',
    period: 'June – July 2025',
    icon: <BookOpen size={22} />,
    gradient: 'from-blue-600 to-cyan-500',
    image: '/SUMMERTRANING.png',
    details: [
      'Mastered core data structures including arrays, linked lists, stacks, queues, and recursion.',
      'Compiled a portfolio of 50+ solved problems across multiple difficulty levels.',
      'Built a Tic-Tac-Toe game using C++ and 2D Arrays, utilizing the Standard Template Library (STL).',
    ],
  },
];

export default function Experience() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <SectionWrapper id="experience" bg="alt">
      <SectionTitle subtitle="Hands-on learning and professional growth">
        Training
      </SectionTitle>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative">
        {/* Floating geometric shapes */}
        <FloatingShapes count={5} />

        <div className="space-y-20">
          {experiences.map((exp, i) => {
            const isEven = i % 2 === 0;

            return (
              <SlideIn key={i} direction={isEven ? 'left' : 'right'}>
                <TiltCard maxTilt={1.5}>
                  <motion.div
                    className="relative bg-white border border-slate-100/60 rounded-3xl shadow-xl hover:shadow-2xl hover:border-blue-100 transition-all duration-500 overflow-hidden flex flex-col lg:flex-row group"
                  >
                    {/* Image Section (if exists) */}
                    {exp.image && (
                      <div className={`w-full lg:w-[45%] relative z-10 ${!isEven ? 'lg:order-2' : ''}`}>
                         <div 
                           className="relative h-full min-h-[300px] lg:min-h-[400px] overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer group/zoom"
                           onClick={() => setSelectedImage({ src: exp.image, alt: exp.title })}
                         >
                            {/* Decorative Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-[0.03]`} />
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                            <div className="relative z-10 w-full max-w-sm rounded-lg overflow-hidden shadow-2xl shadow-slate-900/10 bg-white p-2 transform transition-transform duration-500 group-hover/zoom:scale-[1.02]">
                               {/* Hover overlay hint */}
                               <div className="absolute inset-0 z-20 bg-slate-900/0 group-hover/zoom:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center font-inter">
                                 <span className="opacity-0 group-hover/zoom:opacity-100 text-slate-800 text-sm font-semibold bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover/zoom:translate-y-0 transition-all duration-300">
                                    Click to expand
                                 </span>
                               </div>
                               <img 
                                  src={exp.image} 
                                  alt={`${exp.title} Certificate`} 
                                  className="w-full h-full object-contain" 
                               />
                            </div>
                         </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className={`w-full relative z-10 p-8 md:p-12 lg:p-16 flex flex-col justify-center ${exp.image ? 'lg:w-[55%]' : ''}`}>
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                          <div className={`w-32 h-32`}>
                            {React.cloneElement(exp.icon, { size: 128 })}
                          </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-6 relative">
                         <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r ${exp.gradient} shadow-md shadow-blue-500/20`}>
                             {exp.type}
                         </span>
                         <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 border border-slate-200">
                             {exp.period}
                         </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-syne group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                         {exp.title}
                      </h3>
                      
                      <div className="space-y-4 relative z-10 pt-2 border-t border-slate-100">
                        {exp.details.map((detail, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + j * 0.1 }}
                            className="flex items-start gap-4 text-slate-600 text-base leading-relaxed group/item list-none"
                          >
                            <span className={`mt-2 w-2 h-2 rounded-full bg-gradient-to-r ${exp.gradient} shrink-0 shadow-sm`} />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </SlideIn>
            );
          })}
        </div>
      </div>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-full p-2"
                onClick={() => setSelectedImage(null)}
                aria-label="Close fullscreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
