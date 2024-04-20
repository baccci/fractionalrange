import React from 'react'
import { useFractionalRangeContext } from './context'
import { cn } from './utils/tailwindClassMerge'

export type IndicatorDotProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export const IndicatorDot: React.FC<IndicatorDotProps> = ({ className, ...rest }) => {
  const { activeColor, disabled } = useFractionalRangeContext()
  return (
    <span
      data-indicatordot
      className={cn('fr-size-1 fr-rounded-full fr-absolute fr-bottom-[10px] fr-left-1/2 fr--translate-x-[25%]', className)}
      style={{ backgroundColor: !disabled ? activeColor || '#fff' : '#6d6d6d' }}
      {...rest}
    />
  )
}

IndicatorDot.displayName = 'IndicatorDot'