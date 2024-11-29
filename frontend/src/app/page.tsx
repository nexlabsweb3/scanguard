'use client';

import ContentSection from '@/components/ContentSection';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <main className="">
      <section className='bg-mainBg bg-cover pt-36 pb-5'>
        <header className="container mx-auto">
          <HeroSection />
        </header>
      </section>
      <main className="">
        <ContentSection />
      </main>
    </main>
  );
}