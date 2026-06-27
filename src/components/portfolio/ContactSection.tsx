'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, SectionHeading } from './ScrollAnimations';
import { Send, Mail, Phone, MapPin, Copy, Check, Terminal, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'gargkrishna730@gmail.com', href: 'mailto:gargkrishna730@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 91520 99209', href: 'tel:+919152099209' },
  { icon: MapPin, label: 'Location', value: 'Chennai, India', href: null },
];

const terminalLines = [
  { prompt: true, text: 'whoami' },
  { prompt: false, text: 'krishna-garg' },
  { prompt: true, text: 'cat /etc/motd' },
  { prompt: false, text: 'Open to new opportunities and collaborations' },
  { prompt: true, text: 'echo $CONTACT_EMAIL' },
  { prompt: false, text: 'gargkrishna730@gmail.com' },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [currentLine, setCurrentLine] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  // Terminal animation
  useEffect(() => {
    const section = document.getElementById('contact');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            setCurrentLine((prev) => {
              if (prev < terminalLines.length - 1) return prev + 1;
              clearInterval(interval);
              return prev;
            });
          }, 600);
          observer.disconnect();
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success('Message sent! I\'ll get back to you soon. 📧');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setSending(false);
    }
  }, [formData]);

  const copyEmail = () => {
    navigator.clipboard.writeText('gargkrishna730@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden section-tint">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-neon-emerald/50 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-neon-emerald/[0.03] rounded-full blur-3xl floating-orb-2" />
      <div className="absolute bottom-1/3 left-0 w-[350px] h-[350px] bg-neon-cyan/[0.02] rounded-full blur-3xl floating-orb-1" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Connect"
          subtitle="Have a project in mind or want to discuss DevOps opportunities? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Terminal + Contact info */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              {/* Terminal window */}
              <div className="glass-card rounded-2xl overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-2 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-2 text-xs font-mono text-muted-foreground">bash — contact.sh</span>
                </div>
                {/* Terminal body */}
                <div className="p-5 font-mono text-sm space-y-2 min-h-[200px]">
                  {terminalLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={i <= currentLine ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {line.prompt ? (
                        <span>
                          <span className="text-neon-emerald">krishna</span>
                          <span className="text-muted-foreground">@</span>
                          <span className="text-neon-cyan">devops</span>
                          <span className="text-muted-foreground">:~$ </span>
                          <span className="text-foreground">{line.text}</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground pl-2">{line.text}</span>
                      )}
                    </motion.div>
                  ))}
                  {currentLine >= terminalLines.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="cursor-blink text-neon-cyan"
                    >
                      █
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Contact cards */}
              <div className="space-y-3">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    whileHover={{ x: 4 }}
                    className="glass-card rounded-xl p-4 flex items-center gap-4 group hover:border-neon-cyan/25 transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-lg bg-neon-cyan/10 text-neon-cyan group-hover:bg-neon-cyan/20 transition-colors">
                      <info.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{info.label}</div>
                      <div className="text-sm text-foreground truncate flex items-center gap-2">
                        {info.value}
                        {info.label === 'Email' && (
                          <button onClick={copyEmail} className="flex-shrink-0" aria-label="Copy email">
                            {copied ? <Check className="w-3.5 h-3.5 text-neon-emerald" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-neon-cyan" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact form */}
          <ScrollReveal direction="right">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-neon-cyan" />
                  <h3 className="text-lg font-semibold text-foreground">Send a Message</h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-emerald/10 border border-neon-emerald/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
                  <span className="text-[10px] font-mono text-neon-emerald">~24h response</span>
                </div>
              </div>

              <div className="space-y-5 flex-1">
                {/* Name field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-mono text-muted-foreground">
                    <span className="text-neon-cyan">$</span> your_name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all font-mono text-sm input-glow"
                    placeholder="John Doe"
                    disabled={sending}
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-mono text-muted-foreground">
                    <span className="text-neon-cyan">$</span> your_email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all font-mono text-sm input-glow"
                    placeholder="john@example.com"
                    disabled={sending}
                  />
                </div>

                {/* Message field */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="text-sm font-mono text-muted-foreground">
                      <span className="text-neon-cyan">$</span> your_message
                    </label>
                    <span className={`text-xs font-mono char-counter ${formData.message.length > 450 ? 'danger' : formData.message.length > 350 ? 'warning' : 'text-muted-foreground/50'}`}>
                      {formData.message.length}/500
                    </span>
                  </div>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    maxLength={500}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all font-mono text-sm resize-none input-glow"
                    placeholder="Tell me about your project or opportunity..."
                    disabled={sending}
                  />
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={!sending ? { scale: 1.02 } : undefined}
                whileTap={!sending ? { scale: 0.98 } : undefined}
                disabled={sending || submitted}
                className="mt-6 w-full py-3.5 rounded-xl font-semibold text-surface-0 bg-gradient-to-r from-neon-cyan to-neon-emerald hover:shadow-lg hover:shadow-neon-cyan/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Message Sent!
                    </motion.span>
                  ) : sending ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}