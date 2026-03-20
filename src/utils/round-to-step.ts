/**
 * Rounds a value to the nearest step, anchored at min.
 * E.g. roundToStep(0.37, 0.1, 0) → 0.3
 */
export function roundToStep(value: number, step: number, min: number): number {
  const stepsFromMin = Math.round((value - min) / step)
  // Use fixed-point to avoid floating point drift
  const decimals = getDecimals(step)
  const result = min + stepsFromMin * step
  return parseFloat(result.toFixed(decimals))
}

function getDecimals(n: number): number {
  const str = n.toString()
  const dot = str.indexOf('.')
  return dot === -1 ? 0 : str.length - dot - 1
}
