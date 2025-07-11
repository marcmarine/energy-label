import { describe, it, expect } from 'vitest'
import { createEnergyLabel, createClassArrow } from './factories'
import EnergyLabel from './EnergyLabel'

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
