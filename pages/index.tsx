import Image from 'next/image'
import { Dosis, Fira_Mono } from 'next/font/google'
import { Icon } from '@iconify/react';
import { ConnectKitButton } from 'connectkit';
import Network, { NetworkType } from '@/components/Network';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useSwitchNetwork } from 'wagmi';
import { ChangeEvent, useState } from 'react';
import {Address, parseEther} from 'viem';
import useNetworkStore from '@/stores/network';
import CopyableText from '@/components/CopyableText';
import Head from 'next/head';

const inter = Dosis({ subsets: ['latin'] })
const fira = Fira_Mono({ weight: "400", subsets: ['latin']});

const ERC20_ADDRESS = '0xE08c9023743368D227b158a682827C2F3cd403EE';

const CHAIN_NETWORK_MAP: {[key:number]:NetworkType} = {
  11155111:'sepolia',
  421613:'arbitrum',
  59140:'linea',
  420:'optimism',
  80001:'polygon',
  43113:'avalanche',
  97:'bsc',
}
const NETWORK_CHAIN_MAP: {[key:string]:number} = {
  'sepolia':11155111,
  'arbitrum':421613,
  'linea':59140,
  'optimism':420,
  'polygon':80001,
  'avalanche':43113,
  'bsc':97,
}

export default function Home() {
  const {address} = useAccount()
  const [to, setTo] = useState<string>();
  const {selected, select} = useNetworkStore();
  const { chain } = useNetwork();
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();


  const needSwitch = selected !== CHAIN_NETWORK_MAP[chain?.id || 11155111]
  console.log(needSwitch, selected, CHAIN_NETWORK_MAP[chain?.id || 11155111], chain?.id)

  const { config } = usePrepareContractWrite({
    address: ERC20_ADDRESS,
    abi: [{
      type: "function",
      name: "mint",
      stateMutability: "external",
      inputs: [{
          name: "receiver",
          type: "address",
      }, {
          name: "amount",
          type: "uint256",
      }],
      outputs: [],
    }],
    functionName: 'mint',
    args: [
      to || address, 
      parseEther('10')
    ]
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  }

  const handleMintButtonClick = () => {
    if(!write) return;
    try {
      write()
    } catch(err) {
      console.log(err);
    }
  }

  const handleSwitchButtonClick = () => {
    if(!switchNetwork) return;
    switchNetwork(NETWORK_CHAIN_MAP[selected]);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-4 bg-slate-100 py-8 px-16 ${inter.className}`}
    >
      <Head>
        <title>Dummy Tokens — EVM compatible dummy ERC20 token</title>
      </Head>
      <div>
        <h1 className='font-bold text-3xl'>Dummy Tokens</h1>
        <p>Your Web3 development needs</p>
        
      </div>
      <div className='bg-white flex flex-col gap-2 rounded-xl shadow-lg p-4'>
          <p>Available on</p>
          <div className='flex flex-row gap-2 justify-between'>
            <Network network='sepolia'/>
            <Network network='arbitrum'/>
            <Network network='linea'/>
            {/* <Network network='optimism'/>
            <Network network='avalanche'/>
            <Network network='polygon'/>
            <Network network='bsc'/> */}
          </div>
          <ConnectKitButton.Custom>
          {({ isConnected, isConnecting, show, hide, address, ensName, truncatedAddress, chain }) => {
            if(isConnected) return <button onClick={show} className='hover:bg-slate-600 transition-all rounded-lg px-4 py-2 bg-slate-500 text-white w-full'>{ensName || truncatedAddress}</button>;
            return <button onClick={show} className='hover:bg-slate-600 transition-all rounded-lg px-4 py-2 bg-slate-500 text-white w-full'>Connect</button>;
          }}
          </ConnectKitButton.Custom>
        </div>
      <div className='flex flex-col items-center gap-8 w-full justify-center'>
        <div className='bg-white shadow-lg w-fit rounded-xl flex flex-col gap-8 p-8'>
          <div className='flex flex-row justify-between'>
          <h1 className='font-bold text-3xl'>ERC20</h1>
          <div>
              <select value={selected} className='hover:bg-slate-600 transition-all cursor-pointer bg-slate-500 rounded-lg px-4 py-2 peer text-white' name="networks">
                <option value="sepolia">Sepolia</option>
                <option value="arbitrum">Arbitrum Goerli</option>
                <option value="linea">Linea Testnet</option>
                {/* <option value="optimism">Optimism Goerli</option>
                <option value="polygon">Polygon Mumbai</option>
                <option value="avalanche">Avalanche Fuji</option>
                <option value="bsc">BSC Testnet</option> */}
              </select>
            </div>
          </div>
          <div className='m-auto font-bold'>
            <span>Contract address</span>
            <CopyableText>{ERC20_ADDRESS}</CopyableText>
          </div>
          <div className='flex flex-row justify-between gap-4'>
            <input value={to} onChange={handleAddressChange} className='outline-none bg-transparent border rounded-lg px-4 py-2 w-full' placeholder='Address to mint to (optional)'/>
            <button onClick={needSwitch?handleSwitchButtonClick:handleMintButtonClick} className='hover:bg-slate-600 transition-all rounded-lg px-4 py-2 bg-slate-500 text-white w-64'>
              {needSwitch?'Switch Network':'Mint'}
            </button>
          </div>
        </div>

        <div className='flex flex-row gap-8'>
          <div className='bg-white shadow-lg w-fit h-full m-auto rounded-xl p-8'>
            <h1 className='font-bold text-3xl'>ERC721</h1>
            <div className='flex flex-row h-full align-middle justify-center'>
              <span className='m-auto'>Coming soon</span>
            </div>
          </div>

          <div className='bg-white shadow-lg w-fit h-full rounded-xl p-4 m-auto'>
            <div className='flex flex-col h-full align-middle justify-center gap-2'>
              <span className='text-xs'>If you find this website useful and want to support the development, would appreciate a cup of coffee {':)'}</span>
              <CopyableText>0x51dB80FeE873029a48e16d8DDF68aA59BEa4B658</CopyableText>
            </div>
          </div>
        </div>

        
      </div>
    </main>
  )
}
