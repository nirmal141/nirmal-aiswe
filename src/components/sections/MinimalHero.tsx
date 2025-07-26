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
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 bg-white relative overflow-hidden">
      {/* Static code snippets with animations - hidden on mobile */}
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
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-xs">
          <div className="flex items-center mb-2">
            <div className="h-3 w-3 rounded-full mr-2 bg-yellow-500"></div>
            <span className="text-xs font-medium text-gray-500">JavaScript</span>
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

      <motion.div 
        className="absolute bottom-40 right-20 rotate-3 opacity-80 hidden md:block"
        animate={{ 
          y: [0, -10, 0],
          x: [0, -5, 0],
          rotate: [3, 5, 3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-xs">
          <div className="flex items-center mb-2">
            <div className="h-3 w-3 rounded-full mr-2 bg-blue-500"></div>
            <span className="text-xs font-medium text-gray-500">Python</span>
          </div>
          <pre className="text-xs overflow-hidden">
            <code className="font-mono text-blue-500">
              {`def embrace_challenges():
    while True:
        try:
            solve_problem()
            learn_from_mistakes()
            grow_stronger()
        except Obstacle as e:
            overcome(e)`}
            </code>
          </pre>
        </div>
      </motion.div>

      <motion.div 
        className="absolute top-40 right-32 -rotate-2 opacity-80 hidden md:block"
        animate={{ 
          y: [0, -8, 0],
          x: [0, 8, 0],
          rotate: [-2, 0, -2]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-xs">
          <div className="flex items-center mb-2">
            <div className="h-3 w-3 rounded-full mr-2 bg-orange-500"></div>
            <span className="text-xs font-medium text-gray-500">Rust</span>
          </div>
          <pre className="text-xs overflow-hidden">
            <code className="font-mono text-orange-500">
              {`fn build_resilience() -> Result<Success, Failure> {
    let mut attempts = 0;
    loop {
        attempts += 1;
        if let Ok(success) = try_again() {
            return Ok(success);
        }
        if attempts > 1000 { continue; }
    }
}`}
            </code>
          </pre>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-32 left-32 rotate-4 opacity-80 hidden md:block"
        animate={{ 
          y: [0, -12, 0],
          x: [0, -6, 0],
          rotate: [4, 2, 4]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-xs">
          <div className="flex items-center mb-2">
            <div className="h-3 w-3 rounded-full mr-2 bg-cyan-500"></div>
            <span className="text-xs font-medium text-gray-500">Go</span>
          </div>
          <pre className="text-xs overflow-hidden">
            <code className="font-mono text-cyan-500">
              {`func neverGiveUp(goal string) {
  for {
    progress := makeProgress(goal)
    if progress.isComplete() {
      celebrate()
      break
    }
    learn(progress.lessons())
  }
}`}
            </code>
          </pre>
        </div>
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="max-w-5xl mx-auto text-center relative z-10 pt-16 md:pt-0"
        variants={stagger}
        initial="initial"
        animate={controls}
      >
        {/* Status indicator */}
        <motion.div 
          variants={fadeIn}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8"
        >
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs md:text-sm text-green-700 font-medium">
              {currentStatus.availability}
            </span>
          </div>
          <span className="hidden md:inline text-gray-300">•</span>
          <MonoText className="text-gray-500 text-xs md:text-sm">
            {currentStatus.location}
          </MonoText>
        </motion.div>

        {/* Name */}
        <motion.div variants={fadeIn} className="mb-4 md:mb-8">
          <DisplayText 
            weight="light" 
            className="text-gray-900 mb-4 elegant-name text-3xl md:text-4xl lg:text-6xl"
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
            className="text-gray-600 text-xl md:text-2xl lg:text-3xl"
          >
            AI Innovator & Software Engineer
          </Heading>
        </motion.div>

        {/* Description */}
        <motion.div variants={fadeIn} className="mb-10 md:mb-12">
          <p className="text-base md:text-lg lg:text-xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
            Building intelligent systems that drive business impact. Currently leading AI development 
            at Chewy while pursuing advanced studies at NYU.
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
              <div className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-1 md:mb-2">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">
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
          <div className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 bg-white border border-gray-200 rounded-full shadow-sm">
            <MonoText className="text-gray-600 text-xs md:text-sm">
              {currentStatus.education}
            </MonoText>
            <span className="hidden md:inline text-gray-300">•</span>
            <span className="text-gray-600 text-xs md:text-sm">
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
            className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-white border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors shadow-sm text-sm md:text-base"
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
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNext}
            className="flex flex-col items-center gap-1 md:gap-2 text-gray-400 hover:text-gray-600 transition-colors"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-medium uppercase tracking-wider">
              Scroll
            </span>
            <ArrowDown size={14} className="md:w-4 md:h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}