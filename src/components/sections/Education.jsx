import React from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { DrawLine, BlurIn, ScaleIn, CountUp, FlipIn } from '../ScrollAnimations';
import { ProgressRing, GradientBorder, FloatingShapes } from '../GraphicEffects';

const educationData = [
  {
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    degree: 'Bachelor of Technology - Computer Science and Engineering',
    scoreLabel: 'CGPA',
    scoreValue: '7.87',
    scoreMax: 10,
    scoreSuffix: '',
    period: 'Since August 2023',
    icon: <GraduationCap size={22} />,
    gradient: 'from-blue-600 to-cyan-500',
    ringColors: ['#2563eb', '#06b6d4'],
    logo: '/lpu-logo.png',
    highlights: ['Full-Stack Development', 'Cloud Computing', 'Data Structures & Algorithms'],
  },
  {
    institution: 'Narayana Jr College',
    location: 'Andhra Pradesh, India',
    degree: 'Intermediate',
    scoreLabel: 'Percentage',
    scoreValue: '88.2',
    scoreMax: 100,
    scoreSuffix: '%',
    period: 'April 2021 – March 2023',
    icon: <Award size={22} />,
    gradient: 'from-violet-500 to-purple-600',
    ringColors: ['#8b5cf6', '#9333ea'],
    logo: '/narayana-logo.png',
    highlights: ['Mathematics', 'Physics', 'Chemistry'],
  },
  {
    institution: 'Narayana CBSE High School',
    location: 'Andhra Pradesh, India',
    degree: 'Matriculation',
    scoreLabel: 'Percentage',
    scoreValue: '82',
    scoreMax: 100,
    scoreSuffix: '%',
    period: 'April 2020 – March 2021',
    icon: <Award size={22} />,
    gradient: 'from-amber-500 to-orange-500',
    ringColors: ['#f59e0b', '#f97316'],
    logo: '/narayana-logo.png',
    highlights: ['CBSE Curriculum', 'Science Stream'],
  },
];

function EducationCard({ edu, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center justify-center mb-12 last:mb-0">
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        className={`absolute left-1/2 -translate-x-1/2 z-20 w-14 h-14 bg-gradient-to-r ${edu.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg hidden lg:flex`}
      >
        {edu.icon}
      </motion.div>

      {/* Desktop: alternating left/right */}
      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left side card or empty */}
        <div className={isLeft ? '' : 'hidden lg:block'}>
          {isLeft ? (
            <motion.div
              initial={{ opacity: 0, x: -80, rotateY: 15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="group"
            >
              <CardContent edu={edu} isInView={isInView} />
            </motion.div>
          ) : null}
        </div>

        {/* Right side card or empty */}
        <div className={!isLeft ? '' : 'hidden lg:block'}>
          {!isLeft ? (
            <motion.div
              initial={{ opacity: 0, x: 80, rotateY: -15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="group"
            >
              <CardContent edu={edu} isInView={isInView} />
            </motion.div>
          ) : null}
        </div>
      </div>

      {/* Mobile: always show */}
      <div className="lg:hidden w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group"
        >
          <CardContent edu={edu} isInView={isInView} />
        </motion.div>
      </div>
    </div>
  );
}

function CardContent({ edu, isInView }) {
  return (
    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 overflow-hidden">
      {/* Animated corner accent */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${edu.gradient} opacity-5 rounded-full`}
      />

      {/* Logo in corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute top-4 right-4 w-12 h-12 lg:w-16 lg:h-16 opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        <img 
          src={edu.logo} 
          alt={`${edu.institution} Logo`} 
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Mobile icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
        className={`lg:hidden inline-flex p-2.5 bg-gradient-to-r ${edu.gradient} rounded-xl text-white shadow-lg mb-4`}
      >
        {edu.icon}
      </motion.div>

      <div className="relative">
        <h3 className="text-lg font-bold text-slate-900 mb-1">{edu.institution}</h3>

        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} className="text-slate-400" />
          <span className="text-sm text-slate-500">{edu.location}</span>
        </div>

        <p className="text-base font-medium text-slate-700 mb-1">{edu.degree}</p>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: 'auto' } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-3 mb-3"
        >
          {/* SVG Progress Ring */}
          <ProgressRing
            value={edu.scoreValue}
            max={edu.scoreMax}
            size={64}
            strokeWidth={5}
            gradient={edu.ringColors}
            label={edu.scoreLabel}
          />
          <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-bold bg-gradient-to-r ${edu.gradient} text-white rounded-full shadow-sm`}>
            {edu.scoreLabel}: <CountUp to={edu.scoreValue} duration={1.8} suffix={edu.scoreSuffix} />
          </span>
        </motion.div>

        <div className="flex items-center gap-2 mb-4">
          <Calendar size={14} className="text-slate-400" />
          <span className="text-sm text-slate-400">{edu.period}</span>
        </div>

        {/* Subject tags */}
        <div className="flex flex-wrap gap-2">
          {edu.highlights.map((h, j) => (
            <motion.span
              key={h}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + j * 0.08, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100 cursor-default"
            >
              {h}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <SectionWrapper id="education">
      <SectionTitle subtitle="My academic journey and milestones">Education</SectionTitle>

      <div className="max-w-5xl mx-auto relative">
        {/* Floating geometric shapes */}
        <FloatingShapes count={8} />
        {/* Center timeline line — draws on scroll */}
        <DrawLine className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-violet-500 to-amber-500 hidden lg:block" />

        {educationData.map((edu, i) => (
          <EducationCard key={edu.institution} edu={edu} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
