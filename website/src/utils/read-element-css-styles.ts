type Styles = Record<keyof CSSStyleDeclaration, string>
type PartialStyles = Partial<Styles>

export function readElementCSSStyles(element: HTMLElement) {
  const computedStyles = window.getComputedStyle(element)

  const styles: PartialStyles = {}
  for (const style in computedStyles) {
    if (isNaN(parseInt(style))) {
      styles[style] = computedStyles[style]
    }
  }

  return styles as Styles
}