import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { StaggerChildren, staggerItemScale, FlipIn, MagneticHover } from '../ScrollAnimations';
import { TiltCard, FloatingShapes } from '../GraphicEffects';

const certifications = [
  {
    title: 'Social Networks',
    issuer: 'NPTEL',
    date: 'November 2025',
    color: 'from-blue-500 to-indigo-600',
    link: 'https://drive.google.com/file/d/1pLong8h5j4hIWYn3sSvT_2uniOAqibqW/view?usp=drive_link',
    image: '/Social.jpg',
  },
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    date: 'June 2025',
    color: 'from-orange-500 to-amber-500',
    link: 'https://drive.google.com/file/d/12rSqvAZdaahrcBDijZlhWEVEiH9LqdXS/view?usp=sharing',
    image: '/cloudcoumputing (1).png',
  },
  {
    title: 'Fundamentals of Network Communication',
    issuer: 'Coursera',
    date: 'October 2024',
    color: 'from-indigo-500 to-violet-600',
    link: '#',
    image: '/Fundamentals of Network Communication.png',
  },
  {
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Coursera (Google)',
    date: 'September 2024',
    color: 'from-violet-500 to-purple-600',
    link: '#',
    image: '/The Bits and Bytes of Computer Networking.png',
  },
  {
    title: 'Introduction to Hardware and Operating Systems',
    issuer: 'Coursera (Google)',
    date: 'September 2024',
    color: 'from-cyan-500 to-blue-600',
    link: '#',
    image: '/Introduction to Hardware and Operating Systems.png',
  },
  {
    title: 'Responsive Web Design',
    issuer: 'Free Code Camp',
    date: 'December 2023',
    color: 'from-green-500 to-emerald-600',
    link: 'https://drive.google.com/file/d/1vb96S3YmhBAn4kkM0OpkirZ2EAeEQ6nc/view?usp=sharing',
    image: '/responsive websesign.png',
  },
];

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <SectionWrapper id="certifications">
      <SectionTitle subtitle="Validated knowledge through industry-recognized platforms">
        Certifications
      </SectionTitle>

      <div className="relative">
        <FloatingShapes count={6} />
        <StaggerChildren className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <TiltCard key={cert.title} maxTilt={6}>
              <motion.div
                variants={staggerItemScale}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ perspective: '1000px' }}
              >
                {/* Glow */}
                <div className={`absolute -inset-px bg-gradient-to-r ${cert.color} rounded-2xl opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500`} />

                <div className="relative">
                  <FlipIn axis="Y">
                    <MagneticHover strength={0.15}>
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex p-3 bg-gradient-to-r ${cert.color} rounded-xl text-white shadow-lg mb-4`}
                      >
                        <Award size={24} />
                      </motion.div>
                    </MagneticHover>
                  </FlipIn>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{cert.title}</h3>
                  <p className="text-sm text-slate-500 mb-1">{cert.issuer}</p>
                  <p className="text-xs text-slate-400 mb-4">{cert.date}</p>

                  {cert.image && (
                     <div 
                        className="mb-4 relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 shadow-inner group/certimg cursor-pointer"
                        onClick={() => setSelectedImage({ src: cert.image, alt: cert.title })}
                     >
                        <div className="absolute inset-0 bg-slate-900/0 group-hover/certimg:bg-slate-900/20 transition-all duration-300 z-10 flex items-center justify-center">
                           <span className="opacity-0 group-hover/certimg:opacity-100 text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full transform scale-90 group-hover/certimg:scale-100 transition-all duration-300 backdrop-blur-sm">
                              View Certificate
                           </span>
                        </div>
                        <img 
                           src={cert.image} 
                           alt={cert.title} 
                           className="w-full h-full object-cover transform transition-transform duration-500 group-hover/certimg:scale-105" 
                        />
                     </div>
                  )}

                  <div className="flex items-center gap-4">
                    <motion.a
                      whileHover={{ x: 4 }}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group/link"
                    >
                      Drive Link
                      <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </motion.a>
                  </div>
                </div>
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
