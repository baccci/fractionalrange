import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), svelte()],
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
