import { BrandImage } from "@/assets/landing-page";
import { roboto } from "../fonts";
import Link from "next/link";

const NavBar = (props: any) => {
  return (
    <nav
      className={`${roboto.variable} flex items-center justify-between
        px-20 xl:px-0 2xl:px-0 py-4 mb-12`}
      {...props}
    >
      <div className="flex items-center gap-14">
        <Link href="/">
          <BrandImage />
        </Link>
        <ul
          className={`text-sm text-textPrimary leading-normal
            uppercase hidden py-3 gap-6 items-center lg:flex`}
        >
          <li className="border-r-2 border-primary/[.12] pr-6">
            <Link href="/">HOME</Link>
          </li>
          <li className="border-r-2 border-primary/[.12] pr-6">
            <Link href="/about">ABOUT</Link>
          </li>
          <li>
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>
      </div>
      <div>
        <button
          className={`w-[12.5rem] h-14 grid py-2 px-[1.25rem]
              place-items-center rounded-2xl gap-2 text-textPrimary
              font-medium text-base bg-primary`}
        >
          CONNECT WALLET
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
