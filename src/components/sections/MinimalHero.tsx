// ✨ MINIMAL HERO - Clean & Simple
// src/components/sections/MinimalHero.tsx

'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { DisplayText, Heading, MonoText } from '../ui/TypographyElements';
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
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-500">
      {/* JavaScript code snippet with animation - hidden on mobile */}
      <motion.div 
        className="absolute top-20 left-20 -rotate-6 opacity-80 hidden md:block"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0],
          rotate: [-6, -4, -6]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg max-w-xs">
          <div className="flex items-center mb-2">
            <div className="h-3 w-3 rounded-full mr-2 bg-yellow-500"></div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">JavaScript</span>
          </div>
          <pre className="text-xs overflow-hidden">
            <code className="font-mono text-yellow-500">
              {`function createFuture() {
  const dreams = [];
  return {
    add: (dream) => dreams.push(dream),
    achieve: () => dreams.map(d => d())
  };
}`}
            </code>
          </pre>
        </div>
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="max-w-5xl mx-auto text-center relative z-10 pt-24 md:pt-12"
        variants={stagger}
        initial="initial"
        animate={controls}
      >


        {/* Name */}
        <motion.div variants={fadeIn} className="mb-4 md:mb-8">
          <DisplayText 
            weight="light" 
            className="text-gray-900 dark:text-white mb-4 elegant-name text-3xl md:text-4xl lg:text-6xl"
            as="h1"
            gradient={false}
          >
            Nirmal Boghara
          </DisplayText>
        </motion.div>

        {/* Title */}
        <motion.div variants={fadeIn} className="mb-6 md:mb-8">
          <Heading 
            level={2} 
            weight="normal" 
            className="text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl"
          >
            AI Innovator & Software Engineer
          </Heading>
        </motion.div>

        {/* Description */}
        <motion.div variants={fadeIn} className="mb-10 md:mb-12">
          <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
          “Merging code, creativity, and business to redefine what’s possible with AI.”
          </p>
        </motion.div>

        {/* Key metrics - clean grid */}
        <motion.div 
          variants={fadeIn}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16"
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 dark:text-white mb-1 md:mb-2">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Education status */}
        <motion.div 
          variants={fadeIn}
          className="mb-10 md:mb-12"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm">
            <MonoText className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
              {currentStatus.education}
            </MonoText>
            <span className="hidden md:inline text-gray-300 dark:text-gray-500">•</span>
            <span className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
              Expected {currentStatus.expected}
            </span>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div 
          variants={fadeIn}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-12 md:mb-16"
        >
          <motion.button
            onClick={scrollToNext}
            className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm text-sm md:text-base"
            whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
            whileTap={{ y: 0 }}
          >
            View My Journey
          </motion.button>
          
          <motion.a
            href="mailto:nb3964@nyu.edu"
            className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm text-sm md:text-base"
            whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
            whileTap={{ y: 0 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute md:bottom-1 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNext}
            className="flex flex-col items-center gap-1 md:gap-2 text-gray-400 hover:text-gray-600 transition-colors"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Scroll
            </span>
            <ArrowDown size={14} className="md:w-4 md:h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}