import Image from 'next/image';
import { Dosis } from 'next/font/google';
import logo from '@/public/logo.svg';
import { ConnectKitButton } from 'connectkit';
import Head from 'next/head';
import Link from 'next/link';

const inter = Dosis({ subsets: ['latin'] });

export default function ERC721() {
  return (
    <main
      className={`flex min-h-screen flex-row items-center gap-4 bg-slate-100 ${inter.className}`}
    >
      <Head>
        <title>Dummy Tokens — EVM compatible dummy ERC20 token</title>
      </Head>
      <div className="bg-slate-400 w-1/5 h-screen p-8 flex flex-col gap-4">
        <Image src={logo} alt="logo" />
        <ConnectKitButton.Custom>
          {({
            isConnected,
            isConnecting,
            show,
            hide,
            address,
            ensName,
            truncatedAddress,
            chain,
          }) => {
            if (isConnected)
              return (
                <button
                  onClick={show}
                  className="hover:bg-slate-600 transition-all rounded-lg px-4 py-2 bg-slate-500 text-white w-full"
                >
                  {ensName || truncatedAddress}
                </button>
              );
            return (
              <button
                onClick={show}
                className="hover:bg-slate-600 transition-all rounded-lg px-4 py-2 bg-slate-500 text-white w-full"
              >
                Connect
              </button>
            );
          }}
        </ConnectKitButton.Custom>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Dummy Tokens</h1>
          <Link className="hover:bg-slate-300/50 px-2 py-1 rounded-md" href="/">
            ERC20
          </Link>
          <Link
            className="hover:bg-slate-300/50 px-2 py-1 rounded-md"
            href="/erc721"
          >
            ERC721
          </Link>
          <Link
            className="hover:bg-slate-300/50 px-2 py-1 rounded-md"
            href="/erc1155"
          >
            ERC1155
          </Link>
        </div>
      </div>
      <div className="w-4/5 p-16 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl">Dummy Tokens</h2>
          <h1 className="text-4xl font-bold">ERC721</h1>
        </div>
        <div>
          <span>Coming soon</span>
        </div>
      </div>
    </main>
  );
}
