import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Template } from './Template'
import { ArrowTemplate } from './ArrowTemplate'

describe('Arrow Template', () => {
  it('should generate complete arrow template', async () => {
    const template = new ArrowTemplate()
    const result = await template.generate({})

    expect(result).toMatchSnapshot()
  })
})
