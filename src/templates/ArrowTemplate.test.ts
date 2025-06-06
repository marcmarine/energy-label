import { describe, it, expect } from 'vitest'
import { ArrowTemplate } from './ArrowTemplate'

describe('Arrow Template', () => {
  it('should generate a complete template with default settings', async () => {
    const template = new ArrowTemplate()
    const result = await template.generate({})

    expect(result).toMatchSnapshot()
  })

  it('should generate a complete left-oriented template', async () => {
    const template = new ArrowTemplate()
    const result = await template.generate({ labelOrientation: 'RIGHT' })

    expect(result).toMatchSnapshot()
  })
})
