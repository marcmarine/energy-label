import { rolldown } from 'rolldown'
import { describe, expect, it } from 'vitest'
import type { TemplateName, TemplatesData } from './definitions'
import EnergyLabel from './EnergyLabel'

/**
 * Size budgets, in bytes, based on what the labels weighed when SVGO optimized them at runtime,
 * plus the fallback font stacks (`FONT_TEXT`, `FONT_CLASS`) and the vector QR code (~0.5 KB more than the former GIF).
 * If one fails, optimize the new or changed markup (e.g. `bunx svgo icon.svg -o -`) before raising the budget.
 */
const BASE = {
  flagOrigin: 'UK',
  supplierOrTrademark: 'Supplier',
  modelIdentifier: 'Model',
  eprelRegistrationNumber: '1234567',
  energyClass: 'A',
} as const

const BUDGETS: {
  name: string
  template: TemplateName
  data: Partial<TemplatesData[TemplateName]>
  maxBytes: number
}[] = [
  {
    name: 'arrow',
    template: 'arrow',
    data: { energyClass: 'A' },
    maxBytes: 950,
  },
  {
    name: 'smartphones',
    template: 'smartphones',
    data: { ...BASE, batteryEndurancePerCycle: 4020 },
    maxBytes: 15_600,
  },
  {
    name: 'wine storage',
    template: 'refrigerating-appliances',
    data: { ...BASE, capBottles: 12, noise: 30 },
    maxBytes: 10_350,
  },
  {
    name: 'fridges and freezers',
    template: 'refrigerating-appliances',
    data: { ...BASE, capRefrNet: 200, capFreezeNet: 80, noise: 30 },
    maxBytes: 9_450,
  },
]

describe('Output size', () => {
  it.each(BUDGETS)(
    '$name label should stay within $maxBytes bytes',
    ({ template, data, maxBytes }) => {
      const svg = new EnergyLabel(template, data).toString()

      expect(new TextEncoder().encode(svg).length).toBeLessThanOrEqual(maxBytes)
    },
  )
})

/**
 * Importing one template must only bundle that template and what it draws, so projects that use
 * a single label don't ship the others. `excludes` lists markers of code that must be left out:
 * the QR code encoder and EPREL links (header), `kWh` (refrigerating appliances), `IPXY` (smartphones).
 * Budgets are minified bytes, about 10% over the current size.
 */
const BUNDLES: {
  name: string
  module: string
  exportName: string
  excludes: string[]
  maxBytes: number
}[] = [
  {
    name: 'arrow',
    module: './templates/ArrowTemplate.ts',
    exportName: 'arrowTemplate',
    excludes: [
      'Content too long for a QR code',
      'eprel.ec.europa.eu',
      'kWh',
      'IPXY',
    ],
    maxBytes: 2_000,
  },
  {
    name: 'smartphones',
    module: './templates/SmartphonesTemplate.ts',
    exportName: 'smartphonesTemplate',
    excludes: ['kWh'],
    maxBytes: 23_000,
  },
  {
    name: 'refrigerating appliances',
    module: './templates/RefrigeratingAppliancesTemplate.ts',
    exportName: 'refrigeratingAppliancesTemplate',
    excludes: ['IPXY'],
    maxBytes: 19_000,
  },
]

/** Bundles and minifies an entry that only re-exports `exportName` from `module`. */
async function bundleExport(module: string, exportName: string) {
  const path = new URL(module, import.meta.url).pathname
  const build = await rolldown({
    input: 'entry',
    logLevel: 'silent',
    plugins: [
      {
        name: 'entry',
        resolveId: (id) => (id === 'entry' ? '\0entry' : null),
        load: (id) =>
          id === '\0entry'
            ? `export { ${exportName} } from ${JSON.stringify(path)}`
            : null,
      },
    ],
  })
  const { output } = await build.generate({ minify: true })
  await build.close()

  return output[0].code
}

describe('Bundle size', () => {
  it.each(BUNDLES)(
    '$name template should bundle on its own within $maxBytes bytes',
    async ({ module, exportName, excludes, maxBytes }) => {
      const code = await bundleExport(module, exportName)

      for (const marker of excludes) {
        expect(code).not.toContain(marker)
      }
      expect(new TextEncoder().encode(code).length).toBeLessThanOrEqual(
        maxBytes,
      )
    },
  )
})
