import { Howl } from 'howler'
import { useCallback } from 'react'
import FractionalRangeComponent from 'fractionalrange'
import { cn } from '@/utils/tailwind-class-merge'
import { pseudoBorder } from '@/utils/pseudo-border'
import { notANumber } from '@/utils/not-a-number'

type FractionalRangeProps = {
  className?: string
}

const tickSound = new Howl({
  src: ['/tick.mp3'],
  volume: 0.3,
  pool: 5,
})

export default function FractionalRange({ className }: FractionalRangeProps) {
  const handleStep = useCallback(() => {
    tickSound.play()
  }, [])

  return (
    <FractionalRangeComponent
      min={-1}
      max={1}
      step={0.02}
      initialValue={1}
      onStep={handleStep}
      activeColor='#ff9646'
      label='Fractional Range'
      data-component='FractionalRange'
      className={cn('w-full bg-neutral-800 relative')}
    >
      <FractionalRangeComponent.Titlebar data-component='FractionalRange'>
        <FractionalRangeComponent.Label data-component='FractionalRange' />
        <FractionalRangeComponent.Value data-component='FractionalRange' />
      </FractionalRangeComponent.Titlebar>
      <FractionalRangeComponent.IndicatorDot data-component='FractionalRange' />
    </FractionalRangeComponent>
  )
}


