import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Download, Send, ArrowUpRight } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { BlurIn, ScaleIn, StaggerChildren, staggerItemScale, MagneticHover, GlowPulse } from '../ScrollAnimations';
import { MorphBlob, FloatingShapes } from '../GraphicEffects';

const contactLinks = [
  {
    label: 'Email',
    value: 'jaswanthr57@gmail.com',
    href: 'mailto:jaswanthr57@gmail.com',
    icon: <Mail size={22} />,
    gradient: 'from-red-500 to-pink-500',
  },
  {
    label: 'Phone',
    value: '+91 8309234766',
    href: 'tel:+918309234766',
    icon: <Phone size={22} />,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    label: 'LinkedIn',
    value: 'jaswanth2006',
    href: 'https://www.linkedin.com/in/jaswanth2006',
    icon: <Linkedin size={22} />,
    gradient: 'from-blue-600 to-blue-700',
  },
  {
    label: 'GitHub',
    value: 'JaswanthReddy2006',
    href: 'https://github.com/JaswanthReddy2006',
    icon: <Github size={22} />,
    gradient: 'from-gray-700 to-gray-900',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch(import.meta.env.PROD ? '/api/contact' : 'http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(data.error || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" bg="alt">
      <SectionTitle subtitle="Let's connect and build something great together">
        Get In Touch
      </SectionTitle>

      <div className="max-w-4xl mx-auto relative">
        {/* Background decorations */}
        <MorphBlob className="absolute -top-24 -left-24 pointer-events-none" color="rgba(59,130,246,0.04)" size={400} />
        <FloatingShapes count={8} />
        {/* Contact cards */}
        <StaggerChildren className="grid sm:grid-cols-2 gap-5 mb-12">
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              variants={staggerItemScale}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200"
            >
              <div className={`absolute -inset-px bg-gradient-to-r ${link.gradient} rounded-2xl opacity-0 group-hover:opacity-15 blur-sm transition-opacity duration-500`} />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`relative shrink-0 w-12 h-12 bg-gradient-to-r ${link.gradient} rounded-xl flex items-center justify-center text-white shadow-md`}
              >
                {link.icon}
              </motion.div>
              <div className="relative flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{link.label}</p>
                <p className="text-sm font-semibold text-slate-800 truncate">{link.value}</p>
              </div>
              <ArrowUpRight size={18} className="relative text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>
          ))}
        </StaggerChildren>

        {/* Resume download & Contact Form */}
        <BlurIn>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Send Me A Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none"
                    placeholder="What would you like to discuss?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} className={isSubmitting ? "animate-pulse" : ""} />
                </button>
                {status && (
                  <p className={`text-sm text-center font-medium mt-3 ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {status}
                  </p>
                )}
              </div>
            </form>

            {/* Download Resume Link Section */}
            <div className="text-center md:text-left pt-6 md:pt-14">
              <div className="inline-flex flex-col items-center md:items-start gap-4 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow w-full max-w-sm mx-auto md:mx-0">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="p-4 bg-blue-50 rounded-2xl"
                >
                  <Download size={32} className="text-blue-600" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Download My Resume</h3>
                  <p className="text-sm text-slate-500 mb-4">Get a detailed overview of my experience and skills</p>
                </div>
                <MagneticHover strength={0.25}>
                  <motion.a
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href="/myupdatedcv.docx"
                    download
                    className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all overflow-hidden group w-full justify-center"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Download size={18} className="relative z-10" />
                    <span className="relative z-10">Download (DOCX)</span>
                  </motion.a>
                </MagneticHover>
              </div>
            </div>
          </div>
        </BlurIn>
      </div>
    </SectionWrapper>
  );
}
