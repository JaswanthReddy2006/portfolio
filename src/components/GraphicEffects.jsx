import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';

// ─── Simplified Beautiful Background ──────────────────────────────────────
export function ScrollReactiveBackground() {
  const canvasRef = useRef(null);
  
  // Use Refs for animation state to avoid Re-renders (Performance Critical)
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Start off-screen
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // --- Configuration for Projector Impact ---
    const PARTICLE_COUNT = window.innerWidth > 1000 ? 120 : 60; // Increased density for "more geometric things"
    const CONNECT_DISTANCE = 180; // Slightly longer connections for dense web
    const MOUSE_RADIUS = 350; 
    
    // --- Resize Handler ---
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // --- Particle Logic ---
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8; // Slightly faster for "life"
        this.vy = (Math.random() - 0.5) * 0.8;
        this.baseSize = Math.random() * 2 + 1.5; // Larger base size for visibility
        this.size = this.baseSize;
        // Base color is Slate-400 for visibility on white
        this.baseColor = 'rgba(148, 163, 184, 0.4)'; 
        // Active color is bright Cyan/Blue for "Pop"
        this.activeColor = 'rgba(6, 182, 212, 0.9)'; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges for continuous flow
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Interaction Logic
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
            // "Magnify" effect - particles grow when near mouse
            const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
            this.size = this.baseSize + (force * 3); // Grow up to +3px
        } else {
            this.size = this.baseSize;
        }
      }

      draw() {
        // Dynamic coloring based on mouse proximity
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (distance < MOUSE_RADIUS) {
            ctx.fillStyle = this.activeColor;
        } else {
            ctx.fillStyle = this.baseColor;
        }
        
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Particles first
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw Network Connections
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECT_DISTANCE) {
            // Check if this connection is within the "Flashlight" zone
            // We calculate the midpoint of the line to check proximity to mouse
            const midX = (particles[a].x + particles[b].x) / 2;
            const midY = (particles[a].y + particles[b].y) / 2;
            const distToMouse = Math.sqrt(
                Math.pow(midX - mouseRef.current.x, 2) + 
                Math.pow(midY - mouseRef.current.y, 2)
            );

            ctx.beginPath();
            
            if (distToMouse < MOUSE_RADIUS) {
                // Lit up connection
                const intensity = 1 - (distToMouse / MOUSE_RADIUS);
                ctx.strokeStyle = `rgba(6, 182, 212, ${intensity * 0.8})`; // Bright Cyan
                ctx.lineWidth = 1.5; // Thicker lines for projector
            } else {
                // Dim connection
                const opacity = 1 - (distance / CONNECT_DISTANCE);
                ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.15})`; // Faint slate
                ctx.lineWidth = 0.5;
            }

            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw "Projector Cursor" - A subtle ring around the mouse to guide the eye
      if (mouseRef.current.x > 0) {
          ctx.beginPath();
          ctx.arc(mouseRef.current.x, mouseRef.current.y, 20, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(37, 99, 235, 0.3)';
          ctx.lineWidth = 2;
          ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // --- Event Listeners ---
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    // Auto-drift mouse for "Curiosity" when idle/loading
    // (Optional: can add later if requested, simpler is better for perf)

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // Init
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden bg-white" style={{ zIndex: 0 }}>
      {/* 1. Warm/Modern Base Gradient (Visible on Projector) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
      
      {/* 2. The Canvas Network */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

// ─── Modern Spacer (No Waves) ───────────────────────────────────────
export function SectionSpacer() {
  return <div className="h-24 w-full" />;
}

// ─── Floating Geometric Shapes ───────────────────────────────────────
const shapes = [
  // Triangle
  (props) => (
    <svg width={props.size} height={props.size} viewBox="0 0 40 40" {...props.svgProps}>
      <polygon points="20,4 36,36 4,36" fill="none" stroke={props.stroke} strokeWidth="1.5" opacity={props.opacity} />
    </svg>
  ),
  // Hexagon
  (props) => (
    <svg width={props.size} height={props.size} viewBox="0 0 40 40" {...props.svgProps}>
      <polygon points="20,2 36,10 36,30 20,38 4,30 4,10" fill="none" stroke={props.stroke} strokeWidth="1.5" opacity={props.opacity} />
    </svg>
  ),
  // Diamond
  (props) => (
    <svg width={props.size} height={props.size} viewBox="0 0 40 40" {...props.svgProps}>
      <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke={props.stroke} strokeWidth="1.5" opacity={props.opacity} />
    </svg>
  ),
  // Circle
  (props) => (
    <svg width={props.size} height={props.size} viewBox="0 0 40 40" {...props.svgProps}>
      <circle cx="20" cy="20" r="16" fill="none" stroke={props.stroke} strokeWidth="1.5" opacity={props.opacity} />
    </svg>
  ),
  // Plus / Cross
  (props) => (
    <svg width={props.size} height={props.size} viewBox="0 0 40 40" {...props.svgProps}>
      <line x1="20" y1="4" x2="20" y2="36" stroke={props.stroke} strokeWidth="1.5" opacity={props.opacity} />
      <line x1="4" y1="20" x2="36" y2="20" stroke={props.stroke} strokeWidth="1.5" opacity={props.opacity} />
    </svg>
  ),
  // Square (rotated)
  (props) => (
    <svg width={props.size} height={props.size} viewBox="0 0 40 40" {...props.svgProps}>
      <rect x="8" y="8" width="24" height="24" fill="none" stroke={props.stroke} strokeWidth="1.5" opacity={props.opacity} transform="rotate(15,20,20)" />
    </svg>
  ),
];

export function FloatingShapes({ count = 12, className = '' }) {
  const items = React.useMemo(() => {
    const arr = [];
    const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#f43f5e', '#10b981'];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        ShapeComponent: shapes[i % shapes.length],
        x: `${5 + (i * 73) % 90}%`,
        y: `${5 + (i * 37) % 85}%`,
        size: 20 + (i % 4) * 8,
        stroke: colors[i % colors.length],
        opacity: 0.2 + (i % 3) * 0.1,
        duration: 10 + (i % 5) * 3,
        delay: (i * 0.7) % 4,
        rotateRange: 120 + (i % 3) * 60,
      });
    }
    return arr;
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -25, 10, -15, 0],
            x: [0, 12, -8, 6, 0],
            rotate: [0, item.rotateRange, -item.rotateRange / 2, item.rotateRange / 3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: item.duration,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          <item.ShapeComponent
            size={item.size}
            stroke={item.stroke}
            opacity={item.opacity}
            svgProps={{}}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Particle Field (animated dots) ─────────────────────────────────
export function ParticleField({ count = 30, className = '' }) {
  const particles = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        x: `${(i * 47) % 100}%`,
        y: `${(i * 31) % 100}%`,
        size: 2 + (i % 4),
        opacity: 0.1 + (i % 5) * 0.06,
        duration: 6 + (i % 7) * 2,
        delay: (i * 0.3) % 5,
      });
    }
    return arr;
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-500"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 20, -20, 0],
            x: [0, 15, -10, 8, 0],
            scale: [1, 1.5, 0.8, 1.2, 1],
            opacity: [p.opacity, p.opacity * 2, p.opacity * 0.5, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated SVG Progress Ring ──────────────────────────────────────
export function ProgressRing({ value, max = 100, size = 100, strokeWidth = 6, gradient, label, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (parseFloat(value) / max) * 100;
  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    if (isInView) {
      // animate after a small delay
      const timer = setTimeout(() => {
        setAnimatedOffset(circumference - (percentage / 100) * circumference);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, circumference, percentage]);

  const gradientId = `ring-grad-${label?.replace(/\s/g, '') || 'default'}`;

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradient?.[0] || '#3b82f6'} />
            <stop offset="100%" stopColor={gradient?.[1] || '#06b6d4'} />
          </linearGradient>
        </defs>
        {/* background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        {/* animated arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      {/* center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-[10px] text-slate-400 font-medium -mb-0.5">{label}</span>}
      </div>
    </div>
  );
}

// ─── Morphing SVG Blob ───────────────────────────────────────────────
export function MorphBlob({ className = '', color = 'rgba(59,130,246,0.08)', size = 400 }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`${className}`}
    >
      <motion.path
        fill={color}
        animate={{
          d: [
            'M44.7,-76.4C58.8,-69.2,71.8,-58.9,79.6,-45.5C87.4,-32.1,90,-15.5,88.5,-0.2C87,15.1,81.5,29.5,73.1,42.5C64.7,55.5,53.5,67.1,39.9,74.5C26.3,81.9,10.4,85,-5.2,82.4C-20.8,79.8,-36.1,71.5,-49.8,62C-63.5,52.5,-75.5,41.8,-81.8,28.2C-88.1,14.6,-88.7,-1.9,-84.2,-16.7C-79.7,-31.5,-70.1,-44.6,-57.6,-52.8C-45.1,-61,-29.7,-64.3,-15,-66.9C-0.3,-69.5,13.7,-71.4,27.5,-74.1C41.3,-76.8,55,-83.3,44.7,-76.4Z',
            'M40.9,-69.3C53.4,-63.7,64.2,-53.3,72.3,-40.6C80.4,-27.9,85.8,-12.9,84.6,1.1C83.4,15.1,75.6,28,66.2,39.3C56.8,50.6,45.8,60.3,33.2,67.6C20.6,74.9,6.4,79.8,-8.4,80.5C-23.2,81.2,-38.6,77.7,-50.1,69.6C-61.6,61.5,-69.2,48.8,-75.6,35C-82,21.2,-87.2,6.3,-85.8,-7.8C-84.4,-21.9,-76.4,-35.2,-65.3,-44.1C-54.2,-53,-40,-57.5,-27.3,-63.1C-14.6,-68.7,-3.4,-75.4,6.1,-75.8C15.6,-76.2,28.4,-74.9,40.9,-69.3Z',
            'M47.5,-78.7C62.3,-73.3,75.6,-62.4,82.2,-48.5C88.8,-34.6,88.7,-17.7,85.9,-2.1C83.1,13.5,77.6,27.7,69.3,40.3C61,52.9,49.9,63.9,36.8,71.1C23.7,78.3,8.6,81.7,-5.4,80.1C-19.4,78.5,-32.3,71.9,-44.8,64.2C-57.3,56.5,-69.4,47.7,-76.3,35.3C-83.2,22.9,-84.9,6.9,-82.1,-7.9C-79.3,-22.7,-72,-36.3,-61.5,-46.2C-51,-56.1,-37.3,-62.3,-24.3,-68.6C-11.3,-74.9,-0.9,-81.3,10.8,-82.6C22.5,-83.9,32.7,-84.1,47.5,-78.7Z',
            'M44.7,-76.4C58.8,-69.2,71.8,-58.9,79.6,-45.5C87.4,-32.1,90,-15.5,88.5,-0.2C87,15.1,81.5,29.5,73.1,42.5C64.7,55.5,53.5,67.1,39.9,74.5C26.3,81.9,10.4,85,-5.2,82.4C-20.8,79.8,-36.1,71.5,-49.8,62C-63.5,52.5,-75.5,41.8,-81.8,28.2C-88.1,14.6,-88.7,-1.9,-84.2,-16.7C-79.7,-31.5,-70.1,-44.6,-57.6,-52.8C-45.1,-61,-29.7,-64.3,-15,-66.9C-0.3,-69.5,13.7,-71.4,27.5,-74.1C41.3,-76.8,55,-83.3,44.7,-76.4Z',
          ],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        transform="translate(100 100)"
      />
    </motion.svg>
  );
}

// ─── Orbit Ring (animated SVG orbiting dots) ─────────────────────────
export function OrbitRing({ size = 280, dotCount = 6, className = '' }) {
  const radius = size / 2 - 12;
  const dots = Array.from({ length: dotCount }, (_, i) => ({
    id: i,
    startAngle: (360 / dotCount) * i,
    size: 4 + (i % 3) * 2,
    color: ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e'][i % 6],
    duration: 8 + (i % 4) * 2,
  }));

  return (
    <div className={`absolute ${className}`} style={{ width: size, height: size }}>
      {/* Dashed orbit path */}
      <svg width={size} height={size} className="absolute inset-0">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
      </svg>
      {/* Orbiting dots */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            top: size / 2 - dot.size / 2,
            left: size / 2 - dot.size / 2,
            boxShadow: `0 0 8px ${dot.color}60`,
          }}
          animate={{
            rotate: [dot.startAngle, dot.startAngle + 360],
          }}
          transition={{
            repeat: Infinity,
            duration: dot.duration,
            ease: 'linear',
          }}
          // orbit around center by transformOrigin offset
          initial={{ rotate: dot.startAngle }}
          // We use a wrapper technique: translateX moves to orbit radius, then rotate spins
        >
          <motion.div
            style={{
              position: 'absolute',
              width: dot.size,
              height: dot.size,
            }}
          />
        </motion.div>
      ))}
      {/* Use SVG-based orbiting for cleaner paths */}
      <svg width={size} height={size} className="absolute inset-0">
        {dots.map((dot) => (
          <motion.circle
            key={`svg-${dot.id}`}
            r={dot.size / 2}
            fill={dot.color}
            filter={`drop-shadow(0 0 4px ${dot.color}60)`}
            animate={{
              cx: Array.from({ length: 61 }, (_, i) => {
                const angle = ((dot.startAngle + (360 * i) / 60) * Math.PI) / 180;
                return size / 2 + radius * Math.cos(angle);
              }),
              cy: Array.from({ length: 61 }, (_, i) => {
                const angle = ((dot.startAngle + (360 * i) / 60) * Math.PI) / 180;
                return size / 2 + radius * Math.sin(angle);
              }),
            }}
            transition={{
              repeat: Infinity,
              duration: dot.duration,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── 3D Tilt Card (follows mouse) ───────────────────────────────────
export function TiltCard({ children, className = '', maxTilt = 8 }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = x / rect.width - 0.5;
    const percentY = y / rect.height - 0.5;
    rotateX.set(-percentY * maxTilt);
    rotateY.set(percentX * maxTilt);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Gradient Border ────────────────────────────────────────
export function GradientBorder({ children, className = '' }) {
  return (
    <div className={`relative p-[2px] rounded-2xl overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'conic-gradient(from 0deg, #3b82f6, #06b6d4, #8b5cf6, #f59e0b, #f43f5e, #3b82f6)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
      />
      <div className="relative bg-white rounded-[14px]">{children}</div>
    </div>
  );
}

// ─── Animated SVG Dot Grid Background ────────────────────────────────
export function DotGrid({ className = '', rows = 8, cols = 12, spacing = 40 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg width="100%" height="100%" className="opacity-20">
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => (
            <motion.circle
              key={`${r}-${c}`}
              cx={spacing / 2 + c * spacing}
              cy={spacing / 2 + r * spacing}
              r="1.5"
              fill="#94a3b8"
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: [0.3, 0.8, 0.3] }}
              viewport={{ once: false }}
              transition={{
                duration: 2,
                delay: (r + c) * 0.05,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))
        )}
      </svg>
    </div>
  );
}

// ─── Scroll-triggered SVG Path Draw ──────────────────────────────────
export function SVGPathDraw({ d, className = '', strokeColor = '#3b82f6', strokeWidth = 2 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.3'],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  return (
    <svg ref={ref} viewBox="0 0 1200 120" className={className} preserveAspectRatio="none">
      <motion.path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        style={{ pathLength }}
        strokeLinecap="round"
      />
    </svg>
  );
}
