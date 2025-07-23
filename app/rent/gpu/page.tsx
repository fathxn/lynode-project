'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/navbar';
import { StakingModal } from '@/components/ui/staking-modal';
import { StakingPositions } from '@/components/ui/staking-posititions';
import { useAccount } from 'wagmi';
import { HardDrive, Cpu, Zap, DollarSign, Clock, Shield, Filter, Search, TrendingUp } from 'lucide-react';
import { STAKING_POOLS, StakingPool, StakingPosition, calculateRewards } from '@/lib/staking';

export default function GPURentalPage() {
  const { isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stakingPositions, setStakingPositions] = useState<StakingPosition[]>([]);
  const [activeTab, setActiveTab] = useState<'pools' | 'positions'>('pools');

  const gpuPools = STAKING_POOLS.filter(pool => pool.type === 'GPU');

  const filters = [
    { id: 'all', label: 'All Pools' },
    { id: 'available', label: 'Available' },
    { id: 'high-apy', label: 'High APY' },
    { id: 'low-stake', label: 'Low Min Stake' }
  ];

  const filteredPools = gpuPools.filter(pool => {
    const matchesSearch = pool.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'available' && pool.availableSlots > 0) ||
                         (selectedFilter === 'high-apy' && pool.apy >= 12) ||
                         (selectedFilter === 'low-stake' && parseFloat(pool.stakeAmount) <= 0.025);
    return matchesSearch && matchesFilter;
  });

  const handleStake = (pool: StakingPool) => {
    setSelectedPool(pool);
    setIsModalOpen(true);
  };

  const handleStakeSuccess = (txHash: string, amount: string, poolId: string) => {
    const newPosition: StakingPosition = {
      id: Date.now().toString(),
      poolId,
      amount,
      startTime: Date.now(),
      endTime: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
      rewards: '0',
      status: 'pending',
      txHash
    };
    setStakingPositions(prev => [...prev, newPosition]);
    setIsModalOpen(false);
  };

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
          To stake in GPU pools and earn rewards, please connect your wallet first.
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
              GPU <span className="text-purple-400">Staking Pools</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stake ETH in GPU pools and earn rewards while supporting decentralized AI infrastructure.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('pools')}
                className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                  activeTab === 'pools'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Staking Pools
              </button>
              <button
                onClick={() => setActiveTab('positions')}
                className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                  activeTab === 'positions'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                My Positions ({stakingPositions.length})
              </button>
            </div>
          </motion.div>

          {activeTab === 'pools' && (
            <>
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

          {/* GPU Staking Pools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPools.map((pool, index) => (
              <motion.div
                key={pool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{pool.name}</h3>
                    <p className="text-gray-400 text-sm">Type: {pool.type} Staking Pool</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                    {pool.availableSlots} slots
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Stake Amount</span>
                    </div>
                    <div className="text-green-400 font-bold text-lg">{pool.stakeAmount} ETH</div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">APY</span>
                    </div>
                    <div className="text-green-400 font-semibold">{pool.apy}%</div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Duration</span>
                    </div>
                    <div className="text-white font-semibold">{pool.duration} days</div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-400">Expected Rewards</span>
                    </div>
                    <div className="text-orange-400 font-semibold">{calculateRewards(pool.stakeAmount, pool.apy, pool.duration)} ETH</div>
                  </div>
                </div>

                {/* Pool specs */}
                <div className="mb-4 p-3 bg-gray-700/30 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(pool.specs).map(([key, value]) => (
                      <div key={key} className="text-gray-400">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span>Network: Sepolia Testnet</span>
                  </div>
                  
                  <button
                    onClick={() => handleStake(pool)}
                    disabled={pool.availableSlots === 0}
                    className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {pool.availableSlots > 0 ? 'Stake Now' : 'Pool Full'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPools.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No pools found matching your criteria.</p>
            </motion.div>
          )}
            </>
          )}

          {activeTab === 'positions' && (
            <StakingPositions positions={stakingPositions} />
          )}
        </div>
      </main>

      <StakingModal
        pool={selectedPool}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStakeSuccess={handleStakeSuccess}
      />
    </div>
  );
}