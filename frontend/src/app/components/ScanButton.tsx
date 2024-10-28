import { BarcodeScanner } from "@/assets/landing-page";
import { roboto } from "../fonts";

const ScanButton = (props: any) => {
  return (
    <button
      className={`flex  h-14 py-2 px-6 justify-center
      items-center gap-2 border border-solid border-[#8E3B1E] rounded-2xl
      bg-[#232323] bg-blend-color-dodge`}
      {...props}
    >
      <p
        className={`${roboto.variable} text-textPrimary text-base font-medium `}
      >
        SCAN PRODUCT
      </p>
      <BarcodeScanner />
    </button>
  );
};

export default ScanButton;
