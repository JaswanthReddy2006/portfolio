import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Swords, Medal } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { StaggerChildren, staggerItemSlideLeft, ScaleIn, GlowPulse } from '../ScrollAnimations';
import { MorphBlob, TiltCard } from '../GraphicEffects';

const hackathons = [
  {
    title: 'Code of Duty Hackathon',
    date: 'January 2024',
    achievement: '5th Rank among 50 Teams',
    description:
      'Secured 5th Rank among 50 teams in an inter-university technical competition, demonstrating strong problem-solving and teamwork under pressure.',
    icon: <Trophy size={28} />,
    gradient: 'from-amber-500 to-orange-600',
    badge: '🏆 Top 10%',
    image: '/hakathon.jpg',
  },
];

export default function Hackathons() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <SectionWrapper id="hackathons">
      <SectionTitle subtitle="Competing, learning, and growing under pressure">
       Hackathons
      </SectionTitle>

      <div className="relative">
        {/* Morphing background blob */}
        <MorphBlob className="absolute -top-16 -right-16 pointer-events-none opacity-50" color="rgba(245,158,11,0.1)" size={350} />
      
        <StaggerChildren className="max-w-3xl mx-auto space-y-8 relative">
          {hackathons.map((item) => (
            <TiltCard key={item.title} maxTilt={3}>
              <motion.div
                variants={staggerItemSlideLeft}
                className="group relative bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <GlowPulse>
                  {/* Background accent — grows on scroll */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${item.gradient} opacity-10 rounded-bl-[100px] origin-top-right`}
                  />

                  {/* Hover Glow */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-500`} />

                  <div className="relative flex flex-col sm:flex-row gap-6 items-start">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 3, 0], y: [0, -3, 0, 2, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      className={`shrink-0 w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-lg sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20`}
                    >
                      {item.icon}
                    </motion.div>

                    <div className="flex-1 w-full">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm font-medium text-slate-500">{item.date}</p>
                        </div>
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                          className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 rounded-full shadow-sm"
                        >
                          {item.badge}
                        </motion.span>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2 mb-4 p-2 bg-amber-50/50 rounded-lg border border-amber-100/50 w-fit"
                      >
                        <Medal size={18} className="text-amber-500" />
                        <span className="text-sm font-bold text-amber-700">{item.achievement}</span>
                      </motion.div>

                      <p className="text-base text-slate-600 leading-relaxed font-medium mb-6">
                        {item.description}
                      </p>

                      {item.image && (
                         <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm group/image hover:shadow-md transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedImage({ src: item.image, alt: item.title })}
                         >
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 z-20 bg-slate-900/0 group-hover/image:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center font-inter">
                              <span className="opacity-0 group-hover/image:opacity-100 text-slate-800 text-sm font-semibold bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover/image:translate-y-0 transition-all duration-300">
                                 Click to view Fullscreen
                              </span>
                            </div>
                            <img 
                               src={item.image} 
                               alt={`${item.title} Event`} 
                               className="w-full h-auto max-h-[300px] object-cover object-center transform transition-transform duration-700 group-hover/image:scale-105" 
                            />
                         </motion.div>
                      )}
                    </div>
                  </div>
                </GlowPulse>
              </motion.div>
            </TiltCard>
          ))}
        </StaggerChildren>
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
