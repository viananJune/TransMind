import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { toolkit } from '../lib/content'

function ToolkitLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith('/')) {
    return <Link to={href}>{label}</Link>
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  )
}

export function Toolkit() {
  return (
    <div className="wrap page">
      <PageHeader
        kicker="工具箱｜Toolkit"
        title="会打开的入口"
        lede="读论文和核对流程时会打开的入口。每条写明用途、什么时候用，以及链接。"
      />
      <ol className="toolkit">
        {toolkit.map((item, index) => (
          <li key={item.id} id={item.id}>
            <span className="index">{String(index + 1).padStart(2, '0')}</span>
            <h2>{item.title}</h2>
            <p className="title-en" lang="en">
              {item.titleEn}
            </p>
            <p className="entry-summary">{item.summary}</p>
            <ol>
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {item.href && item.hrefLabel ? (
              <p>
                <ToolkitLink href={item.href} label={item.hrefLabel} />
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}
