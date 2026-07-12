'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, SectionHeading } from './ScrollAnimations';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Mehta',
    role: 'Engineering Manager',
    company: 'Kubesense.ai',
    text: 'Krishna transformed our deployment pipeline from manual processes to a fully automated GitOps workflow. His Kubernetes expertise reduced our deployment time by 80% and improved system reliability to 99.9% uptime.',
    rating: 5,
    highlight: 'Kubernetes & GitOps',
  },
  {
    name: 'Priya Sharma',
    role: 'Senior SRE Lead',
    company: 'Quantasis Solutions',
    text: 'Working with Krishna was a game-changer for our infrastructure. His multi-cloud architecture designs and observability implementations gave us unprecedented visibility into our systems. A true DevOps champion.',
    rating: 5,
    highlight: 'Multi-Cloud & Observability',
  },
  {
    name: 'Amit Patel',
    role: 'Product Manager',
    company: 'Previous Project',
    text: 'Krishna\'s Terraform modules and CI/CD pipelines streamlined our entire release process. His attention to security best practices and compliance automation saved us countless hours of manual review.',
    rating: 5,
    highlight: 'IaC & CI/CD',
  },
  {
    name: 'Sneha Desai',
    role: 'DevOps Architect',
    company: 'Industry Colleague',
    text: 'Krishna has an exceptional ability to bridge the gap between development and operations. His eBPF-based monitoring solutions and OpenTelemetry integrations are cutting-edge. Highly recommend for any cloud-native initiative.',
    rating: 5,
    highlight: 'eBPF & Monitoring',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setActive(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  const current = testimonials[active];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-neon-pink/40 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="What People Say"
          subtitle="Feedback from colleagues and managers I've had the privilege of working with."
        />

        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            {/* Main testimonial card */}
            <div className="glass-card rounded-2xl p-8 sm:p-10 relative overflow-hidden">
              {/* Decorative quote mark */}
              <div className="absolute top-4 right-6 text-8xl font-serif text-neon-cyan/5 select-none leading-none">
                &ldquo;
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                  <span className="ml-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                    {current.highlight}
                  </span>
                </div>

                {/* Quote */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-start gap-3 mb-8">
                      <Quote className="w-5 h-5 text-neon-cyan/40 mt-0.5 flex-shrink-0" />
                      <p className="text-foreground/90 text-base sm:text-lg leading-relaxed italic">
                        {current.text}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Author */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder with initials */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-neon-cyan">
                          {current.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{current.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {current.role} · <span className="text-neon-cyan/70">{current.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prev}
                        className="p-2 rounded-lg glass-card text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={next}
                        className="p-2 rounded-lg glass-card text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active
                      ? 'w-8 h-2 bg-neon-cyan'
                      : 'w-2 h-2 bg-surface-3 hover:bg-neon-cyan/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}