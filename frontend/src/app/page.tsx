"use client";

import HeroSection from "./components/HeroSection";
import ContentSection from "./components/ContentSection";

export default function Home() {
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
