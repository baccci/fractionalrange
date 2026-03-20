interface ConversionParams {
  boundsWidth: number
  fractionWidth: number
  min: number
  max: number
  step: number
}

interface CoordinateToValueParams extends ConversionParams {
  x: number
}

interface ValueToCoordinateParams extends ConversionParams {
  inputValue: number
}

/**
 * Converts an x pixel coordinate to a slider value.
 * The slider's center (boundsWidth / 2) represents value = min.
 */
export function coordinateToValue({
  x,
  boundsWidth,
  fractionWidth,
  min,
  max,
  step,
}: CoordinateToValueParams): number {
  if (!boundsWidth || !fractionWidth) return 0

  const totalSteps = (max - min) / step
  const centerOffset = x - boundsWidth / 2
  const relativePosition = -(totalSteps * centerOffset) / fractionWidth

  return relativePosition * step + min
}

/**
 * Converts a slider value to an x pixel coordinate.
 */
export function valueToCoordinate({
  inputValue,
  boundsWidth,
  fractionWidth,
  min,
  max,
  step,
}: ValueToCoordinateParams): number {
  if (!boundsWidth || !fractionWidth) return 0

  const totalSteps = (max - min) / step
  const stepsFromMin = (inputValue - min) / step

  return boundsWidth / 2 - (fractionWidth * stepsFromMin) / totalSteps
}
