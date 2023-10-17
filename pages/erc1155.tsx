import Image from 'next/image';
import { Dosis } from 'next/font/google';
import logo from '@/public/logo.svg';
import { ConnectKitButton } from 'connectkit';
import Head from 'next/head';
import Link from 'next/link';

const inter = Dosis({ subsets: ['latin'] });

export default function ERC1155() {
  return (
    <main className='w-full'>
      <Head>
        <title>Dummy Tokens — EVM compatible dummy ERC20 token</title>
      </Head>
      <div className="p-16 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl">Dummy Tokens</h2>
          <h1 className="text-4xl font-bold">ERC1155</h1>
        </div>
        <div>
          <span>Coming soon</span>
        </div>
      </div>
    </main>
  );
}
