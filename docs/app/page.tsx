'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createEnergyLabel, type FlagOriginData, type TemplateName, LabelDOMRenderer } from 'energy-label'
import Header from './components/header'
import Breadcrumb from './components/breadcrumb'
import { generateFakeOptions } from './lib/utils'
import VersionNumber from './components/version-number'
import { GITHUB_BETA_URL, NPM_URL_BETA, REGULATIONS } from './lib/constants'
import InputList from './components/input-list'
import CodeBlock from './components/code-block'

export default function Page() {
  const labelContainerRef = useRef(null)

  const [flagOrigin, setFlagOrigin] = useState<FlagOriginData>('EU')
  const [regulation, setRegulation] = useState<TemplateName>('smartphones')
  const [arrowLabel, setArrowLabel] = useState(false)
  const generateOptions = useCallback(() => {
    const fakeOptions = generateFakeOptions()
    return {
      ...fakeOptions.common,
      ...fakeOptions['smartphones'],
      ...fakeOptions['refrigerating-appliances']
    } as Record<string, string | number>
  }, [])

  const [options, setOptions] = useState<Record<string, string | number>>(generateOptions())

  const getCurrentRegulationOptions = useCallback(() => {
    const regulationInputs = REGULATIONS[regulation as keyof typeof REGULATIONS].inputs
    const currentOptions: Record<string, string | number> = {}

    regulationInputs.forEach(input => {
      if (options[input.key] !== undefined) {
        currentOptions[input.key] = options[input.key]
      }
    })

    return currentOptions
  }, [options, regulation])

  const label = useMemo(() => createEnergyLabel(arrowLabel ? undefined : regulation, { ...options, flagOrigin }), [flagOrigin, options, arrowLabel, regulation])

  useEffect(() => {
    if (labelContainerRef.current) {
      label.generateLabel().then(svgString => {
        LabelDOMRenderer.appendToElement(labelContainerRef.current!, svgString)
      })
    }
  }, [label])

  const handleDownload = useCallback(() => {
    label.generateLabel().then(svgString => {
      LabelDOMRenderer.downloadFile(svgString, `${String(options.supplierName)?.replaceAll(' ', '-')}_${options.modelName}.svg`)
    })
  }, [label, options])

  const getProductLabel = (origin: string) => {
    const label = 'Product'
    switch (origin) {
      case 'UK':
        return 'Great Britain ' + label
      default:
        return 'European ' + label
    }
  }

  const { name: regulationName, regulationNumber } = REGULATIONS[regulation as keyof typeof REGULATIONS]

  return (
    <>
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-[color-mix(in_srgb,var(--va-color-background)_60%,transparent)] backdrop-blur">
          <Header />
        </div>
        <div className="flex flex-col flex-1">
          <div className="px-4 md:px-8 pt-5 flex-1">
            <h1 className="mb-2 font-bold text-4xl">Energy Label Generator</h1>
            <div className="-mx-4 md:-mx-8 pt-1 py-1.5 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-white/5 border-dashed px-4 md:px-8 sticky top-[60] bg-[color-mix(in_srgb,var(--va-color-background)_90%,transparent)] backdrop-blur-lg z-10">
              <Breadcrumb
                items={[
                  <select
                    key="flagOrigin"
                    value={flagOrigin}
                    onChange={e => setFlagOrigin(e.target.value as FlagOriginData)}
                    className="select border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)] w-full outline-none font-semibold text-lg appearance-none"
                  >
                    {['EU', 'UK'].map(origin => (
                      <option key={origin} value={origin}>
                        {getProductLabel(origin)}
                      </option>
                    ))}
                  </select>,
                  <select
                    key="regulation"
                    value={regulation}
                    onChange={e => setRegulation(e.target.value as TemplateName)}
                    className="select border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)] w-full outline-none font-semibold text-lg appearance-none"
                  >
                    {Object.keys(REGULATIONS).map(key => (
                      <option key={key} value={key}>
                        {REGULATIONS[key as keyof typeof REGULATIONS].name}
                      </option>
                    ))}
                  </select>
                ]}
              />
              <label className="inline-flex items-center cursor-pointer">
                <span className="me-2 text-sm font-medium text-nowrap">View Arrow</span>
                <input type="checkbox" checked={arrowLabel} onChange={e => setArrowLabel(e.target.checked)} className="sr-only peer" />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <h2 className="mb-2 font-semibold text-xl">Product information</h2>
            <div className="mb-8 flex flex-col gap-2 w-full">
              <InputList config={REGULATIONS[regulation as keyof typeof REGULATIONS].inputs} values={options} setValues={setOptions} />
              <div>
                <p className="font-semibold">Regulation (EU) {regulationNumber}</p>
                <p>
                  <a href={`http://data.europa.eu/eli/reg_del/${regulationNumber}/oj`} className="va-link">
                    http://data.europa.eu/eli/reg_del/{regulationNumber}/oj
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 id="documentation" className="text-xl font-semibold">
                Documentation
              </h2>
              <p>Integrate into your JavaScript/TypeScript projects.</p>
              <CodeBlock language="bash" text="npm i energy-label@beta" />
              <CodeBlock
                language="js"
                text={`// Import the energy label factory function and DOM utilities.
import { createEnergyLabel, LabelDOMRenderer } from 'energy-label'

// Create an energy label instance for ${regulationName} with product data.
const label = createEnergyLabel(${arrowLabel ? undefined : `'${regulation}'`}, ${JSON.stringify({ flagOrigin, ...getCurrentRegulationOptions() }, null, 2)})

// Display the energy label in the DOM element with ID 'energy-label'.
label.generateLabel().then(svgString => {
  LabelDOMRenderer.appendToElement(document.querySelector('#energy-label'), svgString)
})

// Download the energy label as an SVG file (default: "label.svg").
label.generateLabel().then(svgString => {
  LabelDOMRenderer.downloadFile(svgString)
})`}
              />
              <a href={GITHUB_BETA_URL} className="va-link self-end">
                View source code
              </a>
            </div>
          </div>
          <footer className="px-4 md:px-8 flex flex-col justify-start flex-1 sticky bottom-0 py-4 bg-[color-mix(in_srgb,var(--va-color-background)_60%,transparent)] backdrop-blur">
            <div className="flex justify-center md:justify-end">
              <div className="flex flex-col items-center md:items-end gap-1">
                <div className="inline-flex gap-2" role="group">
                  <button
                    type="button"
                    onClick={() => {
                      setOptions(generateOptions())
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-blue-300 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white cursor-pointer active:*:rotate-90 *:transition-transform *:ease-in-out"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="size-5 ">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold px-4 py-2.5 focus:outline-none button--primary cursor-pointer"
                  >
                    Download the label in SVG
                  </button>
                </div>
                <p className="text-xs opacity-50 text-center md:text-right mx-1">
                  <small>
                    Powered by{' '}
                    <a href={NPM_URL_BETA} className="hover:underline">
                      <code>energy-label</code> <VersionNumber />
                    </a>
                  </small>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div className="surface flex-1 justify-center">
        <div className="flex flex-col h-screen sticky top-0">
          <div ref={labelContainerRef} id="label-canvas" className={`px-8 pt-12 pb-8 md:pb-12 w-full mx-auto max-w-xl overflow-hidden flex items-center flex-1 ${arrowLabel ? 'arrow' : ''}`} />
          <div className="pb-8 gap-2 flex flex-col items-center justify-center md:hidden">
            <button onClick={handleDownload} className="va-button">
              Download the label in SVG
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
