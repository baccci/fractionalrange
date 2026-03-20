import { useDemoStore } from '@/store/demoStore'

export function HeroTitle() {
  const weight = useDemoStore((s) => s.weight)
  const hue = useDemoStore((s) => s.hue)

  const accentColor = `oklch(0.7 0.2 ${hue})`

  return (
    <h1 className="relative text-center">
      <span className="block relative">
        <span
          id="title"
          className="text-5xl sm:text-8xl font-bold tracking-[-0.05em] md:leading-20 transition-all duration-150"
          style={{
            color: accentColor,
            fontVariationSettings: `"wght" ${weight}`,
          }}
        >
          Fractional
        </span>
      </span>
      <span className="block relative mt-0 sm:mt-1">
        <span
          className="text-5xl sm:text-8xl font-bold tracking-[-0.05em] md:leading-20 text-white transition-all duration-150"
          style={{
            fontVariationSettings: `"wght" ${weight}`,
          }}
        >
          Range
        </span>
      </span>
    </h1>
  )
}
