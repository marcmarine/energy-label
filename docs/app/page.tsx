'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createEnergyLabel, EnergyLabelOptions, FlagOriginOption, EU_REGULATION } from 'energy-label'
import Header from './components/header'
import Breadcrumb from './components/breadcrumb'
import { faker } from '@faker-js/faker'
import { capitalize, getEliUrl } from './lib/utils'
import VersionNumber from './components/version-number'
import { GITHUB_URL } from './lib/constants'

const REGULATION_ID = '2019/2016/2023-09-30'

export default function Page() {
  const labelContainerRef = useRef(null)
  const generateOptions = useCallback(
    () =>
      ({
        supplierName: capitalize(faker.food.fruit()),
        modelName: `${faker.helpers.replaceSymbols('##???####??')}`,
        efficiencyRating: faker.string.fromCharacters('abcdefg').toUpperCase(),
        annualEnergyConsumption: faker.number.int(999),
        bottleCapacity: faker.number.int(99),
        eprelRegistrationNumber: String(faker.number.int(9999999)),
        noiseEmissions: faker.number.int(99),
        noiseEmissionsClass: faker.string.fromCharacters('abcd').toUpperCase()
      } as EnergyLabelOptions),
    []
  )
  const [options, setOptions] = useState(generateOptions())
  const [flagOrigin, setFlagOrigin] = useState<FlagOriginOption>('EU')

  const label = useMemo(() => createEnergyLabel(REGULATION_ID, { ...options, flagOrigin }), [flagOrigin, options])

  useEffect(() => {
    if (labelContainerRef.current) {
      label.appendSVGToElement(labelContainerRef.current!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagOrigin, options])

  const handleDownload = useCallback(() => {
    label.downloadSVGFile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagOrigin, options])

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
            <div className="py-6">
              <h2 className="font-bold text-2xl">{EU_REGULATION[REGULATION_ID].title}</h2>
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
            <div className="mb-8 py-2 flex flex-col items-start leading-none">
              <span>Regulation document</span>
              <a href={getEliUrl(label.regulation)} className="underline hover:no-underline break-all" target="_blank">
                {getEliUrl(label.regulation)}
              </a>
            </div>
          </div>
          <footer className="px-4 md:px-8 flex flex-col justify-start flex-1 sticky bottom-0 py-4 bg-[color-mix(in_srgb,var(--va-color-background)_60%,transparent)] backdrop-blur">
            <div className="mb-1 flex justify-center md:justify-end">
              <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto">
                <button
                  onClick={() => {
                    setOptions(generateOptions())
                  }}
                  className="va-button !text-center"
                >
                  Generate random information
                </button>
                <button onClick={handleDownload} className="va-button !px-2 !bg-[var(--bg-primary)] !text-center button--primary">
                  Download the label in SVG
                </button>
              </div>
            </div>
            <p className="text-xs opacity-50 text-center md:text-right">
              <small>
                Powered by{' '}
                <a href={GITHUB_URL} className="hover:underline">
                  <code>energy-label</code> v<VersionNumber />
                </a>
              </small>
            </p>
          </footer>
        </div>
      </div>
      <div className="surface flex flex-col flex-1">
        <div className="flex flex-col h-screen sticky top-0">
          <div ref={labelContainerRef} className="px-8 pt-12 pb-8 overflow-hidden flex items-center flex-1" />
          <div className="pb-8 gap-2 flex flex-col items-center justify-center">
            <button onClick={handleDownload} className="va-button">
              Download the label in SVG
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
