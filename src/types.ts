import type React from 'react'
import type { IndicatorDotProps } from './indicator-dot'
import type { LabelProps as LabelComponentProps } from './label'
import type { ValueProps } from './value'

export type DetailedProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onChange'
>

type LabelProps =
  | {
      label: React.ReactNode
      'aria-label': string
    }
  | {
      label: string
      'aria-label'?: string
    }

export type FractionalRangeProps = DetailedProps & {
  min: number
  max: number
  step: number
  value?: number
  initialValue?: number
  id?: string
  className?: string
  onChange?: (value: number) => void
  onStep?: (value: number) => void
  color?: string
  activeColor?: string
  disabled?: boolean
  showIndicator?: boolean
  showShadows?: boolean
  fractionClassName?: string
} & LabelProps

export type FractionalRangeType = React.FC<FractionalRangeProps> & {
  Titlebar: React.FC<DetailedProps>
  Label: React.FC<LabelComponentProps>
  Value: React.FC<ValueProps>
  IndicatorDot: React.FC<IndicatorDotProps>
  Shadows: React.FC
}
