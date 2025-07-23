'use client';

import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, sepolia } from 'wagmi/chains';
import { metaMask, walletConnect, injected } from '@wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, sepolia],
  connectors: (() => {
    if (typeof window === 'undefined') return []; // ⛔ avoid running during SSR

    return [
      metaMask(),
      walletConnect({
        projectId: '165ac67f414ff92dd4c3c1ef9a9f0104',
      }),
      injected(),
    ];
  })(),
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [sepolia.id]: http(),
  },
});
