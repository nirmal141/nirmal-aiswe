// ✨ MINIMAL HERO - Clean Hero Section
// src/components/sections/MinimalHero.tsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BackgroundPaths } from '../ui/background-paths';
import AnimatedJourneyButton from '../ui/AnimatedJourneyButton';
import Link from 'next/link';

const currentStatus = {
  availability: 'Available for FTE opportunities',
  location: 'New York, NY',
  education: 'MS Computer Science, NYU',
  expected: 'May 2026'
};

// const keyMetrics = [
//   { value: '20,000+', label: 'Lines of Code (Quality over Quantity)' },
//   { value: '6', label: 'Internships' },
//   { value: '10+', label: 'Mentorships' },
//   { value: '3x', label: 'Hackathon Winner' }
// ];

export default function MinimalHero() {

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 bg-black relative overflow-hidden"
    >
      {/* Background Paths Animation */}
      <div className="absolute inset-0 z-0 opacity-40">
        <BackgroundPaths />
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
          <div className="flex flex-col justify-center order-2 lg:order-2 text-center lg:text-left">
            {/* Name */}
            <motion.div 
              className="mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 
                className="elegant-name text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light" 
                style={{ color: '#ffffff' }}
              >
                Nirmal Boghara
              </h1>
            </motion.div>

            {/* Rest of content */}
            <div>
              {/* Title */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 md:mb-8"
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-normal" style={{ color: '#ffffff' }}>
                  AI Innovator & Software Engineer \ <span style={{ color: '#fec195' }}>UI/UX Side Hustler</span>
                </h2>
              </motion.div>

              {/* Description */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8 md:mb-10"
              >
                <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed" style={{ color: '#d1d5db' }}>
                  "Merging code, creativity, and business to redefine what's possible with AI."
                </p>
              </motion.div>

              {/* Key metrics - compact grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 gap-4 mb-8 md:mb-10"
              >
                {/* {keyMetrics.map((metric, index) => (
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
                ))} */}
              </motion.div>

              {/* Education status */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
              >
                <Link href="/story">
                  <motion.div
                    whileHover={{ y: -2, boxShadow: "0 8px 15px rgba(254, 193, 149, 0.3)" }}
                    whileTap={{ y: 0, scale: 0.98 }}
                  >
                    <AnimatedJourneyButton>
                      View My Journey
                    </AnimatedJourneyButton>
                  </motion.div>
                </Link>
                
                <motion.div
                  whileHover={{ y: -2, boxShadow: "0 8px 15px rgba(254, 193, 149, 0.3)" }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  <AnimatedJourneyButton href="mailto:nb3964@nyu.edu">
                    Get in Touch
                  </AnimatedJourneyButton>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
