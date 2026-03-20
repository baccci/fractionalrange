---
title: Quick Start
description: Get up and running with FractionalRange in minutes.
---

## Basic usage

```jsx
import FractionalRange from 'fractionalrange'
import 'fractionalrange/styles.css'

function App() {
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

This renders a slider with a titlebar (label + value display), fraction tick marks from 0 to 2, and an orange active color.

## Adding UI elements

By default, only the slider with fraction ticks is rendered. The titlebar appears automatically when you provide a `label`. Use `showIndicator` and `showShadows` to add extra UI:

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

- **`showIndicator`** — renders a small dot below the slider
- **`showShadows`** — renders gradient shadows at the edges

## Listening to changes

Use `onChange` to receive the current value on every update, and `onStep` to react only when the value crosses a step tick:

```jsx
<FractionalRange
  min={0}
  max={1}
  step={0.1}
  onChange={(value) => {
    // Fires on every drag movement
    setOpacity(value)
  }}
  onStep={(value) => {
    // Fires only when crossing a tick (e.g. 0.3 → 0.4)
    playTickSound()
  }}
/>
```
