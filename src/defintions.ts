import type { ArrowData } from './templates/ArrowTemplate'
import type { HouseholdFridgesAndFreezersData, WineStorageAppliancesData } from './templates/RefrigeratingAppliancesTemplate'
import type { SmartphonesAndTabletsData } from './templates/SmartphonesTemplate'

export type FlagOriginData = 'EU' | 'UK'

export interface EnergyClassData {
  energyClass: string
}

export interface QRCodeDataUrlData {
  qrCodeDataUrl: string
}

export interface EnergyLabelBaseData extends EnergyClassData {
  flagOrigin: FlagOriginData
  supplierOrTrademark: string
  modelIdentifier: string
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
