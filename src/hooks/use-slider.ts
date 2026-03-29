import { animate, useMotionValue } from 'motion/react'
import React from 'react'
import { DRAG_SPRING, KEYBOARD_SPRING, KEYBOARD_STEP_MULTIPLIER } from '../constants'
import { roundToStep } from '../utils/round-to-step'
import { coordinateToValue, valueToCoordinate } from '../utils/translations'
import { useGlobalDrag } from './use-global-drag'

interface UseSliderArgs {
  onChange?: (value: number) => void
  onStep?: (value: number) => void
  controlledValue?: number
  initialValue?: number
  boundsWidth: number
  fractionWidth: number
  min: number
  max: number
  step: number
  disabled: boolean
  mouseSensitivity: number
  touchSensitivity: number
}

export function useSlider({
  initialValue: _initialValue,
  controlledValue,
  boundsWidth,
  fractionWidth,
  onChange,
  onStep,
  disabled,
  min,
  max,
  step,
  mouseSensitivity,
  touchSensitivity,
}: UseSliderArgs) {
  const startValue = _initialValue ?? controlledValue ?? 0
  const initialX = valueToCoordinate({
    inputValue: startValue,
    boundsWidth,
    fractionWidth,
    min,
    max,
    step,
  })

  const x = useMotionValue(0)
  const [value, setValue] = React.useState(startValue)
  const [mouseDragging, setMouseDragging] = React.useState(false)
  const isTouchDragging = React.useRef(false)
  const initialized = React.useRef(false)
  const lastSteppedValue = React.useRef(startValue)
  const targetX = React.useRef(0)
  const initialTouchX = React.useRef(0)

  if (!initialized.current && boundsWidth && fractionWidth) {
    x.set(initialX)
    targetX.current = initialX
    initialized.current = true
  }

  const minX = React.useMemo(
    () => valueToCoordinate({ inputValue: max, boundsWidth, fractionWidth, min, max, step }),
    [boundsWidth, fractionWidth, min, max, step],
  )
  const maxX = React.useMemo(
    () => valueToCoordinate({ inputValue: min, boundsWidth, fractionWidth, min, max, step }),
    [boundsWidth, fractionWidth, min, max, step],
  )

  const computeValue = React.useCallback(
    (xPos: number) => {
      const raw = coordinateToValue({ x: xPos, boundsWidth, fractionWidth, min, max, step })
      return roundToStep(raw, step, min)
    },
    [boundsWidth, fractionWidth, min, max, step],
  )

  const clamp = React.useCallback(
    (rawX: number) => Math.max(minX, Math.min(maxX, rawX)),
    [minX, maxX],
  )

  const updateValue = React.useCallback(
    (newValue: number) => {
      setValue(newValue)
      onChange?.(newValue)

      if (onStep && newValue !== lastSteppedValue.current) {
        lastSteppedValue.current = newValue
        onStep(newValue)
      }
    },
    [onChange, onStep],
  )

  const setPosition = React.useCallback(
    (rawTargetX: number) => {
      if (disabled) return
      const clamped = clamp(rawTargetX)
      targetX.current = clamped
      animate(x, clamped, { type: 'spring', ...DRAG_SPRING })
      updateValue(computeValue(clamped))
    },
    [disabled, clamp, x, computeValue, updateValue],
  )

  const animateToValue = React.useCallback(
    (val: number) => {
      if (disabled) return
      const rawX = valueToCoordinate({ inputValue: val, boundsWidth, fractionWidth, min, max, step })
      const clamped = clamp(rawX)
      targetX.current = clamped
      animate(x, clamped, { type: 'spring', ...KEYBOARD_SPRING })
      updateValue(computeValue(clamped))
    },
    [disabled, clamp, boundsWidth, fractionWidth, min, max, step, x, computeValue, updateValue],
  )

  // Global document-level drag — continues even when cursor leaves the component
  const handleGlobalMove = React.useCallback(
    (e: PointerEvent) => {
      if (disabled) return
      const delta = e.movementX * mouseSensitivity
      setPosition(targetX.current + delta)
    },
    [disabled, setPosition, mouseSensitivity],
  )

  const handleGlobalUp = React.useCallback(() => {
    setMouseDragging(false)
  }, [])

  useGlobalDrag(mouseDragging, handleGlobalMove, handleGlobalUp)

  // Pointer down on the slider element starts the drag (mouse only, not touch)
  const handlePointerDown = React.useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    setMouseDragging(true)
  }, [])

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    isTouchDragging.current = true
    targetX.current = x.get()
    initialTouchX.current = e.touches[0].pageX
  }, [x])

  const handleTouchMove = React.useCallback(
    (e: React.TouchEvent) => {
      if (!isTouchDragging.current || disabled) return
      const touch = e.touches[0]
      const movementX = touch.pageX - initialTouchX.current
      initialTouchX.current = touch.pageX
      setPosition(targetX.current + movementX * touchSensitivity)
    },
    [disabled, setPosition, touchSensitivity],
  )

  const handleTouchEnd = React.useCallback(() => {
    isTouchDragging.current = false
    initialTouchX.current = 0
  }, [])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return
      const multiplier = e.shiftKey ? KEYBOARD_STEP_MULTIPLIER : 1
      const stepDelta = step * multiplier

      if (e.key === 'ArrowLeft') {
        animateToValue(value - stepDelta)
      } else if (e.key === 'ArrowRight') {
        animateToValue(value + stepDelta)
      }
    },
    [disabled, step, value, animateToValue],
  )

  const bind = {
    onPointerDown: handlePointerDown,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onKeyDown: handleKeyDown,
  }

  return { x, value, bind }
}
