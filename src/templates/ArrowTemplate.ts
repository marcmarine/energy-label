import { ENERGY_CLASSES } from '../constants'
import type { EnergyClassData } from '../definitions'
import { assertOneOf, escapeXml } from '../utils'
import { EFFICIENCY_SCALE_COLORS, FONT_CLASS } from './common'
import { Template } from './Template'

export class ArrowTemplate extends Template<ArrowData> {
  protected getWidth(): number {
    return 92
  }

  protected getHeight(): number {
    return 51
  }

  protected validate(data: Partial<ArrowData>): void {
    assertOneOf('energyClass', data.energyClass, ENERGY_CLASSES)
  }

  protected createEfficiencyScale(data: Partial<ArrowData>): string {
    const energyClass = data.energyClass ?? 'A'
    const orientation = data.labelOrientation ?? 'LEFT'

    return `
    <g ${orientation === 'RIGHT' ? 'transform="scale(-1, 1) translate(-92, 0)"' : ''}>
      <path fill="#fff" d="M90.74.41H23L.5 25 23 49.71h67.74z" />
      <path fill="${EFFICIENCY_SCALE_COLORS[energyClass]}" d="M72 .41H23L.5 25 23 49.71h49V.41Z" />
      <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8pt" d="M90.74.41H23L.5 25 23 49.71h67.74z" />
    </g>
    <text font-size="29pt" font-weight="bold" fill="#fff" font-family="${FONT_CLASS}" text-anchor="middle" stroke="#000" stroke-width="0.8"><tspan x="46" y="37">${escapeXml(energyClass)}</tspan></text>
    <g ${orientation === 'RIGHT' ? 'transform="translate(-71, 0)"' : ''}>
      <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1pt" d="M81.33 30.37V20.01m2.75 2.7-2.75-2.75-2.74 2.75"/>
      <text font-size="19" font-weight="bold" fill="#000" font-family="${FONT_CLASS}" text-anchor="middle"><tspan x="81.5" y="16">A</tspan><tspan x="81.5" y="46">G</tspan></text>
    </g>`
  }
}

export interface ArrowData extends EnergyClassData {
  labelOrientation: 'LEFT' | 'RIGHT'
}
