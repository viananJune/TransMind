import { useEffect } from 'react'

export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} · 渡知社 | TransMind` : '渡知社 | TransMind'
  }, [page])
}
