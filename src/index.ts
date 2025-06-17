/**
 * @module energy-label
 */
import type { TemplateName, TemplatesData } from './defintions'
import EnergyLabelGenerator from './EnergyLabelGenerator'
import { appendTo, download } from './utils'

/**
 * Creates an energy label SVG in a single operation.
 *
 * @template {TemplateName} [T='arrow'] - The template name type that determines the label structure.
 *
 * @param {T} [template='arrow'] - The template name to use for generating the label.
 * @param {Partial<TemplatesData[T]>} [data={}] - Partial template data to customize the energy label.
 *
 * @returns {EnergyLabelGenerator} A Promise that resolves to an optimized SVG string.
 *
 * @throws {Error} May throw if template generation fails or SVG optimization encounters issues.
 *
 * @example
 * ```typescript
 * const label = EnergyLabel('smartphones', {
 *   flagOrigin: 'EU',
 *   supplierName: 'Sultana',
 *   modelName: '92COU8944VK',
 *   eprelRegistrationNumber: '3712289',
 *   efficiencyRating: 'D',
 *   batteryEnduranceHours: 74,
 *   batteryEnduranceMinutes: 47,
 *   fallReliabilityClass: 'C',
 *   repairabilityClass: 'E',
 *   batteryEnduranceInCycles: '3900',
 *   ingressProtectionRating: 'IP14'
 * })
 *
 * // Generate with specific template
 * const svgString = await label.generate()
 * ```
 *
 */
function EnergyLabel<T extends TemplateName>(template?: T, data?: Partial<TemplatesData[T]>): EnergyLabelGenerator {
  return new EnergyLabelGenerator(template, data)
}

export * from './defintions'

export { EnergyLabelGenerator, EnergyLabel, appendTo, download }
