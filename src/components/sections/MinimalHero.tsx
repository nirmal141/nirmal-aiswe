// ✨ MINIMAL HERO - Aesthetic Edition
// src/components/sections/MinimalHero.tsx

'use client';

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import Image from 'next/image';
import { MouseEvent } from 'react';

function SpotlightAvatar() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(circle 280px at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 3, ease: "easeOut" }}
      className="absolute z-0 w-full max-w-[500px] h-[50vh] md:h-[70vh] lg:h-[80vh] select-none group"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Base Layer: Grayscale & Stylized */}
      <div className="absolute inset-0 w-full h-full mask-fade-bottom grayscale contrast-110 brightness-90">
        <Image
          src="/headshot_cutout.png"
          alt="Nirmal Boghara Base"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* 2. Reveal Layer: Full Color, Hidden by Default, Revealed by Mask */}
      <motion.div 
        className="absolute inset-0 w-full h-full mask-fade-bottom reveal-on-mobile"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <Image
          src="/headshot_cutout.png"
          alt="Nirmal Boghara Color"
          fill
          className="object-contain object-bottom"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

export default function MinimalHero() {
  return (
    <section 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-[#050505] overflow-hidden selection:bg-white/20"
    >
      {/* 🎞️ Subtle Grain Overlay */}
      <div className="grain-subtle" />

      {/* Background Image / Texture - Very subtle radial gradient to lift the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-[#050505] to-[#050505] z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] h-full flex flex-col items-center justify-center p-6 md:p-12">
        
        {/* Top Meta Info - Absolute positioning for 'editorial' feel */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col gap-1"
        >
          <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-neutral-500 uppercase">Role</span>
          <span className="text-xs md:text-sm font-light text-neutral-300 tracking-wide">Software Engineer</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-8 right-8 md:top-12 md:right-12 flex flex-col gap-1 text-right"
        >
          <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-neutral-500 uppercase">Based In</span>
          <span className="text-xs md:text-sm font-light text-neutral-300 tracking-wide">New York, NY</span>
        </motion.div>

        {/* CENTERPIECE */}
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Avatar - Spotlight Reveal Effect */}
          <SpotlightAvatar />

          {/* Typography - Intertwined with image */}
          <div className="relative z-10 text-center mix-blend-normal mt-[40vh] md:mt-48">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-stranger text-[#e5e5e5] stranger-glow-contain text-5xl sm:text-7xl md:text-8xl lg:text-[8vw] leading-[0.9] tracking-tight"
              data-text="NIRMAL"
            >
              NIRMAL
            </motion.h1>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-stranger text-[#e5e5e5] stranger-glow-contain text-5xl sm:text-7xl md:text-8xl lg:text-[8vw] leading-[0.9] tracking-tight md:mt-[-2vw]"
              data-text="BOGHARA"
            >
              B<span className="text-[#e52905]">OG</span>HARA
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1.5, delay: 0.8 }}
             className="mt-12 md:mt-2 max-w-sm md:max-w-md text-center z-20"
          >
             <p className="font-heading text-sm md:text-base font-light text-neutral-400 leading-relaxed tracking-wide text-balance">
               Merging code, creativity, and business to redefine what's possible with AI.
             </p>
          </motion.div>
        
        </div>



      </div>
    </section>
  );
}
