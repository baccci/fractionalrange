<div align="left" >
  <img src="https://github.com/baccci/fractionalrange/blob/main/fractionalrange.png">
</div>

🎚️ An opinionated range slider component for React built with Tailwind CSS.

## Usage

First install the component in your project:

```bash
npm i fractionalrange
```

Add it into your app:

```jsx
import { FractionalRange } from 'fractionalrange'

export function App() {
  return (
    <>
      <FractionalRange
        label='Range'
        min={-1}
        max={3}
        step={0.02}
        activeColor='#ff9646'
        initialValue={1.2}
        className="w-[300px]"
      />
    </>
  )
}
```
---
### Layouts
FractionalRange has 5 different prebuilt layouts you can choose: **none**, **indicator**, **shadows**, **values**, and **full**. Each layout shows or hides different components.

- `None *(default)*`: Only renders the slider.
- `Indicator`: Renders the dot indictor below the slider.
- `Shadows`: Renders the shadows.
- `Values`: Renders a Title Bar which has the Label in the left and the current value on the right.
- `Full`: Renders all the components.

Most of this components are stylable using standard or any kind of CSS framework.

```jsx
export function App() {
  return (
    <>
      <FractionalRange
        label='Range'
        min={-1}
        max={3}
        step={0.02}
        activeColor='#ff9646'
        initialValue={1.2}
        layout="shadows"
      />
  </>
  )
}
```

To style or extend any layout component, or add a totally new one:

```jsx
import { FractionalRange } from 'fractionalrange'
import { CustomComponent } from './Custom.tsx'

export function App() {
  return (
    <>
      <FractionalRange
        label='Range'
        min={-1}
        max={3}
        step={0.02}
        activeColor='#ff9646'
        initialValue={1.2}
      >
        <FractionalRange.IndicatorDot className="bottom-2"/>
        <FractionalRange.Shadows/>
        <CustomComponent/>
      </FractionalRange>
    </>
  )
}
```

## Props

<table>
<tr>
  <th>Property</th>
  <th>Type</th>
  <th>Default value</th>
  <th>Description</th>
</tr>
<tr>
  <td><code>min</code></td>
  <td>number</td>
  <td>0</td>
  <td>The lowest value in the range the slider allowed.</td>
</tr>
<tr>
  <td><code>max</code></td>
  <td>number</td>
  <td>2</td>
  <td>The greatest value in the range the slider allowed.</td>
</tr>
<tr>
  <td><code>step</code></td>
  <td>number</td>
  <td>0.1</td>
  <td>The step between a value to the next or previous.</td>
</tr>
<tr>
  <td><code>label</code></td>
  <td>string | ReactNode</td>
  <td>undefined</td>
  <td>
    A string or React component that specifies the component's purpose. If this property is set as a string, it will be used for screen readers. Otherwise, you also need to specify an aria-label property.
  </td>
</tr>
<tr>
  <td><code>layout?</code></td>
  <td>'none' | 'indicator' | 'shadows' | 'values' | 'full'</td>
  <td>'none'</td>
  <td>
    Determines what layout to use.
  </td>
</tr>
<tr>
  <td><code>value?</code></td>
  <td>number</td>
  <td>undefined</td>
  <td>The controlled current value.</td>
</tr>
<tr>
  <td><code>initialValue?</code></td>
  <td>number</td>
  <td>undefined</td>
  <td>The initial value when the component renders.</td>
</tr>
<tr>
  <td><code>onChange?</code></td>
  <td>(value: number) => void</td>
  <td>undefined</td>
  <td>A function to be called when the controlled value is updated.</td>
</tr>
<tr>
  <td><code>color?</code></td>
  <td>string</td>
  <td>'#fff'</td>
  <td>
    The main color. Will be used in the values and the not highlighted values.
  </td>
</tr>
<tr>
  <td><code>activeColor?</code></td>
  <td>string</td>
  <td>'#fff'</td>
  <td>
    The active color. Will be used in the highlighted ticks and the indicator.
  </td>
</tr>
<tr>
  <td><code>disabled?</code></td>
  <td>boolean</td>
  <td>false</td>
  <td>
    Determines if the component will be disabled to use.
  </td>
</tr>
<tr>
  <td><code>sound?</code></td>
  <td>string</td>
  <td>undefined</td>
  <td>
    A URL string of an audio file to reproduce every time the value changes.
  </td>
</tr>
<tr>
  <td><code>disableWillChange?</code></td>
  <td>boolean</td>
  <td>false</td>
  <td>
    Determines if <code>'will-change'</code> CSS property will be used to animate the slider (could cause performance issues if not used well). 
  </td>
</tr>
<tr>
  <td><code>fragmentClassName?</code></td>
  <td>string</td>
  <td>undefined</td>
  <td>
    Class name to be applied to each tick element. 
  </td>
</tr>
</table>

*Properties marked with an `'?'` are optional.*

## Documentation
Full documentation soon.

## Contribute
You're wellcome to contribute to the code, documentation or any topic you want to improve this project.


