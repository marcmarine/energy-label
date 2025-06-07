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
 * // Create with default arrow template
 * const label = new EnergyLabel();
 * const svg = await label.generate();
 * ```
 */
export default class EnergyLabelGenerator<T extends TemplateName = 'arrow'> {
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
   * });
   * ```
   */
  constructor(template: T = 'arrow' as T, data: Partial<TemplatesData[T]> = {}) {
    this.templateFactory = templateFactory(template)
    this.data = data
  }

  /**
   * Generates an optimized SVG string representation of the energy label.
   *
   * @returns {Promise<string>} A Promise that resolves to an optimized SVG string.
   *
   * @throws {Error} May throw if template generation fails or SVG optimization encounters issues.
   *
   */
  async generate(): Promise<string> {
    let templateOptions = this.data

    const result = await this.templateFactory.generate(templateOptions)

    return SVGOptimizer.optimize(result)
  }
}
