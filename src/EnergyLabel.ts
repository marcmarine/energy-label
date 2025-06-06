import { templateFactory } from './templates'
import type { Template } from './templates/Template'
import type { TemplateName, TemplatesData } from './defintions'
import { SVGOptimizer } from './utils'

export default class EnergyLabel<T extends TemplateName = 'arrow'> {
  private templateFactory: Template
  private data: Partial<TemplatesData[T]>

  constructor(template: T = 'arrow' as T, data: Partial<TemplatesData[T]> = {}) {
    this.templateFactory = templateFactory(template)
    this.data = data
  }

  async generateLabel(): Promise<string> {
    let templateOptions = this.data

    const result = await this.templateFactory.generate(templateOptions)

    return SVGOptimizer.optimize(result)
  }
}
