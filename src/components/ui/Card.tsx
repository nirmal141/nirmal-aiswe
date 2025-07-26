// src/components/ui/Card.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animated?: boolean;
  delay?: number;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  hover = true,
  animated = false,
  delay = 0,
  onClick,
  ...props
}: CardProps) {
  const cardClasses = cn(
    'bg-white border border-gray-100',
    hover && 'hover:border-gray-200 hover:shadow-sm transition-all duration-300',
    onClick && 'cursor-pointer',
    className
  );

  const content = (
    <div className={cardClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

export function CardHeader({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-6 pb-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}