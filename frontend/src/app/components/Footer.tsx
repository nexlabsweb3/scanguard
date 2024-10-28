import { Github, Telegram, Twitter } from "@/assets/landing-page";
import { poppins, roboto } from "../fonts";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#171717]">
      <div className="container mx-auto">
        <h5
          className={`${poppins.variable} text-center text-textPrimary
          text-[2rem] leading-[6rem] font-medium`}
        >
          Get in touch with us. We&apos;re here to assist you.
        </h5>
        <div className="flex justify-between items-center">
          <p
            className={`${roboto.variable} text-textPrimary text-base
            capitalize font-normal font-roboto max-w-[11rem]`}
          >
            Promoting Authenticity, one scan at a time.
          </p>
          <div className="my-6">
            <p
              className={`${roboto.variable} text-center text-textPrimary font-normal text-base `}
            >
              Join our community
            </p>
            <FooterIcons />
          </div>
        </div>
        <p
          className={`${roboto.variable} text-textFaded text-base
          capitalize text-center font-normal font-roboto pb-6`}
        >
          ScanGuard. All rights reserved
        </p>
      </div>
    </footer>
  );
};

const FooterIcons = () => (
  <div className="flex gap-4 mt-2">
    {[
      { url: "/twitter", icon: <Twitter /> },
      { url: "/telegram", icon: <Telegram /> },
      { url: "/github", icon: <Github /> },
    ].map(({ url, icon }) => (
      <div
        key={url}
        className="grid place-items-center w-12 h-12 border border-textFaded rounded-lg"
      >
        <Link href={url}>{icon}</Link>
      </div>
    ))}
  </div>
);

export default Footer;
