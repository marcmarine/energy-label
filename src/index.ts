import EnergyLabel from './EnergyLabel'
import type { Templates } from './definitions'

export function createEnergyLabel<T extends keyof Templates>(template?: T, options?: Partial<Templates[T]>) {
  return new EnergyLabel(template, options)
}

export * from './definitions'
export default EnergyLabel
