---
title: Compound Components
description: Build custom layouts with FractionalRange's compound component API.
---

When you pass `children`, the automatic UI (titlebar, indicator, shadows) is replaced entirely. You compose exactly what you want using the built-in sub-components.

## Available components

| Component | Description |
|---|---|
| `FractionalRange.Titlebar` | Flex container for label and value, rendered above the slider. |
| `FractionalRange.Label` | Displays the label text from context. |
| `FractionalRange.Value` | Displays the current value with a sign prefix (+/-). |
| `FractionalRange.IndicatorDot` | Small colored dot indicator below the slider. |
| `FractionalRange.Shadows` | Gradient shadows on the left and right edges. |

## Custom layout example

```jsx
import FractionalRange from 'fractionalrange'

function MySlider() {
  return (
    <FractionalRange
      label="Volume"
      min={0}
      max={100}
      step={1}
      activeColor="#4ade80"
    >
      <FractionalRange.Titlebar>
        <FractionalRange.Label />
        <FractionalRange.Value />
      </FractionalRange.Titlebar>
      <FractionalRange.IndicatorDot />
      <FractionalRange.Shadows />
    </FractionalRange>
  )
}
```

## Mixing with custom elements

You can mix the built-in components with your own:

```jsx
<FractionalRange label="Brightness" min={0} max={1} step={0.01}>
  <FractionalRange.Titlebar>
    <FractionalRange.Label />
    <div className="flex items-center gap-2">
      <ResetButton />
      <FractionalRange.Value />
    </div>
  </FractionalRange.Titlebar>
  <FractionalRange.Shadows />
</FractionalRange>
```

## Styling sub-components

All sub-components accept standard HTML attributes including `className` and `style`:

```jsx
<FractionalRange.Titlebar className="px-4 text-xs">
  <FractionalRange.Label className="uppercase tracking-widest" />
  <FractionalRange.Value className="font-bold" />
</FractionalRange.Titlebar>
```
