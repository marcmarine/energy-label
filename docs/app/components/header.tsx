import Link from 'next/link'
import VersionNumber from './version-number'
import { FIGMA_URL, GITHUB_URL, NPM_URL_BETA } from '../lib/constants'

export default function Header() {
  return (
    <header className="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
      <div className="">
        <Link href="/">
          <h2 className="inline-block font-bold">energy-label ⚡</h2>
        </Link>{' '}
        <Link href={NPM_URL_BETA} className="hover:underline">
          <small className="whitespace-nowrap font-light">
            <VersionNumber />
          </small>
        </Link>
      </div>
      <nav className="flex gap-4">
        <Link href="#documentation" className="va-button !text-xs hover:underline">
          documentation
        </Link>
        <a href={FIGMA_URL} className="relative va-button !text-xs hover:underline">
          figma <span className="absolute -top-1 -right-3 animate-pulse text-fuchsia-600 px-0.5 rounded !text-[0.8em]">new</span>
        </a>
        <a href={GITHUB_URL} className="va-button !text-xs hover:underline">
          github
        </a>
      </nav>
    </header>
  )
}
