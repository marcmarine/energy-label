export abstract class Template<T> {
  generate(data: Partial<T>): string {
    this.validate(data)

    const background = this.createBackground()
    const header = this.createHeader(data)
    const efficiencyScale = this.createEfficiencyScale(data)
    const consumption = this.createConsumption(data)
    const features = this.createFeatures(data)

    return this.render([
      background,
      header,
      efficiencyScale,
      consumption,
      features,
    ])
  }

  /** Throws if the data can't be drawn on the label. */
  protected validate(_data: Partial<T>): void {}

  protected createBackground(): string {
    return ''
  }

  protected createHeader(_data: Partial<T>): string {
    return ''
  }

  protected abstract createEfficiencyScale(data: Partial<T>): string

  protected createConsumption(_data: Partial<T>): string {
    return ''
  }

  protected createFeatures(_data: Partial<T>): string {
    return ''
  }

  protected abstract getWidth(): number
  protected abstract getHeight(): number

  protected render(sections: string[]): string {
    const width = this.getWidth()
    const height = this.getHeight()
    const content = sections.join('')

    return compactMarkup(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${content}</svg>`,
    )
  }
}

/**
 * Removes the indentation that the template literals add to the markup.
 * Inside tags, whitespace is collapsed. Text content is only trimmed where a line break was added
 * for readability, so user-provided values keep their spacing (they are escaped and contain no `<` or `>`).
 */
function compactMarkup(markup: string): string {
  return markup
    .split(/(<[^>]*>)/)
    .map((part) =>
      part.startsWith('<')
        ? part.replace(/\s+/g, ' ').replace(/ ?(\/?>)$/, '$1')
        : part.replace(/^\s*\n\s*|\s*\n\s*$/g, ''),
    )
    .join('')
}
