import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { notes } from '../lib/content'

export function Notes() {
  return (
    <div className="wrap page">
      <PageHeader
        kicker="手记｜Notes"
        title="把判断写成可以复查的句子"
        lede="读法、更正和边界。手记不是源录的复述。"
      />
      <ul className="doc-list">
        {notes.map((note) => (
          <li key={note.slug}>
            <p className="meta-line">
              <span>{note.date}</span>
              <span lang="en">{note.titleEn}</span>
            </p>
            <h2>
              <Link to={`/notes/${note.slug}`}>{note.title}</Link>
            </h2>
            <p>{note.summary}</p>
            {note.tags.length > 0 ? (
              <ul className="tags">
                {note.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
