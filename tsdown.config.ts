import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  dts: true,
  // Keep `index.js` and `index.d.ts`, the paths in package.json.
  fixedExtension: false,
})
