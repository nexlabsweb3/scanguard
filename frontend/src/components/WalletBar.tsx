'use client';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useAccount, useDisconnect } from '@starknet-react/core';
import { useMemo } from 'react';

function WalletConnected() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <div
      onClick={() => disconnect()}
      className="bg-primary cursor-pointer flex items-center gap-x-2 rounded-full px-5 py-3"
    >
      <div>
        <UserCircleIcon className="text-white w-6 h-6" />
      </div>
      <span className="text-white">{shortenedAddress}</span>
    </div>
  );
}

function ConnectWallet() {
  return (
    <div>
      <span>Choose a wallet: </span>
    </div>
  );
}

export default function WalletBar() {
  const { address } = useAccount();

  return address ? <WalletConnected /> : <ConnectWallet />;
}
