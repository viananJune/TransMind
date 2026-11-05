import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { digests } from '../lib/content'

export function Digest() {
  return (
    <div className="wrap page">
      <PageHeader
        kicker="文摘｜Digest"
        title="把几条源录读成一条路径"
        lede="一期只串几份已经收录的材料，并给出建议的阅读顺序。"
      />
      <ul className="doc-list">
        {digests.map((digest) => (
          <li key={digest.slug}>
            <p className="meta-line">
              <span>{digest.date}</span>
              <span>{digest.relatedIds.length} 条源录</span>
              <span lang="en">{digest.titleEn}</span>
            </p>
            <h2>
              <Link to={`/digest/${digest.slug}`}>{digest.title}</Link>
            </h2>
            <p>{digest.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
