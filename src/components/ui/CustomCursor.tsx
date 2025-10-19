// ✨ CUSTOM CURSOR - Ultra smooth cursor with instant response
// src/components/ui/CustomCursor.tsx

'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  // Always use white cursor (dark mode only)
  const shouldUseLightCursor = true;

  useEffect(() => {
    // Instant cursor position update - no lag
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor - instant position, no spring delay */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'none', // No transitions for instant response
        }}
      >
        {/* OPTION 1: Minimal Circle Cursor - Clean and modern */}
        {/* <div className={`w-8 h-8 rounded-full border-2 backdrop-blur-sm ${shouldUseLightCursor ? 'border-white bg-white/10' : 'border-black bg-black/10'}`}>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${shouldUseLightCursor ? 'bg-white' : 'bg-black'}`}></div>
        </div> */}

        {/* OPTION 2: Arrow Cursor - Classic and sharp */}
        {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L18 10L8 12L2 18L2 2Z" fill={shouldUseLightCursor ? "white" : "black"} stroke={shouldUseLightCursor ? "black" : "white"} strokeWidth="1" strokeLinejoin="round"/>
        </svg> */}

        {/* OPTION 3: Crosshair - Tech/Gaming vibe */}
        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="2" fill="none"/>
          <line x1="12" y1="0" x2="12" y2="6" stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="18" x2="12" y2="24" stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="2" strokeLinecap="round"/>
          <line x1="0" y1="12" x2="6" y2="12" stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="2" strokeLinecap="round"/>
          <line x1="18" y1="12" x2="24" y2="12" stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2" fill={shouldUseLightCursor ? "white" : "black"}/>
        </svg> */}

        {/* OPTION 4: Diamond Shape - Unique and elegant */}
        {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2L18 10L10 18L2 10L10 2Z" fill={shouldUseLightCursor ? "white" : "black"} stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="1.5" strokeLinejoin="round"/>
        </svg> */}

        {/* OPTION 5: Plus/Cross - Minimal and precise */}
        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" y1="4" x2="12" y2="20" stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="4" y1="12" x2="20" y2="12" stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="3" fill={shouldUseLightCursor ? "white" : "black"}/>
        </svg> */}

        {/* OPTION 6: Dot with Ring - Apple-style */}
        {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="1.5" fill="none" opacity="0.6"/>
          <circle cx="16" cy="16" r="4" fill={shouldUseLightCursor ? "white" : "black"}/>
        </svg> */}

        {/* OPTION 7: ACTIVE - Glowing Pointer - Futuristic (Color adapts to theme and page) */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path 
            d="M2 2L26 14L12 16L2 26L2 2Z" 
            fill={shouldUseLightCursor ? "white" : "black"} 
            filter="url(#glow)"
          />
          <path 
            d="M2 2L26 14L12 16L2 26L2 2Z" 
            fill="none" 
            stroke={shouldUseLightCursor ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"} 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
        </svg>

        {/* OPTION 8: Lightning Bolt - Energy/Power */}
        {/* <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1L1 16H9L8 27L19 12H11L11 1Z" fill={shouldUseLightCursor ? "white" : "black"} stroke={shouldUseLightCursor ? "white" : "black"} strokeWidth="1" strokeLinejoin="round"/>
        </svg> */}
      </div>
    </>
  );
}

