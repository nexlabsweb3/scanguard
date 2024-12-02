'use client';

import ContentSection from '@/components/ContentSection';
import HeroSection from '@/components/HeroSection';
import { useRouter } from 'next/navigation';
import Layout from './Home/layout';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <main className="">
        <section className="bg-mainBg bg-cover lg:pt-36 pb-5">
          <header className="container mx-auto">
            <HeroSection />
          </header>
        </section>
        <main className="">
          <ContentSection />
        </main>
      </main>
    </Layout>
  );
}
