import type { SourceType } from '../types'

export const typeLabels: Record<SourceType, string> = {
  paper: '论文｜Paper',
  essay: '文章｜Essay',
  repo: '仓库｜Repository',
  tool: '工具｜Tool',
  workflow: '流程｜Workflow',
}

export const typeOrder: SourceType[] = ['paper', 'essay', 'repo', 'tool', 'workflow']

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
