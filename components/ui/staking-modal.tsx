'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { StakingPool, STAKING_CONTRACT_ADDRESS, calculateRewards } from '@/lib/staking';

interface StakingModalProps {
  pool: StakingPool | null;
  isOpen: boolean;
  onClose: () => void;
  onStakeSuccess: (txHash: string, amount: string, poolId: string) => void;
}

export function StakingModal({ pool, isOpen, onClose, onStakeSuccess }: StakingModalProps) {
  const { address } = useAccount();
  const [step, setStep] = useState<'confirm' | 'pending' | 'success' | 'error'>('confirm');
  const [errorMessage, setErrorMessage] = useState('');

  const { 
    sendTransaction, 
    data: hash, 
    error: sendError, 
    isPending: isSending 
  } = useSendTransaction();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: confirmError
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Reset state when modal opens/closes or pool changes
  useEffect(() => {
    if (isOpen && pool) {
      setStep('confirm');
      setErrorMessage('');
    }
  }, [isOpen, pool]);

  // Handle transaction states
  useEffect(() => {
    if (isSending) {
      setStep('pending');
    }
  }, [isSending]);

  useEffect(() => {
    if (sendError) {
      setStep('error');
      setErrorMessage(sendError.message || 'Transaction failed');
    }
  }, [sendError]);

  useEffect(() => {
    if (confirmError) {
      setStep('error');
      setErrorMessage(confirmError.message || 'Transaction confirmation failed');
    }
  }, [confirmError]);

  useEffect(() => {
    if (isConfirmed && hash && pool) {
      setStep('success');
      onStakeSuccess(hash, pool.stakeAmount, pool.id);
    }
  }, [isConfirmed, hash, pool, onStakeSuccess]);

  if (!pool) return null;

  const handleStake = async () => {
    if (!address || !pool) return;

    try {
      const poolData = new TextEncoder().encode(JSON.stringify({
        poolId: pool.id,
        poolName: pool.name,
        stakeAmount: pool.stakeAmount,
        apy: pool.apy,
        duration: pool.duration
      }));

      await sendTransaction({
        to: STAKING_CONTRACT_ADDRESS as `0x${string}`,
        value: parseEther(pool.stakeAmount),
        data: `0x${Array.from(poolData).map(b => b.toString(16).padStart(2, '0')).join('')}` as `0x${string}`,
      });
    } catch (error) {
      console.error('Staking error:', error);
      setStep('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const expectedRewards = calculateRewards(pool.stakeAmount, pool.apy, pool.duration);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-800 rounded-2xl border border-purple-500/20 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                {step === 'confirm' && 'Confirm Staking'}
                {step === 'pending' && 'Processing Transaction'}
                {step === 'success' && 'Staking Successful'}
                {step === 'error' && 'Transaction Failed'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'confirm' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{pool.type}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{pool.name}</h3>
                    <p className="text-gray-400">Stake in this {pool.type} pool to earn rewards</p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stake Amount:</span>
                      <span className="text-white font-semibold">{pool.stakeAmount} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">APY:</span>
                      <span className="text-green-400 font-semibold">{pool.apy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white font-semibold">{pool.duration} days</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-600 pt-3">
                      <span className="text-gray-400">Expected Rewards:</span>
                      <span className="text-orange-400 font-semibold">{expectedRewards} ETH</span>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-300 text-sm">
                      <strong>Network:</strong> Sepolia Testnet<br />
                      <strong>Contract:</strong> {STAKING_CONTRACT_ADDRESS.slice(0, 10)}...
                    </p>
                  </div>

                  <button
                    onClick={handleStake}
                    disabled={isSending}
                    className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isSending ? 'Confirming...' : `Stake ${pool.stakeAmount} ETH`}
                  </button>
                </div>
              )}

              {step === 'pending' && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Processing Transaction</h3>
                    <p className="text-gray-400 mb-4">
                      {isConfirming ? 'Waiting for confirmation...' : 'Please confirm the transaction in your wallet'}
                    </p>
                    {hash && (
                      <a
                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm"
                      >
                        View on Etherscan <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Staking Successful!</h3>
                    <p className="text-gray-400 mb-4">
                      Your {pool.stakeAmount} ETH has been staked in the {pool.name} pool.
                    </p>
                    {hash && (
                      <a
                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm mb-4"
                      >
                        View Transaction <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              )}

              {step === 'error' && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Transaction Failed</h3>
                    <p className="text-gray-400 mb-4 text-sm">
                      {errorMessage}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep('confirm')}
                      className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}