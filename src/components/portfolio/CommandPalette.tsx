'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Hash,
  Terminal,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Mail,
  User,
  Sparkles,
  Layers,
} from 'lucide-react';

const commands = [
  { id: 'about', icon: User, label: 'About Me', section: 'About', shortcut: '1' },
  { id: 'what-i-do', icon: Sparkles, label: 'What I Do', section: 'What I Do', shortcut: '2' },
  { id: 'education', icon: GraduationCap, label: 'Education', section: 'Education', shortcut: '3' },
  { id: 'skills', icon: Layers, label: 'Skills & Technologies', section: 'Skills', shortcut: '4' },
  { id: 'experience', icon: Briefcase, label: 'Work Experience', section: 'Experience', shortcut: '5' },
  { id: 'projects', icon: Wrench, label: 'Featured Projects', section: 'Projects', shortcut: '6' },
  { id: 'certifications', icon: Award, label: 'Certifications', section: 'Certifications', shortcut: '7' },
  { id: 'contact', icon: Mail, label: 'Contact Me', section: 'Contact', shortcut: '8' },
  { id: 'hero', icon: Terminal, label: 'Back to Top', section: 'Home', shortcut: '0' },
];

const shortcutMap: Record<string, string> = {};
commands.forEach((cmd) => {
  shortcutMap[cmd.shortcut] = cmd.id;
});

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isInInput, setIsInInput] = useState(false);

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.section.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
    setSearch('');
  }, []);

  // Show hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Track whether user is in an input/textarea
  useEffect(() => {
    const handleFocusIn = () => {
      const tag = (document.activeElement?.tagName ?? '').toUpperCase();
      setIsInInput(tag === 'INPUT' || tag === 'TEXTAREA');
    };
    const handleFocusOut = () => {
      setIsInInput(false);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Derive hint visibility: hidden when palette is open or user is in an input
  const hintVisible = showHint && !open && !isInInput;

  // Global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open on "/" when not in an input/textarea
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setOpen(true);
        return;
      }

      // Handle palette-specific keys only when open
      if (!open) {
        // Number shortcuts work even when palette is closed (if not in input)
        if (
          !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName) &&
          shortcutMap[e.key]
        ) {
          e.preventDefault();
          navigate(shortcutMap[e.key]);
        }
        return;
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          setSearch('');
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            filtered.length > 0 ? Math.min(prev + 1, filtered.length - 1) : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filtered.length > 0 && filtered[selectedIndex]) {
            navigate(filtered[selectedIndex].id);
          }
          break;
        default:
          // Number shortcuts within the palette
          if (shortcutMap[e.key]) {
            e.preventDefault();
            navigate(shortcutMap[e.key]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedIndex, filtered, navigate]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (open) {
      // Small delay to ensure the input is mounted
      const timer = setTimeout(() => {
        const input = document.getElementById('command-palette-search');
        if (input) input.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (!open || filtered.length === 0) return;
    const el = document.getElementById(`cmd-item-${selectedIndex}`);
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex, open, filtered.length]);

  return (
    <>
      {/* Floating hint badge */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-[80] flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-2/80 border border-border/30 text-muted-foreground/50 text-xs font-mono backdrop-blur-sm"
          >
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-3 text-foreground/70 text-[10px] font-mono border border-border/40">
              /
            </kbd>
            <span>to navigate</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpen(false);
                setSearch('');
              }
            }}
          >
            <div className="flex items-start justify-center pt-[15vh] px-4">
              <motion.div
                className="glass-card rounded-2xl overflow-hidden max-w-lg w-full"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search input */}
                <div className="flex items-center gap-3 px-5 border-b border-border/50">
                  <Search className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                  <input
                    id="command-palette-search"
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSelectedIndex(0);
                    }}
                    placeholder="Type to search... or press ESC to close"
                    className="bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/40 text-sm py-4 w-full"
                  />
                </div>

                {/* Command list */}
                <div className="max-h-80 overflow-y-auto">
                  {filtered.length > 0 ? (
                    filtered.map((cmd, index) => {
                      const Icon = cmd.icon;
                      const isActive = index === selectedIndex;
                      return (
                        <div
                          key={cmd.id}
                          id={`cmd-item-${index}`}
                          className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-neon-cyan/10 text-neon-cyan'
                              : 'text-muted-foreground hover:bg-surface-2/50'
                          }`}
                          onClick={() => navigate(cmd.id)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-medium">{cmd.label}</span>
                          <span className="text-xs text-muted-foreground/50 ml-auto">
                            {cmd.section}
                          </span>
                          <span className="text-[10px] font-mono bg-surface-3 px-1.5 py-0.5 rounded flex-shrink-0">
                            {cmd.shortcut}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/40">
                      <Hash className="w-8 h-8 mb-2" />
                      <p className="text-sm">No results found</p>
                    </div>
                  )}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border/30 py-3 px-5 text-center">
                  <span className="text-xs text-muted-foreground/30 font-mono">
                    Navigate with ↑↓ · Select with Enter · Close with ESC
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}