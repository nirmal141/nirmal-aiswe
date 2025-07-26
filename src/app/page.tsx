import MinimalNavigation from '../components/sections/MinimalNavigation';
import MinimalHero from '../components/sections/MinimalHero';
import MinimalStory from '../components/sections/MinimalStory';
import Projects from '@/components/sections/Projects'; // Keep existing
import Contact from '@/components/sections/Contact';   // Keep existing
import Footer from '@/components/layout/Footer';       // Keep existing
import ScrollProgress from '@/components/layout/ScrollProgress';

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <ScrollProgress />
      <MinimalNavigation />
      <MinimalHero />
      <div id="story">
        <MinimalStory />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}