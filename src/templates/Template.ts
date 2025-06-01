import { QRCodeGenerator } from '../utils'
import type { ArrowData } from './ArrowTemplate'
import { TemplateCommon } from './TemplateCommon'

export abstract class Template<T = ArrowData> {
  protected data?: Partial<T>

  async generate(data: Partial<T>): Promise<string> {
    this.data = data

    const background = this.createBackground()
    const header = await this.createHeader()
    const efficiencyScale = this.createEfficiencyScale()
    const consumption = this.createConsumption()
    const features = this.createFeatures()

    return this.render([background, header, efficiencyScale, consumption, features])
  }

  protected createBackground(): string {
    return ''
  }

  protected async createHeader(): Promise<string> {
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

  protected async generateQRCodeDataUrl(registrationNumber: string): Promise<string> {
    const url = `${TemplateCommon.EPREL_BASE_URL}/${registrationNumber}`
    const options = { margin: 0, width: 512 }
    return await QRCodeGenerator.generate(url, options)
  }

  protected render(sections: string[]): string {
    const width = this.getWidth()
    const height = this.getHeight()
    const content = sections.join('')

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${content}</svg>`
  }
}
