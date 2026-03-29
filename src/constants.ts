export const DEFAULT_MIN = 0
export const DEFAULT_MAX = 2
export const DEFAULT_STEP = 0.1
export const DEFAULT_COLOR = '#fff'
export const DEFAULT_ACTIVE_COLOR = '#fff'
export const DEFAULT_MOUSE_SENSITIVITY = 1.5
export const DEFAULT_TOUCH_SENSITIVITY = 1

/** Every Nth fraction tick is rendered at the larger size */
export const LARGE_FRACTION_INTERVAL = 5

/** Maximum decimal places shown on fraction labels */
export const FRACTION_LABEL_DECIMALS = 3

/** Multiplier applied to step size when Shift is held during keyboard navigation */
export const KEYBOARD_STEP_MULTIPLIER = 5

/** Spring config for keyboard-driven position changes */
export const KEYBOARD_SPRING = { stiffness: 200, damping: 26, mass: 1 }

/** Spring config for drag-driven position changes */
export const DRAG_SPRING = { stiffness: 300, damping: 30, mass: 0.8 }
