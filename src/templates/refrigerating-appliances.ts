import { html, svg } from 'lit-html'
import { mmToPx } from '../utils'
import type { EnergyLabelOptions, FlagOriginOption } from '.'

export interface RefrigeratingAppliancesOption extends EnergyLabelOptions {
  annualEnergyConsumption: number
  noiseEmissions: number
  noiseEmissionsClass: string
}
export interface WineStorageAppliancesOptions extends RefrigeratingAppliancesOption {
  bottleCapacity: number
}

export interface HouseholdFridgesAndFreezersOptions extends RefrigeratingAppliancesOption {
  chillVolume: number
  frozenVolume: number
}

const efficiencyScale = (efficiencyRating: string = 'A') => {
  const classes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const colors = ['#00A651', '#50B848', '#BFD730', '#FFF200', '#FDB913', '#F37021', '#ED1C24']
  const widthsInMm = [19, 25, 29, 32, 36, 40, 44]

  return svg`
    <g transform="translate(${mmToPx(3)}, ${mmToPx(31)})">
      ${classes.map(
        (cls, index) => svg`
          <path 
            d="M0,${index * mmToPx(8.5 + 1.5)} H${mmToPx(widthsInMm[index])} L${mmToPx(widthsInMm[index]) + mmToPx(4)},${index * mmToPx(8.5 + 1.5) + mmToPx(4.25)} L${mmToPx(widthsInMm[index])},${
          index * mmToPx(8.5 + 1.5) + mmToPx(8.5)
        } H0 Z" 
            fill="${colors[index]}" 
          />
          <text x="${mmToPx(3)}" y="${index * mmToPx(8.5 + 1.5) + mmToPx(8.5 + 1.5)}" transform="translate(0, -14)" font-family="Calibri" font-size="19pt" font-weight="bold" fill="white">${cls}</text>
          ${
            cls === efficiencyRating
              ? svg`<g transform="translate(0,${mmToPx(-6 + 8.5 / 2)})">
                <g transform="translate(0,${index * mmToPx(8.5 + 1.5)})">
                  <polygon points="${mmToPx(67)},${mmToPx(6)} ${mmToPx(75)},0 ${mmToPx(90)},0 ${mmToPx(90)},${mmToPx(12)} ${mmToPx(75)},${mmToPx(12)}" fill="black" />
                  <text x="${mmToPx(79)}" y="${mmToPx(9.5)}" font-size="33pt" font-weight="bold" fill="white" font-family="Calibri">${classes[index]}</text>
                </g>
              </g>`
              : ''
          }
        `
      )}
    </g>
    <path d="M${mmToPx(3)} ${mmToPx(103.5)}H${mmToPx(93)}" stroke="black" stroke-width="0.5pt" />
  `
}

const energyConsumption = (annualEnergyConsumption: number | 'XYZ' = 'XYZ') => svg`
  <text x="${mmToPx(48)}" y="${mmToPx(117.5)}" fill="black" font-family="Verdana" text-anchor="middle">
    <tspan font-size="28pt" font-weight="bold">${annualEnergyConsumption}</tspan> <tspan font-size="18pt">kWh/annum</tspan>
  </text>
  <path d="M${mmToPx(3)} ${mmToPx(123.5)}H${mmToPx(93)}" stroke="black" stroke-width="0.5pt" />
`

const symbolWineStorage = (x: number, y: number) => svg`
<g transform="translate(${x}, ${y})">
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
</g>
`

const symbolAcousticalNoise = (x: number, y: number) => svg`
  <g transform="translate(${x}, ${y})">
    <path d="M68.6381 45.8273C70.9479 40.3119 72.0396 34.3628 71.8383 28.3866C71.6371 22.4105 70.1477 16.5483 67.4721 11.2007M77.1015 49.5088C79.9471 42.735 81.2928 35.4256 81.0463 28.0825C80.7998 20.7394 78.9669 13.5367 75.6735 6.96903M59.952 42.7223C61.8093 38.2791 62.6876 33.4878 62.5271 28.6747C62.3666 23.8615 61.171 19.1394 59.0218 14.8298M49.3531 0.876961V58.7189L26.6879 44.8578H1.07501V15.0394H26.6748L49.34 0.876961H49.3531Z" stroke="black" stroke-width="1.2pt" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`

const symbolFreeze = (x: number, y: number) => svg`
<g transform="translate(${x}, ${y})">
  <path d="M23.675 1V53.91" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.9785 4.93251L23.5507 12.7837L31.3854 4.67126" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M31.3854 49.3725L23.7994 41.5212L15.9785 49.6337" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.80139 14.3788L46.0598 40.82" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.22107 23.2612L11.543 20.3875L8.68267 9.27751" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M46.1289 31.6487L35.807 34.5225L38.6673 45.6325" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.80139 40.655L46.0598 14.2138" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.90377 45.6325L11.6673 34.88L1 31.91" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M38.4462 9.53875L35.6826 20.2912L46.35 23.2612" stroke="#231F20" stroke-width="1.59792" stroke-linecap="round" stroke-linejoin="round"/>
</g>
`

const symbolChillCompartment = (x: number, y: number) => svg`
<g transform="translate(${x}, ${y})">
  <path d="M4.31961 15.675H24.1266M3.94615 7.87679L1 15.4V53.91H27.46V15.1799L24.5138 7.87679H3.94615ZM4.31961 1V7.87679H24.1266V1H4.31961Z" stroke="#231F20" stroke-width="1.59792" stroke-linejoin="round"/>
</g>

`

const fridgesAndFreezers = (chillVolume: number | 'XYZ' = 'XYZ', frozenVolume: number | 'XYZ' = 'XYZ', noiseEmissions: number | 'XY' = 'XY', noiseEmissionsClass: string = 'A') => svg`
  ${symbolFreeze(mmToPx(25.5 - 12 / 2), mmToPx(133.5))}
  <text x="${mmToPx(25.5)}" y="${mmToPx(154.5)}" fill="black" font-family="Verdana" text-anchor="middle">
    <tspan font-size="16pt" font-weight="bold" >${chillVolume}</tspan><tspan font-size="12pt"> L</tspan>
  </text>
  ${symbolChillCompartment(mmToPx(70.5 - 7 / 2), mmToPx(133.5))}
  <text x="${mmToPx(70.5)}" y="${mmToPx(154.5)}" fill="black" font-family="Verdana" text-anchor="middle">
    <tspan font-size="16pt" font-weight="bold" >${frozenVolume}</tspan><tspan font-size="12pt"> L</tspan>
  </text>
  ${symbolAcousticalNoise(mmToPx(48 - 21 / 2), mmToPx(161.5))}
  <text x="${mmToPx(49.3)}" y="${mmToPx(171)}" fill="black" font-family="Verdana" text-anchor="end">
    <tspan font-size="12pt" font-weight="bold">${noiseEmissions}</tspan><tspan font-size="9pt">dB</tspan>
  </text>
  <text x="${mmToPx(48)}" y="${mmToPx(182.5)}" fill="black" font-family="Verdana" text-anchor="middle">
    ${['A', 'B', 'C', 'D'].map(cls => svg`<tspan font-size="${cls === noiseEmissionsClass ? '16pt' : '10pt'}" font-weight="${cls === noiseEmissionsClass ? 'bold' : 'normal'}">${cls}</tspan>`)}
  </text>
`

const wineStorage = (bottleCapacity: number | 'XYZ' = 'XYZ', noiseEmissions: number | 'XY' = 'XY', noiseEmissionsClass: string = 'A') => svg`
  ${symbolWineStorage(mmToPx(48 - 14 / 2), mmToPx(133.5))}
  <text x="${mmToPx(48)}" y="${mmToPx(154.5)}" fill="black" font-family="Verdana" text-anchor="middle">
    <tspan font-size="16pt" font-weight="bold" >${bottleCapacity}</tspan>
  </text>
  ${symbolAcousticalNoise(mmToPx(48 - 21 / 2), mmToPx(161.5))}
  <text x="${mmToPx(49.3)}" y="${mmToPx(171)}" fill="black" font-family="Verdana" text-anchor="end">
    <tspan font-size="12pt" font-weight="bold">${noiseEmissions}</tspan><tspan font-size="9pt">dB</tspan>
  </text>
  <text x="${mmToPx(48)}" y="${mmToPx(182.5)}" fill="black" font-family="Verdana" text-anchor="middle">
    ${['A', 'B', 'C', 'D'].map(cls => svg`<tspan font-size="${cls === noiseEmissionsClass ? '16pt' : '10pt'}" font-weight="${cls === noiseEmissionsClass ? 'bold' : 'normal'}">${cls}</tspan>`)}
  </text>
`

const regulationNumber = () => svg`
<text transform="translate(${mmToPx(96 - 3 - 2)} ${mmToPx(192 - 3)}) rotate(90)" fill="black" font-family="Verdana" font-size="6pt" text-anchor="end">
  2019/2016
</text>
`

export const content = (efficiencyRating?: string, annualEnergyConsumption?: number, chillVolume?: number, frozenVolume?: number, bottleCapacity?: number, noiseEmissions?: number, noiseEmissionsClass?: string) => svg`
  ${efficiencyScale(efficiencyRating)}
  ${energyConsumption(annualEnergyConsumption)}
  ${Boolean(bottleCapacity) ? wineStorage(bottleCapacity, noiseEmissions, noiseEmissionsClass) : fridgesAndFreezers(chillVolume, frozenVolume, noiseEmissions, noiseEmissionsClass)}
  ${regulationNumber()}
`

const flag = (origin: FlagOriginOption) =>
  origin === 'EU'
    ? svg`
  <path d="M0 53.062H79.37V0H0V53.062Z" fill="#034EA2"/>
  <path d="M38.7951 8.66706L39.6173 6L40.4262 8.66706H43.1845L40.9699 10.4006L41.8186 13.1344L39.6173 11.4541L37.416 13.1344L38.2912 10.4006L36.0501 8.66706H38.7951Z" fill="#FFF200"/>
  <path d="M38.9667 43.8997L39.8543 41.226L40.7138 43.8997H43.6304L41.2774 45.6313L42.1932 48.3604L39.8543 46.6842L37.5013 48.3604L38.4312 45.6313L36.0501 43.8997H38.9667Z" fill="#FFF200"/>
  <path d="M47.7131 41.6702L48.5485 38.9965L49.3574 41.6702H52.1024L49.8879 43.388L50.7498 46.1309L48.5485 44.4408L46.3339 46.1309L47.2092 43.388L44.9681 41.6702H47.7131Z" fill="#FFF200"/>
  <path d="M47.7131 10.9032L48.5485 8.22949L49.3574 10.9032H52.1024L49.8879 12.6209L50.7498 15.3639L48.5485 13.6738L46.3339 15.3639L47.2092 12.6209L44.9681 10.9032H47.7131Z" fill="#FFF200"/>
  <path d="M54.4015 17.4245L55.2237 14.918L56.0326 17.4245H58.7909L56.5763 19.035L57.425 21.6065L55.2237 20.035L53.0224 21.6065L53.8976 19.035L51.6565 17.4245H54.4015Z" fill="#FFF200"/>
  <path d="M54.4015 35.2556L55.2237 32.7539L56.0326 35.2556H58.7909L56.5763 36.8759L57.425 39.4424L55.2237 37.861L53.0224 39.4424L53.8976 36.8759L51.6565 35.2556H54.4015Z" fill="#FFF200"/>
  <path d="M56.6178 26.3295L57.4532 23.836L58.2622 26.3295H61.0204L58.8059 27.9529L59.6546 30.5244L57.4532 28.94L55.2519 30.5244L56.1139 27.9529L53.886 26.3295H56.6178Z" fill="#FFF200"/>
  <path d="M29.8771 10.8893L30.7126 8.22949L31.5215 10.8893H34.2665L32.0519 12.6209L32.9139 15.3639L30.7126 13.6738L28.498 15.3639L29.3732 12.6209L27.1321 10.8893H29.8771Z" fill="#FFF200"/>
  <path d="M23.6345 17.5865L24.47 14.918L25.2789 17.5865H28.0239L25.8093 19.3148L26.6713 22.0524L24.47 20.3656L22.2554 22.0524L23.1306 19.3148L20.8895 17.5865H23.6345Z" fill="#FFF200"/>
  <path d="M21.405 26.3377L22.2405 23.836L23.0494 26.3377H25.7944L23.5798 27.9579L24.4418 30.5244L22.2405 28.9431L20.0259 30.5244L20.9011 27.9579L18.66 26.3377H21.405Z" fill="#FFF200"/>
  <path d="M23.6345 35.2556L24.47 32.7539L25.2789 35.2556H28.0239L25.8093 36.8759L26.6713 39.4424L24.47 37.861L22.2554 39.4424L23.1306 36.8759L20.8895 35.2556H23.6345Z" fill="#FFF200"/>
  <path d="M30.0487 41.665L30.9223 38.9965L31.7958 41.665H34.7124L32.3594 43.3933L33.2612 46.1309L30.9223 44.4441L28.5834 46.1309L29.5133 43.3933L27.1321 41.665H30.0487Z" fill="#FFF200"/>
`
    : svg`
  <path fill="#034EA2" d="M.64.045v53.01h79.49V.044H.64Z"/>
  <path fill="#fff" fill-rule="evenodd" d="M31.115 26.55-1.815 4.591 3.095-4.5l37.291 24.868L77.677-4.5l4.907 9.091L49.655 26.55l32.93 21.959-4.908 9.091-37.292-24.868L3.094 57.6l-4.908-9.091L31.115 26.55Z" clip-rule="evenodd"/>
  <mask id="a" width="81" height="54" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:luminance">
    <path fill="#fff" d="M40.385 26.55H80.13v26.504L40.386 26.55Zm0 0v26.504H.64L40.385 26.55Zm0 0H.64V.045L40.385 26.55Zm0 0V.045H80.13L40.386 26.55Z"/>
  </mask>
  <g mask="url(#a)">
    <path fill="#DA2E33" fill-rule="evenodd" d="M34.205 26.55-.996 3.076l3.272-6.06 38.11 25.413L78.494-2.985l3.271 6.06-35.2 23.475 35.2 23.474-3.271 6.06-38.11-25.413-38.11 25.414-3.271-6.06L34.205 26.55Z" clip-rule="evenodd"/>
  </g>
  <path fill="#DA2E33" d="M-.95 19.482h34.976V-1.72h12.718v21.203H81.72v14.136H46.744V54.82H34.026V33.618H-.95V19.482Z"/>
  <path fill="#fff" fill-rule="evenodd" d="M32.436-3.488h15.898v21.203H83.31v17.67H48.334v21.203H32.436V35.385H-2.54v-17.67h34.976V-3.488Zm3.18 3.533V21.25H.64v10.602h34.976v21.203h9.538V31.851H80.13V21.249H45.155V.045h-9.54Z" clip-rule="evenodd"/>
`

const header = (flagOrigin: FlagOriginOption = 'EU', supplierOrTrademark: string = "Supplier's name", modelIdentifier: string = 'Model Identifier', qrCodeDataUrl: string = '1234567') => svg`
<g id="EU-branding">
  <g transform="translate(${mmToPx(3)}, ${mmToPx(3)})">
    ${flag(flagOrigin)}
  </g>
  <g id="logo">
    <path d="M98.2699 56.355V18.4991H124.101V26.0569H106.145V33.2815H123.357V40.6661H106.145V48.9571H124.101V56.355H98.2699Z" fill="#034EA2" />
    <path d="M152.879 43.9985V18.4991H160.621V56.355H151.376L135.851 31.1888V56.355H128.109V18.4991H137.341L152.879 43.9985Z" fill="#034EA2" />
    <path d="M165.074 56.355V18.4991H190.46V26.0569H172.818V33.2815H189.742V40.6661H172.818V48.9571H190.46V56.355H165.074Z" fill="#034EA2" />
    <path
      d="M194.468 56.355V18.5024H212.404C214.208 18.4698 216.009 18.676 217.758 19.1157C219.136 19.4684 220.406 20.1555 221.452 21.1157C222.477 22.1315 223.22 23.3949 223.607 24.7823C224.109 26.5921 224.343 28.4651 224.303 30.3422C224.304 31.4926 224.228 32.6417 224.076 33.7821C223.946 34.7741 223.74 35.7547 223.46 36.7154C223.109 37.7088 222.488 38.5857 221.667 39.2487C222.42 40.0571 222.982 41.0228 223.313 42.0753C223.68 43.2444 223.861 44.4636 223.848 45.6885V56.355H215.817V46.5418C215.883 46.0092 215.827 45.4686 215.653 44.9607C215.479 44.4527 215.192 43.9905 214.814 43.6086C213.862 43.0065 212.738 42.7303 211.615 42.8219H202.245V56.355H194.468ZM202.312 35.4754H211.106C212.026 35.492 212.945 35.416 213.85 35.2487C214.402 35.1536 214.933 34.9594 215.416 34.6754C215.978 34.2221 216.259 33.0754 216.259 31.2355C216.355 29.8424 216.183 28.4439 215.75 27.1156C215.416 26.3689 214.318 25.9823 212.444 25.9823H202.312V35.4621V35.4754Z"
      fill="#034EA2"
    />
    <path
      d="M241.728 35.6733H260.06C260.249 37.0986 260.343 38.1643 260.37 38.857C260.397 39.5497 260.37 40.1891 260.37 40.6953V43.7991C260.416 46.4436 259.996 49.0759 259.13 51.5785C258.648 52.9508 257.725 54.1297 256.502 54.9354C254.983 55.8465 253.271 56.3981 251.501 56.5472C250.377 56.6627 249.214 56.7382 248.01 56.7737C246.805 56.8092 245.601 56.8092 244.397 56.7737C238.376 56.7737 234.238 55.8146 231.982 53.8964C229.538 51.9071 228.316 47.9774 228.316 42.1073V39.7895C228.316 39.0035 228.316 38.191 228.316 37.3651V32.9025C228.316 28.0182 229.314 24.4082 231.309 22.0726C232.476 20.8152 233.967 19.8945 235.622 19.4084C237.712 18.7682 239.891 18.4624 242.079 18.5026H244.154C244.828 18.5026 245.525 18.5026 246.244 18.5026H250.193C253.878 18.618 256.461 19.6038 257.944 21.4598C259.626 23.7676 260.462 26.5722 260.316 29.4124V32.716H252.417C252.57 30.7238 252.36 28.7206 251.797 26.8015C251.609 26.4285 250.827 26.2021 249.425 26.1222C248.257 26.0511 247.12 26.0067 246.015 25.989H242.55C239.657 25.989 237.945 26.2909 237.415 26.8948C236.885 27.4987 236.583 29.5856 236.512 33.1556C236.512 33.5286 236.512 33.8838 236.512 34.2213C236.512 34.5543 236.512 34.9406 236.512 35.3536V37.4983V42.2938C236.512 43.2662 236.512 44.1987 236.619 45.0512C236.68 45.8513 236.811 46.6446 237.01 47.4224V47.3158C237.214 47.7526 237.524 48.1325 237.913 48.4214C238.449 48.7884 239.071 49.0132 239.72 49.0742C240.488 49.184 241.262 49.2419 242.038 49.2474C242.483 49.2474 242.955 49.2474 243.386 49.2474H246.743C247.809 49.258 248.876 49.2091 249.937 49.1008C250.539 49.0874 251.121 48.8818 251.595 48.5147C252.121 48.0618 252.39 46.5565 252.39 44.0122V43.1064H241.728V35.6733Z"
      fill="#034EA2"
    />
    <path d="M279.408 18.4991L276 29.4149L285.323 27.8651L271.982 57.2457L276 35.9484L267.063 36.3359L270.842 18.4991H279.408Z" fill="#034EA2" />
  </g>
  <image href="${qrCodeDataUrl}" x="${mmToPx(79)}" y="${mmToPx(3)}" width="${mmToPx(14)}" />
</g>
<g id="product">
  <text id="supplier-name" fill="black" font-family="Verdana" font-size="12" font-weight="bold">
    <tspan x="${mmToPx(3)}" y="${mmToPx(25)}">${supplierOrTrademark}</tspan>
  </text>
  <text id="model-identifier" fill="black" font-family="Verdana" font-size="12" text-anchor="end">
    <tspan x="${mmToPx(93)}" y="${mmToPx(25)}">${modelIdentifier}</tspan>
  </text>
  <path d="M${mmToPx(3)} ${mmToPx(27)}H${mmToPx(93)}" stroke="black" stroke-width="0.5pt" />
</g>
`

export default (
  options: Partial<
    | WineStorageAppliancesOptions &
        HouseholdFridgesAndFreezersOptions & {
          qrCodeDataUrl: string
        }
  >
) => html`<svg width="${mmToPx(96)}" height="${mmToPx(192)}" viewBox="0 0 ${mmToPx(96)} ${mmToPx(192)}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${mmToPx(96)}" height="${mmToPx(192)}" fill="white" />
  ${header(options.flagOrigin, options.supplierName, options.modelName, options.qrCodeDataUrl)}
  ${content(options.efficiencyRating, options.annualEnergyConsumption, options.chillVolume, options.frozenVolume, options.bottleCapacity, options.noiseEmissions, options.noiseEmissionsClass)}
</svg>`
