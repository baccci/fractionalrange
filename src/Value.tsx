import React from 'react'
import { cn } from './utils/tailwindClassMerge'
import { useFractionalRangeContext } from './context'

export interface ValueProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode
  value?: number
}

export const Value: React.FC<ValueProps> = ({ children, value: _value, className, ...rest }) => {
  const { value } = useFractionalRangeContext()
  const valueSign = (value || 1) > 0
    ? '+'
    : '-'
  const Component = children || <ValueDisplay value={value} valueSign={valueSign} />

  return (
    <div
      className={cn('flex gap-1', className)}
      {...rest}
    >
      {Component}
    </div>
  )
}

interface ValueDisplayProps {
  value: number | undefined
  valueSign: '+' | '-'
}

const ValueDisplay: React.FC<ValueDisplayProps> = ({ value, valueSign }) => {
  return (
    <>
      <span>{valueSign}</span>
      <span>{Math.abs(value || 0)}</span>
    </>
  )
}

Value.displayName = 'Value'