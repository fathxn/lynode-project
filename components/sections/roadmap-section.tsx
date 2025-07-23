'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Rocket, Zap, Globe, Building } from 'lucide-react';

export function RoadmapSection() {
  const roadmapItems = [
    {
      quarter: '2025',
      title: 'Phase 1 - Testnet & MVP',
      icon: Rocket,
      color: 'green',
      items: ['Launch Lynode testnet', 'Basic GPU marketplace']
    },
    {
      quarter: '2025',
      title: 'Phase 2 - Mainnet & Scalling',
      icon: Zap,
      color: 'yellow',
      items: ['Full AI training support', 'On-chain governance']
    },
    {
      quarter: '2026+',
      title: 'Phase 3 - Expansion',
      icon: Globe,
      color: 'blue',
      items: ['Cross-chain compute (Ethereum, Solana)', 'Enterprise adoption']
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-400';
      case 'yellow':
        return 'text-yellow-400';
      case 'blue':
        return 'text-blue-400';
      case 'purple':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <section id="roadmap" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Development <span className="text-purple-400">
              Roadmap
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our journey towards building the most comprehensive decentralized computing platform.
            Track our progress and upcoming milestones.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-purple-500/30 hidden lg:block"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:space-x-8`}
              >
                {/* Timeline dot - centered */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20 w-20 h-20 rounded-full bg-gray-900 border-4 border-purple-500 flex items-center justify-center hidden lg:flex">
                  <div className={`w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center`}>
                    {React.createElement(item.icon, { className: `w-6 h-6 text-white` })}
                  </div>
                </div>

                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                  <div className={`bg-gray-800/50 backdrop-blur-sm border ${(item.color)} rounded-2xl p-8 hover:border-purple-500/60 transition-all duration-300 group`}>
                    {/* Quarter badge */}
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {item.quarter}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3">
                        {item.items.map((subItem, subIndex) => (
                          <div key={subIndex} className="flex items-center space-x-3 text-gray-300">
                            <span className="text-sm">{subItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="hidden lg:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}