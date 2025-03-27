import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'rolldown'

const projectRoot = dirname(fileURLToPath(import.meta.url))
const pkgPath = join(projectRoot, 'package.json')
const packageJson = JSON.parse(readFileSync(pkgPath, 'utf-8'))

const external = ['svgo/browser', ...Object.keys(packageJson.dependencies)]

export default defineConfig([
  {
    input: 'src/index.ts',
    external,
    output: {
      dir: 'dist',
      format: 'module',
      exports: 'named'
    }
  }
])
