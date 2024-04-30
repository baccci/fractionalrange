import { fractionalrange } from './src/utils/tailwindExtendTheme'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [fractionalrange()]
}
