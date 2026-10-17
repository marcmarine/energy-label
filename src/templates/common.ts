import type { EnergyClass, FlagOriginData } from '../definitions'
import { escapeXml, mmToPx, uniqueId } from '../utils'

/** Position and width of a header element, in millimetres. */
interface Box {
  x: number
  y: number
  width: number
}

/** Layout of the label header, in millimetres unless noted. */
export interface HeaderLayout {
  flag: Box
  logo: Box
  qrCode: Box
  /** Left and right edges of the supplier/model line and the separator below it. */
  left: number
  right: number
  textY: number
  /** SVG font-size value, units included. */
  fontSize: string
  separatorY: number
}

export interface HeaderData {
  flagOrigin?: FlagOriginData
  qrCodeDataUrl: string
  supplierOrTrademark?: string
  modelIdentifier?: string
}

/** Layout of the A–G efficiency scale, in millimetres unless noted. */
export interface EfficiencyScaleLayout {
  x: number
  y: number
  /** Width of each bar body, from A to G, without its arrow tip. */
  barWidths: number[]
  barHeight: number
  barGap: number
  tipWidth: number
  letter: {
    x: number
    /** SVG font-size value, units included. */
    fontSize: string
    /** Upward shift of the letter baseline from the bottom of its row, in pixels. */
    offsetY: number
  }
  /** Black arrow pointing at the selected class. */
  indicator: {
    x: number
    tipWidth: number
    width: number
    height: number
    letterX: number
    letterY: number
    /** SVG font-size value, units included. */
    fontSize: string
    textAnchor?: 'middle'
  }
}

export const EFFICIENCY_SCALE_COLORS: Record<string, string> = {
  A: '#00A651',
  B: '#50B848',
  C: '#BFD730',
  D: '#FFF200',
  E: '#FDB913',
  F: '#F37021',
  G: '#ED1C24'
}

export const EPREL_BASE_URL = 'https://eprel.ec.europa.eu'

/**
 * Font stacks for the `font-family` attribute. The regulations use Verdana and Calibri, which are not
 * installed everywhere (e.g. Linux or server-side rasterizers), so free lookalikes come next:
 * Carlito is metric-compatible with Calibri, DejaVu Sans is close to Verdana.
 */
export const FONT_TEXT = "Verdana, 'DejaVu Sans', 'Bitstream Vera Sans', sans-serif"
export const FONT_CLASS = 'Calibri, Carlito, sans-serif'

export function flagUK(x: number, y: number, width: number) {
  const scale = Number(width / 100).toPrecision(3)
  const id = uniqueId('flag-uk')

  return `<g transform="translate(${x}, ${y}) scale(${scale})"><mask id="${id}-outline" width="100" height="67" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:luminance"><path fill="#fff" d="M0 0v67h100V0z"/></mask><g mask="url(#${id}-outline)"><path fill="#034EA2" d="M0 0v67h100V0z"/><path fill="#000" d="m0 0 100 67Zm100 0L0 67Z"/><path fill="#fff" d="M102.3 5.9 61.2 33.5l41 27.6-4.4 12-47.8-32L2.2 73l-4.5-12 41.1-27.6-41-27.6 4.4-12 47.8 32L97.8-6l4.5 12Z"/><mask id="${id}-saltire" width="100" height="67" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:luminance"><path fill="#fff" d="M50 33.5h50V67zm0 0V67H0zm0 0H0V0zm0 0V0h50z"/></mask><g mask="url(#${id}-saltire)"><path fill="#000" d="m0 0 100 67Zm100 0L0 67Z"/><path fill="#DA2E33" d="m101.5 4-44 29.5 44 29.6-3 8L50 38.5 1.5 71.1l-3-8 44-29.6-44-29.6 3-8L50 28.5 98.5-4.1l3 8Z"/></g><path fill="#000" d="M50 0v67ZM0 33.5h100Z"/><path fill="#fff" d="M59.3 0v22.3H100v21.4H59.3V67H40.7V43.7H0V22.3h40.7V0z"/><path fill="#000" d="M50 0v67ZM0 33.5h100Z"/><path fill="#DA2E33" d="M56 0v26.8h44v12.4H56V67H44V39.2H0V26.8h44V0z"/></g></g>`
}

export function flagEU(x: number, y: number, width: number) {
  const scale = Number(width / 100).toFixed(2)

  return `<g transform="translate(${x}, ${y}) scale(${scale})"><path fill="#034EA2" d="M0 67h100V0H0z"/><path fill="#FFF200" d="m48.88 10.94 1.03-3.36 1.02 3.36h3.48l-2.8 2.2 1.08 3.44-2.78-2.12-2.77 2.12 1.1-3.45-2.82-2.19zm.22 44.49 1.11-3.37 1.09 3.37h3.67l-2.96 2.19 1.15 3.44-2.95-2.11-2.96 2.11 1.17-3.44-3-2.19h3.67Zm11.01-2.81 1.06-3.38 1.02 3.38h3.45l-2.79 2.16 1.1 3.47-2.78-2.14-2.8 2.14 1.11-3.47-2.82-2.16zm0-38.85 1.06-3.38 1.02 3.38h3.45l-2.79 2.17 1.1 3.46-2.78-2.13-2.8 2.13 1.11-3.46-2.82-2.17zM68.54 22l1.04-3.16L70.6 22h3.47l-2.79 2.04 1.07 3.24-2.77-1.98-2.78 1.98 1.1-3.25L65.09 22h3.46Zm0 22.52 1.04-3.16 1.02 3.16h3.47l-2.79 2.04 1.07 3.24-2.77-2-2.78 2 1.1-3.24-2.82-2.04zm2.79-11.27 1.06-3.15 1.02 3.15h3.47L74.1 35.3l1.07 3.24-2.77-2-2.78 2 1.09-3.24-2.8-2.05h3.43Zm-33.69-19.5 1.06-3.36 1.01 3.36h3.46l-2.79 2.19 1.09 3.46-2.77-2.13-2.8 2.13 1.1-3.46-2.82-2.19zm-7.86 8.45 1.05-3.36 1.02 3.37h3.46l-2.8 2.18 1.1 3.45-2.78-2.12-2.79 2.13 1.1-3.46-2.82-2.18h3.46Zm-2.81 11.06 1.05-3.16 1.02 3.16h3.46l-2.8 2.04 1.1 3.24-2.78-2-2.79 2 1.1-3.24-2.82-2.04zm2.81 11.26 1.05-3.16 1.02 3.16h3.46l-2.8 2.04 1.1 3.24-2.78-2-2.79 2 1.1-3.24-2.82-2.04zm8.08 8.08 1.1-3.36 1.1 3.37h3.67l-2.96 2.18 1.14 3.46-2.95-2.13-2.95 2.13 1.17-3.46-3-2.18h3.68Z"/></g>`
}

export function flag(x: number, y: number, width: number, origin: FlagOriginData = 'EU'): string {
  return origin === 'EU' ? flagEU(x, y, width) : flagUK(x, y, width)
}

export function logo(x: number, y: number, width: number) {
  const scale = Number(width / 41.43).toFixed(2)

  return `<g transform="translate(${x}, ${y}) scale(${scale})"><path fill="#034EA2" d="M0 40.48V0h27.62v8.08H8.42v7.73h18.4v7.9H8.42v8.86h19.2v7.9H0Zm58.39-13.22V0h8.28v40.48h-9.89l-16.6-26.91v26.9H31.9V0h9.88l16.6 27.26Zm13.04 13.22V0h27.14v8.08H79.71v7.73h18.1v7.9H79.7v8.86h18.86v7.9H71.43Zm31.43 0V0h19.17c1.93-.03 3.86.19 5.73.66a9.2 9.2 0 0 1 3.95 2.14 8.9 8.9 0 0 1 2.3 3.92c.54 1.93.79 3.94.75 5.94 0 1.23-.08 2.46-.25 3.68-.13 1.06-.35 2.11-.65 3.14a6.1 6.1 0 0 1-1.92 2.7c.8.87 1.4 1.9 1.76 3.03.39 1.25.58 2.55.57 3.86v11.4h-8.59V29.99a3.79 3.79 0 0 0-1.07-3.13 5.55 5.55 0 0 0-3.42-.84h-10.02v14.47h-8.31Zm8.38-22.33h9.4q1.485.03 2.94-.24c.6-.1 1.16-.31 1.67-.61.6-.49.9-1.71.9-3.68.1-1.5-.08-2.99-.54-4.4-.36-.8-1.53-1.22-3.53-1.22h-10.84zm42.15.21h19.6c.2 1.53.3 2.67.33 3.4.03.75 0 1.43 0 1.97v3.32c.05 2.83-.4 5.64-1.32 8.32a7.14 7.14 0 0 1-2.82 3.59 12.4 12.4 0 0 1-5.34 1.72 65 65 0 0 1-7.6.24c-6.44 0-10.86-1.02-13.27-3.07-2.62-2.13-3.92-6.33-3.92-12.6V15.4c0-5.22 1.06-9.08 3.2-11.58a10.2 10.2 0 0 1 4.6-2.85 22.2 22.2 0 0 1 6.91-.97h8.68c3.94.13 6.7 1.18 8.29 3.17a13.2 13.2 0 0 1 2.53 8.5v3.53h-8.44c.16-2.13-.06-4.27-.67-6.32-.2-.4-1.03-.64-2.53-.73a82 82 0 0 0-3.65-.14h-3.7c-3.1 0-4.93.32-5.5.97-.56.64-.88 2.87-.96 6.7v9.76a24 24 0 0 0 .53 5.49v-.12c.22.47.55.87.97 1.18.57.4 1.24.64 1.93.7.82.12 1.65.18 2.48.19h5.03c1.14 0 2.28-.04 3.41-.16a3 3 0 0 0 1.78-.63c.56-.48.85-2.1.85-4.81v-.97h-11.4zM193.68 0l-3.65 11.67 9.97-1.66-14.26 31.42 4.3-22.77-9.56.41L184.52 0z"/></g>`
}

export function qrCodeImage(x: number, y: number, width: number, qrCodeDataUrl?: string) {
  return `<image href="${qrCodeDataUrl}" x="${x}" y="${y}" width="${width}" />`
}

export function separator(x1: number, x2: number, y: number) {
  return `<path d="M${mmToPx(x1)} ${mmToPx(y)}H${mmToPx(x2)}" stroke="#000" stroke-width="0.5pt" />`
}

export function header(layout: HeaderLayout, data: HeaderData) {
  const { left, right, textY, fontSize, separatorY } = layout

  return `${flag(mmToPx(layout.flag.x), mmToPx(layout.flag.y), mmToPx(layout.flag.width), data.flagOrigin)}
${logo(mmToPx(layout.logo.x), mmToPx(layout.logo.y), mmToPx(layout.logo.width))}
${qrCodeImage(mmToPx(layout.qrCode.x), mmToPx(layout.qrCode.y), mmToPx(layout.qrCode.width), data.qrCodeDataUrl)}
<text fill="#000" font-family="${FONT_TEXT}" font-size="${fontSize}" font-weight="bold">
<tspan x="${mmToPx(left)}" y="${mmToPx(textY)}">${escapeXml(data.supplierOrTrademark || "Supplier's Name")}</tspan>
</text>
<text fill="#000" font-family="${FONT_TEXT}" font-size="${fontSize}" text-anchor="end">
<tspan x="${mmToPx(right)}" y="${mmToPx(textY)}">${escapeXml(data.modelIdentifier || 'Model Identifier')}</tspan>
</text>
${separator(left, right, separatorY)}`
}

export function efficiencyScale(layout: EfficiencyScaleLayout, selectedClass: EnergyClass = 'A') {
  const { barWidths, barHeight, barGap, tipWidth, letter, indicator } = layout
  const rowStep = barHeight + barGap

  const rows = Object.entries(EFFICIENCY_SCALE_COLORS).map(([cls, color], index) => {
    // Positions are computed in millimetres and converted once, so rounding doesn't accumulate row after row.
    const rowTop = index * rowStep
    const rowY = mmToPx(rowTop)
    const bodyEnd = mmToPx(barWidths[index])

    const bar = `<path d="M0,${rowY} H${bodyEnd} L${mmToPx(barWidths[index] + tipWidth)},${mmToPx(rowTop + barHeight / 2)} L${bodyEnd},${mmToPx(rowTop + barHeight)} H0 Z" fill="${color}" />`
    const label = `<text x="${mmToPx(letter.x)}" y="${Number((mmToPx(rowTop + rowStep) - letter.offsetY).toFixed(2))}" font-family="${FONT_CLASS}" font-size="${letter.fontSize}" font-weight="bold" fill="#fff">${cls}</text>`

    if (cls !== selectedClass) {
      return bar + label
    }

    const { x, tipWidth: indicatorTip, width, height, letterX, letterY, fontSize, textAnchor } = indicator

    return `${bar}${label}<g transform="translate(0, ${mmToPx((barHeight - height) / 2)})">
<g transform="translate(0, ${rowY})">
  <polygon points="${mmToPx(x)},${mmToPx(height / 2)} ${mmToPx(x + indicatorTip)},0 ${mmToPx(x + width)},0 ${mmToPx(x + width)},${mmToPx(height)} ${mmToPx(x + indicatorTip)},${mmToPx(height)}" fill="#000" />
  <text x="${mmToPx(letterX)}" y="${mmToPx(letterY)}" font-size="${fontSize}" font-weight="bold" fill="#fff" font-family="${FONT_CLASS}"${textAnchor ? ` text-anchor="${textAnchor}"` : ''}>${cls}</text>
</g>
</g>`
  })

  return `<g transform="translate(${mmToPx(layout.x)}, ${mmToPx(layout.y)})">${rows.join('')}</g>`
}
