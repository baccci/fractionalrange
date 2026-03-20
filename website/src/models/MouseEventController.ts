import { DEFAULT_OPACITY_DISTANCE, GROWING_DISTANCE, MAX_STICK_LINE_WIDTH, MIN_OPACITY, MIN_STICK_LINE_WIDTH } from '@/constants/stick.const'
import { Controller, type ControllerParams } from './Controller'

interface MouseEventControllerParams extends ControllerParams {
  growingDistance?: number
  opacityDistance?: number
}

export class MouseEventController extends Controller {
  #growingDistance: number
  #opacityDistance: number

  constructor({
    growingDistance = GROWING_DISTANCE,
    opacityDistance = DEFAULT_OPACITY_DISTANCE,
    ...params
  }: MouseEventControllerParams) {
    super(params)
    this.#growingDistance = growingDistance
    this.#opacityDistance = opacityDistance

    this.init()
  }

  private init() {
    this.attachMouseMoveListener()
    this.handleMouseMove()
  }

  private attachMouseMoveListener() {
    document.body.addEventListener('mousemove', this.handleMouseMove.bind(this))
  }

  private handleMouseMove(e?: MouseEvent) {
    const targetIsComponent = this.detectIfTargetIsComponent(e, 'FractionalRange')
    if (targetIsComponent) return

    for (const row of this._sticks) {
      for (const stick of row) {
        const stickX = this._canvasX + stick.x
        const stickY = this._canvasY + stick.y
        const clientX = e?.clientX ?? 0
        const clientY = e?.clientY ?? 0

        const distance = Math.sqrt((stickX - clientX) ** 2 + (stickY - clientY) ** 2)
        stick.lineWidth = Math.max(MIN_STICK_LINE_WIDTH, MAX_STICK_LINE_WIDTH - distance / this.#growingDistance)
        stick.opacity = Math.max(MIN_OPACITY, 1 - distance / this.#opacityDistance)
        const dx = (clientX - stickX) / 100

        stick.angle = dx
      }
    }
    this.draw()
  }

  private detectIfTargetIsComponent(e: MouseEvent | undefined, component: string) {
    if (!e) return false

    const targetInstanceOfElement = e.target instanceof HTMLElement
    if (!e.target || !targetInstanceOfElement) {
      return false
    }

    const targetIsComponent = e.target.dataset.component === component
    if (!targetIsComponent) {
      const numberOfParentsToCheck = 3
      let parent = e.target.parentElement
      for (let i = 0; i < numberOfParentsToCheck; i++) {
        if (!parent) return false
        if (parent.dataset.component === component) return true
        parent = parent.parentElement
      }
    }

    return targetIsComponent
  }
}