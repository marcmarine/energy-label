import { templateFactory } from './templates'
import type { Template } from './templates/Template'
import type { TemplateName, TemplatesData } from './defintions'
import { SVGOptimizer } from './utils'

/**
 * Energy label generator class that creates optimized SVG energy efficiency labels using configurable templates and data.
 *
 * @template {TemplateName} [T='arrow'] - The template name type, defaults to 'arrow'.
 *
 * @example
 * ```typescript
 * import { EnergyLabel } from 'energy-label'
 *
 * // Create with default arrow template
 * const label = new EnergyLabel()
 *
 * const svgString = label.toString()
 * ```
 */
export default class EnergyLabel<T extends TemplateName = 'arrow'> {
  /**
   * Template factory instance used to generate the energy label.
   * @private
   */
  private templateFactory: Template
  /**
   * Partial template data used to customize the energy label.
   * @private
   */
  private data: Partial<TemplatesData[T]>

  /**
   * Creates a new EnergyLabel instance with the specified template and data.
   *
   * @param {T} [template='arrow'] - The template name to use for generating the label.
   * @param {Partial<TemplatesData[T]>} [data={}] - Partial template data to customize the energy label.
   *
   * @example
   * ```typescript
   * const label = new EnergyLabel('smartphones', {
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
   * ```
   */
  constructor(template: T = 'arrow' as T, data: Partial<TemplatesData[T]> = {}) {
    this.templateFactory = templateFactory(template)
    this.data = data
  }

  /**
   * Generates an optimized SVG string representation of the energy label.
   *
   * @returns {string} An optimized SVG string.
   *
   * @throws {Error} May throw if template generation fails or SVG optimization encounters issues.
   *
   */
  toString(): string {
    let templateOptions = this.data

    const result = this.templateFactory.generate(templateOptions)

    return SVGOptimizer.optimize(result)
  }
}
