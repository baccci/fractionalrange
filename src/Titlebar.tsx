import React from 'react'
import { cn } from './utils/tailwindClassMerge'

interface TitlebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode
}

export const Titlebar: React.FC<TitlebarProps> = ({ className, children, ...rest }) => {
  return (
    <div
      data-titlebar
      className={cn('fr-w-full fr-flex fr-justify-between fr-font-mono fr-px-6 fr-mt-[-8px] fr-text-sm fr-mb-6 fr-z-[2]', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

Titlebar.displayName = 'Titlebar'
