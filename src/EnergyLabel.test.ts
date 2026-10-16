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

  it('should escape user-provided text', () => {
    const label = new EnergyLabel('smartphones', {
      supplierOrTrademark: 'Smith & Co',
      modelIdentifier: '<Acme>',
      ingressProtectionRating: '"IP68"'
    })
    const svg = label.toString()

    expect(svg).toContain('Smith &amp; Co')
    expect(svg).toContain('&lt;Acme&gt;')
    expect(svg).not.toContain('<Acme>')
  })

  it('should use unique ids across UK labels on the same page', () => {
    const svgs = [1, 2].map(() => new EnergyLabel('smartphones', { flagOrigin: 'UK' }).toString())
    const references = svgs.map(svg => [...svg.matchAll(/url\(#([^)]+)\)/g)].map(match => match[1]))

    svgs.forEach((svg, index) => {
      expect(references[index]!.length).toBeGreaterThan(0)
      references[index]!.forEach(reference => expect(svg).toContain(`id="${reference}"`))
    })

    const ids = svgs.flatMap(svg => [...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]))
    expect(new Set(ids).size).toBe(ids.length)
  })
})
