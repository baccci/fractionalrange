export interface IndicatorDotProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function IndicatorDot(props: IndicatorDotProps) {
  return <span data-indicator-dot {...props} />
}
