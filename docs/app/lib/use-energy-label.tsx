import { useCallback, useEffect, useState } from 'react'
import { createEnergyLabel, type TemplateName, type TemplatesData, appendTo, download } from 'energy-label'

export function useEnergyLabel<T extends TemplateName>(template: T, data: Partial<TemplatesData[T]>) {
  const [svg, setSvg] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    createEnergyLabel(template, data)
      .then(setSvg)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [template, data])

  const renderTo = useCallback(
    (element: HTMLElement) => {
      appendTo(element, svg)
    },
    [svg]
  )

  const handleDownload = useCallback(
    (filename: string) => {
      download(svg, filename)
    },
    [svg]
  )

  return { svg, loading, error, renderTo, download: handleDownload }
}
