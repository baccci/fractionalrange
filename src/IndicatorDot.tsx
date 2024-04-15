import React from 'react'
import { useFractionalRangeContext } from './context'
import classNames from 'classnames'

export type IndicatorDotProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export const IndicatorDot: React.FC<IndicatorDotProps> = ({ className, ...rest }) => {
  const { activeColor, disabled } = useFractionalRangeContext()
  return (
    <span
      className={classNames('indicator-dot', className)}
      style={{ backgroundColor: !disabled ? activeColor || '#fff' : '#6d6d6d' }}
      {...rest}
    />
  )
}

IndicatorDot.displayName = 'IndicatorDot'