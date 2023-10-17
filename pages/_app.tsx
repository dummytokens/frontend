import { Sidebar } from '@/components/Sidebar';
import '@/styles/globals.css';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import type { AppProps } from 'next/app';
import { Dosis } from 'next/font/google';
import { WagmiConfig, createConfig, sepolia } from 'wagmi';

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || '',

    // Required
    appName: 'Dummy Tokens',

    chains: [sepolia],

    // Optional
    appDescription: 'Dummy Tokens for your dApps development',
    appUrl: 'https://dummytokens.dev', // your app's url
    appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const inter = Dosis({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider options={{ enforceSupportedChains: false }}>
        <div className={`flex min-h-screen flex-row items-center gap-4 bg-slate-100 ${inter.className}`}>
          <Sidebar/>
          <Component {...pageProps} />

        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
