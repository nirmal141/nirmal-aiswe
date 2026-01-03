import MinimalNavigation from '../../components/sections/MinimalNavigation';
import MinimalStory from '../../components/sections/MinimalStory';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { Smoke } from '@/components/ui/smoke';

export default function StoryPage() {
  return (
    <main className="relative min-h-screen text-white">
      <ScrollProgress />
      
      {/* Smoke Background - Fixed behind everything */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Smoke
          density={6}
          color="#9e4f4f"
          opacity={0.4}
          enableRotation={true}
          rotation={[0, 0, 0.05]}
          enableWind={true}
          windStrength={[0.005, 0.005, 0.005]}
        />
      </div>
      
      {/* Content - No background color to let smoke show through */}
      <div className="relative z-10 dark">
        <MinimalNavigation />
        <MinimalStory />
        <Footer />
      </div>
    </main>
  );
}

