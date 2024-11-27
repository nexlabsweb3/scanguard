import { roboto } from '@/app/fonts';
import { BarcodeIcon } from '@/assets/icons';

const ScanButton = (props: any) => {
  return (
    <button
      className={`flex  h-14 py-2 px-6 justify-center
      items-center gap-2 border border-solid border-[#8E3B1E] rounded-2xl
      bg-[#232323] bg-blend-color-dodge`}
      {...props}
    >
      <p
        className={`${roboto.variable} text-textPrimary text-base font-medium font-roboto`}
      >
        SCAN PRODUCT
      </p>
      <BarcodeIcon />
    </button>
  );
};

export default ScanButton;
