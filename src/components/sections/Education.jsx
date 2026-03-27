import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, BookOpen, School } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { TiltCard, FloatingShapes, MorphBlob } from '../GraphicEffects';

const educationData = [
  {
    id: 1,
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    degree: 'B.Tech in Computer Science & Engineering',
    score: '7.87 CGPA',
    period: '2023 - Present',
    icon: <GraduationCap size={28} />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-indigo-600',
    desc: 'Focusing on Cloud Computing, DSA, and Full-Stack Development.',
    tags: ['Cloud Computing', 'Data Structures', 'Web Dev'],
    logo: '/lpu-logo.png'
  },
  {
    id: 2,
    institution: 'Narayana Jr College',
    location: 'Andhra Pradesh, India',
    degree: 'Intermediate (MPC)',
    score: '88.2%',
    period: '2021 - 2023',
    icon: <BookOpen size={28} />,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    gradient: 'from-violet-500 to-purple-600',
    desc: 'Majored in Mathematics, Physics, and Chemistry.',
    tags: ['Mathematics', 'Physics', 'Chemistry'],
    logo: '/narayana-logo.png'
  },
  {
    id: 3,
    institution: 'Narayana CBSE High School',
    location: 'Andhra Pradesh, India',
    degree: 'Matriculation',
    score: '82%',
    period: '2020 - 2021',
    icon: <School size={28} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    gradient: 'from-emerald-500 to-teal-600',
    desc: 'Completed secondary education with distinction.',
    tags: ['Science', 'Mathematics'],
    logo: '/narayana-logo.png'
  },
];

export default function Education() {
  return (
    <SectionWrapper id="education" bg="default" className="overflow-hidden">
      <SectionTitle subtitle="My academic journey">Education</SectionTitle>

      <FloatingShapes count={4} className="absolute inset-0 pointer-events-none opacity-60" />
      <MorphBlob className="absolute top-40 -left-20 pointer-events-none" size={300} color="rgba(59, 130, 246, 0.15)" />
      <MorphBlob className="absolute bottom-20 -right-20 pointer-events-none" size={300} color="rgba(139, 92, 246, 0.15)" />

      <div className="relative max-w-5xl mx-auto mt-12 z-10">
        {/* Central Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-violet-200 to-transparent -translate-x-1/2 hidden md:block" />
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-transparent md:hidden" />

        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <motion.div 
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-1/2" />

              {/* Timeline Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                <div className={`w-12 h-12 rounded-full border-4 border-white shadow-lg bg-gradient-to-br ${edu.gradient} text-white flex items-center justify-center relative group`}>
                   {React.cloneElement(edu.icon, { size: 20 })}
                   {/* Pulse Effect */}
                   <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${edu.gradient} opacity-40 animate-ping`} />
                </div>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-12">
                <TiltCard maxTilt={3}>
                  <div className="relative p-6 bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden text-left">
                     
                     {/* Gradient bar at top */}
                     <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${edu.gradient}`} />
                     
                     <div className="flex items-start gap-4 mb-4 pt-2">
                        {/* Logo Box */}
                        <div className="relative w-14 h-14 flex-shrink-0 rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                           <img 
                              src={edu.logo} 
                              alt={`${edu.institution} logo`} 
                              className="w-full h-full object-cover"
                           />
                           <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        </div>

                        {/* Title & Grade Header */}
                        <div className="flex-grow min-w-0">
                           <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                              <div>
                                 <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                                    {edu.institution}
                                 </h3>
                                 <p className="text-slate-500 text-sm font-medium mt-1">
                                    {edu.degree}
                                 </p>
                              </div>
                              
                              {/* Integrated Grade Badge */}
                              <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 group-hover:border-blue-100 transition-colors">
                                 <Award size={14} className={`text-slate-400 group-hover:${edu.color.replace('text-', 'text-opacity-80 text-')}`} />
                                 <div className="flex flex-col items-end leading-none">
                                    <span className={`text-sm font-bold ${edu.color}`}>{edu.score}</span>
                                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Grade</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-1.5">
                           <Calendar size={14} className="text-slate-400" />
                           {edu.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                           <MapPin size={14} className="text-slate-400" />
                           {edu.location}
                        </div>
                     </div>

                     <div className="relative p-3 rounded-xl bg-slate-50/50 border border-slate-100 mb-3">
                        <p className="text-slate-600 text-sm leading-relaxed">
                           {edu.desc}
                        </p>
                     </div>

                     <div className="flex flex-wrap gap-2">
                        {edu.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-500 uppercase tracking-wide shadow-sm">
                            {tag}
                          </span>
                        ))}
                     </div>

                  </div>
                </TiltCard>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
