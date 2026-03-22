import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cloud, Wrench, Sparkles } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { StaggerChildren, staggerItemRotate } from '../ScrollAnimations';
import { DotGrid, FloatingShapes } from '../GraphicEffects';

const gradientMap = {
  'from-blue-400 to-blue-600': 'linear-gradient(to right, #60a5fa, #2563eb)',
  'from-indigo-400 to-indigo-600': 'linear-gradient(to right, #818cf8, #4f46e5)',
  'from-red-400 to-orange-500': 'linear-gradient(to right, #f87171, #f97316)',
  'from-sky-400 to-blue-500': 'linear-gradient(to right, #38bdf8, #3b82f6)',
  'from-orange-400 to-amber-500': 'linear-gradient(to right, #fb923c, #f59e0b)',
  'from-blue-400 to-cyan-500': 'linear-gradient(to right, #60a5fa, #06b6d4)',
  'from-gray-500 to-gray-700': 'linear-gradient(to right, #6b7280, #374151)',
  'from-cyan-400 to-blue-500': 'linear-gradient(to right, #22d3ee, #3b82f6)',
  'from-green-400 to-emerald-600': 'linear-gradient(to right, #4ade80, #059669)',
  'from-teal-400 to-cyan-500': 'linear-gradient(to right, #2dd4bf, #06b6d4)',
  'from-pink-400 to-rose-500': 'linear-gradient(to right, #f472b6, #f43f5e)',
  'from-green-400 to-teal-500': 'linear-gradient(to right, #4ade80, #14b8a6)',
  'from-purple-400 to-violet-500': 'linear-gradient(to right, #c084fc, #8b5cf6)',
};

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code2 size={22} />,
    gradient: 'from-blue-500 to-indigo-600',
    skills: [
      { name: 'C', color: 'from-blue-400 to-blue-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
      { name: 'C++', color: 'from-indigo-400 to-indigo-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Java', color: 'from-red-400 to-orange-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Bash', color: 'from-gray-500 to-gray-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: <Cloud size={22} />,
    gradient: 'from-cyan-500 to-blue-600',
    skills: [
      { name: 'MySQL', color: 'from-sky-400 to-blue-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'AWS', color: 'from-orange-400 to-amber-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'EC2', color: 'from-orange-400 to-amber-500', logo: '/ec2.jpg' },
      { name: 'S3', color: 'from-red-400 to-orange-500', logo: '/Amazon-S3-Logo.svg.png' },
      { name: 'CloudWatch', color: 'from-pink-400 to-rose-500', logo: '/aws-cloudwatch3112.jpg' },
      { name: 'DynamoDB', color: 'from-indigo-400 to-indigo-600', logo: '/DynamoDB.png' },
      { name: 'VPC', color: 'from-sky-400 to-blue-500', logo: '/Virtual Private Cloud.png' },
      { name: 'Docker', color: 'from-blue-400 to-cyan-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'GitHub', color: 'from-gray-500 to-gray-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'GitHub Actions', color: 'from-cyan-400 to-blue-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: <Wrench size={22} />,
    gradient: 'from-violet-500 to-purple-600',
    skills: [
      { name: 'React.js', color: 'from-cyan-400 to-blue-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Node.js', color: 'from-green-400 to-emerald-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Tailwind CSS', color: 'from-teal-400 to-cyan-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    title: 'Soft Skills',
    icon: <Sparkles size={22} />,
    gradient: 'from-pink-500 to-rose-600',
    skills: [
      { name: 'Self-Motivated', color: 'from-pink-400 to-rose-500' },
      { name: 'Team Player', color: 'from-green-400 to-teal-500' },
      { name: 'Adaptability', color: 'from-purple-400 to-violet-500' },
    ],
  },
];

function SkillChip({ name, color, logo }) {
  const [hovered, setHovered] = useState(false);
  const gradient = gradientMap[color] || 'linear-gradient(to right, #3b82f6, #06b6d4)';

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.25, y: -6 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-default flex"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl blur-lg transition-opacity duration-300`}
        style={{ opacity: hovered ? 0.8 : 0 }}
      />
      <div
        className="relative flex items-center justify-center p-3 min-w-[4rem] min-h-[4rem] bg-white rounded-xl transition-all duration-300"
        style={{
          borderColor: hovered ? 'transparent' : '#e2e8f0',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: hovered ? '0 10px 25px -5px rgba(0,0,0,0.1)' : undefined,
        }}
      >
        {logo ? (
          <img src={logo} alt={name} className="w-10 h-10 object-contain" title={name} />
        ) : (
          <span
            className="text-sm font-bold text-center whitespace-nowrap px-1"
            style={
              hovered
                ? {
                    backgroundImage: gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }
                : { color: '#334155' }
            }
          >
            {name}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionTitle subtitle="Technologies and tools I work with">Skills & Technologies</SectionTitle>

      <div className="relative">
        <DotGrid rows={10} cols={16} spacing={50} />
        <FloatingShapes count={6} />
      <StaggerChildren className="relative z-10 grid sm:grid-cols-2 gap-8">
        {skillCategories.map((category, catIdx) => (
          <motion.div
            key={category.title}
            variants={staggerItemRotate}
            whileHover={{ y: -6 }}
            className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className={`p-2.5 bg-gradient-to-r ${category.gradient} rounded-xl text-white shadow-lg`}
              >
                {category.icon}
              </motion.div>
              <h3 className="text-lg font-bold text-slate-800">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <SkillChip key={skill.name} {...skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </StaggerChildren>
      </div>
    </SectionWrapper>
  );
}
