// src/components/layout/ScrollProgress.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Create smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = Math.min(scrollPx / winHeightPx, 1);
      setScrollProgress(scrolled);
    };

    // Update on scroll
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    // Update on resize
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    
    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  // Transform progress to width percentage
  const width = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* Main Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 z-[60]">
        <motion.div 
          className="h-full bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-300 dark:to-gray-500"
          style={{ width }}
        />
      </div>

      
    </>
  );
}