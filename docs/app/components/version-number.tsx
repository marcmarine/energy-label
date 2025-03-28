import { useEffect, useState } from 'react'

export default function VersionNumber() {
  const [version, setVersion] = useState()

  useEffect(() => {
    ;(async function fetchPackageVersion() {
      const response = await fetch('https://unpkg.com/energy-label/package.json')
      const data = await response.json()
      setVersion(data.version)
    })()
  }, [])

  return <span className={!version ? 'va-loading-dots' : ''}>{version}</span>
}
