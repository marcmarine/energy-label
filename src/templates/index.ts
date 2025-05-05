import { html, svg } from 'lit-html'
import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js'
import defaultTemplate from './default'
import refrigeratingAppliancesTemplate from './refrigerating-appliances'
import type { Templates } from '../definitions'

export function renderTemplate(
  template: keyof Templates,
  options: Partial<
    Templates[keyof Templates] & {
      qrCodeDataUrl: string
    }
  >
) {
  const getTemplate = (template: keyof Templates) => {
    switch (template) {
      case 'refrigerating-appliances':
        return refrigeratingAppliancesTemplate(options)
      default:
        return defaultTemplate(options)
    }
  }

  const result = render(getTemplate(template))
  const contentString = collectResultSync(result)

  return contentString
}
