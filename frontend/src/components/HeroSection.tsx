import { PhoneImage, PhoneImageMobile } from '@/assets/landing-page';
import { poppins, roboto } from '../app/fonts';
import ScanButton from './ScanButton';

const HeroSection = () => (
  <div className="relative px-6 md:px-0">
    <div className="flex flex-col justify-center items-center gap-6">
      <HeroCTA />
      <HeroImage />
    </div>
    <SocialProof />
  </div>
);

const HeroCTA = (props: any) => (
  <div className="flex flex-col justify-center items-center gap-6 max-w-lg">
    <div
      className={`${poppins.variable} text-secondary dark:text-textPrimary
        text-center text-5xl font-medium font-poppins`}
    >
      <h1 className="hidden md:block">
        Ensuring Authenticity, One Scan at a Time
      </h1>
      <h1 className={`text-2xl md:hidden`}>
        Ensuring Authenticity, <br /> One Scan at a Time
      </h1>
    </div>
    <div
      className={`${roboto.variable} text-secondary/70 dark:text-textFaded text-center
      text-base font-normal leading-7 font-roboto`}
    >
      <p className="hidden md:block">
        This is a shared liquidity market smart contract which{' '}
        <br className="hidden md:block" /> is used by multiple website to
        provide the users the <br className="hidden md:block" /> best possible
        experience.
      </p>
      <p className="md:hidden">
        This is a shared liquidity market smart <br /> contract which is used by
        multiple <br /> website to provide the users the best <br /> possible
        experience.
      </p>
    </div>
    <ScanButton />
  </div>
);

const HeroImage = () => (
  <div className="">
    <PhoneImage className="hidden lg:block" />
    <PhoneImageMobile className="lg:hidden" />
  </div>
);

const SocialProof = () => (
  <div className="flex justify-center items-center shadow-2xl rounded-2xl mb-4 mt-6 md:mt-0">
    {['Users', 'Products', 'Producers'].map((name, index, array) => (
      <SocialProofItem
        key={name}
        name={name}
        display={index != array.length - 1}
      />
    ))}
  </div>
);

const SocialProofItem = (props: any) => (
  <div className="flex flex-col h-36 items-center justify-center p-6 relative">
    <p
      className={`${roboto.variable} text-xs md:text-base text-textPrimary
          font-normal font-roboto capitalize`}
    >
      {props.name}
    </p>
    <p
      className={`${poppins.variable} text-[#FF6028] font-bold text-3xl
          md:text-[2.5rem] uppercase font-poppins`}
    >
      100+
    </p>
    {props.display && (
      <div className="w-1 h-12 opacity-10 bg-[#ff6029] rounded-sm absolute top-1/3 right-0" />
    )}
  </div>
);

export default HeroSection;
