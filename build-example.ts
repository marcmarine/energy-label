import fs from 'node:fs'
import { createClassArrow, EnergyLabel } from './dist/index.js'

const phoneLabel = new EnergyLabel('smartphones')
fs.writeFileSync('smartphone-label.svg', phoneLabel.toString())

const arrowLabel = createClassArrow('A', { labelOrientation: 'RIGHT' })
fs.writeFileSync('arrow-example.svg', arrowLabel.toString())
