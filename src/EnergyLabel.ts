import { templateFactory } from './templates'
import type { Template } from './templates/Template'
import type { TemplateName, TemplatesData, TemplatesWithQR } from './defintions'
import { SVGOptimizer } from './utils'

export default class EnergyLabel<T extends TemplateName = 'arrow'> {
  private templateFactory: Template
  private data: Partial<TemplatesData[T]>

  constructor(template: T = 'arrow' as T, data: Partial<TemplatesData[T]> = {}) {
    this.templateFactory = templateFactory(template)
    this.data = data
  }

  async generateLabel(): Promise<string> {
    let templateOptions = this.data

    const result = await this.templateFactory.generate(templateOptions)

    return SVGOptimizer.optimize(result)
  }

  async appendSVGToElement(container: HTMLElement): Promise<void> {
    container.innerHTML = ''

    const svgString = await this.generateLabel()
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const svg = doc.documentElement

    container.appendChild(svg)
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
