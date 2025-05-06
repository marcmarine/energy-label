import { html, svg } from 'lit-html'
import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js'
import defaultTemplate from './default'
import refrigeratingAppliancesTemplate, { type HouseholdFridgesAndFreezersOptions, type WineStorageAppliancesOptions } from './refrigerating-appliances'

export type FlagOriginOption = 'EU' | 'UK'

export interface DefaultOptions {
  efficiencyRating: string
}

export interface EnergyLabelOptions extends DefaultOptions {
  flagOrigin: FlagOriginOption
  supplierName: string
  modelName: string
  eprelRegistrationNumber: string
}

export type TemplatesWithQR = Exclude<keyof Templates, 'default'>

export type TemplateName = keyof Templates
export interface Templates {
  default: DefaultOptions
  'refrigerating-appliances': WineStorageAppliancesOptions | HouseholdFridgesAndFreezersOptions
}

export function renderTemplate(
  template: keyof Templates,
  options: Partial<
    Templates[keyof Templates] & {
      qrCodeDataUrl: string
    }
  >
) {
  const getTemplate = (template: keyof Templates) => {
    switch (template) {
      case 'refrigerating-appliances':
        return refrigeratingAppliancesTemplate(options)
      default:
        return defaultTemplate(options)
    }
  }

  const result = render(getTemplate(template))
  const contentString = collectResultSync(result)

  return contentString
}
