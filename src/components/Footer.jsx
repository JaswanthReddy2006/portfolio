import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const socialLinks = [
  { icon: <Github size={18} />, href: 'https://github.com/JaswanthReddy2006', label: 'GitHub' },
  { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/jaswanth2006', label: 'LinkedIn' },
  { icon: <Mail size={18} />, href: 'mailto:jaswanthr57@gmail.com', label: 'Email' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900 text-white py-10 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="#hero"
          className="inline-block text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          JR.
        </motion.a>

        <div className="flex justify-center gap-5 mt-5 mb-6">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.15 }}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-2.5 bg-slate-800 rounded-xl hover:bg-blue-600 transition-colors"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-slate-400 flex items-center justify-center gap-1"
        >
          &copy; {currentYear} Jaswanth Reddy Nukalapati. Built with
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart size={14} className="text-red-400 inline" fill="currentColor" />
          </motion.span>
          using React & Tailwind CSS.
        </motion.p>
      </div>
    </motion.footer>
  );
}
