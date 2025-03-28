export default function Breadcrumb({ selector }: { selector: React.ReactNode }) {
  return (
    <nav>
      <ol className="flex gap-1 sm:gap-4 flex-wrap justify-between sm:justify-start items-center md:flex-row">
        <li>{selector}</li>
        <span className="hidden sm:block text-neutral-400">/</span>
        <li>
          <button>Regulation (EU) 2019/2016</button>
        </li>
      </ol>
    </nav>
  )
}
