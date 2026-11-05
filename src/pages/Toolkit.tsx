import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { toolkit } from '../lib/content'

export function Toolkit() {
  return (
    <div className="wrap page">
      <PageHeader
        kicker="工具箱｜Toolkit"
        title="动手之前的习惯"
        lede="收录和阅读时实际在用的步骤。这里不介绍新产品，也不开辟广告位。"
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
                <Link to={item.href}>{item.hrefLabel}</Link>
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}
