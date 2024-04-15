import { FractionalRange } from '../FractionalRange'
import './test.style.css'

export default {
  title: 'FractionalRange',
  component: FractionalRange,
  argTypes: {
    activeColor: 'color',
    layout: {
      options: ['none', 'indicator', 'shadows', 'values', 'full']
    }
  },
  args: {
    min: 0,
    max: 3,
    step: 0.02,
    value: 1.2,
    activeColor: '#ff9646',
    id: 'fractional-range',
    label: 'Fractional Range',
    layout: 'full'
  }
}

export const LayoutFull = {
  args: {
    layout: 'full'
  }
}

export const LayoutValues = {
  args: {
    layout: 'values'
  }
}

export const LayoutIndicator = {
  args: {
    layout: 'indicator'
  }
}

export const LayoutShadows = {
  args: {
    layout: 'shadows'
  }
}

export const LayoutNone = {
  args: {
    layout: 'none'
  }
}

export const WithChildren = {
  args: {
    children: <div className='with-children'>children</div>
  }
}

export const WithCustomClassname = {
  args: {
    className: 'custom-classname'
  }
}