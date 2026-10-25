/**
 * @module energy-label
 */
import EnergyLabel from './EnergyLabel'
import { appendTo, download } from './utils'
import { PRODUCT_GROUPS } from './constants'

export type {
  ArrowData,
  EnergyClass,
  FlagOriginData,
  FreeFallReliabilityClass,
  HouseholdFridgesAndFreezersData,
  NoiseClass,
  RepairabilityClass,
  SmartphonesAndTabletsData,
  TemplateName,
  TemplatesData,
  WineStorageAppliancesData
} from './definitions'
export * from './factories'

export { appendTo, download, EnergyLabel, PRODUCT_GROUPS }
