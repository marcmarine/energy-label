import type { EnergyClass, FlagOriginData, FreeFallReliabilityClass, NoiseClass, ProductName, RepairabilityClass } from './definitions'

export const FLAG_ORIGINS: readonly FlagOriginData[] = ['EU', 'UK']

export const ENERGY_CLASSES: readonly EnergyClass[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
export const NOISE_CLASSES: readonly NoiseClass[] = ['A', 'B', 'C', 'D']
export const REPAIRABILITY_CLASSES: readonly RepairabilityClass[] = ['A', 'B', 'C', 'D', 'E']
export const FREE_FALL_RELIABILITY_CLASSES: readonly FreeFallReliabilityClass[] = ['A', 'B', 'C', 'D', 'E']

type GroupInformation = {
  urlCode: string
  name: string
  regulation: string
}

export const PRODUCT_GROUPS: Record<ProductName, GroupInformation> = {
  smartphones: {
    urlCode: 'smartphonestablets20231669',
    name: 'Smartphones and slate tablets',
    regulation: '2023/1669'
  },
  'refrigerating-appliances': {
    urlCode: 'refrigeratingappliances2019',
    name: 'Refrigerating appliances',
    regulation: '2019/2016'
  }
}
