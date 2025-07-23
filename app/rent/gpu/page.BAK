'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/navbar';
import { useAccount } from 'wagmi';
import { HardDrive, Cpu, Zap, DollarSign, Clock, Shield, Filter, Search } from 'lucide-react';

export default function GPURentalPage() {
  const { isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const gpuListings = [
    {
      id: 1,
      name: 'NVIDIA RTX 4090',
      provider: '0x1234...5678',
      vram: '24GB GDDR6X',
      cores: '16,384 CUDA',
      price: '2.5',
      priceUnit: 'ETH/hour',
      availability: 'Available',
      location: 'US East',
      uptime: '99.9%',
      rating: 4.9,
      specs: {
        memory: '24GB',
        bandwidth: '1008 GB/s',
        base_clock: '2235 MHz',
        boost_clock: '2520 MHz'
      }
    },
    {
      id: 2,
      name: 'NVIDIA RTX 4080',
      provider: '0x9876...4321',
      vram: '16GB GDDR6X',
      cores: '9,728 CUDA',
      price: '1.8',
      priceUnit: 'ETH/hour',
      availability: 'Available',
      location: 'EU West',
      uptime: '99.8%',
      rating: 4.8,
      specs: {
        memory: '16GB',
        bandwidth: '717 GB/s',
        base_clock: '2205 MHz',
        boost_clock: '2505 MHz'
      }
    },
    {
      id: 3,
      name: 'NVIDIA RTX 4070 Ti',
      provider: '0x5555...9999',
      vram: '12GB GDDR6X',
      cores: '7,680 CUDA',
      price: '1.2',
      priceUnit: 'ETH/hour',
      availability: 'Busy',
      location: 'Asia Pacific',
      uptime: '99.7%',
      rating: 4.7,
      specs: {
        memory: '12GB',
        bandwidth: '504 GB/s',
        base_clock: '2310 MHz',
        boost_clock: '2610 MHz'
      }
    },
    {
      id: 4,
      name: 'NVIDIA A100 80GB',
      provider: '0x7777...3333',
      vram: '80GB HBM2e',
      cores: '6,912 CUDA',
      price: '4.0',
      priceUnit: 'ETH/hour',
      availability: 'Available',
      location: 'US West',
      uptime: '99.9%',
      rating: 5.0,
      specs: {
        memory: '80GB',
        bandwidth: '2039 GB/s',
        base_clock: '1095 MHz',
        boost_clock: '1410 MHz'
      }
    }
  ];

  const filters = [
    { id: 'all', label: 'All GPUs' },
    { id: 'available', label: 'Available' },
    { id: 'rtx', label: 'RTX Series' },
    { id: 'enterprise', label: 'Enterprise' }
  ];

  const filteredGPUs = gpuListings.filter(gpu => {
    const matchesSearch = gpu.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'available' && gpu.availability === 'Available') ||
                         (selectedFilter === 'rtx' && gpu.name.includes('RTX')) ||
                         (selectedFilter === 'enterprise' && gpu.name.includes('A100'));
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
          <HardDrive className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
        <p className="text-gray-400 mb-6">
          To rent GPU resources and manage your compute instances, please connect your wallet first.
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
              GPU <span className="text-purple-400">Marketplace</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rent high-performance GPUs for AI, machine learning, and intensive computing workloads.
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
                placeholder="Search GPUs..."
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

          {/* GPU Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredGPUs.map((gpu, index) => (
              <motion.div
                key={gpu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{gpu.name}</h3>
                    <p className="text-gray-400 text-sm">Provider: {gpu.provider}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    gpu.availability === 'Available' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {gpu.availability}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <HardDrive className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">VRAM</span>
                    </div>
                    <div className="text-white font-semibold">{gpu.vram}</div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Cpu className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Cores</span>
                    </div>
                    <div className="text-white font-semibold">{gpu.cores}</div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Price</span>
                    </div>
                    <div className="text-white font-semibold">{gpu.price} {gpu.priceUnit}</div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-400">Uptime</span>
                    </div>
                    <div className="text-white font-semibold">{gpu.uptime}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{gpu.location}</span>
                    <span>★ {gpu.rating}</span>
                  </div>
                  
                  <button
                    disabled={gpu.availability !== 'Available'}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                      gpu.availability === 'Available'
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {gpu.availability === 'Available' ? 'Rent Now' : 'Unavailable'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredGPUs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No GPUs found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}