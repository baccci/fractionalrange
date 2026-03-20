interface StickParams {
  context: CanvasRenderingContext2D
  x?: number
  y?: number
  length?: number
  angle?: number
  theme?: 'light' | 'dark'
  opacity?: number
  growingDistance?: number
  opacityDistance?: number
}

export class Stick {
  #context: CanvasRenderingContext2D
  #x: number
  #y: number
  #length: number
  #angle: number
  #lineWidth: number
  #theme: 'light' | 'dark'
  #opacity: number

  constructor({
    context,
    x = 0,
    y = 0,
    length = 20,
    angle,
    theme = 'light',
    opacity = 1
  }: StickParams) {
    this.#context = context
    this.#x = x
    this.#y = y
    this.#length = length
    this.#angle = angle ?? this.#x
    this.#lineWidth = Math.max(0.5, 10 - (x + y) / 100)
    this.#theme = theme
    this.#opacity = opacity
  }

  draw() {
    const halfLength = this.#length / 2
    const shiftedX = this.#x + halfLength
    const shiftedY = this.#y + halfLength

    // Calculate the start and end points relative to the center
    const startX = shiftedX - halfLength * Math.cos(this.#angle)
    const startY = shiftedY - halfLength * Math.sin(this.#angle)
    const endX = shiftedX + halfLength * Math.cos(this.#angle)
    const endY = shiftedY + halfLength * Math.sin(this.#angle)

    const darkColor = `rgba(0, 0, 0, ${this.#opacity})`
    const lightColor = `rgba(255, 255, 255, ${this.#opacity})`

    this.#context.strokeStyle = this.#theme === 'light' ? darkColor : lightColor
    this.#context.lineWidth = this.#lineWidth
    this.#context.beginPath()
    this.#context.moveTo(startX, startY)
    this.#context.lineTo(endX, endY)
    this.#context.stroke()
  }

  get x() {
    return this.#x
  }

  set x(value: number) {
    this.#x = value
  }

  get y() {
    return this.#y
  }

  set y(value: number) {
    this.#y = value
  }

  get lineWidth() {
    return this.#lineWidth
  }

  set lineWidth(value: number) {
    this.#lineWidth = value
  }

  get opacity() {
    return this.#opacity
  }

  set opacity(value: number) {
    this.#opacity = value
  }

  get angle() {
    return this.#angle
  }

  set angle(value: number) {
    this.#angle = value
  }

  get size() {
    return this.#length
  }

  set size(size: number) {
    this.#length = size
  }
}