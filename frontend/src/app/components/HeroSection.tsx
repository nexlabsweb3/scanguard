import { PhoneImage, PhoneImageMobile } from "@/assets/landing-page";
import { poppins, roboto } from "../fonts";
import ScanButton from "./ScanButton";

const HeroSection = (props: any) => {
  return (
    <div className="relative">
      <div
        className="flex flex-col justify-center items-center gap-6"
        {...props}
      >
        <HeroCTA />
        <HeroImage />
      </div>
      <SocialProof />
    </div>
  );
};

const HeroCTA = () => (
  <div className="flex flex-col justify-center items-center gap-6 max-w-lg">
    <h1
      className={`${poppins.variable} text-textPrimary
    text-center text-5xl font-medium`}
    >
      Ensuring Authenticity, One Scan at a Time
    </h1>
    <p
      className={`${roboto.variable} text-textFaded text-center
    text-base font-normal leading-7`}
    >
      This is a shared liquidity market smart contract which is used by multiple
      website to provide the users the best possible experience.
    </p>
    <ScanButton />
  </div>
);

const HeroImage = () => (
  <div>
    <PhoneImage className="hidden lg:block" />
    <PhoneImageMobile className="lg:hidden" />
  </div>
);

const SocialProof = () => (
  <div className="flex justify-center items-center shadow-2xl rounded-2xl mb-4">
    {["Users", "Products", "Producers"].map((name) => (
      <SocialProofItem key={name} name={name} />
    ))}
  </div>
);

const SocialProofItem = (props: any) => {
  return (
    <div className="flex flex-col h-36 items-center justify-center p-6">
      <p
        className={`${roboto.variable} text-base text-textPrimary font-normal`}
      >
        {props.name}
      </p>
      <p
        className={`${poppins.variable} text-[#FF6028] font-bold text-[2.5rem] uppercase`}
      >
        100+
      </p>
    </div>
  );
};

export default HeroSection;
