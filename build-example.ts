import { EnergyLabel } from './dist/index.js'
import fs from 'node:fs'

const label = new EnergyLabel('smartphones')

const svgString = label.toString()
fs.writeFileSync('smartphone-label.svg', svgString)
