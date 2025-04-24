import { useEffect, useState } from 'react'

export default function VersionNumber() {
  const [version, setVersion] = useState()
  const loading = !version

  useEffect(() => {
    ;(async function fetchPackageVersion() {
      const response = await fetch('https://registry.npmjs.org/energy-label/beta')
      const data = await response.json()
      setVersion(data.version)
    })()
  }, [])

  return (
    <span className={loading ? 'va-loading-dots' : ''}>
      {loading ? 'checking version' : 'v'}
      {version}
    </span>
  )
}
