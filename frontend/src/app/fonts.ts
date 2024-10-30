import { Bowlby_One, Poppins, Roboto } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});
export const bowlby_one = Bowlby_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bowlby",
});
