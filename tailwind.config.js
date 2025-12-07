/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm, grounding earth tones for life coaching
        primary: '#8B7355',      // Warm earth brown - grounding, trustworthy
        secondary: '#A67C52',    // Soft caramel - warmth, comfort
        accent: '#C4A77D',       // Golden sand - hope, clarity

        // Calming nature-inspired palette
        sage: '#9CAF88',         // Sage green - growth, renewal
        terracotta: '#C87941',   // Terracotta - earthiness, creativity

        // Soft backgrounds
        cream: '#FAF7F2',        // Warm cream - openness, calm
        sand: '#F5EBE0',         // Soft sand - warmth, safety
        stone: '#E8E2D9',        // Light stone - stability

        // Text colors
        charcoal: '#3D3D3D',     // Soft charcoal - readable, gentle
        warmgray: '#6B6B6B',     // Warm gray - secondary text
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'float': 'float 4s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'gentle-pulse': 'gentlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(139, 115, 85, 0.1), 0 4px 6px -2px rgba(139, 115, 85, 0.05)',
        'warm': '0 4px 20px -5px rgba(139, 115, 85, 0.15)',
      },
    },
  },
  plugins: [],
}