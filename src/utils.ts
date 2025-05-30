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
