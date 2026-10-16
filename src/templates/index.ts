import { ArrowTemplate } from './ArrowTemplate'
import { RefrigeratingAppliancesTemplate } from './RefrigeratingAppliancesTemplate'
import { SmartphonesTemplate } from './SmartphonesTemplate'
import type { Template } from './Template'
import type { TemplateName, TemplatesData } from '../definitions'

const templates: { [K in TemplateName]: () => Template<TemplatesData[K]> } = {
  arrow: () => new ArrowTemplate(),
  'refrigerating-appliances': () => new RefrigeratingAppliancesTemplate(),
  smartphones: () => new SmartphonesTemplate()
}

export const templateFactory = <T extends TemplateName>(templateKey: T): Template<TemplatesData[T]> => {
  if (!Object.hasOwn(templates, templateKey)) {
    throw new Error(`Unknown template "${templateKey}". Available templates: ${Object.keys(templates).join(', ')}`)
  }

  return templates[templateKey]()
}
