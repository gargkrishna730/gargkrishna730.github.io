'use client';

import { motion } from 'framer-motion';
import { Hammer, BookOpen, Compass, Search } from 'lucide-react';
import { ScrollReveal } from './ScrollAnimations';

interface BuildingItem {
  title: string;
  status: 'in progress' | 'learning' | 'exploring' | 'researching';
  statusColor: string;
  progress: number;
  icon: typeof Hammer;
}

const items: BuildingItem[] = [
  {
    title: 'Kubernetes Operator Development',
    status: 'in progress',
    statusColor: 'text-amber-400',
    progress: 65,
    icon: Hammer,
  },
  {
    title: 'Multi-cluster Istio Service Mesh',
    status: 'learning',
    statusColor: 'text-neon-cyan',
    progress: 35,
    icon: BookOpen,
  },
  {
    title: 'Rust for Systems Programming',
    status: 'exploring',
    statusColor: 'text-neon-purple',
    progress: 15,
    icon: Compass,
  },
  {
    title: 'FinOps Cost Optimization',
    status: 'researching',
    statusColor: 'text-neon-emerald',
    progress: 50,
    icon: Search,
  },
];

function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${color} ${
      status === 'in progress'
        ? 'border-amber-400/20 bg-amber-400/10'
        : status === 'learning'
          ? 'border-neon-cyan/20 bg-neon-cyan/10'
          : status === 'exploring'
            ? 'border-neon-purple/20 bg-neon-purple/10'
            : 'border-neon-emerald/20 bg-neon-emerald/10'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'in progress'
          ? 'bg-amber-400'
          : status === 'learning'
            ? 'bg-neon-cyan'
            : status === 'exploring'
              ? 'bg-neon-purple'
              : 'bg-neon-emerald'
      } ${status === 'in progress' ? 'animate-pulse' : ''}`} />
      {status}
    </span>
  );
}

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  const barColor =
    color === 'text-amber-400'
      ? 'bg-amber-400'
      : color === 'text-neon-cyan'
        ? 'bg-neon-cyan'
        : color === 'text-neon-purple'
          ? 'bg-neon-purple'
          : 'bg-neon-emerald';

  const glowColor =
    color === 'text-amber-400'
      ? 'shadow-amber-400/40'
      : color === 'text-neon-cyan'
        ? 'shadow-neon-cyan/40'
        : color === 'text-neon-purple'
          ? 'shadow-neon-purple/40'
          : 'shadow-neon-emerald/40';

  return (
    <div className="h-1 rounded-full bg-surface-3 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${barColor} shadow-sm ${glowColor}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
      />
    </div>
  );
}

export default function CurrentlyBuildingWidget() {
  return (
    <ScrollReveal direction="up" delay={0.3}>
      <div className="glass-card rounded-2xl p-6 relative group">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-neon-emerald/30 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-neon-cyan/30 rounded-br-2xl" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-emerald" />
          </span>
          <h3 className="text-sm font-semibold text-foreground font-mono tracking-wide">
            Currently Building
          </h3>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.title} className="group/item">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <item.icon className={`w-3.5 h-3.5 shrink-0 ${item.statusColor}`} />
                  <span className="text-sm text-foreground/90 truncate">{item.title}</span>
                </div>
                <StatusBadge status={item.status} color={item.statusColor} />
              </div>
              <ProgressBar progress={item.progress} color={item.statusColor} />
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}