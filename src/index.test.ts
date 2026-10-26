import { describe, expect, it } from 'vitest'
import * as index from './index'

describe('Index', () => {
  it('should export certain submodules', () => {
    ;[
      'appendTo',
      'createClassArrow',
      'createEnergyLabel',
      'download',
      'EnergyLabel',
      'PRODUCT_GROUPS',
      'renderClassArrow',
      'renderRefrigeratingAppliancesLabel',
      'renderSmartphonesLabel',
    ].forEach((moduleName) => {
      expect(Object.keys(index)).toContain(moduleName)
    })
  })
})
