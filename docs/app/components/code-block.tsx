'use client'

import { useEffect, useState } from 'react'

interface CodeBlockProps {
  text: string
  language?: string
  theme?: string
}

export default function CodeBlockWrapper(props: CodeBlockProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    import('va-code-block').then(() => {
      setIsClient(true)
    })
  }, [])

  if (!isClient) return null

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Component = () => <va-code-block {...props} />

  return <Component />
}
