import type { EnergyClass, TemplateName, TemplatesData } from './defintions'
import EnergyLabel from './EnergyLabel'
import type { ArrowData } from './templates/ArrowTemplate'

/**
 * Creates an `EnergyLabel` instance for generating energy label SVGs.
 *
 * @template {TemplateName} [T='arrow'] - The template name type that determines the label structure.
 *
 * @param {T} [template='arrow'] - The template name to use for generating the label.
 * @param {Partial<TemplatesData[T]>} [data={}] - Partial template data to customize the energy label.
 *
 * @returns {EnergyLabel} An `EnergyLabel` instance ready to generate the SVG.
 *
 * @example
 * ```typescript
 * const label = createEnergyLabel('smartphones', {
 *   flagOrigin: 'EU',
 *   supplierOrTrademark: 'Sultana',
 *   modelIdentifier: '92COU8944VK',
 *   eprelRegistrationNumber: '3712289',
 *   energyClass: 'D',
 *   batteryEndurancePerCycle: 4020,
 *   repeatedFreeFallReliabilityClass: 'C',
 *   repairabilityClass: 'E',
 *   batteryEnduranceInCycles: '3900',
 *   ingressProtectionRating: 'IP14'
 * })
 *
 * // Generate with specific template
 * const svgString = label.toString()
 * ```
 *
 */
export function createEnergyLabel<T extends TemplateName>(template?: T, data?: Partial<TemplatesData[T]>): EnergyLabel {
  return new EnergyLabel(template, data)
}

/**
 * Creates an `EnergyLabel` instance configured as an energy class arrow.
 *
 * @param {EnergyClass} energyClass - The energy efficiency class to display.
 * @param {Omit<ArrowData, 'energyClass'>} options - Additional arrow options such as orientation.
 *
 * @returns {EnergyLabel<'arrow'> } An `EnergyLabel` instance ready to generate the SVG.
 *
 * @example
 * ```typescript
 * const label = createClassArrow('B', {
 *   orientation: 'RIGHT'
 * })
 *
 * const svgString = label.toString()
 * ```
 */
export function createClassArrow(energyClass: EnergyClass, options?: Omit<ArrowData, 'energyClass'>): EnergyLabel<'arrow'> {
  return new EnergyLabel('arrow', {
    energyClass,
    ...options
  })
}
