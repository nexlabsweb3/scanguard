'use client';

import ContentSection from '@/components/ContentSection';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <main className="">
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
