import { Link } from 'react-router-dom'
import { FeatureCard, SourceRow } from '../components/SourceCard'
import { digests, notes, site, sources } from '../lib/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const steps = [
  {
    n: '01',
    title: '先收回原文',
    to: '/library',
    label: '源录｜Source Library',
    body: '只留下能回到论文、官方仓库或作者原文的材料。转述和榜单停在外面。',
  },
  {
    n: '02',
    title: '用四问决定去留',
    to: '/verification',
    label: '甄别｜Verification',
    body: '追溯、主张、激励、是否还值得引用。四问里有一问含糊，就先不收录。',
  },
  {
    n: '03',
    title: '把判断写成句子',
    to: '/notes',
    label: '手记｜Notes',
    body: '为何重要，要写成可以复查的话。手记、文摘和工具箱都从这里长出来。',
  },
]

export function Home() {
  useDocumentTitle()
  const featured = sources.filter((item) => item.featured)
  const latestNotes = notes.slice(0, 2)
  const latestDigest = digests[0]

  return (
    <>
      <section className="masthead">
        <div className="wrap masthead-grid">
          <div>
            <p className="kicker">个人筛选层 · 创刊样本</p>
            <h1>{site.name}</h1>
            <p className="slogan-cn">{site.sloganCn}</p>
            <p className="slogan-en" lang="en">
              {site.sloganEn}
            </p>
          </div>
          <div className="masthead-copy">
            <p className="banner">
              {site.banner.endsWith('工程实践。') ? (
                <>
                  {site.banner.slice(0, -'工程实践。'.length)}
                  <span className="keep">工程实践。</span>
                </>
              ) : (
                site.banner
              )}
            </p>
            <div className="actions">
              <Link className="button" to="/library">
                进入源录
              </Link>
              <Link className="button button-quiet" to="/verification">
                阅读甄别标准
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap section">
          <div className="section-head">
            <h2>本期留下</h2>
            <Link to="/library">全部 {sources.length} 条</Link>
          </div>
          <div className="feature-grid">
            {featured.map((item) => (
              <FeatureCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>怎样使用</h2>
        </div>
        <ol className="steps">
          {steps.map((step) => (
            <li key={step.n}>
              <span className="index">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <Link to={step.to}>{step.label}</Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section split">
        <div>
          <div className="section-head">
            <h2>创刊目录</h2>
            <Link to="/library">源录｜Source Library</Link>
          </div>
          <ol className="source-index">
            {sources.map((item) => (
              <SourceRow key={item.id} item={item} />
            ))}
          </ol>
        </div>
        <div className="side-stack">
          <div>
            <div className="section-head">
              <h2>手记</h2>
              <Link to="/notes">全部</Link>
            </div>
            <ul className="teaser-list">
              {latestNotes.map((note) => (
                <li key={note.slug}>
                  <p className="meta-line">
                    <span>{note.date}</span>
                  </p>
                  <h3>
                    <Link to={`/notes/${note.slug}`}>{note.title}</Link>
                  </h3>
                  <p>{note.summary}</p>
                </li>
              ))}
            </ul>
          </div>
          {latestDigest ? (
            <div>
              <div className="section-head">
                <h2>文摘</h2>
                <Link to="/digest">全部</Link>
              </div>
              <article className="teaser">
                <p className="meta-line">
                  <span>{latestDigest.date}</span>
                  <span lang="en">{latestDigest.titleEn}</span>
                </p>
                <h3>
                  <Link to={`/digest/${latestDigest.slug}`}>{latestDigest.title}</Link>
                </h3>
                <p>{latestDigest.summary}</p>
              </article>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
