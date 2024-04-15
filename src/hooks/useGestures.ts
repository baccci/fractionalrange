import React from 'react'
import type { Api } from './useValues'
import { type Target, useMove } from '@use-gesture/react'

interface UseGesturesArgs {
  api: Api
}

const DELTA_ENHANCE = 8
const MOBILE_DELTA_ENHANCE = 6
const KEY_STEP_ENHANCE = 5

export const useGestures = ({ api }: UseGesturesArgs) => {
  const bodyElement = document.querySelector('body')
  const [eventState, setEventState] = React.useState({ pressed: false, previousTouch: null as Touch | null })

  /* -----
   * Desktop events
   *------ */

  const handleRangePointerDown = () => {
    setEventState(currentState => ({ ...currentState, pressed: true }))
  }

  const handleRangePointerUp = () => {
    setEventState(currentState => ({ ...currentState, pressed: false }))
  }

  useMove(function handleBodyDrag({ delta: dx }) {
    if (!eventState.pressed) return

    const delta = dx[0] * DELTA_ENHANCE
    const currentX = api.getCoordinate()
    api.setCoordinate(currentX + delta)
    setEventState(currentState => ({ ...currentState }))
  },
  { target: bodyElement as Target }
  )

  const handleBodyPointerLeave = () => {
    setEventState(currentState => ({ ...currentState, pressed: false }))
  }

  /* -----
   * Touch events
   *------ */

  const handleTouchMove = React.useCallback((event: TouchEvent) => {
    if (!eventState.pressed) return
    event.preventDefault()

    const touch = event.touches[0]

    if (eventState.previousTouch) {
      const movementX = touch.pageX - eventState.previousTouch.pageX
      const delta = (movementX * MOBILE_DELTA_ENHANCE) + api.getCoordinate()

      api.setCoordinate(delta)
    }

    setEventState(currentState => ({ ...currentState, previousTouch: touch }))
  }, [api, eventState])

  const handleTouchEnd = () => {
    setEventState(currentState => ({ ...currentState, previousTouch: null, pressed: false }))
  }

  /* -----
   * Key events
   *------ */

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event

    const enhanceStep = event.shiftKey ? KEY_STEP_ENHANCE : 1
    const currentValue = api.getValue()
    const step = api.getStep() * enhanceStep

    if (key === 'ArrowLeft') {
      api.setValue(currentValue - step)
    }

    if (key === 'ArrowRight') {
      api.setValue(currentValue + step)
    }
  }

  React.useLayoutEffect(function bodyEvents() {
    bodyElement?.addEventListener('pointerup', handleRangePointerUp)
    bodyElement?.addEventListener('pointerleave', handleBodyPointerLeave)
    bodyElement?.addEventListener('touchmove', handleTouchMove, { passive: false })
    bodyElement?.addEventListener('touchend', handleTouchEnd)

    return () => {
      bodyElement?.removeEventListener('pointerup', handleRangePointerUp)
      bodyElement?.removeEventListener('pointerleave', handleBodyPointerLeave)
      bodyElement?.removeEventListener('touchmove', handleTouchMove)
      bodyElement?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [bodyElement, handleTouchMove])

  return {
    onPointerDown: handleRangePointerDown,
    onPointerUp: handleRangePointerUp,
    onKeyDown: handleKeyDown
  }
}