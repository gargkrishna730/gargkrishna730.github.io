'use client';

import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:gargkrishna730@gmail.com', label: 'Email' },
];

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/30">
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-emerald flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-surface-0" />
            </div>
            <span className="font-mono font-bold text-foreground">
              KG<span className="text-neon-cyan">.</span>dev
            </span>
          </motion.a>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>by Krishna Garg &copy; {new Date().getFullYear()}</span>
          </div>

          {/* Social + Scroll to top */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg glass-card text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/25 transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-lg glass-card text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/25 transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Bottom terminal line */}
        <div className="mt-8 pt-6 border-t border-border/20">
          <div className="flex items-center justify-between font-mono text-xs text-muted-foreground/60">
            <div className="flex items-center gap-2">
              <span className="text-neon-emerald/50">$</span>
              <span>uptime</span>
              <span className="text-neon-cyan/50">99.9%</span>
              <span>— always deploying, always learning</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-neon-emerald/50">IST</span>
              <span className="text-neon-cyan/50 terminal-blink">▌</span>
              <span className="text-neon-cyan/60">{time}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}