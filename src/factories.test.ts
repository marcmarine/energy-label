import { describe, expect, it } from 'vitest'
import EnergyLabel from './EnergyLabel'
import { createClassArrow, createEnergyLabel } from './factories'

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
})
