import React from 'react'
import { useSpring, type SpringRef, type SpringValue } from '@react-spring/web'
import { coordinateToValue, valueToCoordinate } from '../utils/translactions'
import { numberToFixed } from '../utils/numberToFixed'
import Decimal from 'decimal.js'

const SPRING_CONFIG = {
  tension: 200,
  friction: 26,
  mass: 1,
  bounce: 1
}

interface UseFractionsArgs {
  initialValue?: number
  controlledValue?: number
  boundsWidth: number
  fractionWidth: number
  min: number
  max: number
  step: number
  onChange?: (value: number) => void
}

export const useValues = ({
  initialValue: _initialValue,
  controlledValue,
  boundsWidth,
  fractionWidth,
  min,
  max,
  step,
  onChange
}: UseFractionsArgs) => {
  // reactive x is needed due to useSpring does not re-render while updating the x value
  // and the value related to x need to be calculated in every x change
  const [reactiveX, setReactiveX] = React.useState(0)

  const [{ x }, springRef] = useSpring(() => ({
    x: 0,
    config: SPRING_CONFIG,
    onChange: ({ value }: { value: { x: number } }) => setReactiveX(value.x)
  }))

  const api = useApi(springRef, x, step, min, max, boundsWidth, fractionWidth)

  const mounted = React.useRef(false)
  const initialValue = React.useRef(_initialValue ?? controlledValue ?? 0)
  const value = mounted.current
    ? getValue(reactiveX, boundsWidth, fractionWidth, min, max, step)
    : initialValue.current

  React.useLayoutEffect(function onControlledValueChange() {
    mounted.current && onChange?.(value)
  }, [value, onChange])

  // On mount, set the initial value x
  if (!mounted.current && boundsWidth && fractionWidth) {
    const x = valueToCoordinate({
      inputValue: initialValue.current,
      boundsWidth,
      fractionWidth,
      min,
      max,
      step
    })

    springRef.set({ x })
    mounted.current = true
  }

  return {
    x,
    api,
    value
  }
}

function useApi(springRef: SpringRef<{ x: number }>, x: SpringValue<number>, step: number, min: number, max: number, boundsWidth: number, fractionWidth: number) {
  const minCoordinatePossible = React.useMemo(() => -1 * valueToCoordinate({ inputValue: min, boundsWidth, fractionWidth, min, max, step }), [boundsWidth, fractionWidth, min, max, step])
  const maxCoordinatePossible = React.useMemo(() => -1 * valueToCoordinate({ inputValue: max, boundsWidth, fractionWidth, min, max, step }), [boundsWidth, fractionWidth, min, max, step])

  const api = {
    setCoordinate: (x: number) => {
      const invertedX = -x

      // if the x is out of bounds, set the x to the nearest possible value
      if (invertedX < minCoordinatePossible || invertedX > maxCoordinatePossible) {
        const safeX = invertedX < minCoordinatePossible ? -minCoordinatePossible : -maxCoordinatePossible
        return springRef.start({ x: safeX })
      }

      springRef.start({ x })
    },
    setValue: function (value: number) {
      const x = valueToCoordinate({ inputValue: value, boundsWidth, fractionWidth, min, max, step })
      this.setCoordinate(x)
    },
    getCoordinate: () => x.get(),
    getValue: () => getValue(x.get(), boundsWidth, fractionWidth, min, max, step),
    getStep: () => step

  }

  return api
}

export type Api = ReturnType<typeof useApi>

function getValue(x: number, boundsWidth: number, fractionWidth: number, min: number, max: number, step: number) {
  const value = coordinateToValue({ x, boundsWidth, fractionWidth, min, max, step })

  const inputValueToFixed = numberToFixed(value, 2)
  const valueReminder = new Decimal(inputValueToFixed).mod(step)
  const safeValue = new Decimal(inputValueToFixed).minus(valueReminder).toNumber()

  return safeValue
}