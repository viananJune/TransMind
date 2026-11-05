export type SourceType = 'paper' | 'essay' | 'repo' | 'tool' | 'workflow'

export interface SiteNavItem {
  to: string
  label: string
}

export interface SiteInfo {
  name: string
  sloganCn: string
  sloganEn: string
  banner: string
  aboutLabel: string
  nav: SiteNavItem[]
}

export interface SourceItem {
  id: string
  index: string
  title: string
  titleCn: string
  type: SourceType
  authors: string
  venue: string
  url: string
  date: string
  added: string
  tags: string[]
  summary: string
  whyItMatters: string
  featured?: boolean
}

export interface RubricItem {
  n: string
  title: string
  titleEn: string
  body: string
}

export interface RejectItem {
  title: string
  body: string
}

export interface Rubric {
  questions: RubricItem[]
  reject: RejectItem[]
}

export interface ToolkitItem {
  id: string
  title: string
  titleEn: string
  summary: string
  steps: string[]
  href?: string
  hrefLabel?: string
}

export interface Doc {
  slug: string
  title: string
  titleEn: string
  date: string
  summary: string
  tags: string[]
  relatedIds: string[]
  body: string
}
