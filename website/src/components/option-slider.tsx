import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'motion/react'
import { cn } from '@/utils/tailwind-class-merge'

export interface SliderOption<T = string> {
  label: string
  value: T
}

interface OptionSliderProps<T = string> {
  options: SliderOption<T>[]
  defaultIndex?: number
  onChange?: (option: SliderOption<T>) => void
  className?: string
}

const ITEM_WIDTH = 72
const SNAP_SPRING = { stiffness: 400, damping: 35 }
const DRAG_THRESHOLD = 4

export function OptionSlider<T = string>({
  options,
  defaultIndex = 0,
  onChange,
  className,
}: OptionSliderProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
  const x = useMotionValue(-defaultIndex * ITEM_WIDTH)
  const dragState = useRef({ active: false, startX: 0, startPointerX: 0, didDrag: false })
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isTouch = useRef(false)

  const snapTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(options.length - 1, index))
      setSelectedIndex(clamped)
      animate(x, -clamped * ITEM_WIDTH, { type: 'spring', ...SNAP_SPRING })
      onChange?.(options[clamped])
    },
    [options, onChange, x],
  )

  // Sync native scroll container to default index on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = defaultIndex * ITEM_WIDTH
    }
  }, [defaultIndex])

  // Handle native scroll snap end (touch devices)
  const handleScroll = useCallback(() => {
    if (!isTouch.current || !scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const index = Math.round(scrollLeft / ITEM_WIDTH)
    const clamped = Math.max(0, Math.min(options.length - 1, index))
    setSelectedIndex(clamped)
    x.set(-clamped * ITEM_WIDTH)
    onChange?.(options[clamped])
  }, [options, onChange, x])

  // Pointer events for desktop drag
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') {
        isTouch.current = true
        return // Let native scroll handle it
      }
      isTouch.current = false
      dragState.current = {
        active: true,
        startX: x.get(),
        startPointerX: e.clientX,
        didDrag: false,
      }
      containerRef.current?.setPointerCapture(e.pointerId)
    },
    [x],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragState.current.active) return
      const delta = e.clientX - dragState.current.startPointerX
      if (Math.abs(delta) > DRAG_THRESHOLD) {
        dragState.current.didDrag = true
      }
      x.set(dragState.current.startX + delta)
    },
    [x],
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragState.current.active) return
      dragState.current.active = false
      containerRef.current?.releasePointerCapture(e.pointerId)

      if (dragState.current.didDrag) {
        const nearest = Math.round(-x.get() / ITEM_WIDTH)
        snapTo(nearest)
      } else {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
          const tapX = e.clientX - rect.left
          const center = rect.width / 2
          const offset = tapX - center
          if (offset < -20) snapTo(selectedIndex - 1)
          else if (offset > 20) snapTo(selectedIndex + 1)
        }
      }
    },
    [x, snapTo, selectedIndex],
  )

  // Padding so first/last items can center
  const sidePadding = `calc(50% - ${ITEM_WIDTH / 2}px)`

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div
        ref={containerRef}
        className={cn(
          'relative w-[160px] h-9 overflow-hidden rounded-xl bg-[#111] select-none',
          'border border-[#222]',
          'cursor-grab active:cursor-grabbing',
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Edge shadows */}
        <div className="absolute inset-y-0 left-0 w-6 bg-linear-to-r from-[#111] to-transparent z-2 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-6 bg-linear-to-l from-[#111] to-transparent z-2 pointer-events-none" />

        {/* Motion-driven track (desktop) */}
        <motion.div
          className="absolute top-0 bottom-0 flex items-center pointer-events-none touch-hidden"
          style={{
            x,
            left: '50%',
            marginLeft: -ITEM_WIDTH / 2,
          }}
        >
          {options.map((option, index) => (
            <div
              key={String(option.value)}
              className={cn(
                'shrink-0 flex items-center justify-center text-xs font-mono transition-colors duration-150',
                index === selectedIndex ? 'text-text-primary' : 'text-text-muted',
              )}
              style={{ width: ITEM_WIDTH }}
            >
              {option.label}
            </div>
          ))}
        </motion.div>

        {/* Native scroll-snap track (touch devices) */}
        <div
          ref={scrollRef}
          className="absolute inset-0 flex items-center overflow-x-auto snap-x snap-mandatory scrollbar-none touch-visible"
          onScroll={handleScroll}
        >
          <div style={{ minWidth: sidePadding, flexShrink: 0 }} />
          {options.map((option, index) => (
            <div
              key={String(option.value)}
              className={cn(
                'shrink-0 flex items-center justify-center text-xs font-mono snap-center transition-colors duration-150',
                index === selectedIndex ? 'text-text-primary' : 'text-text-muted',
              )}
              style={{ width: ITEM_WIDTH }}
            >
              {option.label}
            </div>
          ))}
          <div style={{ minWidth: sidePadding, flexShrink: 0 }} />
        </div>
      </div>

      {/* Dot indicator */}
      <div className="w-1 h-1 rounded-full bg-fr-orange" />
    </div>
  )
}
