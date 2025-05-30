import QRCode from 'qrcode'
import { optimize } from 'svgo/browser'
import { renderTemplateOptions, type TemplateName, type TemplatesData, type TemplatesWithQR } from './templates'

export default class EnergyLabel<T extends TemplateName = 'arrow'> {
  private template?: T
  private data: Partial<TemplatesData[T]>

  constructor(template?: T, data: Partial<TemplatesData[T]> = {}) {
    this.template = template
    this.data = data
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
    let templateOptions = this.data

    if (this.template !== 'arrow') {
      const { eprelRegistrationNumber } = this.data as unknown as TemplatesData[TemplatesWithQR]
      const qrCodeDataUrl = await this.generateQRCodeDataUrl(eprelRegistrationNumber)
      templateOptions = { ...this.data, qrCodeDataUrl }
    }

    const result = renderTemplateOptions(this.template, templateOptions)
    return this.optimizeSVG(result)
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
    const { supplierName, modelName } = this.data as unknown as TemplatesData[TemplatesWithQR]
    downloadLink.download = `${supplierName?.replaceAll(' ', '-')}_${modelName}.svg`

    document.body.appendChild(downloadLink)
    downloadLink.click()

    document.body.removeChild(downloadLink)
  }
}
