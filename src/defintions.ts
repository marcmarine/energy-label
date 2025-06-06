import type { ArrowData } from './templates/ArrowTemplate'
import type { HouseholdFridgesAndFreezersData, WineStorageAppliancesData } from './templates/RefrigeratingAppliancesTemplate'
import type { SmartphonesAndTabletsData } from './templates/SmartphonesTemplate'

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

export type { WineStorageAppliancesData, HouseholdFridgesAndFreezersData, SmartphonesAndTabletsData }

export type TemplateName = keyof TemplatesData

export interface TemplatesData {
  arrow: ArrowData
  'refrigerating-appliances': WineStorageAppliancesData | HouseholdFridgesAndFreezersData
  smartphones: SmartphonesAndTabletsData
}

export type TemplatesDataValues = Partial<TemplatesData[TemplateName] & QRCodeDataUrlData>
