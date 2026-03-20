import React from 'react'

/**
 * Attaches pointermove/pointerup listeners to `document` while `active` is true.
 * This allows dragging to continue even when the cursor leaves the component.
 */
export function useGlobalDrag(
  active: boolean,
  onMove: (e: PointerEvent) => void,
  onUp: () => void,
) {
  const handlers = React.useRef({ onMove, onUp })
  handlers.current = { onMove, onUp }

  React.useEffect(() => {
    if (!active) return

    const handleMove = (e: PointerEvent) => handlers.current.onMove(e)
    const handleUp = () => handlers.current.onUp()

    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleUp)
    document.addEventListener('pointerleave', handleUp)

    return () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleUp)
      document.removeEventListener('pointerleave', handleUp)
    }
  }, [active])
}
