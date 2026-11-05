import aboutRaw from '../../content/about.md?raw'
import verificationRaw from '../../content/verification.md?raw'
import rubricJson from '../../content/rubric.json'
import siteJson from '../../content/site.json'
import sourceJson from '../../content/sources.json'
import toolkitJson from '../../content/toolkit.json'
import type { Doc, Rubric, SiteInfo, SourceItem, ToolkitItem } from '../types'

export const site = siteJson as SiteInfo
export const sources = sourceJson as SourceItem[]
export const rubric = rubricJson as Rubric
export const toolkit = toolkitJson as ToolkitItem[]
export const aboutMarkdown = aboutRaw
export const verificationMarkdown = verificationRaw

const noteModules = import.meta.glob('/content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const digestModules = import.meta.glob('/content/digests/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string, path: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) throw new Error(`Missing frontmatter: ${path}`)
  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
  return { data, body: match[2].trim() }
}

function parseDoc(path: string, raw: string): Doc {
  const { data, body } = parseFrontmatter(raw, path)
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? path
  return {
    slug,
    title: data.title ?? slug,
    titleEn: data.titleEn ?? '',
    date: data.date ?? '',
    summary: data.summary ?? '',
    tags: (data.tags ?? '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    relatedIds: (data.sources ?? '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean),
    body,
  }
}

function loadDocs(modules: Record<string, string>): Doc[] {
  return Object.entries(modules)
    .map(([path, raw]) => parseDoc(path, raw))
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}

export const notes = loadDocs(noteModules)
export const digests = loadDocs(digestModules)

export function getSource(id: string): SourceItem | undefined {
  return sources.find((item) => item.id === id)
}

export function getNote(slug: string): Doc | undefined {
  return notes.find((doc) => doc.slug === slug)
}

export function getDigest(slug: string): Doc | undefined {
  return digests.find((doc) => doc.slug === slug)
}

export function relatedSources(item: SourceItem, limit = 3): SourceItem[] {
  return sources
    .filter((other) => other.id !== item.id && other.tags.some((tag) => item.tags.includes(tag)))
    .slice(0, limit)
}

export const lastAdded = sources.map((item) => item.added).sort().at(-1) ?? ''

export function splitVerification(markdown: string): [string, string] {
  const marker = '<!-- rubric -->'
  const index = markdown.indexOf(marker)
  if (index === -1) return [markdown.trim(), '']
  return [markdown.slice(0, index).trim(), markdown.slice(index + marker.length).trim()]
}
