'use client';

import { ScrollReveal, SectionHeading, StaggerChildren, StaggerItem } from './ScrollAnimations';
import { GitBranch, Flame, CalendarDays, Activity } from 'lucide-react';

// Seeded pseudo-random number generator (simple mulberry32)
function seededRandom(seed: number): number {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

interface DayCell {
  level: number; // 0-4
  count: number;
}

const WEEKS = 12;
const DAYS = 7;
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

// Generate month labels for the last 12 weeks
function getMonthLabels(): string[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const labels: { month: string; weekIndex: number }[] = [];
  let lastMonth = -1;

  for (let w = 0; w < WEEKS; w++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (WEEKS - 1 - w) * 7);
    const month = date.getMonth();
    if (month !== lastMonth) {
      labels.push({ month: months[month], weekIndex: w });
      lastMonth = month;
    }
  }
  return labels.map((l, i) => `${l.weekIndex}:${l.month}`);
}

// Generate consistent contribution data
function generateData(): { grid: DayCell[][]; totalContributions: number; activeDays: number; longestStreak: number } {
  const grid: DayCell[][] = [];
  let totalContributions = 0;
  let activeDays = 0;
  let longestStreak = 0;
  let currentStreak = 0;

  for (let w = 0; w < WEEKS; w++) {
    const week: DayCell[] = [];
    for (let d = 0; d < DAYS; d++) {
      const seed = w * 31 + d * 17 + 42;
      const rand = seededRandom(seed);

      // Weekends (d=5,6) have lower activity
      const isWeekend = d >= 5;
      const adjusted = isWeekend ? rand * 0.4 : rand;

      let level: number;
      let count: number;

      if (adjusted < 0.3) {
        level = 0;
        count = 0;
      } else if (adjusted < 0.55) {
        level = 1;
        count = Math.floor(seededRandom(seed + 100) * 3) + 1;
      } else if (adjusted < 0.75) {
        level = 2;
        count = Math.floor(seededRandom(seed + 200) * 5) + 3;
      } else if (adjusted < 0.9) {
        level = 3;
        count = Math.floor(seededRandom(seed + 300) * 7) + 5;
      } else {
        level = 4;
        count = Math.floor(seededRandom(seed + 400) * 10) + 8;
      }

      week.push({ level, count });
      totalContributions += count;
      if (level > 0) {
        activeDays++;
        currentStreak++;
        if (currentStreak > longestStreak) longestStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
    }
    grid.push(week);
  }

  return { grid, totalContributions, activeDays, longestStreak };
}

const levelColors: Record<number, string> = {
  0: 'bg-surface-3',
  1: 'bg-neon-cyan/20',
  2: 'bg-neon-cyan/40',
  3: 'bg-neon-cyan/60',
  4: 'bg-neon-cyan/80',
};

const levelHoverColors: Record<number, string> = {
  0: 'hover:bg-surface-2',
  1: 'hover:bg-neon-cyan/30',
  2: 'hover:bg-neon-cyan/50',
  3: 'hover:bg-neon-cyan/70',
  4: 'hover:bg-neon-cyan/90',
};

export default function GitHubActivitySection() {
  const data = generateData();
  const monthLabels = getMonthLabels();
  const monthMap: Record<number, string> = {};
  monthLabels.forEach((entry) => {
    const [idx, month] = entry.split(':');
    monthMap[Number(idx)] = month;
  });

  const stats = [
    { icon: GitBranch, label: 'Contributions', value: data.totalContributions, suffix: ' in the last year' },
    { icon: CalendarDays, label: 'Active Days', value: data.activeDays, suffix: '' },
    { icon: Flame, label: 'Longest Streak', value: data.longestStreak, suffix: ' days' },
  ];

  return (
    <section id="activity" className="relative py-24 sm:py-32 overflow-hidden scroll-mt-20">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-neon-cyan/[0.02] rounded-full blur-3xl floating-orb-1" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-neon-emerald/[0.02] rounded-full blur-3xl floating-orb-2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Activity"
          title="Open Source Contributions"
          subtitle="A snapshot of my GitHub activity over the past 12 weeks — building, learning, and contributing."
        />

        <ScrollReveal direction="up" delay={0.1}>
          <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-neon-cyan/30 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-neon-emerald/30 rounded-br-2xl" />

            {/* Heat map grid */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[500px]">
                {/* Month labels */}
                <div className="flex items-center mb-2 ml-10">
                  {Array.from({ length: WEEKS }).map((_, w) => (
                    <div
                      key={`month-${w}`}
                      className="text-[10px] text-muted-foreground/60 font-mono"
                      style={{ width: `${100 / WEEKS}%` }}
                    >
                      {monthMap[w] || ''}
                    </div>
                  ))}
                </div>

                {/* Grid with day labels */}
                <div className="flex gap-0.5">
                  {/* Day labels column */}
                  <div className="flex flex-col gap-0.5 mr-1.5 shrink-0 w-8 pt-0.5">
                    {DAY_LABELS.map((label, d) => (
                      <div
                        key={`day-label-${d}`}
                        className="h-[11px] sm:h-[13px] flex items-center"
                      >
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground/50 font-mono leading-none">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Weeks */}
                  {Array.from({ length: WEEKS }).map((_, w) => (
                    <div key={`week-${w}`} className="flex flex-col gap-0.5" style={{ width: `${(100 - 12) / WEEKS}%` }}>
                      {Array.from({ length: DAYS }).map((_, d) => {
                        const cell = data.grid[w][d];
                        return (
                          <div
                            key={`cell-${w}-${d}`}
                            className={`h-[11px] sm:h-[13px] rounded-sm transition-all duration-200 cursor-pointer ${levelColors[cell.level]} ${levelHoverColors[cell.level]}`}
                            title={`${cell.count} contributions`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-4">
                  <span className="text-[10px] text-muted-foreground/50 font-mono mr-1">Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={`legend-${level}`}
                      className={`w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-sm ${levelColors[level]}`}
                    />
                  ))}
                  <span className="text-[10px] text-muted-foreground/50 font-mono ml-1">More</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6" staggerDelay={0.15}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="glass-card rounded-xl p-5 flex items-center gap-4 group hover:border-neon-cyan/25 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {stat.value.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground ml-1">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Footer note */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground/40">
            <Activity className="w-3.5 h-3.5" />
            <span className="text-xs font-mono">Simulated contribution data for portfolio display</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}