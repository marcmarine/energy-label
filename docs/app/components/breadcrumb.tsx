import { Fragment } from 'react'
export default function Breadcrumb({ items }: { items: React.ReactNode[] }) {
  return (
    <nav>
      <ol className="flex gap-1 sm:gap-4 flex-wrap justify-between sm:justify-start items-center md:flex-row">
        {items.map((item: React.ReactNode, index: number) => (
          <Fragment key={index}>
            {index !== 0 && <span className="hidden sm:block text-neutral-400">/</span>}
            <li>{item}</li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
