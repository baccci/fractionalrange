import React, { useCallback, useState } from 'react'

/**
 * Returns a callback ref and the element's width.
 * The callback ref fires when React attaches/detaches the DOM node,
 * triggering a re-render with the measured width.
 */
export function useElementWidth(): [React.RefCallback<HTMLElement>, number] {
  const [width, setWidth] = useState(0)

  const observerRef = React.useRef<ResizeObserver | null>(null)

  const ref = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    if (!node) return
    setWidth(node.offsetWidth)

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    observer.observe(node)
    observerRef.current = observer
  }, [])

  return [ref, width]
}
