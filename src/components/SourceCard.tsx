import { Link } from 'react-router-dom'
import { hostOf, typeLabels } from '../lib/labels'
import type { SourceItem } from '../types'

function Meta({ item }: { item: SourceItem }) {
  return (
    <p className="meta-line">
      <span>{typeLabels[item.type]}</span>
      <span>{item.authors}</span>
      <span>{item.venue}</span>
      <span>原文 {item.date}</span>
      <span>收录 {item.added}</span>
    </p>
  )
}

export function SourceEntry({ item }: { item: SourceItem }) {
  return (
    <article className="entry">
      <div className="entry-kicker">
        <span className="index">{item.index}</span>
        <Meta item={item} />
      </div>
      <h2 className="entry-title">
        <Link to={`/library/${item.id}`} lang="en">
          {item.title}
        </Link>
      </h2>
      <p className="entry-cn">{item.titleCn}</p>
      <p className="entry-summary">{item.summary}</p>
      <div className="why">
        <p className="why-label">为何重要</p>
        <p>{item.whyItMatters}</p>
      </div>
      <div className="entry-foot">
        <ul className="tags">
          {item.tags.map((tag) => (
            <li key={tag}>
              <Link to={`/library?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
        <a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer">
          原文 · {hostOf(item.url)}
        </a>
      </div>
    </article>
  )
}

export function FeatureCard({ item }: { item: SourceItem }) {
  return (
    <article className="feature">
      <p className="meta-line">
        <span className="index">{item.index}</span>
        <span>{typeLabels[item.type]}</span>
      </p>
      <h3>
        <Link to={`/library/${item.id}`} lang="en">
          {item.title}
        </Link>
      </h3>
      <p className="entry-cn">{item.titleCn}</p>
      <div className="why">
        <p className="why-label">为何重要</p>
        <p>{item.whyItMatters}</p>
      </div>
    </article>
  )
}

export function SourceRow({ item }: { item: SourceItem }) {
  return (
    <li className="source-row">
      <span className="index">{item.index}</span>
      <div>
        <Link to={`/library/${item.id}`} lang="en">
          {item.title}
        </Link>
        <p>
          {item.titleCn}
          <span className="row-type">{typeLabels[item.type]}</span>
        </p>
      </div>
    </li>
  )
}
