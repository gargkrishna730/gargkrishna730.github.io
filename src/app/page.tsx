'use client';

import { useState, useCallback } from 'react';
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

const ParticleField = dynamic(() => import('@/components/portfolio/ParticleField'), {
  ssr: false,
});

export default function Home() {
  const [mounted, setMounted] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('portfolio-loaded') === '1';
    }
    return false;
  });

  const handleLoaderComplete = useCallback(() => {
    setMounted(true);
    sessionStorage.setItem('portfolio-loaded', '1');
  }, []);

  return (
    <main className="relative min-h-screen bg-surface-0 noise-overlay">
      <AnimatePresence>
        {!mounted && <PageLoader onComplete={() => { setMounted(true); sessionStorage.setItem('portfolio-loaded', '1'); }} />}
      </AnimatePresence>
      <ParticleField />
      <MouseGlow />
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <HeroSection />
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