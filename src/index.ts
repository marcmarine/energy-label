import EnergyLabel from './EnergyLabelGenerator'
import { appendToElement, downloadFile } from './utils'
import type { TemplateName, TemplatesData } from './defintions'

export function createEnergyLabel<T extends TemplateName>(template?: T, data?: Partial<TemplatesData[T]>) {
  return new EnergyLabel(template, data).generate()
}

export const LabelDOMRenderer = {
  appendToElement,
  downloadFile
}

export * from './defintions'

export default EnergyLabel
