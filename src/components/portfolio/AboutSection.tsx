'use client';

import { ScrollReveal, SectionHeading, StaggerChildren, StaggerItem, CountUp } from './ScrollAnimations';
import { Cloud, Container, GitBranch, Shield, Server, Cpu } from 'lucide-react';
import CurrentlyBuildingWidget from './CurrentlyBuildingWidget';

const highlights = [
  { icon: Cloud, label: 'Multi-Cloud', value: 5, suffix: '+', desc: 'AWS, Azure, GCP, Oracle, IBM' },
  { icon: Container, label: 'Containers', value: 99, suffix: '.9%', desc: 'Uptime across deployments' },
  { icon: GitBranch, label: 'CI/CD Pipelines', value: 50, suffix: '+', desc: 'Automated delivery pipelines' },
  { icon: Shield, label: 'Security', value: 15, suffix: '+', desc: 'IAM & compliance integrations' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-neon-cyan/[0.02] rounded-full blur-3xl floating-orb-2" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-neon-purple/[0.02] rounded-full blur-3xl floating-orb-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Me"
          title="Infrastructure Engineer"
          subtitle="Building the bridges between development and operations through automation, observability, and cloud-native architecture."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Profile card */}
          <ScrollReveal direction="left">
            <div className="glass-card rounded-2xl p-8 relative group">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-neon-cyan/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-neon-emerald/30 rounded-br-2xl" />

              <div className="flex items-start gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-neon-emerald mt-1.5 animate-pulse" />
                <div className="font-mono text-sm text-muted-foreground">
                  <span className="text-neon-cyan">const</span>{' '}
                  <span className="text-neon-purple">engineer</span> = {'{'}
                </div>
              </div>

              <div className="space-y-3 font-mono text-sm pl-7">
                <div className="code-block-line px-2 -mx-2 rounded">
                  <span className="text-neon-emerald">name</span>:{' '}
                  <span className="text-amber-400">&quot;Krishna Garg&quot;</span>,
                </div>
                <div className="code-block-line px-2 -mx-2 rounded">
                  <span className="text-neon-emerald">role</span>:{' '}
                  <span className="text-amber-400">&quot;DevOps Lead&quot;</span>,
                </div>
                <div className="code-block-line px-2 -mx-2 rounded">
                  <span className="text-neon-emerald">location</span>:{' '}
                  <span className="text-amber-400">&quot;Chennai, India&quot;</span>,
                </div>
                <div className="code-block-line px-2 -mx-2 rounded">
                  <span className="text-neon-emerald">experience</span>:{' '}
                  <span className="text-amber-400">&quot;2+ years&quot;</span>,
                </div>
                <div className="code-block-line px-2 -mx-2 rounded">
                  <span className="text-neon-emerald">education</span>:{' '}
                  <span className="text-amber-400">&quot;B.E. IT, CGPA 8.50&quot;</span>,
                </div>
                <div className="code-block-line px-2 -mx-2 rounded">
                  <span className="text-neon-emerald">passion</span>: [
                  <br />
                  <span className="ml-4 text-amber-400">&quot;Kubernetes&quot;</span>,
                  <span className="text-amber-400">&quot;Terraform&quot;</span>,
                  <span className="text-amber-400">&quot;Observability&quot;</span>
                  <br />
                  ],
                </div>
              </div>

              <div className="pl-7 mt-2 font-mono text-sm text-muted-foreground">{'}'}</div>

              <div className="mt-6 pl-7 flex items-center gap-2">
                <Server className="w-4 h-4 text-neon-cyan" />
                <Cpu className="w-4 h-4 text-neon-emerald" />
                <span className="text-xs text-muted-foreground font-mono">always_learning: true</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Description + Stats */}
          <div className="space-y-8">
            <ScrollReveal direction="right">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I&apos;m a DevOps Engineer with <span className="text-foreground font-medium">2+ years</span> of experience
                  in cloud and on-premise infrastructure automation. I specialize in building
                  <span className="text-neon-cyan"> robust CI/CD pipelines</span>, implementing
                  infrastructure as code, and orchestrating containerized environments.
                </p>
                <p>
                  My expertise spans multi-cloud deployments across
                  <span className="text-neon-emerald"> AWS, Azure, GCP, and Oracle Cloud</span>,
                  with a strong focus on Kubernetes, GitOps workflows, and comprehensive
                  observability stacks including OpenTelemetry, Prometheus, and Grafana.
                </p>
                <p>
                  I thrive on driving efficiency through innovative automation solutions while
                  fostering cross-functional collaboration to enhance development practices and
                  system performance.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats grid */}
            <StaggerChildren className="grid grid-cols-2 gap-4" staggerDelay={0.15}>
              {highlights.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="glass-card rounded-xl p-5 text-center group hover:border-neon-cyan/25 transition-all duration-300">
                    <item.icon className="w-6 h-6 mx-auto mb-3 text-neon-cyan group-hover:scale-110 transition-transform" />
                    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                      <CountUp target={item.value} suffix={item.suffix} />
                    </div>
                    <div className="text-sm font-medium text-foreground/80">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <CurrentlyBuildingWidget />
          </div>
        </div>
      </div>
    </section>
  );
}