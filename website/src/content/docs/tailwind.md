---
title: Tailwind CSS
description: Using FractionalRange with Tailwind CSS.
---

FractionalRange works standalone without Tailwind. But if your project uses it, the integration is straightforward.

## Passing classes

Use `className` to apply Tailwind utilities to the root container:

```jsx
<FractionalRange
  label="Exposure"
  min={0}
  max={2}
  step={0.1}
  className="w-[400px] bg-neutral-900 shadow-xl"
/>
```

## Overriding CSS variables

Use Tailwind's arbitrary property syntax to override the component's custom properties inline:

```jsx
<FractionalRange
  label="Volume"
  min={0}
  max={100}
  step={1}
  className="[--fr-bg:#0a0a0a] [--fr-border:#2a2a2a] [--fr-radius:1rem]"
/>
```

## Class merging with `cn()`

If you're building a wrapper component that accepts external classes, use `clsx` + `tailwind-merge` to safely merge them:

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

```jsx
function MySlider({ className }) {
  return (
    <FractionalRange
      className={cn('w-full bg-neutral-800', className)}
      min={0}
      max={2}
      step={0.1}
    />
  )
}
```
