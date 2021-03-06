import {
  Options,
  RenderOptions,
  WorkerOptions,
  WorkerResponse,
} from 'src/options'
import View from 'src/view/View'
import WorkerLoader from 'worker-loader!src/worker'

export default class Manager {
  private isDestroyed: boolean = false
  private readonly view: View
  private readonly worker: Worker
  private rafId?: number

  private workerOptions?: WorkerOptions
  private renderOptions?: RenderOptions
  private workerResponse?: WorkerResponse

  constructor({
    canvas,
    bounds,
  }: {
    canvas: HTMLCanvasElement
    bounds: ClientRect
  }) {
    this.view = new View({ canvas, bounds })
    this.worker = new WorkerLoader()
    this.worker.addEventListener('message', (e: MessageEvent) => {
      if (this.isDestroyed) return
      if (!(e && e.data && e.data.type)) return
      switch (e.data.type) {
        case 'update': {
          if (!this.renderOptions) return // XXX theoretically unreachable
          this.workerResponse = e.data.response as WorkerResponse
          this.view.update(this.renderOptions, this.workerResponse)
          // Sync worker tick with browser frame rate
          const rafId = (this.rafId = window.requestAnimationFrame(() => {
            if (rafId !== this.rafId) return // out of date
            if (this.isDestroyed) return
            postMessage(this.worker, { type: 'update.tick' })
          }))
          break
        }
      }
    })
  }

  public destroy(): void {
    this.isDestroyed = true
    if (this.rafId) window.cancelAnimationFrame(this.rafId)
    postMessage(this.worker, { type: 'destroy' })
    this.view.destroy()
  }

  public resize(bounds: ClientRect): void {
    this.view.resize(bounds)
  }

  public draw(options: Options): void {
    // Split options for worker & renderer
    this.workerOptions = {
      dimensions: options.dimensions,
      particles: options.particles,
      max: options.max,
      behavior: options.behavior,
      neighborhood: options.neighborhood,
      bounding: options.bounding,
    }
    this.renderOptions = {
      layers: options.layers,
    }
    // Update worker
    postMessage(this.worker, { type: 'update', options: this.workerOptions })
    // Update renderer IF we have a prior worker response
    if (this.workerResponse) {
      this.view.update(this.renderOptions, this.workerResponse)
    }
  }

  public setRotating(rotating: boolean): void {
    this.view.setRotating(rotating)
  }
}

const postMessage = (worker: Worker, message: any): void => {
  worker.postMessage(JSON.stringify(message))
}
