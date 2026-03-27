import { useState, useCallback } from 'react'
import { Howl } from 'howler'
import FractionalRangeComponent from 'fractionalrange'
import { OptionSlider, type SliderOption } from './option-slider'
import { useDemoStore } from '@/store/demo-store'
import { cn } from '@/utils/tailwind-class-merge'

type DemoProperty = 'weight' | 'activeColor' | 'tracking' | 'blur'

const propertyOptions: SliderOption<DemoProperty>[] = [
  { label: 'Weight', value: 'weight' },
  { label: 'Color', value: 'activeColor' },
  { label: 'Spacing', value: 'tracking' },
  { label: 'Glow', value: 'blur' },
]

const PROPERTY_CONFIGS: Record<DemoProperty, { min: number; max: number; step: number; initial: number }> = {
  weight: { min: 100, max: 900, step: 10, initial: 700 },
  activeColor: { min: 0, max: 360, step: 1, initial: 55 },
  tracking: { min: -10, max: 10, step: 0.5, initial: -5 },
  blur: { min: 0, max: 60, step: 1, initial: 0 },
}

const SETTERS: Record<DemoProperty, keyof Pick<ReturnType<typeof useDemoStore.getState>, 'setWeight' | 'setHue' | 'setTracking' | 'setBlur'>> = {
  weight: 'setWeight',
  activeColor: 'setHue',
  tracking: 'setTracking',
  blur: 'setBlur',
}

const tickSound = new Howl({
  src: ['/tick.mp3'],
  volume: 0.3,
  pool: 5,
})

interface DemoSectionProps {
  className?: string
}

export default function DemoSection({ className }: DemoSectionProps) {
  const [activeProperty, setActiveProperty] = useState<DemoProperty>('weight')
  const store = useDemoStore()

  const config = PROPERTY_CONFIGS[activeProperty]
  const hue = store.hue
  const activeColor = `oklch(0.7 0.2 ${hue})`

  const handlePropertyChange = useCallback((option: SliderOption<DemoProperty>) => {
    setActiveProperty(option.value)
  }, [])

  const handleChange = useCallback((value: number) => {
    const setter = SETTERS[activeProperty]
    store[setter](value)
  }, [activeProperty, store])

  const handleStep = useCallback(() => {
    tickSound.play()
  }, [])

  const labels: Record<DemoProperty, string> = {
    weight: 'Font Weight',
    activeColor: 'Hue',
    tracking: 'Letter Spacing',
    blur: 'Glow Intensity',
  }

  const storeValues: Record<DemoProperty, number> = {
    weight: store.weight,
    activeColor: store.hue,
    tracking: store.tracking,
    blur: store.blur,
  }

  const formatValue = (prop: DemoProperty, val: number): string => {
    switch (prop) {
      case 'weight': return String(Math.round(val))
      case 'activeColor': return `${Math.round(val)}°`
      case 'tracking': return `${val > 0 ? '+' : ''}${val.toFixed(1)}px`
      case 'blur': return `${Math.round(val)}px`
    }
  }

  return (
    <div className={cn('flex flex-col items-center gap-5', className)}>
      <OptionSlider
        options={propertyOptions}
        defaultIndex={0}
        onChange={handlePropertyChange}
        dotColor={activeColor}
      />

      <FractionalRangeComponent
        key={activeProperty}
        min={config.min}
        max={config.max}
        step={config.step}
        initialValue={storeValues[activeProperty]}
        onChange={handleChange}
        onStep={handleStep}
        activeColor={activeProperty === 'activeColor' ? activeColor : '#ff9646'}
        label={labels[activeProperty]}
        data-component='FractionalRange'
        className='w-full max-w-[400px] lg:max-w-[480px] bg-[#111] relative'
      >
        <FractionalRangeComponent.Titlebar data-component='FractionalRange'>
          <FractionalRangeComponent.Label data-component='FractionalRange' />
          <FractionalRangeComponent.Value data-component='FractionalRange' />
        </FractionalRangeComponent.Titlebar>
        <FractionalRangeComponent.IndicatorDot data-component='FractionalRange' />
      </FractionalRangeComponent>

      {/* Live preview */}
      <div className="text-center mt-2">
        <p
          className="text-2xl sm:text-3xl text-white font-mono transition-all duration-200"
          style={{
            fontWeight: activeProperty === 'weight' ? store.weight : 400,
            color: activeProperty === 'activeColor' ? activeColor : undefined,
          }}
        >
          {formatValue(activeProperty, storeValues[activeProperty])}
        </p>
      </div>
    </div>
  )
}
