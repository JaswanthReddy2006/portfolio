import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cloud, Wrench, Sparkles, Cpu, Globe } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { StaggerChildren, staggerItemRotate, MagneticHover } from '../ScrollAnimations';
import { DotGrid, FloatingShapes, TiltCard } from '../GraphicEffects';

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code2 size={24} />,
    gradient: 'from-blue-500 to-indigo-600',
    skills: [
      { name: 'C', color: 'from-blue-400 to-blue-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
      { name: 'C++', color: 'from-indigo-400 to-indigo-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Java', color: 'from-red-400 to-orange-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Bash', color: 'from-gray-500 to-gray-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud size={24} />,
    gradient: 'from-cyan-500 to-blue-600',
    skills: [
      { name: 'AWS', color: 'from-orange-400 to-amber-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Docker', color: 'from-blue-400 to-cyan-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'VPC', color: 'from-sky-400 to-blue-500', logo: '/Virtual Private Cloud.png' },
      { name: 'EC2', color: 'from-orange-400 to-amber-500', logo: '/ec2.jpg' },
      { name: 'S3', color: 'from-red-400 to-orange-500', logo: '/Amazon-S3-Logo.svg.png' },
      { name: 'Lambda', color: 'from-orange-400 to-amber-500', logo: 'https://cdn.worldvectorlogo.com/logos/aws-lambda-1.svg' },
    ],
  },
  {
    title: 'Database & Backend',
    icon: <Globe size={24} />,
    gradient: 'from-emerald-500 to-teal-600',
    skills: [
      { name: 'MySQL', color: 'from-sky-400 to-blue-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'DynamoDB', color: 'from-indigo-400 to-indigo-600', logo: '/DynamoDB.png' },
      { name: 'Node.js', color: 'from-green-400 to-emerald-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    ],
  },
  {
    title: 'Frameworks & Tools',
    icon: <Wrench size={24} />,
    gradient: 'from-violet-500 to-purple-600',
    skills: [
      { name: 'React.js', color: 'from-cyan-400 to-blue-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'GitHub', color: 'from-gray-500 to-gray-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    ],
  },
  {
    title: 'Soft Skills',
    icon: <Sparkles size={24} />,
    gradient: 'from-pink-500 to-rose-600',
    skills: [
      { name: 'Self-Motivated', color: 'from-pink-400 to-rose-500' },
      { name: 'Team Player', color: 'from-green-400 to-teal-500' },
      { name: 'Adaptability', color: 'from-purple-400 to-violet-500' },
    ],
  },
];

function SkillChip({ name, color, logo, index, forceHover }) {
  const [hovered, setHovered] = useState(false);
  const isActive = hovered || forceHover;
  
  // Random float animation for "alive" feel
  const randomDuration = 2 + Math.random() * 2;
  const randomY = 5 + Math.random() * 5;

  return (
    <MagneticHover strength={0.4}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        animate={{ y: [0, -randomY, 0] }}
        transition={{ 
            y: { duration: randomDuration, repeat: Infinity, ease: "easeInOut", delay: Math.random() }
        }}
        whileHover={{ scale: 1.15, translateY: -8, rotate: [0, -2, 2, 0], zIndex: 10 }}
        className={`relative group/chip cursor-pointer ${isActive ? 'scale-105' : ''}`}
      >
        {/* Glow Layer - Activates on SELF hover OR PARENT CARD hover */}
        <div
          className={`absolute -inset-2 bg-gradient-to-r ${color} rounded-2xl blur-xl transition-all duration-300 ${isActive ? 'opacity-70 scale-110' : 'opacity-0 scale-90'}`}
        />
        
        <div
          className="relative flex flex-col items-center justify-center p-4 min-w-[7rem] bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm group-hover/chip:shadow-2xl group-hover/chip:border-blue-200 transition-all duration-300 h-28 w-full"
        >
          {logo ? (
            <>
              <motion.img 
                src={logo} 
                alt={name} 
                className="w-10 h-10 object-contain mb-3 drop-shadow-sm" 
                title={name} 
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
                animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              />
              <span className="text-xs font-semibold text-slate-600 hidden">{name}</span>
              <span className={`text-sm font-bold transition-colors mt-auto ${isActive ? 'text-blue-600' : 'text-slate-700'}`}>{name}</span>
            </>
          ) : (
            <span
              className={`text-sm font-bold text-center whitespace-nowrap px-2 transition-all duration-300 ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r ' + color : 'text-slate-600'}`}
            >
              {name}
            </span>
          )}
        </div>
      </motion.div>
    </MagneticHover>
  );
}

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <SectionWrapper id="skills">
      <SectionTitle subtitle="Technologies and tools I work with">Skills & Technologies</SectionTitle>

      <div className="relative pt-8">
        <DotGrid rows={10} cols={16} spacing={50} />
        <FloatingShapes count={6} />
        
        <StaggerChildren className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category) => (
            <TiltCard key={category.title} maxTilt={2}>
              <motion.div
                variants={staggerItemRotate}
                onHoverStart={() => setHoveredCategory(category.title)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="relative overflow-hidden group/card h-full bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                 <div className="flex items-center gap-4 mb-8 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3.5 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg shadow-blue-500/20`}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{category.title}</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4" />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
                  {category.skills.map((skill, j) => (
                    <SkillChip key={j} {...skill} forceHover={hoveredCategory === category.title} />
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </StaggerChildren>
      </div>
    </SectionWrapper>
  );
}
