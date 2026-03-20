import type React from 'react'

interface TitlebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function Titlebar({ children, ...rest }: TitlebarProps) {
  return (
    <div data-titlebar {...rest}>
      {children}
    </div>
  )
}
