'use client';

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          <Wallet className="w-4 h-4" />
          <span>{formatAddress(address)}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Connected</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="mb-4">
                  <div className="text-white font-medium mb-1">Wallet Address</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-300 font-mono">{formatAddress(address)}</span>
                    <button
                      onClick={copyAddress}
                      className="p-1 hover:bg-gray-700 rounded transition-colors duration-200"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => window.open(`https://etherscan.io/address/${address}`, '_blank')}
                      className="p-1 hover:bg-gray-700 rounded transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    disconnect();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowConnectors(!showConnectors)}
        disabled={isPending}
        className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="w-4 h-4" />
        <span>{isPending ? 'Connecting...' : 'Connect Wallet'}</span>
      </button>

      <AnimatePresence>
        {showConnectors && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50"
          >
            <div className="p-4">
              <div className="text-white font-medium mb-3">Connect a Wallet</div>
              <div className="space-y-2">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => {
                      connect({ connector });
                      setShowConnectors(false);
                    }}
                    disabled={isPending}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-left text-white hover:bg-gray-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{connector.name}</div>
                      <div className="text-sm text-gray-400">
                        {connector.name === 'MetaMask' && 'Connect using MetaMask'}
                        {connector.name === 'WalletConnect' && 'Scan with WalletConnect'}
                        {connector.name === 'Injected' && 'Connect using browser wallet'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {showConnectors && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowConnectors(false)}
        />
      )}
    </div>
  );
}