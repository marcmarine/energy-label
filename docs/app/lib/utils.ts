import { faker } from '@faker-js/faker'

export const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1)

export const generateFakeOptions = () => ({
  common: {
    supplierName: capitalize(faker.food.fruit()),
    modelName: `${faker.helpers.replaceSymbols('##???####??')}`,
    efficiencyRating: faker.string.fromCharacters('abcdefg').toUpperCase(),
    eprelRegistrationNumber: String(faker.number.int(9999999))
  },
  smartphones: {
    batteryEnduranceHours: faker.number.int(99),
    batteryEnduranceMinutes: faker.number.int(99),
    fallReliabilityClass: faker.string.fromCharacters('abcde').toUpperCase(),
    repairabilityClass: faker.string.fromCharacters('abcde').toUpperCase(),
    batteryEnduranceInCycles: `${faker.helpers.replaceSymbols('##')}00`,
    ingressProtectionRating: `IP${faker.helpers.replaceSymbols('##')}`
  },
  'refrigerating-appliances': {
    annualEnergyConsumption: faker.number.int(999),
    bottleCapacity: 0,
    frozenVolume: faker.number.int(99),
    chillVolume: faker.number.int(99),
    noiseEmissions: faker.number.int(99),
    noiseEmissionsClass: faker.string.fromCharacters('abcd').toUpperCase()
  }
})
