// src/components/layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { MonoText, Caption } from '../ui/TypographyElements';
import { Github, Linkedin, Mail, ArrowUp, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/nirmalboghara',
    icon: Github
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/nirmalboghara',
    icon: Linkedin
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter
  },
  {
    name: 'Email',
    href: 'mailto:nb3964@nyu.edu',
    icon: Mail
  }
];

// Updated to match actual page sections
const quickLinks = [
  { name: 'Home', href: '#' },
  { name: 'Story', href: '#story' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-8 mb-12">
          {/* Left Column - Branding */}
          <div className="sm:col-span-1 md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Nirmal Boghara
              </h3>
              <p className="text-gray-600 font-light leading-relaxed max-w-md mb-6">
                AI Innovator and Software Engineer building intelligent solutions 
                at the intersection of technology and human creativity.
              </p>
              
              {/* Current Status */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
                </div>
                <Caption className="text-green-700 font-medium">
                  Available for new projects
                </Caption>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50"
                      aria-label={link.name}
                    >
                      <IconComponent size={18} strokeWidth={2} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="sm:col-span-1 md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Caption className="mb-5 text-gray-400 uppercase tracking-wider font-medium">Navigation</Caption>
              <nav className="space-y-3.5">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-sm hover:translate-x-0.5 transform duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="sm:col-span-1 md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Caption className="mb-5 text-gray-400 uppercase tracking-wider font-medium">Contact</Caption>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-gray-500 mb-1.5 font-medium">Email</div>
                  <a 
                    href="mailto:nb3964@nyu.edu"
                    className="text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    nb3964@nyu.edu
                  </a>
                </div>
                
                <div>
                  <div className="text-gray-500 mb-1.5 font-medium">Location</div>
                  <div className="text-gray-800">New York, NY</div>
                </div>
                
                <div>
                  <div className="text-gray-500 mb-1.5 font-medium">Response Time</div>
                  <div className="text-gray-800">{'< 24 hours'}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-100"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <MonoText className="text-gray-500 text-sm">
                © {currentYear} Nirmal Boghara
              </MonoText>
              
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group px-3 py-1.5 rounded-md hover:bg-gray-50"
            >
              <span className="text-sm font-medium">Back to top</span>
              <ArrowUp 
                size={16} 
                className="group-hover:-translate-y-0.5 transition-transform" 
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Minimal Design Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <MonoText className="text-gray-400 text-xs">
            Designed with minimal aesthetics for maximum impact
          </MonoText>
        </motion.div>
      </div>
    </footer>
  );
}