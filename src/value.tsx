import type React from 'react'
import { useFractionalRangeContext } from './context'

export interface ValueProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function Value({ children, ...rest }: ValueProps) {
  const { currentValue } = useFractionalRangeContext()
  const sign = (currentValue || 1) > 0 ? '+' : '-'

  return (
    <div data-value {...rest}>
      {children || (
        <>
          <span>{sign}</span>
          <span>{Math.abs(currentValue || 0)}</span>
        </>
      )}
    </div>
  )
}
