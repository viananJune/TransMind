import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'

const components: Components = {
  a({ href, children }) {
    if (href?.startsWith('/')) {
      return <Link to={href}>{children}</Link>
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  },
}

export function Prose({ markdown }: { markdown: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
