import type { TemplateName } from './defintions'

type GroupInformation = {
  urlCode: string
  name: string
  regulation: string
}

export const PRODUCT_GROUPS: Record<Exclude<TemplateName, 'arrow'>, GroupInformation> = {
  smartphones: {
    urlCode: 'smartphonestablets20231669',
    name: 'Smartphones and slate tablets',
    regulation: '2023/1669'
  },
  'refrigerating-appliances': {
    urlCode: 'refrigeratingappliances2019',
    name: 'Refrigerating appliances',
    regulation: '2019/2016'
  }
}
