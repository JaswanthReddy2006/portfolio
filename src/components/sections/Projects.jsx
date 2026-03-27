import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Shield, Layout, ArrowRight, Server, PieChart, Sparkles, Cloud } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { TiltCard, FloatingShapes, MorphBlob } from '../GraphicEffects';

const projects = [
  {
    id: 1,
    title: 'Secure Campus AI',
    subtitle: 'Automated Attendance & Security System',
    category: 'Cloud Engineering',
    icon: <Shield className="text-white" size={24} />,
    gradient: 'from-blue-600 to-cyan-500',
    description:
      'An intelligent campus security solution designed for high scalability. It leverages AWS Rekognition for facial identification and automated attendance tracking. The architecture utilizes S3 for image storage, DynamoDB for fast metadata retrieval, and is secured within a VPC. CloudWatch monitors system health while Lambda functions orchestrate the serverless backend.',
    techStack: [
       { name: 'S3', logo: '/Amazon-S3-Logo.svg.png' },
       { name: 'DynamoDB', logo: '/DynamoDB.png' },
       { name: 'CloudWatch', logo: '/aws-cloudwatch3112.jpg' },
       { name: 'VPC', logo: '/Virtual Private Cloud.png' },
       { name: 'EC2', logo: '/ec2.jpg' },
       { name: 'Lambda', logo: '/Amazon_Lambda_architecture_logo.svg' },
       { name: 'API Gateway', logo: '/apilogo.png' }
    ],
    liveLink: '/arch.png',
    liveLinkText: 'View Architecture',
    githubLink: 'https://github.com/JaswanthReddy2006/SecureCampus-AI',
    image: '/arch.png',
    features: ['99.9% Face Match Accuracy', 'Real-time CloudWatch Alerts', 'VPC Network Isolation', 'S3 Data Lake'],
  },
  {
    id: 2,
    title: 'WorkSync',
    subtitle: 'Project Management Dashboard',
    category: 'Full Stack App',
    icon: <Layout className="text-white" size={24} />,
    gradient: 'from-violet-600 to-purple-500',
    description:
      'A centralized productivity hub enabling real-time collaboration. Features interactive task boards, team chat, and AI-driven performance analytics. Built with a high-performance Node.js backend and optimized React frontend for seamless user experience.',
    techStack: [
      { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Chart.js', logo: 'https://cdn.simpleicons.org/chartdotjs/FF6384' },
    ],
    liveLink: '/maintenance.html',
    liveLinkText: 'Live Demo',
    githubLink: 'https://github.com/JaswanthReddy2006/Worksync',
    image: '/worksync.png',
    features: ['Real-time Updates', 'Lazy Loading', 'AI Analytics'],
  },
];

function ProjectCard({ project, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-20 last:mb-0">
      <TiltCard maxTilt={3}>
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8, delay: index * 0.2 }}
           className="relative group rounded-3xl bg-white border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
        >
           <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Image Section */}
              <div className={`relative h-64 lg:h-auto overflow-hidden bg-slate-50 flex items-center justify-center p-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                 {/* Decorative Background */}
                 <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5`} />
                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                 
                 <motion.div
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full max-w-md rounded-lg overflow-hidden shadow-2xl shadow-blue-900/10 bg-white"
                 >
                    <img 
                       src={project.image} 
                       alt={project.title} 
                       className="w-full h-full object-contain"
                    />
                 </motion.div>
              </div>

              {/* Content Section */}
              <div className="relative p-8 lg:p-12 flex flex-col justify-center">
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                    <project.icon.type size={120} />
                 </div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r ${project.gradient}`}>
                          {project.category}
                       </span>
                    </div>

                    <h3 className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 transition-all duration-300">
                       {project.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-lg mb-6">{project.subtitle}</p>

                    <p className="text-slate-600 leading-relaxed mb-8">
                       {project.description}
                    </p>

                    <div className="flex flex-wrap gap-6 mb-8">
                       {project.techStack.map((tech, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 group/tech">
                             <div className="w-12 h-12 p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center group-hover/tech:scale-110 group-hover/tech:border-blue-200 group-hover/tech:shadow-md transition-all duration-300">
                                <img 
                                   src={tech.logo} 
                                   alt={tech.name} 
                                   className="w-full h-full object-contain filter group-hover/tech:filter-none transition-all duration-300" 
                                />
                             </div>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide group-hover/tech:text-blue-500 transition-colors">{tech.name}</span>
                          </div>
                       ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                        {project.liveLink && (
                           <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm bg-gradient-to-r ${project.gradient} shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all`}>
                              {project.liveLinkText} <ExternalLink size={16} />
                           </a>
                        )}
                        {project.githubLink && (
                           <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-600 font-bold text-sm bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300 hover:text-slate-900 transition-all">
                              Source Code <Github size={16} />
                           </a>
                        )}
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      </TiltCard>
    </div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" bg="default" className="relative overflow-hidden">
      <FloatingShapes count={3} className="absolute inset-0 pointer-events-none opacity-40" />
      <MorphBlob className="absolute top-20 right-0 opacity-20 pointer-events-none text-blue-100" size={400} />
      
      <SectionTitle subtitle="Featured technical projects">Featured Projects</SectionTitle>

      <div className="container mx-auto max-w-6xl mt-16 px-4">
        {projects.map((project, index) => (
           <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      
      <div className="text-center mt-12">
         <a href="https://github.com/JaswanthReddy2006" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-500 font-medium hover:text-blue-600 transition-colors">
            View more on GitHub <ArrowRight size={16} />
         </a>
      </div>
    </SectionWrapper>
  );
}
