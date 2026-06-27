'use client';

import { useState } from 'react';
import { ScrollReveal, SectionHeading } from './ScrollAnimations';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight, ChevronDown } from 'lucide-react';

const experiences = [
  {
    title: 'DevOps Engineer - SDE I',
    company: 'Kubesense.ai',
    location: 'Chennai, India',
    period: 'April 2025 - Present',
    current: true,
    highlights: [
      'Owned full-cycle DevOps operations for a SaaS-based observability and telemetry platform, covering CI/CD, infrastructure automation, and monitoring across environments.',
      'Architected multi-cloud deployments across AWS, Azure, GCP, and Oracle Cloud, ensuring 99.9% uptime and cost-efficient scaling.',
      'Automated Kubernetes deployments using Helm, Kustomize, and ArgoCD, enabling GitOps-based continuous delivery with self-healing microservices.',
      'Built observability stack integrating eBPF, OpenTelemetry, Prometheus, and Datadog Agent for unified metrics, logs, and traces.',
      'Implemented CI/CD pipelines via GitHub Actions with automated testing, linting, and image scanning for secure zero-downtime releases.',
      'Deployed Infrastructure as Code using Terraform and Ansible, achieving version-controlled, reproducible infrastructure.',
      'Integrated FinOps practices and auto-scaling strategies to optimize performance, fault tolerance, and cost efficiency.',
      'Enhanced security posture through IAM policy hardening, VPC segmentation, TLS encryption, and compliance automation.',
    ],
  },
  {
    title: 'Cloud and DevOps Engineer',
    company: 'Quantasis Solutions Pvt. Ltd.',
    location: 'Mumbai, India',
    period: 'Nov 2023 - March 2025',
    current: false,
    highlights: [
      'Led DevOps initiatives to design and manage secure, scalable multi-cloud infrastructure across AWS, Azure, and Oracle Cloud.',
      'Implemented CI/CD pipelines using Azure DevOps, GitHub Actions, and GitLab, automating build, testing, and deployment workflows.',
      'Automated Kubernetes deployments with Helm, improving microservice availability and reducing manual configuration.',
      'Integrated SonarQube into CI pipelines for continuous code quality analysis and security scanning.',
      'Developed Infrastructure as Code with Terraform and ARM templates, ensuring reproducible and versioned provisioning.',
      'Implemented centralized logging and monitoring via ELK Stack and Prometheus, improving incident response and MTTR.',
      'Enhanced identity management using OpenAM, integrating OAuth2, SAML, and LDAP for compliance.',
      'Mentored team members on Kubernetes, CI/CD, and automation best practices.',
    ],
  },
];

function TimelineLine() {
  return (
    <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan/50 via-neon-purple/30 to-transparent" />
  );
}

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Career Path"
          title="Work Experience"
          subtitle="A journey of building, automating, and scaling cloud infrastructure for high-performance systems."
        />

        <div className="relative">
          <TimelineLine />

          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp, index) => (
              <ScrollReveal
                key={exp.company}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.15}
              >
                <div className={`relative flex flex-col lg:flex-row gap-8 items-start ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      exp.current ? 'bg-neon-emerald border-neon-emerald animate-pulse-glow' : 'bg-surface-0 border-neon-cyan/50'
                    }`} />
                  </div>

                  {/* Content card */}
                  <div className={`w-full lg:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'lg:pr-8 pl-14 lg:pl-0' : 'lg:pl-8 pl-14'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass-card rounded-2xl p-6 sm:p-8 h-full group hover:border-neon-cyan/25 transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {exp.current && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-neon-emerald/10 text-neon-emerald border border-neon-emerald/20">
                                Current
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-neon-cyan transition-colors">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-neon-cyan">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 mb-5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2.5">
                        {exp.highlights.slice(0, expanded[exp.company] ? undefined : 5).map((h, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-neon-cyan mt-0.5 flex-shrink-0" />
                            <span>{h}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {exp.highlights.length > 5 && (
                        <button
                          onClick={() => toggleExpand(exp.company)}
                          className="mt-3 text-xs font-mono text-neon-cyan/70 hover:text-neon-cyan transition-colors group/btn flex items-center gap-1"
                        >
                          <ChevronDown className={`w-3 h-3 transition-transform ${expanded[exp.company] ? 'rotate-180' : ''}`} />
                          {expanded[exp.company]
                            ? 'Show less'
                            : `+ ${exp.highlights.length - 5} more achievements`
                          }
                        </button>
                      )}
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}