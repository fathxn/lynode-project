import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Providers from './providers'; 

const robotoMono = Roboto({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Lynode - Decentralized AI Compute Network",
  description: "Rent GPU and CPU using blockchain securely and easily.",
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "GPU Rent Platform | Web3",
    description: "Rent GPU and CPU using blockchain securely and easily.",
    url: "https://lynode-project.vercel.app/",
    siteName: "GPU Rent",
    images: [
      {
        url: "/logo-lynode.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPU Rent Platform | Web3",
    description: "Rent GPU and CPU using blockchain securely and easily.",
    images: ["/logo-lynode.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
