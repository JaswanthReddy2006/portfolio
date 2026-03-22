import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { ScrollReveal, SlideIn, ParallaxFloat, BlurIn, RotateIn } from '../ScrollAnimations';
import { OrbitRing, MorphBlob } from '../GraphicEffects';

export default function About() {
  return (
    <SectionWrapper id="about" bg="alt">
      <SectionTitle subtitle="Get to know me a little better">About Me</SectionTitle>

      <div className="grid md:grid-cols-5 gap-12 items-center">
        {/* Portrait placeholder — with parallax + rotate-in + orbit */}
        <RotateIn direction={-1} className="md:col-span-2">
          <ParallaxFloat speed={0.15}>
            <div className="relative group">
              {/* Orbit ring around photo */}
              <OrbitRing size={340} dotCount={5} className="-top-10 -left-10 z-0 hidden md:block" />
              <motion.div
                animate={{ rotate: [0, 3, -3, 2, 0], scale: [1, 1.02, 0.98, 1.01, 1] }}
                transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                className="absolute -inset-5 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-2xl opacity-40 blur-xl group-hover:opacity-70 transition-opacity duration-500"
                style={{ backgroundSize: '200% 200%' }}
              />
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="/profile.jpg"
                  alt="Jaswanth Reddy Nukalapati"
                  className="w-full aspect-square object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center justify-center aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 text-slate-400 text-sm flex-col gap-2">
                  <User size={48} className="text-blue-300" />
                  <span>Place photo at <code>public/profile.jpg</code></span>
                </div>
              </div>
            </div>
          </ParallaxFloat>
        </RotateIn>

        {/* Bio text — staggered blur-in paragraphs */}
        <SlideIn direction="right" className="md:col-span-3">
          <div className="space-y-5">
            <BlurIn>
              <p className="text-lg leading-relaxed text-slate-600">
                Ever since I wrote my first lines of code, I've been hooked on the thrill of 
                turning ideas into working software. I'm <span className="font-semibold text-slate-800">Jaswanth Reddy Nukalapati</span>, 
                a passionate Full-Stack and Cloud developer currently pursuing my studies at{' '}
                <span className="font-semibold text-blue-600">Lovely Professional University</span>.
              </p>
            </BlurIn>
            <BlurIn>
              <p className="text-lg leading-relaxed text-slate-600">
                My journey started with curiosity about how systems work at scale, which led me 
                deep into <span className="font-semibold text-slate-800">AWS cloud services</span>, 
                serverless architectures, and building applications that are not just functional — 
                but resilient and enterprise-ready. I love the intersection of problem-solving 
                and creativity, whether it's architecting a microservices backend or designing 
                a pixel-perfect frontend.
              </p>
            </BlurIn>
            <BlurIn>
              <p className="text-lg leading-relaxed text-slate-600">
                When I'm not coding, you'll find me grinding through competitive programming 
                challenges, exploring new technologies, or collaborating with teams to ship 
                products that make a real impact.
              </p>
            </BlurIn>

            <ScrollReveal>
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-default"
                >
                  <GraduationCap size={18} className="text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Lovely Professional University</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-default"
                >
                  <MapPin size={18} className="text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">India</span>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </SlideIn>
      </div>
    </SectionWrapper>
  );
}
