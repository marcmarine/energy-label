import { describe, expect, it } from 'vitest'
import EnergyLabel from './EnergyLabel'
import {
  createClassArrow,
  createEnergyLabel,
  createEnergyLabelFromEprel,
} from './factories'

describe('Factories', () => {
  describe('createEnergyLabel', () => {
    it('should return an instance of EnergyLabel', () => {
      const label = createEnergyLabel('arrow', { energyClass: 'A' })
      expect(label).toBeInstanceOf(EnergyLabel)
    })
  })

  describe('createClassArrow', () => {
    it('should return an instance of EnergyLabel', () => {
      const label = createClassArrow('A')
      expect(label).toBeInstanceOf(EnergyLabel)
    })
  })

  describe('createEnergyLabelFromEprel', () => {
    it('should choose the label from the EPREL product group', () => {
      // Fields from EPREL product 1573269.
      const product = {
        productGroup: 'refrigeratingappliances2019',
        eprelRegistrationNumber: '1573269',
        energyClass: 'E',
        supplierOrTrademark: 'FRIDGEMASTER',
        modelIdentifier: 'MCF198E',
        capRefrNet: null,
        capFreezeNet: 191,
      } as const

      expect(createEnergyLabelFromEprel(product).toString()).toBe(
        createEnergyLabel('refrigerating-appliances', product).toString(),
      )
    })

    it('should throw for product groups without a label', () => {
      expect(() =>
        createEnergyLabelFromEprel({ productGroup: 'washingmachines2019' }),
      ).toThrow(/Unsupported EPREL product group "washingmachines2019"/)
    })
  })
})
