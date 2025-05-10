import EnergyLabel from './dist/index.js'
import fs from 'node:fs'

const label = new EnergyLabel('smartphones')

label.generateSVGString().then(string => {
  fs.writeFileSync('example.svg', string)
})
