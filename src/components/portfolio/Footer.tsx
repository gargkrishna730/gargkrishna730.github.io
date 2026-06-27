'use client';

import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Mail, Heart, ArrowUp, ExternalLink, MapPin, Phone, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:gargkrishna730@gmail.com', label: 'Email' },
];

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'What I Do', href: '#what-i-do' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const cloudProviders = [
  { name: 'AWS', color: 'text-amber-400' },
  { name: 'Azure', color: 'text-sky-400' },
  { name: 'GCP', color: 'text-red-400' },
  { name: 'Oracle', color: 'text-red-500' },
  { name: 'IBM', color: 'text-neon-purple' },
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
      {/* Animated gradient glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-neon-emerald/40 to-transparent animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Brand + bio */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.a
              href="#"
              className="flex items-center gap-2.5 group mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-emerald flex items-center justify-center shadow-lg shadow-neon-cyan/10">
                <Terminal className="w-4 h-4 text-surface-0" />
              </div>
              <span className="font-mono font-bold text-xl text-foreground">
                KG<span className="text-neon-cyan">.</span>dev
              </span>
            </motion.a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              DevOps Lead specializing in cloud infrastructure, Kubernetes, and CI/CD automation. Building resilient systems at scale.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl glass-card text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/25 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-widest text-neon-cyan/70 mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-neon-cyan/30 group-hover:bg-neon-cyan/60 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-widest text-neon-cyan/70 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:gargkrishna730@gmail.com"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-neon-cyan transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-neon-cyan/50 group-hover:text-neon-cyan transition-colors" />
                  gargkrishna730@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919152099209"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-neon-cyan transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-neon-cyan/50 group-hover:text-neon-cyan transition-colors" />
                  +91 91520 99209
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-neon-cyan/50" />
                Chennai, India
              </li>
            </ul>
          </div>

          {/* Col 4: Cloud Platforms + CTA */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-widest text-neon-cyan/70 mb-4">Cloud Platforms</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {cloudProviders.map((cloud) => (
                <span
                  key={cloud.name}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono glass-card ${cloud.color} border-border/30`}
                >
                  {cloud.name}
                </span>
              ))}
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-surface-0 bg-gradient-to-r from-neon-cyan to-neon-emerald hover:shadow-lg hover:shadow-neon-cyan/20 transition-all duration-300"
            >
              Let&apos;s Talk
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>by Krishna Garg &copy; {new Date().getFullYear()}</span>
          </div>

          {/* Terminal status bar */}
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground/60">
            <div className="flex items-center gap-2">
              <span className="text-neon-emerald/50">$</span>
              <span>status</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
                <span className="text-neon-emerald/60">operational</span>
              </span>
              <span className="text-muted-foreground/30">|</span>
              <span>uptime</span>
              <span className="text-neon-cyan/50">99.9%</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-neon-emerald/50">IST</span>
              <span className="text-neon-cyan/50 terminal-blink">▌</span>
              <span className="text-neon-cyan/60">{time}</span>
            </div>
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl glass-card text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/25 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}