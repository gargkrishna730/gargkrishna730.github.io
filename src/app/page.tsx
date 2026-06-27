'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import EducationSection from '@/components/portfolio/EducationSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import CertificationsSection from '@/components/portfolio/CertificationsSection';
import TestimonialsSection from '@/components/portfolio/TestimonialsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import BackToTop from '@/components/portfolio/BackToTop';
import MouseGlow from '@/components/portfolio/MouseGlow';
import CircuitDivider from '@/components/portfolio/CircuitDivider';

const ParticleField = dynamic(() => import('@/components/portfolio/ParticleField'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-surface-0 noise-overlay">
      <ParticleField />
      <MouseGlow />
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <HeroSection />
      <CircuitDivider color="cyan" />
      <AboutSection />
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
      <CircuitDivider color="pink" />
      <TestimonialsSection />
      <CircuitDivider color="cyan" />
      <ContactSection />
      <Footer />
    </main>
  );
}