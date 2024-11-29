import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        mainBg: "url('/HeroTopBg.png')",
        HeroMidBg: "url('/manufacturer-bg.png')",
        HeroBottomBg: "url('/HeroBottomBg.png')",
        hero: "url('/hero-bg.png')",
        producer: "url('/producer-bg.png')",
        'hero-2': "url('/hero-bg-mobile.png')",
        footer: "url('/footer.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'manufacturer-bg': "url('/manufacturer-bg.png')",
      },
      colors: {
        primary: '#F64F14',
        secondary: '#1e1e1e',
        textPrimary: '#f9f9f9',
        textSecondary: '#F1F1F1',
        textFaded: '#939393',
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
