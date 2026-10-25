import { describe, expectTypeOf, it } from 'vitest'
import type {
  ArrowData,
  EnergyClass,
  FlagOriginData,
  HouseholdFridgesAndFreezersData,
  SmartphonesAndTabletsData,
  TemplateName,
  TemplatesData,
  WineStorageAppliancesData,
} from '.'

describe('Public types', () => {
  it('exports the types consumers need to describe label data', () => {
    expectTypeOf<TemplatesData['arrow']>().toEqualTypeOf<ArrowData>()
    expectTypeOf<
      TemplatesData['smartphones']
    >().toEqualTypeOf<SmartphonesAndTabletsData>()
    expectTypeOf<TemplatesData['refrigerating-appliances']>().toEqualTypeOf<
      WineStorageAppliancesData | HouseholdFridgesAndFreezersData
    >()
    expectTypeOf<TemplateName>().toEqualTypeOf<
      'arrow' | 'refrigerating-appliances' | 'smartphones'
    >()
    expectTypeOf<
      SmartphonesAndTabletsData['energyClass']
    >().toEqualTypeOf<EnergyClass>()
    expectTypeOf<
      SmartphonesAndTabletsData['flagOrigin']
    >().toEqualTypeOf<FlagOriginData>()
  })
})
