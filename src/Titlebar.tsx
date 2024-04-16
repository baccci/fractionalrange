import React from 'react'
import { cn } from './utils/tailwindClassMerge'

interface TitlebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode
}

export const Titlebar: React.FC<TitlebarProps> = ({ className, children, ...rest }) => {
  return (
    <div
    className={cn('w-full flex justify-between font-mono px-6 mt-[-8px] text-sm mb-6 z-[2]', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

Titlebar.displayName = 'Titlebar'
