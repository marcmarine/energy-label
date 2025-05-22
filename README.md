# Energy Label ⚡ Generator

A JavaScript/TypeScript library for generating EU-compliant energy labels as SVG files in Node.js.

[![NPM Version (with dist tag)](https://img.shields.io/npm/v/energy-label/beta)](https://www.npmjs.com/package/energy-label/v/beta)
[![GitHub License](https://img.shields.io/github/license/marcmarine/energy-label)](LICENSE)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/energy-label/beta)

![Energy label example of wine refrigerator](https://raw.githubusercontent.com/marcmarine/energy-label/refs/heads/main/example.svg)

> [!IMPORTANT]
> This library is in the early stages of development, so breaking changes are possible.

## Features

- Generate SVG energy labels following EU regulations.
- Optimized for both Node.js and web browsers.
- Flags (🇪🇺/🇬🇧) can be selected for products sold in the European Union and Great Britain.

> [!NOTE]
> It is currently available for smartphones and tablets, refrigerators and arrow labels. More templates will be added gradually.

## Installation

```bash
npm install energy-label@beta
```

## Usage

### Node.js

```js
import EnergyLabel from 'energy-label'
import fs from 'node:fs'

const label = new EnergyLabel('smartphones')

label.generateSVGString().then(string => {
  fs.writeFileSync('example.svg', string)
})
```

## Design Resources

You can access the Figma design files here:

👉 [Figma Design Sources](https://www.figma.com/community/file/1487367561346990079)

## Feedback

Feel free to provide any comments. All kinds of contributions are welcome 🚀.

## License

MIT License © 2025 [Marc Mariné](https://github.com/marcmarine)
