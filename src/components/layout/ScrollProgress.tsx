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
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-100 z-[60]">
        <motion.div 
          className="h-full bg-gradient-to-r from-gray-800 to-gray-600"
          style={{ width }}
        />
      </div>

      {/* Subtle Progress Indicator (Optional - for visual feedback) */}
      <motion.div
        className="fixed top-4 right-8 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 0.05 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-8 h-8">
          {/* Background Circle */}
          <svg
            className="w-8 h-8 transform -rotate-90"
            viewBox="0 0 32 32"
          >
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="rgba(229, 231, 235, 0.5)"
              strokeWidth="2"
            />
            <motion.circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={87.96} // 2 * PI * 14
              strokeDashoffset={useTransform(smoothProgress, [0, 1], [87.96, 0])}
            />
          </svg>
          
          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-xs font-mono text-gray-600"
              animate={{ 
                opacity: scrollProgress > 0.1 ? 1 : 0,
                scale: scrollProgress > 0.1 ? 1 : 0.8
              }}
              transition={{ duration: 0.2 }}
            >
              {Math.round(scrollProgress * 100)}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </>
  );
}