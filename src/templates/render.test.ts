import { describe, expect, it } from 'vitest'
import { renderSvg } from './render'

describe('renderSvg', () => {
  it('should combine sections into valid SVG structure', () => {
    const sections = [
      '<g id="background"></g>',
      '<g id="header">Title</g>',
      '<g id="content"></g>',
    ]

    const result = renderSvg(800, 600, sections)

    expect(result).toMatch(/^<svg[^>]*>.*<\/svg>$/s)
    expect(result).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(result).toContain('width="800" height="600"')
    expect(result).toContain('viewBox="0 0 800 600"')
    expect(result).toContain('fill="none"')
    expect(result).toContain(sections.join(''))
  })

  it('should remove template indentation but keep text content as is', () => {
    const sections = [
      '<text\n    fill="black"  >\n  <tspan x="1">Smith  &amp;  Co</tspan> <tspan>kWh</tspan>\n</text>\n<g >\n  <path d="M0 0\n H1" />\n</g>',
    ]

    const result = renderSvg(800, 600, sections)

    expect(result).toContain(
      '<text fill="black"><tspan x="1">Smith  &amp;  Co</tspan> <tspan>kWh</tspan></text><g><path d="M0 0 H1"/></g>',
    )
  })
})
