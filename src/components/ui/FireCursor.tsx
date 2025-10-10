// ✨ FIRE CURSOR - Smooth fire effect that follows the cursor
// src/components/ui/FireCursor.tsx

'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function FireCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const animationRef = useRef<number>();
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isMoving: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Create fire particle
    const createParticle = (x: number, y: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5;
      const life = Math.random() * 20 + 30; // Shorter life for cleaner effect
      
      return {
        x,
        y: y + Math.random() * 10 - 5,
        vx: Math.cos(angle) * speed * 0.3,
        vy: -Math.abs(Math.sin(angle) * speed) - Math.random() * 2 - 1,
        life,
        maxLife: life,
        size: Math.random() * 6 + 3, // Slightly smaller particles
        hue: Math.random() * 30 + 5 // Orange to yellow range
      };
    };

    // Animation loop
    const animate = (currentTime: number) => {
      if (!ctx || !canvas) return;

      // Clear canvas with trail effect - increased opacity for cleaner fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Spawn new particles when mouse is moving
      if (mouse.isMoving) {
        const spawnRate = 2; // Reduced particle count for cleaner effect
        for (let i = 0; i < spawnRate; i++) {
          particlesRef.current.push(
            createParticle(
              mouse.x + (Math.random() - 0.5) * 10,
              mouse.y + (Math.random() - 0.5) * 10
            )
          );
        }
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.08; // Slight gravity
        particle.life--;

        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife;
        
        if (particle.life <= 0) return false;

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );

        // Fire colors: bright center to darker edges
        if (lifeRatio > 0.7) {
          // Bright white/yellow center when fresh
          gradient.addColorStop(0, `hsla(${particle.hue + 50}, 100%, 80%, ${lifeRatio})`);
          gradient.addColorStop(0.3, `hsla(${particle.hue}, 100%, 60%, ${lifeRatio * 0.8})`);
          gradient.addColorStop(0.6, `hsla(${particle.hue - 10}, 100%, 50%, ${lifeRatio * 0.5})`);
          gradient.addColorStop(1, `hsla(0, 100%, 30%, 0)`);
        } else {
          // Fade to red/orange as it dies
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${lifeRatio})`);
          gradient.addColorStop(0.4, `hsla(${particle.hue - 20}, 90%, 50%, ${lifeRatio * 0.6})`);
          gradient.addColorStop(0.7, `hsla(0, 80%, 40%, ${lifeRatio * 0.3})`);
          gradient.addColorStop(1, `hsla(0, 70%, 20%, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect for brighter particles
        if (lifeRatio > 0.5) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = `hsla(${particle.hue}, 100%, 60%, ${lifeRatio * 0.5})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * lifeRatio * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

