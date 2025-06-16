import { EnergyLabelGenerator } from './dist/index.js'
import fs from 'node:fs'

const label = new EnergyLabelGenerator('smartphones')

label.generate().then(string => {
  fs.writeFileSync('example.svg', string)
})
