export const PACKAGE_MANAGERS_LIST = ['NPM', 'YARN', 'PNPM', 'BUN'] as const

export const PACKAGE_MANAGERS = {
  NPM: 'NPM',
  YARN: 'YARN',
  PNPM: 'PNPM',
  BUN: 'BUN'
} as const

export const SCRIPTS = {
  NPM: 'npm install',
  YARN: 'yarn add',
  PNPM: 'pnpm install',
  BUN: 'bun add'
}

export const PACKAGE_NAME = 'fractional-range'