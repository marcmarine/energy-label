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

export interface RefrigeratingAppliancesOption extends EnergyLabelOptions {
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

export interface Templates {
  default: DefaultOptions
  'refrigerating-appliances': WineStorageAppliancesOptions | HouseholdFridgesAndFreezersOptions
}

export type TemplatesWithQR = Exclude<keyof Templates, 'default'>

export type TemplateName = keyof Templates
