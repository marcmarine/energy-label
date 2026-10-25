import type { ArrowData } from './templates/ArrowTemplate'
import type { HouseholdFridgesAndFreezersData, WineStorageAppliancesData } from './templates/RefrigeratingAppliancesTemplate'
import type { SmartphonesAndTabletsData } from './templates/SmartphonesTemplate'

export type FlagOriginData = 'EU' | 'UK'

export type EnergyClass = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

/** Airborne acoustical noise emission class of refrigerating appliances (Regulation (EU) 2019/2016). */
export type NoiseClass = 'A' | 'B' | 'C' | 'D'

/** Repairability class of smartphones and slate tablets (Regulation (EU) 2023/1669). */
export type RepairabilityClass = 'A' | 'B' | 'C' | 'D' | 'E'

/** Repeated free fall reliability class of smartphones and slate tablets (Regulation (EU) 2023/1669). */
export type FreeFallReliabilityClass = 'A' | 'B' | 'C' | 'D' | 'E'

export interface EnergyClassData {
  energyClass: EnergyClass
}

export interface EnergyLabelBaseData extends EnergyClassData {
  flagOrigin: FlagOriginData
  supplierOrTrademark: string
  modelIdentifier: string
  eprelRegistrationNumber: string
}

export type { ArrowData, WineStorageAppliancesData, HouseholdFridgesAndFreezersData, SmartphonesAndTabletsData }

export type TemplateName = keyof TemplatesData

export interface TemplatesData {
  arrow: ArrowData
  'refrigerating-appliances': WineStorageAppliancesData | HouseholdFridgesAndFreezersData
  smartphones: SmartphonesAndTabletsData
}

export type ProductName = Exclude<TemplateName, 'arrow'>
