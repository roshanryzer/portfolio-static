/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          DEFAULT: '#0e1729',
          light: '#1e293b',
        },
        ink: {
          light: '#e2e8f0',
          muted: '#94a3b8',
          soft: '#cbd5e1',
        },
        accent: {
          DEFAULT: '#3b82f6',
          soft: '#93c5fd',
          dim: 'rgba(59, 130, 246, 0.12)',
          glow: 'rgba(59, 130, 246, 0.3)',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
        glow: '0 0 40px -8px rgba(59, 130, 246, 0.22)',
      },
    },
  },
  plugins: [],
};
