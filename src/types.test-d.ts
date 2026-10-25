import { describe, expectTypeOf, it } from 'vitest'
import type EnergyLabel from './EnergyLabel'
import { createEnergyLabel } from './factories'
import { templateFactory } from './templates'
import type { Template } from './templates/Template'
import type { ArrowData } from './templates/ArrowTemplate'
import type { HouseholdFridgesAndFreezersData, SmartphonesAndTabletsData, WineStorageAppliancesData } from './definitions'

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

  it('capacities accept null for compartments the appliance does not have, as EPREL returns', () => {
    createEnergyLabel('refrigerating-appliances', { capRefrNet: null, capFreezeNet: 191 })
    createEnergyLabel('refrigerating-appliances', { capRefrNet: 200, capFreezeNet: null })
  })

  it('label data does not accept a QR code, which is generated internally', () => {
    // @ts-expect-error qrCodeDataUrl is not label data
    createEnergyLabel('smartphones', { qrCodeDataUrl: 'data:image/gif;base64,' })
    // @ts-expect-error qrCodeDataUrl is not label data
    createEnergyLabel('refrigerating-appliances', { qrCodeDataUrl: 'data:image/gif;base64,' })
  })
})
