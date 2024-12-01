import { roboto } from '@/app/fonts';
import { useState } from 'react';
import ConnectModal from './ConnectModal';
import { WalletIcon } from '@heroicons/react/24/outline';

const ConnectWallet = (props: any) => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => setisOpen(!isOpen)}
        className={` flex items-center  py-3 px-[1.25rem]
          place-items-center rounded-full gap-2 text-textPrimary
          font-medium text-base bg-primary ${roboto.variable} font-roboto`}
        {...props}
      >
        <div>
          <WalletIcon className="text-white w-6 h-6" />
        </div>
        CONNECT WALLET
      </button>

      {isOpen && (
        <ConnectModal isOpen={isOpen} onClose={() => setisOpen(false)} />
      )}
    </div>
  );
};

export default ConnectWallet;
