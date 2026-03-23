---
title: Props
description: Complete API reference for FractionalRange props.
---

## Props reference

| Property | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | `0` | The lowest value in the range. |
| `max` | `number` | `2` | The greatest value in the range. |
| `step` | `number` | `0.1` | The step increment between values. |
| `label` | `string \| ReactNode` | — | Label text. If a string, it doubles as `aria-label`. Renders the titlebar when provided. |
| `value` | `number` | — | Controlled value. |
| `initialValue` | `number` | — | Initial value on first render. |
| `onChange` | `(value: number) => void` | — | Called on every value change during interaction. |
| `onStep` | `(value: number) => void` | — | Called when the value crosses to a different step tick. Useful for sound or haptic feedback. |
| `color` | `string` | `'#fff'` | Base color for ticks and value labels. |
| `activeColor` | `string` | `'#fff'` | Color for highlighted (in-range) ticks and the indicator dot. |
| `disabled` | `boolean` | `false` | Disables all interaction. |
| `showIndicator` | `boolean` | `false` | Renders the indicator dot below the slider. |
| `showShadows` | `boolean` | `false` | Renders gradient edge shadows. |
| `mouseSensitivity` | `number` | `1.5` | Controls how fast the slider moves when dragging with a mouse. |
| `touchSensitivity` | `number` | `1.5` | Controls how fast the slider moves when dragging on touch devices. |
| `fractionClassName` | `string` | — | Class name applied to each fraction tick element. |
| `className` | `string` | — | Class name for the root container. |
| `children` | `ReactNode` | — | Custom layout using compound components. Overrides all automatic UI. |

All standard HTML `div` attributes are also supported and forwarded to the root element.

## Controlled vs uncontrolled

Use `initialValue` for uncontrolled mode (the component manages its own state):

```jsx
<FractionalRange initialValue={1.5} min={0} max={3} step={0.1} />
```

Use `value` for controlled mode (you manage the state):

```jsx
const [val, setVal] = useState(1.5)

<FractionalRange value={val} onChange={setVal} min={0} max={3} step={0.1} />
```

## Accessibility

The slider element has `role="slider"` with proper `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` attributes. When `label` is a string, it's automatically used as `aria-label`. For non-string labels, pass `aria-label` explicitly:

```jsx
<FractionalRange
  label={<CustomLabel />}
  aria-label="Volume control"
  min={0}
  max={100}
  step={1}
/>
```
