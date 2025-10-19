import MinimalNavigation from '../../components/sections/MinimalNavigation';
import Projects from '@/components/sections/Projects';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { Smoke } from '@/components/ui/smoke';

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen text-white">
      <ScrollProgress />
      
      {/* Smoke Background - Fixed behind everything */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Smoke
          density={30}
          color="#666666"
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
        <Projects />
      </div>
    </main>
  );
}

