import Image from 'next/image';
import optimism from '@/public/optimism-ethereum-op-logo.svg';
import arbitrum from '@/public/arbitrum-arb-logo.svg';
import polygon from '@/public/polygon-matic-logo.svg';
import avalanche from '@/public/avalanche-avax-logo.svg';
import sepolia from '@/public/ethereum-eth-logo.svg';
import bsc from '@/public/bnb-bnb-logo.svg';
import linea from '@/public/linea.svg';
import base from '@/public/base.svg';
import scroll from '@/public/scroll.png';
import { useNetwork } from 'wagmi';
import useNetworkStore from '@/stores/network';

export type NetworkType =
  | 'sepolia'
  | 'arbitrum'
  | 'linea'
  | 'optimism'
  | 'polygon'
  | 'avalanche'
  | 'bsc'
  | 'base'
  | 'scroll';

const ICON: { [key: string]: any } = {
  sepolia: sepolia,
  arbitrum: arbitrum,
  linea: linea,
  optimism: optimism,
  polygon: polygon,
  avalanche: avalanche,
  bsc: bsc,
  base: base,
  scroll: scroll,
};

interface Props {
  network: NetworkType;
}

export default function Network({ network }: Props) {
  const { select, selected } = useNetworkStore();
  const isSelected = network === selected;
  return (
    <div
      onClick={() => select(network)}
      className={`
        active:scale-95 rounded-full align-middle p-1
        border-4 ${
          isSelected
            ? 'border-slate-500'
            : 'border-slate-500/10 hover:border-slate-500'
        } 
        cursor-pointer transition-all w-8 h-8 
    `}
    >
      <Image
        className="m-auto align-middle w-full h-full"
        src={ICON[network]}
        alt={network}
      />
    </div>
  );
}
