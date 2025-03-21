'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createEnergyLabel } from 'energy-label'
import Header from './components/header'
import Breadcrumb from './components/breadcrumb'
import { faker } from '@faker-js/faker'
import { capitalize, getEliUrl } from './lib/utils'

const REGULATION_ID = '2019/2016/2023-09-30'

export default function Page() {
  const labelContainerRef = useRef(null)
  const generateOptions = useCallback(
    () => ({
      supplierOrTrademark: capitalize(faker.food.fruit()),
      modelIdentifier: `${faker.helpers.replaceSymbols('##???####??')}`,
      efficiencyClass: faker.string.fromCharacters('abcdefg').toUpperCase(),
      consolidatedEnergyConsAnnual: faker.number.int(999),
      capBottles: faker.number.int(99),
      eprelRegistrationNumber: String(faker.number.int(9999999)),
      noise: faker.number.int(99),
      noiseClass: faker.string.fromCharacters('abcd').toUpperCase()
    }),
    []
  )
  const [options, setOptions] = useState(generateOptions())

  const label = useMemo(() => createEnergyLabel(REGULATION_ID, options), [options])

  useEffect(() => {
    if (labelContainerRef.current) {
      label.appendSVGToElement(labelContainerRef.current!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const handleDownload = useCallback(() => {
    label.downloadSVGFile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  return (
    <>
      <div className="flex-1">
        <Header />
        <div className="px-4 md:px-8">
          <div className="py-5">
            <h1 className="mb-2 font-bold text-4xl">Energy Label Generator</h1>
            <Breadcrumb />
          </div>
          <div className="py-6">
            <h2 className="font-bold text-2xl">Wine refrigerators</h2>
          </div>
          <div className="py-4 flex flex-col gap-4 w-full">
            <label className="flex gap-4 justify-between border-b border-dotted border-neutral-400 hover:bg-neutral-50">
              Supplier&apos;s Name:{' '}
              <input value={options.supplierOrTrademark} onChange={e => setOptions(prev => ({ ...prev, supplierOrTrademark: e.target.value }))} className="flex-1 text-right outline-none font-semibold" />
            </label>
            <label className="flex gap-4 justify-between border-b border-dotted border-neutral-400 hover:bg-neutral-50">
              Model Identifier: <input value={options.modelIdentifier} onChange={e => setOptions(prev => ({ ...prev, modelIdentifier: e.target.value }))} className="flex-1 text-right outline-none font-semibold" />
            </label>
            <label className="flex-1 gap-4 flex justify-between border-b border-dotted border-neutral-400 hover:bg-neutral-50">
              EPREL ID:{' '}
              <input value={options.eprelRegistrationNumber} onChange={e => setOptions(prev => ({ ...prev, eprelRegistrationNumber: e.target.value }))} className="flex-1 text-right outline-none font-semibold" />
            </label>
            <label className="flex gap-4 justify-between border-b border-dotted border-neutral-400 hover:bg-neutral-50">
              Efficiency class:
              <select value={options.efficiencyClass} onChange={e => setOptions(prev => ({ ...prev, efficiencyClass: e.target.value }))} className="flex-1 text-right outline-none font-semibold">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(scale => (
                  <option key={scale} value={scale}>
                    {scale}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex gap-4 justify-between border-b border-dotted border-neutral-400 hover:bg-neutral-50">
              Consumtion:{' '}
              <input
                value={options.consolidatedEnergyConsAnnual}
                type="number"
                onChange={e => setOptions(prev => ({ ...prev, consolidatedEnergyConsAnnual: Number(e.target.value) }))}
                className="flex-1 text-right outline-none font-semibold"
              />
            </label>
            <label className="flex gap-4 justify-between border-b border-dotted border-neutral-400 hover:bg-neutral-50">
              Number of wine bottles:{' '}
              <input value={options.capBottles} type="number" onChange={e => setOptions(prev => ({ ...prev, capBottles: Number(e.target.value) }))} className="flex-1 text-right font-bold outline-none" />
            </label>
            <label className="flex gap-4 justify-between border-b border-dotted border-neutral-400 hover:bg-neutral-50">
              Airborne acoustical noise emissions:{' '}
              <input value={options.noise} type="number" onChange={e => setOptions(prev => ({ ...prev, noise: Number(e.target.value) }))} className="flex-1 text-right outline-none font-semibold" />
            </label>
            <label className="flex gap-4 justify-between border-b border-dotted border-neutral-400 hover:bg-neutral-50">
              Noise class:
              <select value={options.noiseClass} className="flex-1 text-right outline-none font-semibold" onChange={e => setOptions(prev => ({ ...prev, noiseClass: e.target.value }))}>
                {['A', 'B', 'C', 'D'].map(scale => (
                  <option key={scale} value={scale}>
                    {scale}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-4 py-2 flex flex-col items-start leading-none">
            <span>Regulation document</span>
            <a href={getEliUrl(label.regulation)} className="underline hover:no-underline" target="_blank">
              {getEliUrl(label.regulation)}
            </a>
          </div>
          <div className="py-4 flex justify-center md:justify-end">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={() => {
                  setOptions(generateOptions())
                }}
                className="px-3 py-2 font-bold text-neutral-600 border border-neutral-300 cursor-pointer hover:bg-neutral-50 active:bg-neutral-100"
              >
                Generate random information
              </button>
              <button onClick={handleDownload} className="px-3 py-2 font-bold text-white bg-blue-800 cursor-pointer hover:bg-blue-700 active:bg-blue-900">
                Download the label in SVG
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="surface flex flex-col flex-1">
        <div className="flex flex-col max-h-screen sticky top-0">
          <div ref={labelContainerRef} className="px-8 pt-12 pb-8 overflow-hidden flex items-center flex-1" />
          <div className="pb-6 flex justify-center">
            <button onClick={handleDownload} className="p-2 text-blue-800 hover:text-blue-600 active:text-neutral-600 cursor-pointer">
              Download the label in SVG
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
