<div align="left" >
  <img src="https://github.com/baccci/fractionalrange/blob/main/fractionalrange.png">
</div>

An opinionated range slider component for React with ruler-like fraction ticks, spring animations, and full theming via CSS custom properties.

## Installation

```bash
npm install fractionalrange motion
```

`motion` (Framer Motion) is a peer dependency used for spring-based animations.

## Setup

Import the component styles in your app's entry point or layout:

```ts
import 'fractionalrange/styles.css'
```

## Usage

```jsx
import FractionalRange from 'fractionalrange'

export function App() {
  return (
    <FractionalRange
      label="Luminance"
      min={0}
      max={2}
      step={0.1}
      initialValue={1.2}
      activeColor="#ff9646"
      onChange={(value) => console.log(value)}
    />
  )
}
```

### Showing extra UI elements

By default, only the slider with fraction ticks is rendered. Use `showIndicator` and `showShadows` to add built-in UI elements. The titlebar (label + value) renders automatically when `label` is provided.

```jsx
<FractionalRange
  label="Exposure"
  min={-1}
  max={3}
  step={0.02}
  activeColor="#ff9646"
  showIndicator
  showShadows
/>
```

### Custom layouts with compound components

Pass `children` to fully override the automatic UI and compose your own layout:

```jsx
import FractionalRange from 'fractionalrange'
import { CustomComponent } from './Custom'

export function App() {
  return (
    <FractionalRange
      label="Range"
      min={-1}
      max={3}
      step={0.02}
      activeColor="#ff9646"
      initialValue={1.2}
    >
      <FractionalRange.Titlebar>
        <FractionalRange.Label />
        <FractionalRange.Value />
      </FractionalRange.Titlebar>
      <FractionalRange.IndicatorDot />
      <FractionalRange.Shadows />
      <CustomComponent />
    </FractionalRange>
  )
}
```

### Sound on step change

Use the `onStep` callback to trigger a sound (or any side effect) each time the value crosses a fraction tick. This is a dependency injection pattern — you bring your own audio implementation:

```jsx
import { Howl } from 'howler'

const tick = new Howl({ src: ['/tick.mp3'], volume: 0.3, pool: 5 })

function MySlider() {
  return (
    <FractionalRange
      min={0}
      max={2}
      step={0.1}
      onStep={() => tick.play()}
    />
  )
}
```

## Usage with Tailwind CSS

The component works standalone without Tailwind, but if your project uses it, you can pass Tailwind classes directly via `className`:

```jsx
<FractionalRange
  label="Exposure"
  min={0}
  max={2}
  step={0.1}
  className="w-[400px] bg-neutral-900 shadow-xl"
/>
```

You can also override the CSS custom properties using Tailwind's arbitrary property syntax:

```jsx
<FractionalRange
  label="Exposure"
  min={0}
  max={2}
  step={0.1}
  className="[--fr-bg:#0a0a0a] [--fr-border:#2a2a2a] [--fr-radius:1rem]"
/>
```

For a reusable `cn()` merge utility (to combine class names safely), install `clsx` and `tailwind-merge`:

```bash
npm install clsx tailwind-merge
```

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Then use it to merge consumer classes with defaults:

```jsx
<FractionalRange
  className={cn('w-full bg-neutral-800', userClassName)}
  // ...
/>
```

## Theming

The component uses CSS custom properties for full visual customization. Override them on the `[data-fractional-range]` selector or pass `color`/`activeColor` props:

```css
[data-fractional-range] {
  --fr-bg: #1a1a1a;
  --fr-border: #333;
  --fr-color: #ccc;
  --fr-active-color: #ff9646;
  --fr-font-sans: 'Inter', system-ui, sans-serif;
  --fr-font-mono: 'JetBrains Mono', monospace;
  --fr-fraction-small-height: 0.5rem;
  --fr-fraction-large-height: 0.75rem;
  --fr-fraction-width: 1.5px;
  --fr-fraction-gap: 0.375rem;
  --fr-shadow-width: 4rem;
  --fr-radius: 0.75rem;
  --fr-indicator-size: 0.25rem;
}
```

## Props

| Property | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | `0` | The lowest value in the range. |
| `max` | `number` | `2` | The greatest value in the range. |
| `step` | `number` | `0.1` | The step increment between values. |
| `label` | `string \| ReactNode` | — | Label text. If a string, it's also used as `aria-label`. Renders the titlebar when provided. |
| `value?` | `number` | — | Controlled value. |
| `initialValue?` | `number` | — | Initial value on first render. |
| `onChange?` | `(value: number) => void` | — | Called on every value change during interaction. |
| `onStep?` | `(value: number) => void` | — | Called when the value crosses to a different step tick. Useful for sound or haptic feedback. |
| `color?` | `string` | `'#fff'` | Base color for ticks and labels. |
| `activeColor?` | `string` | `'#fff'` | Color for highlighted ticks and the indicator dot. |
| `disabled?` | `boolean` | `false` | Disables interaction. |
| `showIndicator?` | `boolean` | `false` | Renders the indicator dot below the slider. |
| `showShadows?` | `boolean` | `false` | Renders gradient edge shadows. |
| `fractionClassName?` | `string` | — | Class name applied to each fraction tick element. |
| `className?` | `string` | — | Class name for the root container. |
| `children?` | `ReactNode` | — | Custom layout using compound components. Overrides automatic UI. |

## Compound components

| Component | Description |
|---|---|
| `FractionalRange.Titlebar` | Container for label and value, rendered above the slider. |
| `FractionalRange.Label` | Displays the label text from context. |
| `FractionalRange.Value` | Displays the current value with sign. |
| `FractionalRange.IndicatorDot` | Small dot indicator below the slider. |
| `FractionalRange.Shadows` | Gradient shadows on the left and right edges. |

## Contribute

You're welcome to contribute to the code, documentation, or any topic you want to improve this project.

## Acknowledgments

This component was inspired by [Rauno Freiberg](https://rauno.me).
