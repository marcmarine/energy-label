import { describe, it, expect } from 'vitest'
import { SmartphonesTemplate } from './SmartphonesTemplate'

describe('Smartphones Template', () => {
  it('should generate a complete template with default settings', () => {
    const template = new SmartphonesTemplate()
    const result = template.generate({})

    expect(result).toMatchSnapshot()
  })

  it('should display the battery endurance as the total number of cycles', () => {
    const template = new SmartphonesTemplate()

    expect(template.generate({ batteryEnduranceInCycles: 1000 })).toContain('>1000</tspan><tspan font-size="10pt">x<')
    expect(template.generate({})).toContain('>XY00</tspan><tspan font-size="10pt">x<')
  })
})
