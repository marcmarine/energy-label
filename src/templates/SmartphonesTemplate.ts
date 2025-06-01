import { Template } from './Template'
import { type EnergyLabelBaseData, type QRCodeDataUrlData } from '.'
import { mmToPx } from '../utils'
import { TemplateCommon } from './TemplateCommon'

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

    return `<rect width="${width}" height="${height}" fill="white" />`
  }

  protected async createHeader(): Promise<string> {
    const { flagOrigin, eprelRegistrationNumber, supplierName, modelName } = this.data ?? {}

    const generatedQrCodeImage = await this.generateQRCodeDataUrl(eprelRegistrationNumber as string)

    return `${TemplateCommon.flag(mmToPx(2), mmToPx(2), mmToPx(15), flagOrigin!)}
    ${TemplateCommon.logo(mmToPx(18.5), mmToPx(3.5), mmToPx(7))}
    ${TemplateCommon.qrCodeImage(mmToPx(56), mmToPx(2), mmToPx(10), generatedQrCodeImage)}
    <text id="supplier-name" fill="black" font-family="Verdana" font-size="7pt" font-weight="bold">
      <tspan x="${mmToPx(2)}" y="${mmToPx(18)}">${supplierName || "Supplier's Name"}</tspan>
    </text>
    <text id="model-identifier" fill="black" font-family="Verdana" font-size="7pt" text-anchor="end">
      <tspan x="${mmToPx(66)}" y="${mmToPx(18)}">${modelName || 'Model Identifier'}</tspan>
    </text>
    <path d="M${mmToPx(2)} ${mmToPx(19)}H${mmToPx(66)}" stroke="black" stroke-width="0.5pt" />`
  }

  protected createEfficiencyScale(): string {
    const efficiencyRating = this.data?.efficiencyRating ?? 'A'
    const widthsInMm = [17, 20, 23, 26, 29, 32, 35]

    return `<g transform="translate(${mmToPx(2)}, ${mmToPx(22)})">${Object.keys(TemplateCommon.EFFICIENCY_SCALE_COLORS)
      .map(
        (cls, index) => `
          <path 
            d="M0,${Number(index * mmToPx(6 + 1)).toFixed(4)} H${Number(mmToPx(widthsInMm[index]!) - mmToPx(3)).toFixed(4)} L${mmToPx(widthsInMm[index]!)},${Number(index * mmToPx(6 + 1) + mmToPx(3)).toFixed(
          2
        )} L${Number(mmToPx(widthsInMm[index]!) - mmToPx(3)).toFixed(4)},${Number(index * mmToPx(6 + 1) + mmToPx(6)).toFixed(4)} H0 Z" 
            fill="${TemplateCommon.EFFICIENCY_SCALE_COLORS[cls]}"
          />
          <text x="${mmToPx(2)}" y="${Number(index * mmToPx(6 + 1) + mmToPx(6 + 1)).toFixed(4)}" transform="translate(0, -11)" font-family="Calibri" font-size="11pt" font-weight="bold" fill="white">${cls}</text>
          ${
            cls === efficiencyRating
              ? `<g transform="translate(0, ${mmToPx(-1)})">
                <g transform="translate(0,${Number(index * mmToPx(6 + 1)).toFixed(4)})">
                  <polygon points="${mmToPx(48)},${mmToPx(4)} ${mmToPx(53.5)},0 ${mmToPx(64)},0 ${mmToPx(64)},${mmToPx(8)} ${mmToPx(53.5)},${mmToPx(8)}" fill="black" />
                  <text x="${mmToPx(58)}" y="${mmToPx(6.2)}" font-size="20pt" font-weight="bold" fill="white" font-family="Calibri" text-anchor="middle">${cls}</text>
                </g>
              </g>`
              : ''
          }
        `
      )
      .join('')}
  </g>
<path d="M${mmToPx(2)} ${mmToPx(73)}H${mmToPx(66)}" stroke="black" stroke-width="0.5pt" />`
  }

  protected createConsumption(): string {
    const { batteryEnduranceHours, batteryEnduranceMinutes } = this.data ?? {}
    const digits = String(batteryEnduranceHours ?? 'X').concat(String(batteryEnduranceMinutes ?? 'Y')).length

    const symbolBateryEndurance = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M15.1756 5.49085V29.4003C15.1756 30.2848 14.5349 31 13.7425 31H2.43314C1.64207 31 1 30.2848 1 29.4003V5.49085C1 4.60781 1.64207 3.8912 2.43314 3.8912H13.7425C14.5349 3.8912 15.1756 4.60781 15.1756 5.49085ZM4.96213 3.8912V1.95181C4.96213 1.42639 5.34412 0.999999 5.81551 0.999999H10.142C10.6134 0.999999 10.9941 1.42639 10.9941 1.95181V3.8912" fill="white"/>
  <path d="M4.96213 3.8912V1.95181C4.96213 1.42639 5.34412 0.999999 5.81551 0.999999H10.142C10.6134 0.999999 10.9941 1.42639 10.9941 1.95181V3.8912M15.1756 5.49085V29.4003C15.1756 30.2848 14.5349 31 13.7425 31H2.43314C1.64207 31 1 30.2848 1 29.4003V5.49085C1 4.60781 1.64207 3.8912 2.43314 3.8912H13.7425C14.5349 3.8912 15.1756 4.60781 15.1756 5.49085Z" stroke="black" stroke-width="1" stroke-miterlimit="10"/>
  <path d="M24.8315 19.3154C23.5176 20.6771 21.6835 21.523 19.6557 21.523C15.6584 21.523 12.4182 18.2384 12.4182 14.1877C12.4182 10.137 15.6584 6.8538 19.6557 6.8538C23.6531 6.8538 26.8932 10.137 26.8932 14.1877" fill="white"/>
  <path d="M24.8315 19.3154C23.5176 20.6771 21.6835 21.523 19.6557 21.523C15.6584 21.523 12.4182 18.2384 12.4182 14.1877C12.4182 10.137 15.6584 6.8538 19.6557 6.8538C23.6531 6.8538 26.8932 10.137 26.8932 14.1877" stroke="black" stroke-width="1" stroke-miterlimit="10"/>
  <path d="M26.9424 17.0462L29 13.3999H24.8848L26.9424 17.0462Z" fill="black"/>
  <path d="M19.9108 9.3377V14.1752L21.5105 16.6317" stroke="black" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.32678 8.5635V20.8188" stroke="black" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.3269 23.9966L11.0022 19.3022H5.65161L8.3269 23.9966Z" fill="black"/>
  <path d="M3.17749 29.1297H13.0496" stroke="black" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.17749 27.1822H13.0496" stroke="black" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
`
    return `<g transform="translate(0, ${mmToPx(73)})">
  <g transform="translate(${mmToPx(digits === 2 ? 19 : digits === 3 ? 17 : 15)}, 0)">
    ${symbolBateryEndurance(0, mmToPx(3))}
    <text id="model-identifier" x="${mmToPx(10)}" y="${mmToPx(10)}" fill="black" font-family="Verdana">
      <tspan font-weight="bold" font-size="20pt">${batteryEnduranceHours}</tspan><tspan font-size="13pt">h</tspan>
      <tspan font-weight="bold" font-size="13pt">${batteryEnduranceMinutes}</tspan><tspan font-size="9pt">min</tspan>
    </text>
  </g>
</g>
<path d="M${mmToPx(2)} ${mmToPx(88)}H${mmToPx(66)}" stroke="black" stroke-width="0.5pt" />`
  }

  protected createFeatures(): string {
    const { fallReliabilityClass, repairabilityClass, batteryEnduranceInCycles, ingressProtectionRating } = this.data ?? {}

    const fallReliabilityClassIcon = (x: number, y: number, fallReliabilityClass: string) => `
<g transform="translate(${x}, ${y})">
  ${aToEScale(fallReliabilityClass)}
  ${symbolFreeFall(18, 9)}
</g>
`

    const repairabilityClassIcon = (x: number, y: number, repairabilityClass: string) => `
<g transform="translate(${x}, ${y})">
  ${aToEScale(repairabilityClass)}
  ${symbolRepairability(16, 16)}
</g>
`

    const batteryEnduranceCyclesIcon = (x: number, y: number, batteryEnduranceInCycles: string) => `
<g transform="translate(${x}, ${y})">
  ${symbolBateryEnduranceCycles(-15.9, 0)}
  <text x="${mmToPx(0)}" y="${mmToPx(16)}" fill="black" font-family="Verdana" text-anchor="middle">
    <tspan font-size="12pt" font-weight="bold">${batteryEnduranceInCycles}</tspan><tspan font-size="10pt">x</tspan>
  </text>
</g>
`

    const ingressProtectionIcon = (x: number, y: number, ingressProtectionRating: string) => `<g transform="translate(${x}, ${y})">
  ${symbolIngressProtection(-24.64, mmToPx(2))}
  <text x="${mmToPx(0)}" y="${mmToPx(16)}" fill="black" font-family="Verdana" text-anchor="middle">
    <tspan font-size="12pt" font-weight="bold">${ingressProtectionRating}</tspan>
  </text>
</g>
`

    const aToEScale = (selectedClass: string) => `<text fill="black" font-family="Verdana">
  ${['A', 'B', 'C', 'D', 'E']
    .map(
      (cls, index) =>
        `<tspan x="${cls === selectedClass ? '-1.5' : '0'}" y="${index * 12}" font-size="${cls === selectedClass ? '12pt' : '8pt'}"  font-weight="${
          cls === selectedClass ? 'bold' : 'normal'
        }" style="alignment-baseline: ${cls === selectedClass ? 'hanging' : 'before-edge'}">${cls}</tspan>`
    )
    .join('')}
</text>`

    const symbolFreeFall = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M26.3142 21.0686L34.9275 32.4646C35.8435 33.6832 35.5995 35.4139 34.3809 36.3299L23.6435 44.4099C22.4249 45.3272 20.6942 45.0832 19.7769 43.8646L1.55553 19.6486C0.6382 18.4299 0.882201 16.6992 2.10087 15.7819L12.8395 7.7019C14.0569 6.7859 15.7875 7.0299 16.7049 8.24857L18.9035 11.1699M7.83687 15.4206L11.8329 12.4139M27.6955 35.4726C28.2835 36.2539 28.1262 37.3646 27.3449 37.9526C26.5635 38.5406 25.4529 38.3846 24.8649 37.6019C24.2769 36.8206 24.4342 35.7099 25.2155 35.1219C25.9969 34.5339 27.1075 34.6912 27.6955 35.4726Z"  stroke-width="1" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M28.1276 43.424L31.4596 43.8493L33.8703 44.1573L31.5343 44.8267C30.253 45.1933 28.9716 45.56 27.6903 45.9267C28.5103 46.3427 29.3303 46.76 30.149 47.176L32.2876 48.2627L29.893 48.1213C28.3703 48.0307 26.8463 47.9413 25.3223 47.8507C25.4596 48.576 25.5983 49.3013 25.7356 50.028L25.9383 51.1L24.993 50.5533C23.9823 49.968 22.9716 49.3827 21.9596 48.7973C21.1396 49.612 20.3183 50.4267 19.4983 51.2427L18.7356 52L18.6476 50.9293C18.5876 50.1893 18.5263 49.4507 18.4663 48.712C17.0143 49.176 15.5623 49.6413 14.1116 50.1067L11.857 50.8293L13.6263 49.2573C14.3076 48.652 14.989 48.0467 15.6703 47.4413L11.649 47.328L8.41431 47.2387L11.525 46.348C12.8063 45.9813 14.0876 45.6147 15.369 45.248C14.549 44.832 13.729 44.4147 12.909 43.9987L11.2876 43.1747L13.1023 43.0533L16.8156 42.808" stroke-width="1" stroke="black" stroke-miterlimit="8"/>
  <path d="M24.0204 24.0813V6.372M24.0204 3.724V1.29333M21.4004 16.7893V5.052"  stroke-width="1" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
`

    const symbolRepairability = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M11.1289 30.9284C9.51024 32.547 7.14891 32.9804 5.13691 32.219L8.54358 28.8137C9.06358 28.2937 9.06358 27.451 8.54358 26.9324L7.13424 25.5217C6.61424 25.003 5.77291 25.003 5.25291 25.523L1.84624 28.9284C1.08491 26.9164 1.51824 24.555 3.13691 22.9364C4.93424 21.139 7.64891 20.8044 9.77824 21.9364L22.3689 9.3457C21.2369 7.21637 21.5716 4.50304 23.3689 2.7057C24.9876 1.08704 27.3489 0.65237 29.3609 1.4137L25.9542 4.82037C25.4356 5.34037 25.4342 6.1817 25.9542 6.7017L27.3636 8.11237C27.8836 8.63104 28.7262 8.63103 29.2449 8.11103L32.6516 4.70437C33.4129 6.71637 32.9796 9.0777 31.3609 10.6964C29.5636 12.4937 26.8489 12.8297 24.7196 11.6964L12.1289 24.287C13.2609 26.4177 12.9262 29.131 11.1289 30.9284Z" stroke-width="1" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M26.5752 27.5667L15.4698 38.3653" stroke-width="1" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M30.4362 25.914L39.3935 17.1873H41.5762L45.2148 11.5167L43.0308 9.38867L37.2095 12.934V15.0607L28.2522 23.7873M17.9522 40.962C16.5308 42.346 14.2282 42.346 12.8068 40.962C11.3855 39.578 11.3855 37.334 12.8068 35.9487L24.4495 24.606C25.8708 23.222 28.1735 23.222 29.5948 24.606C31.0162 25.99 31.0162 28.2353 29.5948 29.6193L17.9522 40.962Z" stroke-width="1" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
`

    const symbolBateryEnduranceCycles = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M4.68533 10.1039V8.22385C4.68533 7.71452 5.06133 7.30118 5.524 7.30118H9.78267C10.2467 7.30118 10.6227 7.71452 10.6227 8.22385V10.1039M14.9533 11.6545V34.8318C14.9533 35.6892 14.3227 36.3825 13.5427 36.3825H2.41067C1.632 36.3825 1 35.6892 1 34.8318V11.6545C1 10.7985 1.632 10.1039 2.41067 10.1039H13.5427C14.3227 10.1039 14.9533 10.7985 14.9533 11.6545Z" stroke="black" stroke-miterlimit="10"/>
  <path d="M22.8268 10.1039V8.22385C22.8268 7.71452 23.2028 7.30118 23.6668 7.30118H27.9254C28.3894 7.30118 28.7641 7.71452 28.7641 8.22385V10.1039M32.8801 11.6545V34.8318C32.8801 35.6892 32.2494 36.3825 31.4694 36.3825H20.3374C19.5588 36.3825 18.9268 35.6892 18.9268 34.8318V11.6545C18.9268 10.7985 19.5588 10.1039 20.3374 10.1039H31.4694C32.2494 10.1039 32.8801 10.7985 32.8801 11.6545Z" stroke="black" stroke-miterlimit="10"/>
  <path d="M10.6371 40.8916C12.2611 42.5582 14.6784 43.5342 17.3051 43.3502C19.8998 43.1689 22.1344 41.8956 23.5158 40.0556" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.83457 42.9904L8.55591 39.0131L12.5346 38.7344L8.83457 42.9904Z" fill="black"/>
  <path d="M22.262 3.4808C20.638 1.81413 18.2206 0.838129 15.594 1.02213C12.9993 1.20346 10.7646 2.4768 9.3833 4.3168" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24.0645 1.38199L24.3432 5.35932L20.3645 5.63799L24.0645 1.38199Z" fill="black"/>
  <path d="M21.1284 34.266H30.8458" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 34.266H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 26.3425H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 18.4192H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 30.3043H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 22.3809H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 14.4576H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 32.285H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 24.3617H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 16.4384H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 28.3234H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 20.4001H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
  <path d="M3.26514 12.4766H12.9825" stroke="black" stroke-miterlimit="10" stroke-linejoin="round"/>
</g>
`

    const symbolIngressProtection = (x: number, y: number) => `<g transform="translate(${x}, ${y})">
  <path d="M35.2433 0.742535C34.014 2.0892 30.6807 6.05987 30.6807 9.4372C30.6807 11.9425 32.7127 13.9812 35.2113 13.9812C37.7087 13.9812 39.7407 11.9425 39.7407 9.4372C39.7407 5.48653 36.486 1.94787 35.2433 0.742535Z" fill="white"/>
  <path d="M35.2433 0.742534C34.014 2.0892 30.6807 6.05987 30.6807 9.4372C30.6807 11.9425 32.7127 13.9812 35.2113 13.9812C37.7087 13.9812 39.7407 11.9425 39.7407 9.4372C39.7407 5.48653 36.486 1.94787 35.2433 0.742534Z" stroke="black" stroke-miterlimit="10"/>
  <path d="M42.8013 3.02107C40.8347 5.24507 35.4987 11.7997 35.4987 17.3757C35.4987 21.5131 38.752 24.8797 42.7493 24.8797C46.748 24.8797 50 21.5131 50 17.3757C50 10.8544 44.7893 5.0104 42.8013 3.02107Z" fill="white"/>
  <path d="M42.8013 3.02107C40.8347 5.24507 35.4987 11.7997 35.4987 17.3757C35.4987 21.5131 38.752 24.8797 42.7493 24.8797C46.748 24.8797 50 21.5131 50 17.3757C50 10.8544 44.7893 5.01041 42.8013 3.02107Z" stroke="black" stroke-miterlimit="10"/>
  <path d="M43.928 22.1163C46.1826 21.1629 47.7946 18.6736 47.7946 15.7616L43.928 22.1163Z" fill="white"/>
  <path d="M43.928 22.1163C46.1826 21.1629 47.7946 18.6736 47.7946 15.7616" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.0124 3.69133C17.0124 4.76067 16.1457 5.62733 15.0764 5.62733C14.007 5.62733 13.1404 4.76067 13.1404 3.69133C13.1404 2.622 14.007 1.75533 15.0764 1.75533C16.1457 1.75533 17.0124 2.622 17.0124 3.69133Z" fill="black"/>
  <path d="M12.4862 23.2701C12.4862 24.1501 11.7729 24.8635 10.8929 24.8635C10.0142 24.8635 9.3009 24.1501 9.3009 23.2701C9.3009 22.3901 10.0142 21.6768 10.8929 21.6768C11.7729 21.6768 12.4862 22.3901 12.4862 23.2701Z" fill="black"/>
  <path d="M16.0394 14.3325C16.0394 15.2485 15.2967 15.9912 14.3807 15.9912C13.4634 15.9912 12.7207 15.2485 12.7207 14.3325C12.7207 13.4165 13.4634 12.6739 14.3807 12.6739C15.2967 12.6739 16.0394 13.4165 16.0394 14.3325Z" fill="black"/>
  <path d="M20.5676 22.4079C20.5676 23.2292 19.9022 23.8945 19.0809 23.8945C18.2596 23.8945 17.5942 23.2292 17.5942 22.4079C17.5942 21.5865 18.2596 20.9212 19.0809 20.9212C19.9022 20.9212 20.5676 21.5865 20.5676 22.4079Z" fill="black"/>
  <path d="M23.1352 12.5071C23.1352 13.2964 22.4952 13.9364 21.7058 13.9364C20.9165 13.9364 20.2765 13.2964 20.2765 12.5071C20.2765 11.7177 20.9165 11.0777 21.7058 11.0777C22.4952 11.0777 23.1352 11.7177 23.1352 12.5071Z" fill="black"/>
  <path d="M8.28797 9.87175C7.61197 9.73308 7.17731 9.07442 7.31464 8.39842C7.45331 7.72242 8.11331 7.28775 8.78797 7.42508C9.46397 7.56375 9.89997 8.22375 9.76131 8.89842C9.62264 9.57442 8.96397 10.0104 8.28797 9.87175Z" fill="black"/>
  <path d="M6.40418 16.7132C5.68151 17.1906 4.70951 16.9919 4.23218 16.2692C3.75618 15.5466 3.95485 14.5746 4.67751 14.0972C5.39885 13.6199 6.37218 13.8199 6.84818 14.5412C7.32551 15.2639 7.12685 16.2359 6.40418 16.7132Z" fill="black"/>
  <path d="M9.03762 4.53976C9.45495 4.53976 9.79362 4.20109 9.79362 3.78376C9.79362 3.36642 9.45495 3.02776 9.03762 3.02776C8.62028 3.02776 8.28162 3.36642 8.28162 3.78376C8.28162 4.20109 8.62028 4.53976 9.03762 4.53976Z" fill="black"/>
  <path d="M4.31325 22.6815C4.73058 22.6815 5.06925 22.3428 5.06925 21.9255C5.06925 21.5081 4.73058 21.1695 4.31325 21.1695C3.89592 21.1695 3.55725 21.5081 3.55725 21.9255C3.55725 22.3428 3.89592 22.6815 4.31325 22.6815Z" fill="black"/>
  <path d="M16.4077 9.83107C16.8251 9.83107 17.1637 9.4924 17.1637 9.07507C17.1637 8.65774 16.8251 8.31907 16.4077 8.31907C15.9904 8.31907 15.6517 8.65774 15.6517 9.07507C15.6517 9.4924 15.9904 9.83107 16.4077 9.83107Z" fill="black"/>
  <path d="M19.0534 17.7681C19.4707 17.7681 19.8094 17.4295 19.8094 17.0121C19.8094 16.5948 19.4707 16.2561 19.0534 16.2561C18.636 16.2561 18.2974 16.5948 18.2974 17.0121C18.2974 17.4295 18.636 17.7681 19.0534 17.7681Z" fill="black"/>
  <path d="M3.55739 11.3429C3.97472 11.3429 4.31339 11.0043 4.31339 10.5869C4.31339 10.1696 3.97472 9.83093 3.55739 9.83093C3.14006 9.83093 2.80139 10.1696 2.80139 10.5869C2.80139 11.0043 3.14006 11.3429 3.55739 11.3429Z" fill="black"/>
  <path d="M21.3211 5.2956C21.7384 5.2956 22.0771 4.95693 22.0771 4.5396C22.0771 4.12227 21.7384 3.7836 21.3211 3.7836C20.9037 3.7836 20.5651 4.12227 20.5651 4.5396C20.5651 4.95693 20.9037 5.2956 21.3211 5.2956Z" fill="black"/>
  <path d="M24.7227 19.2799C25.14 19.2799 25.4787 18.9412 25.4787 18.5239C25.4787 18.1065 25.14 17.7679 24.7227 17.7679C24.3053 17.7679 23.9667 18.1065 23.9667 18.5239C23.9667 18.9412 24.3053 19.2799 24.7227 19.2799Z" fill="black"/>
  <path d="M1.47853 17.7681C1.89587 17.7681 2.23453 17.4295 2.23453 17.0121C2.23453 16.5948 1.89587 16.2561 1.47853 16.2561C1.0612 16.2561 0.722534 16.5948 0.722534 17.0121C0.722534 17.4295 1.0612 17.7681 1.47853 17.7681Z" fill="black"/>
  <path d="M10.266 19.2799C10.6833 19.2799 11.022 18.9412 11.022 18.5239C11.022 18.1065 10.6833 17.7679 10.266 17.7679C9.84868 17.7679 9.51001 18.1065 9.51001 18.5239C9.51001 18.9412 9.84868 19.2799 10.266 19.2799Z" fill="black"/>
  <path d="M20.5652 1.512C20.9825 1.512 21.3212 1.17333 21.3212 0.756001C21.3212 0.338668 20.9825 1.19209e-06 20.5652 1.19209e-06C20.1479 1.19209e-06 19.8092 0.338668 19.8092 0.756001C19.8092 1.17333 20.1479 1.512 20.5652 1.512Z" fill="black"/>
  <path d="M17.5415 27.5948C17.9589 27.5948 18.2975 27.2561 18.2975 26.8388C18.2975 26.4215 17.9589 26.0828 17.5415 26.0828C17.1242 26.0828 16.7855 26.4215 16.7855 26.8388C16.7855 27.2561 17.1242 27.5948 17.5415 27.5948Z" fill="black"/>
</g>
`

    return `<g transform="translate(0, ${mmToPx(89)})">
  ${fallReliabilityClassIcon(mmToPx(10.67), mmToPx(3), fallReliabilityClass ?? 'B')}
  ${repairabilityClassIcon(mmToPx(41.6), mmToPx(3), repairabilityClass ?? 'D')}
  ${batteryEnduranceCyclesIcon(mmToPx(18), mmToPx(25), batteryEnduranceInCycles ?? 'XY00')}
  ${ingressProtectionIcon(mmToPx(50), mmToPx(25), ingressProtectionRating ?? 'IPXY')}
</g>`
  }
}

export interface SmartphonesAndTabletsData extends EnergyLabelBaseData, QRCodeDataUrlData {
  batteryEnduranceHours: number
  batteryEnduranceMinutes: number
  fallReliabilityClass: string
  repairabilityClass: string
  batteryEnduranceInCycles: string
  ingressProtectionRating: string
}
