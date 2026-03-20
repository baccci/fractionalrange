---
title: Examples
description: Common patterns and recipes for FractionalRange.
---

## Basic slider

The simplest usage — a slider with fraction ticks and a label:

```jsx
<FractionalRange
  label="Opacity"
  min={0}
  max={1}
  step={0.05}
  initialValue={0.8}
  activeColor="#4ade80"
/>
```

## Full-featured slider

All built-in UI elements enabled:

```jsx
<FractionalRange
  label="Luminance"
  min={-1}
  max={3}
  step={0.02}
  initialValue={1.2}
  activeColor="#ff9646"
  showIndicator
  showShadows
  onChange={(v) => console.log(v)}
  onStep={() => playSound()}
/>
```

## Font weight control

Using a variable font, control the weight with the slider:

```jsx
function FontWeightDemo() {
  const [weight, setWeight] = useState(400)

  return (
    <div>
      <p style={{ fontVariationSettings: `"wght" ${weight}` }}>
        The quick brown fox
      </p>
      <FractionalRange
        label="Font Weight"
        min={100}
        max={900}
        step={50}
        initialValue={400}
        onChange={(v) => setWeight(Math.round(v))}
        activeColor="#e66a18"
      />
    </div>
  )
}
```

## Color hue picker

Control a hue value across the full spectrum:

```jsx
function HuePicker() {
  const [hue, setHue] = useState(200)
  const color = `oklch(0.7 0.2 ${hue})`

  return (
    <FractionalRange
      label="Hue"
      min={0}
      max={360}
      step={1}
      initialValue={200}
      onChange={(v) => setHue(Math.round(v))}
      activeColor={color}
    />
  )
}
```

## Disabled state

```jsx
<FractionalRange
  label="Locked"
  min={0}
  max={10}
  step={1}
  initialValue={5}
  disabled
/>
```

## Custom layout with reset button

```jsx
function SliderWithReset() {
  const [key, setKey] = useState(0)

  return (
    <FractionalRange
      key={key}
      label="Volume"
      min={0}
      max={100}
      step={1}
      initialValue={50}
    >
      <FractionalRange.Titlebar>
        <FractionalRange.Label />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setKey((k) => k + 1)}>Reset</button>
          <FractionalRange.Value />
        </div>
      </FractionalRange.Titlebar>
      <FractionalRange.IndicatorDot />
    </FractionalRange>
  )
}
```
