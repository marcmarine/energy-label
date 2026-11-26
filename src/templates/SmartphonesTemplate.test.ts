import { describe, expect, it } from 'vitest'
import { smartphonesTemplate } from './SmartphonesTemplate'

describe('Smartphones Template', () => {
  it('should generate a complete template with default settings', () => {
    const result = smartphonesTemplate({})

    expect(result).toMatchSnapshot()
  })

  it('should display the battery endurance in cycles from the hundreds declared in EPREL', () => {
    // EPREL product 2884739 declares 10, and its official label shows 1000 cycles.
    expect(smartphonesTemplate({ batteryEnduranceInCycles: 10 })).toContain(
      '>1000</tspan><tspan font-size="10pt">x<',
    )
    expect(smartphonesTemplate({})).toContain(
      '>XY00</tspan><tspan font-size="10pt">x<',
    )
  })

  it('should be announced as an image with its energy class, supplier and model', () => {
    expect(
      smartphonesTemplate({
        energyClass: 'D',
        supplierOrTrademark: 'Sultana',
        modelIdentifier: '92COU8944VK',
      }),
    ).toContain(
      'role="img" aria-label="Energy label: class D, Sultana 92COU8944VK"><title>Energy label: class D, Sultana 92COU8944VK</title>',
    )
    expect(smartphonesTemplate({})).toContain(
      'aria-label="Energy label: class A"',
    )
  })
})
