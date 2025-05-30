import EnergyLabel from './EnergyLabel'
import type { TemplateName, TemplatesData } from './templates'
export type { TemplateName } from './templates'

export function createEnergyLabel<T extends TemplateName>(template?: T, data?: Partial<TemplatesData[T]>) {
  return new EnergyLabel(template, data)
}

export default EnergyLabel
