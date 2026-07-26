/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1B2430',
          50: '#F4F6F7',
          100: '#E4E8EA',
          200: '#C4CCD1',
          400: '#6E7A85',
          600: '#3C4753',
          800: '#212B36',
          900: '#151B23'
        },
        teal: {
          DEFAULT: '#0E7C86',
          50: '#EAF6F7',
          100: '#D3ECEE',
          400: '#2C9BA4',
          600: '#0E7C86',
          700: '#0A5E66',
          900: '#063B40'
        },
        amber: {
          DEFAULT: '#E8A33D',
          100: '#FBEAD2',
          600: '#E8A33D',
          700: '#C4831F'
        },
        paper: '#FBFAF8'
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        panel: '0 1px 2px rgba(27,36,48,0.06), 0 8px 24px -12px rgba(27,36,48,0.18)',
        paper: '0 2px 4px rgba(27,36,48,0.05), 0 20px 48px -20px rgba(27,36,48,0.25)'
      }
    }
  },
  plugins: []
}