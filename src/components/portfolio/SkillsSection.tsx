'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, SectionHeading, StaggerChildren, StaggerItem } from './ScrollAnimations';
import {
  Code2, Cloud, Container, GitBranch, Shield, Activity
} from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'devops',
    title: 'DevOps & Automation',
    icon: GitBranch,
    color: 'text-neon-cyan',
    borderColor: 'border-neon-cyan/20 hover:border-neon-cyan/40',
    skills: [
      { name: 'Jenkins', level: 90 },
      { name: 'GitHub Actions', level: 95 },
      { name: 'GitLab CI/CD', level: 88 },
      { name: 'ArgoCD', level: 90 },
      { name: 'Helm', level: 92 },
      { name: 'Ansible', level: 88 },
      { name: 'Terraform', level: 93 },
      { name: 'Packer', level: 80 },
    ],
  },
  {
    id: 'containers',
    title: 'Containerization & Orchestration',
    icon: Container,
    color: 'text-neon-emerald',
    borderColor: 'border-neon-emerald/20 hover:border-neon-emerald/40',
    skills: [
      { name: 'Docker', level: 95 },
      { name: 'Kubernetes', level: 93 },
      { name: 'Kustomize', level: 85 },
      { name: 'Helm Charts', level: 90 },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Platforms',
    icon: Cloud,
    color: 'text-neon-purple',
    borderColor: 'border-neon-purple/20 hover:border-neon-purple/40',
    skills: [
      { name: 'AWS', level: 90 },
      { name: 'Azure', level: 92 },
      { name: 'GCP', level: 85 },
      { name: 'Oracle Cloud', level: 85 },
      { name: 'IBM Cloud', level: 75 },
    ],
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Observability',
    icon: Activity,
    color: 'text-amber-400',
    borderColor: 'border-amber-400/20 hover:border-amber-400/40',
    skills: [
      { name: 'Prometheus', level: 92 },
      { name: 'Grafana', level: 93 },
      { name: 'ELK Stack', level: 88 },
      { name: 'OpenTelemetry', level: 90 },
      { name: 'Datadog', level: 85 },
      { name: 'Splunk', level: 78 },
    ],
  },
  {
    id: 'security',
    title: 'IAM & Security',
    icon: Shield,
    color: 'text-rose-400',
    borderColor: 'border-rose-400/20 hover:border-rose-400/40',
    skills: [
      { name: 'AWS IAM', level: 90 },
      { name: 'Keycloak', level: 85 },
      { name: 'Azure AD', level: 88 },
      { name: 'HashiCorp Vault', level: 82 },
      { name: 'OAuth2 / SAML', level: 86 },
    ],
  },
  {
    id: 'other',
    title: 'Languages, DBs & Tools',
    icon: Code2,
    color: 'text-sky-400',
    borderColor: 'border-sky-400/20 hover:border-sky-400/40',
    skills: [
      { name: 'Bash / Shell', level: 92 },
      { name: 'Python', level: 85 },
      { name: 'YAML', level: 95 },
      { name: 'Git', level: 95 },
      { name: 'Linux', level: 93 },
      { name: 'Nginx', level: 88 },
    ],
  },
];

function SkillBar({ skill, color, delay }: { skill: Skill; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setWidth(skill.level), delay);
      return () => clearTimeout(timer);
    }
  }, [visible, skill.level, delay]);

  const colorMap: Record<string, string> = {
    'text-neon-cyan': 'linear-gradient(90deg, #06b6d4, #22d3ee)',
    'text-neon-emerald': 'linear-gradient(90deg, #10b981, #34d399)',
    'text-neon-purple': 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
    'text-amber-400': 'linear-gradient(90deg, #f59e0b, #fbbf24)',
    'text-rose-400': 'linear-gradient(90deg, #f43f5e, #fb7185)',
    'text-sky-400': 'linear-gradient(90deg, #38bdf8, #7dd3fc)',
  };

  const glowMap: Record<string, string> = {
    'text-neon-cyan': '0 0 8px rgba(6,182,212,0.4)',
    'text-neon-emerald': '0 0 8px rgba(16,185,129,0.4)',
    'text-neon-purple': '0 0 8px rgba(139,92,246,0.4)',
    'text-amber-400': '0 0 8px rgba(245,158,11,0.4)',
    'text-rose-400': '0 0 8px rgba(244,63,94,0.4)',
    'text-sky-400': '0 0 8px rgba(56,189,248,0.4)',
  };

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-foreground/80 font-medium">{skill.name}</span>
        <span className={`font-mono ${color}`}>{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full skill-bar-fill"
          style={{
            width: `${width}%`,
            background: colorMap[color] || colorMap['text-neon-cyan'],
            boxShadow: width > 0 ? (glowMap[color] || glowMap['text-neon-cyan']) : 'none',
          }}
          initial={{ width: 0 }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = [
    { id: 'all', label: 'All Skills' },
    ...skillCategories.map(c => ({ id: c.id, label: c.title.split(' & ')[0].split(' ')[0] })),
  ];

  const filtered = activeTab === 'all' ? skillCategories : skillCategories.filter(c => c.id === activeTab);

  return (
    <section id="skills" className="relative py-24 sm:py-32 section-tint">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tech Stack"
          title="Skills & Technologies"
          subtitle="A comprehensive toolkit for building, deploying, and monitoring cloud-native infrastructure at scale."
        />

        {/* Tabs */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 shadow-lg shadow-neon-cyan/10'
                  : 'text-muted-foreground hover:text-foreground glass-card border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-6"
        >
          {filtered.map((category, catIndex) => (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              className={`glass-card rounded-2xl p-6 border ${category.borderColor} transition-all duration-300 group`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl bg-surface-3 ${category.color} group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={category.color}
                    delay={catIndex * 100 + i * 80}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}