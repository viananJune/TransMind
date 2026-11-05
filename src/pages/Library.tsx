import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { SourceEntry } from '../components/SourceCard'
import { sources } from '../lib/content'
import { typeLabels, typeOrder } from '../lib/labels'
import type { SourceType } from '../types'

function presentTypes(): SourceType[] {
  const found = new Set(sources.map((item) => item.type))
  return typeOrder.filter((type) => found.has(type))
}

function tagCounts(): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const item of sources) {
    for (const tag of item.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }))
}

export function Library() {
  const [params, setParams] = useSearchParams()
  const q = (params.get('q') ?? '').trim()
  const type = params.get('type') ?? ''
  const tag = params.get('tag') ?? ''

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (!value) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const clear = () => setParams({}, { replace: true })

  const filtered = useMemo(() => {
    const needle = q.toLowerCase()
    return sources.filter((item) => {
      if (type && item.type !== type) return false
      if (tag && !item.tags.includes(tag)) return false
      if (!needle) return true
      const haystack = [item.title, item.titleCn, item.summary, item.whyItMatters, item.authors, item.venue, item.tags.join(' ')]
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [q, type, tag])

  const types = presentTypes()
  const tags = tagCounts()
  const filtering = Boolean(q || type || tag)

  return (
    <div className="wrap page">
      <PageHeader
        kicker="源录｜Source Library"
        title="值得回到原文的材料"
        lede="论文、讲解、仓库、工具与流程。每条都写明为何重要，顺序由编辑排定。"
      />
      <div className="library-layout">
        <form
          className="filters"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="filter-label" htmlFor="q">
            搜索 · Search
          </label>
          <input
            id="q"
            name="q"
            type="search"
            value={params.get('q') ?? ''}
            placeholder="标题、摘要、标签或出处"
            onChange={(event) => setParam('q', event.target.value || null)}
            autoComplete="off"
          />

          <fieldset>
            <legend>类型 · Type</legend>
            <div className="chip-row">
              <button type="button" aria-pressed={!type} onClick={() => setParam('type', null)}>
                全部
              </button>
              {types.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={type === item}
                  onClick={() => setParam('type', type === item ? null : item)}
                >
                  {typeLabels[item]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>标签 · Tag</legend>
            <div className="chip-row">
              <button type="button" aria-pressed={!tag} onClick={() => setParam('tag', null)}>
                全部
              </button>
              {tags.map((item) => (
                <button
                  key={item.tag}
                  type="button"
                  aria-pressed={tag === item.tag}
                  onClick={() => setParam('tag', tag === item.tag ? null : item.tag)}
                >
                  {item.tag}
                  <span className="chip-count">{item.count}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </form>

        <div>
          <p className="result-count" aria-live="polite">
            {filtered.length} 条
            {filtering ? '符合当前筛选' : '在源录中'}
          </p>
          {filtered.length === 0 ? (
            <div className="empty">
              <p>没有符合的条目。</p>
              <p>试试更短的词，或清除标签与类型。</p>
              <button type="button" className="button button-quiet" onClick={clear}>
                清除筛选
              </button>
            </div>
          ) : (
            <div className="entry-list">
              {filtered.map((item) => (
                <SourceEntry key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
