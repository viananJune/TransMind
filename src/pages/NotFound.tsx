import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

export function NotFound() {
  return (
    <div className="wrap page narrow">
      <PageHeader kicker="404" title="这一页不在目录里" lede="链接可能写错了，或条目还没有收录。" />
      <p className="actions">
        <Link className="button" to="/">
          回首页
        </Link>
        <Link className="button button-quiet" to="/library">
          去源录
        </Link>
      </p>
    </div>
  )
}
