import plugin from 'tailwindcss/plugin'

export const fractionalrange = () => plugin(undefined, {
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
  }
})
