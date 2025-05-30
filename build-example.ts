import EnergyLabel from './dist/index.js'
import fs from 'node:fs'

const label = new EnergyLabel('smartphones')

label.generateLabel().then(string => {
  fs.writeFileSync('example.svg', string)
})
