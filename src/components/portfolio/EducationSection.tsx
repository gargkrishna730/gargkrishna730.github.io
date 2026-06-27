'use client';

import { ScrollReveal, SectionHeading } from './ScrollAnimations';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-neon-emerald/40 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-neon-emerald/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Education"
          title="Academic Background"
          subtitle="The foundation that shaped my engineering mindset and problem-solving approach."
        />

        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 sm:p-10 relative overflow-hidden group hover:border-neon-emerald/25 transition-all duration-500">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-emerald/5 to-transparent rounded-bl-full" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-neon-emerald/10 rounded-2xl rotate-12 group-hover:rotate-6 transition-transform duration-500" />

              {/* Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2.5 rounded-xl bg-neon-emerald/10 text-neon-emerald">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-neon-emerald/70">Bachelor of Engineering</span>
              </div>

              {/* Degree info */}
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Information Technology
              </h3>
              <div className="flex items-center gap-2 text-neon-cyan mb-6">
                <BookOpen className="w-4 h-4" />
                <span className="font-medium text-lg">Xavier Institute of Engineering</span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-neon-emerald/70" />
                  <span>December 2020 - May 2024</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-neon-emerald/70" />
                  <span>Mumbai, India</span>
                </div>
              </div>

              {/* CGPA Display */}
              <div className="flex items-center gap-6">
                <div className="glass-card rounded-xl p-5 text-center flex-1 group/cgpa">
                  <div className="text-4xl font-bold gradient-text-cyan mb-1">8.50</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">CGPA out of 10</div>
                  <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-surface-3 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-emerald" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-3/50">
                    <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">Dean&apos;s List — Multiple Semesters</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-3/50">
                    <BookOpen className="w-4 h-4 text-neon-purple flex-shrink-0" />
                    <span className="text-sm text-foreground/80">Focus: Cloud Computing & Networking</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}