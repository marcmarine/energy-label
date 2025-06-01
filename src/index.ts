import EnergyLabel from './EnergyLabel'
import type { TemplateName, TemplatesData } from './types'

export function createEnergyLabel<T extends TemplateName>(template?: T, data?: Partial<TemplatesData[T]>) {
  return new EnergyLabel(template, data)
}

export * from './types'

export default EnergyLabel
