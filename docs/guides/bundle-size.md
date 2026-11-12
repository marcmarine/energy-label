---

title: Bundle Size Guide
group: Guides
---

# Bundle Size Guide

`EnergyLabel`, `createEnergyLabel`, `createClassArrow` and `createEnergyLabelFromEprel` choose the label at runtime, so they bundle all of them. If you only use some labels, import their render functions instead. They return the SVG string and bundle only that label:

```js
import { renderClassArrow } from 'energy-label'

const svgString = renderClassArrow('A', { labelOrientation: 'RIGHT' })
```

| Import                               | Minified + gzipped |
| ------------------------------------ | ------------------ |
| `renderClassArrow`                   | 1 KB               |
| `renderRefrigeratingAppliancesLabel` | 7 KB               |
| `renderSmartphonesLabel`             | 8.3 KB             |
| `createEnergyLabel` (all labels)     | 10.2 KB            |

The class arrow is the lightest, as it has no header with the QR code.

## Without a bundler

[esm.sh](https://esm.sh) can do the same if you list the exports you use:

```js
import { renderClassArrow } from 'https://esm.sh/energy-label?exports=renderClassArrow'
```
