import type React from 'react'
import { cn } from '@/utils/tailwind-class-merge'
import { IconSpinner } from './icons/icon-spinner'

type SpinnerProps = React.ComponentProps<'svg'>

export const Spinner: React.FC<SpinnerProps> = ({ className, ...props }) => {
  return (
    <IconSpinner
      className={cn('animate-spin animation-duration-[1.5s] text-jordy-blue-300/65 sm:size-5 size-4', className)}
      {...props}
    />
  )
}
