'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import FlagProductModal from './FlagProductModal';
import { CheckmarkIcon, FlagIcon, NoticeIcon } from '@/assets/icons';

export default function ProductPreview({ productId }: { productId: string }) {
  const [isFlagging, setIsFlagging] = useState(false);

  interface Product {
    product_id: string;
    name: string;
    image: string;
    manufacturer: string;
    manufactureDate: string;
    expiryDate: string;
    trustScore: any;
    authenticityStatus: string;
    reportedIssues: string;
    timesScanned: string;
    batchNumber: number;
    dateOfScan: string;
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/scan/${productId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch product details');
        }
        console.log(data);
        if (data.success && data.product) {
          setProduct(data.product);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch product details'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
  console.log(product);
  const formattedManufactureDate = 'lorem'; // new Date(product.manufactureDate).toLocaleDateString();
  const formattedExpiryDate = 'lorem'; //new Date(product.expiryDate).toLocaleDateString();

  return (
    <div className="pt-[64px]">
      {isFlagging &&
        createPortal(
          <FlagProductModal
            setOpen={() => {
              setIsFlagging(false);
            }}
            product_id={productId}
          />,
          document.body
        )}
      <div className="w-full max-w-6xl relative lg:bg-[#1E1E1E] rounded-3xl p-6 lg:p-[88px] text-white mx-auto lg:border-[1px] border-[#303030] grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-[80px] items-stretch">
        <Image
          src="/productEllipse.svg"
          alt=""
          className="absolute hidden lg:flex top-[-30px] left-[60px] z-[1]"
          width={100}
          height={100}
        />
        {/* Product Image Section */}
        <div className="z-10">
          <div className=" h-[402px] flex items-center justify-center">
            <Image
              src={product?.image || '/placeholder.png'} // Add a fallback image
              alt={product?.name ? product?.name : 'Product Image'}
              className="h-full"
              width={300}
              height={402}
              objectFit="contain"
            />
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-3 gap-x-[9px] mt-12">
            <div className="bg-[#232323] border-[1px] border-[#303030] rounded-2xl py-5 relative flex flex-col items-center">
              {product?.trustScore <= 30 && (
                <NoticeIcon className="absolute top-[-12px] right-3" />
              )}
              {product?.trustScore > 80 && (
                <CheckmarkIcon className="absolute top-[-12px] right-3" />
              )}
              <h3 className="text-sm leading-4 text-[#F9F9F9] mb-2">
                Trust Score
              </h3>
              <div
                className={`text-[24px] md:text-[32px] md:leading-[39px] font-semibold ${
                  product?.trustScore <= 30 && 'text-[#FF2828]'
                } ${
                  product?.trustScore > 30 &&
                  product?.trustScore <= 80 &&
                  'text-[#F9F9F9]'
                } ${product?.trustScore > 80 && 'text-[#28FF37]'}`}
              >
                {product?.trustScore}%
              </div>
            </div>

            <div className="bg-[#232323] border-[1px] border-[#303030] rounded-2xl py-5 relative flex flex-col items-center">
              <h3 className="text-sm leading-4 text-[#F9F9F9] mb-2">
                Scan Count
              </h3>
              <div className="text-[24px] md:text-[32px] md:leading-[39px] font-semibold text-[#F9F9F9]">
                9
              </div>
            </div>

            <div className="bg-[#232323] border-[1px] border-[#303030] rounded-2xl py-5 relative flex flex-col items-center">
              <h3 className="text-sm leading-4 text-[#F9F9F9] mb-2">
                No. Of Flags
              </h3>
              <div className="text-[24px] md:text-[32px] md:leading-[39px] font-semibold text-[#F9F9F9]">
                1
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="bg-[#232323] border-[#303030] z-10 border-[1px] rounded-[24px] px-6 pt-12 pb-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl leading-6 font-medium text-[#F9F9F9] mb-2">
                {product?.name}
              </h2>
              <h5 className="text-base leading-6 text-[#ACACAC]">
                Authenticity status:{' '}
                <span className="text-[#F9F9F9]">
                  {product?.authenticityStatus}
                </span>
              </h5>
            </div>
            <button
              className="bg-transparent p-4 rounded-xl flex items-center border-[#303030] border-[1px] justify-center gap-1 mt-2"
              onClick={() => setIsFlagging(true)}
            >
              <FlagIcon className="w-4 h-4" />
              <span className="text-base leading-6 text-[#ACACAC]">FLAG</span>
            </button>
          </div>

          <div className="py-4 border-y-[1px] border-y-[#303030] flex flex-col gap-y-4 mb-4">
            <h4 className="text-base leading-6 text-[#ACACAC]">
              Manufacturer:
              <span className="text-[#F9F9F9]"> {product?.manufacturer}</span>
            </h4>
            <h4 className="text-base leading-6 text-[#ACACAC]">
              Date of Scan:
              <span className="text-[#F9F9F9]"> {product?.dateOfScan}</span>
            </h4>
            <h4 className="text-base leading-6 text-[#ACACAC]">
              Batch Number:
              <span className="text-[#F9F9F9]"> {product?.batchNumber}</span>
            </h4>
          </div>
          <div className="py-4 flex flex-col gap-y-4 mb-[30px] border-b-[1px] border-b-[#303030]">
            <h4 className="text-base leading-6 text-[#ACACAC]">
              Times Scanned:
              <span className="text-[#F9F9F9]">
                {' '}
                {product?.timesScanned} times
              </span>
            </h4>
            <h4 className="text-base leading-6 text-[#ACACAC]">
              Trust Score:
              <span className="text-[#F9F9F9]"> {product?.trustScore}/100</span>
            </h4>
            <h4 className="text-base leading-6 text-[#ACACAC]">
              Reported Issues:
              <span className="text-[#F9F9F9]">
                {' '}
                {product?.reportedIssues} flags
              </span>
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-x-4 text-base leading-6 text-[#F9F9F9]">
            <button className="bg-transparent border-[#303030] border-[1px] px-3 py-4 rounded-xl">
              REVIEW
            </button>
            <button className="bg-[#FF6028] px-3 py-4 rounded-xl">CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
