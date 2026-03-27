import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, animate } from 'framer-motion';

// Common viewport settings for better performance
// 'once: true' ensures animations don't re-run on scroll up/down, saving resources significantly.
const viewportConfig = { once: true, amount: 0.1, margin: "0px" };

// Elegant physics-based spring feel or smooth bezier
const elegantTransition = { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }; // Cubic bezier for "smooth snap" feel

export function ScrollReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ ...elegantTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, direction = 'left', className = '', delay = 0 }) {
  const xOffset = direction === 'left' ? -30 : 30; 
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportConfig}
      transition={{ ...elegantTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} 
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportConfig}
      transition={{ ...elegantTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RotateIn({ children, className = '', direction = 1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 3 * direction, scale: 0.95 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={viewportConfig}
      transition={{ ...elegantTransition, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BlurIn({ children, className = '' }) {
  // REPLACED BLUR with a high-end "Soft Rise" animation
  // No blur filter - cleaner, sharper, more performant.
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportConfig}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }} // Soft ease-out
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Optimized Parallax: Simply floats slightly up and down instead of reacting to scroll
export function ParallaxFloat({ children, className = '', speed = 2 }) {
  return (
    <motion.div 
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: speed + 2, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text Reveal - simpler with whileInView
export function TextReveal({ children, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Draw Line: Simple grow animation instead of scroll-linked
export function DrawLine({ className = '' }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={viewportConfig}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{ transformOrigin: 'top', willChange: 'transform' }}
      className={className}
    />
  );
}

// ─── Missing Components Restored & Optimized ─────────────────────────────

export function ScrollProgress() {
  // Simple progress bar that updates on scroll but throttled by browser paints
  // useScroll + useSpring is generally OK, but if user wants "simple", we can keep it or remove it.
  // Given "remove all animation", maybe simplify it to just CSS position sticky or remove the spring.
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export function MagneticHover({ children, className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.1, y: y * 0.1 }); // Reduced magnetic strength
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}

export function TypewriterText({ text, speed = 30, cursor = false, className = '', delay = 0 }) {
  // Split text into words and spaces to avoid wrapping mid-word
  const words = text.split(/(\s+)/);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: speed / 1000, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.3,
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {words.map((word, wordIndex) => (
        <motion.span key={wordIndex} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIndex) => (
            <motion.span variants={child} key={`${wordIndex}-${charIndex}`} className="inline-block" style={{ whiteSpace: "pre" }}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block ml-0.5 w-[2px] h-[1em] bg-blue-500 align-middle"
        />
      )}
    </motion.span>
  );
}

export function MarqueeText({ children, direction = 'left', speed = 20, className = '' }) {
  // Using simplified CSS animation or basic framer loop
  // 'speed' acts as duration here
  return (
    <div className={`overflow-hidden flex whitespace-nowrap ${className}`}>
      <motion.div
        className="flex min-w-full gap-8"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{ willChange: 'transform' }}
      >
        {children}
        {children} {/* Duplicate content for seamless loop */}
      </motion.div>
    </div>
  );
}

// ─── Additional Missing Components ───────────────────────────────────────

export const StaggerChildren = ({ children, className = '', stagger = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const staggerItemScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
};

export const staggerItemSlideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
};

export const staggerItemRotate = {
  hidden: { opacity: 0, rotate: -5, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 100 } },
};

export function FlipIn({ children, className = '', delay = 0 }) {
   return (
    <motion.div
      initial={{ opacity: 0, rotateX: 90 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      viewport={viewportConfig}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlowPulse({ children, className = '' }) {
   // Simplified glow pulse using CSS filter drop-shadow or box-shadow
   // Avoiding filter() if possible, but glow implies it.
   // Using box-shadow is cheaper than filter: drop-shadow
   return (
    <motion.div
      animate={{ boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 15px rgba(59, 130, 246, 0.4)", "0 0 0px rgba(59, 130, 246, 0)"] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      className={`${className} rounded-lg`}
    >
      {children}
    </motion.div>
   );
}

export function CountUp({ to, duration = 2, suffix = '', className = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState("0");
    
    // Parse the target value (handle strings like "7.87" or "88.2")
    const targetValue = parseFloat(to);
    const isFloat = to.toString().includes('.');
    const decimals = isFloat ? to.toString().split('.')[1].length : 0;

    useEffect(() => {
        if (!isInView) return;
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            
            // Easing function (easeOutExpo)
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const current = calculateValue(0, targetValue, ease);
            setDisplayValue(current.toFixed(decimals));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                 setDisplayValue(targetValue.toFixed(decimals));
            }
        };
        
        const calculateValue = (start, end, pct) => {
            return start + (end - start) * pct;
        }

        window.requestAnimationFrame(step);
    }, [isInView, targetValue, duration, decimals]);

    return <span ref={ref} className={className}>{displayValue}{suffix}</span>;
}


