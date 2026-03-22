import React from 'react';
import { motion } from 'framer-motion';
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
  },
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    date: 'June 2025',
    color: 'from-orange-500 to-amber-500',
    link: 'https://drive.google.com/file/d/12rSqvAZdaahrcBDijZlhWEVEiH9LqdXS/view?usp=sharing',
  },
  {
    title: 'Web Development',
    issuer: 'Free Code Camp',
    date: 'December 2023',
    color: 'from-green-500 to-emerald-600',
    link: 'https://drive.google.com/file/d/1vb96S3YmhBAn4kkM0OpkirZ2EAeEQ6nc/view?usp=sharing',
  },
];

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <SectionTitle subtitle="Validated knowledge through industry-recognized platforms">
        Certifications & Courses
      </SectionTitle>

      <div className="relative">
        <FloatingShapes count={6} />
      <StaggerChildren className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <TiltCard key={cert.title} maxTilt={6}>
          <motion.div
            variants={staggerItemScale}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200"
            style={{ perspective: '1000px' }}
          >
            {/* Glow */}
            <div className={`absolute -inset-px bg-gradient-to-r ${cert.color} rounded-2xl opacity-0 group-hover:opacity-15 blur-sm transition-opacity duration-500`} />

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

              <motion.a
                whileHover={{ x: 4 }}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group/link"
              >
                View Certificate
                <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
          </TiltCard>
        ))}
      </StaggerChildren>
      </div>
    </SectionWrapper>
  );
}
