import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: '',
      logo: {
        src: './src/assets/logo.svg',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/baccci/fractionalrange' },
      ],
      customCss: ['./src/styles/docs.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'installation' },
            { label: 'Quick Start', slug: 'quick-start' },
          ],
        },
        {
          label: 'Usage',
          items: [
            { label: 'Props', slug: 'props' },
            { label: 'Compound Components', slug: 'compound-components' },
            { label: 'Theming', slug: 'theming' },
            { label: 'Sound & Feedback', slug: 'sound' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Tailwind CSS', slug: 'tailwind' },
            { label: 'Examples', slug: 'examples' },
          ],
        },
      ],
    }),
    react(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['fractionalrange', 'motion', 'motion/react'],
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
})
