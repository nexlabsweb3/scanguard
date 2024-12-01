import Image from 'next/image';
import GenericModal from './GenericModal';
import { Connector, useConnect } from '@starknet-react/core';
import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const loader = ({ src }: { src: string }) => {
  return src;
};

const Wallet = ({
  name,
  alt,
  src,
  connector,
  closeModal,
}: {
  name: string;
  alt: string;
  src: string;
  connector: Connector;
  closeModal: () => void;
}) => {
  const { connect } = useConnect();
  const isSvg = src?.startsWith('<svg');

  function handleConnectWallet(e: React.MouseEvent<HTMLButtonElement>): void {
    connect({ connector });
    closeModal();
    localStorage.setItem('lastUsedConnector', connector.name);
  }

  return (
    <button
      className="flex  gap-x-4  gap-y-6 w-full hover:border-[0.5px]  p-3 hover:bg-[#F64F14] hover:p-3 hover:rounded-[8px]  hover:border-[#F64F14] items-center   transition-all cursor-pointer"
      onClick={(e) => handleConnectWallet(e)}
    >
      <div className="h-[2.2rem] w-[2.2rem] ">
        {isSvg ? (
          <div
            className="h-full w-full object-cover "
            dangerouslySetInnerHTML={{
              __html: src ?? '',
            }}
          />
        ) : (
          <Image
            alt={alt}
            loader={loader}
            src={src}
            width={70}
            height={70}
            className="h-full w-full object-cover rounded-[5px]"
          />
        )}
      </div>
      <p className=" text-white text-capitalize">{`Connect ${name}`}</p>
    </button>
  );
};

const ConnectModal = ({ isOpen, onClose }: Props) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);
  const { connectors } = useConnect();
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      animate={animate}
      className={` text-white `}
    >
      <div className="flex p-4 w-full lg:p-0 ">
        <div className="basis-5/6 lg:col-span-2  l lg:py-4 lg:pl-8">
          <h2 className="text-center my-4 lg:text-start font-bold text-white text-[1.125em]">
            Connect Wallet
          </h2>
        </div>
        <div className="ml-auto lg:col-span-3 lg:py-4 lg:pr-8">
          <button
            onClick={onClose}
            className="w-8 h-8  grid place-content-center rounded-full bg-secondary  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex  flex-col flex-1 justify-between  ">
        <div className="px-8 ">
          <div className="flex  flex-col gap-4 py-4">
            {connectors.map((connector, index) => (
              <Wallet
                closeModal={onClose}
                key={connector.id || index}
                src={connector.icon.toString()!}
                name={connector.name}
                connector={connector}
                alt="alt"
              />
            ))}
          </div>
        </div>
      </div>
    </GenericModal>
  );
};

export default ConnectModal;
