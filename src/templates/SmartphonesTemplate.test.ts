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
})
