import { describe, expect, it } from 'vitest'
import EnergyLabel from './EnergyLabel'
import type { WineStorageAppliancesOptions } from './definitions'

describe('EnergyLabel', () => {
  const TEST_LABEL_DATA: Partial<WineStorageAppliancesOptions> = {
    supplierName: 'Watermelon',
    modelName: '123A',
    efficiencyRating: 'A',
    annualEnergyConsumption: 321,
    bottleCapacity: 12,
    eprelRegistrationNumber: '1234567',
    noiseEmissions: 12,
    noiseEmissionsClass: 'A'
  }

  it('should to return a default label with default values', async () => {
    const label = new EnergyLabel()
    const svgString = await label.generateSVGString()

    expect(svgString).toEqual(expect.stringMatching(/>A</))
  })

  it('should to return the SVG string with correct data', async () => {
    const label = new EnergyLabel('refrigerating-appliances', TEST_LABEL_DATA)
    const svgString = await label.generateSVGString()

    // EPREL Registration Number isn't displayed in the SVG.
    const { eprelRegistrationNumber, ...rest } = TEST_LABEL_DATA

    Object.values(rest).map((value: string | number) => {
      const regExp = new RegExp(String(value))
      expect(svgString).toMatch(regExp)
    })
  })
})
