import { each } from 'lodash'

import { FIELD_SIZE } from 'src/constants'
import { LayerEnabled } from 'src/drawing/layers'
import {
  BoundingEnabled,
  BoundingNames,
  boundings,
} from 'src/geometry/boundings'
import { neighborhoods, NeighborhoodSpecs } from 'src/geometry/neighborhoods'
import { makeParticles, Particle } from 'src/geometry/particles'
import { simulations, SimulationSpecs } from 'src/geometry/simulations'
import { limit, makeNew, math } from 'src/geometry/vector-n'

export interface WorkerRequest {
  dimensions: number
  particles: number
  simulation: SimulationSpecs
  neighborhood: NeighborhoodSpecs
  boundings: BoundingEnabled
  layers: LayerEnabled
}

export interface WorkerResponse {
  dimensions: number
  particles: Particle[]
  layers: LayerEnabled
}

/**
 * TypeScript currently does not support loading both "DOM" and "WebWorker"
 * type definitions (in the tsconfig "lib" field), so we are falling back
 * to weird partial types hacked out of the desired definitions file
 *
 * Hack:
 * node_modules/typescript/lib/lib.webworker.d.ts -> typings/custom.d.ts
 *
 * Actual:
 * https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope
 */
const context = (self as any) as DedicatedWorkerGlobalScope

/**
 * State stored as global singleton due to the nature of web workers
 * (think of this as a class instantiated on `new WebpackWorkerLoader()`)
 */
const state: {
  particles: Particle[]
  request: WorkerRequest | undefined
  stopped: boolean
} = {
  particles: [],
  request: undefined,
  stopped: false,
}

/**
 * TODO hook these into request object
 * (currently they are on Simulation Specs)
 * (but they should actually be more global)
 */
const MAX_FORCE = 1
const MAX_SPEED = 1

/**
 * Particle physics loop
 * - runs chosen simulation
 * - runs chosen boundings
 * - runs chosen neighborhood
 * - posts message with updated particles
 *
 * Note: asynchronous loop, to allow external interruptions
 */
const loop = () => {
  if (!state.request) return

  // Reset particle accelerations
  each(
    state.particles,
    p => (p.acceleration = makeNew(p.acceleration.length, 0)),
  )

  {
    // Accumulate acceleration from simulation
    const spec = state.request.simulation
    const simulation = simulations[spec.name]
    state.particles = simulation(state.particles, spec.config)
  }

  // Accumulate acceleration from boundings
  each(boundings, (bounding, name) => {
    if (!state.request!.boundings[name as BoundingNames]) return
    state.particles = bounding(state.particles)
  })

  // Apply force limits to accelerations
  each(
    state.particles,
    p => (p.acceleration = limit(p.acceleration, MAX_FORCE)),
  )

  // Apply accelerations to velocities
  each(
    state.particles,
    p => (p.velocity = math.add(p.velocity, p.acceleration)),
  )

  // Apply speed limits to velocities
  each(state.particles, p => (p.velocity = limit(p.velocity, MAX_SPEED)))

  // Appliy velocities to positions
  each(state.particles, p => (p.position = math.add(p.position, p.velocity)))

  // [TODO] Apply wrapping

  {
    // Find & annotate particle neighbors
    const spec = state.request.neighborhood
    const neighborhood = neighborhoods[spec.name]
    state.particles = neighborhood(state.particles, spec.config)
  }

  // Update main thread
  sendUpdate()

  // Bail if paused
  // (first run allowed to get updates to main thread)
  if (state.stopped) return

  // Async to allow interrupt
  setTimeout(loop, 1000 / 60)
}

/**
 * Send WorkerResponse back to main browser thread
 */
const sendUpdate = () => {
  if (!state.request) return
  context.postMessage<{
    type: 'update'
    response: WorkerResponse
  }>({
    type: 'update',
    response: {
      particles: state.particles,
      dimensions: state.request.dimensions,
      layers: state.request.layers,
    },
  })
}

/**
 * Handle messages from main browser thread
 */
context.addEventListener('message', e => {
  if (!(e && e.data && e.data.type)) return
  switch (e.data.type) {
    case 'request': {
      state.request = e.data.request as WorkerRequest
      state.particles = makeParticles(
        FIELD_SIZE,
        state.request.dimensions,
        state.request.particles,
        state.particles,
      )
      loop()
      break
    }
    case 'pause': {
      state.stopped = true
      break
    }
    case 'resume': {
      state.stopped = false
      loop()
      break
    }
    case 'destroy': {
      state.stopped = true
      context.close()
      break
    }
  }
})
