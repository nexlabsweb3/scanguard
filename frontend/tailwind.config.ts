import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/hero-bg.png')",
        producer: "url('/producer-bg.png')",
        'hero-2': "url('/hero-bg-mobile.png')",
        footer: "url('/footer.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#F64F14',
        secondary: {
          light: '#ffffff',
          DEFAULT: '#1e1e1e',
        },
        textPrimary: {
          light: '#1e1e1e',
          DEFAULT: '#f9f9f9',
        },
        textSecondary: {
          light: '#2e2e2e',
          DEFAULT: '#F1F1F1',
        },
        textFaded: {
          light: '#666666',
          DEFAULT: '#939393',
        },
      },

      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        bowlby: ['var(--font-bowlby)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
