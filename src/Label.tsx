import type React from 'react'
import { useFractionalRangeContext } from './context'

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
}

export function Label({ children, ...rest }: LabelProps) {
  const { labelText } = useFractionalRangeContext()
  return (
    <span data-label {...rest}>
      {labelText}
      {children}
    </span>
  )
}
