import { readElementCSSStyles } from '@/utils/read-element-css-styles'
import { Stick } from './stick'

export interface ControllerParams {
  context?: CanvasRenderingContext2D
  size?: number
  gap?: number,
  canvasX?: number,
  canvasY?: number,
  canvas: HTMLCanvasElement,
  theme?: 'light' | 'dark'
}

export class Controller {
  _context: CanvasRenderingContext2D | undefined
  _theme: 'light' | 'dark'
  _gap: number
  _size: number
  _canvasX: number
  _canvasY: number
  _canvas: HTMLCanvasElement
  _sticks: Stick[][] = []

  constructor({
    context,
    theme = 'light',
    gap = 10,
    size = 20,
    canvasX = 0,
    canvasY = 0,
    canvas
  }: ControllerParams) {
    this._context = context
    this._theme = theme
    this._gap = gap
    this._size = size
    this._canvasX = canvasX
    this._canvasY = canvasY
    this._canvas = canvas
  }

  setSticks() {
    if (!this._context) return

    this._sticks = []
    const canvasComputedStyles = readElementCSSStyles(this._canvas)

    // If the canvas size is set in different units than pixels,
    // won't be able to calculate the sticks properly
    const canvasWidth = parseInt(canvasComputedStyles.width) ?? 1
    const canvasHeight = parseInt(canvasComputedStyles.height) ?? 1
    const stickBoxSize = this._size + this._gap
    const sticksPerColumn = Math.floor(canvasHeight / stickBoxSize)
    const sticksPerRow = Math.floor(canvasWidth / stickBoxSize)
    const offsetX = (canvasWidth - sticksPerRow * stickBoxSize) / 2
    const offsetY = (canvasHeight - sticksPerColumn * stickBoxSize) / 2

    for (let i = 0; i < sticksPerColumn; i++) {
      this._sticks[i] = []
      for (let j = 0; j < sticksPerRow; j++) {
        const x = j * stickBoxSize + this._gap / 2 + offsetX
        const y = i * stickBoxSize + this._gap / 2 + offsetY

        const stick = new Stick({
          x,
          y,
          theme: this._theme,
          length: this._size,
          context: this._context
        })
        this._sticks[i].push(stick)
      }
    }
  }

  draw() {
    if (!this._context) return
    if (!this._sticks.length) return this.setSticks()

    const canvasWidth = this._canvas.width
    const canvasHeight = this._canvas.height

    this._context.fillStyle = 'white'
    this._context.clearRect(0, 0, canvasWidth, canvasHeight)

    for (let i = 0; i < this._sticks.length; i++) {
      for (let j = 0; j < this._sticks[i].length; j++) {
        const stick = this._sticks[i][j]
        stick.draw()
      }
    }
  }

  get size() {
    return this._size
  }

  set size(size: number) {
    this._size = size
    this.setSticks()
  }
}