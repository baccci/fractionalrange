---
title: Sound & Feedback
description: Add audio or haptic feedback when the slider crosses a tick.
---

## The `onStep` callback

`onStep` fires only when the value crosses from one step tick to another — not on every pixel of drag. This makes it ideal for audio or haptic feedback without overwhelming the output.

```jsx
<FractionalRange
  min={0}
  max={2}
  step={0.1}
  onStep={(value) => {
    console.log('Crossed to', value)
  }}
/>
```

## `onStep` vs `onChange`

| Callback | Fires when | Use case |
|---|---|---|
| `onChange` | Every value update during drag | Updating UI, syncing state |
| `onStep` | Value crosses to a different step tick | Sound, haptics, discrete feedback |

## Audio with Howler.js

For production audio, use a library like [Howler.js](https://howlerjs.com/) which handles audio pooling and prevents channel stacking:

```bash
npm install howler
```

```jsx
import { Howl } from 'howler'

// Create the sound once, outside the component
const tick = new Howl({
  src: ['/tick.mp3'],
  volume: 0.3,
  pool: 5, // Allow up to 5 simultaneous plays
})

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

## Simple audio (no dependencies)

For basic use cases, the Web Audio API works without extra dependencies:

```jsx
function MySlider() {
  const playTick = () => {
    try {
      new Audio('/tick.mp3').play()
    } catch {
      // Audio not available
    }
  }

  return (
    <FractionalRange
      min={0}
      max={2}
      step={0.1}
      onStep={playTick}
    />
  )
}
```

:::caution
The simple `new Audio()` approach can cause audio glitches during fast dragging because each call creates a new audio context. Use Howler.js or a similar library for smooth results.
:::

## Haptic feedback

On supported devices, you can trigger haptic feedback:

```jsx
<FractionalRange
  min={0}
  max={1}
  step={0.1}
  onStep={() => {
    navigator.vibrate?.(5)
  }}
/>
```
