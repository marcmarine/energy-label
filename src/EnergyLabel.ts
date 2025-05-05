import QRCode from 'qrcode'
import { optimize } from 'svgo/browser'
import { renderTemplate } from './templates'
import type { Templates, TemplatesWithQR } from './definitions'

export default class EnergyLabel<T extends keyof Templates> {
  public template: T
  public options: Partial<Templates[T]> = {}

  constructor(template: T = 'default' as T, options?: Partial<Templates[T]>) {
    this.template = template
    if (options) {
      this.options = options
    }
  }

  private generateSVGDocument(svgString: string) {
    const parser = new DOMParser()

    return parser.parseFromString(svgString, 'image/svg+xml')
  }

  private optimizeSVG(svgString: string) {
    return optimize(svgString).data
  }

  private async generateQRCodeDataUrl(registrationNumber?: string): Promise<string> {
    const QR_CODE_OPTIONS = { margin: 0, width: 512 }
    const qrCodeUrl = `https://eprel.ec.europa.eu/${registrationNumber}`

    return await QRCode.toDataURL(qrCodeUrl, QR_CODE_OPTIONS)
  }

  async generateSVGString(): Promise<string> {
    let templateData = this.options

    if (this.template !== 'default') {
      const { eprelRegistrationNumber } = this.options as Templates[TemplatesWithQR]
      const qrCodeDataUrl = await this.generateQRCodeDataUrl(eprelRegistrationNumber)
      templateData = { ...this.options, qrCodeDataUrl }
    }

    const rawSvg = renderTemplate(this.template, templateData)
    return this.optimizeSVG(rawSvg)
  }

  async appendSVGToElement(container: HTMLElement): Promise<void> {
    if (!container) {
      return
    }

    const svgString = await this.generateSVGString()
    const svgDocument = this.generateSVGDocument(svgString)
    const svgElement = svgDocument.documentElement

    svgElement.setAttribute('width', '100%')
    svgElement.setAttribute('height', '100%')

    container.innerHTML = ''

    container.appendChild(svgElement)
  }

  createSVGBinaryData(svgString: string): Blob | Buffer {
    if (typeof window === 'undefined') {
      return Buffer.from(svgString)
    } else {
      return new Blob([svgString], { type: 'image/svg+xml' })
    }
  }

  async downloadSVGFile(): Promise<void> {
    const svgString = await this.generateSVGString()

    const blob = this.createSVGBinaryData(svgString) as Blob

    const url = URL.createObjectURL(blob)

    const downloadLink = document.createElement('a')
    downloadLink.href = url
    const { supplierName, modelName } = this.options as Templates[TemplatesWithQR]
    downloadLink.download = `${supplierName?.replaceAll(' ', '-')}_${modelName}.svg`

    document.body.appendChild(downloadLink)
    downloadLink.click()

    document.body.removeChild(downloadLink)
  }
}
