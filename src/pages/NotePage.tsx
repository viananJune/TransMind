import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Prose } from '../components/Prose'
import { getNote } from '../lib/content'

export function NotePage() {
  const { slug = '' } = useParams()
  const note = getNote(slug)
  if (!note) {
    return (
      <div className="wrap page narrow">
        <PageHeader kicker="手记｜Notes" title="没有这篇手记" />
        <p>
          <Link to="/notes">返回手记</Link>
        </p>
      </div>
    )
  }
  return (
    <div className="wrap page narrow">
      <p className="back">
        <Link to="/notes">← 手记｜Notes</Link>
      </p>
      <PageHeader
        kicker={`手记｜Notes · ${note.date}`}
        title={note.title}
        lede={note.titleEn}
        ledeLang="en"
      />
      <Prose markdown={note.body} />
    </div>
  )
}
