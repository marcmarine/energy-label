import { PRODUCT_GROUPS } from './constants'
import type {
  EnergyClass,
  ProductName,
  TemplateName,
  TemplatesData,
} from './definitions'
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
 * @returns {EnergyLabel<T>} An `EnergyLabel` instance ready to generate the SVG.
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
 *   batteryEnduranceInCycles: 39,
 *   ingressProtectionRating: 'IP14'
 * })
 *
 * // Generate with specific template
 * const svgString = label.toString()
 * ```
 *
 */
export function createEnergyLabel<T extends TemplateName = 'arrow'>(
  template?: T,
  data?: Partial<TemplatesData[T]>,
): EnergyLabel<T> {
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
 *   labelOrientation: 'RIGHT'
 * })
 *
 * const svgString = label.toString()
 * ```
 */
export function createClassArrow(
  energyClass: EnergyClass,
  options?: Omit<ArrowData, 'energyClass'>,
): EnergyLabel<'arrow'> {
  return new EnergyLabel('arrow', {
    energyClass,
    ...options,
  })
}

/**
 * Creates an `EnergyLabel` instance from a product in [EPREL](https://eprel.ec.europa.eu), choosing the label from its `productGroup`.
 *
 * Pass the product as the EPREL public API returns it. Like `createEnergyLabel`, it bundles all the labels.
 *
 * @param {{ productGroup: string }} product - The product data from the EPREL API.
 *
 * @returns {EnergyLabel<ProductName>} An `EnergyLabel` instance ready to generate the SVG.
 *
 * @throws {Error} If the product group has no label in this library.
 *
 * @example
 * ```typescript
 * const response = await fetch('https://eprel.ec.europa.eu/api/product/1573269')
 * const product = await response.json()
 *
 * const svgString = createEnergyLabelFromEprel(product).toString()
 * ```
 */
export function createEnergyLabelFromEprel(product: {
  productGroup: string
}): EnergyLabel<ProductName> {
  const productGroup = product?.productGroup
  const groups = Object.entries(PRODUCT_GROUPS) as [
    ProductName,
    (typeof PRODUCT_GROUPS)[ProductName],
  ][]
  const match = groups.find(([, group]) => group.urlCode === productGroup)

  if (!match) {
    throw new Error(
      `Unsupported EPREL product group "${productGroup}". Supported product groups: ${groups.map(([, group]) => group.urlCode).join(', ')}`,
    )
  }

  return new EnergyLabel(
    match[0],
    product as Partial<TemplatesData[ProductName]>,
  )
}
