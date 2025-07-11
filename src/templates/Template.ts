import { PRODUCT_GROUPS } from '../constants'
import type { ProductName } from '../defintions'
import { QRCodeGenerator } from '../utils'
import type { ArrowData } from './ArrowTemplate'
import { TemplateCommon } from './TemplateCommon'

export abstract class Template<T = ArrowData> {
  protected data?: Partial<T>

  generate(data: Partial<T>): string {
    this.data = data

    const background = this.createBackground()
    const header = this.createHeader()
    const efficiencyScale = this.createEfficiencyScale()
    const consumption = this.createConsumption()
    const features = this.createFeatures()

    return this.render([background, header, efficiencyScale, consumption, features])
  }

  protected createBackground(): string {
    return ''
  }

  protected createHeader(): string {
    return ''
  }

  protected abstract createEfficiencyScale(): string

  protected createConsumption(): string {
    return ''
  }

  protected createFeatures(): string {
    return ''
  }

  protected abstract getWidth(): number
  protected abstract getHeight(): number

  protected buildEprelUrl(product: ProductName, registrationNumber: string): string {
    const productGroup = PRODUCT_GROUPS[product]

    return `${TemplateCommon.EPREL_BASE_URL}/screen/product/${productGroup.urlCode}/${registrationNumber}?navigatingfrom=energy-label`
  }

  protected generateQRCodeDataUrl(product: ProductName, registrationNumber: string) {
    const url = this.buildEprelUrl(product, registrationNumber)

    return QRCodeGenerator.generate(url)
  }

  protected render(sections: string[]): string {
    const width = this.getWidth()
    const height = this.getHeight()
    const content = sections.join('')

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${content}</svg>`
      .replace(/\n+/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/>\s+</g, '><')
  }
}
