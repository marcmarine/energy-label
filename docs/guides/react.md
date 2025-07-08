---
title: React Guide
group: Guides
---

# React Guide

Learn how to integrate the Energy Label into your React applications. This guide covers from basic usage to more advanced patterns with custom hooks.

## Usage in a React component

Create a simple React component that renders an energy label:

```tsx
import { useEffect, useRef } from 'react'
import { createEnergyLabel, appendTo } from 'energy-label'

export function EnergyLabel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      if (!containerRef.current) return

      const label = createEnergyLabel('smartphones', {
        flagOrigin: 'EU',
        supplierOrTrademark: 'Sultana',
        modelIdentifier: '92COU8944VK',
        eprelRegistrationNumber: '3712289',
        energyClass: 'D',
        batteryEndurancePerCycle: 4020,
        repeatedFreeFallReliabilityClass: 'C',
        repairabilityClass: 'E',
        batteryEnduranceInCycles: '3900',
        ingressProtectionRating: 'IP14'
      })

      const svgString = await label.toString()
      appendTo(containerRef.current, svgString)
    })()
  }, [])

  return (
    <div>
      <h2>Energy Label</h2>
      <div ref={containerRef} />
    </div>
  )
}
```

## Usage in a Custom Hook

For more complex applications, create a custom hook to manage energy labels:

```tsx
import { useCallback, useEffect, useState } from 'react'
import { createEnergyLabel, type TemplateName, type TemplatesData, appendTo, download } from 'energy-label'

export function useEnergyLabel<T extends TemplateName>(template: T, data: Partial<TemplatesData[T]>) {
  const [svg, setSvg] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    createEnergyLabel(template, data)
      .toString()
      .then(setSvg)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [template, data])

  const renderTo = useCallback(
    (element: HTMLElement) => {
      appendTo(element, svg)
    },
    [svg]
  )

  const handleDownload = useCallback(
    (filename: string) => {
      download(svg, filename)
    },
    [svg]
  )

  return { svg, loading, error, renderTo, download: handleDownload }
}
```

## Next Steps

For more information, see our API reference in this documentation.
