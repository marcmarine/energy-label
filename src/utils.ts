import { encodeQRCode } from './qrcode'

export const mmToPx = (mm: number): number => {
  const result = mm * (96 / 25.4)

  return Number(result.toFixed(2))
}

const XML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
}

/**
 * Escapes a value so it can be safely interpolated into SVG text or double-quoted attribute content.
 */
export function escapeXml(value: unknown): string {
  return String(value).replace(/[&<>"]/g, char => XML_ESCAPES[char] ?? char)
}

export function minutesToHoursAndMinutes(totalMinutes?: number) {
  if (typeof totalMinutes !== 'number' || isNaN(totalMinutes) || totalMinutes < 0) {
    return { hours: 'X', minutes: 'Y' }
  }

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { hours, minutes }
}
export interface QRCodePath {
  /** Number of modules per side. */
  size: number
  /** Path data in module units, meant to be drawn with a 1-unit stroke. */
  d: string
}

/**
 * Encodes `content` as a QR code drawn with vectors, so it stays sharp when the label is scaled or printed.
 * Each run of consecutive dark modules in a row becomes one horizontal segment.
 */
export function qrCodePath(content: string): QRCodePath {
  const modules = encodeQRCode(content)
  const size = modules.length
  const isDark = (row: number, col: number) => modules[row]?.[col] === true
  let d = ''
  let x = 0
  let y = 0

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!isDark(row, col)) continue

      let end = col + 1
      while (end < size && isDark(row, end)) end++

      // Relative moves keep the numbers short; the segment runs through the middle of the row.
      d += `m${col - x} ${row + 0.5 - y}h${end - col}`
      x = end
      y = row + 0.5
      col = end
    }
  }

  return { size, d }
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
 * import { appendTo, EnergyLabel } from 'energy-label'
 *
 * const element = document.getElementById('energy-label')
 *
 * const label = new EnergyLabel('arrow', { energyClass: 'A' })
 * const svgString = label.toString()
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
 * import { download, EnergyLabel } from 'energy-label'
 *
 * const label = new EnergyLabel('arrow', { energyClass: 'A' })
 * const svgString = label.toString()
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
