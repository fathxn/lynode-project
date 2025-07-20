'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Cpu, HardDrive } from 'lucide-react';
import { ConnectWallet } from './connect-wallet';
import Image from 'next/image';

interface NavbarProps {
  variant?: 'landing' | 'app';
}

export function Navbar({ variant = 'landing' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const landingNavItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Tokenomics', href: '#tokenomics' },
    // { label: 'Roadmap', href: '#roadmap' },
  ];

  const appNavItems = [
    { label: 'GPU Rental', href: '/rent/gpu', icon: HardDrive },
    { label: 'CPU Rental', href: '/rent/cpu', icon: Cpu },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || variant === 'app'
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-purple-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-white font-bold text-xl">Lynode</span> */}
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={90}
              priority // Optional: preload for performance
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {variant === 'landing' ? (
              <>
                {landingNavItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href.substring(1))}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
                <Link
                  href="/rent/gpu"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  Launch App
                </Link>
              </>
            ) : (
              <>
                {appNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <ConnectWallet />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-purple-500/20 py-4"
          >
            <div className="flex flex-col space-y-4">
              {variant === 'landing' ? (
                <>
                  {landingNavItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href.substring(1))}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Link
                    href="/rent/gpu"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 text-center"
                  >
                    Launch App
                  </Link>
                </>
              ) : (
                <>
                  {appNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <div className="pt-2">
                    <ConnectWallet />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}