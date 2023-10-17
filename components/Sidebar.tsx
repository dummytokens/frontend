import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import Link from "next/link";
import logo from '@/public/logo.svg';

export function Sidebar() {
    return <div className="bg-slate-300 w-1/5 h-screen p-8 flex flex-col gap-4">
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
}