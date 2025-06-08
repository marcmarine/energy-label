import QRCode from 'qrcode'
import { optimize } from 'svgo/browser'

export const mmToPx = (mm: number): number => {
  const result = mm * (96 / 25.4)

  return Number(result.toFixed(2))
}

export class QRCodeGenerator {
  static async generate(content: string, options = { margin: 0, width: 512 }): Promise<string> {
    return await QRCode.toDataURL(content, options)
  }
}

export class SVGOptimizer {
  static async optimize(svgString: string) {
    return optimize(svgString).data
  }
}

/**
 * Appends an SVG string to a DOM element, replacing any existing content.
 *
 * @param {HTMLElement} container - The DOM element where the SVG will be appended.
 * @param {string} svgString - The SVG markup as a string to be inserted.
 *
 * @returns {void} This function does not return a value.
 *
 * @throws {Error} May throw if the SVG string is malformed and cannot be parsed.
 *
 * @example
 * ```typescript
 * import EnergyLabelGenerator, { appendTo } from 'energy-label'
 *
 * const element = document.getElementById('energy-label')
 *
 * const generator = new EnergyLabelGenerator('arrow', { efficiencyRating: 'A' })
 * const svgString = await generator.generate()
 *
 * appendTo(element, svgString)
 * ```
 * @group DOM Utilities
 */
export function appendTo(container: HTMLElement, svgString: string): void {
  container.innerHTML = ''

  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  const svg = doc.documentElement

  container.appendChild(svg)
}

/**
 * Downloads an SVG string as a file to the user's device.
 *
 * @param {string} svgString - The SVG markup as a string to be downloaded.
 * @param {string} [filename='label.svg'] - The filename for the downloaded file.
 *
 * @returns {void} This function does not return a value.
 *
 * @throws {Error} May throw if blob creation fails.
 *
 * @example
 * ```typescript
 * import EnergyLabelGenerator, { download } from 'energy-label'
 *
 * const element = document.getElementById('energy-label')
 *
 * const generator = new EnergyLabelGenerator('arrow', { efficiencyRating: 'A' })
 * const svgString = await generator.generate()
 *
 * download(svgString)
 * // Or with a custom filename:
 * download(svgString, 'my-energy-label.svg')
 * ```
 * @group DOM Utilities
 */
export function download(svgString: string, filename: string = 'label.svg'): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
