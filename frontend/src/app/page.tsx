'use client';

import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import NavBar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/Home');
  });
  return <main className=""></main>;
}
