// src/components/ui/TypographyElements.tsx
'use client';

import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'display' | 'heading' | 'subheading' | 'body' | 'mono' | 'caption';
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  as?: keyof JSX.IntrinsicElements;
  gradient?: boolean;
  outline?: boolean;
  animated?: boolean;
}

const variants = {
  display: 'text-4xl md:text-6xl lg:text-8xl text-display',
  heading: 'text-3xl md:text-4xl lg:text-5xl text-heading',
  subheading: 'text-xl md:text-2xl lg:text-3xl text-heading',
  body: 'text-base md:text-lg text-body',
  mono: 'text-sm md:text-base text-mono',
  caption: 'text-xs md:text-sm text-body uppercase tracking-wider',
};

const weights = {
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export function Typography({
  children,
  className,
  variant = 'body',
  weight = 'normal',
  as: Component = 'p',
  gradient = false,
  outline = false,
  animated = false,
  ...props
}: TypographyProps) {
  const classes = cn(
    variants[variant],
    weights[weight],
    gradient && 'text-gradient',
    outline && 'text-outline',
    className
  );

  const content = React.createElement(
    Component,
    {
      className: classes,
      ...props
    },
    children
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Specialized typography components
export function DisplayText({ children, className, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography
      variant="display"
      className={cn('text-shadow-soft', className)}
      as="h1"
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Heading({ children, className, level = 2, ...props }: Omit<TypographyProps, 'variant' | 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Typography
      variant="heading"
      as={HeadingTag}
      className={className}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function MonoText({ children, className, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography
      variant="mono"
      className={cn('text-gray-600', className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Caption({ children, className, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography
      variant="caption"
      className={cn('text-gray-500', className)}
      {...props}
    >
      {children}
    </Typography>
  );
} 