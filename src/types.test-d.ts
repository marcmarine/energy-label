import { describe, expectTypeOf, it } from 'vitest'
import type EnergyLabel from './EnergyLabel'
import { createEnergyLabel } from './factories'
import { templateFactory } from './templates'
import type { Template } from './templates/Template'
import type { ArrowData } from './templates/ArrowTemplate'
import type { HouseholdFridgesAndFreezersData, SmartphonesAndTabletsData, WineStorageAppliancesData } from './defintions'

describe('Types', () => {
  it('createEnergyLabel keeps the template name', () => {
    expectTypeOf(createEnergyLabel()).toEqualTypeOf<EnergyLabel<'arrow'>>()
    expectTypeOf(createEnergyLabel('smartphones')).toEqualTypeOf<EnergyLabel<'smartphones'>>()
  })

  it('templateFactory returns a template typed with its data', () => {
    expectTypeOf(templateFactory('arrow')).toEqualTypeOf<Template<ArrowData>>()
    expectTypeOf(templateFactory('smartphones')).toEqualTypeOf<Template<SmartphonesAndTabletsData>>()
    expectTypeOf(templateFactory('refrigerating-appliances')).toEqualTypeOf<Template<WineStorageAppliancesData | HouseholdFridgesAndFreezersData>>()
  })
})
