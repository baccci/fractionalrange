import Decimal from 'decimal.js'

interface xToValue {
  x: number
  boundsWidth: number
  fractionWidth: number
  min: number
  max: number
  step: number
}

export const coordinateToValue = ({
  x,
  boundsWidth,
  fractionWidth,
  min,
  max,
  step
}: xToValue) => {
  if (!boundsWidth || !fractionWidth) return 0

  const stepAmount = (new Decimal(max).minus(min)).div(step).toNumber()
  const relInputValue = -(new Decimal(stepAmount).mul(new Decimal(x).minus(new Decimal(boundsWidth).div(2)))).div(fractionWidth).toNumber()

  return new Decimal(relInputValue).mul(step).plus(min).toNumber()
}

interface valueToXArgs {
  inputValue: number
  boundsWidth: number
  fractionWidth: number
  min: number
  max: number
  step: number
}

export const valueToCoordinate = ({
  inputValue,
  boundsWidth,
  fractionWidth,
  min,
  max,
  step
}: valueToXArgs) => {
  if (!boundsWidth || !fractionWidth) return 0

  const stepAmount = (new Decimal(max).minus(min)).div(step).toNumber()
  const relativeValue = new Decimal(inputValue).minus(min).div(step).toNumber()

  return (new Decimal(boundsWidth).div(2).minus(new Decimal(fractionWidth).mul(relativeValue).div(stepAmount))).toNumber()
}