import { describe, it, expect } from 'vitest'
import { RefrigeratingAppliancesTemplate } from './RefrigeratingAppliancesTemplate'

describe('Regrigerating Appliances Template', () => {
  it('should generate complete arrow template', async () => {
    const template = new RefrigeratingAppliancesTemplate()
    const result = await template.generate({})

    expect(result).toMatchSnapshot()
  })
})
