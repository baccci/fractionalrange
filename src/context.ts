import { createContext, useContext } from 'react'

export interface FractionalRangeContextValue {
  currentValue: number
  color: string
  activeColor: string
  disabled: boolean
  labelText?: string
  fractionClassName?: string
  min: number
  max: number
  step: number
}

export const FractionalRangeContext = createContext<FractionalRangeContextValue | null>(null)

export function useFractionalRangeContext() {
  const context = useContext(FractionalRangeContext)

  if (!context) {
    throw new Error(
      'useFractionalRangeContext must be used within a FractionalRangeContext.Provider',
    )
  }

  return context
}
