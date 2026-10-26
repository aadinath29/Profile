/** @type {import('tailwindcss').Config} */

// Helper to allow opacity modifiers (e.g. bg-surface/80) with CSS variables
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${variableName}) calc(${opacityValue} * 100%), transparent)`;
    }
    return `var(${variableName})`;
  };
}

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: withOpacity('--color-bg'),
        surface: {
          DEFAULT: withOpacity('--color-surface'),
          subtle: withOpacity('--color-surface-subtle'),
          card: withOpacity('--color-surface-card'),
        },
        border: {
          DEFAULT: withOpacity('--color-border'),
          muted: withOpacity('--color-border-muted'),
        },
        'text-primary': withOpacity('--color-text-primary'),
        'text-secondary': withOpacity('--color-text-secondary'),
        'text-muted': withOpacity('--color-text-muted'),
        text: {
          primary: withOpacity('--color-text-primary'),
          secondary: withOpacity('--color-text-secondary'),
          muted: withOpacity('--color-text-muted'),
        },
        accent: {
          DEFAULT: withOpacity('--color-accent'),
          terracotta: '#C4704A',
          muted: withOpacity('--color-accent-muted'),
          // Safety aliases mapping legacy tokens to terracotta
          cyan: withOpacity('--color-accent'),
          gold: withOpacity('--color-accent'),
          glow: 'transparent',
        },
        // Static named tokens for the new system
        warmCream: '#F5F0E8',
        warmSurface: '#EDE8DF',
        charcoal: {
          DEFAULT: '#1C1A18',
          body: '#3D3A36',
          muted: '#7A756D',
        },
        terracotta: {
          DEFAULT: '#C4704A',
          hover: '#B35E38',
          light: '#D9825C',
        },
        warmBrown: {
          DEFAULT: '#141210',
          surface: '#1E1B18',
          subtle: '#272320',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        tight: '-0.015em',
        normal: '0',
        wide: '0.02em',
        widest: '0.08em',
      },
      boxShadow: {
        'warm-subtle': '0 2px 8px -2px rgba(28, 26, 24, 0.05)',
        'warm-card': '0 4px 20px -4px rgba(28, 26, 24, 0.06)',
        'warm-hover': '0 8px 30px -4px rgba(28, 26, 24, 0.1)',
        'terracotta-sm': '0 2px 10px rgba(196, 112, 74, 0.2)',
        // Neutralize old glow classes
        'glow-cyan': 'none',
        'glow-gold': 'none',
        'glow-card': '0 4px 20px -4px rgba(28, 26, 24, 0.06)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
