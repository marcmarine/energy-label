import { describe, expect, it } from 'vitest'
import { encodeQRCode } from './qrcode'
import { qrCodePath } from './utils'

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
