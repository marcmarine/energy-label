/** Generates the example labels shown in the README, with the same calls as its code samples. */
import fs from 'node:fs'
import { renderClassArrow, renderSmartphonesLabel } from '../src/index.ts'

const assets = new URL('../.github/assets/', import.meta.url)

fs.writeFileSync(
  new URL('arrow-example.svg', assets),
  renderClassArrow('A', { labelOrientation: 'LEFT' }),
)
fs.writeFileSync(
  new URL('smartphone-label.svg', assets),
  renderSmartphonesLabel(),
)
