import React from 'react'
import { Howl } from 'howler'

export const useSound = (value: number | undefined, soundPath: string) => {
  React.useLayoutEffect(() => {
    if (!value || !soundPath) return

    const sound = new Howl({
      src: soundPath
    })

    sound.play()
  }, [value, soundPath])
}