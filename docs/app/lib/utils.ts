export const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1)

export const getEliUrl = (regulation: string) => `http://data.europa.eu/eli/reg_del/${regulation.replaceAll(':', '/')}`
