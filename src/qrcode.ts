/**
 * Minimal QR code encoder that reproduces the QR codes on official EPREL labels.
 *
 * EPREL generates them with ZXing, using UTF-8 and error correction level L. ZXing encodes text that
 * contains characters outside the alphanumeric set (such as any URL) in byte mode, preceded by an ECI
 * segment that declares UTF-8, and chooses the mask with its own penalty rules. This encoder follows
 * the same steps, so the resulting modules are identical. Only byte mode is implemented, which is what
 * ZXing uses for the lowercase EPREL URLs.
 */

/** Level L error correction blocks per version: EC codewords per block, then pairs of block count and data codewords. */
const EC_BLOCKS_L = [
  [7, 1, 19],
  [10, 1, 34],
  [15, 1, 55],
  [20, 1, 80],
  [26, 1, 108],
  [18, 2, 68],
  [20, 2, 78],
  [24, 2, 97],
  [30, 2, 116],
  [18, 2, 68, 2, 69],
  [20, 4, 81],
  [24, 2, 92, 2, 93],
  [26, 4, 107],
  [30, 3, 115, 1, 116],
  [22, 5, 87, 1, 88],
  [24, 5, 98, 1, 99],
  [28, 1, 107, 5, 108],
  [30, 5, 120, 1, 121],
  [28, 3, 113, 4, 114],
  [28, 3, 107, 5, 108],
  [28, 4, 116, 4, 117],
  [28, 2, 111, 7, 112],
  [30, 4, 121, 5, 122],
  [30, 6, 117, 4, 118],
  [26, 8, 106, 4, 107],
  [28, 10, 114, 2, 115],
  [30, 8, 122, 4, 123],
  [30, 3, 117, 10, 118],
  [30, 7, 116, 7, 117],
  [30, 5, 115, 10, 116],
  [30, 13, 115, 3, 116],
  [30, 17, 115],
  [30, 17, 115, 1, 116],
  [30, 13, 115, 6, 116],
  [30, 12, 121, 7, 122],
  [30, 6, 121, 14, 122],
  [30, 17, 122, 4, 123],
  [30, 4, 122, 18, 123],
  [30, 20, 117, 4, 118],
  [30, 19, 118, 6, 119],
] as const

const MODE_ECI = 0b0111
const MODE_BYTE = 0b0100
const ECI_UTF8 = 26
const EC_LEVEL_L = 0b01

/** Empty cell while the matrix is being built. */
const EMPTY = -1

type Matrix = number[][]

interface Block {
  data: number[]
  ec: number[]
}

/** Encodes `content` and returns its modules by row, `true` for dark. */
export function encodeQRCode(content: string): boolean[][] {
  const bytes = new TextEncoder().encode(content)
  const header = [
    ...toBits(MODE_ECI, 4),
    ...toBits(ECI_UTF8, 8),
    ...toBits(MODE_BYTE, 4),
  ]
  const version = chooseVersion(header.length, bytes.length)
  const bits = [...header, ...toBits(bytes.length, version <= 9 ? 8 : 16)]
  for (const byte of bytes) bits.push(...toBits(byte, 8))

  const codewords = interleave(terminate(bits, dataCapacity(version)), version)

  let best: Matrix = []
  let minPenalty = Number.MAX_SAFE_INTEGER
  for (let mask = 0; mask < 8; mask++) {
    const matrix = buildMatrix(codewords, version, mask)
    const penalty = maskPenalty(matrix)
    if (penalty < minPenalty) {
      minPenalty = penalty
      best = matrix
    }
  }

  return best.map((row) => row.map((cell) => cell === 1))
}

function toBits(value: number, length: number): number[] {
  return Array.from({ length }, (_, i) => (value >> (length - 1 - i)) & 1)
}

function blocksOf(version: number): {
  ecPerBlock: number
  dataLengths: number[]
} {
  const [ecPerBlock, ...groups] = EC_BLOCKS_L[version - 1] as readonly number[]
  const dataLengths: number[] = []
  for (let i = 0; i < groups.length; i += 2) {
    for (let n = 0; n < groups[i]; n++) dataLengths.push(groups[i + 1])
  }
  return { ecPerBlock: ecPerBlock, dataLengths }
}

function dataCapacity(version: number): number {
  return blocksOf(version).dataLengths.reduce((sum, length) => sum + length, 0)
}

/** Smallest version that fits the data, chosen in two passes like ZXing because the length field grows with the version. */
function chooseVersion(headerBits: number, numBytes: number): number {
  const fits = (bits: number) => {
    for (let version = 1; version <= 40; version++) {
      if (dataCapacity(version) >= Math.ceil(bits / 8)) return version
    }
    throw new Error('Content too long for a QR code')
  }
  const provisional = fits(headerBits + 8 + numBytes * 8)

  return fits(headerBits + (provisional <= 9 ? 8 : 16) + numBytes * 8)
}

/** Adds the terminator, pads to a byte boundary and fills the remaining capacity with 0xEC and 0x11. */
function terminate(bits: number[], capacityBytes: number): number[] {
  const capacity = capacityBytes * 8
  for (let i = 0; i < 4 && bits.length < capacity; i++) bits.push(0)
  while (bits.length % 8 !== 0) bits.push(0)

  const bytes: number[] = []
  for (let i = 0; i < bits.length; i += 8)
    bytes.push(parseInt(bits.slice(i, i + 8).join(''), 2))
  for (let i = 0; bytes.length < capacityBytes; i++)
    bytes.push(i % 2 === 0 ? 0xec : 0x11)

  return bytes
}

function interleave(data: number[], version: number): number[] {
  const { ecPerBlock, dataLengths } = blocksOf(version)
  const generator = generatorPolynomial(ecPerBlock)
  const blocks: Block[] = []
  let offset = 0
  for (const length of dataLengths) {
    const blockData = data.slice(offset, offset + length)
    blocks.push({ data: blockData, ec: reedSolomon(blockData, generator) })
    offset += length
  }

  const result: number[] = []
  const maxData = Math.max(...dataLengths)
  for (let i = 0; i < maxData; i++) {
    for (const block of blocks)
      if (i < block.data.length) result.push(block.data[i])
  }
  for (let i = 0; i < ecPerBlock; i++) {
    for (const block of blocks) result.push(block.ec[i])
  }

  return result
}

// Galois field GF(256) with the QR code primitive polynomial x^8 + x^4 + x^3 + x^2 + 1.
const EXP = new Array<number>(512)
const LOG = new Array<number>(256)
for (let i = 0, x = 1; i < 255; i++) {
  EXP[i] = x
  LOG[x] = i
  x <<= 1
  if (x & 0x100) x ^= 0x11d
}
for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]

function multiply(a: number, b: number): number {
  return a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]
}

/** Coefficients, highest degree first, of the product of (x + α^i) for i from 0 to degree - 1. */
function generatorPolynomial(degree: number): number[] {
  let poly = [1]
  for (let i = 0; i < degree; i++) {
    poly = Array.from(
      { length: poly.length + 1 },
      (_, j) => (poly[j] ?? 0) ^ (j > 0 ? multiply(poly[j - 1], EXP[i]) : 0),
    )
  }
  return poly
}

function reedSolomon(data: number[], generator: number[]): number[] {
  const degree = generator.length - 1
  const remainder = new Array<number>(degree).fill(0)
  for (const byte of data) {
    const factor = byte ^ (remainder.shift() ?? 0)
    remainder.push(0)
    for (let i = 0; i < degree; i++)
      remainder[i] ^= multiply(generator[i + 1], factor)
  }
  return remainder
}

function alignmentCenters(version: number): number[] {
  if (version === 1) return []
  const size = version * 4 + 17
  const count = Math.floor(version / 7) + 2
  const step =
    version === 32 ? 26 : Math.ceil((version * 4 + 4) / (count * 2 - 2)) * 2
  const centers = [6]
  for (let position = size - 7; centers.length < count; position -= step)
    centers.splice(1, 0, position)
  return centers
}

/** Remainder of the BCH code used by the format and version information. */
function bch(value: number, poly: number): number {
  const msb = (n: number) => 32 - Math.clz32(n)
  let result = value << (msb(poly) - 1)
  while (msb(result) >= msb(poly)) result ^= poly << (msb(result) - msb(poly))
  return result
}

function maskBit(mask: number, row: number, col: number): boolean {
  const product = row * col
  switch (mask) {
    case 0:
      return ((row + col) & 1) === 0
    case 1:
      return (row & 1) === 0
    case 2:
      return col % 3 === 0
    case 3:
      return (row + col) % 3 === 0
    case 4:
      return ((Math.floor(row / 2) + Math.floor(col / 3)) & 1) === 0
    case 5:
      return (product & 1) + (product % 3) === 0
    case 6:
      return (((product & 1) + (product % 3)) & 1) === 0
    default:
      return (((product % 3) + ((row + col) & 1)) & 1) === 0
  }
}

function buildMatrix(
  codewords: number[],
  version: number,
  mask: number,
): Matrix {
  const size = version * 4 + 17
  const m: Matrix = Array.from({ length: size }, () =>
    new Array<number>(size).fill(EMPTY),
  )
  const set = (row: number, col: number, dark: boolean | number) => {
    m[row][col] = dark ? 1 : 0
  }

  // Finder patterns with their separators.
  for (const [top, left] of [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ] as const) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const row = top + r
        const col = left + c
        if (row < 0 || row >= size || col < 0 || col >= size) continue
        const ring = Math.max(Math.abs(r - 3), Math.abs(c - 3))
        set(row, col, ring !== 2 && ring !== 4)
      }
    }
  }
  set(size - 8, 8, true)

  // Alignment patterns, skipping the ones that would overlap a finder pattern.
  const centers = alignmentCenters(version)
  for (const row of centers) {
    for (const col of centers) {
      if (m[row][col] !== EMPTY) continue
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++)
          set(row + r, col + c, Math.max(Math.abs(r), Math.abs(c)) !== 1)
      }
    }
  }

  // Timing patterns.
  for (let i = 8; i < size - 8; i++) {
    if (m[6][i] === EMPTY) set(6, i, i % 2 === 0)
    if (m[i][6] === EMPTY) set(i, 6, i % 2 === 0)
  }

  // Format information: error correction level and mask, both copies.
  const typeInfo = (EC_LEVEL_L << 3) | mask
  const format = ((typeInfo << 10) | bch(typeInfo, 0x537)) ^ 0x5412
  const formatCoordinates = [
    [0, 8],
    [1, 8],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 8],
    [7, 8],
    [8, 8],
    [8, 7],
    [8, 5],
    [8, 4],
    [8, 3],
    [8, 2],
    [8, 1],
    [8, 0],
  ] as const
  formatCoordinates.forEach(([row, col], i) => {
    const bit = (format >> i) & 1
    set(row, col, bit)
    if (i < 8) set(8, size - 1 - i, bit)
    else set(size - 7 + (i - 8), 8, bit)
  })

  // Version information, from version 7 on.
  if (version >= 7) {
    const info = (version << 12) | bch(version, 0x1f25)
    let k = 0
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        const bit = (info >> k++) & 1
        set(size - 11 + j, i, bit)
        set(i, size - 11 + j, bit)
      }
    }
  }

  // Data, in two-column zigzag from the bottom right corner, with the mask applied.
  let bitIndex = 0
  let upward = true
  for (let right = size - 1; right > 0; right -= 2) {
    if (right === 6) right = 5
    for (let i = 0; i < size; i++) {
      const row = upward ? size - 1 - i : i
      for (const col of [right, right - 1]) {
        if (m[row][col] !== EMPTY) continue
        const byte = codewords[bitIndex >> 3]
        let dark =
          byte !== undefined && ((byte >> (7 - (bitIndex & 7))) & 1) === 1
        bitIndex++
        if (maskBit(mask, row, col)) dark = !dark
        set(row, col, dark)
      }
    }
    upward = !upward
  }

  return m
}

function maskPenalty(m: Matrix): number {
  const size = m.length
  const at = (row: number, col: number) => m[row][col]
  let penalty = 0

  // Rule 1: runs of five or more modules of the same color, in rows and columns.
  for (const horizontal of [true, false]) {
    for (let i = 0; i < size; i++) {
      let run = 0
      let previous = -1
      for (let j = 0; j < size; j++) {
        const bit = horizontal ? at(i, j) : at(j, i)
        if (bit === previous) {
          run++
        } else {
          if (run >= 5) penalty += 3 + (run - 5)
          run = 1
          previous = bit
        }
      }
      if (run >= 5) penalty += 3 + (run - 5)
    }
  }

  // Rule 2: 2x2 blocks of the same color.
  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const value = at(row, col)
      if (
        value === at(row, col + 1) &&
        value === at(row + 1, col) &&
        value === at(row + 1, col + 1)
      )
        penalty += 3
    }
  }

  // Rule 3: finder-like 1:1:3:1:1 patterns with four light modules on either side.
  const pattern = [1, 0, 1, 1, 1, 0, 1]
  const lightRow = (row: number, from: number, to: number) => {
    for (let col = Math.max(from, 0); col < Math.min(to, size); col++)
      if (at(row, col) === 1) return false
    return true
  }
  const lightColumn = (col: number, from: number, to: number) => {
    for (let row = Math.max(from, 0); row < Math.min(to, size); row++)
      if (at(row, col) === 1) return false
    return true
  }
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (
        col + 6 < size &&
        pattern.every((bit, k) => at(row, col + k) === bit) &&
        (lightRow(row, col - 4, col) || lightRow(row, col + 7, col + 11))
      ) {
        penalty += 40
      }
      if (
        row + 6 < size &&
        pattern.every((bit, k) => at(row + k, col) === bit) &&
        (lightColumn(col, row - 4, row) || lightColumn(col, row + 7, row + 11))
      ) {
        penalty += 40
      }
    }
  }

  // Rule 4: deviation of the proportion of dark modules from 50%, in steps of 5%.
  const dark = m.reduce(
    (sum, row) => sum + row.filter((cell) => cell === 1).length,
    0,
  )
  const total = size * size
  penalty += Math.floor((Math.abs(dark * 2 - total) * 10) / total) * 10

  return penalty
}
