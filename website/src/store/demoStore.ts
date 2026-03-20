import { create } from 'zustand'

interface DemoState {
  weight: number
  hue: number
  step: number
  range: number
  setWeight: (v: number) => void
  setHue: (v: number) => void
  setStep: (v: number) => void
  setRange: (v: number) => void
}

export const useDemoStore = create<DemoState>((set) => ({
  weight: 700,
  hue: 55,
  step: 0.05,
  range: 1,
  setWeight: (v) => set({ weight: Math.round(v) }),
  setHue: (v) => set({ hue: Math.round(v) }),
  setStep: (v) => set({ step: v }),
  setRange: (v) => set({ range: v }),
}))
