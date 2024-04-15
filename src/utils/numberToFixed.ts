/**
 * Converts a number to a fixed-point representation with the specified number of decimal places.
 * @param number - The number to be converted.
 * @param fractionDigits - The number of decimal places to round to.
 * @returns The converted number.
 */
export const numberToFixed = (number: number, fractionDigits: number) => {
  if (typeof number !== 'number' || typeof fractionDigits !== 'number') return 0

  const includesDot = number.toString().includes('.')
  if (!includesDot) return number

  const splittedNumber = number.toString().split('.')
  const decimalsLenght = splittedNumber[1].length
  if (decimalsLenght < fractionDigits) return number

  const decimalCut = splittedNumber[1].substring(0, fractionDigits)
  const fixedNumber = parseFloat(`${splittedNumber[0]}.${decimalCut}`)

  return fixedNumber
}