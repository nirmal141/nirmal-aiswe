// src/components/sections/Projects.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Heading, MonoText, Caption } from '../ui/TypographyElements';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import Link from 'next/link';

const projects = [
    {
        title: 'TutorAI',
        subtitle: 'Offline AI Teaching Assistant for rural students and teachers.',
        year: '2025',
        description: 'AI tutor that helps students learn and understand complex topics through personalized learning paths and interactive quizzes. Learn from the best professors and teachers around the world.',
        tech: ['Python', 'TensorFlow', 'Scikit-learn', 'JavaScript', 'Local LLMs', 'Snapdragon', 'NPU', 'Agentic RAG'],
        metrics: [
          { label: 'Published', value: 'Qualcomm Blog' }
        ],
        status: 'Project in Progress',
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
        status: 'In Development',
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

export default function Projects() {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8">
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
              <Heading level={2} weight="medium" className="text-gray-900 mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">
                Selected Works
              </Heading>
              <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl">
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

        {/* Projects Grid */}
        <div className="space-y-6 md:space-y-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              animated
              delay={index * 0.1}
              className={cn(
                'group overflow-hidden relative cursor-pointer',
                project.featured && 'lg:grid lg:grid-cols-12 lg:gap-8'
              )}
              onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
            >
              {project.featured ? (
                // Featured Project Layout
                <>
                  <div className="lg:col-span-8 p-5 md:p-8 lg:p-12 relative z-10 pointer-events-none">
                    <div className="flex items-start justify-between mb-4 md:mb-6">
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-1 md:mb-2">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900">
                            {project.title}
                          </h3>
                          <MonoText className="text-gray-500 text-sm md:text-base">
                            {project.year}
                          </MonoText>
                        </div>
                        <p className="text-base md:text-lg text-gray-600">
                          {project.subtitle}
                        </p>
                      </div>
                      
                      <Link 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-1 md:p-2 text-gray-400 hover:text-gray-900 transition-colors z-20 relative pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowUpRight size={18} className="md:w-5 md:h-5" />
                      </Link>
                    </div>

                    <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-5 md:mb-8">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-5 md:mb-8">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 md:px-3 py-0.5 md:py-1 bg-gray-50 border border-gray-100 text-xs md:text-sm text-gray-700 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex flex-wrap gap-4 md:gap-8">
                        {project.metrics.map((metric) => (
                          <div key={metric.label} className="min-w-[80px]">
                            <div className="text-lg md:text-2xl font-light text-gray-900">
                              {metric.value}
                            </div>
                            <Caption className="text-xs md:text-sm">{metric.label}</Caption>
                          </div>
                        ))}
                      </div>
                      
                      <Caption className="text-gray-900 text-xs md:text-sm">
                        {project.status}
                      </Caption>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-gray-50 p-5 md:p-8 lg:p-12 flex items-center justify-center min-h-[200px] md:min-h-[250px] lg:min-h-[300px] relative z-10 pointer-events-none">
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full mb-3 md:mb-4 mx-auto"></div>
                      <MonoText className="text-xs md:text-sm">Project Preview</MonoText>
                    </div>
                  </div>
                </>
              ) : (
                // Standard Project Layout
                <div className="p-5 md:p-8 relative z-10 pointer-events-none">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-1 md:mb-2">
                        <h3 className="text-lg md:text-xl font-medium text-gray-900">
                          {project.title}
                        </h3>
                        <MonoText className="text-gray-500 text-sm">
                          {project.year}
                        </MonoText>
                      </div>
                      <p className="text-sm md:text-base text-gray-600">
                        {project.subtitle}
                      </p>
                    </div>
                    
                    <Link 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-1 md:p-2 text-gray-400 hover:text-gray-900 transition-colors z-20 relative pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight size={16} className="md:w-4 md:h-4" />
                    </Link>
                  </div>

                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 md:py-1 bg-gray-50 border border-gray-100 text-xs text-gray-700 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-wrap gap-4 md:gap-6">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="min-w-[80px]">
                          <div className="text-base md:text-lg font-light text-gray-900">
                            {metric.value}
                          </div>
                          <Caption className="text-xs">{metric.label}</Caption>
                        </div>
                      ))}
                    </div>
                    
                    <Caption className="text-gray-900 text-xs md:text-sm">
                      {project.status}
                    </Caption>
                  </div>
                </div>
              )}
            </Card>
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
          <p className="text-base md:text-lg text-gray-600 font-light mb-6 md:mb-8">
            Interested in collaborating on your next project?
          </p>
          <button className="px-6 md:px-8 py-2.5 md:py-3 border border-gray-900 text-gray-900 text-sm md:text-base hover:bg-gray-900 hover:text-white transition-all duration-300">
            Let's Work Together
          </button>
        </motion.div>
      </div>
    </section>
  );
}