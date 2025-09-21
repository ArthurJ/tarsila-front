import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tarsila: {
          'olive-dark': '#454633',
          'olive-light': '#9c944e', 
          'olive-green': '#40591b',
          'sienna': '#723a1e',
          'burnt-orange': '#aa6735',
          'orange': '#e58200',
          'coffee': '#353026',
          'ivory': '#fff7ee',
        },
      },
      fontFamily: {
        'work-sans': ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config