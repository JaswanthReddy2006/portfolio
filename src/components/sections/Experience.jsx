import React from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Code } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { DrawLine, BlurIn, FlipIn } from '../ScrollAnimations';
import { FloatingShapes } from '../GraphicEffects';

const experiences = [
  {
    title: 'Data Structures & Algorithms using C++',
    type: 'Training',
    period: 'June – July 2025',
    icon: <BookOpen size={22} />,
    gradient: 'from-blue-600 to-cyan-500',
    details: [
      'Mastered core data structures including arrays, linked lists, stacks, queues, and recursion.',
      'Compiled a portfolio of 50+ solved problems across multiple difficulty levels.',
      'Built a Tic-Tac-Toe game using C++ and 2D Arrays, utilizing the Standard Template Library (STL).',
    ],
  },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience" bg="alt">
      <SectionTitle subtitle="Hands-on learning and professional growth">
        Experience & Training
      </SectionTitle>

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Floating geometric shapes */}
          <FloatingShapes count={5} />
          {/* Animated vertical line that draws on scroll */}
          <DrawLine className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-cyan-500 hidden sm:block" />

          {experiences.map((exp, i) => {
            const ref = React.useRef(null);
            const isInView = useInView(ref, { once: true, amount: 0.3 });

            return (
              <div key={i} ref={ref}>
                <FlipIn axis="X">
                  <BlurIn>
                  <div className="relative flex gap-6 mb-8">
                    {/* Timeline dot — pulses in */}
                    <div className="hidden sm:flex shrink-0 w-12 h-12 items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`w-12 h-12 bg-gradient-to-r ${exp.gradient} rounded-xl flex items-center justify-center text-white shadow-lg z-10`}
                      >
                        {exp.icon}
                      </motion.div>
                    </div>

                    {/* Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{exp.title}</h3>
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5 }}
                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
                          >
                            {exp.type}
                          </motion.span>
                        </div>
                        <span className="text-sm text-slate-400 font-medium">{exp.period}</span>
                      </div>
                      <ul className="space-y-2">
                        {exp.details.map((detail, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.5 + j * 0.12, duration: 0.4 }}
                            className="flex gap-2 text-sm text-slate-600"
                          >
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.gradient} shrink-0`} />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </BlurIn>
                </FlipIn>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
