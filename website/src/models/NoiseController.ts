import { createNoise3D } from 'simplex-noise'
import { Controller, type ControllerParams } from './Controller'
import { Stick } from './Stick'
import { readElementCSSStyles } from '@/utils/readElementCSSStyles'

const noise3D = createNoise3D()

interface NoiseControllerParams extends ControllerParams {
  frecuency?: number
  amplitude?: number
  speed?: number
}

export class NoiseController extends Controller {
  #frecuency: number
  #amplitude: number
  #z: number
  #speed: number
  #canvasWidth: number
  #canvasHeight: number
  #animationFrame: number | undefined
  constructor({
    frecuency = 0.00,
    amplitude = 0.5,
    speed = 0.01,
    ...params
  }: NoiseControllerParams) {
    super(params)
    this.#frecuency = frecuency
    this.#amplitude = amplitude
    this.#speed = speed
    this.#z = 0

    this.#canvasHeight = parseInt(readElementCSSStyles(this._canvas).height)
    this.#canvasWidth = parseInt(readElementCSSStyles(this._canvas).width)
    this.setSticks()
  }

  setSticks() {
    if (!this._context) return

    this._sticks = []

    // If the canvas size is set in different units than pixels,
    // won't be able to calculate the sticks properly
    const canvasWidth = this.#canvasWidth ?? 1
    const canvasHeight = this.#canvasHeight ?? 1
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

    this.#z = 0
    cancelAnimationFrame(this.#animationFrame ?? 0)
  }

  draw() {
    if (!this._context) return
    if (!this._sticks.length) return

    const canvasWidth = this.#canvasWidth ?? 1
    const canvasHeight = this.#canvasHeight ?? 1

    this._context.fillStyle = 'white'
    this._context.clearRect(0, 0, canvasWidth, canvasHeight)

    for (let i = 0; i < this._sticks.length; i++) {
      for (let j = 0; j < this._sticks[i].length; j++) {
        const stick = this._sticks[i][j]
        const stickX = stick.x
        const stickY = stick.y

        const noise = noise3D(stickX * this.#frecuency, stickY * this.#frecuency, this.#z) * this.#amplitude

        stick.angle = noise * Math.PI
        stick.lineWidth = Math.max(0.5, 10 - noise * 25)
        stick.draw()
      }
    }

    this.#z += this.#speed
    this.#animationFrame = requestAnimationFrame(this.draw.bind(this))
  }

  get speed() {
    return this.#speed
  }

  set speed(speed: number) {
    this.#speed = speed
  }
}