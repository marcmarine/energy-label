# Energy Label Generator

A TypeScript library for generating EU-compliant energy labels as SVG files in Node.js.

> [!NOTE]
> Currently is only available for wine refrigerators.

## Installation

```bash
npm install energy-label
```

> [!IMPORTANT]
> This library is in the early stages of development, so breaking changes are possible.

## Usage

### Node.js

```js
import EnergyLabel from 'energy-label'

const label = new EnergyLabel('2019/2016/2023-09-30')

label.generateSVGString().then(string => {
  fs.writeFileSync('example.svg', string)
})
```

## Feedback

Feel free to provide any comments. All kinds of contributions are welcome.

## License

MIT License © 2025 [Marc Mariné](https://github.com/marcmarine)
