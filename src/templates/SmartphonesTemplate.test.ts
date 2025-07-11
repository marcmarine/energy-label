import { describe, it, expect } from 'vitest'
import { SmartphonesTemplate } from './SmartphonesTemplate'

describe('Smartphones Template', () => {
  it('should generate a complete template with default settings', () => {
    const template = new SmartphonesTemplate()
    const result = template.generate({})

    expect(result).toMatchSnapshot()
  })
})
