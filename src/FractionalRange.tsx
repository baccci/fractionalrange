import './style.css'
import React from 'react'
import useMeasure from 'react-use-measure'
import Fractions from './Fractions'
import getFractions from './utils/getFractions'
import { cn } from './utils/tailwindClassMerge'
import { animated } from '@react-spring/web'
import { useSound } from './hooks/useSound'
import { IndicatorDot } from './IndicatorDot'
import { useValues } from './hooks/useValues'
import { useGestures } from './hooks/useGestures'
import { Titlebar } from './Titlebar'
import { Label } from './Label'
import { Value } from './Value'
import { Shadows } from './Shadows'
import { Layout } from './Layout'
import { FractionalRangeContext, useFractionalRange } from './context'
import { DEFAULT_MAX, DEFAULT_MIN, DEFAULT_STEP } from './constants'
import type { FractionalRangeType, FractionalRangeProps } from './types'

export const FractionalRange: FractionalRangeType = (props) => {
  const {
    'aria-label': _ariaLabel,
    disableWillChange = false,
    layout = 'none',
    sound,
    className,
    children,
    label,
    step = DEFAULT_STEP,
    max = DEFAULT_MAX,
    min = DEFAULT_MIN
  } = props

  const [wrapperRef, { width: boundsWidth }] = useMeasure()
  const [fractionRef, { width: fractionWidth }] = useMeasure()

  const labelText = typeof label === 'string'
    ? label
    : undefined
  const ariaLabel = _ariaLabel || labelText

  const { useValuesArgs, htmlProps, contextProps } = propsInjection({ ...props, boundsWidth, fractionWidth, labelText })

  const { x, api, value } = useValues(useValuesArgs)
  const fractionalContext = useFractionalRange({ ...contextProps, value })
  const bind = useGestures({ api })
  const fractionsArray = React.useMemo(() => getFractions(step, min, max), [step, min, max])
  useSound(value, sound)

  return (
    <FractionalRangeContext.Provider value={fractionalContext}>
      <div
        className={cn(
          'fr-w-full fr-overflow-hidden fr-flex fr-flex-col fr-items-start fr-relative fr-py-6 fr-px-0 fr-bg-black fr-rounded-xl fr-border fr-border-borderblack fr-select-none fr-isolate fr-text-white fr-antialiased',
          '[--fraction-small-height:0.5rem] [--fraction-large-height:0.75rem]',
          { 'fr-pt-6 fr-pb-3': layout === 'none' || layout === 'shadows' },
          className
        )}
        ref={wrapperRef}
        {...htmlProps}
      >
        <Layout layout={layout}>
          {children}
        </Layout>
        <animated.div
          className={cn('fr-flex fr-gap-1.5 fr-items-end fr-cursor-ew-resize fr-pt-4 fr-pb-2 fr-focus-visible:outline-offset-[16px]', { 'fr-will-change-transform': !disableWillChange })}
          role='slider'
          tabIndex={0}
          aria-label={ariaLabel}
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          aria-valuenow={value}
          style={{ x }}
          ref={fractionRef}
          {...bind}
        >
          <Fractions fractionsArray={fractionsArray} />
        </animated.div>
      </div>
    </FractionalRangeContext.Provider>
  )
}

FractionalRange.Titlebar = Titlebar
FractionalRange.Label = Label
FractionalRange.Value = Value
FractionalRange.IndicatorDot = IndicatorDot
FractionalRange.Shadows = Shadows

function propsInjection(props: FractionalRangeProps & { boundsWidth: number, fractionWidth: number, labelText?: string }) {
  const {
    fragmentClassName: _fragmentClassName,
    activeColor: _activeColor,
    'aria-label': _ariaLabel,
    labelText: _labelText,
    className: _className,
    layout: _layout,
    label: _label,
    color: _color,
    sound: _sound,
    fractionWidth,
    initialValue,
    boundsWidth,
    onChange,
    step,
    min,
    max,
    disabled,
    ...rest
  } = props

  const useValuesArgs = {
    disabled,
    initialValue,
    onChange,
    controlledValue: props.value,
    boundsWidth,
    fractionWidth,
    min,
    max,
    step
  }

  return {
    useValuesArgs,
    htmlProps: rest,
    contextProps: props
  }
}