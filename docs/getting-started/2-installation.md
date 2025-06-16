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
npm install energy-label@beta
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
  import EnergyLabel from 'https://esm.sh/energy-label@beta'

  // Your code here
</script>
```

### Method 3: Build from Source

If you want to build the distribution files yourself:

1. Clone the repository:

```bash
git clone https://github.com/marcmarine/energy-label.git
cd energy-label
```

2. Install dependencies and build:

```bash
npm install
npm run build
```

3. Use the generated files from the `dist` folder:

```html
<script type="module" src="./dist/index.js"></script>
```

## TypeScript Support

The library includes TypeScript definitions. No extra packages needed.

```typescript
import { EnergyLabel, type SmartphonesAndTabletsData } from 'energy-label'

const labelData: SmartphonesAndTabletsData = {
  flagOrigin: 'EU',
  supplierName: 'Sultana',
  modelName: '92COU8944VK',
  efficiencyRating: 'B'
}

const label = EnergyLabel('smartphones', labelData)
```

## Next Steps

Now you can create your first energy label! Check out these guides:

- [Quick Start](./3-quick-start.md) - Create your first label.
- [React Guide](../guides/react.md) - Integrate with React.
