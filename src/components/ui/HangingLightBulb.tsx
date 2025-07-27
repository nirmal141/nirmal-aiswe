'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../lib/theme-context';

export default function HangingLightBulb() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = () => {
    setIsClicking(true);
    toggleTheme();
    
    // Reset clicking state after animation
    setTimeout(() => {
      setIsClicking(false);
    }, 300);
  };

  return (
    <div className="fixed top-0 right-8 z-50 pointer-events-none">
      {/* Ceiling mount */}
      <div className="relative">
        {/* Ceiling plate */}
        <div className="w-8 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mx-auto mb-2 shadow-md" />
        
        {/* Fixed string */}
        <div className="w-0.5 h-16 bg-gray-500 dark:bg-gray-400 mx-auto relative" />
      </div>

      {/* Light bulb - clickable */}
      <motion.div
        className="relative pointer-events-auto cursor-pointer"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Simple round circle */}
        <div className="relative">
          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-full blur-lg transition-colors duration-500 ${
              isDark 
                ? 'bg-yellow-300/40 shadow-xl shadow-yellow-300/60' 
                : 'bg-gray-200/30'
            }`}
            animate={{
              scale: isDark ? [1, 1.15, 1] : 1,
              opacity: isDark ? [0.4, 0.7, 0.4] : 0.3,
            }}
            transition={{
              duration: 2.5,
              repeat: isDark ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
          
          {/* Simple round circle */}
          <div className={`w-8 h-8 rounded-full transition-all duration-500 ${
            isDark 
              ? 'bg-yellow-200 border-2 border-yellow-400 shadow-xl shadow-yellow-200/40' 
              : 'bg-white border-2 border-gray-300 shadow-lg'
          }`} />
        </div>

        {/* Click animation effect */}
        {isClicking && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-400"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Ambient light effect */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(255, 255, 0, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, transparent 70%)'
        }}
        animate={{
          scale: isDark ? [1, 1.2, 1] : 1,
          opacity: isDark ? [0.15, 0.25, 0.15] : 0.03,
        }}
        transition={{
          duration: 3,
          repeat: isDark ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </div>
  );
} 