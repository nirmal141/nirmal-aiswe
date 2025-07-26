'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

// Inspirational code snippets in different languages
const codeSnippets = [
  {
    language: 'JavaScript',
    code: `function createFuture() {
  const dreams = [];
  return {
    add: (dream) => dreams.push(dream),
    achieve: () => dreams.map(d => d())
  };
}`,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50'
  },
  {
    language: 'Python',
    code: `def embrace_challenges():
    while True:
        try:
            solve_problem()
            learn_from_mistakes()
            grow_stronger()
        except Obstacle as e:
            overcome(e)`,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    language: 'Rust',
    code: `fn build_resilience() -> Result<Success, Failure> {
    let mut attempts = 0;
    loop {
        attempts += 1;
        if let Ok(success) = try_again() {
            return Ok(success);
        }
        if attempts > 1000 { continue; } // Never give up
    }
}`,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
  {
    language: 'TypeScript',
    code: `interface Dream {
  vision: string;
  execute(): Promise<Success>;
}

async function pursuePassion(dream: Dream): Promise<Success> {
  const hardWork = new Persistence(dream.vision);
  return await hardWork.untilSuccess();
}`,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50'
  },
  {
    language: 'Go',
    code: `func neverGiveUp(goal string) {
  for {
    progress := makeProgress(goal)
    if progress.isComplete() {
      celebrate()
      break
    }
    learn(progress.lessons())
  }
}`,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50'
  },
  {
    language: 'Swift',
    code: `func buildTheFuture() {
  let vision = Vision(dream: "Better Tomorrow")
  let determination = Determination.unlimited
    
  while !vision.isAchieved {
    vision.workTowards(with: determination)
  }
}`,
    color: 'text-orange-400',
    bgColor: 'bg-orange-50'
  }
];

interface FloatingCodeProps {
  className?: string;
  maxSnippets?: number;
}

export default function FloatingCode({ className, maxSnippets = 4 }: FloatingCodeProps) {
  const [snippets, setSnippets] = useState<Array<typeof codeSnippets[0] & { 
    x: number; 
    y: number; 
    scale: number; 
    rotate: number; 
    opacity: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Select random snippets
    const shuffled = [...codeSnippets].sort(() => 0.5 - Math.random());
    const selectedSnippets = shuffled.slice(0, maxSnippets);
    
    // Create random positions for code snippets
    const snippetsToShow = selectedSnippets.map(snippet => ({
      ...snippet,
      x: Math.random() * 80 - 40, // -40% to 40% from center
      y: Math.random() * 60 - 30, // -30% to 30% from center
      scale: 0.8 + Math.random() * 0.3, // 0.8 to 1.1 (larger)
      rotate: Math.random() * 6 - 3, // -3 to 3 degrees (less rotation)
      opacity: 0.7 + Math.random() * 0.3, // 0.7 to 1.0 (more visible)
      duration: 15 + Math.random() * 10, // 15 to 25 seconds (faster)
      delay: Math.random() * 2 // 0 to 2 seconds delay (shorter)
    }));
    
    setSnippets(snippetsToShow);
  }, [maxSnippets]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {snippets.map((snippet, index) => (
        <motion.div
          key={`${snippet.language}-${index}`}
          className="absolute left-1/2 top-1/2"
          initial={{ 
            opacity: 0,
            x: 0,
            y: 0,
            scale: 0.8
          }}
          animate={{
            opacity: snippet.opacity,
            x: `${snippet.x}%`,
            y: `${snippet.y}%`,
            rotate: snippet.rotate,
            scale: snippet.scale
          }}
          transition={{
            duration: 1.5,
            delay: snippet.delay,
            ease: "easeOut"
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0, -5, 0],
              rotate: [snippet.rotate, snippet.rotate + 1, snippet.rotate - 1, snippet.rotate]
            }}
            transition={{
              duration: snippet.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className={cn(
              "bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-xs",
              "hover:shadow-xl transition-shadow duration-300"
            )}
            style={{
              boxShadow: `0 0 20px 0 rgba(0,0,0,0.1), 0 0 8px 0 ${snippet.color.includes('yellow') ? 'rgba(250,204,21,0.3)' : 
                snippet.color.includes('blue') ? 'rgba(59,130,246,0.3)' : 
                snippet.color.includes('orange') ? 'rgba(249,115,22,0.3)' : 
                snippet.color.includes('cyan') ? 'rgba(6,182,212,0.3)' : 'rgba(0,0,0,0.2)'}`
            }}
          >
            <div className="flex items-center mb-2">
              <div className={cn("h-3 w-3 rounded-full mr-2", snippet.color.replace('text-', 'bg-'))}></div>
              <span className="text-xs font-medium text-gray-500">{snippet.language}</span>
            </div>
            <pre className="text-xs overflow-hidden">
              <code className={cn("font-mono", snippet.color)}>
                {snippet.code}
              </code>
            </pre>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
} 