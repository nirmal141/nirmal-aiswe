// src/components/sections/Projects.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Heading, MonoText, Caption } from '../ui/TypographyElements';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'CodeRalph',
    subtitle: 'real-time collaborative code editor',
    year: '2025',
    description: 'A next-generation real-time collaborative code editor with Ghost Agents - intelligent, proactive assistants that augment your development workflow with live collaboration, predictive conflict resolution, and automated code visualization completely powered by the combination of Minimax Agents, Gemini 3 Pro and Nano Banana Pro.',
    tech: ['Minimax Agents', 'Gemini', 'Yjs', 'WebSockets', 'CRDTs', 'TypeScript', 'Monaco Editor', 'Shadcn/UI'],
    metrics: [
      { label: 'Collaboration', value: 'Real-time' },
      { label: 'Conflict Resolution', value: 'Predictive' },
      { label: 'Automation', value: 'Automated Code Visualization' }
    ],
    status: 'In Production / Hackathon Winner',
    link: 'https://coderalph.com',
    featured: true
  },
  {
    title: 'Tuesday.com',
    subtitle: 'Digital Twins & Project Simulator Platform',
    year: '2025',
    description: 'Built 10,000 AI customer replicas to test email campaigns before sending. See who opens, clicks, converts—or unsubscribes—in under 800ms. Plus a Gemini-powered project simulator that shows ripple effects when timelines change.',
    tech: ['React', 'TypeScript', 'FastAPI', 'Scikit-Learn', 'Gemini AI', 'Gradient Boosting', 'Tailwind', 'Framer Motion'],
    metrics: [
      { label: 'Customer Twins', value: '10,000' },
      { label: 'Response Time', value: '<800ms' }
    ],
    status: 'Hackathon Winner',
    link: 'https://github.com/pru10t/tuesday.com',
    featured: true
  },
  {
    title: 'Sentio',
    subtitle: 'Visual RAG System with Agentic Computer Vision',
    year: '2025',
    description: 'A unified visual RAG system for security and law enforcement that processes video footage (body cams, surveillance, dashcams) with natural language search across visual content, spoken audio, and detected objects. Features multi-modal search, smart deduplication, real-time object detection, and click-to-track segmentation.',
    tech: ['LLaVA', 'YOLO', 'SAM2', 'Whisper', 'Llama', 'FastAPI', 'PostgreSQL', 'Docker'],
    metrics: [
      { label: 'Processing Latency', value: '~200ms' },
      { label: 'Cost per Frame', value: '$0' }
    ],
    status: 'Hackathon Winner',
    link: 'https://github.com/nirmal141/nvidiaxdell-hack',
    featured: true
  },
  {
    title: 'GhostWheel',
    subtitle: 'Low-Latency CV Racing Controller',
    year: '2025',
    description: 'Built a real-time computer vision steering engine for Slowroads.io in under 60 minutes. Features smart frame skipping that decouples AI from render loop (2x FPS), custom PWM steering algorithm to fake analog input from binary keyboard, and optimized MediaPipe hand tracking with zero visual overhead.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'Computer Vision'],
    metrics: [
      { label: 'Build Time', value: '<60 min' },
      { label: 'Framerate', value: '2x FPS' }
    ],
    status: 'Side Project',
    link: 'https://github.com/nirmal141/ghostwheel',
    featured: true
  },
  {
    title: 'Geminecraft',
    subtitle: 'Voxel Building Game in React',
    year: '2025',
    description: 'A pixelated voxel building game with first-person controls, multiple block types, dynamic weather, save/load system, and particle effects. Built with React 19, Three.js, React Three Fiber, and Zustand for state management.',
    tech: ['React', 'Three.js', 'React Three Fiber', 'Zustand', 'TypeScript', 'Vite', 'Tailwind CSS'],
    metrics: [
      { label: 'Block Types', value: '5+' },
      { label: 'Performance', value: 'Optimized' }
    ],
    status: 'Side Project',
    link: 'https://github.com/nirmal141/geminecraft',
    featured: true
  },
  {
    title: 'Tiny LLM',
    subtitle: 'GPT-Style Language Model from Scratch',
    year: '2025',
    description: 'A minimal GPT-style language model built from scratch in PyTorch, trained on Shakespeare. Features a 4-layer transformer with 4 attention heads (3.2M parameters), character-level tokenization, causal self-attention, and top-k/nucleus sampling for text generation.',
    tech: ['PyTorch', 'Python', 'Transformers', 'NLP', 'Deep Learning'],
    metrics: [
      { label: 'Parameters', value: '3.2M' },
      { label: 'Layers', value: '4' }
    ],
    status: 'Learning Project',
    link: 'https://github.com/nirmal141/tiny-llm-from-scratch',
    featured: true
  },
  {
    title: 'NegotAItion',
    subtitle: 'AI-Powered Price Negotiation System',
    year: '2025',
    description: 'An intelligent negotiation system that simulates realistic car price negotiations between buyers and sellers. Features AI-powered dynamic response generation, real-time sentiment analysis, multiple negotiation strategies (Stand Firm, Split the Difference, Final Offer, Walk Away), and progress tracking with negotiation metrics.',
    tech: ['React', 'FastAPI', 'Anthropic API', 'Python', 'Pydantic', 'Axios'],
    metrics: [
      { label: 'Strategies', value: '5+' },
      { label: 'Analysis', value: 'Real-time' }
    ],
    status: 'Side Project',
    link: 'https://github.com/nirmal141/negotAItion',
    featured: true
  },
  {
    title: 'AI Journal built on Cloudflare Workers',
    subtitle: 'Serverless AI Journal with Durable Objects',
    year: '2025',
    description: 'A chat-based AI journal built on Cloudflare Workers using a custom agent pattern with Durable Objects for persistent state. Features a 5-entry context window for Llama 3.3 70B responses, automatic mood analysis via separate AI calls, SQL emulation layer for querying entries, and stateful memory across sessions—all running on the edge with zero cold starts.',
    tech: ['Cloudflare Workers', 'Durable Objects', 'Workers AI', 'Llama 3.3 70B', 'TypeScript', 'Edge Computing'],
    metrics: [
      { label: 'Model', value: 'Llama 3.3 70B' },
      { label: 'Architecture', value: 'Edge-native' }
    ],
    status: 'Side Project',
    link: 'https://github.com/nirmal141/cf_ai_journal',
    featured: true
  },
    {
        title: 'PyroGuard AI',
        subtitle: 'Multi-Agent RL System for Wildfire Suppression',
        year: '2025',
        description: 'Deployed an autonomous wildfire suppression system with multi-agent RL (Dueling DQN) drone swarms. Engineered a multi-objective reward system balancing suppression, efficiency, and safety, achieving 85% mission success and 2.4x more fires extinguished vs. rule-based drones. Awarded Best Presentation at the Qualcomm Snapdragon Multiverse Hackathon at Princeton.',
        tech: ['PyTorch', 'DQN', 'CNN', 'Gymnasium', 'Reinforcement Learning', 'Multi-Agent Systems'],
        metrics: [
          { label: 'Mission Success', value: '85%' },
          { label: 'Performance Gain', value: '2.4x' },
          { label: 'Award', value: 'Best Presentation' }
        ],
        status: 'Hackathon Winner',
        link: 'https://github.com/nirmal141/PyroguardAI',
        featured: true
      },
    {
        title: 'TutorAI',
        subtitle: 'Offline AI Teaching Assistant for rural students and teachers.',
        year: '2025',
        description: 'AI tutor that helps students learn and understand complex topics through personalized learning paths and interactive quizzes. Learn from the best professors and teachers around the world.',
        tech: ['Python', 'TensorFlow', 'Scikit-learn', 'JavaScript', 'Local LLMs', 'Snapdragon', 'NPU', 'Agentic RAG'],
        metrics: [
          { label: 'Published', value: 'Qualcomm Blog' }
        ],
        status: 'Hackathon Winner',
        link: 'https://tutorai-iota.vercel.app',
        featured: true
      },
      { 
        title: 'PawScript',
        subtitle: 'AI tool to convert live vet consultations into prescriptions.',
        year: '2025',
        description: 'AI tool to convert live vet consultations into prescriptions. Built a custom LLM that can understand the context of the conversation and generate prescriptions.',
        tech: ['Python', 'AWS', 'Langchain', 'JavaScript', 'LLMs', 'MySQL'],
        metrics: [
          { label: 'Reduced Manual Effort', value: '70%' }
        ],
        status: 'Production',
        link: 'https://pawscript-ljeg.vercel.app',
        featured: true
      },
      {
        title: 'Agentic Marketing Copilot',
        subtitle: 'AI-Powered Customer Insights',
        year: '2025',
        description: 'Leading development at Chewy of an intelligent system creating rich customer cohorts for precision marketing and campaign optimization.',
        tech: ['Python', 'Langchain', 'TensorFlow', 'AWS', 'PostgreSQL'],
        metrics: [
          { label: 'Revenue Impact', value: '$16M+' },
          { label: 'ROAS Improvement', value: '100%' }
        ],
        status: 'Internship Work',
        link: '#',
        featured: true
      },
  
    {
    title: 'FitFarm',
    subtitle: 'Smart Agriculture System',
    year: '2024',
    description: 'Machine learning algorithms predict optimal crops based on soil conditions with 93% accuracy. Published research in IJRASET journal showcasing innovative agricultural AI solutions.',
    tech: ['Python', 'TensorFlow', 'Scikit-learn', 'IoT', 'JavaScript'],
    metrics: [
      { label: 'Accuracy', value: '93%' },
      { label: 'Published', value: 'IJRASET' }
    ],
    status: 'Published Research',
    link: 'https://github.com/nirmal141/FitFarm-main',
    featured: true
  },
  {
    title: 'Fittify',
    subtitle: 'Comprehensive Health Platform',
    year: '2023',
    description: 'End-to-end health solution using MERN stack, serving 500+ users with personalized medical tracking, diet plans, and workout routines.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    metrics: [
      { label: 'Users', value: '200+' },
      { label: 'Satisfaction', value: '95%' },
      { label: 'Health Improvement', value: '25%' }
    ],
    status: 'Live Production',
    link: 'https://github.com/nirmal141/Fittify---The-Health-Portfolio',
    featured: true
  },
  {
    title: 'Employee Tracking System',
    subtitle: 'Computer Vision Automation',
    year: '2023',
    description: 'YOLOv7-powered attendance system reducing manual effort by 50% while serving 200+ employees with automated face recognition.',
    tech: ['Python', 'YOLOv7', 'TensorFlow', 'PyTorch', 'NumPy'],
    metrics: [
      { label: 'Efficiency Gain', value: '50%' },
      { label: 'Employees Served', value: '200+' }
    ],
    status: 'Enterprise Solution',
    link: '#',
    featured: false
  }
];

// ProjectCard component with expandable description
interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Check if text is actually truncated (overflows 3 lines)
  useEffect(() => {
    const el = textRef.current;
    if (el) {
      // Compare scrollHeight (full content) vs clientHeight (visible)
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [project.description]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <Card
        className="group overflow-hidden relative h-full"
      >
        <div className="p-5 md:p-6 relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <MonoText className="text-gray-500 dark:text-gray-400 text-sm">
                  {project.year}
                </MonoText>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {project.subtitle}
              </p>
            </div>
            
            <Link 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1.5 text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Description - 3 lines by default, expandable if overflow */}
          <div className="mb-4">
            <p 
              ref={textRef}
              className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed ${
                !isExpanded ? 'line-clamp-3' : ''
              }`}
            >
              {project.description}
            </p>
            {isTruncated && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                {isExpanded ? (
                  <>Read less <ChevronUp size={12} /></>
                ) : (
                  <>Read more <ChevronDown size={12} /></>
                )}
              </button>
            )}
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-xs text-gray-700 dark:text-gray-300 rounded-sm"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* Metrics & Status - push to bottom */}
          <div className="mt-auto flex items-end justify-between">
            <div className="flex gap-4">
              {project.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label}>
                  <div className="text-base font-light text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                  <Caption className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</Caption>
                </div>
              ))}
            </div>
            
            <Caption className="text-gray-900 dark:text-white text-xs">
              {project.status}
            </Caption>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 px-4 md:px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:gap-8">
            <div>
              <Heading level={2} weight="medium" className="text-gray-900 dark:text-white mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">
                Selected Works
              </Heading>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light max-w-2xl">
                A collection of projects demonstrating expertise in AI, machine learning, 
                and full-stack development—each solving real-world problems.
              </p>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 mt-4 lg:mt-0">
              <Caption>2023—2025</Caption>
              <div className="w-8 md:w-12 h-px bg-gray-300"></div>
              <MonoText className="text-gray-500 text-xs md:text-sm">
                {projects.length} Projects
              </MonoText>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 lg:mt-20 text-center"
        >
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light mb-6 md:mb-8">
            Interested in collaborating on your next project?
          </p>
          <button className="px-6 md:px-8 py-2.5 md:py-3 border border-gray-900 dark:border-gray-300 text-gray-900 dark:text-gray-300 text-sm md:text-base hover:bg-gray-900 dark:hover:bg-gray-300 hover:text-white dark:hover:text-gray-900 transition-all duration-300">
            Let's Work Together
          </button>
        </motion.div>
      </div>
    </section>
  );
}
