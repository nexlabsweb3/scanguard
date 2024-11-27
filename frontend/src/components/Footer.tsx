import Link from 'next/link';
import { GithubIcon, TelegramIcon, TwitterIcon } from '@/assets/icons';
import { poppins, roboto } from '@/app/fonts';

const Footer = () => (
  <footer className="bg-[#303030] lg:bg-[#171717]">
    <div className="container mx-auto pt-12 px-6 lg:p-0 lg:px-4">
      {/* <div className="mt-12" /> */}
      <h5
        className={`${poppins.variable} text-center text-textPrimary
          mb-6 lg:my-0 text-2xl font-medium
          lg:text-[2rem] lg:leading-[6rem] lg:font-medium font-roboto`}
      >
        Get in touch with us. We&apos;re here to assist you.
      </h5>
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
        <p
          className={`${roboto.variable} text-textPrimary text-base lg:text-left
            capitalize font-normal font-roboto max-w-[12rem] text-center`}
        >
          Promoting Authenticity, one scan at a time.
        </p>
        <div className="my-6">
          <p
            className={`${roboto.variable} text-center text-textPrimary font-normal text-base`}
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

const FooterIcons = () => (
  <div className="flex gap-4 mt-2">
    {[
      { url: 'https://x.com/SgOnStarknet', icon: <TwitterIcon /> },
      { url: 'https://t.me/+p5JGJ4C8lCw5NjNk', icon: <TelegramIcon /> },
      { url: 'https://github.com/nexlabsweb3/scanguard', icon: <GithubIcon /> },
    ].map(({ url, icon }) => (
      <div
        key={url}
        className="grid place-items-center w-12 h-12 border border-textFaded rounded-lg"
      >
        <Link href={url} target="_blank">
          {icon}
        </Link>
      </div>
    ))}
  </div>
);

export default Footer;
