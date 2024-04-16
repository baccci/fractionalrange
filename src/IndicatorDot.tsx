import React from 'react'
import { useFractionalRangeContext } from './context'
import { cn } from './utils/tailwindClassMerge'

export type IndicatorDotProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export const IndicatorDot: React.FC<IndicatorDotProps> = ({ className, ...rest }) => {
  const { activeColor, disabled } = useFractionalRangeContext()
  return (
    <span
      className={cn('size-1 rounded-full absolute bottom-[10px] left-1/2 -translate-x-[25%]', className)}
      style={{ backgroundColor: !disabled ? activeColor || '#fff' : '#6d6d6d' }}
      {...rest}
    />
  )
}

IndicatorDot.displayName = 'IndicatorDot'