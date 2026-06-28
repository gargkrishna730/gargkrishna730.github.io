'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { MagneticButton } from './ScrollAnimations';
import Image from 'next/image';

const titles = [
  'DevOps Engineer',
  'Cloud Architect',
  'Kubernetes Specialist',
  'Infrastructure as Code Expert',
  'CI/CD Pipeline Builder',
  'Multi-Cloud Strategist',
];

function useTypingEffect(strings: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[index];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayed === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % strings.length);
      }, deletingSpeed);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayed(
            isDeleting
              ? current.substring(0, displayed.length - 1)
              : current.substring(0, displayed.length + 1)
          );
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [displayed, index, isDeleting, strings, typingSpeed, deletingSpeed, pauseTime]);

  return displayed;
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#06b6d4';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.globalAlpha = Math.random() * 0.15 + 0.05;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        ctx.globalAlpha = 1;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />;
}

export default function HeroSection() {
  const typedTitle = useTypingEffect(titles);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Technology background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0/60 via-surface-0/80 to-surface-0" />
      </div>

      <MatrixRain />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-neon-emerald/[0.03] blur-3xl floating-orb-1" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Terminal-style greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 font-mono text-sm"
        >
          <span className="w-2 h-2 rounded-full bg-neon-emerald animate-pulse" />
          <span className="text-muted-foreground">~</span>
          <span className="text-neon-emerald">ready</span>
          <span className="text-muted-foreground">to deploy</span>
          <span className="cursor-blink text-neon-cyan">_</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="text-foreground">Krishna</span>
          <br />
          <span className="gradient-text-cyan glow-text">Garg</span>
        </motion.h1>

        {/* Typing effect title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="h-12 sm:h-14 flex items-center justify-center mb-8"
        >
          <span className="font-mono text-lg sm:text-xl lg:text-2xl text-neon-cyan">
            {'> '}{typedTitle}
            <span className="cursor-blink text-neon-cyan">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Engineering resilient cloud infrastructure, automating deployments at scale,
          and building observability systems that keep systems running 24/7.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <MagneticButton>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-surface-0 bg-gradient-to-r from-neon-cyan to-neon-emerald hover:shadow-lg hover:shadow-neon-cyan/25 transition-all duration-300"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-foreground glass-card hover:border-neon-cyan/30 transition-all duration-300"
            >
              View My Work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-muted-foreground hover:text-neon-cyan glass-card hover:border-neon-cyan/30 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Social links with labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex items-center justify-center gap-3"
        >
          {[
            { icon: Github, href: 'https://github.com/gargkrishna730', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/garg-krishna/', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:gargkrishna730@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs font-mono hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-200">{label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator with animated dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-neon-cyan/40 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 rounded-full bg-neon-cyan/60 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}