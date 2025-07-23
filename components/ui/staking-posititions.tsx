'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, ExternalLink, Gift } from 'lucide-react';
import { StakingPosition } from '@/lib/staking';

interface StakingPositionsProps {
  positions: StakingPosition[];
}

export function StakingPositions({ positions }: StakingPositionsProps) {
  if (positions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Staking Positions</h3>
        <p className="text-gray-400">Start staking to see your positions here</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const calculateProgress = (startTime: number, endTime: number) => {
    const now = Date.now();
    const total = endTime - startTime;
    const elapsed = now - startTime;
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Your Staking Positions</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {positions.map((position, index) => (
          <motion.div
            key={position.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Position #{position.id}</h4>
                <p className="text-gray-400 text-sm">Pool: {position.poolId}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(position.status)}`}>
                {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-400">Staked</span>
                </div>
                <div className="text-white font-semibold">{position.amount} ETH</div>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Gift className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">Rewards</span>
                </div>
                <div className="text-green-400 font-semibold">{position.rewards} ETH</div>
              </div>
            </div>

            {position.status === 'active' && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(calculateProgress(position.startTime, position.endTime))}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress(position.startTime, position.endTime)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>
                  {formatDate(position.startTime)} - {formatDate(position.endTime)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <a
                href={`https://sepolia.etherscan.io/tx/${position.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 text-sm"
              >
                <span>View Transaction</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              
              {position.status === 'completed' && (
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                  Claim Rewards
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}