// ✨ MINIMAL HERO - Clean & Simple with 3D Avatar
// src/components/sections/MinimalHero.tsx

'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { ShaderAnimation } from '../ui/shader-animation';
import { ArrowDown } from 'lucide-react';

const currentStatus = {
  availability: 'Available for FTE opportunities',
  location: 'New York, NY',
  education: 'MS Computer Science, NYU',
  expected: 'May 2026'
};

const keyMetrics = [
  { value: '20,000+', label: 'Lines of Code (Quality over Quantity)' },
  { value: '6', label: 'Internships' },
  { value: '10+', label: 'Mentorships' },
  { value: '3x', label: 'Hackathon Winner' }
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function MinimalHero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('animate');
  }, [controls]);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 bg-black relative overflow-hidden">
      {/* Shader Animation Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <ShaderAnimation />
      </div>

      {/* Main content container - Two column layout */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20">
          
          {/* Left Column - Avatar */}
          <motion.div
            className="flex items-center justify-center order-1 lg:order-1"
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Avatar Container - Large and Centered */}
              <motion.div
                className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[600px] lg:h-[600px]"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Main avatar image - seamlessly blending with black background */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/nirmal-headshot.png"
                    alt="Nirmal Boghara - Avatar"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="flex flex-col justify-center order-2 lg:order-2 text-center lg:text-left"
            variants={stagger}
            initial="initial"
            animate={controls}
          >
            {/* Name */}
            <motion.div variants={fadeIn} className="mb-4 md:mb-6">
              <h1 className="elegant-name text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light" style={{ color: '#ffffff' }}>
                Nirmal Boghara
              </h1>
            </motion.div>

            {/* Title */}
            <motion.div variants={fadeIn} className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-normal" style={{ color: '#ffffff' }}>
                AI Innovator & Software Engineer \ <span className="text-orange-500">UI/UX Side Hustler</span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div variants={fadeIn} className="mb-8 md:mb-10">
              <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed" style={{ color: '#d1d5db' }}>
                "Merging code, creativity, and business to redefine what's possible with AI."
              </p>
            </motion.div>

            {/* Key metrics - compact grid */}
            <motion.div 
              variants={fadeIn}
              className="grid grid-cols-2 gap-4 mb-8 md:mb-10"
            >
              {keyMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="text-2xl md:text-3xl font-light mb-1" style={{ color: '#ffffff' }}>
                    {metric.value}
                  </div>
                  <div className="text-xs md:text-sm font-medium" style={{ color: '#9ca3af' }}>
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Education status */}
            <motion.div 
              variants={fadeIn}
              className="mb-8 md:mb-10 flex justify-center lg:justify-start"
            >
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/5 border border-white/10 rounded-full">
                <span className="text-xs md:text-sm font-mono" style={{ color: '#d1d5db' }}>
                  {currentStatus.education}
                </span>
                <span className="hidden sm:inline" style={{ color: '#6b7280' }}>•</span>
                <span className="text-xs md:text-sm" style={{ color: '#d1d5db' }}>
                  Expected {currentStatus.expected}
                </span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={scrollToNext}
                className="cursor-button px-6 md:px-8 py-2.5 md:py-3 bg-orange-500 text-black hover:bg-gray-100 transition-colors text-sm md:text-base rounded-md font-medium"
                whileHover={{ y: -2, boxShadow: "0 8px 15px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ y: 0, scale: 0.98 }}
              >
                View My Journey
              </motion.button>
              
              <motion.a
                href="mailto:nb3964@nyu.edu"
                className="cursor-button px-6 md:px-8 py-2.5 md:py-3 bg-transparent border border-white/30 text-white hover:border-white/50 hover:bg-white/5 transition-colors text-sm md:text-base rounded-md font-medium"
                whileHover={{ y: -2, boxShadow: "0 8px 15px rgba(255, 255, 255, 0.1)" }}
                whileTap={{ y: 0, scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-1 md:gap-2 text-gray-500 hover:text-gray-300 transition-colors"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            Scroll
          </span>
          <ArrowDown size={14} className="md:w-4 md:h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
}