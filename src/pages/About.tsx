import { PageHeader } from '../components/PageHeader'
import { Prose } from '../components/Prose'
import { aboutMarkdown, site } from '../lib/content'

export function About() {
  return (
    <div className="wrap page narrow">
      <PageHeader
        kicker={site.aboutLabel}
        title="关于这份筛选"
        lede="渡知社 | TransMind 是个人维护的静态筛选层。"
      />
      <Prose markdown={aboutMarkdown} />
    </div>
  )
}
