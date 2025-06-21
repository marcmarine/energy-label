import { EnergyLabelGenerator } from './dist/index.js'
import fs from 'node:fs'

const label = new EnergyLabelGenerator('smartphones')

const svgString = await label.generate()
fs.writeFileSync('smartphone-label.svg', svgString)
