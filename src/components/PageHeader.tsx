import { useDocumentTitle } from '../lib/useDocumentTitle'

export function PageHeader({
  kicker,
  title,
  lede,
  ledeLang,
}: {
  kicker: string
  title: string
  lede?: string
  ledeLang?: string
}) {
  useDocumentTitle(kicker)
  return (
    <header className="page-header">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {lede ? (
        <p className="lede" lang={ledeLang}>
          {lede}
        </p>
      ) : null}
    </header>
  )
}
