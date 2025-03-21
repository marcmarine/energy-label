export default function Breadcrumb() {
  return (
    <nav>
      <ol className="flex gap-1 sm:gap-4 flex-wrap justify-between sm:justify-start items-center md:flex-row">
        <li>
          <button className="text-lg font-bold">European product</button>
        </li>
        <span className="hidden sm:block text-neutral-400">/</span>
        <li>
          <button>Regulation (EU) 2019/2016</button>
        </li>
      </ol>
    </nav>
  )
}
