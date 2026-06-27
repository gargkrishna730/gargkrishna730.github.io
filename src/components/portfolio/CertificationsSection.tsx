'use client';

import { motion } from 'framer-motion';
import { ScrollReveal, SectionHeading, StaggerChildren, StaggerItem } from './ScrollAnimations';
import { Award, ExternalLink } from 'lucide-react';

const certifications = [
  {
    provider: 'Microsoft',
    certs: [
      { name: 'Azure DevOps Engineer Expert', level: 'Expert', color: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20' },
      { name: 'Azure Fundamentals (AZ-900)', level: 'Fundamentals', color: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20' },
      { name: 'AI / Data / Security Fundamentals', level: 'Fundamentals', color: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20' },
      { name: 'Power Platform Fundamentals', level: 'Fundamentals', color: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20' },
      { name: 'Microsoft 365 Fundamentals', level: 'Fundamentals', color: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20' },
    ],
  },
  {
    provider: 'Oracle Cloud',
    certs: [
      { name: 'OCI Architect Associate', level: 'Associate', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
      { name: 'OCI Foundations Associate', level: 'Associate', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
      { name: 'OCI AI Foundations', level: 'Foundations', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
      { name: 'OCI Generative AI Professional', level: 'Professional', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
    ],
  },
  {
    provider: 'AWS',
    certs: [
      { name: 'Certified Cloud Practitioner', level: 'Practitioner', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
      { name: 'Academy Cloud Foundations', level: 'Foundations', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
      { name: 'Cloud Quest', level: 'Quest', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
    ],
  },
  {
    provider: 'GitHub & FinOps',
    certs: [
      { name: 'GitHub Foundations', level: 'Foundations', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' },
      { name: 'GitHub Actions', level: 'Specialist', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' },
      { name: 'GitHub Advanced Security', level: 'Specialist', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' },
      { name: 'GitHub Administration', level: 'Admin', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' },
      { name: 'GitHub Copilot', level: 'Specialist', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' },
      { name: 'FinOps Certified Practitioner', level: 'Practitioner', color: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/20' },
    ],
  },
];

const providerIcons: Record<string, string> = {
  'Microsoft': '🪟',
  'Oracle Cloud': '☁️',
  'AWS': '⚡',
  'GitHub & FinOps': '🐙',
};

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      {/* Decorative background orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Credentials"
          title="Certifications"
          subtitle="Industry-recognized certifications across cloud platforms, DevOps practices, and security."
        />

        {/* Total count banner */}
        <ScrollReveal className="mb-12">
          <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-400" />
              <span className="text-2xl sm:text-3xl font-bold gradient-text-cyan">18+</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-foreground font-medium">Certifications</span> across 4 major platforms — Microsoft, Oracle, AWS, and GitHub
            </div>
          </div>
        </ScrollReveal>

        <StaggerChildren className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
          {certifications.map((group) => (
            <StaggerItem key={group.provider}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 h-full group hover:border-neon-cyan/20 transition-all duration-300"
              >
                {/* Provider header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/50">
                  <span className="text-2xl">{providerIcons[group.provider]}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{group.provider}</h3>
                    <span className="text-xs text-muted-foreground font-mono">{group.certs.length} certifications</span>
                  </div>
                </div>

                {/* Certifications list */}
                <div className="space-y-3">
                  {group.certs.map((cert, i) => (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className={`flex items-center justify-between gap-3 p-3 rounded-xl ${cert.bg} border ${cert.border} group/item hover:scale-[1.02] transition-transform duration-200`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${cert.color} bg-current flex-shrink-0`} />
                        <span className="text-sm text-foreground/90 truncate">{cert.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${cert.color} flex-shrink-0 px-2 py-0.5 rounded-md bg-surface-0/50`}>
                        {cert.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}