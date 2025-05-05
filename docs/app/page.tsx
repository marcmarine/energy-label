'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createEnergyLabel, type FlagOriginOption } from 'energy-label'
import Header from './components/header'
import Breadcrumb from './components/breadcrumb'
import { faker } from '@faker-js/faker'
import { capitalize } from './lib/utils'
import VersionNumber from './components/version-number'
import { NPM_URL_BETA } from './lib/constants'

export default function Page() {
  const labelContainerRef = useRef(null)
  const generateOptions = useCallback(
    () => ({
      supplierName: capitalize(faker.food.fruit()),
      modelName: `${faker.helpers.replaceSymbols('##???####??')}`,
      efficiencyRating: faker.string.fromCharacters('abcdefg').toUpperCase(),
      annualEnergyConsumption: faker.number.int(999),
      bottleCapacity: 0,
      eprelRegistrationNumber: String(faker.number.int(9999999)),
      frozenVolume: faker.number.int(99),
      chillVolume: faker.number.int(99),
      noiseEmissions: faker.number.int(99),
      noiseEmissionsClass: faker.string.fromCharacters('abcd').toUpperCase()
    }),
    []
  )
  const [options, setOptions] = useState(generateOptions())
  const [flagOrigin, setFlagOrigin] = useState<FlagOriginOption>('EU')
  const [arrowLabel, setArrowLabel] = useState(false)

  const label = useMemo(() => createEnergyLabel(arrowLabel ? undefined : 'refrigerating-appliances', { ...options, flagOrigin }), [flagOrigin, options, arrowLabel])

  useEffect(() => {
    if (labelContainerRef.current) {
      label.appendSVGToElement(labelContainerRef.current!)
    }
  }, [label])

  const handleDownload = useCallback(() => {
    label.downloadSVGFile()
  }, [label])

  const getProductLabel = (origin: string) => {
    const label = 'Product'
    switch (origin) {
      case 'UK':
        return 'Great Britain ' + label
      default:
        return 'European ' + label
    }
  }

  return (
    <>
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex flex-col flex-1">
          <div className="px-4 md:px-8 flex-1">
            <div className="py-5">
              <h1 className="mb-2 font-bold text-4xl">Energy Label Generator</h1>
              <Breadcrumb
                selector={
                  <select
                    value={flagOrigin}
                    onChange={e => setFlagOrigin(e.target.value as FlagOriginOption)}
                    className="select border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)] w-full outline-none font-bold text-lg appearance-none"
                  >
                    {['EU', 'UK'].map(origin => (
                      <option key={origin} value={origin}>
                        {getProductLabel(origin)}
                      </option>
                    ))}
                  </select>
                }
              />
            </div>
            <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
              <h2 className="font-bold text-2xl">Household refrigerating appliances</h2>
              <label className="inline-flex items-center cursor-pointer">
                <span className="me-2 text-sm font-medium text-nowrap">View Arrow</span>
                <input type="checkbox" checked={arrowLabel} onChange={e => setArrowLabel(e.target.checked)} className="sr-only peer" />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="py-4 flex flex-col gap-4 w-full">
              <label className="py-0.5 flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                Supplier&apos;s Name: <input value={options.supplierName} onChange={e => setOptions(prev => ({ ...prev, supplierName: e.target.value }))} className="flex-1 text-right outline-none font-semibold" />
              </label>
              <label className="py-0.5 flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                Model Identifier: <input value={options.modelName} onChange={e => setOptions(prev => ({ ...prev, modelName: e.target.value }))} className="flex-1 text-right outline-none font-semibold" />
              </label>
              <label className="py-0.5 flex-1 gap-4 flex justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                EPREL ID:{' '}
                <input value={options.eprelRegistrationNumber} onChange={e => setOptions(prev => ({ ...prev, eprelRegistrationNumber: e.target.value }))} className="flex-1 text-right outline-none font-semibold" />
              </label>
              <label className="py-0.5 flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                Efficiency class:
                <select value={options.efficiencyRating} onChange={e => setOptions(prev => ({ ...prev, efficiencyRating: e.target.value }))} className="py-0.5 select flex-1 text-right outline-none font-semibold">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(scale => (
                    <option key={scale} value={scale}>
                      {scale}
                    </option>
                  ))}
                </select>
              </label>
              <label className="py-0.5 flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                Consumtion:{' '}
                <input
                  value={options.annualEnergyConsumption}
                  type="number"
                  onChange={e => setOptions(prev => ({ ...prev, annualEnergyConsumption: Number(e.target.value) }))}
                  className="flex-1 text-right outline-none font-semibold"
                />
              </label>
              <label className="py-0.5 flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                Frozen Volume:{' '}
                <input value={options.frozenVolume} type="number" onChange={e => setOptions(prev => ({ ...prev, frozenVolume: Number(e.target.value) }))} className="flex-1 text-right font-bold outline-none" />
              </label>
              <label className="py-0.5 flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                Chill Volume:{' '}
                <input value={options.chillVolume} type="number" onChange={e => setOptions(prev => ({ ...prev, chillVolume: Number(e.target.value) }))} className="flex-1 text-right font-bold outline-none" />
              </label>
              <label className="py-0.5 flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                Number of wine bottles:{' '}
                <input value={options.bottleCapacity} type="number" onChange={e => setOptions(prev => ({ ...prev, bottleCapacity: Number(e.target.value) }))} className="flex-1 text-right font-bold outline-none" />
              </label>
              <label className="py-0.5 flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                Airborne acoustical noise emissions:{' '}
                <input value={options.noiseEmissions} type="number" onChange={e => setOptions(prev => ({ ...prev, noiseEmissions: Number(e.target.value) }))} className="flex-1 text-right outline-none font-semibold" />
              </label>
              <label className="flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
                Noise class:
                <select value={options.noiseEmissionsClass} className="py-0.5 select flex-1 text-right outline-none font-semibold" onChange={e => setOptions(prev => ({ ...prev, noiseEmissionsClass: e.target.value }))}>
                  {['A', 'B', 'C', 'D'].map(scale => (
                    <option key={scale} value={scale}>
                      {scale}
                    </option>
                  ))}
                </select>
              </label>
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
      <div className="surface flex flex-col flex-1">
        <div className="flex flex-col lg:h-screen sticky top-0">
          <div ref={labelContainerRef} className="px-8 pt-12 pb-8 md:pb-12 w-full mx-auto max-w-xl overflow-hidden flex items-center flex-1" />
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
