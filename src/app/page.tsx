'use client';

import MinimalNavigation from '../components/sections/MinimalNavigation';
import MinimalHero from '../components/sections/MinimalHero';
import MinimalStory from '../components/sections/MinimalStory';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <MinimalNavigation />
      <MinimalHero />
      <MinimalStory />
      <Projects />
      <Contact />
    </main>
  );
}