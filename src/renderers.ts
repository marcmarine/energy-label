import type {
  EnergyClass,
  HouseholdFridgesAndFreezersData,
  SmartphonesAndTabletsData,
  WineStorageAppliancesData,
} from './definitions'
import { type ArrowData, arrowTemplate } from './templates/ArrowTemplate'
import { refrigeratingAppliancesTemplate } from './templates/RefrigeratingAppliancesTemplate'
import { smartphonesTemplate } from './templates/SmartphonesTemplate'

/**
 * Renders an energy class arrow as an SVG string.
 *
 * Unlike `createClassArrow`, it only bundles the arrow, so prefer it when the arrow is the only label you need.
 *
 * @param {EnergyClass} energyClass - The energy efficiency class to display.
 * @param {Omit<ArrowData, 'energyClass'>} options - Additional arrow options such as orientation.
 * @returns {string} A compact SVG string.
 *
 * @example
 * ```typescript
 * const svgString = renderClassArrow('B', {
 *   labelOrientation: 'RIGHT'
 * })
 * ```
 */
export function renderClassArrow(
  energyClass: EnergyClass,
  options?: Omit<ArrowData, 'energyClass'>,
): string {
  return arrowTemplate({ energyClass, ...options })
}

/**
 * Renders the energy label for smartphones and slate tablets as an SVG string.
 *
 * Unlike `createEnergyLabel('smartphones')`, it only bundles this label.
 *
 * @param {Partial<SmartphonesAndTabletsData>} [data={}] - Partial label data.
 * @returns {string} A compact SVG string.
 *
 * @example
 * ```typescript
 * const svgString = renderSmartphonesLabel({
 *   flagOrigin: 'EU',
 *   supplierOrTrademark: 'Sultana',
 *   modelIdentifier: '92COU8944VK',
 *   eprelRegistrationNumber: '3712289',
 *   energyClass: 'D',
 *   batteryEndurancePerCycle: 4020,
 *   repeatedFreeFallReliabilityClass: 'C',
 *   repairabilityClass: 'E',
 *   batteryEnduranceInCycles: 39,
 *   ingressProtectionRating: 'IP14'
 * })
 * ```
 */
export function renderSmartphonesLabel(
  data: Partial<SmartphonesAndTabletsData> = {},
): string {
  return smartphonesTemplate(data)
}

/**
 * Renders the energy label for refrigerating appliances (fridges, freezers and wine storage appliances) as an SVG string.
 *
 * Unlike `createEnergyLabel('refrigerating-appliances')`, it only bundles this label.
 *
 * @param {Partial<WineStorageAppliancesData | HouseholdFridgesAndFreezersData>} [data={}] - Partial label data.
 * @returns {string} A compact SVG string.
 *
 * @example
 * ```typescript
 * const svgString = renderRefrigeratingAppliancesLabel({
 *   energyClass: 'C',
 *   consolidatedEnergyConsAnnual: 186,
 *   capRefrNet: 200,
 *   capFreezeNet: 80,
 *   noise: 38,
 *   noiseClass: 'C'
 * })
 * ```
 */
export function renderRefrigeratingAppliancesLabel(
  data: Partial<
    WineStorageAppliancesData | HouseholdFridgesAndFreezersData
  > = {},
): string {
  return refrigeratingAppliancesTemplate(data)
}
