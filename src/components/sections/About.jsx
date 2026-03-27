import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap, Code2, Server, Cloud, Globe, Terminal } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { SlideIn, BlurIn, StaggerChildren, staggerItemScale } from '../ScrollAnimations';
import { TiltCard, FloatingShapes, MorphBlob } from '../GraphicEffects';

const highlights = [
  {
    icon: <Globe size={20} />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    label: 'Cloud Native Development',
    desc: 'Building scalable, resilient cloud applications.'
  },
  {
    icon: <Cloud size={20} />,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    label: 'Cloud Architecture',
    desc: 'AWS certified solutions & serverless computing.'
  },
  {
    icon: <Server size={20} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    label: 'Backend Systems',
    desc: 'Robust APIs, microservices & database design.'
  },
  {
    icon: <Terminal size={20} />,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    label: 'DevOps & Automation',
    desc: 'CI/CD pipelines, Docker & infrastructure as code.'
  }
];

export default function About() {
  return (
    <SectionWrapper id="about" bg="alt" className="overflow-hidden">
      <SectionTitle subtitle="A little bit about who I am">About Me</SectionTitle>
      
      {/* Background Decor */}
      <div className="absolute top-20 right-0 opacity-10 pointer-events-none">
         <Code2 size={400} />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto relative z-10">
        
        {/* Left Column: Image & Personal Details */}
        <div className="relative group">
          <FloatingShapes count={4} className="opacity-60" />
          <TiltCard maxTilt={3} className="relative z-10">
             <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white p-3 border border-white/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 z-0" />
                
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-slate-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                    <img
                      src="/1773852765703.png"
                      alt="Jaswanth Reddy Nukalapati"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 items-center justify-center flex-col gap-4 bg-slate-50 text-slate-400">
                         <div className="p-6 bg-white rounded-full shadow-sm">
                            <User size={64} className="text-slate-300" />
                         </div>
                         <p className="text-sm font-medium">Add photo to public/1773852765703.png</p>
                    </div>
                    
                    {/* Floating Overlay Badge */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg flex items-center gap-4">
                        <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Education</p>
                            <p className="text-sm font-bold text-slate-800">Lovely Professional University</p>
                        </div>
                    </div>
                </div>
             </div>
          </TiltCard>
          
          {/* Decorative Elements behind image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] opacity-20 blur-2xl -z-10 group-hover:opacity-30 transition-opacity duration-700" />
        </div>

        {/* Right Column: Bio & Cards */}
        <div className="space-y-8">
            <SlideIn direction="right">
                <div className="relative">
                     <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                        Transforming complex problems into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">elegant solutions.</span>
                     </h3>
                     <div className="space-y-4 text-lg text-slate-600 leading-relaxed md:leading-loose">
                        <BlurIn>
                          <p>
                            Hello! I'm <span className="font-bold text-slate-800">Jaswanth Reddy Nukalapati</span>, a passionate software developer based in <span className="inline-flex items-center gap-1 font-semibold text-slate-800"><MapPin size={16} className="text-red-500" /> India</span>. 
                            My journey began with a simple curiosity about how things work on the web, which quickly evolved into a full-blown career in building scalable applications.
                          </p>
                        </BlurIn>
                        <BlurIn delay={0.2}>
                          <p>
                            I specialize in <span className="font-semibold text-blue-600">Cloud-Native Development</span> and <span className="font-semibold text-indigo-600">Distributed & Scalable Systems</span>. 
                            Whether it's optimizing backend performance, designing intuitive cloud architectures, or deploying serverless infrastructure, I love every part of the process.
                          </p>
                        </BlurIn>
                     </div>
                </div>
            </SlideIn>

            <StaggerChildren className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, i) => (
                    <motion.div 
                        key={i}
                        variants={staggerItemScale}
                        whileHover={{ y: -5 }}
                        className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-1">{item.label}</h4>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </StaggerChildren>
            

        </div>
      </div>
    </SectionWrapper>
  );
}
