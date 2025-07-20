'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, BrainCircuit, GlobeLock, MonitorCog } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Cpu,
      title: 'Distributed GPU/CPU Network',
      description: 'Rent or contribute compute power.',
      color: 'bg-purple-500'
    },
    {
      icon: BrainCircuit,
      title: ' AI Model Marketplace',
      description: 'Buy/sell pre-trained models.',
      color: 'bg-blue-500'
    },
    {
      icon: GlobeLock,
      title: 'Privacy-Preserving Compute',
      description: 'Federated learning & encrypted data',
      color: 'bg-green-500'
    },
    {
      icon: MonitorCog,
      title: 'Proof-of-Compute (PoC)',
      description: 'Miners validate AI workloads, not wasteful hashing.',
      color: 'bg-orange-500'
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful <span className="text-purple-400">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of decentralized computing with our comprehensive feature set
            designed for developers, researchers, and enterprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 h-full hover:border-purple-500/40 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-xl mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  <div className="absolute inset-0 rounded-2xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}