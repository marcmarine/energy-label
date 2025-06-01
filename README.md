# Energy Label ⚡ Generator

A TypeScript library for generating EU-compliant energy labels as SVG files in Node.js.

[![NPM Version (with dist tag)](https://img.shields.io/npm/v/energy-label/beta)](https://www.npmjs.com/package/energy-label/v/beta)
[![GitHub License](https://img.shields.io/github/license/marcmarine/energy-label)](LICENSE)
[![View Changelog](https://img.shields.io/badge/view-CHANGELOG.md-white.svg)](https://github.com/marcmarine/energy-label/releases)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/energy-label/beta)

![Example of an energy label for smartphones](https://raw.githubusercontent.com/marcmarine/energy-label/refs/heads/main/example.svg)

> [!IMPORTANT]
> This library is in the early stages of development, so breaking changes are possible.

## Features

- Generate SVG energy labels following official **EU regulations**.
- Works in both **Node.js** and **modern browsers**.
- Supports flags for both **European Union** (🇪🇺) and **Great Britain** (🇬🇧) markets.
- Compatible with **any JavaScript framework**, including **React**, **Vue**, **Svelte**, **Angular**, and more.
- Easily embeddable in websites, SPAs, CMSs, or static pages.

> [!NOTE]
> It is currently available for smartphones and tablets, refrigerators and arrow labels. More templates will be added gradually.

## Installation

```bash
npm install energy-label@beta
```

## Usage

### Node.js

You can generate an energy label and save it as an SVG file using Node.js:

```js
import EnergyLabel from 'energy-label'
import fs from 'node:fs'

const label = new EnergyLabel('smartphones')

label.generateLabel().then(string => {
  fs.writeFileSync('example.svg', string)
})
```

### Browser

#### Create and Display an Energy Label

Import the library and create an energy label instance with your product data:

```js
import { createEnergyLabel, LabelDOMRenderer } from 'energy-label'

const label = createEnergyLabel('smartphones', {
  flagOrigin: 'EU',
  supplierName: 'Sultana',
  modelName: '92COU8944VK',
  eprelRegistrationNumber: '3712289',
  efficiencyRating: 'D',
  batteryEnduranceHours: 74,
  batteryEnduranceMinutes: 47,
  fallReliabilityClass: 'C',
  repairabilityClass: 'E',
  batteryEnduranceInCycles: '3900',
  ingressProtectionRating: 'IP14'
})
```

Render the label inside an HTML element:

```js
label.generateLabel().then(svgString => {
  LabelDOMRenderer.appendToElement(document.querySelector('#energy-label'), svgString)
})
```

Make sure the container element exists in your HTML:

```html
<div id="energy-label"></div>
```

#### Download the Label as an SVG File

You can also download the label directly as an SVG file:

```js
label.generateLabel().then(svgString => {
  LabelDOMRenderer.downloadFile(svgString)
})
```

### React

This example uses React with hooks to generate and render an energy label in the DOM.

```tsx
import { useEffect, useRef } from 'react'
import { createEnergyLabel, LabelDOMRenderer } from 'energy-label'

export function EnergyLabel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const label = createEnergyLabel('smartphones', {
      flagOrigin: 'EU',
      supplierName: 'Sultana',
      modelName: '92COU8944VK',
      eprelRegistrationNumber: '3712289',
      efficiencyRating: 'D',
      batteryEnduranceHours: 74,
      batteryEnduranceMinutes: 47,
      fallReliabilityClass: 'C',
      repairabilityClass: 'E',
      batteryEnduranceInCycles: '3900',
      ingressProtectionRating: 'IP14'
    })

    if (containerRef.current) {
      label.generateLabel().then(svg => {
        LabelDOMRenderer.appendToElement(containerRef.current!, svg)
      })
    }
  }, [])

  return (
    <div>
      <h2>Energy Label</h2>
      <div ref={containerRef} />
    </div>
  )
}
```

## Design Resources

You can access the Figma design files here:

👉 [Figma Design Sources](https://www.figma.com/community/file/1487367561346990079)

## Feedback

Feel free to provide any comments. All kinds of contributions are welcome 🚀.

## License

MIT License © 2025 [Marc Mariné](https://github.com/marcmarine)
