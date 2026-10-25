import { describe, expect, it } from 'vitest'
import { RefrigeratingAppliancesTemplate } from './RefrigeratingAppliancesTemplate'

describe('Regrigerating Appliances Template', () => {
  it('should generate a complete template with default settings', () => {
    const template = new RefrigeratingAppliancesTemplate()
    const result = template.generate({})

    expect(result).toMatchSnapshot()
  })

  describe('compartments', () => {
    const template = new RefrigeratingAppliancesTemplate()
    const capacities = (svg: string) =>
      [
        ...svg.matchAll(
          /<text x="([\d.]+)"[^>]*><tspan[^>]*>([^<]*)<\/tspan><tspan[^>]*> L<\/tspan>/g,
        ),
      ].map(([, x, value]) => ({ x, value }))

    it('should show both compartments side by side', () => {
      expect(
        capacities(template.generate({ capRefrNet: 200, capFreezeNet: 80 })),
      ).toEqual([
        { x: '96.38', value: '80' },
        { x: '266.46', value: '200' },
      ])
    })

    it.each([null, 0])(
      'should show only the centered freezer compartment when capRefrNet is %o',
      (capRefrNet) => {
        // EPREL product 1573269 is a freezer with capRefrNet: null and capFreezeNet: 191.
        expect(
          capacities(template.generate({ capRefrNet, capFreezeNet: 191 })),
        ).toEqual([{ x: '181.42', value: '191' }])
      },
    )

    it.each([null, 0])(
      'should show only the centered fridge compartment when capFreezeNet is %o',
      (capFreezeNet) => {
        expect(
          capacities(template.generate({ capRefrNet: 200, capFreezeNet })),
        ).toEqual([{ x: '181.42', value: '200' }])
      },
    )

    it('should show placeholders for both compartments when the capacities are missing', () => {
      expect(capacities(template.generate({}))).toEqual([
        { x: '96.38', value: 'XYZ' },
        { x: '266.46', value: 'XYZ' },
      ])
    })
  })
})
