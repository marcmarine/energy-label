import EnergyLabel from './EnergyLabel'
import type { EURegulationAct, LabelRegulationMap } from './definitions'
export { EU_REGULATION } from './constants'

export function createEnergyLabel<T extends EURegulationAct>(regulation: T, options?: Partial<LabelRegulationMap>) {
  return new EnergyLabel(regulation, options)
}

export * from './definitions'
export default EnergyLabel
