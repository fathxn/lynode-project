import { parseEther, formatEther } from 'viem';

export interface StakingPool {
  id: string;
  name: string;
  type: 'GPU' | 'CPU';
  stakeAmount: string; // Fixed stake amount in ETH
  apy: number;
  duration: number; // in days
  totalStaked: string;
  availableSlots: number;
  specs: {
    [key: string]: string;
  };
}

export interface StakingPosition {
  id: string;
  poolId: string;
  amount: string;
  startTime: number;
  endTime: number;
  rewards: string;
  status: 'active' | 'completed' | 'pending';
  txHash: string;
}

export const STAKING_POOLS: StakingPool[] = [
  {
    id: 'gpu-rtx3060',
    name: 'NVIDIA RTX 3060',
    type: 'GPU',
    stakeAmount: '0.01',
    apy: 8.5,
    duration: 30,
    totalStaked: '45.2',
    availableSlots: 50,
    specs: {
      vram: '12GB GDDR6',
      cores: '3,584 CUDA',
      memory: '12GB',
      bandwidth: '360 GB/s'
    }
  },
  {
    id: 'gpu-rtx4070',
    name: 'NVIDIA RTX 4070',
    type: 'GPU',
    stakeAmount: '0.025',
    apy: 10.2,
    duration: 30,
    totalStaked: '78.5',
    availableSlots: 35,
    specs: {
      vram: '12GB GDDR6X',
      cores: '5,888 CUDA',
      memory: '12GB',
      bandwidth: '504 GB/s'
    }
  },
  {
    id: 'gpu-rtx3050',
    name: 'NVIDIA RTX 3050',
    type: 'GPU',
    stakeAmount: '0.01',
    apy: 10.2,
    duration: 30,
    totalStaked: '78.5',
    availableSlots: 35,
    specs: {
      vram: '12GB GDDR6X',
      cores: '5,888 CUDA',
      memory: '12GB',
      bandwidth: '504 GB/s'
    }
  },
  {
    id: 'cpu-i7-12700k',
    name: 'Intel Core i7-12700K',
    type: 'CPU',
    stakeAmount: '0.035',
    apy: 9.8,
    duration: 30,
    totalStaked: '62.3',
    availableSlots: 40,
    specs: {
      cores: '12 Cores / 20 Threads',
      frequency: '3.6 - 5.0 GHz',
      cache: '25MB L3',
      memory: 'DDR5-4800'
    }
  },
  {
    id: 'cpu-ryzen9-5900x',
    name: 'AMD Ryzen 9 5900X',
    type: 'CPU',
    stakeAmount: '0.05',
    apy: 11.5,
    duration: 30,
    totalStaked: '89.7',
    availableSlots: 25,
    specs: {
      cores: '12 Cores / 24 Threads',
      frequency: '3.7 - 4.8 GHz',
      cache: '64MB L3',
      memory: 'DDR4-3200'
    }
  }
];

export const STAKING_CONTRACT_ADDRESS = '0x50ddFb497aD381C1a6f7B43174Ef2963175A424d';

export function calculateRewards(amount: string, apy: number, days: number): string {
  const principal = parseFloat(amount);
  const dailyRate = apy / 365 / 100;
  const rewards = principal * dailyRate * days;
  return rewards.toFixed(6);
}

export function formatDuration(days: number): string {
  if (days < 30) return `${days} days`;
  if (days < 365) return `${Math.floor(days / 30)} months`;
  return `${Math.floor(days / 365)} years`;
}