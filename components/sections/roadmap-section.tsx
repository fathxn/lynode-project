'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';

export function RoadmapSection() {
  const roadmapItems = [
    {
      quarter: 'Q1 2024',
      title: 'Platform Launch',
      description: 'Main network launch with basic GPU rental functionality',
      status: 'completed',
      items: ['Smart contract deployment', 'Basic UI/UX', 'Initial provider onboarding']
    },
    {
      quarter: 'Q2 2024',
      title: 'Enhanced Features',
      description: 'CPU rentals, improved interface, and mobile app',
      status: 'in-progress',
      items: ['CPU rental integration', 'Mobile application', 'Advanced monitoring']
    },
    {
      quarter: 'Q3 2024',
      title: 'Scaling & Optimization',
      description: 'Multi-chain support and performance improvements',
      status: 'upcoming',
      items: ['Layer 2 integration', 'Performance optimization', 'Advanced analytics']
    },
    {
      quarter: 'Q4 2024',
      title: 'Enterprise Features',
      description: 'Enterprise solutions and advanced governance',
      status: 'upcoming',
      items: ['Enterprise dashboard', 'Advanced governance', 'API integrations']
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/40 bg-green-500/10';
      case 'in-progress':
        return 'border-yellow-500/40 bg-yellow-500/10';
      default:
        return 'border-gray-500/40 bg-gray-500/10';
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

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-500 hidden md:block"></div>

          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start space-x-6"
              >
                {/* Timeline dot */}
                <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full border-2 ${getStatusColor(item.status)} flex items-center justify-center`}>
                  {getStatusIcon(item.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className={`bg-gray-800/50 backdrop-blur-sm border ${getStatusColor(item.status)} rounded-2xl p-6`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-purple-400 font-medium">{item.quarter}</p>
                      </div>
                      <div className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {item.status === 'completed' ? 'Completed' :
                         item.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    
                    <ul className="space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="flex items-center space-x-2 text-gray-400">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-purple-900/40 rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Get notified about the latest developments and releases.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}