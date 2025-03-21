import { describe, expect, it } from 'vitest'
import EnergyLabel, { EnergyLabelOptions } from './EnergyLabel'

describe('EnergyLabel', () => {
  const TEST_LABEL_DATA: EnergyLabelOptions = {
    supplierOrTrademark: 'Watermelon',
    modelIdentifier: '123A',
    efficiencyClass: 'A',
    consolidatedEnergyConsAnnual: 321,
    capBottles: 12,
    eprelRegistrationNumber: '1234567',
    noise: 12,
    noiseClass: 'A'
  }

  it('should to return a certain SVG string with default values', async () => {
    const label = new EnergyLabel('2019/2016/2023-09-30')
    const svgString = await label.generateSVGString()

    expect(svgString).toContain('Model Identifier')
    expect(svgString).toContain('2019/2016')
  })

  it('should to return the SVG string with correct data', async () => {
    const label = new EnergyLabel('2019/2016/2023-09-30', TEST_LABEL_DATA)
    const svgString = await label.generateSVGString()

    // EPREL Registration Number isn't displayed in the SVG.
    const { eprelRegistrationNumber, ...rest } = TEST_LABEL_DATA

    Object.values(rest).map((value: string | number) => {
      const regExp = new RegExp(String(value))
      expect(svgString).toMatch(regExp)
    })
  })
})
