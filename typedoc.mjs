/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  plugin: ['varvara-typedoc-theme'],
  theme: 'varvara-css',
  includeVersion: true,
  entryPoints: ['src/index.ts'],
  out: 'docs_html',
  name: 'EnergyLabel Documentation',
  projectDocuments: ['docs/**/*.md'],
  groupOrder: ['Getting Started', 'Guides', 'Classes', 'Functions', 'Interfaces', 'Type Aliases', '*'],
  navigationLinks: {
    'GitHub repository': 'https://github.com/marcmarine/energy-label/tree/beta',
    'Figma files': 'https://www.figma.com/community/file/1487367561346990079/energy-label-designs',
    'Studio (beta) ✨': 'https://studio.label.energy'
  },
  navigation: {
    includeGroups: true
  }
}

export default config
