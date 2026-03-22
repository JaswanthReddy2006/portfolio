import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';

function useScrollAnimation(offset = ['0 1', '0.3 1']) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  return { ref, opacity, y, scrollYProgress };
}

export function ScrollReveal({ children, className = '', delay = 0 }) {
  const { ref, opacity, y } = useScrollAnimation();
  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, direction = 'left', className = '', delay = 0 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '0.3 1'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [direction === 'left' ? -100 : 100, 0]
  );
  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '0.35 1'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RotateIn({ children, className = '', direction = 1 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '0.4 1'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [12 * direction, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  return (
    <motion.div
      ref={ref}
      style={{ opacity, rotate, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BlurIn({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '0.35 1'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], ['blur(12px)', 'blur(0px)']);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  return (
    <motion.div ref={ref} style={{ opacity, filter, y }} className={className}>
      {children}
    </motion.div>
  );
}

export function ParallaxFloat({ children, className = '', speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function TextReveal({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function DrawLine({ className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.3'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      ref={ref}
      style={{ scaleY, transformOrigin: 'top' }}
      className={className}
    />
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 z-[100]"
    />
  );
}

export function StaggerChildren({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const staggerItemScale = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const staggerItemSlideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerItemSlideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerItemRotate = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Animated counter that counts up when scrolled into view
export function CountUp({ to, duration = 2, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseFloat(to);
    const isFloat = String(to).includes('.');
    const decimals = isFloat ? String(to).split('.')[1].length : 0;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = eased * end;
      setCount(isFloat ? current.toFixed(decimals) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

// Text that types out character by character
export function TypewriterText({ text, className = '', speed = 40 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {isInView && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-[2px] h-[1em] bg-blue-500 ml-0.5 align-text-bottom"
        />
      )}
    </span>
  );
}

// 3D flip-in reveal
export function FlipIn({ children, className = '', axis = 'X' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div ref={ref} style={{ perspective: '1200px' }} className={className}>
      <motion.div
        initial={{ opacity: 0, [`rotate${axis}`]: axis === 'X' ? 90 : -90 }}
        animate={isInView ? { opacity: 1, [`rotate${axis}`]: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: axis === 'X' ? 'top center' : 'left center' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Magnetic hover that follows cursor
export function MagneticHover({ children, className = '', strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Glow pulse border animation
export function GlowPulse({ children, className = '', color = 'blue' }) {
  const glowColors = {
    blue: 'shadow-blue-400/50',
    cyan: 'shadow-cyan-400/50',
    purple: 'shadow-purple-400/50',
    amber: 'shadow-amber-400/50',
  };

  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 0px rgba(59,130,246,0)',
          '0 0 20px rgba(59,130,246,0.3)',
          '0 0 0px rgba(59,130,246,0)',
        ],
      }}
      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Marquee / infinite scroll text
export function MarqueeText({ text, className = '', speed = 20 }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
        className="inline-flex"
      >
        <span className="pr-8">{text}</span>
        <span className="pr-8">{text}</span>
        <span className="pr-8">{text}</span>
        <span className="pr-8">{text}</span>
      </motion.div>
    </div>
  );
}
