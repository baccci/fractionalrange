import React from 'react'
import { cn } from '@/utils/tailwind-class-merge'
import { useOnMount } from '@/hooks/use-on-mount'

type Position = 'top' | 'bottom' | 'left' | 'right'

type DynamicLineProps = React.ComponentProps<'div'> & {
  position: Position
  offset?: number
  attachToQueryString?: string
}

export const DynamicLine: React.FC<DynamicLineProps> = ({
  attachToQueryString = '',
  position,
  className,
  offset = 0,
  ...rest
}) => {
  const hideComponent = !attachToQueryString
  const positionStyle = useStyleFromElementPosition(attachToQueryString, position, offset)

  const style = {
    top: 'w-full h-[1px]',
    bottom: 'w-full h-[1px]',
    left: 'h-full w-[1px]',
    right: 'h-full w-[1px]'
  }[position]

  if (hideComponent) return null
  return (
    <div
      className={cn(
        'bg-slate-200/70 absolute z-[-2]',
        style,
        className
      )}
      style={{ ...positionStyle }}
      {...rest}
    />
  )
}

function useStyleFromElementPosition(queryString: string, position: Position, offset: number = 0) {
  const [element, setElement] = React.useState<HTMLElement | null>(null)

  useOnMount(() => {
    const element = document.querySelector(queryString) as HTMLElement
    setElement(element)
  }, { effect: 'layout' })

  if (!element) return null

  const positionKey = {
    top: 'top',
    bottom: 'top',
    left: 'left',
    right: 'right'
  }[position]

  const positionStyle = {
    top: element.getBoundingClientRect().top + offset,
    bottom: element.getBoundingClientRect().top + element.getBoundingClientRect().height + offset,
    left: element.getBoundingClientRect().left + offset,
    right: element.getBoundingClientRect().left + offset
  }[position]

  const otherStyle = {
    top: { left: 0 },
    bottom: { left: 0 },
    left: { top: 0 },
    right: { top: 0 }
  }[position]

  return {
    [positionKey]: `${positionStyle}px`,
    ...otherStyle
  }
}