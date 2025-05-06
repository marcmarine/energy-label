import EnergyLabel from './EnergyLabel'
import type { Templates } from './templates'

export function createEnergyLabel<T extends keyof Templates>(template?: T, options?: Partial<Templates[T]>) {
  return new EnergyLabel(template, options)
}

export default EnergyLabel
