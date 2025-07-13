import { describe, expect, it } from 'vitest'
import EnergyLabel from './EnergyLabel'
import { WineStorageAppliancesData } from './defintions'

describe('EnergyLabel', () => {
  const TEST_LABEL_DATA: Partial<WineStorageAppliancesData> = {
    supplierOrTrademark: 'Watermelon',
    modelIdentifier: '123A',
    energyClass: 'A',
    consolidatedEnergyConsAnnual: 321,
    capBottles: 12,
    eprelRegistrationNumber: '1234567',
    noise: 12,
    noiseClass: 'A'
  }

  it('should to return a default label with default values', () => {
    const label = new EnergyLabel()
    const svg = label.toString()

    expect(svg).toEqual(expect.stringMatching(/>A</))
  })

  it('should to return the SVG string with correct data', () => {
    const label = new EnergyLabel('refrigerating-appliances', TEST_LABEL_DATA)
    const svg = label.toString()

    // EPREL Registration Number isn't displayed in the SVG.
    const { eprelRegistrationNumber, ...rest } = TEST_LABEL_DATA

    Object.values(rest).map(value => {
      const regExp = new RegExp(String(value))
      expect(svg).toMatch(regExp)
    })
  })
})
