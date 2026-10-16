import { optimize } from 'svgo'
import { describe, expect, it } from 'vitest'
import EnergyLabel from './EnergyLabel'
import type { WineStorageAppliancesData } from './definitions'

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

  it.each(['arrow', 'smartphones', 'refrigerating-appliances'] as const)('should generate well-formed SVG for %s', template => {
    const svg = new EnergyLabel(template).toString()

    expect(() => optimize(svg)).not.toThrow()
  })

  it('should escape user-provided text', () => {
    const label = new EnergyLabel('smartphones', {
      supplierOrTrademark: 'Smith & Co',
      modelIdentifier: '<Acme>',
      ingressProtectionRating: '"IP68"'
    })
    const svg = label.toString()

    expect(() => optimize(svg)).not.toThrow()
    expect(svg).toContain('Smith &amp; Co')
    expect(svg).toContain('&lt;Acme&gt;')
    expect(svg).not.toContain('<Acme>')
  })

  it('should keep the spacing of user-provided text', () => {
    const svg = new EnergyLabel('smartphones', { supplierOrTrademark: 'Smith  Co' }).toString()

    expect(svg).toContain('>Smith  Co<')
  })

  it('should use unique ids across UK labels on the same page', () => {
    const svgs = [1, 2].map(() => new EnergyLabel('smartphones', { flagOrigin: 'UK' }).toString())
    svgs.forEach(svg => {
      const references = [...svg.matchAll(/url\(#([^)]+)\)/g)].map(match => match[1])

      expect(references.length).toBeGreaterThan(0)
      references.forEach(reference => expect(svg).toContain(`id="${reference}"`))
    })

    const ids = svgs.flatMap(svg => [...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]))
    expect(new Set(ids).size).toBe(ids.length)
  })
})
