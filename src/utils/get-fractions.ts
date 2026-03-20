export default function getFractions(step: number, min: number, max: number): number[] {
  const totalMarks = Math.round((max - min) / step)
  return Array.from({ length: totalMarks + 1 }, (_, i) => i)
}
