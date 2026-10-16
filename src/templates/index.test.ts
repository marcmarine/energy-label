import { describe, expect, it } from 'vitest'
import { templateFactory } from '.'
import type { TemplateName } from '../defintions'

describe('templateFactory', () => {
  it('should throw on an unknown template name', () => {
    expect(() => templateFactory('washing-machines' as TemplateName)).toThrow(/Unknown template "washing-machines"/)
  })

  it('should not resolve inherited object keys as templates', () => {
    expect(() => templateFactory('toString' as TemplateName)).toThrow(/Unknown template/)
  })
})
