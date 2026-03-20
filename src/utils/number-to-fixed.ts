/**
 * Truncates a number to a given number of decimal places (without rounding).
 */
export function numberToFixed(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.trunc(value * factor) / factor
}
