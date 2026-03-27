import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, ArrowUpRight, MessageSquare, MapPin } from 'lucide-react';
import SectionWrapper, { SectionTitle } from '../SectionWrapper';
import { SlideIn } from '../ScrollAnimations';
import { FloatingShapes, TiltCard } from '../GraphicEffects';

const contactLinks = [
  {
    label: 'Email',
    value: 'jaswanthr57@gmail.com',
    href: 'mailto:jaswanthr57@gmail.com',
    icon: <Mail size={22} />,
    gradient: 'from-orange-400 to-rose-400',
  },
  {
    label: 'Phone',
    value: '+91 8309234766',
    href: 'tel:+918309234766',
    icon: <Phone size={22} />,
    gradient: 'from-emerald-400 to-cyan-400',
  },
  {
    label: 'LinkedIn',
    value: 'jaswanth2006',
    href: 'https://www.linkedin.com/in/jaswanth2006',
    icon: <Linkedin size={22} />,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    label: 'GitHub',
    value: 'JaswanthReddy2006',
    href: 'https://github.com/JaswanthReddy2006',
    icon: <Github size={22} />,
    gradient: 'from-slate-700 to-zinc-800',
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSent(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        alert("Failed to send message. Please try again or email me directly.");
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert("An error occurred. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" bg="default" className="overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <SectionTitle subtitle="Let's build something amazing together">Get In Touch</SectionTitle>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 max-w-6xl mx-auto items-start relative z-10">
        {/* Left Column: Contact Info & CTA */}
        <div className="relative">
             <FloatingShapes count={3} className="-z-10 opacity-50" />
             
             <SlideIn direction="left">
                <div className="mb-10">
                    <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Have a project in mind? <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Let's talk.</span>
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Let's discuss projects and work together, or feel free to share any feedback. 
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    
                    <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                        <span className="flex items-center gap-2"><MapPin size={18} className="text-violet-500"/> India</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"/>
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                          </span>
                          Available for work
                        </span>
                    </div>
                </div>

                <div className="grid gap-5">
                    {contactLinks.map((link, i) => (
                        <TiltCard key={i} maxTilt={3}>
                            <motion.a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-5 p-4 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300"
                                whileHover={{ scale: 1.02, x: 5 }}
                            >
                                <div className={`p-3.5 rounded-xl bg-gradient-to-br ${link.gradient} text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                    {link.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{link.label}</p>
                                    <p className="text-base md:text-lg font-bold text-slate-800 group-hover:text-violet-600 transition-colors">{link.value}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-violet-50 transition-colors">
                                  <ArrowUpRight className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
                                </div>
                            </motion.a>
                        </TiltCard>
                    ))}
                </div>
             </SlideIn>
        </div>

        {/* Right Column: Contact Form */}
        <div className="relative">
            <SlideIn direction="right" delay={0.2}>
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-violet-900/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-16 bg-gradient-to-bl from-violet-600/10 to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none transition-transform duration-700 group-hover:scale-150" />
                
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-violet-50 rounded-2xl text-violet-600 shadow-sm">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Send a message</h3>
                      <p className="text-slate-500 text-sm">I'll get back to you within 24 hours</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                          <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Name</label>
                          <input
                              type="text"
                              id="name"
                              required
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium placeholder:text-slate-400 focus:bg-white"
                              placeholder="Your Name"
                              value={formState.name}
                              onChange={(e) => setFormState({...formState, name: e.target.value})}
                          />
                      </div>
                      <div className="space-y-1.5">
                          <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                          <input
                              type="email"
                              id="email"
                              required
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium placeholder:text-slate-400 focus:bg-white"
                              placeholder="Your Email"
                              value={formState.email}
                              onChange={(e) => setFormState({...formState, email: e.target.value})}
                          />
                      </div>
                    
                     <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Message</label>
                        <textarea
                            id="message"
                            required
                            rows={4}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium placeholder:text-slate-400 focus:bg-white resize-none"
                            placeholder="Tell me about your project..."
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || isSent}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative group/btn
                            ${isSent ? 'bg-emerald-500' : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-violet-500/40 hover:-translate-y-1'}
                        `}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : isSent ? (
                            <>Message Sent! <span className="text-lg">✨</span></>
                        ) : (
                            <>
                              Send Message 
                              <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
            </SlideIn>
        </div>
      </div>
    </SectionWrapper>
  );
}

