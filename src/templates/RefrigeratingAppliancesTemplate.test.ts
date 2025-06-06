import { describe, it, expect } from 'vitest'
import { RefrigeratingAppliancesTemplate } from './RefrigeratingAppliancesTemplate'

describe('Regrigerating Appliances Template', () => {
  it('should generate a complete template with default settings', async () => {
    const template = new RefrigeratingAppliancesTemplate()
    const result = await template.generate({})

    expect(result).toMatchSnapshot()
  })
})
