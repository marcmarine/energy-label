import type { EU_REGULATION } from './constants'

export type EURegulationAct = keyof typeof EU_REGULATION

export type FlagOriginOption = 'EU' | 'UK'

export interface EnergyLabelOptions {
  flagOrigin: FlagOriginOption
  supplierName: string
  modelName: string
  eprelRegistrationNumber: string
  efficiencyRating: string
  annualEnergyConsumption: number
  bottleCapacity: number
  noiseEmissions: number
  noiseEmissionsClass: string
}
