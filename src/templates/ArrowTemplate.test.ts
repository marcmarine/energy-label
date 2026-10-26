import { describe, expect, it } from 'vitest'
import { arrowTemplate } from './ArrowTemplate'

describe('Arrow Template', () => {
  it('should generate a complete template with default settings', () => {
    const result = arrowTemplate({})

    expect(result).toMatchSnapshot()
  })

  it('should generate a complete left-oriented template', () => {
    const result = arrowTemplate({ labelOrientation: 'RIGHT' })

    expect(result).toMatchSnapshot()
  })
})
