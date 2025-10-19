// src/components/sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { DisplayText, Heading, MonoText, Caption } from '../ui/TypographyElements';
import { Card, CardContent } from '../ui/Card';
import { ArrowUpRight, Mail, MapPin, Phone, Linkedin, Github, FileText } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:nb3964@nyu.edu',
    description: 'Best for project inquiries'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nirmal-boghara/',
    description: 'Professional networking'
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/nirmal141',
    description: 'Code repositories'
  },
  {
    icon: FileText,
    label: 'Portfolio',
    href: '/portfolio',
    description: 'Complete project showcase'
  }
];

const availabilityStatus = {
  status: 'Available',
  nextAvailable: 'Immediate',
  timezone: 'EST (UTC-5)',
  responseTime: '< 24 hours'
};

const interests = [
  'AI & Machine Learning Projects',
  'Full-Stack Development',
  'Data Science Consulting',
  'Technical Mentoring',
  'Open Source Collaboration',
  'Speaking Opportunities'
];

const currentLocation = {
  city: 'New York',
  country: 'USA',
  open_to: 'Remote & On-site'
};

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <DisplayText 
            weight="light" 
            className="text-gray-900 dark:text-white mb-8 text-center"
          >
            Let's Connect
          </DisplayText>
          
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-8">
              I'm always interested in discussing innovative AI projects, collaboration opportunities, 
              and ways to push the boundaries of what's possible with technology.
            </p>
            
            <div className="flex justify-center items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Available for new projects</span>
              </div>
              <MonoText className="text-gray-500 dark:text-gray-400">
                {currentLocation.city}, {currentLocation.country}
              </MonoText>
            </div>
          </div>
        </motion.div>

        {/* Main Contact Grid */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          {/* Left Column - Contact Methods */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <Heading level={3} weight="medium" className="mb-8 text-gray-900 dark:text-white">
                Get in Touch
              </Heading>
              
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <Card
                      key={method.label}
                      animated
                      delay={index * 0.1}
                      className="group cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                      onClick={() => window.open(method.href, '_blank')}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 bg-black/30 backdrop-blur-sm rounded-lg group-hover:bg-black/50 transition-colors">
                            <IconComponent size={20} className="text-gray-700 dark:text-gray-300" />
                          </div>
                          <ArrowUpRight 
                            size={16} 
                            className="text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" 
                          />
                        </div>
                        
                        <div>
                          <Caption className="mb-1 text-gray-600 dark:text-gray-400">{method.label}</Caption>
                         
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {method.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Availability Status */}
              <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <Caption className="text-gray-600 dark:text-gray-400">Current Availability</Caption>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <MonoText className="text-green-700 dark:text-green-400">
                      {availabilityStatus.status}
                    </MonoText>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Response Time</div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {availabilityStatus.responseTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Timezone</div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {availabilityStatus.timezone}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Work Type</div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {currentLocation.open_to}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interests & Additional Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* What I'm Looking For */}
              <div>
                <Caption className="mb-4 text-gray-600 dark:text-gray-400">What I'm Looking For</Caption>
                <div className="space-y-3">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/30 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                        {interest}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Location & Preferences */}
              <div>
                <Caption className="mb-4 text-gray-600 dark:text-gray-400">Location & Work Preferences</Caption>
                <div className="space-y-4 p-4 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Current Location</span>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-900 dark:text-white font-medium text-sm">
                        {currentLocation.city}, {currentLocation.country}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Work Style</span>
                    <span className="text-gray-900 dark:text-white font-medium text-sm">
                      {currentLocation.open_to}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Travel</span>
                    <span className="text-gray-900 dark:text-white font-medium text-sm">
                      Open to relocation
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto mb-8">
            <MonoText className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              "The best way to predict the future is to invent it. 
              Let's build something incredible together."
            </MonoText>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('mailto:nb3964@nyu.edu', '_blank')}
              className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]"
            >
              Start a Conversation
            </button>
            <button 
              onClick={() => window.open('https://www.linkedin.com/in/nirmal-boghara/', '_blank')}
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
            >
              Connect on LinkedIn
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}