/** Wraps the label sections, in drawing order, in a compact SVG document. */
export function renderSvg(
  width: number,
  height: number,
  sections: string[],
): string {
  const content = sections.join('')

  return compactMarkup(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${content}</svg>`,
  )
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
