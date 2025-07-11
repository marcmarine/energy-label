import { describe, it, expect } from 'vitest'
import { createEnergyLabel } from './factories'
import EnergyLabel from './EnergyLabel'

describe('Factories', () => {
  describe('createEnergyLabel', () => {
    it('should return an instance of EnergyLabel', () => {
      const label = createEnergyLabel('arrow', { energyClass: 'A' })
      expect(label).toBeInstanceOf(EnergyLabel)
    })
  })
})
