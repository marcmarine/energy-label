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
 * @returns {Promise<void>} A Promise that resolves when the SVG has been successfully appended.
 *
 * @throws {Error} May throw if the SVG string is invalid or DOM manipulation fails.
 *
 * @example
 * ```typescript
 * // Get container element
 * const container = document.getElementById('energy-label');
 *
 * // Generate SVG and append to container
 * const svgString = await createEnergyLabel('arrow', { efficiencyRating: 'A' });
 * await appendToElement(container, svgString);
 * ```
 *
 */
export async function appendToElement(container: HTMLElement, svgString: string): Promise<void> {
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
 * @returns {Promise<void>} A Promise that resolves when the download has been initiated.
 *
 * @throws {Error} May throw if blob creation fails or download cannot be initiated.
 *
 * @example
 * ```typescript
 * // Download with default filename
 * const svgString = await createEnergyLabel('arrow', { efficiencyRating: 'A' });
 * await downloadFile(svgString); // Downloads as 'label.svg'
 * ```
 *
 */
export async function downloadFile(svgString: string, filename: string = 'label.svg'): Promise<void> {
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
