import { createContext, useContext, useState } from 'react'
import type { FractionalRangeProps } from './types'

type FractionalContextArgs = FractionalRangeProps & {
  boundsWidth: number
  fractionWidth: number
  labelText?: string
}

export const useFractionalRange = ({ ...props }: FractionalContextArgs) => {
  const [translateX, setTranslateX] = useState(0)
  const currentValue = props.disabled ? 0 : props.value || 0
  const color = props.color || '#fff'

  return {
    translateX,
    setTranslateX,
    currentValue,
    color,
    ...props
  }
}

export type FractionalContextType = ReturnType<typeof useFractionalRange>

export const FractionalRangeContext = createContext<FractionalContextType | null>(null)

export const useFractionalRangeContext = () => {
  const context = useContext(FractionalRangeContext)

  if (!context) {
    throw new Error('useFractionalRangeContext must be used within a FractionalRangeContext.Provider')
  }

  return context
}
