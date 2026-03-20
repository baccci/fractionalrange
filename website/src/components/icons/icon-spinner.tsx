import type React from 'react'

type IconSpinnerProps = React.ComponentProps<'svg'>

export const IconSpinner: React.FC<IconSpinnerProps> = ({ width = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      {...props}
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="19.07" y1="4.93" x2="16.24" y2="7.76" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="19.07" y1="19.07" x2="16.24" y2="16.24" />
      <line x1="12" y1="22" x2="12" y2="18" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    </svg>
  )
}
