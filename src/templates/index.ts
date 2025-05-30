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

export const templateFactory = (templateKey: TemplateName, data: TemplatesDataValues) => {
  switch (templateKey) {
    case 'refrigerating-appliances':
      return refrigeratingAppliancesTemplate(data)
    case 'smartphones':
      return smartphonesAndTabletsTemplate(data)
    default:
      return arrowTemplate(data as EfficiencyRatingData)
  }
}
