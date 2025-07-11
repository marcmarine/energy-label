import { describe, it, expect } from 'vitest'
import { RefrigeratingAppliancesTemplate } from './RefrigeratingAppliancesTemplate'

describe('Regrigerating Appliances Template', () => {
  it('should generate a complete template with default settings', () => {
    const template = new RefrigeratingAppliancesTemplate()
    const result = template.generate({})

    expect(result).toMatchSnapshot()
  })
})
