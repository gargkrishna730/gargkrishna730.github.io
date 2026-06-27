'use client';

import { motion } from 'framer-motion';
import { ScrollReveal, SectionHeading, StaggerChildren, StaggerItem } from './ScrollAnimations';

const projects = [
  {
    title: 'WordPress CI/CD on AWS',
    description: 'Provisioned a complete LAMP stack using Terraform with automated build and deployment pipelines via GitHub Actions. Implemented WPScan security checks and optimized performance with ElastiCache and NGINX tuning for high-traffic WordPress hosting.',
    tech: ['Terraform', 'GitHub Actions', 'AWS', 'ElastiCache', 'NGINX', 'WPScan'],
    icon: '🌐',
    gradient: 'from-neon-cyan/20 to-neon-emerald/20',
    borderColor: 'hover:border-neon-cyan/30',
    iconColor: 'text-neon-cyan',
  },
  {
    title: 'SonarQube One-Click Installer',
    description: 'Automated cross-platform SonarQube setup using Bash and PowerShell scripts. Configured PostgreSQL backend, NGINX reverse proxy, and system hardening with built-in error recovery and self-healing mechanisms for zero-downtime deployments.',
    tech: ['Bash', 'PowerShell', 'PostgreSQL', 'NGINX', 'SonarQube', 'Systemd'],
    icon: '🔍',
    gradient: 'from-neon-purple/20 to-pink-500/20',
    borderColor: 'hover:border-neon-purple/30',
    iconColor: 'text-neon-purple',
  },
  {
    title: 'Azure ACR Image Cleanup',
    description: 'Developed Bash scripts integrated with Azure CLI to identify and delete outdated container images while preserving critical tags. Optimized storage utilization and streamlined CI/CD pipeline efficiency across multiple Azure Container Registries.',
    tech: ['Azure CLI', 'Bash', 'Azure ACR', 'Docker', 'Container Registry', 'Automation'],
    icon: '🧹',
    gradient: 'from-sky-500/20 to-neon-cyan/20',
    borderColor: 'hover:border-sky-400/30',
    iconColor: 'text-sky-400',
  },
  {
    title: 'Multi-Cloud Observability Platform',
    description: 'Built and maintained a comprehensive observability stack integrating eBPF, OpenTelemetry, Prometheus, and Datadog Agent for unified metrics, logs, and traces across microservices deployed on multiple cloud providers with 99.9% uptime.',
    tech: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Datadog', 'eBPF', 'Loki'],
    icon: '📊',
    gradient: 'from-neon-emerald/20 to-lime-500/20',
    borderColor: 'hover:border-neon-emerald/30',
    iconColor: 'text-neon-emerald',
  },
  {
    title: 'GitOps Kubernetes Deployments',
    description: 'Automated Kubernetes deployments using Helm, Kustomize, and ArgoCD enabling GitOps-based continuous delivery. Implemented self-healing, auto-scaled microservices with comprehensive health checks and rollback capabilities.',
    tech: ['Kubernetes', 'ArgoCD', 'Helm', 'Kustomize', 'GitOps', 'Helm Charts'],
    icon: '☸️',
    gradient: 'from-neon-cyan/20 to-blue-500/20',
    borderColor: 'hover:border-neon-cyan/30',
    iconColor: 'text-neon-cyan',
  },
  {
    title: 'Infrastructure as Code Framework',
    description: 'Deployed Infrastructure as Code using Terraform and Ansible achieving version-controlled, reproducible infrastructure. Integrated with CI/CD pipelines for automated provisioning, drift detection, and compliance enforcement across environments.',
    tech: ['Terraform', 'Ansible', 'IaC', 'Git', 'CI/CD', 'Compliance'],
    icon: '🏗️',
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'hover:border-amber-400/30',
    iconColor: 'text-amber-400',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 section-tint">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Portfolio"
          title="Featured Projects"
          subtitle="Real-world automation solutions and infrastructure projects that drive efficiency and reliability."
        />

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`glass-card rounded-2xl overflow-hidden h-full flex flex-col group ${project.borderColor} shimmer-border transition-all duration-300`}
              >
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />

                <div className="p-6 flex-1 flex flex-col">
                  {/* Icon and title */}
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">{project.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-neon-cyan transition-colors leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-3 text-muted-foreground border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}