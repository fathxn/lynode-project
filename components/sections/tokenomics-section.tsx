'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Coins, Users } from 'lucide-react';

export function TokenomicsSection() {
  const tokenData = [
    { label: 'Compute Rewards', percentage: 40, color: '#a854f7', bgColor: 'bg-purple-500' },
    { label: 'Ecosystem Fund', percentage: 20, color: '#3b82f6', bgColor: 'bg-blue-500' },
    { label: 'Team', percentage: 15, color: '#10b981', bgColor: 'bg-green-500' },
    { label: 'Private Sale', percentage: 10, color: '#f59e0b', bgColor: 'bg-orange-500' },
    { label: 'Public Sale', percentage: 10, color: '#ef4444', bgColor: 'bg-red-500' },
    { label: 'Foundation Reserve', percentage: 5, color: '#8b5cf6', bgColor: 'bg-violet-500' }
  ];

  const metrics = [
    { icon: Coins, label: 'Max Supply', value: '1,000,000,000 $LYN', color: 'text-purple-400' },
    { icon: TrendingUp, label: 'Circulating', value: '250M LYN', color: 'text-blue-400' },
    { icon: Users, label: 'Holders', value: '15,000+', color: 'text-green-400' },
    { icon: PieChart, label: 'Market Cap', value: '$50M', color: 'text-orange-400' }
  ];

  // Calculate cumulative percentages for the pie chart
  let cumulativePercentage = 0;
  const chartData = tokenData.map(item => {
    const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
    cumulativePercentage += item.percentage;
    const endAngle = cumulativePercentage * 3.6;
    return {
      ...item,
      startAngle,
      endAngle
    };
  });

  // Create SVG path for each segment
  const createPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
    const start = polarToCartesian(100, 100, outerRadius, endAngle);
    const end = polarToCartesian(100, 100, outerRadius, startAngle);
    const innerStart = polarToCartesian(100, 100, innerRadius, endAngle);
    const innerEnd = polarToCartesian(100, 100, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y, 
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  return (
    <section id="tokenomics" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-purple-400">
              Tokenomics
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The Lynode token ($LYN) powers the ecosystem, incentivizing node operators and
            facilitating transactions between compute buyers and sellers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">Token Distribution</h3>
            
            {/* Legend */}
            <div className="space-y-4">
              {tokenData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.bgColor}`}></div>
                    <span className="text-white">{item.label}</span>
                  </div>
                  <span className="text-gray-300 font-semibold">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Circular Chart */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg width="400" height="400" viewBox="0 0 200 200" className="transform -rotate-90">
                  {chartData.map((item, index) => (
                    <path
                      key={index}
                      d={createPath(item.startAngle, item.endAngle, 40, 80)}
                      fill={item.color}
                      stroke="#1f2937"
                      strokeWidth="2"
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                  {/* Center circle */}
                  <circle cx="100" cy="100" r="40" fill="#1f2937" />
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">$LYN</div>
                    <div className="text-gray-400 text-sm">Token</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-white mb-4">💵 Payments</h4>
              <p className="text-gray-400 leading-relaxed">
                Buy compute power or AI models seamlessly with $LYN tokens,
                enabling frictionless access to distributed computing resources.
              </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-white mb-4">💰 Staking</h4>
            <p className="text-gray-400 leading-relaxed">
              Secure the network by staking your tokens and earn attractive
              rewards while contributing to network stability.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-white mb-4">📈 Governance</h4>
            <p className="text-gray-400 leading-relaxed">
              Vote on critical protocol upgrades and shape the future
              direction of the LYN ecosystem with your stake.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}