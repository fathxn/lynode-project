'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/navbar';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { TokenomicsSection } from '@/components/sections/tokenomics-section';
import { RoadmapSection } from '@/components/sections/roadmap-section';
import { FooterSection } from '@/components/sections/footer-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar variant="landing" />
      
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TokenomicsSection />
        {/* <RoadmapSection /> */}
        <FooterSection />
      </main>
    </div>
  );
}