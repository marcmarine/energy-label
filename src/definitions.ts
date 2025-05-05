import type { EU_REGULATION } from './constants'

export type EURegulationAct = keyof typeof EU_REGULATION

export type FlagOriginOption = 'EU' | 'UK'

export interface EnergyLabelOptions {
  flagOrigin: FlagOriginOption
  supplierName: string
  modelName: string
  eprelRegistrationNumber: string
}

export interface RefrigeratingAppliancesOption extends EnergyLabelOptions {
  efficiencyRating: string
  annualEnergyConsumption: number
  noiseEmissions: number
  noiseEmissionsClass: string
}
export interface WineStorageAppliancesOptions extends RefrigeratingAppliancesOption {
  bottleCapacity: number
}

export interface HouseholdFridgesAndFreezersOptions extends RefrigeratingAppliancesOption {
  chillVolume: number
  frozenVolume: number
}

// Temporary type used to map labeling regulations
export type LabelRegulationMap = WineStorageAppliancesOptions | HouseholdFridgesAndFreezersOptions

// export interface LabelRegulationMap {
//   'refrigerating-appliances': WineStorageAppliancesOptions | HouseholdFridgesAndFreezersOptions
// }
