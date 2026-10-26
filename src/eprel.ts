import { PRODUCT_GROUPS } from './constants'
import type { ProductName } from './definitions'
import { encodeQRCode } from './qrcode'

export const EPREL_BASE_URL = 'https://eprel.ec.europa.eu'

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
 * Links to the product in EPREL with the same short URL as the QR code on official labels
 * or, without a registration number, to the product group page.
 */
export function eprelUrl(
  product: ProductName,
  registrationNumber?: string,
): string {
  return registrationNumber
    ? `${EPREL_BASE_URL}/qr/${encodeURIComponent(registrationNumber)}`
    : `${EPREL_BASE_URL}/screen/product/${PRODUCT_GROUPS[product].urlCode}`
}

/** QR code for the label header, pointing to the product in EPREL. */
export function eprelQRCode(
  product: ProductName,
  registrationNumber?: string,
): QRCodePath {
  return qrCodePath(eprelUrl(product, registrationNumber))
}
