import { map, reduce } from 'lodash'

import { FIELD_SIZE } from 'src/constants'
import { Bounding } from 'src/geometry/boundings'
import { Particle } from 'src/geometry/particles'
import { getLengthSq, math } from 'src/geometry/vector-n'

const LIMIT = FIELD_SIZE * FIELD_SIZE // XXX to avoid Math.sqrt()

export const scaling: Bounding = (particles: Particle[]): Particle[] => {
  // Only works for 2 or more particles
  if (particles.length < 2) return particles

  // Find the longest distance between any two particle positions
  const positions = map(particles, particle => particle.position)
  const maxLength = reduce(
    positions,
    (memo, position) =>
      reduce(
        positions,
        (memo2, position2) => {
          if (position === position2) return memo2
          const delta = math.sub(position, position2)
          const length = getLengthSq(delta)
          return Math.max(length, memo2)
        },
        memo,
      ),
    -Infinity,
  )

  // Abort if already within limits
  if (maxLength <= LIMIT) return particles

  // Scale down all particles
  const factor = LIMIT / maxLength
  return map(particles, particle => ({
    ...particle,
    position: math.mul(particle.position, factor),
  }))
}