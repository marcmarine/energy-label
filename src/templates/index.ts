import type { TemplateName, TemplatesData } from '../definitions'
import { arrowTemplate } from './ArrowTemplate'
import { refrigeratingAppliancesTemplate } from './RefrigeratingAppliancesTemplate'
import { smartphonesTemplate } from './SmartphonesTemplate'

/** Draws a label as an SVG string. Throws if the data can't be drawn on the label. */
export type Template<T> = (data: Partial<T>) => string

const templates: { [K in TemplateName]: Template<TemplatesData[K]> } = {
  arrow: arrowTemplate,
  'refrigerating-appliances': refrigeratingAppliancesTemplate,
  smartphones: smartphonesTemplate,
}

export const templateFactory = <T extends TemplateName>(
  templateKey: T,
): Template<TemplatesData[T]> => {
  if (!Object.hasOwn(templates, templateKey)) {
    throw new Error(
      `Unknown template "${templateKey}". Available templates: ${Object.keys(templates).join(', ')}`,
    )
  }

  return templates[templateKey]
}
