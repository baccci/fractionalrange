import { render, screen } from '@testing-library/react'
import type React from 'react'
import { describe, expect, test, vi } from 'vitest'
import { FractionalRange } from '../fractional-range'

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

const defaultProps = {
  id: 'fractional-range',
  label: 'Fractional Range',
  activeColor: '#ff9646',
  showIndicator: true,
  showShadows: true,
  min: 0,
  max: 3,
  step: 0.02,
  'data-testid': 'fractional-range',
}

const DefaultRange = ({ children }: { children?: React.ReactNode }) => {
  return <FractionalRange {...defaultProps}>{children}</FractionalRange>
}

const renderDefault = () => {
  render(<DefaultRange />)
}

const renderDefaultWithChildren = (children: React.ReactNode) => {
  render(<DefaultRange>{children}</DefaultRange>)
}

describe('FractionalRange', () => {
  test('renders', () => {
    renderDefault()
    expect(screen.getByRole('slider')).toBeDefined()
  })

  test('renders with label', () => {
    render(<FractionalRange {...defaultProps} label="test" />)
    expect(screen.getByText('test')).toBeDefined()
  })

  test('renders with children', () => {
    renderDefaultWithChildren(<div>test</div>)
    expect(screen.getByText('test')).toBeDefined()
  })

  test('renders with children and label', () => {
    render(
      <FractionalRange {...defaultProps} label="test">
        <div>test</div>
      </FractionalRange>,
    )
    expect(screen.getByText('test')).toBeDefined()
  })

  test('renders with className', () => {
    render(<FractionalRange {...defaultProps} className="test" />)
    expect(screen.getByTestId('fractional-range').classList.contains('test')).toBe(true)
  })

  test('renders steps correctly', () => {
    renderDefault()
    const NUMBER_OF_TICKS_PER_STEP = 5
    const firstTickValue = screen.getByRole('slider').children[0].children[0].textContent
    const secondTickValue = screen.getByRole('slider').children[5].children[0].textContent
    const parsedFirstTickValue = Number.parseFloat(firstTickValue!)
    const parsedSecondTickValue = Number.parseFloat(secondTickValue!)
    const difference = Math.abs(parsedSecondTickValue - parsedFirstTickValue)
    expect(difference / NUMBER_OF_TICKS_PER_STEP).toBe(defaultProps.step)
  })

  test('renders with min', () => {
    const MIN_TEST_VALUE = 0.2
    render(<FractionalRange {...defaultProps} min={MIN_TEST_VALUE} />)

    const firstTickValue = screen.getByRole('slider').children[0].children[0].textContent
    expect(Number.parseFloat(firstTickValue!)).toBe(MIN_TEST_VALUE)
  })

  test('renders with max', () => {
    const MAX_TEST_VALUE = 2
    render(<FractionalRange {...defaultProps} min={0} max={MAX_TEST_VALUE} />)

    const maxChildrenIndex = screen.getByRole('slider').children.length - 1
    const lastTickValue =
      screen.getByRole('slider').children[maxChildrenIndex].children[0].textContent

    expect(Number.parseFloat(lastTickValue!)).toBe(MAX_TEST_VALUE)
  })

  test('renders with label, indicator, and shadows', () => {
    render(<FractionalRange {...defaultProps} showIndicator showShadows />)
    const baseComponent = screen.getByTestId('fractional-range')
    const { indicator, shadowLeft, shadowRight, titlebar, value } = getLayoutNodes(baseComponent)

    expect(baseComponent).toBeDefined()
    expect(screen.getAllByText('Fractional Range')).toBeDefined()
    expect(indicator).toBeDefined()
    expect(titlebar).toBeDefined()
    expect(value).toBeDefined()
    expect(shadowLeft).toBeDefined()
    expect(shadowRight).toBeDefined()
  })

  test('renders with label only (no indicator or shadows)', () => {
    render(<FractionalRange {...defaultProps} showIndicator={false} showShadows={false} />)
    const baseComponent = screen.getByTestId('fractional-range')
    const { indicator, shadowLeft, shadowRight, titlebar, value } = getLayoutNodes(baseComponent)

    expect(baseComponent).toBeDefined()
    expect(screen.getAllByText('Fractional Range')).toBeDefined()
    expect(indicator).toBeUndefined()
    expect(titlebar).toBeDefined()
    expect(value).toBeDefined()
    expect(shadowLeft).toBeUndefined()
    expect(shadowRight).toBeUndefined()
  })

  test('renders with indicator only', () => {
    render(
      <FractionalRange
        {...defaultProps}
        label={undefined as unknown as string}
        showIndicator
        showShadows={false}
      />,
    )
    const baseComponent = screen.getByTestId('fractional-range')
    const { indicator, shadowLeft, shadowRight, titlebar } = getLayoutNodes(baseComponent)

    expect(baseComponent).toBeDefined()
    expect(indicator).toBeDefined()
    expect(titlebar).toBeUndefined()
    expect(shadowLeft).toBeUndefined()
    expect(shadowRight).toBeUndefined()
  })

  test('renders with shadows only', () => {
    render(
      <FractionalRange
        {...defaultProps}
        label={undefined as unknown as string}
        showIndicator={false}
        showShadows
      />,
    )
    const baseComponent = screen.getByTestId('fractional-range')
    const { indicator, shadowLeft, shadowRight, titlebar } = getLayoutNodes(baseComponent)

    expect(baseComponent).toBeDefined()
    expect(indicator).toBeUndefined()
    expect(titlebar).toBeUndefined()
    expect(shadowLeft).toBeDefined()
    expect(shadowRight).toBeDefined()
  })

  test('renders with no extras', () => {
    render(
      <FractionalRange
        {...defaultProps}
        label={undefined as unknown as string}
        showIndicator={false}
        showShadows={false}
      />,
    )
    const baseComponent = screen.getByTestId('fractional-range')
    const { indicator, shadowLeft, shadowRight, titlebar } = getLayoutNodes(baseComponent)

    expect(baseComponent).toBeDefined()
    expect(indicator).toBeUndefined()
    expect(titlebar).toBeUndefined()
    expect(shadowLeft).toBeUndefined()
    expect(shadowRight).toBeUndefined()
  })
})

function findChildrenByDataAttribute(children: HTMLCollection | undefined, dataAttribute: string) {
  if (!children) return undefined
  return Array.from(children).find((child) => child.hasAttribute(`data-${dataAttribute}`))
}

function getLayoutNodes(baseComponent: HTMLElement) {
  const indicator = findChildrenByDataAttribute(baseComponent.children, 'indicator-dot')
  const shadowLeft = findChildrenByDataAttribute(baseComponent.children, 'shadow-left')
  const shadowRight = findChildrenByDataAttribute(baseComponent.children, 'shadow-right')
  const titlebar = findChildrenByDataAttribute(baseComponent.children, 'titlebar')
  const value = findChildrenByDataAttribute(titlebar?.children, 'value')

  return {
    indicator,
    shadowLeft,
    shadowRight,
    titlebar,
    value,
  }
}
