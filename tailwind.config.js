module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {},
    screens: {
      xxs: '360px',
      xxs: '400px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      menu: '880px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'is-touch': {'raw': '(hover: none), (pointer: coarse)'},
      'is-hover': {'raw': '(hover: hover) and (pointer: fine)'},
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
