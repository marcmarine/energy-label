import { describe, it, expect } from 'vitest'
import { SmartphonesTemplate } from './SmartphonesTemplate'

describe('Smartphones Template', () => {
  it('should generate a complete template with default settings', async () => {
    const template = new SmartphonesTemplate()
    const result = await template.generate({})

    expect(result).toMatchSnapshot()
  })
})
