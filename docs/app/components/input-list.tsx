type InputConfig = {
  label: string
  key: string
  type: string
  options?: string[]
}

type DynamicInputListProps = {
  config: InputConfig[]
  values: Record<string, string | number>
  setValues: React.Dispatch<React.SetStateAction<Record<string, string | number>>>
}

export default function DynamicInputList({ config, values, setValues }: DynamicInputListProps) {
  return (
    <div className="py-4 flex flex-col gap-4 w-full">
      {config.map(({ label, key, type, options: selectOptions }) => (
        <label key={key} className="py-0.5 flex gap-4 justify-between border-b border-dotted border-[var(--va-text-weak)] hover:bg-[var(--bg-surface)]">
          {label}
          {type === 'select' ? (
            <select value={values[key]} onChange={e => setValues(prev => ({ ...prev, [key]: e.target.value }))} className="py-0.5 select flex-1 text-right outline-none font-semibold">
              {selectOptions?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={values[key]}
              onChange={e =>
                setValues(prev => ({
                  ...prev,
                  [key]: type === 'number' ? Number(e.target.value) : e.target.value
                }))
              }
              className="flex-1 text-right outline-none font-semibold"
            />
          )}
        </label>
      ))}
    </div>
  )
}
