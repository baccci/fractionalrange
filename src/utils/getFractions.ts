
export default function getFractions(step: number, min: number, max: number) {
  const totalMarks = (max - min) / step

  const fractionsArray = [...Array(totalMarks + 1)].map((_, i) => i)

  return fractionsArray
}