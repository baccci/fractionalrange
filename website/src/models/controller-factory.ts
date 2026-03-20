import { ControllerType } from './types'
import { MouseEventController } from './mouse-event-controller'
import { NoiseController } from './noise-controller'
import { type ControllerParams, type Controller } from './controller'

export interface MouseEventControllerParams extends ControllerParams {
  growingDistance?: number;
  opacityDistance?: number;
}

export interface NoiseControllerParams extends ControllerParams {
  frecuency?: number;
  amplitude?: number;
  speed?: number;
}

type ControllerConstructorParams = MouseEventControllerParams | NoiseControllerParams;

export class ControllerFactory {
  static createController(
    type: ControllerType,
    params: ControllerConstructorParams
  ): Controller {
    switch (type) {
      case ControllerType.MouseEvent:
        return new MouseEventController(params as MouseEventControllerParams)
      case ControllerType.Noise:
        return new NoiseController(params as NoiseControllerParams)
      default:
        throw new Error(`Unknown controller type: ${type}`)
    }
  }
}