import React from 'react'
import { useDemoStore } from '@/store/demo-store'

type CTAGlowWrapperProps = {
  href: string
}

export const CTAGlowWrapper: React.FC<CTAGlowWrapperProps> = ({ href }) => {
  const hue = useDemoStore((s) => s.hue)
  const color = `oklch(0.7 0.18 ${hue})`

  return (
    <a
      href={href}
      className="group relative sm:w-[148px] w-full h-10 rounded-full overflow-hidden flex items-center justify-center"
    >
      {/* Rotating gradient background */}
      <div
        className="glow-gradient absolute inset-0 rounded-full"
        style={{ '--glow-color': color } as React.CSSProperties}
      />

      {/* Inner button */}
      <div
        className="relative flex items-center h-[calc(100%-3px)] w-[calc(100%-3px)] rounded-full bg-[#111] group-hover:bg-[#161616] transition-colors font-medium text-sm py-0 pr-4 pl-5 text-text-primary"
      >
        <div
          className="absolute right-1.5 bg-white/5 rounded-full p-2.5 text-text-primary
          sm:group-hover:rotate-45 transform-gpu
          transition-transform duration-300 ease-in-out z-3"
        >
          <svg width="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="15" x2="15" y2="1" />
            <polyline points="4 1 15 1 15 12" />
          </svg>
        </div>
        <div className="size-full flex items-center">
          <span className="wavy-text">
            {'Get started'.split('').map((char, i) => (
              <span
                key={i}
                className="wavy-char"
                style={{ '--i': i, animationDelay: `${i * 0.12}s` } as React.CSSProperties}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center pl-5 rounded-full bg-fr-orange text-white font-medium text-sm
        translate-y-[101%] sm:group-hover:translate-y-0 transition-transform transform-gpu duration-300 ease-in-out z-2"
      >
        Go to docs
      </div>
    </a>
  )
}
