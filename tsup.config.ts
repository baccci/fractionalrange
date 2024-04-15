import { defineConfig } from 'tsup'

export default defineConfig({
  minify: true,
  target: 'es2018',
  external: ['react'],
  dts: true,
  format: ['esm', 'cjs'],
  injectStyle: true,
  entryPoints: ['src/index.ts']
})