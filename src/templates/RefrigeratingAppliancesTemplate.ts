import { mmToPx } from '../utils'
import { TemplateCommon } from './TemplateCommon'
import { Template } from './Template'
import type { EnergyLabelBaseData, QRCodeDataUrlData } from '../defintions'

export class RefrigeratingAppliancesTemplate extends Template<WineStorageAppliancesData & HouseholdFridgesAndFreezersData> {
  protected getWidth(): number {
    return mmToPx(96)
  }

  protected getHeight(): number {
    return mmToPx(192)
  }

  protected createBackground(): string {
    const width = this.getWidth()
    const height = this.getHeight()

    return `<rect width="${width}" height="${height}" fill="white" />`
  }

  protected async createHeader() {
    const { flagOrigin, eprelRegistrationNumber, supplierName, modelName } = this.data ?? {}

    const generatedQrCodeImage = await this.generateQRCodeDataUrl(eprelRegistrationNumber as string)

    return `${TemplateCommon.flag(mmToPx(3), mmToPx(3), mmToPx(21), flagOrigin)}
${TemplateCommon.logo(mmToPx(26), mmToPx(5), mmToPx(10))}
${TemplateCommon.qrCodeImage(mmToPx(79), mmToPx(3), mmToPx(14), generatedQrCodeImage)}
<text id="supplier-name" fill="black" font-family="Verdana" font-size="12" font-weight="bold">
  <tspan x="${mmToPx(3)}" y="${mmToPx(25)}">${supplierName || "Supplier's Name"}</tspan>
</text>
<text id="model-identifier" fill="black" font-family="Verdana" font-size="12" text-anchor="end">
  <tspan x="${mmToPx(93)}" y="${mmToPx(25)}">${modelName || 'Model Identifier'}</tspan>
</text>
<path d="M${mmToPx(3)} ${mmToPx(27)}H${mmToPx(93)}" stroke="black" stroke-width="0.5pt" />`
  }

  protected createEfficiencyScale(): string {
    const efficiencyRating = this.data?.efficiencyRating ?? 'A'
    const widthsInMm = [19, 25, 29, 32, 36, 40, 44]

    return `
    <g transform="translate(${mmToPx(3)}, ${mmToPx(31)})">
      ${Object.keys(TemplateCommon.EFFICIENCY_SCALE_COLORS)
        .map(
          (cls, index) => `
          <path 
            d="M0,${index * mmToPx(8.5 + 1.5)} H${mmToPx(widthsInMm[index])} L${mmToPx(widthsInMm[index]) + mmToPx(4)},${index * mmToPx(8.5 + 1.5) + mmToPx(4.25)} L${mmToPx(widthsInMm[index])},${
            index * mmToPx(8.5 + 1.5) + mmToPx(8.5)
          } H0 Z" 
            fill="${TemplateCommon.EFFICIENCY_SCALE_COLORS[cls]}" 
          />
          <text x="${mmToPx(3)}" y="${index * mmToPx(8.5 + 1.5) + mmToPx(8.5 + 1.5)}" transform="translate(0, -14)" font-family="Calibri" font-size="19pt" font-weight="bold" fill="white">${cls}</text>
          ${
            cls === efficiencyRating
              ? `<g transform="translate(0,${mmToPx(-6 + 8.5 / 2)})">
                <g transform="translate(0,${index * mmToPx(8.5 + 1.5)})">
                  <polygon points="${mmToPx(67)},${mmToPx(6)} ${mmToPx(75)},0 ${mmToPx(90)},0 ${mmToPx(90)},${mmToPx(12)} ${mmToPx(75)},${mmToPx(12)}" fill="black" />
                  <text x="${mmToPx(79)}" y="${mmToPx(9.5)}" font-size="33pt" font-weight="bold" fill="white" font-family="Calibri">${cls}</text>
                </g>
              </g>`
              : ''
          }
        `
        )
        .join('')}
    </g>
    <path d="M${mmToPx(3)} ${mmToPx(103.5)}H${mmToPx(93)}" stroke="black" stroke-width="0.5pt" />
  `
  }

  protected createConsumption(): string {
    const annualEnergyConsumption = this.data?.annualEnergyConsumption ?? 'XYZ'

    return `<text x="${mmToPx(48)}" y="${mmToPx(117.5)}" fill="black" font-family="Verdana" text-anchor="middle">
  <tspan font-size="28pt" font-weight="bold">${annualEnergyConsumption}</tspan> <tspan font-size="18pt">kWh/annum</tspan>
</text>
<path d="M${mmToPx(3)} ${mmToPx(123.5)}H${mmToPx(93)}" stroke="black" stroke-width="0.5pt" />`
  }

  protected createFeatures(): string {
    const { bottleCapacity, noiseEmissions, noiseEmissionsClass, chillVolume, frozenVolume } = this.data ?? {}

    const symbolWineStorage = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path
    d="M10.6657 2.65309H10.8784C11.1045 2.65309 11.2906 2.99288 11.2906 3.39799V4.15598C11.2906 4.57416 11.1045 4.90084 10.8784 4.90084H10.6524V12.964C10.6524 14.5845 11.0114 14.7151 11.0114 14.7151C12.1166 14.951 13.1097 15.5436 13.8326 16.3985C14.5554 17.2535 14.9664 18.3216 15 19.4328V23.6016C15 23.6016 13.7635 24.4902 5.04179 24.4902V39.6102C8.37499 39.9423 11.7413 39.7214 15 38.9568V49.8819C15 49.8819 13.5242 51.2802 7.82052 51.2802C3.0076 51.2018 1 49.8819 1 49.8819V19.4459C1.03362 18.3347 1.44458 17.2666 2.16742 16.4116C2.89026 15.5567 3.88339 14.9641 4.9886 14.7282C4.9886 14.7282 5.34758 14.5975 5.34758 12.9771V4.91392H5.12156C4.89553 4.91392 4.7094 4.57413 4.7094 4.16902V3.41107C4.7094 2.99289 4.89553 2.66617 5.12156 2.66617H5.45394V2.40479C5.46777 2.0951 5.60543 1.80331 5.83697 1.59285C6.06851 1.38239 6.37522 1.2703 6.69041 1.28094H9.34948C9.66466 1.2703 9.97138 1.38239 10.2029 1.59285C10.4345 1.80331 10.5721 2.0951 10.5859 2.40479V2.67925L10.6657 2.65309Z"
    stroke="black"
    stroke-width="1.2pt"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M28.6657 2.65309H28.8785C29.1045 2.65309 29.2906 2.99288 29.2906 3.39799V4.15598C29.2906 4.57416 29.1045 4.90084 28.8785 4.90084H28.6524V12.964C28.6524 14.5845 29.0114 14.7151 29.0114 14.7151C30.1166 14.951 31.1097 15.5436 31.8326 16.3985C32.5554 17.2535 32.9664 18.3216 33 19.4328V23.6016C33 23.6016 31.7635 24.4902 23.0418 24.4902V39.6102C26.375 39.9426 29.7413 39.7217 33 38.9568V49.8819C33 49.8819 31.5242 51.2802 25.8205 51.2802C21.0076 51.2018 19 49.8819 19 49.8819V19.4459C19.0336 18.3347 19.4446 17.2666 20.1674 16.4116C20.8903 15.5567 21.8834 14.9641 22.9886 14.7282C22.9886 14.7282 23.3476 14.5975 23.3476 12.9771V4.91392H23.1216C22.8955 4.91392 22.7094 4.57413 22.7094 4.16902V3.41107C22.7094 2.99289 22.9088 2.66617 23.1216 2.66617H23.4539V2.40479C23.4678 2.0951 23.6054 1.80331 23.837 1.59285C24.0685 1.38239 24.3752 1.2703 24.6904 1.28094H27.3495C27.6647 1.2703 27.9714 1.38239 28.2029 1.59285C28.4345 1.80331 28.5721 2.0951 28.586 2.40479V2.67925L28.6657 2.65309Z"
    stroke="black"
    stroke-width="1.2pt"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M47.6657 2.65309H47.8784C48.1045 2.65309 48.2906 2.99288 48.2906 3.39799V4.15598C48.2906 4.57416 48.1045 4.90084 47.8784 4.90084H47.6524V12.964C47.6524 14.5845 48.0114 14.7151 48.0114 14.7151C49.1166 14.951 50.1097 15.5436 50.8326 16.3985C51.5554 17.2535 51.9664 18.3216 52 19.4328V23.6016C52 23.6016 50.7635 24.4902 42.0418 24.4902V39.6102C45.375 39.9426 48.7413 39.7217 52 38.9568V49.8819C52 49.8819 50.5242 51.2802 44.8205 51.2802C40.0076 51.2018 38 49.8819 38 49.8819V19.4459C38.0336 18.3347 38.4446 17.2666 39.1674 16.4116C39.8903 15.5567 40.8834 14.9641 41.9886 14.7282C41.9886 14.7282 42.3476 14.5975 42.3476 12.9771V4.91392H42.1349C41.9088 4.91392 41.7227 4.57413 41.7227 4.16902V3.41107C41.7227 2.99289 41.9221 2.66617 42.1349 2.66617H42.4672V2.40479C42.4811 2.0951 42.6187 1.80331 42.8503 1.59285C43.0818 1.38239 43.3885 1.2703 43.7037 1.28094H46.3628C46.6779 1.2703 46.9847 1.38239 47.2162 1.59285C47.4477 1.80331 47.5854 2.0951 47.5992 2.40479V2.67925L47.6657 2.65309Z"
    stroke="black"
    stroke-width="1.2pt"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path d="M15 23.2802V40.2802" stroke="black" stroke-width="1.2pt" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M33 23.2802V40.2802" stroke="black" stroke-width="1.2pt" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M52 23.2802V40.2802" stroke="black" stroke-width="1.2pt" stroke-linecap="round" stroke-linejoin="round" />
</g>`

    const symbolAcousticalNoise = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M68.6381 45.8273C70.9479 40.3119 72.0396 34.3628 71.8383 28.3866C71.6371 22.4105 70.1477 16.5483 67.4721 11.2007M77.1015 49.5088C79.9471 42.735 81.2928 35.4256 81.0463 28.0825C80.7998 20.7394 78.9669 13.5367 75.6735 6.96903M59.952 42.7223C61.8093 38.2791 62.6876 33.4878 62.5271 28.6747C62.3666 23.8615 61.171 19.1394 59.0218 14.8298M49.3531 0.876961V58.7189L26.6879 44.8578H1.07501V15.0394H26.6748L49.34 0.876961H49.3531Z" stroke="black" stroke-width="1.2pt" stroke-linecap="round" stroke-linejoin="round"/>
</g>`

    const symbolFreeze = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M23.675 1V53.91" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.9785 4.93251L23.5507 12.7837L31.3854 4.67126" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M31.3854 49.3725L23.7994 41.5212L15.9785 49.6337" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.80139 14.3788L46.0598 40.82" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.22107 23.2612L11.543 20.3875L8.68267 9.27751" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M46.1289 31.6487L35.807 34.5225L38.6673 45.6325" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.80139 40.655L46.0598 14.2138" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.90377 45.6325L11.6673 34.88L1 31.91" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M38.4462 9.53875L35.6826 20.2912L46.35 23.2612" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
</g>`

    const symbolChillCompartment = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M4.31961 15.675H24.1266M3.94615 7.87679L1 15.4V53.91H27.46V15.1799L24.5138 7.87679H3.94615ZM4.31961 1V7.87679H24.1266V1H4.31961Z" stroke="#231F20" stroke-width="1.59792" stroke-linejoin="round"/>
</g>`

    const fridgesAndFreezers = (chillVolume: number | 'XYZ' = 'XYZ', frozenVolume: number | 'XYZ' = 'XYZ', noiseEmissions: number | 'XY' = 'XY', noiseEmissionsClass: string = 'A') => `${symbolFreeze(
      mmToPx(25.5 - 12 / 2),
      mmToPx(133.5)
    )}
<text x="${mmToPx(25.5)}" y="${mmToPx(154.5)}" fill="black" font-family="Verdana" text-anchor="middle">
  <tspan font-size="16pt" font-weight="bold" >${frozenVolume}</tspan><tspan font-size="12pt"> L</tspan>
</text>
${symbolChillCompartment(mmToPx(70.5 - 7 / 2), mmToPx(133.5))}
<text x="${mmToPx(70.5)}" y="${mmToPx(154.5)}" fill="black" font-family="Verdana" text-anchor="middle">
  <tspan font-size="16pt" font-weight="bold" >${chillVolume}</tspan><tspan font-size="12pt"> L</tspan>
</text>
${symbolAcousticalNoise(mmToPx(48 - 21 / 2), mmToPx(161.5))}
<text x="${mmToPx(49.3)}" y="${mmToPx(171)}" fill="black" font-family="Verdana" text-anchor="end">
  <tspan font-size="12pt" font-weight="bold">${noiseEmissions}</tspan><tspan font-size="9pt">dB</tspan>
</text>
<text x="${mmToPx(48)}" y="${mmToPx(182.5)}" fill="black" font-family="Verdana" text-anchor="middle">
  ${['A', 'B', 'C', 'D'].map(cls => `<tspan font-size="${cls === noiseEmissionsClass ? '16pt' : '10pt'}" font-weight="${cls === noiseEmissionsClass ? 'bold' : 'normal'}">${cls}</tspan>`).join('')}
</text>`

    const wineStorage = (bottleCapacity: number | 'XYZ' = 'XYZ', noiseEmissions: number | 'XY' = 'XY', noiseEmissionsClass: string = 'A') => `${symbolWineStorage(mmToPx(48 - 14 / 2), mmToPx(133.5))}
<text x="${mmToPx(48)}" y="${mmToPx(154.5)}" fill="black" font-family="Verdana" text-anchor="middle">
  <tspan font-size="16pt" font-weight="bold" >${bottleCapacity}</tspan>
</text>
${symbolAcousticalNoise(mmToPx(48 - 21 / 2), mmToPx(161.5))}
<text x="${mmToPx(49.3)}" y="${mmToPx(171)}" fill="black" font-family="Verdana" text-anchor="end">
  <tspan font-size="12pt" font-weight="bold">${noiseEmissions}</tspan><tspan font-size="9pt">dB</tspan>
</text>
<text x="${mmToPx(48)}" y="${mmToPx(182.5)}" fill="black" font-family="Verdana" text-anchor="middle">
  ${['A', 'B', 'C', 'D'].map(cls => `<tspan font-size="${cls === noiseEmissionsClass ? '16pt' : '10pt'}" font-weight="${cls === noiseEmissionsClass ? 'bold' : 'normal'}">${cls}</tspan>`).join('')}
</text>`

    return `${Boolean(bottleCapacity) ? wineStorage(bottleCapacity, noiseEmissions, noiseEmissionsClass) : fridgesAndFreezers(chillVolume, frozenVolume, noiseEmissions, noiseEmissionsClass)}
<text transform="translate(${mmToPx(96 - 3 - 2)} ${mmToPx(192 - 3)}) rotate(90)" fill="black" font-family="Verdana" font-size="6pt" text-anchor="end">
  2019/2016
</text>`
  }
}

export interface RefrigeratingAppliancesData extends EnergyLabelBaseData, QRCodeDataUrlData {
  annualEnergyConsumption: number
  noiseEmissions: number
  noiseEmissionsClass: string
}
export interface WineStorageAppliancesData extends RefrigeratingAppliancesData {
  bottleCapacity: number
}

export interface HouseholdFridgesAndFreezersData extends RefrigeratingAppliancesData {
  chillVolume: number
  frozenVolume: number
}
