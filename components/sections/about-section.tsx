'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Server, Users, TrendingUp, Award } from 'lucide-react';

export function AboutSection() {
  const stats = [
    { icon: Server, label: 'Active Nodes', value: '10,000+' },
    { icon: Users, label: 'Users', value: '50,000+' },
    { icon: TrendingUp, label: 'Uptime', value: '99.9%' },
    { icon: Award, label: 'Rewards Paid', value: '$2M+' },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Revolutionizing <span className="text-purple-400">
              Computing Power
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lynode solves this by decentralizing AI compute, allowing anyone to contribute or
            rent resources in a peer-to-peer marketplace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">The Future of Decentralized Computing</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Democratized Access</h4>
                  <p className="text-gray-400">Anyone can access high-performance computing without expensive hardware investments.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Fair Economics</h4>
                  <p className="text-gray-400">Market-driven pricing ensures fair compensation for providers and affordable access for users.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Global Infrastructure</h4>
                  <p className="text-gray-400">Distributed network of compute providers ensures low latency and high availability worldwide.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-purple-900/40 rounded-2xl p-8 border border-purple-500/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Network Status</span>
                  <span className="text-green-400">● Online</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">GPU Utilization</span>
                      <span className="text-white">78%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">CPU Utilization</span>
                      <span className="text-white">65%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Active Rentals</span>
                      <span className="text-white">1,247</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}