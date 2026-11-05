import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Prose } from '../components/Prose'
import { getDigest, getSource } from '../lib/content'
import { typeLabels } from '../lib/labels'

export function DigestPage() {
  const { slug = '' } = useParams()
  const digest = getDigest(slug)
  if (!digest) {
    return (
      <div className="wrap page narrow">
        <PageHeader kicker="文摘｜Digest" title="没有这一期" />
        <p>
          <Link to="/digest">返回文摘</Link>
        </p>
      </div>
    )
  }
  const linked = digest.relatedIds
    .map((id) => getSource(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <div className="wrap page narrow">
      <p className="back">
        <Link to="/digest">← 文摘｜Digest</Link>
      </p>
      <PageHeader
        kicker={`文摘｜Digest · ${digest.date}`}
        title={digest.title}
        lede={digest.titleEn}
        ledeLang="en"
      />
      <Prose markdown={digest.body} />
      {linked.length > 0 ? (
        <section className="related">
          <h2>这一期的源录</h2>
          <ol className="linked-sources">
            {linked.map((item) => (
              <li key={item.id}>
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
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  )
}
