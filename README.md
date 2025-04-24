# Energy Label ⚡ Generator

A TypeScript library for generating EU-compliant energy labels as SVG files in Node.js.

[![NPM Version (with dist tag)](https://img.shields.io/npm/v/energy-label/beta)](https://www.npmjs.com/package/energy-label/v/beta)
[![GitHub License](https://img.shields.io/github/license/marcmarine/energy-label)](LICENSE)

![Energy label example of household fridges and freezers](https://raw.githubusercontent.com/marcmarine/energy-label/refs/heads/main/example.svg)

> [!IMPORTANT]
> Currently, it is available only for household refrigerating appliances. [Regulation (EU) 2019/2016](https://eur-lex.europa.eu/eli/reg_del/2019/2016/2023-09-30)

## Features

- Generate SVG energy labels following EU regulations.
- Optimized for both Node.js and web browsers.
- Flags (🇪🇺/🇬🇧) can be selected for products sold in the European Union and Great Britain.

## Installation

```bash
npm install energy-label@beta
```

## Usage

### Node.js

```js
import EnergyLabel from 'energy-label'
import fs from 'node:fs'

const label = new EnergyLabel('2019/2016/2023-09-30')

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
