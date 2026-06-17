/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#0f172a',
          900: '#0f172a',
          950: '#020617',
        },
        obsidian: '#1a1a2e',
        indigo: {
          neon: '#a78bfa',
          electric: '#818cf8',
        },
        emerald: {
          accent: '#10b981',
        },
        gold: {
          accent: '#fbbf24',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'neon-indigo': '0 0 20px rgba(129, 140, 248, 0.5)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.5)',
      },
    },
  },
  plugins: [],
}
