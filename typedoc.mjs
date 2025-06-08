/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  plugin: ['varvara-typedoc-theme'],
  theme: 'varvara-css',
  includeVersion: true,
  entryPoints: ['src/index.ts'],
  out: 'docs_html',
  navigation: {
    includeGroups: true
  }
}

export default config
