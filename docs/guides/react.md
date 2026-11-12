---

title: React and Preact Guide
group: Guides
---

# React and Preact Guide

Labels are generated synchronously and their markup is deterministic, so they can be rendered on the server and on the client alike, including React Server Components. No hooks or effects are needed.

## A label component

Use the render function of the label you need, so only that label is bundled:

```tsx
import {
  renderSmartphonesLabel,
  type SmartphonesAndTabletsData,
} from 'energy-label'

export function SmartphonesLabel(data: Partial<SmartphonesAndTabletsData>) {
  // User-provided text is escaped when the label is generated.
  return (
    <div dangerouslySetInnerHTML={{ __html: renderSmartphonesLabel(data) }} />
  )
}
```

```tsx
export function ProductPage() {
  return (
    <SmartphonesLabel
      flagOrigin="EU"
      supplierOrTrademark="Sultana"
      modelIdentifier="92COU8944VK"
      energyClass="D"
    />
  )
}
```

If the data can't be drawn on the label, such as an unknown energy class, the render function throws, and the nearest error boundary catches it.

## The class arrow

The class arrow is usually shown next to the price, so a `<span>` fits better:

```tsx
import { renderClassArrow, type EnergyClass } from 'energy-label'

export function ClassArrow({ energyClass }: { energyClass: EnergyClass }) {
  return (
    <span dangerouslySetInnerHTML={{ __html: renderClassArrow(energyClass) }} />
  )
}
```

## As an image

To use the label as an `<img>`, convert it with `toDataURL`:

```tsx
import { renderClassArrow, toDataURL, type EnergyClass } from 'energy-label'

export function ClassArrowImage({ energyClass }: { energyClass: EnergyClass }) {
  return (
    <img
      src={toDataURL(renderClassArrow(energyClass))}
      alt={`Energy class ${energyClass}`}
    />
  )
}
```

## Labels from EPREL

The EPREL API can't be called from browsers, so fetch the product on the server. In a React Server Component:

```tsx
import { createEnergyLabelFromEprel } from 'energy-label'

export async function EprelLabel({
  registrationNumber,
}: {
  registrationNumber: string
}) {
  const response = await fetch(
    `https://eprel.ec.europa.eu/api/product/${registrationNumber}`,
  )
  const product = await response.json()

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: createEnergyLabelFromEprel(product).toString(),
      }}
    />
  )
}
```

See the [EPREL Guide](./eprel.md) for more.

## Preact

The same components work in Preact, as `dangerouslySetInnerHTML` has the same API.
