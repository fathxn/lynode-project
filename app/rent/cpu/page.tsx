'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/navbar';
import { useAccount } from 'wagmi';
import { Cpu, HardDrive, Zap, DollarSign, Clock, Shield, Filter, Search } from 'lucide-react';

export default function CPURentalPage() {
  const { isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const cpuListings = [
    {
      id: 1,
      name: 'Intel Xeon Platinum 8480+',
      provider: '0x1111...2222',
      cores: '56 Cores / 112 Threads',
      frequency: '2.0 - 3.8 GHz',
      price: '1.2',
      priceUnit: 'ETH/hour',
      availability: 'Available',
      location: 'US East',
      uptime: '99.9%',
      rating: 4.9,
      specs: {
        cache: '105MB L3',
        memory: 'DDR5-4800',
        tdp: '350W',
        architecture: 'Sapphire Rapids'
      }
    },
    {
      id: 2,
      name: 'AMD EPYC 9654',
      provider: '0x3333...4444',
      cores: '96 Cores / 192 Threads',
      frequency: '2.4 - 3.7 GHz',
      price: '2.0',
      priceUnit: 'ETH/hour',
      availability: 'Available',
      location: 'EU West',
      uptime: '99.8%',
      rating: 4.8,
      specs: {
        cache: '384MB L3',
        memory: 'DDR5-4800',
        tdp: '360W',
        architecture: 'Zen 4'
      }
    },
    {
      id: 3,
      name: 'Intel Core i9-13900KS',
      provider: '0x5555...6666',
      cores: '24 Cores / 32 Threads',
      frequency: '3.2 - 6.0 GHz',
      price: '0.8',
      priceUnit: 'ETH/hour',
      availability: 'Busy',
      location: 'Asia Pacific',
      uptime: '99.7%',
      rating: 4.7,
      specs: {
        cache: '36MB L3',
        memory: 'DDR5-5600',
        tdp: '150W',
        architecture: 'Raptor Lake'
      }
    },
    {
      id: 4,
      name: 'AMD Ryzen 9 7950X',
      provider: '0x7777...8888',
      cores: '16 Cores / 32 Threads',
      frequency: '4.5 - 5.7 GHz',
      price: '0.6',
      priceUnit: 'ETH/hour',
      availability: 'Available',
      location: 'US West',
      uptime: '99.9%',
      rating: 4.8,
      specs: {
        cache: '64MB L3',
        memory: 'DDR5-5200',
        tdp: '170W',
        architecture: 'Zen 4'
      }
    }
  ];

  const filters = [
    { id: 'all', label: 'All CPUs' },
    { id: 'available', label: 'Available' },
    { id: 'intel', label: 'Intel' },
    { id: 'amd', label: 'AMD' },
    { id: 'enterprise', label: 'Enterprise' }
  ];

  const filteredCPUs = cpuListings.filter(cpu => {
    const matchesSearch = cpu.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'available' && cpu.availability === 'Available') ||
                         (selectedFilter === 'intel' && cpu.name.includes('Intel')) ||
                         (selectedFilter === 'amd' && cpu.name.includes('AMD')) ||
                         (selectedFilter === 'enterprise' && (cpu.name.includes('Xeon') || cpu.name.includes('EPYC')));
    return matchesSearch && matchesFilter;
  });

  const renderConnectWalletPrompt = () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto text-center p-8 bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl"
      >
        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Cpu className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
        <p className="text-gray-400 mb-6">
          To rent CPU resources and manage your compute instances, please connect your wallet first.
        </p>
        <div className="text-sm text-gray-500">
          Use the "Connect Wallet" button in the navigation bar above.
        </div>
      </motion.div>
    </div>
  );

  if (!isConnected) {
    return (
      <>
        <Navbar variant="app" />
        {renderConnectWalletPrompt()}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar variant="app" />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              CPU <span className="text-purple-400">Marketplace</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rent high-performance CPUs for computation, web services, and general-purpose workloads.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search CPUs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                {filters.map(filter => (
                  <option key={filter.id} value={filter.id}>{filter.label}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* CPU Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCPUs.map((cpu, index) => (
              <motion.div
                key={cpu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{cpu.name}</h3>
                    <p className="text-gray-400 text-sm">Provider: {cpu.provider}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    cpu.availability === 'Available' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {cpu.availability}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Cpu className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">Cores</span>
                    </div>
                    <div className="text-white font-semibold">{cpu.cores}</div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Frequency</span>
                    </div>
                    <div className="text-white font-semibold">{cpu.frequency}</div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Price</span>
                    </div>
                    <div className="text-white font-semibold">{cpu.price} {cpu.priceUnit}</div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-400">Uptime</span>
                    </div>
                    <div className="text-white font-semibold">{cpu.uptime}</div>
                  </div>
                </div>

                {/* Additional specs */}
                <div className="mb-4 p-3 bg-gray-700/30 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-400">Cache: <span className="text-white">{cpu.specs.cache}</span></div>
                    <div className="text-gray-400">Memory: <span className="text-white">{cpu.specs.memory}</span></div>
                    <div className="text-gray-400">TDP: <span className="text-white">{cpu.specs.tdp}</span></div>
                    <div className="text-gray-400">Arch: <span className="text-white">{cpu.specs.architecture}</span></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{cpu.location}</span>
                    <span>★ {cpu.rating}</span>
                  </div>
                  
                  <button
                    disabled={cpu.availability !== 'Available'}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                      cpu.availability === 'Available'
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {cpu.availability === 'Available' ? 'Rent Now' : 'Unavailable'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCPUs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No CPUs found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}