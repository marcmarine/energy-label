import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js'
import arrowTemplate from './arrow'
import refrigeratingAppliancesTemplate, { type HouseholdFridgesAndFreezersData, type WineStorageAppliancesData } from './refrigerating-appliances'
import smartphonesAndTabletsTemplate, { type SmartphonesAndTabletsData } from './smartphones'

export type FlagOriginOption = 'EU' | 'UK'

export interface EfficiencyRatingData {
  efficiencyRating: string
}

export interface EnergyLabelBaseData extends EfficiencyRatingData {
  flagOrigin: FlagOriginOption
  supplierName: string
  modelName: string
  eprelRegistrationNumber: string
}

export type TemplatesWithQR = Exclude<TemplateName, 'arrow'>

export type TemplateName = keyof TemplatesData
export interface TemplatesData {
  arrow: EfficiencyRatingData
  'refrigerating-appliances': WineStorageAppliancesData | HouseholdFridgesAndFreezersData
  smartphones: SmartphonesAndTabletsData
}

export type TemplatesDataValues = Partial<
  TemplatesData[TemplateName] & {
    qrCodeDataUrl: string
  }
>

const templateFactory = (templateKey: TemplateName, data: TemplatesDataValues) => {
  switch (templateKey) {
    case 'refrigerating-appliances':
      return refrigeratingAppliancesTemplate(data)
    case 'smartphones':
      return smartphonesAndTabletsTemplate(data)
    default:
      return arrowTemplate(data as EfficiencyRatingData)
  }
}

export function renderTemplateOptions(templateKey: TemplateName = 'arrow', data: TemplatesDataValues) {
  const template = templateFactory(templateKey, data)
  const result = render(template)

  return collectResultSync(result)
}
