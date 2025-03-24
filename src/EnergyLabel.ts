import QRCode from 'qrcode'
import { svg } from 'lit-html'
import { optimize } from 'svgo/browser'
import { renderTemplate } from './templates'
import type { EURegulationAct } from './definitions'

export interface EnergyLabelOptions {
  supplierOrTrademark: string
  modelIdentifier: string
  eprelRegistrationNumber: string
  efficiencyClass: string
  consolidatedEnergyConsAnnual: number
  capBottles: number
  noise: number
  noiseClass: string
}

export default class EnergyLabel {
  public regulation: EURegulationAct = '2019/2016/2023-09-30'
  public options: Partial<EnergyLabelOptions> = {}

  constructor(regulation: EURegulationAct, options?: Partial<EnergyLabelOptions>) {
    this.regulation = regulation
    if (options) {
      this.options = { ...options }
    }
  }

  private generateSVGDocument(svgString: string) {
    const parser = new DOMParser()

    return parser.parseFromString(svgString, 'image/svg+xml')
  }

  private optimizeSVG(svgString: string) {
    return optimize(svgString).data
  }

  async generateSVGString(): Promise<string> {
    const qrCode = await QRCode.toDataURL(`https://eprel.ec.europa.eu/${this.options.eprelRegistrationNumber}`, { margin: 0, width: 512 })
    const imageElement = svg`<image href="${qrCode}" x="298.75" y="11.34" width="52.91" />`

    const svgString = renderTemplate(this.regulation, { ...this.options, qrCodeImage: imageElement })

    const optimizedSVGString = this.optimizeSVG(svgString)

    return optimizedSVGString
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

    const optimizedSVGString = this.optimizeSVG(svgString)

    const blob = this.createSVGBinaryData(optimizedSVGString) as Blob

    const url = URL.createObjectURL(blob)

    const downloadLink = document.createElement('a')
    downloadLink.href = url
    const { supplierOrTrademark, modelIdentifier } = this.options
    downloadLink.download = `${supplierOrTrademark?.replaceAll(' ', '-')}_${modelIdentifier}.svg`

    document.body.appendChild(downloadLink)
    downloadLink.click()

    document.body.removeChild(downloadLink)
  }
}
