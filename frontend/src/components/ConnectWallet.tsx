import { roboto } from '@/app/fonts';
import { useState } from 'react';
import ConnectModal from './ConnectModal';

const ConnectWallet = (props: any) => {
  const [isOpen, setisOpen] = useState<boolean>(false)
  return (
    <div>
      <button
        onClick={() => setisOpen(!isOpen)}
        className={`w-[12.5rem] h-14 grid py-2 px-[1.25rem]
          place-items-center rounded-2xl gap-2 text-textPrimary
          font-medium text-base bg-primary ${roboto.variable} font-roboto`}
        {...props}
      >
        CONNECT WALLET
      </button>

      {
        isOpen && <ConnectModal isOpen={isOpen} onClose={() => setisOpen(false)} />
      }

    </div>
  );
};

export default ConnectWallet;
