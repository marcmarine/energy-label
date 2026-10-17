import { PRODUCT_GROUPS } from '../constants'
import type { ProductName } from '../definitions'
import { QRCodeGenerator } from '../utils'
import { EPREL_BASE_URL } from './common'

export abstract class Template<T> {
  generate(data: Partial<T>): string {
    const background = this.createBackground()
    const header = this.createHeader(data)
    const efficiencyScale = this.createEfficiencyScale(data)
    const consumption = this.createConsumption(data)
    const features = this.createFeatures(data)

    return this.render([background, header, efficiencyScale, consumption, features])
  }

  protected createBackground(): string {
    return ''
  }

  protected createHeader(_data: Partial<T>): string {
    return ''
  }

  protected abstract createEfficiencyScale(data: Partial<T>): string

  protected createConsumption(_data: Partial<T>): string {
    return ''
  }

  protected createFeatures(_data: Partial<T>): string {
    return ''
  }

  protected abstract getWidth(): number
  protected abstract getHeight(): number

  /**
   * Links to the product page in EPREL or, without a registration number, to its product group page.
   */
  protected buildEprelUrl(product: ProductName, registrationNumber?: string): string {
    const groupUrl = `${EPREL_BASE_URL}/screen/product/${PRODUCT_GROUPS[product].urlCode}`
    const url = registrationNumber ? `${groupUrl}/${encodeURIComponent(registrationNumber)}` : groupUrl

    return `${url}?navigatingfrom=energy-label`
  }

  protected generateQRCodeDataUrl(product: ProductName, registrationNumber?: string) {
    const url = this.buildEprelUrl(product, registrationNumber)

    return QRCodeGenerator.generate(url)
  }

  protected render(sections: string[]): string {
    const width = this.getWidth()
    const height = this.getHeight()
    const content = sections.join('')

    return compactMarkup(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${content}</svg>`)
  }
}

/**
 * Removes the indentation that the template literals add to the markup.
 * Inside tags, whitespace is collapsed. Text content is only trimmed where a line break was added
 * for readability, so user-provided values keep their spacing (they are escaped and contain no `<` or `>`).
 */
function compactMarkup(markup: string): string {
  return markup
    .split(/(<[^>]*>)/)
    .map(part => (part.startsWith('<') ? part.replace(/\s+/g, ' ').replace(/ ?(\/?>)$/, '$1') : part.replace(/^\s*\n\s*|\s*\n\s*$/g, '')))
    .join('')
}
