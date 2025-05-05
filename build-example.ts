import EnergyLabel from './dist/index.js'
import fs from 'node:fs'

const label = new EnergyLabel('refrigerating-appliances')

label.generateSVGString().then(string => {
  fs.writeFileSync('example.svg', string)
})
