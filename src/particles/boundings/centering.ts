import { Bounding } from 'src/particles/boundings'
import ParticleN from 'src/particles/ParticleN'
import System from 'src/particles/System'
import VectorN from 'src/particles/VectorN'

export const centering: Bounding = (system: System): void => {
  // Only works for 1 or more particles
  if (system.particles.length < 1) return
  // Subtract centroid vector from each particle's position
  // (effectively shifting the centroid to origin zero)
  const positions = system.particles.map((p: ParticleN) => p.position)
  const centroid = VectorN.getAverage(positions)
  system.particles.forEach((p: ParticleN) => p.position.subtract(centroid))
}
