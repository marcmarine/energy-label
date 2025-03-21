import Link from 'next/link'

export default function Header() {
  return (
    <header className="px-4 md:px-8 py-4 flex justify-between">
      <Link href="/" className="group">
        <h2 className="font-bold">
          <span className="group-hover:underline">energy-label</span> ⚡ <small className="font-light">beta</small>
        </h2>
      </Link>
      <nav className="flex gap-6"></nav>
    </header>
  )
}
