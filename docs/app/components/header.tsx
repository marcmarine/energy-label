import Link from 'next/link'
import VersionNumber from './version-number'
import { FIGMA_URL, GITHUB_URL } from '../lib/constants'

export default function Header() {
  return (
    <header className="px-4 md:px-8 py-4 flex items-center justify-between">
      <Link href="/" className="group">
        <h2 className="font-bold">
          <span className="group-hover:underline">energy-label</span> ⚡{' '}
          <small className="font-light">
            <VersionNumber />
          </small>
        </h2>
      </Link>
      <nav className="flex gap-4">
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
