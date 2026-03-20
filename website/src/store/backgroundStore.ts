import { atom, computed } from 'nanostores'

const backgroundLevel = atom(1)

export const backgroundLightLevel = computed(backgroundLevel, (level) => {
  return parseFloat(Number(1 - 1 * level).toFixed(2))
})

export function setBackgroundLightLevel(value: number) {
  const safeValue = Math.min(1, Math.max(0, value))
  backgroundLevel.set(safeValue)
}