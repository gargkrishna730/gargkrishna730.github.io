'use client';

interface CircuitDividerProps {
  color?: 'cyan' | 'emerald' | 'purple' | 'pink';
}

const colorMap = {
  cyan: { stroke: 'rgba(6,182,212,0.2)', glow: 'rgba(6,182,212,0.06)' },
  emerald: { stroke: 'rgba(16,185,129,0.2)', glow: 'rgba(16,185,129,0.06)' },
  purple: { stroke: 'rgba(139,92,246,0.2)', glow: 'rgba(139,92,246,0.06)' },
  pink: { stroke: 'rgba(236,72,153,0.2)', glow: 'rgba(236,72,153,0.06)' },
};

export default function CircuitDivider({ color = 'cyan' }: CircuitDividerProps) {
  const { stroke, glow } = colorMap[color];

  return (
    <div className="circuit-divider">
      <svg viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {/* Center line with animated dash */}
        <line x1="0" y1="30" x2="1200" y2="30" stroke={glow} strokeWidth="1" />
        <line x1="0" y1="30" x2="1200" y2="30" stroke={stroke} strokeWidth="1" className="dash-animated" />

        {/* Left circuit node */}
        <circle cx="200" cy="30" r="3" fill={stroke} />
        <line x1="200" y1="30" x2="200" y2="10" stroke={stroke} strokeWidth="1" className="dash-animated" />
        <rect x="190" y="4" width="20" height="8" rx="2" fill="none" stroke={stroke} strokeWidth="0.8" />

        {/* Center circuit node */}
        <circle cx="600" cy="30" r="4" fill={glow} stroke={stroke} strokeWidth="1" />
        <circle cx="600" cy="30" r="8" fill="none" stroke={glow} strokeWidth="0.5" />
        <line x1="600" y1="30" x2="600" y2="50" stroke={stroke} strokeWidth="1" className="dash-animated" />
        <rect x="590" y="44" width="20" height="8" rx="2" fill="none" stroke={stroke} strokeWidth="0.8" />

        {/* Right circuit node */}
        <circle cx="1000" cy="30" r="3" fill={stroke} />
        <line x1="1000" y1="30" x2="1000" y2="10" stroke={stroke} strokeWidth="1" className="dash-animated" />
        <rect x="990" y="4" width="20" height="8" rx="2" fill="none" stroke={stroke} strokeWidth="0.8" />

        {/* Small decorative nodes */}
        <circle cx="350" cy="30" r="1.5" fill={stroke} />
        <circle cx="450" cy="30" r="1.5" fill={stroke} />
        <circle cx="750" cy="30" r="1.5" fill={stroke} />
        <circle cx="850" cy="30" r="1.5" fill={stroke} />
      </svg>
    </div>
  );
}