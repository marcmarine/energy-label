import { TemplateCommon } from './TemplateCommon'
import { Template } from './Template'
import { escapeXml } from '../utils'
import type { EnergyClassData } from '../defintions'

export class ArrowTemplate extends Template<ArrowData> {
  protected getWidth(): number {
    return 92
  }

  protected getHeight(): number {
    return 51
  }

  protected createEfficiencyScale(): string {
    const energyClass = this.data?.energyClass ?? 'A'
    const orientation = this.data?.labelOrientation ?? 'LEFT'

    return `
    <g ${orientation === 'RIGHT' ? 'transform="scale(-1, 1) translate(-92, 0)"' : ''}>
      <path fill="#fff" d="M90.74.41H23L.5 25 23 49.71h67.74z" />
      <path fill="${TemplateCommon.EFFICIENCY_SCALE_COLORS[energyClass]}" d="M72 .41H23L.5 25 23 49.71h49V.41Z" />
      <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8pt" d="M90.74.41H23L.5 25 23 49.71h67.74z" />
    </g>
    <text font-size="29pt" font-weight="bold" fill="#fff" font-family="Calibri" text-anchor="middle" stroke="#000" stroke-width="0.8"><tspan x="46" y="37">${escapeXml(energyClass)}</tspan></text>
    <g ${orientation === 'RIGHT' ? 'transform="translate(-71, 0)"' : ''}>
      <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1pt" d="M81.33 30.37V20.01m2.75 2.7-2.75-2.75-2.74 2.75"/>
      <path fill="#000" d="M86.38 35.86q0 .27-.028.464-.018.195-.065.315a.3.3 0 0 1-.102.158.2.2 0 0 1-.14.046q-.12 0-.389-.167a6 6 0 0 0-.714-.361 8 8 0 0 0-1.067-.362 5.5 5.5 0 0 0-1.429-.167 3.9 3.9 0 0 0-1.577.306 3.35 3.35 0 0 0-1.206.853q-.5.547-.77 1.327a5.2 5.2 0 0 0-.269 1.707q0 1.03.27 1.818.277.78.77 1.309.491.528 1.177.797.696.27 1.531.27a3.6 3.6 0 0 0 .807-.093 3 3 0 0 0 .742-.279v-2.783h-2.273q-.165 0-.26-.204-.092-.213-.092-.714 0-.26.018-.436.028-.176.075-.279a.36.36 0 0 1 .111-.157.22.22 0 0 1 .148-.056h4.055q.148 0 .26.056.12.045.204.148a.7.7 0 0 1 .139.25q.046.14.046.325v4.778q0 .279-.102.492-.093.204-.399.324a8 8 0 0 1-.742.25 10 10 0 0 1-1.893.363q-.482.045-.974.046-1.438 0-2.579-.408a5.3 5.3 0 0 1-1.92-1.197 5.25 5.25 0 0 1-1.206-1.911q-.418-1.132-.418-2.56 0-1.476.445-2.645a5.55 5.55 0 0 1 1.262-1.994 5.4 5.4 0 0 1 1.967-1.262q1.16-.435 2.58-.436.779 0 1.418.111.64.102 1.114.26.482.149.798.325.315.176.436.306a.75.75 0 0 1 .185.371q.056.233.056.696m.5-20.77q.112.335.14.53t-.074.296q-.102.094-.362.112a7 7 0 0 1-.714.028q-.474 0-.743-.019a2 2 0 0 1-.398-.046.4.4 0 0 1-.195-.12.6.6 0 0 1-.093-.196l-.807-2.412h-4.509l-.76 2.347a.7.7 0 0 1-.103.223.4.4 0 0 1-.195.14q-.13.046-.38.064a9 9 0 0 1-.64.019 6 6 0 0 1-.668-.028q-.24-.028-.334-.13-.093-.111-.065-.306t.14-.52l3.7-10.65a.9.9 0 0 1 .13-.25.42.42 0 0 1 .233-.149 1.6 1.6 0 0 1 .454-.065 13 13 0 0 1 .76-.019q.548 0 .873.019.325.01.501.065.185.046.26.148a.8.8 0 0 1 .139.279zm-5.51-8.803h-.01l-1.697 5.102h3.405z"/>
    </g>`
  }
}

export interface ArrowData extends EnergyClassData {
  labelOrientation: 'LEFT' | 'RIGHT'
}
