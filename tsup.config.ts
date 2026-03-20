import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  target: 'es2020',
  external: ['react', 'react-dom', 'motion', 'motion/react'],
  treeshake: true,
  clean: true,
})
