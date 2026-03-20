/**
 * Checks if a value is not a number or if it is NaN (NaN is actually type of number).
 *
 * @param value - The value to check.
 * @returns `true` if the value is not a number, `false` otherwise.
 */
export function notANumber(value: number): boolean {
  return typeof value !== 'number' || isNaN(value)
}