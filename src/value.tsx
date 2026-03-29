import type React from 'react'
import { useFractionalRangeContext } from './context'

export interface ValueProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function Value({ children, ...rest }: ValueProps) {
  const { currentValue } = useFractionalRangeContext()
  const effectiveValue = currentValue ?? 0
  const prefix = effectiveValue >= 0 ? '+' : '-'

  return (
    <div data-value {...rest}>
      {children || (
        <>
          <span>{prefix}</span>
          <span>{Math.abs(effectiveValue)}</span>
        </>
      )}
    </div>
  )
}
