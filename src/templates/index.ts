import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js'
import defaultTemplate from './default'
import refrigeratingAppliancesTemplate, { type HouseholdFridgesAndFreezersOptions, type WineStorageAppliancesOptions } from './refrigerating-appliances'
import smartphonesAndTabletsTemplate, { type SmartphonesAndTabletsOption } from './smartphones'

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
  smartphones: SmartphonesAndTabletsOption
}

type TemplateOptions = Partial<
  Templates[keyof Templates] & {
    qrCodeDataUrl: string
  }
>

const templateFactory = (templateKey: keyof Templates, options: TemplateOptions) => {
  switch (templateKey) {
    case 'refrigerating-appliances':
      return refrigeratingAppliancesTemplate(options)
    case 'smartphones':
      return smartphonesAndTabletsTemplate(options)
    default:
      return defaultTemplate(options)
  }
}

export function renderTemplateOptions(templateKey: keyof Templates, options: TemplateOptions) {
  const template = templateFactory(templateKey, options)
  const result = render(template)

  return collectResultSync(result)
}
