import { create } from 'zustand'

interface DemoState {
  weight: number
  hue: number
  tracking: number
  blur: number
  setWeight: (v: number) => void
  setHue: (v: number) => void
  setTracking: (v: number) => void
  setBlur: (v: number) => void
}

export const useDemoStore = create<DemoState>((set) => ({
  weight: 700,
  hue: 55,
  tracking: -5,
  blur: 0,
  setWeight: (v) => set({ weight: Math.round(v) }),
  setHue: (v) => set({ hue: Math.round(v) }),
  setTracking: (v) => set({ tracking: v }),
  setBlur: (v) => set({ blur: v }),
}))
