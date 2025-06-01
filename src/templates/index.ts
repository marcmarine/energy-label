import { ArrowTemplate } from './ArrowTemplate'
import { RefrigeratingAppliancesTemplate, type HouseholdFridgesAndFreezersData, type WineStorageAppliancesData } from './RefrigeratingAppliances'
import { SmartphonesTemplate, type SmartphonesAndTabletsData } from './SmartphonesTemplate'

export type FlagOriginData = 'EU' | 'UK'

export interface EfficiencyRatingData {
  efficiencyRating: string
}

export interface QRCodeDataUrlData {
  qrCodeDataUrl: string
}

export interface EnergyLabelBaseData extends EfficiencyRatingData {
  flagOrigin: FlagOriginData
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

export type TemplatesDataValues = Partial<TemplatesData[TemplateName] & QRCodeDataUrlData>

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
