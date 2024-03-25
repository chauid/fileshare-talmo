/* eslint-disable global-require */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['node_modules/flowbite-react/lib/esm/**/*.js', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xxs: '384px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1440px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
export default config;
