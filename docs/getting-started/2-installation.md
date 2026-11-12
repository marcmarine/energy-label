---

title: Installation
group: Getting Started
---

# Installation

This guide shows you how to install and set up the Energy Label in your project.

## Installation Methods

You can install the Energy Label in different ways. Choose the method that works best for your project:

### Method 1: Package Manager (Recommended)

Install using your preferred package manager:

```bash
npm install energy-label
```

> #### Requirements
>
> - Node.js version 18 or higher
> - Any modern package manager (npm, yarn, pnpm, or bun)

After installation, the `energy-label` package will be available in your `node_modules` folder.

### Method 2: CDN (Content Delivery Network)

For quick testing or projects without a build system, you can load the library directly from a CDN:

```html
<script type="module">
  import { createEnergyLabel } from 'https://esm.sh/energy-label'

  // Your code here
</script>
```

To load only what you use, list the exports in the URL:

```html
<script type="module">
  import { renderClassArrow } from 'https://esm.sh/energy-label?exports=renderClassArrow'
</script>
```

### Method 3: Build from Source

If you want to build the distribution files yourself:

1. Clone the repository:

```bash
git clone https://github.com/marcmarine/energy-label.git
cd energy-label
```

2. Install dependencies and build (the build uses [Bun](https://bun.sh)):

```bash
bun install
bun run build
```

3. Use the generated files from the `dist` folder:

```html
<script type="module" src="./dist/index.js"></script>
```

## TypeScript Support

The library includes TypeScript definitions. No extra packages needed.

```typescript
import { createEnergyLabel, type SmartphonesAndTabletsData } from 'energy-label'

// Missing fields are shown as placeholders, so the data can be partial.
const labelData: Partial<SmartphonesAndTabletsData> = {
  flagOrigin: 'EU',
  supplierOrTrademark: 'Sultana',
  modelIdentifier: '92COU8944VK',
  energyClass: 'B',
}

const label = createEnergyLabel('smartphones', labelData)
```

## Next Steps

Now you can create your first energy label! Check out these guides:

- [Quick Start](./3-quick-start.md) - Create your first label.
- [EPREL Guide](../guides/eprel.md) - Create labels from EPREL product data.
- [React and Preact Guide](../guides/react.md) - Integrate with React or Preact.
- [Bundle Size Guide](../guides/bundle-size.md) - Bundle only the labels you use.
