"use client";
import {
  DiscordIcon,
  LearnmoreIcon,
  MenuIcon,
  ScanIcon,
  TelegramIcon,
  TwitterIcon,
} from "../assets/icons";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { useContractWrite, useWaitForTransaction } from "@starknet-react/core";
import { useAccount } from "@starknet-react/core";
import { useParams } from "next/navigation";
import AddressBar from "@/components/Addressbar";
import ConnectModal from "@/components/ConnectModal";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ContentSection from "./components/ContentSection";
import Footer from "./components/Footer";

export default function Home() {
  const { address } = useAccount();
  const [openConnectedModal, setOpenConnectedModal] = useState(false);

  const toggleUserModal = () => {
    setOpenConnectedModal((prev) => !prev);
  };

  return (
    <main>
      <div>
        <header className="container mx-auto">
          <HeroSection />
        </header>
      </div>
      <main className="container mx-auto">
        <ContentSection />
      </main>
    </main>
  );
}
