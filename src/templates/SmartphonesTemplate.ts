import { Template } from './Template'
import { assertOneOf, escapeXml, minutesToHoursAndMinutes, mmToPx } from '../utils'
import { ENERGY_CLASSES, FLAG_ORIGINS, FREE_FALL_RELIABILITY_CLASSES, REPAIRABILITY_CLASSES } from '../constants'
import { efficiencyScale, FONT_TEXT, header, separator } from './common'
import type { EnergyLabelBaseData, FreeFallReliabilityClass, RepairabilityClass } from '../definitions'

export class SmartphonesTemplate extends Template<SmartphonesAndTabletsData> {
  protected getWidth(): number {
    return mmToPx(68)
  }

  protected getHeight(): number {
    return mmToPx(136)
  }

  protected createBackground(): string {
    const width = this.getWidth()
    const height = this.getHeight()

    return `<rect width="${width}" height="${height}" fill="#fff" />`
  }

  protected createHeader(data: Partial<SmartphonesAndTabletsData>): string {
    const { flagOrigin, eprelRegistrationNumber, supplierOrTrademark, modelIdentifier } = data
    const qrCode = this.generateQRCode('smartphones', eprelRegistrationNumber)

    return header(
      {
        flag: { x: 2, y: 2, width: 15 },
        logo: { x: 18.5, y: 3.5, width: 7 },
        qrCode: { x: 56, y: 2, width: 10 },
        left: 2,
        right: 66,
        textY: 18,
        fontSize: '7pt',
        separatorY: 19
      },
      { flagOrigin, qrCode, supplierOrTrademark, modelIdentifier }
    )
  }

  protected validate(data: Partial<SmartphonesAndTabletsData>): void {
    assertOneOf('flagOrigin', data.flagOrigin, FLAG_ORIGINS)
    assertOneOf('energyClass', data.energyClass, ENERGY_CLASSES)
    assertOneOf('repairabilityClass', data.repairabilityClass, REPAIRABILITY_CLASSES)
    assertOneOf('repeatedFreeFallReliabilityClass', data.repeatedFreeFallReliabilityClass, FREE_FALL_RELIABILITY_CLASSES)
  }

  protected createEfficiencyScale(data: Partial<SmartphonesAndTabletsData>): string {
    const scale = efficiencyScale(
      {
        x: 2,
        y: 22,
        barWidths: [14, 17, 20, 23, 26, 29, 32],
        barHeight: 6,
        barGap: 1,
        tipWidth: 3,
        letter: { x: 2, fontSize: '11pt', offsetY: 11 },
        indicator: { x: 48, tipWidth: 5.5, width: 16, height: 8, letterX: 58, letterY: 6.2, fontSize: '20pt', textAnchor: 'middle' }
      },
      data.energyClass
    )

    return `${scale}${separator(2, 66, 73)}`
  }

  protected createConsumption(data: Partial<SmartphonesAndTabletsData>): string {
    const { batteryEndurancePerCycle } = data
    const { hours, minutes } = minutesToHoursAndMinutes(batteryEndurancePerCycle)

    const digits = `${hours}${minutes}`.length

    const symbolBateryEndurance = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M15.176 5.49V29.4c0 .885-.641 1.6-1.434 1.6H2.434C1.643 31 1 30.285 1 29.4V5.49c0-.882.642-1.599 1.433-1.599h11.31c.792 0 1.433.717 1.433 1.6M4.962 3.892v-1.94c0-.525.382-.951.854-.951h4.326c.471 0 .852.426.852.952v1.94" fill="#fff"/>
  <path d="M4.962 3.891v-1.94c0-.525.382-.951.854-.951h4.326c.471 0 .852.426.852.952v1.94m4.182 1.599V29.4c0 .884-.641 1.599-1.434 1.599H2.434C1.643 31 1 30.285 1 29.4V5.49c0-.882.642-1.599 1.433-1.599h11.31c.792 0 1.433.717 1.433 1.6Z" stroke="#000" stroke-miterlimit="10"/>
  <path d="M24.832 19.315a7.17 7.17 0 0 1-5.176 2.208c-3.998 0-7.238-3.285-7.238-7.335 0-4.051 3.24-7.334 7.238-7.334 3.997 0 7.237 3.283 7.237 7.334" fill="#fff"/>
  <path d="M24.832 19.315a7.17 7.17 0 0 1-5.176 2.208c-3.998 0-7.238-3.285-7.238-7.335 0-4.051 3.24-7.334 7.238-7.334 3.997 0 7.237 3.283 7.237 7.334" stroke="#000" stroke-miterlimit="10"/>
  <path d="M26.942 17.046 29 13.4h-4.115z" fill="#000"/>
  <path d="M19.91 9.338v4.837l1.6 2.457M8.327 8.564v12.255" stroke="#000" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="m8.327 23.997 2.675-4.695h-5.35z" fill="#000"/>
  <path d="M3.177 29.13h9.873m-9.873-1.948h9.873" stroke="#000" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
`
    return `<g transform="translate(0, ${mmToPx(73)})">
  <g transform="translate(${mmToPx(digits === 2 ? 19 : digits === 3 ? 17 : 15)}, 0)">
    ${symbolBateryEndurance(0, mmToPx(3))}
    <text x="${mmToPx(10)}" y="${mmToPx(10)}" fill="#000" font-family="${FONT_TEXT}">
      <tspan font-weight="bold" font-size="20pt">${escapeXml(hours)}</tspan><tspan font-size="13pt">h </tspan>
      <tspan font-weight="bold" font-size="13pt">${escapeXml(minutes)}</tspan><tspan font-size="9pt">min</tspan>
    </text>
  </g>
</g>
${separator(2, 66, 88)}`
  }

  protected createFeatures(data: Partial<SmartphonesAndTabletsData>): string {
    const { repeatedFreeFallReliabilityClass, repairabilityClass, batteryEnduranceInCycles, ingressProtectionRating } = data

    const fallReliabilityClassIcon = (x: number, y: number, repeatedFreeFallReliabilityClass: FreeFallReliabilityClass = 'B') => `
<g transform="translate(${x}, ${y})">
  ${aToEScale(repeatedFreeFallReliabilityClass)}
  ${symbolFreeFall(18, 9)}
</g>
`

    const repairabilityClassIcon = (x: number, y: number, repairabilityClass: RepairabilityClass = 'D') => `
<g transform="translate(${x}, ${y})">
  ${aToEScale(repairabilityClass)}
  ${symbolRepairability(16, 16)}
</g>
`

    // EPREL declares the cycles in hundreds (10 for 1000), and the label shows the full number.
    const batteryEnduranceCyclesIcon = (x: number, y: number, batteryEnduranceInCycles?: number) => `
<g transform="translate(${x}, ${y})">
  ${symbolBateryEnduranceCycles(-15.9, 0)}
  <text y="${mmToPx(16)}" fill="#000" font-family="${FONT_TEXT}" text-anchor="middle">
    <tspan font-size="12pt" font-weight="bold">${typeof batteryEnduranceInCycles === 'number' ? batteryEnduranceInCycles * 100 : 'XY00'}</tspan><tspan font-size="10pt">x</tspan>
  </text>
</g>
`

    const ingressProtectionIcon = (x: number, y: number, ingressProtectionRating: string = 'IPXY') => `<g transform="translate(${x}, ${y})">
  ${symbolIngressProtection(-24.64, mmToPx(2))}
  <text y="${mmToPx(16)}" fill="#000" font-family="${FONT_TEXT}" text-anchor="middle">
    <tspan font-size="12pt" font-weight="bold">${escapeXml(ingressProtectionRating)}</tspan>
  </text>
</g>
`

    const aToEScale = (selectedClass: RepairabilityClass | FreeFallReliabilityClass) => `<text fill="#000" font-family="${FONT_TEXT}">
  ${REPAIRABILITY_CLASSES
    .map(
      (cls, index) =>
        `<tspan x="${cls === selectedClass ? '-1.5' : '0'}" y="${index * 12}" font-size="${cls === selectedClass ? '12pt' : '8pt'}"${
          cls === selectedClass ? ' font-weight="bold"' : ''
        } alignment-baseline="${cls === selectedClass ? 'hanging' : 'before-edge'}">${cls}</tspan>`
    )
    .join('')}
</text>`

    const symbolFreeFall = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="m26.314 21.069 8.614 11.396a2.76 2.76 0 0 1-.547 3.865l-10.737 8.08a2.76 2.76 0 0 1-3.867-.545L1.556 19.649a2.76 2.76 0 0 1 .545-3.867l10.738-8.08a2.76 2.76 0 0 1 3.866.547l2.199 2.92M7.837 15.422l3.996-3.007m15.862 23.059a1.771 1.771 0 1 1-2.831 2.129 1.771 1.771 0 0 1 2.831-2.13" stroke="#000" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="m28.128 43.424 3.332.425 2.41.308-2.336.67-3.844 1.1 2.459 1.249 2.139 1.087-2.395-.142-4.57-.27.413 2.177.202 1.072-.945-.547-3.033-1.756-2.462 2.446-.762.757-.088-1.07-.182-2.218-4.354 1.395-2.255.722 1.77-1.572 2.043-1.816-4.021-.113-3.235-.09 3.111-.89 3.844-1.1-2.46-1.25-1.621-.823 1.814-.122 3.714-.245" stroke="#000" stroke-miterlimit="8"/>
  <path d="M24.02 24.081V6.372m0-2.648v-2.43M21.4 16.788V5.052" stroke="#000" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
`

    const symbolRepairability = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M11.129 30.928a5.65 5.65 0 0 1-5.992 1.291l3.407-3.405a1.33 1.33 0 0 0 0-1.882l-1.41-1.41a1.33 1.33 0 0 0-1.881.001l-3.407 3.405a5.65 5.65 0 0 1 1.29-5.992 5.655 5.655 0 0 1 6.642-1l12.59-12.59a5.653 5.653 0 0 1 6.993-7.932L25.954 4.82a1.33 1.33 0 0 0 0 1.882l1.41 1.41a1.33 1.33 0 0 0 1.88-.001l3.408-3.407a5.653 5.653 0 0 1-7.932 6.992L12.129 24.287a5.655 5.655 0 0 1-1 6.641m15.446-3.361L15.47 38.365m14.966-12.451 8.958-8.727h2.182l3.639-5.67-2.184-2.128-5.821 3.545v2.127l-8.958 8.726m-10.3 17.175a3.707 3.707 0 0 1-5.145 0 3.48 3.48 0 0 1 0-5.013L24.45 24.606a3.707 3.707 0 0 1 5.145 0 3.48 3.48 0 0 1 0 5.013z" stroke="#000" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
`

    const symbolBateryEnduranceCycles = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M4.685 10.104v-1.88c0-.51.376-.923.839-.923h4.259c.464 0 .84.414.84.923v1.88m4.33 1.55v23.178c0 .857-.63 1.55-1.41 1.55H2.41c-.779 0-1.411-.693-1.411-1.55V11.654c0-.855.632-1.55 1.41-1.55h11.133c.78 0 1.41.695 1.41 1.55Zm7.874-1.55v-1.88c0-.51.376-.923.84-.923h4.258c.464 0 .84.414.84.923v1.88m4.115 1.55v23.178c0 .857-.63 1.55-1.41 1.55H20.336c-.778 0-1.41-.693-1.41-1.55V11.654c0-.855.632-1.55 1.41-1.55H31.47c.78 0 1.411.695 1.411 1.55Z" stroke="#000" stroke-miterlimit="10"/>
  <path d="M10.637 40.892c1.624 1.666 4.041 2.642 6.668 2.458 2.595-.181 4.83-1.454 6.21-3.294" stroke="#000" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="m8.835 42.99-.28-3.977 3.98-.279z" fill="#000"/>
  <path d="M22.262 3.48c-1.624-1.666-4.041-2.642-6.668-2.458-2.595.181-4.83 1.455-6.21 3.295" stroke="#000" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="m24.065 1.382.278 3.977-3.979.279z" fill="#000"/>
  <path d="M21.128 34.266h9.718m-27.581 0h9.718m-9.718-7.923h9.718M3.265 18.42h9.718M3.265 30.304h9.718M3.265 22.38h9.718m-9.718-7.922h9.718M3.265 32.285h9.718m-9.718-7.923h9.718m-9.718-7.924h9.718M3.265 28.323h9.718M3.265 20.4h9.718m-9.718-7.923h9.718" stroke="#000" stroke-miterlimit="10" stroke-linejoin="round"/>
</g>
`

    const symbolIngressProtection = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M35.243.743c-1.229 1.346-4.562 5.317-4.562 8.694 0 2.506 2.032 4.544 4.53 4.544s4.53-2.038 4.53-4.544c0-3.95-3.255-7.49-4.498-8.694" fill="#fff"/>
  <path d="M35.243.743c-1.229 1.346-4.562 5.317-4.562 8.694 0 2.506 2.032 4.544 4.53 4.544s4.53-2.038 4.53-4.544c0-3.95-3.255-7.49-4.498-8.694Z" stroke="#000" stroke-miterlimit="10"/>
  <path d="M42.801 3.021C40.835 5.245 35.5 11.8 35.5 17.376c0 4.137 3.253 7.504 7.25 7.504 3.999 0 7.251-3.367 7.251-7.504 0-6.522-5.21-12.366-7.199-14.355" fill="#fff"/>
  <path d="M42.801 3.021C40.835 5.245 35.5 11.8 35.5 17.376c0 4.137 3.253 7.504 7.25 7.504 3.999 0 7.251-3.367 7.251-7.504 0-6.522-5.21-12.366-7.199-14.355Z" stroke="#000" stroke-miterlimit="10"/>
  <path d="M43.928 22.116c2.255-.953 3.867-3.442 3.867-6.354z" fill="#fff"/>
  <path d="M43.928 22.116c2.255-.953 3.867-3.442 3.867-6.354" stroke="#000" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.012 3.691a1.936 1.936 0 1 1-3.871 0 1.936 1.936 0 0 1 3.871 0M12.486 23.27a1.593 1.593 0 1 1-3.186 0 1.593 1.593 0 0 1 3.186 0m3.554-8.937a1.659 1.659 0 1 1-3.318 0 1.659 1.659 0 0 1 3.317 0m4.529 8.075a1.486 1.486 0 1 1-2.973 0 1.486 1.486 0 0 1 2.973 0m2.567-9.901a1.43 1.43 0 1 1-2.859 0 1.43 1.43 0 0 1 2.86 0M8.288 9.872a1.249 1.249 0 1 1 .5-2.448 1.249 1.249 0 0 1-.5 2.448m-1.884 6.841A1.567 1.567 0 1 1 4.676 14.1a1.567 1.567 0 0 1 1.728 2.614M9.038 4.54a.756.756 0 1 0 0-1.513.756.756 0 0 0 0 1.513M4.313 22.682a.756.756 0 1 0 0-1.513.756.756 0 0 0 0 1.512m12.095-12.85a.756.756 0 1 0 0-1.512.756.756 0 0 0 0 1.512m2.645 7.937a.756.756 0 1 0 0-1.512.756.756 0 0 0 0 1.512M3.557 11.343a.756.756 0 1 0 0-1.513.756.756 0 0 0 0 1.513m17.764-6.047a.756.756 0 1 0 0-1.513.756.756 0 0 0 0 1.513m3.402 13.984a.756.756 0 1 0 0-1.513.756.756 0 0 0 0 1.513M1.479 17.768a.756.756 0 1 0 0-1.512.756.756 0 0 0 0 1.512m8.787 1.512a.756.756 0 1 0 0-1.513.756.756 0 0 0 0 1.513M20.565 1.512a.756.756 0 1 0 0-1.513.756.756 0 0 0 0 1.513m-3.023 26.083a.756.756 0 1 0-.001-1.513.756.756 0 0 0 0 1.513" fill="#000"/>
</g>
`

    return `<g transform="translate(0, ${mmToPx(89)})">
  ${fallReliabilityClassIcon(mmToPx(10.67), mmToPx(3), repeatedFreeFallReliabilityClass)}
  ${repairabilityClassIcon(mmToPx(41.6), mmToPx(3), repairabilityClass)}
  ${batteryEnduranceCyclesIcon(mmToPx(18), mmToPx(25), batteryEnduranceInCycles)}
  ${ingressProtectionIcon(mmToPx(50), mmToPx(25), ingressProtectionRating)}
</g>
<text transform="translate(${mmToPx(68 - 1.3 - 2)} ${mmToPx(136 - 2)}) rotate(90)" fill="#000" font-family="${FONT_TEXT}" font-size="5pt" text-anchor="end">
  2023/1669
</text>`
  }
}

export interface SmartphonesAndTabletsData extends EnergyLabelBaseData {
  batteryEndurancePerCycle: number
  repeatedFreeFallReliabilityClass: FreeFallReliabilityClass
  repairabilityClass: RepairabilityClass
  /** Battery endurance in hundreds of full charge cycles, as declared in EPREL (e.g. `10` for 1000 cycles). */
  batteryEnduranceInCycles: number
  ingressProtectionRating: string
}
