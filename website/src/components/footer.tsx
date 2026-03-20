import { cn } from '@/utils/tailwindClassMerge'
import React from 'react'

type FooterProps = React.ComponentProps<'footer'>

export const Footer: React.FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer className={cn('w-full flex items-center justify-center text-sm py-5', className)} {...props}>
      Made with 🧉 by <a href="https://github.com/baccci" target="_blank" rel="noopener noreferrer" className='ml-1 underline'>Salvador Bacci</a>
    </footer>
  )
}
