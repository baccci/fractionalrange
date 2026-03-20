import { useCallback, useState } from 'react'

/**
 * Returns a callback ref and the element's width.
 * The callback ref fires when React attaches/detaches the DOM node,
 * triggering a re-render with the measured width.
 */
export function useElementWidth(): [React.RefCallback<HTMLElement>, number] {
  const [width, setWidth] = useState(0)

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return
    setWidth(node.offsetWidth)

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    observer.observe(node)

    // Cleanup is handled by React, when the node unmounts,
    // the ref callback fires with null and the observer is GC'd
    // since it's scoped to this closure.
  }, [])

  return [ref, width]
}
