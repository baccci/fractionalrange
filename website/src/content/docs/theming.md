---
title: Theming
description: Customize FractionalRange's appearance with CSS custom properties.
---

The component uses CSS custom properties for all visual values. Override them to match your design system.

## CSS custom properties

```css
[data-fractional-range] {
  --fr-bg: #111;
  --fr-border: #222;
  --fr-color: #fff;
  --fr-active-color: #fff;
  --fr-disabled-color: #6d6d6d;
  --fr-font-sans: 'Geist', system-ui, sans-serif;
  --fr-font-mono: 'GeistMono', monospace;
  --fr-fraction-small-height: 0.5rem;
  --fr-fraction-large-height: 0.75rem;
  --fr-fraction-width: 1.5px;
  --fr-fraction-gap: 0.375rem;
  --fr-shadow-width: 4rem;
  --fr-radius: 0.75rem;
  --fr-indicator-size: 0.25rem;
}
```

## Per-instance theming

Use the `color` and `activeColor` props for quick color changes — they set `--fr-color` and `--fr-active-color` via inline styles:

```jsx
<FractionalRange
  color="#ccc"
  activeColor="#4ade80"
  min={0}
  max={1}
  step={0.1}
/>
```

## Global theming

Override the custom properties in your CSS to theme all instances at once:

```css
[data-fractional-range] {
  --fr-bg: #1a1a2e;
  --fr-border: #2a2a4e;
  --fr-color: #a0a0c0;
  --fr-active-color: #7c3aed;
  --fr-radius: 1rem;
  --fr-font-mono: 'JetBrains Mono', monospace;
}
```

## Data attributes

The component uses data attributes for styling, which you can target in CSS:

| Attribute | Element | Description |
|---|---|---|
| `data-fractional-range` | Root | The root container. |
| `data-compact` | Root | Present when no titlebar or indicator is shown. |
| `data-disabled` | Root | Present when the component is disabled. |
| `data-slider` | Slider track | The draggable strip of fractions. |
| `data-fraction` | Tick | Individual fraction tick mark. |
| `data-size="small"` | Tick | Small tick mark. |
| `data-size="large"` | Tick | Large tick mark (every 5th). |
| `data-in-range="true"` | Tick | Tick is within the active range. |
| `data-fraction-label` | Label | Value label shown above large ticks. |
| `data-titlebar` | Titlebar | The titlebar container. |
| `data-value` | Value | The value display. |
| `data-indicator-dot` | Dot | The indicator dot. |
| `data-shadow-left` | Shadow | Left gradient shadow. |
| `data-shadow-right` | Shadow | Right gradient shadow. |
