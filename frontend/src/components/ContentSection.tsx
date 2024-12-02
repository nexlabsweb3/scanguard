import {
  ContentCTAArtDirection,
  ContentEdgeArtDirection,
  EdgeUnderline,
  EdgeUnderLineMobile,
  ScanGuardEdge,
  ScanGuardEdgeMobile,
  ScanList,
  ScanListMobile,
} from '@/assets/landing-page';
import ScanButton from './ScanButton';
import { poppins, roboto } from '@/app/fonts';

const ContentSection = () => (
  <section className="">
    <div className="bg-manufacturer-bg bg-cover bg-center py-10">
      <div className="container mx-auto">
        <ContentHeader />
        <ContentCTA />
        <ContentCTAMobile />
      </div>
    </div>
    <div className="bg-HeroBottomBg bg-cover">
      <div className="mx-auto container">
        <GuideContent />
      </div>
    </div>
  </section>
);

const ContentHeader = () => (
  <div className="my-28 text-center px-4 md:px-0">
    <div
      className={`${poppins.variable} text-center text-secondary dark:text-textPrimary mb-6`}
    >
      <h2
        className={`${poppins.variable} hidden md:block md:text-2xl lg:text-4xl
          font-semibold font-poppins`}
      >
        Introducing ScanGuard, a trusted platform designed to{' '}
        <br className="hidden md:block" /> safeguard consumers from counterfeit
        goods <br className="hidden md:block" /> with blockchain technology
      </h2>
      <h2
        className={`${poppins.variable} text-2xl font-medium leading-9 md:hidden font-poppins`}
      >
        Introducing ScanGuard, a <br /> trusted platform designed to <br />{' '}
        safeguard consumers from <br /> counterfeit goods <br /> with blockchain
        technology
      </h2>
    </div>
    <div>
      <p
        className={`${roboto.variable} hidden md:block text-secondary/70 dark:text-textFaded text-base font-normal font-roboto`}
      >
        SCANGUARD is a project aiming to protect consumers from counterfeit
        products by allowing easy authentication with a{' '}
        <br className="hidden lg:block" /> QR code scan. Why? Because the rise
        of counterfeit products is exploiting trusted brands, damaging
        reputations, and <br className="hidden lg:block" />
        even risking your health. You deserve better, don’t you think?
      </p>
      <p
        className={`${roboto.variable} md:hidden text-textFaded text-base font-normal font-roboto`}
      >
        SCANGUARD is a project aiming to protect consumers from counterfeit
        products by allowing easy authentication with a QR code scan. <br />
        <br /> Why? Because the rise of counterfeit products is exploiting
        trusted brands, damaging reputations, and even risking your health. You
        deserve better, don’t you think?
      </p>
    </div>
  </div>
);

const ContentCTA = () => (
  <div
    className={`hidden lg:grid place-items-center lg:py-16
    shadow-2xl rounded-2xl lg:my-28 bg-[#232323]`}
  >
    <div className="grid grid-cols-2 lg:max-w-[50rem]">
      <VideoComponent />
      <div
        className={`flex flex-col items-center justify-center gap-6
        text-textFaded ${roboto.variable} text-base text-center font-roboto`}
      >
        <div className="grid gap-8">
          <h2 className="text-3xl font-bold text-textPrimary-light dark:text-textPrimary">
            How It Works
          </h2>
          <p className="text-textFaded-light dark:text-textFaded">
            Simple steps to verify product authenticity
          </p>
        </div>
        <AuthenticityParagraph />
        <ScanButton />
      </div>
    </div>
  </div>
);

const ContentCTAMobile = () => (
  <div
    className={`lg:hidden relative flex flex-col justify-center place-items-center
    text-textFaded ${roboto.variable} text-base text-center font-roboto`}
  >
    <div className="mb-6">
      <h3
        className={`${poppins.variable} text-textPrimary text-2xl text-center
      font-semibold mb-1 font-poppins`}
      >
        HOW IT WORKS
      </h3>
      <p className={`${roboto.variable} font-roboto`}>
        Super easy steps to use scanguard
      </p>
    </div>
    <VideoComponent />
    <AuthenticityParagraph />
    <ScanButton />
    <div className="absolute bottom-4 right-1 md:hidden">
      <ContentCTAArtDirection />
    </div>
  </div>
);

const VideoComponent = () => (
  <div className="w-[22rem] h-[31rem] lg:h-[36.5rem] rounded-2xl">
    <iframe
      className="w-full h-full rounded-2xl"
      src="https://www.youtube.com/embed/j99jT-Ljusg"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

const AuthenticityParagraph = () => (
  <p
    className={`mt-4 mb-6 md:mt-0 md:mb-0
    ${roboto.variable} font-roboto p-8`}
  >
    It’s super simple. Just switch to your phone camera and scan the barcode or
    QR code of the product to check it’s authenticity.
  </p>
);

const GuideContent = () => (
  <div
    className={`relative flex flex-col lg:flex-row justify-center
      items-center gap-6 lg:gap-32 mb-28 px-8
      shadow-2xl rounded-2xl bg-[#232323] py-12
      lg:shadow-none lg:rounded-none lg:bg-inherit lg:py-0`}
  >
    <div className="flex-1 flex flex-col gap-6">
      <GuideContentHeader />
      <GuideContentHeaderMobile />
      <p
        className={`${roboto.className} text-base text-textFaded font-normal text-center lg:text-left`}
      >
        ScanGuard runs on the blockchain technology allowing relevant data about
        products used on a daily basis; production date, distribution, and
        expiration date, to be immutable and safely stored.
      </p>
    </div>
    <GuideContentImage />
    <div className="absolute bottom-16 left-1 md:hidden">
      <ContentEdgeArtDirection />
    </div>
  </div>
);

const GuideContentHeader = () => (
  <div className="hidden lg:block">
    <h4
      className={`${poppins.variable} text-2xl lg:text-[2.5rem] text-textPrimary-light dark:text-textPrimary
      capitalize font-semibold`}
    >
      The edge ScanGuard offers
    </h4>
    <EdgeUnderline />
  </div>
);

const GuideContentHeaderMobile = () => (
  <div className="grid place-items-center lg:hidden">
    <div>
      <h4
        className={`${poppins.variable} text-2xl lg:text-[2.5rem] text-textPrimary-light dark:text-textPrimary
        capitalize font-semibold text-center`}
      >
        The edge <br /> ScanGuard offers
      </h4>
      <EdgeUnderLineMobile />
    </div>
  </div>
);

const GuideContentImage = () => (
  <div className="flex-1 float-left relative w-full ml-14 sm:ml-0 md:w-auto">
    <div>
      <div className="hidden lg:block">
        <ScanGuardEdge />
      </div>
      <div className="lg:hidden">
        <ScanGuardEdgeMobile />
      </div>
    </div>
    <div className="absolute bottom-0 left-20 lg:left-32 lg:top-16 lg:right-0 xl:top-16 xl:left-[13rem]">
      <div className="hidden lg:block">
        <ScanList />
      </div>
      <div className="lg:hidden">
        <ScanListMobile />
      </div>
    </div>
  </div>
);

export default ContentSection;
