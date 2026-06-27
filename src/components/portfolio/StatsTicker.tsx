'use client';

const row1Items = [
  { emoji: '☁️', label: 'AWS, Azure, GCP, Oracle — 5 Cloud Platforms' },
  { emoji: '🔧', label: '50+ CI/CD Pipelines Built' },
  { emoji: '⎈', label: '99.9% Uptime Achieved' },
  { emoji: '🛡️', label: '18+ Certifications Earned' },
  { emoji: '🐳', label: 'Kubernetes Expert' },
  { emoji: '📊', label: 'Full Observability Stacks' },
  { emoji: '🔒', label: 'Security Hardened Infra' },
];

const row2Items = [
  { emoji: '🏗️', label: 'Terraform & IaC Specialist' },
  { emoji: '🚀', label: 'Zero-Downtime Deployments' },
  { emoji: '📈', label: 'Prometheus & Grafana' },
  { emoji: '🌐', label: 'Multi-Cloud Architect' },
  { emoji: '⚡', label: 'GitHub Actions Pro' },
  { emoji: '🔄', label: 'GitOps with ArgoCD' },
  { emoji: '💰', label: 'FinOps Optimized' },
];

const marqueeLeftStyle: React.CSSProperties = {
  animation: 'marquee-left 30s linear infinite',
};

const marqueeRightStyle: React.CSSProperties = {
  animation: 'marquee-right 35s linear infinite',
};

export default function StatsTicker() {
  return (
    <section className="relative py-6 overflow-hidden border-y border-border/20 bg-surface-1/50 select-none">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-0 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-surface-0 z-10 pointer-events-none" />

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Row 1 - scroll left */}
      <div
        className="flex gap-3 mb-3"
        style={marqueeLeftStyle}
      >
        {[...row1Items, ...row1Items].map((item, i) => (
          <span
            key={`row1-${i}`}
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm whitespace-nowrap grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-default"
          >
            <span>{item.emoji}</span>
            <span className="text-muted-foreground">{item.label}</span>
          </span>
        ))}
      </div>

      {/* Row 2 - scroll right */}
      <div
        className="flex gap-3"
        style={marqueeRightStyle}
      >
        {[...row2Items, ...row2Items].map((item, i) => (
          <span
            key={`row2-${i}`}
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm whitespace-nowrap grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-default"
          >
            <span>{item.emoji}</span>
            <span className="text-muted-foreground">{item.label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}