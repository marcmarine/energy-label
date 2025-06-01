import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Template } from './Template'

vi.mock('../utils', () => ({
  QRCodeGenerator: {
    generate: vi.fn()
  }
}))

vi.mock('./TemplateCommon', () => ({
  TemplateCommon: {
    EPREL_BASE_URL: 'test-url'
  }
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

  protected async createHeader(): Promise<string> {
    return `<g id="header">${this.data?.name || 'Default'}</g>`
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
    it('should include all template sections', async () => {
      const testData = { name: 'Test Product', model: 'Test Model' }

      const result = await template.generate(testData)

      expect(result).toContain('id="background"')
      expect(result).toContain('id="header"')
      expect(result).toContain('id="efficiency-scale"')
      expect(result).toContain('id="consumption"')
      expect(result).toContain('id="features"')
      expect(result).toContain('Test Product')
    })

    it('should handle empty data correctly', async () => {
      const result = await template.generate({})

      expect(result).toContain('Default')
      expect(result).toMatch(/<svg[^>]*>.*<\/svg>/s)
    })
  })

  describe('generateQRCodeDataUrl', () => {
    it('should generate QR code with correct URL and options', async () => {
      const mockDataUrl = 'data:image/png;base64,mockQRCode'
      const { QRCodeGenerator } = await import('../utils')
      const mockGenerate = vi.mocked(QRCodeGenerator.generate)
      mockGenerate.mockResolvedValue(mockDataUrl)

      const result = await template['generateQRCodeDataUrl']('ABC123')

      expect(mockGenerate).toHaveBeenCalledWith('test-url/ABC123', { margin: 0, width: 512 })
      expect(result).toBe(mockDataUrl)
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
  })
})
