import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Swords, Medal } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { StaggerChildren, staggerItemSlideLeft, ScaleIn, GlowPulse } from '../ScrollAnimations';
import { MorphBlob } from '../GraphicEffects';

const hackathons = [
  {
    title: 'Code of Duty Hackathon',
    date: 'January 2024',
    achievement: '5th Rank among 50 Teams',
    description:
      'Secured 5th Rank among 50 teams in an inter-university technical competition, demonstrating strong problem-solving and teamwork under pressure.',
    icon: <Trophy size={24} />,
    gradient: 'from-amber-500 to-orange-600',
    badge: '🏆 Top 10%',
  },
];

export default function Hackathons() {
  return (
    <SectionWrapper id="hackathons">
      <SectionTitle subtitle="Competing, learning, and growing under pressure">
        Competitive Programming & Hackathons
      </SectionTitle>

      <StaggerChildren className="max-w-3xl mx-auto space-y-6 relative">
        {/* Morphing background blob */}
        <MorphBlob className="absolute -top-16 -right-16 pointer-events-none" color="rgba(245,158,11,0.06)" size={350} />
        {hackathons.map((item) => (
          <motion.div
            key={item.title}
            variants={staggerItemSlideLeft}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <GlowPulse>
            {/* Background accent — grows on scroll */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${item.gradient} opacity-5 rounded-bl-full origin-top-right`}
            />

            <div className="relative flex gap-5">
              <motion.div
                animate={{ rotate: [0, 5, -5, 3, 0], y: [0, -3, 0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                whileHover={{ rotate: 360, scale: 1.2 }}
                className={`shrink-0 w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}
              >
                {item.icon}
              </motion.div>

              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.date}</p>
                  </div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 rounded-full"
                  >
                    {item.badge}
                  </motion.span>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <Medal size={16} className="text-amber-500" />
                  <span className="text-sm font-semibold text-amber-600">{item.achievement}</span>
                </motion.div>

                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
            </GlowPulse>
          </motion.div>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
