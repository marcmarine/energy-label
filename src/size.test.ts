import { describe, expect, it } from 'vitest'
import EnergyLabel from './EnergyLabel'
import type { TemplateName, TemplatesData } from './definitions'

/**
 * Size budgets, in bytes, based on what the labels weighed when SVGO optimized them at runtime,
 * plus the fallback font stacks (`FONT_TEXT`, `FONT_CLASS`) and the vector QR code (~0.5 KB more than the former GIF).
 * If one fails, optimize the new or changed markup (e.g. `bunx svgo icon.svg -o -`) before raising the budget.
 */
const BASE = { flagOrigin: 'UK', supplierOrTrademark: 'Supplier', modelIdentifier: 'Model', eprelRegistrationNumber: '1234567', energyClass: 'A' } as const

const BUDGETS: { name: string; template: TemplateName; data: Partial<TemplatesData[TemplateName]>; maxBytes: number }[] = [
  { name: 'arrow', template: 'arrow', data: { energyClass: 'A' }, maxBytes: 950 },
  { name: 'smartphones', template: 'smartphones', data: { ...BASE, batteryEndurancePerCycle: 4020 }, maxBytes: 15_600 },
  { name: 'wine storage', template: 'refrigerating-appliances', data: { ...BASE, capBottles: 12, noise: 30 }, maxBytes: 10_350 },
  { name: 'fridges and freezers', template: 'refrigerating-appliances', data: { ...BASE, capRefrNet: 200, capFreezeNet: 80, noise: 30 }, maxBytes: 9_450 }
]

describe('Output size', () => {
  it.each(BUDGETS)('$name label should stay within $maxBytes bytes', ({ template, data, maxBytes }) => {
    const svg = new EnergyLabel(template, data).toString()

    expect(new TextEncoder().encode(svg).length).toBeLessThanOrEqual(maxBytes)
  })
})
