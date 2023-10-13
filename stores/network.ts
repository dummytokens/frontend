import { create } from 'zustand';
import { NetworkType } from '@/components/Network';

export interface NetworkStore {
  selected: NetworkType;
  select: (selected: NetworkType) => void;
}

const useNetworkStore = create<NetworkStore>((set, get) => ({
  selected: 'sepolia',
  select: (selected) => set({ selected }),
}));

export default useNetworkStore;
