'use client';


import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import Dashboard from './dashboard/page';


export default function Home() {
  return (
    <main className="">
      <div>
        <header className="container mx-auto">
          <HeroSection />
        </header>
        <Dashboard/>
      </div>
      <main className="container mx-auto">
        <ContentSection />
      </main>
    </main>
  );
}
