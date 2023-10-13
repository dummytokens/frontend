import Image from 'next/image';
import { Dosis, Fira_Mono } from 'next/font/google';
import { Icon } from '@iconify/react';
import logo from '@/public/logo.svg';
import { ConnectKitButton } from 'connectkit';
import Network, { NetworkType } from '@/components/Network';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from 'wagmi';
import { ChangeEvent, useState } from 'react';
import { Address, parseEther } from 'viem';
import useNetworkStore from '@/stores/network';
import CopyableText from '@/components/CopyableText';
import Head from 'next/head';
import Link from 'next/link';

const inter = Dosis({ subsets: ['latin'] });
const fira = Fira_Mono({ weight: '400', subsets: ['latin'] });

const ERC20_ADDRESS = '0xE08c9023743368D227b158a682827C2F3cd403EE';

const CHAIN_NETWORK_MAP: { [key: number]: NetworkType } = {
  11155111: 'sepolia',
  421613: 'arbitrum',
  59140: 'linea',
  420: 'optimism',
  80001: 'polygon',
  43113: 'avalanche',
  97: 'bsc',
  84531: 'base',
  534351: 'scroll'
};
const NETWORK_CHAIN_MAP: { [key: string]: number } = {
  sepolia: 11155111,
  arbitrum: 421613,
  linea: 59140,
  optimism: 420,
  polygon: 80001,
  avalanche: 43113,
  bsc: 97,
  base: 84531,
  scroll: 534351
};

export default function Home() {
  const { address } = useAccount();
  const [to, setTo] = useState<string>();
  const { selected, select } = useNetworkStore();
  const { chain } = useNetwork();
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();

  const needSwitch = selected !== CHAIN_NETWORK_MAP[chain?.id || 11155111];

  const { config } = usePrepareContractWrite({
    address: ERC20_ADDRESS,
    abi: [
      {
        type: 'function',
        name: 'mint',
        stateMutability: 'external',
        inputs: [
          {
            name: 'receiver',
            type: 'address',
          },
          {
            name: 'amount',
            type: 'uint256',
          },
        ],
        outputs: [],
      },
    ],
    functionName: 'mint',
    args: [to || address, parseEther('10')],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  const handleMintButtonClick = () => {
    if (!write) return;
    try {
      write();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSwitchButtonClick = () => {
    if (!switchNetwork) return;
    switchNetwork(NETWORK_CHAIN_MAP[selected]);
  };

  return (
    <main
      className={`flex min-h-screen flex-row items-center gap-4 bg-slate-100 ${inter.className}`}
    >
      <Head>
        <title>Dummy Tokens — EVM compatible dummy ERC20 token</title>
      </Head>
      <div className="bg-slate-300 w-1/5 h-screen p-8 flex flex-col gap-4">
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
          <Link className="hover:bg-slate-400/50 px-2 py-1 rounded-md" href="/">
            ERC20
          </Link>
          <Link
            className="hover:bg-slate-400/50 px-2 py-1 rounded-md"
            href="/erc721"
          >
            ERC721
          </Link>
          <Link
            className="hover:bg-slate-400/50 px-2 py-1 rounded-md"
            href="/erc1155"
          >
            ERC1155
          </Link>
        </div>
      </div>
      <div className="w-4/5 p-16 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl">Dummy Tokens</h2>
          <h1 className="text-4xl font-bold">ERC20</h1>
        </div>

        <div className="flex flex-row gap-2 w-full justify-between">
          <div className="bg-white rounded-xl p-4 shadow-lg flex flex-row gap-2 justify-between">
            <Network network="sepolia" />
            <Network network="arbitrum" />
            <Network network="linea" />
            <Network network="optimism" />
            {/* <Network network='avalanche'/>
              <Network network='polygon'/> */}
            <Network network="bsc" />
            <Network network="base" />
            <Network network="scroll" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg flex flex-row gap-2 justify-between">
            <select
              value={selected}
              className="hover:bg-slate-600 transition-all cursor-pointer bg-slate-500 rounded-lg px-4 py-2 peer text-white"
              name="networks"
            >
              <option value="sepolia">Sepolia</option>
              <option value="arbitrum">Arbitrum Goerli</option>
              <option value="linea">Linea Testnet</option>
              <option value="optimism">Optimism Goerli</option>
              {/* <option value="polygon">Polygon Mumbai</option>
                  <option value="avalanche">Avalanche Fuji</option> */}
              <option value="bsc">BSC Testnet</option>
              <option value="base">Base Goerli</option>
              <option value="scroll">Scroll Sepolia</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <div className="bg-white shadow-lg w-fit rounded-xl flex flex-col gap-8 p-8">
            <div className="flex flex-row justify-between">
              <h1 className="font-bold text-3xl">18 Decimals</h1>
            </div>
            <div className="m-auto font-bold">
              <span>Contract address</span>
              <CopyableText>{ERC20_ADDRESS}</CopyableText>
            </div>
            <div className="flex flex-row justify-between gap-4">
              <input
                value={to}
                onChange={handleAddressChange}
                className="outline-none bg-transparent border rounded-lg px-4 py-2 w-full"
                placeholder="Address to mint to (optional)"
              />
              <button
                onClick={
                  needSwitch ? handleSwitchButtonClick : handleMintButtonClick
                }
                className="hover:bg-slate-600 transition-all rounded-lg px-4 py-2 bg-slate-500 text-white w-64"
              >
                {needSwitch ? 'Switch Network' : 'Mint'}
              </button>
            </div>
          </div>
          <div className="bg-white shadow-lg w-fit rounded-xl flex flex-col gap-8 p-8">
            <div className="flex flex-row justify-between">
              <h1 className="font-bold text-3xl">6 Decimals</h1>
            </div>
            <span>Coming soon</span>
          </div>
        </div>
      </div>
    </main>
  );
}
