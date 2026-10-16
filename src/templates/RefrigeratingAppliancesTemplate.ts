import { escapeXml, mmToPx } from '../utils'
import { efficiencyScale, header, separator } from './common'
import { Template } from './Template'
import type { EnergyLabelBaseData, QRCodeDataUrlData } from '../definitions'

export class RefrigeratingAppliancesTemplate extends Template<WineStorageAppliancesData | HouseholdFridgesAndFreezersData> {
  protected getWidth(): number {
    return mmToPx(96)
  }

  protected getHeight(): number {
    return mmToPx(192)
  }

  protected createBackground(): string {
    const width = this.getWidth()
    const height = this.getHeight()

    return `<rect width="${width}" height="${height}" fill="#fff" />`
  }

  protected createHeader(data: Partial<WineStorageAppliancesData | HouseholdFridgesAndFreezersData>): string {
    const { flagOrigin, eprelRegistrationNumber, supplierOrTrademark, modelIdentifier } = data
    const qrCodeDataUrl = this.generateQRCodeDataUrl('refrigerating-appliances', eprelRegistrationNumber as string)

    return header(
      {
        flag: { x: 3, y: 3, width: 21 },
        logo: { x: 26, y: 5, width: 10 },
        qrCode: { x: 79, y: 3, width: 14 },
        left: 3,
        right: 93,
        textY: 25,
        fontSize: '12',
        separatorY: 27
      },
      { flagOrigin, qrCodeDataUrl, supplierOrTrademark, modelIdentifier }
    )
  }

  protected createEfficiencyScale(data: Partial<WineStorageAppliancesData | HouseholdFridgesAndFreezersData>): string {
    const scale = efficiencyScale(
      {
        x: 3,
        y: 31,
        barWidths: [19, 25, 29, 32, 36, 40, 44],
        barHeight: 8.5,
        barGap: 1.5,
        tipWidth: 4,
        letter: { x: 3, fontSize: '19pt', offsetY: 14 },
        indicator: { x: 67, tipWidth: 8, width: 23, height: 12, letterX: 79, letterY: 9.5, fontSize: '33pt' }
      },
      data.energyClass
    )

    return `${scale}${separator(3, 93, 103.5)}`
  }

  protected createConsumption(data: Partial<WineStorageAppliancesData | HouseholdFridgesAndFreezersData>): string {
    const consolidatedEnergyConsAnnual = data.consolidatedEnergyConsAnnual ?? 'XYZ'

    return `<text x="${mmToPx(48)}" y="${mmToPx(117.5)}" fill="#000" font-family="Verdana" text-anchor="middle">
  <tspan font-size="28pt" font-weight="bold">${escapeXml(consolidatedEnergyConsAnnual)}</tspan> <tspan font-size="18pt">kWh/annum</tspan>
</text>
${separator(3, 93, 123.5)}`
  }

  protected createFeatures(data: Partial<WineStorageAppliancesData | HouseholdFridgesAndFreezersData>): string {
    // Reading both variants as optional fields; which one applies is decided by `capBottles` below.
    const { capBottles, noise, noiseClass, capRefrNet, capFreezeNet }: Partial<WineStorageAppliancesData & HouseholdFridgesAndFreezersData> = data

    const symbolWineStorage = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M10.666 2.653h.212c.226 0 .413.34.413.745v.758c0 .418-.187.745-.413.745h-.226v8.063c0 1.62.36 1.751.36 1.751a5.08 5.08 0 0 1 2.82 1.683A4.93 4.93 0 0 1 15 19.434v4.169s-1.236.888-9.958.888v15.12c3.333.332 6.7.111 9.958-.653v10.925s-1.476 1.398-7.18 1.398C3.009 51.202 1 49.882 1 49.882V19.446a4.93 4.93 0 0 1 1.167-3.034 5.08 5.08 0 0 1 2.822-1.684s.359-.13.359-1.75V4.913h-.226c-.226 0-.413-.34-.413-.745V3.41c0-.418.187-.745.413-.745h.332v-.261c.014-.31.151-.602.383-.812s.538-.323.853-.312h2.66c.315-.01.621.101.853.312.232.21.37.502.383.812v.274zm18 0h.212c.227 0 .413.34.413.745v.758c0 .418-.186.745-.413.745h-.226v8.063c0 1.62.36 1.751.36 1.751a5.08 5.08 0 0 1 2.82 1.683A4.93 4.93 0 0 1 33 19.434v4.169s-1.236.888-9.958.888v15.12c3.333.333 6.7.112 9.958-.653v10.925s-1.476 1.398-7.18 1.398c-4.812-.078-6.82-1.398-6.82-1.398V19.446a4.93 4.93 0 0 1 1.167-3.034 5.08 5.08 0 0 1 2.822-1.684s.359-.13.359-1.75V4.913h-.226c-.227 0-.413-.34-.413-.745V3.41c0-.418.2-.745.413-.745h.332v-.261c.014-.31.151-.602.383-.812s.538-.323.853-.312h2.66c.315-.01.621.101.853.312.232.21.37.502.383.812v.274zm19 0h.212c.227 0 .413.34.413.745v.758c0 .418-.186.745-.413.745h-.226v8.063c0 1.62.36 1.751.36 1.751a5.08 5.08 0 0 1 2.82 1.683A4.93 4.93 0 0 1 52 19.434v4.169s-1.236.888-9.958.888v15.12c3.333.333 6.7.112 9.958-.653v10.925s-1.476 1.398-7.18 1.398c-4.812-.078-6.82-1.398-6.82-1.398V19.446a4.93 4.93 0 0 1 1.167-3.034 5.08 5.08 0 0 1 2.822-1.684s.359-.13.359-1.75V4.913h-.213c-.226 0-.412-.34-.412-.745V3.41c0-.418.2-.745.412-.745h.332v-.261a1.17 1.17 0 0 1 .383-.812 1.2 1.2 0 0 1 .854-.312h2.659c.315-.01.622.101.853.312.232.21.37.502.383.812v.274zM15 23.28v17m18-17v17m19-17v17" stroke="#000" stroke-width="1.2pt" stroke-linecap="round" stroke-linejoin="round"/>
</g>`

    const symbolAcousticalNoise = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M68.638 45.827a41.53 41.53 0 0 0-1.166-34.626m9.63 38.308a50.91 50.91 0 0 0-1.428-42.54M59.952 42.722a33.53 33.53 0 0 0-.93-27.892M49.353.877v57.842L26.688 44.858H1.075V15.039h25.6L49.34.877z" stroke="#000" stroke-width="1.2pt" stroke-linecap="round" stroke-linejoin="round"/>
</g>`

    const symbolFreeze = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M23.675 1v52.91M15.979 4.933l7.572 7.85 7.834-8.112m0 44.702L23.8 41.52l-7.82 8.113M1.801 14.379 46.06 40.82M1.221 23.261l10.322-2.873-2.86-11.11m37.446 22.371-10.322 2.874 2.86 11.11M1.801 40.655 46.06 14.214M8.904 45.633l2.763-10.753L1 31.91M38.446 9.539 35.683 20.29l10.667 2.97" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
</g>`

    const symbolChillCompartment = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M4.32 15.675h19.807M3.947 7.877 1 15.4v38.51h26.46V15.18l-2.946-7.303zM4.32 1v6.877h19.807V1z" stroke="#231F20" stroke-width="1.59792" stroke-linejoin="round"/>
</g>`

    const capacityFreezeUnfrozen = (capRefrNet: number | 'XYZ' = 'XYZ', capFreezeNet: number | null | 'XYZ' = 'XYZ') =>
      capFreezeNet
        ? `${symbolFreeze(mmToPx(25.5 - 12 / 2), mmToPx(133.5))}
<text x="${mmToPx(25.5)}" y="${mmToPx(154.5)}" fill="#000" font-family="Verdana" text-anchor="middle">
  <tspan font-size="16pt" font-weight="bold" >${escapeXml(capFreezeNet)}</tspan><tspan font-size="12pt"> L</tspan>
</text>
${symbolChillCompartment(mmToPx(70.5 - 7 / 2), mmToPx(133.5))}
<text x="${mmToPx(70.5)}" y="${mmToPx(154.5)}" fill="#000" font-family="Verdana" text-anchor="middle">
  <tspan font-size="16pt" font-weight="bold" >${escapeXml(capRefrNet)}</tspan><tspan font-size="12pt"> L</tspan>
</text>`
        : `${symbolChillCompartment(mmToPx(48 - 7 / 2), mmToPx(133.5))}
<text x="${mmToPx(96 / 2)}" y="${mmToPx(154.5)}" fill="#000" font-family="Verdana" text-anchor="middle">
  <tspan font-size="16pt" font-weight="bold" >${escapeXml(capRefrNet)}</tspan><tspan font-size="12pt"> L</tspan>
</text>`

    const fridgesAndFreezers = (capRefrNet: number | 'XYZ' = 'XYZ', capFreezeNet: number | null | 'XYZ' = 'XYZ', noise: number | 'XY' = 'XY', noiseClass: string = 'A') => `${capacityFreezeUnfrozen(
      capRefrNet,
      capFreezeNet
    )}
${symbolAcousticalNoise(mmToPx(48 - 21 / 2), mmToPx(161.5))}
<text x="${mmToPx(49.3)}" y="${mmToPx(171)}" fill="#000" font-family="Verdana" text-anchor="end">
  <tspan font-size="12pt" font-weight="bold">${escapeXml(noise)}</tspan><tspan font-size="9pt">dB</tspan>
</text>
<text x="${mmToPx(48)}" y="${mmToPx(182.5)}" fill="#000" font-family="Verdana" text-anchor="middle">
  ${['A', 'B', 'C', 'D'].map(cls => `<tspan font-size="${cls === noiseClass ? '16pt' : '10pt'}" ${cls === noiseClass ? ' font-weight="bold"' : ''}>${cls}</tspan>`).join('')}
</text>`

    const wineStorage = (capBottles: number | null | 'XYZ' = 'XYZ', noiseEmissions: number | 'XY' = 'XY', noiseEmissionsClass: string = 'A') => `${symbolWineStorage(mmToPx(48 - 14 / 2), mmToPx(133.5))}
<text x="${mmToPx(48)}" y="${mmToPx(154.5)}" fill="#000" font-family="Verdana" text-anchor="middle">
  <tspan font-size="16pt" font-weight="bold" >${escapeXml(capBottles)}</tspan>
</text>
${symbolAcousticalNoise(mmToPx(48 - 21 / 2), mmToPx(161.5))}
<text x="${mmToPx(49.3)}" y="${mmToPx(171)}" fill="#000" font-family="Verdana" text-anchor="end">
  <tspan font-size="12pt" font-weight="bold">${escapeXml(noiseEmissions)}</tspan><tspan font-size="9pt">dB</tspan>
</text>
<text x="${mmToPx(48)}" y="${mmToPx(182.5)}" fill="#000" font-family="Verdana" text-anchor="middle">
  ${['A', 'B', 'C', 'D'].map(cls => `<tspan font-size="${cls === noiseEmissionsClass ? '16pt' : '10pt'}" ${cls === noiseEmissionsClass ? ' font-weight="bold"' : ''}>${cls}</tspan>`).join('')}
</text>`

    return `${Boolean(capBottles) ? wineStorage(capBottles, noise, noiseClass) : fridgesAndFreezers(capRefrNet, capFreezeNet, noise, noiseClass)}
<text transform="translate(${mmToPx(96 - 3 - 2)} ${mmToPx(192 - 3)}) rotate(90)" fill="#000" font-family="Verdana" font-size="6pt" text-anchor="end">
  2019/2016
</text>`
  }
}

export interface RefrigeratingAppliancesData extends EnergyLabelBaseData, QRCodeDataUrlData {
  consolidatedEnergyConsAnnual: number
  noise: number
  noiseClass: string
}
export interface WineStorageAppliancesData extends RefrigeratingAppliancesData {
  capBottles: number | null
}

export interface HouseholdFridgesAndFreezersData extends RefrigeratingAppliancesData {
  capFreezeNet: number | null
  capRefrNet: number
}
