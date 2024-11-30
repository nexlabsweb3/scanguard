'use client';

import ContentSection from '@/components/ContentSection';
import HeroSection from '@/components/HeroSection';
import { useRouter } from 'next/navigation';
import Layout from './Home/layout';

export default function Home() {
  const router = useRouter();

  return <Layout>
    <HeroSection />
    <ContentSection />
  </Layout>
}
