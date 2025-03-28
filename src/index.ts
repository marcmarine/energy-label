import EnergyLabel from './EnergyLabel'
import type { EnergyLabelOptions, EURegulationAct } from './definitions'
export { EU_REGULATION } from './constants'

export function createEnergyLabel(regulation: EURegulationAct, options?: Partial<EnergyLabelOptions>) {
  return new EnergyLabel(regulation, options)
}

export default EnergyLabel
