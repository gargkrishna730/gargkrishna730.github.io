'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface PageLoaderProps {
  onComplete: () => void;
}

const LOADING_LINES = [
  { text: 'initializing portfolio...', color: 'text-muted-foreground' },
  { text: 'loading assets...', color: 'text-muted-foreground' },
  { text: 'compiling components...', color: 'text-muted-foreground' },
  { text: 'deploying experience...', color: 'text-muted-foreground' },
  { text: 'ready.', color: 'text-neon-cyan glow-text' },
];

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [lines, setLines] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleComplete = useCallback(() => {
    setVisible(false);
    const timeout = setTimeout(() => {
      onComplete();
    }, 600);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  useEffect(() => {
    if (lines < 5) {
      const interval = setInterval(() => {
        setLines((prev) => {
          const next = prev + 1;
          if (next >= 5) {
            clearInterval(interval);
            setTimeout(handleComplete, 500);
          }
          return next;
        });
      }, 350);
      return () => clearInterval(interval);
    }
  }, [lines, handleComplete]);

  const progressPercent = Math.min((lines / 5) * 100, 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-surface-0 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Dot-pattern background */}
          <div className="absolute inset-0 dot-pattern opacity-60" />

          {/* Subtle radial glow behind card */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-neon-cyan/[0.03] blur-[100px]" />
          </div>

          <motion.div
            className="relative w-full max-w-md mx-4"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Terminal card */}
            <div className="glass-card rounded-xl overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-glass-border">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs font-mono text-muted-foreground/60">
                    kg.dev — portfolio
                  </span>
                </div>
                <div className="w-[52px]" />
              </div>

              {/* Logo area */}
              <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-emerald/20 border border-glass-border">
                  <Terminal className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight gradient-text-cyan font-mono">
                    KG.dev
                  </h1>
                  <p className="text-[10px] font-mono text-muted-foreground/50 tracking-wider uppercase">
                    DevOps Portfolio
                  </p>
                </div>
              </div>

              {/* Separator */}
              <div className="mx-5 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />

              {/* Terminal output */}
              <div className="px-5 py-4 space-y-1.5 font-mono text-sm min-h-[180px]">
                {LOADING_LINES.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={index < lines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex items-start gap-0"
                  >
                    <span className="text-neon-emerald mr-0.5 text-xs mt-0.5 shrink-0">●</span>
                    <span className="text-muted-foreground/60 mr-2 shrink-0 text-xs mt-0.5">
                      krishna@devops:~${' '}
                    </span>
                    <span className={line.color}>{line.text}</span>
                    {/* Blinking cursor on the last visible line */}
                    {index === lines - 1 && index < 4 && (
                      <span className="inline-block w-2 h-4 bg-neon-cyan/80 terminal-blink ml-0.5 mt-0.5" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="h-[2px] bg-surface-3/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-emerald"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between px-5 py-2.5">
                <span className="text-[10px] font-mono text-muted-foreground/40">
                  {lines}/5 tasks
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/40">
                  {Math.round(progressPercent)}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}