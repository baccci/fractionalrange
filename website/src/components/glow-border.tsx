import React from 'react'
import { useDemoStore } from '@/store/demo-store'

type GlowBorderProps = {
  children: React.ReactNode
  className?: string
}

export const GlowBorder: React.FC<GlowBorderProps> = ({ children, className }) => {
  const hue = useDemoStore((s) => s.hue)
  const color = `oklch(0.7 0.18 ${hue})`

  return (
    <div
      className={`glow-border-wrapper ${className ?? ''}`}
      style={{ '--glow-color': color } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
