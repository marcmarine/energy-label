import { describe, it, expect } from 'vitest'
import { ArrowTemplate } from './ArrowTemplate'

describe('Arrow Template', () => {
  it('should generate a complete template with default settings', () => {
    const template = new ArrowTemplate()
    const result = template.generate({})

    expect(result).toMatchSnapshot()
  })

  it('should generate a complete left-oriented template', () => {
    const template = new ArrowTemplate()
    const result = template.generate({ labelOrientation: 'RIGHT' })

    expect(result).toMatchSnapshot()
  })
})
