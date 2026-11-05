import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { getSource, relatedSources } from '../lib/content'
import { hostOf, typeLabels } from '../lib/labels'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function SourceDetail() {
  const { id = '' } = useParams()
  const item = getSource(id)
  useDocumentTitle(item ? `${item.index} ${item.title}` : '未找到条目')

  if (!item) {
    return (
      <div className="wrap page">
        <PageHeader kicker="源录｜Source Library" title="没有这条条目" lede="它可能被更名，或还没有收录。" />
        <p>
          <Link to="/library">返回源录</Link>
        </p>
      </div>
    )
  }

  const related = relatedSources(item)

  return (
    <div className="wrap page narrow">
      <p className="back">
        <Link to="/library">← 源录｜Source Library</Link>
      </p>
      <header className="page-header">
        <p className="kicker">
          <span className="index">{item.index}</span>
          <span>{typeLabels[item.type]}</span>
        </p>
        <h1 lang="en">{item.title}</h1>
        <p className="lede">{item.titleCn}</p>
      </header>
      <p className="meta-line detail-meta">
        <span>{item.authors}</span>
        <span>{item.venue}</span>
        <span>原文 {item.date}</span>
        <span>收录 {item.added}</span>
      </p>
      <p className="entry-summary detail-summary">{item.summary}</p>
      <div className="why">
        <p className="why-label">为何重要</p>
        <p>{item.whyItMatters}</p>
      </div>
      <ul className="tags">
        {item.tags.map((tag) => (
          <li key={tag}>
            <Link to={`/library?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
          </li>
        ))}
      </ul>
      <p className="actions">
        <a className="button" href={item.url} target="_blank" rel="noopener noreferrer">
          前往原文 · {hostOf(item.url)}
        </a>
      </p>
      {related.length > 0 ? (
        <section className="related">
          <h2>相邻条目</h2>
          <ul className="teaser-list">
            {related.map((other) => (
              <li key={other.id}>
                <p className="meta-line">
                  <span className="index">{other.index}</span>
                  <span>{typeLabels[other.type]}</span>
                </p>
                <h3>
                  <Link to={`/library/${other.id}`} lang="en">
                    {other.title}
                  </Link>
                </h3>
                <p>{other.titleCn}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
