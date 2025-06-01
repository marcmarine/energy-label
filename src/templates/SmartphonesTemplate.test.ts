import { describe, it, expect } from 'vitest'
import { SmartphonesTemplate } from './SmartphonesTemplate'

describe('Smartphones Template', () => {
  it('should generate complete arrow template', async () => {
    const template = new SmartphonesTemplate()
    const result = await template.generate({})

    expect(result).toMatchSnapshot()
  })
})
