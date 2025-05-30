import { templateFactory, type TemplateName, type TemplatesData, type TemplatesWithQR } from './templates'
import { QRCodeGenerator, SVGOptimizer } from './utils'

export default class EnergyLabel<T extends TemplateName = 'arrow'> {
  private template: T
  private data: Partial<TemplatesData[T]>

  constructor(template: T = 'arrow' as T, data: Partial<TemplatesData[T]> = {}) {
    this.template = template
    this.data = data
  }

  async generateLabel(): Promise<string> {
    let templateOptions = this.data

    if (this.template !== 'arrow') {
      const { eprelRegistrationNumber } = this.data as unknown as TemplatesData[TemplatesWithQR]
      const qrCodeDataUrl = await QRCodeGenerator.generate(`https://eprel.ec.europa.eu/${eprelRegistrationNumber}`)
      templateOptions = { ...this.data, qrCodeDataUrl }
    }

    const result = templateFactory(this.template, templateOptions)

    return SVGOptimizer.optimize(result)
  }

  async appendSVGToElement(container: HTMLElement): Promise<void> {
    if (!container) {
      return
    }

    const svgString = await this.generateLabel()
    const parser = new DOMParser()
    const svgDocument = parser.parseFromString(svgString, 'image/svg+xml')
    const svgElement = svgDocument.documentElement

    svgElement.setAttribute('width', '100%')
    svgElement.setAttribute('height', '100%')

    container.innerHTML = ''

    container.appendChild(svgElement)
  }

  async downloadSVGFile(): Promise<void> {
    const svgString = await this.generateLabel()

    const blob = new Blob([svgString], { type: 'image/svg+xml' })

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
