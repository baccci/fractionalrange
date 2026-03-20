import React from 'react'
type effect = 'normal' | 'layout'

interface Config {
  effect?: effect
}

const defaultConfig = {
  effect: 'normal' as effect
}

export function useOnMount(callback: () => void, config: Config = defaultConfig) {
  const hasMounted = React.useRef(false)
  const effectFn = config.effect === 'normal' ? React.useEffect : React.useLayoutEffect

  effectFn(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      callback()
    }
  }, [callback])
}