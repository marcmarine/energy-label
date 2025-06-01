import { ArrowTemplate } from './ArrowTemplate'
import { RefrigeratingAppliancesTemplate } from './RefrigeratingAppliances'
import { SmartphonesTemplate } from './SmartphonesTemplate'
import type { TemplateName } from '../types'

export const templateFactory = (templateKey: TemplateName) => {
  switch (templateKey) {
    case 'refrigerating-appliances':
      return new RefrigeratingAppliancesTemplate()
    case 'smartphones':
      return new SmartphonesTemplate()
    default:
      return new ArrowTemplate()
  }
}
