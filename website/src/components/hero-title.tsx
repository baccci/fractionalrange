import { useDemoStore } from '@/store/demo-store'

export function HeroTitle() {
  const weight = useDemoStore((s) => s.weight)
  const hue = useDemoStore((s) => s.hue)
  const tracking = useDemoStore((s) => s.tracking)
  const blur = useDemoStore((s) => s.blur)

  const accentColor = `oklch(0.7 0.2 ${hue})`
  const letterSpacing = `${tracking / 100}em`

  return (
    <h1 className="relative text-center">
      {/* Glow layer behind the title */}
      {blur > 0 && (
        <span
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
          style={{ filter: `blur(${blur}px)`, opacity: Math.min(blur / 30, 0.8) }}
        >
          <span
            className="block text-5xl sm:text-8xl font-bold md:leading-20"
            style={{
              color: accentColor,
              fontVariationSettings: `"wght" ${weight}`,
              letterSpacing,
            }}
          >
            Fractional
          </span>
          <span
            className="block text-5xl sm:text-8xl font-bold md:leading-20 text-white mt-0 sm:mt-1"
            style={{
              fontVariationSettings: `"wght" ${weight}`,
              letterSpacing,
            }}
          >
            Range
          </span>
        </span>
      )}

      <span className="block relative">
        <span
          id="title"
          className="text-5xl sm:text-8xl font-bold tracking-[-0.05em] md:leading-20 transition-all duration-150"
          style={{
            color: accentColor,
            fontVariationSettings: `"wght" ${weight}`,
            letterSpacing,
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
            letterSpacing,
          }}
        >
          Range
        </span>
      </span>
    </h1>
  )
}
