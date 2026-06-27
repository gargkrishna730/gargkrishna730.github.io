'use client';

import { useState, useCallback, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import WhatIDoSection from '@/components/portfolio/WhatIDoSection';
import EducationSection from '@/components/portfolio/EducationSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import CertificationsSection from '@/components/portfolio/CertificationsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import BackToTop from '@/components/portfolio/BackToTop';
import MouseGlow from '@/components/portfolio/MouseGlow';
import CircuitDivider from '@/components/portfolio/CircuitDivider';
import PageLoader from '@/components/portfolio/PageLoader';
import StatsTicker from '@/components/portfolio/StatsTicker';
import CommandPalette from '@/components/portfolio/CommandPalette';

const ParticleField = dynamic(() => import('@/components/portfolio/ParticleField'), {
  ssr: false,
});

// Stable noop subscribe — sessionStorage doesn't emit events
const noopSubscribe = () => () => {};

function useHasVisited(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    // Client snapshot: check sessionStorage
    () => {
      try {
        return sessionStorage.getItem('portfolio-loaded') === '1';
      } catch {
        return false;
      }
    },
    // Server snapshot: always false (loader renders on server)
    () => false,
  );
}

export default function Home() {
  const hasVisited = useHasVisited();
  const [loaderDone, setLoaderDone] = useState(false);

  const showLoader = !hasVisited && !loaderDone;

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
    try {
      sessionStorage.setItem('portfolio-loaded', '1');
    } catch {}
  }, []);

  return (
    <main className="relative min-h-screen bg-surface-0 noise-overlay">
      <AnimatePresence>
        {showLoader && <PageLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <ParticleField />
      <MouseGlow />
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <CommandPalette />
      <HeroSection />
      <StatsTicker />
      <CircuitDivider color="cyan" />
      <AboutSection />
      <CircuitDivider color="purple" />
      <WhatIDoSection />
      <CircuitDivider color="emerald" />
      <EducationSection />
      <CircuitDivider color="cyan" />
      <SkillsSection />
      <CircuitDivider color="purple" />
      <ExperienceSection />
      <CircuitDivider color="cyan" />
      <ProjectsSection />
      <CircuitDivider color="emerald" />
      <CertificationsSection />
      <CircuitDivider color="cyan" />
      <ContactSection />
      <Footer />
    </main>
  );
}