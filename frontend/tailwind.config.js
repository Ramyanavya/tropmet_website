/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef4fc',
          100: '#cde0f5',
          200: '#9ec1eb',
          300: '#6ea2e1',
          400: '#3e83d7',
          500: '#1a5fa8',
          600: '#134d8c',
          700: '#0e3d70',
          800: '#0b2d5e',
          900: '#071e40',
          950: '#021b3e',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        amber: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
      fontFamily: {
        display: ['"Libre Baskerville"', 'Georgia', 'serif'],
        sans:    ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'card':   '0 1px 3px 0 rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.06)',
        'lift':   '0 4px 24px -4px rgba(11,45,94,.14)',
        'strong': '0 8px 40px -8px rgba(11,45,94,.22)',
      },
      animation: {
        'fade-up':   'fadeUp .65s cubic-bezier(.22,1,.36,1) forwards',
        'fade-in':   'fadeIn .5s ease forwards',
        'marquee':   'marquee 30s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity:0, transform:'translateY(20px)' }, '100%': { opacity:1, transform:'translateY(0)' } },
        fadeIn:   { '0%': { opacity:0 }, '100%': { opacity:1 } },
        marquee:  { '0%': { transform:'translateX(0)' }, '100%': { transform:'translateX(-50%)' } },
        pulseDot: { '0%,100%': { opacity:1, transform:'scale(1)' }, '50%': { opacity:.5, transform:'scale(1.4)' } },
      },
    },
  },
  plugins: [],
}
