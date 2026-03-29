import { memo, useMemo } from 'react'
import { FRACTION_LABEL_DECIMALS, LARGE_FRACTION_INTERVAL } from './constants'
import { useFractionalRangeContext } from './context'
import { numberToFixed } from './utils/number-to-fixed'
import { roundToStep } from './utils/round-to-step'

interface FractionsProps {
  fractionsArray: number[]
}

export function Fractions({ fractionsArray }: FractionsProps) {
  const { min, step } = useFractionalRangeContext()

  const children = useMemo(
    () =>
      fractionsArray.map((index) => {
        const isLarge = index % LARGE_FRACTION_INTERVAL === 0
        const value = roundToStep(min + index * step, step, min)
        return <Fraction key={index} isLarge={isLarge} value={value} />
      }),
    [fractionsArray, min, step],
  )

  return <>{children}</>
}

function isFractionInRange(value: number, currentValue: number): boolean {
  if (value === 0) return true
  if (currentValue >= 0) return value >= 0 && value <= currentValue
  return value <= 0 && value >= currentValue
}

interface FractionProps {
  isLarge: boolean
  value: number
}

const Fraction = memo(function Fraction({ isLarge, value }: FractionProps) {
  const { color, activeColor, currentValue, fractionClassName } = useFractionalRangeContext()

  const isInRange = isFractionInRange(value, currentValue)

  const displayColor = isInRange ? activeColor : color

  return (
    <div
      data-fraction=""
      data-size={isLarge ? 'large' : 'small'}
      data-in-range={isInRange}
      className={fractionClassName}
      style={{ backgroundColor: displayColor }}
    >
      {isLarge && <FractionLabel value={value} color={color} />}
    </div>
  )
})

interface FractionLabelProps {
  value: number
  color: string
}

function FractionLabel({ value, color }: FractionLabelProps) {
  const display = numberToFixed(value, FRACTION_LABEL_DECIMALS)
  return (
    <span data-fraction-label="" style={{ color }}>
      {display}
    </span>
  )
}
