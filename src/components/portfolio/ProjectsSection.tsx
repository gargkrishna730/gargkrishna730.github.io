'use client';

import { motion } from 'framer-motion';
import { ScrollReveal, SectionHeading, StaggerChildren, StaggerItem } from './ScrollAnimations';
import TiltCard from './TiltCard';

const projects = [
  {
    title: 'ZoneTax — Kubernetes Cross-AZ Cost Visibility',
    description: 'Open-source Kubernetes tool that detects cross-availability-zone network traffic in real time and prices it per workload. A Go DaemonSet samples conntrack and resolves each flow to pod, node and zone. Found 97% of a cluster\'s cross-AZ spend on one route, cutting it from $2.32 to $0.03 a day.',
    tech: ['Go', 'Kubernetes', 'AWS', 'React', 'Helm', 'Prometheus'],
    icon: '💸',
    gradient: 'from-neon-cyan/20 to-neon-purple/20',
    iconColor: 'text-neon-cyan',
    accent: '#06b6d4',
    href: 'https://github.com/gargkrishna730/zonetax',
    article: 'https://dev.to/gargkrishna730/your-kubernetes-cluster-is-paying-a-cross-az-tax-zonetax-shows-you-exactly-which-pod-35ie',
  },
  {
    title: 'WordPress CI/CD on AWS',
    description: 'Provisioned a complete LAMP stack using Terraform with automated build and deployment pipelines via GitHub Actions. Implemented WPScan security checks and optimized performance with ElastiCache and NGINX tuning for high-traffic WordPress hosting.',
    tech: ['Terraform', 'GitHub Actions', 'AWS', 'ElastiCache', 'NGINX', 'WPScan'],
    icon: '🌐',
    gradient: 'from-neon-cyan/20 to-neon-emerald/20',
    iconColor: 'text-neon-cyan',
    accent: '#06b6d4',
    href: 'https://github.com/gargkrishna730/WordPress-Assignment',
  },
  {
    title: 'SonarQube One-Click Installer',
    description: 'Automated cross-platform SonarQube setup using Bash and PowerShell scripts. Configured PostgreSQL backend, NGINX reverse proxy, and system hardening with built-in error recovery and self-healing mechanisms for zero-downtime deployments.',
    tech: ['Bash', 'PowerShell', 'PostgreSQL', 'NGINX', 'SonarQube', 'Systemd'],
    icon: '🔍',
    gradient: 'from-neon-purple/20 to-pink-500/20',
    iconColor: 'text-neon-purple',
    accent: '#8b5cf6',
    // Repo is currently private, so the link is withheld rather than shown as a 404.
    // Flip `private` to false once the repository is made public.
    href: 'https://github.com/gargkrishna730/SonarQube_Installation',
    private: true,
  },
  {
    title: 'Azure ACR Image Cleanup',
    description: 'Developed Bash scripts integrated with Azure CLI to identify and delete outdated container images while preserving critical tags. Optimized storage utilization and streamlined CI/CD pipeline efficiency across multiple Azure Container Registries.',
    tech: ['Azure CLI', 'Bash', 'Azure ACR', 'Docker', 'Container Registry', 'Automation'],
    icon: '🧹',
    gradient: 'from-sky-500/20 to-neon-cyan/20',
    iconColor: 'text-sky-400',
    accent: '#38bdf8',
    // Private repo: link held back until the repository is public.
    href: 'https://github.com/gargkrishna730/azure-acr-cleanup-tools',
    private: true,
  },
  {
    title: 'Multi-Cloud Observability Platform',
    description: 'Built and maintained a comprehensive observability stack integrating eBPF, OpenTelemetry, Prometheus, and Datadog Agent for unified metrics, logs, and traces across microservices deployed on multiple cloud providers with 99.9% uptime.',
    tech: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Datadog', 'eBPF', 'Loki'],
    icon: '📊',
    gradient: 'from-neon-emerald/20 to-lime-500/20',
    iconColor: 'text-neon-emerald',
    accent: '#10b981',
  },
  {
    title: 'GitOps Kubernetes Deployments',
    description: 'Automated Kubernetes deployments using Helm, Kustomize, and ArgoCD enabling GitOps-based continuous delivery. Implemented self-healing, auto-scaled microservices with comprehensive health checks and rollback capabilities.',
    tech: ['Kubernetes', 'ArgoCD', 'Helm', 'Kustomize', 'GitOps', 'Helm Charts'],
    icon: '☸️',
    gradient: 'from-neon-cyan/20 to-blue-500/20',
    iconColor: 'text-neon-cyan',
    accent: '#06b6d4',
  },
  {
    title: 'Infrastructure as Code Framework',
    description: 'Deployed Infrastructure as Code using Terraform and Ansible achieving version-controlled, reproducible infrastructure. Integrated with CI/CD pipelines for automated provisioning, drift detection, and compliance enforcement across environments.',
    tech: ['Terraform', 'Ansible', 'IaC', 'Git', 'CI/CD', 'Compliance'],
    icon: '🏗️',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    accent: '#fbbf24',
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
              <TiltCard className="h-full">
                <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-300">
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

                    {/* Full description. No line clamp: the cards sit in a grid row and
                        stretch to the tallest, so truncating mid-sentence hid content with
                        no way to reveal it. */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="tag-hover px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-3 text-muted-foreground border border-border/50 cursor-default"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Source and article links, shown only where publicly reachable */}
                    {((project.href && !('private' in project && project.private)) ||
                      'article' in project) && (
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        {project.href && !('private' in project && project.private) && (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-neon-cyan hover:underline focus-visible:underline focus-visible:outline-none"
                            aria-label={`View ${project.title} source on GitHub (opens in a new tab)`}
                          >
                            View on GitHub
                            <span aria-hidden="true">→</span>
                          </a>
                        )}
                        {'article' in project && project.article && (
                          <a
                            href={project.article}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-neon-purple hover:underline focus-visible:underline focus-visible:outline-none"
                            aria-label={`Read the article about ${project.title} (opens in a new tab)`}
                          >
                            Read the article
                            <span aria-hidden="true">→</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}