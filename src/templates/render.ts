import { escapeXml } from '../utils'

/**
 * Wraps the label sections, in drawing order, in a compact SVG document.
 * `name` is plain text: screen readers announce it instead of the loose texts of the label (`role="img"` and `aria-label`),
 * and `<title>` shows it as a tooltip. No `id` is needed, so several labels can share a page.
 */
export function renderSvg(
  width: number,
  height: number,
  name: string,
  sections: string[],
): string {
  const content = sections.join('')
  const label = escapeXml(name)

  return compactMarkup(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" role="img" aria-label="${label}"><title>${label}</title>${content}</svg>`,
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
