import React from 'react'
import { cn } from './utils/tailwindClassMerge'
import { numberToFixed } from './utils/numberToFixed'
import { useFractionalRangeContext } from './context'
import Decimal from 'decimal.js'

interface FractionsProps {
  fractionsArray: number[]
}

export const Fractions: React.FC<FractionsProps> = ({ fractionsArray }) => {
  const { min, step } = useFractionalRangeContext()

  const FractionChildren = React.useMemo(() => (
    fractionsArray.map((index) => {
      const size = index % 5 === 0 ? 2 : 1
      const safeValue = new Decimal(min).plus(new Decimal(index).times(step)).toNumber()
      return (
        <Fraction
          key={index}
          size={size}
          value={safeValue}
        />
      )
    })
  ), [fractionsArray, min, step])

  return (
    <>
      {FractionChildren}
    </>
  )
}

export default Fractions

interface FractionProps {
  size: 1 | 2
  value: number
}

const Fraction: React.FC<FractionProps> = ({ size, value }) => {
  const { color, activeColor: _activeColor, currentValue, fragmentClassName } = useFractionalRangeContext()

  const activeColor = _activeColor ?? '#fff'

  const currentValueIsPositive = currentValue > 0
  const valuePositive = value && value > 0
  const equalSignValues = currentValueIsPositive === valuePositive
  const valueIsPotentiallyInRange = equalSignValues && Math.abs(currentValue) >= Math.abs(value || 0)
  const valueIsInRange = valueIsPotentiallyInRange || value === 0
  const showValue = size === 2
  const colorDisplay = valueIsInRange ? activeColor : color

  return (
    <div
      style={{ '--color-display': colorDisplay } as React.CSSProperties}
      data-valueinrange={valueIsInRange}
      data-valueheight={size}
      className={cn(
        'relative w-[1.5px] min-w-[1.5px] data-[valueheight="1"]:h-[var(--fraction-small-height)] data-[valueheight="2"]:h-[var(--fraction-large-height)] [transform:translateZ(0px)] touch-none bg-[var(--color-display)]',
        'data-[valueinrange="false"]:opacity-50 data-[valueinrange="true"]:opacity-100',
        fragmentClassName
      )}
    >
      <FractionValueDisplay
        value={value}
        showValue={showValue}
        color={color}
      />
    </div>
  )
}

interface FractionValueDisplayProps {
  value: number
  showValue: boolean
  color: string
}

const FractionValueDisplay = ({ value, showValue, color: _color }: FractionValueDisplayProps) => {
  const fixedValue = numberToFixed(value, 3)
  const color = _color ?? '#fff'

  if (!showValue) return null
  return (
    <span
      style={{ color }}
      className={cn(`absolute top-[-24px] left-[50%] -translate-x-1/2 text-[12px] text-[${color}] select-none touch-none font-mono`)}
    >
      {fixedValue}
    </span>
  )
}