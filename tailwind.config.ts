// Replace your tailwind.config.ts with this advanced typography version:

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
        heading: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      colors: {
        gray: {
          50: "#fafafa",
          100: "#f5f5f5", 
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      letterSpacing: {
        "tighter": "-0.02em",
        "tight": "-0.015em",
        "normal": "0em",
        "wide": "0.025em",
        "wider": "0.05em",
        "widest": "0.1em",
      },
      lineHeight: {
        "3": ".75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      addUtilities({
        '.text-display': {
          fontFamily: 'Playfair Display, serif',
          fontWeight: '300',
          letterSpacing: '-0.02em',
          lineHeight: '0.9',
        },
        '.text-heading': {
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: '500',
          letterSpacing: '-0.01em',
          lineHeight: '1.1',
        },
        '.text-mono': {
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: '300',
          letterSpacing: '0.01em',
        },
        '.text-body': {
          fontFamily: 'Inter, sans-serif',
          fontWeight: '300',
          letterSpacing: '-0.005em',
          lineHeight: '1.6',
        },
        '.text-gradient': {
          background: 'linear-gradient(135deg, #1a1a1a 0%, #666666 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.text-outline': {
          WebkitTextStroke: '1px #e5e5e5',
          WebkitTextFillColor: 'transparent',
        },
        '.text-shadow-soft': {
          textShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        '.prose-minimal': {
          maxWidth: 'none',
          color: '#404040',
          lineHeight: '1.6',
        },
        '.prose-minimal h1': {
          fontFamily: 'Playfair Display, serif',
          fontWeight: '300',
          letterSpacing: '-0.02em',
          color: '#171717',
        },
        '.prose-minimal h2': {
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: '500',
          letterSpacing: '-0.01em',
          color: '#171717',
        },
        '.prose-minimal h3': {
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: '500',
          letterSpacing: '-0.01em',
          color: '#171717',
        },
        '.backdrop-blur-subtle': {
          backdropFilter: 'blur(8px)',
        },
      });
    },
  ],
};

export default config;