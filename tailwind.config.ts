import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
    screens: {
      sm: { max: '480px' },
      md: { max: '768px' },
      lg: { max: '960px' },
      xl: { max: '1200px' },
    },
  },
  plugins: [],
} satisfies Config;
