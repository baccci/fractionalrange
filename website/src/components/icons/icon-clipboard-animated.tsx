import React from 'react'

type IconClipboardAnimatedProps = React.ComponentProps<'svg'> & {
  state: 'copy' | 'done'
}

export const IconClipboardAnimated: React.FC<IconClipboardAnimatedProps> = ({
  width = '24',
  state,
  ...props
}) => {
  const showCheck = state === 'done'

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
      {/* Clipboard — front rectangle */}
      <path
        d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z'
        style={{
          strokeDasharray: 60,
          strokeDashoffset: showCheck ? 60 : 0,
          transition: showCheck
            ? 'stroke-dashoffset 0.35s ease-in-out'
            : 'stroke-dashoffset 0.35s ease-in-out 0.2s',
        }}
      />
      {/* Clipboard — back rectangle */}
      <path
        d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1'
        style={{
          strokeDasharray: 40,
          strokeDashoffset: showCheck ? 40 : 0,
          transition: showCheck
            ? 'stroke-dashoffset 0.3s ease-in-out'
            : 'stroke-dashoffset 0.3s ease-in-out 0.25s',
        }}
      />
      {/* Checkmark */}
      <path
        d='M5 12l5 5l10 -10'
        stroke={showCheck ? '#22c55e' : 'currentColor'}
        style={{
          strokeDasharray: 28,
          strokeDashoffset: showCheck ? 0 : 28,
          transition: showCheck
            ? 'stroke-dashoffset 0.3s ease-in-out 0.15s, stroke 0.2s ease'
            : 'stroke-dashoffset 0.2s ease-in-out, stroke 0.15s ease',
        }}
      />
    </svg>
  )
}
