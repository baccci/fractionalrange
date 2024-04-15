import React from 'react'
import { useFractionalRangeContext } from './context'

export interface LabelProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  children?: React.ReactNode
}

export const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
  const { labelText } = useFractionalRangeContext()
  return (
    <span {...rest}>
      {labelText}
      {children}
    </span>
  )
}

Label.displayName = 'Label'