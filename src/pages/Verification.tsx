import { PageHeader } from '../components/PageHeader'
import { Prose } from '../components/Prose'
import { rubric, splitVerification, verificationMarkdown } from '../lib/content'

export function Verification() {
  const [before, after] = splitVerification(verificationMarkdown)
  return (
    <div className="wrap page narrow">
      <PageHeader
        kicker="甄别｜Verification"
        title="决定一条材料能不能留下"
        lede="四问都站得住，才进入源录。声量和标题不构成理由。"
      />
      <Prose markdown={before} />
      <ol className="rubric">
        {rubric.questions.map((question) => (
          <li key={question.n}>
            <span className="index">{question.n}</span>
            <h2>{question.title}</h2>
            <p className="title-en" lang="en">
              {question.titleEn}
            </p>
            <p>{question.body}</p>
          </li>
        ))}
      </ol>
      <h2 className="section-title">不收录的形状</h2>
      <dl className="reject">
        {rubric.reject.map((item) => (
          <div key={item.title}>
            <dt>{item.title}</dt>
            <dd>{item.body}</dd>
          </div>
        ))}
      </dl>
      {after ? <Prose markdown={after} /> : null}
    </div>
  )
}
