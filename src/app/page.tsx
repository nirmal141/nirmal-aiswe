import MinimalNavigation from '../components/sections/MinimalNavigation';
import MinimalHero from '../components/sections/MinimalHero';

export default function Home() {
  return (
    <main className="bg-black text-white">
      <MinimalNavigation />
      <MinimalHero />
    </main>
  );
}