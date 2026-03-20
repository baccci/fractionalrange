import React from 'react'

type IconCheckProps = React.ComponentProps<'svg'>

export const IconCheck: React.FC<IconCheckProps> = ({ width = '24', ...props }) => {
  return (
    <svg
      width={width}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
      <path d='M5 12l5 5l10 -10' />
    </svg>
  )
}
