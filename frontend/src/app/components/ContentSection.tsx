import { ScanGuardEdge, ScanList } from "@/assets/landing-page";
import { poppins, roboto } from "../fonts";
import ScanButton from "./ScanButton";

const ContentSection = () => {
  return (
    <section>
      <div>
        <ContentHeader />
        <ContentCTA />
        <GuideContent />
      </div>
    </section>
  );
};

const ContentHeader = () => (
  <div className="my-28 text-center">
    <h2
      className={`${poppins.variable} text-center text-textPrimary
      text-[40px] leading-[54px] font-semibold`}
    >
      Introducing ScanGuard, a trusted platform designed to safeguard consumers
      from counterfeit goods with blockchain technology
    </h2>
    <p className={`${roboto.variable} text-textFaded text-base font-normal`}>
      SCANGUARD is a project aiming to protect consumers from counterfeit
      products by allowing easy authentication with a QR code scan. Why? Because
      the rise of counterfeit products is exploiting trusted brands, damaging
      reputations, and even risking your health. You deserve better, don’t you
      think?
    </p>
  </div>
);

const ContentCTA = () => (
  <div className="grid place-items-center py-16 shadow-2xl rounded-2xl my-28">
    <div className="grid grid-cols-2 lg:max-w-[50rem]">
      <div className="lg:w-[22rem] h-[36.5rem] rounded-2xl">
        <video controls className="w-full h-full object-cover rounded-2xl">
          <source src="" type="" />
        </video>
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-6
        text-textFaded ${roboto.variable} text-base text-center`}
      >
        <div>
          <h3
            className={`${poppins.variable} text-textPrimary text-2xl text-center font-semibold mb-1`}
          >
            HOW IT WORKS
          </h3>
          <p>Super easy steps to use scanguard</p>
        </div>
        <p>
          It’s super simple. Just switch to your phone camera and scan the
          barcode or QR code of the product to check it’s authenticity.
        </p>
        <ScanButton />
      </div>
    </div>
  </div>
);

const GuideContent = () => (
  <div className="grid grid-cols-2 gap-32 place-items-center my-28">
    <div>
      <h4
        className={`${poppins.variable} text-[2.5rem] text-textPrimary capitalize font-semibold`}
      >
        The edge ScanGuard offers
      </h4>
      <p className={`${roboto.className} text-base text-textFaded font-normal`}>
        ScanGuard runs on the blockchain technology allowing relevant data about
        products used on a daily basis; production date, distribution, and
        expiration date, to be immutable and safely stored.
      </p>
    </div>
    <div className="flex justify-center items-center">
      <ScanGuardEdge />
      <ScanList />
    </div>
  </div>
);

export default ContentSection;
