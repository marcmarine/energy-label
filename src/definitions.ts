import type { EU_REGULATION } from './constants'

export type EURegulationAct = keyof typeof EU_REGULATION

export type FlagOriginOption = 'EU' | 'UK'

export interface EnergyLabelOptions {
  flagOrigin: FlagOriginOption
  supplierOrTrademark: string
  modelIdentifier: string
  eprelRegistrationNumber: string
  efficiencyClass: string
  consolidatedEnergyConsAnnual: number
  capBottles: number
  noise: number
  noiseClass: string
}
