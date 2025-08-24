// ✨ MINIMAL STORY SECTION - Clean & Professional
// src/components/sections/MinimalStory.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { DisplayText, Heading, MonoText, Caption } from '../ui/TypographyElements';
import Image from 'next/image'; 

const milestones = [  
  {
    id: 'hacknyu',
    year: 'June 2025 - Present',
    title: 'Technical Project Manager',
    company: 'HackNYU',
    location: 'New York, NY',
    description: 'Responsible for managing the technical aspects of the hackathon.',
    achievement: 'Leadership and Teamwork',
    type: 'experience',
    website: 'https://hacknyu.org'
  },
  {
    id: 'perplexity',
    year: 'August 2025 - Present',
    title: 'Campus Partner',
    company: 'Perplexity',
    location: 'New York, NY',
    description: 'Building a community of AI enthusiasts and driving the adoption of Comet Browser at NYU.',
    achievement: 'Building a community of AI enthusiasts',
    type: 'education',
    website: 'https://www.perplexity.ai'
  },
  {
    id: 'qualcomm',
    year: 'February 2025 - Present',
    title: 'Technical Ambassador',
    company: 'Qualcomm',
    location: 'New York, NY',
    description: 'Developed low-latency AI teaching assistant with 92% accuracy through Agentic RAG architecture.',
    achievement: '92% AI Accuracy',
    type: 'experience',
    website: 'https://www.qualcomm.com',
    subAchievements: [
      {
        title: 'Blog - From Old to Elite: How NYU hackathon winners embraced Snapdragon® X for their tech needs',
        period: 'July 2025',
        description: 'Featured in Qualcomm\'s Developer blog for winning the NYU hackathon with Snapdragon® X',
        achievement: 'Leadership',
        link: 'https://www.qualcomm.com/developer/blog/2025/07/from-old-to-elite-how-nyu-hack-winners-embraced-snapdragon',
        linkText: 'Blog',
      },
      {
        title: 'Mentor - Edge AI Hackathon',
        period: 'May 2025 - August 2025',
        description: 'Was invited to mentor students in building AI-powered solutions using Snapdragon® X at Northeastern University in Seattle.',
        achievement: 'Leadership',
        linkText: 'Hackathon',
        images: [
          {
            src: '/edge-ai-hackathon-1.jpg',
            alt: 'Edge AI Hackathon at Northeastern University'
          },
          {
            src: '/edge-ai-hackathon-2.jpg',
            alt: 'Mentoring students at the hackathon'
          }
        ],
        imageAlt: 'Edge AI Hackathon at Northeastern University'
      },
      {
        title: 'Special Qualcomm HQ Visit',
        period: 'March 2025',
        description: 'Was invited to visit Qualcomm HQ in San Diego, CA to learn about the latest advancements in AI and their Chip Manufacturing Process.',
        achievement: 'Leadership',
        linkText: 'Workshop Series',
        images: [
          {
            src: '/qualcomm-hq-1.jpg',
            alt: 'Qualcomm HQ in San Diego'
          },
          {
            src: '/qualcomm-hq-2.jpg',
            alt: 'Chip manufacturing facility tour'
          }
        ]
      }
    ]
  },
  {
    id: 'chewy',
    year: 'May 2025 - August 2025',
    title: 'AI Innovator Intern II',
    company: 'Chewy',
    location: 'Boston, MA',
    description: 'Leading development of Agentic Copilot for Marketing team. Built ML models that saved $16M+ in annual revenue. Delivering the final presentation to the CEO and other executives at Florida HQ.',
    achievement: 'Think Big',
    type: 'experience',
    website: 'https://www.chewy.com'
  },
  {
    id: 'perplexity',
    year: 'March 2025 - August 2025',
    title: 'AI Business Fellow',
    company: 'Perplexity',
    location: 'New York, NY (Online)',
    description: 'Diving deep into the world of AI with the industry leaders around the globe.',
    achievement: 'Learning from AI leaders',
    type: 'education',
    website: 'https://www.perplexity.ai'
  },
  
  {
    id: 'startup',
    year: 'January 2025 - July 2025',
    title: 'Chief Technology Officer',
    company: 'Failed Startup',
    location: 'New York, NY',
    description: 'Revolutionizing tourism with AI',
    achievement: 'Learned a lot and this gave me a founders mindset',
    type: 'experience',
  },
  {
    id: 'nyu',
    year: 'September 2024 - Present',
    title: 'MS Computer Science',
    company: 'New York University',
    location: 'New York, NY',
    description: 'Pursuing advanced studies in AI systems, machine learning, and next-generation computing technologies.',
    achievement: 'Expected Graduation: May 2026',
    type: 'education',
    website: 'https://www.nyu.edu'
  },
  {
    id: 'bitnine',
    year: 'April 2024 - June 2024',
    title: 'Software Engineering Intern',
    company: 'Bitnine',
    location: 'San Francisco, CA (Remote)',
    description: 'Optimized PostgreSQL databases with Oracle compatibility, improving query performance by 23% for enterprise applications.',
    achievement: '23% Performance Improvement',
    type: 'experience',
    website: 'https://bitnineglobal.com'
  },
  {
    id: 'soulible-digital',
    year: 'September 2023 - November 2023',
    title: 'Artificial Intelligence Intern',
    company: 'Soulible Digital',
    location: 'Mumbai, India',
    description: 'Engineered an AI-powered computer vision attendance system using YOLOv7 and TensorFlow, automating tracking for 200+ employees while reducing manual effort by 50% and boosting operational efficiency by 30% through cross-functional collaboration and Python-based optimization.   ',
    achievement: 'Reducing manual effort and boosting operational efficiency',
    type: 'experience',
    website: 'https://soulible.com'
  },
  {
    id: 'feat-systems',
    year: 'May 2023 - August 2023',
    title: 'SDE Intern',
    company: 'Feat Systems',
    location: 'Mumbai, India',
    description: 'Transformed Java/Spring Boot applications using Agile practices and MySQL optimization, reducing customer complaints by 15% while accelerating new team member onboarding by 30% through streamlined CI/CD pipelines, comprehensive SDLC documentation, and seamless GitHub/Jira integration.',
    achievement: 'Reducing customer complaints and accelerating new team member onboarding',
    type: 'experience',
    website: 'https://www.featsystems.com'
  },
  {
    id: 'goldenmace',
    year: 'May 2022 - July 2022',
    title: 'Full Stack Developer',
    company: 'Goldenmace',
    location: 'Mumbai, India',
    description: 'Architected a high-performance full-stack dashboard with TypeScript and Svelte, delivering 30% faster load times and 20% higher client satisfaction through advanced caching mechanisms and seamless UI/UX design across MongoDB and PostgreSQL data layers.',
    achievement: 'Improving client satisfaction and load times',
    type: 'experience',
    website: 'https://goldenmace.com'
  },
  {
    id: 'education',
    year: 'July 2020 - June 2024',
    title: 'Computer Engineering Graduate',
    company: 'University of Mumbai',
    location: 'Mumbai, India',
    description: 'Graduated with expertise in AI, machine learning, and advanced algorithms. Built foundation for future innovations.',
    achievement: 'BE Computer Engineering',
    type: 'education',
    website: 'https://mum.digitaluniversity.ac/'
  }
];

// Simple fade-in animation
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

// Milestone card component
const MilestoneCard = ({ milestone, index, isActive }: { milestone: any; index: number; isActive: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative ${isActive ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}
    >
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200" />
      
      {/* Timeline dot */}
      <div className={`absolute left-6 top-8 w-4 h-4 bg-white border-2 ${isActive ? 'border-blue-600' : 'border-gray-900'} rounded-full transition-colors duration-300`} />

      {/* Content */}
      <div className="pl-20 pb-16">
        {/* Year */}
        <MonoText className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          {milestone.year}
        </MonoText>

        {/* Title & Company */}
        <div className="mb-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-1 group">
            {milestone.title}
            {milestone.type === 'experience' && (
              <span className="inline-flex ml-3 px-2 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300">Experience</span>
            )}
            {milestone.type === 'education' && (
              <span className="inline-flex ml-3 px-2 py-1 text-xs font-medium rounded-full bg-emerald-50 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">Education</span>
            )}
          </h3>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            {milestone.website ? (
              <a 
                href={milestone.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center"
              >
                {milestone.company}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="ml-1" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
              </a>
            ) : (
              <span className="font-medium">{milestone.company}</span>
            )}
            <span className="text-gray-400">•</span>
            <span>{milestone.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {milestone.description}
        </p>

        {/* Achievement badge */}
        <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full">
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {milestone.achievement}
          </span>
        </div>

        {/* Sub-achievements list - always shown if they exist */}
        {milestone.subAchievements && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 ml-4 border-l-2 border-gray-200"
          >
            {milestone.subAchievements.map((subItem: any, subIndex: number) => (
              <motion.div 
                key={subIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: subIndex * 0.1 }}
                className="pl-6 mb-6 relative"
              >
                {/* Sub-timeline dot */}
                <div className="absolute left-0 top-2 w-2 h-2 bg-gray-400 rounded-full transform -translate-x-1"></div>
                
                {/* Sub-achievement content */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">{subItem.title}</h4>
                  </div>
                  <MonoText className="text-gray-500 dark:text-gray-400 text-xs mb-2">
                    {subItem.period}
                  </MonoText>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    {subItem.description}
                  </p>
                                      <div className="flex items-center gap-3 mb-3">
                      <div className="inline-flex items-center px-2 py-0.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full">
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {subItem.achievement}
                        </span>
                      </div>
                    {subItem.link && (
                      <a 
                        href={subItem.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors px-2 py-1 rounded-md border border-blue-100 dark:border-blue-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                          <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                        </svg>
                        {subItem.linkText}
                      </a>
                    )}
                  </div>

                  {/* Multiple images in flex layout */}
                  {subItem.images && subItem.images.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {subItem.images.map((img: any, imgIndex: number) => (
                          <div 
                            key={imgIndex} 
                            className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 flex-grow-0"
                            style={{ maxWidth: 'calc(50% - 4px)', flexBasis: 'calc(50% - 4px)' }}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt || `Image ${imgIndex + 1} for ${subItem.title}`}
                              width={200}
                              height={120}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legacy support for single image */}
                  {subItem.image && !subItem.images && (
                    <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                      <Image
                        src={subItem.image}
                        alt={subItem.imageAlt || `Image for ${subItem.title}`}
                        width={300}
                        height={150}
                        className="w-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Filter component for timeline
const TimelineFilter = ({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeFilter === 'all' 
              ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveFilter('experience')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeFilter === 'experience' 
              ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Experience
        </button>
        <button 
          onClick={() => setActiveFilter('education')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeFilter === 'education' 
              ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Education
        </button>
      </div>
    </div>
  );
};

// Year navigation component
const YearNavigation = ({ years, activeYear, setActiveYear }: { years: string[]; activeYear: string; setActiveYear: (year: string) => void }) => {
  return (
    <div className="hidden lg:block sticky top-24 h-fit">
      <div className="flex flex-col gap-2 border-l-2 border-gray-200 pl-4">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`text-left text-sm py-1 transition-colors ${activeYear === year ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

// Skills overview
const SkillsOverview = () => {
  const skillCategories = [
      {
        title: 'AI & Machine Learning',
        skills: ['Python / SageMaker', 'TensorFlow', 'PyTorch / Hugging Face', 'Scikit-learn', 'Langchain']
      },
      {
          title: 'Development',
          skills: ['JavaScript', 'TypeScript / Node.js', 'React / Tailwind CSS', 'Django / Flask', 'Next.js']
        },
        {
            title: 'DevOps',
            skills: ['Git / GitHub Actions', 'CI/CD', 'Docker', 'Kubernetes', 'AWS']
        },
        {
            title: 'Data & Infrastructure',
            skills: ['PostgreSQL / MySQL', 'AWS / GCP', 'Snowflake / RDS / Neo4j', 'MongoDB', 'Spark / Hadoop / Kafka']
        },

  ];

  return (
    <section className="py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          {...fadeInUp}
        >
          <Heading level={2} weight="medium" className="text-gray-900 dark:text-white mb-4">
            Technical Expertise
          </Heading>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-light">
            Technologies and frameworks I work with regularly
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="text-gray-700 dark:text-gray-300 py-1 text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkLifeBalance = () => {
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Sports and tech balance data
    const balanceItems = [
        {
          id: 'soccer',
          sport: 'Soccer',
          icon: '⚽',
          color: 'from-gray-800 to-gray-900',
          techBenefit: 'Teamwork & Agility',
          sportMetric: 'Weekend league player',
          description: 'Soccer enhances my ability to collaborate in fast-paced development environments',
          quote: 'The field awareness I developed in soccer helps me anticipate project needs before they arise.'
        },
      {
        id: 'baseball',
        sport: 'Baseball',
        icon: '⚾',
        color: 'from-gray-800 to-gray-900',
        techBenefit: 'Precision & Focus',
        sportMetric: '3 years playing experience',
        description: 'Baseball taught me the importance of precision and patience - qualities I apply to debugging complex systems',
        quote: 'The discipline of batting practice mirrors the repetition needed to master coding patterns.'
      },
      {
        id: 'yoga',
        sport: 'Yoga',
        icon: '🧘',
        color: 'from-gray-800 to-gray-900',
        techBenefit: 'Mindfulness & Clarity',
        sportMetric: 'Daily practice',
        description: 'Yoga helps me maintain mental clarity during complex problem-solving sessions',
        quote: 'Yoga taught me to approach AI problems with a calm, focused mind.'
      }
    ];
  
    const handleCardHover = (id: string) => {
      setActiveCard(id);
    };
  
    const handleCardLeave = () => {
      setActiveCard(null);
    };
  
    return (
      <section className="py-24 px-8 bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-20 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Subtle decorative element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-200 rounded-full mb-6"></div>
            
            <Heading level={2} weight="medium" className="text-gray-900 dark:text-white mb-4 pt-8">
              Mind & Body Balance
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
              My athletic pursuits directly enhance my technical abilities.
              Balance isn't just a philosophy—it's how I consistently deliver results.
            </p>
          </motion.div>
  
          {/* Interactive balance visualization */}
          <div className="relative mb-24 h-32">
            <div className="max-w-4xl mx-auto px-4 relative h-full flex items-center">
              {/* Center balance beam - make it thinner and more elegant */}
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gray-200 dark:bg-gray-600 -translate-y-1/2"></div>
              
              {/* Balance point - refined design */}
              <motion.div 
                className="absolute left-1/2 top-1/2 w-3 h-3 bg-white dark:bg-gray-300 border border-gray-300 dark:border-gray-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 shadow-sm"
                animate={{ 
                  x: [-2, 2, -1, 1, 0],
                  rotate: [-0.5, 0.5, -0.2, 0.2, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              
              {/* Labels - positioned above and below the line to avoid overlap */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-y-8">
                <motion.div 
                  className="font-medium text-gray-600 dark:text-gray-400 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Technical Excellence
                </motion.div>
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-y-8 text-right">
                <motion.div 
                  className="font-medium text-gray-600 dark:text-gray-400 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Physical Wellness
                </motion.div>
              </div>
            </div>
          </div>
  
          {/* Cards grid */}
          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {balanceItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`
                  relative overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700
                  ${activeCard === item.id ? 'shadow-md transform scale-[1.01]' : 'shadow-sm'}
                  transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 h-full
                `}
                onMouseEnter={() => handleCardHover(item.id)}
                onMouseLeave={handleCardLeave}
              >
                {/* Card background */}
                <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-[0.02]`}></div>
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon and sport name */}
                  <div className="flex items-center mb-5">
                    <span className="text-4xl mr-4">{item.icon}</span>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">{item.sport}</h3>
                  </div>
                  
                  {/* Sport metric */}
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-600 dark:text-gray-300 inline-block mb-4 font-medium">
                    {item.sportMetric}
                  </div>
                  
                  {/* Tech benefit */}
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">ENHANCES</div>
                    <div className="font-medium text-gray-800 dark:text-white">{item.techBenefit}</div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  
                  {/* Quote */}
                  <div className="mt-auto">
                    <blockquote className="text-sm italic border-l-2 border-gray-200 dark:border-gray-600 pl-3 text-gray-500 dark:text-gray-400">
                      "{item.quote}"
                    </blockquote>
                  </div>
                  
                  {/* Interactive hover effect */}
                  <AnimatePresence>
                    {activeCard === item.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-800"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
          
          
          
          {/* Bottom quote */}
          <div className="text-center">
            <motion.p
              className="text-base text-gray-600 dark:text-gray-300 italic max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              "The discipline I've cultivated through baseball, yoga, and soccer directly translates to my approach in AI and technology. 
              A balanced athlete makes for a more innovative technologist."
            </motion.p>
          </div>
        </div>
      </section>
    );
  };

// Main minimal story component
export default function MinimalStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeYear, setActiveYear] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Extract unique years for navigation
  const years = ['All', ...Array.from(new Set(milestones.map(m => m.year.split(' - ')[0].split(' ')[1])))].sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    return parseInt(b) - parseInt(a);
  });

  // Filter milestones based on selected filter
  const filteredMilestones = milestones.filter(milestone => {
    if (activeFilter === 'all') return true;
    return milestone.type === activeFilter;
  });

  // Further filter by year if a specific year is selected
  const displayedMilestones = activeYear === 'All' 
    ? filteredMilestones 
    : filteredMilestones.filter(m => m.year.includes(activeYear));

  // Track which milestone is in view
  useEffect(() => {
    const observers = milestones.map((milestone, index) => {
      const element = document.getElementById(`milestone-${milestone.id}`);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Hero section */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <DisplayText weight="light" className="text-gray-900 dark:text-white mb-6">
              My Journey
            </DisplayText>
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From computer engineering studies to leading AI innovations that generate 
            millions in business value. Here's how it unfolded.
          </motion.p>

          
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-16"
            {...fadeInUp}
          >
            <Heading level={2} weight="medium" className="text-gray-900 dark:text-white mb-4 text-center">
              Career Timeline
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-light text-center mb-8">
              Key milestones and achievements from education to industry impact
            </p>
            
            {/* Filter controls */}
            <TimelineFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
            {/* Year navigation sidebar */}
            <YearNavigation 
              years={years} 
              activeYear={activeYear} 
              setActiveYear={setActiveYear} 
            />
            
            {/* Timeline content */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {displayedMilestones.length > 0 ? (
                  <motion.div
                    key={activeFilter + activeYear}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {displayedMilestones.map((milestone, index) => (
                      <div key={milestone.id} id={`milestone-${milestone.id}`}>
                        <MilestoneCard 
                          milestone={milestone} 
                          index={index} 
                          isActive={true} 
                        />
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-16 text-center"
                  >
                    <p className="text-gray-500 dark:text-gray-400">No entries found for the selected filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <SkillsOverview />

      {/* Key Achievements */}
      <WorkLifeBalance />

      {/* Current Status */}
      <section className="py-20 px-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <Heading level={2} weight="medium" className="text-gray-900 dark:text-white mb-6">
              What's Next
            </Heading>
            
                          <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Currently
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Building mutliple projects, serving at HackNYU & Qualcomm. Pursuing MS in Computer Science at NYU.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700 dark:text-green-400">Available for opportunities</span>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Looking For
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Full-time opportunities in AI/ML engineering, technical leadership roles, 
                    or innovative startups building the future.
                  </p>
                  <MonoText className="text-gray-500 dark:text-gray-400 text-sm">
                    Expected graduation: May 2026
                  </MonoText>
                </div>
              </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}