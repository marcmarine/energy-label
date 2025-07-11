import type { TemplateName, TemplatesData } from './defintions'
import EnergyLabel from './EnergyLabel'

/**
 * Creates an energy label SVG in a single operation.
 *
 * @template {TemplateName} [T='arrow'] - The template name type that determines the label structure.
 *
 * @param {T} [template='arrow'] - The template name to use for generating the label.
 * @param {Partial<TemplatesData[T]>} [data={}] - Partial template data to customize the energy label.
 *
 * @returns {EnergyLabel} An optimized SVG string.
 *
 * @throws {Error} May throw if template generation fails or SVG optimization encounters issues.
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
