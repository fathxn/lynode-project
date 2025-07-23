'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-purple-900/10" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-300 text-sm mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Decentralized AI Compute Network
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              LYNODE
            </h1>
            
            <div className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              <p>Lynode is a decentralized network that connects GPU/CPU</p>
              <p>providers with AI developers, enabling distributed</p>
              <p>machine learning at scale.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/rent/gpu"
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 group"
            >
              Start Renting
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <button className="inline-flex items-center px-8 py-4 border border-purple-500/40 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-colors duration-200">
              <Link href="https://lynode.gitbook.io/lynode-docs">Read Whitepaper</Link>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 max-w-4xl mx-auto"
          >
            {/* <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The Lynode token ($LYN) powers the ecosystem, incentivizing node operators and facilitating transactions between compute buyers and sellers.
            </p> */}
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Secure & Trustless</h3>
              <p className="text-gray-400">Smart contract-based rentals with guaranteed security</p>
            </div>
            
            <div className="text-center">
              <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">High Performance</h3>
              <p className="text-gray-400">Latest GPU and CPU hardware for optimal performance</p>
            </div>
            
            <div className="text-center">
              <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Global Network</h3>
              <p className="text-gray-400">Distributed infrastructure across multiple regions</p>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}