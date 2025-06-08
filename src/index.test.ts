import { describe, expect, it } from 'vitest'
import * as index from './index'

describe('Index', () => {
  it('should export certain submodules', () => {
    ;['default', 'createEnergyLabel', 'appendTo', 'download'].forEach(moduleName => {
      expect(Object.keys(index)).toContain(moduleName)
    })
  })
})
