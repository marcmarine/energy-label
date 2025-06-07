import { describe, expect, it } from 'vitest'
import EnergyLabel from './EnergyLabel'
import { WineStorageAppliancesData } from './defintions'

describe('EnergyLabel', () => {
  const TEST_LABEL_DATA: Partial<WineStorageAppliancesData> = {
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
    const generator = new EnergyLabel()
    const label = await generator.generate()

    expect(label).toEqual(expect.stringMatching(/>A</))
  })

  it('should to return the SVG string with correct data', async () => {
    const generatror = new EnergyLabel('refrigerating-appliances', TEST_LABEL_DATA)
    const label = await generatror.generate()

    // EPREL Registration Number isn't displayed in the SVG.
    const { eprelRegistrationNumber, ...rest } = TEST_LABEL_DATA

    Object.values(rest).map(value => {
      const regExp = new RegExp(String(value))
      expect(label).toMatch(regExp)
    })
  })
})
