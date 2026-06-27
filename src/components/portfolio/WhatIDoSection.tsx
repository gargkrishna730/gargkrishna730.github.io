'use client';

import { motion } from 'framer-motion';
import { ScrollReveal, SectionHeading, StaggerChildren, StaggerItem } from './ScrollAnimations';
import { GitBranch, Cloud, Container, Activity, Shield, Lock } from 'lucide-react';

const services = [
  {
    icon: GitBranch,
    title: 'CI/CD Automation',
    description:
      'Building robust CI/CD pipelines that automate build, test, and deployment workflows across multiple environments with zero-downtime releases.',
    tags: ['GitHub Actions', 'Jenkins', 'ArgoCD', 'GitLab'],
    gradient: 'from-neon-cyan/20 to-neon-emerald/20',
    neonBg: 'bg-neon-cyan/10',
    neonText: 'text-neon-cyan',
    neonBorder: 'group-hover:border-neon-cyan/30',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description:
      'Designing and managing multi-cloud architectures on AWS, Azure, GCP, and Oracle Cloud with infrastructure as code and cost optimization.',
    tags: ['AWS', 'Azure', 'GCP', 'Oracle Cloud'],
    gradient: 'from-neon-purple/20 to-pink-500/20',
    neonBg: 'bg-neon-purple/10',
    neonText: 'text-neon-purple',
    neonBorder: 'group-hover:border-neon-purple/30',
  },
  {
    icon: Container,
    title: 'Container Orchestration',
    description:
      'Deploying and managing containerized microservices using Kubernetes, Helm, ArgoCD with GitOps-based continuous delivery and self-healing systems.',
    tags: ['Kubernetes', 'Helm', 'Docker', 'ArgoCD'],
    gradient: 'from-neon-emerald/20 to-lime-500/20',
    neonBg: 'bg-neon-emerald/10',
    neonText: 'text-neon-emerald',
    neonBorder: 'group-hover:border-neon-emerald/30',
  },
  {
    icon: Activity,
    title: 'Observability & Monitoring',
    description:
      'Building comprehensive monitoring stacks with Prometheus, Grafana, OpenTelemetry, and ELK for unified metrics, logs, and traces across distributed systems.',
    tags: ['Prometheus', 'Grafana', 'OpenTelemetry', 'ELK'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    neonBg: 'bg-amber-500/10',
    neonText: 'text-amber-400',
    neonBorder: 'group-hover:border-amber-400/30',
  },
  {
    icon: Shield,
    title: 'Infrastructure as Code',
    description:
      'Implementing version-controlled, reproducible infrastructure using Terraform, Ansible, and Packer with automated drift detection and compliance enforcement.',
    tags: ['Terraform', 'Ansible', 'Packer', 'CloudFormation'],
    gradient: 'from-rose-500/20 to-neon-purple/20',
    neonBg: 'bg-rose-500/10',
    neonText: 'text-rose-400',
    neonBorder: 'group-hover:border-rose-400/30',
  },
  {
    icon: Lock,
    title: 'Security & Compliance',
    description:
      'Hardening cloud infrastructure with IAM policies, VPC segmentation, TLS encryption, secrets management, and automated compliance scanning.',
    tags: ['IAM', 'VPC', 'TLS/SSL', 'Vault'],
    gradient: 'from-sky-400/20 to-neon-cyan/20',
    neonBg: 'bg-sky-400/10',
    neonText: 'text-sky-400',
    neonBorder: 'group-hover:border-sky-400/30',
  },
];

export default function WhatIDoSection() {
  return (
    <section id="what-i-do" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      {/* Decorative radial gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neon-cyan/[0.03] blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Expertise"
          title="What I Do"
          subtitle="Specialized in building and automating modern cloud infrastructure with a focus on reliability, security, and scalability."
        />

        <StaggerChildren
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div
                className={`glass-card-interactive rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-300 ${service.neonBorder}`}
              >
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${service.gradient}`} />

                <div className="p-6 flex-1 flex flex-col">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl ${service.neonBg} flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <service.icon className={`w-7 h-7 ${service.neonText}`} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {service.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-3 text-muted-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}