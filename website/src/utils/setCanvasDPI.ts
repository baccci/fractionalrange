// credit to Erik Koopmans
// https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
export function setCanvasDPI(canvas: HTMLCanvasElement, dpi: number) {
  // Set up CSS size.
  canvas.style.width = canvas.style.width || canvas.width + 'px'
  canvas.style.height = canvas.style.height || canvas.height + 'px'

  // Get size information.
  const scaleFactor = dpi / 96
  const width = parseFloat(canvas.style.width)
  const height = parseFloat(canvas.style.height)

  // Backup the canvas contents.
  const oldScale = canvas.width / width
  const backupScale = scaleFactor / oldScale
  const backup = canvas.cloneNode(false) as HTMLCanvasElement

  backup.getContext('2d')?.drawImage(canvas, 0, 0)

  // Resize the canvas.
  const ctx = canvas.getContext('2d')
  canvas.width = Math.ceil(width * scaleFactor)
  canvas.height = Math.ceil(height * scaleFactor)

  // Redraw the canvas image and scale future draws.
  ctx?.setTransform(backupScale, 0, 0, backupScale, 0, 0)
  ctx?.drawImage(backup, 0, 0)
  ctx?.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0)
}