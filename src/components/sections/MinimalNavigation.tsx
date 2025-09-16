// ✨ MINIMAL NAVIGATION - Clean & Simple
// src/components/layout/MinimalNavigation.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Clock, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

const navItems = [
  { name: 'Story', href: '#story' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

export default function MinimalNavigation() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['story', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle live time update for New York time zone
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'America/New_York',
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true
      };
      
      const nyTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setCurrentTime(nyTime + ' ET');
    };
    
    // Update immediately
    updateTime();
    
    // Update every minute
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 sm:top-6 left-0 right-0 z-40 flex justify-center px-4 sm:px-6"
      >
        <motion.div
          className={`w-full max-w-4xl transition-all duration-500 ease-out ${
            isScrolled
              ? 'bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-black/20'
              : 'bg-white/5 dark:bg-black/5 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-xl shadow-black/5'
          } rounded-2xl`}
          animate={{
            boxShadow: isScrolled 
              ? ['0 25px 50px -12px rgba(0, 0, 0, 0.05)', '0 25px 50px -12px rgba(0, 0, 0, 0.1)', '0 25px 50px -12px rgba(0, 0, 0, 0.05)']
              : ['0 20px 25px -5px rgba(0, 0, 0, 0.05)', '0 20px 25px -5px rgba(0, 0, 0, 0.08)', '0 20px 25px -5px rgba(0, 0, 0, 0.05)']
          }}
          transition={{
            boxShadow: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
            transition: { duration: 0.3, ease: 'easeOut' }
          }}
        >
          <div className="flex items-center justify-between h-14 sm:h-16 px-6 sm:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-base sm:text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent hover:from-gray-700 hover:to-gray-500 dark:hover:from-gray-200 dark:hover:to-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Nirmal Boghara
            </motion.a>
            
            {/* Live Time Display */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-200 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 px-3 py-2 rounded-full shadow-lg"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <Clock size={12} className="text-gray-600 dark:text-gray-300" />
              </motion.div>
              <span className="font-mono">{currentTime}</span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl ${
                    isActive
                      ? 'text-gray-900 dark:text-white bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/5 hover:backdrop-blur-md hover:border hover:border-white/30 dark:hover:border-white/10 hover:shadow-md'
                  }`}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    transition: { type: 'spring', stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/20 dark:from-white/20 dark:to-white/10 rounded-xl backdrop-blur-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {/* Theme Toggle Button - always visible with glass effect */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={toggleTheme}
              className="p-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 hover:border-white/40 dark:hover:border-white/20 shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                rotate: 180,
                transition: { type: 'spring', stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </motion.div>
            </motion.button>
            
            <motion.a
              href="mailto:nb3964@nyu.edu"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="px-5 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 bg-white/25 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 hover:bg-white/35 dark:hover:bg-white/15 hover:border-white/50 dark:hover:border-white/30 hover:text-gray-900 dark:hover:text-white transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl"
              whileHover={{ 
                y: -3, 
                scale: 1.02,
                transition: { type: 'spring', stiffness: 400, damping: 10 }
              }}
              whileTap={{ y: -1, scale: 0.98 }}
            >
              <span className="relative z-10 font-medium">Get in Touch</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Time Display */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 px-2.5 py-1.5 rounded-full shadow-lg"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <Clock size={10} className="text-gray-600 dark:text-gray-300" />
              </motion.div>
              <span className="font-mono">{currentTime}</span>
            </motion.div>
            
            {/* Mobile Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 shadow-lg"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </motion.div>
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 shadow-lg"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-3 bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-xl shadow-2xl"
          >
            <div className="px-6 py-6 space-y-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl ${
                      isActive
                        ? 'text-gray-900 dark:text-white bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/5 hover:backdrop-blur-md hover:border hover:border-white/30 dark:hover:border-white/10'
                    }`}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 4,
                      transition: { type: 'spring', stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: navItems.length * 0.1 }}
                className="pt-4 border-t border-white/20 dark:border-white/10"
              >
                <motion.a
                  href="mailto:nb3964@nyu.edu"
                  className="block w-full px-5 py-3 bg-white/25 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 text-gray-800 dark:text-gray-200 text-center text-sm font-medium transition-all duration-300 rounded-xl shadow-lg hover:bg-white/35 dark:hover:bg-white/15 hover:shadow-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                    transition: { type: 'spring', stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
        </motion.div>
      </motion.nav>
    </>
  );
}