import QRCode from 'qrcode'
import { optimize } from 'svgo/browser'

export const mmToPx = (mm: number): number => {
  const result = mm * (96 / 25.4)

  return Number(result.toFixed(2))
}

export class QRCodeGenerator {
  static async generate(content: string, options = { margin: 0, width: 512 }): Promise<string> {
    return await QRCode.toDataURL(content, options)
  }
}

export class SVGOptimizer {
  static async optimize(svgString: string) {
    return optimize(svgString).data
  }
}

export async function appendToElement(container: HTMLElement, svgString: string): Promise<void> {
  container.innerHTML = ''

  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  const svg = doc.documentElement

  container.appendChild(svg)
}

export async function downloadFile(svgString: string, filename = 'label.svg'): Promise<void> {
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
