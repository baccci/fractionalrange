/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  prefix: 'fr-', // prefix for the generated classes to avoid conflicts
  theme: {
    fontFamily: {
      sans: ['Geist', 'system-ui', 'sans-serif'],
      mono: ['GeistMono', 'monospace']
    },
    extend: {
      colors: {
        black: '#111',
        borderblack: '#222'
      }
    }
  },
  plugins: []
}
