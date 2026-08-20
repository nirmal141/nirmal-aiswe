// ✨ MINIMAL HERO - Aesthetic Edition
// src/components/sections/MinimalHero.tsx

'use client';

import { motion } from 'framer-motion';
import { Smoke } from '@/components/ui/smoke';


export default function MinimalHero() {
  return (
    <section 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-[#050505] overflow-hidden selection:bg-white/20"
    >
      {/* 🎞️ Subtle Grain Overlay */}
      <div className="grain-subtle" />

      {/* Background Image / Texture - Very subtle radial gradient to lift the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-[#050505] to-[#050505] z-0" />

      {/* Smoke Effect - Very subtle */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Smoke 
          density={6} 
          opacity={0.2} 
          color="#9e4f4f" 
          enableWind 
          windStrength={[0.001, 0.001, 0]}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] h-full flex flex-col items-center justify-center p-6 md:p-12">
        
        {/* Top Meta Info - Absolute positioning for 'editorial' feel */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-28 left-8 md:top-12 md:left-12 flex flex-col gap-1"
        >
          <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-neutral-500 uppercase">Role</span>
          <span className="text-xs md:text-sm font-light text-neutral-300 tracking-wide">Software Engineer</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-28 right-8 md:top-12 md:right-12 flex flex-col gap-1 text-right"
        >
          <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-neutral-500 uppercase">Based In</span>
          <span className="text-xs md:text-sm font-light text-neutral-300 tracking-wide">Bellevue, WA</span>
        </motion.div>

        {/* CENTERPIECE */}
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Typography */}
          <div className="relative z-10 text-center mix-blend-normal mt-0 space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight"
            >
              Nirmal Boghara
            </motion.h1>
            
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="font-heading text-lg md:text-xl font-light text-neutral-400 leading-relaxed tracking-wide text-balance max-w-xl mx-auto"
            >
               Merging code, creativity, and business to redefine what's possible with AI.
            </motion.p>
          </div>
        
        </div>



      </div>
    </section>
  );
}
