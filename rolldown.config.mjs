import { defineConfig } from 'rolldown'

const external = ['lit-html', '@lit-labs/ssr', 'qrcode', 'react']

export default defineConfig([
  {
    input: 'src/index.ts',
    external,
    output: {
      dir: 'dist',
      format: 'module',
      exports: 'named'
    }
  },
  {
    input: 'src/index.ts',
    external,
    output: {
      format: 'commonjs',
      file: 'dist/index.cjs',
      exports: 'named'
    }
  }
])
