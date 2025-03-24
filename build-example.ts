import EnergyLabel from './dist/index.js'
import fs from 'node:fs'

const label = new EnergyLabel('2019/2016/2023-09-30')

label.generateSVGString().then(string => {
  fs.writeFileSync('example.svg', string)
})
