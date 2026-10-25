import { describe, expect, it } from 'vitest'
import { SmartphonesTemplate } from './SmartphonesTemplate'

describe('Smartphones Template', () => {
  it('should generate a complete template with default settings', () => {
    const template = new SmartphonesTemplate()
    const result = template.generate({})

    expect(result).toMatchSnapshot()
  })

  it('should display the battery endurance in cycles from the hundreds declared in EPREL', () => {
    const template = new SmartphonesTemplate()

    // EPREL product 2884739 declares 10, and its official label shows 1000 cycles.
    expect(template.generate({ batteryEnduranceInCycles: 10 })).toContain(
      '>1000</tspan><tspan font-size="10pt">x<',
    )
    expect(template.generate({})).toContain(
      '>XY00</tspan><tspan font-size="10pt">x<',
    )
  })
})
