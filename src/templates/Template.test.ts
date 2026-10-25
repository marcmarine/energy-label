import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Template } from './Template'

vi.mock('../utils', () => ({
  qrCodePath: vi.fn()
}))

vi.mock('./common', () => ({
  EPREL_BASE_URL: 'test-url'
}))

class TestTemplate extends Template<{ name: string; model: string }> {
  createEfficiencyScale(): string {
    return '<g id="efficiency-scale"></g>'
  }

  getWidth(): number {
    return 800
  }

  getHeight(): number {
    return 600
  }

  protected createBackground(): string {
    return '<g id="background"></g>'
  }

  protected createHeader(data: Partial<{ name: string; model: string }>): string {
    return `<g id="header">${data.name || 'Default'}</g>`
  }

  protected createConsumption(): string {
    return '<g id="consumption">Consumption data</g>'
  }

  protected createFeatures(): string {
    return '<g id="features">Features</g>'
  }
}

describe('Template', () => {
  let template: TestTemplate

  beforeEach(() => {
    template = new TestTemplate()
    vi.clearAllMocks()
  })

  describe('generate', () => {
    it('should include all template sections', () => {
      const testData = { name: 'Test Product', model: 'Test Model' }

      const result = template.generate(testData)

      expect(result).toContain('id="background"')
      expect(result).toContain('id="header"')
      expect(result).toContain('id="efficiency-scale"')
      expect(result).toContain('id="consumption"')
      expect(result).toContain('id="features"')
      expect(result).toContain('Test Product')
    })

    it('should handle empty data correctly', () => {
      const result = template.generate({})

      expect(result).toContain('Default')
      expect(result).toMatch(/<svg[^>]*>.*<\/svg>/s)
    })
  })

  describe('generateQRCode', () => {
    it('should generate the QR code for the product page in EPREL', async () => {
      const mockQRCode = { size: 21, d: 'm0 .5h7' }
      const { qrCodePath } = await import('../utils')
      const mockGenerate = vi.mocked(qrCodePath)
      mockGenerate.mockReturnValue(mockQRCode)

      const result = template['generateQRCode']('smartphones', 'ABC123')

      expect(mockGenerate).toHaveBeenCalledWith('test-url/qr/ABC123')
      expect(result).toBe(mockQRCode)
    })

    it.each([undefined, ''])('should link to the product group when the registration number is %o', async registrationNumber => {
      const { qrCodePath } = await import('../utils')
      const mockGenerate = vi.mocked(qrCodePath)

      template['generateQRCode']('smartphones', registrationNumber)

      expect(mockGenerate).toHaveBeenLastCalledWith('test-url/screen/product/smartphonestablets20231669')
    })
  })

  describe('render', () => {
    it('should combine sections into valid SVG structure', () => {
      const sections = ['<g id="background"></g>', '<g id="header">Title</g>', '<g id="content"></g>']

      const result = template['render'](sections)

      expect(result).toMatch(/^<svg[^>]*>.*<\/svg>$/s)
      expect(result).toContain('xmlns="http://www.w3.org/2000/svg"')
      expect(result).toContain('width="800" height="600"')
      expect(result).toContain('viewBox="0 0 800 600"')
      expect(result).toContain('fill="none"')

      sections.forEach(section => {
        expect(result).toContain(section)
      })
    })

    it('should remove template indentation but keep text content as is', () => {
      const sections = ['<text\n    fill="black"  >\n  <tspan x="1">Smith  &amp;  Co</tspan> <tspan>kWh</tspan>\n</text>\n<g >\n  <path d="M0 0\n H1" />\n</g>']

      const result = template['render'](sections)

      expect(result).toContain('<text fill="black"><tspan x="1">Smith  &amp;  Co</tspan> <tspan>kWh</tspan></text><g><path d="M0 0 H1"/></g>')
    })
  })
})
