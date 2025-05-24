export const GITHUB_URL = 'https://github.com/marcmarine/energy-label'
export const GITHUB_BETA_URL = 'https://github.com/marcmarine/energy-label/tree/beta'
export const FIGMA_URL = 'https://www.figma.com/community/file/1487367561346990079'
export const NPM_URL_BETA = 'https://www.npmjs.com/package/energy-label/v/beta'
export const REGULATIONS = {
  smartphones: {
    name: 'Smartphones and Tablets',
    regulationNumber: '2023/1669',
    inputs: [
      { label: "Supplier's Name", key: 'supplierName', type: 'text' },
      { label: 'Model Identifier', key: 'modelName', type: 'text' },
      { label: 'EPREL ID', key: 'eprelRegistrationNumber', type: 'text' },
      { label: 'Efficiency class', key: 'efficiencyRating', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
      { label: 'Battery Endurance (Hours)', key: 'batteryEnduranceHours', type: 'number' },
      { label: 'Battery Endurance (Minutes)', key: 'batteryEnduranceMinutes', type: 'number' },
      { label: 'Fall Reliability Class', key: 'fallReliabilityClass', type: 'select', options: ['A', 'B', 'C', 'D', 'E'] },
      { label: 'Repairability Class', key: 'repairabilityClass', type: 'select', options: ['A', 'B', 'C', 'D', 'E'] },
      { label: 'Battery Endurance (Cycles)', key: 'batteryEnduranceInCycles', type: 'text' },
      { label: 'Ingress Protection Rating', key: 'ingressProtectionRating', type: 'text' }
    ]
  },
  'refrigerating-appliances': {
    name: 'Household refrigerating appliances',
    regulationNumber: '2019/2016',
    inputs: [
      { label: "Supplier's Name", key: 'supplierName', type: 'text' },
      { label: 'Model Identifier', key: 'modelName', type: 'text' },
      { label: 'EPREL ID', key: 'eprelRegistrationNumber', type: 'text' },
      { label: 'Efficiency class', key: 'efficiencyRating', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
      { label: 'Consumption', key: 'annualEnergyConsumption', type: 'number' },
      { label: 'Frozen Volume', key: 'frozenVolume', type: 'number' },
      { label: 'Chill Volume', key: 'chillVolume', type: 'number' },
      { label: 'Number of wine bottles', key: 'bottleCapacity', type: 'number' },
      { label: 'Airborne acoustical noise emissions', key: 'noiseEmissions', type: 'number' },
      { label: 'Noise class', key: 'noiseEmissionsClass', type: 'select', options: ['A', 'B', 'C', 'D'] }
    ]
  }
}
