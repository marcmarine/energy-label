import { describe, expect, it } from 'vitest'
import { eprelQRCode, eprelUrl, qrCodePath } from './eprel'
import { encodeQRCode } from './qrcode'

/** Rebuilds the module matrix from the `m`/`h` commands of a QR code path drawn with a 1-unit stroke. */
function modulesFromPath(d: string, size: number): boolean[][] {
  const modules = Array.from({ length: size }, () =>
    Array<boolean>(size).fill(false),
  )
  let x = 0
  let y = 0

  for (const [, command, args] of d.matchAll(/([mh])([^mh]*)/g)) {
    const [a = 0, b = 0] = (args?.match(/-?\d*\.?\d+/g) ?? []).map(Number)

    if (command === 'm') {
      x += a
      y += b
    } else {
      const row = modules[y - 0.5]
      for (let col = x; col < x + a; col++) if (row) row[col] = true
      x += a
    }
  }

  return modules
}

describe('qrCodePath', () => {
  it.each([
    'https://eprel.ec.europa.eu/qr/1234567',
    'https://eprel.ec.europa.eu/screen/product/refrigeratingappliances2019',
  ])('should draw exactly the dark modules of %s', (content) => {
    const expected = encodeQRCode(content)
    const size = expected.length

    const qr = qrCodePath(content)

    expect(qr.size).toBe(size)
    expect(modulesFromPath(qr.d, size)).toEqual(expected)
  })
})

describe('eprelUrl', () => {
  it('should link to the product page in EPREL', () => {
    expect(eprelUrl('smartphones', 'ABC123')).toBe(
      'https://eprel.ec.europa.eu/qr/ABC123',
    )
  })

  it.each([undefined, ''])(
    'should link to the product group when the registration number is %o',
    (registrationNumber) => {
      expect(eprelUrl('smartphones', registrationNumber)).toBe(
        'https://eprel.ec.europa.eu/screen/product/smartphonestablets20231669',
      )
    },
  )
})

describe('eprelQRCode', () => {
  it('should encode the EPREL link of the product', () => {
    expect(eprelQRCode('refrigerating-appliances', '1234567')).toEqual(
      qrCodePath('https://eprel.ec.europa.eu/qr/1234567'),
    )
  })
})
