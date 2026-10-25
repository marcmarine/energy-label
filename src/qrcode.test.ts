import { BarcodeFormat, EncodeHintType, QRCodeEncoder, QRCodeWriter } from '@zxing/library'
import { describe, expect, it } from 'vitest'
import { encodeQRCode } from './qrcode'

// EPREL runs ZXing in Java, where `(numInputBits + 7) / 8` is an integer division. The JavaScript port
// divides without rounding, so it moves to the next version when the data fills a version exactly.
// Restore the Java behavior so the reference matches EPREL.
const encoder = QRCodeEncoder as unknown as {
  willFit(numInputBits: number, version: { getTotalCodewords(): number; getECBlocksForLevel(level: unknown): { getTotalECCodewords(): number } }, ecLevel: unknown): boolean
}
encoder.willFit = (numInputBits, version, ecLevel) =>
  version.getTotalCodewords() - version.getECBlocksForLevel(ecLevel).getTotalECCodewords() >= Math.floor((numInputBits + 7) / 8)

/** Modules of the QR code that ZXing, the encoder behind EPREL, generates for `content`. */
function zxingModules(content: string): boolean[][] {
  const hints = new Map<EncodeHintType, unknown>([
    [EncodeHintType.CHARACTER_SET, 'UTF-8'],
    [EncodeHintType.ERROR_CORRECTION, 'L'],
    [EncodeHintType.MARGIN, 0]
  ])
  const matrix = new QRCodeWriter().encode(content, BarcodeFormat.QR_CODE, 0, 0, hints)

  return Array.from({ length: matrix.getHeight() }, (_, row) => Array.from({ length: matrix.getWidth() }, (_, col) => matrix.get(col, row)))
}

/** Deterministic pseudo-random text of the given length, lowercase so ZXing uses byte mode. */
function text(length: number, seed: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789/-_.?=&'
  let state = seed
  return Array.from({ length }, () => {
    state = (state * 1103515245 + 12345) % 2 ** 31
    return alphabet[state % alphabet.length]
  }).join('')
}

describe('encodeQRCode', () => {
  it('should match the QR codes of official EPREL labels', () => {
    // Module rows of the QR code on the official label of EPREL product 2884739, top-left finder area.
    const official = ['#######..#....#.#..##.#######', '#.....#.##.###.###.#..#.....#', '#.###.#..###..#....##.#.###.#']
    const modules = encodeQRCode('https://eprel.ec.europa.eu/qr/2884739')

    expect(modules.slice(0, 3).map(row => row.map(dark => (dark ? '#' : '.')).join(''))).toEqual(official)
  })

  it.each([
    ...['1', '42', '2884739', '2737528', '12345678', '1234567890'].map(number => `https://eprel.ec.europa.eu/qr/${number}`),
    'https://eprel.ec.europa.eu/screen/product/smartphonestablets20231669',
    'https://eprel.ec.europa.eu/screen/product/refrigeratingappliances2019',
    'https://eprel.ec.europa.eu/qr/caf%C3%A9',
    'https://eprel.ec.europa.eu/qr/café-ñ-€'
  ])('should match ZXing for %s', content => {
    expect(encodeQRCode(content)).toEqual(zxingModules(content))
  })

  it('should match ZXing across all versions', () => {
    // Byte capacities of level L grow up to 2953 bytes in version 40.
    for (const length of [1, 17, 30, 60, 100, 150, 220, 300, 400, 500, 650, 800, 1000, 1300, 1700, 2100, 2500, 2900]) {
      const content = `https://${text(length - 8, length)}`
      expect(encodeQRCode(content), `${length} characters`).toEqual(zxingModules(content))
    }
  })
})
