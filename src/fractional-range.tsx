import { motion } from 'motion/react'
import { useMemo } from 'react'
import { DEFAULT_MAX, DEFAULT_MIN, DEFAULT_STEP } from './constants'
import type { FractionalRangeContextValue } from './context'
import { FractionalRangeContext } from './context'
import { Fractions } from './fractions'
import { useElementWidth } from './hooks/use-element-width'
import { useSlider } from './hooks/use-slider'
import { IndicatorDot } from './indicator-dot'
import { Label } from './label'
import { Shadows } from './shadows'
import { Titlebar } from './titlebar'
import type { FractionalRangeType } from './types'
import getFractions from './utils/get-fractions'
import { Value } from './value'

export const FractionalRange: FractionalRangeType = (props) => {
  const {
    'aria-label': ariaLabelProp,
    showIndicator = false,
    showShadows = false,
    className,
    children,
    label,
    color = '#fff',
    activeColor = '#fff',
    disabled = false,
    fractionClassName,
    step = DEFAULT_STEP,
    max = DEFAULT_MAX,
    min = DEFAULT_MIN,
    onChange,
    onStep,
    initialValue,
    value: controlledValue,
    mouseSensitivity = 1.5,
    touchSensitivity = 1.5,
    id,
    ...htmlProps
  } = props

  const [wrapperRef, boundsWidth] = useElementWidth()
  const [sliderRef, fractionWidth] = useElementWidth()

  const labelText = typeof label === 'string' ? label : undefined
  const ariaLabel = ariaLabelProp || labelText

  const { x, value, bind } = useSlider({
    initialValue,
    controlledValue,
    boundsWidth,
    fractionWidth,
    onChange,
    onStep,
    disabled,
    min,
    max,
    step,
    mouseSensitivity,
    touchSensitivity,
  })

  const fractionsArray = useMemo(() => getFractions(step, min, max), [step, min, max])

  const contextValue: FractionalRangeContextValue = useMemo(
    () => ({
      currentValue: value,
      color,
      activeColor,
      disabled,
      labelText,
      fractionClassName,
      min,
      max,
      step,
    }),
    [value, color, activeColor, disabled, labelText, fractionClassName, min, max, step],
  )

  const hasChildren = children != null
  const hasLabel = label != null
  const isCompact = !hasChildren && !hasLabel && !showIndicator

  return (
    <FractionalRangeContext.Provider value={contextValue}>
      <div
        data-fractional-range=""
        data-compact={isCompact || undefined}
        data-disabled={disabled || undefined}
        id={id}
        className={className}
        ref={wrapperRef}
        style={
          {
            '--fr-color': color,
            '--fr-active-color': activeColor,
          } as React.CSSProperties
        }
        {...htmlProps}
      >
        {hasChildren ? (
          children
        ) : (
          <>
            {hasLabel && (
              <Titlebar>
                <Label />
                <Value />
              </Titlebar>
            )}
            {showIndicator && <IndicatorDot />}
            {showShadows && <Shadows />}
          </>
        )}
        <motion.div
          data-slider=""
          role="slider"
          tabIndex={0}
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{ x }}
          ref={sliderRef}
          {...bind}
        >
          <Fractions fractionsArray={fractionsArray} />
        </motion.div>
      </div>
    </FractionalRangeContext.Provider>
  )
}

FractionalRange.Titlebar = Titlebar
FractionalRange.Label = Label
FractionalRange.Value = Value
FractionalRange.IndicatorDot = IndicatorDot
FractionalRange.Shadows = Shadows
