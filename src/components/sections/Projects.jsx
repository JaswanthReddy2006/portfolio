import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, ExternalLink, Github, Shield, Layout } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { SlideIn, ScaleIn, MagneticHover } from '../ScrollAnimations';
import { TiltCard, GradientBorder } from '../GraphicEffects';

const projects = [
  {
    title: 'Secure Campus AI',
    subtitle: 'Automated Attendance & Security System',
    icon: <Shield size={24} />,
    gradient: 'from-blue-600 to-cyan-500',
    description:
      'An intelligent campus security and attendance solution powered by AWS services — automating facial recognition to streamline campus operations.',
    bullets: [
      'Developed an Automated Security System using AWS Rekognition for facial identification and attendance tracking.',
      'Architected a Serverless Backend using AWS Lambda and API Gateway for real-time image processing.',
      'Integrated Real-Time Notifications via Amazon SNS and DynamoDB, reducing security response times.',
    ],
    tags: ['AWS Rekognition', 'Lambda', 'API Gateway', 'DynamoDB', 'SNS', 'Serverless'],
    // Replace with your actual links
    liveLink: '/arch.png',
    liveLinkText: 'Download Architecture',
    liveLinkIcon: Download,
    githubLink: 'https://github.com/JaswanthReddy2006/SecureCampus-AI',
    image: '/arch.png',
    imageAlt: 'AWS Serverless Architecture',
  },
  {
    title: 'WorkSync',
    subtitle: 'Project Management Dashboard',
    icon: <Layout size={24} />,
    gradient: 'from-violet-600 to-purple-500',
    description:
      'A centralized productivity hub that keeps teams aligned — featuring interactive task management, real-time chat, and AI-powered data visualization.',
    bullets: [
      'Centralized productivity hub with interactive task tables, team chats, ensuring 99% uptime.',
      'Built with React.js and Node.js; reduced load times from 1200ms to 300ms through lazy loading.',
      'Automated data visualization by integrating a custom AI-bot controller for real-time charts.',
    ],
    tags: ['React.js', 'Node.js', 'AI Bot', 'Real-Time Chat', 'Lazy Loading'],
    liveLink: '/maintenance.html',
    liveLinkText: 'Live Demo',
    liveLinkIcon: ExternalLink,
    githubLink: 'https://github.com/JaswanthReddy2006/Worksync',
    image: '/worksync.png',
    imageAlt: 'WorkSync Dashboard',
  },
];

function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0;
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref}>
      <SlideIn direction={isEven ? 'left' : 'right'}>
        <TiltCard maxTilt={5}>
        <div className="group grid lg:grid-cols-2 gap-8 items-center bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-blue-200">
          {/* Image side — scale in */}
          <ScaleIn className={`relative overflow-hidden ${isEven ? '' : 'lg:order-2'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <div className="p-6">
              <motion.div
                whileHover={{ scale: 1.03, rotateY: 5 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100"
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className={`w-full ${project.image === '/arch.png' || project.image === '/worksync.png' ? 'h-auto object-contain py-4' : 'h-64 object-cover'} group-hover:scale-105 transition-transform duration-500`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center justify-center h-64 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-400 text-sm flex-col gap-3">
                  <div className={`p-4 bg-gradient-to-r ${project.gradient} rounded-2xl text-white shadow-lg`}>
                    {project.icon}
                  </div>
                  <span>Place image at <code className="text-blue-500">{project.image}</code></span>
                </div>
              </motion.div>
            </div>
          </ScaleIn>

          {/* Content side */}
          <div className={`p-8 ${isEven ? '' : 'lg:order-1'}`}>
            <motion.div
              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-3"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`p-2 bg-gradient-to-r ${project.gradient} rounded-lg text-white shadow-md`}
              >
                {project.icon}
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
                <p className="text-sm text-slate-500">{project.subtitle}</p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-slate-600 mb-5 leading-relaxed"
            >
              {project.description}
            </motion.p>

            <ul className="space-y-2 mb-6">
              {project.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="flex gap-2 text-sm text-slate-600"
                >
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} shrink-0`} />
                  {bullet}
                </motion.li>
              ))}
            </ul>

            {/* Tags — fly in */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.05, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="flex gap-3"
            >
              <MagneticHover strength={0.2}>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.liveLink}
                  download={project.liveLinkText === 'Download Architecture'}
                  target={project.liveLinkText === 'Download Architecture' ? undefined : "_blank"}
                  rel={project.liveLinkText === 'Download Architecture' ? undefined : "noopener noreferrer"}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${project.gradient} text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-shadow text-sm`}
                >
                  <project.liveLinkIcon size={16} /> {project.liveLinkText}
                </motion.a>
              </MagneticHover>
              <MagneticHover strength={0.2}>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors text-sm border border-slate-200"
                >
                  <Github size={16} /> Source Code
                </motion.a>
              </MagneticHover>
            </motion.div>
          </div>
        </div>
        </TiltCard>
      </SlideIn>
    </div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" bg="alt">
      <SectionTitle subtitle="Featured work that I'm proud of">Projects</SectionTitle>
      <div className="space-y-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
