import React from 'react'
import { Titlebar } from './Titlebar'
import { Label } from './Label'
import { Value } from './Value'
import { Shadows } from './Shadows'
import { IndicatorDot } from './IndicatorDot'
import type { Layout as LayoutType } from './types'

interface LayoutProps {
  children: React.ReactNode
  layout: LayoutType
}

export const Layout: React.FC<LayoutProps> = ({ children, layout }) => {
  const Components = {
    none: null,
    indicator: <Indicators />,
    shadows: <Shadows />,
    values: <Values />,
    full: <Full />
  }[layout]

  const Display = children ?? Components

  return (
    <>
      {Display}
    </>
  )
}

const Values = () => {
  return (
    <>
      <Titlebar>
      <Label />
      <Value />
      </Titlebar>
    </>
  )
}

const Indicators = () => {
  return (
    <>
      <IndicatorDot />
    </>
  )
}

const Full = () => {
  return (
    <>
       <Titlebar>
        <Label />
        <Value />
      </Titlebar>
      <Indicators />
      <Shadows />
    </>
  )
}