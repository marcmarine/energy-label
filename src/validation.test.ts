import { describe, expect, it } from 'vitest'
import type { EnergyClass, TemplateName, TemplatesData } from './definitions'
import EnergyLabel from './EnergyLabel'
import { createClassArrow } from './factories'

// Plain JavaScript callers or data from an API can bypass the types.
const invalid = <T>(value: string) => value as unknown as T

describe('Data validation', () => {
  it('should throw on an invalid class arrow instead of drawing fill="undefined"', () => {
    expect(() => createClassArrow(invalid<EnergyClass>('a')).toString()).toThrow(new RangeError('Invalid energyClass "a". Expected one of: A, B, C, D, E, F, G'))
  })

  it.each<[TemplateName, string, string, string]>([
    ['arrow', 'energyClass', 'H', 'A, B, C, D, E, F, G'],
    ['smartphones', 'energyClass', 'H', 'A, B, C, D, E, F, G'],
    ['smartphones', 'repairabilityClass', 'F', 'A, B, C, D, E'],
    ['smartphones', 'repeatedFreeFallReliabilityClass', 'F', 'A, B, C, D, E'],
    ['refrigerating-appliances', 'energyClass', 'H', 'A, B, C, D, E, F, G'],
    ['refrigerating-appliances', 'noiseClass', 'E', 'A, B, C, D'],
    ['smartphones', 'flagOrigin', 'eu', 'EU, UK'],
    ['refrigerating-appliances', 'flagOrigin', 'GB', 'EU, UK']
  ])('should throw on an invalid %s %s', (template, field, value, expected) => {
    const label = new EnergyLabel(template, { [field]: value } as Partial<TemplatesData[TemplateName]>)

    expect(() => label.toString()).toThrow(new RangeError(`Invalid ${field} "${value}". Expected one of: ${expected}`))
  })

  it('should accept valid and missing values', () => {
    expect(() => createClassArrow('G').toString()).not.toThrow()
    expect(() => new EnergyLabel('smartphones', { energyClass: 'D', repairabilityClass: 'E', repeatedFreeFallReliabilityClass: 'A' }).toString()).not.toThrow()
    expect(() => new EnergyLabel('refrigerating-appliances', { energyClass: 'E', noiseClass: 'C', flagOrigin: 'UK' }).toString()).not.toThrow()
    expect(() => new EnergyLabel('smartphones').toString()).not.toThrow()
    // EPREL returns null for missing values.
    expect(() => new EnergyLabel('refrigerating-appliances', { noiseClass: null as unknown as undefined }).toString()).not.toThrow()
  })
})
