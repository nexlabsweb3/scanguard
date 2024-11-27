'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from '@starknet-react/core';
import {
  DiscordIcon,
  LearnmoreIcon,
  MenuIcon,
  ScanIcon,
  TelegramIcon,
  TwitterIcon,
} from '@/assets/icons';
import AddressBar from '@/components/Addressbar';
import ScanProduct from '@/components/Scan';
import ConnectModal from '@/components/ConnectModal';
import { useParams } from 'next/navigation';
import ProductPreview from '@/components/ProductPreview';

export default function ScanPage() {
  const { address } = useAccount();
  const [open, setOpen] = useState<boolean>(false);
  const [openConnectedModal, setOpenConnectedModal] = useState(false);

  const toggleUserModal = () => {
    setOpenConnectedModal((prev) => !prev);
  };

  const params = useParams();
  let product = params?.product;

  useEffect(() => {
    if (product != null) {
      setOpen(true);
    }
  }, [product]);

  return (
    <main className=" w-full md:h-fit bg-product-overview-mobile md:bg-product-overview bg-no-repeat bg-cover bg-center pb-[80px]">
      <header className="lg:bg-hero bg-hero-2  bg-no-repeat bg-cover">
        <nav className="flex px-5 md:px-20 py-5  items-center justify-between lg:backdrop-brightness-50 ">
          <Link
            href="/"
            className="text-white font-lato hidden lg:block  font-extrabold text-2xl"
          >
            ScanGaurd
          </Link>
          <div className="lg:hidden block">
            <MenuIcon />
          </div>
          <div className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-white font-lato  text-sm  font-normal"
            >
              Home
            </Link>
            <a href="#" className="text-white font-lato  text-sm font-normal ">
              About
            </a>
            <a href="#" className="text-white font-lato  text-sm font-normal">
              Producers
            </a>
          </div>

          <div className=" flex gap-5">
            <div className="" onClick={() => setOpen((prev) => !prev)}>
              <ScanIcon />
            </div>

            {!address ? (
              <button
                onClick={toggleUserModal}
                className="bg-white px-3 py-2 font-lato  rounded-full text-black text-sm border border-white"
              >
                Launch App
              </button>
            ) : (
              <AddressBar setOpenConnectedModal={setOpenConnectedModal} />
            )}
          </div>
        </nav>
      </header>
      {/* Product Preview 
			//TODO: center, add background, make it responsive and pixel perfect
			//TODO: https://www.figma.com/design/dwXPww5jcUl55azC9EQ8H0/SCANGUARD?node-id=14-13&node-type=canvas&t=Q8gtO0EqfOBYEqke-0
			*/}
      <ProductPreview productId="product" />
      {open && <ScanProduct />}

      <ConnectModal isOpen={openConnectedModal} onClose={toggleUserModal} />
    </main>
  );
}
