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
